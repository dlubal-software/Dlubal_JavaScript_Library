if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates lines.");
}

/**
 * Creates line
 * @class
 * @constructor
 * @param	{Number}	no			Index of line, can be undefined
 * @param	{Array}		nodes		List of node indexes
 * @param	{String}	comment		Comment, can be undefined
 * @param	{Object}	params  	Line's parameters, can be undefined
 * @returns	Created line
 */
function Line (no,
	nodes,
	comment,
	params) {
	if (arguments.length != 0) {
		return this.line = createBaseLine(no, nodes, undefined, comment, params);
	}
}

/**
* Creates polyline
* @param	{Number}	no			Index of line, can be undefined
* @param	{Array}		nodes		List of node indexes
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Line's parameters, can be undefined
* @returns	Created polyline
*/
Line.prototype.Polyline = function (no,
	nodes,
	comment,
	params) {
	return this.line = createBaseLine(undefined, nodes, lines.TYPE_POLYLINE);
};

/**
* Creates arc line
* @param	{Number}	no							Index of line, can be undefined
* @param	{Array}		nodes						List of node indexes
* @param	{Array}		control_point				Control point of arc
* @param	{Array}		arc_parameters				Arc's parameters, can be undefined (only one of three parameter can be set, when arc parameter is set, other parameters (control point) will be racalculated)
* @param	{Array}		center_of_arc				Center of arc, can be undefined (when center of is set, control point will be recalculated)
* @param	{Number}	alpha_adjustement_target	Subsequent adjustement of α by displacing node at:
*														1 - Beginning of arc
*														2 - Arc control point
*														3 - End of arc
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params  			Line's parameters, can be undefined
* @returns	Created arc line
*/
Line.prototype.Arc = function (no,
	nodes,
	control_point,
	arc_parameters,
	center_of_arc,
	alpha_adjustement_target,
	comment,
	params) {
	this.line = createBaseLine(no, nodes, lines.TYPE_ARC, comment, params);
	ASSERT(typeof control_point !== "undefined", "Control point og arc must be specified");
	ASSERT(control_point.length === 3, "Control point: three values are required [X, Y, Z]");
	
	this.line.arc_control_point_x = control_point[0];
	this.line.arc_control_point_y = control_point[1];
	this.line.arc_control_point_z = control_point[2];

	if (typeof arc_parameters !== "undefined") {
		ASSERT(arc_parameters.length === 3, "Arc's parameters: three values are required ([h] or [undefined, r] or [undefined, undefined, α]");
		if (typeof arc_parameters[0] !== "undefined") {
			this.line.arc_height = arc_parameters[0];
		}
		else if (typeof arc_parameters[1] !== "undefined") {
			this.line.arc_radius = arc_parameters[1];
		}
		else {
			this.line.arc_alpha = arc_parameters[2];
		}
	}
	
	if (typeof center_of_arc !== "undefined") {
		ASSERT(center_of_arc.length === 3, "Center of arc: three values are requierd: [X, Y, Z]");
		this.line.arc_center_x = center_of_arc[0];
		this.line.arc_center_y = center_of_arc[1];
		this.line.arc_center_z = center_of_arc[2];
	}

	return this.line;
};

/**
* Creates circle line
* @param	{Number}	no					Index of line, can be undefined
* @param	{Array}		center_of_circle	Center point of circle
* @param	{Number}	circle_radius		Radius of circle, can be undefined
* @param	{Array}		normal_point		Point of normal ti circle plane, can be undefined
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params  			Line's parameters, can be undefined
* @returns	Created circle line
*/
Line.prototype.Circle = function (no,
	center_of_circle,
	circle_radius,
	normal_point,
	comment,
	params) {
	ASSERT(typeof center_of_circle !== "undefined", "Center point must be specified");
	ASSERT(center_of_circle.length === 3, "Center of circle: three values are required [X, Y, Z]");
	
	this.line = createBaseLine(no, undefined, lines.TYPE_CIRCLE, comment, params);
	this.line.circle_center_coordinate_1 = center_of_circle[0];
	this.line.circle_center_coordinate_2 = center_of_circle[1];
	this.line.circle_center_coordinate_3 = center_of_circle[2];
	
	if (typeof circle_radius !== "undefined") {
		this.line.circle_radius = circle_radius;
	}
	
	if (typeof normal_point !== "undefined") {
		ASSERT(normal_point.length === 3, "Normal point: three values are required [X, Y, Z]");
		this.line.circle_normal_coordinate_1 = normal_point[0];
		this.line.circle_normal_coordinate_2 = normal_point[1];
		this.line.circle_normal_coordinate_3 = normal_point[2];
	}
	
	return this.line;
};

/**
* Creates elliptical arc line
* @param	{Number}	no						Index of line, can be undefined
* @param	{Array}		control_point_1			First control point
* @param	{Array}		control_point_2			Second control point
* @param	{Array}		perimeter_point			Third control point - perimeter
* @param	{Number}	elliptical_arc_alpha	Arc angle α, can be undefined
* @param	{Number}	elliptical_arc_beta		Arc angle β, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params  				Line's parameters, can be undefined
* @returns	Created elliptical arc line
*/
Line.prototype.EllipticalArc = function (no,
	control_point_1,
	control_point_2,
	perimeter_point,
	elliptical_arc_alpha,
	elliptical_arc_beta,
	comment,
	params) {
	ASSERT(typeof control_point_1 !== "undefined", "Control point 1 cannot be undefined");
	ASSERT(typeof control_point_2 !== "undefined", "Control point 2 cannot be undefined");
	ASSERT(typeof perimeter_point !== "undefined", "Perimeter point cannot be undefined");
	ASSERT(control_point_1.length === 3, "Control point 1: three values are rquired [P1,X, P1,Y, P1,Z]");
	ASSERT(control_point_2.length === 3, "Control point 2: three values are rquired [P2,X, P2,Y, P2,Z]");
	ASSERT(perimeter_point.length === 3, "Perimeter point: three values are rquired [P3,X, P3,Y, P3,Z]");
	
	this.line = createBaseLine(no, undefined, lines.TYPE_ELLIPTICAL_ARC, comment, params);
	this.line.elliptical_arc_first_control_point_x = control_point_1[0];
	this.line.elliptical_arc_first_control_point_y = control_point_1[1];
	this.line.elliptical_arc_first_control_point_z = control_point_1[2];
	this.line.elliptical_arc_second_control_point_x = control_point_2[0];
	this.line.elliptical_arc_second_control_point_y = control_point_2[1];
	this.line.elliptical_arc_second_control_point_z = control_point_2[2];
	this.line.elliptical_arc_perimeter_control_point_x = perimeter_point[0];
	this.line.elliptical_arc_perimeter_control_point_y = perimeter_point[1];
	this.line.elliptical_arc_perimeter_control_point_z = perimeter_point[2];
	if (typeof elliptical_arc_alpha !== "undefined") {
		this.line.elliptical_arc_alpha = elliptical_arc_alpha;
	}
	if (typeof elliptical_arc_beta !== "undefined") {
		this.line.elliptical_arc_beta = elliptical_arc_beta;
	}
	
	return this.line;
}

/**
* Creates ellipse line
* @param	{Number}	no				Index of line, can be undefined
* @param	{Array}		nodes			Nodes of ellipse
* @param	{Array}		control_point	Control point
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Line's parameters, can be undefined
* @returns	Created ellipse line
*/
Line.prototype.Ellipse = function (no,
	nodes,
	control_point,
	comment,
	params) {
	ASSERT(typeof control_point !== "undefined", "Control point must be specified");
	ASSERT(control_point.length === 3, "Control point requires three values [X, Y, Z]");
	
	this.line = createBaseLine(no, nodes, lines.TYPE_ELLIPSE, comment, params);
	this.line.ellipse_control_point_x = control_point[0];
	this.line.ellipse_control_point_y = control_point[1];
	this.line.ellipse_control_point_z = control_point[2];
	
	return this.line;
}

/**
* Creates parabola line
* @param	{Number}	no				Index of line, can be undefined
* @param	{Array}		nodes			Nodes of parabola
* @param	{Array}		control_point	Control point
* @param	{Number}	parabola_alpha	Parabola's parameter α
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Line's parameters, can be undefined
* @returns	Created parabola line
*/
Line.prototype.Parabola = function (no,
	nodes,
	control_point,
	parabola_alpha,
	comment,
	params) {
	ASSERT(typeof control_point !== "undefined", "Control point must be specified");
	ASSERT(control_point.length === 3, "Control point requires three values [X, Y, Z]");
	
	this.line = createBaseLine(no, nodes, lines.TYPE_PARABOLA, comment, params);
	this.line.parabola_control_point_x = control_point[0];
	this.line.parabola_control_point_y = control_point[1];
	this.line.parabola_control_point_z = control_point[2];
	if (typeof parabola_alpha !== "undefined") {
		this.line.parabola_alpha = parabola_alpha;
	}
	
	return this.line;
}

/**
* Creates spline
* @param	{Number}	no				Index of line, can be undefined
* @param	{Array}		nodes			Nodes of spline
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Line's parameters, can be undefined
* @returns	Created spline
*/
Line.prototype.Spline = function (no,
	nodes,
	comment,
	params) {
	return this.line = createBaseLine(undefined, nodes, lines.TYPE_SPLINE, comment, params);
}

/**
* Creates NURBS line
* @param	{Number}	no								Index of line, can be undefined
* @param	{Array}		nodes							Nodes of NURBS
* @param	{Array}		control_points_by_components	Control points
* @param	{Number}	nurbs_order						Nurbs order, can be undefined
* @param	{String}	comment							Comment, can be undefined
* @param	{Object}	params  						Line's parameters, can be undefined
* @returns	Created parabola line
*/
Line.prototype.NURBS = function (no,
	nodes,
	control_points_by_components,
	nurbs_order,
	comment,
	params) {
	ASSERT(typeof control_points_by_components !== "undefined", "Control points must be specified");

	this.line = createBaseLine(no, nodes, lines.TYPE_NURBS, comment, params);

	for (var i = 0; i < control_points_by_components.length; ++i) {
		var control_point_values = control_points_by_components[i];
		ASSERT(control_point_values.length === 4, "Control point values required four parameters [X, Y, Z, Weight|undefined]");
		var row = this.line.nurbs_control_points_by_components.row_count();
		this.line.nurbs_control_points_by_components.insert_row(row);
		this.line.nurbs_control_points_by_components[row].global_coordinate_x = control_point_values[0];
		this.line.nurbs_control_points_by_components[row].global_coordinate_y = control_point_values[1];
		this.line.nurbs_control_points_by_components[row].global_coordinate_z = control_point_values[2];
		if (typeof control_point_values[3] !== "undefined") {
			this.line.nurbs_control_points_by_components[row].weight = control_point_values[3];
		}
	}

	if (typeof nurbs_order !== "undefined") {
		this.line.nurbs_order = nurbs_order;
	}

	return this.line;
}

/**
 * Create Rectangular polygon
 * @param {int} 	no				Number of the line, can be undefined
 * @param {array} 	center_point	Center point by format
 * @param {number} 	length 			Length
 * @param {number} 	width 			Width
 * @param {string} 	plane 			Plane XY, XZ or YZ, can be undefined
 * @param {string} 	comment 		Comment for the line, can be undefined
 * @param {Object} 	params 			Parameters of the line, can be undefined
 * @return Rectangular polygon
 */
Line.prototype.RectangularPolygon = function (no,
	center_point,
	length,
	width,
	plane,
	comment,
	params) {
	ASSERT(typeof center_point !== "undefined", "Control point must be specified");
	ASSERT(center_point.length === 3, "Center point: [X, Y, Z]");
	ASSERT(typeof length !== "undefined", "Length of rectangle must be specified");
	ASSERT(typeof width !== "undefined", "Width of rectangle must be specified");
	
	if (typeof plane === "undefined") {
		plane = "XY";
	}
	var X = center_point[0];
    var Y = center_point[1];
    var Z = center_point[2];
	var lastNodeNo = nodes.lastId();
	if (plane == "XY") {
        createNode(X - length / 2, Y - width / 2, Z);
        createNode(X + length / 2, Y - width / 2, Z);
        createNode(X + length / 2, Y + width / 2, Z);
        createNode(X - length / 2, Y + width / 2, Z);
    } else if (plane == "XZ") {
        createNode(X - length / 2, Y, Z - width / 2);
        createNode(X + length / 2, Y, Z - width / 2);
        createNode(X + length / 2, Y, Z + width / 2);
        createNode(X - length / 2, Y, Z + width / 2);
    } else if (plane == "YZ") {
        createNode(X, Y - length / 2, Z - width / 2);
        createNode(X, Y + length / 2, Z - width / 2);
        createNode(X, Y + length / 2, Z + width / 2);
        createNode(X, Y - length / 2, Z + width / 2);
    }
	
    this.line = Line(undefined, [lastNodeNo + 1, lastNodeNo + 2, lastNodeNo + 3, lastNodeNo + 4, lastNodeNo + 1]);
	
    set_comment_and_parameters(this.line, comment, params);
	
	return this.line;
}

/**
 * Create nPolygon
 * @param {int}		no				Number of the line, can be undefined
 * @param {array}	control_point 	Control point by format [x, y, z]
 * @param {number} 	no_edges 		Number of edges
 * @param {number} 	radius 			Radius
 * @param {string} 	plane 			Plane, can be undefined
 * @param {number} 	rotation_angle 	Rotation angle
 * @param {string} 	join 			Join in one "true" or in separate lines "false"
 * @param {string} 	comment 		Comment for the line, can be undefined
 * @param {Object} 	params 			Parameters of the line, can be undefined
 */
Line.prototype.nPolygon = function (no,
	center_point,
	no_edges,
	radius,
	plane,
	rotation_angle,
	join,
	comment,
	params) {
	ASSERT(center_point.length == 3, "Define the center point of rectangle by this format [X, Y, Z]");
    ASSERT(no_edges > 2, "Number of edges should be more than 2");
	
	center_point = typeof center_point !== "undefined" ? center_point : [];
    no_edges = typeof no_edges !== "undefined" ? no_edges : 0.0;
    radius = typeof radius !== "undefined" ? radius : 0.0;
    plane = typeof plane !== "undefined" ? plane : "XY";
    join = typeof join !== "undefined" ? join : true;
    rotation_angle = typeof rotation_angle !== "undefined" ? rotation_angle : 0.0;
    
    var X = center_point[0];
    var Y = center_point[1];
    var Z = center_point[2];
    var no_n = nodes.lastId() + 1;
    var no_n_ref = nodes.lastId() + 1;
    var nodes_list = [];
    if (plane == "XY") {
        for (var i = 0; i < no_edges; ++i) {
            var alpha = i * PI * 2 / no_edges + rotation_angle;
            Node(no_n, X + radius * cos(alpha), Y + radius * sin(alpha), Z);
            nodes_list.push(no_n);
            no_n++;
        }
    } else if (plane == "XZ") {
        for (var i = 0; i < no_edges; ++i) {
            var alpha = i * PI * 2 / no_edges + rotation_angle;
            Node(no_n, X + radius * cos(alpha), Y, Z + radius * sin(alpha));
            nodes_list.push(no_n);
            no_n++;
        }
    } else if (plane == "YZ") {
        for (var i = 0; i < no_edges; ++i) {
            var alpha = i * PI * 2 / no_edges + rotation_angle;
            Node(no_n, X, Y + radius * cos(alpha), Z + radius * sin(alpha));
            nodes_list.push(no_n);
            no_n++;
        }
    }

    if (join) {
        nodes_list.push(no_n - no_edges);
        this.line = Line(no, nodes_list);
    } else {
        var no_l = lines.lastId() + 1;
        for (var i = 0; i < no_edges - 1; ++i) {
            Line(no_l + i, [no_n_ref + i, no_n_ref + 1 + i]);
        }
        this.line = Line(no_l + no_edges - 1, [no_n_ref + no_edges - 1, no_n_ref]);
    }
    set_comment_and_parameters(this.line, comment, params);
	
	return this.line;
}

/**
* Sets line rotation
* @param {Number}	rotation_values 	Rotation values depends on rotatopon type:
*											1 - [β]
*											2 - [help_node_index, rotation_plane ("x-y"|"x-z")]
*											3 - [rotation_plane ("x-y"|"x-z")]
* @param {Number}	rotation_type		Line rotation via: Angle (1), Help node (2), Inside (non-straight line) (3)
*/
Line.prototype.Rotation = function (rotation_values,
	rotation_type) {
	ASSERT(typeof rotation_values !== "undefined", "Rotation values must be specified");
	
	if (typeof rotation_type === "undefined") {
		rotation_type = 1;
	}

	switch (rotation_type) {
		case 1:		// Angle
			ASSERT(rotation_values.length === 1, "One value is required [β]");
			this.line.rotation_specification_type = lines.COORDINATE_SYSTEM_ROTATION_VIA_ANGLE;
			this.line.rotation_angle = rotation_values[0];
			break;
		case 2:		// Help node
			ASSERT(rotation_values.length === 2, "Two values are required [help_node_index, rotation_plane (x-y|x-z)]");
			ASSERT(nodes.exist(rotation_values[0]), "Node no " + rotation_values[0] + " doesn't exist");
			this.line.rotation_specification_type = lines.COORDINATE_SYSTEM_ROTATION_VIA_HELP_NODE;
			this.line.rotation_help_node = rotation_values[0];
			this.line.rotation_plane = getRotationPlane(rotation_values[1]);
			break;
		case 3:		// Inside
			ASSERT(rotation_values.length === 1, "One value is required [rotation_plane (x-y|x-z)]");
			this.line.rotation_specification_type = lines.COORDINATE_SYSTEM_ROTATION_VIA_INSIDE_NODE;
			this.line.rotation_plane = getRotationPlane(rotation_values[0]);
			break;
		default:
			ASSERT(false, "Unknown type of rotation");
	}
};

/**
* Sets new default beam member to line
*/
Line.prototype.AssignMember = function () {
	ASSERT(sections.count() > 0, "No section found, before use this section you has to create section");
	return createMember(undefined, sections[1], members.TYPE_BEAM, this.line.no);
};

/**
* Sets nodes on line
* @param	{Array}		values	Nodes on line values in format [[node_1, reference_1, from_start_1, from_end1_1] ... [node_n, reference_n, from_start_n, from_end_1]]
*/
Line.prototype.NodesOnLine = function (values) {
	for (var i = 0; i < values.length; ++i) {
		ASSERT(values[i].length === 4, "Values has to be set in this format: [[node_1, reference_1, from_start_1, from_end1_1] ... [node_n, reference_n, from_start_n, from_end_1]]");
		if (typeof values[i][0] !== "undefined") {
			this.line.nodes_on_line_assignment[i + 1].node = values[i][0];
		}
		this.line.nodes_on_line_assignment[i + 1].reference = values[i][1];
		this.line.nodes_on_line_assignment[i + 1].fromStart = values[i][2];
		this.line.nodes_on_line_assignment[i + 1].fromEnd = values[i][3];
	}
};

/**
* Sets line supports
* @param	{Number}	line_support	Line supports object id
*/
Line.prototype.Supports = function (line_support) {
	ASSERT(line_supports.exist(line_support), "Line support no. " + line_support + " doesn't exist");
	
	this.line.support = line_supports[line_support];
};

/**
* Sets line mesh refinement
* @param 	{Array}		line_mesh_refinement	Line mesh refinement object id
*/
Line.prototype.MeshRefinement = function (mesh_refinement) {
	ASSERT(line_mesh_refinements.exist(mesh_refinement), "Line mesh refinement no. " + mesh_refinement + " doesn't exist");
	
	this.line.mesh_refinement = line_mesh_refinements[mesh_refinement];
};

/**
* Sets line welded joints
* @param	{Array}		values		Line welded joints values, [[weld1, surface1,1, surface2,1, surface3,1] ... [weldn, surface1n, surface2n, surface3n]]
*/
Line.prototype.WeldedJoints = function (values) {
	for (var i = 0; i < values.length; ++i) {
		var line_welded_values = values[i];
		ASSERT(line_welded_values.length === 4, "Four values are required for line welded specification [weld, surface1, surface2, surface3]");
		ASSERT(line_welded_joints.exist(line_welded_values[0]), "Line welded joint no. " + line_welded_values[0] + " doesn't exist");
		ASSERT(surfaces.exist(line_welded_values[1]), "Surface no. " + line_welded_values[1] + " doesn§t exist");
		var row = this.line.line_weld_assignment.row_count();
		this.line.line_weld_assignment.insert_row(row);
		this.line.line_weld_assignment[row].weld = line_welded_values[0];
		this.line.line_weld_assignment[row].surface1 = line_welded_values[1];
		if (typeof line_welded_values[2] !== "undefined") {
			ASSERT(surfaces.exist(line_welded_values[2]), "Surface no. " + line_welded_values[2] + " doesn§t exist");
			this.line.line_weld_assignment[row].surface2 = line_welded_values[2];
		}
		if (typeof line_welded_values[3] !== "undefined") {
			ASSERT(surfaces.exist(line_welded_values[3]), "Surface no. " + line_welded_values[3] + " doesn§t exist");
			this.line.line_weld_assignment[row].surface3 = line_welded_values[3];
		}
	}
}

/**
* Returns rotation plane from string representation
* @param	{String}	rotation_plane	Rotation plane (x-y, x-z)
* @return Rotation plane
*/
var getRotationPlane = function (rotation_plane) {
	switch (rotation_plane) {
		case "x-y":
			return lines.ROTATION_PLANE_XY;
		case "x-z":
			return lines.ROTATION_PLANE_XZ;
		default:
			ASSERT(false, "Unknown rotation plane");
	}
};

/**
* Creates line
* @param	{Number}	no			Index of line, can be undefined
* @param	{Array}		nodes		List of node indexes
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Line's parameters, can be undefined
* @returns	Created line
*/
var createBaseLine = function (no,
	nodes,
	line_type,
	comment,
	params) {
	if (line_type === lines.TYPE_ARC || line_type === lines.TYPE_ELLIPSE || line_type === lines.TYPE_NURBS) {
		ASSERT(typeof nodes !== "undefined", "Nodes must be defined");
		ASSERT(nodes.length === 2, "Arc or ellipse requires two nodes");
	}
	else if (line_type !== lines.TYPE_CIRCLE && line_type != lines.TYPE_ELLIPTICAL_ARC) {
		ASSERT(typeof nodes !== "undefined", "Nodes must be defined");
		ASSERT(nodes.length >=2, "At least two nodes must be specified");
	}

	var line = engine.create_line(no, nodes);
	if (typeof line_type != "undefined") {
		line.type = line_type;
	}
	set_comment_and_parameters(line, comment, params);

	return line;
};