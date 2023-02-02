include("../includes/Tools/high_level_functions_support.js");
run("../includes/Tools/clearAll.js");
var t1 = new Date().getTime();
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
var material = createMaterial("S235");
var section = createSection(material, "IPE 80");

var nodesForMembers = createNodesGrid(-28, -28, [12, 10], [3, 5]);
createMembersFromNodesGrid(nodesForMembers, [6, 10], members.TYPE_BEAM, section);

var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeToSection(undefined, [1], [1], "RIGHT_TOP");
memberEccentricity.RelativeToSection(undefined, [2], [2], "CENTER_CENTER");
memberEccentricity.Absolute(undefined, [3], [3], 0.05, undefined, 0.15);
// With global coordinates
memberEccentricity.Absolute(undefined, [4], [4], 0.05, 0.06, 0.07, coordinate_systems[1]);
memberEccentricity.RelativeToSection(undefined, [5], [5], "RIGHT_TOP");
memberEccentricity.AxialOffset();
memberEccentricity.HingeLocationAtNode();
memberEccentricity.RelativeAndAbsolute(undefined, [6], [6], "RIGHT_BOTTOM", 0.005, 0.0015, 0.002);
memberEccentricity.TransverseOffsetMember(7, "RIGHT_TOP", 14);

var memberHinge = new MemberHinge();
// Translational uy, Fixed if negative nonlinearity
memberHinge.Translational(undefined, [15], undefined, undefined, [true, 5000, "FAILURE_IF_POSITIVE"]);
// Translational ux, Fixed if positive N nonlinearity
memberHinge.Translational(undefined, [16], [16], [true, 1500, "FAILURE_IF_POSITIVE"]);
// Translational uz, Partial activity nonlinearity
memberHinge.Translational(undefined, [17], [17], undefined, undefined, [true, 5000, "PARTIAL_ACTIVITY"]);
// Negative and positive zone type "Complete"
memberHinge.PartialActivityTranslationalZ([0, 0.01], [0, 0.02]);
// Translational ux, Partial activity nonlinearity
memberHinge.Translational(undefined, [18, 19, 20], [18, 19, 20], [true, 5000, "PARTIAL_ACTIVITY"]);
// Negative zone type: Fixed from release displacement ux (-), positive zone type: Yielding from release force N (+)
memberHinge.PartialActivityTranslationalX([1, 0.05, 0.02], [3, 1500, 0.025]);
// Rotational φy, Diagram nonlinearity
memberHinge.Rotational(undefined, [21], [21], undefined, [true, 5, "DIAGRAM"]);
memberHinge.DiagramRotationalY([[10, 5, 500], [18.3, 10, 600]]);
// Translational friction friction Vy+Vz nonlinearity for ux
memberHinge.Translational(undefined, [22], [22], [true, 1200, "FRICTION_DIRECTION_1_PLUS_2"]);
memberHinge.FrictionVyPlusVzTranslationalX(1, 2, 1500);
// Translational uy, Fixed if negative nonlinearity, infinity spring constant, diagram nonlinearity
memberHinge.Translational(undefined, [23, 24], [24, 25], undefined, [false, "DIAGRAM"]);
memberHinge.DiagramTranslationalY([[0.5, 500, 1000], [1, 600, 200], [1.1, 500, -1000]]);

var memberNonlinearity = new MemberNonlinearity();
memberNonlinearity.FailureIfTension(undefined, [31]);
memberNonlinearity.FailureIfTensionWithSlippage(undefined, [32], 0.05);
memberNonlinearity.FailureUnderTension(undefined, [33], 500);
memberNonlinearity.YieldingUnderCompression(undefined, [34], 1000);
memberNonlinearity.Yielding(undefined, [35, 36, 37], 500, 600);

members[38].type = members.TYPE_DEFINABLE_STIFFNESS;
members[39].type = members.TYPE_DEFINABLE_STIFFNESS;
var memberDefinableStiffness = new MemberDefinableStiffness(undefined, [38, 39]);
memberDefinableStiffness.TorsionalAndBendingStiffness(5, 10, 20);
memberDefinableStiffness.AxialAndShearStiffness(30, 40, 50);
memberDefinableStiffness.SelfWeightAndSectionArea(1500,0.01);
memberDefinableStiffness.ThermalExpansionCoefficient(0.0001,0.1,0.1);
memberDefinableStiffness.MainAxesRotation(0.0);

var memberResultIntermediatePoint = new MemberResultIntermediatePoint(undefined, [45, 46], "MemberResultIntermediatePoint with uniform distances");
memberResultIntermediatePoint.UniformDistances(5, ["ord. 1", "ord. 2", "ord. 3", "ord. 4", "ord. 5"]);
var memberResultIntermediatePoint2 = new MemberResultIntermediatePoint(undefined, [47, 48], "MemberResultIntermediatePoint with division ordinates");
// Default ordinates will be replaced by new ones, with absolute distances
memberResultIntermediatePoint2.DivisionOrdinates([0.1, 0.2, 0.3, 0.4, 0.9]);

var structureModification = new StructureModification();
var memberStiffnessModification = new MemberStiffnessModification(undefined, structure_modification);
// Type: Beams
memberStiffnessModification.ConcreteStructuresCsa("COLUMNS");
var memberStiffnessModification2 = new MemberStiffnessModification(undefined, structure_modification);
memberStiffnessModification2.SteelStructuresAisc(1, 2);
var memberDefinableStiffness3 = new MemberStiffnessModification(undefined, structure_modification);
memberDefinableStiffness3.SteelStructuresCSA(undefined, undefined, 1, 2);

STEEL_DESIGN.setActive(true)

var memberSurfaceModel = new Member();
memberSurfaceModel.SurfaceModel(undefined, [102, 103], 1);
var memberSetForOpenings = new MemberSet();
memberSetForOpenings.ContinuousMembers(undefined, [51, memberSurfaceModel.GetNo()]);

members[49].type = members.TYPE_SURFACE_MODEL;
members[50].type = members.TYPE_SURFACE_MODEL;
members[51].type = members.TYPE_SURFACE_MODEL;

// clearAll.js not removes member openings
for (var i = member_openings.count(); i > 0; --i) {
    member_openings.erase(member_openings.getNthObjectId(i));
}

var circleMemberOpening = new MemberOpening(undefined, [49], undefined, "Member circle openings");
for (var row = 0; row < 9; ++row) {
    circleMemberOpening.AddTypeAndLocation("CIRCLE_OPENING", 0.3 * (row + 1), "Circle opening no. " + (row + 1));
}
var rectangleMemberOpening = new MemberOpening(undefined, [50], undefined, "Member rectangle opening");
for (var row = 0; row < 9; ++row) {
    rectangleMemberOpening.AddTypeAndLocation("RECTANGLE_OPENING", 0.3 * (row + 1), "Rectangle opening no. " + (row + 1));
    rectangleMemberOpening.SetRectangleDimension(row + 1, 0.05, 0.05);
}
var hexagonalMemberOpening = new MemberOpening(undefined, undefined, [1], "Hexagonal member openings with multiple");
hexagonalMemberOpening.AddTypeAndLocation("HEXAGONAL_OPENING", 3.5, "Hexagonal opening no. 1");
hexagonalMemberOpening.SetHexagonalDimension(1, 0.25, 0.05, 0.06);
hexagonalMemberOpening.SetPosition(1, "TOP", 0.02);
hexagonalMemberOpening.SetMultipleDefinition(1, 3, "RELATIVE", 0.05);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");