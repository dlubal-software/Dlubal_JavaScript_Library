if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
// create material and section
var material = Material(undefined, 'LC50/55');

var no_n = nodes.lastId();
Node(no_n + 1, -a_1 / 2, b, 0);
Node(no_n + 2, a_1 / 2, b, 0);
Node(no_n + 3, -a_2 / 2, 0, 0);
Node(no_n + 4, a_2 / 2, 0, 0);

var l = new Line();
var no_l = lines.lastId();
l.Arc(no_l + 1, [no_n + 1, no_n + 2], [0, b, -a_1 / 2]);
l.Arc(no_l + 2, [no_n + 3, no_n + 4], [0, 0, -a_2 / 2]);
Line(no_l + 3, [no_n + 1, no_n + 3]);
Line(no_l + 4, [no_n + 2, no_n + 4]);

var th = new Thickness();
var no = thicknesses.lastId() + 1;
var thickness_1 = th.Uniform(no, "test_01", "", [thickness], "", { "material": material });
var s = new Surface();
var no_s = surfaces.lastId() + 1;
s.Standard(no_s, surfaces.GEOMETRY_QUADRANGLE, "", [no_l + 1, no_l + 2, no_l + 3, no_l + 4], no);
