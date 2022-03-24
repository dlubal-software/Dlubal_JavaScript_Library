// var a = 0.1;
// var r = 0.01;
// var t = 0.004;

// create material and section
Material(1, 'S235')

// Create points
for (var i = 0; i < 16; i++)
{
    points.create();
};
for (var i = 0; i < 2; i++)
{
    points[1 + i*8].coordinates= $V([-a/2 + r,     -a/2 + i*t]);
    points[2 + i*8].coordinates= $V([ a/2 - r,     -a/2 + i*t]);
    points[3 + i*8].coordinates= $V([ a/2 - i*t,     -a/2 + r]);
    points[4 + i*8].coordinates= $V([ a/2 - i*t,      a/2 - r]);
    points[5 + i*8].coordinates= $V([ a/2 - r,      a/2 - i*t]);
    points[6 + i*8].coordinates= $V([-a/2 + r,      a/2 - i*t]);
    points[7 + i*8].coordinates= $V([-a/2 + i*t,      a/2 - r]);
    points[8 + i*8].coordinates= $V([-a/2 + i*t,     -a/2 + r]);
};

// Create lines
for (var i = 0; i < 16; i++)
{
    lines.create();
};
lines[1].definition_points = [1, 2];
lines[2].type = this.lines.TYPE_ARC;
lines[2].definition_points = [2, 3];
lines[2].arc_control_point = $V([ a/2 - (r - r/sqrt(2)),  -a/2 + (r - r/sqrt(2))]);
lines[3].definition_points = [3, 4];
lines[4].type = this.lines.TYPE_ARC;
lines[4].definition_points = [4, 5];
lines[4].arc_control_point = $V([ a/2 - (r - r/sqrt(2)),   a/2 - (r - r/sqrt(2))]);
lines[5].definition_points = [5, 6];
lines[6].type = this.lines.TYPE_ARC;
lines[6].definition_points = [6, 7];
lines[6].arc_control_point = $V([-a/2 + (r - r/sqrt(2)),   a/2 - (r - r/sqrt(2))]);
lines[7].definition_points = [7, 8];
lines[8].type = this.lines.TYPE_ARC;
lines[8].definition_points = [8, 1];
lines[8].arc_control_point = $V([-a/2 + (r - r/sqrt(2)),  -a/2 + (r - r/sqrt(2))]);
var r_1 = r - t;
lines[9].definition_points = [9, 10];
lines[10].type = this.lines.TYPE_ARC;
lines[10].definition_points = [10, 11];
lines[10].arc_control_point = $V([ a/2 - (r_1 - r_1/sqrt(2)) - t,  -a/2 + (r_1 - r_1/sqrt(2)) + t]);
lines[11].definition_points = [11, 12];
lines[12].type = this.lines.TYPE_ARC;
lines[12].definition_points = [12, 13];
lines[12].arc_control_point = $V([ a/2 - (r_1 - r_1/sqrt(2)) - t,   a/2 - (r_1 - r_1/sqrt(2)) - t]);
lines[13].definition_points = [13, 14];
lines[14].type = this.lines.TYPE_ARC;
lines[14].definition_points = [14, 15];
lines[14].arc_control_point = $V([-a/2 + (r_1 - r_1/sqrt(2)) + t,   a/2 - (r_1 - r_1/sqrt(2)) - t]);
lines[15].definition_points = [15, 16];
lines[16].type = this.lines.TYPE_ARC;
lines[16].definition_points = [16, 9];
lines[16].arc_control_point = $V([-a/2 + (r_1 - r_1/sqrt(2)) + t,  -a/2 + (r_1 - r_1/sqrt(2)) + t]);

parts.create();
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8];
parts[1].material = 1;

// Create opening
openings.create();
openings[1].boundary_lines = [9, 10, 11, 12, 13, 14, 15, 16];