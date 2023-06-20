/**
 * Creates Steel Design Ultimate Configuration for AS code of standard
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationAS (no,
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
SteelDesignUltimateConfigurationAS.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationAS.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Fire resistance Configuration name, can be undefined
 */
SteelDesignUltimateConfigurationAS.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (true as default)
 */
SteelDesignUltimateConfigurationAS.prototype.SetGeneral = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis === "undefined") {
        property_perform_stability_analysis = true;
    }
    this.addon.settings_as4100.property_perform_stability_analysis = property_perform_stability_analysis;
};

/**
 * Sets limit values for special cases design parameters
 * @param {Number} property_limit_values_tension                        Tension, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_compression                    Compression, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_y                        Shear Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_z                        Shear Z, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_torsion                        Shear stress due to torsion, can be undefined (is not set, 0.010 as default)
 * @param {Number} property_limit_values_bending_about_major_axis_y     Bending about major axis Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_bending_about_minor_axis_z     Bending about minor axis Z, can be undefined (is not set, 0.001 as default)
 */
SteelDesignUltimateConfigurationAS.prototype.SetLimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_as4100, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
};

/**
 * Sets Options
 * @param {Boolean} property_options_plastic_design_acc_to_45_and_843   Plastic design acc. to 4.5 and 8.4.3, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_use_proportioning_method           Use proportioning method acc. to 5.12.2, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_use_alternative_calculation        Use alternative calculation acc. to 8.3 and 8.4, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationAS.prototype.SetOptions = function (property_options_plastic_design_acc_to_45_and_843,
    property_options_use_proportioning_method,
    property_options_use_alternative_calculation) {
    if (typeof property_options_plastic_design_acc_to_45_and_843 !== "undefined") {
        this.addon.settings_as4100.property_options_plastic_design_acc_to_45_and_843 = property_options_plastic_design_acc_to_45_and_843;
    }
    if (typeof property_options_use_proportioning_method !== "undefined") {
        this.addon.settings_as4100.property_options_use_proportioning_method = property_options_use_proportioning_method;
    }
    if (typeof property_options_use_alternative_calculation !== "undefined") {
        this.addon.settings_as4100.property_options_use_alternative_calculation = property_options_use_alternative_calculation;
    }
};

/**
 * Sets Section manufacture
 * @param {Boolean} property_residual_stresses_user_defined     User-defined residual stresses to calculate slenderness limits acc. to tab. 5.2 or tab. 6.2.4, can be undefined (is not set, false as default)
 * @param {String} property_residual_stresses_type              Residual stress (SR - stress relieved, HR - hot-rolled or hot -finished, CF - cold-formed, LW - lightly welded longitudinally, HW - heavily welded longitudinally), can be undefined (is not set, Sr as default)
 */
SteelDesignUltimateConfigurationAS.prototype.SetSectionManufacture = function (property_residual_stresses_user_defined,
    property_residual_stresses_type) {
    if (typeof property_residual_stresses_user_defined != "undefined") {
        this.addon.settings_as4100.property_residual_stresses_user_defined = property_residual_stresses_user_defined;
        ASSetSectionManufacture(this.addon, property_residual_stresses_type);
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_vertical_position_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_vertical_position_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_vertical_position_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_vertical_position_downwards_on_bottom_flange        On profile edge (stabilizing effect)
 */
SteelDesignUltimateConfigurationAS.prototype.SetPositionOfPositiveTransverse = function (property_vertical_position_downwards_on_top_flange,
    property_vertical_position_at_shear_point,
    property_vertical_position_at_center_point,
    property_vertical_position_downwards_on_bottom_flange) {
    ASSERT(this.addon.settings_as4100.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_vertical_position_downwards_on_top_flange !== "undefined") {
        this.addon.settings_as4100.property_vertical_position_downwards_on_top_flange = property_vertical_position_downwards_on_top_flange
    }
    if (typeof property_vertical_position_at_shear_point !== "undefined") {
        this.addon.settings_as4100.property_vertical_position_at_shear_point = property_vertical_position_at_shear_point;
    }
    if (typeof property_vertical_position_at_center_point !== "undefined") {
        this.addon.settings_as4100.property_vertical_position_at_center_point = property_vertical_position_at_center_point;
    }
    if (typeof property_vertical_position_downwards_on_bottom_flange !== "undefined") {
        this.addon.settings_as4100.property_vertical_position_downwards_on_bottom_flange = property_vertical_position_downwards_on_bottom_flange;
    }
};

/**
 * Sets Fabrication of welded sections acc. to tab. 6.3.3 (only one option can be set)
 * @param {Boolean} property_welded_sections_rolled_flange      Rolled flange edges, can be undefined (is not set, true as default)
 * @param {Boolean} property_welded_sections_flame_cut_flange   Flame-cut flange edges, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationAS.prototype.SetFabricationOfWeldedSections = function (property_welded_sections_rolled_flange,
    property_welded_sections_flame_cut_flange) {
    ASSERT(this.addon.settings_as4100.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_welded_sections_rolled_flange !== "undefined") {
        this.addon.settings_as4100.property_welded_sections_rolled_flange = property_welded_sections_rolled_flange;
    }
    if (typeof property_welded_sections_flame_cut_flange !== "undefined") {
        this.addon.settings_as4100.property_welded_sections_flame_cut_flange = property_welded_sections_flame_cut_flange;
    }
};

function ASSetSectionManufacture(addon,
    property_residual_stresses_type) {
    ASSERT(addon.settings_as4100.property_residual_stresses_user_defined, "User-defined residual stresses to calculate slenderness limit must be on");
	switch (property_residual_stresses_type)
    {
        case "SR":
            addon.settings_as4100.property_residual_stresses_sr = true;
            break;
        case "HR":
            addon.settings_as4100.property_residual_stresses_hr = true;
            break;
        case "CF":
            addon.settings_as4100.property_residual_stresses_cf = true;
            break;
        case "LW":
            addon.settings_as4100.property_residual_stresses_lw = true;
            break;
        case "HW":
            addon.settings_as4100.property_residual_stresses_lw = true;
            break;
        default:
            console.log("Wrong type of user-defined residual stresses to calculate slenderness limit type. Correct values are: SR, HR, CF, LW, HW");
    }
}