if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

var material = new Material(undefined, "S235");
var section = new Section(1, "IPE 80", material.GetNo());
var section2 = new Section(2, "IPE 100", material.GetNo());

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
var circleLine = rsLine.Circle(undefined, [0, -0.140], 0.005);
var circleLine2 = rsLine.Circle(undefined, [0, 0.140], 0.005);
var opening = new RSectionOpening(undefined, [circleLine]);
var opening2 = new RSectionOpening(undefined, [circleLine2]);

var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(undefined, linesForPart, material.GetNo());
rsPart.IntegratedObjects(true, false, [opening, opening2]);

rsPart.Rectangle(undefined, [0.08, -0.04], 0.06, 0.04, material.GetNo(), "Rectangle Part");
rsPart.Triangle(undefined, [0.1, 0.02], [0.06, 0.06], [0.14, 0.06], material.GetNo(), "Triangle Part");
rsPart.Circle(undefined, [0.2, 0.04], 0.05, material.GetNo());
rsPart.Polygon(undefined, [[0.3, 0], [0.36, -0.02], [0.4, 0], [0.4, 0.04], [0.36, 0.08], [0.3, 0.06]], material.GetNo());

var rsOpening = new RSectionOpening();
rsOpening.Rectangle(undefined, [0.180, 0], 0.02, 0.02);
rsOpening.Triangle(undefined, [0.16, 0.04], [0.18, 0.04], [0.18, 0.06]);
rsOpening.Circle(undefined, [0.22, 0.02], 0.01);
rsOpening.Polygon(undefined, [[0.24, 0.04], [0.22, 0.04], [0.2, 0.06], [0.22, 0.08], [0.24, 0.06]]);

/***********************************************Elements** ************************************/
var element = new RSectionElement();
element.SingleLine(undefined, [28, 1]);
element.Thickness(0.005, 0.005);
element.Arc(undefined, [16, 18], [points[17].coordinate_1, points[17].coordinate_2]);
element.Thickness(0.005, 0.005);
element.Arc(undefined, [11, 13], [points[12].coordinate_1, points[12].coordinate_2]);
element.Thickness(0.005, 0.005);
element.Circle(undefined, [0, -0.140], 0.005);
element.Circle(undefined, [0.197, 0.04], 0.005);
element.Thickness(0.005, 0.005);
element.Parabola(undefined, [25, 27], [-0.092, -0.143]);
element.Parabola(undefined, [2, 4], [0.092, -0.143]);

/******************************** lines + elements + stress point ****************************/
pointCoordinates = [
    [0.240, -0.140], [0.180, -0.040], [0.200, -0.060], [0.220, -0.060], [0.080, -0.080], [0.100, -0.100], [0.120, -0.080],
    [0.140, -0.100], [0.160, -0.080]
];
var otherPoints = [];
for (var i = 0; i < pointCoordinates.length; ++i) {
    otherPoints.push(rsPoint.Standard(undefined, pointCoordinates[i][0], pointCoordinates[i][1]));
}

rsLine.Ellipse(undefined, otherPoints[1], otherPoints[3], [otherPoints[2].coordinate_1, otherPoints[2].coordinate_2]);
//rsLine.Parabola(undefined, )

var NURBSline = new RSectionLine();
NURBSline.NURBS(undefined, [otherPoints[4], otherPoints[8]], [[otherPoints[5].coordinate_1, otherPoints[5].coordinate_2], [otherPoints[6].coordinate_1, otherPoints[6].coordinate_2],
    [otherPoints[7].coordinate_1, otherPoints[7].coordinate_2]], 3);
NURBSline.PointsOnLine([[0.1, true, "L"], [0.3, true], [0.1, false]]);

element.Ellipse(undefined, otherPoints[1], otherPoints[3], [otherPoints[2].coordinate_1, otherPoints[2].coordinate_2]);
element.NURBS(undefined, [otherPoints[4], otherPoints[8]], [[otherPoints[5].coordinate_1, otherPoints[5].coordinate_2], [otherPoints[6].coordinate_1, otherPoints[6].coordinate_2],
    [otherPoints[7].coordinate_1, otherPoints[7].coordinate_2]], 3);

var stressPoint = new RSectionStressPoint;
stressPoint.Standard(undefined, 1, undefined, [0, 0.1]);
stressPoint.OnLine(undefined, 6, [0.75, undefined]);
stressPoint.OnLine(undefined, 6, [undefined, 0.01, false]);     // absolute distances
stressPoint.OnElement(undefined, 5, [0.10, undefined]);   // relative distances

/*********************************************** Bar ********************************************/
general.has_concerete_reinforcement = true;
var bar = new Bar();
bar.MultiUniform(undefined, 31, 32, material2.GetNo(), 1, "REFERENCE_TYPE_Y", 0.025, -0.020);     // With default 2 bars
var bar2 = new Bar();
bar2.MultiVariable(undefined, 28, 1, material2.GetNo(), 1, "REFERENCE_TYPE_Z", 0.010, -0.020, undefined, undefined, 0.020, 0.010); // With added axial distance sj
var bar3 = new Bar();
bar3.SingleBetweenTwoPoints(undefined, 15, 14, material2.GetNo(), 1, undefined, 0.010, -0.020, undefined, 0.040, false); // With default ("L") reference type and absolute Xj-k value specified
var bar4 = new Bar();
bar4.SingleBetweenTwoPoints(undefined, 15, 14, material2.GetNo(), 1, undefined, 0.010, -0.020, 0.3); // With default ("L") reference type and relative Xi-k value specified
var bar5 = new Bar();
bar5.SinglePoint(undefined, 40, material2.GetNo(), 1, undefined, 0.05, 0.05);  // With default diameter

/***************************************** Bar + Stirrups****************************************/
var concreteMaterial = new Material(undefined, "C12/15");
var reinforcedSteelMaterial = new Material(undefined, "Grade 40");
rsPart.Rectangle(undefined, [0.3, -0.18], 0.28, 0.11, concreteMaterial.GetNo());
var stirrup = new Stirrup(undefined, [501, 502, 503, 504, 501], reinforcedSteelMaterial.GetNo(), 0.022, 0.022, 1);
var bar6 = new Bar();
bar6.SinglePoint(undefined, 511, material2.GetNo(), 1);  // With default diameter and offsets
bar6.SinglePoint(undefined, 508, material2.GetNo(), 1);  // With default diameter and offsets
bar6.SinglePoint(undefined, 513, material2.GetNo(), 1);  // With default diameter and offsets
bar6.SinglePoint(undefined, 516, material2.GetNo(), 1);  // With default diameter and offsets

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
