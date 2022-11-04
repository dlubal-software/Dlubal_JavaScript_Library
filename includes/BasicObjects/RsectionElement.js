if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Elements.");
}

/**
 * Create RSection Element
 * @class
 * @constructor
 * @param {Number}  no      Number of Element, can be undefined
 * @param {String}  type    Type of Element
 * @param {String}  comment Comment, can be undefined
 * @param {Object}  params  Parameters, can be undefined
 * @returns Element
 */
function RSectionElement(no,
    type,
    comment,
    params) {
    if (arguments.length !== 0) {
        if (typeof type === "undefined") {
            type = elements.TYPE_SINGLELINE;
        }
        else {
            console.log("Type of Element not specified, SINGLELINE set as default");
        }
        return this.element = createBaseRSectionElement(no, comment, params);
    }
}

/**
 * Creates single line Element
 * @param {Number}  no              Number of Element, can be undefined
 * @param {Array}   boundary_lines  Boundary lines
 * @param {Number}  thickness       Thickness, can be undefined (10 mm by default)
 * @param {Number}  shear_thickness Shear thickness, can be undefined (not specified by default)
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Element
 */
RSectionElement.prototype.SingleLine = function (no,
    definition_points,
    thickness,
    shear_thickness,
    comment,
    params) {
    this.element = createBaseRSectionElement(no, elements.TYPE_SINGLELINE, comment, params);
    ASSERT(typeof definition_points !== "undefined" || definition_points.length !== 2, "Two definition points must be defined");
    this.element.definition_points = definition_points;
    return this.element;
};

/**
 * Creates RSection arc Element
 * @param {Number}  no                      Number of Element, can be undefined
 * @param {Array}   points_of_arc           Points numbers of arc Element
 * @param {Array}   control_point           Coordinates of control point
 * @param {Array}   arc_parameters          Arc parameters, can be undefined
 * @param {Array}   arc_center              Coordinates of arc center, can be undefined
 * @param {String}  alpha_adjustment_target Subsequent adjustment of alpha by displacing point at, can be undefined (Beginning of arc by default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Parameters, can be undefined
 * @returns Element
 */
RSectionElement.prototype.Arc = function (no,
    points_of_arc,
    control_point,
    arc_parameters,
    /*center_of_arc,*/
    alpha_adjustment_target,
    comment,
    params) {
    ASSERT(typeof points_of_arc !== "undefined", "Two points of arc must be defined");
    ASSERT(points_of_arc.length === 2, "Only two points of arc can be specified");
    ASSERT(typeof control_point !== "undefined", "Control point must be defined");
    this.element = createBaseRSectionElement(no, elements.TYPE_ARC, comment, params);
    this.element.definition_points = points_of_arc;
    this.element.arc_control_point_y = control_point[0];
    this.element.arc_control_point_z = control_point[1];
    if (typeof arc_parameters !== "undefined") {
        ASSERT(arc_parameters.length === 3, "Three parameters must be specified: height, radius, alpha");
        this.element.arc_height = arc_parameters[0];
        this.element.arc_radius = arc_parameters[1];
        this.element.arc_alpha = arc_parameters[2];
    }
    if (typeof arc_center !== "undefined") {
        ASSERT(arc_center.length === 2, "Two parameters must be specified: y, z");
        this.element.arc_center_y = arc_center[0];
        this.element.arc_center_z = arc_center[1];
    }
    if (typeof alpha_adjustment_target !== "undefined") {
        this.element.arc_alpha_adjustment_target = GetAlphaAdjustmentTargetType(alpha_adjustment_target);
    }
    return this.element
};

/**
 * Creates RSection circle Element
 * @param {Number}  no              Number of Element, can be undefined
 * @param {Array}   circle_center   Coordinates of circle center
 * @param {Number}  circle_radius   Circle radius
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Element
 */
RSectionElement.prototype.Circle = function (no,
    circle_center,
    circle_radius,
    rotation,
    comment,
    params) {
    ASSERT(typeof circle_center !== "undefined", "Circle center must be defined");
    ASSERT(circle_center.length === 2, "Two parameters must be specified: y, z");
    ASSERT(typeof circle_radius !== "undefined", "Circle radius must be defined");
    this.element = createBaseRSectionElement(no, elements.TYPE_CIRCLE, comment, params);
    this.element.circle_center_coordinate_y = circle_center[0];
    this.element.circle_center_coordinate_z = circle_center[1];
    this.element.circle_radius = circle_radius;
    return this.element;
};

/**
 * Creates RSection ellipse Element
 * @param {Number}  no                  Number of Element, can be undefined
 * @param {Number}  first_point         Number of first point
 * @param {Number}  second_point        Number of second point
 * @param {Array}   control_point       Control point coordinates
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Element
 */
RSectionElement.prototype.Ellipse = function (no,
    first_point,
    second_point,
    control_point,
    comment,
    params) {
    ASSERT(typeof first_point !== "undefined", "First point must be defined");
    ASSERT(typeof second_point !== "undefined", "Second point must be defined");
    ASSERT(typeof control_point !== "undefined", "Control point must be defined");
    ASSERT(control_point.length === 2, "Two parameters must be specified: y, z");
    this.element = createBaseRSectionElement(no, elements.TYPE_ELLIPSE, comment, params);
    this.element.ellipse_first_point = first_point;
    this.element.ellipse_second_point = second_point;
    this.element.ellipse_control_point_y = control_point[0];
    this.element.ellipse_control_point_z = control_point[1];
    return this.line;
};

/**
 * Creates RSection parabola Element
 * @param {Number}  no                      Number of Element, can be undefined
 * @param {Array}   points_of_parabola      Points numbers of parabola
 * @param {Array}   control_point           Control point
 * @param {Number}  parabola_alpha          Angle of the parabola, can be undefined (0 as default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Parameters, can be undefined
 * @return Element
 */
RSectionElement.prototype.Parabola = function (no,
    points_of_parabola,
    control_point,
    parabola_alpha,
    comment,
    params) {
    ASSERT(typeof points_of_parabola !== "undefine", "Two points of parabola must be defined");
    ASSERT(points_of_parabola.length === 2, "Two points must be specified");
    ASSERT(typeof control_point !== "undefined", "Center point must be defin    ed");
    ASSERT(control_point.length === 2, "Two parameter must be specified: y, z");
    this.element = createBaseRSectionElement(no, elements.TYPE_PARABOLA, comment, params);
    this.element.definition_points = points_of_parabola;
    this.element.parabola_control_point_y = control_point[0];
    this.element.parabola_control_point_z = control_point[1];
    if (typeof parabola_alpha !== "undefined") {
        this.element.parabola_alpha = parabola_alpha;
    }
    return this.element;
};

/**
 * Creates RSection NURBS Element
 * @param {Number}  no                  Number of Element, can be undefined
 * @param {Array}   control_points      Control points ([[y1, z1 (, weight1)], [y2, z2, weight2], ...])
 * @param {Number}  nurbs_order         Nurbs order, can be undefine (2 as default)
 * @param {Array}   nurbs_knots         Nurbs knots, can be undefined
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Element
 */
RSectionElement.prototype.NURBS = function (no,
    definition_points,
    control_points,
    nurbs_order,
    nurbs_knots,
    comment,
    params) {
    ASSERT(typeof definition_points !== "undefined", "Definition points must be defined");
    ASSERT(typeof control_points !== "undefined", "Control points must be defined");
    this.element = createBaseRSectionElement(no, elements.TYPE_NURBS, comment, params);
    this.element.definition_points = definition_points;
    for (var i = 0; i < control_points.length; ++i) {
        this.element.nurbs_control_points_by_components.insert_row(i + 2);
        for (var j = 0; j < control_points[i].length; ++j) {
            ASSERT(control_points[i].length >= 2, "Control points must be in format: [[y1, z1 (, weight1)], [y2, z2, weight2], ...]");
            this.element.nurbs_control_points_by_components[i + 2].global_coordinate_y = control_points[i][0];
            this.element.nurbs_control_points_by_components[i + 2].global_coordinate_z = control_points[i][1];
            if (control_points[i].length > 2) {
                this.element.nurbs_control_points_by_components[i + 2].weight = control_points[i][2];
            }
        }
    }
    if (typeof nurbs_order === "undefined") {
        nurbs_order = 2;
    }
    ASSERT(nurbs_order <= control_points.length, "The NURBS order cannot be greater than the number of its control points");
    this.element.nurbs_order = nurbs_order;
    if (typeof nurbs_knots !== "undefined") {
        for (var i = 0; i < nurbs_knots.length; ++i) {
            this.element.nurbs_knots.insert_row(i + 1);
            this.element.nurbs_knots[i] = nurbs_knots[i];
        }
    }
    return this.element;
};

/**
 * Create base RSection Element
 * @param {Number}  no      Number of Element, can be undefined
 * @param {String}  type    Type of Element
 * @param {String}  comment Comment, can be undefined
 * @param {Object}  params  Parameters, can be undefined
 * @returns Element
 */
 function createBaseRSectionElement(no,
    type,
    comment,
    params) {
    var element = engine.create_rsection_element(no);
    element.type = type;
    set_comment_and_parameters(element, comment, params);
    return element;
};

/**
 * Sets thickness and/or shear thickness
 * @param {Number} thickness        Thickness
 * @param {Number} shear_thickness  Effective thickness for shear transfer, can be undefined
 * @return Modified Element
 */
RSectionElement.prototype.Thickness = function (thickness,
    shear_thickness) {
    ASSERT(typeof thickness !== "undefined", "Thickness must be defined");
    this.element.thickness = thickness;
    if (typeof shear_thickness !== "undefined") {
        this.element.effective_thickness_checked = true;
        this.element.effective_thickness = shear_thickness;
    }
    return this.element;
}

function GetAlphaAdjustmentTargetType (target_type) {
    const alpha_adjustment_target_types = {
        "BEGINNING_OF_ARC" : lines.ALPHA_ADJUSTMENT_TARGET_BEGINNING_OF_ARC,
        "CONTROL_POINT" : lines.ALPHA_ADJUSTMENT_TARGET_ARC_CONTROL_POINT,
        "END_OF_ARC" : lines.ALPHA_ADJUSTMENT_TARGET_END_OF_ARC
    };
    if (target_type !== "undefined") {
		if (!(target_type in alpha_adjustment_target_types)) {
            console.log("Wrong alpha adjustment target type. Value was: " + target_type);
			console.log("Correct values are: ( " + Object.keys(alpha_adjustment_target_types) + ")");
			target_type = "BEGINNING_OF_ARC";
        }
        return alpha_adjustment_target_types[target_type];
	}
	else {
		return lines.ALPHA_ADJUSTMENT_TARGET_BEGINNING_OF_ARC;
	}
}