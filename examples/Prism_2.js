// var n = 6;        // Number of edges
// var r = 4;        // Radius of Bottom polygon
// var H = 4;        // Height

ASSERT(n > 2, "Number of edges should be more than 2");

// Create material 
var material = Material(1, 'LC50/55');

// Create Lines
var l = new Line();
l.nPolygon(1, [0, 0, 0], n, r, "XY", 0, "false");
Node(n + 1, 0, 0, -H);
for (var i = 0; i < n; ++i)
{
    Line(n + 1 + i, [i + 1, n + 1]);
};

// Create surfaces
var surf = new Surface();
var surfacesList = [];
for (var i = 0; i < n - 1; ++i)
{
    surf.WithoutThickness(i + 1, surfaces.GEOMETRY_PLANE, "", [i + 1, n + 1 + i, n + 2 + i]);
    surfacesList.push(i + 1);
};
surf.WithoutThickness(n, surfaces.GEOMETRY_PLANE, "", [n, n + 1, 2*n]);
surfacesList.push(n);

var polygonBoundaries = [];     // Define polygon boundaries
for (var i = 0; i < n; ++i)
{
    polygonBoundaries.push(i + 1)
};
surf.WithoutThickness(n + 1, surfaces.GEOMETRY_PLANE, "", polygonBoundaries);
surfacesList.push(n + 1);

// Create Solid
var sol = new Solid();
sol.Standard(1, surfacesList, 1);
