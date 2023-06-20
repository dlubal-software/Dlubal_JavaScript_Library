/**
 * Creates Steel Design Ultimate Configuration for NBR code of standard
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationNBR (no,
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
SteelDesignUltimateConfigurationNBR.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationNBR.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Ultimate Configuration name, can be undefined
 */
SteelDesignUltimateConfigurationNBR.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (true as default)
 */
SteelDesignUltimateConfigurationNBR.prototype.SetGeneral = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis === "undefined") {
        property_perform_stability_analysis = true;
    }
    this.addon.settings_nbr.property_perform_stability_analysis = property_perform_stability_analysis;
};

/**
 * Sets limit values for special cases design parameters
 * @param {Number} property_limit_values_tension                        Tension, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_compression                    Compression, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_torsion_shear_stress           Shear stress due to torsion (is not set, 0.01 as default)
 * @param {Number} property_limit_values_shear_y                        Shear Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_z                        Shear Z, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_bending_about_major_axis_y     Bending about major axis Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_bending_about_minor_axis_z     Bending about minor axis Z, can be undefined (is not set, 0.001 as default)
 */
SteelDesignUltimateConfigurationNBR.prototype.SetLimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_torsion_shear_stress,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_nbr, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        undefined, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
    if (typeof property_limit_values_torsion_shear_stress !== "undefined") {
        this.addon.settings_nbr.property_limit_values_torsion_shear_stress = property_limit_values_torsion_shear_stress;
    }
};

/**
 * Sets Options for Design parameters
 * @param {Number} property_reduction_coefficient_c_t   Net area reduction coefficient, can be undefined (is not set, 1.0 as default)
 * @param {Boolean} property_wall_thickness_reduction   Use reduced wall thickness for circular pipes in shear acc. to 5.4.3.6, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationNBR.prototype.SetOptions = function (property_reduction_coefficient_c_t,
    property_wall_thickness_reduction) {
    if (typeof property_reduction_coefficient_c_t !== "undefined") {
        this.addon.settings_nbr.property_reduction_coefficient_c_t = property_reduction_coefficient_c_t;
    }
    if (typeof property_wall_thickness_reduction !== "undefined") {
        this.addon.settings_nbr.property_wall_thickness_reduction = property_wall_thickness_reduction;
    }
};

/**
 * Sets Position of positive Transverse load application
 * @param {Boolean} property_vertical_position_downwards_on_top_flange      On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_vertical_position_at_shear_point               At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_vertical_position_at_center_point              At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_vertical_position_downwards_on_bottom_flange   On profile edge (stabilizing effect), can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationNBR.prototype.SetPositionOfPositiveTransverse = function (property_vertical_position_downwards_on_top_flange,
    property_vertical_position_at_shear_point,
    property_vertical_position_at_center_point,
    property_vertical_position_downwards_on_bottom_flange) {
    ASSERT(this.addon.settings_nbr.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_vertical_position_downwards_on_top_flange !== "undefined") {
        this.addon.settings_nbr.property_vertical_position_downwards_on_top_flange = property_vertical_position_downwards_on_top_flange;
    }
    if (typeof property_vertical_position_at_shear_point !== "undefined") {
        this.addon.settings_nbr.property_vertical_position_at_shear_point = property_vertical_position_at_shear_point;
    }
    if (typeof property_vertical_position_at_center_point !== "undefined") {
        this.addon.settings_nbr.property_vertical_position_at_center_point = property_vertical_position_at_center_point;
    }
    if (typeof property_vertical_position_downwards_on_bottom_flange !== "undefined") {
        this.addon.settings_nbr.property_vertical_position_downwards_on_bottom_flange = property_vertical_position_downwards_on_bottom_flange;
    }
};