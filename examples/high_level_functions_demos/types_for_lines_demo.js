run("../includes/Tools/clearAll.js");
// prepare materials, sections and thickness for the model
var material_steel = Material(undefined, "S235 | EN 1993-1-1:2005-05");
var material_concrete = Material(undefined, "C12/15 | EN 1992-1-1:2004/A1:2014");

if (RFEM) {
	var thickness = Thickness(undefined, "", material_concrete, 120mm);
	const number_of_surfaces = 10;
}

for (var i = 0; i < number_of_surfaces; ++i) {
	Node("undefined", 0, 0, i);
	Node("undefined", 1, 0, i);
	Node("undefined", 1, 1, i);
	Node("undefined", 0, 1, i);
}

if (RFEM) {
	for (var i = 1; i < 4*number_of_surfaces; ++i) {
		for (var j = 0; j < 3; ++j) {
			Line(undefined, [i + j, i + j + 1]);
		}
		Line(undefined, [i, i + j]);
		i = i + 3;
	}

	for (var i = 1; i <= 4*number_of_surfaces; ++i) {
		Surface(undefined, [i, i + 1, i + 2, i + 3], thickness);
		i = i + 3;
	}
}

//   ################# Line Hinges
//   ##### Constructors:
// Empty
var LH1 = new LineHinge();
LH1.Translation(true,true,true);
LH1.Rotation(false);
LH1.AssignTo(1, 1);
LH1.AssignTo(2, 5);
LH1.AssignTo(3, 9);

var LH2 = new LineHinge();
LH2.Translation(true,false,true);
LH2.AssignTo(1, [2, 3, 4]);
LH2.AssignTo(2, [8,6]);
LH2.WallSlabConnection(0.04);

var LH3 = new LineHinge();
LH3.Translation(100, 200, 300);
LH3.Rotation(400);
LH3.AssignTo(3, [10,11,12]);
LH3.NonlinearX.Diagram([0.2, 0.4], [4, 15]);
LH3.NonlinearY.Diagram([0.2, 0.4], [4, 15]);
LH3.NonlinearZ.Diagram([0.2, 0.4], [4, 15]);
LH3.NonlinearPhiX.Diagram([0.5, 4], [10, 15]);


var LH4 = new LineHinge(undefined,4,[13,16]);
LH4.TranslationX(true);
LH4.NonlinearX.FixedIfNegative();
LH4.NonlinearY.FixedIfNegative();
LH4.NonlinearZ.FixedIfNegative();
LH4.NonlinearPhiX.FixedIfNegative();

var LH5 = new LineHinge(undefined,6,[21,23]);
LH5.TranslationX(450);
LH5.TranslationY(false);
LH5.TranslationZ(320);

var LH6 = new LineHinge(undefined,5,[17,18]);
LH6.TranslationX(true);
LH6.NonlinearX.FixedIfPositive();
LH6.NonlinearY.FixedIfPositive();
LH6.NonlinearZ.FixedIfPositive();
LH6.NonlinearPhiX.FixedIfPositive();

var params = {
	user_defined_name_enabled : true,
	name : "user name from parameters"
};

new LineHinge(undefined, 5, 20, "comment", params);
new LineHinge(undefined, 6, [22,24], "comment", params);

var NR = new LineMeshRefinement();

new LineMeshRefinement(undefined, "Mesh Refinement 1", [7, 12]);
new LineMeshRefinement(undefined, "Mesh Refinement 2", [8, 18], 8, 4, "comment1");
new LineMeshRefinement(5, undefined, 4, 8, 6, "comment2");
new LineMeshRefinement(undefined, "", [5, 20], 0.9, 2, "comment3", params);

NR.NumberFiniteElements();
NR.settings.type = line_mesh_refinements.TYPE_ELEMENTS;
NR.settings.elements_finite_elements = 15;
NR.settings.lines = [1, 2, 3, 6];

var NR1 = new LineMeshRefinement();
NR1.Gradual();
NR1.SetLines([10, 13, 17]);

var NR2 = new LineMeshRefinement();
NR2.Gradual(7, 4, 27);

var NR3 = new LineMeshRefinement();
NR3.NumberFiniteElements(18, 6, 20);

var NR4 = new LineMeshRefinement(undefined, "Target length");
NR4.TargetFELength(5, 2, 25);

var NR5 = new LineMeshRefinement(11, "NR5", 24, 1, 3);
