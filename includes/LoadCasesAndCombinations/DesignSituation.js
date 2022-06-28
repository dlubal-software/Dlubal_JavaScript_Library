/**
 * Creates design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
function DesignSituation (no,
    params,
    comment) {
    if (arguments.length !== 0) {
        return this.design_situation = createBaseDesignSituation(no, comment, params);
    }
}


/**
 * Creates ULS (EQU) Permanent and transient design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.PermanentAndTransient = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_EQU_PERMANENT_AND_TRANSIENT;
    return this.design_situation;
}


/**
 * Creates ULS (EQU) Accidental - psi-1,1 design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Accidental_EQU_PSI_1_1 = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_PSI_1_1;
    return this.design_situation;
}


/**
 * Creates ULS (EQU) - psi-2,1 design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Accidental_EQU_PSI_2_1 = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_PSI_2_1;
    return this.design_situation;
}


/**
 * Creates ULS (EQU) Seismic design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.EQU_Seismic = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_EQU_SEISMIC;
    return this.design_situation;
}


/**
 * Creates ULS (STR/GEO) Permanent and transient - Eq. 6.10 design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.PermanentAndTransient_STR_6_10 = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10;
    return this.design_situation;
}


/**
 * Creates ULS (STR/GEO) Permanent and transient - Eq. 6.10a and 6.10b design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.PermanentAndTransient_STR_6_10A_6_10B = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10A_6_10B;
    return this.design_situation;
}


/**
 * Creates ULS (STR/GEO) Accidental - psi-1,1 design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Accidental_STR_PSI_1_1 = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_PSI_1_1;
    return this.design_situation;
}


/**
 * Creates ULS (STR/GEO) Accidental - ps-2,1 design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Accidental_STR_PSI_2_1 = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_PSI_2_1;
    return this.design_situation;
}


/**
 * Creates ULS (STR/GEO) Seismic design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Seismic_STR = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_STR_SEISMIC;
    return this.design_situation;
}


/**
 * Creates SLS Characteristic design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Characteristic_SLS = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC;
    return this.design_situation;
}


/**
 * Creates SLS Frequent design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Frequent_SLS = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_SLS_FREQUENT;
    return this.design_situation;
}


/**
 * Creates Quasi permanent design situation object
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
DesignSituation.prototype.Quasi_Permanent_SLS = function (no,
    params,
    comment) {
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situations.DESIGN_SITUATION_TYPE_SLS_QUASI_PERMANENT;
    return this.design_situation;
}


/**
 * Sets combination wizard
 * @param {Object}  combination_wizard  Combination wizard
 */
DesignSituation.prototype.CombinationWizard = function (combination_wizard) {
    this.design_situation.combination_wizard = combination_wizard;
}


/**
 * Sets relationship between load cases
 * @param {Object} relationship_between_load_cases  
 */
DesignSituation.prototype.ConsiderInclusiveExclusiveLoadCases = function (relationship_between_load_cases) {
    this.design_situation.relationship_between_load_cases = relationship_between_load_cases;
}


/**
 * Create base desing situation (private)
 * @param {Number}  no          Number of design situation, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @returns     Created design situation object
 */
function createBaseDesignSituation (no,
    comment,
    params) {
    if (typeof no === "undefined") {
        no = design_situations.count() + 1;
    }
    var design_situation = design_situations.create(no);
    set_comment_and_parameters(design_situation, comment, params)
    return design_situation
}