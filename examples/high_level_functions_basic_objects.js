include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var section2 = createSection(material, "IPE 100");
var nodesForMembers = createNodesGrid(-28, -28, [10, 6], [3, 4]);
if (RFEM) {
	var nodeForLines = createNodesGrid(-28, -6, [10, 10], [3, 4]);
	var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
	var solid = makeSolid([[8, -16, 0], [20, -16, 0], [20, -8, 0], [8, -8, 0], [8, -16, -5], [20, -16, -5], [20, -8, -5], [8, -8, -5]]);
	var nodesForSurfaces = createNodesGrid(1, 10, [6, 4], [5, 5]);
	var surfaceList = createSurfacesFromNodesGrid(nodesForSurfaces, [3, 2], surfaces.TYPE_STANDARD, thickness);

	 /*For line welded joints
					line1			line2
				+-------------+-------------+node3
			   /node1		 /|	node2	   /
			  /				/ |			  /
			 /			   /  |			 /line3
	  line6	/		line7 /	  |	line9   /
		   /			 /	  |		   /
		  /	node6		/node5|		  /
		 +----line5----+-----line4---+node4
					   |	  |
							  +node8
					   |	  /
				line8  |	 /
					   |	/line10
					   |   /
					   |  /
					   | /
					   +node7
	*/
	var node1 = createNode(8, -5, 0);
	var node2 = createNode(13, -5, 0);
	var node3 = createNode(18, -5, 0);
	var node4 = createNode(18, 0, 0);
	var node5 = createNode(13, 0, 0);
	var node6 = createNode(8, 0, 0);
	var node7 = createNode(node5.coordinate_1, node5.coordinate_2, 5);
	var node8 = createNode(node2.coordinate_1, node2.coordinate_2, 5);
	var line1 = createLine(node1.no, node2.no);
	var line2 = createLine(node2.no, node3.no);
	var line3 = createLine(node3.no, node4.no);
	var line4 = createLine(node5.no, node4.no);
	var line5 = createLine(node6.no, node5.no);
	var line6 = createLine(node6.no, node1.no);
	var lineForWeldedJoint = new Line();
	var lineForWeldedJointNo = lineForWeldedJoint.Polyline(undefined, [node5.no, node2.no]).no;
	var line8 = createLine(node5.no, node7.no);
	var line9 = createLine(node2.no, node8.no);
	var line10 = createLine(node7.no, node8.no);
	var surfaceForWeldedJoint = createSurface([line1.no, lineForWeldedJointNo, line5.no, line6.no], surfaces.TYPE_STANDARD, thickness);
	var surface2ForWeldedJoint = createSurface([line2.no, line3.no, line4.no, lineForWeldedJointNo], surfaces.TYPE_STANDARD, thickness);
	var surface3ForWeldedJoint = createSurface([lineForWeldedJointNo, line9.no, line10.no, line8.no], surfaces.TYPE_STANDARD, thickness);
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
member4.NodesOnMember([[undefined, "XY", 0.1, 0.9], [undefined, "XY", 0.2, 0.8]]);
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
	line2.NURBS(undefined, [107, 119], [[nodes[109].coordinate_1, nodes[109].coordinate_2, nodes[109].coordinate_3, undefined], [nodes[120].coordinate_1, nodes[120].coordinate_2, nodes[120].coordinate_3, undefined], [nodes[120].coordinate_1, nodes[120].coordinate_2, nodes[120].coordinate_3, undefined]], 5);
	// Option: rotation
	var line3 = new Line();
	line3.Polyline(undefined, [121, 122]);
	line3.Rotation([20]);	// type: angle
	line3.Polyline(undefined, [123, 124]);
	line3.Rotation([124, "x-z"], 2);	// type: help node
	line3.Circle(undefined, [nodes[126].coordinate_1, nodes[126].coordinate_2, nodes[126].coordinate_3], 3);
	line3.Rotation(["x-z"], 3);	// Inside (non-straight line)
	// Option: member
	var line4 = new Line();
	line4.Polyline(undefined, [128, 129]);
	line4.AssignMember();
	// Option: nodes on line
	var line5 = new Line();
	line5.Polyline(undefined, [131, 132]);
	line5.NodesOnLine([[undefined, "XY", 0.1, 0.9], [undefined, "XZ", 0.2, 0.8]]);
	// Option: Supports
	var lineSupport = new LineSupport();
	lineSupport.Hinged();
	var line6 = new Line();
	line6.Spline(undefined, [142, 133, 144, 134, 145]);
	line6.Supports(1);
	// Option: line mesh refinement
	var lineMeshRefinement = new LineMeshRefinement();
	var line7 = new Line();
	line7.Polyline(undefined, [146, 147]);
	line7.MeshRefinement(lineMeshRefinement.no);
	// Option: welded joints
	var lineWeldedJoint = line_welded_joints.create();
	lineForWeldedJoint.WeldedJoints([[lineWeldedJoint.no, surfaceForWeldedJoint.no, surface2ForWeldedJoint.no, undefined]]);
	// Other
	var line8 = new Line();
	line8.RectangularPolygon(undefined, [nodes[114].coordinate_1, nodes[114].coordinate_2, nodes[114].coordinate_3], 2, 4);
	line8.nPolygon(undefined, [nodes[149].coordinate_1, nodes[149].coordinate_2, nodes[149].coordinate_3], 5, 2);
	/*********************************************************************************************/
}