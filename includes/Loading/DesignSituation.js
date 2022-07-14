/**
 * Creates design situation object
 * @class
 * @constructor
 * @param {Number}  no                      Number of design situation, can be undefined
 * @param {String}  design_situation_type   Design situation type
 * @param {Object}  params                  Additional parameters, can be undefined
 * @param {String}  comment                 Comment, can be undefined
 * @returns     Created design situation object
 */
 function DesignSituation (no,
    design_situation_type,
    params,
    comment) {
    if (!(design_situation_type in design_situation_types)) {
        console.log("Design type " + design_situation_type + " does not exist");
        get_design_situation_types();
    }
    this.design_situation = createBaseDesignSituation(no, comment, params);
    this.design_situation.design_situation_type = design_situation_types[design_situation_type];
}


/**
 * Returns internal Design Situation object
 * @returns Internal Design Situation object
 */
DesignSituation.prototype.DesignSituation = function() {
    return this.design_situation;
};


/**
 * Returns number of Design Situation
 * @returns Number of Design Situation
 */
DesignSituation.prototype.No = function() {
    return this.design_situation.no;
};


/**
 * Sets combination wizard
 * @param {Object}  combination_wizard_no  Combination wizard number
 */
DesignSituation.prototype.SetCombinationWizard = function (combination_wizard_no) {
    if (combination_wizards.exist(combination_wizard_no)) {
        this.design_situation.combination_wizard = combination_wizards[combination_wizard_no];
    }
    else {
        ASSERT(false, "Combination wizard no. " + combination_wizard_no + " doesn't exist");
    }
};


/**
 * Sets relationship between load cases
 * @param {Object} relationship_between_load_cases_no   Relationship between load cases number
 */
DesignSituation.prototype.SetConsiderInclusiveExclusiveLoadCases = function (relationship_between_load_cases_no,
    enable) {
    if (relationship_between_load_cases.exist(relationship_between_load_cases_no)) {
        this.design_situation.consider_inclusive_exclusive_load_cases = true;
        this.design_situation.relationship_between_load_cases = relationship_between_load_cases[relationship_between_load_cases_no];
    }
    else {
        ASSERT(false, "Relationship between load cases no. " + relationship_between_load_cases_no + " doesn't exist");
    }
};


/**
 * Enables/disables design situation
 * @param {Boolean} active  Design situation is enabled or disabled, can be undefined (true as default)
 */
DesignSituation.prototype.SetActive = function(active) {
    if (typeof active === "undefined") {
        active = true;
    }
    this.design_situation.active = active;
};


/**
 * Shows list of all available design situation types
 */
function get_design_situation_types () {
    console.log(Object.keys(design_situation_types));
};


/**
 * Creates base design situation (private)
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
    set_comment_and_parameters(design_situation, comment, params);
    return design_situation;
}

const design_situation_types = {
    "DESIGN_SITUATION_TYPE_EQU_PERMANENT_AND_TRANSIENT" : "ULS (EQU) - Permanent and transient (6122)",
    "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_ONE_STAR" : "ULS (STR/GEO) - Accidental (6145)",
    "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_FIRE" : "ULS (STR/GEO) - Accidental - Fire (6155)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC" : "SLS - Characteristic (6193)",
    "DESIGN_SITUATION_TYPE_SLS_FREQUENT" : "SLS - Frequent (6194)",
    "DESIGN_SITUATION_TYPE_SLS_QUASI_PERMANENT" : "SLS - Quasi-permanent (6195)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_QUASI_PERMANENT" : "SLS - Characteristic/Quasi-permanent (6200)",
    "DESIGN_SITUATION_TYPE_ULS_STR_GEO_PERMANENT_AND_TRANSIENT" : "ULS (STR/GEO) - Permanent and transient (6326)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_WITH_DIRECT_LOAD" : "SLS - Characteristic with direct load (6327)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_WIT" : "SLS - Characteristic with imposed deformation (6328)",
    "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_PSI_1_1" : "ULS (EQU) - Accidental - psi-1,1 (6993)",
    "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_PSI_2_1" : "ULS (EQU) - Accidental - psi-2,1 (6994)",
    "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_SNOW_PSI_1_1" : "ULS (EQU) - Accidental - Snow - psi-1,1 (6995)",
    "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_SNOW_PSI_2_1" : "ULS (EQU) - Accidental - Snow - psi-2,1 (6996)",
    "DESIGN_SITUATION_TYPE_EQU_SEISMIC" : "ULS (EQU) - Seismic (6997)",
    "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_TWO_STARS" : "ULS (EQU) - Accidental (6998)",
    "DESIGN_SITUATION_TYPE_TYPE_1_FUNDAMENTAL" : "ULS Type 1 - Fundamental (6999)",
    "DESIGN_SITUATION_TYPE_TYPE_1_ACCIDENTAL_PSI_1_1" : "ULS Type 1 - Accidental - psi-1,1 (7000)",
    "DESIGN_SITUATION_TYPE_TYPE_1_ACCIDENTAL_PSI_2_1" : "ULS Type 1 - Accidental - psi-2,1 (7001)",
    "DESIGN_SITUATION_TYPE_EQUILIBRIUM_FUNDAMENTAL" : "ULS Static Equilibrium - Fundamental (7002)",
    "DESIGN_SITUATION_TYPE_EQUILIBRIUM_ACCIDENTAL" : "ULS Static Equilibrium - Accidental (7003)",
    "DESIGN_SITUATION_TYPE_EQUILIBRIUM_SEISMIC" : "ULS Static Equilibrium - Seismic (7004)",
    "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_FIRE" : "ULS (EQU) - Accidental - Fire (7005)",
    "DESIGN_SITUATION_TYPE_EQU_PERMANENT_TRANSIENT_BEARINGS_EXCHANGE" : "ULS (EQU) - Permanent/transient - bearings exchange (7006)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10" : "ULS (STR/GEO) - Permanent and transient - Eq. 6.10 (7007)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10A_6_10B" : "ULS (STR/GEO) - Permanent and transient - Eq. 6.10a and 6.10b (7008)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10AMOD_6_10B" : "ULS (STR/GEO) - Permanent and transient - Eq. 6.10a-mod and 6.10b (7009)",
    "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_PSI_1_1" : "ULS (STR/GEO) - Accidental - psi-1,1 (7010)",
    "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_PSI_2_1" : "ULS (STR/GEO) - Accidental - psi-2,1 (7011)",
    "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_SNOW_PSI_1_1" : "ULS (STR/GEO) - Accidental - Snow - psi-1,1 (7012)",
    "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_SNOW_PSI_2_1" : "ULS (STR/GEO) - Accidental - Snow - psi-2,1 (7013)",
    "DESIGN_SITUATION_TYPE_STR_SEISMIC" : "ULS (STR/GEO) - Seismic (7014)",
    "DESIGN_SITUATION_TYPE_TYPE_2_FUNDAMENTAL" : "ULS Type 2 - Fundamental (7016)",
    "DESIGN_SITUATION_TYPE_TYPE_2_ACCIDENTAL_PSI_1_1" : "ULS Type 2 - Accidental - psi-1,1 (7017)",
    "DESIGN_SITUATION_TYPE_TYPE_2_ACCIDENTAL_PSI_2_1" : "ULS Type 2 - Accidental - psi-2,1 (7018)",
    "DESIGN_SITUATION_TYPE_FAILURE_OF_STRUCTURE_FUNDAMENTAL" : "ULS Failure of Structure - Fundamental (7019)",
    "DESIGN_SITUATION_TYPE_FAILURE_OF_STRUCTURE_ACCIDENTAL" : "ULS Failure of Structure - Accidental (7020)",
    "DESIGN_SITUATION_TYPE_FAILURE_OF_STRUCTURE_SEISMIC" : "ULS Failure of Structure - Seismic (7021)",
    "DESIGN_SITUATION_TYPE_ULS_NORMAL" : "ULS - Normal (7022)",
    "DESIGN_SITUATION_TYPE_ULS_SPECIAL" : "ULS - Special (7023)",
    "DESIGN_SITUATION_TYPE_ULS_EXCEPTIONAL" : "ULS - Exceptional (7024)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_TRANSIENT_BEARINGS_EXCHANGE" : "ULS (STR/GEO) - Permanent/transient - bearings exchange (7026)",
    "DESIGN_SITUATION_TYPE_TYPE_3_FUNDAMENTAL" : "ULS Type 3 - Fundamental (7027)",
    "DESIGN_SITUATION_TYPE_TYPE_3_ACCIDENTAL_PSI_1_1" : "ULS Type 3 - Accidental - psi-1,1 (7028)",
    "DESIGN_SITUATION_TYPE_TYPE_3_ACCIDENTAL_PSI_2_1" : "ULS Type 3 - Accidental - psi-2,1 (7029)",
    "DESIGN_SITUATION_TYPE_GEO_PERMANENT_TRANSIENT" : "ULS (GEO) - Permanent and transient (7030)",
    "DESIGN_SITUATION_TYPE_GEO_ACCIDENTAL_PSI_1_1" : "ULS (GEO) - Accidental - psi-1,1 (7031)",
    "DESIGN_SITUATION_TYPE_GEO_ACCIDENTAL_PSI_2_1" : "ULS (GEO) - Accidental - psi-2,1 (7032)",
    "DESIGN_SITUATION_TYPE_GEO_SEISMIC" : "ULS (GEO) - Seismic (7033)",
    "DESIGN_SITUATION_TYPE_GEO_1_1_PERMANENT_AND_TRANSIENT_6_10" : "ULS (STR/GEO-1-1) Approach 1 - Permanent/transient - Eq. 6.10 (7034)",
    "DESIGN_SITUATION_TYPE_GEO_1_1_PERMANENT_AND_TRANSIENT_6_10A_AND_6_10B" : "ULS (STR/GEO-1-1) Approach 1 - Permanent/transient - Eq. 6.10a and 6.10b (7035)",
    "DESIGN_SITUATION_TYPE_GEO_1_1_ACCIDENTAL_PSI_1_1" : "ULS (STR/GEO-1-1) Approach 1 - Accidental - psi-1,1 (7036)",
    "DESIGN_SITUATION_TYPE_GEO_1_1_ACCIDENTAL_PSI_2_1" : "ULS (STR/GEO-1-1) Approach 1 - Accidental - psi-2,1 (7037)",
    "DESIGN_SITUATION_TYPE_GEO_1_1_SEISMIC" : "ULS (STR/GEO-1-1) Approach 1 - Seismic (7038)",
    "DESIGN_SITUATION_TYPE_GEO_1_2_PERMANENT_AND_TRANSIENT_6_10" : "ULS (STR/GEO-1-2) Approach 1 - Permanent/transient - Eq. 6.10 (7039)",
    "DESIGN_SITUATION_TYPE_GEO_1_2_PERMANENT_AND_TRANSIENT_6_10A_AND_6_10B" : "ULS (STR/GEO-1-2) Approach 1 - Permanent/transient - Eq. 6.10a and 6.10b (7040)",
    "DESIGN_SITUATION_TYPE_GEO_1_2_ACCIDENTAL_PSI_1_1" : "ULS (STR/GEO-1-2) Approach 1 - Accidental - psi-1,1 (7041)",
    "DESIGN_SITUATION_TYPE_GEO_1_2_ACCIDENTAL_PSI_2_1" : "ULS (STR/GEO-1-2) Approach 1 - Accidental - psi-2,1 (7042)",
    "DESIGN_SITUATION_TYPE_GEO_1_2_SEISMIC" : "ULS (STR/GEO-1-2) Approach 1 - Seismic (7043)",
    "DESIGN_SITUATION_TYPE_GEO_2_PERMANENT_AND_TRANSIENT_6_10" : "ULS (STR/GEO-2) Approach 2 - Permanent/transient - Eq. 6.10 (7044)",
    "DESIGN_SITUATION_TYPE_GEO_2_PERMANENT_AND_TRANSIENT_6_10A_AND_6_10B" : "ULS (STR/GEO-2) Approach 2 - Permanent/transient - Eq. 6.10a and 6.10b (7045)",
    "DESIGN_SITUATION_TYPE_GEO_2_ACCIDENTAL_PSI_1_1" : "ULS (STR/GEO-2) Approach 2 - Accidental - psi-1,1 (7046)",
    "DESIGN_SITUATION_TYPE_GEO_2_ACCIDENTAL_PSI_2_1" : "ULS (STR/GEO-2) Approach 2 - Accidental - psi-2,1 (7047)",
    "DESIGN_SITUATION_TYPE_GEO_2_SEISMIC" : "ULS (STR/GEO-2) Approach 2 - Seismic (7048)",
    "DESIGN_SITUATION_TYPE_GEO_3_PERMANENT_AND_TRANSIENT_6_10" : "ULS (STR/GEO-3) Approach 3 - Permanent/transient - Eq. 6.10 (7049)",
    "DESIGN_SITUATION_TYPE_GEO_3_PERMANENT_AND_TRANSIENT_6_10A_AND_6_10B" : "ULS (STR/GEO-3) Approach 3 - Permanent/transient - Eq. 6.10a and 6.10b (7050)",
    "DESIGN_SITUATION_TYPE_GEO_3_ACCIDENTAL_PSI_1_1" : "ULS (STR/GEO-3) Approach 3 - Accidental - psi-1,1 (7051)",
    "DESIGN_SITUATION_TYPE_GEO_3_ACCIDENTAL_PSI_2_1" : "ULS (STR/GEO-3) Approach 3 - Accidental - psi-2,1 (7052)",
    "DESIGN_SITUATION_TYPE_GEO_3_SEISMIC" : "ULS (STR/GEO-3) Approach 3- Seismic (7053)",
    "DESIGN_SITUATION_TYPE_UPL_PERMANENT_AND_TRANSIENT" : "ULS (UPL) - Permanent/transient (7054)",
    "DESIGN_SITUATION_TYPE_UPL_ACCIDENTAL_PSI_1_1" : "ULS (UPL) - Accidental - psi-1,1 (7055)",
    "DESIGN_SITUATION_TYPE_UPL_ACCIDENTAL_PSI_2_1" : "ULS (UPL) - Accidental - psi-2,1 (7056)",
    "DESIGN_SITUATION_TYPE_UPL_SEISMIC" : "ULS (UPL) - Seismic (7057)",
    "DESIGN_SITUATION_TYPE_HYD_PERMANENT_AND_TRANSIENT" : "ULS (HYD) - Permanent/transient (7058)",
    "DESIGN_SITUATION_TYPE_HYD_ACCIDENTAL_PSI_1_1" : "ULS (HYD) - Accidental - psi-1,1 (7059)",
    "DESIGN_SITUATION_TYPE_HYD_ACCIDENTAL_PSI_2_1" : "ULS (HYD) - Accidental - psi-2,1 (7060)",
    "DESIGN_SITUATION_TYPE_HYD_SEISMIC" : "ULS (HYD) - Seismic (7061)",
    "DESIGN_SITUATION_TYPE_FATIGUE" : "ULS (FAT) - Fatigue (7062)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_1" : "SLS - Characteristic 1 (7066)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_2" : "SLS - Characteristic 2 (7067)",
    "DESIGN_SITUATION_TYPE_SLS_EARTHQUAKE" : "SLS - Earthquake (7068)",
    "DESIGN_SITUATION_TYPE_SLS_NON_FREQUENT" : "SLS - Non-frequent (7069)",
    "DESIGN_SITUATION_TYPE_SLS_RARE" : "SLS - Rare (7071)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_BEARINGS_EXCHANGE" : "SLS - Characteristic - bearings exchange (7072)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_INTEGRITY" : "SLS - Characteristic - integrity (7073)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_COMFORT" : "SLS - Characteristic - comfort (7074)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD" : "Section 2.3 (LRFD) (7075)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_1" : "Section 2.3 (LRFD), 1. (7076)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_2" : "Section 2.3 (LRFD), 2. (7077)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_3" : "Section 2.3 (LRFD), 3. (7078)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_4" : "Section 2.3 (LRFD), 4. (7079)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_5" : "Section 2.3 (LRFD), 5. (7080)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_6" : "Section 2.3 (LRFD), 6. (7081)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7" : "Section 2.3 (LRFD), 7. (7082)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD" : "Section 2.4 (ASD), (7083)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_1" : "Section 2.4 (ASD), 1. (7084)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_2" : "Section 2.4 (ASD), 2. (7085)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_3" : "Section 2.4 (ASD), 3. (7086)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_4" : "Section 2.4 (ASD), 4. (7087)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_5" : "Section 2.4 (ASD), 5. (7088)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_6" : "Section 2.4 (ASD), 6. (7089)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7" : "Section 2.4 (ASD), 7. (7090)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_8" : "Section 2.4 (ASD), 8. (7091)",
    "DESIGN_SITUATION_TYPE_CLAUSE_7_2_2" : "Clause 7.2.2 (without Earthquake) (7092)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9" : "Chapter 9, Strength and Serviceability Requirements (7096)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_1" : "Chapter 9, Strength and Serviceability Requirements (9-1) (7097)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_2" : "Chapter 9, Strength and Serviceability Requirements (9-2) (7098)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_3" : "Chapter 9, Strength and Serviceability Requirements (9-3) (7099)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_4" : "Chapter 9, Strength and Serviceability Requirements (9-4) (7100)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_5" : "Chapter 9, Strength and Serviceability Requirements (9-5) (7101)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_6" : "Chapter 9, Strength and Serviceability Requirements (9-6) (7102)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_7" : "Chapter 9, Strength and Serviceability Requirements (9-7) (7103)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C" : "Appendix C, Alternative Load and Strength Reduction Factors (7104)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_1" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-1) (7105)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_2" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-2) (7106)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_3" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-3) (7107)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_4" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-4) (7108)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_5" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-5) (7109)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_6" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-6) (7110)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH" : "Limit State of Strength (7111)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_1" : "Limit State of Strength, DL+LL+CL (7112)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_2" : "Limit State of Strength, DL+LL+CL+WL/EL (0.6WL/0.6EL) (7113)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_3" : "Limit State of Strength, DL+LL+CL+WL/EL (1.2WL/1.2EL) (7114)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_4" : "Limit State of Strength, DL+WL/EL (7115)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_5" : "Limit State of Strength, DL+ER (7116)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_6" : "Limit State of Strength, DL+LL+AL (7117)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY" : "Limit State of Serviceability (7118)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_1" : "Limit State of Serviceability, DL+LL+CL (7119)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_2" : "Limit State of Serviceability, DL+LL+CL+WL/EL (7120)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_3" : "Limit State of Serviceability, DL+WL/EL (7121)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY" : "Strength and Stability Limit States (7122)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY_1" : "Strength and Stability Limit States 1 (7123)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY_2" : "Strength and Stability Limit States 2 (7124)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY_3" : "Strength and Stability Limit States 3 (7125)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY_4" : "Strength and Stability Limit States 4 (7126)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATES" : "Serviceability Limit States (7127)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATES_1" : "Serviceability Limit States, 1.0G+1.0Q (7128)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATES_2" : "Serviceability Limit States, 1.0G+1.0W (7129)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATES_3" : "Serviceability Limit States, 1.0G+0.8Q+0.8W (7130)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_CASE" : "Ultimate Limit State (7131)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_CASE_1" : "Ultimate Limit State, Case 1 (7132)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_CASE_2" : "Ultimate Limit State, Case 2 (7133)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_CASE_3" : "Ultimate Limit State, Case 3 (7134)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_CASE_4" : "Ultimate Limit State, Case 4 (7135)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_STRENGTH_CASE_5" : "Ultimate Limit State, Case 5 (7136)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_CASE" : "Limit State of Serviceability (7137)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10" : "Section 2.3 (LRFD) (7138)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_1" : "Section 2.3 (LRFD), 1. (7139)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_2" : "Section 2.3 (LRFD), 2., (7140)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_3" : "Section 2.3 (LRFD), 3., (7141)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_4" : "Section 2.3 (LRFD), 4. (7142)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_5" : "Section 2.3 (LRFD), 5. (7143)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_6" : "Section 2.3 (LRFD), 6. (7144)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_7" : "Section 2.3 (LRFD), 7. (7145)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10" : "Section 2.4 (ASD) (7146)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_1" : "Section 2.4 (ASD), 1. (7147)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_2" : "Section 2.4 (ASD), 2. (7148)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_3" : "Section 2.4 (ASD), 3. (7149)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_4" : "Section 2.4 (ASD), 4. (7150)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_5" : "Section 2.4 (ASD), 5. (7151)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_6A" : "Section 2.4 (ASD), 6a. (7152)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_6B" : "Section 2.4 (ASD), 6b. (7153)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_7" : "Section 2.4 (ASD), 7. (7154)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_8" : "Section 2.4 (ASD), 8. (7155)",
    "DESIGN_SITUATION_TYPE_SECTION_2_5_EXTRAORDINARY_7_10" : "Section 2.5 (Extraordinary) (7156)",
    "DESIGN_SITUATION_TYPE_SECTION_2_5_EXTRAORDINARY_7_10_1" : "Section 2.5 (Extraordinary), 1. (7157)",
    "DESIGN_SITUATION_TYPE_SECTION_2_5_EXTRAORDINARY_7_10_2" : "Section 2.5 (Extraordinary), 2. (7158)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5" : "Chapter 5 - Loads (7159)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_A" : "Chapter 5 - Loads, (5.3.1a) (7160)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_B" : "Chapter 5 - Loads, (5.3.1b) (7161)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_C" : "Chapter 5 - Loads, (5.3.1c) (7162)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_D" : "Chapter 5 - Loads, (5.3.1d) (7163)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_E" : "Chapter 5 - Loads, (5.3.1e) (7164)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_F" : "Chapter 5 - Loads, (5.3.1f) (7165)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_G" : "Chapter 5 - Loads, (5.3.1g) (7166)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD" : "Section 1605.2 (LRFD) (7167)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_1" : "Section 1605.2 (LRFD), Eq. 16-1 (7168)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_2" : "Section 1605.2 (LRFD), Eq. 16-2 (7169)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_3" : "Section 1605.2 (LRFD), Eq. 16-3 (7170)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_4" : "Section 1605.2 (LRFD), Eq. 16-4 (7171)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_5" : "Section 1605.2 (LRFD), Eq. 16-5 (7172)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_6" : "Section 1605.2 (LRFD), Eq. 16-6 (7173)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_2_LRFD_16_7" : "Section 1605.2 (LRFD), Eq. 16-7 (7174)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD" : "Section 1605.3.1 (ASD) (7175)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_8" : "Section 1605.3.1 (ASD), Eq. 16-8 (7176)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_9" : "Section 1605.3.1 (ASD), Eq. 16-9 (7177)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_10" : "Section 1605.3.1 (ASD), Eq. 16-10 (7178)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_11" : "Section 1605.3.1 (ASD), Eq. 16-11 (7179)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_12" : "Section 1605.3.1 (ASD), Eq. 16-12 (7180)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_13" : "Section 1605.3.1 (ASD), Eq. 16-13 (7181)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_14" : "Section 1605.3.1 (ASD), Eq. 16-14 (7182)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_15" : "Section 1605.3.1 (ASD), Eq. 16-15 (7183)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_1_ASD_16_16" : "Section 1605.3.1 (ASD), Eq. 16-16 (7184)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD" : "Section 1605.3.2 (ASD) (7185)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD_16_17" : "Section 1605.3.2 (ASD), Eq. 16-17 (7186)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD_16_18" : "Section 1605.3.2 (ASD), Eq. 16-18 (7187)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD_16_19" : "Section 1605.3.2 (ASD), Eq. 16-19 (7188)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD_16_20" : "Section 1605.3.2 (ASD), Eq. 16-20 (7189)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD_16_21" : "Section 1605.3.2 (ASD), Eq. 16-21 (7190)",
    "DESIGN_SITUATION_TYPE_SECTION_1605_3_2_ASD_16_22" : "Section 1605.3.2 (ASD), Eq. 16-22 (7191)",
    "DESIGN_SITUATION_TYPE_SECTION_1604_3_SERVICEABILITY" : "Section 1604.3 (Serviceability) (7192)",
    "DESIGN_SITUATION_TYPE_SECTION_1604_3_SERVICEABILITY_L" : "Section 1604.3 (Serviceability), L (7193)",
    "DESIGN_SITUATION_TYPE_SECTION_1604_3_SERVICEABILITY_S_W" : "Section 1604.3 (Serviceability), S or W (7194)",
    "DESIGN_SITUATION_TYPE_SECTION_1604_3_SERVICEABILITY_D_L" : "Section 1604.3 (Serviceability), D + L (7195)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_16" : "Section 2.3 (LRFD) (7196)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_16_5" : "Section 2.3 (LRFD), 5. (7197)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_16_6" : "Section 2.3 (LRFD), 6. (7198)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_16_7" : "Section 2.3 (LRFD), 7. (7199)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16" : "Section 2.4 (ASD) (7200)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_5" : "Section 2.4 (ASD), 5. (7201)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_6" : "Section 2.4 (ASD), 6. (7202)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_8" : "Section 2.4 (ASD), 8. (7203)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_9" : "Section 2.4 (ASD), 9. (7204)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_10" : "Section 2.4 (ASD), 10. (7205)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_1_STR_INT_7_16" : "Section 2.6.1 (Structural integrity) (7206)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_1_STR_INT_7_16_1" : "Section 2.6.1 (Structural integrity), 1. (7207)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_1_STR_INT_7_16_2" : "Section 2.6.1 (Structural integrity), 2. (7208)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_2_STR_INT_7_16" : "Section 2.6.2 (Structural integrity) (7209)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_2_STR_INT_7_16_1" : "Section 2.6.2 (Structural integrity), 1. (7210)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_2_STR_INT_7_16_2" : "Section 2.6.2 (Structural integrity), 2. (7211)",
    "DESIGN_SITUATION_TYPE_SECTION_2_6_2_STR_INT_7_16_3" : "Section 2.6.2 (Structural integrity), 3. (7212)",
    "DESIGN_SITUATION_TYPE_CLAUSE_7_2_6_A" : "Clause 7.2.6 (with Earthquake), (a) (7213)",
    "DESIGN_SITUATION_TYPE_CLAUSE_7_2_6_B" : "Clause 7.2.6 (with Earthquake), (b) (7214)",
    "DESIGN_SITUATION_TYPE_CLAUSE_7_2_6_C" : "Clause 7.2.6 (with Earthquake), (c) (7215)",
    "DESIGN_SITUATION_TYPE_SLS_QUASI_PERMANENT_1" : "SLS - Quasi-permanent 1 (7218)",
    "DESIGN_SITUATION_TYPE_SLS_QUASI_PERMANENT_2" : "SLS - Quasi-permanent 2 (7219)",
    "DESIGN_SITUATION_TYPE_SLS_VIBRATION" : "SLS - Vibration (7220)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_08" : "Chapter 9, Strength and Serviceability Requirements (7221)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_1_08" : "Chapter 9, Strength and Serviceability Requirements (9-1) (7222)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_2_08" : "Chapter 9, Strength and Serviceability Requirements (9-2) (7223)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_3_08" : "Chapter 9, Strength and Serviceability Requirements (9-3) (7224)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_4_08" : "Chapter 9, Strength and Serviceability Requirements (9-4) (7225)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_5_08" : "Chapter 9, Strength and Serviceability Requirements (9-5) (7226)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_6_08" : "Chapter 9, Strength and Serviceability Requirements (9-6) (7227)",
    "DESIGN_SITUATION_TYPE_CHAPTER_9_7_08" : "Chapter 9, Strength and Serviceability Requirements (9-7) (7228)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_08" : "Appendix C, Alternative Load and Strength Reduction Factors (7229)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_1_08" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-1) (7230)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_2_08" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-2) (7231)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_3_08" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-3) (7232)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_4_08" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-4) (7233)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_5_08" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-5) (7234)",
    "DESIGN_SITUATION_TYPE_APPENDIX_C_6_08" : "Appendix C, Alternative Load and Strength Reduction Factors (C.9-6) (7235)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_CASE_1" : "Limit State of Serviceability, Case 1 (7238)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_CASE_2" : "Limit State of Serviceability, Case 2 (7239)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_CASE_3" : "Limit State of Serviceability, Case 3 (7240)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_FIRE" : "Limit State of Fire (7241)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_LIVE_LOAD" : "Limit State of Serviceability - Live Load (7242)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_PERMANENT_LOAD" : "Limit State of Serviceability - Permanent Load (7243)",
    "DESIGN_SITUATION_TYPE_LIMIT_STATE_OF_SERVICEABILITY_TOTAL_LOAD" : "Limit State of Serviceability - Total Load (7244)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_SANS" : "ULS (STR) - Permanent/transient (7245)",
    "DESIGN_SITUATION_TYPE_STR_P_PERMANENT_AND_TRANSIENT_SANS" : "ULS (STR-P) - Permanent/transient (7246)",
    "DESIGN_SITUATION_TYPE_GEO_PERMANENT_AND_TRANSIENT_SANS" : "ULS (GEO) - Permanent/transient (7247)",
    "DESIGN_SITUATION_TYPE_ACCIDENTAL_SANS" : "ULS (ACC) - Accidental (7248)",
    "DESIGN_SITUATION_TYPE_IRREVERSIBLE_SANS" : "SLS - Irreversible (7249)",
    "DESIGN_SITUATION_TYPE_REVERSIBLE_SANS" : "SLS - Reversible (7250)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE" : "Ultimate limit state (7251)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE_1" : "Ultimate limit state, Case 1 (7253)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE_2" : "Ultimate limit state, Case 2 (7254)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE_3" : "Ultimate limit state, Case 3 (7255)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE_4" : "Ultimate limit state, Case 4 (7257)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE_5" : "Ultimate limit state, Case 5 (7258)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE" : "Serviceability limit state (7259)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_1" : "Serviceability limit state, Case 1 (7260)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_2" : "Serviceability limit state, Case 2 (7261)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_3" : "Serviceability limit state, Case 3 (7262)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_4" : "Serviceability limit state, Case 4 (7263)",
    "DESIGN_SITUATION_TYPE_FUNDAMENTAL_PERMANENT" : "ULS Fundamental - permanent (7265)",
    "DESIGN_SITUATION_TYPE_ACCIDENTAL" : "ULS Accidental (7266)",
    "DESIGN_SITUATION_TYPE_FUNDAMENTAL_VARIABLE" : "ULS Fundamental - variable (7267)",
    "DESIGN_SITUATION_TYPE_SLS_FREQUENT_FUNCTIONALITY_COMFORT" : "SLS - Frequent - Functionality/Comfort (7268)",
    "DESIGN_SITUATION_TYPE_STRENGTH_LIMIT_STATE_AISC360_LRFD" : "Strength limit state (LRFD) (7269)",
    "DESIGN_SITUATION_TYPE_STRENGTH_LIMIT_STATE_AISC360_ASD" : "Strength limit state (ASD) (7270)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_AISC360" : "Serviceability limit state (7271)",
    "DESIGN_SITUATION_TYPE_FIRE_LIMIT_STATE_AISC360" : "Fire limit state (7272)",
    "DESIGN_SITUATION_TYPE_SEISMIC_MASS" : "Seismic/Mass Combination - psi-E,i (7273)",
    "DESIGN_SITUATION_TYPE_EQU_PERMANENT_FUNDAMENTAL" : "ULS (EQU) - Fundamental (7274)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_FUNDAMENTAL" : "ULS (STR) - Fundamental (7275)",
    "DESIGN_SITUATION_TYPE_GEO_PERMANENT_FUNDAMENTAL" : "ULS (GEO) - Fundamental (7276)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_NTC" : "SLS - Characteristic (7277)",
    "DESIGN_SITUATION_TYPE_SLS_FREQUENT_NTC" : "SLS - Frequent (7278)",
    "DESIGN_SITUATION_TYPE_SLS_QUASI_PERMANENT_NTC" : "SLS - Quasi-permanent (7279)",
    "DESIGN_SITUATION_TYPE_E_SEISMIC" : "E - Seismic (7280)",
    "DESIGN_SITUATION_TYPE_A_ACCIDENTAL" : "A - Accidental (7281)",
    "DESIGN_SITUATION_TYPE_SEISMIC_MASS_NTC" : "Seismic/Mass Combination (7282)",
    "DESIGN_SITUATION_TYPE_SECTION_1604_3_SERVICEABILITY_L_OR_LR" : "Section 1604.3 (Serviceability), L or Lr (7284)",
    "DESIGN_SITUATION_TYPE_EQU_EXCEPTIONAL_SNOW" : "ULS (EQU) - Exceptional – Snow (7285)",
    "DESIGN_SITUATION_TYPE_STR_EXCEPTIONAL_SNOW" : "ULS (STR/GEO) - Exceptional – Snow (7286)",
    "DESIGN_SITUATION_TYPE_ULS_LOAD_CASE_1" : "ULS - Load case 1 (7287)",
    "DESIGN_SITUATION_TYPE_ULS_LOAD_CASE_2" : "ULS - Load case 2 (7288)",
    "DESIGN_SITUATION_TYPE_ULS_LOAD_CASE_3" : "ULS - Load case 3 (7289)",
    "DESIGN_SITUATION_TYPE_ULS_LOAD_CASE_4" : "ULS - Load case 4 (7290)",
    "DESIGN_SITUATION_TYPE_SLS_SCAFFOLDING" : "SLS - Serviceability (7291)",
    "DESIGN_SITUATION_TYPE_EQU_LOAD_CASE_1" : "EQU - Load case 1 (7292)",
    "DESIGN_SITUATION_TYPE_EQU_LOAD_CASE_2" : "EQU - Load case 2 (7293)",
    "DESIGN_SITUATION_TYPE_EQU_LOAD_CASE_3" : "EQU - Load case 3 (7294)",
    "DESIGN_SITUATION_TYPE_EQU_LOAD_CASE_4" : "EQU - Load case 4 (7295)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATES_VIBRATION" : "Serviceability Limit States - Vibration (7296)",
    "DESIGN_SITUATION_TYPE_EARTHQUAKE_LIMIT_STATE_AISC341_LRFD" : "Earthquake limit state (LRFD) (7297)",
    "DESIGN_SITUATION_TYPE_EARTHQUAKE_LIMIT_STATE_AISC341_ASD" : "Earthquake limit state (ASD) (7298)",
    "DESIGN_SITUATION_TYPE_EARTHQUAKE_LIMIT_STATE_AISC341_LRFD_OVERSTRENGTH" : "Earthquake limit state (LRFD) - overstrength (7299)",
    "DESIGN_SITUATION_TYPE_EARTHQUAKE_LIMIT_STATE_AISC341_ASD_OVERSTRENGTH" : "Earthquake limit state (ASD) - overstrength (7300)",
    "DESIGN_SITUATION_TYPE_SLS_PERMANENT_AND_VARIABLE_GB50" : "SLS - Permanent and variable (7301)",
    "DESIGN_SITUATION_TYPE_SLS_VARIABLE_GB50" : "SLS - Variable (7302)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_16_6_OVERSTRENGTH" : "Section 2.3 (LRFD), 6. - including overstrength (7303)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_16_7_OVERSTRENGTH" : "Section 2.3 (LRFD), 7. - including overstrength (7304)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_8_OVERSTRENGTH" : "Section 2.4 (ASD), 8. - including overstrength (7305)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_9_OVERSTRENGTH" : "Section 2.4 (ASD), 9. - including overstrength (7306)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_16_10_OVERSTRENGTH" : "Section 2.4 (ASD), 10. - including overstrength (7307)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_5_OVERSTRENGTH" : "Section 2.3 (LRFD), 5. - including overstrength (7308)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_10_7_OVERSTRENGTH" : "Section 2.3 (LRFD), 7. - including overstrength (7309)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_5_OVERSTRENGTH" : "Section 2.4 (ASD), 5. - including overstrength (7310)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_6B_OVERSTRENGTH" : "Section 2.4 (ASD), 6b. - including overstrength (7311)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_7_10_8_OVERSTRENGTH" : "Section 2.4 (ASD), 8. - including overstrength (7312)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_5_OVERSTRENGTH" : "Section 2.3 (LRFD), 5. - including overstrength (7313)",
    "DESIGN_SITUATION_TYPE_SECTION_2_3_LRFD_7_OVERSTRENGTH" : "Section 2.3 (LRFD), 7. - including overstrength (7314)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_5_OVERSTRENGTH" : "Section 2.4 (ASD), 5. - including overstrength (7315)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_6_OVERSTRENGTH" : "Section 2.4 (ASD), 6. - including overstrength (7316)",
    "DESIGN_SITUATION_TYPE_SECTION_2_4_ASD_8_OVERSTRENGTH" : "Section 2.4 (ASD), 8. - including overstrength (7317)",
    "DESIGN_SITUATION_TYPE_STRENGTH_LIMIT_STATE_ADM_LRFD" : "Strength limit state (LRFD) (7318)",
    "DESIGN_SITUATION_TYPE_STRENGTH_LIMIT_STATE_ADM_ASD" : "Strength limit state (ASD) (7319)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_ADM" : "Serviceability limit state (7320)",
    "DESIGN_SITUATION_TYPE_ULS_SNIP_BASIC" : "ULS Basic (7321)",
    "DESIGN_SITUATION_TYPE_ULS_SNIP_SPECIAL" : "ULS Special (7322)",
    "DESIGN_SITUATION_TYPE_SLS_SNIP" : "SLS Serviceability limit state (7323)",
    "DESIGN_SITUATION_TYPE_STR_STRENGTH_DESIGN_LRFD" : "Strength design (LRFD) (7324)",
    "DESIGN_SITUATION_TYPE_SER_SERVICEABILITY_DESIGN" : "Serviceability design (7325)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY_LIMIT_STATES" : "Strength and stability limit states (7326)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_SHORT_TERM_EFFECT" : "Serviceability limit state - Short term effect (7327)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_LONG_TERM_EFFECT" : "Serviceability limit state - Long term effect (7328)",
    "DESIGN_SITUATION_TYPE_SEI_SEISMIC_DESIGN_LRFD" : "Seismic design (LRFD) (7329)",
    "DESIGN_SITUATION_TYPE_SEIO_SEISMIC_DESIGN_OVERSTRENGTH_LRFD" : "Seismic design - overstrength (LRFD) (7330)",
    "DESIGN_SITUATION_TYPE_ULS_CSA_A23_3" : "Ultimate limit state (7331)",
    "DESIGN_SITUATION_TYPE_SLS_CSA_A23_3" : "Serviceability limit state (7332)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P" : "Chapter 5 - Loads (7333)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_A" : "Chapter 5 - Loads, (5.3.1a) (7334)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_B" : "Chapter 5 - Loads, (5.3.1b) (7335)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_C" : "Chapter 5 - Loads, (5.3.1c) (7336)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_D" : "Chapter 5 - Loads, (5.3.1d) (7337)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_E" : "Chapter 5 - Loads, (5.3.1e) (7338)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_F" : "Chapter 5 - Loads, (5.3.1f) (7339)",
    "DESIGN_SITUATION_TYPE_CHAPTER_5_P_G" : "Chapter 5 - Loads, (5.3.1g) (7340)",
    "DESIGN_SITUATION_TYPE_ULS_SP63_13330" : "Ultimate limit state (7341)",
    "DESIGN_SITUATION_TYPE_SLS_SP63_13330" : "Serviceability limit state (7342)",
    "DESIGN_SITUATION_TYPE_SLS_SP63_13330_SHORT_TERM_EFFECT" : "Serviceability limit state - Short term effect (7343)",
    "DESIGN_SITUATION_TYPE_SLS_SP63_13330_LONG_TERM_EFFECT" : "Serviceability limit state - Long term effect (7344)",
    "DESIGN_SITUATION_TYPE_ULS_ONE_VARIABLE_ACTION_STORAGE" : "ULS - One variable action (7345)",
    "DESIGN_SITUATION_TYPE_ULS_ALL_VARIABLE_ACTIONS_STORAGE" : "ULS - All variable actions (7346)",
    "DESIGN_SITUATION_TYPE_ULS_ACCIDENTAL_STORAGE" : "ULS - Accidental (7347)",
    "DESIGN_SITUATION_TYPE_SLS_ONE_VARIABLE_ACTION_STORAGE" : "SLS - One variable action (7348)",
    "DESIGN_SITUATION_TYPE_SLS_ALL_VARIABLE_ACTIONS_STORAGE" : "SLS - All variable actions (7349)",
    "DESIGN_SITUATION_TYPE_EARTHQUAKE_LIMIT_STATE_CSA_S16" : "Earthquake limit state (7350)",
    "DESIGN_SITUATION_TYPE_SECTION_1604_3_SERVICEABILITY_KCR_D_L" : "Section 1604.3 (Serviceability), Kcr*D + L (7351)",
    "DESIGN_SITUATION_TYPE_ULS_FUNDAMENTAL_GB_50068" : "ULS Fundamental (7352)",
    "DESIGN_SITUATION_TYPE_ULS_ACCIDENTAL_GB_50068" : "ULS Accidental (7353)",
    "DESIGN_SITUATION_TYPE_ULS_FUNDAMENTAL_EARTHQUAKE_GB_50011" : "ULS - Fundamental combination for earthquake (7354)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_GB_50011" : "SLS - Characteristic combination for earthquake (7355)",
    "DESIGN_SITUATION_TYPE_EFFECTIVE_SEISMIC_WEIGHT" : "Effective Seismic Weight (7356)",
    "DESIGN_SITUATION_TYPE_SEISMIC_WEIGHT_IS" : "Seismic Weight (7357)",
    "DESIGN_SITUATION_TYPE_FIRE_LIMIT_STATE_NDS" : "Fire limit state (7361)",
    "DESIGN_SITUATION_TYPE_SLS_CHARACTERISTIC_BASE" : "SLS - Characteristic base (7362)",
    "DESIGN_SITUATION_TYPE_SLS_FREQUENT_BASE" : "SLS - Frequent base (7363)",
    "DESIGN_SITUATION_TYPE_SLS_QUASI_PERMANENT_BASE" : "SLS - Quasi-permanent base (7364)",
    "DESIGN_SITUATION_TYPE_ULS_STABILITY_AS_NZS" : "ULS - Stability (7365)",
    "DESIGN_SITUATION_TYPE_STABILITY_I_NZS" : "Stability (i) - permanent action only (7366)",
    "DESIGN_SITUATION_TYPE_STABILITY_II_NZS" : "Stability (ii) - permanent and imposed action (7367)",
    "DESIGN_SITUATION_TYPE_STABILITY_IV_NZS" : "Stability (iv) - permanent, wind and imposed action (7368)",
    "DESIGN_SITUATION_TYPE_STABILITY_V_NZS" : "Stability (v) - permanent, earthquake and imposed action (7369)",
    "DESIGN_SITUATION_TYPE_STABILITY_VI_NZS" : "Stability (vi) - permanent, actions given in Clause 4.2.3 and imposed (7370)",
    "DESIGN_SITUATION_TYPE_ULS_STRENGTH_AS_NZS" : "ULS - Strength (7371)",
    "DESIGN_SITUATION_TYPE_STRENGTH_A_NZS" : "Strength (a) - permanent action only (7372)",
    "DESIGN_SITUATION_TYPE_STRENGTH_B_NZS" : "Strength (b) - permanent and imposed action (7373)",
    "DESIGN_SITUATION_TYPE_STRENGTH_C_NZS" : "Strength (c) - permanent and long-term imposed action (7374)",
    "DESIGN_SITUATION_TYPE_STRENGTH_D_NZS" : "Strength (d) - permanent, wind and imposed action (7375)",
    "DESIGN_SITUATION_TYPE_STRENGTH_E_NZS" : "Strength (e) - permanent and wind reversal (7376)",
    "DESIGN_SITUATION_TYPE_STRENGTH_F_NZS" : "Strength (f) - permanent, earthquake and imposed action (7377)",
    "DESIGN_SITUATION_TYPE_STRENGTH_G_NZS" : "Strength (g) - permanent action, actions given in Clause 4.2.3 and imposed (7378)",
    "DESIGN_SITUATION_TYPE_ULS_STRENGTH_FIRE_NZS" : "ULS - Strength - Fire (7379)",
    "DESIGN_SITUATION_TYPE_SLS_SERVICEABILITY_NZS" : "SLS - Serviceability (7380)",
    "DESIGN_SITUATION_TYPE_SLS_G_PSI_S_Q_NZS" : "Serviceability: G + ψsQ (7381)",
    "DESIGN_SITUATION_TYPE_SLS_G_PSI_L_Q_NZS" : "Serviceability: G + ψlQ (7382)",
    "DESIGN_SITUATION_TYPE_SLS_G_PSI_S_Q_OR_W_S_NZS" : "Serviceability: G + ψsQ or Ws (7383)",
    "DESIGN_SITUATION_TYPE_SLS_G_NZS" : "Serviceability: G (7384)",
    "DESIGN_SITUATION_TYPE_SLS_W_S_NZS" : "Serviceability: Ws (7385)",
    "DESIGN_SITUATION_TYPE_SLS_W_S_OR_E_S_NZS" : "Serviceability: Ws or Es (7386)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10_G_1" : "ULS (STR/GEO) - Permanent and transient - Eq. 6.10, gamma G,sup,1 = 1.35 (7387)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10_G_2" : "ULS (STR/GEO) - Permanent and transient - Eq. 6.10, gamma G,sup,2 = 1.20 (7388)",
    "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10_G_3" : "ULS (STR/GEO) - Permanent and transient - Eq. 6.10, gamma G,sup,3 = 1.15 (7389)",
    "DESIGN_SITUATION_TYPE_STRENGTH_LIMIT_STATE_NDS_ASD" : "Strength limit state (ASD) (7390)",
    "DESIGN_SITUATION_TYPE_STRENGTH_LIMIT_STATE_NDS_LRFD" : "Strength limit state (LRFD) (7391)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_NDS" : "Serviceability limit state (7392)",
    "DESIGN_SITUATION_TYPE_ULTIMATE_LIMIT_STATE_SP64" : "Ultimate limit state (7393)",
    "DESIGN_SITUATION_TYPE_FIRE_LIMIT_STATE_SP64" : "Fire limit state (7394)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_SP64" : "Serviceability limit state (7395)",
    "DESIGN_SITUATION_TYPE_STRENGTH_AND_STABILITY_LIMIT_STATES_AS1720" : "Strength and stability limit states (7435)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_SHORT_TERM_EFFECT_AS1720" : "Serviceability limit state - Short-term effect (7346)",
    "DESIGN_SITUATION_TYPE_SERVICEABILITY_LIMIT_STATE_LONG_TERM_EFFECT_AS1720" : "Serviceability limit state - Long-term effect (7347)",
    "DESIGN_SITUATION_TYPE_FIRE_LIMIT_STATE_AS1720" : "Fire limit state (7438)"
};