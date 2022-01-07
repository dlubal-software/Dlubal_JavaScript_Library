include("../includes/Tools/high_level_functions_support.js");

/**********************************************************************************************
********************************** Support functions ******************************************
**********************************************************************************************/

function makeOpenings(surfaceList, nodeList)
{
	var openingList = [];
	
	for (var i = 0; i < 3; ++i)
	{
		var node = createNode(nodeList[i * 2].coordinate_1 + (nodeList[1 + i * 2].coordinate_1 - nodeList[i * 2].coordinate_1) / 2, nodeList[i * 2].coordinate_2 + (nodeList[6 + i * 2].coordinate_2 - nodeList[i * 2].coordinate_2) / 2, 0);
		var line = lines.create();
		line.type = lines.TYPE_CIRCLE;
		line.circle_center = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
		line.circle_radius = 2;
		var opening = openings.create();
		opening.boundary_lines = [line];
		openingList.push(opening);
	}
	
	return openingList;
}
/************************************* Support functions end *********************************/

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../internal/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);

var nodesForNodes = createNodesGrid(-28, -28, [8, 1], [4, 2]);
var nodesForLines = createNodesGrid(-28, -18, [8, 2], [4, 4]);
var nodesForMembers = createNodesGrid(-28, -8, [10, 4], [3, 5]);
var nodesForSurfaces = createNodesGrid(-28, 12, [6, 4], [5, 5]);
var nodesForSurfacesForOpenings = createNodesGrid(2, 8, [6, 2], [5, 5]);

modifyNodesToZCoord(nodesForLines, [[0, 8]]);
var surfaceListForLines = createSurfacesFromNodesGrid(nodesForLines, [4, 1], surfaces.TYPE_STANDARD, thickness);
var memberList = createMembersFromNodesGrid(nodesForMembers, [5, 4], members.TYPE_BEAM, section);
modifyNodesToZCoord(nodesForSurfaces, [[4, 10]], -3.0);
var surfaceList = createSurfacesFromNodesGrid(nodesForSurfaces, [3, 2], surfaces.TYPE_STANDARD, thickness);
var surfaceForOpeningsList = createSurfacesFromNodesGrid(nodesForSurfacesForOpenings, [3, 1], surfaces.TYPE_STANDARD, thickness);

var solid = makeSolid([[8, -16, 0], [20, -16, 0], [20, -8, 0], [8, -8, 0], [8, -16, -5], [20, -16, -5], [20, -8, -5], [8, -8, -5]]);
var openingList = makeOpenings(surfaceForOpeningsList, nodesForSurfacesForOpenings);

var lc = new LoadCase();

/**************************************** Nodal loads *******************************************
* Common information:
* - all loads are created with default (generated) index
* - load distribution, load direction and axis can be set via property or its string representation
*/
var nodalLoad = new NodalLoad();
// Two force nodal loads (nodes 1, 2) with default "X" load direction
nodalLoad.Force(undefined, lc, [1, 2], 1500);
// Force nodal load with "Z" load direction
nodalLoad.Force(undefined, lc, [3], 1000, "W");
// Add specific direction with Rotated via 3 angles direction type (1), sequence = Z'Y'X'
// Parameter values: 1, [αZ', αY', αX', "Z'Y'X'"]
nodalLoad.SpecificDirection(1, [10, 5, 0, "Z'Y'X'"]);
// Force nodal load
nodalLoad.Force(undefined, lc, [4], 1800);
// Add shifted display
// Parameter values: [ΔX, ΔY, ΔZ], Δ
nodalLoad.ShiftedDisplay([1, 0.5, 0], 0.1);

var nodalLoad2 = new NodalLoad();
// Moment nodal load with default "Z" load direction
nodalLoad2.Moment(undefined, lc, [5], 2000);

var nodalLoad3 = new NodalLoad();
// Two components nodal loads
nodalLoad3.Components(undefined, lc, [6, 7], [10,20,30], [30,40,50]);
// Add eccentricity (ex, ey, ez)
nodalLoad3.ForceEccentricity(0.5, 0.2, 0);

var nodalLoad4 = new NodalLoad();
// Mass nodal load with comment
nodalLoad4.Mass(undefined, lc, [8], 1500, "Mass nodal load example");

/***************************************** Line loads *******************************************/
var lineLoad = new LineLoad();
// Force uniform line load, with global in X on projected length
lineLoad.Force(undefined, lc, [1], "Uniform", [1500]);
// Force trapezoidal line load with default values (absolute distances, only p1 with b distance can be specified)
lineLoad.Force(undefined, lc, [4], "Trapezoidal", [1000, 3]);
// Add reference to list of lines, true is default
lineLoad.ReferenceToListOfLines();
// Force trapezoidal line load with relative distances
// [p1, distance_b, p2, distance_a, distance_a_relative, distance_b_relative]
lineLoad.Force(undefined, lc, [3], "Trapezoidal", [1000, 0.9, 1500, 0.1, true, true]);
// Force trapezoidal line load with relative distances
lineLoad.Force(undefined, lc, [2], "Trapezoidal", [1000, 0.9, 1500, 0.1, true, true]);
// Set load over total length of line
lineLoad.LoadOverLine();
// Force varying line load
//Parameter values: [p1, x1, p2, x2, p3, x3, p4, x4, p5, x5]
lineLoad.Force(undefined, lc, [5, 7], "Varying", [500, 0, 1000, 1, 1500, 2, 2000, 3, 5, 1000]);
// Force concentrated - 2 x 2 load with two relative and one absolute distances
lineLoad.Force(undefined, lc, [6, 8], line_loads.LOAD_DISTRIBUTION_CONCENTRATED_2x2, [1000, 1, 0.4, 0.5, false, false, true]);
// Refer distance to the line end
lineLoad.ReferDistanceLineEnd();

var lineLoad2 = new LineLoad();
//Moment parabolic line load with global in X on true length
lineLoad2.Moment(undefined, lc, [9], "Parabolic", [1500, 2000, 1000], "X_L (U_L )");

var lineLoad3 = new LineLoad();
// Mass uniform line load
lineLoad3.Mass(undefined, lc, [13], 2500);
// Add individual mass components
lineLoad3.IndividualMassComponents(1000, 1500, 2000);

var lineLoad4 = new LineLoad();
lineLoad.Mass(undefined, lc, [15], 1500);
lineLoad.Mass(undefined, lc, [16], 2000);
// Add individual mass components
lineLoad.IndividualMassComponents(5, 10, 15);

/***************************************** Member loads ******************************************/
// Default member load with magnitude sets via load parameters
var memberLoad = new MemberLoad(undefined, lc, [1], "Default member load sets via parameters", { "magnitude" : 500 });
var memberLoad2 = new MemberLoad();
// Force concentrated - 1 member load with relative distance
memberLoad2.Force(undefined, lc, [2], member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1, [500, 0.5, true]);
// Force concentrated - varying member load
// Parameter values: [P1, x1, P2, x2 ... Pn, xn]
memberLoad2.Force(undefined, lc, [3], "Concentrated - Varying", [100, 0.5, 200, 1.5, 1000, 3]);
// Add reference to list of members
memberLoad2.ReferenceToListOfMembers();
// Force trapezoidal member force with absolute distances
// Parameter values: [p1, B, p2, A, is_b_relative, is_a_relative]
memberLoad2.Force(undefined, lc, [4], "Trapezoidal", [1000, 3, 1500, 1]);
// Force parabolic member load
memberLoad2.Force(undefined, lc, [5], member_loads.LOAD_DISTRIBUTION_PARABOLIC, [1500, 200, 1600]);
// Force uniform load
memberLoad2.Force(undefined, lc, [17], "Uniform", [2500]);
// Add eccentricity
memberLoad2.Eccentricity("right_bottom", 0.01, 0.02, 0.03, 0.04);

// Moment parabolic load sets via parameters
var memberLoad3 = new MemberLoad(undefined, lc, [6], "Moment parabolic load sets via parameters", 
	{ "load_type" : "Moment", "load_distribution" : "Parabolic", "magnitude_1" : 500, "magnitude_2" : 700, "magnitude_3" : 1500, "load_direction" : "X_L (U_L )" });
var memberLoad4 = new MemberLoad();
// Moment varying load with global in X on true length
memberLoad4.Moment(undefined, lc, [7], "Varying", [500, 0.1, 800, 1, 1200, 2, 600, 3], "X_L (U_L )");

var memberLoad5 = new MemberLoad();
// Temperature trapezoidal member load with default values
// Parameter values: [Tt1, B, Tb1, Tt2, Tb2, A, is_b_relative, is_a_relative]
memberLoad5.Temperature(undefined, lc, [8], "Trapezoidal", [50, 2]);
// Temperature trapezoidal member load with absolute and relative distances and local in z
memberLoad5.Temperature(undefined, lc, [9], "Trapezoidal", [300, 2.9, 280, 320, 290, 0.2, false, true], "z");
// Temperature varying member load
memberLoad5.Temperature(undefined, lc, [10, 11], "Varying", [300, 330, 0.1, 310, 330, 2, 300, 340, 2.9], "z");

var memberLoad6 = new MemberLoad();
// Temperature change parabolic member load with local direction in z
// Parameter values: [Tt1, ΔT1, Tt2, ΔT2, Tt3, ΔT3]
memberLoad6.TemperatureChange(undefined, lc, [12], "Parabolic", [60, 10, 50, 20, 100, 10], "z");

var memberLoad7 = new MemberLoad();
// Rotary motion member load
/* Parameter values: 	[axis_definition, ω, α, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
 				[axis_definition, ω, α, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")*/
// Rotary motion with "two points" axes definition, both defined by node indexes				
memberLoad7.RotaryMotion(undefined, lc, [13], [1, 10, 12, [49, 50]]);
// Rotary motion with "two points" axes definition, both defined by its coordinates
memberLoad7.RotaryMotion(undefined, lc, [14], [1, 10, 12, 0.1, 0.2, 0, 2.0, 2.0, 0]);
// Rotary motion with "point and axes" definition, point is defined by node index, point and parallel axis is set to "+Y"
memberLoad7.RotaryMotion(undefined, lc, [15], [2, 10, 12, [53], "+Y"]);
// Rotary motion with "point and axes" definition, point is defined by coordinates, point and parallel axis is set to "+Y"
memberLoad7.RotaryMotion(undefined, lc, [16], [2, 10, 12, 0.5, 0.6, 0.3, "+Y"]);

/***************************************** Surface loads ******************************************/
var surfaceLoad = new SurfaceLoad();
// Force linear surface load
// Parameter values: [Node1, Node2, Node3, p1, p2, p3]
surfaceLoad.Force(undefined, lc, [5], "Linear", [71, 72, 66, 500, 1500, 1000]);
// Force radial surface load with "two points" axes definition, both defined by node indexes
// Parameter values: [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB]
surfaceLoad.Force(undefined, lc, [6], "Radial", [1, 1000, 500, 74, 68, [67, 68]]);
// Force radial surface load with "point and axis" definition, point is defined by coordinates, parallel axis "Z"
// Parameter values: [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis]
surfaceLoad.Force(undefined, lc, [6], "Radial", [2, 1000, 500, 74, 68, 0.5, 0.5, 0, "Z"]);
// Force varying in Z surface load
// Parameter values: [p1, z1, p2, z2, ... pn, zn]
surfaceLoad.Force(undefined, lc, [7], "Varying in Z", [2000, -3, 1000, -2, 1500, -1.5, 1500, -0.5, 500, 0]);

var surfaceLoad2 = new SurfaceLoad();
// Temperature linear in X surface load
// Parameter values: [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
surfaceLoad2.Temperature(undefined, lc, [8], "Linear in X", [77, 78, 100, 10, 120, 20]);

var surfaceLoad3 = new SurfaceLoad();
// Axial strain linear surface load
// Parameter values: [Node1, Node2, Node3, ε1x, ε1y, ε2x, ε2y, ε3x, ε3y]
// Using only required values (Node1, Node2, Node3, ε1x, ε1y)
surfaceLoad2.AxialStrain(undefined, lc, [9], surface_loads.LOAD_DISTRIBUTION_LINEAR, [85, 79, 80, 0.01, 0.1]);

var surfaceLoad4 = new SurfaceLoad();
// Mass surface load with individual mass components
surfaceLoad4.Mass(undefined, lc, [10], 500);
surfaceLoad4.IndividualMassComponents(500, 600, 800);

/***************************************** Solid loads ******************************************/
var solidLoad = new SolidLoad();
// Force uniform solid load
solidLoad.Force(undefined, lc, [1], 2000);
// Temperature linear in X solid load
// Parameter values: [T1, T2, Node1, Node2]
solidLoad.Temperature(undefined, lc, [1], "Linear in X", [91, 92, 100, 150]);
// Strain linear in Z solid load
// Parameter values: [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
solidLoad.Strain(undefined, lc, [1], "Linear in Z", [104, 108, 0.2]);

// Buoyancy solid load set via parameters with air density defined by attitude
var solidLoad2 = new SolidLoad(undefined, lc, [1], "Load set via parameters", { "load_type" : "Buoyancy", "uniform_magnitude" : 1500} );



/***************************************** Opening loads ****************************************/
var openingLoad = new OpeningLoad();
// Force uniformer/trapezoidal opening load
openingLoad.Force(undefined, lc, [1], "Uniform/Trapezoidal", [1500]);
// Force uniformed/trapezoidal opening load with smooth concentrated load
openingLoad.Force(undefined, lc, [1], "Uniform/Trapezoidal", [1500]);
openingLoad.SmoothConcentratedLoad(true);
// Force linear / trapezoidal opening load
openingLoad.Force(undefined, lc, [3], "Linear/Trapezoidal", [97, 66, 92, 500, 1000, 1500]);
// Force linear /trapezoidal opening load with other direction
openingLoad.Force(undefined, lc, [2], "Linear/Trapezoidal", [97, 66, 92, 500, 1000, 1500], "X_A (U_A )");