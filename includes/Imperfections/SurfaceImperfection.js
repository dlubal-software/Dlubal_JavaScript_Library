include("ImperfectionSupport.js");

/**
 * Creates default Surface imperfection
 * @param {Number} no                       Number of Surface imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  surfaces_no              Array of surfaces numbers
 * @param {String} comment                  Comment, can be undefined
 * @param {String} params                   Parameters, can be undefined
 * @returns Surface imperfection
 */
function SurfaceImperfection (no,
    imperfection_case_no,
    surfaces_no,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.surfaceImperfection = createBaseSurfaceImperfection(no, imperfection_case_no, surfaces_no, "RELATIVE", comment, params);
    }
}

/**
 * Creates relative Surface imperfection
 * @param {Number} no                       Number of Surface imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  surfaces_no              Array of surfaces numbers
 * @param {Number} reference_length         Reference length
 * @param {Number} initial_bow_relative     Relative initial bow, can be undefined (200 as default)
 * @param {String} imperfection_direction   Imperfection direction, can be undefined ("LOCAL_Z" as default)
 * @param {String} comment                  Comment, can be undefined
 * @param {String} params                   Parameters, can be undefined
 */
SurfaceImperfection.prototype.Relative = function (no,
    imperfection_case_no,
    surfaces_no,
    reference_length,
    initial_bow_relative,
    imperfection_direction,
    comment,
    params) {
    this.surfaceImperfection = createBaseSurfaceImperfection(no, imperfection_case_no, surfaces_no, "RELATIVE", comment, params);
    ASSERT(typeof reference_length !== "undefined", "Reference length must be specified");
    this.surfaceImperfection.reference_length = reference_length;
    if (typeof initial_bow_relative !== "undefined") {
        this.surfaceImperfection.initial_bow_relative = initial_bow_relative;
    }
    this.surfaceImperfection.imperfection_direction = GetSurfaceImperfectionDirection(imperfection_direction);
};

/**
 * Creates absolute Surface imperfection
 * @param {Number} no                       Number of Surface imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  surfaces_no              Array of surfaces numbers
 * @param {Number} initial_bow              Absolute initial bow, can be undefined (100 as default)
 * @param {String} imperfection_direction   Imperfection direction, can be undefined ("LOCAL_Z" as default)
 * @param {String} comment                  Comment, can be undefined
 * @param {String} params                   Parameters, can be undefined
 */
SurfaceImperfection.prototype.Absolute = function (no,
    imperfection_case_no,
    surfaces_no,
    initial_bow,
    imperfection_direction,
    comment,
    params) {
    this.surfaceImperfection = createBaseSurfaceImperfection(no, imperfection_case_no, surfaces_no, "ABSOLUTE", comment, params);
    if (typeof initial_bow !== "undefined") {
        this.surfaceImperfection.initial_bow = initial_bow;
    }
    this.surfaceImperfection.imperfection_direction = GetSurfaceImperfectionDirection(imperfection_direction);
}

/**
 * @returns Surface imperfection object
 */
SurfaceImperfection.prototype.GetSurfaceImperfection = function () {
    return this.surfaceImperfection;
};

/**
 * @returns Surface imperfection number
 */
SurfaceImperfection.prototype.GetNo = function () {
    return this.surfaceImperfection.no;
};

function createBaseSurfaceImperfection (no,
    imperfection_case_no,
    surfaces_no,
    definition_type,
    comment,
    params) {
    ASSERT(typeof imperfection_case_no !== "undefined", "Imperfection case number must be specified");
    if (typeof no === "undefined") {
        var surfaceImperfection = imperfection_cases[imperfection_case_no].surface_imperfections.create();
    }
    else {
        var surfaceImperfection = imperfection_cases[imperfection_case_no].surface_imperfections.create(no);
    }
    set_comment_and_parameters(surfaceImperfection, comment, params);
    if (typeof surfaces_no !== "undefined") {
        for (var i = 0; i < surfaces_no.length; ++i) {
            if (!surfaces.exist(surfaces_no[i])) {
                console.log("Surface no. " + surfaces_no[i] + " doesn't exist");
            }
        }
        surfaceImperfection.surfaces = surfaces_no.join(",");
    }
    else {
        console.log("No surfaces are defined");
    }
    surfaceImperfection.definition_type = GetSurfaceImperfectionDefinitionType(definition_type);
    return surfaceImperfection;
}