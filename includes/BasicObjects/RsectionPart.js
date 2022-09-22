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
 * Creates Part with boundary line
 * @param {Number}  no              Number of Part, can be undefined
 * @param {Array}   boundary_lines  Boundary lines
 * @param {Object}  material        Material
 * @param {String}  comment         Comment, cabn be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns Part
 */
RSectionPart.prototype.WithBoundaryLines = function (no,
    boundary_lines,
    material,
    comment,
    params) {
    ASSERT(typeof boundary_lines !== "undefined", "Boundary lines must be specified");
    this.part = createBaseRSectionPart(no, comment, params);
    this.part.boundary_lines = boundary_lines;
    this.part.material = material;
    return this.part;
}

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
}

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