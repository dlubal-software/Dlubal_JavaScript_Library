run("clearAll.js");
// prepare materials, sections and thickness for the model
var material_steel = Material(undefined, "S235 | EN 1993-1-1:2005-05");
var material_concrete = Material(undefined, "C12/15 | EN 1992-1-1:2004/A1:2014");

var section_params = { "shear_stiffness_deactivated": true };
var section_IPE240 = Section(undefined, "IPE 240", material_steel, "", section_params);
var section_IPE180 = Section(undefined, "IPE 180", material_steel, "", section_params);

if (RFEM) {
	var thickness = Thickness(undefined, "", material_concrete, 120mm);
};
for (var i = 0; i < 20; ++i) {
	Node("undefined", 0, 0, i);
	Node("undefined", 1, 0, i);
	Node("undefined", 1, 1, i);
	Node("undefined", 0, 1, i);
}

if (RFEM) {
	for (var i = 1; i < 80; ++i) {
		for (var j = 0; j < 3; ++j) {
			Line(undefined, [i + j, i + j + 1]);
		}
		Line(undefined, [i, i + j]);
		i = i + 3;
	}

	for (var i = 1; i <= 80; ++i) {
		Surface(undefined, [i, i + 1, i + 2, i + 3], thickness);
		i = i + 3;
	};
	Line(undefined, "2,3");
	Line(undefined, "6,7");
	Line(undefined, "7,8");
	Line(undefined, "8,9");
	Line(undefined, "9,6");
	Line(undefined, "4,10");
	Line(undefined, "1,2");
};

Member(undefined, [12,3], "", { "section_start": section_IPE240 });
Member(undefined, [4,12], "", { "section_start": section_IPE240 });
Member(undefined, [12,16], "", { "section_start": section_IPE180 });
//   ################# Nodal supports
//   ##### Constructors:
// Empty
var LH1 = new LineHinge();
LH1.Translation(true,true,true);
LH1.Rotation(false);
LH1.AssignTo(1, 1, 1)
LH1.AssignTo(2, 2, 1)
LH1.AssignTo(3, 3, 1)

var LH2 = new LineHinge();
LH2.Translation(false,false,false);
LH2.Rotation(true);
LH2.AssignTo(1, 5, 2);
LH2.AssignTo(2, 7, 2);

var LH3 = new LineHinge();
LH3.Translation(100,200,300);
LH3.Rotation(400);

var LH4 = new LineHinge();
LH4.TranslationX(true);

var LH5 = new LineHinge();
LH5.TranslationX(450);
LH5.TranslationY(false);
LH5.TranslationZ(320);

var params = {
	user_defined_name_enabled : true,
	name : " user name "
}

new LineHinge(undefined, "comment", params)

var NR = new LineMeshRefinement();

new LineMeshRefinement(undefined, 4, 8, [7, 12], "comment", params);

NR.Elements();
NR.settings.elements_finite_elements = 15;
NR.settings.lines = [1,2,3,6];

var NR1 = new LineMeshRefinement();
NR1.Gradual();
NR1.SetLines([10,13,17]);

var NR2 = new LineMeshRefinement()
NR2.Gradual(7,4);

var NR3 = new LineMeshRefinement()
NR3.Elements(16,6);