// Script to create C section
// author: HejnicF 11/8/2021

// function to create empty points
function createEmptyPoints(pointsCount)
{
    for (var i = 0; i < pointsCount; i++)
    {
        this.points.create()
    }
}

// function to create empty elements
function createEmptyElements(elementsCount)
{
    for (var i = 0; i < elementsCount; i++)
    {
        this.elements.create()
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

// function to set parameters of line element
function setLineElement(id, definition_points, thickness)
{
    this.elements[id].definition_points = definition_points
    this.elements[id].thickness = thickness
}

// function to set parameters of arc element
function setArcElement(id, definition_points, thickness, point)
{
    this.elements[id].type = this.elements.TYPE_ARC
    this.elements[id].definition_points = definition_points
    this.elements[id].thickness = thickness
    this.elements[id].arc_control_point_y = point.coordinate_1
    this.elements[id].arc_control_point_z = point.coordinate_2
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

this.general.solver_model = this.general.THIN_WALLED // or this.general.MASSIVE

// count of objects
var outlinePointsCount = 28
var outlineLinesCount = 20
var elementPointsCount = 14
var elementsCount = 9
var elementThickness = 0.002
var materialId = 1

// create material
Material(materialId, 'S355 | EN 1993-1-1:2005-05')

// initialize points
createEmptyPoints(outlinePointsCount + elementPointsCount)
// element points
points[1].coordinates = $V([0.025, 0.0670381])
points[2].coordinates = $V([0.039, 0.0670381])
points[3].coordinates = $V([0.05, 0.0560381])
points[4].coordinates = $V([0.05, -0.0399619])
points[5].coordinates = $V([0.039, -0.0509619])
points[6].coordinates = $V([-0.039, -0.0509619])
points[7].coordinates = $V([-0.05, -0.0399619])
points[8].coordinates = $V([-0.05, 0.0560381])
points[9].coordinates = $V([-0.039, 0.0670381])
points[10].coordinates = $V([-0.025, 0.0670381])
// elements arc points
points[11].coordinates = $V([0.046778174593052, 0.063816274593052])
points[12].coordinates = $V([0.046778174593052, -0.047740074593052])
points[13].coordinates = $V([-0.046778174593052, -0.047740074593052])
points[14].coordinates = $V([-0.046778174593052, 0.063816274593052])

// outline points
points[15].coordinates = $V([0.025, 0.0660381])
points[16].coordinates = $V([0.038975451353343, 0.0660381])
points[17].coordinates = $V([0.046070215076575, 0.063108315007183])
points[18].coordinates = $V([0.049, 0.056013551353343])
points[19].coordinates = $V([0.049, -0.039937351353343])
points[20].coordinates = $V([0.046729172315014, -0.046305067726116])
points[21].coordinates = $V([0.038975451353343, -0.0499619])
points[22].coordinates = $V([-0.038975451353343, -0.0499619])
points[23].coordinates = $V([-0.046729172315014, -0.046305067726116])
points[24].coordinates = $V([-0.049, -0.039937351353343])
points[25].coordinates = $V([-0.049, 0.056013551353343])
points[26].coordinates = $V([-0.044555032272319, 0.064351793398864])
points[27].coordinates = $V([-0.038975451353343, 0.0660381])
points[28].coordinates = $V([-0.025, 0.0660381])
points[29].coordinates = $V([-0.025, 0.0680381])
points[30].coordinates = $V([-0.038975451353343, 0.0680381])
points[31].coordinates = $V([-0.048211074503467, 0.06372438571167])
points[32].coordinates = $V([-0.051, 0.056013551353343])
points[33].coordinates = $V([-0.051, -0.039937351353343])
points[34].coordinates = $V([-0.0457464309629, -0.049882008407304])
points[35].coordinates = $V([-0.038975451353343, -0.0519619])
points[36].coordinates = $V([0.038975451353343, -0.0519619])
points[37].coordinates = $V([0.048335587377975, -0.047496466335101])
points[38].coordinates = $V([0.051, -0.039937351353343])
points[39].coordinates = $V([0.051, 0.056013551353343])
points[40].coordinates = $V([0.04668628571167, 0.065249174503467])
points[41].coordinates = $V([0.038975451353343, 0.0680381])
points[42].coordinates = $V([0.025, 0.0680381])

// initialize elements
createEmptyElements(elementsCount)
setLineElement(1, [2, 1], elementThickness)
setLineElement(2, [3, 4], elementThickness)
setLineElement(3, [5, 6], elementThickness)
setLineElement(4, [7, 8], elementThickness)
setLineElement(5, [9, 10], elementThickness)
setArcElement(6, [2, 3], elementThickness, points[11])
setArcElement(7, [4, 5], elementThickness, points[12])
setArcElement(8, [6, 7], elementThickness, points[13])
setArcElement(9, [8, 9], elementThickness, points[14])

// initialize lines
createEmptyLines(outlineLinesCount)
setLine(1, [15, 16])
setArcLine(2, [16, 18], points[17])
setLine(3, [18, 19])
setArcLine(4, [19, 21], points[20])
setLine(5, [21, 22])
setArcLine(6, [22, 24], points[23])
setLine(7, [24, 25])
setArcLine(8, [25, 27], points[26])
setLine(9, [27, 28])
setLine(10, [28, 29])
setLine(11, [29, 30])
setArcLine(12, [30, 32], points[31])
setLine(13, [32, 33])
setArcLine(14, [33, 35], points[34])
setLine(15, [35, 36])
setArcLine(16, [36, 38], points[37])
setLine(17, [38, 39])
setArcLine(18, [39, 41], points[40])
setLine(19, [15, 42])
setLine(20, [42, 41])

// initialize parts
parts.create()
parts[1].boundary_lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
parts[1].material = 1

// initialize loads and internal forces
load_cases.create()
load_cases[1].internal_forces.create()
load_cases[1].internal_forces[1].member_no = 1
load_cases[1].internal_forces[1].location_x = 0.5
load_cases[1].internal_forces[1].axial_force_n = -1000.0
load_cases[1].internal_forces[1].bending_moment_m_y = 0.0
load_cases[1].internal_forces[1].bending_moment_m_z = 0.0
load_cases[1].internal_forces[1].shear_force_v_y = 0.0
load_cases[1].internal_forces[1].shear_force_v_z = 0.0

