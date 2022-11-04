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
Material(1, 'C25/30')

// Create empty points
for (var i = 0; i < 40; i++)
{
    points.create();
};

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

points[ 1].coordinates= $V([-l_1/2,                                    0]);
points[ 2].coordinates= $V([ l_1/2,                                    0]);
points[ 3].coordinates= $V([ l_1/2,                                  d_1]);
points[ 4].coordinates= $V([-l_1/2,                                  d_1]);
setPointBetweenTwoLocation(5 , [[-l_1/2 + l_2 + x_1,                d_1], [-l_4/2 - d_4/2,                    d_1]], corner_1[0]);
setPointBetweenTwoLocation(6 , [[-l_1/2 + l_2 + x_1,                d_1], [-l_1/2 + l_2 + x + x_1 - d,    h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(7 , [[-l_4/2 - d_4/2,                    d_1], [-l_1/2 + l_2 + x_1,                d_1]], corner_1[0]);
setPointBetweenTwoLocation(8 , [[-l_4/2 - d_4/2,                    d_1], [-l_4/2 - d_4/2,                h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(9 , [[-l_1/2 + l_2 + x + x_1 - d,    h - d_3], [-l_4/2 - d_4/2,                h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(10, [[-l_1/2 + l_2 + x + x_1 - d,    h - d_3], [-l_1/2 + l_2 + x_1,                d_1]], corner_2[1]);
setPointBetweenTwoLocation(11, [[-l_4/2 - d_4/2,                h - d_3], [-l_1/2 + l_2 + x + x_1 - d,    h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(12, [[-l_4/2 - d_4/2,                h - d_3], [-l_4/2 - d_4/2,                    d_1]], corner_2[1]);
setPointBetweenTwoLocation(13, [[-l_4/2 + d_4/2,                    d_1], [ l_4/2 - d_4/2,                    d_1]], corner_1[0]);
setPointBetweenTwoLocation(14, [[-l_4/2 + d_4/2,                    d_1], [-l_4/2 + d_4/2,                h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(15, [[ l_4/2 - d_4/2,                    d_1], [-l_4/2 + d_4/2,                    d_1]], corner_1[0]);
setPointBetweenTwoLocation(16, [[ l_4/2 - d_4/2,                    d_1], [ l_4/2 - d_4/2,                h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(17, [[-l_4/2 + d_4/2,                h - d_3], [ l_4/2 - d_4/2,                h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(18, [[-l_4/2 + d_4/2,                h - d_3], [-l_4/2 + d_4/2,                    d_1]], corner_2[1]);
setPointBetweenTwoLocation(19, [[ l_4/2 - d_4/2,                h - d_3], [-l_4/2 + d_4/2,                h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(20, [[ l_4/2 - d_4/2,                h - d_3], [ l_4/2 - d_4/2,                    d_1]], corner_2[1]);
setPointBetweenTwoLocation(21, [[ l_4/2 + d_4/2,                    d_1], [ l_1/2 - l_2 - x_1,                d_1]], corner_1[0]);
setPointBetweenTwoLocation(22, [[ l_4/2 + d_4/2,                    d_1], [ l_4/2 + d_4/2,                h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(23, [[ l_1/2 - l_2 - x_1,                d_1], [ l_4/2 + d_4/2,                    d_1]], corner_1[0]);
setPointBetweenTwoLocation(24, [[ l_1/2 - l_2 - x_1,                d_1], [ l_1/2 - l_2 - x - x_1 + d,    h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(25, [[ l_4/2 + d_4/2,                h - d_3], [ l_1/2 - l_2 - x - x_1 + d,    h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(26, [[ l_4/2 + d_4/2,                h - d_3], [ l_4/2 + d_4/2,                    d_1]], corner_2[1]);
setPointBetweenTwoLocation(27, [[ l_1/2 - l_2 - x - x_1 + d,    h - d_3], [ l_4/2 + d_4/2,                h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(28, [[ l_1/2 - l_2 - x - x_1 + d,    h - d_3], [ l_1/2 - l_2 - x_1,                d_1]], corner_2[1]);
setPointBetweenTwoLocation(29, [[-l_1/2 + l_2,                      d_1], [-l_1/2,                            d_1]], s_1);
setPointBetweenTwoLocation(30, [[-l_1/2 + l_2,                      d_1], [-l_1/2 + l_2 + x,                    h]], s_1);
setPointBetweenTwoLocation(31, [[-l_1/2 + l_2 - s_1,          d_1 + r_1], [-l_1/2 + l_2,                      d_1]], r_1);
setPointBetweenTwoLocation(32, [[-l_1/2 + l_2 + x,                    h], [-l_1/2 + l_2,                      d_1]], s_2);
setPointBetweenTwoLocation(33, [[-l_1/2 + l_2 + x,                    h], [ l_1/2 - l_2 - x,                    h]], s_2);
setPointBetweenTwoLocation(34, [[-l_1/2 + l_2 + x + s_2,        h - r_2], [-l_1/2 + l_2 + x,                    h]], r_2);
setPointBetweenTwoLocation(35, [[ l_1/2 - l_2 - x,                    h], [-l_1/2 + l_2 + x,                    h]], s_2);
setPointBetweenTwoLocation(36, [[ l_1/2 - l_2 - x,                    h], [ l_1/2 - l_2,                      d_1]], s_2);
setPointBetweenTwoLocation(37, [[ l_1/2 - l_2 - x - s_2,        h - r_2], [ l_1/2 - l_2 - x,                    h]], r_2);
setPointBetweenTwoLocation(38, [[ l_1/2 - l_2,                      d_1], [ l_1/2,                            d_1]], s_1);
setPointBetweenTwoLocation(39, [[ l_1/2 - l_2,                      d_1], [ l_1/2 - l_2 - x,                    h]], s_1);
setPointBetweenTwoLocation(40, [[ l_1/2 - l_2 + s_1,          d_1 + r_1], [ l_1/2 - l_2,                      d_1]], r_1);
// Create lines
for (var i = 0; i < 40; i++)
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
setLine(2, [2,  3]);
setLine(3, [3, 38]);
setArcLine(4, [38, 39], points[40]);
setLine(5, [39, 36]);
setArcLine(6, [36, 35], points[37]);
setLine(7, [35, 33]);
setArcLine(8, [33, 32], points[34]);
setLine(9, [32, 30]);
setArcLine(10, [30, 29], points[31]);
setLine(11, [29, 4]);
setLine(12, [4,  1]);
setLine(13, [5,   7]);
setLine(14, [7,   8]);
setLine(15, [8,  12]);
setLine(16, [12, 11]);
setLine(17, [11,  9]);
setLine(18, [9,  10]);
setLine(19, [10,  6]);
setLine(20, [6,   5]);
setLine(21, [13, 15]);
setLine(22, [15, 16]);
setLine(23, [16, 20]);
setLine(24, [20, 19]);
setLine(25, [19, 17]);
setLine(26, [17, 18]);
setLine(27, [18, 14]);
setLine(28, [14, 13]);
setLine(29, [21, 23]);
setLine(30, [23, 24]);
setLine(31, [24, 28]);
setLine(32, [28, 27]);
setLine(33, [27, 25]);
setLine(34, [25, 26]);
setLine(35, [26, 22]);
setLine(36, [22, 21]);

parts.create();
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
parts[1].material = 1;

// Create opening
openings.create();
openings[1].boundary_lines = [13, 14, 15, 16, 17, 18, 19, 20];
openings.create();
openings[2].boundary_lines = [21, 22, 23, 24, 25, 26, 27, 28];
openings.create();
openings[3].boundary_lines = [29, 30, 31, 32, 33, 34, 35, 36];