function SurfaceSet(no,
                    surfaces,
                    comment,
                    params)
{
    surfaces = typeof surfaces !== 'undefined' ? surfaces : [];

    var surface_set = engine.create_surface_set(no,  surfaces);
    set_comment_and_parameters(surface_set, comment, params);
    return surface_set;
}
