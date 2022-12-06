// Script to create C section
if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

run("../includes/Tools/clearAll.js");
this.general.solver_model = this.general.THIN_WALLED; // or this.general.MASSIVE

// count of objects
var outlinePointsCount = 28;
var outlineLinesCount = 20;
var elementPointsCount = 14;
var elementsCount = 9;
var elementThickness = 0.002;
var materialId = 1;

// create material
var steelMaterial = new Material(materialId, 'S355 | EN 1993-1-1:2005-05');

// initialize points
var pointsList = [
    // element points
    [0.025, 0.0670381], [0.039, 0.0670381], [0.05, 0.0560381], [0.05, -0.0399619], [0.039, -0.0509619], [-0.039, -0.0509619], [-0.05, -0.0399619], [-0.05, 0.0560381], [-0.039, 0.0670381], [-0.025, 0.0670381],
    // elements arc points
    [0.046778174593052, 0.063816274593052], [0.046778174593052, -0.047740074593052], [-0.046778174593052, -0.047740074593052], [-0.046778174593052, 0.063816274593052],
    // outline points
    [0.025, 0.0660381], [0.038975451353343, 0.0660381], [0.046070215076575, 0.063108315007183], [0.049, 0.056013551353343], [0.049, -0.039937351353343], [0.046729172315014, -0.046305067726116], [0.038975451353343, -0.0499619],
    [-0.038975451353343, -0.0499619], [-0.046729172315014, -0.046305067726116], [-0.049, -0.039937351353343], [-0.049, 0.056013551353343], [-0.044555032272319, 0.064351793398864], [-0.038975451353343, 0.0660381], [-0.025, 0.0660381],
    [-0.025, 0.0680381], [-0.038975451353343, 0.0680381], [-0.048211074503467, 0.06372438571167], [-0.051, 0.056013551353343], [-0.051, -0.039937351353343], [-0.0457464309629, -0.049882008407304], [-0.038975451353343, -0.0519619],
    [0.038975451353343, -0.0519619], [0.048335587377975, -0.047496466335101], [0.051, -0.039937351353343], [0.051, 0.056013551353343], [0.04668628571167, 0.065249174503467], [0.038975451353343, 0.0680381], [0.025, 0.0680381]
];

var rsPoint = new RSectionPoint();
for (var i = 0; i < pointsList.length; ++i) {
    rsPoint.Standard(i+1, pointsList[i][0], pointsList[i][1]);
}

// initialize lines
var rsLine = new RSectionLine();
rsLine.Polyline(1,[15, 16]);
rsLine.Arc(2, [16, 18], [points[17].coordinate_1, points[17].coordinate_2]);
rsLine.Polyline(3,[18, 19]);
rsLine.Arc(4, [19, 21], [points[20].coordinate_1, points[20].coordinate_2]);
rsLine.Polyline(5,[21, 22]);
rsLine.Arc(6,  [22, 24], [points[23].coordinate_1, points[23].coordinate_2]);
rsLine.Polyline(7, [24, 25]);
rsLine.Arc(8,  [25, 27], [points[26].coordinate_1, points[26].coordinate_2]);
rsLine.Polyline(9,[27, 28]);
rsLine.Polyline(10, [28, 29]);
rsLine.Polyline(11,[29, 30]);
rsLine.Arc(12, [30, 32], [points[31].coordinate_1, points[31].coordinate_2]);
rsLine.Polyline(13,[32, 33]);
rsLine.Arc(14, [33, 35], [points[34].coordinate_1, points[34].coordinate_2]);
rsLine.Polyline(15,[35, 36]);
rsLine.Arc(16, [36, 38], [points[37].coordinate_1, points[37].coordinate_2]);
rsLine.Polyline(17,[38, 39]);
rsLine.Arc(18, [39, 41], [points[40].coordinate_1, points[40].coordinate_2]);
rsLine.Polyline(19, [15, 42]);
rsLine.Polyline(20, [42, 41]);


// initialize elements
var element = new RSectionElement();
element.SingleLine(1, [2, 1], elementThickness);
element.SingleLine(2, [3, 4], elementThickness);
element.SingleLine(3, [5, 6], elementThickness);
element.SingleLine(4, [7, 8], elementThickness);
element.SingleLine(5, [9, 10], elementThickness);
element.Arc(6,  [2, 3],  [points[11].coordinate_1, points[11].coordinate_2],elementThickness);
element.Arc(7,  [4, 5], [points[12].coordinate_1, points[12].coordinate_2],elementThickness);
element.Arc(8,  [6, 7], [points[13].coordinate_1, points[13].coordinate_2],elementThickness);
element.Arc(9,  [8, 9], [points[14].coordinate_1, points[14].coordinate_2],elementThickness);




// initialize parts
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, steelMaterial.GetNo());


// initialize loads and internal forces
var load_case = new RSectionLoadCase(undefined, "PERMANENT_G", "First load case", false);

var internal_force = new RSectionInternalForces(undefined, load_case.no, "Y_Z",1,0.5);
internal_force.AxialForce(-1000.0);
internal_force.ShearForces(0.0, 0.0);
internal_force.TorsionalMoments(0.0, 0.0);
internal_force.BendingMoments(0.0, 0.0);
