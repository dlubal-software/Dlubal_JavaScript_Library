if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Points.");
}

/**
 * Create RSection Point
 * @class
 * @constructor
 * @param {int} no - Number of Point
 * @param {number} coordinate_Y - Coordinate Y
 * @param {number} coordinate_Z - Coordinate Z
 * @param {string} comment - Comment for the Point
 * @param {dictionary} params - Parameters of the Point
 * @returns point
 */
function Point(no,
    coordinate_Y,
    coordinate_Z,
    comment,
    params) {

    if (arguments.length !== 0) {
        coordinate_Y = typeof coordinate_Y !== 'undefined' ? coordinate_Y : 0.0;
        coordinate_Z = typeof coordinate_Z !== 'undefined' ? coordinate_Z : 0.0;
        this.point = engine.create_rsection_point(no);

        // Coordinates
        this.point.coordinate_1 = coordinate_Y;
        this.point.coordinate_2 = coordinate_Z;

        set_comment_and_parameters(this.point, comment, params);
        return this.point;
    }
}
