if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
var a_1 = 2.2;
var a_2 = 4;
var b = 6;
var thickness = 0.01;

// create material and section
var material = Material(1, 'LC50/55');

Node(1, -a_1 / 2, b, 0);
Node(2, a_1 / 2, b, 0);
Node(3, -a_2 / 2, 0, 0);
Node(4, a_2 / 2, 0, 0);

var l = new Line();
l.Arc(1, [1, 2], [0, b, -a_1 / 2]);
l.Arc(2, [3, 4], [0, 0, -a_2 / 2]);
Line(3, [1, 3]);
Line(4, [2, 4]);

var no = thicknesses.lastId() + 1;
var th = new Thickness();
var thickness_1 = th.Uniform(no, "test_01", 1, [thickness]);
var s = new Surface();
s.Standard(1, surfaces.GEOMETRY_QUADRANGLE, "", [1, 2, 3, 4], no);
