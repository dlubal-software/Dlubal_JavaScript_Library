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
Material(1, 'C25/30')

// Create empty points
for (var i = 0; i < 22; i++)
{
    points.create();
};

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
points[ 1].coordinates= $V([-l_1/2,                                           0]);
points[ 2].coordinates= $V([ l_1/2,                                           0]);
points[ 3].coordinates= $V([ l_1/2,                                         d_1]);
points[ 4].coordinates= $V([ l_1/2 - l_2,                                   d_4]);
points[ 5].coordinates= $V([-l_1/2 + l_2,                                   d_4]);
points[ 6].coordinates= $V([-l_1/2,                                         d_1]);
points[ 7].coordinates= $V([-l_1/2 + l_2 - k + l_4 + w,   d_1 + corner_1[1] + f]);
points[ 8].coordinates= $V([ l_1/2 - l_2 + k - l_4 - w,   d_1 + corner_1[1] + f]);
setPointBetweenTwoLocation(9 , [[-l_3/2,                             h], [-l_1/2 + l_2,                                             d_4]], s);
setPointBetweenTwoLocation(10, [[-l_3/2,                             h], [ l_3/2,                                                     h]], s);
setPointBetweenTwoLocation(11, [[-l_3/2 + s,                     h - r], [-l_3/2,                                                     h]], r);
setPointBetweenTwoLocation(12, [[ l_3/2,                             h], [ l_1/2 - l_2,                                             d_4]], s);
setPointBetweenTwoLocation(13, [[ l_3/2,                             h], [-l_3/2,                                                     h]], s);
setPointBetweenTwoLocation(14, [[ l_3/2 - s,                     h - r], [ l_3/2,                                                     h]], r);
setPointBetweenTwoLocation(15, [[-l_1/2 + l_2 - k + l_4 + w,       d_1], [ l_1/2 - l_2 + k - l_4 - w,                     d_1]], corner_1[0]);
setPointBetweenTwoLocation(16, [[-l_1/2 + l_2 - k + l_4 + w,       d_1], [-l_1/2 + l_2 - k + l_4 + w,   d_1 + corner_1[1] + f]], corner_1[1]);
setPointBetweenTwoLocation(17, [[ l_1/2 - l_2 + k - l_4 - w,       d_1], [-l_1/2 + l_2 - k + l_4 + w,                     d_1]], corner_1[0]);
setPointBetweenTwoLocation(18, [[ l_1/2 - l_2 + k - l_4 - w,       d_1], [ l_1/2 - l_2 + k - l_4 - w,   d_1 + corner_1[1] + f]], corner_1[1]);
setPointBetweenTwoLocation(19, [[-l_3/2 + x_1 - d,             h - d_3], [-l_1/2 + l_2 - k + l_4 + w,   d_1 + corner_1[1] + f]], corner_2[0]);
setPointBetweenTwoLocation(20, [[-l_3/2 + x_1 - d,             h - d_3], [ l_3/2 - x_1 + d,                           h - d_3]], corner_2[1]);
setPointBetweenTwoLocation(21, [[ l_3/2 - x_1 + d,             h - d_3], [-l_3/2 + x_1 - d,                           h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(22, [[ l_3/2 - x_1 + d,             h - d_3], [ l_1/2 - l_2 + k - l_4 - w,   d_1 + corner_1[1] + f]], corner_2[1]);

// Create lines
for (var i = 0; i < 20; i++)
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
setLine(3, [3,  4]);
setLine(4, [4, 12]);
setArcLine(5, [12, 13], points[14]);
setLine(6, [13, 10]);
setArcLine(7, [10,  9], points[11]);
setLine(8,  [9, 5]);
setLine(9,  [5, 6]);
setLine(10, [6, 1]);

setLine(11, [15, 17]);
setLine(12, [17, 18]);
setLine(13, [18,  8]);
setLine(14, [8,  22]);
setLine(15, [22, 21]);
setLine(16, [21, 20]);
setLine(17, [20, 19]);
setLine(18, [19,  7]);
setLine(19, [7,  16]);
setLine(20, [16, 15]);

parts.create();
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
parts[1].material = 1;

// Create opening
openings.create();
openings[1].boundary_lines = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];