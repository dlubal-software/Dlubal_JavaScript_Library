if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Openings.");
}

/**
 * Creates RSection Opening
 * @class
 * @constructor
 * @param {int}     no              Number of opening, can be undefined
 * @param {Array}   boundary_lines  Numbers of boundary lines
 * @param {string}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns opening
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
 * @param {int}     no              Number of opening, can be undefined
 * @param {Array}   boundary_lines  Numbers of boundary lines
 * @param {string}  comment         Comment, can be undefined
 * @param {Object}  params          Parameters, can be undefined
 * @returns opening
 */
function createBaseOpening (no,
    boundary_lines,
    comment,
    params) {
    ASSERT(typeof boundary_lines !== "undefined", "Boundary lines musrt be specified");
    var opening = engine.create_rsection_opening(no);
    opening.boundary_lines = boundary_lines;
    set_comment_and_parameters(opening, comment, params);
    return opening;
}