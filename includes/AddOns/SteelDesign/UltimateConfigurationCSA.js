/**
 * Creates Steel Design Ultimate Configuration
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {String} name             Ultimate Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationCSA (no,
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
SteelDesignUltimateConfigurationCSA.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationCSA.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationCSA.prototype.General = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis !== "undefined") {
        this.addon.settings_csa.property_perform_stability_analysis = property_perform_stability_analysis;
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
SteelDesignUltimateConfigurationCSA.prototype.LimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_csa, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
};

/**
 * Sets Options
 * @param {Boolean} property_options_elastic_design                         Elastic design also for section class 1 or 2, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_consider_n_equal_to_1_34               Parameter for compressive resistance acc. to 13.3.1, Consider n = 1.34, can be undefined (is not set, true as default)
 * @param {Boolean} property_options_consider_n_equal_to_2_24               Parameter for compressive resistance acc. to 13.3.1, Consider n = 2.24, can be undefined (is not set, true as default)
 * @param {Boolean} property_options_calculate_omega_1_according_to_13_8_6  Coefficient of uniform bending effect, automatically acc. to 13.8.6, can be undefined (is not set, true as default)
 * @param {Boolean} property_options_set_omega_1_manually                   Coefficient of uniform bending effect, user-defined value, can be undefined (is not set, false as default)
 * @param {Number} property_options_omega_1_xu_user_defined_value           Value of omega1 in y-direction, can be undefined (is not set, 1.00 as default)
 * @param {Number} property_options_omega_1_yv_user_defined_value           Value of omega1 in z-direction, can be undefined (is not set, 1.00 as default)
 */
SteelDesignUltimateConfigurationCSA.prototype.Options = function (property_options_elastic_design,
    property_options_consider_n_equal_to_1_34,
    property_options_consider_n_equal_to_2_24,
    property_options_calculate_omega_1_according_to_13_8_6,
    property_options_set_omega_1_manually,
    property_options_omega_1_xu_user_defined_value,
    property_options_omega_1_yv_user_defined_value) {
    if (typeof property_options_elastic_design !== "undefined") {
        this.addon.settings_csa.property_options_elastic_design = property_options_elastic_design;
    }
    if (typeof property_options_consider_n_equal_to_1_34 !== "undefined") {
        this.addon.settings_csa.property_options_consider_n_equal_to_1_34 = property_options_consider_n_equal_to_1_34;
    }
    if (typeof property_options_consider_n_equal_to_2_24 !== "undefined") {
        this.addon.settings_csa.property_options_consider_n_equal_to_2_24 = property_options_consider_n_equal_to_2_24;
    }
    if (typeof property_options_calculate_omega_1_according_to_13_8_6 !== "undefined") {
        this.addon.settings_csa.property_options_calculate_omega_1_according_to_13_8_6 = property_options_calculate_omega_1_according_to_13_8_6;
    }
    if (typeof property_options_set_omega_1_manually !== "undefined") {
        this.addon.settings_csa.property_options_set_omega_1_manually = property_options_set_omega_1_manually;
    }
    if (typeof property_options_omega_1_xu_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_csa.property_options_set_omega_1_manually, "User-defined value must be on");
        this.addon.settings_csa.property_options_omega_1_xu_user_defined_value = property_options_omega_1_xu_user_defined_value;
    }
    if (typeof property_options_omega_1_yv_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_csa.property_options_set_omega_1_manually, "User-defined value must be on");
        this.addon.settings_csa.property_options_omega_1_yv_user_defined_value = property_options_omega_1_yv_user_defined_value;
    }
};

/**
 * Sets Structure type
 * @param {Boolean} property_structure_type_unbraced_frame_y_direction  Unbraced frame in y-direction, can be undefined (is not set, false as default)
 * @param {Boolean} property_structure_type_unbraced_frame_z_direction  Unbraced frame in z-direction, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationCSA.prototype.StructureType = function (property_structure_type_unbraced_frame_y_direction,
    property_structure_type_unbraced_frame_z_direction) {
    ASSERT(this.addon.settings_csa.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_structure_type_unbraced_frame_y_direction !== "undefined") {
        this.addon.settings_csa.property_structure_type_unbraced_frame_y_direction = property_structure_type_unbraced_frame_y_direction;
    }
    if (typeof property_structure_type_unbraced_frame_z_direction !== "undefined") {
        this.addon.settings_csa.property_structure_type_unbraced_frame_z_direction = property_structure_type_unbraced_frame_z_direction;
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_load_act_vp_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_load_act_vp_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_act_vp_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_act_vp_downwards_on_bottom_flange        On profile edge (stabilizing effect)
 */
SteelDesignUltimateConfigurationCSA.prototype.PositionOfPositiveTransverse = function (property_load_act_vp_downwards_on_top_flange,
    property_load_act_vp_at_shear_point,
    property_load_act_vp_at_center_point,
    property_load_act_vp_downwards_on_bottom_flange) {
    ASSERT(this.addon.settings_csa.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_load_act_vp_downwards_on_top_flange !== "undefined") {
        this.addon.settings_csa.property_load_act_vp_downwards_on_top_flange = property_load_act_vp_downwards_on_top_flange
    }
    if (typeof property_load_act_vp_at_shear_point !== "undefined") {
        this.addon.settings_csa.property_load_act_vp_at_shear_point = property_load_act_vp_at_shear_point;
    }
    if (typeof property_load_act_vp_at_center_point !== "undefined") {
        this.addon.settings_csa.property_load_act_vp_at_center_point = property_load_act_vp_at_center_point;
    }
    if (typeof property_load_act_vp_downwards_on_bottom_flange !== "undefined") {
        this.addon.settings_csa.property_load_act_vp_downwards_on_bottom_flange = property_load_act_vp_downwards_on_bottom_flange;
    }
};