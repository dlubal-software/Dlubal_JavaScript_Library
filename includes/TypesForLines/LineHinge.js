/**
* Creates line hinge
* @class
* @constructor
* @param	{Number}	no					Index of line hinge, can be undefined
* @param	{Number}	surface_no      	Surface index
* @param	{Array} 	lines_no        	List of lines indexes, can be undefined (all surface's boundary lines will be used)
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Line hinge parameters, can be undefined
* @return	{Object}	Created line hinge
*/
function LineHinge (no,
    surface_no,
    lines_no,
    comment,
    params) {
    if (arguments.length > 0) {
        return this.line_hinge = createLineHinge(no, surface_no, lines_no, comment, params);
    }
}

/**
 * Creates line hinge with specified translational spring constant
 * @param   {Number}	no					        Index of line hinge, can be undefined
 * @param	{Number}	surface_no      	        Surface index
 * @param	{Array} 	lines_no        	        List of lines indexes, can be undefined (all surface's boundary lines will be used)
 * @param   {Number}	translational_release_u_x	Translational spring constant Cu,x, can be undefined (0.0 by default)
 * @param   {Number}	translational_release_u_y 	Translational spring constant Cu,y, can be undefined (0.0 by default)
 * @param   {Number}	translational_release_u_z 	Translational spring constant Cu,z, can be undefined (0.0 by default)
 * @param	{String}	comment				        Comment, can be undefined
 * @param	{Object}	params				        Line hinge parameters, can be undefined
 */
LineHinge.prototype.Translational = function (no,
    surface_no,
    lines_no,
    translational_release_u_x,
	translational_release_u_y,
	translational_release_u_z,
    comment,
    params) {
    ASSERT(typeof surface_no !== "undefined", "Surface index must be specified");
    this.line_hinge = createLineHinge(no, surface_no, lines_no, comment, params);
    if (typeof translational_release_u_x !== "undefined") {
        this.line_hinge.translational_release_u_x = translational_release_u_x;
    }
    if (typeof translational_release_u_y !== "undefined") {
        this.line_hinge.translational_release_u_y = translational_release_u_y;
    }
    if (typeof translational_release_u_z !== "undefined") {
        this.line_hinge.translational_release_u_z = translational_release_u_z;
    }
}

/**
 * Creates line hinge with specified rotational spring constant
 * @param   {Number}	no				                Index of line hinge, can be undefined
 * @param	{Number}	surface_no                      Surface index
 * @param	{Array} 	lines_no                        List of lines indexes, can be undefined (all surface's boundary lines will be used)
 * @param   {Number}    rotational_release_phi_x        Rotational spring constant Cφ,x, can be undefined (0.00 by default)
 * @param   {Array}     force_moment_values             Force/moment diagram values [force1, max_moment1, min_moment1, note1, ... forcen, max_momentn, min_momentn, noten]
 * @param   {String}    force_moment_diagram_dependency Moment dependent on (n, vy, vz), can be undefined (dependens on "n" by default)
 * @param   {Boolean}   symetric                        Symetric, can be undefined (true by default)
 * @param	{String}	comment				            Comment, can be undefined
 * @param	{Object}	params				            Line hinge parameters, can be undefined
 */
LineHinge.prototype.Rotational = function (no,
    surface_no,
    lines_no,
    rotational_release_phi_x,
    force_moment_values,
    force_moment_diagram_dependency,
    symetric,
    comment,
    params) {
    ASSERT(typeof surface_no !== "undefined", "Surface index must be specified");
    this.line_hinge = createLineHinge(no, surface_no, lines_no, comment, params);
    if (typeof rotational_release_phi_x !== "undefined") {
        this.line_hinge.rotational_release_phi_x = rotational_release_phi_x;
    }
    if (typeof force_moment_values !== "undefined") {
        ASSERT(force_moment_values.length % 3 === 0, "Values must be specified as array like this: [force1, max_moment1, note1, ... forcen, max_momentn, noten]")
        this.line_hinge.rotational_release_phi_x_nonlinearity = line_hinges.NONLINEARITY_TYPE_FORCE_MOMENT_DIAGRAM;
        for (var i = 0; i < force_moment_values.length; i+=3) {
            this.line_hinge.force_moment_diagram_around_x_table[i / 3 + 1].force = force_moment_values[i];
            this.line_hinge.force_moment_diagram_around_x_table[i / 3 + 1].max_moment = force_moment_values[i + 1];
            this.line_hinge.force_moment_diagram_around_x_table[i / 3 + 1].note = force_moment_values[i + 2];
        }
    }
    if (typeof force_moment_diagram_dependency !== "undefined") {
        switch (force_moment_diagram_dependency)
        {
            case "n":
                this.line_hinge.force_moment_diagram_around_x_depends_on = line_hinges.FORCE_MOMENT_DIAGRAM_DEPENDS_ON_N;
                break;
            case "vy":
                this.line_hinge.force_moment_diagram_around_x_depends_on = line_hinges.FORCE_MOMENT_DIAGRAM_DEPENDS_ON_VY;
                break;
            case "vz":
                this.line_hinge.force_moment_diagram_around_x_depends_on = line_hinges.FORCE_MOMENT_DIAGRAM_DEPENDS_ON_VZ;
                break;
            default:
                ASSERT(false, "Unknown force moment diagram dependency");
        }
    }
    if (typeof symetric !== "undefined") {
        this.line_hinge.force_moment_diagram_around_x_symmetric = symetric;
    }
}

/**
 * Sets Slab-Wall connection
 * @param   {Boolean}   slab_wall_connection    Slab-Wall connection, can be undefined (true by default)
 * @param   {Number}    offset                  Slab-Wall connection offset
 * @param   {Number}    block_width             Width of slab-edge block, can be undefined (0.0 by default)
 */
LineHinge.prototype.SlabWallConnection = function(offset,
    block_width) {
    ASSERT(typeof offset !== "undefined", "Slab-Wall connection offset must be specified");
    this.line_hinge.slab_wall_connection = true;
    this.line_hinge.slab_wall_connection_offset = offset;
    if (typeof block_width !== "undefined") {
        ASSERT(block_width < offset, "Block width must be less then offest");
        this.line_hinge.slab_edge_block_width = block_width;
    }
}

/**
* Creates line hinge (private)
* @param	{Number}	no					Index of line hinge, can be undefined
* @param	{Number}	surface_no      	Surface index
* @param	{Array} 	lines_no        	List of lines indexes, can be undefined (all surface's boundary lines will be used)
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Line hinge parameters, can be undefined
* @return	{Object}	Created line hinge
*/
var createLineHinge = function (no,
    surface_no,
    lines_no,
    comment,
    params) {
    var line_hinge = engine.create_line_hinge(no);
    if (typeof surface_no !== "undefined") {
        if (surfaces.exist(surface_no)) {
            var surface = surfaces[surface_no];
            if (typeof lines_no === "undefined") {
                for (var i = 0; i < surface.boundary_lines.length; ++i) {
                    surface.line_hinges_table[i + 1].line_number = surface.boundary_lines[i];
                    surface.line_hinges_table[i + 1].line_hinge = line_hinge;
                }
            }
            else {
                for (var i = 0; i < lines_no.length; ++i) {
                    surface.line_hinges_table[i + 1].line_number = lines_no[i];
                    surface.line_hinges_table[i + 1].line_hinge = line_hinge;
                }
            }
        }
        else {
            console.log("Surface no. " + surface_no + " doesn't exist");
        }
    }
    set_comment_and_parameters(line_hinge, comment, params);
    return line_hinge;
}