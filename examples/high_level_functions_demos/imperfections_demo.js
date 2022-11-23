run("../includes/Tools/clearAll.js");

var t1 = new Date().getTime();

var node = new Node(undefined, 1, 1, 0);

var staticAnalysis = new StaticAnalysisSettings();
staticAnalysis.GeometricallyLinear(1, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var lc = new LoadCase();
lc.StaticAnalysis(1, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc2 = new LoadCase();
lc2.StaticAnalysis(2, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc3 = new LoadCase();
lc3.StaticAnalysis(3, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc4 = new LoadCase();
lc4.StaticAnalysis(4, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_NONE_NONE", [true, 0, 0, 1.0]);
var lc5 = new LoadCase();
lc5.StaticAnalysis(5, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc6 = new LoadCase();
lc6.StaticAnalysis(6, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc7 = new LoadCase();
lc7.StaticAnalysis(7, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc8 = new LoadCase();
lc8.StaticAnalysis(8, "Static analysis", staticAnalysis.Settings.no, "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var coordinate = new CoordinateSystem(coordinate_systems.count() + 1, coordinate_systems.TYPE_OFFSET_XYZ);
var node1 = new Node(undefined, 1, 5, 0);
var node2 = new Node(undefined, 3, 5, 0);
var material = new Material(undefined, "S235");
var section = new Section(undefined, "IPE 80", material.No());
var thickness = new Thickness;
thickness.Uniform(1, "Thickness", material.No(), [0.250])
var member = new Member();
member.Beam(undefined, [node1.no, node2.no], section.No());

include("../includes/Tools/high_level_functions_support.js");
var nodesForMembers = createNodesGrid(1, 8, [8, 1], [3, 0]);

var member2 = new Member;
var members_list = [];

for (var i = 0; i < nodesForMembers.length - 1; ++i) {
    members_list.push(member2.Beam(undefined, [nodesForMembers[i], nodesForMembers[i + 1]], section.No()));
}

var memberSet = new MemberSet;
memberSet.ContinuousMembers(undefined, members_list);

var nodesForSurfaces = createNodesGrid(1, 10, [8, 2], [3, 3]);
dictSurfaces = createSurfacesFromNodesGrid(nodesForSurfaces, [4, 1], surfaces.TYPE_STANDARD, thickness.No());
var surfaceList = Object.keys(dictSurfaces).map(function(key){
    return dictSurfaces[key][0];
});

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

/****************************************************** Imperfection cases ***************************************************************/
var imperfection_case = new ImperfectionCase();
imperfection_case.LocalImperfection(undefined, [lc.GetLoadCaseNo()], undefined, true, "Imperfection case comment");
var localIC = imperfection_case.GetNo();
imperfection_case.Notional(undefined, [lc2.GetLoadCaseNo()], lc4.GetLoadCaseNo(), undefined, true, "Imperfection case Notional comment");
// With global coordination system
imperfection_case.InitialSway(undefined, [lc3.GetLoadCaseNo()], [[1.0], [2.0, 2.5, -2.6, "Only one comment"], [3.0, 1.5, -1.5]], 1, "GLOBAL_IN_X", "DIRECTION_YZ");
// With user defined coordination system
imperfection_case.InitialSway(undefined, [lc5.GetLoadCaseNo()], [[1.0], [5.0, 3.5, "Only one comment"], [6.0, -2.5]], 2, "USER_DEFINED_IN_V", "DIRECTION_W");
imperfection_case.StaticDeformation(undefined, [lc6.GetLoadCaseNo()], "LOAD_CASE", lc7.GetLoadCaseNo(), 1.5, "SPECIFIC_NODE", node.no, "USER_DEFINED_IN_V");
imperfection_case.GroupOfImperfection(undefined, [lc7.GetLoadCaseNo()], [[lc3.GetLoadCaseNo(), 3.0, "Comment 1"]], false);
var coordinate_system = new CoordinateSystem();
coordinate_system.Offset(undefined, [1.0, 2.0, 3.0]);

/****************************************************** Member imperfections *************************************************************/
var member_imperfection = new MemberImperfection();
member_imperfection.InitialSway(undefined, localIC, [member.No()], "PRINCIPAL", "V_NEGATIVE");
member_imperfection.Relative(1.5);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.Absolute(0.05);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.EN_1992_1(10, 2.5, 3, true);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.EN_1993_1_1(20, 3.5, 5);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.EN_1995_1_1(30);    // With default height
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.ANSI_CURRENT(0.005, "ASD");
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.ANSI_GRAVITY_LOAD(lc8.GetLoadCaseNo(), 0.006, "ASD");
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.CSA_CURRENT(0.02);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.CSA_GRAVITY_LOAD(lc7.GetLoadCaseNo(), 0.03);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.GB_50017_2017_CURRENT(0.03, 1.5, 4);
member_imperfection.InitialSway(undefined, localIC, [member.No()]);
member_imperfection.GB_50017_2017_GRAVITY_LOAD(lc6.GetLoadCaseNo(), 0.09, 3);
member_imperfection.InitialBow(undefined, localIC, [member.No()], coordinate_system.no);
member_imperfection.Relative(1.5);
member_imperfection.InitialBow(undefined, localIC, [member.No()], coordinate_system.no);
member_imperfection.Absolute(0.25);
member_imperfection.InitialBow(undefined, localIC, [member.No()]);
member_imperfection.InitialBow_EN_1993_1_1("PLASTIC");
member_imperfection.InitialBow(undefined, localIC, [member.No()], "LOCAL", "LOCAL_Y_NEGATIVE");
member_imperfection.EN_1995_1_1(30);
member_imperfection.InitialBow(undefined, localIC, [member.No()], "LOCAL", "LOCAL_Z_NEGATIVE");
member_imperfection.EN_1999_1_1();  // With PLASTIC default design type
member_imperfection.InitialBow(undefined, localIC, [member.No()]);
member_imperfection.InitialBow_ANSI_CURRENT(0.005);
member_imperfection.InitialBow(undefined, localIC, [member.No()]);
member_imperfection.InitialBow_ANSI_GRAVITY_LOAD(lc6.GetLoadCaseNo(), 0.95);
member_imperfection.InitialBow(undefined, localIC, [member.No()], "LOCAL", "LOCAL_Z_NEGATIVE", undefined, "Comment1");
member_imperfection.CSA_CURRENT(1250);
member_imperfection.InitialBow(undefined, localIC, [member.No()]);
member_imperfection.CSA_GRAVITY_LOAD(lc7.GetLoadCaseNo(), 0.03);
//member_imperfection.InitialBow(undefined, localIC, [member.No()]);
//member_imperfection.GB_50017_2017(0); Bug?
member_imperfection.InitialBowAndCriterion(undefined, localIC, [member.No()], "PRINCIPAL", "V_NEGATIVE");
member_imperfection.Relative(1.5, "DIN_18800");
member_imperfection.InitialBowAndCriterion(undefined, localIC, [member.No()], "PRINCIPAL", "V_NEGATIVE");
member_imperfection.Relative(1.5, "DEFINE", 2.5);
member_imperfection.InitialBowAndCriterion(undefined, localIC, [member.No()], "PRINCIPAL", "V_NEGATIVE", true);  // With reference to list of members
member_imperfection.Absolute(0.5, "EN_1993");

/****************************************************** Member set imperfections *************************************************************/
var member_set_imperfection = new MemberSetImperfection();
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()], "PRINCIPAL", "V_NEGATIVE");
member_set_imperfection.Relative(1.5);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.Absolute(0.05);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.EN_1992_1(10, 2.5, 3, true);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.EN_1993_1_1(20, 3.5, 5);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.EN_1995_1_1(30);    // With default height
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.ANSI_CURRENT(0.005, "ASD");
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.ANSI_GRAVITY_LOAD(lc8.GetLoadCaseNo(), 0.006, "ASD");
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.CSA_CURRENT(0.02);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.CSA_GRAVITY_LOAD(lc7.GetLoadCaseNo(), 0.03);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.GB_50017_2017_CURRENT(0.03, 1.5, 4);
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.No()]);
member_set_imperfection.GB_50017_2017_GRAVITY_LOAD(lc6.GetLoadCaseNo(), 0.09, 3);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()], coordinate_system.no);
member_set_imperfection.Relative(1.5);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()], coordinate_system.no);
member_set_imperfection.Absolute(0.25);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()]);
member_set_imperfection.InitialBow_EN_1993_1_1("PLASTIC");
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()], "LOCAL", "LOCAL_Y_NEGATIVE");
member_set_imperfection.EN_1995_1_1(30);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()], "LOCAL", "LOCAL_Z_NEGATIVE");
member_set_imperfection.EN_1999_1_1();  // With PLASTIC default design type
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()]);
member_set_imperfection.InitialBow_ANSI_CURRENT(0.005);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()]);
member_set_imperfection.InitialBow_ANSI_GRAVITY_LOAD(lc6.GetLoadCaseNo(), 0.95);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()], "LOCAL", "LOCAL_Z_NEGATIVE", "Comment1");
member_set_imperfection.CSA_CURRENT(1250);
member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()]);
member_set_imperfection.CSA_GRAVITY_LOAD(lc7.GetLoadCaseNo(), 0.03);
///member_set_imperfection.InitialBow(undefined, localIC, [memberSet.No()]);
//member_set_imperfection.GB_50017_2017(0); Bug?
member_set_imperfection.InitialBowAndCriterion(undefined, localIC, [memberSet.No()], "PRINCIPAL", "V_NEGATIVE");
member_set_imperfection.Relative(1.5, "DIN_18800");
member_set_imperfection.InitialBowAndCriterion(undefined, localIC, [memberSet.No()], "PRINCIPAL", "V_NEGATIVE");
member_set_imperfection.Relative(1.5, "DEFINE", 2.5);
member_set_imperfection.InitialBowAndCriterion(undefined, localIC, [memberSet.No()], "PRINCIPAL", "V_NEGATIVE", true);  // With reference to list of members
member_set_imperfection.Absolute(0.5, "EN_1993");

/****************************************************** Surface imperfections *************************************************************/


var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");