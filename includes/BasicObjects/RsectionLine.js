if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Lines.");
}

/**
 * Create RSection Line
 * @class
 * @constructor
 * @param {int} no - Number of Line
 * @param {string} comment - Comment for the Line
 * @param {dictionary} params - Parameters of the Line
 * @returns line
 */
function Line(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.line = engine.create_rsection_line(no);

        set_comment_and_parameters(this.line, comment, params);
        return this.line;
    }
}
