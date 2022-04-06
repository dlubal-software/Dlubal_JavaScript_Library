if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
var r_1 = 2;
var r_2 = 1;
var a_1 = 5;
var a_2 = 4;
var H = 2;

// create material
var material = Material(1, 'LC50/55');

// Create Nodes
Node(1, -a_1 / 2, -r_1, 0);
Node(2, a_1 / 2, -r_1, 0);
Node(3, -a_1 / 2, r_1, 0);
Node(4, a_1 / 2, r_1, 0);
Node(5, -a_2 / 2, -r_2, -H);
Node(6, a_2 / 2, -r_2, -H);
Node(7, -a_2 / 2, r_2, -H);
Node(8, a_2 / 2, r_2, -H);

// Create Lines
Line(1, [1, 2]);
Line(2, [3, 4]);
Line(3, [5, 6]);
Line(4, [7, 8]);
Line(5, [2, 6]);
Line(6, [3, 7]);
Line(7, [1, 5]);
Line(8, [4, 8]);
var l = new Line();
l.Arc(9, [1, 3], [-r_1 - a_1 / 2, 0, 0]);
l.Arc(10, [2, 4], [r_1 + a_1 / 2, 0, 0]);
l.Arc(11, [5, 7], [-r_2 - a_2 / 2, 0, -H]);
l.Arc(12, [6, 8], [r_2 + a_2 / 2, 0, -H]);

// Create Surfaces
var surf = new Surface();
surf.WithoutThickness(1, surfaces.GEOMETRY_QUADRANGLE, "", [5, 10, 8, 12]);
surf.WithoutThickness(2, surfaces.GEOMETRY_QUADRANGLE, "", [6, 9, 7, 11]);
surf.WithoutThickness(3, surfaces.GEOMETRY_PLANE, "", [4, 8, 2, 6]);
surf.WithoutThickness(4, surfaces.GEOMETRY_PLANE, "", [1, 5, 3, 7]);
surf.WithoutThickness(5, surfaces.GEOMETRY_PLANE, "", [12, 4, 11, 3]);
surf.WithoutThickness(6, surfaces.GEOMETRY_PLANE, "", [10, 2, 9, 1]);

// Create Solid
var sol = new Solid();
sol.Standard(1, [1, 2, 3, 4, 5, 6], 1);