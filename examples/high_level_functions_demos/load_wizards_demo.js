/*
IMPORTANT: there is bug/crash (when RelativeToleranceForMembersOnPlane is set to memberLoadFromFreeLineLoadWizard)
*/

include("../includes/Tools/high_level_functions_support.js");

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

// Preperations of objects
var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
if (RFEM) {
	var thickness = createThickness(0.250, material, thicknesses.TYPE_UNIFORM);
}
var nodesForMembers = createNodesGrid(-28, -24, [10, 4], [3, 4]);
var lc = new LoadCase();
var staticAnalysisSettings = static_analysis_settings.create();
lc.StaticAnalysis(undefined, "Test lc 1", staticAnalysisSettings.no);
var member = new Member();
for (var i = 0; i < nodesForMembers.length; i+=2) {
	member.Beam(undefined, [nodesForMembers[i].no, nodesForMembers[i + 1].no], section.no);
}

for (var copy = 0; copy < 2; ++copy) {
	var modelNodes = [
		createNode(-28 + 30 * copy, 5 - 30 * copy, 0),
		createNode(-15 + 30 * copy, 5 - 30 * copy, 0),
		createNode(-15 + 30 * copy, 20 - 30 * copy, 0),
		createNode(-28 + 30 * copy, 20 - 30 * copy, 0),
		createNode(-28 + 30 * copy, 5 - 30 * copy, -5),
		createNode(-15 + 30 * copy, 5 - 30 * copy, -5),
		createNode(-15 + 30 * copy, 20 - 30 * copy, -8),
		createNode(-28 + 30 * copy, 20 - 30 * copy, -8)
	];
	if (RFEM) {
		var modelLines = [
			createLine(modelNodes[0], modelNodes[1], "modelLines[0]"),
			createLine(modelNodes[1], modelNodes[2], "modelLines[1]"),
			createLine(modelNodes[2], modelNodes[3], "modelLines[2]"),
			createLine(modelNodes[3], modelNodes[0], "modelLines[3]"),
			createLine(modelNodes[0], modelNodes[4], "modelLines[4]"),
			createLine(modelNodes[1], modelNodes[5], "modelLines[5]"),
			createLine(modelNodes[2], modelNodes[6], "modelLines[6]"),
			createLine(modelNodes[3], modelNodes[7], "modelLines[7]"),
			createLine(modelNodes[4], modelNodes[5], "modelLines[8]"),
			createLine(modelNodes[5], modelNodes[6], "modelLines[9]"),
			createLine(modelNodes[6], modelNodes[7], "modelLines[10]"),
			createLine(modelNodes[7], modelNodes[4], "modelLines[11]")
		];
		for (var i = 0; i < modelLines.length; ++i) {
			createMember(undefined, section, members.TYPE_BEAM, modelLines[i]);
		}
		var modelSurfaces = [
			createSurface([modelLines[0], modelLines[1], modelLines[2], modelLines[3]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines[8], modelLines[9], modelLines[10], modelLines[11]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines[0], modelLines[4], modelLines[8], modelLines[5]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines[1], modelLines[5], modelLines[9], modelLines[6]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines[2], modelLines[6], modelLines[10], modelLines[7]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines[3], modelLines[7], modelLines[11], modelLines[4]], surfaces.TYPE_STANDARD, thickness)
		];
	}
	else {
		createMember([modelNodes[0], modelNodes[1]], section, members.TYPE_BEAM),
		createMember([modelNodes[1], modelNodes[2]], section, members.TYPE_BEAM),
		createMember([modelNodes[2], modelNodes[3]], section, members.TYPE_BEAM),
		createMember([modelNodes[3], modelNodes[0]], section, members.TYPE_BEAM),
		createMember([modelNodes[0], modelNodes[4]], section, members.TYPE_BEAM),
		createMember([modelNodes[1], modelNodes[5]], section, members.TYPE_BEAM),
		createMember([modelNodes[2], modelNodes[6]], section, members.TYPE_BEAM),
		createMember([modelNodes[3], modelNodes[7]], section, members.TYPE_BEAM),
		createMember([modelNodes[4], modelNodes[5]], section, members.TYPE_BEAM),
		createMember([modelNodes[5], modelNodes[6]], section, members.TYPE_BEAM),
		createMember([modelNodes[6], modelNodes[7]], section, members.TYPE_BEAM),
		createMember([modelNodes[7], modelNodes[4]], section, members.TYPE_BEAM)
	}
	
	var modelNodes2 = [
		createNode(-15 + 35 * copy, 5 - 30 * copy, 0),
		createNode(35 * copy, 5 - 30 * copy, 0),
		createNode(35 * copy, 15 - 30 * copy, 0),
		createNode(-15 + 35 * copy, 15 - 30 * copy, 0),
		createNode(-15 + 35 * copy, 5 - 30 * copy, -5),
		createNode(35 * copy, 5 - 30 * copy, -5),
		createNode(35 * copy, 15 - 30 * copy, -5),
		createNode(-15 + 35 * copy, 15 - 30 * copy, -5),
		createNode(-5 + 35 * copy, 5 - 30 * copy, -7),
		createNode(-5 + 35 * copy, 15 - 30 * copy, -7)
	];
	if (RFEM) {
		var modelLines2 = [
			createLine(modelNodes2[0], modelNodes2[1], "modelLines2[0]"),
			createLine(modelNodes2[1], modelNodes2[2], "modelLines2[1]"),
			createLine(modelNodes2[2], modelNodes2[3], "modelLines2[2]"),
			createLine(modelNodes2[3], modelNodes2[0], "modelLines2[3]"),
			createLine(modelNodes2[0], modelNodes2[4], "modelLines2[4]"),
			createLine(modelNodes2[1], modelNodes2[5], "modelLines2[5]"),
			createLine(modelNodes2[2], modelNodes2[6], "modelLines2[6]"),
			createLine(modelNodes2[3], modelNodes2[7], "modelLines2[7]"),
			createLine(modelNodes2[4], modelNodes2[8], "modelLines2[8]"),
			createLine(modelNodes2[8], modelNodes2[5], "modelLines2[9]"),
			createLine(modelNodes2[5], modelNodes2[6], "modelLines2[10]"),
			createLine(modelNodes2[6], modelNodes2[9], "modelLines2[11]"),
			createLine(modelNodes2[9], modelNodes2[7], "modelLines2[12]"),
			createLine(modelNodes2[7], modelNodes2[4], "modelLines2[13]"),
			createLine(modelNodes2[8], modelNodes2[9], "modelLines2[14]")
		];
		for (var i = 0; i < modelLines2.length; ++i) {
			createMember(undefined, section, members.TYPE_BEAM, modelLines2[i]);
		}
		var modelSurfaces2 = [
			createSurface([modelLines2[0], modelLines2[1], modelLines2[2], modelLines2[3]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines2[4], modelLines2[8], modelLines2[9], modelLines2[5], modelLines2[0]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines2[1], modelLines2[6], modelLines2[10], modelLines2[5]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines2[2], modelLines2[7], modelLines2[12], modelLines2[11], modelLines2[6]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines2[13], modelLines2[8], modelLines2[14], modelLines2[12]], surfaces.TYPE_STANDARD, thickness),
			createSurface([modelLines2[14], modelLines2[9], modelLines2[10], modelLines2[11]], surfaces.TYPE_STANDARD, thickness)
		];
	}
	else {
		createMember([modelNodes2[0], modelNodes2[1]], section, members.TYPE_BEAM),
		createMember([modelNodes2[1], modelNodes2[2]], section, members.TYPE_BEAM),
		createMember([modelNodes2[2], modelNodes2[3]], section, members.TYPE_BEAM),
		createMember([modelNodes2[3], modelNodes2[0]], section, members.TYPE_BEAM),
		createMember([modelNodes2[0], modelNodes2[4]], section, members.TYPE_BEAM),
		createMember([modelNodes2[1], modelNodes2[5]], section, members.TYPE_BEAM),
		createMember([modelNodes2[2], modelNodes2[6]], section, members.TYPE_BEAM),
		createMember([modelNodes2[3], modelNodes2[7]], section, members.TYPE_BEAM),
		createMember([modelNodes2[4], modelNodes2[8]], section, members.TYPE_BEAM),
		createMember([modelNodes2[8], modelNodes2[5]], section, members.TYPE_BEAM),
		createMember([modelNodes2[5], modelNodes2[6]], section, members.TYPE_BEAM),
		createMember([modelNodes2[6], modelNodes2[9]], section, members.TYPE_BEAM),
		createMember([modelNodes2[9], modelNodes2[7]], section, members.TYPE_BEAM),
		createMember([modelNodes2[7], modelNodes2[4]], section, members.TYPE_BEAM),
		createMember([modelNodes2[8], modelNodes2[9]], section, members.TYPE_BEAM)
	}
}

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
var memberLoadFromAreaLoadWizard = new MemberLoadFromAreaLoadWizard(undefined, lc.LoadCase, "Empty member load from area load wizard", { "uniform_magnitude" : 1500 });
memberLoadFromAreaLoadWizard.Uniform(undefined, lc.LoadCase, 1000, undefined, "X_P (U_P )")
memberLoadFromAreaLoadWizard.Linear(undefined, lc.LoadCase, 1000, 5, 1500, 17, 2000, 27, undefined, "Z_P (W_P )");
memberLoadFromAreaLoadWizard.VaryingInX(undefined, lc.LoadCase, [1, 1, 1000, 3, 2, 1500]);
memberLoadFromAreaLoadWizard.VaryingInY(undefined, lc.LoadCase, [0.5, 0.5, 500, 2.5, 2, 1500]);
// Varying in Y member load wizard with all options set and geometry and tolerances specified
memberLoadFromAreaLoadWizard.VaryingInY(undefined, lc.LoadCase, [1.5, 1.5, 2000, 4, 2.5, 2500], undefined, "Y_P (V_P )");
memberLoadFromAreaLoadWizard.SetGeometry(["1, 2, 11", "23, 24, 34, 33"], [11], [12]);
memberLoadFromAreaLoadWizard.RelativeToleranceForMembersOnPlane(0.008);
memberLoadFromAreaLoadWizard.AbsoluteToleranceForNodesOnLine(0.01);
memberLoadFromAreaLoadWizard.LockForNewMembers();
memberLoadFromAreaLoadWizard.SmoothConcentratedLoad();
memberLoadFromAreaLoadWizard.ConsiderMemberEccentricity();
memberLoadFromAreaLoadWizard.ConsiderSectionDistribution();

var memberLoadFromFreeLineLoadWizard = new MemberLoadFromFreeLineLoadWizard(undefined, lc.LoadCase, "Empty member load from area load wizard", { "magnitude_uniform" : 1500 , "node_1" : 31, "node_2" : 32});
memberLoadFromFreeLineLoadWizard.Uniform(undefined, lc.LoadCase, 1000, 33, 34, undefined, "X_P (U_P )");
memberLoadFromFreeLineLoadWizard.Linear(undefined, lc.LoadCase, 1000, 35, 1500, 36, undefined, "Z_P (W_P )");
//memberLoadFromFreeLineLoadWizard.RelativeToleranceForMembersOnPlane(0.008);	// BUG/CRASH!!
memberLoadFromFreeLineLoadWizard.AbsoluteToleranceForNodesOnLine(0.01);
memberLoadFromFreeLineLoadWizard.ExcludedMembers([20, 21], [22, 23]);
memberLoadFromFreeLineLoadWizard.LockForNewMembers();
memberLoadFromFreeLineLoadWizard.ConsiderMemberEccentricity();
memberLoadFromFreeLineLoadWizard.ConsiderSectionDistribution();

var snowLoadWizard = new SnowLoadWizard();
var lc2 = new LoadCase();
lc2.StaticAnalysis(undefined, "Test lc 2", staticAnalysisSettings.no, "ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS");
var lc3 = new LoadCase();
lc3.StaticAnalysis(undefined, "Test lc 3", staticAnalysisSettings.no, "ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS");
var lc4 = new LoadCase();
lc4.StaticAnalysis(undefined, "Test lc 4", staticAnalysisSettings.no, "ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS");
var lc5 = new LoadCase();
lc5.StaticAnalysis(undefined, "Test lc 5", staticAnalysisSettings.no, "ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS");
snowLoadWizard.MonopitchRoofType(undefined, [45, 46, 47, 48], lc2.LoadCase);
snowLoadWizard.Duopitch(undefined, [56, 53, 57, 54, 55, 58], lc3.LoadCase,  lc4.LoadCase,  lc5.LoadCase);
snowLoadWizard.SetLoadedRoofes([true, false]);	// Disable second loaded roof
snowLoadWizard.WithoutLoadsOnMembers([43, 46], [45]);
if (RFEM) {
	snowLoadWizard.WithoutLoadsOnSurfaces([11], [10]);
	snowLoadWizard.WithoutLoadsOnLines(undefined, [44, 45]);
}
snowLoadWizard.LockForNewObjects();

var windLoadWizard = new WindLoadWizard();
var loadCases = [];
for (var i = 0; i < 26; ++i) {
	var lc = new LoadCase();
	lc.StaticAnalysis(undefined, "Test lc " + (i + 6), staticAnalysisSettings.no, "ACTION_CATEGORY_WIND_QW");
	loadCases.push(lc);
}

// Vertical walls with flat/monopitch roof with all available settings
windLoadWizard.WallsRoofMonopitch(undefined, [59, 60, 61, 62], [63, 64, 65, 66], [loadCases[0].LoadCase, loadCases[1].LoadCase]);
windLoadWizard.Direction([true, false, false, true]);	// Wind perpendicular
windLoadWizard.SetLoadedWallsAndRoofs([true, false, false, false]);
windLoadWizard.WithoutLoadsOnMembers([57, 59], [49]);
if (RFEM) {
	windLoadWizard.WithoutLoadsOnSurfaces([14], [16]);
	windLoadWizard.WithoutLoadsOnLines([50, 58], [50, 54]);
}
windLoadWizard.LockForNewObjects();
windLoadWizard.ConsiderMemberEccentricity();
windLoadWizard.ConsiderSectionDistribution();
// Other types of wind wizards
windLoadWizard.WallsRoofDuopitch(undefined, [70, 67, 68, 69], [74, 71, 75, 72, 73, 76], [loadCases[2].LoadCase, loadCases[3].LoadCase, loadCases[4].LoadCase, loadCases[5].LoadCase]);
windLoadWizard.Direction([false, false, true, true]);
windLoadWizard.SetLoadedWallsAndRoofs([true, true, false, false]);
windLoadWizard.RoofMonopitch(undefined, [66, 63, 64, 65], [loadCases[6].LoadCase, loadCases[7].LoadCase, loadCases[8].LoadCase, loadCases[9].LoadCase, loadCases[10].LoadCase, loadCases[11].LoadCase, loadCases[12].LoadCase, loadCases[13].LoadCase]);
windLoadWizard.RoofDuopitch(undefined, [74, 71, 75, 72, 73, 76], [loadCases[14].LoadCase, loadCases[15].LoadCase, loadCases[16].LoadCase, loadCases[17].LoadCase, loadCases[18].LoadCase, loadCases[19].LoadCase, loadCases[20].LoadCase, loadCases[21].LoadCase, loadCases[22].LoadCase, loadCases[23].LoadCase, loadCases[24].LoadCase, loadCases[25].LoadCase])

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");