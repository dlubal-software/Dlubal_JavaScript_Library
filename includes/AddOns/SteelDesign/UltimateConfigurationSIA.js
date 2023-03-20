/**
 * Creates Steel Design Ultimate Configuration
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {String} name             Ultimate Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationSIA (no,
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
SteelDesignUltimateConfigurationSIA.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationSIA.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationSIA.prototype.General = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis !== "undefined") {
        this.addon.settings_sia.property_perform_stability_analysis = property_perform_stability_analysis;
    }
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
SteelDesignUltimateConfigurationSIA.prototype.LimitValues = function (property_limit_values_axial_force,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_sia, undefined, undefined, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
    if (typeof property_limit_values_axial_force !== "undefined") {
        this.addon.settings_sia.property_limit_values_axial_force = property_limit_values_axial_force;
    }
};

/**
 * Sets Design parameters options
 * @param {Boolean} property_options_consider_shear_area_acc_to_5_2_4   Consider shear area acc. to 5.2.4, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_consider_shear_buckling            Consider shear buckling design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationSIA.prototype.Options = function (property_options_consider_shear_area_acc_to_5_2_4,
    property_options_consider_shear_buckling) {
    if (typeof property_options_consider_shear_area_acc_to_5_2_4 !== "undefined") {
        this.addon.settings_sia.property_options_consider_shear_area_acc_to_5_2_4 = property_options_consider_shear_area_acc_to_5_2_4;
    }
    if (typeof property_options_consider_shear_buckling !== "undefined") {
        this.addon.property_options_consider_shear_buckling = property_options_consider_shear_buckling;
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_load_acts_vp_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_load_acts_vp_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_downwards_on_bottom_flange        On profile edge (is not set, stabilizing effect)
 */
SteelDesignUltimateConfigurationSIA.prototype.PositionOfPositiveTransverse = function (property_load_acts_vp_downwards_on_top_flange,
    property_load_acts_vp_at_shear_point,
    property_load_acts_vp_at_center_point,
    property_load_acts_vp_downwards_on_bottom_flange) {
    setSteelDesignUltimateConfiguration_PositionOfPositiveTransverse(this.addon.settings_sia, property_load_acts_vp_downwards_on_top_flange, property_load_acts_vp_at_shear_point, property_load_acts_vp_at_center_point,
        property_load_acts_vp_downwards_on_bottom_flange);
};