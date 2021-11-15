function Surface(no,
                 boundary_lines,
                 thickness,
                 comment,
                 params)
{
    if (typeof (boundary_lines) !== "undefined") 
    {
        boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
        this.surface = engine.create_surface(no, boundary_lines);
        if (thickness !== 'undefined')
        {
            this.surface.thickness = thickness;
        }
        set_comment_and_parameters(this.surface, comment, params);
        return this.surface;
    }
}


Surface.prototype.Standard = function (no,
                                       geometry_type,
                                       geometry_type_parameters,
                                       boundary_lines,
                                       thickness,
                                       comment,
                                       params)
{
    geometry_type_parameters = typeof geometry_type_parameters !== 'undefined' ? geometry_type_parameters : [];
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    this.surface = engine.create_surface(no, boundary_lines);
    this.surface.type = surfaces.TYPE_STANDARD;
    this.surface.geometry = geometry_type;
    if (thickness !== 'undefined')
    {
        this.surface.thickness = thickness;
    }
    set_comment_and_parameters(this.surface, comment, params);
}


Surface.prototype.WithoutThickness = function (no,
                                               geometry_type,
                                               geometry_type_parameters,
                                               boundary_lines,
                                               comment,
                                               params)
{
    geometry_type_parameters = typeof geometry_type_parameters !== 'undefined' ? geometry_type_parameters : [];
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    this.surface = engine.create_surface(no, boundary_lines);
    this.surface.type = surfaces.TYPE_WITHOUT_THICKNESS;
    this.surface.geometry = geometry_type;
    set_comment_and_parameters(this.surface, comment, params);
}

Surface.prototype.Rigid = function (no,
                                    geometry_type,
                                    geometry_type_parameters,
                                    boundary_lines,
                                    comment,
                                    params)
{
    geometry_type_parameters = typeof geometry_type_parameters !== 'undefined' ? geometry_type_parameters : [];
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    this.surface = engine.create_surface(no, boundary_lines);
    this.surface.type = surfaces.TYPE_RIGID;
    this.surface.geometry = geometry_type;
    set_comment_and_parameters(this.surface, comment, params);
}



Surface.prototype.Membrane = function (no,
                                       geometry_type,
                                       geometry_type_parameters,
                                       boundary_lines,
                                       thickness,
                                       comment,
                                       params)
{
    geometry_type_parameters = typeof geometry_type_parameters !== 'undefined' ? geometry_type_parameters : [];
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    this.surface = engine.create_surface(no, boundary_lines);
    this.surface.type = surfaces.TYPE_MEMBRANE;
    this.surface.geometry = geometry_type;
    if (thickness !== 'undefined')
    {
        this.surface.thickness = thickness;
    }
    set_comment_and_parameters(this.surface, comment, params);
}


Surface.prototype.WithoutMemberaneTension = function (no,
                                                      geometry_type,
                                                      geometry_type_parameters,
                                                      boundary_lines,
                                                      thickness,
                                                      comment,
                                                      params)
{
    geometry_type_parameters = typeof geometry_type_parameters !== 'undefined' ? geometry_type_parameters : [];
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    this.surface = engine.create_surface(no, boundary_lines);
    this.surface.type = surfaces.TYPE_WITHOUT_MEMBRANE_TENSION;
    this.surface.geometry = geometry_type;
    if (thickness !== 'undefined')
    {
        this.surface.thickness = thickness;
    }
    set_comment_and_parameters(this.surface, comment, params);
}


Surface.prototype.LoadDistribution = function (no,
                                               boundary_lines,
                                               load_transfer_direction,
                                               comment,
                                               params)
{
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    this.surface = engine.create_surface(no, boundary_lines);
    this.surface.type = surfaces.TYPE_LOAD_TRANSFER;
    this.surface.load_transfer_direction = load_transfer_direction;
    set_comment_and_parameters(this.surface, comment, params);
}


