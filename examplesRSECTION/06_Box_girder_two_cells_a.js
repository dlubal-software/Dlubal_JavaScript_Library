// var l_1 = 16.260;
// //var l_2 = 4.500;
// var l_3 = 6.080;
// var h = 2.600;
// var d_1 = 0.260;
// var d_2 = 0.400;
// var d_3 = 0.250;
// var d_4 = 0.300;
// var corner_1 = [0.60, 0.30];  // chamfer for internal corners [y, z]
// var corner_2 = [0.25, 0.25];  // chamfer for internal corners [y, z]
// var r_1 = 0.5
// var r_2 = 0.4
// var alpha = 65;

// create material and section
Material(1, 'C25/30')

// Create empty points
for (var i = 0; i < 32; i++)
{
    points.create();
};

var alphaR = alpha*PI/180;
var x = tan(PI/2 - alphaR)*(h - d_1);
var l_2 = l_1/2 - l_3/2 - x;
var y = d_2*tan(PI/2 - alphaR);
var l_4 = sqrt(sqr(y) + sqr(d_2));
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
points[ 1].coordinates= $V([-l_1/2,                 0]);
points[ 2].coordinates= $V([ l_1/2,                 0]);
points[ 3].coordinates= $V([ l_1/2,               d_1]);
points[ 4].coordinates= $V([-l_1/2,               d_1]);
setPointBetweenTwoLocation(5 , [[-l_1/2 + l_2 + l_4,        d_1], [ l_1/2 - l_2 - l_4,          d_1]], corner_1[0]);
setPointBetweenTwoLocation(6 , [[ l_1/2 - l_2 - l_4,        d_1], [-l_1/2 + l_2 + l_4,          d_1]], corner_1[0]);
setPointBetweenTwoLocation(7 , [[-l_1/2 + l_2 + l_4,        d_1], [-l_3/2 + x_1 - d,        h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(8 , [[ l_1/2 - l_2 - l_4,        d_1], [ l_3/2 - x_1 + d,        h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(9 , [[-l_3/2 + x_1 - d,      h - d_3], [-l_1/2 + l_2 + l_4,          d_1]], corner_2[1]);
setPointBetweenTwoLocation(10, [[ l_3/2 - x_1 + d,      h - d_3], [ l_1/2 - l_2 - l_4,          d_1]], corner_2[1]);
setPointBetweenTwoLocation(11, [[-l_3/2 + x_1 - d,      h - d_3], [ l_3/2 - x_1 + d,        h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(12, [[ l_3/2 - x_1 + d,      h - d_3], [-l_3/2 + x_1 - d,        h - d_3]], corner_2[0]);
points[13].coordinates= $V([-l_1/2 + l_2 - s_1,         d_1]);
setPointBetweenTwoLocation(14, [[-l_1/2 + l_2,              d_1], [-l_3/2,                        h]], s_1);
setPointBetweenTwoLocation(15, [[-l_1/2 + l_2 - s_1,  d_1 + r_1], [-l_1/2 + l_2,                d_1]], r_1);
points[16].coordinates= $V([ l_1/2 - l_2 + s_1,         d_1]);
setPointBetweenTwoLocation(17, [[ l_1/2 - l_2,              d_1], [ l_3/2,                        h]], s_1);
setPointBetweenTwoLocation(18, [[ l_1/2 - l_2 + s_1,  d_1 + r_1], [ l_1/2 - l_2,                d_1]], r_1);
setPointBetweenTwoLocation(19, [[-l_3/2,                      h], [-l_1/2 + l_2,                d_1]], s_2);
points[20].coordinates= $V([-l_3/2 + s_2,               h]);
setPointBetweenTwoLocation(21, [[-l_3/2 + s_2,          h - r_2], [-l_3/2,                        h]], r_2);
points[22].coordinates= $V([ l_3/2 - s_2,                 h]);
setPointBetweenTwoLocation(23, [[ l_3/2,                      h], [ l_1/2 - l_2,                d_1]], s_2);
setPointBetweenTwoLocation(24, [[ l_3/2 - s_2,          h - r_2], [ l_3/2,                        h]], r_2);
setPointBetweenTwoLocation(25, [[-d_4/2,                    d_1], [-l_1/2 + l_2,                d_1]], corner_1[0]);
setPointBetweenTwoLocation(26, [[-d_4/2,                    d_1], [-d_4/2,                  h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(27, [[ d_4/2,                    d_1], [ l_1/2 - l_2,                d_1]], corner_1[0]);
setPointBetweenTwoLocation(28, [[ d_4/2,                    d_1], [ d_4/2,                  h - d_3]], corner_1[1]);
setPointBetweenTwoLocation(29, [[-d_4/2,                h - d_3], [-l_2,                    h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(30, [[-d_4/2,                h - d_3], [-d_4/2,                      d_1]], corner_2[1]);
setPointBetweenTwoLocation(31, [[ d_4/2,                h - d_3], [ l_2,                    h - d_3]], corner_2[0]);
setPointBetweenTwoLocation(32, [[ d_4/2,                h - d_3], [ d_4/2,                      d_1]], corner_2[1]);

// Create lines
for (var i = 0; i < 28; i++)
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
setLine(3, [3, 16]);
setArcLine(4, [16, 17], points[18]);
setLine(5, [17, 23]);
setArcLine(6, [23, 22], points[24]);
setLine(7, [22, 20]);
setArcLine(8, [20, 19], points[21]);
setLine(9, [19, 14]);
setArcLine(10, [14, 13], points[15]);
setLine(11, [13, 4]);
setLine(12, [4,  1]);

setLine(13, [5,  25]);
setLine(14, [25, 26]);
setLine(15, [26, 30]);
setLine(16, [30, 29]);
setLine(17, [29, 11]);
setLine(18, [11,  9]);
setLine(19, [9,   7]);
setLine(20, [7,   5]);

setLine(21, [27,  6]);
setLine(22, [6,   8]);
setLine(23, [8,  10]);
setLine(24, [10, 12]);
setLine(25, [12, 31]);
setLine(26, [31, 32]);
setLine(27, [32, 28]);
setLine(28, [28, 27]);

parts.create();
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
parts[1].material = 1;

// Create opening
openings.create();
openings[1].boundary_lines = [13, 14, 15, 16, 17, 18, 19, 20];
openings.create();
openings[2].boundary_lines = [21, 22, 23, 24, 25, 26, 27, 28];