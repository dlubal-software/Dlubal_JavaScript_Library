// var l_1 = 16.260;
// //var l_2 = 4.500;
// var l_3 = 6.080;
// var h = 3.200;
// var d_1 = 0.260;
// var d_2 = 0.400;
// var d_3 = 0.250;
// var d_4 = 0.550;
// var f = 0.8;
// var corner_1 = [0.60, 0.30]; // chamfer for internal corners [y, z]
// var corner_2 = [0.25, 0.25]; // chamfer for internal corners [y, z]
// var r = 0.4
// var alpha = 65;
run("../includes/Tools/clearAll.js");
// create material and section
var concreteMarterial = new Material(1, 'C25/30');

// Create empty points
var alphaR = alpha*PI/180;
var x = tan(PI/2 - alphaR)*(h - d_4);
var l_2 = l_1/2 - l_3/2 - x;
var y = d_2*tan(PI/2 - alphaR);
var l_4 = sqrt(sqr(y) + sqr(d_2));
var x_1 = d_2/cos(PI/2 - alphaR);
var d = (d_3/cos(PI/2 - alphaR))*cos(alphaR);
var chord = 2*r*sin(alphaR/2);
var betaR = (PI - alphaR)/2;
var s = (chord/2)/cos(PI/2 - betaR);
var w = (corner_1[1] + f)*tan(PI/2 - alphaR);
var k = (d_4 - d_1)*tan(PI/2 - alphaR);

var rsPoint = new RSectionPoint();
// Assign coordinate to points
rsPoint.Standard( 1,-l_1/2,                                           0);
rsPoint.Standard( 2, l_1/2,                                           0);
rsPoint.Standard( 3, l_1/2,                                         d_1);
rsPoint.Standard( 4, l_1/2 - l_2,                                   d_4);
rsPoint.Standard( 5,-l_1/2 + l_2,                                   d_4);
rsPoint.Standard( 6,-l_1/2,                                         d_1);
rsPoint.Standard( 7,-l_1/2 + l_2 - k + l_4 + w,   d_1 + corner_1[1] + f);
rsPoint.Standard( 8, l_1/2 - l_2 + k - l_4 - w,   d_1 + corner_1[1] + f);
rsPoint.BetweenTwoLocations(9 , [-l_3/2,                             h], [-l_1/2 + l_2,                                             d_4], s, undefined, false);
rsPoint.BetweenTwoLocations(10, [-l_3/2,                             h], [ l_3/2,                                                     h], s, undefined, false);
rsPoint.BetweenTwoLocations(11, [-l_3/2 + s,                     h - r], [-l_3/2,                                                     h], r, undefined, false);
rsPoint.BetweenTwoLocations(12, [ l_3/2,                             h], [ l_1/2 - l_2,                                             d_4], s, undefined, false);
rsPoint.BetweenTwoLocations(13, [ l_3/2,                             h], [-l_3/2,                                                     h], s, undefined, false);
rsPoint.BetweenTwoLocations(14, [ l_3/2 - s,                     h - r], [ l_3/2,                                                     h], r, undefined, false);
rsPoint.BetweenTwoLocations(15, [-l_1/2 + l_2 - k + l_4 + w,       d_1], [ l_1/2 - l_2 + k - l_4 - w,                     d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(16, [-l_1/2 + l_2 - k + l_4 + w,       d_1], [-l_1/2 + l_2 - k + l_4 + w,   d_1 + corner_1[1] + f], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(17, [ l_1/2 - l_2 + k - l_4 - w,       d_1], [-l_1/2 + l_2 - k + l_4 + w,                     d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(18, [ l_1/2 - l_2 + k - l_4 - w,       d_1], [ l_1/2 - l_2 + k - l_4 - w,   d_1 + corner_1[1] + f], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(19, [-l_3/2 + x_1 - d,             h - d_3], [-l_1/2 + l_2 - k + l_4 + w,   d_1 + corner_1[1] + f], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(20, [-l_3/2 + x_1 - d,             h - d_3], [ l_3/2 - x_1 + d,                           h - d_3], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(21, [ l_3/2 - x_1 + d,             h - d_3], [-l_3/2 + x_1 - d,                           h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(22, [ l_3/2 - x_1 + d,             h - d_3], [ l_1/2 - l_2 + k - l_4 - w,   d_1 + corner_1[1] + f], corner_2[1], undefined, false);

var rsLine = new RSectionLine();
rsLine.Polyline(1, [1,  2]);
rsLine.Polyline(2, [2,  3]);
rsLine.Polyline(3, [3,  4]);
rsLine.Polyline(4, [4, 12]);
rsLine.Arc(5, [12, 13], [points[14].coordinate_1,points[14].coordinate_2]);
rsLine.Polyline(6, [13, 10]);
rsLine.Arc(7, [10,  9], [points[11].coordinate_1,points[11].coordinate_2]);
rsLine.Polyline(8,  [9, 5]);
rsLine.Polyline(9,  [5, 6]);
rsLine.Polyline(10, [6, 1]);

rsLine.Polyline(11, [15, 17]);
rsLine.Polyline(12, [17, 18]);
rsLine.Polyline(13, [18,  8]);
rsLine.Polyline(14, [8,  22]);
rsLine.Polyline(15, [22, 21]);
rsLine.Polyline(16, [21, 20]);
rsLine.Polyline(17, [20, 19]);
rsLine.Polyline(18, [19,  7]);
rsLine.Polyline(19, [7,  16]);
rsLine.Polyline(20, [16, 15]);

//part
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, concreteMarterial.GetNo());

// Create opening
var boundaryLinesOpening = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var rsOpening = new RSectionOpening(1, boundaryLinesOpening);
