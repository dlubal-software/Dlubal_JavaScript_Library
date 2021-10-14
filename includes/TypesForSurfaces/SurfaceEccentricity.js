function SurfaceEccentricity(no,
                             surface,
                             comment,
                             params)
{
    var surface_eccentricity = engine.create_surface_eccentricity(no);

    if (typeof surface !== 'undefined')
    {
        surface.eccentricity = surface_eccentricity;
    }

    set_comment_and_parameters(surface_eccentricity, comment, params);
    return surface_eccentricity;
}
