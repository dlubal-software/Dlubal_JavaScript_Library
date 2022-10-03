if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Stress Points.");
}

/**
 * Create RSection Stress Points
 * @class
 * @constructor
 * @param {Number} no       Number of Stress point, can be undefined
 * @param {String} comment  Comment, can be undefined
 * @param {Object} params   Parameters, can be undefined
 * @returns Stress point
 */
function RSectionStressPoint(no,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.stress_point = createBaseStressPoint(no, comment, params);
    }
}

RSectionStressPoint.prototype.Standard = function (no,
    part_no,
    reference_stress_point_no,
    global_coordinations,
    element_no,
    coordinate_type,
    coordinates,
    comment,
    params) {
    this.stress_point = createBaseStressPoint(no, comment, params);
    this.stress_point.definition_type = stress_points.TYPE_STANDARD;
    ASSERT(typeof part_no !== "undefined", "Part must be defined");
    /*if (parts.exist(part_no)) {
        this.stress_point.part = part_no;
    }
    else {
        console.log("Part no. " + part_no + " doesn't exist");
    }*/
    if (typeof reference_stress_point_no !== "undefined") {
        if (stress_points.exist(reference_stress_point_no)) {
            this.stress_point.reference_stress_point = reference_stress_point_no;
            console.log(this.stress_point.reference_stress_point);
            if (typeof global_coordinations !== "undefined") {
                ASSERT(global_coordinations.length === 2, "Global coordination must be specified as coordinations [Y, Z]");
                this.stress_point.global_coordinate_1 = global_coordinations[0];
                this.stress_point.global_coordinate_2 = global_coordinations[1];
            }
        }
        else{
            console.log("Reference stress point no." + reference_stress_point_no + " doesn't exist");
        }
    }
    if (typeof element_no !== "undefined") {
        if (elements.exist(element_no)) {
            this.stress_point.element = element_no;
        }
        else {
            console.log("Element no." + element_no + " doesn't exist");
        }
    }
    if (typeof coordinate_type !== "undefined") {
        this.stress_point.coordinate_system_type = coordinate_type;
    }
}

/**
 * Create RSection Stress Points
 * @param {Number} no       Number of Stress point, can be undefined
 * @param {String} comment  Comment, can be undefined
 * @param {Object} params   Parameters, can be undefined
 * @returns Stress point
 */
function createBaseStressPoint(no,
    comment,
    params) {
    if (typeof no === "undefined") {
        no = stress_points.count() + 1;
    }
    var stress_point = engine.create_rsection_stress_point(no);
    set_comment_and_parameters(stress_point, comment, params);
    return stress_point;
};