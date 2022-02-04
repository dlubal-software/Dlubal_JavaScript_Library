if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
var r = 3;
var d = 4;
var d_1 = 1;
var H = 3;
var thickness_1 = 0.35;   // ramp
var thickness_2 = 0.24;   // walls

// create material
var material = Material(1, 'LC50/55');

// Create thickness
var th = new Thickness();
th.Uniform(1, "Ramp", 1, [thickness_1]);
th.Uniform(2, "Walls", 1, [thickness_2]);

// Create section
var column = Section(1, 'CIRCLE_M1 300', material);

// Create nodes
Node(1, 0, r, 0);
Node(2, r, 0, -H / 4);
Node(3, 0, -r, -H / 2);
Node(4, -r, 0, -3 * H / 4);
Node(5, 0, r, -H);
Node(6, 0, r + d, 0);
Node(7, r + d, 0, -H / 4);
Node(8, 0, -r - d, -H / 2);
Node(9, -r - d, 0, -3 * H / 4);
Node(10, 0, r + d, -H);
Node(11, 0, r, -d_1);
Node(12, r, 0, -H / 4 - d_1);
Node(13, 0, -r, -H / 2 - d_1);
Node(14, -r, 0, -3 * H / 4 - d_1);
Node(15, 0, r, -H - d_1);
Node(16, 0, r + d, -d_1);
Node(17, r + d, 0, -H / 4 - d_1);
Node(18, 0, -r - d, -H / 2 - d_1);
Node(19, -r - d, 0, -3 * H / 4 - d_1);
Node(20, 0, r + d, -H - d_1);
Node(21, r, 0, 0);
Node(22, 0, -r, 0);
Node(23, -r, 0, 0);
Node(24, r + d, 0, 0);
Node(25, 0, -r - d, 0);
Node(26, -r - d, 0, 0);

// Create lines
var l = new Line();
l.Arc(1, [1, 2], [r * sin(PI / 4), r * sin(PI / 4), -H / 8]);
l.Arc(2, [2, 3], [r * sin(PI / 4), -r * sin(PI / 4), -3 * H / 8]);
l.Arc(3, [3, 4], [-r * sin(PI / 4), -r * sin(PI / 4), -5 * H / 8]);
l.Arc(4, [4, 5], [-r * sin(PI / 4), r * sin(PI / 4), -7 * H / 8]);
l.Arc(5, [6, 7], [(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -H / 8]);
l.Arc(6, [7, 8], [(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -3 * H / 8]);
l.Arc(7, [8, 9], [-(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -5 * H / 8]);
l.Arc(8, [9, 10], [-(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -7 * H / 8]);
l.Arc(9, [11, 12], [r * sin(PI / 4), r * sin(PI / 4), -H / 8 - d_1]);
l.Arc(10, [12, 13], [r * sin(PI / 4), -r * sin(PI / 4), -3 * H / 8 - d_1]);
l.Arc(11, [13, 14], [-r * sin(PI / 4), -r * sin(PI / 4), -5 * H / 8 - d_1]);
l.Arc(12, [14, 15], [-r * sin(PI / 4), r * sin(PI / 4), -7 * H / 8 - d_1]);
l.Arc(13, [16, 17], [(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -H / 8 - d_1]);
l.Arc(14, [17, 18], [(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -3 * H / 8 - d_1]);
l.Arc(15, [18, 19], [-(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -5 * H / 8 - d_1]);
l.Arc(16, [19, 20], [-(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -7 * H / 8 - d_1]);

Line(17, [1, 6]);
Line(18, [2, 7]);
Line(19, [3, 8]);
Line(20, [4, 9]);
Line(21, [5, 10]);
Line(22, [1, 11]);
Line(23, [2, 12]);
Line(24, [3, 13]);
Line(25, [4, 14]);
Line(26, [5, 15]);
Line(27, [6, 16]);
Line(28, [7, 17]);
Line(29, [8, 18]);
Line(30, [9, 19]);
Line(31, [10, 20]);
Line(32, [21, 2]);
Line(33, [22, 3]);
Line(34, [23, 4]);
Line(35, [24, 7]);
Line(36, [25, 8]);
Line(37, [26, 9]);

// Creat surfaces
var sur = new Surface();
sur.Standard(1, surfaces.GEOMETRY_QUADRANGLE, "", [1, 18, 5, 17], 1);
sur.Standard(2, surfaces.GEOMETRY_QUADRANGLE, "", [2, 19, 6, 18], 1);
sur.Standard(3, surfaces.GEOMETRY_QUADRANGLE, "", [3, 20, 7, 19], 1);
sur.Standard(4, surfaces.GEOMETRY_QUADRANGLE, "", [4, 21, 8, 20], 1);
sur.Standard(5, surfaces.GEOMETRY_QUADRANGLE, "", [1, 22, 9, 23], 2);
sur.Standard(6, surfaces.GEOMETRY_QUADRANGLE, "", [2, 23, 10, 24], 2);
sur.Standard(7, surfaces.GEOMETRY_QUADRANGLE, "", [3, 24, 11, 25], 2);
sur.Standard(8, surfaces.GEOMETRY_QUADRANGLE, "", [4, 25, 12, 26], 2);
sur.Standard(9, surfaces.GEOMETRY_QUADRANGLE, "", [5, 28, 13, 27], 2);
sur.Standard(10, surfaces.GEOMETRY_QUADRANGLE, "", [6, 29, 14, 28], 2);
sur.Standard(11, surfaces.GEOMETRY_QUADRANGLE, "", [7, 30, 15, 29], 2);
sur.Standard(12, surfaces.GEOMETRY_QUADRANGLE, "", [8, 31, 16, 30], 2);

// Create members
var mem = new Member();
mem.BeamByLine(1, 32, 0, 1);
mem.BeamByLine(2, 33, 0, 1);
mem.BeamByLine(3, 34, 0, 1);
mem.BeamByLine(4, 35, 0, 1);
mem.BeamByLine(5, 36, 0, 1);
mem.BeamByLine(6, 37, 0, 1);

// Define Supports
var nodalSupport = new NodalSupport(undefined,[21,22,23,24,25,26]);
nodalSupport.Hinged();

var lineSupport = new LineSupport(undefined, [17,21]);
lineSupport.Hinged();
lineSupport.RotationZ(true);

