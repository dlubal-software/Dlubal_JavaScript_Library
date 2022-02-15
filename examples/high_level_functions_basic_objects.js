include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var section2 = createSection(material, "IPE 100");
var nodesForMembers = createNodesGrid(-28, -28, [10, 6], [3, 5]);
if (RFEM) {
	var nodeForLines = createNodesGrid(-28, 2, [10, 6], [3, 5]);
	var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
	var solid = makeSolid([[8, -16, 0], [20, -16, 0], [20, -8, 0], [8, -8, 0], [8, -16, -5], [20, -16, -5], [20, -8, -5], [8, -8, -5]]);
	var nodesForSurfaces = createNodesGrid(8, -2, [6, 2], [5, 5]);
	createSurfacesFromNodesGrid(nodesForSurfaces, [3, 1], surfaces.TYPE_STANDARD, thickness);
}

/*************************************** Members *********************************************/
var member = new Member();
if (RFEM) {
	// Member defined by line
	var line = new Line(undefined, [1, 2]);
	member.Beam(undefined, line.no, 1);
} else {
	// Member defined by nodes
	member.Beam(undefined, [1, 2], 2);
}
member.Rigid(undefined, [3, 4], "Beam member");
member.Truss(undefined, [5, 6], 1, "Truss member");
member.TrussOnlyN(undefined, [7, 8], 1, "Truss only N mmeber");
member.Tension(undefined, [9, 10], 1, "Tension members");
member.Compression(undefined, [11, 12], 1, "Compression member");
member.Buckling(undefined, [13, 14], 1, "Buckling member");
member.Cable(undefined, [15, 16], 1, "Cable member");
member.CouplingRigidRigid(undefined, [17, 18], "CouplingRigidRigid member");
member.CouplingRigidHinge(undefined, [19, 20], "CouplingRigidHinge member");
member.CouplingHingeRigid(undefined, [21, 22], "CouplingHingeRigid member");
member.CouplingHingeHinge(undefined, [23, 24], "CouplingHingeHinge memnber");
// Result beam with "Integrate stresses and forces within block with square area" (1), with included objects
member.ResultBeam(undefined, [25, 26], 1, 1, [1.5], [[1], [1, 2], true]);
// Result beam with "Integrate stresses and forces within cuboid" (2), with excluded members
member.ResultBeam(undefined, [27, 28], 1, 2, [0, 1.1, 0, 1.2], undefined, [undefined, [1], undefined]);
// Definable stiffness member (set via member definable stiffness object)
var member2 = new Member(undefined, [29, 30]);
member2.type = members.TYPE_DEFINABLE_STIFFNESS;
var member3 = new Member(undefined, [31, 32]);
member3.type = members.TYPE_DEFINABLE_STIFFNESS;
var memberDefinableStiffness = new MemberDefinableStiffness(undefined, [member2.no, member3.no]);
// Option: nodes on member
var member4 = new Member();
member4.Beam(undefined, [33, 34], 1);
member4.NodesOnMember([[undefined, "L", 0.1, 0.9], [undefined, "XY", 0.2, 0.8]]);
// Option: member hinges
var member5 = new Member();
member5.Beam(undefined, [35, 36], 1);
var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeToSection(undefined, [], [], "SECTION_ALIGNMENT_RIGHT_TOP");
memberEccentricity.RelativeAndAbsolute(undefined, [], [], "SECTION_ALIGNMENT_RIGHT_BOTTOM", 0.005, 0.0015, 0.002);
member5.Eccentricities(1, 2);
// Option: member support
var member6 = new Member();
member6.Beam(undefined, [37, 38], 1);
var memberSupport = new MemberSupport();
memberSupport.Fixed();
member6.Supports(1);
// Option: nonlinearity
var member7 = new Member();
member7.Beam(undefined, [39, 40], 1);
var memberNonlinearity = new MemberNonlinearity();
memberNonlinearity.FailureIfTensionWithSlippage(undefined, [], 0.05);
member7.Nonlinearity(1);
// Option: member result intermediate points
var memberResultIntermediatePoint = new MemberResultIntermediatePoint(undefined, [], "MemberResultIntermediatePoint with uniform distances");
memberResultIntermediatePoint.UniformDistances(5, ["ord. 1", "ord. 2", "ord. 3", "ord. 4", "ord. 5"]);
var member8 = new Member();
member8.Beam(undefined, [41, 42], 1);
member8.ResultIntermediatePoints(1);
// Option: End modifications
var member9 = new Member();
member9.Beam(undefined, [43, 44, 56, 46, 47], 1);
member9.EndModifications([0.1, 0.2, 0.2], [0.5, 0.2, 0.3]);
// Option: Deactivate for calculation
member9.DeactivateForCalculation();
/*********************************************************************************************/

if (RFEM) {
/***************************************** Lines *********************************************/
var line = new Line(undefined, [61, 62], "First line with default type");
var line2 = new Line();
line2.Polyline(undefined, [63, 74, 64, 75, 65]);
line2.Arc(undefined, [66, 68], [-10, 7, 0]);
line2.Arc(undefined, [69, 70], [-8, 7, 0], [undefined, undefined, 2.5]);	// with α parameter defined
line2.Arc(undefined, [71, 72], [-24, 8, 0], undefined, [-29, 7.5, 0]);		// with moved center of arc
line2.Circle(undefined, [nodes[83].coordinate_1, nodes[83].coordinate_2, nodes[83].coordinate_3], 2, [1, 0, 0]); // with normal parallel to X-Axis
line2.EllipticalArc(undefined, [nodes[84].coordinate_1, nodes[84].coordinate_2, nodes[84].coordinate_3], [nodes[87].coordinate_1, nodes[87].coordinate_2, nodes[87].coordinate_3], [nodes[96].coordinate_1, nodes[96].coordinate_2, nodes[96].coordinate_3]);
line2.Ellipse(undefined, [88, 100], [nodes[98].coordinate_1, nodes[98].coordinate_2, nodes[98].coordinate_3]);
line2.Parabola(undefined, [81, 93], [nodes[101].coordinate_1, nodes[101].coordinate_2, nodes[101].coordinate_3]);
line2.Spline(undefined, [103, 94, 105, 95, 106]);
/*********************************************************************************************/
};