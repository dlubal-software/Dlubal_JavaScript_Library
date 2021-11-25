run("clearAll.js");


// prepare materials, sections and thickness for the model
var material_steel = Material(undefined, "S235 | EN 1993-1-1:2005-05")
var material_concrete = Material(undefined, "C12/15 | EN 1992-1-1:2004/A1:2014")

var section_params = { "shear_stiffness_deactivated": true }
var section_IPE240 = Section(undefined, "IPE 240", material_steel, "", section_params)
var section_IPE180 = Section(undefined, "IPE 180", material_steel, "", section_params)

var thickness = Thickness(undefined, "", material_concrete, 120mm)


for (var i = 0; i < 20; ++i) {
	Node("undefined", 0, 0, i);
	Node("undefined", 1, 0, i);
	Node("undefined", 1, 1, i);
	Node("undefined", 0, 1, i);
};

for (var i = 1; i < 80; ++i) {
	for (var j = 0; j < 3; ++j) {
		Line(undefined, [i+j,i+j+1])
	};
	Line(undefined, [i,i+j])
	i=i+3
};

for (var i = 1; i <= 80; ++i) {
	Surface(undefined, [i, i+1, i+2, i+3], thickness);
	i=i+3;

};




Line(undefined, "2,3")
Line(undefined, "6,7")
Line(undefined, "7,8")
Line(undefined, "8,9")
Line(undefined, "9,6")
Line(undefined, "4,10")
Line(undefined, "1,2")

Member(undefined, "12,3", "", { "section_start": section_IPE240})
Member(undefined, "4,12", "", { "section_start": section_IPE240})
Member(undefined, "12,16", "", {"section_start": section_IPE180})


//   ################# Nodal supports
//   ##### Constructors:
// Empty
var n1 = new NodalSupport();
// Nodes
var n1 = new NodalSupport([1,6]);
// Nodes, Id
var n1 = new NodalSupport([2,3], 5);
// Nodes, Id, comment
var n1 = new NodalSupport([11,12,19], undefined, "komentář");

//  ##### editors:
n1.fixed();
n1.create.fixed([20,21], undefined, "fixed");
n1.translation_y(700);
n1.nonlinear.x.frictionY(0.6);
n1.create.hinged();
n1.hinged([22,27]);

//  ##### create new support
n1.create.fixed([31,33,35]);
n1.translation_z(500);
n1.rotation_z(440);
n1.create.hinged([38]);
n1.nonlinear.x.frictionY(0.6);
n1.create.rollerX([39]);
n1.nonlinear.x.frictionY(0.6);
n1.create.rollerY();
n1.nonlinear.x.frictionY(0.6);
n1.create.rollerZ();
n1.nonlinear.x.frictionY(0.6);
n1.create.roller([40]);
n1.nonlinear.x.frictionY(0.6);
n1.create.free([41]);
n1.nonlinear.x.frictionY(0.6);
n1.create.rollerY(6,undefined,"rollerY", {spring_x_nonlinearity : line_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE});
n1.nonlinear.x.frictionY(0.6);


var n1 = new NodalSupport();
//function to assign nodes
n1.nodes([3,8]);
// nodes assigned dirrectly to support included in nodal support object
n1.support.nodes = [3,52,69];
n1.translation(true, false, 1200);
n1.rotation(false, 2300, true);
n1.nonlinear.x.failIfNegative();
n1.nonlinear.y.failIfPositive();
n1.nonlinear.z.frictionY(0.2);
n1.nonlinear.rx.failIfNegative();
n1.nonlinear.ry.failIfPositive();
n1.nonlinear.rz.failAllIfPositive();
n1.comment("ddhskssk");
n1.nodes([3,4,5]);
n1.create.fixed([55,66], 20, "fixed support no.: 20");
n1.setNo(2);
n1.nodes([7]);
n1.comment("fixed");
n1.create.hinged();

var n2 = new NodalSupport([23,18]);
n2.fixed()

var n3 = new NodalSupport(fdde);
var n_fixed1 = new NodalSupport();
n_fixed1.support.nodes = [3,4];
n_fixed1.translation(true, true, true);
n_fixed1.translation(350, true, true);
n_fixed1.translation_x(300);
n_fixed1.rotation(true, true, true);
n_fixed1.nonlinear.x.failAllIfNegative();
n_fixed1.nonlinear.y.frictionX(0.2);
n_fixed1.nonlinear.z.frictionXY(0.3);
n_fixed1.nonlinear.rz.failAllIfNegative();

var n_fixed2 = new NodalSupport([15]);
n_fixed2.support.nodes = [6];
n_fixed2.translation_x(300);
n_fixed2.nonlinear.x.frictionYplusZ(0.35,0.55);


//   ################# Line supports
//   ##### Constructors:
// Empty
var n1 = new LineSupport();
// Nodes
var n1 = new LineSupport([1,6]);
// Nodes, Id
var n1 = new LineSupport([2,3], 5);
// Nodes, Id, comment
var n1 = new LineSupport([11,12,19], undefined, "komentář");

//  ##### editors:
n1.fixed();
n1.create.fixed([20,21], undefined, "fixed");
n1.translation_y(700);
n1.nonlinear.x.frictionY(0.6);
n1.create.hinged();
n1.hinged([22,27]);

//  ##### create new support
n1.create.fixed([31,33,35]);
n1.translation_z(500);
n1.rotation_z(440);
n1.create.hinged([38]);
n1.nonlinear.x.frictionY(0.6);
n1.create.slidingX([39]);
n1.nonlinear.x.frictionY(0.6);
n1.create.slidingY();
n1.nonlinear.x.frictionY(0.6);
n1.create.slidingZ();
n1.nonlinear.x.frictionY(0.6);
n1.create.slidingXY([40]);
n1.nonlinear.x.frictionY(0.6);
n1.create.free([41]);
n1.nonlinear.x.frictionY(0.6);
n1.create.slidingY(6,undefined,"slidingY", {spring_x_nonlinearity : line_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE});
n1.nonlinear.x.frictionY(0.6);
// line supports
var l_ns1 = new LineSupport();
l_ns1.support.lines = [1,2];
l_ns1.translation(true, false, 1200);
l_ns1.rotation(false, 2300, true);
l_ns1.nonlinear.x.failIfNegative();
l_ns1.nonlinear.y.failIfPositive();
l_ns1.nonlinear.z.frictionY(0.2);
l_ns1.nonlinear.rx.failIfNegative();
l_ns1.nonlinear.ry.failIfPositive();
l_ns1.nonlinear.rz.failAllIfPositive();
l_ns1.comment("liniová podpora 1");
l_ns1.create.fixed();
l_ns1.create.hinged();

var l_fixed1 = new LineSupport();
l_fixed1.support.lines = [3,4];
l_fixed1.translation(true, true, true);
l_fixed1.rotation(true, true, true);
l_fixed1.nonlinear.x.failAllIfNegative();
l_fixed1.nonlinear.y.frictionX(0.2);
l_fixed1.nonlinear.z.frictionY(0.3);
l_fixed1.nonlinear.rz.failAllIfNegative();
l_fixed1.LCS();

var l_fixed2 = new LineSupport();
l_fixed2.support.lines = [5];
//l_fixed2.fixed();
l_fixed2.nonlinear.x.frictionY(0.35);
//l_ns1.comment("liniová podpora 3");

var l_hinged = new LineSupport();
l_hinged.hinged();
l_hinged.nonlinear.y.frictionZ(0.2);
l_hinged.create.fixed();
l_hinged.create.hinged();

l_hinged.create.slidingXY(4,26,"slidingXY");
l_hinged.create.slidingX(5);
l_hinged.create.slidingY(6,undefined,"slidingY", {spring_x_nonlinearity : line_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE});

// member supports
var m_ns1 = new MemberSupport();
m_ns1.support.members = [1];
m_ns1.shear(true, false, 1200);
m_ns1.rotation(false);


var m_fixed1 = new MemberSupport();
m_fixed1.support.members = [3];
m_fixed1.translation(true, true, true);
m_fixed1.shear(true, true, true);



var m_fixed2 = new MemberSupport();
m_fixed2.support.members = [2];
m_fixed2.fixed();


var m_hinged = new MemberSupport();
m_hinged.slidingXY();

var mm = new MemberSupport();
mm.create.slidingX(1);
mm.translation_x(300);
mm.translation_y(400);
mm.translation_z(500);
mm.shear_x(300);
mm.shear_y(400);
mm.shear_z(500);
mm.rotation(790);
mm.nonlinear.z.failIfPositive();
mm.create.slidingXY(5,undefined, "sliding");
mm.rotation(790);
mm.nonlinear.z.failIfPositive();
mm.create.slidingY(9);
mm.rotation(790);
mm.nonlinear.z.failIfPositive();
mm.create.slidingZ([2,3]);
mm.rotation(790);
mm.nonlinear.z.failIfPositive();
mm.create.fixed(8);
mm.rotation(790);
mm.nonlinear.z.failIfPositive();
mm.create.free(10);
mm.translation_y(400);
mm.nonlinear.z.failIfNegative();


var ss = new SurfaceSupport();
ss.create.slidingX(1);
ss.translation_x(300);
ss.translation_y(400);
ss.translation_z(500);
ss.shear_x(300);
ss.shear_y(400);
ss.nonlinear.failIfPositive.basic();
ss.create.slidingXY(5,undefined, "sliding");
ss.shear_x(300);
ss.shear_y(400);
ss.nonlinear.failIfPositive.basic();
ss.create.slidingY(9);
ss.shear_x(300);
ss.shear_y(400);
ss.nonlinear.failIfPositive.friction(0.8);
ss.create.slidingZ([2,3]);
ss.shear_x(300);
ss.shear_y(400);
ss.nonlinear.failIfPositive.stress(300);
ss.create.fixed(8);
ss.shear_x(300);
ss.shear_y(400);
ss.nonlinear.failIfNegative.basic();
ss.create.fixed(10);
ss.shear_x(300);
ss.shear_y(400);
ss.nonlinear.failIfNegative.friction(0);
ss.create.fixed(11);
ss.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;


