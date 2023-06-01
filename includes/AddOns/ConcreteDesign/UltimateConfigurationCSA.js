/**
 * Creates Concrete design ultimate configuration (CSA standard)
 * @class
 * @constructor
 * @param {Number} no           Ultimate configuration number, can be undefined
 * @param {Array} surfaces_no   Assigned surfaces numbers, can be undefined
 * @param {Array} members_no    Assigned members numbers, can be undefined
 * @param {Array} nodes_no      Assigned nodes numbers, can be undefined
 * @param {String} comment      Comment, can be undefined
 * @param {Object} params       Additional parameters, can be undefined
 */
function ConcreteDesignUltimateConfigurationCSA (no,
    surfaces_no,
    members_no,
    nodes_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_uls_configurations, no, surfaces_no, members_no, nodes_no, comment, params);
}

/**
 * @returns Ultimate configuration index
 */
ConcreteDesignUltimateConfigurationCSA.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate configuration object
 */
ConcreteDesignUltimateConfigurationCSA.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Ultimate configuration name, can be undefined
 */
ConcreteDesignUltimateConfigurationCSA.prototype.SetName = function (name) {
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
ConcreteDesignUltimateConfigurationCSA.prototype.Members_ConsiderInternalForces = function (property_member_axial_forces,
    property_member_bending_moments_my,
    property_member_bending_moments_mz,
    property_member_torsional_moments,
    property_member_shear_forces_vy,
    property_member_shear_forces_vz) {
    SetConcreteDesignMembersConsiderInternalForces(this.addon.settings_member_csaa233, property_member_axial_forces, property_member_bending_moments_my, property_member_bending_moments_mz, property_member_torsional_moments,
        property_member_shear_forces_vy, property_member_shear_forces_vz);
};

/**
 * Sets Internal Force Reduction in z-Direction
 * @param {Boolean} property_member_redistribution_of_moments_in_continuous_flexural_members                        Redistribution of moments in continuous flexural members acc. to 9.2.4, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support  Reduction of moments or dimensioning for moments at face of a monolithic support, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_reduction_of_shear_at_support                                                   Reduction of shear at the support acc. to 11.3.2, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_InternalForceReductionZ = function (property_member_redistribution_of_moments_in_continuous_flexural_members,
    property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support,
    property_member_reduction_of_shear_at_support) {
    SetConcreteDesignMembersInternalForceReductionZ(this.addon.settings_member_csaa233, property_member_redistribution_of_moments_in_continuous_flexural_members, 
        property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support, property_member_reduction_of_shear_at_support);
};

/**
 * Sets Required longitudinal reinforcement
 * @param {String} property_member_reinforcement_layout                                                         Reinforcement layout (TOP_BOTTOM_OPTIMIZED_DISTRIBUTION, TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT, OPTIMIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, OPTIMIZED_PROVIDED_REINFORCEMENT as default)
 * @param {String/Number} property_member_reinforcement_diameter_for_preliminary_design                         Reinforcement diameter for preliminary design (MAX_OF_ALL or user-defined value), can be undefined (is not set as default, otherwise MAX_OF_ALL as default)
 * @param {Boolean} property_member_increase_of_tension_required_reinforcement_due_to_shear                     Increase of required tension reinforcement due to shear acc. to 11.3.9.2, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_RequiredLongitudinalReinforcement = function (property_member_reinforcement_layout,
    property_member_reinforcement_diameter_for_preliminary_design,
    property_member_increase_of_tension_required_reinforcement_due_to_shear) {
    SetConcreteDesignMembersRequiredLongitudinalReinforcement(this.addon.settings_member_csaa233, property_member_reinforcement_layout, property_member_reinforcement_diameter_for_preliminary_design, 
        undefined, undefined, undefined, property_member_increase_of_tension_required_reinforcement_due_to_shear);
};

/**
 * Sets Factors
 * @param {Number} property_member_strength_reduction_factor_concrete                               Strength reduction factors acc. to 8.4 - Concrete factor, van be undefined (is not set, 0.65 as default)
 * @param {Number} property_member_strength_reduction_factor_reinforcing                            Strength reduction factors acc. to 8.4 - Reinforcing factor, can be undefined (is not set, 0.85 as default)
 * @param {Number} property_member_strength_reduction_factor_concrete_stress_strain_relationship    Strength reduction factors acc. to 8.4 - Concrete stress-strain relationship factor acc. to 10.1.6, can be undefined (is not set, 0.9 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_Factors = function (property_member_strength_reduction_factor_concrete,
    property_member_strength_reduction_factor_reinforcing,
    property_member_strength_reduction_factor_concrete_stress_strain_relationship) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_strength_reduction_factor_concrete !== "undefined") {
        this.addon.settings_member_csaa233.property_member_strength_reduction_factor_concrete = property_member_strength_reduction_factor_concrete;
    }
    if (typeof property_member_strength_reduction_factor_reinforcing !== "undefined") {
        this.addon.settings_member_csaa233.property_member_strength_reduction_factor_reinforcing = property_member_strength_reduction_factor_reinforcing;
    }
    if (typeof property_member_strength_reduction_factor_concrete_stress_strain_relationship !== "undefined") {
        this.addon.settings_member_csaa233.property_member_strength_reduction_factor_concrete_stress_strain_relationship = property_member_strength_reduction_factor_concrete_stress_strain_relationship;
    }
};

/**
 * Sets Minimum Reinforcement Acc. to Standard
 * @param {Boolean} property_member_minimum_longitudinal_reinforcement  Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_minimum_shear_reinforcement         Minimum shear reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_minimum_construction_reinforcement  Minimum construction reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_MinimumReinforcement = function (property_member_minimum_longitudinal_reinforcement,
    property_member_minimum_shear_reinforcement,
    property_member_minimum_construction_reinforcement) {
    SetConcreteDesignMembersMinimumReinforcement(this.addon.settings_member_csaa233, property_member_minimum_longitudinal_reinforcement, property_member_minimum_shear_reinforcement,
        property_member_minimum_construction_reinforcement);
};

/**
 * Sets Required Shear Reinforcement - Shear Capacity
 * @param {String} shear_reinforcement  Use required longitudinal reinforcement (REQUIRED)
 *                                      Use provided longitudinal reinforcement (PROVIDED)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_RequiredShearReinforcement = function (shear_reinforcement) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignRequiredShearReinforcementType(this.addon.settings_member_csaa233, "member", ["REQUIRED", "PROVIDED"], shear_reinforcement);
};

/**
 * Sets Shear and Torsion Reinforcement
 * @param {String} determination_type       Determination of β and θ acc. to 11.3.6, can be undefined (is not set, GENERAL_METHOD as default)
 *                                          - General method acc. to 11.3.6.4 (GENERAL_METHOD)
 *                                          - Values for special members acc. to 11.3.6.2 (SPECIAL_MEMBERS)
 * @param {Number} property_member_beta     Factor accounting for shear resistance of cracked concrete, can be undefined (is not set, 0.21 as default)
 * @param {Number} property_member_theta    Angle of inclination of diagonal compressive stresses to longitudinal axis of member, can be undefined (is not set, 0.42 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_ShearAndTorsionReinforcement = function (determination_type,
    property_member_beta,
    property_member_theta) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignMemberDeterminationType(this.addon, determination_type);
    if (typeof property_member_beta !== "undefined") {
        ASSERT(this.addon.settings_member_csaa233.property_member_beta_and_theta_values_for_special_member_types, "Values for special members acc. to 11.3.6.2 must be on");
        this.addon.settings_member_csaa233.property_member_beta = property_member_beta;
    }
    if (typeof property_member_theta !== "undefined") {
        ASSERT(this.addon.settings_member_csaa233.property_member_beta_and_theta_values_for_special_member_types, "Values for special members acc. to 11.3.6.2 must be on");
        this.addon.settings_member_csaa233.property_member_theta = property_member_theta;
    }
};

/**
 * Sets Sets Depth Limitation of Neutral Axis
 * @param {Boolean} property_member_consider_neutral_axis_depth_limitation                      Consider depth limitation of neutral axis acc. to 10.5.2, can be undefined (is not set, false as default)
 * @param {String/Number} property_member_value_of_neutral_axis_depth_limitation_user_value     Value of neutral axis depth limitation (AUTOMATICALLY or user number value), can be undefined (is not set, AUTOMATICALLY as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_NeutralAxisDepthLimitation = function(property_member_consider_neutral_axis_depth_limitation,
    property_member_value_of_neutral_axis_depth_limitation_user_value) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_member_csaa233, "member", property_member_consider_neutral_axis_depth_limitation, property_member_value_of_neutral_axis_depth_limitation_user_value);
};

/**
 * Sets Calculation setting
 * @param {Boolean} property_member_nett_concrete_area  Net concrete area, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_CalculationSetting = function (property_member_nett_concrete_area) {
    SetConcreteDesignMembersCalculationSetting(this.addon.settings_member_csaa233, property_member_nett_concrete_area);
};

/**
 * Sets Epoxy factor
 * @param {String} epoxy_factor_type    Epoxy factor type, can be undefined (is not set, UNCOATED_OR_ZINC_COATED as default)
 *                                      - Epoxy-coated reinforcement (EPOXY_COATED_OR_ZINC)
 *                                      - Uncoated reinforcement (UNCOATED_OR_ZINC_COATED)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Members_EpoxyFactor = function (epoxy_factor_type) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignMemberEpoxyFactorType(this.addon.settings_member_csaa233, epoxy_factor_type);
};

/**
 * Sets Unbraced Column
 * @param {Number} property_stability_index_qy  Stability index for story in y-direction, can be undefined (is not set, 0.05 as default)
 * @param {Number} property_stability_index_qz  Stability index for story in z-direction, can be undefined (is not set, 0.05 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Stability_UnbracedColumn = function (property_stability_index_qy,
    property_stability_index_qz) {
    SetConcreteDesignStabilityUnbracedColumn(this.addon.settings_member_csaa233, property_stability_index_qy, property_stability_index_qz);
};

/**
 * Sets Required Reinforcement
 * @param {String} property_stability_reinforcement_layout                              Reinforcement layout (TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, UNIFORMLY_SURROUNDING as default)
 * @param {String/Number} reinforcement_diameter_for_preliminary_design_user_value      Reinforcement diameter for preliminary design (MAX_OF_ALL or user number value), can be undefined (is not set, MAX_OF_ALL as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Stability_RequiredReinforcement = function (property_stability_reinforcement_layout,
    reinforcement_diameter_for_preliminary_design_user_value) {
    SetConcreteDesignStabilityRequiredReinforcement(this.addon.settings_member_csaa233, property_stability_reinforcement_layout, reinforcement_diameter_for_preliminary_design_user_value);
};

/**
 * Sets Design method
 * @param {String} optimization_type    Design method optimization type, can be undefined (is not set, YES as default)
 *                                      - No optimization of design internal forces (NO)
 *                                      - Optimization of design internal forces (YES)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_DesignMethod = function (optimization_type) {
    SetConcreteDesignSurfacesDesignMethod(this.addon.settings_surface_csaa233, optimization_type);
};

/**
 * Sets Internal Forces Diagram Used for Design
 * @param {Boolean} property_subtraction_of_rib_components  Subtraction of rib components for the ULS calculation and for the analytic method of SLS calculation, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_InternalForcesDiagramUsedForDesign = function (property_subtraction_of_rib_components) {
    SetConcreteDesignSurfacesInternalForcesDiagramUsedForDesign(this.addon.settings_surface_csaa233, property_subtraction_of_rib_components);
};

/**
 * Sets Factors
 * @param {Number} property_surface_strength_reduction_factor_concrete                              Strength reduction factors acc. to 8.4 - Concrete factor, can be undefined (is not set, 0.65 as default)
 * @param {Number} property_surface_strength_reduction_factor_reinforcing                           Strength reduction factors acc. to 8.4 - Reinforcing factor, can be undefined (is not set, 0.85 as default)
 * @param {Number} property_surface_strength_reduction_factor_concrete_stress_strain_relationship   Strength reduction factors acc. to 8.4 - Concrete stress-strain relationship factor acc. to 10.1.6, can be undefined (is not set, 0.90 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_Factors = function (property_surface_strength_reduction_factor_concrete,
    property_surface_strength_reduction_factor_reinforcing,
    property_surface_strength_reduction_factor_concrete_stress_strain_relationship) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_surface_strength_reduction_factor_concrete !== "undefined") {
        this.addon.settings_surface_csaa233.property_surface_strength_reduction_factor_concrete = property_surface_strength_reduction_factor_concrete;
    }
    if (typeof property_surface_strength_reduction_factor_reinforcing !== "undefined") {
        this.addon.settings_surface_csaa233.property_surface_strength_reduction_factor_reinforcing = property_surface_strength_reduction_factor_reinforcing;
    }
    if (typeof property_surface_strength_reduction_factor_concrete_stress_strain_relationship !== "undefined") {
        this.addon.settings_surface_csaa233.property_surface_strength_reduction_factor_concrete_stress_strain_relationship = property_surface_strength_reduction_factor_concrete_stress_strain_relationship;
    }
};

/**
 * Sets Minimum longitudinal reinforcement acc. to standard
 * @param {Boolean} property_minimum_longitudinal_reinforcement_acc_to_standard     Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {String} reinforcement_type                                               Minimum longitudinal reinforcement acc. to standard type, can be undefined (is not set, PLATES as default)
 *                                                                                  - Minimum longitudinal reinforcement for plates acc. to 7.8.1 (PLATES)
                                                                                    - Minimum longitudinal reinforcement for walls acc. to 14.1.8.5 and 14.1.8.6 (WALLS)
 * @param {String} min_reinforcement_direction                                      Direction of minimum reinforcement, can be undefined (is not set, MAIN_TENSION_ELEMENT as default)
                                                                                    - On main tension side (MAIN_TENSION_ELEMENT)
                                                                                    - In tension direction (MAIN_TENSION_SURFACE)
                                                                                    - Defined (DEFINED)
 * @param {Array} min_reinforcement_direction_user_values                           User-defined direction of minimum reinforcement ([φ1(-z), φ2(-z), φ1(+z), φ2(+z)]), can be undefined (if not set, all values are true by default)
 * @param {String} main_compression_reinforcement_direction                         Direction of main compression reinforcement, can be undefined (is not set, WITH_MAIN_COMPRESSION_FORCE as default)
 *                                                                                  - Reinforcement direction with the main compression force (WITH_MAIN_COMPRESSION_FORCE)
 *                                                                                  - Defined in reinforcement direction (DEFINED_IN_REINFORCEMENT_DIRECTION)
 * @param {String} property_surface_reinforcement_defined_direction_phi             Reinforcement direction (PHI_1, PHI_2)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_MinimumLongitudinalReinforcement = function (property_minimum_longitudinal_reinforcement_acc_to_standard,
    reinforcement_type,
    min_reinforcement_direction,
    min_reinforcement_direction_user_values,
    main_compression_reinforcement_direction,
    property_surface_reinforcement_defined_direction_phi) {
    SetConcreteDesignSurfacesMinimumLongitudinalReinforcement(this.addon.settings_surface_csaa233, property_minimum_longitudinal_reinforcement_acc_to_standard, reinforcement_type, min_reinforcement_direction,
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
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage = function (property_user_defined_minimum_longitudinal_reinforcement_percentage,
    property_minimum_reinforcement,
    property_minimum_secondary_reinforcement,
    property_minimum_tension_reinforcement,
    property_minimum_compression_reinforcement) {
    SetConcreteDesignSurfacesUserDefinedMinimumLongitudinalReinforcementPercentage(this.addon.settings_surface_csaa233, property_user_defined_minimum_longitudinal_reinforcement_percentage, property_minimum_reinforcement,
        property_minimum_secondary_reinforcement, property_minimum_tension_reinforcement, property_minimum_compression_reinforcement);
};

/**
 * Sets User-defined maximum longitudinal reinforcement percentage
 * @param {Boolean} property_user_defined_maximum_longitudinal_reinforcement_percentage         User-defined maximum longitudinal reinforcement percentage, can be undefined (is not set, true as default)
 * @param {Number} property_user_defined_maximum_longitudinal_reinforcement_percentage_value    Maximum reinforcement, can be undefined (is not set, 4% as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage = function (property_user_defined_maximum_longitudinal_reinforcement_percentage,
    property_user_defined_maximum_longitudinal_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMaximumLongitudinalReinforcementPercentage(this.addon.settings_surface_csaa233, property_user_defined_maximum_longitudinal_reinforcement_percentage, property_user_defined_maximum_longitudinal_reinforcement_percentage_value);
};

/**
 * Sets Minimum shear reinforcement acc. to 11.2.8.1
 * @param {Boolean} property_minimum_shear_reinforcement    Minimum shear reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_MinimumShearReinforcement = function (property_minimum_shear_reinforcement) {
    SetConcreteDesignSurfacesMinimumShearReinforcement(this.addon.settings_surface_csaa233, property_minimum_shear_reinforcement);
};

/**
 * Sets User-defined minimum shear reinforcement percentage
 * @param {Boolean} property_user_defined_minimum_shear_reinforcement_percentage        Minimum shear reinforcement percentage, can be undefined (is not set, false as default)
 * @param {Number} property_user_defined_minimum_shear_reinforcement_percentage_value   Minimum reinforcement, can be undefined, (is not set, 0% as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_UserDefinedMinimumShearReinforcementPercentage = function (property_user_defined_minimum_shear_reinforcement_percentage,
    property_user_defined_minimum_shear_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMinimumShearReinforcementPercentage(this.addon.settings_surface_csaa233, property_user_defined_minimum_shear_reinforcement_percentage, property_user_defined_minimum_shear_reinforcement_percentage_value);
};

/**
 * Sets Required Shear Reinforcement - Shear Capacity
 * @param {String} required_shear_reinforcement     Required Shear Reinforcement value, can be undefined (is not set, REQUIRED as default)
 *                                                  - Use required longitudinal reinforcement (REQUIRED)
 *                                                  - Use provided longitudinal reinforcement (PROVIDED)
 *                                                  - Automatically increase required longitudinal reinf. to avoid shear reinf. (AUTOMATICALLY)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_RequiredShearReinforcement = function (required_shear_reinforcement) {
    SetConcreteDesignRequiredShearReinforcementType(this.addon.settings_surface_csaa233, "surface", ["REQUIRED", "PROVIDED"], required_shear_reinforcement);
};

/**
 * Set Shear reinforcement
 * @param {String} determination_method     Determination of β and θ acc. to 11.3.6, can be undefined (is not set, GENERAL_METHOD as default)
 *                                          - General method acc. to 11.3.6.4 (GENERAL_METHOD)
 *                                          - Values for special surfaces acc. to 11.3.6.2 (SPECIAL_SURFACES)
 * @param {Number} property_surface_beta    β, can be undefined (is not set, 0.21 as default)
 * @param {Number} property_surface_theta   θ, can be undefined (is not set, 42 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_ShearReinforcement = function (determination_method,
    property_surface_beta,
    property_surface_theta) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    SetConcreteDesignSurfaceDeterminationType(this.addon, determination_method);
    if (typeof property_surface_beta !== "undefined") {
        ASSERT(addon.settings_surface_csaa233.property_surface_beta_and_theta_values_for_special_surface_types, "Values for special surfaces must be on");
        this.addon.settings_surface_csaa233.property_surface_beta = property_surface_beta;
    }
    if (typeof property_surface_theta !== "undefined") {
        ASSERT(addon.settings_surface_csaa233.property_surface_beta_and_theta_values_for_special_surface_types, "Values for special surfaces must be on");
        this.addon.settings_surface_csaa233.property_surface_theta = property_surface_theta;
    }
};

/**
 * Sets Depth Limitation of Neutral Axis
 * @param {Boolean} property_member_consider_neutral_axis_depth_limitation                      Consider depth limitation of neutral axis acc. to 10.5.2, can be undefined (is not set, false as default)
 * @param {String/Number} property_member_value_of_neutral_axis_depth_limitation_user_value     Value of neutral axis depth limitation (AUTOMATICALLY or user number value), can be undefined (is not set, AUTOMATICALLY as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Surfaces_NeutralAxisDepthLimitation = function(property_member_consider_neutral_axis_depth_limitation,
    property_member_value_of_neutral_axis_depth_limitation_user_value) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_surface_csaa233, "surface", property_member_consider_neutral_axis_depth_limitation, property_member_value_of_neutral_axis_depth_limitation_user_value);
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
ConcreteDesignUltimateConfigurationCSA.prototype.Punching_PunchingLoad = function (property_node_used_punching_load_for_columns,
    property_node_used_punching_load_for_walls,
    property_node_distance_to_perimeter_used_for_integration_for_columns,
    property_node_distance_to_perimeter_used_for_integration_for_walls) {
    SetConcreteDesignPunchingPunchingLoad(this.addon.settings_node_csaa233, property_node_used_punching_load_for_columns, property_node_used_punching_load_for_walls,
        property_node_distance_to_perimeter_used_for_integration_for_columns, property_node_distance_to_perimeter_used_for_integration_for_walls);
};

/**
 * Sets Additional Parameters
 * @param {Number} property_node_minimum_spacing_of_reinforcement_perometers    Minimum spacing of reinforcement perimeters, can be undefined (is not set, 0.1 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Punching_AdditionalParameters = function (property_node_minimum_spacing_of_reinforcement_perometers) {
    SetConcreteDesignPunchingAdditionalParameters(this.addon.settings_node_csaa233, property_node_minimum_spacing_of_reinforcement_perometers);
};

/**
 * Sets Factors
 * @param {Number} property_node_strength_reduction_factor_concrete       Strength reduction factors acc. to 8.4 - Concrete factor, can be undefined (is not set, 0.65 as default)
 * @param {Number} property_node_strength_reduction_factor_reinforcing    Strength reduction factors acc. to 8.4 - Shear and torsion, can be undefined (is not set, 0.85 as default)
 */
ConcreteDesignUltimateConfigurationCSA.prototype.Punching_Factors = function (property_node_strength_reduction_factor_concrete,
    property_node_strength_reduction_factor_reinforcing) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_strength_reduction_factor_concrete !== "undefined") {
        this.addon.settings_node_csaa233.property_node_strength_reduction_factor_concrete = property_node_strength_reduction_factor_concrete;
    }
    if (typeof property_node_strength_reduction_factor_reinforcing !== "undefined") {
        this.addon.settings_node_csaa233.property_node_strength_reduction_factor_reinforcing = property_node_strength_reduction_factor_reinforcing;
    }
};

function SetConcreteDesignSurfaceDeterminationType(addon,
    determination_type) {
	const determination_types = [
        "GENERAL_METHOD",
        "SPECIAL_SURFACES"
    ];
	if (determination_type !== undefined) {
	  if (determination_types.indexOf(determination_type) === -1)
      {
        console.log("Wrong determination method. Value was: " + determination_type);
		console.log("Correct values are: " + determination_types);
		return;
      }
	}
	else {
        determination_type = "GENERAL_METHOD";
	}
    switch (determination_type) {
        case "GENERAL_METHOD":
            addon.settings_surface_csaa233.property_surface_beta_and_theta_general_method = true;
            break;
        case "SPECIAL_SURFACES":
            addon.settings_surface_csaa233.property_surface_beta_and_theta_values_for_special_surface_types = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignSurfaceDeterminationType - unknown determination type");
    }
}

function SetConcreteDesignMemberDeterminationType(addon,
    determination_type) {
	const determination_types = [
        "GENERAL_METHOD",
        "SPECIAL_MEMBERS"
    ];
	if (determination_type !== undefined) {
	  if (determination_types.indexOf(determination_type) === -1)
      {
        console.log("Wrong determination type. Value was: " + determination_type);
		console.log("Correct values are: " + determination_types);
		return;
      }
	}
	else {
        determination_type = "GENERAL_METHOD";
	}
    switch (determination_type) {
        case "GENERAL_METHOD":
            addon.settings_member_csaa233.property_member_beta_and_theta_general_method = true;
            break;
        case "SPECIAL_MEMBERS":
            addon.settings_member_csaa233.property_member_beta_and_theta_values_for_special_member_types = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignMemberDeterminationType - unknown determination type");
    }
}