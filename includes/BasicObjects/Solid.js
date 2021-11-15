function Solid(no,
               boundary_surfaces,
               material,
               comment,
               params)
{
    if (typeof (boundary_surfaces) !== "undefined") 
    {
        boundary_surfaces = typeof boundary_surfaces !== 'undefined' ? boundary_surfaces : [];

        this.solid = engine.create_solid(no, boundary_surfaces);

        // Set material
        if (material_no !== 'undefined')
        {
            this.solid.material = material;
        }

        set_comment_and_parameters(this.solid, comment, params);
        return this.solid;
    }
}

Solid.prototype.Standard = function (no,
                                     boundary_surfaces,
                                     material,
                                     comment,
                                     params)
{
        boundary_surfaces = typeof boundary_surfaces !== 'undefined' ? boundary_surfaces : [];

        this.solid = engine.create_solid(no, boundary_surfaces);
        this.solid.type = solids.TYPE_STANDARD;
        // Set material
        if (material_no !== 'undefined')
        {
            this.solid.material = material;
        }
        set_comment_and_parameters(this.solid, comment, params);
}

Solid.prototype.Gas = function (no,
                                boundary_surfaces,
                                material,
                                comment,
                                params)
{
        boundary_surfaces = typeof boundary_surfaces !== 'undefined' ? boundary_surfaces : [];

        this.solid = engine.create_solid(no, boundary_surfaces);
        this.solid.type = solids.TYPE_GAS;
        // Set material
        if (material_no !== 'undefined')
        {
            this.solid.material = material;
        }
        set_comment_and_parameters(this.solid, comment, params);
}

Solid.prototype.Contact = function (no,
                                    boundary_surfaces,
                                    material,
                                    first_contact_srface,
                                    comment,
                                    params)
{
        boundary_surfaces = typeof boundary_surfaces !== 'undefined' ? boundary_surfaces : [];
        first_contact_srface = typeof first_contact_srface !== 'undefined' ? first_contact_srface : 0;
   
        this.solid = engine.create_solid(no, boundary_surfaces);
        this.solid.type = solids.TYPE_CONTACT;
        this.solid.solid_contact_first_surface = first_contact_srface;
        // Set material
        if (material_no !== 'undefined')
        {
            this.solid.material = material;
        }
        set_comment_and_parameters(this.solid, comment, params);
}