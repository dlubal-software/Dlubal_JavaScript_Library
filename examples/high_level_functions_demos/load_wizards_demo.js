include("../includes/Tools/high_level_functions_support.js");

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

// Preperations of objects
var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var nodesForMembers = createNodesGrid(-28, -24, [10, 5], [3, 4]);
var lc = createLoadCase();
var member = new Member();
for (var i = 0; i < nodesForMembers.length; i+=2) {
	member.Beam(undefined, [nodesForMembers[i].no, nodesForMembers[i + 1].no], section.no);
}

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
var memberLoadFromAreaLoadWizard = new MemberLoadFromAreaLoadWizard(undefined, lc, "Empty member load from area load wizard", { "uniform_magnitude" : 1500 });
memberLoadFromAreaLoadWizard.Uniform(undefined, lc, 1000, undefined, "X_P (U_P )")
memberLoadFromAreaLoadWizard.Linear(undefined, lc, 1000, 5, 1500, 17, 2000, 27, undefined, "Z_P (W_P )");
memberLoadFromAreaLoadWizard.VaryingInX(undefined, lc, [1, 1, 1000, 3, 2, 1500]);
memberLoadFromAreaLoadWizard.VaryingInY(undefined, lc, [0.5, 0.5, 500, 2.5, 2, 1500]);
// Varying in Y member load wizard with all options set and geometry and tolerances specified
memberLoadFromAreaLoadWizard.VaryingInY(undefined, lc, [1.5, 1.5, 2000, 4, 2.5, 2500], undefined, "Y_P (V_P )");
memberLoadFromAreaLoadWizard.SetGeometry(["1, 2, 11", "23, 24, 34, 33"], [11], [12]);
memberLoadFromAreaLoadWizard.RelativeToleranceForMembersOnPlane(0.008);
memberLoadFromAreaLoadWizard.AbsoluteToleranceForNodesOnLine(0.01);
memberLoadFromAreaLoadWizard.LockForNewMember();
memberLoadFromAreaLoadWizard.SmoothConcentratedLoad();
memberLoadFromAreaLoadWizard.ConsiderMemberEccentricity();
memberLoadFromAreaLoadWizard.ConsiderSectionDistribution();

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");