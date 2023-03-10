if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Stirrups.");
}

/**
 * Creates RSECTION Stirrup
 * @class
 * @constructor
 * @param {Number} no                           Number of Stirrup, can be undefined
 * @param {Array}  cover_points_no              Cover points numbers
 * @param {Number} material_no                  Material's number
 * @param {Number} diameter                     Diameter, can be undefined (8 mm by default)
 * @param {Number} diameter_of_curvature        Diameter of curvature, can be undefined (32 mm by default)
 * @param {Number} mandrel_diameter_factor      Mandrel diameter factor, can be undefined (4.00 by default)
 * @param {String} comment                      Comment, can be undefined
 * @param {Object} params                       Parameters, can be undefined
 */
function Stirrup (no,
    cover_points_no,
    material_no,
    diameter,
    diameter_of_curvature,
    mandrel_diameter_factor,
    comment,
    params) {
    if (typeof no === "undefined") {
        this.stirrup = stirrups.create();
    }
    else {
        this.stirrup = stirrups.create(no);
    }
    ASSERT(typeof cover_points_no !== "undefined", "Cover points numbers must be defined");
    ASSERT(Array.isArray(cover_points_no), "Cover points numbers must be specified as array of point of numbers");
    // for (var i = 0; i < cover_points_no.length; ++i) {
    //     if (!points.exist(cover_points_no[i])) {
    //         console.log("Point no. " + cover_points_no[i] + " doesn't exist");
    //     }
    // }
    this.stirrup.cover_points = cover_points_no;
    ASSERT(typeof material_no !==  "undefined", "Material number must be defined");
    if (!materials.exist(material_no)) {
        console.log("Material no. " + material_no + " doesn't exist");
    }
    this.stirrup.material = material_no;
    if (typeof diameter !== "undefined") {
        this.stirrup.diameter = diameter;
    }
    if (typeof diameter_of_curvature !== "undefined") {
        this.stirrup.diameter_of_curvature = diameter_of_curvature;
    }
    if (typeof mandrel_diameter_factor !== "undefined") {
        this.stirrup.mandrel_diameter_factor = mandrel_diameter_factor;
    }
    set_comment_and_parameters(this.stirrup, comment, params);
}

/**
 * @returns Number of Stirrup
 */
Stirrup.prototype.GetNo = function () {
    return this.stirrup.no;
};

/**
 * @returns Stirrup object
 */
Stirrup.prototype.GetStirrup = function () {
    return this.stirrup;
};