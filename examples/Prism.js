if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

if (n === undefined) {
	n = 6;        // Number of edges
	r_1 = 4;      // Radius of Bottom polygon
	r_2 = 2;      // Radius of top polygon
	H = 4;        // Height
	rotation = 0; // Rotation degree
};

ASSERT(n > 2, "Number of edges should be more than 2");

// Create material 
var material = Material(1, 'LC50/55');

// Create Lines
var l = new Line();
l.nPolygon(1, [0, 0, 0], n, r_1, "XY", 0, "false");
l.nPolygon(2, [0, 0, -H], n, r_2, "XY", rotation * PI / 180, "false");
for (var i = 0; i < n; ++i) {
    Line(2 * n + 1 + i, [i + 1, n + 1 + i]);
}

// Create surface
var surf = new Surface();
var surf_list = [];
for (var i = 0; i < n - 1; ++i) {
    surf.WithoutThickness(i + 1, surfaces.GEOMETRY_QUADRANGLE, "", [i + 1, 2 * n + 1 + i, n + 1 + i, 2 * n + 2 + i]);
    surf_list.push(i + 1);
}
surf.WithoutThickness(n, surfaces.GEOMETRY_QUADRANGLE, "", [n, 2 * n + 1, 2 * n, 3 * n]);
surf_list.push(n);

// Define bottom and top polygon boundaries
var bottomPolygon = [];
var topPolygon = [];
for (var i = 0; i < n; ++i) {
    bottomPolygon.push(i + 1);
    topPolygon.push(n + i + 1);
}

surf.WithoutThickness(n + 1, surfaces.GEOMETRY_PLANE, "", bottomPolygon);
surf_list.push(n + 1);
surf.WithoutThickness(n + 2, surfaces.GEOMETRY_PLANE, "", topPolygon);
surf_list.push(n + 2);

// Create Solid
var sol = new Solid();
sol.Standard(1, surf_list, 1);
