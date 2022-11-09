include("../includes/Tools/high_level_functions_support.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
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

var imperfection_case = new ImperfectionCase();
imperfection_case.LocalImperfection(undefined, [lc.GetLoadCaseNo()], undefined, true, "Imperfection case comment");
imperfection_case.Notional(undefined, [lc2.GetLoadCaseNo()], lc4.GetLoadCaseNo(), undefined, true, "Imperfection case Notional comment");
// With global coordination system
imperfection_case.InitialSway(undefined, [lc3.GetLoadCaseNo()], [[1.0], [2.0, 2.5, -2.6, "Only one comment"], [3.0, 1.5, -1.5]], 1, "GLOBAL_IN_X", "DIRECTION_YZ");
// With user defined coordination system
imperfection_case.InitialSway(undefined, [lc5.GetLoadCaseNo()], [[1.0], [5.0, 3.5, "Only one comment"], [6.0, -2.5]], 2, "USER_DEFINED_IN_V", "DIRECTION_W");
imperfection_case.StaticDeformation(undefined, [lc6.GetLoadCaseNo()], "LOAD_CASE", lc7.GetLoadCaseNo(), 1.5, "SPECIFIC_NODE", node.no, "USER_DEFINED_IN_V");
imperfection_case.GroupOfImperfection(undefined, [lc7.GetLoadCaseNo()], [[lc3.GetLoadCaseNo(), 3.0, "Comment 1"]], false);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");