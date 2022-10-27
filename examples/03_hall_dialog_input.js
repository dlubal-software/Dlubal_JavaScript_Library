run("../includes/Tools/clearAll.js");
// setup standard for combination wizard
general.current_standard_for_combination_wizard = general.NATIONAL_ANNEX_AND_EDITION_EN_1990_DIN_2012_08;

// setup required addons
STRUCTURE_STABILITY.setActive(true);
applyChanges();

// definition of frame geometry
var columns_height = 3.0;
var gable_height = 1.5;
var console_height = 2.5;
var console_length = 0.3;
// setup load cases
var SASGeometricallyLinear = new StaticAnalysisSettings().GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings().SecondOrder(2,"MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");

var lc1 = new LoadCase().StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc2 = new LoadCase().StaticAnalysis(2, "Live load", SASSecondOrder.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H", [false, 0, 0, 1.0]);
var lc3 = new LoadCase().StaticAnalysis(3, "Wind load", SASSecondOrder.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_WIND_QW", [false, 0, 0, 1.0]);
var lc4 = new LoadCase().StaticAnalysis(4, "Wind load 2", SASSecondOrder.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_WIND_QW", [false, 0, 0, 1.0]);
var lc5 = new LoadCase().StaticAnalysis(5, "Stability - linear", SASGeometricallyLinear.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_PERMANENT_IMPOSED_GQ", [true, 0, 0, 1.0],1);
var lc6 = new LoadCase().StaticAnalysis(6, "Imperfections", SASSecondOrder.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_PERMANENT_IMPOSED_GQ", [false, 0, 0, 1.0]);
var lc7 = new LoadCase().StaticAnalysis(7, "Other permanent load", SASSecondOrder.GetStaticAnalysisSettingsNo(), "ACTION_CATEGORY_PERMANENT_G", [false, 0, 0, 1.0]);
ImperfectionCase(1, "Local Imperfections Only");
lc6.ConsiderImperfection(1);


// prepare materials and sections
var material = Material(undefined, 'S235');
var section_HEB = Section(undefined, 'HEB 220', material.No());
var section_IPE240 = Section(undefined, 'IPE 240', material.No());
var section_IPE100 = Section(undefined, 'IPE 100', material.No());
var section_L = Section(undefined, 'L 20x20x3', material.No());

// create topology, first we generate all nodes
for (var i = 0; i < number_of_frames; i++) {
    var dy = frame_length * i;
    Node(undefined, 0, dy, 0);
    Node(undefined, 0, dy, -console_height);
    Node(undefined, 0, dy, -columns_height);
    Node(undefined, width / 2, dy, -console_height - gable_height);
    Node(undefined, width, dy, -columns_height);
    Node(undefined, width, dy, -console_height);
    Node(undefined, width, dy, 0);
    Node(undefined, console_length, dy, -console_height);
    Node(undefined, width - console_length, dy, -console_height);
}

// Create nodal support
var support = new NodalSupport();
support.Hinged();
// assign nodal support to all nodes that have coordinate Z == 0
for (var i = 1; i <= nodes.count(); i++) {
    if (nodes[i].global_coordinate_3 == 0) {
        nodes[i].support = support.GetNo();
    }
}

var member_parameters_heb = { "section_start": section_HEB };
var member_parameters_ipe240 = { "section_start": section_IPE240 };
var member_parameters_ipe100 = { "section_start": section_IPE100 };

// create members for the frames
for (var i = 0; i < number_of_frames; i++) {
    var offset = i * 9;
    Member(undefined, [1 + offset, 2 + offset], "", member_parameters_heb);
    Member(undefined, [2 + offset, 3 + offset], "", member_parameters_heb);
    Member(undefined, [3 + offset, 4 + offset], "", member_parameters_ipe240);
    Member(undefined, [4 + offset, 5 + offset], "", member_parameters_ipe240);
    Member(undefined, [5 + offset, 6 + offset], "", member_parameters_heb);
    Member(undefined, [2 + offset, 8 + offset], "", member_parameters_ipe240);
    Member(undefined, [6 + offset, 9 + offset], "", member_parameters_ipe240);
    Member(undefined, [6 + offset, 7 + offset], "", member_parameters_heb);
}

// create longitudinal beams to connect the frames
for (var i = 1; i < number_of_frames; i++) {
    var offset = (i - 1) * 9;
    Member(undefined, [2 + offset, 11 + offset], "", member_parameters_ipe100);
    Member(undefined, [6 + offset, 15 + offset], "", member_parameters_ipe100);
    Member(undefined, [4 + offset, 13 + offset], "", member_parameters_ipe100);
    Member(undefined, [5 + offset, 14 + offset], "", member_parameters_ipe100);
    Member(undefined, [3 + offset, 12 + offset], "", member_parameters_ipe100);
}

// create members for the bracing system
var bracing_member_params =
{
    "type": members.TYPE_TENSION,
    "section_start": section_L
};
Member(undefined, [7, 14], "", bracing_member_params);
Member(undefined, [5, 16], "", bracing_member_params);
Member(undefined, [5, 13], "", bracing_member_params);
Member(undefined, [14, 4], "", bracing_member_params);
Member(undefined, [13, 3], "", bracing_member_params);
Member(undefined, [2, 4], "", bracing_member_params);
Member(undefined, [1, 12], "", bracing_member_params);
Member(undefined, [3, 10], "", bracing_member_params);

// create member imperfections
var imperfection = MemberImperfection(undefined, 1);
imperfection.members = "1,9,17,25,33";
imperfection.basic_value_absolute = 5mm;

// loading values for live load and wind load
var f_g = 150N/m2;
var f_q = 750N/m2;
var f_w = 500N/m2;

// helper function to get a list of member ids based on an list of offsets
function getMembersByOffset(offsets) {
    var member_ids = [];
    for (var i = 0; i < number_of_frames; i++) {
        for (var j = 0; j < offsets.length; j++) {
            member_ids.push(offsets[j] + i * 8);
        }
    }
    return member_ids.toString();
};

// LC2: live load, create member loads and nodal loads
var live_load = MemberLoad(undefined, lc2.GetLoadCase(), getMembersByOffset([3, 4]));
live_load.magnitude = f_q * frame_length;

var node_ids = [];
for (var i = 0; i < number_of_frames; i++) {
    node_ids = node_ids.concat([8 + i * 9, 9 + i * 9]);
}
var nodal_load = NodalLoad(undefined, lc2.GetLoadCase(), node_ids.toString());
nodal_load.load_type = nodal_loads.LOAD_TYPE_COMPONENTS;
nodal_load.components_force = $V(0, 0, 10000);

// LC3: wind load
var wind_load = MemberLoad(undefined, lc3.GetLoadCase(), getMembersByOffset([1, 2, 5, 8]));
wind_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE;
wind_load.magnitude = f_w * frame_length;

// LC4: wind load
wind_load = MemberLoad(undefined, lc4.GetLoadCase(), "3,4");
wind_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE;
wind_load.magnitude = f_w * width / 2;

wind_load = MemberLoad(undefined, lc4.GetLoadCase(), getMembersByOffset([1, 2, 3, 4, 5, 8]));
wind_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE;
wind_load.magnitude = f_w * 0.015;

// LC7: other permanent load
var member_load = MemberLoad(undefined, lc7.GetLoadCase(), getMembersByOffset([3, 4]));
member_load.magnitude = f_g * frame_length;

