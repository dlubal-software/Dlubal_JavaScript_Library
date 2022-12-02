if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Stiffeners.");
}

/**
 * Create RSection Stiffener
 * @class
 * @constructor
 * @param {int}         no          Number of Stiffener
 * @param {string}      comment     Comment for the Stiffener
 * @param {dictionary}  params      Parameters of the Stiffener
 * @returns Stiffener
 */
function Stiffener(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.stiffener = engine.create_rsection_stiffener(no);

        set_comment_and_parameters(this.stiffener, comment, params);
        return this.stiffener;
    }
}
