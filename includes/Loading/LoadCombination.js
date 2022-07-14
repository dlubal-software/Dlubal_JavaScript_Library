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
 * @param {Number}  no                  Load combination index, can be undefined
 * @param {Object}  design_situation    Design situation, can be undefined
 * @param {Array}   load_cases          Load cases, can be undefined
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 * @returns Created load combination
 */
function LoadCombination (no,
    design_situation,
    load_cases,
    comment,
    params) {
    if (arguments.length !== 0) {
        this.load_combination = createBaseLoadCombination(no, comment, params);
        if (typeof design_situation !== "undefined") {
            this.load_combination.design_situation = design_situation;
        }
        if (typeof load_cases !== "undefined") {
            for (var i = 0; i < load_cases.length; i++) {
                this.load_combination.items[i + 1].load_case = load_cases[i];
            }
        }
        return this.load_combination;
    }
}


/**
 * Sets analysis type and static analysis settings
 * @param {Number}  no                          Load combination index, can be undefined
 * @param {String}  analysis_type               Analysis type, can be undefined (ANALYSIS_TYPE_STATIC by default)
 * @param {Object}  static_analysis_settings    Static analysis settings
 * @param {Object}  design_situation            Design situation
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters, can be undefined
 * @returns Modified load combination
 */
LoadCombination.prototype.StaticAnalysis = function (no,
    analysis_type,
    static_analysis_settings,
    design_situation,
    comment,
    params) {
    if (typeof analysis_type === "undefined") {
        analysis_type = "ANALYSIS_TYPE_STATIC";
    }
    if (!(analysis_type in analysis_types)) {
        console.log("Analysis type " + analysis_type + " does not exist");
        get_analysis_types();
    }
    this.load_combination = createBaseLoadCombination(no, comment, params);
    this.load_combination.analysis_type = analysis_types[analysis_type];
    this.load_combination.static_analysis_settings = static_analysis_settings;
    this.load_combination.design_situation = design_situation;
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
 * @param {Array} load_cases    Load cases
 * @returns Modified load combination
 */
LoadCombination.prototype.AssignLoadCases = function (load_cases) {
    for (var i = 0; i < load_cases.length; i++) {
        this.load_combination.items[i + 1].load_case = load_cases[i];
    }
    return this.load_combination;
};


/**
 * Sets load combination to solve
 * @param {Boolean} to_solve    Enable/disable lopad combination to solve, can be undefined (true as default)
 * @returns Modified load combination
 */
LoadCombination.prototype.ToSolve = function (to_solve) {
    if (typeof to_solve === "undefined") {
        to_solve = true;
    }
    this.load_combination.to_solve = to_solve;
    return this.load_combination;
};


/**
 * Creates load combination (private)
 * @param {Number}  no      Load combination index, can be undefined
 * @param {String}  comment Comment, can be undefined
 * @param {Object}  params  Additional parameters, can be undefined
 * @returns Created load combination
 */
function createBaseLoadCombination (no,
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
function get_analysis_types () {
    console.log(Object.keys(analysis_types));
}


/**
 * Gets all available initial state definition types strings
 */
 function get_initial_state_definition_types () {
    console.log(Object.keys(initial_state_definition_types));
}

const analysis_types = {
    "ANALYSIS_TYPE_STATIC" : "Static Analysis",
    "ANALYSIS_TYPE_STATIC_TIME_DEPENDENCE" : "Static Analysis | Time-Dependent Analysis (TDA)",
    "ANALYSIS_TYPE_STATIC_CREEP_AND_SHRINKAGE" : "Static Analysis | Creep & Shrinkage (Linear)",
    "ANALYSIS_TYPE_HARMONIC_RESPONSE_ANALYSIS" : "Harmonic Response Analysis"
};

const initial_state_definition_types = {
    "DEFINITION_TYPE_FINAL_STATE" : "Final State",
    "DEFINITION_TYPE_STRAINS" : "Strains",
    "DEFINITION_TYPE_STIFFNESS" : "Stiffness",
    "DEFINITION_TYPE_STRAINS_WITH_USER_DEFINED_FACTORS" : "Strains with user-defined factors"
};
