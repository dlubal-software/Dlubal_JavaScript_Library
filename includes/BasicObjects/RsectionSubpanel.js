if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Subpanels.");
}

/**
 * Create RSection Subpanel
 * @class
 * @constructor
 * @param {int}         no          Number of Subpanel
 * @param {string}      comment     Comment for the Subpanel
 * @param {dictionary}  params      Parameters of the Subpanel
 * @returns Subpanel
 */
function Subpanel(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.subpanel = engine.create_rsection_subpanel(no);

        set_comment_and_parameters(this.subpanel, comment, params);
        return this.subpanel;
    }
}
