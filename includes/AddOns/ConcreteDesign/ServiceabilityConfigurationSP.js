include("../../Tools/jshlf_common_functions.js");

function ConcreteDesignServiceabilityConfigurationSP (no,
    surfaces_no,
    members_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_sls_configurations, no, surfaces_no, members_no, undefined, comment, params);
}

/**
 * @returns Serviceability configuration index
 */
ConcreteDesignServiceabilityConfigurationSP.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Serviceability configuration object
 */
ConcreteDesignServiceabilityConfigurationSP.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Serviceability configuration name, can be undefined
 */
ConcreteDesignServiceabilityConfigurationSP.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets Crack State Detection
 * @param {String} property_type_of_stress_strain_diagram_of_tensile_concrete_strength  Type of stress-strain diagram of tensile concrete strength (INELASTIC, ELASTIC), can be undefined (INELASTIC as default)
 */
ConcreteDesignServiceabilityConfigurationSP.prototype.SetCrackStateDetection = function (property_type_of_stress_strain_diagram_of_tensile_concrete_strength) {
    this.addon.settings_main_sp63.property_type_of_stress_strain_diagram_of_tensile_concrete_strength = GetConcreteDesignStressStrainDiagramType(property_type_of_stress_strain_diagram_of_tensile_concrete_strength);
};

/**
 * Sets Crack Width Analysis
 * @param {Boolean} property_user_defined_top_long_term_limit_values_of_allowable_crack         Limit values of allowable crack width (long-term loading, top), can be undefined (0.3 mm as default)
 * @param {Boolean} property_user_defined_bottom_long_term_limit_values_of_allowable_crack      Limit values of allowable crack width (long-term loading, bottom), can be undefined (0.3 mm as default)
 * @param {Boolean} property_user_defined_top_short_term_limit_values_of_allowable_crack        Limit values of allowable crack width (short-term loading, top), can be undefined (0.3 mm as default)
 * @param {Boolean} property_user_defined_bottom_short_term_limit_values_of_allowable_crack     Limit values of allowable crack width (short-term loading, bottom), can be undefined (0.3 mm as default)
 */
ConcreteDesignServiceabilityConfigurationSP.prototype.SetCrackWidthAnalysis = function (property_user_defined_top_long_term_limit_values_of_allowable_crack,
    property_user_defined_bottom_long_term_limit_values_of_allowable_crack,
    property_user_defined_top_short_term_limit_values_of_allowable_crack,
    property_user_defined_bottom_short_term_limit_values_of_allowable_crack) {
    if (typeof property_user_defined_top_long_term_limit_values_of_allowable_crack !== "undefined") {
        this.addon.settings_main_sp63.property_user_defined_top_long_term_limit_values_of_allowable_crack = property_user_defined_top_long_term_limit_values_of_allowable_crack;
    }
    if (typeof property_user_defined_bottom_long_term_limit_values_of_allowable_crack !== "undefined") {
        this.addon.settings_main_sp63.property_user_defined_bottom_long_term_limit_values_of_allowable_crack = property_user_defined_bottom_long_term_limit_values_of_allowable_crack;
    }
    if (typeof property_user_defined_top_short_term_limit_values_of_allowable_crack !== "undefined") {
        this.addon.settings_main_sp63.property_user_defined_top_short_term_limit_values_of_allowable_crack = property_user_defined_top_short_term_limit_values_of_allowable_crack;
    }
    if (typeof property_user_defined_bottom_short_term_limit_values_of_allowable_crack !== "undefined") {
        this.addon.settings_main_sp63.property_user_defined_bottom_short_term_limit_values_of_allowable_crack = property_user_defined_bottom_short_term_limit_values_of_allowable_crack;
    }
};

/**
 * Sets Deflection Analysis
 * @param {Boolean} property_limitation_of_deflection_enabled           Limitation of deflection, can be undefined (is not set, true as default)
 * @param {Number} property_deflection_limit_support_on_both_sides      Limit values of allowable deflection - Support on both sides (Limit for all reference lengths), can be undefined (is not set, 250 as default)
 * @param {Number} property_deflection_limit_one_sided_support          Limit values of allowable deflection - One-sided support (Limit for all reference lengths), can be undefined (is not set, 125 as default)
 * @param {Boolean} property_tension_stiffening_effect                  Consider resistance of concrete between cracks (tension stiffening effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_activate_time_dependent_deflections        Calculation of time-dependent deflections, can be undefined (is not set, true as default)
 * @param {Boolean} property_time_dependent_factor                      Use of creep factor acc. to table 6.12 and time-dependent concrete strain acc. to table 6.10 acc. to SP63.13330.2018 (is not set, true as default)
 * @param {Number} property_deflection_relative_humidity                Relative humidity of air, can be undefined (is not set, 65% as default)
 * @param {Boolean} property_time_dependent_material_properties         Time-dependent material properties (creep, shrinkage) acc. to Eurocode 2
 */
ConcreteDesignServiceabilityConfigurationSP.prototype.SetDeflectionAnalysis = function (property_limitation_of_deflection_enabled,
    property_deflection_limit_support_on_both_sides,
    property_deflection_limit_one_sided_support,
    property_tension_stiffening_effect,
    property_activate_time_dependent_deflections,
    property_time_dependent_factor,
    property_deflection_relative_humidity,
    property_time_dependent_material_properties) {
    SetConcreteDesignServiceabilityConfigurationDeflectionAnalysis(this.addon.settings_main_sp63, property_limitation_of_deflection_enabled, property_deflection_limit_support_on_both_sides, 
        property_deflection_limit_one_sided_support, undefined, property_tension_stiffening_effect, undefined, undefined, property_activate_time_dependent_deflections, 
        property_time_dependent_factor, undefined, property_deflection_relative_humidity, property_time_dependent_material_properties)
};

function GetConcreteDesignStressStrainDiagramType(diagram_type) {
    return EnumValueFromJSHLFTypeName(
        diagram_type,
        "diagram",
        {
            "INELASTIC": main_concrete_slsconfig_sp63.E_STRESS_STRAIN_DIAGRAM_TYPE_INELASTIC,
            "ELASTIC": main_concrete_slsconfig_sp63.E_STRESS_STRAIN_DIAGRAM_TYPE_ELASTIC
        },
        main_concrete_slsconfig_sp63.E_STRESS_STRAIN_DIAGRAM_TYPE_INELASTIC);
}