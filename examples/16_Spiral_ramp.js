if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

run("../includes/tools/clearAll.js");
var r = 3;
var d = 4;
var d_1 = 1;
var H = 3;
var thickness_1 = 0.35;   // ramp
var thickness_2 = 0.24;   // walls

// create material
var material = new Material(1, 'C25/30');

// Create thickness
var thicknessRamp = new Thickness();
thicknessRamp.Uniform(1, "Ramp", 1, thickness_1);
var thicknessWalls = new Thickness();
thicknessWalls.Uniform(2, "Walls", 1, thickness_2);

// Create section
var column = new Section(1, 'CIRCLE_M1 0.300', material.GetNo());

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
var line = new Line();
line.Arc(1, [1, 2], [r * sin(PI / 4), r * sin(PI / 4), -H / 8]);
line.Arc(2, [2, 3], [r * sin(PI / 4), -r * sin(PI / 4), -3 * H / 8]);
line.Arc(3, [3, 4], [-r * sin(PI / 4), -r * sin(PI / 4), -5 * H / 8]);
line.Arc(4, [4, 5], [-r * sin(PI / 4), r * sin(PI / 4), -7 * H / 8]);
line.Arc(5, [6, 7], [(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -H / 8]);
line.Arc(6, [7, 8], [(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -3 * H / 8]);
line.Arc(7, [8, 9], [-(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -5 * H / 8]);
line.Arc(8, [9, 10], [-(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -7 * H / 8]);
line.Arc(9, [11, 12], [r * sin(PI / 4), r * sin(PI / 4), -H / 8 - d_1]);
line.Arc(10, [12, 13], [r * sin(PI / 4), -r * sin(PI / 4), -3 * H / 8 - d_1]);
line.Arc(11, [13, 14], [-r * sin(PI / 4), -r * sin(PI / 4), -5 * H / 8 - d_1]);
line.Arc(12, [14, 15], [-r * sin(PI / 4), r * sin(PI / 4), -7 * H / 8 - d_1]);
line.Arc(13, [16, 17], [(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -H / 8 - d_1]);
line.Arc(14, [17, 18], [(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -3 * H / 8 - d_1]);
line.Arc(15, [18, 19], [-(r + d) * sin(PI / 4), -(r + d) * sin(PI / 4), -5 * H / 8 - d_1]);
line.Arc(16, [19, 20], [-(r + d) * sin(PI / 4), (r + d) * sin(PI / 4), -7 * H / 8 - d_1]);

line.Polyline(17, [1, 6]);
line.Polyline(18, [2, 7]);
line.Polyline(19, [3, 8]);
line.Polyline(20, [4, 9]);
line.Polyline(21, [5, 10]);
line.Polyline(22, [1, 11]);
line.Polyline(23, [2, 12]);
line.Polyline(24, [3, 13]);
line.Polyline(25, [4, 14]);
line.Polyline(26, [5, 15]);
line.Polyline(27, [6, 16]);
line.Polyline(28, [7, 17]);
line.Polyline(29, [8, 18]);
line.Polyline(30, [9, 19]);
line.Polyline(31, [10, 20]);
line.Polyline(32, [21, 2]);
line.Polyline(33, [22, 3]);
line.Polyline(34, [23, 4]);
line.Polyline(35, [24, 7]);
line.Polyline(36, [25, 8]);
line.Polyline(37, [26, 9]);

// Create surfaces
var sur = new Surface();
sur.Quadrangle(1, [1, 18, 5, 17],"STANDARD", thicknessRamp.GetNo());
sur.Quadrangle(2, [2, 19, 6, 18],"STANDARD", thicknessRamp.GetNo());
sur.Quadrangle(3, [3, 20, 7, 19],"STANDARD", thicknessRamp.GetNo());
sur.Quadrangle(4, [4, 21, 8, 20],"STANDARD", thicknessRamp.GetNo());
sur.Quadrangle(5, [1, 22, 9, 23],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(6, [2, 23, 10, 24],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(7, [3, 24, 11, 25],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(8, [4, 25, 12, 26],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(9, [5, 28, 13, 27],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(10, [6, 29, 14, 28],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(11, [7, 30, 15, 29],"STANDARD", thicknessWalls.GetNo());
sur.Quadrangle(12, [8, 31, 16, 30],"STANDARD", thicknessWalls.GetNo());

// // Create members
var mem = new Member();
mem.Beam(1, 32, column.GetNo());
mem.Beam(2, 33, column.GetNo());
mem.Beam(3, 34, column.GetNo());
mem.Beam(4, 35, column.GetNo());
mem.Beam(5, 36, column.GetNo());
mem.Beam(6, 37, column.GetNo());

// Define Supports
var nodalSupport = new NodalSupport(1, [21, 22, 23, 24, 25, 26]);
nodalSupport.Hinged();

var lineSupport = new LineSupport(1, [17, 21]);
lineSupport.Hinged();
lineSupport.RotationZ(true);

//load
var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings();
SASSecondOrder.SecondOrder(2,"MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");
var lc1 = new LoadCase();
lc1.StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetNo(), "PERMANENT_G", [true, 0, 0, 1.0]);
