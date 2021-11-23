var a = 6;
var b = 3;
var H = 2.8;
var d_1 = 1;
var d_2 = 2;
var b_1 = 1;
var h = 1.1;
var h_1 = 1;
var a_1 = 1;
var a_2 = 1;
var thickness_1 = 0.18   // roof
var thickness_2 = 0.2    // walls


// create material 
var material = Material(undefined, 'LC50/55');

// Create thickness
var th = new Thickness();
th.Uniform(1, "Roof", "", [thickness_1],"", {"material": material});
th.Uniform(2, "Walls", "", [thickness_2],"", {"material": material});

// Create section 
var column = Section(undefined, 'CIRCLE_M1 200', material);
var ribs = Section(undefined, 'R_M1 200/400', material);

// Create Nodes
Node(1,                      0,            0,          0);
Node(2,                      a,            0,          0);
Node(3,                      a,            b,          0);
Node(4,                      0,            b,          0);
Node(5,                      0,            0,         -H);
Node(6,                      a,            0,         -H);
Node(7,                      a,            b,         -H);
Node(8,                      0,            b,         -H);
Node(9,                    d_1,            0,         -h);
Node(10,                   d_1,            0,   -h - h_1);
Node(11,             d_1 + a_1,            0,   -h - h_1);
Node(12,             d_1 + a_1,            0,         -h);
Node(13,       d_1 + a_1 + d_2,            0,         -h);
Node(14,       d_1 + a_1 + d_2,            0,   -h - h_1);
Node(15, d_1 + a_1 + d_2 + a_2,            0,   -h - h_1);
Node(16, d_1 + a_1 + d_2 + a_2,            0,         -h);
Node(17,                   d_1,  (b - b_1)/2,         -H);
Node(18,                   d_1,  (b + b_1)/2,         -H);
Node(19,             d_1 + a_1,  (b + b_1)/2,         -H);
Node(20,             d_1 + a_1,  (b - b_1)/2,         -H);
Node(21,       d_1 + a_1 + d_2,  (b - b_1)/2,         -H);
Node(22,       d_1 + a_1 + d_2,  (b + b_1)/2,         -H);
Node(23, d_1 + a_1 + d_2 + a_2,  (b + b_1)/2,         -H);
Node(24, d_1 + a_1 + d_2 + a_2,  (b - b_1)/2,         -H);

// Create lines
var l = new Line();
Line(1, [1, 2]);
l.Arc(2, [2, 3], [a + b/2, b/2, 0]);
Line(3, [1, 5]);
Line(4, [2, 6]);
Line(5, [3, 7]);
Line(6, [5, 6]);
Line(7, [7, 8]);
l.Arc(8, [5, 8], [   -b/2, b/2, -H]);
l.Arc(9, [6, 7], [a + b/2, b/2, -H]);
l.Polyline(10, [9,  10, 11, 12,  9]);
l.Polyline(11, [13, 14, 15, 16, 13]);
l.Polyline(12, [17, 18, 19, 20, 17]);
l.Polyline(13, [21, 22, 23, 24, 21]);
Line(14, [4, 8]);

// Create surfaces
var sur = new Surface();
Surface(1, [1, 3, 6, 4], 2);
sur.Standard(2, surfaces.GEOMETRY_QUADRANGLE, "", [4, 2, 5, 9], 2);
Surface(3, [6, 7, 8, 9], 1);

Opening(1,[10]);
Opening(2,[11]);
Opening(3,[12]);
Opening(4,[13]);

// Create members
var mem = new Member();
mem.RibByLine(1, 7, "", "", "", "", "", {"section_start": ribs});
mem.RibByLine(2, 8, "", "", "", "", "", {"section_start": ribs});
mem.BeamByLine(3, 14, 0, "", "", "", "", "", {"section_start": column});

// Supports
nodes[4].support = 1;
lines[1].support = 1;
lines[2].support = 1;