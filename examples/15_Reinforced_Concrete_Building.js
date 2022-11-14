if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("../includes/tools/clearAll.js");
// var a = 20;                   // Total Length and Width
// var H = 3.5;                  // Height
// var n_f = 10;                 // Number of floors
// var rotation_degree = 45;     // Rotation Degree
// var chamfer = 3;              // Chamfer of edges
// var d = 6;                    // Distance between openings
// var len = 4;                  // Opening Length
// var w = 3;                    // Opening Width
// var thickness_1 = 0.35;       // Roof thickness
// var thickness_2 = 0.3;        // Wall thickness

// create material
var materialConcrete = new Material(1, 'C50/60');    // Concrete

// Create thickness
var thicknessRoof = new Thickness();
thicknessRoof.Uniform(1, "Roof", 1, thickness_1); 
var thicknessWall = new Thickness();
thicknessWall.Uniform(2, "Wall", 1, thickness_2);

// Create section
var section_1 = new Section(1, 'CIRCLE_M1 0.500', materialConcrete.GetNo());  // concrete column

// Create nodes
var R = sqrt(sqr(a) / 2);
var D = sqrt(2 * sqr(chamfer));
var r = R - D / 2;
var r_1 = sqrt(sqr(r) + sqr(D / 2));
var r_2 = sqrt(sqr(r - sqrt(2)) + sqr(D) / 4);
var nodeCount = 1;

Node(nodeCount, -d, -d / 2, 0);    // Nodes for interior walls
nodeCount++;
Node(nodeCount, 0, -d / 2, 0);
nodeCount++;
Node(nodeCount, len, -d / 2, 0);
nodeCount++;
Node(nodeCount, len, -d / 2 - w, 0);
nodeCount++;
Node(nodeCount, 0, -d / 2 - w, 0);
nodeCount++;
Node(nodeCount, 0, d / 2, 0);
nodeCount++;
Node(nodeCount, -len, d / 2, 0);
nodeCount++;
Node(nodeCount, -len, d / 2 + w, 0);
nodeCount++;
Node(nodeCount, 0, d / 2 + w, 0);
nodeCount++;
Node(nodeCount, d, d / 2 + w, 0);
nodeCount++;

for (var k = 0; k < n_f + 1; ++k) {

    for (var i = 0; i < 4; ++i)                                              // Nodes of total floors
    {
        var alpha = i * PI * 2 / 4 + PI / 4 + k * rotation_degree * PI / (n_f * 180);
        var delta = asin((D / 2) / r_1);
        Node(nodeCount, r_1 * cos(alpha - delta), r_1 * sin(alpha - delta), -H * (k + 1));
        nodeCount++;
        Node(nodeCount, r_1 * cos(alpha + delta), r_1 * sin(alpha + delta), -H * (k + 1));
        nodeCount++;
    }

    for (var j = 0; j < 2; ++j) {
        for (var i = 0; i < 4; ++i)                                              // Nodes of columns
        {
            var alpha = i * PI * 2 / 4 + PI / 4 + k * rotation_degree * PI / (n_f * 180);
            var delta = asin((D / 2) / r_2);
            Node(nodeCount, r_2 * cos(alpha - delta), r_2 * sin(alpha - delta), -j * H - H * k);
            nodeCount++;
            Node(nodeCount, r_2 * cos(alpha + delta), r_2 * sin(alpha + delta), -j * H - H * k);
            nodeCount++;
        }
    }

    Node(nodeCount, -d, -d / 2, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, 0, -d / 2, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, len, -d / 2, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, len, -d / 2 - w, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, 0, -d / 2 - w, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, 0, d / 2, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, -len, d / 2, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, -len, d / 2 + w, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, 0, d / 2 + w, -H * (k + 1));
    nodeCount++;
    Node(nodeCount, d, d / 2 + w, -H * (k + 1));
    nodeCount++;
}

//Create Lines for floors
var lineCount = 1;
var surfaceCount = 1;
for (var i = 0; i < n_f + 1; ++i) {
    var line = new Line();
    line.Polyline(lineCount, [11 + i * 34, 12 + i * 34, 13 + i * 34, 14 + i * 34, 15 + i * 34, 16 + i * 34, 17 + i * 34, 18 + i * 34, 11 + i * 34]);
    var surface = new Surface();
    surface.Standard(surfaceCount, [line.GetNo()], thicknessRoof.GetNo());
    lineCount++;
    surfaceCount++;
}

// Create Members
for (var j = 0; j < n_f + 1; ++j) {
    for (var i = 0; i < 8; ++i) {
        var member = new Member();
        member.Beam(lineCount, [19 + i + 34 * j, 27 + i + 34 * j], section_1.GetNo());
        lineCount++;
    }
}

// Create lines for interior walls
for (var j = 0; j < n_f + 2; ++j) {
    Line(lineCount, [1 + 34 * j, 2 + 34 * j]);
    lineCount++;
    Line(lineCount, [2 + 34 * j, 3 + 34 * j]);
    lineCount++;
    Line(lineCount, [3 + 34 * j, 4 + 34 * j]);
    lineCount++;
    Line(lineCount, [4 + 34 * j, 5 + 34 * j]);
    lineCount++;
    Line(lineCount, [5 + 34 * j, 2 + 34 * j]);
    lineCount++;
    Line(lineCount, [2 + 34 * j, 6 + 34 * j]);
    lineCount++;
    Line(lineCount, [6 + 34 * j, 7 + 34 * j]);
    lineCount++;
    Line(lineCount, [7 + 34 * j, 8 + 34 * j]);
    lineCount++;
    Line(lineCount, [8 + 34 * j, 9 + 34 * j]);
    lineCount++;
    Line(lineCount, [9 + 34 * j, 6 + 34 * j]);
    lineCount++;
    Line(lineCount, [9 + 34 * j, 10 + 34 * j]);
    lineCount++;
    if (j == n_f + 1) { break; }
    for (var i = 0; i < 10; ++i) {
        Line(lineCount, [1 + i + 34 * j, 35 + i + 34 * j]);
        lineCount++;
    }
}

// Create surface - interior walls
var start_n_l = 9 * (n_f + 1) + 1;   // Number of first line of interior walls
for (var j = 0; j < n_f + 1; ++j) {
    var sur = new Surface();
    sur.Standard(surfaceCount,[start_n_l + 21 * j, start_n_l + 11 + 21 * j, start_n_l + 21 + 21 * j, start_n_l + 12 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 4 + 21 * j, start_n_l + 15 + 21 * j, start_n_l + 25 + 21 * j, start_n_l + 12 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 3 + 21 * j, start_n_l + 14 + 21 * j, start_n_l + 24 + 21 * j, start_n_l + 15 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 2 + 21 * j, start_n_l + 13 + 21 * j, start_n_l + 23 + 21 * j, start_n_l + 14 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 1 + 21 * j, start_n_l + 12 + 21 * j, start_n_l + 22 + 21 * j, start_n_l + 13 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 5 + 21 * j, start_n_l + 16 + 21 * j, start_n_l + 26 + 21 * j, start_n_l + 12 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 6 + 21 * j, start_n_l + 17 + 21 * j, start_n_l + 27 + 21 * j, start_n_l + 16 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 7 + 21 * j, start_n_l + 18 + 21 * j, start_n_l + 28 + 21 * j, start_n_l + 17 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 8 + 21 * j, start_n_l + 19 + 21 * j, start_n_l + 29 + 21 * j, start_n_l + 18 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 9 + 21 * j, start_n_l + 16 + 21 * j, start_n_l + 30 + 21 * j, start_n_l + 19 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
    sur.Standard(surfaceCount,[start_n_l + 10 + 21 * j, start_n_l + 20 + 21 * j, start_n_l + 31 + 21 * j, start_n_l + 19 + 21 * j], thicknessWall.GetNo());
    surfaceCount++;
}

// Openings
var open_no = 1;
var start_n_o = 9 * (n_f + 1) + 23;
for (var j = 0; j < n_f; ++j) {
    Opening(open_no, [start_n_o + 21 * j, start_n_o + 1 + 21 * j, start_n_o + 2 + 21 * j, start_n_o + 3 + 21 * j]);
    open_no++;
    Opening(open_no, [start_n_o + 5 + 21 * j, start_n_o + 6 + 21 * j, start_n_o + 7 + 21 * j, start_n_o + 8 + 21 * j]);
    open_no++;
}

// Define Supports
var nodalSupport = new NodalSupport();
nodalSupport.Hinged();

var lineSupport = new LineSupport();
lineSupport.Hinged();
lineSupport.RotationZ(true);

// Assign Supports
for (var i = 0; i < 8; ++i) {
    nodes[19 + i].support = nodalSupport.GetNo();
}
for (var i = 0; i < 11; ++i) {
    lines[9 * (n_f + 1) + 1 + i].support = lineSupport.GetNo();
}

//load 
var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings();
SASSecondOrder.SecondOrder(2,"MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");
var lc1 = new LoadCase();
lc1.StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);