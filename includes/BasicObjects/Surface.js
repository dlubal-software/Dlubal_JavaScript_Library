if (!RFEM) {
	throw new Error("This script is only for RFEM, it creates surfaces.");
}

include ("../Tools/jshlf_common_functions.js");
include ("../AddOns/ConcreteDesign/ConcreteDesignSupport.js");

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
function Surface(no,
	boundary_lines,
	thickness,
	comment,
	params) {
	if (arguments.length !== 0) {
		return this.surface = createSurfaceWithType(no, boundary_lines, surfaces.TYPE_STANDARD, thickness, comment, params);
	}
}

/**
 * @returns Surface object
 */
Surface.prototype.GetSurface = function () {
	return this.surface;
};

/**
 * @returns Surface number
 */
Surface.prototype.GetNo = function () {
	return this.surface.no;
};

Surface.prototype.GetType = function () {
	return this.surface.type;
};

/**
* Creates standard surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.Standard = function (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType("STANDARD"), thickness, comment, params);
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
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType("WITHOUT_THICKNESS"), undefined, comment, params);
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
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType("RIGID"), undefined, comment, params);
};

/**
* Creates membrane surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.Membrane = function (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType("MEMBRANE"), thickness, comment, params);
};

/**
* Creates without membrane tension surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{Number}	thickness		Thickness index
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.WithoutMembraneTension = function (no,
	boundary_lines,
	thickness,
	comment,
	params) {
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType("WITHOUT_MEMBRANE_TENSION"), thickness, comment, params);
};

/**
* Creates load transfer surface
* @param	{Number}	no						Index of surface, can be undefined
* @param	{Array}		boundary_lines			List of boundary lines indexes
* @param	{String}	load_transfer_direction	Load transfer direction, can be undefined (DIRECTION_IN_X as default)
* @param	{String}	load_distribution		Load distribution, can be undefined (UNIFORM as default)
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Surface's parameters, can be undefined
* @returns	Created surface
*/
Surface.prototype.LoadTransfer = function (no,
	boundary_lines,
	load_transfer_direction,
	load_distribution,
	comment,
	params) {
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType("LOAD_TRANSFER"), undefined, comment, params);
	if (typeof load_transfer_direction !== "undefined") {
		this.surface.load_transfer_direction = EnumValueFromJSHLFTypeName(
			load_transfer_direction,
			"load transfer direction",
			{
				"DIRECTION_IN_X": surfaces.LOAD_TRANSFER_DIRECTION_IN_X,
				"DIRECTION_IN_Y": surfaces.LOAD_TRANSFER_DIRECTION_IN_Y,
				"DIRECTION_IN_BOTH": surfaces.LOAD_TRANSFER_DIRECTION_IN_BOTH
			},
			surfaces.LOAD_TRANSFER_DIRECTION_IN_X);
	}
	if (typeof load_distribution !== "undefined") {
		this.surface.load_distribution = EnumValueFromJSHLFTypeName(
			load_distribution,
			"load distribution",
			{
				"UNIFORM": surfaces.LOAD_DISTRIBUTION_UNIFORM,
				"VARYING": surfaces.LOAD_DISTRIBUTION_VARYING
			},
			surfaces.LOAD_DISTRIBUTION_VARYING);
	}
};

/**
 * Removes influence from members, lines and nodes
 * @param {Array} excluded_members_no			Remove influence from members, can be undefined
 * @param {Array} excluded_parallel_to_members	Remove influence from parallel to members, can be undefined
 * @param {Array} excluded_lines				Remove influence from lines, can be undefined
 * @param {Array} excluded_parallel_to_lines	Remove influence from parallel to lines, can be undefined
 * @param {Array} excluded_nodes				Remove influence from nodes, can be undefined
 */
Surface.prototype.RemoveInfluenceFrom = function (excluded_members_no,
	excluded_parallel_to_members,
	excluded_lines,
	excluded_parallel_to_lines,
	excluded_nodes) {
	ASSERT(this.surface.type === surfaces.TYPE_LOAD_TRANSFER, "Surface must be of type Transfer stiffness");
	if (typeof excluded_members_no !== "undefined") {
		ASSERT(Array.isArray(excluded_members_no), "Excluded member numbers must be array of numbers");
		this.surface.excluded_members_no = excluded_members_no;
	}
	if (typeof excluded_parallel_to_members !== "undefined") {
		ASSERT(Array.isArray(excluded_parallel_to_members), "Excluded member numbers must be array of numbers");
		this.surface.excluded_parallel_to_members = excluded_parallel_to_members;
	}
	if (typeof excluded_lines !== "undefined") {
		ASSERT(Array.isArray(excluded_lines), "Excluded line numbers must be array of numbers");
		this.surface.excluded_lines = excluded_lines;
	}
	if (typeof excluded_parallel_to_lines !== "undefined") {
		ASSERT(Array.isArray(excluded_parallel_to_lines), "Excluded line numbers must be array of numbers");
		this.surface.excluded_parallel_to_lines = excluded_parallel_to_lines;
	}
	if (typeof excluded_nodes !== "undefined") {
		ASSERT(Array.isArray(excluded_nodes), "Excluded node numbers must be array of numbers");
		this.surface.excluded_nodes = excluded_nodes;
	}
};

/**
 * Sets Load transfer surface's weight
 * @param {Number} surface_weight	Surface weight
 */
Surface.prototype.SurfaceWeight = function (surface_weight) {
	ASSERT(this.surface.type === surfaces.TYPE_LOAD_TRANSFER, "Surface must be of type Transfer stiffness");
	ASSERT(typeof surface_weight !== "undefined", "Surface weight must be specified");
	this.surface.is_surface_weight_enabled = true;
	this.surface.surface_weight = surface_weight;
};

/**
 * Sets Load transfer surface's consider member eccentricity
 * @param {Boolean} consider_member_eccentricity	Consider member eccentricity enabled/disabled, can be undefined (true as default)
 */
Surface.prototype.ConsiderMemberEccentricity = function (consider_member_eccentricity) {
	ASSERT(this.surface.type === surfaces.TYPE_LOAD_TRANSFER, "Surface must be of type Transfer stiffness");
	if (typeof consider_member_eccentricity === "undefined") {
		consider_member_eccentricity = true;
	}
	this.surface.consider_member_eccentricity = consider_member_eccentricity;
};

/**
 * Sets Load transfer surface's consider section distribution
 * @param {Boolean} consider_section_distribution	Consider section distribution enabled/disabled, can be undefined (true as default)
 */
Surface.prototype.ConsiderSectionDistribution = function (consider_section_distribution) {
	ASSERT(this.surface.type === surfaces.TYPE_LOAD_TRANSFER, "Surface must be of type Transfer stiffness");
	if (typeof consider_section_distribution === "undefined") {
		consider_section_distribution = true;
	}
	this.surface.consider_section_distribution = consider_section_distribution;
};

/**
 * Sets load transfer surface's advance distribution
 * @param {Number} stripe_width		Strip width, can be undefined (0.01 as default)
 * @param {Number} sampling_factor	Sampling factor, can be set only with varying load distribution, can be undefined (0.02 as default)
 * @param {Boolean} enabled			Advance distribution enabled/disabled, can be undefined (true as default)
 */
Surface.prototype.AdvancedDistribution = function (stripe_width,
	sampling_factor,
	enabled) {
	ASSERT(this.surface.type === surfaces.TYPE_LOAD_TRANSFER, "Surface must be of type Transfer stiffness");
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.surface.is_advanced_distribution_settings_enabled = enabled;
	if (typeof stripe_width !== "undefined") {
		this.surface.stripe_width = stripe_width;
	}
	if (typeof sampling_factor !== "undefined") {
		ASSERT(this.surface.load_distribution === surfaces.LOAD_DISTRIBUTION_VARYING, "Sampling factor can be used only with varying load distribution");
		this.surface.sampling_factor = sampling_factor;
	}
};

/**
 * Sets load transfer surface's neglect equilibrium of moments
 * @param {Boolean} neglect_equilibrium_of_moments	Neglect equilibrium of moments enabled/disabled, can be undefined (true as default)
 */
Surface.prototype.NeglectEquilibriumOfMoments = function (neglect_equilibrium_of_moments) {
	ASSERT(this.surface.type === surfaces.TYPE_LOAD_TRANSFER, "Surface must be of type Transfer stiffness");
	if (typeof neglect_equilibrium_of_moments === "undefined") {
		neglect_equilibrium_of_moments = true;
	}
	this.surface.neglect_equilibrium_of_moments = neglect_equilibrium_of_moments;
};

/**
* Sets surface type with material and thickness
* @param {String}	stiffness_type	Stiffness type
* @param {Object}	material		Material, can be undefined
* @param {Object}	thickness		Thickness, can be undefined
*/
Surface.prototype.SurfaceType = function (stiffness_type,
	material,
	thickness) {
	this.surface.type = GetSurfaceStiffnessType(stiffness_type);
	if (typeof material !== "undefined") {
		this.surface.material = material;
	}
	if (typeof thickness !== "undefined") {
		this.surface.thickness = thickness;
	}
};

/**
* Sets plane geometry type of surface
*/
Surface.prototype.Plane = function () {
	this.surface.geometry = surfaces.GEOMETRY_PLANE;
};

/**
* Sets quadrangle geometry type of surface
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{String}	stiffness_type	Stiffness type
* @param	{Number}	thickness		Thickness index, can be undefined
* @param	{Number}	boundary_line	Index of boundary line
* @param	{Number}	corner_node_1		Quadrangle corner 1, can be undefined
* @param	{Number}	corner_node_2		Quadrangle corner 2, can be undefined
* @param	{Number}	corner_node_3		Quadrangle corner 3, can be undefined
* @param	{Number}	corner_node_4		Quadrangle corner 4, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
*/
Surface.prototype.Quadrangle = function (no,
	boundary_lines,
	stiffness_type,
	thickness,
	corner_node_1,
	corner_node_2,
	corner_node_3,
	corner_node_4,
	comment,
	params) {
	this.surface = createSurfaceWithType(no, boundary_lines,  GetSurfaceStiffnessType(stiffness_type), thickness, comment, params);
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type cannot be used for this type of surface");
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
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type cannot be used for this type of surface");
	this.surface.geometry = surfaces.GEOMETRY_NURBS;
};

/**
* Sets rotated geometry type of surface
* @param	{Number}	no					Index of surface, can be undefined
* @param	{Array}		boundary_lines		List of boundary lines indexes
* @param	{Number}	thickness			Thickness index, can be undefined
* @param	{Number}	boundary_line		Index of boundary line
* @param	{Number}	angle_of_rotation	Angle of rotation, can be undefined
* @param	{Array}		rotation_axis_p		Rotation axis, point P ([X, Y, Z]). Can be undefined.
* @param	{Array}		rotation_axis_r		Rotation axis, point R ([X, Y, Z]). Can be undefined.
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params  			Surface's parameters, can be undefined
*/
Surface.prototype.Rotated = function (no,
	boundary_lines,
	stiffness_type,
	thickness,
	boundary_line,
	angle_of_rotation,
	rotation_axis_p,
	rotation_axis_r,
	comment,
	params) {
	this.surface = createSurfaceWithType(no, boundary_lines, GetSurfaceStiffnessType(stiffness_type), thickness, comment, params);
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type cannot be used for this type of surface");
	ASSERT(typeof boundary_line !== "undefined", "Boundary line must be specified");
	this.surface.geometry = surfaces.GEOMETRY_ROTATED;
	this.surface.rotated_boundary_line = boundary_line;
	if (typeof angle_of_rotation !== "undefined") {
		this.surface.rotated_angle_of_rotation = angle_of_rotation;
	}
	if (typeof rotation_axis_p !== "undefined") {
		ASSERT(rotation_axis_p.length === 3, "Three values are required [X, Y, Z]");
		this.surface.rotated_point_p_x = rotation_axis_p[0];
		this.surface.rotated_point_p_y = rotation_axis_p[1];
		this.surface.rotated_point_p_z = rotation_axis_p[2];
	}
	if (typeof rotation_axis_r !== "undefined") {
		ASSERT(rotation_axis_r.length === 3, "Three values are required [X, Y, Z]");
		this.surface.rotated_point_r_x = rotation_axis_r[0];
		this.surface.rotated_point_r_y = rotation_axis_r[1];
		this.surface.rotated_point_r_z = rotation_axis_r[2];
	}
};

/**
* Sets pipe geometry type of surface
* @param	{Number}	center_line		Index of center lineHeight
* @param	{Number}	radius			Radius
*/
Surface.prototype.Pipe = function (center_line,
	radius) {
	ASSERT(this.surface.type !== surfaces.TYPE_LOAD_TRANSFER, "Quadrangle geometry type cannot be used for this type of surface");
	ASSERT(typeof center_line !== "undefined", "Center line must be specified");
	this.surface.pipe_center_line = center_line;
	if (typeof radius !== "undefined") {
		this.surface.pipe_radius = radius;
	}
};

/**
* Sets surface hinges
* @param	{Array}		hinges_values	Line hinges values ([[line_no1, line_hinge_no1] ... [line_non, line_hinge_non]])
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
* @param	{Number}	meshing_type		Meshing type, can be undefined (According to global settings by default)
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
*											3 - Axis directed to point category, values: [[X1, Y1, Z1], [X2, Y2, Z2], axis (Axis x|Axis y)], third parameter can be undefined ("Axis x" by default)
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
					this.surface.input_axes_axis = GetSurfaceInputAxesAxis(values[1]);
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
					this.surface.input_axes_axis = GetSurfaceInputAxesAxis(values[2]);
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
			this.surface.reversed_normal = input_axes[2];
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
*													Grid type cartesian: [nx+, nx-, ny+, ny-]
*													Grid type polar: [nr+]
* @param	{Boolean}	grid_adapt_automatically	Adapt automatically, can be undefined (true by default)
* @param	{Array}		grid_distances				Grid distances ([b, h]), can be undefined
* @param	{Array}		grid_rotation				Grid rotation ([α, β]), can be undefined
* @param	{Array}		grid_origin					Grid origin ([X, Y, Z]), can be undefined
*/
Surface.prototype.GridForResults = function (grid_type,
	number_of_grid_points,
	grid_adapt_automatically,
	grid_distances,
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
	if (typeof grid_distances !== "undefined") {
		ASSERT(grid_distances.length === 2, "Grid distances: two values are required [b, h]");
		this.surface.grid_distance_x = grid_distance_x[0];
		this.surface.grid_distance_y = grid_distances[1];
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
};

/**
* Sets integrated objects to surface
* @param	{Boolean}	auto_detection_of_integrated_objects	Integrated objects are detected automatically, can be undefined (true by default)
* @param	{Array}		integrated_nodes						List of integrated nodes indexes, can be undefined
* @param	{Array}		integrated_lines						List of integrated lines indexes, can be undefined
* @param	{Array}		integrated_openings						List of integrated openings indexes, can be undefined;
*/
Surface.prototype.IntegratedObjects = function (auto_detection_of_integrated_objects,
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
 * Enable / disable Design properties for surface (Concrete design add-on)
 * @param {Boolean} enabled 	Enable / disable Design properties, can be undefined (true as default)
 */
Surface.prototype.ConcreteDesignProperties = function (enabled) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.surface.design_properties_via_surface = enabled;
};

/**
 * Sets Via parent surface set
 * @param {Boolean} design_properties_via_parent_surface_set 	Via parent surface set, can be undefined (true as default)
 */
Surface.prototype.SetConcreteDesignPropertiesViaParentSurfaceSet = function (design_properties_via_parent_surface_set) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
	if (typeof design_properties_via_parent_surface_set === "undefined") {
		design_properties_via_parent_surface_set = true;
	}
	this.surface.design_properties_via_parent_surface_set = design_properties_via_parent_surface_set;
};

/**
 * Sets User-defined concrete cover
 * @param {Number} concrete_cover_top 							Concrete cover top, can be undefined (is not set, 30 mm as default). For EN must be is_user_defined_concrete_cover_enabled set true
 * @param {Number} concrete_cover_bottom 						Concrete cover bottom, can be undefined (is not set, 30 mm as default). For EN must be is_user_defined_concrete_cover_enabled set true
 * @param {Boolean} is_user_defined_concrete_cover_enabled 		Enable/disable user-defined values, can be undefined (true as default). Has meaning only for EN standard.
 */
Surface.prototype.SetUserDefinedConcreteCover = function (concrete_cover_top,
	concrete_cover_bottom,
	is_user_defined_concrete_cover_enabled) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC")) {
		if (typeof is_user_defined_concrete_cover_enabled === "undefined") {
			is_user_defined_concrete_cover_enabled = true;
		}
		this.surface.is_user_defined_concrete_cover_enabled = is_user_defined_concrete_cover_enabled;
	}
	if (typeof concrete_cover_top !== "undefined") {
		ASSERT(this.surface.is_user_defined_concrete_cover_enabled, "User-defined must be true");
		this.surface.user_defined_concrete_cover_top = concrete_cover_top;
	}
	if (typeof concrete_cover_bottom !== "undefined") {
		ASSERT(this.surface.is_user_defined_concrete_cover_enabled, "User-defined must be true");
		this.surface.user_defined_concrete_cover_bottom = concrete_cover_bottom;
	}
};

/**
 * Sets Concrete Cover Acc. to EN 1992 | CEN | 2014-11
 */
Surface.prototype.SetConcreteCoverAccToEn1992 = function () {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	this.surface.is_user_defined_concrete_cover_enabled = false;
};
/**
 * Sets Assignments
 * @param {Number} surface_concrete_design_uls_configuration 	Ultimate configuration, can be undefined (empty by default)
 * @param {Number} surface_concrete_design_sls_configuration 	Serviceability configuration, can be undefined (empty by default)
 */
Surface.prototype.SetAssignments = function (surface_concrete_design_uls_configuration,
	surface_concrete_design_sls_configuration) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	function setAssignment (surface,
		assignment_no,
		assignment_type) {
			if (assignment_type === "uls") {
				if (CONCRETE_DESIGN.concrete_design_uls_configurations.exist(assignment_no)) {
					surface.surface_concrete_design_uls_configuration = assignment_no;
				}
				else {
					console.log("Ultimate configuration no. " + assignment_no + " doesn't exist");
				}
			}
			else if (assignment_type === "sls") {
				if (CONCRETE_DESIGN.concrete_design_sls_configurations.exist(assignment_no)) {
					surface.surface_concrete_design_sls_configuration = assignment_no;
				}
				else {
					console.log("Serviceability configuration no. " + assignment_no + " doesn't exist");
				}
			}
			else {
				ASSERT(false);
			}
		}
	if (typeof surface_concrete_design_uls_configuration !== "undefined") {
		setAssignment(this.surface, surface_concrete_design_uls_configuration, "uls");
	}
	if (typeof surface_concrete_design_sls_configuration !== "undefined") {
		setAssignment(this.surface, surface_concrete_design_sls_configuration, "sls");
	}
};

/**
 * Sets Reinforcement directions
 * @param {Number} reinforcement_direction_top 			Reinforcement direction number for top surface side
 * @param {Number} reinforcement_direction_bottom 		Reinforcement direction number for bottom surface side
 */
Surface.prototype.SetConcreteDesignReinforcementDirections = function (reinforcement_direction_top,
	reinforcement_direction_bottom) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	ASSERT(typeof reinforcement_direction_top !== "undefined", "Reinforcement direction top must be specified");
	ASSERT(typeof reinforcement_direction_bottom !== "undefined", "Reinforcement direction bottom must be specified");
	function SetReinforcementDirection (surface,
		reinforcement_direction_no,
		top) {
		if (reinforcement_directions.exist(reinforcement_direction_no)) {
			if (top) {
				surface.reinforcement_direction_top = reinforcement_direction_no;
			}
			else {
				surface.reinforcement_direction_bottom = reinforcement_direction_no;
			}
		}
		else {
			console.log("Reinforcement direction no. " + reinforcement_direction_no + " doesn't exist");
		}
	}
	SetReinforcementDirection(this.surface, reinforcement_direction_top, true);
	SetReinforcementDirection(this.surface, reinforcement_direction_bottom, false);
};

/**
 * Sets Concrete durabilities
 * @param {Number} concrete_durability_top 		Concrete durability number for top surface side
 * @param {Number} concrete_durability_bottom 	Concrete durability number for bottom surface side
 */
Surface.prototype.SetConcreteDesignConcreteDurability = function (concrete_durability_top,
	concrete_durability_bottom) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	ASSERT(IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC"), "Concrete durabilities can be set only for EN and NTC");
	ASSERT(typeof concrete_durability_top !== "undefined", "Concrete durability top must be specified");
	ASSERT(typeof concrete_durability_bottom !== "undefined", "Concrete durability bottom must be specified");
	function SetConcreteDurability (surface,
		concrete_durability_no,
		top) {
		if (concrete_durabilities.exist(concrete_durability_no)) {
			if (top) {
				surface.concrete_durability_top = concrete_durability_no;
			}
			else {
				surface.concrete_durability_bottom = concrete_durability_no;
			}
		}
		else {
			console.log("Concrete durability no. " + concrete_durability_no + " doesn't exist");
		}
	}
	SetConcreteDurability(this.surface, concrete_durability_top, true);
	SetConcreteDurability(this.surface, concrete_durability_bottom, false);
};

/**
 * Sets Surface reinforcements
 * @param {Array} surface_reinforcement_nos 	Array of surface reinforcements numbers
 */
Surface.prototype.SetConcreteDesignSurfaceReinforcement = function (surface_reinforcement_nos) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	ASSERT(typeof surface_reinforcement_nos !== "undefined", "Surface reinforcement must be specified");
	ASSERT(Array.isArray(surface_reinforcement_nos), "Surface reinforcements must be an array of numbers");
	var reinforcements_list = surface_reinforcement_nos;
	surface_reinforcement_nos = [];
	for (var i = 0; i < reinforcements_list.length; ++i) {
		if (surface_reinforcements.exist(reinforcements_list[i])) {
			surface_reinforcement_nos.push(reinforcements_list[i]);
		}
		else {
			console.log("Surface reinforcement no. " + reinforcements_list[i] + " doesn't exist");
		}
	}
	this.surface.surface_reinforcements = surface_reinforcement_nos;
};

/**
 * Sets Deflection analysis
 * @param {String} deflection_check_surface_type 						Surface type (DOUBLE_SUPPORTED, CANTILEVER), can be undefined (is not set, DOUBLE_SUPPORTED as default)
 * @param {String} deflection_check_displacement_reference 				Displacement reference (DEFORMED_USER_DEFINED_REFERENCE_PLANE, PARALLEL_SURFACE, UNDEFORMED_SYSTEM), can be undefined (is not set, UNDEFORMED_SYSTEM as default)
 * @param {String} deflection_check_reference_length_z_definition_type 	Definition type (MANUALLY, BY_MAXIMUM_BOUNDARY_LINE, BY_MINIMUM_BOUNDARY_LINE), can be undefined (is not set, BY_MAXIMUM_BOUNDARY_LINE as default)
 * @param {Number} deflection_check_reference_length_z					Reference length, can be undefined
 */
Surface.prototype.SetDeflectionAnalysis = function (deflection_check_surface_type,
	deflection_check_displacement_reference,
	deflection_check_reference_length_z_definition_type,
	deflection_check_reference_length_z) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.design_properties_via_surface, "Design properties must be on");
	this.surface.deflection_check_surface_type = EnumValueFromJSHLFTypeName(
		deflection_check_surface_type,
		"surface type",
		{
			"DOUBLE_SUPPORTED": surfaces.DEFLECTION_CHECK_SURFACE_TYPE_DOUBLE_SUPPORTED,
			"CANTILEVER": surfaces.DEFLECTION_CHECK_SURFACE_TYPE_CANTILEVER
		},
		surfaces.DEFLECTION_CHECK_SURFACE_TYPE_DOUBLE_SUPPORTED);
	this.surface.deflection_check_displacement_reference = EnumValueFromJSHLFTypeName(
		deflection_check_displacement_reference,
		"displacement reference",
		{
			"DEFORMED_USER_DEFINED_REFERENCE_PLANE": surfaces.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_DEFORMED_USER_DEFINED_REFERENCE_PLANE,
			"PARALLEL_SURFACE": surfaces.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_PARALLEL_SURFACE,
			"UNDEFORMED_SYSTEM": surfaces.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_UNDEFORMED_SYSTEM
		},
		surfaces.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_UNDEFORMED_SYSTEM);
	this.surface.deflection_check_reference_length_z_definition_type = EnumValueFromJSHLFTypeName(
		deflection_check_reference_length_z_definition_type,
		"reference length z definition type",
		{
			"MANUALLY": surfaces.DEFLECTION_CHECK_REFERENCE_LENGTH_DEFINITION_TYPE_MANUALLY,
			"BY_MAXIMUM_BOUNDARY_LINE": surfaces.DEFLECTION_CHECK_REFERENCE_LENGTH_DEFINITION_TYPE_BY_MAXIMUM_BOUNDARY_LINE,
			"BY_MINIMUM_BOUNDARY_LINE": surfaces.DEFLECTION_CHECK_REFERENCE_LENGTH_DEFINITION_TYPE_BY_MINIMUM_BOUNDARY_LINE
		},
		surfaces.DEFLECTION_CHECK_REFERENCE_LENGTH_DEFINITION_TYPE_BY_MAXIMUM_BOUNDARY_LINE);
	if (typeof deflection_check_reference_length_z !== "undefined") {
		ASSERT(this.surface.deflection_check_reference_length_z_definition_type === surfaces.DEFLECTION_CHECK_REFERENCE_LENGTH_DEFINITION_TYPE_MANUALLY, "Definition must be of MANUALLY type");
		this.surface.deflection_check_reference_length_z = deflection_check_reference_length_z;
	}
};

Surface.prototype.SetUserDefinedReferencePlane = function (reference_plane) {
	ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design must be active");
	ASSERT(this.surface.deflection_check_displacement_reference === surfaces.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_DEFORMED_USER_DEFINED_REFERENCE_PLANE, "Displacement reference must be of DEFORMED_USER_DEFINED_REFERENCE_PLANE type");
	ASSERT(typeof reference_plane !== "undefined", "reference_plane must be specified");
	ASSERT(Array.isArray(reference_plane), "reference_plane must be an array");
	ASSERT(reference_plane.length === 9, "reference_plane must be an array: [AX, AY, AZ, BX, BY, BZ, CX, CY, CZ]");
	this.surface.deflection_check_reference_plane_point_1 = $V(reference_plane.slice(0, 3));
	this.surface.deflection_check_reference_plane_point_2 = $V(reference_plane.slice(3, 6));
	this.surface.deflection_check_reference_plane_point_3 = $V(reference_plane.slice(6, 9));
};

/**
* Creates surface (private)
* @param	{Number}	no				Index of surface, can be undefined
* @param	{Array}		boundary_lines	List of boundary lines indexes
* @param	{String}	stiffness_type	Stiffness type
* @param	{Number}	thickness		Thickness index, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface's parameters, can be undefined
* @returns	Created surface
*/
var createSurfaceWithType = function (no,
	boundary_lines,
	stiffness_type,
	thickness,
	comment,
	params) {
	var surface = engine.create_surface(no, boundary_lines);
	if (typeof stiffness_type !== "undefined") {
		if (stiffness_type === surfaces.TYPE_LOAD_TRANSFER) {
			ASSERT(surface.geometry === surfaces.GEOMETRY_PLANE, "Load transfer stiffness type can be set only with plane geometry type");
		}
		surface.type = stiffness_type;
	}
	if (typeof thickness === 'object') {
		surface.thickness = thickness;
	}
	else if (typeof thickness !== "undefined") {
		ASSERT(thicknesses.exist(thickness), "Thickness no. " + thickness + " doesn't exist");
		surface.thickness = thicknesses[thickness];
	}
	set_comment_and_parameters(surface, comment, params);
	return surface;
};

  function GetSurfaceInputAxesAxis(axis_type) {
	return EnumValueFromJSHLFTypeName(
		axis_type,
		"axis type",
		{
			"AXIS_X": surfaces.AXIS_X,
	  		"AXIS_Y": surfaces.AXIS_Y
		},
		surfaces.AXIS_X);
  }

  function GetSurfaceStiffnessType(stiffness_type) {
	return EnumValueFromJSHLFTypeName (
		stiffness_type,
		"stiffness type",
		{
			"STANDARD": surfaces.TYPE_STANDARD,
			"WITHOUT_THICKNESS": surfaces.TYPE_WITHOUT_THICKNESS,
			"RIGID": surfaces.TYPE_RIGID,
			"MEMBRANE": surfaces.TYPE_MEMBRANE,
			"WITHOUT_MEMBRANE_TENSION": surfaces.TYPE_WITHOUT_MEMBRANE_TENSION,
			"LOAD_TRANSFER": surfaces.TYPE_LOAD_TRANSFER,
			"GROUNDWATER": surfaces.TYPE_GROUNDWATER,
			"FLOOR": surfaces.TYPE_FLOOR,
			"FLOOR_DIAPHRAGM": surfaces.TYPE_FLOOR_DIAPHRAGM,
			"FLOOR_SEMIRIGID": surfaces.TYPE_FLOOR_SEMIRIGID
		},
		surfaces.TYPE_STANDARD);
  }

