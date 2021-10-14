function Surface(no,
                 boundary_lines,
                 thickness,
                 comment,
                 params)
{
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];

    var surface = engine.create_surface(no, boundary_lines);

    if (thickness !== 'undefined')
    {
        surface.thickness = thickness;
    }

    set_comment_and_parameters(surface, comment, params);
    return surface;
}
