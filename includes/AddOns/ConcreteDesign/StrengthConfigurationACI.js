include("../../Tools/high_level_functions_support.js");

/**
 * Creates Concrete design strength configuration (ACI standard)
 * @class
 * @constructor
 * @param {Number} no           Strength configuration number, can be undefined
 * @param {Array} surfaces_no   Assigned surfaces numbers, can be undefined
 * @param {Array} members_no    Assigned members numbers, can be undefined
 * @param {Array} nodes_no      Assigned nodes numbers, can be undefined
 * @param {String} comment      Comment, can be undefined
 * @param {Object} params       Additional parameters, can be undefined
 */
function ConcreteDesignStrengthConfigurationACI (no,
    surfaces_no,
    members_no,
    nodes_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_uls_configurations, no, surfaces_no, members_no, nodes_no, comment, params);
}

/**
 * @returns Strength configuration index
 */
ConcreteDesignStrengthConfigurationACI.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Strength configuration object
 */
ConcreteDesignStrengthConfigurationACI.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Strength configuration name, can be undefined
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets Consider internal forces for concrete design
 * @param {Boolean} property_member_axial_forces            Axial forces, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_bending_moments_my      Bending moment in Y, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_bending_moments_mz      Bending moment in Z, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_torsional_moments       Torsional moments, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_shear_forces_vy         Shear forces in Y, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_shear_forces_vz         Shear forces in Z, can be undefined (is not set, true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_ConsiderInternalForces = function (property_member_axial_forces,
    property_member_bending_moments_my,
    property_member_bending_moments_mz,
    property_member_torsional_moments,
    property_member_shear_forces_vy,
    property_member_shear_forces_vz) {
    SetConcreteDesignMembersConsiderInternalForces(this.addon.settings_member_aci318, property_member_axial_forces, property_member_bending_moments_my, property_member_bending_moments_mz, property_member_torsional_moments,
        property_member_shear_forces_vy, property_member_shear_forces_vz);
};

/**
 * Sets Internal Force Reduction in z-Direction
 * @param {Boolean} property_member_redistribution_of_moments_in_continuous_flexural_members    Redistribution of moments in continuous flexural members acc. to 6.6.5, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_reduction_of_shear_at_support                               Reduction of shear at the support acc. to 9.4.3.2, can be undefined (is not set, true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_InternalForceReductionZ = function (property_member_redistribution_of_moments_in_continuous_flexural_members,
    property_member_reduction_of_shear_at_support) {
    SetConcreteDesignMembersInternalForceReductionZ(this.addon.settings_member_aci318, property_member_redistribution_of_moments_in_continuous_flexural_members, undefined, property_member_reduction_of_shear_at_support);
};

/**
 * Sets Required longitudinal reinforcement
 * @param {String} property_member_reinforcement_layout                                                         Reinforcement layout (TOP_BOTTOM_OPTIMIZED_DISTRIBUTION, TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT, OPTIMIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, OPTIMIZED_PROVIDED_REINFORCEMENT as default)
 * @param {String/Number} property_member_reinforcement_diameter_for_preliminary_design                         Reinforcement diameter for preliminary design (MAX_OF_ALL or user-defined value), can be undefined (is not set as default, otherwise MAX_OF_ALL as default)
 * @param {Boolean} property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement   Include tensile force due to shear in required longitudinal reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_RequiredLongitudinalReinforcement = function (property_member_reinforcement_layout,
    property_member_reinforcement_diameter_for_preliminary_design,
    property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement) {
    SetConcreteDesignMembersRequiredLongitudinalReinforcement(this.addon.settings_member_aci318, property_member_reinforcement_layout, property_member_reinforcement_diameter_for_preliminary_design, 
        undefined, undefined, property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement);
};

/**
 * Sets Provided Longitudinal Reinforcement
 * @param {Boolean} property_member_design_check_for_tensile_force_in_longitudinal_reinforcement    Design check for tensile force in longitudinal reinforcement, including tension due to shear acc. to 9.7.3, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_embedment_length_of_continuing_flexural_tension_reinforcement   Embedment length of continuous flexural tension reinforcement acc. to 9.7.3.4, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_termination_of_reinforcement                                    Termination of flexural tension reinforcement acc. to 9.7.3.5, can be undefined (is not set, false as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_ProvidedLongitudinalReinforcement = function (property_member_design_check_for_tensile_force_in_longitudinal_reinforcement,
    property_member_embedment_length_of_continuing_flexural_tension_reinforcement,
    property_member_termination_of_reinforcement) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_design_check_for_tensile_force_in_longitudinal_reinforcement !== "undefined") {
        this.addon.settings_member_aci318.property_member_design_check_for_tensile_force_in_longitudinal_reinforcement = property_member_design_check_for_tensile_force_in_longitudinal_reinforcement;
    }
    if (typeof property_member_embedment_length_of_continuing_flexural_tension_reinforcement !== "undefined") {
        this.addon.settings_member_aci318.property_member_embedment_length_of_continuing_flexural_tension_reinforcement = property_member_embedment_length_of_continuing_flexural_tension_reinforcement;
    }
    if (typeof property_member_termination_of_reinforcement !== "undefined") {
        this.addon.settings_member_aci318.property_member_termination_of_reinforcement = property_member_termination_of_reinforcement;
    }
};

ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_Factors = function (property_member_strength_reduction_factor_compressive,
    property_member_strength_reduction_factor_tensile,
    property_member_strength_reduction_factor_shear_and_torsion) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_strength_reduction_factor_compressive !== "undefined") {
        this.addon.settings_member_aci318.property_member_strength_reduction_factor_compressive = property_member_strength_reduction_factor_compressive;
    }
    if (typeof property_member_strength_reduction_factor_tensile !== "undefined") {
        this.addon.settings_member_aci318.property_member_strength_reduction_factor_tensile = property_member_strength_reduction_factor_tensile;
    }
    if (typeof property_member_strength_reduction_factor_shear_and_torsion !== "undefined") {
        this.addon.settings_member_aci318.property_member_strength_reduction_factor_shear_and_torsion = property_member_strength_reduction_factor_shear_and_torsion;
    }
};

/**
 * Sets Minimum Reinforcement Acc. to Standard
 * @param {Boolean} property_member_minimum_longitudinal_reinforcement  Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_minimum_shear_reinforcement         Minimum shear reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_minimum_construction_reinforcement  Minimum construction reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_MinimumReinforcement = function (property_member_minimum_longitudinal_reinforcement,
    property_member_minimum_shear_reinforcement,
    property_member_minimum_construction_reinforcement) {
    SetConcreteDesignMembersMinimumReinforcement(this.addon.settings_member_aci318, property_member_minimum_longitudinal_reinforcement, property_member_minimum_shear_reinforcement,
        property_member_minimum_construction_reinforcement);
};

/**
 * Sets Required Shear Reinforcement - Shear Capacity
 * @param {String} shear_reinforcement  Use required longitudinal reinforcement (REQUIRED)
 *                                      Use provided longitudinal reinforcement (PROVIDED)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_RequiredShearReinforcement = function (shear_reinforcement) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignRequiredShearReinforcementType(this.addon.settings_member_aci318, "member", ["REQUIRED", "PROVIDED"], shear_reinforcement);
};

/**
 * Sets Torsion Capacity
 * @param {String} property_member_type_of_torsion  Type of torsion acc. to 22.7.1.1 and 22.7.3.1 (TORSION_EQUILIBRIUM, TORSION_COMPATIBILITY), can be undefined (TORSION_EQUILIBRIUM as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_TorsionCapacity = function (property_member_type_of_torsion) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    this.addon.settings_member_aci318.property_member_type_of_torsion = EnumValueFromJSHLFTypeName(
        property_member_type_of_torsion,
        "torsion",
        {
            "TORSION_EQUILIBRIUM": ulsconfig_member_aci318.E_TYPE_OF_TORSION_EQUILIBRIUM,
            "TORSION_COMPATIBILITY": ulsconfig_member_aci318.E_TYPE_OF_TORSION_COMPATIBILITY
        },
        ulsconfig_member_aci318.E_TYPE_OF_TORSION_EQUILIBRIUM);
};

/**
 * Sets Shear and Torsion Reinforcement
 * @param {String} property_member_nominal_shear_strength_vc        Nominal shear strength Vc acc. to Table 22.5.5.1, can be undefined (is not set, TORSION_EQUILIBRIUM as default)
 * @param {Number} property_member_inclination_of_concrete_strut    Inclination of concrete strut acc. to 22.7.6.1, can be undefined (is not set, 45.0 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_ShearAndTorsionReinforcement = function (property_member_nominal_shear_strength_vc,
    property_member_inclination_of_concrete_strut) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    this.addon.settings_member_aci318.property_member_nominal_shear_strength_vc = EnumValueFromJSHLFTypeName(
        property_member_nominal_shear_strength_vc,
        "strength",
        {
            "EQUATION_A": ulsconfig_member_aci318.E_NOMINAL_SHEAR_STRENGTH_EQUATION_A,
            "EQUATION_B": ulsconfig_member_aci318.E_NOMINAL_SHEAR_STRENGTH_EQUATION_B,
            "MAX_OF_A_B": ulsconfig_member_aci318.E_NOMINAL_SHEAR_STRENGTH_MAX_OF_A_B
        },
        ulsconfig_member_aci318.E_NOMINAL_SHEAR_STRENGTH_MAX_OF_A_B);
    if (typeof property_member_inclination_of_concrete_strut !== "undefined") {
        this.addon.settings_member_aci318.property_member_inclination_of_concrete_strut = property_member_inclination_of_concrete_strut;
    }
};

/**
 * Sets Sets Depth Limitation of Neutral Axis
 * @param {Boolean} property_member_consider_neutral_axis_depth_limitation                      Consider depth limitation of neutral axis acc. to 9.3.3.1, can be undefined (is not set, false as default)
 * @param {String/Number} property_member_value_of_neutral_axis_depth_limitation_user_value     Value of neutral axis depth limitation (AUTOMATICALLY or user number value), can be undefined (is not set, AUTOMATICALLY as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_NeutralAxisDepthLimitation = function(property_member_consider_neutral_axis_depth_limitation,
    property_member_value_of_neutral_axis_depth_limitation_user_value) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_member_aci318, "member", property_member_consider_neutral_axis_depth_limitation, property_member_value_of_neutral_axis_depth_limitation_user_value);
};

/**
 * Sets Calculation setting
 * @param {Boolean} property_member_nett_concrete_area  Net concrete area, can be undefined (true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_CalculationSetting = function (property_member_nett_concrete_area) {
    SetConcreteDesignMembersCalculationSetting(this.addon.settings_member_aci318, property_member_nett_concrete_area);
};

/**
 * Sets Epoxy factor
 * @param {String} epoxy_factor_type    Epoxy factor type, can be undefined (is not set, UNCOATED_OR_ZINC_COATED as default)
 *                                      - Epoxy-coated or zinc and epoxy dual-coated reinforcement (EPOXY_COATED_OR_ZINC)
 *                                      - Uncoated or zinc-coated (galvanized) reinforcement (UNCOATED_OR_ZINC_COATED)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetMembers_EpoxyFactor = function (epoxy_factor_type) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignMemberEpoxyFactorType(this.addon.settings_member_aci318, epoxy_factor_type);
};

/**
 * Sets Unbraced Column
 * @param {Number} property_stability_index_qy  Stability index for story in y-direction, can be undefined (is not set, 0.05 as default)
 * @param {Number} property_stability_index_qz  Stability index for story in z-direction, can be undefined (is not set, 0.05 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetStability_UnbracedColumn = function (property_stability_index_qy,
    property_stability_index_qz) {
    SetConcreteDesignStabilityUnbracedColumn(this.addon.settings_member_aci318, property_stability_index_qy, property_stability_index_qz);
};

/**
 * Sets Stiffness Reduction Coefficient to Consider Creep due to Sustained Load
 * @param {String/Number} property_beta_dns     Ratio of sustained axial load to factored axial load (SIMPLIFIED, CALCULATED or user value), can be undefined (is not set, SIMPLIFIED as default)
 * @param {String/Number} property_beta_ds_y    Ratio of sustained shear load to factored shear load in y-direction (CALCULATED or user value), can be undefined (is not set, CALCULATED as default)
 * @param {String/Number} property_beta_ds_z    Ratio of sustained shear load to factored shear load in z-direction (CALCULATED or user value), can be undefined (is not set, CALCULATED as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetStability_StiffnessReductionCoefficientToConsiderCreep = function (property_beta_dns,
    property_beta_ds_y,
    property_beta_ds_z) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    function SetValues (property_beta_name, property_value) {
        if (typeof property_beta_name === "undefined") {
            return;
        }
        var string_values = {};
        var default_value = "";
        var property_beta_dns = property_beta_name === "property_beta_dns";
        var property_beta_ds_y = property_beta_name === "property_beta_ds_y";
        var property_beta_ds_z = property_beta_name === "property_beta_ds_z";
        if (property_beta_dns) {
            string_values = {
                "SIMPLIFIED": ulsconfig_member_aci318.E_BETA_DNS_SIMPLIFIED,
                "CALCULATED": ulsconfig_member_aci318.E_BETA_DNS_CALCULATED
            };
            default_value = ulsconfig_member_aci318.E_BETA_DNS_SIMPLIFIED;
        }
        else if (property_beta_ds_y || property_beta_ds_z) {
            string_values = {
                "CALCULATED": ulsconfig_member_aci318.E_BETA_DS_CALCULATED
            };
            default_value = ulsconfig_member_aci318.E_BETA_DS_CALCULATED;
        }
        else {
            ASSERT(false, "StiffnessReductionCoefficientToConsiderCreep");
        }
        if (typeof property_value !== "undefined") {
            if (typeof property_value === "string") {
                if (string_values[property_value] === undefined) {
                    console.log("Wrong ratio (beta) type. Value was: " + property_value);
                    console.log("Correct values are: " + Object.keys(string_values));
                    return;
                }
                if (property_beta_dns) {
                    this.addon.settings_member_aci318.property_beta_dns = string_values[property_value];
                }
                else if (property_beta_ds_y) {
                    this.addon.settings_member_aci318.property_beta_ds_y = string_values[property_value];
                }
                else {
                    this.addon.settings_member_aci318.property_beta_ds_z = string_values[property_value];
                }
            }
            else {
                ASSERT(typeof property_value === "number", "Ratio user value must be " + string_values + " or number");
                if (property_beta_dns) {
                    this.addon.settings_member_aci318.property_beta_dns = ulsconfig_member_aci318.E_BETA_DNS_USER_DEFINED;
                    this.addon.settings_member_aci318.property_beta_dns_user_value = property_value;
                }
                else if (property_beta_ds_y) {
                    this.addon.settings_member_aci318.property_beta_ds_y = ulsconfig_member_aci318.E_BETA_DS_USER_DEFINED;
                    this.addon.settings_member_aci318.property_beta_ds_y_user_value = property_value;
                }
                else {
                    ASSERT(property_beta_ds_z, "StiffnessReductionCoefficientToConsiderCreep");
                    this.addon.settings_member_aci318.property_beta_ds_z = ulsconfig_member_aci318.E_BETA_DS_USER_DEFINED;
                    this.addon.settings_member_aci318.property_beta_ds_z_user_value = property_value;
                }
            }
        }
        else {
            if (property_beta_dns) {
                this.addon.settings_member_aci318.property_beta_dns = default_value;
            }
            else if (property_beta_ds_y) {
                this.addon.settings_member_aci318.property_beta_ds_y = default_value;
            }
            else {
                this.addon.settings_member_aci318.property_beta_ds_z = default_value;
            }
        }
    }
    SetValues(typeof property_beta_dns !== "undefined" ? "property_beta_dns" : undefined, property_beta_dns);
    SetValues(typeof property_beta_ds_y !== "undefined" ? "property_beta_ds_y" : undefined, property_beta_ds_y);
    SetValues(typeof property_beta_ds_z !== "undefined" ? "property_beta_ds_z" : undefined, property_beta_ds_z);
};

/**
 * Sets Moment Magnification
 * @param {String} property_sway_moment_magnifier_method    Sway moment magnifier δs method (Q_METHOD, P_METHOD), can be undefined (is not set, Q_METHOD as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetStability_MomentMagnification = function (property_sway_moment_magnifier_method) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    this.addon.settings_member_aci318.property_sway_moment_magnifier_method = EnumValueFromJSHLFTypeName(
        property_sway_moment_magnifier_method,
        "sway moment magnifier",
        {
            "Q_METHOD": ulsconfig_member_aci318.E_SWAY_MOMENT_MAGNIFIER_Q_METHOD,
            "P_METHOD": ulsconfig_member_aci318.E_SWAY_MOMENT_MAGNIFIER_P_METHOD
        },
        ulsconfig_member_aci318.E_SWAY_MOMENT_MAGNIFIER_Q_METHOD);
};

/**
 * Sets Required Reinforcement
 * @param {String} property_stability_reinforcement_layout                              Reinforcement layout (TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, UNIFORMLY_SURROUNDING as default)
 * @param {String/Number} reinforcement_diameter_for_preliminary_design_user_value      Reinforcement diameter for preliminary design (MAX_OF_ALL or user number value), can be undefined (is not set, MAX_OF_ALL as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetStability_RequiredReinforcement = function (property_stability_reinforcement_layout,
    reinforcement_diameter_for_preliminary_design_user_value) {
    SetConcreteDesignStabilityRequiredReinforcement(this.addon.settings_member_aci318, property_stability_reinforcement_layout, reinforcement_diameter_for_preliminary_design_user_value);
};

/**
 * Sets Design method
 * @param {String} optimization_type    Design method optimization type, can be undefined (is not set, YES as default)
 *                                      - No optimization of design internal forces (NO)
 *                                      - Optimization of design internal forces (YES)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_DesignMethod = function (optimization_type) {
    SetConcreteDesignSurfacesDesignMethod(this.addon.settings_surface_aci318, optimization_type);
};

/**
 * Sets Internal Forces Diagram Used for Design
 * @param {Boolean} property_subtraction_of_rib_components  Subtraction of rib components for the ULS calculation and for the analytic method of SLS calculation, can be undefined (true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_InternalForcesDiagramUsedForDesign = function (property_subtraction_of_rib_components) {
    SetConcreteDesignSurfacesInternalForcesDiagramUsedForDesign(this.addon.settings_surface_aci318, property_subtraction_of_rib_components);
};

ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_Factors = function (property_surface_strength_reduction_factor_compressive,
    property_surface_strength_reduction_factor_tensile,
    property_surface_strength_reduction_factor_shear_and_torsion) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_surface_strength_reduction_factor_compressive !== "undefined") {
        this.addon.settings_surface_aci318.property_surface_strength_reduction_factor_compressive = property_surface_strength_reduction_factor_compressive;
    }
    if (typeof property_surface_strength_reduction_factor_tensile !== "undefined") {
        this.addon.settings_surface_aci318.property_surface_strength_reduction_factor_tensile = property_surface_strength_reduction_factor_tensile;
    }
    if (typeof property_surface_strength_reduction_factor_shear_and_torsion !== "undefined") {
        this.addon.settings_surface_aci318.property_surface_strength_reduction_factor_shear_and_torsion = property_surface_strength_reduction_factor_shear_and_torsion;
    }
};

/**
 * Sets Minimum longitudinal reinforcement acc. to standard
 * @param {Boolean} property_minimum_longitudinal_reinforcement_acc_to_standard     Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {String} reinforcement_type                                               Minimum longitudinal reinforcement acc. to standard type, can be undefined (is not set, PLATES as default)
 *                                                                                  - Minimum longitudinal reinforcement for plates acc. to Table 7.6.1.1, 8.6.1.1 (PLATES)
                                                                                    - Minimum longitudinal reinforcement for walls acc. to Chapter 11 (WALLS)
 * @param {String} min_reinforcement_direction                                      Direction of minimum reinforcement, can be undefined (is not set, MAIN_TENSION_ELEMENT as default)
                                                                                    - On main tension side (MAIN_TENSION_ELEMENT)
                                                                                    - In tension direction (MAIN_TENSION_SURFACE)
                                                                                    - Defined (DEFINED)
 * @param {Array} min_reinforcement_direction_user_values                           User-defined direction of minimum reinforcement ([φ1(-z), φ2(-z), φ1(+z), φ2(+z)]), can be undefined (if not set, all values are true by default)
 * @param {String} main_compression_reinforcement_direction                         Direction of main compression reinforcement, can be undefined (is not set, WITH_MAIN_COMPRESSION_FORCE as default)
 *                                                                                  - Reinforcement direction with the main compression force (WITH_MAIN_COMPRESSION_FORCE)
 *                                                                                  - Defined in reinforcement direction (DEFINED_IN_REINFORCEMENT_DIRECTION)
 * @param {String} property_surface_reinforcement_defined_direction_phi             Reinforcement direction (PHI_1, PHI_2)
 * @param {Number} property_surface_ratio_b_div_h                                   Ratio b/h acc. to 11.6.2, can be undefined (is not set, 2.5 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_MinimumLongitudinalReinforcement = function (property_minimum_longitudinal_reinforcement_acc_to_standard,
    reinforcement_type,
    min_reinforcement_direction,
    min_reinforcement_direction_user_values,
    main_compression_reinforcement_direction,
    property_surface_reinforcement_defined_direction_phi,
    property_surface_ratio_b_div_h) {
    SetConcreteDesignSurfacesMinimumLongitudinalReinforcement(this.addon.settings_surface_aci318, property_minimum_longitudinal_reinforcement_acc_to_standard, reinforcement_type, min_reinforcement_direction,
        min_reinforcement_direction_user_values, main_compression_reinforcement_direction, property_surface_reinforcement_defined_direction_phi, property_surface_ratio_b_div_h);
};

/**
 * Sets User-defined minimum longitudinal reinforcement percentage
 * @param {Boolean} property_user_defined_minimum_longitudinal_reinforcement_percentage     User-defined minimum longitudinal reinforcement percentage, can be undefined (is not set, false as default)
 * @param {Number} property_minimum_reinforcement                                           Minimum reinforcement, can be undefined (is not set, 0% as default)
 * @param {Number} property_minimum_secondary_reinforcement                                 Minimum secondary reinforcement from main reinforcement direction, can be undefined (is not set, 20% as default)
 * @param {Number} property_minimum_tension_reinforcement                                   Minimum tension reinforcement, can be undefined (is not set, 0% as default)
 * @param {Number} property_minimum_compression_reinforcement                               Minimum compression reinforcement, can be undefined (is not set, 0% as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_UserDefinedMinimumLongitudinalReinforcementPercentage = function (property_user_defined_minimum_longitudinal_reinforcement_percentage,
    property_minimum_reinforcement,
    property_minimum_secondary_reinforcement,
    property_minimum_tension_reinforcement,
    property_minimum_compression_reinforcement) {
    SetConcreteDesignSurfacesUserDefinedMinimumLongitudinalReinforcementPercentage(this.addon.settings_surface_aci318, property_user_defined_minimum_longitudinal_reinforcement_percentage, property_minimum_reinforcement,
        property_minimum_secondary_reinforcement, property_minimum_tension_reinforcement, property_minimum_compression_reinforcement);
};

/**
 * Sets User-defined maximum longitudinal reinforcement percentage
 * @param {Boolean} property_user_defined_maximum_longitudinal_reinforcement_percentage         User-defined maximum longitudinal reinforcement percentage, can be undefined (is not set, true as default)
 * @param {Number} property_user_defined_maximum_longitudinal_reinforcement_percentage_value    Maximum reinforcement, can be undefined (is not set, 4% as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_UserDefinedMaximumLongitudinalReinforcementPercentage = function (property_user_defined_maximum_longitudinal_reinforcement_percentage,
    property_user_defined_maximum_longitudinal_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMaximumLongitudinalReinforcementPercentage(this.addon.settings_surface_aci318, property_user_defined_maximum_longitudinal_reinforcement_percentage, property_user_defined_maximum_longitudinal_reinforcement_percentage_value);
};

/**
 * Sets Minimum shear reinforcement acc. to 9.3.2
 * @param {Boolean} property_minimum_shear_reinforcement    Minimum shear reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_MinimumShearReinforcement = function (property_minimum_shear_reinforcement) {
    SetConcreteDesignSurfacesMinimumShearReinforcement(this.addon.settings_surface_aci318, property_minimum_shear_reinforcement);
};

/**
 * Sets User-defined minimum shear reinforcement percentage
 * @param {Boolean} property_user_defined_minimum_shear_reinforcement_percentage        Minimum shear reinforcement percentage, can be undefined (is not set, false as default)
 * @param {Number} property_user_defined_minimum_shear_reinforcement_percentage_value   Minimum reinforcement, can be undefined, (is not set, 0% as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_UserDefinedMinimumShearReinforcementPercentage = function (property_user_defined_minimum_shear_reinforcement_percentage,
    property_user_defined_minimum_shear_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMinimumShearReinforcementPercentage(this.addon.settings_surface_aci318, property_user_defined_minimum_shear_reinforcement_percentage, property_user_defined_minimum_shear_reinforcement_percentage_value);
};

/**
 * Sets Required Shear Reinforcement - Shear Capacity
 * @param {String} required_shear_reinforcement     Required Shear Reinforcement value, can be undefined (is not set, REQUIRED as default)
 *                                                  - Use required longitudinal reinforcement (REQUIRED)
 *                                                  - Use provided longitudinal reinforcement (PROVIDED)
 *                                                  - Automatically increase required longitudinal reinf. to avoid shear reinf. (AUTOMATICALLY)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_RequiredShearReinforcement = function (required_shear_reinforcement) {
    SetConcreteDesignRequiredShearReinforcementType(this.addon.settings_surface_aci318, "surface", ["REQUIRED", "PROVIDED"], required_shear_reinforcement);
};

/**
 * Sets Shear and torsion reinforcement
 * @param {String} property_surface_nominal_shear_strength_vc       Nominal shear strength Vc acc. to Table 22.5.5.1 (EQUATION_A, EQUATION_B, MAX_OF_A_B), can be undefined (EQUATION_A as default)
 * @param {Number} property_surface_inclination_of_concrete_strut   Inclination of concrete strut acc. to 22.7.6.1, can be undefined (is not set, 36.0 deg as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_ShearAndTorsionReinforcement = function (property_surface_nominal_shear_strength_vc,
    property_surface_inclination_of_concrete_strut) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    this.addon.settings_surface_aci318.property_surface_nominal_shear_strength_vc = EnumValueFromJSHLFTypeName(
        property_surface_nominal_shear_strength_vc,
        "nominal shear strength",
        {
            "EQUATION_A": concrete_design_surface_ulsconfig_concrete_design_aci318.E_NOMINAL_SHEAR_STRENGTH_EQUATION_A,
            "EQUATION_B": concrete_design_surface_ulsconfig_concrete_design_aci318.E_NOMINAL_SHEAR_STRENGTH_EQUATION_B,
            "MAX_OF_A_B": concrete_design_surface_ulsconfig_concrete_design_aci318.E_NOMINAL_SHEAR_STRENGTH_MAX_OF_A_B
        },
        concrete_design_surface_ulsconfig_concrete_design_aci318.E_NOMINAL_SHEAR_STRENGTH_EQUATION_A);
    if (typeof property_surface_inclination_of_concrete_strut !== "undefined") {
        this.addon.settings_surface_aci318.property_surface_inclination_of_concrete_strut = property_surface_inclination_of_concrete_strut;
    }
};

/**
 * Sets Neutral Axis Depth Limitation
 * @param {Boolean} property_surface_consider_neutral_axis_depth_limitation     Consider depth limitation of neutral axis acc. to 9.3.3.1, can be undefined (true as default)
 * @param {Number} property_surface_value_of_neutral_axis_depth_limitation      Value of neutral axis depth limitation, can be undefined (is not set, 0.45 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetSurfaces_NeutralAxisDepthLimitation = function (property_surface_consider_neutral_axis_depth_limitation,
    property_surface_value_of_neutral_axis_depth_limitation) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_surface_aci318, "surface", property_surface_consider_neutral_axis_depth_limitation, property_surface_value_of_neutral_axis_depth_limitation);
};

/**
 * Sets Punching Load
 * @param {String/Number} property_node_used_punching_load_for_columns                      Used punching load for columns (SINGLE_FORCE, SMOOTHED_SHEAR_FORCE or user-defined value), can be undefined (is not set, SINGLE_FORCE as default)
 *                                                                                          - Single force from column / load / nodal support (SINGLE_FORCE)
 *                                                                                          - Smoothed shear force over the defined perimeter (SMOOTHED_SHEAR_FORCE)
 * @param {String/Number} property_node_used_punching_load_for_walls                        Used punching load for walls (SMOOTHED_SHEAR_FORCE or user-defined value), can be undefined (is not set, SMOOTHED_SHEAR_FORCE as default)     
 *                                                                                          - Smoothed shear force over the defined perimeter (SMOOTHED_SHEAR_FORCE)
 * @param {Number} property_node_distance_to_perimeter_used_for_integration_for_columns     Distance to perimeter used for integration (k * d), can be undefined (is not set, 2.0 as default)
 * @param {Number} property_node_distance_to_perimeter_used_for_integration_for_walls       Distance to perimeter used for integration (k * d), can be undefined (is not set, 2.0 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetPunching_PunchingLoad = function (property_node_used_punching_load_for_columns,
    property_node_used_punching_load_for_walls,
    property_node_distance_to_perimeter_used_for_integration_for_columns,
    property_node_distance_to_perimeter_used_for_integration_for_walls) {
    SetConcreteDesignPunchingPunchingLoad(this.addon.settings_node_aci318, property_node_used_punching_load_for_columns, property_node_used_punching_load_for_walls,
        property_node_distance_to_perimeter_used_for_integration_for_columns, property_node_distance_to_perimeter_used_for_integration_for_walls);
};

/**
 * Sets Additional Parameters
 * @param {Number} property_node_minimum_spacing_of_reinforcement_perimeters    Minimum spacing of reinforcement perimeters, can be undefined (is not set, 0.1 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetPunching_AdditionalParameters = function (property_node_minimum_spacing_of_reinforcement_perimeters) {
    SetConcreteDesignPunchingAdditionalParameters(this.addon.settings_node_aci318, property_node_minimum_spacing_of_reinforcement_perimeters);
};

/**
 * Sets Factors
 * @param {Number} property_node_strength_reduction_factor_tensile              Strength reduction factors according to 21.2.1 - Tensile strength, can be undefined (is not set, 0.9 as default)
 * @param {Number} property_node_strength_reduction_factor_shear_and_torsion    Strength reduction factors according to 21.2.1 - Shear and torsion, can be undefined (is not set, 0.75 as default)
 */
ConcreteDesignStrengthConfigurationACI.prototype.SetPunching_Factors = function (property_node_strength_reduction_factor_tensile,
    property_node_strength_reduction_factor_shear_and_torsion) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_strength_reduction_factor_tensile !== "undefined") {
        this.addon.settings_node_aci318.property_node_strength_reduction_factor_tensile = property_node_strength_reduction_factor_tensile;
    }
    if (typeof property_node_strength_reduction_factor_shear_and_torsion !== "undefined") {
        this.addon.settings_node_aci318.property_node_strength_reduction_factor_shear_and_torsion = property_node_strength_reduction_factor_shear_and_torsion;
    }
};