include("../../Tools/jshlf_common_functions.js");

/*
Bug?: this.addon.settings_member_ec2.property_fatigue_design_time_of_start_of_cyclic_loading_on_concrete cannot be set
*/

/**
 * Creates Concrete design ultimate configuration (EN standard)
 * @class
 * @constructor
 * @param {Number} no           Ultimate configuration number, can be undefined
 * @param {Array} surfaces_no   Assigned surfaces numbers, can be undefined
 * @param {Array} members_no    Assigned members numbers, can be undefined
 * @param {Array} nodes_no      Assigned nodes numbers, can be undefined
 * @param {String} comment      Comment, can be undefined
 * @param {Object} params       Additional parameters, can be undefined
 */
function ConcreteDesignUltimateConfigurationEN (no,
    surfaces_no,
    members_no,
    nodes_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_uls_configurations, no, surfaces_no, members_no, nodes_no, comment, params);
}

/**
 * @returns Ultimate Configuration index
 */
ConcreteDesignUltimateConfigurationEN.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
ConcreteDesignUltimateConfigurationEN.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Ultimate configuration name, can be undefined
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetName = function (name) {
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
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_ConsiderInternalForces = function (property_member_axial_forces,
    property_member_bending_moments_my,
    property_member_bending_moments_mz,
    property_member_torsional_moments,
    property_member_shear_forces_vy,
    property_member_shear_forces_vz) {
    SetConcreteDesignMembersConsiderInternalForces(this.addon.settings_member_ec2, property_member_axial_forces, property_member_bending_moments_my, property_member_bending_moments_mz, property_member_torsional_moments,
        property_member_shear_forces_vy, property_member_shear_forces_vz);
};

/**
 * Sets Reduction of internal forces in z-direction
 * @param {Boolean} property_member_consideration_of_limited_moment_redistribution_of_the_supporting_moments                        Consideration of limited moment redistribution of the supporting moments according to 5.5, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_reduction_of_the_moments_or_dimensioning_for_the_moments_at_the_face_of_a_monolithic_support    Reduction of the moments or dimensioning for the moments at the face of a monolithic support according to 5.3.2.2, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance                                  Reduction of the shear forces in the support face and distance d acc. to 6.2.1(8), can be undefined (is not set, true as default)
 * @param {Boolean} property_member_reduction_of_the_shear_forces_with_concentrated_load                                            Reduction of the shear forces with concentrated load acc. to 6.2.2(6) and 6.2.3(8), can be undefined (is not set, false as default)
 * @param {Boolean} property_member_consideration_of_minimum_eccentricity                                                           Consideration of minimum eccentricity acc. to 6.1(4), can be undefined (is not set, false as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_ReductionsOfInternalForcesInZ = function (property_member_consideration_of_limited_moment_redistribution_of_the_supporting_moments,
    property_member_reduction_of_the_moments_or_dimensioning_for_the_moments_at_the_face_of_a_monolithic_support,
    property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance,
    property_member_reduction_of_the_shear_forces_with_concentrated_load,
    property_member_consideration_of_minimum_eccentricity) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_consideration_of_limited_moment_redistribution_of_the_supporting_moments !== "undefined") {
        this.addon.settings_member_ec2.property_member_consideration_of_limited_moment_redistribution_of_the_supporting_moments = property_member_consideration_of_limited_moment_redistribution_of_the_supporting_moments;
    }
    if (typeof property_member_reduction_of_the_moments_or_dimensioning_for_the_moments_at_the_face_of_a_monolithic_support !== "undefined") {
        this.addon.settings_member_ec2.property_member_reduction_of_the_moments_or_dimensioning_for_the_moments_at_the_face_of_a_monolithic_support = property_member_reduction_of_the_moments_or_dimensioning_for_the_moments_at_the_face_of_a_monolithic_support;
    }
    if (typeof property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance !== "undefined") {
        this.addon.settings_member_ec2.property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance = property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance;
    }
    if (typeof property_member_reduction_of_the_shear_forces_with_concentrated_load !== "undefined") {
        this.addon.settings_member_ec2.property_member_reduction_of_the_shear_forces_with_concentrated_load = property_member_reduction_of_the_shear_forces_with_concentrated_load;
    }
    if (typeof property_member_consideration_of_minimum_eccentricity !== "undefined") {
        this.addon.settings_member_ec2.property_member_consideration_of_minimum_eccentricity = property_member_consideration_of_minimum_eccentricity;
    }
};

/**
 * Sets Required longitudinal reinforcement
 * @param {String} property_member_reinforcement_layout                                                         Reinforcement layout (TOP_BOTTOM_OPTIMIZED_DISTRIBUTION, TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT, OPTIMIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, OPTIMIZED_PROVIDED_REINFORCEMENT as default)
 * @param {String/Number} property_member_reinforcement_diameter_for_preliminary_design                         Reinforcement diameter for preliminary design (MAX_OF_ALL or user-defined value), can be undefined (is not set as default, otherwise MAX_OF_ALL as default)
 * @param {Boolean} property_member_reinforcement_distribute_over_slab                                          Distribute reinforcement evenly over complete slab width, can be undefined (is not set, false as default)
 * @param {Number} property_member_reinforcement_distribute_over_slab_reduced_width                             Distribute reinforcement evenly over complete slab width - Distribute the tensile reinforcement in the slab over a width of, can be undefined (is not set, 100% as default)
 * @param {Boolean} property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement   Include tensile force due to shear in required longitudinal reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_RequiredLongitudinalReinforcement = function (property_member_reinforcement_layout,
    property_member_reinforcement_diameter_for_preliminary_design,
    property_member_reinforcement_distribute_over_slab,
    property_member_reinforcement_distribute_over_slab_reduced_width,
    property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement) {
    SetConcreteDesignMembersRequiredLongitudinalReinforcement(this.addon.settings_member_ec2, property_member_reinforcement_layout, property_member_reinforcement_diameter_for_preliminary_design, property_member_reinforcement_distribute_over_slab,
        property_member_reinforcement_distribute_over_slab_reduced_width, property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement);
};

/**
 * Sets Detailing and particular rules
 * @param {Boolean} property_member_minimum_longitudinal_reinforcement                                          Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_user_defined_minimum_longitudinal_reinforcement_area                        User-defined minimum longitudinal reinforcement area, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_minimum_reinforcement_area                                                  Minimum reinforcement area, can be undefined (is not set, true as default)
 * @param {Number} property_member_top_minimum_reinforcement_area                                               Top reinforcement area, can be undefined (is not set, 0.0 as default)
 * @param {Number} property_member_bottom_minimum_reinforcement_area                                            Bottom reinforcement area, can be undefined (is not set, 0.0 as default)
 * @param {Number} property_member_total_minimum_reinforcement_area                                             Total reinforcement area, can be undefined (is not set, 0.0 as default)
 * @param {Boolean} property_member_minimum_reinforcement_percentage                                            Minimum reinforcement percentage
 * @param {Number} property_member_total_minimum_percentage_reinforcement_area                                  Total reinforcement area, can be undefined (is not set, 0.0 as default)                                            
 * @param {Boolean} property_member_minimum_shear_reinforcement                                                 Minimum shear reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_use_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing      Compression longitudinal reinforcement for maximum stirrup spacing acc. to 9.2.1.2(3), can be undefined (is not set, false as default)
 * @param {String} property_member_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing           Considered longitudinal reinforcement (MAXIMUM_STIRRUP_SPACING_REQUIRED, MAXIMUM_STIRRUP_SPACING_PROVIDED), can be undefined (is not set, MAXIMUM_STIRRUP_SPACING_REQUIRED as default)
 * @param {Boolean} property_member_minimum_construction_reinforcement                                          Minimum construction reinforcement acc. to 9.2.1.2(1), 9.2.1.4(1). Requires design support of the type ‘Concrete’ with a monolithic connection to calculate the design check. Can be undefined (is not set, true as default)
 * @param {Boolean} property_member_design_check_for_tensile_force_in_longitudinal_reinforcement                Design check for tensile force in longitudinal reinforcement, including tension due to shear acc. to 9.2.1.3(2), can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_DetailingAndParticularRules = function (property_member_minimum_longitudinal_reinforcement,
    property_member_user_defined_minimum_longitudinal_reinforcement_area,
    property_member_minimum_reinforcement_area,
    property_member_top_minimum_reinforcement_area,
    property_member_bottom_minimum_reinforcement_area,
    property_member_total_minimum_reinforcement_area,
    property_member_minimum_reinforcement_percentage,
    property_member_total_minimum_percentage_reinforcement_area,
    property_member_minimum_shear_reinforcement,
    property_member_use_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing,
    property_member_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing,
    property_member_minimum_construction_reinforcement,
    property_member_design_check_for_tensile_force_in_longitudinal_reinforcement) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_minimum_longitudinal_reinforcement !== "undefined") {
        this.addon.settings_member_ec2.property_member_minimum_longitudinal_reinforcement = property_member_minimum_longitudinal_reinforcement;
    }
    if (typeof property_member_user_defined_minimum_longitudinal_reinforcement_area !== "undefined") {
        this.addon.settings_member_ec2.property_member_user_defined_minimum_longitudinal_reinforcement_area = property_member_user_defined_minimum_longitudinal_reinforcement_area;
    }
    if (typeof property_member_minimum_reinforcement_area !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_user_defined_minimum_longitudinal_reinforcement_area, "User-defined min. longitudinal reinforcement area must be on");
        this.addon.settings_member_ec2.property_member_minimum_reinforcement_area = property_member_minimum_reinforcement_area;
    }
    if (typeof property_member_top_minimum_reinforcement_area !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_minimum_reinforcement_area, "Minimum reinforcement area must be on");
        this.addon.settings_member_ec2.property_member_top_minimum_reinforcement_area = property_member_top_minimum_reinforcement_area;
    }
    if (typeof property_member_bottom_minimum_reinforcement_area !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_minimum_reinforcement_area, "Minimum reinforcement area must be on");
        this.addon.settings_member_ec2.property_member_bottom_minimum_reinforcement_area = property_member_bottom_minimum_reinforcement_area;
    }
    if (typeof property_member_total_minimum_reinforcement_area !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_minimum_reinforcement_area, "Minimum reinforcement area must be on");
        this.addon.settings_member_ec2.property_member_total_minimum_reinforcement_area = property_member_total_minimum_reinforcement_area;
    }
    if (typeof property_member_minimum_reinforcement_percentage !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_user_defined_minimum_longitudinal_reinforcement_area, "User-defined min. longitudinal reinforcement area must be on");
        this.addon.settings_member_ec2.property_member_minimum_reinforcement_percentage = property_member_minimum_reinforcement_percentage;
    }
    if (typeof property_member_total_minimum_percentage_reinforcement_area !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_minimum_reinforcement_percentage, "Minimum reinforcement percentage must be on");
        this.addon.settings_member_ec2.property_member_total_minimum_percentage_reinforcement_area = property_member_total_minimum_percentage_reinforcement_area;
    }
    if (typeof property_member_minimum_shear_reinforcement !== "undefined") {
        this.addon.settings_member_ec2.property_member_minimum_shear_reinforcement = property_member_minimum_shear_reinforcement;
    }
    if (typeof property_member_use_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_minimum_shear_reinforcement, "Minimum shear reinforcement acc. to standard must be on");
        this.addon.settings_member_ec2.property_member_use_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing = property_member_use_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing;
    }
    if (typeof property_member_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_use_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing, "Compression longitudinal reinforcement for maximum stirrup spacing acc. to 9.2.1.2(3) must be on");
        this.addon.settings_member_ec2.property_member_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing = EnumValueFromJSHLFTypeName(
            property_member_compression_longitudinal_reinforcement_for_maximum_stirrup_spacing,
            "longitudinal reinforcement",
            {
                "MAXIMUM_STIRRUP_SPACING_REQUIRED": ulsconfig_member_ec2.E_COMPRESSION_LONGITUDINAL_REINFORCEMENT_FOR_MAXIMUM_STIRRUP_SPACING_REQUIRED,
                "MAXIMUM_STIRRUP_SPACING_PROVIDED": ulsconfig_member_ec2.E_COMPRESSION_LONGITUDINAL_REINFORCEMENT_FOR_MAXIMUM_STIRRUP_SPACING_PROVIDED
            },
            ulsconfig_member_ec2.E_COMPRESSION_LONGITUDINAL_REINFORCEMENT_FOR_MAXIMUM_STIRRUP_SPACING_PROVIDED);
    }
    if (typeof property_member_minimum_construction_reinforcement !== "undefined") {
        this.addon.settings_member_ec2.property_member_minimum_construction_reinforcement = property_member_minimum_construction_reinforcement;
    }
    if (typeof property_member_design_check_for_tensile_force_in_longitudinal_reinforcement !== "undefined") {
        this.addon.settings_member_ec2.property_member_design_check_for_tensile_force_in_longitudinal_reinforcement = property_member_design_check_for_tensile_force_in_longitudinal_reinforcement;
    }
};

/**
 * Sets Required Shear Reinforcement - Shear Capacity
 * @param {String} shear_reinforcement  Use required longitudinal reinforcement (REQUIRED) 
 *                                      Use provided longitudinal reinforcement (PROVIDED)
 *                                      Automatically increase required longitudinal reinf. to avoid shear reinf. (AUTOMATICALLY)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_RequiredShearReinforcement = function (shear_reinforcement) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignRequiredShearReinforcementType(this.addon.settings_member_ec2, "member", ["REQUIRED", "PROVIDED", "AUTOMATICALLY"], shear_reinforcement);
};

/**
 * Sets Shear Joint
 * @param {Boolean} property_member_shear_joint_design                                                      Design of shear joint, can be undefined (is not set, true as default)
 * @param {String} analysis_method                                                                          Analytical with shear force Vz,Ed and β-factor acc. to Eq. 6.24 (Mz,Ed not considered) (ANALYTICAL_WITH_SHEAR_FORCE) or
 *                                                                                                          General integration of axial stresses into section parts (GENERAL_INTEGRATION_OF_AXIAL_STRESSES)
 * @param {Boolean} property_member_shear_joint_fatigue_or_dynamic_loads                                    Fatigue or dynamic loads acc. to 6.2.5 (5), can be undefined (is not set, false as default)
 * @param {Number} property_member_shear_joint_normal_stress_across_joint_surfaces                          Normal stress across joint surfaces (tension negative), can be undefined (0.0 as default)
 * @param {Boolean} property_member_shear_joint_design_of_flange_connections_on_segmented_cross_sections    Design of flange connections on segmented cross-sections, can be undefined (false as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_ShearJoint = function (property_member_shear_joint_design,
    analysis_method,
    property_member_shear_joint_fatigue_or_dynamic_loads,
    property_member_shear_joint_normal_stress_across_joint_surfaces,
    property_member_shear_joint_design_of_flange_connections_on_segmented_cross_sections) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_shear_joint_design !== "undefined") {
        this.addon.settings_member_ec2.property_member_shear_joint_design = property_member_shear_joint_design;
    }
    if (typeof analysis_method !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_shear_joint_design, "Design of shear point must be on");
        SetConcreteDesignAnalysisMethodForShearStressInJoint(this.addon, analysis_method);
    }
    if (typeof property_member_shear_joint_fatigue_or_dynamic_loads !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_shear_joint_design, "Design of shear point must be on");
        this.addon.settings_member_ec2.property_member_shear_joint_fatigue_or_dynamic_loads = property_member_shear_joint_fatigue_or_dynamic_loads;
    }
    if (typeof property_member_shear_joint_normal_stress_across_joint_surfaces !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_shear_joint_design, "Design of shear point must be on");
        this.addon.settings_member_ec2.property_member_shear_joint_normal_stress_across_joint_surfaces = property_member_shear_joint_normal_stress_across_joint_surfaces;
    }
    if (typeof property_member_shear_joint_design_of_flange_connections_on_segmented_cross_sections !== "undefined") {
        this.addon.settings_member_ec2.property_member_shear_joint_design_of_flange_connections_on_segmented_cross_sections = property_member_shear_joint_design_of_flange_connections_on_segmented_cross_sections;
    }
};

/**
 * Sets Neutral Axis Depth Limitation
 * @param {Boolean} property_member_consider_neutral_axis_depth_limitation  Consider neutral axis depth limitation acc. to 5.6.2(2), 5.6.3(2), can be undefined (is not set, false as default)
 * @param {Number} property_member_value_of_neutral_axis_depth_limitation   Value of neutral axis depth limitation, can be undefined (is not set, 0.45 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_NeutralAxisDepthLimitation = function(property_member_consider_neutral_axis_depth_limitation,
    property_member_value_of_neutral_axis_depth_limitation) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_member_ec2, "member", property_member_consider_neutral_axis_depth_limitation, property_member_value_of_neutral_axis_depth_limitation);
};

/**
 * Sets Calculation setting
 * @param {Boolean} property_member_net_concrete_area  Net concrete area, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_CalculationSetting = function (property_member_net_concrete_area) {
    SetConcreteDesignMembersCalculationSetting(this.addon.settings_member_ec2, property_member_net_concrete_area);
};

/**
 * Sets Fiber Concrete
 * @param {String} fiber_concrete_effect                                                    Fiber concrete effect, can be undefined (is not set, BENDING_AND_SHEAR_DESIGN as default)
 *                                                                                          - In bending and shear design (BENDING_AND_SHEAR_DESIGN)
 *                                                                                          - In torsion design (TORSION_DESIGN)
 * @param {*} property_member_fiber_concrete_material_model_for_tension_strains             Material model for tension strains (SDL1, SDL2, SDL3), can be undefined (is not set, SDL1 as default)
 * @param {*} property_member_fiber_concrete_size_factor_kfg_calculate_from_tension_area    Size factor κfG calculated from tension area Afct, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetMembers_FiberConcrete = function (fiber_concrete_effect,
    property_member_fiber_concrete_material_model_for_tension_strains,
    property_member_fiber_concrete_size_factor_kfg_calculate_from_tension_area) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignFiberConcreteEffect(this.addon, fiber_concrete_effect);
    if (typeof property_member_fiber_concrete_material_model_for_tension_strains !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_fiber_concrete_effect_in_bending_and_shear_design, "In bending and shear design must be on");
        this.addon.settings_member_ec2.property_member_fiber_concrete_material_model_for_tension_strains = GetConcreteDesignMaterialModelForTensionStrain("member", property_member_fiber_concrete_material_model_for_tension_strains);
    }
    if (typeof property_member_fiber_concrete_size_factor_kfg_calculate_from_tension_area !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_member_fiber_concrete_effect_in_bending_and_shear_design, "In bending and shear design must be on");
        this.addon.settings_member_ec2.property_member_fiber_concrete_size_factor_kfg_calculate_from_tension_area = property_member_fiber_concrete_size_factor_kfg_calculate_from_tension_area;
    }
};

/**
 * Sets Limiting slenderness about y-axis
 * @param {Boolean} property_stability_determine_factor_ay      Determine factor Ay, can be undefined (is not set, false as default)
 * @param {Number} property_stability_determined_factor_ay      Determined factor Ay, can be undefined (is not set, 0.7 as default)
 * @param {Boolean} property_stability_determine_factor_by      Determine factor By, can be undefined (is not set, false as default)
 * @param {Number} property_stability_determined_factor_by      Determined factor By, can be undefined (is not set, 1.1 as default)
 * @param {Boolean} property_stability_determine_factor_cy      Determine factor Cy, can be undefined (is not set, false as default)
 * @param {Number} property_stability_determined_factor_cy      Determined factor Cy, can be undefined (is not set, 0.7 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetStability_SlendernessAboutY = function (property_stability_determine_factor_ay,
    property_stability_determined_factor_ay,
    property_stability_determine_factor_by,
    property_stability_determined_factor_by,
    property_stability_determine_factor_cy,
    property_stability_determined_factor_cy) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_determine_factor_ay !== "undefined") {
        this.addon.settings_member_ec2.property_stability_determine_factor_ay = property_stability_determine_factor_ay;
    }
    if (typeof property_stability_determined_factor_ay !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_stability_determine_factor_ay, "Determine factor Ay must be on");
        this.addon.settings_member_ec2.property_stability_determined_factor_ay = property_stability_determined_factor_ay;
    }
    if (typeof property_stability_determine_factor_by !== "undefined") {
        this.addon.settings_member_ec2.property_stability_determine_factor_by = property_stability_determine_factor_by;
    }
    if (typeof property_stability_determined_factor_by !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_stability_determine_factor_by, "Determine factor By must be on");
        this.addon.settings_member_ec2.property_stability_determined_factor_by = property_stability_determined_factor_by;
    }
    if (typeof property_stability_determine_factor_cy !== "undefined") {
        this.addon.settings_member_ec2.property_stability_determine_factor_cy = property_stability_determine_factor_cy;
    }
    if (typeof property_stability_determined_factor_cy !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_stability_determine_factor_cy, "Determine factor Cy must be on");
        this.addon.settings_member_ec2.property_stability_determined_factor_cy = property_stability_determined_factor_cy;
    }
};

/**
 * Sets Limiting slenderness about z-axis
 * @param {Boolean} property_stability_determine_factor_az      Determine factor Az, can be undefined (is not set, false as default)
 * @param {Number} property_stability_determined_factor_az      Determined factor Az, can be undefined (is not set, 0.7 as default)
 * @param {Boolean} property_stability_determine_factor_bz      Determine factor Bz, can be undefined (is not set, false as default)
 * @param {Number} property_stability_determined_factor_bz      Determined factor Bz, can be undefined (is not set, 1.1 as default)
 * @param {Boolean} property_stability_determine_factor_cz      Determine factor Cz, can be undefined (is not set, false as default)
 * @param {Number} property_stability_determined_factor_cz      Determined factor Cz, can be undefined (is not set, 0.7 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetStability_SlendernessAboutZ = function (property_stability_determine_factor_az,
    property_stability_determined_factor_az,
    property_stability_determine_factor_bz,
    property_stability_determined_factor_bz,
    property_stability_determine_factor_cz,
    property_stability_determined_factor_cz) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_determine_factor_az !== "undefined") {
        this.addon.settings_member_ec2.property_stability_determine_factor_az = property_stability_determine_factor_az;
    }
    if (typeof property_stability_determined_factor_az !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_stability_determine_factor_az, "Determine factor Az must be on");
        this.addon.settings_member_ec2.property_stability_determined_factor_az = property_stability_determined_factor_az;
    }
    if (typeof property_stability_determine_factor_bz !== "undefined") {
        this.addon.settings_member_ec2.property_stability_determine_factor_bz = property_stability_determine_factor_bz;
    }
    if (typeof property_stability_determined_factor_bz !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_stability_determine_factor_bz, "Determine factor Bz must be on");
        this.addon.settings_member_ec2.property_stability_determined_factor_bz = property_stability_determined_factor_bz;
    }
    if (typeof property_stability_determine_factor_cz !== "undefined") {
        this.addon.settings_member_ec2.property_stability_determine_factor_cz = property_stability_determine_factor_cz;
    }
    if (typeof property_stability_determined_factor_cz !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_stability_determine_factor_cz, "Determine factor Cz must be on");
        this.addon.settings_member_ec2.property_stability_determined_factor_cz = property_stability_determined_factor_cz;
    }
};

/**
 * Sets Load Distribution
 * @param {Boolean} property_stability_structural_system_of_isolated_columns    Structural system of isolated columns, can be undefined (is not set, true as default)
 * @param {Boolean} property_stability_number_of_effective_columns              Number of effective columns, can be undefined (is not set, 2 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetStability_LoadDistribution = function (property_stability_structural_system_of_isolated_columns,
    property_stability_number_of_effective_columns) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_structural_system_of_isolated_columns !== "undefined") {
        this.addon.settings_member_ec2.property_stability_structural_system_of_isolated_columns = property_stability_structural_system_of_isolated_columns;
    }
    if (typeof property_stability_number_of_effective_columns !== "undefined") {
        ASSERT(!this.addon.settings_member_ec2.property_stability_structural_system_of_isolated_columns, "Structural system of isolated columns must be off");
        this.addon.settings_member_ec2.property_stability_number_of_effective_columns = property_stability_number_of_effective_columns;
    }
};

/**
 * Sets Biaxial Bending
 * @param {Boolean} property_stability_separate_design_in_each_principal_direction_acc_5_8_9    Separate design in each principal direction acc. to 5.8.9, can be undefined (is not set, false as default)
 * @param {Boolean} property_stability_use_simplified_criterion_acc_5_39                        Use simplified criterion acc. to Equation 5.39, can be undefined (is not set, false as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetStability_BiaxialBending = function (property_stability_separate_design_in_each_principal_direction_acc_5_8_9,
    property_stability_use_simplified_criterion_acc_5_39) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_separate_design_in_each_principal_direction_acc_5_8_9 !== "undefined") {
        this.addon.settings_member_ec2.property_stability_separate_design_in_each_principal_direction_acc_5_8_9 = property_stability_separate_design_in_each_principal_direction_acc_5_8_9;
    }
    if (typeof property_stability_use_simplified_criterion_acc_5_39 !== "undefined") {
        this.addon.settings_member_ec2.property_stability_use_simplified_criterion_acc_5_39 = property_stability_use_simplified_criterion_acc_5_39;
    }
};

ConcreteDesignUltimateConfigurationEN.prototype.SetStability_Curvature = function (curvature_type,
    property_stability_curvature_user_defined) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignCurvatureForRequiredReinforcement(this.addon, curvature_type);
    if (typeof property_stability_curvature_user_defined !== "undefined") {
        ASSERT(addon.settings_member_ec2.property_stability_curvature_user_define, "User-defined curvature must be select");
        this.addon.settings_member_ec2.property_stability_curvature_user_defined = property_stability_curvature_user_defined;
    }
};

/**
 * Sets Required Reinforcement
 * @param {String} property_stability_reinforcement_layout                              Reinforcement layout (TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, UNIFORMLY_SURROUNDING as default)
 * @param {String/Number} reinforcement_diameter_for_preliminary_design_user_value      Reinforcement diameter for preliminary design (MAX_OF_ALL or user number value), can be undefined (is not set, MAX_OF_ALL as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetStability_RequiredReinforcement = function (property_stability_reinforcement_layout,
    reinforcement_diameter_for_preliminary_design_user_value) {
    SetConcreteDesignStabilityRequiredReinforcement(this.addon.settings_member_ec2, property_stability_reinforcement_layout, reinforcement_diameter_for_preliminary_design_user_value);
};

//Grandmaster version newly not supports this
/*
/**
 * Sets Fatigue Design
 * @param {String} fatigue_design_type                                                                              Fatigue design type, can be undefined (is not set, SIMPLIFIED_DESIGN_METHOD)
 *                                                                                                                  - Simplified design method acc. to 6.8.6 and 6.8.7(2) (SIMPLIFIED_DESIGN_METHOD)
 *                                                                                                                  - Method of damage equivalent stress range acc. to 6.8.5 and 6.8.7(1) (DAMAGE_METHOD)
 * @param {Boolean} property_fatigue_design_modification_of_the_design_check_of_the_equivalent_steel_stress_range   Modification of the design check of the equivalent steel stress range, can be undefined (is not set, false as default)
 * @param {String} modification_type                                                                                Modification of the design check type, can be undefined (is not set, CYCLES_INTERVAL)
 *                                                                                                                  - Correction factor for calculated equivalent damage stress range (CORRECTION_FACTOR)
 *                                                                                                                  - Use one interval with defined number of cycles for a stress range (CYCLES_INTERVAL)
 * @param {Number} modification_value                                                                               Modification of the design check value, can be undefined
 *                                                                                                                  - Factor λs / Number of cycles (is not set, 1.0 / 1000000 as default)
 * @param {Number} property_fatigue_design_time_of_start_of_cyclic_loading_on_concrete                              Time of start of cyclic loading on concrete in days, can be undefined (is not set, 28 days as default)
 */
/*ConcreteDesignUltimateConfigurationEN.prototype.SetFatigueDesign = function (fatigue_design_type,
    property_fatigue_design_modification_of_the_design_check_of_the_equivalent_steel_stress_range,
    modification_type,
    modification_value,
    property_fatigue_design_time_of_start_of_cyclic_loading_on_concrete) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignFatigueDesignType(this.addon, fatigue_design_type);
    if (typeof property_fatigue_design_modification_of_the_design_check_of_the_equivalent_steel_stress_range !== "undefined") {
        ASSERT(this.addon.settings_member_ec2.property_fatigue_design_method_of_damage_equivalent_stress_range, "Method of damage equivalent stress range must be on");
        this.addon.settings_member_ec2.property_fatigue_design_modification_of_the_design_check_of_the_equivalent_steel_stress_range = property_fatigue_design_modification_of_the_design_check_of_the_equivalent_steel_stress_range;
    }
    SetConcreteDesignModificationDesignCheckType(this.addon, modification_type);
    if (modification_value !== "undefined") {
        if (this.addon.settings_member_ec2.property_fatigue_design_use_correction_factor_for_calculated_equivalent_damage_stress_range) {
            this.addon.settings_member_ec2.property_fatigue_design_correction_factor_for_calculated_equivalent_damage_stress_range = modification_value;
        }
        else if (this.addon.settings_member_ec2.property_fatigue_design_use_one_interval_with_defined_number_of_cycles_for_a_stress_range) {
            this.addon.settings_member_ec2.property_fatigue_design_one_interval_with_defined_number_of_cycles_for_a_stress_range = modification_value;
        }
        else {
            ASSERT(false, "Unknown fatigue design modification type");
        }
    }
    if (typeof property_fatigue_design_time_of_start_of_cyclic_loading_on_concrete !== "undefined") {
        this.addon.settings_member_ec2.property_fatigue_design_time_of_start_of_cyclic_loading_on_concrete = property_fatigue_design_time_of_start_of_cyclic_loading_on_concrete;
    }
};*/

/**
 * Sets Design method
 * @param {String} optimization_type    Design method optimization type, can be undefined (is not set, YES as default)
 *                                      - No optimization of design internal forces (NO)
 *                                      - Optimization of design internal forces (YES)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_DesignMethod = function (optimization_type) {
    SetConcreteDesignSurfacesDesignMethod(this.addon.settings_surface_ec2, optimization_type);
};

/**
 * Sets Internal Forces Diagram Used for Design
 * @param {Boolean} property_subtraction_of_rib_components  Subtraction of rib components for the ULS calculation and for the analytic method of SLS calculation, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_InternalForcesDiagramUsedForDesign = function (property_subtraction_of_rib_components) {
    SetConcreteDesignSurfacesInternalForcesDiagramUsedForDesign(this.addon.settings_surface_ec2, property_subtraction_of_rib_components);
};

/**
 * Sets Minimum longitudinal reinforcement acc. to standard
 * @param {Boolean} property_minimum_longitudinal_reinforcement_acc_to_standard     Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {String} reinforcement_type                                               Minimum longitudinal reinforcement acc. to standard type, can be undefined (is not set, PLATES as default)
 *                                                                                  - Minimum longitudinal reinforcement for plates acc. to 9.3.1 (PLATES)
                                                                                    - Minimum longitudinal reinforcement for walls acc. to 9.6 (WALLS)
 * @param {String} min_reinforcement_direction                                      Direction of minimum reinforcement, can be undefined (is not set, MAIN_TENSION_ELEMENT as default)
                                                                                    - Direction with main tension in the element (MAIN_TENSION_ELEMENT)
                                                                                    - Direction with main tension in the surface (MAIN_TENSION_SURFACE)
                                                                                    - Defined (DEFINED)
 * @param {Array} min_reinforcement_direction_user_values                           User-defined direction of minimum reinforcement ([φ1(-z), φ2(-z), φ1(+z), φ2(+z)]), can be undefined (if not set, all values are true by default)
 * @param {String} main_compression_reinforcement_direction                         Direction of main compression reinforcement, can be undefined (is not set, WITH_MAIN_COMPRESSION_FORCE as default)
 *                                                                                  - Reinforcement direction with the main compression force (WITH_MAIN_COMPRESSION_FORCE)
 *                                                                                  - Defined in reinforcement direction (DEFINED_IN_REINFORCEMENT_DIRECTION)
 * @param {String} property_surface_reinforcement_defined_direction_phi             Reinforcement direction (PHI_1, PHI_2)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_MinimumLongitudinalReinforcement = function (property_minimum_longitudinal_reinforcement_acc_to_standard,
    reinforcement_type,
    min_reinforcement_direction,
    min_reinforcement_direction_user_values,
    main_compression_reinforcement_direction,
    property_surface_reinforcement_defined_direction_phi) {
    SetConcreteDesignSurfacesMinimumLongitudinalReinforcement(this.addon.settings_surface_ec2, property_minimum_longitudinal_reinforcement_acc_to_standard, reinforcement_type, min_reinforcement_direction,
        min_reinforcement_direction_user_values, main_compression_reinforcement_direction, property_surface_reinforcement_defined_direction_phi);
};

/**
 * Sets User-defined minimum longitudinal reinforcement percentage
 * @param {Boolean} property_user_defined_minimum_longitudinal_reinforcement_percentage     User-defined minimum longitudinal reinforcement percentage, can be undefined (is not set, false as default)
 * @param {Number} property_minimum_reinforcement                                           Minimum reinforcement, can be undefined (is not set, 0% as default)
 * @param {Number} property_minimum_secondary_reinforcement                                 Minimum secondary reinforcement from main reinforcement direction, can be undefined (is not set, 20% as default)
 * @param {Number} property_minimum_tension_reinforcement                                   Minimum tension reinforcement, can be undefined (is not set, 0% as default)
 * @param {Number} property_minimum_compression_reinforcement                               Minimum compression reinforcement, can be undefined (is not set, 0% as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_UserDefinedMinimumLongitudinalReinforcementPercentage = function (property_user_defined_minimum_longitudinal_reinforcement_percentage,
    property_minimum_reinforcement,
    property_minimum_secondary_reinforcement,
    property_minimum_tension_reinforcement,
    property_minimum_compression_reinforcement) {
    SetConcreteDesignSurfacesUserDefinedMinimumLongitudinalReinforcementPercentage(this.addon.settings_surface_ec2, property_user_defined_minimum_longitudinal_reinforcement_percentage, property_minimum_reinforcement,
        property_minimum_secondary_reinforcement, property_minimum_tension_reinforcement, property_minimum_compression_reinforcement);
};

/**
 * Sets Maximum longitudinal reinforcement acc. to standard
 * @param {Boolean} property_maximum_longitudinal_reinforcement_acc_to_standard     Maximum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {String} reinforcement_type                                               Maximum longitudinal reinforcement type, can be undefined (is not set, PLATES as default)
 *                                                                                  - Maximum longitudinal reinforcement for plates acc. to 9.3.1 (PLATES)
 *                                                                                  - Maximum longitudinal reinforcement for walls acc. to 9.6 (WALLS)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_MaximumLongitudinalReinforcement = function (property_maximum_longitudinal_reinforcement_acc_to_standard,
    reinforcement_type) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_maximum_longitudinal_reinforcement_acc_to_standard !== "undefined") {
        this.addon.settings_surface_ec2.property_maximum_longitudinal_reinforcement_acc_to_standard = property_maximum_longitudinal_reinforcement_acc_to_standard;
    }
    if (typeof reinforcement_type !== "undefined") {
        ASSERT(this.addon.settings_surface_ec2.property_maximum_longitudinal_reinforcement_acc_to_standard, "Maximum longitudinal reinforcement acc. to standard must be on");
        SetConcreteDesignReinforcementMaximumLongitudinalReinforcementType(this.addon, reinforcement_type);
    }
};

/**
 * Sets User-defined maximum longitudinal reinforcement percentage
 * @param {Boolean} property_user_defined_maximum_longitudinal_reinforcement_percentage         User-defined maximum longitudinal reinforcement percentage, can be undefined (is not set, true as default)
 * @param {Number} property_user_defined_maximum_longitudinal_reinforcement_percentage_value    Maximum reinforcement, can be undefined (is not set, 4% as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_UserDefinedMaximumLongitudinalReinforcementPercentage = function (property_user_defined_maximum_longitudinal_reinforcement_percentage,
    property_user_defined_maximum_longitudinal_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMaximumLongitudinalReinforcementPercentage(this.addon.settings_surface_ec2, property_user_defined_maximum_longitudinal_reinforcement_percentage, property_user_defined_maximum_longitudinal_reinforcement_percentage_value);
};

/**
 * Sets Minimum shear reinforcement acc. to 9.3.2
 * @param {Boolean} property_minimum_shear_reinforcement    Minimum shear reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_MinimumShearReinforcement = function (property_minimum_shear_reinforcement) {
    SetConcreteDesignSurfacesMinimumShearReinforcement(this.addon.settings_surface_ec2, property_minimum_shear_reinforcement);
};

/**
 * Sets User-defined minimum shear reinforcement percentage
 * @param {Boolean} property_user_defined_minimum_shear_reinforcement_percentage        Minimum shear reinforcement percentage, can be undefined (is not set, false as default)
 * @param {Number} property_user_defined_minimum_shear_reinforcement_percentage_value   Minimum reinforcement, can be undefined, can be undefined (is not set, 0% as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_UserDefinedMinimumShearReinforcementPercentage = function (property_user_defined_minimum_shear_reinforcement_percentage,
    property_user_defined_minimum_shear_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMinimumShearReinforcementPercentage(this.addon.settings_surface_ec2, property_user_defined_minimum_shear_reinforcement_percentage, property_user_defined_minimum_shear_reinforcement_percentage_value);
};

/**
 * Sets Required Longitudinal Reinforcement
 * @param {Boolean} property_surface_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement  Include tensile force due to shear in required longitudinal reinforcement, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_RequiredLongitudinalReinforcement = function (property_surface_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_surface_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement === "undefined") {
        property_surface_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement = true;
    }
    this.addon.settings_surface_ec2.property_surface_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement = property_surface_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement;
};

/**
 * Sets Required Shear Reinforcement - Shear Capacity
 * @param {String} required_shear_reinforcement     Required Shear Reinforcement value, can be undefined (is not set, REQUIRED as default)
 *                                                  - Use required longitudinal reinforcement (REQUIRED)
 *                                                  - Use provided longitudinal reinforcement (PROVIDED)
 *                                                  - Automatically increase required longitudinal reinf. to avoid shear reinf. (AUTOMATICALLY)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_RequiredShearReinforcement = function (required_shear_reinforcement) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    SetConcreteDesignRequiredShearReinforcementType(this.addon.settings_surface_ec2, "surface", ["REQUIRED", "PROVIDED", "AUTOMATICALLY"], required_shear_reinforcement);
};

/**
 * Sets Neutral Axis Depth Limitation
 * @param {Boolean} property_surface_consider_neutral_axis_depth_limitation   Consider neutral axis depth limitation acc. to 5.6.2(2), 5.6.3(2), can be undefined (true as default)
 * @param {Number} property_surface_value_of_neutral_axis_depth_limitation   Value of neutral axis depth limitation, can be undefined (is not set, 0.45 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_NeutralAxisDepthLimitation = function (property_surface_consider_neutral_axis_depth_limitation,
    property_surface_value_of_neutral_axis_depth_limitation) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_surface_ec2, "surface", property_surface_consider_neutral_axis_depth_limitation, property_surface_value_of_neutral_axis_depth_limitation);
};

/**
 * Sets Fiber Concrete
 * @param {String} property_surface_fiber_concrete_material_model_for_tension_strains   Concrete - Material model for tension strains (SDL1, SDL2, SDL3), can be undefined (is not set, SDL1 as default)
 * @param {String} property_surface_fiber_concrete_model_for_compression                Concrete - Model for compression (PARABOLIC_RECTANGULAR, MODEL_PARABOLIC), can be undefined (is not set, PARABOLIC_RECTANGULAR as default)
 * @param {String} property_surface_fiber_concrete_material_model                       Reinforcement - Material model (BILINEAR_HARDENING, BILINEAR_YIELDING), can be undefined (is not set, BILINEAR_HARDENING as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetSurfaces_FiberConcrete = function (property_surface_fiber_concrete_material_model_for_tension_strains,
    property_surface_fiber_concrete_model_for_compression,
    property_surface_fiber_concrete_material_model) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    this.addon.settings_surface_ec2.property_surface_fiber_concrete_material_model_for_tension_strains = GetConcreteDesignMaterialModelForTensionStrain("surface", property_surface_fiber_concrete_material_model_for_tension_strains);
    this.addon.settings_surface_ec2.property_surface_fiber_concrete_model_for_compression = EnumValueFromJSHLFTypeName(
        property_surface_fiber_concrete_model_for_compression,
        "model for compression",
        {
            "PARABOLIC_RECTANGULAR": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_COMPRESSION_MATERIAL_MODEL_PARABOLIC_RECTANGULAR,
            "MODEL_PARABOLIC": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_COMPRESSION_MATERIAL_MODEL_PARABOLIC
        },
        concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_COMPRESSION_MATERIAL_MODEL_PARABOLIC_RECTANGULAR);
    this.addon.settings_surface_ec2.property_surface_fiber_concrete_material_model = EnumValueFromJSHLFTypeName(
        property_surface_fiber_concrete_material_model,
        "material model",
        {
            "BILINEAR_HARDENING": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_REINFORCEMENT_MATERIAL_MODEL_BILINEAR_HARDENING,
            "BILINEAR_YIELDING": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_REINFORCEMENT_MATERIAL_MODEL_BILINEAR_YIELDING
        },
        concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_REINFORCEMENT_MATERIAL_MODEL_BILINEAR_HARDENING);
};

/**
 * Sets Structural Element
 * @param {String} property_node_structure_element_type     Structural element type (AUTO, SLAB, FOUNDATION), can be undefined (is not set, AUTO as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_StructuralElement = function (property_node_structure_element_type) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    this.addon.settings_node_ec2.property_node_structure_element_type = EnumValueFromJSHLFTypeName(
        property_node_structure_element_type,
        "structural element",
        {
            "AUTO": concrete_design_node_ulsconfig_concrete_design_ec2.E_STRUCTURE_ELEMENT_TYPE_AUTO,
            "SLAB": concrete_design_node_ulsconfig_concrete_design_ec2.E_STRUCTURE_ELEMENT_TYPE_SLAB,
            "FOUNDATION": concrete_design_node_ulsconfig_concrete_design_ec2.E_STRUCTURE_ELEMENT_TYPE_FOUNDATION
        },
        concrete_design_node_ulsconfig_concrete_design_ec2.E_STRUCTURE_ELEMENT_TYPE_AUTO);
};

/**
 * Sets Punching Load - Columns
 * @param {String} property_node_used_punching_load_for_columns                                 Used punching load for columns (SINGLE_FORCE, SMOOTHED_SHEAR_FORCE, UNSMOOTHED_SHEAR_FORCE, USER_DEFINED), can be undefined (is not set, SINGLE_FORCE as default)
 * @param {Number} property_node_used_defined_value_of_punching_force                           User defined value of punching force, can be undefined (is not set, 100 kN as default)
 * @param {String} property_node_direction_of_punching_force                                    Direction of punching force (DETERMINE, PLUS_Z, MINUS_Z), can be undefined (is not set, DETERMINE as default)
 * @param {Boolean} property_node_used_punching_load_inside_critical_perimeter_for_columns      Consider surface load inside critical perimeter, can be undefined (is not set, false as default)
 * @param {Boolean} property_user_defined_load_inside_critical_perimeter_factor_for_columns     User-defined surface load inside critical perimeter, can be undefined (is not set, false as default)
 * @param {Number} property_node_load_inside_critical_perimeter_factor_for_columns              User-defined Load inside critical perimeter factor for columns, can be undefined (is not set, 10 kn/m2 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_PunchingLoadForColumns = function (property_node_used_punching_load_for_columns,
    property_node_used_defined_value_of_punching_force,
    property_node_direction_of_punching_force,
    property_node_used_punching_load_inside_critical_perimeter_for_columns,
    property_user_defined_load_inside_critical_perimeter_factor_for_columns,
    property_node_load_inside_critical_perimeter_factor_for_columns) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    this.addon.settings_node_ec2.property_node_used_punching_load_for_columns = EnumValueFromJSHLFTypeName(
        property_node_used_punching_load_for_columns,
        "punching load for column",
        {
            "SINGLE_FORCE": concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SINGLE_FORCE,
            "SMOOTHED_SHEAR_FORCE": concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SMOOTHED_SHEAR_FORCE,
            "UNSMOOTHED_SHEAR_FORCE": concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_UNSMOOTHED_SHEAR_FORCE,
            "USER_DEFINED": concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_USER_DEFINED
        },
        concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SINGLE_FORCE);
    if (typeof property_node_used_defined_value_of_punching_force !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_used_punching_load_for_columns === concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_USER_DEFINED, "User-defined load for columns must be defined");
        this.addon.settings_node_ec2.property_node_used_defined_value_of_punching_force = property_node_used_defined_value_of_punching_force;
    }
    this.addon.settings_node_ec2.property_node_direction_of_punching_force = GetConcreteDesignPunchingDirectionForceType(property_node_direction_of_punching_force);
    if (typeof property_node_used_punching_load_inside_critical_perimeter_for_columns !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_used_punching_load_for_columns !== concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SINGLE_FORCE, concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SINGLE_FORCE + " must be not defined");
        this.addon.settings_node_ec2.property_node_used_punching_load_inside_critical_perimeter_for_columns = property_node_used_punching_load_inside_critical_perimeter_for_columns;
    }
    if (typeof property_user_defined_load_inside_critical_perimeter_factor_for_columns !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_used_punching_load_inside_critical_perimeter_for_columns, "Consider surface load inside critical perimeter must be on");
        this.addon.settings_node_ec2.property_user_defined_load_inside_critical_perimeter_factor_for_columns = property_user_defined_load_inside_critical_perimeter_factor_for_columns;
    }
    if (typeof property_node_load_inside_critical_perimeter_factor_for_columns !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_user_defined_load_inside_critical_perimeter_factor_for_columns, "User-defined surface load inside critical perimeter must be on");
        this.addon.settings_node_ec2.property_node_load_inside_critical_perimeter_factor_for_columns = property_node_load_inside_critical_perimeter_factor_for_columns;
    }
};

/**
 * Sets Punching Load - Walls
 * @param {String} property_node_used_punching_load_for_walls                                   Used punching load for walls, can be undefined (is not set, SMOOTHED_SHEAR_FORCE as default)
 * @param {Boolean} property_node_used_punching_load_inside_critical_perimeter_for_walls        Consider surface load inside critical perimeter, can be undefined (is not set, false as default)
 * @param {Boolean} property_user_defined_load_inside_critical_perimeter_factor_for_walls       User-defined surface load inside critical perimeter, can be undefined (is not set, false as default)
 * @param {Number} property_node_load_inside_critical_perimeter_factor_for_walls                User-defined load inside critical perimeter factor for walls, can be undefined (is not set, 12 kN/m2 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_PunchingLoadForWalls = function (property_node_used_punching_load_for_walls,
    property_node_used_punching_load_inside_critical_perimeter_for_walls,
    property_user_defined_load_inside_critical_perimeter_factor_for_walls,
    property_node_load_inside_critical_perimeter_factor_for_walls) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    this.addon.settings_node_ec2.property_node_used_punching_load_for_walls = EnumValueFromJSHLFTypeName(
        property_node_used_punching_load_for_walls,
        "punching load for walls",
        {
            "SMOOTHED_SHEAR_FORCE": concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SMOOTHED_SHEAR_FORCE,
            "UNSMOOTHED_SHEAR_FORCE": concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_UNSMOOTHED_SHEAR_FORCE
        },
        concrete_design_node_ulsconfig_concrete_design_ec2.E_USED_PUNCHING_LOAD_TYPE_SMOOTHED_SHEAR_FORCE);
    if (typeof property_node_used_punching_load_inside_critical_perimeter_for_walls !== "undefined") {
        this.addon.settings_node_ec2.property_node_used_punching_load_inside_critical_perimeter_for_walls = property_node_used_punching_load_inside_critical_perimeter_for_walls;
    }
    if (typeof property_user_defined_load_inside_critical_perimeter_factor_for_walls !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_used_punching_load_inside_critical_perimeter_for_columns, "Consider surface load inside critical perimeter must be on");
        this.addon.settings_node_ec2.property_user_defined_load_inside_critical_perimeter_factor_for_walls = property_user_defined_load_inside_critical_perimeter_factor_for_walls;
    }
    if (typeof property_node_load_inside_critical_perimeter_factor_for_walls !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_user_defined_load_inside_critical_perimeter_factor_for_walls, "User-defined surface load inside critical perimeter must be on");
        this.addon.settings_node_ec2.property_node_load_inside_critical_perimeter_factor_for_walls = property_node_load_inside_critical_perimeter_factor_for_walls;
    }
};

/**
 * Sets Punching load - Deductible surface load for slab
 * @param {Boolean} property_node_deductible_surface_load_for_slab                  Deductible surface load for slab, can be undefined (is not set, false as default)
 * @param {String} surface_load_for_slab_type                                       Used punching load for walls (AUTOMATICALLY, USER_DEFINED), can be undefined (is not set, AUTOMATICALLY as default)
 * @param {Number} property_node_deductible_portion_for_slab                        Deductible portion, can be undefined (is not set, 100% as default)
 * @param {Number} property_node_deductible_portion_for_slab_user_defined_value     User-defined deductible portion for slab value, can be undefined (is not set, 10 kN/m2 as default)
 * @param {String} property_node_distance_deductible_surface                        Distance of deductible surface (L_W_OUT, K_D), can be undefined (is not set, L_W_OUT as default)
 * @param {String} property_node_multiple_static_depth_for_slab                     Multiple static depth (k * d), can be undefined (is not set, 1 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_DeductibleSurfaceLoadForSlab = function (property_node_deductible_surface_load_for_slab,
    surface_load_for_slab_type,
    property_node_deductible_portion_for_slab,
    property_node_deductible_portion_for_slab_user_defined_value,
    property_node_distance_deductible_surface,
    property_node_multiple_static_depth_for_slab) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_deductible_surface_load_for_slab !== "undefined") {
        this.addon.settings_node_ec2.property_node_deductible_surface_load_for_slab = property_node_deductible_surface_load_for_slab;
    }
    if (typeof surface_load_for_slab_type !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_deductible_surface_load_for_slab, "Deductible surface load for slab must be on");
        SetConcreteDesignDeductibleSurfaceLoadForSlabType(this.addon, surface_load_for_slab_type);
    }
    if (typeof property_node_deductible_portion_for_slab !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_deductible_surface_load_for_slab, "Deductible surface load for slab must be on");
        ASSERT(this.addon.settings_node_ec2.property_node_deductible_surface_load_for_slab, "Punching load automatically must be set");
        this.addon.settings_node_ec2.property_node_deductible_portion_for_slab = property_node_deductible_portion_for_slab;
    }
    if (typeof property_node_deductible_portion_for_slab_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_deductible_surface_load_for_slab, "Deductible surface load for slab must be on");
        ASSERT(this.addon.settings_node_ec2.property_node_deductible_portion_for_slab_user_defined, "Punching load user-defined must be set");
        this.addon.settings_node_ec2.property_node_deductible_portion_for_slab_user_defined_value = property_node_deductible_portion_for_slab_user_defined_value;
    }
    if (typeof property_node_distance_deductible_surface !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_deductible_surface_load_for_slab, "Deductible surface load for slab must be on");
        this.addon.settings_node_ec2.property_node_distance_deductible_surface = EnumValueFromJSHLFTypeName(
            property_node_distance_deductible_surface,
            "distance deductible surface",
            {
                "L_W_OUT": concrete_design_node_ulsconfig_concrete_design_ec2.E_DISTANCE_DEDUCTIBLE_SURFACE_L_W_OUT,
                "K_D": concrete_design_node_ulsconfig_concrete_design_ec2.E_DISTANCE_DEDUCTIBLE_SURFACE_K_D
            },
            concrete_design_node_ulsconfig_concrete_design_ec2.E_DISTANCE_DEDUCTIBLE_SURFACE_L_W_OUT);
    }
    if (typeof property_node_multiple_static_depth_for_slab !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_distance_deductible_surface === concrete_design_node_ulsconfig_concrete_design_ec2.E_DISTANCE_DEDUCTIBLE_SURFACE_K_D, "Distance of deductible surface must be of K_D type");
        this.addon.settings_node_ec2.property_node_multiple_static_depth_for_slab = property_node_multiple_static_depth_for_slab;
    }
};

ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_FactorBeta = function (property_node_factor_beta_estimated_according_to_clause,
    property_node_defined_factor_beta) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    this.addon.settings_node_ec2.property_node_factor_beta_estimated_according_to_clause = EnumValueFromJSHLFTypeName(
        property_node_factor_beta_estimated_according_to_clause,
        "method determination factor beta",
        {
            "FULL_PLASTIC_SHEAR_DISTRIBUTION": concrete_design_node_ulsconfig_concrete_design_ec2.E_FACTOR_BETA_ESTIMATED_ACCORDING_TO_CLAUSE_TYPE_FULL_PLASTIC_SHEAR_DISTRIBUTION,
            "CONSTANT_FACTORS": concrete_design_node_ulsconfig_concrete_design_ec2.E_FACTOR_BETA_ESTIMATED_ACCORDING_TO_CLAUSE_TYPE_CONSTANT_FACTORS,
            "DETERMINED_BY_SECTOR_METHOD": concrete_design_node_ulsconfig_concrete_design_ec2.E_FACTOR_BETA_ESTIMATED_ACCORDING_TO_CLAUSE_TYPE_DETERMINED_BY_SECTOR_METHOD,
            "USER_DEFINITION": concrete_design_node_ulsconfig_concrete_design_ec2.E_FACTOR_BETA_ESTIMATED_ACCORDING_TO_CLAUSE_TYPE_USER_DEFINITION
        },
        concrete_design_node_ulsconfig_concrete_design_ec2.E_FACTOR_BETA_ESTIMATED_ACCORDING_TO_CLAUSE_TYPE_FULL_PLASTIC_SHEAR_DISTRIBUTION);
    if (typeof property_node_defined_factor_beta !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_factor_beta_estimated_according_to_clause === concrete_design_node_ulsconfig_concrete_design_ec2.E_FACTOR_BETA_ESTIMATED_ACCORDING_TO_CLAUSE_TYPE_USER_DEFINITION, "Applied method for determining factor β must be of USER_DEFINITION type");
        this.addon.settings_node_ec2.property_node_defined_factor_beta = property_node_defined_factor_beta;
    }
};

/**
 * Sets Loaded Area of Punching Node
 * @param {Boolean} property_node_define_loaded_area_for_punching_node_type_column      Define loaded area for punching node type "Column", can be undefined (is not set, false as default)
 * @param {String} property_node_shape_of_loaded_area                                   Shape of loaded area (RECTANGULAR, CIRCULAR), can be undefined (is not set, RECTANGULAR as default)
 * @param {Array} shape_parameters                                                      - [Width in direction x, Width in direction y, Rotation] array for RECTANGULAR shape of loaded area
 *                                                                                      - [Diameter] array for CIRCULAR shape of loaded area
 * @param {Boolean} property_node_define_wall_thicknesses_for_punching_node_type_wall   Define wall thicknesses for punching node type "Wall", can be undefined (is not set, false as default) 
 * @param {Number} property_node_wall_thickness_1                                       Wall thickness 1 (Wall End, Wall Corner), can be undefined (is not set, 0.24 m as default)
 * @param {Number} property_node_wall_thickness_2                                       Wall thickness 2 (Wall Corner), can be undefined (is not set, 0.2 m as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_LoadedAreaOfPunchingNode = function (property_node_define_loaded_area_for_punching_node_type_column,
    property_node_shape_of_loaded_area,
    shape_parameters,
    property_node_define_wall_thicknesses_for_punching_node_type_wall,
    property_node_wall_thickness_1,
    property_node_wall_thickness_2) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_define_loaded_area_for_punching_node_type_column !== "undefined") {
        this.addon.settings_node_ec2.property_node_define_loaded_area_for_punching_node_type_column = property_node_define_loaded_area_for_punching_node_type_column;
    }
    if (typeof property_node_shape_of_loaded_area !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_loaded_area_for_punching_node_type_column, "Define loaded area for punching node type \"Column\" must be on");
        this.addon.settings_node_ec2.property_node_shape_of_loaded_area = GetConcreteDesignShapeOfLoadedAreaType(property_node_shape_of_loaded_area);
    }
    if (typeof shape_parameters !== "undefined") {
        ASSERT(Array.isArray(shape_parameters), "shape_parameters must be defined as array of parameters");
        if (this.addon.settings_node_ec2.property_node_shape_of_loaded_area === GetConcreteDesignShapeOfLoadedAreaType("RECTANGULAR")) {
            ASSERT(shape_parameters.length == 3, "shape parameters must be specified as array: [width x, width y, rotation]");
            this.addon.settings_node_ec2.property_node_rectangular_shape_width_in_direction_x = shape_parameters[0];
            this.addon.settings_node_ec2.property_node_rectangular_shape_width_in_direction_y = shape_parameters[1];
            this.addon.settings_node_ec2.property_node_rectangular_shape_rotation = shape_parameters[2];
        }
        else if (this.addon.settings_node_ec2.property_node_shape_of_loaded_area === GetConcreteDesignShapeOfLoadedAreaType("CIRCULAR")) {
            ASSERT(shape_parameters.length == 1, "shape parameters must be specified as array: [diameter]");
            this.addon.settings_node_ec2.property_node_circular_shape_diameter = shape_parameters[0];
        }
        else {
            ASSERT(false, "Punching_LoadedAreaOfPunchingNode");
        }
    }
    if (typeof property_node_define_wall_thicknesses_for_punching_node_type_wall !== "undefined") {
        this.addon.settings_node_ec2.property_node_define_wall_thicknesses_for_punching_node_type_wall = property_node_define_wall_thicknesses_for_punching_node_type_wall;
    }
    if (typeof property_node_wall_thickness_1 !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_wall_thicknesses_for_punching_node_type_wall, "Define wall thicknesses for punching node type \"Wall\" must be on");
        this.addon.settings_node_ec2.property_node_wall_thickness_1 = property_node_wall_thickness_1;
    }
    if (typeof property_node_wall_thickness_2 !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_wall_thicknesses_for_punching_node_type_wall, "Define wall thicknesses for punching node type \"Wall\" must be on");
        this.addon.settings_node_ec2.property_node_wall_thickness_2 = property_node_wall_thickness_2;
    }
};

/**
 * Sets Basic control perimeter
 * @param {Boolean} property_node_define_critical_section_for_slab  Define critical section for slab, can be undefined (is not set, false as default)
 * @param {Number} property_node_distance                           Distance, can be undefined (is not set, 0.29 m as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_BasicControlPerimeter = function (property_node_define_critical_section_for_slab,
    property_node_distance) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_define_critical_section_for_slab !== "undefined") {
        this.addon.settings_node_ec2.property_node_define_critical_section_for_slab = property_node_define_critical_section_for_slab;
    }
    if (typeof property_node_distance !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_critical_section_for_slab, "Define critical section for slab must be on");
        this.addon.settings_node_ec2.property_node_distance = property_node_distance;
    }
};

/**
 * Sets Mean effective depth
 * @param {Boolean} property_node_define_region_of_detection_of_effective_depth     The minimum effective depth is used for the calculation in this area, can be undefined (is not set, false as default)
 * @param {Number} property_node_distance_from_loading_area                         Distance from loading area, can be undefined (is not set, 0.5 m as default)
 * @param {Boolean} property_node_column_penetration                                Column penetration reduces mean effective depth, can be undefined (is not set, false as default)
 * @param {Number} property_node_penetration_on_top_side                            Penetration on top side (-z), can be undefined (is not set, 0.02 m as default)
 * @param {Number} property_node_penetration_on_bottom_side                         Penetration on bottom side (+z), can be undefined (is not set, 0.02 m as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_MeanEffectiveDepth = function (property_node_define_region_of_detection_of_effective_depth,
    property_node_distance_from_loading_area,
    property_node_column_penetration,
    property_node_penetration_on_top_side,
    property_node_penetration_on_bottom_side) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_define_region_of_detection_of_effective_depth !== "undefined") {
        this.addon.settings_node_ec2.property_node_define_region_of_detection_of_effective_depth = property_node_define_region_of_detection_of_effective_depth;
    }
    if (typeof property_node_distance_from_loading_area !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_region_of_detection_of_effective_depth, "The minimum effective depth is used for the calculation in this area must be on");
        this.addon.settings_node_ec2.property_node_distance_from_loading_area = property_node_distance_from_loading_area;
    }
    if (typeof property_node_column_penetration !== "undefined") {
        this.addon.settings_node_ec2.property_node_column_penetration = property_node_column_penetration;
    }
    if (typeof property_node_penetration_on_top_side !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_column_penetration, "Column penetration reduces mean effective depth must be on");
        this.addon.settings_node_ec2.property_node_penetration_on_top_side = property_node_penetration_on_top_side;
    }
    if (typeof property_node_penetration_on_bottom_side !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_column_penetration, "Column penetration reduces mean effective depth must be on");
        this.addon.settings_node_ec2.property_node_penetration_on_bottom_side = property_node_penetration_on_bottom_side;
    }
};

/**
 * Sets Punching shear reinforcement
 * @param {Number} property_node_punch_s_r_min                                                      Minimum Spacing of Reinforcement Perimeters, can be undefined (is not set, 0.1 m as default)
 * @param {Boolean} property_node_define_perimeter                                                  Define perimeter, can be undefined (is not set, false as default)
 * @param {Boolean} property_node_define_sections_for_analysis_of_punching_shear_reinforcement      Define sections for analysis of punching shear reinforcement, can be undefined (is not set, false as default)
 * @param {Number} property_node_number_of_inner_control_perimeters                                 Number of inner control perimeter, can be undefined (is not set, 2 as default)
 * @param {Boolean} property_node_define_distance_to_loaded_area                                    Distance to load area, can be undefined (is not set, false as default)
 * @param {Number} property_node_first_distance                                                     1st distance, can be undefined (is not set, 0.3 m as default)
 * @param {Number} property_node_radial_spacing                                                     Radial spacing, can be undefined (is not set, 0.2 m as default)
 * @param {Boolean} property_node_define_outer_control_perimeter                                    Define outer control perimeter, can be undefined (is not set, false as default)
 * @param {Number} property_node_distance_of_outer_control_perimeter_to_loaded_area                 Distance to load area, can be undefined (is not set, 2 m as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_PunchingShearReinforcement = function (property_node_punch_s_r_min,
    property_node_define_perimeter,
    property_node_define_sections_for_analysis_of_punching_shear_reinforcement,
    property_node_number_of_inner_control_perimeters,
    property_node_define_distance_to_loaded_area,
    property_node_first_distance,
    property_node_radial_spacing,
    property_node_define_outer_control_perimeter,
    property_node_distance_of_outer_control_perimeter_to_loaded_area) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_punch_s_r_min !== "undefined") {
        this.addon.settings_node_ec2.property_node_punch_s_r_min = property_node_punch_s_r_min;
    }
    if (typeof property_node_define_perimeter !== "undefined") {
        this.addon.settings_node_ec2.property_node_define_perimeter = property_node_define_perimeter;
    }
    if (typeof property_node_define_sections_for_analysis_of_punching_shear_reinforcement !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_perimeter, "Define perimeter must be on");
        this.addon.settings_node_ec2.property_node_define_sections_for_analysis_of_punching_shear_reinforcement = property_node_define_sections_for_analysis_of_punching_shear_reinforcement;
    }
    if (typeof property_node_number_of_inner_control_perimeters !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_sections_for_analysis_of_punching_shear_reinforcement, "Define sections for analysis of punching shear reinforcement must be on");
        this.addon.settings_node_ec2.property_node_number_of_inner_control_perimeters = property_node_number_of_inner_control_perimeters;
    }
    if (typeof property_node_define_distance_to_loaded_area !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_sections_for_analysis_of_punching_shear_reinforcement, "Define sections for analysis of punching shear reinforcement must be on");
        this.addon.settings_node_ec2.property_node_define_distance_to_loaded_area = property_node_define_distance_to_loaded_area;
    }
    if (typeof property_node_first_distance !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_distance_to_loaded_area, "Distance to load area must be on");
        this.addon.settings_node_ec2.property_node_first_distance = property_node_first_distance;
    }
    if (typeof property_node_radial_spacing !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_distance_to_loaded_area, "Distance to load area must be on");
        this.addon.settings_node_ec2.property_node_radial_spacing = property_node_radial_spacing;
    }
    if (typeof property_node_define_outer_control_perimeter !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_perimeter, "Define perimeter must be on");
        this.addon.settings_node_ec2.property_node_define_outer_control_perimeter = property_node_define_outer_control_perimeter;
    }
    if (typeof property_node_distance_of_outer_control_perimeter_to_loaded_area !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_define_outer_control_perimeter, "Define outer control perimeter must be on");
        this.addon.settings_node_ec2.property_node_distance_of_outer_control_perimeter_to_loaded_area = property_node_distance_of_outer_control_perimeter_to_loaded_area;
    }
};

/**
 * Sets Additional Parameters
 * @param {String/Number} property_node_variable_thickness_definition   Definition of variable thickness (AUTO or user-defined number), can be undefined (is not set, AUTO as default)
 * @param {String/Number} property_node_reference_surfaces_thickness    Thickness of reference surfaces (MINIMUM_THICKNESS, MAXIMUM_THICKNESS, SELECTED or user-defined value), can be undefined (is not set, MINIMUM_THICKNESS as default)
 * @param {Number} property_node_reference_surface_no                   Reference surface No., can be undefined (is not set, 1 as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_AdditionalParameters = function (property_node_variable_thickness_definition,
    property_node_reference_surfaces_thickness,
    property_node_reference_surface_no) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_variable_thickness_definition !== "undefined") {
        if (typeof property_node_variable_thickness_definition === "string") {
            ASSERT(property_node_variable_thickness_definition === "AUTO", "Definition of variable thickness must be of AUTO type");
            this.addon.settings_node_ec2.property_node_variable_thickness_definition = concrete_design_node_ulsconfig_concrete_design_ec2.E_VARIABLE_THICKNESS_DEFINITION_TYPE_AUTO;
        }
        else {
            ASSERT(typeof property_node_variable_thickness_definition === "number", "Definition of variable thickness must be number");
            this.addon.settings_node_ec2.property_node_variable_thickness_definition = concrete_design_node_ulsconfig_concrete_design_ec2.E_VARIABLE_THICKNESS_DEFINITION_TYPE_USER_DEFINED;
            this.addon.settings_node_ec2.property_node_variable_thickness_definition_user_value = property_node_variable_thickness_definition;
        }
    }
    if (typeof property_node_reference_surfaces_thickness !== "undefined") {
        if (typeof property_node_reference_surfaces_thickness === "string") {
            this.addon.settings_node_ec2.property_node_reference_surfaces_thickness = GetConcreteDesignReferenceSurfacesThicknessType(property_node_reference_surfaces_thickness);
        }
        else {
            ASSERT(typeof property_node_reference_surfaces_thickness === "number", "Thickness of reference surfaces must be number");
            this.addon.settings_node_ec2.property_node_reference_surfaces_thickness = GetConcreteDesignReferenceSurfacesThicknessType("USER_DEFINED");
            this.addon.settings_node_ec2.property_node_reference_surfaces_thickness_user_value = property_node_reference_surfaces_thickness;
        }
    }
    if (typeof property_node_reference_surface_no !== "undefined") {
        ASSERT(this.addon.settings_node_ec2.property_node_reference_surfaces_thickness === GetConcreteDesignReferenceSurfacesThicknessType("SELECTED"), "Thickness of reference surfaces must be of SELECTED type");
        this.addon.settings_node_ec2.property_node_reference_surface_no = property_node_reference_surface_no;
    }
};

/**
 * Sets Axial Force Definition
 * @param {String/Number} property_node_axial_force     Axial force (DETERMINE or user-value magnitude), can be undefined (is not set, DETERMINE as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_AxialForceDefinition = function (property_node_axial_force) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_axial_force !== "undefined") {
        if (typeof property_node_axial_force === "string") {
            ASSERT(property_node_axial_force === "DETERMINE", "Only DETERMINE string type is allowed");
            this.addon.settings_node_ec2.property_node_axial_force = concrete_design_node_ulsconfig_concrete_design_ec2.E_AXIAL_FORCE_TYPE_DETERMINE;
        }
        else {
            ASSERT(typeof property_node_axial_force === "number", "User-defined value is allowed");
            this.addon.settings_node_ec2.property_node_axial_force = concrete_design_node_ulsconfig_concrete_design_ec2.E_AXIAL_FORCE_TYPE_ENTER;
            this.addon.settings_node_ec2.property_node_magnitude = property_node_axial_force;
        }
    }
};

/**
 * Sets Required Punching Reinforcement - Punching Shear Capacity
 * @param {String} reinforcement_type   Required Punching Reinforcement - Punching Shear Capacity (REQUIRED, PROVIDED, CALCULATED), can be undefined (is not set, CALCULATED as default)
 *                                      - Use required longitudinal reinforcement (REQUIRED)
 *                                      - Use provided longitudinal reinforcement (PROVIDED)
 *                                      - Calculate required longitudinal reinforcement to avoid punching reinforcement or fulfill Eq. 6.52 (CALCULATED)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_RequiredPunchingReinforcement_PunchingShareCapacity = function (reinforcement_type) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    SetConcreteDesignRequiredPunchingReinforcementPunchingShareCapacityType(this.addon, reinforcement_type);
};

/**
 * Sets Minimum Reinforcement Acc. to Standard
 * @param {Boolean} property_node_minimum_punching_reinforcement    Minimum punching reinforcement acc. to 9.4.3(2), can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationEN.prototype.SetPunching_MinimumReinforcement = function (property_node_minimum_punching_reinforcement) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_minimum_punching_reinforcement === "undefined") {
        property_node_minimum_punching_reinforcement = true;
    }
    this.addon.settings_node_ec2.property_node_minimum_punching_reinforcement = property_node_minimum_punching_reinforcement;
};

function SetConcreteDesignRequiredPunchingReinforcementPunchingShareCapacityType(addon,
    reinforcement_type) {
        reinforcement_types = [
            "REQUIRED",
            "PROVIDED",
            "CALCULATED"
    ];
	if (reinforcement_type !== undefined) {
	  if (reinforcement_types.indexOf(reinforcement_type) === -1)
      {
        console.log("Wrong punching reinforcement share capacity type. Value was: " + reinforcement_type);
		console.log("Correct values are: " + reinforcement_types);
		return;
      }
	}
	else {
        reinforcement_type = "CALCULATED";
	}
    switch (reinforcement_type) {
        case "REQUIRED":
            addon.settings_node_ec2.property_node_punching_shear_capacity_use_required = true;
            break;
        case "PROVIDED":
            addon.settings_node_ec2.property_node_punching_shear_capacity_use_provided = true;
            break;
        case "CALCULATED":
            addon.settings_node_ec2.property_node_punching_shear_capacity_automatically_increase_required = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignRequiredPunchingReinforcementPunchingShareCapacityType: unknown punching reinforcement share capacity type");
    }
}

function GetConcreteDesignReferenceSurfacesThicknessType(thickness_type) {
    return EnumValueFromJSHLFTypeName(
        thickness_type,
        "reference surface thickness",
        {
            "MINIMUM_THICKNESS": concrete_design_node_ulsconfig_concrete_design_ec2.E_REFERENCE_SURFACES_THICKNESS_TYPE_MINIMUM_THICKNESS,
            "MAXIMUM_THICKNESS": concrete_design_node_ulsconfig_concrete_design_ec2.E_REFERENCE_SURFACES_THICKNESS_TYPE_MAXIMUM_THICKNESS,
            "USER_DEFINED": concrete_design_node_ulsconfig_concrete_design_ec2.E_REFERENCE_SURFACES_THICKNESS_TYPE_USER_DEFINED,
            "SELECTED": concrete_design_node_ulsconfig_concrete_design_ec2.E_REFERENCE_SURFACES_THICKNESS_TYPE_SELECTED
        },
        concrete_design_node_ulsconfig_concrete_design_ec2.E_REFERENCE_SURFACES_THICKNESS_TYPE_MINIMUM_THICKNESS);
}

function GetConcreteDesignShapeOfLoadedAreaType(area_type) {
    return EnumValueFromJSHLFTypeName(
        area_type,
        "shape of loaded area",
        {
            "RECTANGULAR": concrete_design_node_ulsconfig_concrete_design_ec2.E_SHAPE_OF_LOADED_AREA_RECTANGULAR,
            "CIRCULAR": concrete_design_node_ulsconfig_concrete_design_ec2.E_SHAPE_OF_LOADED_AREA_CIRCULAR
        },
        concrete_design_node_ulsconfig_concrete_design_ec2.E_SHAPE_OF_LOADED_AREA_RECTANGULAR);
}

function SetConcreteDesignDeductibleSurfaceLoadForSlabType(addon,
    surface_load_for_slab_type) {
        surface_load_for_slab_types = [
            "AUTOMATICALLY",
            "USER_DEFINED"
    ];
	if (surface_load_for_slab_type !== undefined) {
	  if (surface_load_for_slab_types.indexOf(surface_load_for_slab_type) === -1)
      {
        console.log("Wrong deductible surface load for slab type. Value was: " + surface_load_for_slab_type);
		console.log("Correct values are: " + surface_load_for_slab_types);
		return;
      }
	}
	else {
        surface_load_for_slab_type = "AUTOMATICALLY";
	}
    switch (surface_load_for_slab_type) {
        case "AUTOMATICALLY":
            addon.settings_node_ec2.property_node_deductible_surface_load_for_slab = true;
            break;
        case "USER_DEFINED":
            addon.settings_node_ec2.property_node_deductible_portion_for_slab_user_defined = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignDeductibleSurfaceLoadForSlabType: unknown deductible surface load for slab type");
    }
}

function SetConcreteDesignReinforcementMaximumLongitudinalReinforcementType(addon,
    reinforcement_type) {
        reinforcement_types = [
            "PLATES",
            "WALLS"
    ];
	if (reinforcement_type !== undefined) {
	  if (reinforcement_types.indexOf(reinforcement_type) === -1)
      {
        console.log("Wrong maximum longitudinal reinforcement type. Value was: " + reinforcement_type);
		console.log("Correct values are: " + reinforcement_types);
		return;
      }
	}
	else {
        reinforcement_type = "PLATES";
	}
    switch (reinforcement_type) {
        case "PLATES":
            addon.settings_surface_ec2.property_maximum_longitudinal_reinforcement_for_plates = true;
            break;
        case "WALLS":
            addon.settings_surface_ec2.property_maximum_longitudinal_reinforcement_for_walls = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignReinforcementMaximumLongitudinalReinforcementType: unknown maximum longitudinal reinforcement type");
    }
}

//Grandmaster version newly not supports this
/*function SetConcreteDesignFatigueDesignType(addon,
    fatigue_type) {
	const fatigue_types = [
        "SIMPLIFIED_DESIGN_METHOD",
        "DAMAGE_METHOD"
    ];
	if (fatigue_type !== undefined) {
	  if (fatigue_types.indexOf(fatigue_type) === -1)
      {
        console.log("Wrong fatigue design type. Value was: " + fatigue_type);
		console.log("Correct values are: " + fatigue_types);
		return;
      }
	}
	else {
        fatigue_type = "CYCLES_INTERVAL";
	}
    switch (fatigue_type) {
        case "SIMPLIFIED_DESIGN_METHOD":
            addon.settings_member_ec2.property_fatigue_design_simplified_design_method = true;
            break;
        case "DAMAGE_METHOD":
            addon.settings_member_ec2.property_fatigue_design_method_of_damage_equivalent_stress_range = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignFatigueDesignType: unknown fatigue design type");
    }
}*/

function SetConcreteDesignModificationDesignCheckType(addon,
    modification_type) {
	const modification_types = [
        "CORRECTION_FACTOR",
        "CYCLES_INTERVAL"
    ];
	if (modification_type !== undefined) {
	  if (modification_types.indexOf(modification_type) === -1)
      {
        console.log("Wrong modification of the design type. Value was: " + modification_type);
		console.log("Correct values are: " + modification_types);
		return;
      }
	}
	else {
        modification_type = "CYCLES_INTERVAL";
	}
    switch (modification_type) {
        case "CORRECTION_FACTOR":
            addon.settings_member_ec2.property_fatigue_design_use_correction_factor_for_calculated_equivalent_damage_stress_range = true;
            break;
        case "CYCLES_INTERVAL":
            addon.settings_member_ec2.property_fatigue_design_use_one_interval_with_defined_number_of_cycles_for_a_stress_range = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignModificationDesignCheck: unknown modification of the design type");
    }
}

function SetConcreteDesignCurvatureForRequiredReinforcement(addon,
    curvature_type) {
	const curvature_types = [
        "FACTOR_KR",
        "USER_DEFINED"
    ];
	if (curvature_type !== undefined) {
	  if (curvature_types.indexOf(curvature_type) === -1)
      {
        console.log("Wrong curvature type. Value was: " + curvature_type);
		console.log("Correct values are: " + curvature_types);
		return;
      }
	}
	else {
        curvature_type = "FACTOR_KR";
	}
    switch (curvature_type) {
        case "FACTOR_KR":
            addon.settings_member_ec2.property_stability_curvature_acc_5_8_8_3 = true;
            break;
        case "USER_DEFINED":
            addon.settings_member_ec2.property_stability_curvature_user_define = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignCurvatureForRequiredReinforcement: unknown curvature type");
    }
}

function GetConcreteDesignMaterialModelForTensionStrain(property_type,
    material_model_type) {
    if (property_type === "member") {
        return EnumValueFromJSHLFTypeName(
            material_model_type,
            "material model for tension strain",
            {
                "SDL1": ulsconfig_member_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1,
                "SDL2": ulsconfig_member_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL2,
                "SDL3": ulsconfig_member_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL3
            },
            ulsconfig_member_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1);
    }
    else if (property_type === "surface") {
        return EnumValueFromJSHLFTypeName(
            material_model_type,
            "material model for tension strain",
            {
                "SDL1": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1,
                "SDL2": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL2,
                "SDL3": concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL3
            },
            concrete_design_surface_ulsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1);
    }
    else {
        ASSERT(false, "GetConcreteDesignMaterialModelForTensionStrain");
        return "unsupported property type";
    }
}

function SetConcreteDesignFiberConcreteEffect(addon,
    fiber_concrete_effect_type) {
	const fiber_concrete_effect_types = [
        "BENDING_AND_SHEAR_DESIGN",
        "TORSION_DESIGN"
    ];
	if (fiber_concrete_effect_type !== undefined) {
	  if (fiber_concrete_effect_types.indexOf(fiber_concrete_effect_type) === -1)
      {
        console.log("Wrong fiber concrete effect type. Value was: " + fiber_concrete_effect_type);
		console.log("Correct values are: " + fiber_concrete_effect_types);
		return;
      }
	}
	else {
        fiber_concrete_effect_type = "BENDING_AND_SHEAR_DESIGN";
	}
    switch (fiber_concrete_effect_type) {
        case "BENDING_AND_SHEAR_DESIGN":
            addon.settings_member_ec2.property_member_fiber_concrete_effect_in_bending_and_shear_design = true;
            break;
        case "TORSION_DESIGN":
            addon.settings_member_ec2.property_member_fiber_concrete_effect_in_torsion_design = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignFiberConcreteEffect: unknown fiber concrete effect type");
    }
}

function SetConcreteDesignAnalysisMethodForShearStressInJoint(addon,
    analysis_method_type) {
	const analysis_method_types = [
        "ANALYTICAL_WITH_SHEAR_FORCE",
        "GENERAL_INTEGRATION_OF_AXIAL_STRESSES"
    ];
	if (analysis_method_type !== undefined) {
	  if (analysis_method_types.indexOf(analysis_method_type) === -1)
      {
        console.log("Wrong analysis method for shear stress joint type. Value was: " + analysis_method_type);
		console.log("Correct values are: " + analysis_method_types);
		return;
      }
	}
	else {
        analysis_method_type = "ANALYTICAL_WITH_SHEAR_FORCE";
	}
    switch (analysis_method_type) {
        case "ANALYTICAL_WITH_SHEAR_FORCE":
            addon.settings_member_ec2.property_member_shear_joint_analysis_method_analytical = true;
            break;
        case "GENERAL_INTEGRATION_OF_AXIAL_STRESSES":
            addon.settings_member_ec2.property_member_shear_joint_analysis_method_general = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignAnalysisMethodForShearStressInJoint: unknown analysis method for shear stress joint type");
    }
}