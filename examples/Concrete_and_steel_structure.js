var a_1 = 5;
var a_2 = 5;
var b_1 = 5;
var b_2 = 5;
var H_1 = 3;
var H_2 = 3.5;
var thickness_1 = 0.2;   // roof
var thickness_2 = 0.2;   // wall

// create material 
var materialLightConcrete = new Material(1, 'LC50/55');    // Concrete
var materialSteel = new Material(2, 'S235');               // Steel

// Create thickness
var th = new Thickness();
th.Uniform(1, "Roof", 1, [thickness_1]);
th.Uniform(2, "Wall", 1, [thickness_2]);

// Create section
var concreteColumn = new Section(1, 'CIRCLE_M1 300', materialLightConcrete);
var concreteRib = new Section(2, 'R_M1 300/400', materialLightConcrete);
var steelFrame = new Section(3, 'HE 200 A', materialSteel);
var steelBeams = new Section(4, 'IPE 200', materialSteel);



// Create Nodes
Node(1,          0,         0,    0);
Node(2,        a_1,         0,    0);
Node(3,  a_1 + a_2,         0,    0);
Node(4,          0,       b_1,    0);
Node(5,        a_1,       b_1,    0);
Node(6,  a_1 + a_2,       b_1,    0);
Node(7,        a_1, b_1 + b_2,    0);
Node(8,  a_1 + a_2, b_1 + b_2,    0);
Node(9,          0,         0, -H_1);
Node(10,       a_1,         0, -H_1);
Node(11,       a_1,         0, -H_2);
Node(12, a_1 + a_2,         0, -H_2);
Node(13,         0,       b_1, -H_1);
Node(14,       a_1,       b_1, -H_1);
Node(15,       a_1,       b_1, -H_2);
Node(16, a_1 + a_2,       b_1, -H_2);
Node(17,       a_1, b_1 + b_2, -H_2);
Node(18, a_1 + a_2, b_1 + b_2, -H_2);
var nod = new Node();
nod.BetweenTwoNodes(19, 15, 16, "",[true, 33.33]);
nod.BetweenTwoNodes(20, 15, 16, "",[true, 66.66]);
nod.BetweenTwoNodes(21, 17, 18, "",[true, 33.33]);
nod.BetweenTwoNodes(22, 17, 18, "",[true, 66.66]);

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
Line(17, [11,15]);
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
sur.Standard(1, surfaces.GEOMETRY_PLANE, "", [1,   3, 20, 4], 2);
sur.Standard(2, surfaces.GEOMETRY_PLANE, "", [2,   5, 13, 3], 2);
sur.Standard(3, surfaces.GEOMETRY_PLANE, "", [18,  7, 17, 8], 2);
sur.Standard(4, surfaces.GEOMETRY_PLANE, "", [26, 10, 15, 9], 2);
sur.Standard(5, surfaces.GEOMETRY_PLANE, "", [13, 18, 19, 20], 1);
sur.Standard(6, surfaces.GEOMETRY_PLANE, "", [14, 15, 16, 17], 1);


// Create members
var mem = new Member();
mem.RibByLine(1, 16, 2);
mem.BeamByLine(2,  6, 0, 1);
mem.BeamByLine(3, 22, 0, 4);
mem.BeamByLine(4, 23, 0, 4);
mem.BeamByLine(5, 24, 0, 4);
mem.BeamByLine(6, 25, 0, 4);
mem.BeamByLine(7, 11, 0, 3);
mem.BeamByLine(8, 12, 0, 3);
mem.BeamByLine(9, 21, 0, 3);


// Create eccentricity
var ecc_params_1 = 
{
  "transverse_offset_reference_type": member_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_MEMBER_SECTION,
  "transverse_offset_reference_type": member_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_MEMBER_SECTION,
  "specification_type" : member_eccentricities.TYPE_RELATIVE,
  "transverse_offset_reference_member" : 3,
  "vertical_section_alignment" : member_eccentricities.ALIGN_TOP,
  "axial_offset_active": true,
  "transverse_offset_vertical_alignment" : member_eccentricities.ALIGN_BOTTOM  
};
MemberEccentricity(1, undefined, undefined, "", ecc_params_1);

// Assign eccentricity to member
members[9].member_eccentricity_end = member_eccentricities[1];
members[9].member_eccentricity_start = member_eccentricities[1];

// Create hinge
var hinges_params_1 = 
{
  "moment_release_mt": member_hinges.SPRING_CONSTANT_NO,
  "axial_release_n":   member_hinges.SPRING_CONSTANT_NO,
  "axial_release_vy":  member_hinges.SPRING_CONSTANT_NO,
  "axial_release_vz":  member_hinges.SPRING_CONSTANT_NO,
};
MemberHinge(1, undefined, undefined, "", hinges_params_1);

// Assign hinge to members
for (var i = 3; i < 7; ++i)
{
    members[i].member_hinge_start = member_hinges[1];
    members[i].member_hinge_end = member_hinges[1];
};
// Define Supports
var nodalSupport = NodalSupport(undefined);
nodalSupport.spring_x = nodal_supports.SPRING_CONSTANT_YES;
nodalSupport.spring_y = nodal_supports.SPRING_CONSTANT_YES;
nodalSupport.spring_z = nodal_supports.SPRING_CONSTANT_YES;
nodalSupport.rotational_restraint_z = nodal_supports.SPRING_CONSTANT_YES;

var lineSupport = LineSupport(undefined);
lineSupport.spring_x = line_supports.SPRING_CONSTANT_YES;
lineSupport.spring_y = line_supports.SPRING_CONSTANT_YES;
lineSupport.spring_z = line_supports.SPRING_CONSTANT_YES;
lineSupport.rotational_restraint_z = line_supports.SPRING_CONSTANT_YES;

// Assign Supports
nodes[5].support = nodalSupport.no;
nodes[7].support = nodalSupport.no;
nodes[8].support = nodalSupport.no;
lines[1].support = lineSupport.no;
lines[2].support = lineSupport.no;
lines[26].support = lineSupport.no;
