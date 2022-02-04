if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
include("../includes/Tools/high_level_functions_support.js");

/**********************************************************************************************
********************************** Support functions ******************************************
**********************************************************************************************/

function makeSurfacesForLines(nodeList)
{
	
}

function createSets(list, grid, type)
{
	var indexes = [];
	var sets = [];
	
	for (var i = 0; i < list.length; ++i)
	{
		if (i < grid[0])
		{
			indexes.push([]);
		}
		indexes[i % grid[0]].push(list[i].no);
	}

	for (var i = 0; i < indexes.length; ++i)
	{
		switch (type)
		{
			case "lines":
				sets[i] = new LineSet();
				sets[i].GroupOfLines(undefined, indexes[i]);
				break;
			case "members":
				sets[i] = new MemberSet();
				sets[i].GroupOfMembers(undefined, indexes[i]);
				break;
			case "surfaces":
				sets[i] = new SurfaceSet();
				sets[i].GroupOfSurfaces(undefined, indexes[i]);
				break;
			default:
				break;
		}
	}
	
	return sets;
}
/************************************* Support functions end ********************************/

/*********************************************************************************************
****************************************** Main **********************************************
**********************************************************************************************
For more information how to use line/member/surface/solid set loads look at similar examples in
examples/high_level_functions_loads_examples.js file*****************************************/

run("../internal/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);

var nodesForLines = createNodesGrid(-24, -28, [10, 6], [2, 1.5]);
var nodesForMembers = createNodesGrid(-24, -13, [10, 6], [2, 1.5]);
var nodesForSurfaces = createNodesGrid(-24, -2, [10, 12], [2, 2]);

var grid = [5, 6];
var lineList = createLinesFromNodesGrid(nodesForLines, grid);
var lineSetList = createSets(lineList, grid, "lines");
var memberList = createMembersFromNodesGrid(nodesForMembers, grid, members.TYPE_BEAM, section);
var memberSetList = createSets(memberList, grid, "members");
var surfaceDictionary = createSurfacesFromNodesGrid(nodesForSurfaces, grid, surfaces.TYPE_STANDARD, thickness);
var surfaceList = [];
for (var key in surfaceDictionary)
{
	surfaceList.push(surfaceDictionary[key][0]);
}
var surfaceSetList = createSets(surfaceList, grid, "surfaces");

var solid = makeSolid([[8, -16, 0], [20, -16, 0], [20, -8, 0], [8, -8, 0], [8, -16, -5], [20, -16, -5], [20, -8, -5], [8, -8, -5]]);
var solid2 = makeSolid([[8, -6, 0], [20, -6, 0], [20, 2, 0], [8, 2, 0], [8, -6, -5], [20, -6, -5], [20, 2, -5], [8, 2, -5]]);
var solid3 = makeSolid([[8, 4, 0], [20, 4, 0], [20, 12, 0], [8, 12, 0], [8, 4, -5], [20, 4, -5], [20, 12, -5], [8, 12, -5]]);
var solidSet = new SolidSet();
solidSet.GroupOfSolids(undefined, [1, 2, 3]);

var lc = new LoadCase();

/**************************************** Line set loads **************************************/
// Line set force uniform load set via parameters
var lineSetLoad = new LineSetLoad(undefined, lc, [1], "Line set load sets via parameters", { "load_type" : "Force", "load_distribution" : "Uniform", "magnitude" : 1500 });
// Line set force concentrated 2x load with load distance "B" set with percents
var lineSetLoad2 = new LineSetLoad();
lineSetLoad2.Force(undefined, lc, [2], line_set_loads.LOAD_DISTRIBUTION_CONCENTRATED_2, [2000, 0.5, 2500, 0.7, false, true]);
// Line set force trapezoidal load with load over line sets
var lineSetLoad3 = new LineSetLoad();
lineSetLoad3.Force(undefined, lc, [3], "Trapezoidal", [1500, 2, 1000, 1]);
lineSetLoad3.LoadOverLineSet(true);
// Line set moment varying load with XL direction
var lineSetLoad4 = new LineSetLoad();
lineSetLoad4.Moment(undefined, lc, [4], "Varying", [500, 0.2, 600, 0.5, 1000, 0.7, 1000, 1.2, 600, 1.8, 500, 2], "X_L (U_L )");
// Line set mass load with individual mass components
var lineSetLoad5 = new LineSetLoad();
lineSetLoad5.Mass(undefined, lc, [5], 1500);
lineSetLoad5.IndividualMassComponents(500, 1000, 1500);

/**************************************** Member set loads ***********************************/
// Member set force parabolic load with eccentricity
var memberSetLoad = new MemberSetLoad();
memberSetLoad.Force(undefined, lc, [1], "Parabolic", [500, 900, 400]);
memberSetLoad.Eccentricity("shear_center", 0.1, 0.1, 0.02, 0.02);
// Member set force varying in Z load
var memberSetLoad2 = new MemberSetLoad();
memberSetLoad2.Force(undefined, lc, [2], "Varying", [500, 0, 1000, 0.5, 1000, 1, 1500, 1.5, 200, 2]);
// Member set temperature parabolic load
var memberSetLoad3 = new MemberSetLoad();
memberSetLoad3.Temperature(undefined, lc, [3], "Parabolic", [280, 290, 300, 290, 320, 290], "z");
// Member set pipe content partial load
var memberSetLoad4 = new MemberSetLoad();
memberSetLoad4.PipeContentPartial(undefined, lc, [4], [1500, 10]);
// Member set uniform rotation load in XL direction
var memberSetLoad5 = new MemberSetLoad();
memberSetLoad5.Rotation(undefined, lc, [5], "Uniform", [15], "X_L (U_L )");

/**************************************** Surface set loads ***********************************/
// Surface set force linear load
var surfaceSetLoad = new SurfaceSetLoad();
surfaceSetLoad.Force(undefined, lc, [1], "Linear", [121, 122, 131, 500, 1500, 500]);
// Surface set temperature linear load with only values required
var surfaceSetLoad2 = new SurfaceSetLoad();
surfaceSetLoad2.Temperature(undefined, lc, [2], "Linear", [123, 124, 133, 20]);
// Surface set temperature radial load, axis defined by point and parallel axis
var surfaceSetLoad3 = new SurfaceSetLoad();
surfaceSetLoad3.Temperature(undefined, lc, [3], "Radial", [2, 60, 70, 10, 10, 125, 136, [125], "Y"]);
// Surface set axial strain linear in Y load
var surfaceSetLoad4 = new SurfaceSetLoad();
surfaceSetLoad4.AxialStrain(undefined, lc, [4], "Linear in Y", [127, 137, 0.01, 0.01, 0.02, 0.02]);
// Surface set mass load
var surfaceSetLoad5 = new SurfaceSetLoad();
surfaceSetLoad5.Mass(undefined, lc, [5], 2000);

/***************************************** Solid set loads ***********************************/
// Solid set strain linear in X load
var solidSetLoad = new SolidSetLoad();
solidSetLoad.Strain(undefined, lc, [1], "Linear in X", [255, 256, 0.05, 0.06, 0.07, 0.08]);