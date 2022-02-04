if (!RFEM) {
  throw new Error("This script is only for RFEM, it creates surfaces.");
}
// var a = 7;                // Length
// var b = 6;                // Width
// var H = 4;                // Height
// var H_1 = 3;              // Height 1 
// var H_2 = 3.9;            // Height 2
// var len = 2.5;            // Opening Length
// var w = 1;                // Opening Width
// var thickness_1 = 0.2;    // Thickness of roof and wall

// create material 
var materialConcrete = Material(1, 'C30/37');     // Concrete
var materialSteel = Material(2, 'S235');       // Steel

// Create thickness
var th = new Thickness();
th.Uniform(1, "Roof and Wall", 1, [thickness_1]);

// Create section
var sectionConcreteColumn = Section(1, 'CIRCLE_M1 300', materialConcrete);
var sectionRib = Section(2, 'R_M1 250/500', materialConcrete);
var sectionSteelFrame = Section(3, 'HE 300 A', materialSteel);
var sectionSteelBeam = Section(4, 'HE 260 A', materialSteel);
var sectionBrace = Section(5, 'L 80x80x8', materialSteel);

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
mem.Beam(1, [1, 5], 0, 1);
mem.Beam(2, [4, 8], 0, 1);
mem.Beam(3, [8, 12], 0, 3);
mem.Beam(4, [12, 9], 0, 3);
mem.Beam(5, [5, 9], 0, 3);
mem.Beam(6, [7, 11], 0, 3);
mem.Beam(7, [11, 10], 0, 3);
mem.Beam(8, [6, 10], 0, 3);
mem.Beam(9, [9, 10], 0, 4);
mem.Beam(10, [12, 11], 0, 4);
mem.Beam(11, [5, 12], 90, 5);
mem.Beam(12, [9, 8], 90, 5);
mem.Beam(13, [6, 11], 90, 5);
mem.Beam(14, [10, 7], 90, 5);

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
sur.Standard(1, surfaces.GEOMETRY_PLANE, "", [15, 16, 17, 18], 1);
sur.Standard(2, surfaces.GEOMETRY_PLANE, "", [18, 19], 1);
sur.Standard(3, surfaces.GEOMETRY_QUADRANGLE, "", [19, 21, 20, 22], 1);

// Create Rib by Line
mem.RibByLine(23, 18, 2);

// Create Opening
l.RectangularPolygon(23, [a / 2, b / 2, -H], len, w, "XY");
Opening(1, [23]);

// Create hinge
var hingesParameters =
{
  "moment_release_mt": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_n": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_vy": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_vz": member_hinges.SPRING_CONSTANT_NO,
};
MemberHinge(1, undefined, undefined, "", hingesParameters);

// Assign hinge to members
members[4].member_hinge_start = member_hinges[1];
members[4].member_hinge_end = member_hinges[1];
members[7].member_hinge_start = member_hinges[1];
members[7].member_hinge_end = member_hinges[1];

// Create eccentricity
var eccentricityParameters =
{
  "specification_type": member_eccentricities.TYPE_RELATIVE_AND_ABSOLUTE,
  "vertical_section_alignment": member_eccentricities.ALIGN_TOP,
  "axial_offset_active": true
};
MemberEccentricity(1, undefined, undefined, "", eccentricityParameters);

// Assign eccentricity to member
members[9].member_eccentricity_end = member_eccentricities[1];
members[9].member_eccentricity_start = member_eccentricities[1];
members[10].member_eccentricity_end = member_eccentricities[1];
members[10].member_eccentricity_start = member_eccentricities[1];

// Define Supports
var nodalSupport = new NodalSupport();
nodalSupport.Hinged();

var lineSupport = new LineSupport();
lineSupport.Hinged();

// Assign Supports
nodes[1].support = nodalSupport.GetNo();
nodes[4].support = nodalSupport.GetNo();
lines[20].support = lineSupport.GetNo();
