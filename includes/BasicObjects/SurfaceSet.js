function SurfaceSet(no,
                    surfaces,
                    surface_set_type,
                    comment,
                    params)
{
    if (typeof (surfaces) !== "undefined") 
    {
        surfaces = typeof surfaces !== 'undefined' ? surfaces : [];

        this.surface_set = engine.create_surface_set(no,  surfaces);

        if (surface_set_type == "")
        {
            this.surface_set.set_type = surface_sets.SET_TYPE_GROUP;
        }
        else
        {
            this.surface_set.set_type = surface_set_type;
        }
        set_comment_and_parameters(this.surface_set, comment, params);
        return this.surface_set;
    }
}


SurfaceSet.prototype.ContinuousSurfaces = function (no,
                                                    surfaces,
                                                    comment,
                                                    params)
{
    surfaces = typeof surfaces !== 'undefined' ? surfaces : [];
    this.surface_set = engine.create_surface_set(no,  surfaces);
    this.surface_set.set_type = surface_sets.SET_TYPE_CONTINUOUS;
    set_comment_and_parameters(this.surface_set, comment, params);    
}


SurfaceSet.prototype.GroupOfSurfaces = function (no,
                                                 surfaces,
                                                 comment,
                                                 params)
{
    surfaces = typeof surfaces !== 'undefined' ? surfaces : [];
    this.surface_set = engine.create_surface_set(no,  surfaces);
    this.surface_set.set_type = surface_sets.SET_TYPE_GROUP;
    set_comment_and_parameters(this.surface_set, comment, params);    
}
