include("../../Tools/jshlf_common_functions.js");

function ConcreteDesignServiceabilityConfigurationCSA (no,
    surfaces_no,
    members_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_sls_configurations, no, surfaces_no, members_no, undefined, comment, params);
}

/**
 * @returns Serviceability Configuration index
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Serviceability Configuration object
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Serviceability configuration name, can be undefined
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets Exposure
 * @param {String} property_exposure_members_top_side       Members - Top section side (INTERIOR, EXTERIOR), can be undefined (is not set, INTERIOR as default)
 * @param {String} property_exposure_members_left_side      Members - Left section side (INTERIOR, EXTERIOR), can be undefined (is not set, INTERIOR as default)
 * @param {String} property_exposure_members_right_side     Members - Right section side (INTERIOR, EXTERIOR), can be undefined (is not set, INTERIOR as default)
 * @param {String} property_exposure_members_bottom_side    Members - Bottom section side (INTERIOR, EXTERIOR), can be undefined (is not set, INTERIOR as default)
 * @param {String} property_exposure_surfaces_top_side      Surfaces - Top surface side (INTERIOR, EXTERIOR), can be undefined (is not set, INTERIOR as default)
 * @param {String} property_exposure_surfaces_bottom_side   Surfaces - Bottom surface side (INTERIOR, EXTERIOR), can be undefined (is not set, INTERIOR as default)
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.Exposure = function (property_exposure_members_top_side,
    property_exposure_members_left_side,
    property_exposure_members_right_side,
    property_exposure_members_bottom_side,
    property_exposure_surfaces_top_side,
    property_exposure_surfaces_bottom_side) {
    this.addon.settings_main_csaa233.property_exposure_members_top_side = GetConcreteDesignExposureSideType(property_exposure_members_top_side);
    this.addon.settings_main_csaa233.property_exposure_members_left_side = GetConcreteDesignExposureSideType(property_exposure_members_left_side);
    this.addon.settings_main_csaa233.property_exposure_members_right_side = GetConcreteDesignExposureSideType(property_exposure_members_right_side);
    this.addon.settings_main_csaa233.property_exposure_members_bottom_side = GetConcreteDesignExposureSideType(property_exposure_members_bottom_side);
    this.addon.settings_main_csaa233.property_exposure_surfaces_top_side = GetConcreteDesignExposureSideType(property_exposure_surfaces_top_side);
    this.addon.settings_main_csaa233.property_exposure_surfaces_bottom_side = GetConcreteDesignExposureSideType(property_exposure_surfaces_bottom_side);
};

/**
 * Sets Crack Analysis
 * @param {Boolean} property_crack_control  Crack control acc. to 10.6.1, can be undefined (true as default)
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.CrackAnalysis = function (property_crack_control) {
    if (typeof property_crack_control === "undefined") {
        property_crack_control = true;
    }
    this.addon.settings_main_csaa233.property_crack_control = property_crack_control;
};

/**
 * Sets Skin Reinforcement
 * @param {Boolean} property_minimum_skin_reinforcement     Minimum skin reinforcement acc. to 10.6.2, can be undefined (true as default)
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.SkinReinforcement = function (property_minimum_skin_reinforcement) {
    if (typeof property_minimum_skin_reinforcement === "undefined") {
        property_minimum_skin_reinforcement = true;
    }
    this.addon.settings_main_csaa233.property_minimum_skin_reinforcement = property_minimum_skin_reinforcement;
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
 * @param {Boolean} property_time_dependent_factor                      Time-dependent factor acc. to 9.8.2.5, can be undefined (is not set, true as default)
 * @param {Number} property_deflection_duration_of_load                 Duration of load, can be undefined (is not set, 60 months as default)
 * @param {Boolean} property_time_dependent_material_properties         Time-dependent material properties (creep, shrinkage), can be undefined (is not set, false as default)
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.DeflectionAnalysis = function (property_limitation_of_deflection_enabled,
    property_deflection_limit_support_on_both_sides,
    property_deflection_limit_one_sided_support,
    property_tension_stiffening_effect_enabled,
    property_minimum_zeta_enabled,
    property_minimum_zeta_value,
    property_activate_time_dependent_deflections,
    property_time_dependent_factor,
    property_deflection_duration_of_load,
    property_time_dependent_material_properties) {
    SetConcreteDesignServiceabilityConfigurationDeflectionAnalysis(this.addon.settings_main_csaa233, property_limitation_of_deflection_enabled, property_deflection_limit_support_on_both_sides, 
        property_deflection_limit_one_sided_support, property_tension_stiffening_effect_enabled, undefined, property_minimum_zeta_enabled, property_minimum_zeta_value, property_activate_time_dependent_deflections, 
        property_time_dependent_factor, property_deflection_duration_of_load, undefined, property_time_dependent_material_properties)
};

/**
 * Sets Crack state detection
 * @param {String} crack_state_detection    Crack state detection (
 *                                              CALCULATED_FROM_ASSOCIATED_LOAD (Crack state calculated from associated load),
 *                                              DETERMINED_AS_ENVELOPE_FROM_ALL_DESIGN_SITUATIONS (Cracked state calculated from all SLS design situations),
 *                                              INDEPENDENT_OF_LOAD (Crack state independent of load)) can be undefined (is not set, CALCULATED_FROM_ASSOCIATED_LOAD as default)
 */
ConcreteDesignServiceabilityConfigurationCSA.prototype.CrackStateDetection = function (crack_state_detection) {
    SetConcreteDesignServiceabilityConfigurationCrackStateDetection(this.addon.settings_main_csaa233, crack_state_detection);
};

function GetConcreteDesignExposureSideType(exposure_side_type) {
    return EnumValueFromJSHLFTypeName(
        exposure_side_type,
        "exposure side",
        {
            "INTERIOR": main_concrete_slsconfig_csaa233.E_EXPOSURE_SIDE_INTERIOR,
            "EXTERIOR": main_concrete_slsconfig_csaa233.E_EXPOSURE_SIDE_EXTERIOR
        },
        main_concrete_slsconfig_csaa233.E_EXPOSURE_SIDE_INTERIOR);
}