/**
 * Creates default Surface set imperfection
 * @param {Number} no                       Number of Surface set imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  surface_sets_no          Array of surfaces numbers
 * @param {String} comment                  Comment, can be undefined
 * @param {String} params                   Parameters, can be undefined
 * @returns Surface set imperfection
 */
 function SurfaceSetImperfection (no,
    imperfection_case_no,
    surface_sets_no,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.surfaceImperfection = createBaseSurfaceSetImperfection(no, imperfection_case_no, surface_sets_no, "RELATIVE", comment, params);
    }
}

/**
 * Creates relative Surface set imperfection
 * @param {Number} no                       Number of Surface set imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  surface_sets_no          Array of surface sets numbers
 * @param {Number} reference_length         Reference length
 * @param {Number} initial_bow_relative     Relative initial bow, can be undefined (200 as default)
 * @param {String} imperfection_direction   Imperfection direction, can be undefined ("LOCAL_Z" as default)
 * @param {String} comment                  Comment, can be undefined
 * @param {String} params                   Parameters, can be undefined
 */
SurfaceSetImperfection.prototype.Relative = function (no,
    imperfection_case_no,
    surface_sets_no,
    reference_length,
    initial_bow_relative,
    imperfection_direction,
    comment,
    params) {
    this.surfaceSetImperfection = createBaseSurfaceSetImperfection(no, imperfection_case_no, surface_sets_no, "RELATIVE", comment, params);
    ASSERT(typeof reference_length !== "undefined", "Reference length must be specified");
    this.surfaceSetImperfection.reference_length = reference_length;
    if (typeof initial_bow_relative !== "undefined") {
        this.surfaceSetImperfection.initial_bow_relative = initial_bow_relative;
    }
    this.surfaceSetImperfection.imperfection_direction = GetSurfaceSetImperfectionDirection(imperfection_direction);
};

/**
 * Creates absolute Surface set imperfection
 * @param {Number} no                       Number of Surface set imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  surface_sets_no          Array of surface sets numbers
 * @param {Number} initial_bow              Absolute initial bow, can be undefined (100 as default)
 * @param {String} imperfection_direction   Imperfection direction, can be undefined ("LOCAL_Z" as default)
 * @param {String} comment                  Comment, can be undefined
 * @param {String} params                   Parameters, can be undefined
 */
SurfaceSetImperfection.prototype.Absolute = function (no,
    imperfection_case_no,
    surface_sets_no,
    initial_bow,
    imperfection_direction,
    comment,
    params) {
    this.surfaceSetImperfection = createBaseSurfaceSetImperfection(no, imperfection_case_no, surface_sets_no, "ABSOLUTE", comment, params);
    if (typeof initial_bow !== "undefined") {
        this.surfaceSetImperfection.initial_bow = initial_bow;
    }
    this.surfaceSetImperfection.imperfection_direction = GetSurfaceSetImperfectionDirection(imperfection_direction);
};

/**
 * @returns Surface set imperfection object
 */
SurfaceSetImperfection.prototype.GetSurfaceImperfection = function () {
    return this.surfaceSetImperfection;
};

/**
 * @returns Surface set imperfection number
 */
SurfaceSetImperfection.prototype.GetNo = function () {
    return this.surfaceSetImperfection.no;
};

function createBaseSurfaceSetImperfection (no,
    imperfection_case_no,
    surface_sets_no,
    definition_type,
    comment,
    params) {
    ASSERT(typeof imperfection_case_no !== "undefined", "Imperfection case number must be specified");
    if (imperfection_cases.exist(imperfection_case_no)) {
        if (typeof no === "undefined") {
            var surfaceSetImperfection = imperfection_cases[imperfection_case_no].surface_set_imperfections.create();
        }
        else {
            var surfaceSetImperfection = imperfection_cases[imperfection_case_no].surface_set_imperfections.create(no);
        }
        set_comment_and_parameters(surfaceSetImperfection, comment, params);
        if (typeof surface_sets_no !== "undefined") {
            for (var i = 0; i < surface_sets_no.length; ++i) {
                if (!surface_sets.exist(surface_sets_no[i])) {
                    console.log("Surface set no. " + surface_sets_no[i] + " doesn't exist");
                }
                else if (surface_sets[surface_sets_no[i]].set_type !== surface_sets.SET_TYPE_CONTINUOUS) {
                    console.log("Surface set " + surface_sets_no[i] + " must be of continuos type");
                }
            }
            surfaceSetImperfection.surface_sets = surface_sets_no.join(",");
        }
        else {
            console.log("No surface sets are defined");
        }
        surfaceSetImperfection.definition_type = GetSurfaceSetImperfectionDefinitionType(definition_type);
        return surfaceSetImperfection;
    }
    else {
        console.log("Imperfection case no. " + imperfection_case_no + " doesn't exist");
    }
}
