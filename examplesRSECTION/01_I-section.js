if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

run("../includes/Tools/clearAll.js");

// count of objects
var pointsCount = 28;
var linesCount = 20;

// create material and section
var materialSteel = new Material(1, 'S235');

var pointsList = [[0.1, -0.15], [0.1, -0.144], [0.097656854249492, -0.138343145750508], [0.092, -0.136], [0.015, -0.136], [0.007928932188135, -0.133071067811865], [0.005, -0.126],
[0.005, 0.126], [0.007928932188135, 0.133071067811865], [0.015, 0.136], [0.092, 0.136], [0.097656854249492, 0.138343145750508], [0.1, 0.144], [0.1, 0.15], [-0.1, 0.15], [-0.1, 0.144],
[-0.097656854249492, 0.138343145750508], [-0.092, 0.136], [-0.015, 0.136], [-0.007928932188135, 0.133071067811865], [-0.005, 0.126], [-0.005, -0.126], [-0.007928932188135, -0.133071067811865],
[-0.015, -0.136], [-0.092, -0.136], [-0.097656854249492, -0.138343145750508], [-0.1, -0.144], [-0.1, -0.15]];

var rsPoint = new RSectionPoint();

for (var i = 0; i < pointsList.length; ++i) {
    rsPoint.Standard(i+1, pointsList[i][0], pointsList[i][1]);
}

// initialize lines
var rsLine = new RSectionLine();
rsLine.Polyline(1, [1, 2]);
rsLine.Polyline(2, [4, 5]);
rsLine.Polyline(3, [7, 8]);
rsLine.Polyline(4, [10, 11]);
rsLine.Polyline(5, [13, 14]);
rsLine.Polyline(6, [14, 15]);
rsLine.Polyline(7, [15, 16]);
rsLine.Polyline(8, [18, 19]);
rsLine.Polyline(9, [21, 22]);
rsLine.Polyline(10, [24, 25]);
rsLine.Polyline(11, [27, 28]);
rsLine.Polyline(12, [28, 1]);
rsLine.Arc(13, [2, 4], [points[3].coordinate_1, points[3].coordinate_2]);
rsLine.Arc(14, [5, 7], [points[6].coordinate_1,points[6].coordinate_2]);
rsLine.Arc(15, [8, 10], [points[9].coordinate_1,points[9].coordinate_2]);
rsLine.Arc(16, [11, 13], [points[12].coordinate_1,points[12].coordinate_2]);
rsLine.Arc(17, [16, 18], [points[17].coordinate_1,points[17].coordinate_2]);
rsLine.Arc(18, [19, 21], [points[20].coordinate_1,points[20].coordinate_2]);
rsLine.Arc(19, [22, 24], [points[23].coordinate_1,points[23].coordinate_2]);
rsLine.Arc(20, [25, 27], [points[26].coordinate_1,points[26].coordinate_2]);

// initialize parts
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, materialSteel.GetNo());

var load_case = new RSectionLoadCase(undefined, "PERMANENT_G", "First load case", false);

var internal_force = new RSectionInternalForces(undefined, load_case.no, "Y_Z");
internal_force.AxialForce(1500);
internal_force.ShearForces(2000, 2500);
internal_force.TorsionalMoments(500, 800);
internal_force.BendingMoments(1000, 2000);