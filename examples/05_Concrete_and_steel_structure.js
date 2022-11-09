if (!RFEM) {
  throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("../includes/tools/clearAll.js");
var a1 = 5;
var a2 = 5;
var b1 = 5;
var b2 = 5;
var H1 = 3;
var H2 = 3.5;
var thicknessRoof = 0.2;   // roof
var thicknessWall = 0.2;   // wall

// create material
var materialConcrete = new Material(1, 'C25/30');    // Concrete
var materialSteel = new Material(2, 'S235');               // Steel

// Create thickness
var thicknessRoof = new Thickness();
thicknessRoof.Uniform(1, "thickness", materialConcrete.GetNo(), Number(thicknessRoof));
var thicknessWall = new Thickness();
thicknessWall.Uniform(2, "Wall", 1, Number(thicknessWall));

// Create section
var concreteColumn = new Section(1, 'CIRCLE_M1 0.300', materialConcrete.GetNo());
var concreteRib = new Section(2, 'R_M1 0.3/0.400', materialConcrete.GetNo());
var steelFrame = new Section(3, 'HE 200 A', materialSteel.GetNo());
var steelBeams = new Section(4, 'IPE 200', materialSteel.GetNo());

// Create Nodes
Node(1, 0, 0, 0);
Node(2, a1, 0, 0);
Node(3, a1 + a2, 0, 0);
Node(4, 0, b1, 0);
Node(5, a1, b1, 0);
Node(6, a1 + a2, b1, 0);
Node(7, a1, b1 + b2, 0);
Node(8, a1 + a2, b1 + b2, 0);
Node(9, 0, 0, -H1);
Node(10, a1, 0, -H1);
Node(11, a1, 0, -H2);
Node(12, a1 + a2, 0, -H2);
Node(13, 0, b1, -H1);
Node(14, a1, b1, -H1);
Node(15, a1, b1, -H2);
Node(16, a1 + a2, b1, -H2);
Node(17, a1, b1 + b2, -H2);
Node(18, a1 + a2, b1 + b2, -H2);
var nod = new Node();
nod.BetweenTwoNodes(19, 15, 16, "", [true, 33.33]);
nod.BetweenTwoNodes(20, 15, 16, "", [true, 66.66]);
nod.BetweenTwoNodes(21, 17, 18, "", [true, 33.33]);
nod.BetweenTwoNodes(22, 17, 18, "", [true, 66.66]);

// Create lines
new Line(1, [1, 4]);
new Line(2, [1, 2]);
new Line(3, [1, 9]);
new Line(4, [4, 13]);
new Line(5, [2, 10]);
new Line(6, [5, 14]);
new Line(7, [10, 11]);
new Line(8, [14, 15]);
new Line(9, [3, 12]);
new Line(10, [6, 16]);
new Line(11, [7, 17]);
new Line(12, [8, 18]);
new Line(13, [9, 10]);
new Line(14, [11, 12]);
new Line(15, [12, 16]);
new Line(16, [15, 16]);
new Line(17, [11, 15]);
new Line(18, [10, 14]);
new Line(19, [13, 14]);
new Line(20, [9, 13]);
new Line(21, [17, 18]);
new Line(22, [15, 17]);
new Line(23, [19, 21]);
new Line(24, [20, 22]);
new Line(25, [16, 18]);
new Line(26, [3, 6]);

// Create Surfaces
var sur = new Surface();
sur.Standard(1, [1, 3, 20, 4], 2);
sur.Standard(2, [2, 5, 13, 3], 2);
sur.Standard(3, [18, 7, 17, 8], 2);
sur.Standard(4, [26, 10, 15, 9], 2);
sur.Standard(5, [13, 18, 19, 20], 1);
sur.Standard(6, [14, 15, 16, 17], 1);

// Create members
var mem = new Member();
mem.Rib(1,16,2,"ALIGNMENT_ON_Z_SIDE_POSITIVE",true,true,[[1.0,"REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH","REFERENCE_LENGTH_WIDTH_SIXTH",3.0,3.0]]);
mem.Beam(2, 6, 1);
mem.Beam(3, 22, 4);
mem.Beam(4, 23, 4);
mem.Beam(5, 24, 4);
mem.Beam(6, 25, 4);
mem.Beam(7, 11, 3);
mem.Beam(8, 12, 3);
mem.Beam(9, 21, 3);

var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeToSection(1, [9], [9], "SECTION_ALIGNMENT_CENTER_TOP");
memberEccentricity.TransverseOffsetMember(3, "SECTION_ALIGNMENT_CENTER_BOTTOM", 15);

// Create hinge
var memberHinge = new MemberHinge();
// memberHinge.Translational(1, [3,4,5,6], [3,4,5,6], [false,0],[false,0],[false,0]);
memberHinge.Rotational(1, [3,4,5,6], [3,4,5,6], [false,0],[true,0],[true,0]);

// Define Supports
var nodalSupport = new NodalSupport(1,[5,7,8]);
nodalSupport.Hinged();
 
var lineSupport = new LineSupport(1,[1,2,26]);
lineSupport.Hinged();

var SASGeometricallyLinear = new StaticAnalysisSettings()
SASGeometricallyLinear.GeometricallyLinear(1, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var LCSW = new LoadCase();
LCSW.StaticAnalysis(1, "Static analysis", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A", [true, 0, 0, 1.0]);
