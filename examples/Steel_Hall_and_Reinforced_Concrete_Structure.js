// var H_1 = 7;
// var H_2 = 7.5;
// var a = 25;
// var b = 20;
// var n_b = 4;
// var n_a = 6;
// var braces_bays = [1, 3, 5, 6];
// var d = 0.2;
// var a_1 = 5;
// var a_2 = 5;
// //opening
// var l = 2.5;
// var w = 1.5;
// var thickness_1 = 0.2   // roof
// var thickness_2 = 0.2   // wall

// create material 
var material_1 = Material(undefined, 'LC50/55');    // Concrete
var material_2 = Material(undefined, 'S235');       // Steel

// Create thickness
var th = new Thickness();
th.Uniform(1, "Roof", "", [thickness_1],"", {"material": material_1});
th.Uniform(2, "Wall", "", [thickness_2],"", {"material": material_1});

// Create section
var section_1 = Section(undefined, 'IPE 450', material_2);
var section_2 = Section(undefined, 'HE 300 A', material_2);
var section_3 = Section(undefined, 'CHS 76.1x4.0', material_2);
var section_4 = Section(undefined, 'R 20', material_2);
var section_5 = Section(undefined, 'HE 180 A', material_2);
var section_6 = Section(undefined, 'R_M1 300/400', material_1);  // concrete beam
var section_7 = Section(undefined, 'R_M1 300/300', material_1);  // concrete column

// Create node
var node_count = 1;
for (var i = 0; i < n_b + 1; ++i)
{
    Node(node_count, 0, i*b/n_b, 0);
    node_count++;
}
for (var i = 0; i < n_a; ++i)
{
    Node(node_count, (i + 1)*a/n_a, 0, 0);
    node_count++;
    Node(node_count, (i + 1)*a/n_a, b, 0);
    node_count++;
}
for (var j = 0; j < n_a + 1; ++j)
{
    for (var i = 0; i < n_b + 1; ++i)
    {
        if (i <= n_b/2)
        {
            Node(node_count, j*a/n_a, i*b/n_b, -H_1 -i*(H_2 - H_1)/(n_b/2));
            node_count++;
        }
        else
        {
            Node(node_count, j*a/n_a, i*b/n_b, -H_2 + (i - n_b/2)*(H_2 - H_1)/(n_b/2));
            node_count++;
        }
    }
}


// Create members
var mem = new Member();
var mem_count = 1;
for (var i = 0; i < n_b + 1; ++i)
{
    mem.Beam(mem_count, [i + 1, n_b + 2*n_a + 2 + i], 0, "", "", "", "", "", {"section_start": section_5})
    mem_count++;
}
for (var i = 0; i < n_b; ++i)
{
    mem.Beam(mem_count, [n_b + 2*n_a + 2 + i, n_b + 2*n_a + 3 + i], 0, "", "", "", "", "", {"section_start": section_5})
    mem_count++;
}
for (var j = 0; j < n_a; ++j)
{
    for (var i = 0; i < n_b; ++i)
    {
        mem.Beam(mem_count, [2*n_b + 2*n_a + 3 + i + j*(n_b + 1), 2*n_b + 2*n_a + 4 + i + j*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_1})
        mem_count++;
    }
}
for (var i = 0; i < n_a; ++i)
{
    mem.Beam(mem_count, [n_b + 2 + 2*i, 2*n_b + 2*n_a + 3 + i*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_2})
    mem_count++;
    mem.Beam(mem_count, [n_b + 3 + 2*i, 2*n_b + 2*n_a + 3 + (i + 1)*(n_b) + i], 0, "", "", "", "", "", {"section_start": section_2})
    mem_count++;
}

for (var j = 0; j < n_b + 1; ++j)
{
    for (var i = 0; i < n_a; ++i)
    {
        mem.Beam(mem_count, [n_b + 2*n_a + 2 + i*(n_b + 1) + j, n_b + 2*n_a + 2 + (i + 1)*(n_b + 1) + j], 0, "", "", "", "", "", {"section_start": section_3})
        mem_count++;
    }
}

// braces

if (braces_bays[0] == 1)
{
    for (var i = 0; i < n_b; ++i)
    {
        mem.Beam(mem_count, [n_b + 2*n_a + 3 + i, 2*n_b + 2*n_a + 3 + i], 0, "", "", "", "", "", {"section_start": section_4});
        mem_count++;
        mem.Beam(mem_count, [n_b + 2*n_a + 2 + i, 2*n_b + 2*n_a + 4 + i], 0, "", "", "", "", "", {"section_start": section_4});
        mem_count++;
    }
    mem.Beam(mem_count, [1, 2*n_b +2*n_a + 3], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;
    mem.Beam(mem_count, [n_b + 2, n_b +2*n_a + 2], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;

    mem.Beam(mem_count, [n_b + 3, 2*n_b +2*n_a + 2], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;
    mem.Beam(mem_count, [n_b + 1, 3*n_b +2*n_a + 3], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;

    braces_bays.shift();
}

mem.Beam(mem_count, [1, n_b + 2*n_a + 3], 0, "", "", "", "", "", {"section_start": section_4});
mem_count++;
mem.Beam(mem_count, [2, n_b + 2*n_a + 2], 0, "", "", "", "", "", {"section_start": section_4});
mem_count++;

for (var j = 0; j < braces_bays.length; ++j)
{
    for (var i = 0; i < n_b; ++i)
    {
        mem.Beam(mem_count, [n_b + 2*n_a + 3 + i + (braces_bays[j] - 1)*(n_b + 1), 2*n_b + 2*n_a + 3 + i + (braces_bays[j] - 1)*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_4});
        mem_count++;
        mem.Beam(mem_count, [n_b + 2*n_a + 2 + i + (braces_bays[j] - 1)*(n_b + 1), 2*n_b + 2*n_a + 4 + i + (braces_bays[j] - 1)*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_4});
        mem_count++;
    }
}

for (var j = 0; j < braces_bays.length; ++j)
{
    mem.Beam(mem_count, [n_b + 2 + (braces_bays[j] - 2)*2, 3*n_b + 2*n_a + 4 + (braces_bays[j] - 2)*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;
    mem.Beam(mem_count, [n_b + 4 + (braces_bays[j] - 2)*2, 2*n_b + 2*n_a + 3 + (braces_bays[j] - 2)*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;
    mem.Beam(mem_count, [n_b + 3 + (braces_bays[j] - 2)*2, 4*n_b + 2*n_a + 4 + (braces_bays[j] - 2)*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;
    mem.Beam(mem_count, [n_b + 5 + (braces_bays[j] - 2)*2, 3*n_b + 2*n_a + 3 + (braces_bays[j] - 2)*(n_b + 1)], 0, "", "", "", "", "", {"section_start": section_4});
    mem_count++;
}

// Define Nodal Support
var nod_sup = NodalSupport(undefined);
nod_sup.spring_x = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.spring_y = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.spring_z = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.rotational_restraint_z = nodal_supports.SPRING_CONSTANT_YES;
var nod_sup_num = nod_sup.no;
for (var i = 1; i < n_b + 2*n_a + 2; ++i)
{
    nodes[i].support = nod_sup_num;
}

// Create concrete structure (walls and floors)
// Create node
no_n = nodes.lastId() + 1;
no_n2 = nodes.lastId() + 1;
var no_mem = members.lastId() + 1;
for (var j = 0; j < 2; ++j)
{
    for (var i = 0; i < n_b + 1; ++i)
    {
        Node(no_n, a + d + j*a_1, i*b/n_b,      0);
        no_n++;
        Node(no_n, a + d + j*a_1, i*b/n_b, -H_1/2);
        no_n++;
        if (i <= n_b/2)
        {
            Node(no_n, a + d + j*a_1, i*b/n_b, -H_1 -i*(H_2 - H_1)/(n_b/2));
            no_n++;
        }
        else
        {
            Node(no_n, a + d + j*a_1, i*b/n_b, -H_2 + (i - n_b/2)*(H_2 - H_1)/(n_b/2));
            no_n++;
        }
    }
}

for (var i = 0; i < 2*(n_b + 1); ++i)
{
    Line(mem_count, [no_n2 + i*3,     no_n2 + 1 + i*3]);
    mem_count++;
    Line(mem_count, [no_n2 + 1 + i*3, no_n2 + 2 + i*3]);
    mem_count++;
}
for (var j = 0; j < 3; ++j)
{
    for (var i = 0; i < n_b; ++i)
    {
        Line(mem_count, [no_n2 + i*3 + j,     no_n2 + 3 + i*3 + j]);
        mem_count++;
    }
}
for (var j = 0; j < 3; ++j)
{
    for (var i = 0; i < n_b; ++i)
    {
        Line(mem_count, [no_n2 + 3*(n_b + 1) + i*3 + j,     no_n2 + 3*(n_b + 1) + 3 + i*3 + j]);
        mem_count++;
    }
}

for (var i = 0; i < 2; ++i)
{
    Line(mem_count, [no_n2 + i, no_n2 + 3*(n_b + 1) + i]);
    mem_count++;
}

for (var i = 0; i < 2; ++i)
{
    Line(mem_count, [no_n2 + 3*n_b + i, no_n2 + 3*(n_b + 1) + 3*n_b + i]);
    mem_count++;
}

for (var i = 0; i < n_b + 1; ++i)
{
    Line(mem_count, [no_n2 + 2 + 3*i, no_n2 + 3*(n_b + 1) + 2 + 3*i]);
    mem_count++;
}

// Create Surfaces
var sur = new Surface();
var sur_no = 1;
for (var i = 0; i < n_b; ++i)
{
    sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 2*i, no_mem + 4*(n_b + 1) + i, no_mem + 2 + 2*i, no_mem + 4*(n_b + 1) + n_b + i], 2);
    sur_no++;
}
for (var i = 0; i < n_b; ++i)
{
    sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 2*i + 1, no_mem + 4*(n_b + 1) + i + n_b, no_mem + 3 + 2*i, no_mem + 4*(n_b + 1) + 2*n_b + i], 2);
    sur_no++;
}
for (var i = 0; i < n_b; ++i)
{
    sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 2*(n_b + 1) + 2*i, no_mem + 4*(n_b + 1) + 3*n_b + i, no_mem + 2 + 2*i + 2*(n_b + 1), no_mem + 4*(n_b + 1)+ 4*n_b + i], 2);
    sur_no++;
}
for (var i = 0; i < n_b; ++i)
{
    sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 2*(n_b + 1) + 2*i + 1, no_mem + 4*(n_b + 1) + i + 4*n_b, no_mem + 3 + 2*i+ 2*(n_b + 1) , no_mem + 4*(n_b + 1) + i + 5*n_b], 2);
    sur_no++;
}

// Bouderies of floor
var floor_1 = [];
var floor_2 = [];
for (var i = 0; i < n_b; ++i)
{
    floor_1.push(no_mem + 4*(n_b + 1) + i);
    floor_1.push(no_mem + 4*(n_b + 1) + 3*n_b + i);
}
floor_1.push(no_mem + 4*(n_b + 1) + 6*n_b);
floor_1.push(no_mem + 4*(n_b + 1) + 6*n_b + 2);

for (var i = 0; i < n_b; ++i)
{
    floor_2.push(no_mem + 4*(n_b + 1) + i + n_b);
    floor_2.push(no_mem + 4*(n_b + 1) + 4*n_b + i);
}
floor_2.push(no_mem + 4*(n_b + 1) + 6*n_b + 1);
floor_2.push(no_mem + 4*(n_b + 1) + 6*n_b + 3);

// Create surface support
var sur_sup = SurfaceSupport(undefined);
sur_sup.shear_xz = surface_supports.SPRING_CONSTANT_YES;
sur_sup.shear_yz = surface_supports.SPRING_CONSTANT_YES;
sur_sup.translation_x = 10000000;
sur_sup.translation_y = 10000000;
sur_sup.translation_z = 30000000;

// create floor
sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", floor_1, 1, "", {"support": sur_sup});
sur_no++;
sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", floor_2, 1);
sur_no++;

for (var i = 0; i < n_b; ++i)
{
    sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 4*(n_b + 1) + 6*n_b + 4 + i, no_mem + 4*(n_b + 1) + 5*n_b + i, no_mem + 4*(n_b + 1) + 6*n_b + 5 + i, no_mem + 4*(n_b + 1) + 2*n_b + i], 1);
    sur_no++;
}

sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 4*(n_b + 1) + 6*n_b, no_mem, no_mem + 4*(n_b + 1) + 6*n_b + 1, no_mem + 2*(n_b + 1)], 2);
sur_no++;
sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 4*(n_b + 1) + 6*n_b + 1, no_mem + 1, no_mem + 4*(n_b + 1) + 6*n_b + 4, no_mem + 2*(n_b + 1) + 1], 2);
sur_no++;
sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 4*(n_b + 1) + 6*n_b + 2, no_mem + 2*n_b, no_mem + 4*(n_b + 1) + 6*n_b + 3, no_mem + 2*(n_b + 1) + 2*n_b], 2);
sur_no++;
sur.Standard(sur_no, surfaces.GEOMETRY_PLANE, "", [no_mem + 4*(n_b + 1) + 6*n_b + 3, no_mem + 2*n_b + 1, no_mem + 4*(n_b + 1) + 7*n_b + 4, no_mem + 2*(n_b + 1) + 2*n_b + 1], 2);
sur_no++;

// Create opening
var open_no = 1;
var lin = new Line();
for (var j = 0; j < 2; ++j)
{
    for (var i = 0; i < n_b; ++i)
    {
        lin.RectangularPolygon(mem_count, [a + d + j*a_1, b/(2*n_b) + i*b/n_b,   -H_1/4], l, w, "YZ");
        Opening(open_no, [mem_count]);
        open_no++;
        mem_count++;
        
        lin.RectangularPolygon(mem_count, [a + d + j*a_1, b/(2*n_b) + i*b/n_b, -3*H_1/4], l, w, "YZ");
        Opening(open_no, [mem_count]);
        open_no++;
        mem_count++;
    }
}

for (var i = 0; i < 2; ++i)
{
    lin.RectangularPolygon(mem_count, [a + d + a_1/2, i*b, -H_1/4], l, w, "XZ");
    Opening(open_no, [mem_count]);
    open_no++;
    mem_count++;
    lin.RectangularPolygon(mem_count, [a + d + a_1/2, i*b, -3*H_1/4], l, w, "XZ");
    Opening(open_no, [mem_count]);
    open_no++;
    mem_count++;
}


// Create concrete beams
// Create nodes
var no_no3 = nodes.lastId() + 1;
var no_no3_r = nodes.lastId() + 1;

for (var i = 0; i < n_b + 1; ++i)
{
    Node(no_no3, a + d + a_1 + a_2, i*b/n_b,      0);
    no_no3++;
    Node(no_no3, a + d + a_1 + a_2, i*b/n_b, -H_1/2);
    no_no3++;
}
for (var i = 0; i < n_b + 1; ++i)
{
    mem.Beam(mem_count, [no_n2 + 3*(n_b + 1) + 1 + 3*i, no_no3_r + 1 + 2*i], 0, "", "", "", "", "", {"section_start": section_6});
    mem_count++;
}
for (var i = 0; i < n_b; ++i)
{
    mem.Beam(mem_count, [no_no3_r + 1 + 2*i, no_no3_r + 3 + 2*i], 0, "", "", "", "", "", {"section_start": section_6});
    mem_count++;
}
for (var i = 0; i < n_b + 1; ++i)
{
    mem.Beam(mem_count, [no_no3_r + 2*i, no_no3_r + 1 + 2*i], 0, "", "", "", "", "", {"section_start": section_7});
    mem_count++;
}
for (var i = 0; i < n_b + 1; ++i)
{
    nodes[no_no3_r + 2*i].support = nod_sup_num;
}