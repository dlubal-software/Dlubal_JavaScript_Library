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

/********************************************************************************* Member opening ****************************************************************************/
var member1 = new Member();
member1.Beam(undefined, [102, 103], 1);
var memberSet1 = new MemberSet();
memberSet1.ContinuousMembers(undefined, [51, member1.GetNo(), 52]);

// clearAll.js not removes member openings
for (var i = member_openings.count(); i > 0; --i) {
    member_openings.erase(member_openings.getNthObjectId(i));
}

/*
Pre-release - when merge to master make sure that member openings can be created for other member types than only for Surface model (pre-release can only Surface model type)
var circleMemberOpening = new MemberOpening(undefined, [49], undefined, "Member circle openings");
for (var row = 0; row < 9; ++row) {
    circleMemberOpening.AddTypeAndLocation("CIRCLE_OPENING", 0.3 * (row + 1), "Circle opening no. " + (row + 1));
}
var rectangleMemberOpening = new MemberOpening(undefined, [50], undefined, "Member rectangle opening");
for (var row = 0; row < 9; ++row) {
    rectangleMemberOpening.AddTypeAndLocation("RECTANGLE_OPENING", 0.3 * (row + 1), "Rectangle opening no. " + (row + 1));
    rectangleMemberOpening.SetRectangleDimension(row + 1, 0.05, 0.05);
}
var hexagonalMemberOpening = new MemberOpening(undefined, undefined, [memberSet1.GetNo()], "Hexagonal member openings with multiple");
hexagonalMemberOpening.AddTypeAndLocation("HEXAGONAL_OPENING", 0.2, "Hexagonal opening no. 1");
hexagonalMemberOpening.SetHexagonalDimension(1, 0.25, 0.05, 0.06);
hexagonalMemberOpening.SetPosition(1, "TOP", 0.02);
hexagonalMemberOpening.SetMultipleDefinition(1, 20, "RELATIVE", 0.05);*/

/*************************************************************************** Member shear panel ****************************************************************************/
var memberSupport = new MemberSupport();
memberSupport.Shear(true, false, 1200);
memberSupport.Rotation(false);

STEEL_DESIGN.setActive(true)

var member2 = new Member();
member2.Beam(undefined, [110, 111], 1);
var memberSet2 = new MemberSet();
memberSet2.ContinuousMembers(undefined, [55, member2.GetNo(), 56]);

/* Pre-release - when merge to master be sure the objects are accessible, if so, uncomment code bellow
var memberShearPanel = new MemberShearPanel();
memberShearPanel.TrapezoidalSheeting(undefined, undefined, "LOWER_FLANGE", "FI (+) 35/207 - 0.75 (b: 1) | DIN 18807 | Fischer Profil", "EVERY_SECOND_RIB", "Member shear panel 1");
memberShearPanel.SetTrapezoidalSheetingParameters(1.5, undefined, 2.0);
var memberShearPanel2 = new MemberShearPanel();
memberShearPanel2.Bracing(undefined, undefined, undefined, "L 100x65x7 | EN 10056-1:1998; ... | ArcelorMittal", "IPE 100 | Euronorm 19-57 | ArcelorMittal (2011)");  // With position on section UPPER_FLANGE default
memberShearPanel2.SetBracingParameters(3.0, 2.0, 3.5, 5.0); // With girder length
var memberShearPanel3 = new MemberShearPanel();
memberShearPanel3.TrapezoidalSheetingAndBracing(undefined, undefined, "CENTROID", "FI (+) 35/207 - 0.75 (b: 1) | DIN 18807 | Fischer Profil", undefined, "L 100x65x7 | EN 10056-1:1998; ... | ArcelorMittal", "IPE 100 | Euronorm 19-57 | ArcelorMittal (2011)", "Trapezoidal and bracing member shear panel");   // With EVERY_RIB fastening arrangement default
memberShearPanel3.TrapezoidalSheetingAndBracingParameters(1.5, undefined, 2.5, undefined, undefined, 3.5, 3);
var memberShearPanel4 = new MemberShearPanel();
memberShearPanel4.DefineSProv(10, undefined, "DEFINE"); // With object index specified
memberShearPanel4.DefineSProvParameters(3.0, 4.0);*/

/*************************************************************************** Member rotational restraint *******************************************************************/
/* Pre-release - when merge to master be sure the objects are accessible, if so, uncomment code bellow
var memberRotationalRestraint = new MemberRotationalRestraint();
memberRotationalRestraint.Continuous(undefined, [memberSupport.GetNo()], "Grade S275", "TBS (+) T 35 - 0.75", "NEGATIVE", "INTERNAL_PANEL", false, "Continuous member rotational restraint example");
memberRotationalRestraint.SetContinuousParameters(205000.0E6, 0.018, 0.00000022, 0.208, 0.041, 3.0, 1.5);
var memberRotationalRestraint2 = new MemberRotationalRestraint();
memberRotationalRestraint2.Discrete(undefined, undefined, "Grade S275", "ASB 280 - 74", "MANUALLY", undefined); // With default end panel continuous beam effect and section deformation (true)
memberRotationalRestraint2.SetDiscreteParameters(205000.0E6, 0.00012191, 0.333, 1.5, 5000.0);
memberRotationalRestraint3 = new MemberRotationalRestraint();
memberRotationalRestraint3.Manually();
memberRotationalRestraint3.SetManuallyParameters(1.5E3);*/

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");