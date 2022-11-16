// var l_1 = 20.260;
// //var l_2 = 4.500;
// var l_3 = 4.300;
// var l_4 = 3.500;
// var h = 2.900;
// var d_1 = 0.260;
// var d_2 = 0.400;
// var d_3 = 0.250;
// var d_4 = 0.200;
// var corner_1 = [0.60, 0.30];  // chamfer for internal corners [y, z]
// var corner_2 = [0.25, 0.25];  // chamfer for internal corners [y, z]
// var r_1 = 0.5
// var r_2 = 0.4
// var alpha = 60;
run("../includes/Tools/clearAll.js");
// create material and section
var materialConcrete = new Material(1, 'C25/30');

// Create empty points
var alphaR = alpha*PI/180;
var x = tan(PI/2 - alphaR)*(h - d_1);
var l_2 = l_1/2 - l_3 - x - l_4/2;
var y = d_2*tan(PI/2 - alphaR);
var x_1 = d_2/cos(PI/2 - alphaR);
var d = (d_3/cos(PI/2 - alphaR))*cos(alphaR);
var chord_1 = 2*r_1*sin(alphaR/2);
var betaR = (PI - alphaR)/2;
var s_1 = (chord_1/2)/cos(PI/2 - betaR);
var chord_2 = 2*r_2*sin(alphaR/2);
var s_2 = (chord_2/2)/cos(PI/2 - betaR);

// Assign coordinate to points
var rsPoint = new RSectionPoint();
rsPoint.Standard( 1,-l_1/2,                                    0);
rsPoint.Standard( 2, l_1/2,                                    0);
rsPoint.Standard( 3, l_1/2,                                  d_1);
rsPoint.Standard( 4,-l_1/2,                                  d_1);
rsPoint.BetweenTwoLocations(5 , [-l_1/2 + l_2 + x_1,                d_1], [-l_4/2 - d_4/2,                    d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(6 , [-l_1/2 + l_2 + x_1,                d_1], [-l_1/2 + l_2 + x + x_1 - d,    h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(7 , [-l_4/2 - d_4/2,                    d_1], [-l_1/2 + l_2 + x_1,                d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(8 , [-l_4/2 - d_4/2,                    d_1], [-l_4/2 - d_4/2,                h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(9 , [-l_1/2 + l_2 + x + x_1 - d,    h - d_3], [-l_4/2 - d_4/2,                h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(10, [-l_1/2 + l_2 + x + x_1 - d,    h - d_3], [-l_1/2 + l_2 + x_1,                d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(11, [-l_4/2 - d_4/2,                h - d_3], [-l_1/2 + l_2 + x + x_1 - d,    h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(12, [-l_4/2 - d_4/2,                h - d_3], [-l_4/2 - d_4/2,                    d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(13, [-l_4/2 + d_4/2,                    d_1], [ l_4/2 - d_4/2,                    d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(14, [-l_4/2 + d_4/2,                    d_1], [-l_4/2 + d_4/2,                h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(15, [ l_4/2 - d_4/2,                    d_1], [-l_4/2 + d_4/2,                    d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(16, [ l_4/2 - d_4/2,                    d_1], [ l_4/2 - d_4/2,                h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(17, [-l_4/2 + d_4/2,                h - d_3], [ l_4/2 - d_4/2,                h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(18, [-l_4/2 + d_4/2,                h - d_3], [-l_4/2 + d_4/2,                    d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(19, [ l_4/2 - d_4/2,                h - d_3], [-l_4/2 + d_4/2,                h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(20, [ l_4/2 - d_4/2,                h - d_3], [ l_4/2 - d_4/2,                    d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(21, [ l_4/2 + d_4/2,                    d_1], [ l_1/2 - l_2 - x_1,                d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(22, [ l_4/2 + d_4/2,                    d_1], [ l_4/2 + d_4/2,                h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(23, [ l_1/2 - l_2 - x_1,                d_1], [ l_4/2 + d_4/2,                    d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(24, [ l_1/2 - l_2 - x_1,                d_1], [ l_1/2 - l_2 - x - x_1 + d,    h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(25, [ l_4/2 + d_4/2,                h - d_3], [ l_1/2 - l_2 - x - x_1 + d,    h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(26, [ l_4/2 + d_4/2,                h - d_3], [ l_4/2 + d_4/2,                    d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(27, [ l_1/2 - l_2 - x - x_1 + d,    h - d_3], [ l_4/2 + d_4/2,                h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(28, [ l_1/2 - l_2 - x - x_1 + d,    h - d_3], [ l_1/2 - l_2 - x_1,                d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(29, [-l_1/2 + l_2,                      d_1], [-l_1/2,                            d_1], s_1, undefined, false);
rsPoint.BetweenTwoLocations(30, [-l_1/2 + l_2,                      d_1], [-l_1/2 + l_2 + x,                    h], s_1, undefined, false);
rsPoint.BetweenTwoLocations(31, [-l_1/2 + l_2 - s_1,          d_1 + r_1], [-l_1/2 + l_2,                      d_1], r_1, undefined, false);
rsPoint.BetweenTwoLocations(32, [-l_1/2 + l_2 + x,                    h], [-l_1/2 + l_2,                      d_1], s_2, undefined, false);
rsPoint.BetweenTwoLocations(33, [-l_1/2 + l_2 + x,                    h], [ l_1/2 - l_2 - x,                    h], s_2, undefined, false);
rsPoint.BetweenTwoLocations(34, [-l_1/2 + l_2 + x + s_2,        h - r_2], [-l_1/2 + l_2 + x,                    h], r_2, undefined, false);
rsPoint.BetweenTwoLocations(35, [ l_1/2 - l_2 - x,                    h], [-l_1/2 + l_2 + x,                    h], s_2, undefined, false);
rsPoint.BetweenTwoLocations(36, [ l_1/2 - l_2 - x,                    h], [ l_1/2 - l_2,                      d_1], s_2, undefined, false);
rsPoint.BetweenTwoLocations(37, [ l_1/2 - l_2 - x - s_2,        h - r_2], [ l_1/2 - l_2 - x,                    h], r_2, undefined, false);
rsPoint.BetweenTwoLocations(38, [ l_1/2 - l_2,                      d_1], [ l_1/2,                            d_1], s_1, undefined, false);
rsPoint.BetweenTwoLocations(39, [ l_1/2 - l_2,                      d_1], [ l_1/2 - l_2 - x,                    h], s_1, undefined, false);
rsPoint.BetweenTwoLocations(40, [ l_1/2 - l_2 + s_1,          d_1 + r_1], [ l_1/2 - l_2,                      d_1], r_1, undefined, false);


var rsLine = new RSectionLine();
rsLine.Polyline(1, [1,  2]);
rsLine.Polyline(2, [2,  3]);
rsLine.Polyline(3, [3, 38]);
rsLine.Arc(4, [38, 39], [points[40].coordinate_1,points[40].coordinate_2]);
rsLine.Polyline(5, [39, 36]);
rsLine.Arc(6, [36, 35], [points[37].coordinate_1,points[37].coordinate_2]);
rsLine.Polyline(7, [35, 33]);
rsLine.Arc(8, [33, 32], [points[34].coordinate_1,points[34].coordinate_2]);
rsLine.Polyline(9, [32, 30]);
rsLine.Arc(10, [30, 29], [points[31].coordinate_1,points[31].coordinate_2]);
rsLine.Polyline(11, [29, 4]);
rsLine.Polyline(12, [4,  1]);
rsLine.Polyline(13, [5,   7]);
rsLine.Polyline(14, [7,   8]);
rsLine.Polyline(15, [8,  12]);
rsLine.Polyline(16, [12, 11]);
rsLine.Polyline(17, [11,  9]);
rsLine.Polyline(18, [9,  10]);
rsLine.Polyline(19, [10,  6]);
rsLine.Polyline(20, [6,   5]);
rsLine.Polyline(21, [13, 15]);
rsLine.Polyline(22, [15, 16]);
rsLine.Polyline(23, [16, 20]);
rsLine.Polyline(24, [20, 19]);
rsLine.Polyline(25, [19, 17]);
rsLine.Polyline(26, [17, 18]);
rsLine.Polyline(27, [18, 14]);
rsLine.Polyline(28, [14, 13]);
rsLine.Polyline(29, [21, 23]);
rsLine.Polyline(30, [23, 24]);
rsLine.Polyline(31, [24, 28]);
rsLine.Polyline(32, [28, 27]);
rsLine.Polyline(33, [27, 25]);
rsLine.Polyline(34, [25, 26]);
rsLine.Polyline(35, [26, 22]);
rsLine.Polyline(36, [22, 21]);

//part
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, materialConcrete.GetNo());

// Create opening
var boundaryLinesOpening1 = [13, 14, 15, 16, 17, 18, 19, 20];
var rsOpening1 = new RSectionOpening(1, boundaryLinesOpening1);
var boundaryLinesOpening2 = [21, 22, 23, 24, 25, 26, 27, 28];
var rsOpening2 = new RSectionOpening(2, boundaryLinesOpening2);
var boundaryLinesOpening3 = [29, 30, 31, 32, 33, 34, 35, 36];
var rsOpening3 = new RSectionOpening(3, boundaryLinesOpening3);
