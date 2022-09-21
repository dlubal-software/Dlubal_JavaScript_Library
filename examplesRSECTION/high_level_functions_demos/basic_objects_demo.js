if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");

var pointsList = [
    [0.1, -0.15], [0.1, -0.144], [0.097656854249492, -0.138343145750508], [0.092, -0.136], [0.015, -0.136], [0.007928932188135, -0.133071067811865], [0.005, -0.126],
    [0.005, 0.126], [0.007928932188135, 0.133071067811865], [0.015, 0.136], [0.092, 0.136], [0.097656854249492, 0.138343145750508], [0.1, 0.144], [0.1, 0.15],
    [-0.1, 0.15], [-0.1, 0.144], [-0.097656854249492, 0.138343145750508], [-0.092, 0.136], [-0.015, 0.136], [-0.007928932188135, 0.133071067811865], [-0.005, 0.126],
    [-0.005, -0.126], [-0.007928932188135, -0.133071067811865], [-0.015, -0.136], [-0.092, -0.136], [-0.097656854249492, -0.138343145750508], [-0.1, -0.144],
    [-0.1, -0.15]
];

var polylinesList = [
    [1, 2], [4, 5], [7, 8], [10, 11], [13, 14], [14, 15], [15,16], [18, 19], [21, 22], [24, 25], [27, 28], [28, 1]
];

var arclineList = [
    [2, 4, 3], [5, 7, 6], [8, 10, 9], [11, 13, 12], [16, 18, 17], [19, 21, 20], [22, 24, 23], [25, 27, 26]
];

var rsPoint = new RSectionPoint();
var rsLine = new RSectionLine();
var linesForPart = [];

for (var i = 0; i < pointsList.length; ++i) {
    rsPoint.Standard(undefined, pointsList[i][0], pointsList[i][1]);
}

for (var i = 0; i < polylinesList.length; ++i) {
    linesForPart.push(rsLine.Polyline(undefined, polylinesList[i]));
}

for (var i = 0; i < arclineList.length; ++i) {
    if (i == 0 || i == 7) {
        continue;
    }
    var point = points[arclineList[i][2]];
    linesForPart.push(rsLine.Arc(undefined, [arclineList[i][0], arclineList[i][1]], [point.coordinate_1, point.coordinate_2]));
}

linesForPart.push(rsLine.Parabola(undefined, [25, 27], [-0.092, -0.143]));
linesForPart.push(rsLine.Parabola(undefined, [2, 4], [0.092, -0.143]));
var circleLine1 = rsLine.Circle(undefined, [0, -0.140], 0.005);
var circleLine2 = rsLine.Circle(undefined, [0, 0.140], 0.005);
// var opening = 

var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(undefined, linesForPart, material);
//rsPart.IntegratedObjects(true, false, [opening]);

/*************************************************** Other ************************************/
pointCoordinates = [
    [0.240, -0.140], [0.180, -0.040], [0.200, -0.060], [0.220, -0.060], [0.080, -0.080], [0.100, -0.100], [0.120, -0.080],
    [0.140, -0.100], [0.160, -0.080]
];
var otherPoints = [];
for (var i = 0; i < pointCoordinates.length; ++i) {
    otherPoints.push(rsPoint.Standard(undefined, pointCoordinates[i][0], pointCoordinates[i][1]));
}

rsLine.Ellipse(undefined, otherPoints[1], otherPoints[3], [otherPoints[2].coordinate_1, otherPoints[2].coordinate_2]);

var NURBSline = new RSectionLine();
NURBSline.NURBS(undefined, [otherPoints[4], otherPoints[8]], [[otherPoints[5].coordinate_1, otherPoints[5].coordinate_2], [otherPoints[6].coordinate_1, otherPoints[6].coordinate_2],
    [otherPoints[7].coordinate_1, otherPoints[7].coordinate_2]], 3);
NURBSline.PointsOnLine([[0.1, true], [0.3, true], [0.1, false]]);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
