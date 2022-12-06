if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Dimensions.");
}

/**
 * Create RSection Dimensions
 * @class
 * @constructor
 * @param {int} no - Number of Dimension
 * @param {string} comment - Comment for the Dimension
 * @param {dictionary} params - Parameters of the Dimension
 * @returns Dimension
 */
function Dimension(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.dimension = engine.create_rsection_dimension(no);

        set_comment_and_parameters(this.dimension, comment, params);
        return this.dimension;
    }
}
