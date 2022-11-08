if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

if (H_1 === undefined) {
	H_1 = 7;
	H_2 = 7.5;
	a = 25;
	b = 20;
	n_b = 4;
	n_a = 6;
	braces_bays = [1, 3, 5, 6];
	d = 0.2;
	a_1 = 5;
	a_2 = 5;
// //opening
	l = 2.5;
	w = 1.5;
	thickness_1 = 0.2;   // roof
	thickness_2 = 0.2;   // wall
}

// create material
var materialConcrete = Material(1, 'LC50/55');    // Concrete
var materialSteel = Material(2, 'S235');         // Steel

// Create thickness
var th = new Thickness();
th.Uniform(1, "Roof", 1, thickness_1);
th.Uniform(2, "Wall", 2, thickness_2);

// Create section
var section_1 = Section(1, 'IPE 450', materialSteel);
var section_2 = Section(2, 'HE 300 A', materialSteel);
var section_3 = Section(3, 'CHS 76.1x4.0', materialSteel);
var section_4 = Section(4, 'R 20', materialSteel);
var section_5 = Section(5, 'HE 180 A', materialSteel);
var section_6 = Section(6, 'R_M1 300/400', materialConcrete);  // concrete beam
var section_7 = Section(7, 'R_M1 300/300', materialConcrete);  // concrete column

// Create node
var nodeCount = 1;
for (var i = 0; i < n_b + 1; ++i) {
    Node(nodeCount, 0, i * b / n_b, 0);
    nodeCount++;
}
for (var i = 0; i < n_a; ++i) {
    Node(nodeCount, (i + 1) * a / n_a, 0, 0);
    nodeCount++;
    Node(nodeCount, (i + 1) * a / n_a, b, 0);
    nodeCount++;
}
for (var j = 0; j < n_a + 1; ++j) {
    for (var i = 0; i < n_b + 1; ++i) {
        if (i <= n_b / 2) {
            Node(nodeCount, j * a / n_a, i * b / n_b, -H_1 - i * (H_2 - H_1) / (n_b / 2));
            nodeCount++;
        }
        else {
            Node(nodeCount, j * a / n_a, i * b / n_b, -H_2 + (i - n_b / 2) * (H_2 - H_1) / (n_b / 2));
            nodeCount++;
        }
    }
}
// Create members
var mem = new Member();
var memberCount = 1;
for (var i = 0; i < n_b + 1; ++i) {
    mem.Beam(memberCount, [i + 1, n_b + 2 * n_a + 2 + i], 0, 5);
    memberCount++;
}
for (var i = 0; i < n_b; ++i) {
    mem.Beam(memberCount, [n_b + 2 * n_a + 2 + i, n_b + 2 * n_a + 3 + i], 0, 5);
    memberCount++;
}
for (var j = 0; j < n_a; ++j) {
    for (var i = 0; i < n_b; ++i) {
        mem.Beam(memberCount, [2 * n_b + 2 * n_a + 3 + i + j * (n_b + 1), 2 * n_b + 2 * n_a + 4 + i + j * (n_b + 1)], 0, 1);
        memberCount++;
    }
}
for (var i = 0; i < n_a; ++i) {
    mem.Beam(memberCount, [n_b + 2 + 2 * i, 2 * n_b + 2 * n_a + 3 + i * (n_b + 1)], 0, 2);
    memberCount++;
    mem.Beam(memberCount, [n_b + 3 + 2 * i, 2 * n_b + 2 * n_a + 3 + (i + 1) * (n_b) + i], 0, 2);
    memberCount++;
}

for (var j = 0; j < n_b + 1; ++j) {
    for (var i = 0; i < n_a; ++i) {
        mem.Beam(memberCount, [n_b + 2 * n_a + 2 + i * (n_b + 1) + j, n_b + 2 * n_a + 2 + (i + 1) * (n_b + 1) + j], 0, 3);
        memberCount++;
    }
}

// braces

if (braces_bays[0] == 1) {
    for (var i = 0; i < n_b; ++i) {
        mem.Beam(memberCount, [n_b + 2 * n_a + 3 + i, 2 * n_b + 2 * n_a + 3 + i], 0, 4);
        memberCount++;
        mem.Beam(memberCount, [n_b + 2 * n_a + 2 + i, 2 * n_b + 2 * n_a + 4 + i], 0, 4);
        memberCount++;
    }
    mem.Beam(memberCount, [1, 2 * n_b + 2 * n_a + 3], 0, 4);
    memberCount++;
    mem.Beam(memberCount, [n_b + 2, n_b + 2 * n_a + 2], 0, 4);
    memberCount++;

    mem.Beam(memberCount, [n_b + 3, 2 * n_b + 2 * n_a + 2], 0, 4);
    memberCount++;
    mem.Beam(memberCount, [n_b + 1, 3 * n_b + 2 * n_a + 3], 0, 4);
    memberCount++;

    braces_bays.shift();
}

mem.Beam(memberCount, [1, n_b + 2 * n_a + 3], 0, 4);
memberCount++;
mem.Beam(memberCount, [2, n_b + 2 * n_a + 2], 0, 4);
memberCount++;

for (var j = 0; j < braces_bays.length; ++j) {
    for (var i = 0; i < n_b; ++i) {
        mem.Beam(memberCount, [n_b + 2 * n_a + 3 + i + (braces_bays[j] - 1) * (n_b + 1), 2 * n_b + 2 * n_a + 3 + i + (braces_bays[j] - 1) * (n_b + 1)], 0, 4);
        memberCount++;
        mem.Beam(memberCount, [n_b + 2 * n_a + 2 + i + (braces_bays[j] - 1) * (n_b + 1), 2 * n_b + 2 * n_a + 4 + i + (braces_bays[j] - 1) * (n_b + 1)], 0, 4);
        memberCount++;
    }
}

for (var j = 0; j < braces_bays.length; ++j) {
    mem.Beam(memberCount, [n_b + 2 + (braces_bays[j] - 2) * 2, 3 * n_b + 2 * n_a + 4 + (braces_bays[j] - 2) * (n_b + 1)], 0, 4);
    memberCount++;
    mem.Beam(memberCount, [n_b + 4 + (braces_bays[j] - 2) * 2, 2 * n_b + 2 * n_a + 3 + (braces_bays[j] - 2) * (n_b + 1)], 0, 4);
    memberCount++;
    mem.Beam(memberCount, [n_b + 3 + (braces_bays[j] - 2) * 2, 4 * n_b + 2 * n_a + 4 + (braces_bays[j] - 2) * (n_b + 1)], 0, 4);
    memberCount++;
    mem.Beam(memberCount, [n_b + 5 + (braces_bays[j] - 2) * 2, 3 * n_b + 2 * n_a + 3 + (braces_bays[j] - 2) * (n_b + 1)], 0, 4);
    memberCount++;
}

// Define Nodal Support
var nodalSupport = new NodalSupport();
nodalSupport.Hinged();

for (var i = 1; i < n_b + 2 * n_a + 2; ++i) {
    nodes[i].support = nodalSupport.GetNo();
}

// Create concrete structure (walls and floors)
// Create node
no_n = nodes.lastId() + 1;
no_n2 = nodes.lastId() + 1;
var no_mem = members.lastId() + 1;
for (var j = 0; j < 2; ++j) {
    for (var i = 0; i < n_b + 1; ++i) {
        Node(no_n, a + d + j * a_1, i * b / n_b, 0);
        no_n++;
        Node(no_n, a + d + j * a_1, i * b / n_b, -H_1 / 2);
        no_n++;
        if (i <= n_b / 2) {
            Node(no_n, a + d + j * a_1, i * b / n_b, -H_1 - i * (H_2 - H_1) / (n_b / 2));
            no_n++;
        }
        else {
            Node(no_n, a + d + j * a_1, i * b / n_b, -H_2 + (i - n_b / 2) * (H_2 - H_1) / (n_b / 2));
            no_n++;
        }
    }
}

for (var i = 0; i < 2 * (n_b + 1); ++i) {
    Line(memberCount, [no_n2 + i * 3, no_n2 + 1 + i * 3]);
    memberCount++;
    Line(memberCount, [no_n2 + 1 + i * 3, no_n2 + 2 + i * 3]);
    memberCount++;
}
for (var j = 0; j < 3; ++j) {
    for (var i = 0; i < n_b; ++i) {
        Line(memberCount, [no_n2 + i * 3 + j, no_n2 + 3 + i * 3 + j]);
        memberCount++;
    }
}
for (var j = 0; j < 3; ++j) {
    for (var i = 0; i < n_b; ++i) {
        Line(memberCount, [no_n2 + 3 * (n_b + 1) + i * 3 + j, no_n2 + 3 * (n_b + 1) + 3 + i * 3 + j]);
        memberCount++;
    }
}

for (var i = 0; i < 2; ++i) {
    Line(memberCount, [no_n2 + i, no_n2 + 3 * (n_b + 1) + i]);
    memberCount++;
}

for (var i = 0; i < 2; ++i) {
    Line(memberCount, [no_n2 + 3 * n_b + i, no_n2 + 3 * (n_b + 1) + 3 * n_b + i]);
    memberCount++;
}

for (var i = 0; i < n_b + 1; ++i) {
    Line(memberCount, [no_n2 + 2 + 3 * i, no_n2 + 3 * (n_b + 1) + 2 + 3 * i]);
    memberCount++;
}

// Create Surfaces
var sur = new Surface();
var surfaceCount = 1;
for (var i = 0; i < n_b; ++i) {
    sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 2 * i, no_mem + 4 * (n_b + 1) + i, no_mem + 2 + 2 * i, no_mem + 4 * (n_b + 1) + n_b + i], 2);
    surfaceCount++;
}
for (var i = 0; i < n_b; ++i) {
    sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 2 * i + 1, no_mem + 4 * (n_b + 1) + i + n_b, no_mem + 3 + 2 * i, no_mem + 4 * (n_b + 1) + 2 * n_b + i], 2);
    surfaceCount++;
}
for (var i = 0; i < n_b; ++i) {
    sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 2 * (n_b + 1) + 2 * i, no_mem + 4 * (n_b + 1) + 3 * n_b + i, no_mem + 2 + 2 * i + 2 * (n_b + 1), no_mem + 4 * (n_b + 1) + 4 * n_b + i], 2);
    surfaceCount++;
}
for (var i = 0; i < n_b; ++i) {
    sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 2 * (n_b + 1) + 2 * i + 1, no_mem + 4 * (n_b + 1) + i + 4 * n_b, no_mem + 3 + 2 * i + 2 * (n_b + 1), no_mem + 4 * (n_b + 1) + i + 5 * n_b], 2);
    surfaceCount++;
}

// Boundaries of floor
var firstFloor = [];
var secondFloor = [];
for (var i = 0; i < n_b; ++i) {
    firstFloor.push(no_mem + 4 * (n_b + 1) + i);
    firstFloor.push(no_mem + 4 * (n_b + 1) + 3 * n_b + i);
}
firstFloor.push(no_mem + 4 * (n_b + 1) + 6 * n_b);
firstFloor.push(no_mem + 4 * (n_b + 1) + 6 * n_b + 2);

for (var i = 0; i < n_b; ++i) {
    secondFloor.push(no_mem + 4 * (n_b + 1) + i + n_b);
    secondFloor.push(no_mem + 4 * (n_b + 1) + 4 * n_b + i);
}
secondFloor.push(no_mem + 4 * (n_b + 1) + 6 * n_b + 1);
secondFloor.push(no_mem + 4 * (n_b + 1) + 6 * n_b + 3);
// create floor
sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", firstFloor, 1, "");
var surface_support = new SurfaceSupport(undefined, surfaceCount, "Fixed");
surface_support.Fixed();
surfaceCount++;
sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", secondFloor, 1);
surfaceCount++;

for (var i = 0; i < n_b; ++i) {
    sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 4 * (n_b + 1) + 6 * n_b + 4 + i, no_mem + 4 * (n_b + 1) + 5 * n_b + i, no_mem + 4 * (n_b + 1) + 6 * n_b + 5 + i, no_mem + 4 * (n_b + 1) + 2 * n_b + i], 1);
    surfaceCount++;
}

sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 4 * (n_b + 1) + 6 * n_b, no_mem, no_mem + 4 * (n_b + 1) + 6 * n_b + 1, no_mem + 2 * (n_b + 1)], 2);
surfaceCount++;
sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 4 * (n_b + 1) + 6 * n_b + 1, no_mem + 1, no_mem + 4 * (n_b + 1) + 6 * n_b + 4, no_mem + 2 * (n_b + 1) + 1], 2);
surfaceCount++;
sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 4 * (n_b + 1) + 6 * n_b + 2, no_mem + 2 * n_b, no_mem + 4 * (n_b + 1) + 6 * n_b + 3, no_mem + 2 * (n_b + 1) + 2 * n_b], 2);
surfaceCount++;
sur.Standard(surfaceCount, surfaces.GEOMETRY_PLANE, "", [no_mem + 4 * (n_b + 1) + 6 * n_b + 3, no_mem + 2 * n_b + 1, no_mem + 4 * (n_b + 1) + 7 * n_b + 4, no_mem + 2 * (n_b + 1) + 2 * n_b + 1], 2);
surfaceCount++;

// Create opening
var openingCount = 1;
var lin = new Line();
for (var j = 0; j < 2; ++j) {
    for (var i = 0; i < n_b; ++i) {
        lin.RectangularPolygon(memberCount, [a + d + j * a_1, b / (2 * n_b) + i * b / n_b, -H_1 / 4], l, w, "YZ");
        Opening(openingCount, [memberCount]);
        openingCount++;
        memberCount++;

        lin.RectangularPolygon(memberCount, [a + d + j * a_1, b / (2 * n_b) + i * b / n_b, -3 * H_1 / 4], l, w, "YZ");
        Opening(openingCount, [memberCount]);
        openingCount++;
        memberCount++;
    }
}

for (var i = 0; i < 2; ++i) {
    lin.RectangularPolygon(memberCount, [a + d + a_1 / 2, i * b, -H_1 / 4], l, w, "XZ");
    Opening(openingCount, [memberCount]);
    openingCount++;
    memberCount++;
    lin.RectangularPolygon(memberCount, [a + d + a_1 / 2, i * b, -3 * H_1 / 4], l, w, "XZ");
    Opening(openingCount, [memberCount]);
    openingCount++;
    memberCount++;
}
// Create concrete beams
// Create nodes
var no_no3 = nodes.lastId() + 1;
var no_no3_r = nodes.lastId() + 1;

for (var i = 0; i < n_b + 1; ++i) {
    Node(no_no3, a + d + a_1 + a_2, i * b / n_b, 0);
    no_no3++;
    Node(no_no3, a + d + a_1 + a_2, i * b / n_b, -H_1 / 2);
    no_no3++;
}
for (var i = 0; i < n_b + 1; ++i) {
    mem.Beam(memberCount, [no_n2 + 3 * (n_b + 1) + 1 + 3 * i, no_no3_r + 1 + 2 * i], 0, 6);
    memberCount++;
}
for (var i = 0; i < n_b; ++i) {
    mem.Beam(memberCount, [no_no3_r + 1 + 2 * i, no_no3_r + 3 + 2 * i], 0, 6);
    memberCount++;
}
for (var i = 0; i < n_b + 1; ++i) {
    mem.Beam(memberCount, [no_no3_r + 2 * i, no_no3_r + 1 + 2 * i], 0, 7);
    memberCount++;
}
for (var i = 0; i < n_b + 1; ++i) {
    nodes[no_no3_r + 2 * i].support = nodalSupport.no;
}
