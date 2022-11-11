if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

run("../includes/tools/clearAll.js");

// setup standard for combination wizard
general.current_standard_for_combination_wizard = general.NATIONAL_ANNEX_AND_EDITION_EN_1990_DIN_2012_08;

// prepare materials, sections and thickness for the model
var materialSteel = new Material(1, "S235");
var materialConcrete = new Material(2, "C20/25");

var sectionParams = { "shear_stiffness_deactivated": true };
var sectionIPE240 = new Section(undefined, "IPE 240", materialSteel.GetNo(), "", sectionParams);
var sectionIPE180 = new Section(undefined, "IPE 180", materialSteel.GetNo(), "", sectionParams);

var thickness = new Thickness();
thickness.Uniform(1, "thickness", materialConcrete.GetNo(), 0.120);


var nodalSupport = new NodalSupport(1);
nodalSupport.Hinged();

var lineSupport = new LineSupport();
lineSupport.Hinged();

var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeAndAbsolute(1, undefined, undefined, "SECTION_ALIGNMENT_RIGHT_TOP");


// create geometry of the model
Node(1, 0, 0, -4);
Node(2, 9.5, 0, -4);
Node(3, 9.5, 6, -4);
Node(4, 0, 6, -4);
Node(6, 5, 2, -4);
Node(7, 7, 2, -4);
Node(8, 7, 4, -4);
Node(9, 5, 4, -4);
Node(10, 0, 6, 0);
Node(11, 0, 0, 0);
Node(12, 6, 6, -4);
Node(13, 9.5, 0, 0);
Node(14, 9.5, 6, 0);
Node(16, 6, 6, 0, "", { "support": nodalSupport.GetNo() });
Node(17, 0, 5, -3);
Node(18, 0, 3, -3.52);
Node(19, 0, 1, -3);
Node(20, 0, 5.456, 0);
Node(21, 0, 0.588, 0);

new Line(1, "1,2");
var supportedLine2 = new Line();
supportedLine2.Polyline(2, [11,13]);
supportedLine2.Supports(lineSupport.GetNo());
new Line(3, "12,3");
var member = new Member();
member.Beam(1, 3,  sectionIPE240.GetNo());
member.Eccentricities(1,1);
new Line(4, "4,1");
new Line(5, "17,20");
new Line(6, "2,3");
new Line(7, "6,7");
new Line(8, "7,8");
new Line(9, "8,9");
new Line(10, "9,6");
new Line(11, "4,10");
var supportedLine12 = new Line();
supportedLine12.Polyline(12, [10,20]);
supportedLine12.Supports(lineSupport.GetNo());
new Line(13, "11,1");
new Line(14, "2,13");
var linearc = new Line();
linearc.Arc(15, [17, 19], [0, 3, -3.520]);
new Line(16, "13,14", "", { "support": 1 });
new Line(17, "3,14");
new Line(18, "4,12");
var memberTwo = new Member();
memberTwo.Beam(2, 18,  sectionIPE240.GetNo());
memberTwo.Eccentricities(1,1);
new Line(19, "12,16");
var memberThree = new Member();
memberThree.Beam(3, 19,  sectionIPE180.GetNo());
new Line(20, "20,21");
new Line(21, "21,11", "", { "support": 1 });
new Line(22, "21,19");


var surfaceOne = new Surface();
surfaceOne.Standard(1,"4,13,21,20,12,11", thickness.GetNo());
var surfaceTwo = new Surface();
surfaceTwo.Standard(2,"6,14,16,17", thickness.GetNo());
var surfaceThree = new Surface();
surfaceThree.Standard(3,"2,14,1,13", thickness.GetNo());
var surfaceFour = new Surface();
surfaceFour.Standard(4, "1,6,3,18,4", thickness.GetNo());

var openingOne = new Opening(1, "5,15,22,20");
var openingTwo = new Opening(2, "7-10");

var lineMeshRefinement = new LineMeshRefinement(1, "Mesh Refinement 1", [4]);
lineMeshRefinement.TargetFELength(0.1m);

var surfaceMeshRefinment = new SurfaceMeshRefinement(1,[3], 0.8m);

// create load cases with loads and combinations
// setup load cases
var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings();
SASSecondOrder.SecondOrder(2,"MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");
var lc1 = new LoadCase();
lc1.StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
var lc2 = new LoadCase();
lc2.StaticAnalysis(2, "Live load", SASSecondOrder.GetNo(), "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H", [false, 0, 0, 1.0]);
var designSituation = new DesignSituation(undefined, "DESIGN_SITUATION_TYPE_EQU_PERMANENT_AND_TRANSIENT");
var co1 = new LoadCombination(undefined,SASGeometricallyLinear.GetNo(),designSituation.GetNo(),[[lc1.GetNo(),1.35], [lc2.GetNo(),1.5]]);

var surfLoad =  new SurfaceLoad();
surfLoad.Force(1, lc2.GetLoadCase(), [4], "Uniform", [750]);
var nodalLoad = new NodalLoad();
nodalLoad.Components(1, lc2.GetLoadCase(), [12],[1kN, 2kN, 3kN],[0,0,0] );
var lineLoad = new LineLoad();
lineLoad.Force(undefined, lc2.GetLoadCase(), [15], "Uniform", [1.25kN/m^2]);
var memberLoad = new MemberLoad();
memberLoad.Force(1, lc2.GetLoadCase(), [1,2], "Uniform", [1.25kN/m^2]);

load_cases_and_combinations.result_combinations_active = true;
var rc1 = ResultCombination(1);
rc1.design_situation = 1;
rc1.items[1].case_object_item = load_combinations[1];
rc1.items[1].case_object_factor = 1.0;
