if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates lines.");
}

/**
 * Creates line
 * @class
 * @constructor
 * @param	{Number}		no			Index of line, can be undefined
 * @param	{Array}		nodes		List of node indexes
 * @param	{String}		comment		Comment, can be undefined
 * @param	{Object}		params  	Line's parameters, can be undefined
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
		ASSERT(control_point_values.length === 4, "Control point values required four parameters [X, Y, Z, Weight]");
		var row = this.line.nurbs_control_points_by_components.row_count();
		this.line.nurbs_control_points_by_components[row].global_coordinate_x = control_point_values[0];
		this.line.nurbs_control_points_by_components[row].global_coordinate_y = control_point_values[1];
		this.line.nurbs_control_points_by_components[row].global_coordinate_z = control_point_values[2];
		this.line.nurbs_control_points_by_components[row].weight = control_point_values[3];
	}

	if (typeof nurbs_order !== "undefined") {
		this.line.nurbs_order = nurbs_order;
	}

	return this.line;
}

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