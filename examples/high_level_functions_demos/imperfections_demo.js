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
var section = new Section(undefined, "IPE 80", material.GetNo());
var member = new Member();
member.Beam(undefined, [node1.no, node2.no], section.GetNo());

include("../includes/Tools/high_level_functions_support.js");
var nodesForMembers = createNodesGrid(1, 8, [8, 1], [3, 0]);

var member2 = new Member();
var members_list = [];

for (var i = 0; i < nodesForMembers.length - 1; ++i) {
    members_list.push(member2.Beam(undefined, [nodesForMembers[i], nodesForMembers[i + 1]], section.GetNo()));
}

var memberSet = new MemberSet();
memberSet.ContinuousMembers(undefined, members_list);

if (RFEM) {
    var thickness = new Thickness();
    thickness.Uniform(1, "Thickness", material.GetNo(), 0.250);

    var nodesForSurfaces = createNodesGrid(1, 10, [6, 2], [3, 3]);
    dictSurfaces = createSurfacesFromNodesGrid(nodesForSurfaces, [3, 1], surfaces.TYPE_STANDARD, thickness.GetNo());
    var surfaceList = Object.keys(dictSurfaces).map(function(key){
        return dictSurfaces[key][0];
    });

    var surfaceSet = new SurfaceSet();
    surfaceSet.ContinuousSurfaces(undefined, [surfaceList[2].no]);
}

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

/****************************************************** Imperfection cases ***************************************************************/
var imperfection_case = new ImperfectionCase();
imperfection_case.LocalImperfection(undefined, [lc.GetNo()], undefined, true, "Imperfection case comment");
var localIC = imperfection_case.GetNo();
imperfection_case.Notional(undefined, [lc2.GetNo()], lc4.GetNo(), undefined, true, "Imperfection case Notional comment");
// With global coordination system
imperfection_case.InitialSway(undefined, [lc3.GetNo()], [[1.0], [2.0, 2.5, -2.6, "Only one comment"], [3.0, 1.5, -1.5]], 1, "GLOBAL_IN_X", "DIRECTION_YZ");
// With user defined coordination system
imperfection_case.InitialSway(undefined, [lc5.GetNo()], [[1.0], [5.0, 3.5, "Only one comment"], [6.0, -2.5]], 2, "USER_DEFINED_IN_V", "DIRECTION_W");
imperfection_case.StaticDeformation(undefined, [lc6.GetNo()], "LOAD_CASE", lc7.GetNo(), 1.5, "SPECIFIC_NODE", node.no, "USER_DEFINED_IN_V");
imperfection_case.GroupOfImperfection(undefined, [lc7.GetNo()], [[lc3.GetNo(), 3.0, "Comment 1"]], false);
var coordinate_system = new CoordinateSystem();
coordinate_system.Offset(undefined, [1.0, 2.0, 3.0]);

/****************************************************** Member imperfections *************************************************************/
var member_imperfection = new MemberImperfection();
member_imperfection.InitialSway(undefined, localIC, [member.GetNo()], "PRINCIPAL", "V_NEGATIVE");
member_imperfection.Relative(1.5);
var member_imperfection2 = new MemberImperfection();
member_imperfection2.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection2.Absolute(0.05);
var member_imperfection3 = new MemberImperfection();
member_imperfection3.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection3.EN_1992_1(10, 2.5, 3, true);
var member_imperfection4 = new MemberImperfection();
member_imperfection4.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection4.EN_1993_1_1(20, 3.5, 5);
var member_imperfection5 = new MemberImperfection();
member_imperfection5.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection5.EN_1995_1_1(30);    // With default height
var member_imperfection6 = new MemberImperfection();
member_imperfection6.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection6.ANSI_CURRENT(0.005, "ASD");
var member_imperfection7 = new MemberImperfection();
member_imperfection7.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection7.ANSI_GRAVITY_LOAD(lc8.GetNo(), 0.006, "ASD");
var member_imperfection8 = new MemberImperfection();
member_imperfection8.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection8.CSA_CURRENT(0.02);
var member_imperfection9 = new MemberImperfection();
member_imperfection9.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection9.CSA_GRAVITY_LOAD(lc7.GetNo(), 0.03);
var member_imperfection10 = new MemberImperfection();
member_imperfection10.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection10.GB_50017_2017_CURRENT(0.03, 1.5, 4);
var member_imperfection11 = new MemberImperfection();
member_imperfection11.InitialSway(undefined, localIC, [member.GetNo()]);
member_imperfection11.GB_50017_2017_GRAVITY_LOAD(lc6.GetNo(), 0.09, 3);
var member_imperfection12 = new MemberImperfection();
member_imperfection12.InitialBow(undefined, localIC, [member.GetNo()], coordinate_system.no);
member_imperfection12.Relative(1.5);
var member_imperfection13 = new MemberImperfection();
member_imperfection13.InitialBow(undefined, localIC, [member.GetNo()], coordinate_system.no);
member_imperfection13.Absolute(0.25);
var member_imperfection14 = new MemberImperfection();
member_imperfection14.InitialBow(undefined, localIC, [member.GetNo()]);
member_imperfection14.InitialBow_EN_1993_1_1("PLASTIC");
var member_imperfection15 = new MemberImperfection();
member_imperfection15.InitialBow(undefined, localIC, [member.GetNo()], "LOCAL", "LOCAL_Y_NEGATIVE");
member_imperfection15.EN_1995_1_1(30);
var member_imperfection16 = new MemberImperfection();
member_imperfection16.InitialBow(undefined, localIC, [member.GetNo()], "LOCAL", "LOCAL_Z_NEGATIVE");
member_imperfection16.EN_1999_1_1();  // With PLASTIC default design type
var member_imperfection17 = new MemberImperfection();
member_imperfection17.InitialBow(undefined, localIC, [member.GetNo()]);
member_imperfection17.InitialBow_ANSI_CURRENT(0.005);
var member_imperfection18 = new MemberImperfection();
member_imperfection18.InitialBow(undefined, localIC, [member.GetNo()]);
member_imperfection18.InitialBow_ANSI_GRAVITY_LOAD(lc6.GetNo(), 0.95);
var member_imperfection19 = new MemberImperfection();
member_imperfection19.InitialBow(undefined, localIC, [member.GetNo()], "LOCAL", "LOCAL_Z_NEGATIVE", undefined, "Comment1");
member_imperfection19.CSA_CURRENT(1250);
var member_imperfection20 = new MemberImperfection();
member_imperfection20.InitialBow(undefined, localIC, [member.GetNo()]);
member_imperfection20.CSA_GRAVITY_LOAD(lc7.GetNo(), 0.03);
//var member_imperfection21 = new MemberImperfection();
//member_imperfection21.InitialBow(undefined, localIC, [member.No()]);
//member_imperfection21.GB_50017_2017(0); Bug?
var member_imperfection22 = new MemberImperfection();
member_imperfection22.InitialBowAndCriterion(undefined, localIC, [member.GetNo()], "PRINCIPAL", "V_NEGATIVE");
member_imperfection22.Relative(1.5, "DIN_18800");
var member_imperfection23 = new MemberImperfection();
member_imperfection23.InitialBowAndCriterion(undefined, localIC, [member.GetNo()], "PRINCIPAL", "V_NEGATIVE");
member_imperfection23.Relative(1.5, "DEFINE", 2.5);
var member_imperfection24 = new MemberImperfection();
member_imperfection24.InitialBowAndCriterion(undefined, localIC, [member.GetNo()], "PRINCIPAL", "V_NEGATIVE", true);  // With reference to list of members
member_imperfection24.Absolute(0.5, "EN_1993");

/****************************************************** Member set imperfections *************************************************************/
var member_set_imperfection = new MemberSetImperfection();
member_set_imperfection.InitialSway(undefined, localIC, [memberSet.GetNo()], "PRINCIPAL", "V_NEGATIVE");
member_set_imperfection.Relative(1.5);
var member_set_imperfection2 = new MemberSetImperfection();
member_set_imperfection2.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection2.Absolute(0.05);
var member_set_imperfection3 = new MemberSetImperfection();
member_set_imperfection3.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection3.EN_1992_1(10, 2.5, 3, true);
var member_set_imperfection4 = new MemberSetImperfection();
member_set_imperfection4.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection4.EN_1993_1_1(20, 3.5, 5);
var member_set_imperfection5 = new MemberSetImperfection();
member_set_imperfection5.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection5.EN_1995_1_1(30);    // With default height
var member_set_imperfection6 = new MemberSetImperfection();
member_set_imperfection6.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection6.ANSI_CURRENT(0.005, "ASD");
var member_set_imperfection7 = new MemberSetImperfection();
member_set_imperfection7.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection7.ANSI_GRAVITY_LOAD(lc8.GetNo(), 0.006, "ASD");
var member_set_imperfection8 = new MemberSetImperfection();
member_set_imperfection8.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection8.CSA_CURRENT(0.02);
var member_set_imperfection9 = new MemberSetImperfection();
member_set_imperfection9.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection9.CSA_GRAVITY_LOAD(lc7.GetNo(), 0.03);
var member_set_imperfection10 = new MemberSetImperfection();
member_set_imperfection10.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection10.GB_50017_2017_CURRENT(0.03, 1.5, 4);
var member_set_imperfection11 = new MemberSetImperfection();
member_set_imperfection11.InitialSway(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection11.GB_50017_2017_GRAVITY_LOAD(lc6.GetNo(), 0.09, 3);
var member_set_imperfection12 = new MemberSetImperfection();
member_set_imperfection12.InitialBow(undefined, localIC, [memberSet.GetNo()], coordinate_system.no);
member_set_imperfection12.Relative(1.5);
var member_set_imperfection13 = new MemberSetImperfection();
member_set_imperfection13.InitialBow(undefined, localIC, [memberSet.GetNo()], coordinate_system.no);
member_set_imperfection13.Absolute(0.25);
var member_set_imperfection14 = new MemberSetImperfection();
member_set_imperfection14.InitialBow(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection14.InitialBow_EN_1993_1_1("PLASTIC");
var member_set_imperfection15 = new MemberSetImperfection();
member_set_imperfection15.InitialBow(undefined, localIC, [memberSet.GetNo()], "LOCAL", "LOCAL_Y_NEGATIVE");
member_set_imperfection15.EN_1995_1_1(30);
var member_set_imperfection16 = new MemberSetImperfection();
member_set_imperfection16.InitialBow(undefined, localIC, [memberSet.GetNo()], "LOCAL", "LOCAL_Z_NEGATIVE");
member_set_imperfection16.EN_1999_1_1();  // With PLASTIC default design typeof
var member_set_imperfection17 = new MemberSetImperfection();
member_set_imperfection17.InitialBow(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection17.InitialBow_ANSI_CURRENT(0.005);
var member_set_imperfection18 = new MemberSetImperfection();
member_set_imperfection18.InitialBow(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection18.InitialBow_ANSI_GRAVITY_LOAD(lc6.GetNo(), 0.95);
var member_set_imperfection19 = new MemberSetImperfection();
member_set_imperfection19.InitialBow(undefined, localIC, [memberSet.GetNo()], "LOCAL", "LOCAL_Z_NEGATIVE", "Comment1");
member_set_imperfection19.CSA_CURRENT(1250);
var member_set_imperfection20 = new MemberSetImperfection();
member_set_imperfection20.InitialBow(undefined, localIC, [memberSet.GetNo()]);
member_set_imperfection20.CSA_GRAVITY_LOAD(lc7.GetNo(), 0.03);
//var member_set_imperfection21 = new MemberSetImperfection();
///member_set_imperfection21.InitialBow(undefined, localIC, [memberSet.No()]);
//member_set_imperfection21.GB_50017_2017(0); Bug?
var member_set_imperfection22 = new MemberSetImperfection();
member_set_imperfection22.InitialBowAndCriterion(undefined, localIC, [memberSet.GetNo()], "PRINCIPAL", "V_NEGATIVE");
member_set_imperfection22.Relative(1.5, "DIN_18800");
var member_set_imperfection23 = new MemberSetImperfection();
member_set_imperfection23.InitialBowAndCriterion(undefined, localIC, [memberSet.GetNo()], "PRINCIPAL", "V_NEGATIVE");
member_set_imperfection23.Relative(1.5, "DEFINE", 2.5);
var member_set_imperfection24 = new MemberSetImperfection();
member_set_imperfection24.InitialBowAndCriterion(undefined, localIC, [memberSet.GetNo()], "PRINCIPAL", "V_NEGATIVE", true);  // With reference to list of members
member_set_imperfection24.Absolute(0.5, "EN_1993");

if (RFEM) {
    /****************************************************** Surface imperfections *************************************************************/
    var surfaceImperfection = new SurfaceImperfection();
    surfaceImperfection.Relative(undefined, localIC, [surfaceList[0].no], 2, 300, "LOCAL_Z_NEGATIVE");
    surfaceImperfection.Absolute(undefined, localIC, [surfaceList[1].no], 3, "LOCAL_Z_NEGATIVE");

    /****************************************************** Surface set imperfections *********************************************************/
    var surfaceSetImperfection = new SurfaceSetImperfection();
    surfaceSetImperfection.Relative(undefined, localIC, [surfaceSet.GetNo()], 2, 300);
    surfaceSetImperfection.Absolute(undefined, localIC, [surfaceSet.GetNo()], 3);
}

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
