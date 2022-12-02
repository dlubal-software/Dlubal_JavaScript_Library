if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Openings.");
}

/**
 * Creates RSection Opening
 * @class
 * @constructor
 * @param {int}     no              Number of Opening, can be undefined
 * @param {Array}   boundary_lines  Boundary lines
 * @param {string}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Opening
 */
function RSectionOpening(no,
    boundary_lines,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.opening = createBaseOpening(no, boundary_lines, comment, params);
    }
}

/**
 * Creates rectangle Opening
 * @param {Number}  no                  Number of Opening, can be undefined
 * @param {Array}   top_left_corner     Top let corner specified with y, z coordinates
 * @param {Number}  width               Width
 * @param {Number} height               Height
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Rectangle Opening
 */
 RSectionOpening.prototype.Rectangle = function (no,
    top_left_vertex,
    width,
    height,
    comment,
    params) {
    ASSERT(typeof top_left_vertex !== "undefined" && Array.isArray(top_left_vertex) && top_left_vertex.length === 2, "Top left corner must be defined");
    ASSERT(typeof width !== "undefined", "Width of rectangle must be specified");
    ASSERT(typeof height !== "undefined", "Height of rectangle must be defined");
    var topLeftPoint = new RSectionPoint(undefined, top_left_vertex[0], top_left_vertex[1]);
    var topRightPoint = new RSectionPoint(undefined, topLeftPoint.coordinate_1 + width, topLeftPoint.coordinate_2);
    var bottomRightPoint = new RSectionPoint(undefined, topRightPoint.coordinate_1, topRightPoint.coordinate_2 + height);
    var bottomLeftPoint = new RSectionPoint(undefined, topLeftPoint.coordinate_1, topLeftPoint.coordinate_2 + height);
    var boundaryLines = [];
    var boundaryLinePoints = [[topLeftPoint, topRightPoint], [topRightPoint, bottomRightPoint], [bottomRightPoint, bottomLeftPoint], [bottomLeftPoint, topLeftPoint]];
    var line = new RSectionLine();
    for (var i = 0; i < boundaryLinePoints.length; ++i) {
        boundaryLines.push(line.Polyline(undefined, [boundaryLinePoints[i][0].no, boundaryLinePoints[i][1].no]));
    }
    return createBaseOpening(no, boundaryLines, comment, params);
};

/**
 * Creates triangle Opening
 * @param {Number}  no              Number of Opening, can be undefined
 * @param {Array}   first_vertex    First point specified with y, z coordinates
 * @param {Array}   second_vertex   Second point specified with y, z coordinates
 * @param {Array}   third_vertex    Third point specified with y, z coordinates
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Triangle Opening
 */
 RSectionOpening.prototype.Triangle = function (no,
    first_vertex,
    second_vertex,
    third_vertex,
    comment,
    params) {
    ASSERT(typeof first_vertex !== "undefined" && Array.isArray(first_vertex) && first_vertex.length === 2, "First corner must be defined");
    ASSERT(typeof second_vertex !== "undefined" && Array.isArray(second_vertex) && second_vertex.length === 2, "Second corner must be defined");
    ASSERT(typeof third_vertex !== "undefined" && Array.isArray(third_vertex) && third_vertex.length === 2, "Third corner must be defined");
    var boundaryVertexes = [first_vertex, second_vertex, third_vertex];
    var boundaryPoints = [];
    for (var i = 0; i < boundaryVertexes.length; ++i) {
        boundaryPoints.push(new RSectionPoint(undefined, boundaryVertexes[i][0], boundaryVertexes[i][1]));
    }
    var boundaryLinePoints = [[boundaryPoints[0], boundaryPoints[1]], [boundaryPoints[1], boundaryPoints[2]], [boundaryPoints[2], boundaryPoints[0]]];
    var line = new RSectionLine();
    boundaryLines = [];
    for (var i = 0; i < boundaryLinePoints.length; ++i) {
        boundaryLines.push(line.Polyline(undefined, [boundaryLinePoints[i][0].no, boundaryLinePoints[i][1].no]));
    }
    return createBaseOpening(no, boundaryLines, comment, params);
};

/**
 * Creates circle Opening
 * @param {Number}  no              Number of Opening, can be undefined
 * @param {Array}   center_vertex   Circle center point
 * @param {Number}  radius          Circle radius
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Circle Part
 */
 RSectionOpening.prototype.Circle = function (no,
    center_vertex,
    radius,
    comment,
    params) {
    ASSERT(typeof center_vertex !== "undefined" && Array.isArray(center_vertex) && center_vertex.length === 2, "Circle center must be defined");
    ASSERT(typeof radius !== "undefined", "Circle radius must be defined");
    var centerPoint = new RSectionPoint(undefined, center_vertex[0], center_vertex[1]);
    var circle = new RSectionLine();
    var line = circle.Circle(undefined, [centerPoint.coordinate_1, centerPoint.coordinate_2], radius);
    return createBaseOpening(no, [line], comment, params);
};

/**
 * Creates polygon Opening
 * @param {Number}  no              Number of Opening, can be undefined
 * @param {Array}   vertex_points   Vertex points specified with y, z coordinates
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Polygon Opening
 */
RSectionOpening.prototype.Polygon = function (no,
    vertex_points,
    comment,
    params) {
    ASSERT(typeof vertex_points !== "undefined" && Array.isArray(vertex_points), "Vertex points must be defined");
    var boundaryLines = [];
    var boundaryPoints = [];
    for (var i = 0; i < vertex_points.length; ++i) {
        ASSERT(Array.isArray(vertex_points[i]) && vertex_points[i].length === 2, "Vertex points must be specified as array of array");
        boundaryPoints.push(new RSectionPoint(undefined, vertex_points[i][0], vertex_points[i][1]));
    }
    var line = new RSectionLine();
    for (var i = 0; i < boundaryPoints.length; ++i) {
        if (i < boundaryPoints.length - 1) {
            boundaryLines.push(line.Polyline(undefined, [boundaryPoints[i].no, boundaryPoints[i + 1].no]));
        }
        else {
            boundaryLines.push(line.Polyline(undefined, [boundaryPoints[i].no, boundaryPoints[0].no]));
        }
    }
    return createBaseOpening(no, boundaryLines, comment, params);
};

/**
 * @param {int}     no              Number of Opening, can be undefined
 * @param {Array}   boundary_lines  Boundary lines
 * @param {string}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Opening
 */
function createBaseOpening (no,
    boundary_lines,
    comment,
    params) {
    ASSERT(typeof boundary_lines !== "undefined", "Boundary lines must be specified");
    var opening = engine.create_rsection_opening(no);
    opening.boundary_lines = boundary_lines;
    set_comment_and_parameters(opening, comment, params);
    return opening;
}
