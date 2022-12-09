run("../includes/tools/clearAll.js");
// setup standard for combination wizard
general.current_standard_for_combination_wizard = general.NATIONAL_ANNEX_AND_EDITION_EN_1990_DIN_2012_08;

// setup required addons
STRUCTURE_STABILITY.setActive(true);
applyChanges();

// definition of frame geometry
var columnsHeight = 3.0;
var gableHeight = 1.5;
var consoleHeight = 2.5;
var consoleLength = 0.3;
var frameLength = 5.0;

// setup load cases
var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings();
SASSecondOrder.SecondOrder(2,"MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");

var lc1 = new LoadCase();
lc1.StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc2 = new LoadCase();
lc2.StaticAnalysis(2, "Live load", SASSecondOrder.GetNo(), "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H", [false, 0, 0, 1.0]);
var lc3 = new LoadCase();
lc3.StaticAnalysis(3, "Wind load", SASSecondOrder.GetNo(), "ACTION_CATEGORY_WIND_QW", [false, 0, 0, 1.0]);
var lc4 = new LoadCase();
lc4.StaticAnalysis(4, "Wind load 2", SASSecondOrder.GetNo(), "ACTION_CATEGORY_WIND_QW", [false, 0, 0, 1.0]);
var lc5 = new LoadCase();
lc5.StaticAnalysis(5, "Stability - linear", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_PERMANENT_IMPOSED_GQ", [true, 0, 0, 1.0],1);
var lc6 = new LoadCase();
lc6.StaticAnalysis(6, "Imperfections", SASSecondOrder.GetNo(), "ACTION_CATEGORY_PERMANENT_IMPOSED_GQ", [false, 0, 0, 1.0]);
var imperfection_case = new ImperfectionCase();
imperfection_case.LocalImperfection(undefined, [lc6.GetNo()], undefined, true, "Imperfection case comment");
var lc7 = new LoadCase();
lc7.StaticAnalysis(7, "Other permanent load", SASSecondOrder.GetNo(), "ACTION_CATEGORY_PERMANENT_G", [false, 0, 0, 1.0]);


// prepare materials and sections
var material = new Material(1, 'S235');
var sectionHEB = new Section(2, 'HEB 220', material.GetNo());
var sectionIPE240 = new Section(3, 'IPE 240', material.GetNo());
var sectionIPE100 = new Section(4, 'IPE 100', material.GetNo());
var sectionL = new Section(5, 'L 20x20x3', material.GetNo());

// create topology, first we generate all nodes
for (var i = 0; i < numberOfFrames; i++) {
    var dy = frameLength * i;
    Node(undefined, 0, dy, 0);
    Node(undefined, 0, dy, -consoleHeight);
    Node(undefined, 0, dy, -columnsHeight);
    Node(undefined, width / 2, dy, -consoleHeight - gableHeight);
    Node(undefined, width, dy, -columnsHeight);
    Node(undefined, width, dy, -consoleHeight);
    Node(undefined, width, dy, 0);
    Node(undefined, consoleLength, dy, -consoleHeight);
    Node(undefined, width - consoleLength, dy, -consoleHeight);
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
var member_parameters_heb = { "section_start": sectionHEB.GetNo() };
var member_parameters_ipe240 = { "section_start": sectionIPE240.GetNo() };
var member_parameters_ipe100 = { "section_start": sectionIPE100.GetNo() };

// create members for the frames
var member = new Member();

for (var i = 0; i < numberOfFrames; i++) {
    var offset = i * 9;
    member.Beam(undefined,[1 + offset, 2 + offset] ,  sectionHEB.GetNo());
    member.Beam(undefined,[2 + offset, 3 + offset] ,  sectionHEB.GetNo());
    member.Beam(undefined,[3 + offset, 4 + offset] ,  sectionIPE240.GetNo());
    member.Beam(undefined,[4 + offset, 5 + offset] ,  sectionIPE240.GetNo());
    member.Beam(undefined,[5 + offset, 6 + offset] ,  sectionHEB.GetNo());
    member.Beam(undefined,[2 + offset, 8 + offset] ,  sectionIPE240.GetNo());
    member.Beam(undefined,[6 + offset, 9 + offset] ,  sectionIPE240.GetNo());
    member.Beam(undefined,[6 + offset, 7 + offset] ,  sectionHEB.GetNo());
}

// create longitudinal beams to connect the frames
for (var i = 1; i < numberOfFrames; i++) {
    var offset = (i - 1) * 9;
    member.Beam(undefined,[2 + offset, 11 + offset] ,  sectionIPE100.GetNo());
    member.Beam(undefined,[6 + offset, 15 + offset] ,  sectionIPE100.GetNo());
    member.Beam(undefined,[4 + offset, 13 + offset] ,  sectionIPE100.GetNo());
    member.Beam(undefined,[5 + offset, 14 + offset] ,  sectionIPE100.GetNo());
    member.Beam(undefined,[3 + offset, 12 + offset] ,  sectionIPE100.GetNo());

}

// create members for the bracing system
member.Tension(undefined,  [7, 14], sectionL.GetNo());
member.Tension(undefined,  [5, 16], sectionL.GetNo());
member.Tension(undefined,  [5, 13], sectionL.GetNo());
member.Tension(undefined,  [14, 4], sectionL.GetNo());
member.Tension(undefined,  [13, 3], sectionL.GetNo());
member.Tension(undefined,  [2, 4], sectionL.GetNo());
member.Tension(undefined,  [1, 12], sectionL.GetNo());
member.Tension(undefined,  [3, 10], sectionL.GetNo());


// create member imperfections
var member_imperfection = new MemberImperfection();
member_imperfection.InitialSway(undefined, imperfection_case.GetNo(), [1,9,17,25,33]);
member_imperfection.Absolute(0.05);


// loading values for live load and wind load
var f_g = 150N/m2;
var f_q = 750N/m2;
var f_w = 500N/m2;

// helper function to get a list of member ids based on an list of offsets
function getMembersByOffset(offsets) {
    var member_ids = [];
    for (var i = 0; i < numberOfFrames; i++) {
        for (var j = 0; j < offsets.length; j++) {
            member_ids.push(offsets[j] + i * 8);
        }
    }
    return member_ids.toString();
};

// LC2: live load, create member loads and nodal loads
var llMagnitude = f_q * frameLength;
var liveLoadMember = new MemberLoad();
liveLoadMember.Force(1, lc2.GetLoadCase(), getMembersByOffset([3, 4]) , "Uniform", [llMagnitude],member_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE);


var node_ids = [];
for (var i = 0; i < numberOfFrames; i++) {
    node_ids = node_ids.concat([8 + i * 9, 9 + i * 9]);
}
var liveLoadNodal = new NodalLoad();
liveLoadNodal.Components(1, lc2.GetLoadCase(), node_ids.toString(),[0, 0, 10000],[0,0,0] );


// LC3: wind load
var wlMLC3Magnitude = f_w * frameLength;
var windLoadMemberLC3 = new MemberLoad();
windLoadMemberLC3.Force(1, lc3.GetLoadCase(), getMembersByOffset([1, 2, 5, 8]),"Uniform",[wlMLC3Magnitude],member_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE);


// LC4: wind load
var wlLC4Magnitude = f_w * width / 2;
var windLoadMemberLC4 = new MemberLoad();
windLoadMemberLC4.Force(1, lc4.GetLoadCase(), "3,4","Uniform",[wlLC4Magnitude], member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE);

var wlLC4RestMagnitude = f_w * 0.015;
var windLoadMemberLC4Rest = new MemberLoad();
windLoadMemberLC4Rest.Force(2, lc4.GetLoadCase(), getMembersByOffset([1, 2, 3, 4, 5, 8]),"Uniform",[wlLC4RestMagnitude], member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE);

// LC7: other permanent load
var memberLoadLC7Magnitude = f_g * frameLength;
var memberLoadLC7 = new MemberLoad();
memberLoadLC7.Force(1, lc7.GetLoadCase(), getMembersByOffset([3, 4]),"Uniform",[memberLoadLC7Magnitude]);

