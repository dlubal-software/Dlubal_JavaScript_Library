if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

/**
 * Creates surface
 * @class
 * @constructor
 * @param	{Number}	no				Index of surface, can be undefined
 * @param	{Array}		boundary_lines	List of boundary lines indexes
 * @param	{Number}	thickness		Thickness index, can be undefined
 * @param	{String}	comment			Comment, can be undefined
 * @param	{Object}	params  		Surface's parameters, can be undefined
 * @returns	Created surface
 */
function Surface (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	if (arguments.length !== 0) {
		return this.surface = createBaseSurface(no, boundary_lines, undefined, thickness, comment, params);
	}
};

/**
* Creates standard surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.Standard = function (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	return this.surface = createBaseSurface(no, boundary_lines, surfaces.TYPE_STANDARD, thickness, comment, params);
};

/**
* Creates without thickness surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.WithoutThickness = function (no,
	boundary_lines,
	comment,
	params) {
	return this.surface = createBaseSurface(no, boundary_lines, surfaces.TYPE_WITHOUT_THICKNESS, undefined, comment, params);
};

/**
* Creates rigid surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.Rigid = function (no,
	boundary_lines,
	comment,
	params) {
	return this.surface = createBaseSurface(no, boundary_lines, surfaces.TYPE_RIGID, undefined, comment, params);
};

/**
* Creates membrane surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.Membrane = function (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	return this.surface = createBaseSurface(no, boundary_lines, surfaces.TYPE_MEMBRANE, thickness, comment, params);
};

/**
* Creates without membrane tension surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.WithoutMembraneTension = function (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	return this.surface = createBaseSurface(no, boundary_lines, surfaces.TYPE_WITHOUT_MEMBRANE_TENSION, thickness, comment, params);
};

/**
* Creates load transfer surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.LoadTransfer = function (no,
	boundary_lines,
	comment,
	params) {
	return this.surface = createBaseSurface(no, boundary_lines, surfaces.TYPE_LOAD_TRANSFER, undefined, comment, params);
};

/**
* Sets plane geometry type of surface
*/
Surface.prototype.Plane = function () {
	this.surface.geometry = surfaces.GEOMETRY_PLANE;
};

/**
* Sets quadrangle geometry type of surface
* @param {Number}	corner_node_1	Quadrangle corner 1, can be undefined
* @param {Number}	corner_node_2	Quadrangle corner 2, can be undefined
* @param {Number}	corner_node_3	Quadrangle corner 3, can be undefined
* @param {Number}	corner_node_4	Quadrangle corner 4, can be undefined
*/
Surface.prototype.Quadrangle = function (corner_node_1,
	corner_node_2,
	corner_node_3,
	corner_node_4) {
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type acnnot be used for this type of surface");
	this.surface.geometry = surfaces.GEOMETRY_QUADRANGLE;
	if (typeof corner_node_1 !== "undefined") {
		this.surface.quadrangle_corner_node_1 = corner_node_1;
	}
	if (typeof corner_node_2 !== "undefined") {
		this.surface.quadrangle_corner_node_2 = corner_node_2;
	}
	if (typeof corner_node_3 !== "undefined") {
		this.surface.quadrangle_corner_node_3 = corner_node_3;
	}
	if (typeof corner_node_4 !== "undefined") {
		this.surface.quadrangle_corner_node_4 = corner_node_4;
	}
};

/**
* Sets NURBS geometry type of surface
*/
Surface.prototype.NURBS = function () {
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type acnnot be used for this type of surface");
	this.surface.geometry = surfaces.GEOMETRY_NURBS;
};

/**
* Sets rotated geometry type of surface
* @param	{Number}	boundary_line		Index of boundary line
* @param	{Number}	angle_of_rotation	Angle of rotation, can be undefined
* @param	{Array}		rotation_axis_p		Rotation axis, point P ([X, Y, Z]). Can be undefined.
* @param	{Array}		rotation_axis_r		Rotation axis, point R ([X, Y, Z]). Can be undefined.
*/
Surface.prototype.Rotated = function (boundary_line,
	angle_of_rotation,
	rotation_axis_p,
	rotation_axis_r) {
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type acnnot be used for this type of surface");
	ASSERT(typeof boundary_line !== "undefined", "Boundary line must be specified");
	this.surface.rotated_boundary_line = boundary_line;
	if (typeof angle_of_rotation !== "undefined") {
		this.surface.rotated_angle_of_rotation = angle_of_rotation;
	}
	if (typeof rotation_axis_p !== "undefined") {
		ASSERT(rotation_axis_p.length === 3, "Three values are required [X, Y, Z]");
		surface.rotated_point_p_x = rotation_axis_p[0];
		surface.rotated_point_p_y = rotation_axis_p[1];
		surface.rotated_point_p_z = rotation_axis_p[2];
	}
	if (typeof rotation_axis_r !== "undefined") {
		ASSERT(rotation_axis_r.length === 3, "Three values are required [X, Y, Z]");
		surface.rotated_point_r_x = rotation_axis_r[0];
		surface.rotated_point_r_y = rotation_axis_r[1];
		surface.rotated_point_r_z = rotation_axis_r[2];
	}
};

/**
* Sets pipe geometry type of surface
* @param	{Number}	center_line		Index of center lineHeight
* @param	{Number}	radius			Radius
*/
Surface.prototype.Pipe = function (center_line,
	radius) {
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type acnnot be used for this type of surface");
	ASSERT(typeof center_line !== "undefined", "Center line must be specified");
	this.surface.pipe_center_line = center_line;
	if (typeof radius !== "undefined") {
		this.surface.pipe_radius = radius;
	}
};

/**
* Sets surface hinges
* @param	{Array}		hinges_values	Linge hinges values ([[line_no1, line_hinge_no1] ... [line_non, line_hinge_non]])
*/
Surface.prototype.Hinges = function (hinges_values) {
	ASSERT(typeof hinges_values.length !== "undefined", "At least one hinge must be specified");
	for (var i = 0; i < hinges_values.length; ++i) {
		var hinge_values = hinges_values[i];
		ASSERT(hinge_values.length === 2, "Two values are required [[line_no1, line_hinge_no1] ... [line_non, line_hinge_non]]");
		var row = this.surface.line_hinges_table.row_count();
		this.surface.line_hinges_table[row].line_number = hinge_values[0];
		this.surface.line_hinges_table[row].line_hinge = hinge_values[1];
	}
};

/**
* Sets surface support
* @param	{Number}	support		Index of surface support
*/
Surface.prototype.Support = function (support) {
	ASSERT(typeof support !== "undefined", "Surface support must be specified");
	this.surface.support = support;
};

/**
* Sets surface eccentricity
* @param	{Number}	eccentricity	Index of surface eccentricity
*/
Surface.prototype.Eccentricity = function (eccentricity) {
	ASSERT(typeof eccentricity !== "undefined", "Surface eccentricity must be specified");
	this.surface.eccentricity = eccentricity;
};

/**
* Sets surface mesh refinement
* @param	{Number}	mesh_refinement		Index of surface mesh refinement
* @param	{Number}	meshing_type		Meshing type, can be undefine (According to global settings by default)
*												1 - According to global settings
*												2 - Mapped
*												3 - Free
*/
Surface.prototype.MeshRefinement = function (mesh_refinement,
	meshing_type) {
	ASSERT(typeof mesh_refinement !== "undefined", "Surface mesh refinement must be specified");
	this.surface.mesh_refinement = mesh_refinement;
	if (typeof meshing_type !== "undefined") {
		switch (meshing_type) {
			case 1:	// According to global settings
				this.meshing_type = surfaces.MESHING_TYPE_USE_GLOBAL_SETTINGS;
				break;
			case 2:	// Mapped
				this.surface.meshing_type = surfaces.MESHING_TYPE_MAPPED;
				break;
			case 3:	// Free
				this.surface.meshing_type = surfaces.MESHING_TYPE_FREE;
				break;
			default:
				ASSERT(false, "Unknown type of meshing type");
		}
	}
};

/**
* @param	{Array}		input_axes		Input axes values [category, [values], reverse_local_z_axis], can be undefined
*											1 - Angular rotation category, values: [α, [X, Y, Z], [X2, Y2, Z2]], first and second point can be undefined
*											2 - Axis parallel to lines category, values: [[line1_no, line2_no ... linen_no], axis (Axis x|Axis y)], second parameter can be undefined ("Axis x" as default)
*											3 - Axis directed to point category, values: [[X1, Y1, Z1], [X2, Y2, Z2], axis (Axis x|Axis y)], thirs parameter can be undefined ("Axis x" by default)
*											4 - Axis parallel to coordinate system category, values: [coordinate_system_no], can be undefined (Global XYZ by default)
*											reverse_local_z_axis, can be undefined
* @param	{Array}		result_axes		Result axes values [category], can be undefined (Identical to input axes by default)
*											1 - Identical to input axes category, by default
*											
*/
Surface.prototype.SpecificAxes = function (input_axes,
	result_axes) {
	if (typeof input_axes !== "undefined") {
		ASSERT(input_axes.length >= 2, "At least two parameters are required [[category, [values]]");
		var values = input_axes[1];
		switch (input_axes[0]) {
			case 1:	// Angular rotation category
				ASSERT(values.length === 3, "Three parameters are required [α, [X, Y, Z], [X2, Y2, Z2]], first and second point can be undefined");
				this.surface.input_axes_rotation_specification_type = surfaces.INPUT_AXES_ROTATION_SPECIFICATION_TYPE_ANGULAR_ROTATION;
				this.surface.input_axes_angular_rotation = values[0];
				if (typeof values[1] !== "undefined") {
					ASSERT(values[1].length === 3, "Point 1: three parameters are required [X, Y, Z]");
					this.surface.input_axes_point_1_x = values[1][0];
					this.surface.input_axes_point_1_y = values[1][1];
					this.surface.input_axes_point_1_z = values[1][2];
				}
				if (typeof values[2] !== "undefined") {
					ASSERT(values[2].length === 3, "Point 2: three parameters are required [X2, Y2, Z2]");
					this.surface.input_axes_point_2_x = values[2][0];
					this.surface.input_axes_point_2_y = values[2][1];
					this.surface.input_axes_point_2_z = values[2][2];
				}
				break;
			case 2:	// Axis parallel to lines category
				ASSERT(values.length >= 1, "At least one parameter is required [[line1_no, line2_no ... linen_no], axis]");
				this.surface.input_axes_rotation_specification_type = surfaces.INPUT_AXES_ROTATION_SPECIFICATION_TYPE_PARALLEL_TO_LINES;
				this.surface.input_axes_lines = values[0];
				if (typeof values[1] !== "undefined") {
					this.surface.input_axes_axis = values[1];
				}
				break;
			case 3:	// Axis directed to point category
				ASSERT(values.length === 3, "Three parameters are required [[X1, Y1, Z1], [X2, Y2, Z2], axis]");
				ASSERT(values[0].length === 3, "Point 1: three parameters are required [X, Y, Z]");
				ASSERT(values[1].length === 3, "Point 2: three parameters are required [X2, Y2, Z2]");
				this.surface.input_axes_rotation_specification_type = surfaces.INPUT_AXES_ROTATION_SPECIFICATION_TYPE_DIRECT_TO_POINT;
				this.surface.input_axes_point_1_x = values[0][0];
				this.surface.input_axes_point_1_y = values[0][1];
				this.surface.input_axes_point_1_z = values[0][2];
				this.surface.input_axes_point_2_x = values[1][0];
				this.surface.input_axes_point_2_y = values[1][1];
				this.surface.input_axes_point_2_z = values[1][2];
				if (typeof values[2] !== "undefined") {
					this.surface.input_axes_axis = values[2];
				}
				break;
			case 4:	// Axis parallel to coordinate system category
				this.surface.input_axes_rotation_specification_type = surfaces.INPUT_AXES_ROTATION_SPECIFICATION_TYPE_PARALLEL_TO_COORDINATE_SYSTEM;
				if (values.length === 1) {
					this.surface.input_axes_coordinate_system = values[0];
				}
				break;
			default:
				ASSERT(false, "Unknown input axes category");
		}
		if (input_axes.length === 3 && input_axes[2] !== "undefined") {
			this.surface.reversed_normal = input_axes[2]
		}
	}
	if (typeof result_axes !== "undefined") {
		// For now only "Identical to input axes" without any parameters
	}
};

/**
* Sets surface's grid for results values
* @param	{Number}	grid_type					Grid type (1 - Cartesian, 2 - Polar)
* @param	{Array}		number_of_grid_points		Number of grid points in (-) and (+), can be undefined
*														Grid type cartesian: [nx+, nx-, ny+, ny-]
*														Grid type polar: [nr+]
* @param	{Boolean}	grid_adapt_automatically	Adapt automatically, can be undefined (true by default)
* @param	{Array}		grid_distancies				Grid distancies ([b, h]), can be undefined
* @param	{Array}		grid_rotation				Grid rotation ([α, β]), can be undefined
* @param	{Array}		grid_origin					Grid origin ([X, Y, Z]), can be undefined
*/
Surface.prototype.GridForResults = function (grid_type,
	number_of_grid_points,
	grid_adapt_automatically,
	grid_distancies,
	grid_rotation,
	grid_origin) {
	ASSERT(typeof grid_type !== "undefined", "Grid type must be specified");
	switch (grid_type) {
		case 1:
			this.surface.grid_type = surfaces.GRID_TYPE_CARTESIAN;
			break;
		case 2:
			this.surface.grid_type = surfaces.GRID_TYPE_POLAR;
			break;
		default:
			ASSERT(false, "Unknown grid type");
	}
	if (typeof number_of_grid_points !== "undefined") {
		ASSERT(number_of_grid_points.length === 4, "Number of grid points: four values are required [nx+, nx-, ny+, ny-]");
		this.surface.grid_point_count_positive_x = number_of_grid_points[0];
		this.surface.grid_point_count_negative_x = number_of_grid_points[1];
		this.surface.grid_point_count_positive_y = number_of_grid_points[2];
		this.surface.grid_point_count_negative_y = number_of_grid_points[3];
	}
	if (typeof grid_adapt_automatically === "undefined") {
		grid_adapt_automatically = true;
	}
	this.surface.grid_adapt_automatically = grid_adapt_automatically;
	if (typeof grid_distancies !== "undefined") {
		ASSERT(grid_distancies.length === 2, "Grid distancies: two values are required [b, h]");
		this.surface.grid_distance_x = grid_distance_x[0];
		this.surface.grid_distance_y = grid_distancies[1];
	}
	if (typeof grid_rotation !== "undefined") {
		ASSERT(grid_rotation.length === 2, "Grid rotation: two values are required [α, β]");
		this.surface.grid_rotation_alpha = grid_rotation[0];
		this.surface.grid_rotation_beta = grid_rotation[1];
	}
	if (typeof grid_origin !== "undefined") {
		this.surface.grid_origin_x = grid_origin[0];
		this.surface.grid_origin_y = grid_origin[1];
		this.surface.grid_origin_z = grid_origin[2];
	}
}

/**
* Sets integrated objects to surface
* @param	{Boolean}	auto_detection_of_integrated_objects	Integrated objects are detected automatically, can be undefined (true by default)
* @param	{Array}		integrated_nodes						List of integrated nodes indexes, can be undefined
* @param	{Array}		integrated_lines						List of integrated lines indexes, can be undefined
* @param	{Array}		integrated_openings						List of integrated openings indexes, can be undefined;
*/
Surface.prototype.IntegratedObjects = function(auto_detection_of_integrated_objects,
	integrated_nodes,
	integrated_lines,
	integrated_openings) {
	if (typeof auto_detection_of_integrated_objects === "undefined") {
		auto_detection_of_integrated_objects = true;
	}
	this.surface.auto_detection_of_integrated_objects = auto_detection_of_integrated_objects;
	if (!auto_detection_of_integrated_objects) {
		ASSERT(typeof integrated_nodes !== "undefined" || typeof integrated_lines !== "undefined" || typeof integrated_openings !== "undefined", "Integrated nodes, lines or openings must be specified");
		if (typeof integrated_nodes !== "undefined") {
			this.surface.integrated_nodes = integrated_nodes;
		}
		if (typeof integrated_lines !== "undefined") {
			this.surface.integrated_lines = integrated_lines;
		}
		if (typeof integrated_openings !== "undefined") {
			this.surface.integrated_openings = integrated_openings;
		}
	}
};

/**
* Creates surface (private)
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
var createBaseSurface = function (no,
	boundary_lines,
	surface_type,
	thickness,
	comment,
	params) {
	var surface = engine.create_surface(no, boundary_lines);
	surface.type = surface_type;
	if (typeof thickness !== "undefined") {
		ASSERT(thicknesses.exist(thickness), "Thickness no. " + thickness + " doesn't exist");
		surface.thickness = thicknesses[thickness];
	}
	set_comment_and_parameters(surface, comment, params);
	return surface;
}