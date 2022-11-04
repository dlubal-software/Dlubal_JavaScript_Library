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
Material(1, 'C25/30')

// Create empty points
for (var i = 0; i < 44; i++)
{
    points.create();
};

var alpha_1R = alpha_1*PI/180;
var alpha_2R = alpha_2*PI/180;

var x_1 = tan(PI/2 - alpha_1R)*(h - d_1);
var x_2 = tan(PI/2 - alpha_2R)*(h - d_1);
var l_4 = l_1 - 2*(l_2 + x_1 + x_2 + l_3);

var y_1 = d_2*tan(PI/2 - alpha_1R);
var y_2 = d_2*tan(PI/2 - alpha_2R);

var ls_1 = sqrt(sqr(y_1) + sqr(d_2));
var ls_2 = sqrt(sqr(y_2) + sqr(d_2));

var xo_1 = d_2/cos(PI/2 - alpha_1R);
var do_1 = (d_3/cos(PI/2 - alpha_1R))*cos(alpha_1R);
var xo_2 = d_2/cos(PI/2 - alpha_2R);
var do_2 = (d_3/cos(PI/2 - alpha_2R))*cos(alpha_2R);

var beta1_R = (PI - alpha_1R)/2;
var chord_1 = 2*r_1*sin(alpha_1R/2);
var s_1 = (chord_1/2)/cos(PI/2 - beta1_R);
var chord_2 = 2*r_2*sin(alpha_1R/2);
var s_2 = (chord_2/2)/cos(PI/2 - beta1_R);

var beta2_R = (PI - alpha_2R)/2;
var chord_3 = 2*r_1*sin(alpha_2R/2);
var s_3 = (chord_3/2)/cos(PI/2 - beta2_R);
var chord_4 = 2*r_2*sin(alpha_2R/2);
var s_4 = (chord_4/2)/cos(PI/2 - beta2_R);

// function to set parameters of point between two location
function setPointBetweenTwoLocation(id, locations, absoluteLengthFromStart)
{
    this.points[id].type = this.points.TYPE_BETWEEN_TWO_LOCATIONS;
    this.points[id].between_two_locations_start_point_coordinate_1 = locations[0][0];
    this.points[id].between_two_locations_start_point_coordinate_2 = locations[0][1];
    this.points[id].between_two_locations_end_point_coordinate_1 = locations[1][0];
    this.points[id].between_two_locations_end_point_coordinate_2 = locations[1][1];
    this.points[id].distance_from_start_absolute = absoluteLengthFromStart;
};

// Assign coordinate to points
points[ 1].coordinates= $V([-l_1/2,                 0]);
points[ 2].coordinates= $V([ l_1/2,                 0]);
points[ 3].coordinates= $V([-l_1/2,               d_1]);
points[ 4].coordinates= $V([ l_1/2,               d_1]);
setPointBetweenTwoLocation(5 , [[ l_1/2 - l_2,                         d_1], [l_1/2,                                  d_1]], s_1);
setPointBetweenTwoLocation(6 , [[ l_1/2 - l_2,                         d_1], [ l_1/2 - l_2 - x_1,                       h]], s_1);
setPointBetweenTwoLocation(7 , [[ l_1/2 - l_2 + s_1,             d_1 + r_1], [ l_1/2 - l_2,                           d_1]], r_1);
setPointBetweenTwoLocation(8 , [[ l_1/2 - l_2 - x_1,                     h], [ l_1/2 - l_2,                           d_1]], s_2);
setPointBetweenTwoLocation(9 , [[ l_1/2 - l_2 - x_1,                     h], [ l_4/2 + x_2,                             h]], s_2);
setPointBetweenTwoLocation(10, [[ l_1/2 - l_2 - x_1 - s_2,         h - r_2], [ l_1/2 - l_2 - x_1,                       h]], r_2);
setPointBetweenTwoLocation(11, [[ l_4/2 + x_2,                           h], [ l_1/2 - l_2 - x_1,                       h]], s_4);
setPointBetweenTwoLocation(12, [[ l_4/2 + x_2,                           h], [ l_4/2,                                 d_1]], s_4);
setPointBetweenTwoLocation(13, [[ l_4/2 + x_2 + s_4,               h - r_2], [ l_4/2 + x_2,                             h]], r_2);
setPointBetweenTwoLocation(14, [[ l_4/2,                               d_1], [ l_4/2 + x_2,                             h]], s_3);
setPointBetweenTwoLocation(15, [[ l_4/2,                               d_1], [-l_4/2,                                 d_1]], s_3);
setPointBetweenTwoLocation(16, [[ l_4/2 - s_3,                   d_1 + r_1], [ l_4/2,                                 d_1]], r_1);
setPointBetweenTwoLocation(17, [[-l_4/2,                               d_1], [ l_4/2,                                 d_1]], s_3);
setPointBetweenTwoLocation(18, [[-l_4/2,                               d_1], [-l_4/2 - x_2,                             h]], s_3);
setPointBetweenTwoLocation(19, [[-l_4/2 + s_3,                   d_1 + r_1], [-l_4/2,                                 d_1]], r_1);
setPointBetweenTwoLocation(20, [[-l_4/2 - x_2,                           h], [-l_4/2,                                 d_1]], s_4);
setPointBetweenTwoLocation(21, [[-l_4/2 - x_2,                           h], [-l_4/2 - x_2 - l_3,                       h]], s_4);
setPointBetweenTwoLocation(22, [[-l_4/2 - x_2 - s_4,               h - r_2], [-l_4/2 - x_2,                             h]], r_2);
setPointBetweenTwoLocation(23, [[-l_4/2 - x_2 - l_3,                     h], [-l_4/2 - x_2,                             h]], s_2);
setPointBetweenTwoLocation(24, [[-l_4/2 - x_2 - l_3,                     h], [-l_1/2 + l_2,                           d_1]], s_2);
setPointBetweenTwoLocation(25, [[-l_4/2 - x_2 - l_3 + s_2,         h - r_2], [-l_4/2 - x_2 - l_3,                       h]], r_2);
setPointBetweenTwoLocation(26, [[-l_1/2 + l_2,                         d_1], [-l_4/2 - x_2 - l_3,                       h]], s_1);
setPointBetweenTwoLocation(27, [[-l_1/2 + l_2,                         d_1], [-l_1/2,                                 d_1]], s_1);
setPointBetweenTwoLocation(28, [[-l_1/2 + l_2 - s_1,             d_1 + r_1], [-l_1/2 + l_2,                           d_1]], r_1);
setPointBetweenTwoLocation(29, [[-l_1/2 + l_2 + ls_1,                  d_1], [-l_4/2 - ls_2,                          d_1]], corner_1[0]);
setPointBetweenTwoLocation(30, [[-l_1/2 + l_2 + ls_1,                  d_1], [-l_4/2-x_2 - l_3 + xo_1 - do_1,       h-d_3]], corner_1[1]);
setPointBetweenTwoLocation(31, [[-l_4/2 - ls_2,                        d_1], [-l_1/2 + l_2 + ls_1,                    d_1]], corner_1[0]);
setPointBetweenTwoLocation(32, [[-l_4/2 - ls_2,                        d_1], [-l_4/2 - x_2 - xo_2 + do_2,         h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(33, [[-l_4/2 - x_2 - l_3 + xo_1 - do_1, h - d_3], [-l_4/2 - x_2 - xo_2 + do_2,         h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(34, [[-l_4/2 - x_2 - l_3 + xo_1 - do_1, h - d_3], [-l_1/2 + l_2 + ls_1,                    d_1]], corner_2[1]);
setPointBetweenTwoLocation(35, [[-l_4/2 - x_2 - xo_2 + do_2,       h - d_3], [-l_4/2 - x_2 - l_3 + xo_1 - do_1,   h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(36, [[-l_4/2 - x_2 - xo_2 + do_2,       h - d_3], [-l_4/2 - ls_2,                          d_1]], corner_2[1]);
setPointBetweenTwoLocation(37, [[ l_4/2 + ls_2,                        d_1], [ l_1/2 - l_2 - ls_1,                    d_1]], corner_1[0]);
setPointBetweenTwoLocation(38, [[ l_4/2 + ls_2,                        d_1], [ l_4/2 + x_2 + xo_2 - do_2,         h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(39, [[ l_1/2 - l_2 - ls_1,                  d_1], [ l_4/2 + ls_2,                          d_1]], corner_1[0]);
setPointBetweenTwoLocation(40, [[ l_1/2 - l_2 - ls_1,                  d_1], [ l_1/2 - l_2 - x_1 - xo_1 + do_1,   h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(41, [[ l_4/2 + x_2 + xo_2 - do_2,       h - d_3], [ l_1/2 - l_2 - x_1 - xo_1 + do_1,   h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(42, [[ l_4/2 + x_2 + xo_2 - do_2,       h - d_3], [ l_4/2 + ls_2,                          d_1]], corner_2[1]);
setPointBetweenTwoLocation(43, [[ l_1/2 - l_2 - x_1 - xo_1 + do_1, h - d_3], [ l_4/2 + x_2 + xo_2 - do_2,         h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(44, [[ l_1/2 - l_2 - x_1 - xo_1 + do_1, h - d_3], [ l_1/2 - l_2 - ls_1,                    d_1]], corner_2[1]);

// Create lines
for (var i = 0; i < 36; i++)
{
    lines.create();
};

// function to set parameters of line
function setLine(id, definition_points)
{
    this.lines[id].type = this.lines.TYPE_POLYLINE;
    this.lines[id].definition_points = definition_points;
};

// function to set parameters of ARC line
function setArcLine(id, definition_points, point)
{
    this.lines[id].type = this.lines.TYPE_ARC;
    this.lines[id].definition_points = definition_points;
    this.lines[id].arc_control_point_y = point.coordinate_1;
    this.lines[id].arc_control_point_z = point.coordinate_2;
};

setLine(1, [1,  2]);
setLine(2, [2,  4]);
setLine(3, [4,  5]);
setArcLine(4, [5, 6], points[7]);
setLine(5, [6,   8]);
setArcLine(6, [8, 9], points[10]);
setLine(7, [9,  11]);
setArcLine(8, [11, 12], points[13]);
setLine(9, [12,  14]);
setArcLine(10, [14, 15], points[16]);
setLine(11, [15, 17]);
setArcLine(12, [17, 18], points[19]);
setLine(13, [18, 20]);
setArcLine(14, [20, 21], points[22]);
setLine(15, [21, 23]);
setArcLine(16, [23, 24], points[25]);
setLine(17, [24, 26]);
setArcLine(18, [26, 27], points[28]);
setLine(19, [27, 3]);
setLine(20, [3, 1]);

setLine(21, [29, 31]);
setLine(22, [31, 32]);
setLine(23, [32, 36]);
setLine(24, [36, 35]);
setLine(25, [35, 33]);
setLine(26, [33, 34]);
setLine(27, [34, 30]);
setLine(28, [30, 29]);

setLine(29, [37, 39]);
setLine(30, [39, 40]);
setLine(31, [40, 44]);
setLine(32, [44, 43]);
setLine(33, [43, 41]);
setLine(34, [41, 42]);
setLine(35, [42, 38]);
setLine(36, [38, 37]);

parts.create();
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
parts[1].material = 1;

// Create opening
openings.create();
openings[1].boundary_lines = [21, 22, 23, 24, 25, 26, 27, 28];
openings.create();
openings[2].boundary_lines = [29, 30, 31, 32, 33, 34, 35, 36];