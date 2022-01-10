// setup standard for combination wizard
general.current_standard_for_combination_wizard = general.NATIONAL_ANNEX_AND_EDITION_EN_1990_DIN_2012_08

// setup required addons
STRUCTURE_STABILITY.setActive(true)

// definition of frame geometry
var columns_height = 3.0
var gable_height = 1.5
var console_height = 2.5
var console_length = 0.3

// setup load cases
function createLoadCase(id, static_analysis_settings, action_category, name)
{
    var load_case = LoadCase(id)
    load_case.name = name
    load_case.static_analysis_settings = static_analysis_settings
    load_case.action_category = action_category
    return load_case
}

if (!load_cases.exist(1))
{
    var lc1 = createLoadCase(1, 1, load_cases.ACTION_CATEGORY_PERMANENT_G, "Self weight")
}
var lc2 = createLoadCase(2, 2, load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H, "Live load")
var lc3 = createLoadCase(3, 2, load_cases.ACTION_CATEGORY_WIND_QW, "Wind load")
var lc4 = createLoadCase(4, 2, load_cases.ACTION_CATEGORY_WIND_QW, "Wind load 2")
var lc5 = createLoadCase(5, 1, load_cases.ACTION_CATEGORY_PERMANENT_IMPOSED_GQ, "Stability - linear")
var lc6 = createLoadCase(6, 2, load_cases.ACTION_CATEGORY_PERMANENT_IMPOSED_GQ, "Imperfections")
var lc7 = createLoadCase(7, 2, load_cases.ACTION_CATEGORY_PERMANENT_G, "Other permanent load")

// assign stability to LC5
lc5.self_weight_active = true
lc5.calculate_critical_load = true
lc5.stability_analysis_settings = 1

// assign imperfections to LC6
lc6.consider_imperfection = true
lc6.imperfection_case = ImperfectionCase(1, "Local Imperfections Only")

// prepare materials and sections
var material = Material(undefined, 'S235 | EN 1993-1-1:2005-05')
var section_HEB = Section(undefined, 'HEB 220', material)
var section_IPE240 = Section(undefined, 'IPE 240', material)
var section_IPE100 = Section(undefined, 'IPE 100', material)
var section_L = Section(undefined, 'L 20x20x3', material)

// create topology, first we generate all nodes
for (var i = 0; i < number_of_frames; i++)
{
    var dy = frame_length * i
    Node(undefined, 0, dy, 0)
    Node(undefined, 0, dy, -console_height)
    Node(undefined, 0, dy, -columns_height)
    Node(undefined, width / 2, dy, -console_height - gable_height)
    Node(undefined, width, dy, -columns_height)
    Node(undefined, width, dy, -console_height)
    Node(undefined, width, dy, 0)
    Node(undefined, console_length, dy, -console_height)
    Node(undefined, width - console_length, dy, -console_height)
}

// assign nodal support to all nodes that have coordinate Z == 0
for (var i = 1; i <= nodes.count(); i++)
{
    if (nodes[i].global_coordinate_3 == 0)
    {
        nodes[i].support = nodal_supports[1]
    }
}

var member_parameters_heb = { "section_start": section_HEB }
var member_parameters_ipe240 = { "section_start": section_IPE240 }
var member_parameters_ipe100 = { "section_start": section_IPE100 }

// create members for the frames
for (var i = 0; i < number_of_frames; i++)
{
    var offset = i * 9
    Member(undefined, [1 + offset, 2 + offset], "", member_parameters_heb)
    Member(undefined, [2 + offset, 3 + offset], "", member_parameters_heb)
    Member(undefined, [3 + offset, 4 + offset], "", member_parameters_ipe240)
    Member(undefined, [4 + offset, 5 + offset], "", member_parameters_ipe240)
    Member(undefined, [5 + offset, 6 + offset], "", member_parameters_heb)
    Member(undefined, [2 + offset, 8 + offset], "", member_parameters_ipe240)
    Member(undefined, [6 + offset, 9 + offset], "", member_parameters_ipe240)
    Member(undefined, [6 + offset, 7 + offset], "", member_parameters_heb)
}

// create longtitudial beams to connect the frames
for (var i = 1; i < number_of_frames; i++)
{
    var offset = (i - 1) * 9
    Member(undefined, [2 + offset, 11 + offset], "", member_parameters_ipe100)
    Member(undefined, [6 + offset, 15 + offset], "", member_parameters_ipe100)
    Member(undefined, [4 + offset, 13 + offset], "", member_parameters_ipe100)
    Member(undefined, [5 + offset, 14 + offset], "", member_parameters_ipe100)
    Member(undefined, [3 + offset, 12 + offset], "", member_parameters_ipe100)
}

// create members for the bracing system
var bracing_member_params =
{
    "type": members.TYPE_TENSION,
    "section_start": section_L
}
Member(undefined, [7, 14], "", bracing_member_params)
Member(undefined, [5, 16], "", bracing_member_params)
Member(undefined, [5, 13], "", bracing_member_params)
Member(undefined, [14, 4], "", bracing_member_params)
Member(undefined, [13, 3], "", bracing_member_params)
Member(undefined, [2, 4], "", bracing_member_params)
Member(undefined, [1, 12], "", bracing_member_params)
Member(undefined, [3, 10], "", bracing_member_params)

// create member imperfections
var imperfection = MemberImperfection(undefined, 1)
imperfection.members = "1,9,17,25,33"
imperfection.basic_value_absolute = 5mm


// loading values for live load and wind load
var f_g = 150N/m2
var f_q = 750N/m2
var f_w = 500N/m2

// helper function to get a list of member ids based on an list of offsets
function getMembersByOffset(offsets)
{
    var member_ids = []
    for (var i = 0; i < number_of_frames; i++)
    {
        for (var j = 0; j < offsets.length; j++)
        {
            member_ids.push(offsets[j] + i * 8)
        }
    }
    return member_ids.toString()
}

// LC2: live load, create member loads and nodal loads
var live_load = MemberLoad(undefined, lc2, getMembersByOffset([3, 4]))
live_load.magnitude = f_q * frame_length

var node_ids = []
for (var i = 0; i < number_of_frames; i++)
{
    node_ids = node_ids.concat([8 + i * 9, 9 + i * 9])
}
var nodal_load = NodalLoad(undefined, lc2, node_ids.toString())
nodal_load.load_type = nodal_loads.LOAD_TYPE_COMPONENTS
nodal_load.components_force = $V(0, 0, 10000)

// LC3: wind load
var wind_load = MemberLoad(undefined, lc3, getMembersByOffset([1, 2, 5, 8]))
wind_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE
wind_load.magnitude = f_w * frame_length

// LC4: wind load
wind_load = MemberLoad(undefined, lc4, "3,4")
wind_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE
wind_load.magnitude = f_w * width / 2

wind_load = MemberLoad(undefined, lc4, getMembersByOffset([1, 2, 3, 4, 5, 8]))
wind_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE
wind_load.magnitude = f_w * 0.015

// LC7: other permanent load
var member_load = MemberLoad(undefined, lc7, getMembersByOffset([3, 4]))
member_load.magnitude = f_g * frame_length
