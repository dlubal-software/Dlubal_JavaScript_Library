if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Stress Points.");
}

/**
 * Create RSection Stress Points
 * @class
 * @constructor
 * @param {int} no - Number of Node
 * @param {string} comment - Comment for the Stress Point
 * @param {dictionary} params - Parameters of the Stress Point
 * @returns stress point
 */
function StressPoint(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.stress_point = engine.create_rsection_stress_point(no);

        set_comment_and_parameters(this.stress_point, comment, params);
        return this.stress_point;
    }
}
