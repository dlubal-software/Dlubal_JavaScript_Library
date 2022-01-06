/**
 * Create Solid
 * @param {int} no - Number of Solid
 * @param {array} boundary_surfaces - List of boundary surfaces
 * @param {int} material - Number of material
 * @param {string} comment - Comment for the Solid
 * @param {dictionary} params - Parameters of the Solid
 * @returns 
 */
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
/**
 * Create Standard Solid
 * @param {int} no - Number of Solid
 * @param {array} boundary_surfaces - List of boundary surfaces
 * @param {int} material - Number of material
 * @param {string} comment - Comment for the Solid
 * @param {dictionary} params - Parameters of the Solid
 */
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
};

/**
 * Create Gas
 * @param {int} no - Number of Solid
 * @param {array} boundary_surfaces - List of boundary surfaces
 * @param {int} material - Number of material
 * @param {string} comment - Comment for the Solid
 * @param {dictionary} params - Parameters of the Solid
 */
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
};
/**
 * Create Contact solid
 * @param {int} no - Number of Solid
 * @param {array} boundary_surfaces - List of boundary surfaces
 * @param {int} material - Number of material
 * @param {int} first_contact_surface - Number of first contact surface
 * @param {string} comment - Comment for the Solid
 * @param {dictionary} params - Parameters of the Solid
 */
Solid.prototype.Contact = function (no,
                                    boundary_surfaces,
                                    material,
                                    first_contact_surface,
                                    comment,
                                    params)
{
        boundary_surfaces = typeof boundary_surfaces !== 'undefined' ? boundary_surfaces : [];
        first_contact_surface = typeof first_contact_surface !== 'undefined' ? first_contact_surface : 0;
   
        this.solid = engine.create_solid(no, boundary_surfaces);
        this.solid.type = solids.TYPE_CONTACT;
        this.solid.solid_contact_first_surface = first_contact_surface;
        // Set material
        if (material_no !== 'undefined')
        {
            this.solid.material = material;
        }
        set_comment_and_parameters(this.solid, comment, params);
};