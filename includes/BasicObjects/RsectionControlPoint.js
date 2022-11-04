if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Control Points.");
}

/**
 * Create RSection Control Point
 * @class
 * @constructor
 * @param {int} no - Number of Control Point
 * @param {string} comment - Comment for the Control Point
 * @param {dictionary} params - Parameters of the Control Point
 * @returns control point
 */
function ControlPoint(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.control_point = engine.create_rsection_control_point(no);

        set_comment_and_parameters(this.control_point, comment, params);
        return this.control_point;
    }
}
