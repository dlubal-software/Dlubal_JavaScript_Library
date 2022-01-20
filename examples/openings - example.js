if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}


if (a === undefined) {
	a = 5;
	b = 4;
	H = 3;
	len = 2;
	w = 1.5;
	o_n = 6;
	o_r = 1;
	d_l = 1;
	d_h = 2.2;
	thickness_1 = 0.2   // wall
};

// Create material 
var material = Material(1, 'LC50/55');

// Create thickness
var th = new Thickness();
th.Uniform(1, "Wall", 1, [thickness_1]);

// Create nodes
Node(1, 0, 0, 0);
Node(2, a, 0, 0);
Node(3, a, b, 0);
Node(4, 0, b, 0);
Node(5, 0, 0, -H);
Node(6, a, 0, -H);
Node(7, a, b, -H);
Node(8, 0, b, -H);

// Create lines
Line(1, [1, 2]);
Line(2, [2, 3]);
Line(3, [3, 4]);
Line(4, [4, 1]);
for (var i = 1; i < 5; ++i) {
    Line(4 + i, [i, 4 + i]);
}
Line(9, [5, 6]);
Line(10, [6, 7]);
Line(11, [7, 8]);
Line(12, [8, 5]);

// Create walls
// Create Surfaces
var sur = new Surface();
sur.Standard(1, surfaces.GEOMETRY_PLANE, "", [1, 5, 9, 6], 1);
sur.Standard(2, surfaces.GEOMETRY_PLANE, "", [2, 6, 10, 7], 1);
sur.Standard(3, surfaces.GEOMETRY_PLANE, "", [3, 7, 11, 8], 1);
sur.Standard(4, surfaces.GEOMETRY_PLANE, "", [4, 8, 12, 5], 1);

// Openings
var l = new Line();
l.RectangularPolygon(13, [a / 2, 0, -H / 2], len, w, "XZ");
Opening(1, [13]);
l.nPolygon(14, [0, b / 2, -H / 2], o_n, o_r, "YZ");
Opening(2, [14]);
l.RectangularPolygon(15, [a / 2, b, -H / 2], len, w, "XZ");
Opening(3, [15]);
l.RectangularPolygon(16, [a, b / 2, -d_h / 2], d_l, d_h, "YZ");
Opening(4, [16]);