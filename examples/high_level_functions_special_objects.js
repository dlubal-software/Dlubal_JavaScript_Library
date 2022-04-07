var t1 = new Date().getTime();
include("../includes/Tools/high_level_functions_support.js");

run("../includes/Tools/clearAll.js");

// Preparations of objects
var material = createMaterial("S235");
var material2 = createMaterial("S420M");
var material3 = createMaterial("Soda-lime silicate glass");
var section = createSection(material, "IPE 80");
var section2 = createSection(material, "1/2 HEA 140");
if (RFEM) {
	var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
	var nodesForLines = createNodesGrid(-28, -28, [10, 1], [3, 4]);
}
var nodesForMembers = createNodesGrid(-28, -24, [10, 1], [3, 4]);
if (RFEM) {
	var nodesForSurfaces = createNodesGrid(-28, -20, [10, 2], [3, 2]);
	createSurfacesFromNodesGrid(nodesForSurfaces, [5, 1], surfaces.TYPE_STANDARD, thickness);
	var nodesForSurfacesForLineHinges = createNodesGrid(-28, -10, [10, 2], [3, 2]);
	var surfacesForLineHinges = createSurfacesFromNodesGrid(nodesForSurfacesForLineHinges, [5, 1], surfaces.TYPE_STANDARD, thickness);
}
var nodesForNodalSupports = createNodesGrid(-28, -5, [10, 1], [3, 4]);
if (RFEM) {
	var nodesForLineSupports = createNodesGrid(-28, -1, [10, 1], [3, 2]);
}
var nodesForMembersForMemberSupports = createNodesGrid(-28, 4, [10, 1], [3, 2]);
if (RFEM) {
	var nodesForSurfacesForSurfacesSupports = createNodesGrid(-28, 8, [10, 2], [3, 2]);
	var surfacesForSupports = createSurfacesFromNodesGrid(nodesForSurfacesForSurfacesSupports, [5, 1], surfaces.TYPE_STANDARD, thickness);
}

if (RFEM) {
	var line = new Line();
	for (var i = 0; i < nodesForLines.length; i+=2) {
		line.Polyline(undefined, [nodesForLines[i].no, nodesForLines[i + 1].no]);
	}
}

var member = new Member();
for (var i = 0; i < nodesForMembers.length; i+=2) {
	member.Beam(undefined, [nodesForMembers[i].no, nodesForMembers[i + 1].no], section.no);
}

if (RFEM) {
	var nodesForMemberHinges = createNodesGrid(-28, -14, [10, 1], [3, 5]);
	var membersForHinges = createMembersFromNodesGrid(nodesForMemberHinges, [5, 1], members.TYPE_BEAM, section);
	var memberHinge = new MemberHinge();
	for (var i = 0; i < membersForHinges.length; ++i) {
		if (i <= 2) {
			memberHinge.Translational(undefined, [membersForHinges[i].no], [membersForHinges[i].no], [true, 5000, 2], [true, 5000, 2], [true, 5000, 2]);
		}
		else {
			memberHinge.Rotational(undefined, [membersForHinges[i].no], undefined, [true, 5000, 2], [true, 5000, 2], [true, 5000, 2]);
		}
	}
	
	var lineHinge = new LineHinge(1);
	lineHinge.Translation(1500,2000,2500);
	lineHinge.Rotation(false);
	j = 21;
	for (var i = 6; i <= 10; ++i) {
		lineHinge.AssignTo(surfacesForLineHinges[i][0].no,j);
		j += 4; 
	}
}

var nodalSupport = new NodalSupport();
nodalSupport.SetNodes(nodesForNodalSupports);
nodalSupport.Rotation(1.0, 1.5, 2.0);

if (RFEM) {
	var line = new Line();
	for (var i = 0; i < nodesForLineSupports.length; i+=2) {
		line.Polyline(undefined, [nodesForLineSupports[i].no, nodesForLineSupports[i + 1].no]);
		var lineSupport = new LineSupport();
		lineSupport.SetLines([line.line.no]);
		lineSupport.Translation(100, 1500, 2000);
	}
}

var memberSupport = new MemberSupport();
for (var i = 0; i < nodesForMembersForMemberSupports.length; i+=2) {
	member.Beam(undefined, [nodesForMembersForMemberSupports[i].no, nodesForMembersForMemberSupports[i + 1].no], section.no);
	var memberSupport = new MemberSupport();
	memberSupport.SetMembers([member.member.no]);
	memberSupport.Shear(1100, 1200, 1300);
}

for (var i = 11; i <= 15; ++i) {
	var surfaceSupport = new SurfaceSupport(undefined, surfacesForSupports[i][0].no);
	surfaceSupport.Translation(200, 400, 800);
}

var memberStiffnessModification = new MemberStiffnessModification();
var surfaceStiffnessModification = new SurfaceStiffnessModification();
surfaceStiffnessModification.TotalStiffnessFactor(1, undefined, 2.5);

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
var structureModification = new StructureModification(undefined, "First");
structureModification.Material("Soda-lime silicate glass", undefined, 1.50, "Factor for E and G modification"); // 
structureModification.Section("1/2 HEA 140 | 1 - S235", undefined, undefined, 1.50, undefined, 1.80); // Az and iY modification
structureModification.Members(memberStiffnessModification.member_stiffness_modification, [6, 7], "Structure modification for members 1, 2");
structureModification.Surfaces(surfaceStiffnessModification.surface_stiffness_modification, [1, 2, 3], "Structure modification for surfaces 1 - 3");
structureModification.MemberHinges(6, "End", undefined, undefined, 1.50);	// translational spring constant Cu,z
structureModification.MemberHinges(9, "Start", undefined, undefined, undefined, undefined, 1.50, 1.60);	// rotational spring constant Cφ,y and Cφ,z
structureModification.LineHinges(6, 21, undefined, 1.6, 2.0); // Surface no. 6, line no. 21, Cu,x parameter set
// structureModification.LineHinges(7, 27, 1.1, 1.2); // Cu,x, Cu,y set
structureModification.NodalSupports(62, undefined, undefined, undefined, 1.9, 2.0); // Node no. 62, Cφ,x, Cφ,y set
structureModification.NodalSupports(70, undefined, undefined, undefined, undefined, undefined, 2.0); // Node no. 70, Cφ,z set
structureModification.LineSupports(77, undefined, undefined, 2.0); // Line no. 77, Cu,z set
structureModification.LineSupports(80, 1.1, 1.2, 1.3); // Line no. 80, Cu,x, Cu,y, Cu,z set
structureModification.MemberSupports(12, undefined, undefined, undefined, 2.0, 2.5, 3.0); // Member no. 12, Cs,x, Cs,y, Cs,z set
structureModification.SurfaceSupports(15, 1.0, 2.0, 3.0); // Surface no. 15, Cu,x, Cu,y, Cu,z set
structureModification.DisableNonlinearitiesMemberHinges();

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");