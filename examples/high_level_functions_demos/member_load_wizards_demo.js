/*
IMPORTANT: there is bug/crash (when RelativeToleranceForMembersOnPlane is set to memberLoadFromFreeLineLoadWizard)
*/

include("../includes/Tools/high_level_functions_support.js");

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

// Preperations of objects
var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var nodesForMembers = createNodesGrid(-28, -24, [10, 5], [3, 4]);
var lc = LoadCase(undefined);
var member = new Member();
for (var i = 0; i < nodesForMembers.length; i += 2) {
	member.Beam(undefined, [nodesForMembers[i].no, nodesForMembers[i + 1].no], section.no);
}

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
var memberLoadFromAreaLoadWizard = new MemberLoadFromAreaLoadWizard(undefined, lc, "Empty member load from area load wizard", { "uniform_magnitude": 1500 });
var memberLoadFromAreaLoadWizardUni = new MemberLoadFromAreaLoadWizard();
memberLoadFromAreaLoadWizardUni.Uniform(undefined, lc, 1000, undefined, "GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED");
memberLoadFromAreaLoadWizardUni.SetCornerNodes(["7,27,30,10"]);
var memberLoadFromAreaLoadWizardLin = new MemberLoadFromAreaLoadWizard();
memberLoadFromAreaLoadWizardLin.Linear(undefined, lc, 1000, 21, 1500, 41, 2000, 44, undefined, "GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED");
memberLoadFromAreaLoadWizardLin.SetCornerNodes(["21,41,44"]);
var memberLoadFromAreaLoadWizardVarX = new MemberLoadFromAreaLoadWizard();
memberLoadFromAreaLoadWizardVarX.VaryingInX(undefined, lc, [1, 1, 1000, 3, 2, 1500]);
memberLoadFromAreaLoadWizardVarX.SetCornerNodes(["24,44,47"]);
var memberLoadFromAreaLoadWizardVarY = new MemberLoadFromAreaLoadWizard();
// memberLoadFromAreaLoadWizardVarY.VaryingInY(undefined, lc, [0.5, 0.5, 500, 2.5, 2, 1500]);
// Varying in Y member load wizard with all options set and geometry and tolerances specified
memberLoadFromAreaLoadWizardVarY.VaryingInY(undefined, lc, [1.5, 1.5, 2000, 4, 2.5, 2500], undefined, "GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED");
memberLoadFromAreaLoadWizardVarY.SetCornerNodes(["1, 4, 34"]);
memberLoadFromAreaLoadWizardVarY.SetExcludedMembers([12, 17]);
memberLoadFromAreaLoadWizardVarY.RelativeToleranceForMembersOnPlane(0.008);
memberLoadFromAreaLoadWizardVarY.AbsoluteToleranceForNodesOnLine(0.01);
// memberLoadFromAreaLoadWizardVarY.LockForNewMembers();
memberLoadFromAreaLoadWizardVarY.SmoothConcentratedLoad();
memberLoadFromAreaLoadWizardVarY.ConsiderMemberEccentricity();
memberLoadFromAreaLoadWizardVarY.ConsiderSectionDistribution();

var memberLoadFromFreeLineLoadWizard = new MemberLoadFromFreeLineLoadWizard(undefined, lc, "Empty member load from area load wizard", { "magnitude_uniform": 1500, "node_1": 1, "node_2": 8 });
var memberLoadFromFreeLineLoadWizardUni = new MemberLoadFromFreeLineLoadWizard();
memberLoadFromFreeLineLoadWizardUni.Uniform(undefined, lc, 1000, 11, 46, undefined, "GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED");
var memberLoadFromFreeLineLoadWizardLin = new MemberLoadFromFreeLineLoadWizard();
memberLoadFromFreeLineLoadWizardLin.Linear(undefined, lc, 1000, 1, 1500,50, undefined, "GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED");
// memberLoadFromFreeLineLoadWizardLin.RelativeToleranceForMembersOnPlane(0.008);	// BUG/CRASH!!
memberLoadFromFreeLineLoadWizardLin.AbsoluteToleranceForNodesOnLine(0.01);
// memberLoadFromFreeLineLoadWizardLin.ExcludedMembers([7]); // BUG/CRASH!!
// memberLoadFromFreeLineLoadWizardLin.LockForNewMembers();
memberLoadFromFreeLineLoadWizardLin.ConsiderMemberEccentricity();
memberLoadFromFreeLineLoadWizardLin.ConsiderSectionDistribution();

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
