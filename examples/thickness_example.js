var a = 4;
var b = 5;
var H = 3;
var slab_thickness = 0.35;
var rib_height = 0.2;
var rib_spacing = 0.5
var rib_width = 0.18

// create material 
var material_1 = Material(1, 'LC50/55');    // Concrete

// Create thickness
var th = new Thickness();
th.ShapeOrthotropy(1, "Roof", 1, thicknesses.ORTHOTROPIC_THICKNESS_TYPE_UNIDIRECTIONAL_RIBBED_PLATE, 0, 
                   thicknesses.SELF_WEIGHT_COMPUTED_FROM_PARAMETERS,
                   [slab_thickness, rib_height,rib_spacing, rib_width]);

// Create section
var section_1 = Section(1, 'R_M1 300/400', material_1);  // concrete column

// Create Nodes
Node(1, 0, 0,  0);
Node(2, a, 0,  0);
Node(3, 0, b,  0);
Node(4, a, b,  0);
Node(5, 0, 0, -H);
Node(6, a, 0, -H);
Node(7, 0, b, -H);
Node(8, a, b, -H);

// Create Members
var mem = new Member();
for(var i = 0; i < 4; ++i)
{
    mem.Beam(i + 1, [1 + i, 5 + i], 90, 1);
}

// Create Lines
Line(5, [5, 6]);
Line(6, [6, 8]);
Line(7, [8, 7]);
Line(8, [7, 5]);

// Create Surface - roof
var sur = new Surface();
sur.Standard(1, surfaces.GEOMETRY_PLANE, "", [5, 6, 7, 8], 1);

// Define Supports
var nod_sup = NodalSupport(undefined);
nod_sup.spring_x = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.spring_y = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.spring_z = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.rotational_restraint_z = nodal_supports.SPRING_CONSTANT_YES;

// Assign Supports
for (var i = 1; i < 5; ++i)
{
    nodes[i].support = nod_sup.no;
}