// Script to create I section
// author: HejnicF 11/8/2021
run("../includes/Tools/clearAll.js");
// function to create empty points
function createEmptyPoints(pointsCount)
{
    for (var i = 0; i < pointsCount; i++)
    {
        this.points.create()
    }
}

// function to create empty lines
function createEmptyLines(linesCount)
{
    for (var i = 0; i < linesCount; i++)
    {
        this.lines.create()
    }
}

// function to set parameters of line
function setLine(id, definition_points)
{
    this.lines[id].type = this.lines.TYPE_POLYLINE
    this.lines[id].definition_points = definition_points
}

// function to set parameters of ARC line
function setArcLine(id, definition_points, point)
{
    this.lines[id].type = this.lines.TYPE_ARC
    this.lines[id].definition_points = definition_points
    this.lines[id].arc_control_point_y = point.coordinate_1
    this.lines[id].arc_control_point_z = point.coordinate_2
}

// count of objects
var pointsCount = 28
var linesCount = 20

// create material and section
Material(1, 'S235')

// initialize points
createEmptyPoints(pointsCount)
points[1].coordinates = $V([0.1, -0.15])
points[2].coordinates = $V([0.1, -0.144])
points[3].coordinates = $V([0.097656854249492, -0.138343145750508])
points[4].coordinates = $V([0.092, -0.136])
points[5].coordinates = $V([0.015, -0.136])
points[6].coordinates = $V([0.007928932188135, -0.133071067811865])
points[7].coordinates = $V([0.005, -0.126])
points[8].coordinates = $V([0.005, 0.126])
points[9].coordinates = $V([0.007928932188135, 0.133071067811865])
points[10].coordinates = $V([0.015, 0.136])
points[11].coordinates = $V([0.092, 0.136])
points[12].coordinates = $V([0.097656854249492, 0.138343145750508])
points[13].coordinates = $V([0.1, 0.144])
points[14].coordinates = $V([0.1, 0.15])
points[15].coordinates = $V([-0.1, 0.15])
points[16].coordinates = $V([-0.1, 0.144])
points[17].coordinates = $V([-0.097656854249492, 0.138343145750508])
points[18].coordinates = $V([-0.092, 0.136])
points[19].coordinates = $V([-0.015, 0.136])
points[20].coordinates = $V([-0.007928932188135, 0.133071067811865])
points[21].coordinates = $V([-0.005, 0.126])
points[22].coordinates = $V([-0.005, -0.126])
points[23].coordinates = $V([-0.007928932188135, -0.133071067811865])
points[24].coordinates = $V([-0.015, -0.136])
points[25].coordinates = $V([-0.092, -0.136])
points[26].coordinates = $V([-0.097656854249492, -0.138343145750508])
points[27].coordinates = $V([-0.1, -0.144])
points[28].coordinates = $V([-0.1, -0.15])

// initialize lines
createEmptyLines(linesCount)
setLine(1, [1, 2])
setLine(2, [4, 5])
setLine(3, [7, 8])
setLine(4, [10, 11])
setLine(5, [13, 14])
setLine(6, [14, 15])
setLine(7, [15,16])
setLine(8, [18, 19])
setLine(9, [21, 22])
setLine(10, [24, 25])
setLine(11, [27, 28])
setLine(12, [28, 1])
setArcLine(13, [2, 4], points[3])
setArcLine(14, [5, 7], points[6])
setArcLine(15, [8, 10], points[9])
setArcLine(16, [11, 13], points[12])
setArcLine(17, [16, 18], points[17])
setArcLine(18, [19, 21], points[20])
setArcLine(19, [22, 24], points[23])
setArcLine(20, [25, 27], points[26])

// initialize parts
parts.create()
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
parts[1].material = 1
