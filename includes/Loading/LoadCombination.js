/*
Not tested:
- Consider initial state from
- Calculate critical load (in default option is disabled)
- Creep caused by permanent load (in default option is disabled)
- Consider construction state (in default option is disabled)
Not implemented:
- Assignment for CO2
*/

/**
 * Creates load combination
 * @param {Number}  no                      Load combination index, can be undefined
 * @param {Object}  design_situation_no     Index of design situation, can be undefined
 * @param {Array}   load_combination_items  Items of load combination - load case index and factor [[LC1no,factor],[LC2no,factor]]
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Additional parameters, can be undefined
 * @returns Created load combination
 */
function LoadCombination(no,
    analysis_settings,
    design_situation_no,
    load_combination_items,
    comment,
    params) {
    if (arguments.length !== 0) {
        this.load_combination = createBaseLoadCombination(no, comment, params);
        SetDesignSituation(this.load_combination, design_situation_no);
        SetLoadCombinationItems(this.load_combination, load_combination_items);
        this.load_combination.static_analysis_settings = analysis_settings;
        return this.load_combination;
    }
}


/**
 * Sets analysis type and static analysis settings
 * @param {Number}  no                          Load combination index, can be undefined
 * @param {Object}  static_analysis_settings    Static analysis settings
 * @param {Object}  design_situation            Design situation
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters, can be undefined
 * @returns Modified load combination
 */
LoadCombination.prototype.StaticAnalysis = function (no,
    static_analysis_settings,
    design_situation_no,
    comment,
    params) {
    this.load_combination = createBaseLoadCombination(no, comment, params);
    analysis_type = "ANALYSIS_TYPE_STATIC";
    this.load_combination.analysis_type = analysis_types[analysis_type];
    this.load_combination.static_analysis_settings = static_analysis_settings;
    SetDesignSituation(this.load_combination, design_situation_no);
    return this.load_combination;
};


/**
 * Sets imperfection case
 * @param {Object}  imperfection_case   Imperfection case, can be undefined (in case of disabling )
 * @param {Boolean} enabled             Enable/disable imperfection case, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.ConsiderImperfection = function (imperfection_case,
    enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.load_combination.consider_imperfection = enabled;
    if (enabled) {
        if (typeof imperfection_case === "undefined") {
            ASSERT("Imperfection case must be defined");
        }
        this.load_combination.imperfection_case = imperfection_case;
    }
    return this.load_combination;
};


/**
 * Sets structure modification
 * @param {Object}  structure_modification  Structure modification, can be undefined (in case of disabling)
 * @param {Boolean} enabled                 Enable/disable structure modification, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.StructureModification = function (structure_modification,
    enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.load_combination.structure_modification_enabled = enabled;
    if (enabled) {
        if (typeof structure_modification === "undefined") {
            ASSERT("Structure modification must be defined");
        }
        this.load_combination.structure_modification = structure_modification;
    }
    return this.load_combination;
};


/**
 * Sets initial state from
 * @param {Object}  initial_state_case              Initial state, can be undefined (in case of disabling)
 * @param {String}  initial_state_definition_type   Initial state definition type, can be undefined (DEFINITION_TYPE_FINAL_STATE as default)
 * @param {Boolean} enabled                         Enable/disable initial state, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.ConsiderInitialState = function (initial_state_case,
    initial_state_definition_type,
    enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.load_combination.consider_initial_state = enabled;
    if (enabled) {
        if (typeof initial_state_case === "undefined") {
            ASSERT("Initial state case must be defined");
        }
        this.load_combination.initial_state_case = initial_state_case;
        if (initial_state_definition_type === "undefined") {
            initial_state_definition_type = "DEFINITION_TYPE_FINAL_STATE";
        }
        this.load_combination.initial_state_definition_type = initial_state_definition_types[initial_state_definition_type];
    }
    return this.load_combination;
};


/**
 * Calculates critical load
 * @param {Object}  stability_analysis_settings     Stability analysis settings, can be undefined (in case of disabling)
 * @param {Boolean} enabled                         Enable/disable initial state, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.CriticalLoadForCalculation = function (stability_analysis_settings,
    enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.load_combination.calculate_critical_load = enabled;
    if (enabled) {
        if (typeof stability_analysis_settings === "undefined") {
            ASSERT("Stability analysis settings must be defined");
        }
        this.load_combination.stability_analysis_settings = stability_analysis_settings;
    }
    return this.load_combination;
};


/**
 * Creep caused by permanent load from
 * @param {Object}  creep_caused_by_permanent_loading_case      Creep caused by permanent loading case, can be undefined (in case of disabling)
 * @param {Boolean} enabled                                     Enable/disable loading case, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.CreepCausedByPermanentLoadingCase = function (creep_caused_by_permanent_loading_case,
    enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.load_combination.consider_creep_caused_by_permanent_loading = enabled;
    if (enabled) {
        if (typeof creep_caused_by_permanent_loading_case === "undefined") {
            ASSERT("Loading case must be defined");
        }
        this.load_combination.creep_caused_by_permanent_loading_case = creep_caused_by_permanent_loading_case;
    }
    return this.load_combination;
};


/**
 * Consider construction stage
 * @param {Object}  construction_stage  Construction stage, can be undefined (in case of disabling)
 * @param {Boolean} enabled             Enable/disable construction stage, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.ConsiderConstructionStage = function (construction_stage,
    enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.load_combination.consider_construction_stage = enabled;
    if (enabled) {
        if (typeof construction_stage === "undefined") {
            ASSERT("Construction stage must be defined");
        }
        this.load_combination.construction_stage = construction_stage;
    }
    return this.load_combination;
};


/**
 * Assigns load cases
 * @param {Array} load_combination_items    Load combination itemns [[load case no, factor], .... ]
 * @returns Modified load combination
 */
LoadCombination.prototype.AssignLoadCases = function (load_combination_items) {
    if (this.load_combination !== "undefined") {
        SetLoadCombinationItems(this.load_combination, load_combination_items);
        return this.load_combination;
    }
};


/**
 * Sets load combination to solve
 * @param {Boolean} to_solve    Enable/disable load combination to solve, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.ToSolve = function (to_solve) {
    if (typeof to_solve === "undefined") {
        to_solve = true;
    }
    this.load_combination.to_solve = to_solve;
    return this.load_combination;
};


LoadCombination.prototype.SetAnalysisTypeAndSettings = function (analysis_type, analysis_settings) {
    if (typeof analysis_type === "undefined") {
        analysis_type = "ANALYSIS_TYPE_STATIC";
    }
    if (!(analysis_type in analysis_types)) {
        console.log("Analysis type " + analysis_type + " does not exist");
        get_analysis_types();
    }
    if (analysis_settings !== "undefined") {
        switch (analysis_type) {
            case "ANALYSIS_TYPE_STATIC":
                this.load_combination.static_analysis_settings = analysis_settings;
                break;
            case "ANALYSIS_TYPE_STATIC_TIME_DEPENDENCE":
                this.load_combination.static_analysis_settings = analysis_settings;
                break;
            case "ANALYSIS_TYPE_STATIC_CREEP_AND_SHRINKAGE":
                //this.load_combination.static_analysis_settings = analysis_settings;
                break;
            case "ANALYSIS_TYPE_HARMONIC_RESPONSE_ANALYSIS":
                this.load_combination.harmonic_response_analysis_settings = analysis_settings;
                break;
            default:
                this.load_combination.static_analysis_settings = analysis_settings;
                break;
        }
    }
};


/**
 * Creates load combination (private)
 * @param {Number}  no      Load combination index, can be undefined
 * @param {String}  comment Comment, can be undefined
 * @param {Object}  params  Additional parameters, can be undefined
 * @returns Created load combination
 */
function createBaseLoadCombination(no,
    comment,
    params) {
    if (typeof no === "undefined") {
        no = load_combinations.count() + 1;
    }
    var load_combination = load_combinations.create(no);
    set_comment_and_parameters(load_combination, comment, params);
    return load_combination;
}


/**
 * Gets all available analysis types strings
 */
function get_analysis_types() {
    console.log(Object.keys(analysis_types));
}


/**
 * Gets all available initial state definition types strings
 */
function get_initial_state_definition_types() {
    console.log(Object.keys(initial_state_definition_types));
}

const analysis_types = {
    "ANALYSIS_TYPE_STATIC": "Static Analysis",
    "ANALYSIS_TYPE_STATIC_TIME_DEPENDENCE": "Static Analysis | Time-Dependent Analysis (TDA)",
    "ANALYSIS_TYPE_STATIC_CREEP_AND_SHRINKAGE": "Static Analysis | Creep & Shrinkage (Linear)",
    "ANALYSIS_TYPE_HARMONIC_RESPONSE_ANALYSIS": "Harmonic Response Analysis"
};

const initial_state_definition_types = {
    "DEFINITION_TYPE_FINAL_STATE": "Final State",
    "DEFINITION_TYPE_STRAINS": "Strains",
    "DEFINITION_TYPE_STIFFNESS": "Stiffness",
    "DEFINITION_TYPE_STRAINS_WITH_USER_DEFINED_FACTORS": "Strains with user-defined factors"
};

function SetDesignSituation(load_combination, design_situation_no) {
    if (typeof design_situation_no !== "undefined") {
        if (design_situations.exist(design_situation_no)) {
            load_combination.design_situation = design_situations[design_situation_no];
        }
        else {
            console.log("Design situation " + design_situation_no + " does not exist");
        }
    }
}
function SetLoadCombinationItems(load_combination, 
    load_combination_items) {
    ASSERT(typeof load_combination !== "undefined", "Load combination number must be specified");
    ASSERT(typeof load_combination_items !== "undefined" && Array.isArray(load_combination_items), "At least one load case must be specified [[load_case_no, factor], [load_case_no, factor]]");
    var count = load_combination.items.row_count();
    for (var i = 0; i < load_combination_items.length; i++) {
        load_combination.items[count + i].load_case = load_combination_items[i][0];
        if (load_combination_items[i][1] !== "undefined") {
            load_combination.items[count + i].factor = load_combination_items[i][1];
        }
    }
}


