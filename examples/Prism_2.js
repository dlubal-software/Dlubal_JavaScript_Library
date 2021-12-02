// var n = 6;        // Number of edges
// var r = 4;        // Radius of Bottom polygon
// var H = 4;        // Heigth

ASSERT(n > 2, "Number of edges should be more than 2");

// Create material 
var material = Material(undefined, 'LC50/55');

// Create Lines
var l = new Line();
l.nPolygon(1, [0, 0, 0], n, r, "XY", 0, "false");
Node(n + 1, 0, 0, -H);
for (var i = 0; i < n; ++i)
{
    Line(n + 1 + i, [i + 1, n + 1])
}

// Create surfaces
var surf = new Surface();
var surf_list = [];
for (var i = 0; i < n - 1; ++i)
{
    surf.WithoutThickness(i + 1, surfaces.GEOMETRY_PLANE, "", [i + 1, n + 1 + i, n + 2 + i]);
    surf_list.push(i + 1);
}
surf.WithoutThickness(n, surfaces.GEOMETRY_PLANE, "", [n, n + 1, 2*n]);
surf_list.push(n);

var polygon_bounderies = [];     // Define polygon bounderies
for (var i = 0; i < n; ++i)
{
    polygon_bounderies.push(i + 1)
}
surf.WithoutThickness(n + 1, surfaces.GEOMETRY_PLANE, "", polygon_bounderies);
surf_list.push(n + 1);

// Create Solid
var sol = new Solid();
sol.Standard(1, surf_list, "", "", {"material": material})