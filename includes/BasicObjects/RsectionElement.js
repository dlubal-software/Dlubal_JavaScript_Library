if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Elements.");
}

/**
 * Create RSection Elements
 * @class
 * @constructor
 * @param {int} no - Number of Element
 * @param {string} comment - Comment for the Element
 * @param {dictionary} params - Parameters of the Element
 * @returns element
 */
function Element(no,
    comment,
    params) {

    if (arguments.length !== 0) {
        this.element = engine.create_rsection_element(no);

        set_comment_and_parameters(this.element, comment, params);
        return this.element;
    }
}
