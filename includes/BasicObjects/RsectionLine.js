if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Lines.");
}

/**
 * Creates RSection Line
 * @class
 * @constructor
 * @param {Number} no       Number of Line, cyn be undefined
 * @param {String} type     Type of line
 * @param {String} comment  Comment for the Line, can be undefined
 * @param {Object} params   Parameters of the Line, can be undefined
 * @returns line
 */
function RSectionLine(no,
    type,
    comment,
    params) {
    if (arguments.length !== 0) {
        if (typeof type !== "undefined") {
            type = lines.TYPE_POLYLINE;
        }
        else {
            console.log("Type of line not specified, POLYLINE set as default");
        }
        return this.line = createBaseRSectionLine(no, type, comment, params);
    }
}

/**
 * Creates RSection polyline
 * @param {Number}  no                  Number of line, can be undefined
 * @param {Array}   definition_points   Definition point numbers
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns line
 */
RSectionLine.prototype.Polyline = function (no,
    definition_points,
    comment, 
    params) {
    ASSERT(typeof definition_points !== "undefined", "Definition points must be specified");
    this.line = createBaseRSectionLine(no, lines.TYPE_POLYLINE, comment, params);
    this.line.definition_points = definition_points;
    return this.line;
};

/**
 * Creates RSection arc line
 * @param {Number}  no                      Number of line, can be undefined
 * @param {Array}   points_of_arc           Points numbers of arc line
 * @param {Array}   control_point           Coordinates of control point
 * @param {Array}   arc_parameters          Arc parameters, can be undefined
 * @param {Array}   arc_center              Coordinates of arc center, can be undefined
 * @param {String}  alpha_adjustment_target Subsequent adjustement of alpha by displaycing point at, can be undefined (Begining of arc by default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Parameters, can be undefined
 * @returns line
 */
RSectionLine.prototype.Arc = function (no,
    points_of_arc,
    control_point,
    arc_parameters,
    arc_center,
    alpha_adjustment_target,
    comment,
    params) {
    ASSERT(typeof points_of_arc !== "undefined", "Two points of arc must be defined");
    ASSERT(points_of_arc.length === 2, "Only two points of arc can be specified");
    ASSERT(typeof control_point !== "undefined", "Control point must be defined");
    this.line = createBaseRSectionLine(no, lines.TYPE_ARC, comment, params);
    this.line.definition_points = points_of_arc;
    this.line.arc_control_point_y = control_point[0];
    this.line.arc_control_point_z = control_point[1];
    if (typeof arc_parameters !== "undefined") {
        ASSERT(arc_parameters.length === 3, "Three parameters must be specified: height, radius, alpha");
        this.line.arc_height = arc_parameters[0];
        this.line.arc_radius = arc_parameters[1];
        this.line.arc_alpha = arc_parameters[2];
    }
    if (typeof arc_center !== "undefined") {
        ASSERT(arc_center.length === 2, "Two parameters must be specified: y, z");
        this.line.arc_center_y = arc_center[0];
        this.line.arc_center_z = arc_center[1];
    }
    if (typeof alpha_adjustment_target !== "undefined") {
        if (!(alpha_adjustement_target in alpha_adjustement_target_types)) {
            console.log("Alpha adjustement tagret " + alpha_adjustement_target + "doesn't exist");
            get_alpha_adjustement_types();
        }
        this.line.arc_alpha_adjustment_target = alpha_adjustement_target_types[alpha_adjustement_target];
    }
    return this.line
};

/**
 * Creates RSection circle
 * @param {Number}  no              Number of line, can be undefined
 * @param {Array}   circle_center   Coordinates of circle center
 * @param {Number}  circle_radius   Circle radius
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Circle
 */
RSectionLine.prototype.Circle = function (no,
    circle_center,
    circle_radius,
    /*rotation of circle??*/
    comment,
    params) {
    ASSERT(typeof circle_center !== "undefined", "Circle center must be defined");
    ASSERT(circle_center.length === 2, "Two parameters must be specified: y, z");
    ASSERT(typeof circle_radius !== "undefined", "Circle radius must be defined");
    this.line = createBaseRSectionLine(no, lines.TYPE_CIRCLE, comment, params);
    this.line.circle_center_coordinate_y = circle_center[0];
    this.line.circle_center_coordinate_z = circle_center[1];
    this.line.circle_radius = circle_radius;
    return this.line;
};

/**
 * Creates RSection ellipse
 * @param {Number}  no                  Number of line, can be undefined
 * @param {Number}  first_point         Number of first point
 * @param {Number}  second_point        Number of second point
 * @param {Array}   control_point       Control point coordinates
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns ellipse
 */
RSectionLine.prototype.Ellipse = function (no,
    first_point,
    second_point,
    control_point,
    comment,
    params) {
    ASSERT(typeof first_point !== "undefined", "First point must be defined");
    ASSERT(typeof second_point !== "undefined", "Second point must be defined");
    ASSERT(typeof control_point !== "undefined", "Control point must be defined");
    ASSERT(control_point.length === 2, "Two parameters must be specified: y, z");
    this.line = createBaseRSectionLine(no, lines.TYPE_ELLIPSE, comment, params);
    this.line.ellipse_first_point = first_point;
    this.line.ellipse_second_point = second_point;
    this.line.ellipse_control_point_y = control_point[0];
    this.line.ellipse_control_point_z = control_point[1];
    return this.line;
};

/**
 * Creates RSection parabola
 * @param {Number}  no                      Number of line, can be undefined
 * @param {Array}   points_of_parabola      Points numbers of parabola
 * @param {Array}   control_point           Control point
 * @param {Number}  parabola_alpha          Angle of the parabola, can be undefined (0 as default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Parameters, can be undefined
 * @return parabola
 */
RSectionLine.prototype.Parabola = function (no,
    points_of_parabola,
    control_point,
    parabola_alpha,
    comment,
    params) {
    ASSERT(typeof points_of_parabola !== "undefine", "Two points of parabola must be defined");
    ASSERT(points_of_parabola.length === 2, "Two points must be specified");
    ASSERT(typeof control_point !== "undefined", "Center point must be deined");
    ASSERT(control_point.length === 2, "Two parameter must be spocified: y, z");
    this.line = createBaseRSectionLine(no, lines.TYPE_PARABOLA, comment, params);
    this.line.definition_points = points_of_parabola;
    this.line.parabola_control_point_y = control_point[0];
    this.line.parabola_control_point_z = control_point[1];
    if (typeof parabola_alpha !== "undefined") {
        this.line.parabola_alpha = parabola_alpha;
    }
    return this.line;
};

/**
 * Creates RSection NURBS
 * @param {Number}  no                  Number of line, can be undefined
 * @param {Array}   control_points      Control points ([[y1, z1 (, weight1)], [y2, z2, weight2], ...])
 * @param {Number}  nurbs_order         Nurbs order, can be undefine (2 as default)
 * @param {Array}   nurbs_knots         Nurbs knots, can be undefined
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns NURBS
 */
RSectionLine.prototype.NURBS = function (no,
    definition_points,
    control_points,
    nurbs_order,
    nurbs_knots,
    comment,
    params) {
    ASSERT(typeof definition_points !== "undefined", "Define points must be defined");
    ASSERT(typeof control_points !== "undefined", "Control points must be defined");
    this.line = createBaseRSectionLine(no, lines.TYPE_NURBS, comment, params);
    this.line.definition_points = definition_points;
    for (var i = 0; i < control_points.length; ++i) {
        this.line.nurbs_control_points_by_components.insert_row(i + 2);
        for (var j = 0; j < control_points[i].length; ++j) {
            ASSERT(control_points[i].length >= 2, "Control points must be in format: [[y1, z1 (, weight1)], [y2, z2, weight2], ...]");
            this.line.nurbs_control_points_by_components[i + 2].global_coordinate_y = control_points[i][0];
            this.line.nurbs_control_points_by_components[i + 2].global_coordinate_z = control_points[i][1];
            if (control_points[i].length > 2) {
                this.line.nurbs_control_points_by_components[i + 2].weight = control_points[i][2];
            }
        }
    }
    if (typeof nurbs_order === "undefined") {
        nurbs_order = 2;
    }
    ASSERT(nurbs_order <= control_points.length, "The NURBS order cannot be greater than the number of its control points");
    this.line.nurbs_order = nurbs_order;
    if (typeof nurbs_knots !== "undefined") {
        for (var i = 0; i < nurbs_knots.length; ++i) {
            this.line.nurbs_knots.insert_row(i + 1);
            this.line.nurbs_knots[i] = nurbs_knots[i];
        }
    }
    return this.line;
};

/**
 * Sets points on line
 * @param {Array} points_on_line  [[distance1, from_start1, reference1, point_no1], [distance2, from_start2, reference2, point_no2], ...]
 *                                  from_start = true => node distance from start, otherwise distance from end
 *                                  reference - "L" by default
 *                                  point_no - empty by default
 */
RSectionLine.prototype.PointsOnLine = function (points_on_line) {
    for (var i = 0; i < points_on_line.length; ++i) {
        ASSERT(points_on_line.length >= 2, "At least distance and from_start must be defined");
        var row = i + 1;
        if (points_on_line[i][1]) {
            this.line.points_on_line_assignment[row].fromStart = points_on_line[i][0];
        }
        else {
            this.line.points_on_line_assignment[row].fromEnd = points_on_line[i][0];
        }
        if (points_on_line[i].length > 2) {
            var assignment_reference = points_on_line[i][2];
            if (!(assignment_reference in point_on_line_assignment_reference)) {
                console.log("Reference " + assignment_reference + "doesn't exist");
                get_point_on_line_assignemtn_reference_types();
            }
            this.line.points_on_line_assignment[row].reference = point_on_line_assignment_reference[assignment_reference];
        }
        if (points_on_line[i].length > 3) {
            var point_no = points_on_line[i][3];
            if (!points_on_line.exist(point_no)) {
                console.log("Point no. " + point_no + " doesn't exist");
            }
            this.line.points_on_line_assignment[row].node = point_no;
        }
    }
}

/**
 * Creates RSection base line
 * @param {Number} no       Number of line, can be undefined
 * @param {String} type     Type of line  
 * @param {String} comment  Comment, can be undefined
 * @param {Object} params   Parameters, can be undefined
 * @returns line
 */
function createBaseRSectionLine (no,
    type,
    comment,
    params) {
    var line = engine.create_rsection_line(no);
    line.type = type;
    set_comment_and_parameters(line, comment, params);
    return line;
};

/**
 * Shows list of all available alpha adjustement types
 */
 function get_alpha_adjustement_types () {
    console.log(Object.keys(alpha_adjustement_target_types));
};

function get_point_on_line_assignemtn_reference_types () {
    console.log(Object.keys(point_on_line_assignment_reference));
};

const alpha_adjustement_target_types = {
    "BEGINING_OF_ARC" : lines.ALPHA_ADJUSTMENT_TARGET_BEGINNING_OF_ARC,
    "CONTROL_POINT" : lines.ALPHA_ADJUSTMENT_TARGET_ARC_CONTROL_POINT,
    "END_OF_ARC" : lines.ALPHA_ADJUSTMENT_TARGET_END_OF_ARC
};

const point_on_line_assignment_reference = {
    "L" : lines.REFERENCE_TYPE_L,
    "Y" : lines.REFERENCE_TYPE_Y,
    "Z" : lines.REFERENCE_TYPE_Z
};