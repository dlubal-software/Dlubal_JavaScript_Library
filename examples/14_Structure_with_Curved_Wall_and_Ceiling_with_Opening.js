if (!RFEM) {
  throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("../includes/tools/clearAll.js");
include("../includes/Tools/global.js");
// var a = 7;                // Length
// var b = 6;                // Width
// var H = 4;                // Height
// var H_1 = 3;              // Height 1
// var H_2 = 3.9;            // Height 2
// var len = 2.5;            // Opening Length
// var w = 1;                // Opening Width
// var thickness_1 = 0.2;    // Thickness of roof and wall

// create material
var materialConcrete = new Material(1, 'C30/37');     // Concrete
var materialSteel = new Material(2, 'S235');       // Steel

// Create thickness
var thickness = new Thickness();
thickness.Uniform(1, "Roof and Wall", 1, thickness_1);

// Create section
var sectionConcreteColumn = new Section(1, 'CIRCLE_M1 0.300', materialConcrete.GetNo());
var sectionRib = new Section(2, 'R_M1 0.250/0.500', materialConcrete.GetNo());
var sectionSteelFrame = new Section(3, 'HE 300 A', materialSteel.GetNo());
var sectionSteelBeam = new Section(4, 'HE 260 A', materialSteel.GetNo());
var sectionBrace = new Section(5, 'L 80x80x8', materialSteel.GetNo());
sectionBrace.Rotation(degrees2Radians(90));

// Create Nodes
Node(1, 0, 0, 0);
Node(2, a, 0, 0);
Node(3, a, b, 0);
Node(4, 0, b, 0);
Node(5, 0, 0, -H);
Node(6, a, 0, -H);
Node(7, a, b, -H);
Node(8, 0, b, -H);
Node(9, 0, 0, -H - H_1);
Node(10, a, 0, -H - H_1);
Node(11, a, b, -H - H_2);
Node(12, 0, b, -H - H_2);

// Create Members
var mem = new Member();
mem.Beam(1, [1, 5], sectionConcreteColumn.GetNo());
mem.Beam(2, [4, 8], sectionConcreteColumn.GetNo());
mem.Beam(3, [8, 12], sectionSteelFrame.GetNo());
mem.Beam(4, [12, 9], sectionSteelFrame.GetNo());
mem.Beam(5, [5, 9], sectionSteelFrame.GetNo());
mem.Beam(6, [7, 11], sectionSteelFrame.GetNo());
mem.Beam(7, [11, 10], sectionSteelFrame.GetNo());
mem.Beam(8, [6, 10], sectionSteelFrame.GetNo());
mem.Beam(9, [9, 10], sectionSteelBeam.GetNo());
mem.Beam(10, [12, 11], sectionSteelBeam.GetNo());
mem.Beam(11, [5, 12], sectionBrace.GetNo());
mem.Beam(12, [9, 8], sectionBrace.GetNo());
mem.Beam(13, [6, 11], sectionBrace.GetNo());
mem.Beam(14, [10, 7], sectionBrace.GetNo());

// Create Lines
var l = new Line();
Line(15, [5, 6]);
Line(16, [5, 8]);
Line(17, [8, 7]);
Line(18, [7, 6]);
l.Arc(19, [7, 6], [a + b / 2, b / 2, -H]);
l.Arc(20, [3, 2], [a + b / 2, b / 2, 0]);
Line(21, [2, 6]);
Line(22, [3, 7]);

// Create Surfaces
var sur = new Surface();
sur.Standard(1,[15, 16, 17, 18], thickness.GetNo());
sur.Standard(2,[18, 19], thickness.GetNo());

var surface = new Surface();
surface.Quadrangle(4, [19, 21, 20, 22], "Standard", thickness.GetNo());


// Create Rib by Line
mem.Rib(23, 18, 2,"ALIGNMENT_ON_Z_SIDE_POSITIVE",true,true,[[1.0,"REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH","REFERENCE_LENGTH_WIDTH_SIXTH",3.0,3.0]]);
// Create Opening
l.RectangularPolygon(23, [a / 2, b / 2, -H], len, w, "XY");
Opening(1, [23]);

// Create hinge
var memberHinge = new MemberHinge();
memberHinge.Rotational(1, [4,7], [4,7], [false,0],[true,0],[true,0]);


// // Create eccentricity
var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeAndAbsolute(1, [9,10], [9,10], "SECTION_ALIGNMENT_RIGHT_TOP");


// Define Supports
var nodalSupport = new NodalSupport();
nodalSupport.Hinged();

var lineSupport = new LineSupport();
lineSupport.Hinged();

// Assign Supports
nodes[1].support = nodalSupport.GetNo();
nodes[4].support = nodalSupport.GetNo();
lines[20].support = lineSupport.GetNo();

var SASGeometricallyLinear = new StaticAnalysisSettings()
SASGeometricallyLinear.GeometricallyLinear(1, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var LCSW = new LoadCase();
LCSW.StaticAnalysis(1, "Static analysis", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A", [true, 0, 0, 1.0]);

