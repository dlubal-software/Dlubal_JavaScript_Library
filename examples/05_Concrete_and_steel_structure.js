if (!RFEM) {
  throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("/clearAll.js");
var a_1 = 5;
var a_2 = 5;
var b_1 = 5;
var b_2 = 5;
var H_1 = 3;
var H_2 = 3.5;
var thickness_1 = 0.2;   // roof
var thickness_2 = 0.2;   // wall

// create material
var materialConcrete = new Material(1, 'C25/30');    // Concrete
var materialSteel = new Material(2, 'S235');               // Steel

// Create thickness
var th = new Thickness();
th.Uniform(1, "Roof", 1, [thickness_1]);
th.Uniform(2, "Wall", 1, [thickness_2]);

// Create section
var concreteColumn = new Section(1, 'CIRCLE_M1 0.300', materialConcrete);
var concreteRib = new Section(2, 'R_M1 0.3/0.400', materialConcrete);
var steelFrame = new Section(3, 'HE 200 A', materialSteel);
var steelBeams = new Section(4, 'IPE 200', materialSteel);
// Create Nodes
Node(1, 0, 0, 0);
Node(2, a_1, 0, 0);
Node(3, a_1 + a_2, 0, 0);
Node(4, 0, b_1, 0);
Node(5, a_1, b_1, 0);
Node(6, a_1 + a_2, b_1, 0);
Node(7, a_1, b_1 + b_2, 0);
Node(8, a_1 + a_2, b_1 + b_2, 0);
Node(9, 0, 0, -H_1);
Node(10, a_1, 0, -H_1);
Node(11, a_1, 0, -H_2);
Node(12, a_1 + a_2, 0, -H_2);
Node(13, 0, b_1, -H_1);
Node(14, a_1, b_1, -H_1);
Node(15, a_1, b_1, -H_2);
Node(16, a_1 + a_2, b_1, -H_2);
Node(17, a_1, b_1 + b_2, -H_2);
Node(18, a_1 + a_2, b_1 + b_2, -H_2);
var nod = new Node();
nod.BetweenTwoNodes(19, 15, 16, "", [true, 33.33]);
nod.BetweenTwoNodes(20, 15, 16, "", [true, 66.66]);
nod.BetweenTwoNodes(21, 17, 18, "", [true, 33.33]);
nod.BetweenTwoNodes(22, 17, 18, "", [true, 66.66]);

// Create lines
Line(1, [1, 4]);
Line(2, [1, 2]);
Line(3, [1, 9]);
Line(4, [4, 13]);
Line(5, [2, 10]);
Line(6, [5, 14]);
Line(7, [10, 11]);
Line(8, [14, 15]);
Line(9, [3, 12]);
Line(10, [6, 16]);
Line(11, [7, 17]);
Line(12, [8, 18]);
Line(13, [9, 10]);
Line(14, [11, 12]);
Line(15, [12, 16]);
Line(16, [15, 16]);
Line(17, [11, 15]);
Line(18, [10, 14]);
Line(19, [13, 14]);
Line(20, [9, 13]);
Line(21, [17, 18]);
Line(22, [15, 17]);
Line(23, [19, 21]);
Line(24, [20, 22]);
Line(25, [16, 18]);
Line(26, [3, 6]);

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
var hinges_params_1 =
{
  "moment_release_mt": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_n": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_vy": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_vz": member_hinges.SPRING_CONSTANT_NO,
};
var memberHinge = new MemberHinge(1, [3,4,5,6], [3,4,5,6],"",hinges_params_1);

// Define Supports
var nodalSupport = new NodalSupport(1,[5,7,8]);
nodalSupport.Hinged();

var lineSupport = new LineSupport(1,[1,2,26]);
lineSupport.Hinged();

var SASGeometricallyLinear = new StaticAnalysisSettings().GeometricallyLinear(1, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var LCSW = new LoadCase().StaticAnalysis(1, "Static analysis", SASGeometricallyLinear.Settings.no, "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A", [true, 0, 0, 1.0]);