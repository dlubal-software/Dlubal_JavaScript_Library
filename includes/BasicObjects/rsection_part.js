if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Parts.");
}

/**
 * Create RSection Part
 * @class
 * @constructor
 * @param {int} no - Number of Part
 * @param {string} comment - Comment for the Part
 * @param {dictionary} params - Parameters of the Part
 * @returns part
 */
function Part(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.part = engine.create_rsection_part(no);

        set_comment_and_parameters(this.part, comment, params);
        return this.part;
    }
}
