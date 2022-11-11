if (!RFEM) {
	throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("../includes/tools/clearAll.js");
if (a_1 === undefined) {
	a_1 = 2.2;
	a_2 = 4;
	b = 6;
	thickness = 0.120;
}

// create material and section
var material = new Material(1, 'C50/60');

var no_n = nodes.lastId();
Node(no_n + 1, -a_1 / 2, b, 0);
Node(no_n + 2, a_1 / 2, b, 0);
Node(no_n + 3, -a_2 / 2, 0, 0);
Node(no_n + 4, a_2 / 2, 0, 0);

var l = new Line();
var no_l = 1;
l.Arc(no_l + 1, [no_n + 1, no_n + 2], [0, b, -a_1 / 2]);
l.Arc(no_l + 2, [no_n + 3, no_n + 4], [0, 0, -a_2 / 2]);
new Line(no_l + 3, [no_n + 1, no_n + 3]);
new Line(no_l + 4, [no_n + 2, no_n + 4]);

var thicknessSurface = new Thickness();
thicknessSurface.Uniform(1, "thickness", material.GetNo(), Number(thickness));
var surface = new Surface();
surface.Quadrangle(1, [no_l + 1, no_l + 2, no_l + 3, no_l + 4], "Standard", thicknessSurface.GetNo());

//load 
var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings();
SASSecondOrder.SecondOrder(2, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");
var lc1 = new LoadCase();
lc1.StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);

var lineSupport = new LineSupport(1,[2,3]);
lineSupport.Fixed();