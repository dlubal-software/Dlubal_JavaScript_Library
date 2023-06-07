/**
 * Creates Steel Design Ultimate Configuration
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationSP (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
    this.addon = createBaseSteelDesignConfiguration(STEEL_DESIGN.steel_design_uls_configurations, no, members_no, member_sets_no, comment, params);
}

/**
 * @returns Ultimate Configuration index
 */
SteelDesignUltimateConfigurationSP.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationSP.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Fire resistance Configuration name, can be undefined
 */
SteelDesignUltimateConfigurationSP.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetGeneral = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis !== "undefined") {
        this.addon.settings_sp16.property_perform_stability_analysis = property_perform_stability_analysis;
    }
};

/**
 * Sets Limit values for special cases design parameters
 * @param {Number} property_limit_values_tension                            Tension, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_compression                        Compression, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_perpendicular_to_axis_yu     Shear Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_perpendicular_to_axis_zv     Shear Z, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_torsion                            Shear stress due to torsion, can be undefined (is not set, 0.010 as default)
 * @param {Number} property_limit_values_bending_about_major_axis_yu        Bending about major axis Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_bending_about_minor_axis_zv        Bending about minor axis Z, can be undefined (is not set, 0.001 as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetLimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_perpendicular_to_axis_yu,
    property_limit_values_shear_perpendicular_to_axis_zv,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_yu,
    property_limit_values_bending_about_minor_axis_zv) {
    if (typeof property_limit_values_tension !== "undefined") {
        this.addon.settings_sp16.property_limit_values_tension = property_limit_values_tension;
    }
    if (typeof property_limit_values_compression !== "undefined") {
        this.addon.settings_sp16.property_limit_values_compression = property_limit_values_compression;
    }
    if (typeof property_limit_values_shear_perpendicular_to_axis_yu !== "undefined") {
        this.addon.settings_sp16.property_limit_values_shear_perpendicular_to_axis_yu = property_limit_values_shear_perpendicular_to_axis_yu;
    }
    if (typeof property_limit_values_shear_perpendicular_to_axis_zv != "undefined") {
        this.addon.settings_sp16.property_limit_values_shear_perpendicular_to_axis_zv = property_limit_values_shear_perpendicular_to_axis_zv;
    }
    if (typeof property_limit_values_torsion !== "undefined") {
        this.addon.settings_sp16.property_limit_values_torsion = property_limit_values_torsion;
    }
    if (typeof property_limit_values_bending_about_major_axis_yu !== "undefined") {
        this.addon.settings_sp16.property_limit_values_bending_about_major_axis_yu = property_limit_values_bending_about_major_axis_yu;
    }
    if (typeof property_limit_values_bending_about_minor_axis_zv !== "undefined") {
        this.addon.settings_sp16.property_limit_values_bending_about_minor_axis_zv = property_limit_values_bending_about_minor_axis_zv;
    }
};

/**
 * Sets Service factor
 * @param {Number} property_service_factor_acc_to_table_1   Factor acc. to table 1, can be undefined (is not set, 0.90 as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetServiceFactor = function (property_service_factor_acc_to_table_1) {
    if (typeof property_service_factor_acc_to_table_1 !== "undefined") {
        this.addon.settings_sp16.property_service_factor_acc_to_table_1 = property_service_factor_acc_to_table_1;
    }
};

/**
 * Sets Partial safety factor for material
 * @param {Number} property_partial_safety_factor_acc_to_table_3    Factor acc. to table 3, can be undefined (is not set, 1.02 as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetPartialSafetyFactor = function (property_partial_safety_factor_acc_to_table_3) {
    if (typeof property_partial_safety_factor_acc_to_table_3 !== "undefined") {
        this.addon.settings_sp16.property_partial_safety_factor_acc_to_table_3 = property_partial_safety_factor_acc_to_table_3;
    }
};

/**
 * Sets Options
 * @param {Boolean} property_options_plastic_design     Plastic design (class 2 and 3 acc. to SNIP II-23-81), can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetOptions = function (property_options_plastic_design) {
    if (typeof property_options_plastic_design !== "undefined") {
        this.addon.settings_sp16.property_options_plastic_design = property_options_plastic_design;
    }
};

/**
 * Sets Load safety coefficient
 * @param {Boolean} property_load_safety_coefficient_is_used    Use load safety coefficient gama-f as limit for coefficients cy and cz from tab. E.1, can be undefined (is not set, true as default)
 * @param {Number} property_load_safety_coefficient_value       Load safety coefficient gama-f used in tab. E.1, can be undefined (is not set, 1.100 as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetLoadSafetyCoefficient = function (property_load_safety_coefficient_is_used,
    property_load_safety_coefficient_value) {
    if (typeof property_load_safety_coefficient_is_used !== "undefined") {
        this.addon.settings_sp16.property_load_safety_coefficient_is_used = property_load_safety_coefficient_is_used;
    }
    if (typeof property_load_safety_coefficient_value !== "undefined") {
        ASSERT(this.addon.settings_sp16.property_load_safety_coefficient_is_used, "Load safety coefficient must be on");
        this.addon.settings_sp16.property_load_safety_coefficient_value = property_load_safety_coefficient_value;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_tolerance_of_ltb_support_distribution           Tolerance for uniform distribution of side supports for tab. Z.1, can be undefined (is not set, 0.05 as default)
 * @param {Number} property_tolerance_of_concentrated_load_position         Tolerance for position of concentrated load for tab. Z.1, can be undefined (is not set, 0.05 as default)
 * @param {Boolean} property_vertical_position_downwards_on_top_flange      Vertical position on profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_vertical_position_downwards_on_bottom_flange   Vertical position on profile edge (stabilizing effect), can be undefined (false as default)
 */
SteelDesignUltimateConfigurationSP.prototype.SetDesignParameters = function (property_tolerance_of_ltb_support_distribution,
    property_tolerance_of_concentrated_load_position,
    property_vertical_position_downwards_on_top_flange,
    property_vertical_position_downwards_on_bottom_flange) {
    ASSERT(this.addon.settings_sp16.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_tolerance_of_ltb_support_distribution !== "undefined") {
        this.addon.settings_sp16.property_tolerance_of_ltb_support_distribution = property_tolerance_of_ltb_support_distribution;
    }
    if (typeof property_tolerance_of_concentrated_load_position !== "undefined") {
        this.addon.settings_sp16.property_tolerance_of_concentrated_load_position = property_tolerance_of_concentrated_load_position;
    }
    if (typeof property_vertical_position_downwards_on_top_flange !== "undefined") {
        this.addon.settings_sp16.property_vertical_position_downwards_on_top_flange = property_vertical_position_downwards_on_top_flange;
    }
    if (typeof property_vertical_position_downwards_on_bottom_flange !== "undefined") {
        this.addon.settings_sp16.property_vertical_position_downwards_on_bottom_flange = property_vertical_position_downwards_on_bottom_flange;
    }
};