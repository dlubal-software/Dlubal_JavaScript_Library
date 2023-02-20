/**
 * Creates Steel Design Ultimate Configuration
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {String} name             Ultimate Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationBS (no,
    name,
    members_no,
    member_sets_no,
    comment,
    params) {
    this.addon = createBaseSteelDesignConfiguration(STEEL_DESIGN.steel_design_uls_configurations, no, name, members_no, member_sets_no, comment, params);
}

/**
 * @returns Ultimate Configuration index
 */
SteelDesignUltimateConfigurationBS.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationBS.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationBS.prototype.General = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis !== "undefined") {
        this.addon.settings_bs5.property_perform_stability_analysis = property_perform_stability_analysis;
    }
};

/**
 * Sets Limit values for special cases design parameters
 * @param {Number} property_limit_values_tension                        Tension, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_compression                    Compression, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_y                        Shear Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_z                        Shear Z, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_torsion_shear_stress           Shear stress due to torsion, can be undefined (is not set, 0.010 as default)
 * @param {Number} property_limit_values_bending_about_major_axis_y     Bending about major axis Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_bending_about_minor_axis_z     Bending about minor axis Z, can be undefined (is not set, 0.001 as default)
 */
SteelDesignUltimateConfigurationBS.prototype.LimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion_shear_stress,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    if (typeof property_limit_values_tension !== "undefined") {
        this.addon.settings_bs5.property_limit_values_tension = property_limit_values_tension;
    }
    if (typeof property_limit_values_compression !== "undefined") {
        this.addon.settings_bs5.property_limit_values_compression = property_limit_values_compression;
    }
    if (typeof property_limit_values_shear_y !== "undefined") {
        this.addon.settings_bs5.property_limit_values_shear_y = property_limit_values_shear_y;
    }
    if (typeof property_limit_values_shear_z != "undefined") {
        this.addon.settings_bs5.property_limit_values_shear_z = property_limit_values_shear_z;
    }
    if (typeof property_limit_values_torsion_shear_stress !== "undefined") {
        this.addon.settings_bs5.property_limit_values_torsion_shear_stress = property_limit_values_torsion_shear_stress;
    }
    if (typeof property_limit_values_bending_about_major_axis_y !== "undefined") {
        this.addon.settings_bs5.property_limit_values_bending_about_major_axis_y = property_limit_values_bending_about_major_axis_y;
    }
    if (typeof property_limit_values_bending_about_minor_axis_z !== "undefined") {
        this.addon.settings_bs5.property_limit_values_bending_about_minor_axis_z = property_limit_values_bending_about_minor_axis_z;
    }
};

/**
 * Sets Options
 * @param {Boolean} property_options_forced_semi_compact_design             Forced semi-compact design, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_more_exact_method_for_shear_buckling   More exact method for shear buckling resistance, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationBS.prototype.Options = function (property_options_forced_semi_compact_design,
    property_options_more_exact_method_for_shear_buckling) {
    if (typeof property_options_forced_semi_compact_design !== "undefined") {
        this.addon.settings_bs5.property_options_forced_semi_compact_design = property_options_forced_semi_compact_design;
    }
    if (typeof property_options_more_exact_method_for_shear_buckling !== "undefined") {
        this.addon.settings_bs5.property_options_more_exact_method_for_shear_buckling = property_options_more_exact_method_for_shear_buckling;
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_load_acts_vp_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_load_acts_vp_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_downwards_on_bottom_flange        On profile edge (stabilizing effect)
 */
SteelDesignUltimateConfigurationBS.prototype.PositionOfPositiveTransverse = function (property_load_acts_vp_downwards_on_top_flange,
    property_load_acts_vp_at_shear_point,
    property_load_acts_vp_at_center_point,
    property_load_acts_vp_downwards_on_bottom_flange) {
    setSteelDesignUltimateConfiguration_PositionOfPositiveTransverse(this.addon.settings_bs5, property_load_acts_vp_downwards_on_top_flange, property_load_acts_vp_at_shear_point, property_load_acts_vp_at_center_point,
        property_load_acts_vp_downwards_on_bottom_flange);
};

/**
 * Sets Equivalent uniform moment factors
 * @param {Boolean} property_moment_factors_lateral_torsional_buckling_calculated           Factor mLT (acc. to equation from tab. 18), can be undefined (is not set, false as default), must be undefined if property_moment_factors_lateral_torsional_buckling_user_defined is defined
 * @param {Boolean} property_moment_factors_lateral_torsional_buckling_user_defined         Factor mLT (user-defined), can be undefined (is not set, true as default), must be undefined if property_moment_factors_lateral_torsional_buckling_calculated is defined
 * @param {Number} property_moment_factors_lateral_torsional_buckling_user_defined_value    User-defined factor mLT, can be undefined (is not set, 1.000 as default)
 * @param {Boolean} property_moment_factors_flexural_buckling_major_calculated              Factor my (acc. to equation from tab. 26), can be undefined (is not set, false as default), must be undefined if property_moment_factors_flexural_buckling_major_user_defined is defined
 * @param {Boolean} property_moment_factors_flexural_buckling_major_user_defined            Factor my (user-defined), can be undefined (is not set, true as default), must be undefined if property_moment_factors_flexural_buckling_major_calculated is defined
 * @param {Number} property_moment_factors_flexural_buckling_major_user_defined_value       User-defined factor my, can be undefined (is not set, 1.000 as default)
 * @param {Boolean} property_moment_factors_flexural_buckling_minor_calculated              Factor mz (acc. to equation from tab. 26), can be undefined (is not set, false as default), must be undefined if property_moment_factors_flexural_buckling_minor_user_defined is defined
 * @param {Boolean} property_moment_factors_flexural_buckling_minor_user_defined            Factor mz (user-defined), can be undefined (is not set, true as default), must be undefined if property_moment_factors_flexural_buckling_minor_calculated is defined
 * @param {Number} property_moment_factors_flexural_buckling_minor_user_defined_value       User-defined factor mz, can be undefined (is not set, 1.000 as default)
 */
SteelDesignUltimateConfigurationBS.prototype.EquivalentUniformMomentFactors = function (property_moment_factors_lateral_torsional_buckling_calculated,
    property_moment_factors_lateral_torsional_buckling_user_defined,
    property_moment_factors_lateral_torsional_buckling_user_defined_value,
    property_moment_factors_flexural_buckling_major_calculated,
    property_moment_factors_flexural_buckling_major_user_defined,
    property_moment_factors_flexural_buckling_major_user_defined_value,
    property_moment_factors_flexural_buckling_minor_calculated,
    property_moment_factors_flexural_buckling_minor_user_defined,
    property_moment_factors_flexural_buckling_minor_user_defined_value) {
    ASSERT(this.addon.settings_bs5.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_moment_factors_lateral_torsional_buckling_calculated !== "undefined") {
        ASSERT(typeof property_moment_factors_lateral_torsional_buckling_user_defined === "undefined" || !property_moment_factors_lateral_torsional_buckling_user_defined, "User-defined factor must be off");
        this.addon.settings_bs5.property_moment_factors_lateral_torsional_buckling_calculated = property_moment_factors_lateral_torsional_buckling_calculated;
    }
    if (typeof property_moment_factors_lateral_torsional_buckling_user_defined !== "undefined") {
        ASSERT(!this.addon.settings_bs5.property_moment_factors_lateral_torsional_buckling_calculated, "Acc. to equation from Tab. 18 must be off");
        this.addon.settings_bs5.property_moment_factors_lateral_torsional_buckling_user_defined = property_moment_factors_lateral_torsional_buckling_user_defined;
    }
    if (typeof property_moment_factors_lateral_torsional_buckling_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_bs5.property_moment_factors_lateral_torsional_buckling_user_defined, "User-defined factor must be on");
        this.addon.settings_bs5.property_moment_factors_lateral_torsional_buckling_user_defined_value = property_moment_factors_lateral_torsional_buckling_user_defined_value;
    }
    if (typeof property_moment_factors_flexural_buckling_major_calculated !== "undefined") {
        ASSERT(typeof property_moment_factors_flexural_buckling_major_user_defined === "undefined" || !property_moment_factors_flexural_buckling_major_user_defined, "User-defined factor must be off");
        this.addon.settings_bs5.property_moment_factors_flexural_buckling_major_calculated = property_moment_factors_flexural_buckling_major_calculated;
    }
    if (typeof property_moment_factors_flexural_buckling_major_user_defined !== "undefined") {
        ASSERT(!this.addon.settings_bs5.property_moment_factors_flexural_buckling_major_calculated, "Acc. to equation from Tab. 26 must be off");
        this.addon.settings_bs5.property_moment_factors_flexural_buckling_major_user_defined = property_moment_factors_flexural_buckling_major_user_defined;
    }
    if (typeof property_moment_factors_flexural_buckling_major_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_bs5.property_moment_factors_flexural_buckling_major_user_defined, "User-defined factor must be on");
        this.addon.settings_bs5.property_moment_factors_flexural_buckling_major_user_defined_value = property_moment_factors_flexural_buckling_major_user_defined_value;
    }
    if (typeof property_moment_factors_flexural_buckling_minor_calculated !== "undefined") {
        ASSERT(typeof property_moment_factors_flexural_buckling_minor_user_defined === "undefined" || !property_moment_factors_flexural_buckling_minor_user_defined, "User-defined factor must be off");
        this.addon.settings_bs5.property_moment_factors_flexural_buckling_minor_calculated = property_moment_factors_flexural_buckling_minor_calculated;
    }
    if (typeof property_moment_factors_flexural_buckling_minor_user_defined !== "undefined") {
        ASSERT(!this.addon.settings_bs5.property_moment_factors_flexural_buckling_minor_calculated, "Acc. to equation from Tab. 26 must be off");
        this.addon.settings_bs5.property_moment_factors_flexural_buckling_minor_user_defined = property_moment_factors_flexural_buckling_minor_user_defined;
    }
    if (typeof property_moment_factors_flexural_buckling_minor_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_bs5.property_moment_factors_flexural_buckling_minor_user_defined, "User-defined factor must be off");
        this.addon.settings_bs5.property_moment_factors_flexural_buckling_minor_user_defined_value = property_moment_factors_flexural_buckling_minor_user_defined_value;
    }
};