/**
 * Create Opening
 * @class
 * @constructor
 * @param {int} no - Number of Opening
 * @param {array} boundary_lines - Boundary lines of the Opening
 * @param {string} comment - Comment for the Opening
 * @param {dictionary} params - Parameters of the Opening
 * @returns opening
 */
function Opening(no,
    boundary_lines,
    comment,
    params) {

    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    ASSERT(boundary_lines.length > 0, "Boundary lines cannot be empty");

    var opening = engine.create_opening(no, boundary_lines);
    set_comment_and_parameters(opening, comment, params);
    return opening;
}
