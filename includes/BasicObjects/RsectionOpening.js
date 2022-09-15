if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Openings.");
}

/**
 * Create RSection Opening
 * @class
 * @constructor
 * @param {int} no - Number of Opening
 * @param {string} comment - Comment for the Opening
 * @param {dictionary} params - Parameters of the Opening
 * @returns opening
 */
function Opening(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.opening = engine.create_rsection_opening(no);

        set_comment_and_parameters(this.opening, comment, params);
        return this.opening;
    }
}
