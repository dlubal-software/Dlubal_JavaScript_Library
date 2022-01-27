if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates types for members.");
}
include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");

var nodesForMembers = createNodesGrid(-28, -28, [10, 10], [3, 5]);
var memberList = createMembersFromNodesGrid(nodesForMembers, [5, 10], members.TYPE_BEAM, section);

var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeToSection(undefined, 1, 1, "right_top");
memberEccentricity.RelativeToSection(undefined, 2, 2, "middle_middle");
memberEccentricity.Absolute(undefined, 3, 3, 0.05, undefined, 0.15);
// With global coordinates
memberEccentricity.Absolute(undefined, 4, 4, 0.05, 0.06, 0.07, coordinate_systems[1]);
memberEccentricity.RelativeToSection(undefined, 5, 5, "right_top");
memberEccentricity.AxialOffset();
memberEccentricity.HingeLocationAtNode();
memberEccentricity.RelativeAndAbsolute(undefined, 6, 6, "right_bottom", 0.005, 0.0015, 0.002);
memberEccentricity.TransverseOffsetMember(7, "right_top", 14);

var memberHinge = new MemberHinge();
// Translational uy, Fixed if negative nonlinearity
memberHinge.Translational(undefined, 7, undefined, undefined, [true, 5000, 2]);
// Translational ux, Fixed if positive N nonlinearity
memberHinge.Translational(undefined, 8, 8, [true, 1500, 2]);
// Translational uz, Partial activity nonlinearity
memberHinge.Translational(undefined, 9, 9, undefined, undefined, [true, 5000, 5]);
memberHinge.PartialActivityTranslationalZ([0, 0.01], [0, 0.02]);
// Rotational φy, Diagram nonlinearity
memberHinge.Rotational(undefined, 10, 10, undefined, [true, 5, 6]);
memberHinge.DiagramRotationalY(10, 5, 500, 18.3, 10, 600);
// Translational friction friction Vy+Vz nonlinearity for ux
memberHinge.Translational(undefined, 11, 11, [true, 1200, 11]);
memberHinge.FrictionVyPlusVzTranslationalX(1, 2, 1500);

var memberNonlinearity = new MemberNonlinearity();
memberNonlinearity.FailureIfTension(undefined, 12);
memberNonlinearity.FailureIfTensionWithSlippage(undefined, 13, 0.05);
memberNonlinearity.TearingUnderTension(undefined, 14, 500);
memberNonlinearity.YieldingUnderCompression(undefined, 15, 1000);
memberNonlinearity.Yielding(undefined, 16, 500, 600);

var memberDefinableStiffness = new MemberDefinableStiffness(undefined, [17, 18]);
memberDefinableStiffness.TorsionalAndBending(5, 10, 20);
memberDefinableStiffness.AxialAndShearStiffness(30, 40, 50);

var memberResultIntermediatePoint = new MemberResultIntermediatePoint(undefined, [19, 20], "MemberResultIntermediatePoint with uniform distances");
memberResultIntermediatePoint.UniformDistances(5, ["ord. 1", "ord. 2", "ord. 3", "ord. 4", "ord. 5"]);
var memberResultIntermediatePoint2 = new MemberResultIntermediatePoint(undefined, [21, 22], "MemberResultIntermediatePoint with division ordinates");
// Default ordinates will be replaced by new ones, with absolute distances
memberResultIntermediatePoint2.DivisionOrdinates([0.1, 0.2, 0.3, 0.4, 0.9]);
memberResultIntermediatePoint2.DistancesAreAbsolute();

var structureModification = new StructureModification();
var memberStiffnessModification = new MemberStiffnessModification(undefined, structure_modifications[0]);
// Type: Walls cracked
memberStiffnessModification.ConcreteStructuresAci(3);
var memberStiffnessModification2 = new MemberStiffnessModification(undefined, structure_modifications[0]);
memberStiffnessModification2.SteelStructuresAisc(1, 2);
var memberDefinableStiffness3 = new MemberStiffnessModification(undefined, structure_modifications[0]);
memberDefinableStiffness3.SteelStructuresCSA(undefined, undefined, 1, 2);