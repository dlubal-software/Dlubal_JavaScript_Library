run("../includes/Tools/clearAll.js");
// prepare materials, sections and thickness for the model
var material_steel = new Material(undefined, "S235");
var material_concrete = new Material(undefined, "C12/15");

var section_params = { "shear_stiffness_deactivated": true };
var section_IPE240 = Section(undefined, "IPE 240", material_steel.No(), "", section_params);
var section_IPE180 = Section(undefined, "IPE 180", material_steel.No(), "", section_params);

if (RFEM) {
	var thickness = Thickness(undefined, "", material_concrete.No(), 120mm);
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
var nodal_support_1 = new NodalSupport();
// Nodes
var nodal_support_2 = new NodalSupport(undefined, [1, 6]);
// Nodes, Id
var nodal_support_3 = new NodalSupport(5, [2, 3], 5);
// Nodes, Id, comment
var nodal_support_4 = new NodalSupport(undefined, [11, 12, 19], "Some comment...");

//  ##### editors:
var nodal_support_5 = new NodalSupport();
nodal_support_5.Fixed();
nodal_support_5.TranslationY(700);
nodal_support_5.Nonlinear.X.FrictionY(0.6);
nodal_support_5.Nonlinear.Y.FrictionX(0.2);
nodal_support_5.Nonlinear.Z.FrictionX(0.5);

var nodal_support_6 = new NodalSupport();
nodal_support_6.Hinged();
nodal_support_6.TranslationZ(500);
nodal_support_6.RotationZ(440);

nodal_support_6.Nonlinear.X.FrictionZ(0.1);
nodal_support_6.Nonlinear.Y.FrictionZ(0.2);
nodal_support_6.Nonlinear.Z.FrictionY(0.6);

var nodal_support_7 = new NodalSupport(undefined, 6, "rollerY", { spring_x_nonlinearity: nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE });
nodal_support_7.Nonlinear.X.FrictionYZ(0.6);
nodal_support_7.Nonlinear.Y.FrictionXZ(0.5);
nodal_support_7.Nonlinear.Z.FrictionXY(0.7);
var nodal_support_8 = new NodalSupport();
//function to assign nodes
nodal_support_8.SetNodes([3, 8]);
nodal_support_8.Nonlinear.X.FrictionYplusZ(0.6, 0.15);
nodal_support_8.Nonlinear.Y.FrictionXplusZ(0.5, 0.25);
nodal_support_8.Nonlinear.Z.FrictionXplusY(0.7, 0.35);

var nodal_support_9 = new NodalSupport();
// nodes assigned directly to support included in nodal support object
nodal_support_9.support.nodes = [3, 52, 69];
nodal_support_9.Translation(true, false, 1200);
nodal_support_9.Rotation(false, 2300, true);
nodal_support_9.Nonlinear.X.FailIfNegative();
nodal_support_9.Nonlinear.Y.FailIfPositive();
nodal_support_9.Nonlinear.Z.FrictionY(0.2);
nodal_support_9.Nonlinear.Rx.FailIfNegative();
nodal_support_9.Nonlinear.Ry.FailIfPositive();
nodal_support_9.Nonlinear.Rz.FailAllIfPositive();
nodal_support_9.SetComment("NonlinearSupport");

// Change support stored in NodalSupport object
nodal_support_9.SetNo(2);
nodal_support_9.SetComment("Nodal support no.2 is changed");
nodal_support_9.SetNodes([3, 4, 5]);

var nodal_support_10 = new NodalSupport(undefined, [23, 18]);
nodal_support_10.Fixed();

var nodal_support_11 = new NodalSupport(fdde);
nodal_support_11.support.nodes = [3, 4];
nodal_support_11.Translation(true, true, true);
nodal_support_11.Translation(350, true, true);
nodal_support_11.TranslationX(300);
nodal_support_11.Rotation(true, true, true);
nodal_support_11.Nonlinear.X.FailAllIfNegative();
nodal_support_11.Nonlinear.Y.FrictionX(0.2);
nodal_support_11.Nonlinear.Z.FrictionXY(0.3);
nodal_support_11.Nonlinear.Rz.FailAllIfNegative();

var nodal_support_12 = new NodalSupport(undefined, [15]);
nodal_support_12.SetNodes = [6];
nodal_support_12.TranslationX(300);
nodal_support_12.Nonlinear.X.FrictionYplusZ(0.35, 0.55);
//   ################# Line supports

if (RFEM) {
	//   ##### Constructors:
	// Empty
	var line_support_1 = new LineSupport();
	lines[4].support = line_support_1.GetNo();
	// Nodes
	var line_support_2 = new LineSupport(undefined, [1, 6]);
	// Nodes, Id
	var line_support_3 = new LineSupport(5, [2, 3]);
	// Nodes, Id, comment
	var line_support_4 = new LineSupport(6, [11, 12, 19], "Line Support 6");

	//  ##### editors:
	line_support_4.Fixed();

	var line_support_5 = new LineSupport(undefined, [20, 21], "fixed");
	line_support_5.Fixed();
	line_support_5.TranslationY(700);
	line_support_5.Nonlinear.X.FrictionY(0.6);

	//  ##### create new support
	var line_support_6 = new LineSupport();
	line_support_6.Fixed();
	line_support_6.SetLines([31, 33, 35]);
	line_support_6.TranslationZ(500);
	line_support_6.RotationZ(440);

	var line_support_7 = new LineSupport();
	line_support_7.Hinged();
	line_support_7.Nonlinear.X.FrictionY(0.6);

	var line_support_8 = new LineSupport();
	line_support_8.SlidingX();
	line_support_8.Nonlinear.Y.FrictionX(0.6);

	var line_support_9 = new LineSupport();
	line_support_9.SlidingY();
	line_support_9.Nonlinear.Z.FrictionY(0.6);

	var line_support_10 = new LineSupport();
	line_support_10.SlidingZ();
	line_support_10.Nonlinear.X.FrictionY(0.6);

	var line_support_11 = new LineSupport();
	line_support_11.SlidingXY();
	line_support_11.Nonlinear.Z.FailAllIfNegative();
	var line_support_12 = new LineSupport(undefined, 6, "SlidingY", { spring_x_nonlinearity: line_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE });
	line_support_12.SlidingY();
	line_support_12.Nonlinear.X.FrictionY(0.6);
	// line supports
	var line_support_13 = new LineSupport();
	line_support_13.support.lines = [1, 2];
	line_support_13.Translation(true, false, 1200);
	line_support_13.Rotation(false, 2300, true);
	line_support_13.Nonlinear.X.FailIfNegative();
	line_support_13.Nonlinear.Y.FailIfPositive();
	line_support_13.Nonlinear.Z.FrictionY(0.2);
	line_support_13.Nonlinear.Rx.FailIfNegative();
	line_support_13.Nonlinear.Ry.FailIfPositive();
	line_support_13.Nonlinear.Rz.FailAllIfPositive();
	line_support_13.SetComment("Line support edited..");
};
// member supports
var member_support_1 = new MemberSupport();
member_support_1.support.members = [1];
member_support_1.Shear(true, false, 1200);
member_support_1.Rotation(false);
var member_support_2 = new MemberSupport();
member_support_2.support.members = [3];
member_support_2.Translation(true, true, true);
member_support_2.Shear(true, true, true);
var member_support_3 = new MemberSupport();
member_support_3.SetMembers([4, 7]);
member_support_3.Fixed();
var member_support_4 = new MemberSupport();
member_support_4.SlidingXY();

var member_support_5 = new MemberSupport();
member_support_5.SlidingX();
member_support_5.TranslationX(300);
member_support_5.TranslationY(400);
member_support_5.TranslationZ(500);
member_support_5.ShearX(300);
member_support_5.ShearY(400);
member_support_5.ShearZ(500);
member_support_5.Rotation(790);

// member nonlinearities are only in Z direction
member_support_5.Nonlinear.FailIfPositive();

var member_support_6 = new MemberSupport(undefined, 5, "sliding");
member_support_6.SlidingXY();
member_support_6.Rotation(790);
member_support_6.Nonlinear.FailIfNegative();

var member_support_7 = new MemberSupport();
member_support_7.SlidingY();
member_support_7.Rotation(790);
member_support_7.Nonlinear.FailIfPositive();

var member_support_8 = new MemberSupport();
member_support_8.SlidingZ();
member_support_8.Rotation(790);
member_support_8.Nonlinear.FailIfNegative();

var member_support_9 = new MemberSupport();
member_support_9.Fixed();
member_support_9.Rotation(650);
member_support_9.Nonlinear.FailIfPositive();
if (RFEM) {
	var surface_support_1 = new SurfaceSupport();
	surface_support_1.SlidingX();
	surface_support_1.TranslationX(300);
	surface_support_1.TranslationY(400);
	surface_support_1.TranslationZ(500);
	surface_support_1.ShearX(300);
	surface_support_1.ShearY(400);
	surface_support_1.Nonlinear.FailIfPositive.Basic();

	var surface_support_2 = new SurfaceSupport(undefined, 5, "sliding");
	surface_support_2.SlidingXY();
	surface_support_2.ShearX(300);
	surface_support_2.ShearY(400);
	surface_support_2.Nonlinear.FailIfPositive.Basic();
	var surface_support_3 = new SurfaceSupport();
	surface_support_3.SlidingY();
	surface_support_3.ShearX(false);
	surface_support_3.ShearX(true);
	surface_support_3.ShearX(300);
	surface_support_3.ShearY(true);
	surface_support_3.ShearY(false);
	surface_support_3.ShearY(400);
	surface_support_3.Nonlinear.FailIfPositive.Friction(0.8);

	var surface_support_4 = new SurfaceSupport();
	surface_support_4.SlidingZ();
	surface_support_4.ShearX(300);
	surface_support_4.ShearY(400);
	surface_support_4.Nonlinear.FailIfPositive.Stress(300);

	var surface_support_5 = new SurfaceSupport();
	surface_support_5.Fixed();
	surface_support_5.ShearX(300);
	surface_support_5.ShearY(400);
	surface_support_5.Nonlinear.FailIfNegative.Basic();
	var surface_support_6 = new SurfaceSupport();
	surface_support_6.Fixed();
	surface_support_6.ShearX(300);
	surface_support_6.ShearY(400);
	surface_support_6.Nonlinear.FailIfNegative.Friction(0.5);

	var surface_support_7 = new SurfaceSupport();
	surface_support_7.Fixed();
	surface_support_7.ShearX(300);
	surface_support_7.ShearY(400);
	// surface_support_7.Nonlinear.FailIfNegative.Stress(0.7);
};

