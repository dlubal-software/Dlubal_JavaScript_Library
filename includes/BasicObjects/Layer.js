if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Bars.");
}

/**
 * Creates Layer
 * @param {Number} no       Layer number, can be undefined
 * @param {String} name     Name, can be undefined
 * @param {String} comment  Comment, can be undefined
 * @param {Object} params   Additional parameters, can be undefined
 */
function Layer (no,
    name,
    comment,
    params) {
    if (typeof no === "undefined") {
        this.layer = layers.create();
    }
    else {
        this.layer = layers.create(no);
    }
    if (typeof name !== "undefined") {
        this.layer.name = name;
    }
    set_comment_and_parameters(this.layer, comment, params);
}

/**
 * Returns layer number
 */
Layer.prototype.GetNo = function () {
    return this.layer.no;
};

/**
 * Returns Layer object
 */
Layer.prototype.GetLayer = function () {
    return this.layer;
};
