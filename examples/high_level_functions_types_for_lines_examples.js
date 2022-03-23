var t1 = new Date().getTime();
if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates types for lines.");
}
include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
var nodesForSurfaces = createNodesGrid(-28, -20, [10, 2], [3, 2]);
var surfaceList = createSurfacesFromNodesGrid(nodesForSurfaces, [5, 1], surfaces.TYPE_STANDARD, thickness.no);
var nodesForLines = createNodesGrid(-28, -14, [10, 1], [3, 4]);

var line = new Line();
for (var i = 0; i < nodesForLines.length; i+=2) {
	line.Polyline(undefined, [nodesForLines[i].no, nodesForLines[i + 1].no]);
}

/****************************************Line hinges ****************************************/
var lineHinge = new LineHinge(undefined, surfaceList[1][0].no); // Default, line hinge is set to all surface's boundary lines
var lineHinge2 = new LineHinge();
lineHinge2.Translational(undefined, surfaceList[2][0].no, [surfaceList[2][0].boundary_lines[0], surfaceList[2][0].boundary_lines[2]], undefined, 1500, 1600); // Two lines and Cu,y, Cu,z specified
lineHinge2.Translational(undefined, surfaceList[3][0].no, undefined, undefined, 1500, 1600); // Transaltional, line hinge for all boundary lines + Slab-Wall connection
lineHinge2.SlabWallConnection(0.02, 0.01);
lineHinge2.Rotational(undefined, surfaceList[4][0].no, undefined, 200, [1500, 500, "", 2000, 100, "", 2000, 200, ""], "vy");

/**********************************Line mesh refinements*************************************/
var lineMeshRefinement = new LineMeshRefinement();
lineMeshRefinement.TargetLeLength(undefined, [21], 0.5, 4);
lineMeshRefinement.NumberFiniteElements(undefined, [22], 8, 8);
lineMeshRefinement.Gradually(undefined, [23, 24, 25], 4, 6);