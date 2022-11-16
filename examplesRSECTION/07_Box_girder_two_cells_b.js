// var l_1 = 24.500;
// var l_2 = 3.900;
// var l_3 = 5.410;
// //var l_4 = 1.200;
// var h = 2.900;
// var d_1 = 0.260;
// var d_2 = 0.400;
// var d_3 = 0.250;
// var corner_1 = [0.60, 0.30]; // chamfer for internal corners [y, z]
// var corner_2 = [0.25, 0.25]; // chamfer for internal corners [y, z]
// var r_1 = 0.5
// var r_2 = 0.4
// var alpha_1 = 65;
// var alpha_2 = 75;
run("../includes/Tools/clearAll.js");
// create material and section
var materialConcrete = new Material(1, 'C25/30');

var alpha_1R = alpha_1 * PI / 180;
var alpha_2R = alpha_2 * PI / 180;

var x_1 = tan(PI / 2 - alpha_1R) * (h - d_1);
var x_2 = tan(PI / 2 - alpha_2R) * (h - d_1);
var l_4 = l_1 - 2 * (l_2 + x_1 + x_2 + l_3);

var y_1 = d_2 * tan(PI / 2 - alpha_1R);
var y_2 = d_2 * tan(PI / 2 - alpha_2R);

var ls_1 = sqrt(sqr(y_1) + sqr(d_2));
var ls_2 = sqrt(sqr(y_2) + sqr(d_2));

var xo_1 = d_2 / cos(PI / 2 - alpha_1R);
var do_1 = (d_3 / cos(PI / 2 - alpha_1R)) * cos(alpha_1R);
var xo_2 = d_2 / cos(PI / 2 - alpha_2R);
var do_2 = (d_3 / cos(PI / 2 - alpha_2R)) * cos(alpha_2R);

var beta1_R = (PI - alpha_1R) / 2;
var chord_1 = 2 * r_1 * sin(alpha_1R / 2);
var s_1 = (chord_1 / 2) / cos(PI / 2 - beta1_R);
var chord_2 = 2 * r_2 * sin(alpha_1R / 2);
var s_2 = (chord_2 / 2) / cos(PI / 2 - beta1_R);

var beta2_R = (PI - alpha_2R) / 2;
var chord_3 = 2 * r_1 * sin(alpha_2R / 2);
var s_3 = (chord_3 / 2) / cos(PI / 2 - beta2_R);
var chord_4 = 2 * r_2 * sin(alpha_2R / 2);
var s_4 = (chord_4 / 2) / cos(PI / 2 - beta2_R);

// Assign coordinate to points
var rsPoint = new RSectionPoint();
rsPoint.Standard(1, -l_1 / 2, 0);
rsPoint.Standard(2, l_1 / 2, 0);
rsPoint.Standard(3, -l_1 / 2, d_1);
rsPoint.Standard(4, l_1 / 2, d_1);
rsPoint.BetweenTwoLocations(5, [l_1 / 2 - l_2, d_1], [l_1 / 2, d_1], s_1, undefined, false);
rsPoint.BetweenTwoLocations(6, [l_1 / 2 - l_2, d_1], [l_1 / 2 - l_2 - x_1, h], s_1, undefined, false);
rsPoint.BetweenTwoLocations(7, [l_1 / 2 - l_2 + s_1, d_1 + r_1], [l_1 / 2 - l_2, d_1], r_1, undefined, false);
rsPoint.BetweenTwoLocations(8, [l_1 / 2 - l_2 - x_1, h], [l_1 / 2 - l_2, d_1], s_2, undefined, false);
rsPoint.BetweenTwoLocations(9, [l_1 / 2 - l_2 - x_1, h], [l_4 / 2 + x_2, h], s_2, undefined, false);
rsPoint.BetweenTwoLocations(10, [l_1 / 2 - l_2 - x_1 - s_2, h - r_2], [l_1 / 2 - l_2 - x_1, h], r_2, undefined, false);
rsPoint.BetweenTwoLocations(11, [l_4 / 2 + x_2, h], [l_1 / 2 - l_2 - x_1, h], s_4, undefined, false);
rsPoint.BetweenTwoLocations(12, [l_4 / 2 + x_2, h], [l_4 / 2, d_1], s_4, undefined, false);
rsPoint.BetweenTwoLocations(13, [l_4 / 2 + x_2 + s_4, h - r_2], [l_4 / 2 + x_2, h], r_2, undefined, false);
rsPoint.BetweenTwoLocations(14, [l_4 / 2, d_1], [l_4 / 2 + x_2, h], s_3, undefined, false);
rsPoint.BetweenTwoLocations(15, [l_4 / 2, d_1], [-l_4 / 2, d_1], s_3, undefined, false);
rsPoint.BetweenTwoLocations(16, [l_4 / 2 - s_3, d_1 + r_1], [l_4 / 2, d_1], r_1, undefined, false);
rsPoint.BetweenTwoLocations(17, [-l_4 / 2, d_1], [l_4 / 2, d_1], s_3, undefined, false);
rsPoint.BetweenTwoLocations(18, [-l_4 / 2, d_1], [-l_4 / 2 - x_2, h], s_3, undefined, false);
rsPoint.BetweenTwoLocations(19, [-l_4 / 2 + s_3, d_1 + r_1], [-l_4 / 2, d_1], r_1, undefined, false);
rsPoint.BetweenTwoLocations(20, [-l_4 / 2 - x_2, h], [-l_4 / 2, d_1], s_4, undefined, false);
rsPoint.BetweenTwoLocations(21, [-l_4 / 2 - x_2, h], [-l_4 / 2 - x_2 - l_3, h], s_4, undefined, false);
rsPoint.BetweenTwoLocations(22, [-l_4 / 2 - x_2 - s_4, h - r_2], [-l_4 / 2 - x_2, h], r_2, undefined, false);
rsPoint.BetweenTwoLocations(23, [-l_4 / 2 - x_2 - l_3, h], [-l_4 / 2 - x_2, h], s_2, undefined, false);
rsPoint.BetweenTwoLocations(24, [-l_4 / 2 - x_2 - l_3, h], [-l_1 / 2 + l_2, d_1], s_2, undefined, false);
rsPoint.BetweenTwoLocations(25, [-l_4 / 2 - x_2 - l_3 + s_2, h - r_2], [-l_4 / 2 - x_2 - l_3, h], r_2, undefined, false);
rsPoint.BetweenTwoLocations(26, [-l_1 / 2 + l_2, d_1], [-l_4 / 2 - x_2 - l_3, h], s_1, undefined, false);
rsPoint.BetweenTwoLocations(27, [-l_1 / 2 + l_2, d_1], [-l_1 / 2, d_1], s_1, undefined, false);
rsPoint.BetweenTwoLocations(28, [-l_1 / 2 + l_2 - s_1, d_1 + r_1], [-l_1 / 2 + l_2, d_1], r_1, undefined, false);
rsPoint.BetweenTwoLocations(29, [-l_1 / 2 + l_2 + ls_1, d_1], [-l_4 / 2 - ls_2, d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(30, [-l_1 / 2 + l_2 + ls_1, d_1], [-l_4 / 2 - x_2 - l_3 + xo_1 - do_1, h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(31, [-l_4 / 2 - ls_2, d_1], [-l_1 / 2 + l_2 + ls_1, d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(32, [-l_4 / 2 - ls_2, d_1], [-l_4 / 2 - x_2 - xo_2 + do_2, h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(33, [-l_4 / 2 - x_2 - l_3 + xo_1 - do_1, h - d_3], [-l_4 / 2 - x_2 - xo_2 + do_2, h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(34, [-l_4 / 2 - x_2 - l_3 + xo_1 - do_1, h - d_3], [-l_1 / 2 + l_2 + ls_1, d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(35, [-l_4 / 2 - x_2 - xo_2 + do_2, h - d_3], [-l_4 / 2 - x_2 - l_3 + xo_1 - do_1, h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(36, [-l_4 / 2 - x_2 - xo_2 + do_2, h - d_3], [-l_4 / 2 - ls_2, d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(37, [l_4 / 2 + ls_2, d_1], [l_1 / 2 - l_2 - ls_1, d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(38, [l_4 / 2 + ls_2, d_1], [l_4 / 2 + x_2 + xo_2 - do_2, h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(39, [l_1 / 2 - l_2 - ls_1, d_1], [l_4 / 2 + ls_2, d_1], corner_1[0], undefined, false);
rsPoint.BetweenTwoLocations(40, [l_1 / 2 - l_2 - ls_1, d_1], [l_1 / 2 - l_2 - x_1 - xo_1 + do_1, h - d_3], corner_1[1], undefined, false);
rsPoint.BetweenTwoLocations(41, [l_4 / 2 + x_2 + xo_2 - do_2, h - d_3], [l_1 / 2 - l_2 - x_1 - xo_1 + do_1, h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(42, [l_4 / 2 + x_2 + xo_2 - do_2, h - d_3], [l_4 / 2 + ls_2, d_1], corner_2[1], undefined, false);
rsPoint.BetweenTwoLocations(43, [l_1 / 2 - l_2 - x_1 - xo_1 + do_1, h - d_3], [l_4 / 2 + x_2 + xo_2 - do_2, h - d_3], corner_2[0], undefined, false);
rsPoint.BetweenTwoLocations(44, [l_1 / 2 - l_2 - x_1 - xo_1 + do_1, h - d_3], [l_1 / 2 - l_2 - ls_1, d_1], corner_2[1], undefined, false);

// Create lines
var rsLine = new RSectionLine();
rsLine.Polyline(1, [1, 2]);
rsLine.Polyline(2, [2, 4]);
rsLine.Polyline(3, [4, 5]);
rsLine.Arc(4, [5, 6], [points[7].coordinate_1, points[7].coordinate_2]);
rsLine.Polyline(5, [6, 8]);
rsLine.Arc(6, [8, 9], [points[10].coordinate_1, points[10].coordinate_2]);
rsLine.Polyline(7, [9, 11]);
rsLine.Arc(8, [11, 12], [points[13].coordinate_1, points[13].coordinate_2]);
rsLine.Polyline(9, [12, 14]);
rsLine.Arc(10, [14, 15], [points[16].coordinate_1, points[16].coordinate_2]);
rsLine.Polyline(11, [15, 17]);
rsLine.Arc(12, [17, 18], [points[19].coordinate_1, points[19].coordinate_2]);
rsLine.Polyline(13, [18, 20]);
rsLine.Arc(14, [20, 21], [points[22].coordinate_1, points[22].coordinate_2]);
rsLine.Polyline(15, [21, 23]);
rsLine.Arc(16, [23, 24], [points[25].coordinate_1, points[25].coordinate_2]);
rsLine.Polyline(17, [24, 26]);
rsLine.Arc(18, [26, 27], [points[28].coordinate_1, points[28].coordinate_2]);
rsLine.Polyline(19, [27, 3]);
rsLine.Polyline(20, [3, 1]);
rsLine.Polyline(21, [29, 31]);
rsLine.Polyline(22, [31, 32]);
rsLine.Polyline(23, [32, 36]);
rsLine.Polyline(24, [36, 35]);
rsLine.Polyline(25, [35, 33]);
rsLine.Polyline(26, [33, 34]);
rsLine.Polyline(27, [34, 30]);
rsLine.Polyline(28, [30, 29]);
rsLine.Polyline(29, [37, 39]);
rsLine.Polyline(30, [39, 40]);
rsLine.Polyline(31, [40, 44]);
rsLine.Polyline(32, [44, 43]);
rsLine.Polyline(33, [43, 41]);
rsLine.Polyline(34, [41, 42]);
rsLine.Polyline(35, [42, 38]);
rsLine.Polyline(36, [38, 37]);

//part
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, materialConcrete.GetNo());

// Create opening
var boundaryLinesOpening1 = [21, 22, 23, 24, 25, 26, 27, 28];
var rsOpening1 = new RSectionOpening(1, boundaryLinesOpening1);
var boundaryLinesOpening2 = [29, 30, 31, 32, 33, 34, 35, 36];
var rsOpening2 = new RSectionOpening(2, boundaryLinesOpening2);