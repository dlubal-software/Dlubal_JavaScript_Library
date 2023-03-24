/**
 * Creates Steel Design Ultimate Configuration
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {String} name             Ultimate Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationIS (no,
    name,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
    this.addon = createBaseSteelDesignConfiguration(STEEL_DESIGN.steel_design_uls_configurations, no, name, members_no, member_sets_no, comment, params);
}

/**
 * @returns Ultimate Configuration index
 */
SteelDesignUltimateConfigurationIS.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationIS.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationIS.prototype.General = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis !== "undefined") {
        this.addon.settings_is.property_perform_stability_analysis = property_perform_stability_analysis;
    }
};

/**
 * Sets Limit values for special cases design parameters
 * @param {Number} property_limit_values_tension                        Tension, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_compression                    Compression, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_y                        Shear Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_shear_z                        Shear Z, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_torsion                        Shear stress due to torsion, can be undefined (is not set, 0.010 as default)
 * @param {Number} property_limit_values_bending_about_major_axis_y     Bending about major axis Y, can be undefined (is not set, 0.001 as default)
 * @param {Number} property_limit_values_bending_about_minor_axis_z     Bending about minor axis Z, can be undefined (is not set, 0.001 as default)
 */
SteelDesignUltimateConfigurationIS.prototype.LimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_is, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
};

/**
 * Sets Elastic design
 * @param {Boolean} property_elastic_design     Elastic design (also for class 1 and class 2 sections), can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationIS.prototype.ElasticDesign = function (property_elastic_design) {
    if (typeof property_elastic_design !== "undefined") {
        this.addon.settings_is.property_elastic_design = property_elastic_design;
    }
};

/**
 * Sets Design of shear buckling acc. to 8.4.2
 * @param {Boolean} property_activate_shear_buckling            Active, can be undefined (is not set, true as default)
 * @param {Boolean} property_design_of_shear_buckling_method_a  Design of shear buckling acc. to 8.4.2.2(a), can be undefined (is not set, true as default)
 * @param {Boolean} property_design_of_shear_buckling_method_b  If possible, design of shear buckling acc. to 8.4.2.2(b), otherwise acc. to 8.4.2.2(a), can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationIS.prototype.DesignOfShearBuckling = function (property_activate_shear_buckling,
    property_design_of_shear_buckling_method_a,
    property_design_of_shear_buckling_method_b) {
    if (typeof property_activate_shear_buckling !== "undefined") {
        this.addon.settings_is.property_activate_shear_buckling = property_activate_shear_buckling;
    }
    if (typeof property_design_of_shear_buckling_method_a !== "undefined") {
        ASSERT(this.addon.settings_is.property_activate_shear_buckling, "Design of shear buckling must be on");
        this.addon.settings_is.property_design_of_shear_buckling_method_a = property_design_of_shear_buckling_method_a;
    }
    if (typeof property_design_of_shear_buckling_method_b !== "undefined") {
        ASSERT(this.addon.settings_is.property_activate_shear_buckling, "Design of shear buckling must be on");
        this.addon.settings_is.property_design_of_shear_buckling_method_b = property_design_of_shear_buckling_method_b;
    }
};

/**
 * Sets Combined axial force and bending moment acc. to 9.3.1.1
 * @param {Boolean} property_use_conservative_equation  Use conservative equation, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationIS.prototype.Combined = function (property_use_conservative_equation) {
    if (typeof property_use_conservative_equation !== "undefined") {
        this.addon.settings_is.property_use_conservative_equation = property_use_conservative_equation;
    }
};

/**
 * Sets Calculation method (Perform stability design is on)
 * @param {Boolean} property_structure_type_sway_yy                         Sway y-y, can be undefined (is not set, false as default)
 * @param {Boolean} property_structure_type_sway_zz                         Sway z-z, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationIS.prototype.CalculationMethod = function (property_structure_type_sway_yy,
    property_structure_type_sway_zz) {
    ASSERT(this.addon.settings_is.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_structure_type_sway_yy !== "undefined") {
        this.addon.settings_is.property_structure_type_sway_yy = property_structure_type_sway_yy;
    }
    if (typeof property_structure_type_sway_zz !== "undefined") {
        this.addon.settings_is.property_structure_type_sway_zz = property_structure_type_sway_zz;
    }
};

/**
 * Sets Position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_vertical_position_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_vertical_position_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_vertical_position_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_vertical_position_downwards_on_bottom_flange        On profile edge (stabilizing effect)
 */
SteelDesignUltimateConfigurationIS.prototype.PositionOfPositiveTransverse = function (property_vertical_position_downwards_on_top_flange,
    property_vertical_position_at_shear_point,
    property_vertical_position_at_center_point,
    property_vertical_position_downwards_on_bottom_flange) {
    ASSERT(this.addon.settings_is.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_vertical_position_downwards_on_top_flange !== "undefined") {
        this.addon.settings_is.property_vertical_position_downwards_on_top_flange = property_vertical_position_downwards_on_top_flange
    }
    if (typeof property_vertical_position_at_shear_point !== "undefined") {
        this.addon.settings_is.property_vertical_position_at_shear_point = property_vertical_position_at_shear_point;
    }
    if (typeof property_vertical_position_at_center_point !== "undefined") {
        this.addon.settings_is.property_vertical_position_at_center_point = property_vertical_position_at_center_point;
    }
    if (typeof property_vertical_position_downwards_on_bottom_flange !== "undefined") {
        this.addon.settings_is.property_vertical_position_downwards_on_bottom_flange = property_vertical_position_downwards_on_bottom_flange;
    }
};