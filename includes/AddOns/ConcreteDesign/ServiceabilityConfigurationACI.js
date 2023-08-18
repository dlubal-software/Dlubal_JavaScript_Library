include("../../Tools/high_level_functions_support.js");

function ConcreteDesignServiceabilityConfigurationACI (no,
    surfaces_no,
    members_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_sls_configurations, no, surfaces_no, members_no, undefined, comment, params);
}

/**
 * @returns Serviceability Configuration index
 */
ConcreteDesignServiceabilityConfigurationACI.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Serviceability Configuration object
 */
ConcreteDesignServiceabilityConfigurationACI.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Serviceability configuration name, can be undefined
 */
ConcreteDesignServiceabilityConfigurationACI.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets Crack Analysis
 * @param {Boolean} property_design_without_direct_crack_width_calculation                  Design without direct crack width calculation, can be undefined (is not set, true as default)
 * @param {Boolean} property_calculation_of_maximum_member_spacing                          Calculation of maximum reinforcement spacing lim sl acc. to 24.3.2, can be undefined (is not set, true as default)
 * @param {Boolean} property_design_with_direct_crack_width_calculation                     Design with direct crack width calculation, can be undefined (is not set, true as default)
 * @param {Boolean} property_reasonable_crack_width                                         Reasonable crack width acc. to ACI PRC-224-01, can be undefined (is not set, true as default)
 * @param {String} property_top_limit_values_of_crack_width                                 Top (-z) limit values of crack width (01_USE_IN_WATER_RETAINING_STRUCTURES, 02_SEAWATER_AND_SEAWATER_SPRAY, 02_DEICING_CHEMICALS,
 *                                                                                              03_HUMIDITY_MOIST_AIR_SOIL, 04_DRY_AIR_OR_PROTECTIVE_MEMBRANE), can be undefined (is not set, 03_HUMIDITY_MOIST_AIR_SOIL as default)
 * @param {String} property_bottom_limit_values_of_crack_width                              Bottom (+z) limit values of crack width (01_USE_IN_WATER_RETAINING_STRUCTURES, 02_SEAWATER_AND_SEAWATER_SPRAY, 02_DEICING_CHEMICALS,
 *                                                                                              03_HUMIDITY_MOIST_AIR_SOIL, 04_DRY_AIR_OR_PROTECTIVE_MEMBRANE), can be undefined (is not set, 03_HUMIDITY_MOIST_AIR_SOIL as default)
 * @param {Boolean} property_user_defined_limit_values_of_crack_width                       User-defined limit values of crack width, can be undefined (is not set, false as default)
 * @param {Number} property_user_defined_top_limit_values_of_allowable_crack                Limit values of allowable crack width (top), can be undefined (is not set, 0.3 mm as default)
 * @param {Number} property_user_defined_bottom_limit_values_of_allowable_crack             Limit values of allowable crack width (bottom), can be undefined (is not set, 0.3 mm as default)
 * @param {Boolean} property_minimum_longitudinal_reinforcement_shrinkage_and_temperature   Minimum longitudinal reinforcement due to shrinkage and temperature acc. to 24.4.3, can be undefined (is not set, true as default)
 * @param {Boolean} property_surface_top_reinforcement_direction_phi1                       Top -z reinforcement direction - Reinforcement direction φ1, can be undefined (is not set, true as default)
 * @param {Boolean} property_surface_top_reinforcement_direction_phi2                       Top -z reinforcement direction - Reinforcement direction φ2, can be undefined (is not set, true as default)
 * @param {Boolean} property_surface_bottom_reinforcement_direction_phi1                    Bottom +z reinforcement direction - Reinforcement direction φ1, can be undefined (is not set, true as default)
 * @param {Boolean} property_surface_bottom_reinforcement_direction_phi2                    Bottom +z reinforcement direction - Reinforcement direction φ2, can be undefined (is not set, true as default)
 */
ConcreteDesignServiceabilityConfigurationACI.prototype.SetCrackAnalysis = function (property_design_without_direct_crack_width_calculation,
    property_calculation_of_maximum_member_spacing,
    property_design_with_direct_crack_width_calculation,
    property_reasonable_crack_width,
    property_top_limit_values_of_crack_width,
    property_bottom_limit_values_of_crack_width,
    property_user_defined_limit_values_of_crack_width,
    property_user_defined_top_limit_values_of_allowable_crack,
    property_user_defined_bottom_limit_values_of_allowable_crack,
    property_minimum_longitudinal_reinforcement_shrinkage_and_temperature,
    property_surface_top_reinforcement_direction_phi1,
    property_surface_top_reinforcement_direction_phi2,
    property_surface_bottom_reinforcement_direction_phi1,
    property_surface_bottom_reinforcement_direction_phi2) {
    if (typeof property_design_without_direct_crack_width_calculation !== "undefined") {
        this.addon.settings_main_aci318.property_design_without_direct_crack_width_calculation = property_design_without_direct_crack_width_calculation;
    }
    if (typeof property_calculation_of_maximum_member_spacing !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_design_without_direct_crack_width_calculation, "Design without direct crack width calculation must be on");
        this.addon.settings_main_aci318.property_calculation_of_maximum_member_spacing = property_calculation_of_maximum_member_spacing;
    }
    if (typeof property_design_with_direct_crack_width_calculation !== "undefined") {
        this.addon.settings_main_aci318.property_design_with_direct_crack_width_calculation = property_design_with_direct_crack_width_calculation;
    }
    if (typeof property_reasonable_crack_width !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_design_with_direct_crack_width_calculation, "Design with direct crack width calculation must be on");
        this.addon.settings_main_aci318.property_reasonable_crack_width = property_reasonable_crack_width;
    }
    if (typeof property_top_limit_values_of_crack_width !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_reasonable_crack_width, "Reasonable crack width acc. to ACI PRC-224-01 must be set");
        this.addon.settings_main_aci318.property_top_limit_values_of_crack_width = GetConcreteDesignLimitCrackWidthValueType(property_top_limit_values_of_crack_width);
    }
    if (typeof property_bottom_limit_values_of_crack_width !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_reasonable_crack_width, "Reasonable crack width acc. to ACI PRC-224-01 must be set");
        this.addon.settings_main_aci318.property_bottom_limit_values_of_crack_width = GetConcreteDesignLimitCrackWidthValueType(property_bottom_limit_values_of_crack_width);
    }
    if (typeof property_user_defined_limit_values_of_crack_width !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_design_with_direct_crack_width_calculation, "Design with direct crack width calculation must be on");
        this.addon.settings_main_aci318.property_user_defined_limit_values_of_crack_width = property_user_defined_limit_values_of_crack_width;
    }
    if (typeof property_user_defined_top_limit_values_of_allowable_crack !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_user_defined_limit_values_of_crack_width, "User-defined limit values of crack width must be set");
        this.addon.settings_main_aci318.property_user_defined_top_limit_values_of_allowable_crack = property_user_defined_top_limit_values_of_allowable_crack;
    }
    if (typeof property_user_defined_bottom_limit_values_of_allowable_crack !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_user_defined_limit_values_of_crack_width, "User-defined limit values of crack width must be set");
        this.addon.settings_main_aci318.property_user_defined_bottom_limit_values_of_allowable_crack = property_user_defined_bottom_limit_values_of_allowable_crack;
    }
    if (typeof property_minimum_longitudinal_reinforcement_shrinkage_and_temperature !== "undefined") {
        this.addon.settings_main_aci318.property_minimum_longitudinal_reinforcement_shrinkage_and_temperature = property_minimum_longitudinal_reinforcement_shrinkage_and_temperature;
    }
    if (typeof property_surface_top_reinforcement_direction_phi1 !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_minimum_longitudinal_reinforcement_shrinkage_and_temperature, "Minimum longitudinal reinforcement due to shrinkage and temperature must be on");
        this.addon.settings_main_aci318.property_surface_top_reinforcement_direction_phi1 = property_surface_top_reinforcement_direction_phi1;
    }
    if (typeof property_surface_top_reinforcement_direction_phi2 !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_minimum_longitudinal_reinforcement_shrinkage_and_temperature, "Minimum longitudinal reinforcement due to shrinkage and temperature must be on");
        this.addon.settings_main_aci318.property_surface_top_reinforcement_direction_phi2 = property_surface_top_reinforcement_direction_phi2;
    }
    if (typeof property_surface_bottom_reinforcement_direction_phi1 !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_minimum_longitudinal_reinforcement_shrinkage_and_temperature, "Minimum longitudinal reinforcement due to shrinkage and temperature must be on");
        this.addon.settings_main_aci318.property_surface_bottom_reinforcement_direction_phi1 = property_surface_bottom_reinforcement_direction_phi1;
    }
    if (typeof property_surface_bottom_reinforcement_direction_phi2 !== "undefined") {
        ASSERT(this.addon.settings_main_aci318.property_minimum_longitudinal_reinforcement_shrinkage_and_temperature, "Minimum longitudinal reinforcement due to shrinkage and temperature must be on");
        this.addon.settings_main_aci318.property_surface_bottom_reinforcement_direction_phi2 = property_surface_bottom_reinforcement_direction_phi2;
    }
};

/**
 * Sets Deflection Analysis
 * @param {Boolean} property_limitation_of_deflection_enabled           Limitation of deflection, can be undefined (is not set, true as default)
 * @param {Number} property_deflection_limit_support_on_both_sides      Limit values of allowable deflection - Support on both sides, can be undefined (is not set, 240 as default)
 * @param {Number} property_deflection_limit_one_sided_support          Limit values of allowable deflection - One-sided support, can be undefined (is not set, 240 as default)
 * @param {Boolean} property_tension_stiffening_effect_enabled          Consider resistance of concrete between cracks (tension stiffening effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_minimum_zeta_enabled                       Consider minimum value of distribution factor, can be undefined (is not set, false as default)
 * @param {Number} property_minimum_zeta_value                          Minimum value of distribution factor, can be undefined (is not set, 0.5 as default)
 * @param {Boolean} property_activate_time_dependent_deflections        Calculation of time-dependent deflections, can be undefined (is not set, true as default)
 * @param {Boolean} property_time_dependent_factor                      Time-dependent factor acc. to table 24.2.4.1.3, can be undefined (is not set, true as default)
 * @param {Number} property_deflection_duration_of_load                 Duration of load, can be undefined (is not set, 60 months as default)
 * @param {Boolean} property_time_dependent_material_properties         Time-dependent material properties (creep, shrinkage) acc. to ACI 435, can be undefined (is not set, false as default)
 */
ConcreteDesignServiceabilityConfigurationACI.prototype.SetDeflectionAnalysis = function (property_limitation_of_deflection_enabled,
    property_deflection_limit_support_on_both_sides,
    property_deflection_limit_one_sided_support,
    property_tension_stiffening_effect_enabled,
    property_minimum_zeta_enabled,
    property_minimum_zeta_value,
    property_activate_time_dependent_deflections,
    property_time_dependent_factor,
    property_deflection_duration_of_load,
    property_time_dependent_material_properties) {
    SetConcreteDesignServiceabilityConfigurationDeflectionAnalysis(this.addon.settings_main_aci318, property_limitation_of_deflection_enabled, property_deflection_limit_support_on_both_sides, 
        property_deflection_limit_one_sided_support, property_tension_stiffening_effect_enabled, undefined, property_minimum_zeta_enabled, property_minimum_zeta_value, property_activate_time_dependent_deflections, 
        property_time_dependent_factor, property_deflection_duration_of_load, undefined, property_time_dependent_material_properties)
};

/**
 * Sets Crack state detection
 * @param {String} crack_state_detection    Crack state detection (
 *                                              CALCULATED_FROM_ASSOCIATED_LOAD (Crack state calculated from associated load),
 *                                              DETERMINED_AS_ENVELOPE_FROM_ALL_DESIGN_SITUATIONS (Crack state determined as envelope from all serviceability design situations),
 *                                              INDEPENDENT_OF_LOAD (Crack state independent of load)) can be undefined (is not set, CALCULATED_FROM_ASSOCIATED_LOAD as default)
 */
ConcreteDesignServiceabilityConfigurationACI.prototype.SetCrackStateDetection = function (crack_state_detection) {
    SetConcreteDesignServiceabilityConfigurationCrackStateDetection(this.addon.settings_main_aci318, crack_state_detection);
};

function GetConcreteDesignLimitCrackWidthValueType(crack_width_type) {
    return EnumValueFromJSHLFTypeName(
        crack_width_type,
        "crack width",
        {
            "01_USE_IN_WATER_RETAINING_STRUCTURES": main_slsconfig_concrete_design_aci318.E_CRACK_WIDTH_01_USE_IN_WATER_RETAINING_STRUCTURES,
            "02_SEAWATER_AND_SEAWATER_SPRAY": main_slsconfig_concrete_design_aci318.E_CRACK_WIDTH_02_SEAWATER_AND_SEAWATER_SPRAY,
            "02_DEICING_CHEMICALS": main_slsconfig_concrete_design_aci318.E_CRACK_WIDTH_02_DEICING_CHEMICALS,
            "03_HUMIDITY_MOIST_AIR_SOIL": main_slsconfig_concrete_design_aci318.E_CRACK_WIDTH_03_HUMIDITY_MOIST_AIR_SOIL,
            "04_DRY_AIR_OR_PROTECTIVE_MEMBRANE": main_slsconfig_concrete_design_aci318.E_CRACK_WIDTH_04_DRY_AIR_OR_PROTECTIVE_MEMBRANE
        },
        main_slsconfig_concrete_design_aci318.E_CRACK_WIDTH_03_HUMIDITY_MOIST_AIR_SOIL);
}