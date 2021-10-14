function Solid(no,
               boundary_surfaces,
               material,
               comment,
               params)
{
    boundary_surfaces = typeof boundary_surfaces !== 'undefined' ? boundary_surfaces : [];

    var solid = engine.create_solid(no, boundary_surfaces);

    // Set material
    if (material_no !== 'undefined')
    {
        solid.material = material;
    }

    set_comment_and_parameters(solid, comment, params);
    return solid;
}
