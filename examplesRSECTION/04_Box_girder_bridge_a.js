// var l_1 = 16.260;
// //var l_2 = 4.500;
// var l_3 = 6.080;
// var h = 2.600;
// var d_1 = 0.260;
// var d_2 = 0.400;
// var d_3 = 0.250;
// var corner_1 = [0.60, 0.30]; // chamfer for internal corners [y, z]
// var corner_2 = [0.25, 0.25]; // chamfer for internal corners [y, z]
// var r_1 = 0.5
// var r_2 = 0.4
// var alpha = 65;
run("../includes/Tools/clearAll.js");
// create material and section
var concreteMarterial = new Material(1, 'C25/30');

// Create empty points
var alphaR = alpha * PI / 180;
var x = tan(PI / 2 - alphaR) * (h - d_1);
var l_2 = l_1 / 2 - l_3 / 2 - x;
var y = d_2 * tan(PI / 2 - alphaR);
var l_4 = sqrt(sqr(y) + sqr(d_2));
var x_1 = d_2 / cos(PI / 2 - alphaR);
var d = (d_3 / cos(PI / 2 - alphaR)) * cos(alphaR);
var chord_1 = 2 * r_1 * sin(alphaR / 2);
var betaR = (PI - alphaR) / 2;
var s_1 = (chord_1 / 2) / cos(PI / 2 - betaR);
var chord_2 = 2 * r_2 * sin(alphaR / 2);
var s_2 = (chord_2 / 2) / cos(PI / 2 - betaR);

var rsPoint = new RSectionPoint();
rsPoint.Standard(1, -l_1 / 2, 0);
rsPoint.Standard(2, l_1 / 2, 0);
rsPoint.Standard(3, l_1 / 2, d_1);
rsPoint.Standard(4, -l_1 / 2, d_1);

// Assign coordinate to points
rsPoint.BetweenTwoLocations(5, [-l_1 / 2 + l_2 + l_4, d_1], [l_1 / 2 - l_2 - l_4, d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(6, [l_1 / 2 - l_2 - l_4, d_1], [-l_1 / 2 + l_2 + l_4, d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(7, [-l_1 / 2 + l_2 + l_4, d_1], [-l_3 / 2 + x_1 - d, h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(8, [l_1 / 2 - l_2 - l_4, d_1], [l_3 / 2 - x_1 + d, h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(9, [-l_3 / 2 + x_1 - d, h - d_3], [-l_1 / 2 + l_2 + l_4, d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(10, [l_3 / 2 - x_1 + d, h - d_3], [l_1 / 2 - l_2 - l_4, d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(11, [-l_3 / 2 + x_1 - d, h - d_3], [l_3 / 2 - x_1 + d, h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(12, [l_3 / 2 - x_1 + d, h - d_3], [-l_3 / 2 + x_1 - d, h - d_3], corner_2[0], undefined, false);
rsPoint.Standard(13, -l_1 / 2 + l_2 - s_1, d_1);
rsPoint.BetweenTwoLocations(14, [-l_1 / 2 + l_2, d_1], [-l_3 / 2, h], s_1, undefined, false);
rsPoint.BetweenTwoLocations(15, [-l_1 / 2 + l_2 - s_1, d_1 + r_1], [-l_1 / 2 + l_2, d_1], r_1, undefined, false);
rsPoint.Standard(16, l_1 / 2 - l_2 + s_1, d_1);
rsPoint.BetweenTwoLocations(17, [l_1 / 2 - l_2, d_1], [l_3 / 2, h], s_1, undefined, false);
rsPoint.BetweenTwoLocations(18, [l_1 / 2 - l_2 + s_1, d_1 + r_1], [l_1 / 2 - l_2, d_1], r_1, undefined, false);
rsPoint.BetweenTwoLocations(19, [-l_3 / 2, h], [-l_1 / 2 + l_2, d_1], s_2, undefined, false);
rsPoint.Standard(20, -l_3 / 2 + s_2, h);
rsPoint.BetweenTwoLocations(21, [-l_3 / 2 + s_2, h - r_2], [-l_3 / 2, h], r_2, undefined, false);
rsPoint.Standard(22, l_3 / 2 - s_2, h);
rsPoint.BetweenTwoLocations(23, [l_3 / 2, h], [l_1 / 2 - l_2, d_1], s_2, undefined, false);
rsPoint.BetweenTwoLocations(24, [l_3 / 2 - s_2, h - r_2], [l_3 / 2, h], r_2, undefined, false);


var rsLine = new RSectionLine();
rsLine.Polyline(1, [1, 2]);
rsLine.Polyline(2, [2, 3]);
rsLine.Polyline(3, [3, 16]);
rsLine.Arc(4, [16, 17], [points[18].coordinate_1, points[18].coordinate_2]);
rsLine.Polyline(5, [17, 23]);
rsLine.Arc(6, [23, 22], [points[24].coordinate_1, points[24].coordinate_2]);
rsLine.Polyline(7, [22, 20]);
rsLine.Arc(8, [20, 19], [points[21].coordinate_1, points[21].coordinate_2]);
rsLine.Polyline(9, [19, 14]);
rsLine.Arc(10, [14, 13], [points[15].coordinate_1, points[15].coordinate_2]);
rsLine.Polyline(11, [13, 4]);
rsLine.Polyline(12, [4, 1]);
rsLine.Polyline(13, [5, 6]);
rsLine.Polyline(14, [6, 8]);
rsLine.Polyline(15, [8, 10]);
rsLine.Polyline(16, [10, 12]);
rsLine.Polyline(17, [12, 11]);
rsLine.Polyline(18, [11, 9]);
rsLine.Polyline(19, [9, 7]);
rsLine.Polyline(20, [7, 5]);


//part
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, concreteMarterial.GetNo());

// Create opening
var boundaryLinesOpening = [13, 14, 15, 16, 17, 18, 19, 20];
var rsOpening = new RSectionOpening(1, boundaryLinesOpening);

