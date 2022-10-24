if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Parts.");
}

/**
 * Creates RSection Part
 * @class
 * @constructor
 * @param {int}     no              Number of Part, can be undefined
 * @param {string}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Part
 */
function RSectionPart(no,
    comment,
    params) {
    if (arguments.length !== 0) {
        this.part = createBaseRSectionPart(no, comment, params);
        this.part.material = material;
        return this.part;
    }
}

/**
 * Creates rectangle Part
 * @param {Number}  no                  Number of Part, can be undefined
 * @param {Array}   top_left_corner     Top let corner specified with y, z coordinates
 * @param {Number}  width               Width
 * @param {Number} height               Height
 * @param {Object}  material            Material
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Rectangle Part
 */
RSectionPart.prototype.Rectangle = function (no,
    top_left_vertex,
    width,
    height,
    material,
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
    return this.WithBoundaryLines(no, boundaryLines, material, comment, params);
};

/**
 * Creates triangle Part
 * @param {Number}  no              Number of Part, can be undefined
 * @param {Array}   first_vertex    First point specified with y, z coordinates
 * @param {Array}   second_vertex   Second point specified with y, z coordinates
 * @param {Array}   third_vertex    Third point specified with y, z coordinates
 * @param {Object}  material        Material
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Triangle Part
 */
RSectionPart.prototype.Triangle = function (no,
    first_vertex,
    second_vertex,
    third_vertex,
    material,
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
    return this.WithBoundaryLines(no, boundaryLines, material, comment, params);
};

/**
 * Creates circle Part
 * @param {Number}  no              Number of Part, can be undefined
 * @param {Array}   center_vertex   Circle center point
 * @param {Number}  radius          Circle radius
 * @param {Object}  material        Material
 * @param {Struig}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Circle Part
 */
RSectionPart.prototype.Circle = function (no,
    center_vertex,
    radius,
    material,
    comment,
    params) {
    ASSERT(typeof center_vertex !== "undefined" && Array.isArray(center_vertex) && center_vertex.length === 2, "Circle center must be defined");
    ASSERT(typeof radius !== "undefined", "Circle radius must be defined");
    var centerPoint = new RSectionPoint(undefined, center_vertex[0], center_vertex[1]);
    var circle = new RSectionLine();
    var line = circle.Circle(undefined, [centerPoint.coordinate_1, centerPoint.coordinate_2], radius);
    return this.WithBoundaryLines(no, [line], material, comment, params);
};

/**
 * Creates polygon Part
 * @param {Number}  no              Number of Part, can be undefined
 * @param {Array}   vertex_points   Vertex points specified with y, z coordinates
 * @param {Object}  material        Material
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Polygon Part
 */
RSectionPart.prototype.Polygon = function (no,
    vertex_points,
    material,
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
    return this.WithBoundaryLines(no, boundaryLines, material, comment, params);
};

/**
 * Creates Part with boundary line
 * @param {Number}  no              Number of Part, can be undefined
 * @param {Array}   boundary_lines  Boundary lines
 * @param {Object}  material        Material
 * @param {String}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Part
 */
RSectionPart.prototype.WithBoundaryLines = function (no,
    boundary_lines,
    material,
    comment,
    params) {
    ASSERT(typeof boundary_lines !== "undefined", "Boundary lines must be specified");
    ASSERT(typeof material !== "undefined", "Material must be specified");
    this.part = createBaseRSectionPart(no, comment, params);
    this.part.boundary_lines = boundary_lines;
    this.part.material = material;
    return this.part;
};

/**
 * Integrates objects to Part
 * @param {Boolean} enable                      Objects are integrated, can be undefined (true as default)
 * @param {Boolean} automatic_object_detection  Objects are integrated automatically, can be undefined (true as default)
 * @param {Array}   integrated_openings         Integrated openings
 * @returns Modified Part
 */
RSectionPart.prototype.IntegratedObjects = function (enable,
    automatic_object_detection,
    integrated_openings) {
    if (typeof enable === "undefined") {
        enable = true;
    }
    if (enable) {
        if (typeof automatic_object_detection === "undefined") {
            automatic_object_detection = true;
        }
        this.part.auto_detection_of_integrated_objects = automatic_object_detection;
        if (!automatic_object_detection) {
            ASSERT(typeof integrated_openings !== "undefined", "Integrated opening must be defined");
            this.part.integrated_openings = integrated_openings;
        }
    }
    return this.part;
};

/**
 * Returns number of Part
 * @returns Number of Part
 */
RSectionPart.prototype.No = function() {
    return this.part.no;
};

/**
 * Creates base RSection Part
 * @param {int}     no              Number of Part, can be undefined
 * @param {string}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Part
 */
 function createBaseRSectionPart(no,
    comment,
    params) {
    if (arguments.length !== 0) {
        this.part = engine.create_rsection_part(no);
        set_comment_and_parameters(this.part, comment, params);
        return this.part;
    }
}