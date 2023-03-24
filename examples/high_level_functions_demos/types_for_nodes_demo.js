if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates nodal mesh refinement.");
}

var t1 = new Date().getTime();

include("../../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../../includes/tools/clearAll.js");

var material = createMaterial("S235");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
var nodesForSurfaces = createNodesGrid(-28, -28, [10, 2], [3, 2]);
var linesForSurfaces = createSurfacesFromNodesGrid(nodesForSurfaces, [5, 1], surfaces.TYPE_STANDARD, thickness);

nodalMeshRefinement = new NodalMeshRefinement(undefined, [1, 2, 3, 4, 11, 12, 13, 14]);	// Default
nodalMeshRefinementCircular = new NodalMeshRefinement();
nodalMeshRefinementCircular.Circular(undefined, [5, 6, 7, 8, 15, 16, 17, 18], 3, 0.2, 0.6, "GRADUALLY");
nodalMeshRefinementRectangular = new NodalMeshRefinement();
nodalMeshRefinementRectangular.Rectangular(undefined, [9, 10, 19, 20], undefined, 0.5);
nodalMeshRefinementRectangular.ApplyToSurfaces([5]);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
