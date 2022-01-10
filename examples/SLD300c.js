var r_0 = 1;
var r = 4;

// Create material 
var material = Material(undefined, 'LC50/55');

// Create Nodes
Node(1, r_0, 0, 0);
Node(2, -r_0, 0, 0);
Node(3, r, 0, -r + r_0);
Node(4, r, 0, -r - r_0);

// Create Line
var l = new Line();
l.Arc(1, [1, 2], [0, r_0, 0]);
l.Arc(2, [1, 2], [0, -r_0, 0]);
l.Arc(3, [3, 4], [r, -r_0, -r]);
l.Arc(4, [3, 4], [r, r_0, -r]);
l.Arc(5, [1, 3], [r - (r - r_0) * sin(PI / 4), 0, -(r - r_0) * sin(PI / 4)]);
l.Arc(6, [2, 4], [r - (r + r_0) * sin(PI / 4), 0, -(r + r_0) * sin(PI / 4)]);

// Create Surfaces
var surf = new Surface();
surf.WithoutThickness(1, surfaces.GEOMETRY_QUADRANGLE, "", [5, 1, 6, 4]);
surf.WithoutThickness(2, surfaces.GEOMETRY_QUADRANGLE, "", [5, 3, 6, 2]);
surf.WithoutThickness(3, surfaces.GEOMETRY_PLANE, "", [1, 2]);
surf.WithoutThickness(4, surfaces.GEOMETRY_PLANE, "", [3, 4]);

// Create Solid
var sol = new Solid();
sol.Standard(1, [1, 2, 3, 4], "", "", { "material": material });