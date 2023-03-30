/**
 * Creates Steel Design Strength Configuration for AISC code of standard
 * @param {Number} no               Strength Configuration index, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignStrengthConfigurationAISC (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
    this.addon = createBaseSteelDesignConfiguration(STEEL_DESIGN.steel_design_uls_configurations, no, members_no, member_sets_no, comment, params);
}

/**
 * @returns Strength Configuration index
 */
SteelDesignStrengthConfigurationAISC.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Strength Configuration object
 */
SteelDesignStrengthConfigurationAISC.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Fire resistance Configuration name, can be undefined
 */
SteelDesignStrengthConfigurationAISC.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (true as default)
 */
SteelDesignStrengthConfigurationAISC.prototype.General = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis === "undefined") {
        property_perform_stability_analysis = true;
    }
    this.addon.settings_aisc.property_perform_stability_analysis = property_perform_stability_analysis;
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
SteelDesignStrengthConfigurationAISC.prototype.LimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_aisc, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
};

/**
 * Sets local buckling
 * @param {Boolean} property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b   Check of the width-to-thickness ratio of elements not defined in Tab. B4.1b, can be undefined (is not set, false as default)
 * @param {Number} property_unstiffened_elements                                                Unstiffened elements, can be undefined (is not set, 12.500)
 * @param {Number} property_stiffened_elements                                                  Stiffened elements, can be undefined (is not set, 42.000 as default)
 */
SteelDesignStrengthConfigurationAISC.prototype.LocalBuckling = function (property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b,
    property_unstiffened_elements,
    property_stiffened_elements) {
    if (typeof property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b !== "undefined") {
        this.addon.settings_aisc.property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b = property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b;
    }
    if (typeof property_unstiffened_elements !== "undefined") {
        ASSERT(this.addon.settings_aisc.property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b, "Check of the width-to-thickness ratio of elements not defined in Tab. B4.1b must be on");
        this.addon.settings_aisc.property_unstiffened_elements = property_unstiffened_elements;
    }
    if (typeof property_stiffened_elements !== "undefined") {
        ASSERT(this.addon.settings_aisc.property_check_width_thickness_ratio_of_elements_not_defined_in_tab_b4_1b, "Check of the width-to-thickness ratio of elements not defined in Tab. B4.1b must be on");
        this.addon.settings_aisc.property_stiffened_elements = property_stiffened_elements;
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_load_acts_vp_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_load_acts_vp_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_downwards_on_bottom_flange        On profile edge (stabilizing effect)
 */
SteelDesignStrengthConfigurationAISC.prototype.PositionOfPositiveTransverse = function (property_load_acts_vp_downwards_on_top_flange,
    property_load_acts_vp_at_shear_point,
    property_load_acts_vp_at_center_point,
    property_load_acts_vp_downwards_on_bottom_flange) {
    setSteelDesignUltimateConfiguration_PositionOfPositiveTransverse(this.addon.settings_aisc, property_load_acts_vp_downwards_on_top_flange, property_load_acts_vp_at_shear_point, property_load_acts_vp_at_center_point,
        property_load_acts_vp_downwards_on_bottom_flange);
};