include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
var lc = new LoadCase();

var nodesForSurfaces = createNodesGrid(-28, -28, [6, 10], [5, 5]);
var surfaceList = createSurfacesFromNodesGrid(nodesForSurfaces, [3, 5], surfaces.TYPE_STANDARD, thickness);
var nodesForLines = createNodesGrid(-28, 24, [6, 1], [5, 5]);
var lineList = createLinesFromNodesGrid(nodesForLines, [3, 1]);

var lineSupport = line_supports.create();
lineSupport.spring_x = line_supports.SPRING_CONSTANT_YES;
lineSupport.spring_y = line_supports.SPRING_CONSTANT_YES;
lineSupport.spring_z = line_supports.SPRING_CONSTANT_YES;
lineSupport.lines = [61];

var nodalSupports = nodal_supports.create();
nodalSupports.spring_x = nodal_supports.SPRING_CONSTANT_YES;
nodalSupports.spring_y = nodal_supports.SPRING_CONSTANT_YES;
nodalSupports.spring_z = nodal_supports.SPRING_CONSTANT_YES;
nodalSupports.nodes = [63, 64, 65, 66];

/**************************************** Free loads *******************************************
* Common information:
* - all loads are created with default (generated) index
* - load distribution, load direction and axis can be set via property or its string representation
*/
var freeRectangularLoad = new FreeRectangularLoad();
// Free rectangular uniform load with corner points of rectangle
// [location, p, X1, Y1, X2, Y2, α]
freeRectangularLoad.Uniform(undefined, lc, [1, 2], [1, 1500, -27, -27, -24, -24, 10]);
// Free rectangular linear in Y load with corner and sides of rectangle
// [location, p1, p2, Xc, Yc, a, b]
freeRectangularLoad.LinearX(undefined, lc, [3], [2, 1500, 2000, -6, -26, 3, 4]);
// Free rectangular varying in Z load with corner and sides of rectangle
// [location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, Z3, kz3, pz3]]
freeRectangularLoad.VaryingZ(undefined, lc, [4], [2, 1500, -26, -16, 3, 4, [1, 0, 1500, 2, 0, 2000, 3, 0, 1500]]);
// Free rectangular varying along perimeter load with corner and sides of rectangle
// [location, p, Xc, Yc, a, b, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2, α3, kα3, pα3)]]
freeRectangularLoad.VaryingPerimeter(undefined, lc, [5], [2, 1500, -16, -16, 3, 4, [-26, -16, -1, -25, -15, 0, 0, 1, 0, 1000, 2, 0, 1500, 3, 0, 1000]]);

var freeConcentratedLoad = new FreeConcentratedLoad();
// Free concentrated force load with "x" load direction
freeConcentratedLoad.Force(undefined, lc, [6], [200, -6, -16], undefined, "x");
// Free concentrated moment load with "z" load direction
freeConcentratedLoad.Moment(undefined, lc, [7], [200, -25, -5], undefined, "y");

var freeCircularLoad = new FreeCircularLoad();
// Free circular uniform load
freeCircularLoad.Uniform(undefined, lc, [8], [1500, 10, -15, -5]);
// Free circular linear load
freeCircularLoad.Linear(undefined, lc, [9], [1500, 5, 500, -5, -7]);

var freeLineLoad = new FreeLineLoad();
// Free line uniform load
freeLineLoad.Uniform(undefined, lc, [10], [1500, -27, 4, -24, 6]);
// Free line linear load
freeLineLoad.Linear(undefined, lc, [11], [1000, 1500, -17, 3, -14, 6]);

var freePolygonLoad = new FreePolygonLoad();
// Free polygon linear load
// [p1, node1, node2, node3, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2, p3]
freePolygonLoad.Linear(undefined, lc, [12], [500, 1, 2, 3, [-7, 3, -4, 3, -5, 6], 1000, 1500]);

// Imposed line deformation, with only specification uX,i, uY,i
var imposedLineDeformation = new ImposedLineDeformation();
imposedLineDeformation.Set(undefined, lc, [61], 0.005, 0.01);

// Imposed nodal deformation, with only specification uX,i, uY,i
var imposedNodalDeformation = new ImposedNodalDeformation();
imposedNodalDeformation.Set(undefined, lc, [63, 64, 65, 66], 0.005, 0.01);
