/**
 * Creates Concrete design ultimate configuration (SP standard)
 * @class
 * @constructor
 * @param {Number} no           Ultimate configuration number, can be undefined
 * @param {Array} surfaces_no   Assigned surfaces numbers, can be undefined
 * @param {Array} members_no    Assigned members numbers, can be undefined
 * @param {Array} nodes_no      Assigned nodes numbers, can be undefined
 * @param {String} comment      Comment, can be undefined
 * @param {Object} params       Additional parameters, can be undefined
 */
function ConcreteDesignUltimateConfigurationSP (no,
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
ConcreteDesignUltimateConfigurationSP.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
ConcreteDesignUltimateConfigurationSP.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Ultimate configuration name, can be undefined
 */
ConcreteDesignUltimateConfigurationSP.prototype.SetName = function (name) {
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
ConcreteDesignUltimateConfigurationSP.prototype.Members_ConsiderInternalForces = function (property_member_axial_forces,
    property_member_bending_moments_my,
    property_member_bending_moments_mz,
    property_member_torsional_moments,
    property_member_shear_forces_vy,
    property_member_shear_forces_vz) {
    SetConcreteDesignMembersConsiderInternalForces(this.addon.settings_member_sp63, property_member_axial_forces, property_member_bending_moments_my, property_member_bending_moments_mz, property_member_torsional_moments,
        property_member_shear_forces_vy, property_member_shear_forces_vz);
};

/**
 * Sets Factors of Concrete Service Conditions Acc. to 6.1.12
 * @param {Boolean} property_member_effect_of_loading_duration                              a) effect of loading duration | γb1, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_placing_concrete_in_vertical_position                   c) placing concrete in vertical position (depth of layer 1.5m) | γb3, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_cellular_concretes_in_dependence_on_moisture_content    d) cellular concretes in dependence on moisture content | γb4, can be undefined (is not set, false as default)
 * @param {Boolean} property_member_alternate_of_freezing_and_thawing                       e) alternate of freezing and thawing | γb5, can be undefined (is not set, false as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_FactorsOfConcreteServiceConditions = function (property_member_effect_of_loading_duration,
    property_member_placing_concrete_in_vertical_position,
    property_member_cellular_concretes_in_dependence_on_moisture_content,
    property_member_alternate_of_freezing_and_thawing) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_effect_of_loading_duration !== "undefined") {
        this.addon.settings_member_sp63.property_member_effect_of_loading_duration = property_member_effect_of_loading_duration;
    }
    if (typeof property_member_placing_concrete_in_vertical_position !== "undefined") {
        this.addon.settings_member_sp63.property_member_placing_concrete_in_vertical_position = property_member_placing_concrete_in_vertical_position;
    }
    if (typeof property_member_cellular_concretes_in_dependence_on_moisture_content !== "undefined") {
        this.addon.settings_member_sp63.property_member_cellular_concretes_in_dependence_on_moisture_content = property_member_cellular_concretes_in_dependence_on_moisture_content;
    }
    if (typeof property_member_alternate_of_freezing_and_thawing !== "undefined") {
        this.addon.settings_member_sp63.property_member_alternate_of_freezing_and_thawing = property_member_alternate_of_freezing_and_thawing;
    }
};

/**
 * Sets Reductions of Internal Forces in z-Direction
 * @param {Boolean} property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance      Reduction of the shear forces in the support face and distance ccrit, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_consideration_of_minimum_eccentricity                               Consideration of minimum eccentricity acc. to 7.1.7, can be undefined (is not set, false as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_InternalForceReductionZ = function (property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance,
    property_member_consideration_of_minimum_eccentricity) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance !== "undefined") {
        this.addon.settings_member_sp63.property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance = property_member_reduction_of_the_shear_forces_in_the_support_face_and_distance;
    }
    if (typeof property_member_consideration_of_minimum_eccentricity !== "undefined") {
        this.addon.settings_member_sp63.property_member_consideration_of_minimum_eccentricity = property_member_consideration_of_minimum_eccentricity;
    }
};

/**
 * Sets Required longitudinal reinforcement
 * @param {String} property_member_reinforcement_layout                                                         Reinforcement layout (TOP_BOTTOM_OPTIMIZED_DISTRIBUTION, TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT, OPTIMIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, OPTIMIZED_PROVIDED_REINFORCEMENT as default)
 * @param {String/Number} property_member_reinforcement_diameter_for_preliminary_design                         Reinforcement diameter for preliminary design (MAX_OF_ALL or user-defined value), can be undefined (is not set as default, otherwise MAX_OF_ALL as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_RequiredLongitudinalReinforcement = function (property_member_reinforcement_layout,
    property_member_reinforcement_diameter_for_preliminary_design) {
    SetConcreteDesignMembersRequiredLongitudinalReinforcement(this.addon.settings_member_sp63, property_member_reinforcement_layout, property_member_reinforcement_diameter_for_preliminary_design);
};

/**
 * Sets Types of Design Sections for Shear and Torsion Design Checks
 * @param {String} section_type     Type of Design Sections for Shear and Torsion Design Checks, can be undefined (is not set, INCLINED_SECTION as default)
 *                                  - Inclined section acc. to Eq. 8.56 / Spatial section acc. to Eq. 8.67 (INCLINED_SECTION)
 *                                  - Normal section acc. to Eq. 8.60 / Simplified criterium acc. to Eq. 8.75 (NORMAL_SECTION)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_DesignSectionsTypesForShearAndTorsionDesignChecks = function (section_type) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    SetConcreteDesignMembersDesignSectionsType(this.addon.settings_member_sp63, section_type);
};

/**
 * Sets Required Reinforcement - Moment in Inclined Section Acc. to 8.1.35
 * @param {String} property_member_designed_type_of_reinforcement               Designed type of reinforcement (LONGITUDINAL, TRANSVERSE), can be undefined (is not set, LONGITUDINAL as default)
 * @param {String} property_member_used_reinforcement_for_moment_resistance     Used reinforcement for moment resistance (REQUIRED, PROVIDED), can be undefined (is not set, REQUIRED as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_RequiredReinforcementMomentInInclinedSection = function (property_member_designed_type_of_reinforcement,
    property_member_used_reinforcement_for_moment_resistance) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    this.addon.settings_member_sp63.property_member_designed_type_of_reinforcement = GetConcreteDesignMemberReinforcementDesignType(property_member_designed_type_of_reinforcement);
    this.addon.settings_member_sp63.property_member_used_reinforcement_for_moment_resistance = GetConcreteDesignMemberReinforcementForMomentResistanceType(property_member_used_reinforcement_for_moment_resistance);
};

/**
 * Sets Minimum Reinforcement Acc. to Standard
 * @param {Boolean} property_member_minimum_longitudinal_reinforcement  Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {Boolean} property_member_minimum_shear_reinforcement         Minimum shear reinforcement acc. to standard, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_MinimumReinforcement = function (property_member_minimum_longitudinal_reinforcement,
    property_member_minimum_shear_reinforcement) {
    SetConcreteDesignMembersMinimumReinforcement(this.addon.settings_member_sp63, property_member_minimum_longitudinal_reinforcement, property_member_minimum_shear_reinforcement);
};

/**
 * Sets Sets Depth Limitation of Neutral Axis
 * @param {Boolean} property_member_consider_neutral_axis_depth_limitation                      Consider depth limitation of neutral axis acc. to 8.1.5, 8.1.6, can be undefined (is not set, false as default)
 * @param {String/Number} property_member_value_of_neutral_axis_depth_limitation_user_value     Value of neutral axis depth limitation (AUTOMATICALLY or user number value), can be undefined (is not set, AUTOMATICALLY / 0.800 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_NeutralAxisDepthLimitation = function(property_member_consider_neutral_axis_depth_limitation,
    property_member_value_of_neutral_axis_depth_limitation_user_value) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_member_sp63, "member", property_member_consider_neutral_axis_depth_limitation, property_member_value_of_neutral_axis_depth_limitation_user_value);
};

/**
 * Sets Calculation setting
 * @param {Boolean} property_member_nett_concrete_area  Net concrete area, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Members_CalculationSetting = function (property_member_nett_concrete_area) {
    SetConcreteDesignMembersCalculationSetting(this.addon.settings_member_sp63, property_member_nett_concrete_area);
};

/**
 * Sets Slenderness
 * @param {String/Number} property_stability_limiting_slenderness_y     Limiting slenderness about y-axis (DEFINED_AS_STANDARD or user-defined value), can be undefined (is not set, DEFINED_AS_STANDARD as default)
 * @param {String/Number} property_stability_limiting_slenderness_z     Limiting slenderness about z-axis (DEFINED_AS_STANDARD or user-defined value), can be undefined (is not set, DEFINED_AS_STANDARD as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Stability_Slenderness = function (property_stability_limiting_slenderness_y,
    property_stability_limiting_slenderness_z) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    function setSlendernessValue (slenderness_value_name, slenderness_value) {
        if (typeof slenderness_value === "string") {
            ASSERT(slenderness_value === "DEFINED_AS_STANDARD", "Slenderness must be specified as DEFINED_AS_STANDARD string");
            switch (slenderness_value_name) {
                case "property_stability_limiting_slenderness_y":
                    this.addon.settings_member_sp63.property_stability_limiting_slenderness_y = ulsconfig_member_sp63.E_LIMITING_SLENDERNESS_DEFINED_BY_STANDARD;
                    break;
                case "property_stability_limiting_slenderness_z":
                    this.addon.settings_member_sp63.property_stability_limiting_slenderness_z = ulsconfig_member_sp63.E_LIMITING_SLENDERNESS_DEFINED_BY_STANDARD;
                    break;
                default:
                    ASSERT(false, "Stability_Slenderness function");
            }
        }
        else {
            ASSERT(typeof slenderness_value === "number", "Slenderness must be specified as number");
            switch (slenderness_value_name) {
                case "property_stability_limiting_slenderness_y":
                    this.addon.settings_member_sp63.property_stability_limiting_slenderness_y = ulsconfig_member_sp63.E_LIMITING_SLENDERNESS_USER_DEFINED;
                    this.addon.settings_member_sp63.property_stability_limiting_slenderness_y_user_value = slenderness_value;
                    break;
                case "property_stability_limiting_slenderness_z":
                    this.addon.settings_member_sp63.property_stability_limiting_slenderness_z = ulsconfig_member_sp63.E_LIMITING_SLENDERNESS_USER_DEFINED;
                    this.addon.settings_member_sp63.property_stability_limiting_slenderness_z_user_value = slenderness_value;
                    break;
                default:
                    ASSERT(false, "Stability_Slenderness function");
            }
        }
    };
    if (typeof property_stability_limiting_slenderness_y !== "undefined") {
        setSlendernessValue("property_stability_limiting_slenderness_y", property_stability_limiting_slenderness_y);
    }
    if (typeof property_stability_limiting_slenderness_z !== "undefined") {
        setSlendernessValue("property_stability_limiting_slenderness_z", property_stability_limiting_slenderness_z);
    }
};

/**
 * Sets Members with Rectangular Section and Low Slenderness
 * @param {Boolean} property_stability_limit_value_of_inner_normal_force    Limit value of inner normal force acc. to 8.1.16, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Stability_MembersWithRectangularSectionAndLowSlenderness = function (property_stability_limit_value_of_inner_normal_force) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_limit_value_of_inner_normal_force === "undefined") {
        property_stability_limit_value_of_inner_normal_force = true;
    }
    this.addon.settings_member_sp63.property_stability_limit_value_of_inner_normal_force = property_stability_limit_value_of_inner_normal_force;
};

/**
 * Sets Biaxial Bending
 * @param {Boolean} property_stability_separate_design_in_each_principal_direction      Separate design in each principal direction, can be undefined (is not set, false as default)
 * @param {Boolean} property_stability_use_simplified_criterion_for_biaxial_bending     Use simplified criterion for biaxial bending, can be undefined (is not set, false as default)
 * @param {Boolean} property_stability_use_interaction_curves_method                    Use interaction curve method, can be undefined (is not set, false as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Stability_BiaxialBending = function (property_stability_separate_design_in_each_principal_direction,
    property_stability_use_simplified_criterion_for_biaxial_bending,
    property_stability_use_interaction_curves_method) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_separate_design_in_each_principal_direction !== "undefined") {
        this.addon.settings_member_sp63.property_stability_separate_design_in_each_principal_direction = property_stability_separate_design_in_each_principal_direction;
    }
    if (typeof property_stability_use_simplified_criterion_for_biaxial_bending !== "undefined") {
        this.addon.settings_member_sp63.property_stability_use_simplified_criterion_for_biaxial_bending = property_stability_use_simplified_criterion_for_biaxial_bending;
    }
    if (typeof property_stability_use_interaction_curves_method !== "undefined") {
        this.addon.settings_member_sp63.property_stability_use_interaction_curves_method = property_stability_use_interaction_curves_method;
    }
};

/**
 * Sets Load directions
 * @param {Number} property_stability_vertical_load_horizontal_load_ratio_in_y_direction    Vertical load / horizontal load ratio in y-direction, can be undefined (is not set, 0.50 as default)
 * @param {Number} property_stability_vertical_load_horizontal_load_ratio_in_z_direction    Vertical load / horizontal load ratio in z-direction, can be undefined (is not set, 0.50 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Stability_LoadDirections = function (property_stability_vertical_load_horizontal_load_ratio_in_y_direction,
    property_stability_vertical_load_horizontal_load_ratio_in_z_direction) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_vertical_load_horizontal_load_ratio_in_y_direction !== "undefined") {
        this.addon.settings_member_sp63.property_stability_vertical_load_horizontal_load_ratio_in_y_direction = property_stability_vertical_load_horizontal_load_ratio_in_y_direction;
    }
    if (typeof property_stability_vertical_load_horizontal_load_ratio_in_z_direction !== "undefined") {
        this.addon.settings_member_sp63.property_stability_vertical_load_horizontal_load_ratio_in_z_direction = property_stability_vertical_load_horizontal_load_ratio_in_z_direction;
    }
};

/**
 * Sets Long-term load component
 * @param {Number} property_stability_ratio_long_term_total_load_in_y_direction     Ratio long-term / total load in y-direction, can be undefined (is not set, 0.50 as default)
 * @param {Number} property_stability_ratio_long_term_total_load_in_z_direction     Ratio long-term / total load in z-direction, can be undefined (is not set, 0.50 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Stability_LongTermLoadComponent = function (property_stability_ratio_long_term_total_load_in_y_direction,
    property_stability_ratio_long_term_total_load_in_z_direction) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_ratio_long_term_total_load_in_y_direction !== "undefined") {
        this.addon.settings_member_sp63.property_stability_ratio_long_term_total_load_in_y_direction = property_stability_ratio_long_term_total_load_in_y_direction;
    }
    if (typeof property_stability_ratio_long_term_total_load_in_z_direction !== "undefined") {
        this.addon.settings_member_sp63.property_stability_ratio_long_term_total_load_in_z_direction = property_stability_ratio_long_term_total_load_in_z_direction;
    }
};

/**
 * Sets Required Reinforcement
 * @param {String} property_stability_reinforcement_layout                              Reinforcement layout (TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION, IN_CORNERS_SYMMETRICAL_DISTRIBUTION, UNIFORMLY_SURROUNDING, FACTORIZED_PROVIDED_REINFORCEMENT), can be undefined (is not set, UNIFORMLY_SURROUNDING as default)
 * @param {String/Number} reinforcement_diameter_for_preliminary_design_user_value      Reinforcement diameter for preliminary design (MAX_OF_ALL or user number value), can be undefined (is not set, MAX_OF_ALL as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Stability_RequiredReinforcement = function (property_stability_reinforcement_layout,
    reinforcement_diameter_for_preliminary_design_user_value) {
    SetConcreteDesignStabilityRequiredReinforcement(this.addon.settings_member_sp63, property_stability_reinforcement_layout, reinforcement_diameter_for_preliminary_design_user_value);
};

/**
 * Sets Design method
 * @param {String} optimization_type    Design method optimization type, can be undefined (is not set, YES as default)
 *                                      - No optimization of design internal forces (NO)
 *                                      - Optimization of design internal forces (YES)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_DesignMethod = function (optimization_type) {
    SetConcreteDesignSurfacesDesignMethod(this.addon.settings_surface_sp63, optimization_type);
};

/**
 * Sets Internal Forces Diagram Used for Design
 * @param {Boolean} property_subtraction_of_rib_components  Subtraction of rib components for the ULS calculation and for the analytic method of SLS calculation, can be undefined (true as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_InternalForcesDiagramUsedForDesign = function (property_subtraction_of_rib_components) {
    SetConcreteDesignSurfacesInternalForcesDiagramUsedForDesign(this.addon.settings_surface_sp63, property_subtraction_of_rib_components);
};

/**
 * Sets Minimum longitudinal reinforcement acc. to standard
 * @param {Boolean} property_minimum_longitudinal_reinforcement_acc_to_standard     Minimum longitudinal reinforcement acc. to standard, can be undefined (is not set, true as default)
 * @param {String} reinforcement_type                                               Minimum longitudinal reinforcement acc. to standard type, can be undefined (is not set, PLATES as default)
 *                                                                                  - Minimum longitudinal reinforcement for plates acc. to 10.3.5, 10.3.6 (PLATES)
                                                                                    - Minimum longitudinal reinforcement for walls acc. to 10.3.5, 10.3.6 (WALLS)
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
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_MinimumLongitudinalReinforcement = function (property_minimum_longitudinal_reinforcement_acc_to_standard,
    reinforcement_type,
    min_reinforcement_direction,
    min_reinforcement_direction_user_values,
    main_compression_reinforcement_direction,
    property_surface_reinforcement_defined_direction_phi) {
    SetConcreteDesignSurfacesMinimumLongitudinalReinforcement(this.addon.settings_surface_sp63, property_minimum_longitudinal_reinforcement_acc_to_standard, reinforcement_type, min_reinforcement_direction,
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
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage = function (property_user_defined_minimum_longitudinal_reinforcement_percentage,
    property_minimum_reinforcement,
    property_minimum_secondary_reinforcement,
    property_minimum_tension_reinforcement,
    property_minimum_compression_reinforcement) {
    SetConcreteDesignSurfacesUserDefinedMinimumLongitudinalReinforcementPercentage(this.addon.settings_surface_sp63, property_user_defined_minimum_longitudinal_reinforcement_percentage, property_minimum_reinforcement,
        property_minimum_secondary_reinforcement, property_minimum_tension_reinforcement, property_minimum_compression_reinforcement);
};

/**
 * Sets User-defined maximum longitudinal reinforcement percentage
 * @param {Boolean} property_user_defined_maximum_longitudinal_reinforcement_percentage         User-defined maximum longitudinal reinforcement percentage, can be undefined (is not set, true as default)
 * @param {Number} property_user_defined_maximum_longitudinal_reinforcement_percentage_value    Maximum reinforcement, can be undefined (is not set, 4% as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage = function (property_user_defined_maximum_longitudinal_reinforcement_percentage,
    property_user_defined_maximum_longitudinal_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMaximumLongitudinalReinforcementPercentage(this.addon.settings_surface_sp63, property_user_defined_maximum_longitudinal_reinforcement_percentage, property_user_defined_maximum_longitudinal_reinforcement_percentage_value);
};

/**
 * Sets Minimum shear reinforcement acc. to 10.3.13
 * @param {Boolean} property_minimum_shear_reinforcement    Minimum shear reinforcement, can be undefined (is not set, true as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_MinimumShearReinforcement = function (property_minimum_shear_reinforcement) {
    SetConcreteDesignSurfacesMinimumShearReinforcement(this.addon.settings_surface_sp63, property_minimum_shear_reinforcement);
};

/**
 * Sets User-defined minimum shear reinforcement percentage
 * @param {Boolean} property_user_defined_minimum_shear_reinforcement_percentage        Minimum shear reinforcement percentage, can be undefined (is not set, false as default)
 * @param {Number} property_user_defined_minimum_shear_reinforcement_percentage_value   Minimum reinforcement, can be undefined, (is not set, 0% as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_UserDefinedMinimumShearReinforcementPercentage = function (property_user_defined_minimum_shear_reinforcement_percentage,
    property_user_defined_minimum_shear_reinforcement_percentage_value) {
    SetConcreteDesignSurfacesUserDefinedMinimumShearReinforcementPercentage(this.addon.settings_surface_sp63, property_user_defined_minimum_shear_reinforcement_percentage, property_user_defined_minimum_shear_reinforcement_percentage_value);
};

/**
 * Sets Neutral Axis Depth Limitation
 * @param {Boolean} property_member_consider_neutral_axis_depth_limitation                      Consider depth limitation of neutral axis acc. to 8.1.5, 8.1.6, can be undefined (is not set, false as default)
 * @param {String/Number} property_member_value_of_neutral_axis_depth_limitation_user_value     Value of neutral axis depth limitation (AUTOMATICALLY or user number value), can be undefined (is not set, AUTOMATICALLY as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Surfaces_NeutralAxisDepthLimitation = function(property_member_consider_neutral_axis_depth_limitation,
    property_member_value_of_neutral_axis_depth_limitation_user_value) {
    SetConcreteDesignNeutralAxisDepthLimitation(this.addon.settings_surface_sp63, "surface", property_member_consider_neutral_axis_depth_limitation, property_member_value_of_neutral_axis_depth_limitation_user_value);
};

/**
 * Sets Punching Load
 * @param {String/Number} property_node_used_punching_load_for_columns                      Used punching load for columns (SINGLE_FORCE, SMOOTHED_SHEAR_FORCE or user-defined value), can be undefined (is not set, SINGLE_FORCE as default)
 * @param {String} property_node_direction_of_punching_force_for_columns                    Direction of punching force (DETERMINE, PLUS_Z, MINUS_Z), can be undefined (is not set, DETERMINE as default)
 * @param {String/Number} property_node_used_punching_load_for_walls                        Used punching load for walls (SMOOTHED_SHEAR_FORCE or user defined value), can be undefined (is not set, SMOOTHED_SHEAR_FORCE as default)
 * @param {String} property_node_direction_of_punching_force_for_walls                      Direction of punching force (DETERMINE, PLUS_Z, MINUS_Z), can be undefined (is not set, DETERMINE as default)
 * @param {Number} property_node_distance_to_perimeter_used_for_integration_for_columns     Distance to perimeter used for integration (k * d), can be undefined (is not set, 2.0 as default)
 * @param {Number} property_node_distance_to_perimeter_used_for_integration_for_walls       Distance to perimeter used for integration (k * d), can be undefined (is not set, 2.0 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Punching_PunchingLoad = function (property_node_used_punching_load_for_columns,
    property_node_direction_of_punching_force_for_columns,
    property_node_used_punching_load_for_walls,
    property_node_direction_of_punching_force_for_walls,
    property_node_distance_to_perimeter_used_for_integration_for_columns,
    property_node_distance_to_perimeter_used_for_integration_for_walls) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_used_punching_load_for_columns !== "undefined") {
        if (typeof property_node_used_punching_load_for_columns === "string") {
            this.addon.settings_node_sp63.property_node_used_punching_load_for_columns = GetConcreteDesignPunchingLoadType(property_node_used_punching_load_for_columns, "columns");
        }
        else {
            ASSERT(typeof property_node_used_punching_load_for_columns === "number", "User-defined value is required");
            this.addon.settings_node_sp63.property_node_used_punching_load_for_columns = concrete_design_node_concrete_ulsconfig_sp63.E_USED_PUNCHING_LOAD_TYPE_USER_DEFINED;
            this.addon.settings_node_sp63.property_node_used_defined_value_of_punching_force_for_columns = property_node_used_punching_load_for_columns;
        }
    }
    if (typeof property_node_direction_of_punching_force_for_columns !== "undefined") {
        this.addon.settings_node_sp63.property_node_direction_of_punching_force_for_columns = GetConcreteDesignPunchingDirectionForceType(property_node_direction_of_punching_force_for_columns);
    }
    if (typeof property_node_distance_to_perimeter_used_for_integration_for_columns !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_used_punching_load_for_columns === GetConcreteDesignPunchingLoadType("SMOOTHED_SHEAR_FORCE"), "SMOOTHED_SHEAR_FORCE is required");
        this.addon.settings_node_sp63.property_node_used_punching_load_for_columns = property_node_used_punching_load_for_columns;
    }
    if (typeof property_node_used_punching_load_for_walls !== "undefined") {
        if (typeof property_node_used_punching_load_for_walls === "string") {
            this.addon.settings_node_sp63.property_node_used_punching_load_for_walls = GetConcreteDesignPunchingLoadType(property_node_used_punching_load_for_walls, "walls");
        }
        else {
            ASSERT(typeof property_node_used_punching_load_for_walls === "number", "User-defined value is required");
            this.addon.settings_node_sp63.property_node_used_punching_load_for_walls = concrete_design_node_concrete_ulsconfig_sp63.E_USED_PUNCHING_LOAD_TYPE_USER_DEFINED;
            this.addon.settings_node_sp63.property_node_used_defined_value_of_punching_force_for_walls = property_node_used_punching_load_for_walls;
        }
    }
    if (typeof property_node_direction_of_punching_force_for_walls !== "undefined") {
        this.addon.settings_node_sp63.property_node_direction_of_punching_force_for_walls = GetConcreteDesignPunchingDirectionForceType(property_node_direction_of_punching_force_for_walls);
    }
    if (typeof property_node_distance_to_perimeter_used_for_integration_for_walls !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_used_punching_load_for_walls === GetConcreteDesignPunchingLoadType("SMOOTHED_SHEAR_FORCE", "walls"), "SMOOTHED_SHEAR_FORCE is required");
        this.addon.settings_node_sp63.property_node_distance_to_perimeter_used_for_integration_for_walls = property_node_distance_to_perimeter_used_for_integration_for_walls;
    }
};

/**
 * Sets Additional Parameters - Perimeter
 * @param {Boolean} property_node_define_perimeter                                                      Perimeter defined, can be undefined (is not set, false as default)
 * @param {Number} property_node_distance                                                               Distance, can be undefined (is not set, 0.29 as default)
 * @param {Boolean} property_node_define_iterative_critical_section_for_foundation                      Define iterative critical section for foundation, can be undefined (is not set, false as default)
 * @param {Number} property_node_distance_of_iterative_critical_section_for_foundation_to_loaded_area   Distance to load area, can be undefined (is not set, 0.29 as default)
 * @param {Boolean} property_node_define_sections_for_analysis_of_punching_shear_reinforcement          Define sections for analysis of punching shear reinforcement, can be undefined (is not set, false as default)
 * @param {Number} property_node_number_of_inner_control_perimeters                                     Number, can be undefined (is not set, 2 as default)
 * @param {Boolean} property_node_define_distance_to_loaded_area                                        Distance to load area, can be undefined (is not set, false as default)
 * @param {Number} property_node_first_distance                                                         1st distance, can be undefined (is not set, 0.3 as default)
 * @param {Number} property_node_radial_spacing                                                         Radial spacing, can be undefined (is not set, 0.2 as default)
 * @param {Boolean} property_node_define_outer_control_perimeter                                        Define outer control perimeter, can be undefined (is not set, false as default)
 * @param {Number} property_node_distance_of_outer_control_perimeter_to_loaded_area                     Distance to load area, can be undefined (2 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Punching_AdditionalParameters_Perimeter = function (property_node_define_perimeter,
    property_node_distance,
    property_node_define_iterative_critical_section_for_foundation,
    property_node_distance_of_iterative_critical_section_for_foundation_to_loaded_area,
    property_node_define_sections_for_analysis_of_punching_shear_reinforcement,
    property_node_number_of_inner_control_perimeters,
    property_node_define_distance_to_loaded_area,
    property_node_first_distance,
    property_node_radial_spacing,
    property_node_define_outer_control_perimeter,
    property_node_distance_of_outer_control_perimeter_to_loaded_area) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_define_perimeter !== "undefined") {
        this.addon.settings_node_sp63.property_node_define_perimeter = property_node_define_perimeter;
    }
    if (typeof property_node_distance !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_perimeter, "Define perimeter must be on");
        this.addon.settings_node_sp63.property_node_distance = property_node_distance;
    }
    if (typeof property_node_define_iterative_critical_section_for_foundation !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_perimeter, "Define perimeter must be on");
        this.addon.settings_node_sp63.property_node_define_iterative_critical_section_for_foundation = property_node_define_iterative_critical_section_for_foundation;
    }
    if (typeof property_node_distance_of_iterative_critical_section_for_foundation_to_loaded_area !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_distance_of_iterative_critical_section_for_foundation_to_loaded_area, "Define iterative critical section for foundation must be on");
        this.addon.settings_node_sp63.property_node_distance_of_iterative_critical_section_for_foundation_to_loaded_area = property_node_distance_of_iterative_critical_section_for_foundation_to_loaded_area;
    }
    if (typeof property_node_define_sections_for_analysis_of_punching_shear_reinforcement !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_perimeter, "Define perimeter must be on");
        this.addon.settings_node_sp63.property_node_define_sections_for_analysis_of_punching_shear_reinforcement = property_node_define_sections_for_analysis_of_punching_shear_reinforcement;
    }
    if (typeof property_node_number_of_inner_control_perimeters !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_sections_for_analysis_of_punching_shear_reinforcement, "Define sections for analysis of punching shear reinforcement must be on");
        this.addon.settings_node_sp63.property_node_number_of_inner_control_perimeters = property_node_number_of_inner_control_perimeters;
    }
    if (typeof property_node_define_distance_to_loaded_area !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_sections_for_analysis_of_punching_shear_reinforcement, "Define sections for analysis of punching shear reinforcement must be on");
        this.addon.settings_node_sp63.property_node_define_distance_to_loaded_area = property_node_define_distance_to_loaded_area;
    }
    if (typeof property_node_first_distance !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_distance_to_loaded_area, "Distance to load area must be on");
        this.addon.settings_node_sp63.property_node_first_distance = property_node_first_distance;
    }
    if (typeof property_node_radial_spacing !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_distance_to_loaded_area, "Distance to load area must be on");
        this.addon.settings_node_sp63.property_node_radial_spacing = property_node_radial_spacing;
    }
    if (typeof property_node_define_outer_control_perimeter !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_define_perimeter, "Define perimeter must be on");
        this.addon.settings_node_sp63.property_node_define_outer_control_perimeter = property_node_define_outer_control_perimeter;
    }
    if (typeof property_node_distance_of_outer_control_perimeter_to_loaded_area !== "undefined") {
        ASSERT( this.addon.settings_node_sp63.property_node_define_outer_control_perimeter, "Define outer control perimeter must be on");
        this.addon.settings_node_sp63.property_node_distance_of_outer_control_perimeter_to_loaded_area = property_node_distance_of_outer_control_perimeter_to_loaded_area;
    }
};

/**
 * Sets Additional Parameters - Thickness
 * @param {String/Number} property_node_variable_thickness_definition   Definition of variable thickness (AUTO or user-defined value), can be undefined (is not set, AUTO as default)
 * @param {String/Number} property_node_reference_surfaces_thickness    Thickness of reference surfaces (MINIMUM_THICKNESS, MAXIMUM_THICKNESS, SELECTED or user-defined value), can be undefined (is not set, MINIMUM_THICKNESS as default)
 * @param {Number} property_node_reference_surface_no                        Reference surface No., can be undefined (is not set, 1 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Punching_AdditionalParameters_Thickness = function (property_node_variable_thickness_definition,
    property_node_reference_surfaces_thickness,
    property_node_reference_surface_no) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_variable_thickness_definition !== "undefined") {
        if (typeof property_node_variable_thickness_definition === "string") {
            ASSERT(property_node_variable_thickness_definition === "AUTO", "AUTO string type must be defined");
            this.addon.settings_node_sp63.property_node_variable_thickness_definition = concrete_design_node_concrete_ulsconfig_sp63.E_VARIABLE_THICKNESS_DEFINITION_TYPE_AUTO;
        }
        else {
            ASSERT(typeof property_node_variable_thickness_definition === "number", "User-defined value must be defined");
            this.addon.settings_node_sp63.property_node_variable_thickness_definition = concrete_design_node_concrete_ulsconfig_sp63.E_VARIABLE_THICKNESS_DEFINITION_TYPE_USER_DEFINED;
            this.addon.settings_node_sp63.property_node_variable_thickness_definition_user_value = property_node_variable_thickness_definition;
        }
    }
    if (typeof property_node_reference_surfaces_thickness !== "undefined") {
        if (typeof property_node_reference_surfaces_thickness === "string") {
            this.addon.settings_node_sp63.property_node_reference_surfaces_thickness = GetConcreteDesignSPPunchingThicknessType(property_node_reference_surfaces_thickness);
        }
        else {
            ASSERT(typeof property_node_reference_surfaces_thickness === "number", "User-defined thickness must be specified");
            this.addon.settings_node_sp63.property_node_reference_surfaces_thickness = concrete_design_node_concrete_ulsconfig_sp63.E_REFERENCE_SURFACES_THICKNESS_TYPE_USER_DEFINED;
            this.addon.settings_node_sp63.property_node_reference_surfaces_thickness_user_value = property_node_reference_surfaces_thickness;
        }
    }
    if (typeof property_node_reference_surface_no !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_reference_surfaces_thickness === GetConcreteDesignSPPunchingThicknessType("SELECTED"), "SELECTED type must be specified");
        this.addon.settings_node_sp63.property_node_reference_surface_no = property_node_reference_surface_no;
    }
};

/**
 * Sets Neutral Axis Depth Limitation
 * @param {Boolean} property_node_consider_neutral_axis_depth_limitation            Consider depth limitation of neutral axis acc. to 8.1.5, 8.1.6, can be undefined (is not set, false as default)
 * @param {String/Number} property_node_value_of_neutral_axis_depth_limitation      Value of neutral axis depth limitation (AUTOMATICALLY or user-defined value), can be undefined (is not set, AUTOMATICALLY/0.8 as default)
 */
ConcreteDesignUltimateConfigurationSP.prototype.Punching_NeutralAxisDepthLimitation = function (property_node_consider_neutral_axis_depth_limitation,
    property_node_value_of_neutral_axis_depth_limitation) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_node_consider_neutral_axis_depth_limitation !== "undefined") {
        this.addon.settings_node_sp63.property_node_consider_neutral_axis_depth_limitation = property_node_consider_neutral_axis_depth_limitation;
    }
    if (typeof property_node_value_of_neutral_axis_depth_limitation !== "undefined") {
        ASSERT(this.addon.settings_node_sp63.property_node_consider_neutral_axis_depth_limitation, "Consider depth limitation of neutral axis must be on");
        if (typeof property_node_value_of_neutral_axis_depth_limitation === "string") {
            ASSERT(property_node_value_of_neutral_axis_depth_limitation === "AUTOMATICALLY", "AUTOMATICALLY type must be specified");
            this.addon.settings_node_sp63.property_node_value_of_neutral_axis_depth_limitation = concrete_design_node_concrete_ulsconfig_sp63.E_NEUTRAL_AXIS_DEPTH_LIMITATION_AUTOMATICALLY;
        }
        else {
            ASSERT(typeof property_node_value_of_neutral_axis_depth_limitation === "number", "User-defined value must be specified");
            this.addon.settings_node_sp63.property_node_value_of_neutral_axis_depth_limitation = concrete_design_node_concrete_ulsconfig_sp63.E_NEUTRAL_AXIS_DEPTH_LIMITATION_USER_DEFINED;
            this.addon.settings_node_sp63.property_node_value_of_neutral_axis_depth_limitation_user_value = property_node_value_of_neutral_axis_depth_limitation;
        }
    }
};

function GetConcreteDesignSPPunchingThicknessType(thickness_type) {
    const thickness_types_dict = {
        "MINIMUM_THICKNESS": concrete_design_node_concrete_ulsconfig_sp63.E_REFERENCE_SURFACES_THICKNESS_TYPE_MINIMUM_THICKNESS,
        "MAXIMUM_THICKNESS": concrete_design_node_concrete_ulsconfig_sp63.E_REFERENCE_SURFACES_THICKNESS_TYPE_MAXIMUM_THICKNESS,
        "SELECTED": concrete_design_node_concrete_ulsconfig_sp63.E_REFERENCE_SURFACES_THICKNESS_TYPE_SELECTED
    };
	if (thickness_type !== undefined) {
	  var type = thickness_types_dict[thickness_type];
	  if (type === undefined) {
		console.log("Wrong punching thickness type. Value was: " + thickness_type);
		console.log("Correct values are: ( " + Object.keys(thickness_types_dict) + ")");
		type = concrete_design_node_concrete_ulsconfig_sp63.E_REFERENCE_SURFACES_THICKNESS_TYPE_MINIMUM_THICKNESS;
	  }
	  return type;
	}
	else {
	  return concrete_design_node_concrete_ulsconfig_sp63.E_REFERENCE_SURFACES_THICKNESS_TYPE_MINIMUM_THICKNESS;
	}
}

function GetConcreteDesignMemberReinforcementForMomentResistanceType(moment_resistance_type) {
    const moment_resistance_types_dict = {
        "REQUIRED": ulsconfig_member_sp63.E_REINFORCEMENT_TYPE_REQUIRED,
        "PROVIDED": ulsconfig_member_sp63.E_REINFORCEMENT_TYPE_PROVIDED
    };
	if (moment_resistance_type !== undefined) {
	  var type = moment_resistance_types_dict[moment_resistance_type];
	  if (type === undefined) {
		console.log("Wrong moment resistance type. Value was: " + moment_resistance_type);
		console.log("Correct values are: ( " + Object.keys(moment_resistance_types_dict) + ")");
		type = ulsconfig_member_sp63.E_REINFORCEMENT_TYPE_REQUIRED;
	  }
	  return type;
	}
	else {
	  return ulsconfig_member_sp63.E_REINFORCEMENT_TYPE_REQUIRED;
	}
}

function GetConcreteDesignMemberReinforcementDesignType(design_type) {
    const design_types_dict = {
        "LONGITUDINAL": ulsconfig_member_sp63.E_REINFORCEMENT_DESIGNED_TYPE_LONGITUDINAL,
        "TRANSVERSE": ulsconfig_member_sp63.E_REINFORCEMENT_DESIGNED_TYPE_TRANSVERSE
    };
	if (design_type !== undefined) {
	  var type = design_types_dict[design_type];
	  if (type === undefined) {
		console.log("Wrong reinforcement design type. Value was: " + design_type);
		console.log("Correct values are: ( " + Object.keys(design_types_dict) + ")");
		type = ulsconfig_member_sp63.E_REINFORCEMENT_DESIGNED_TYPE_LONGITUDINAL;
	  }
	  return type;
	}
	else {
	  return ulsconfig_member_sp63.E_REINFORCEMENT_DESIGNED_TYPE_LONGITUDINAL;
	}
}

function SetConcreteDesignMembersDesignSectionsType(addon_settings,
    sections_type) {
        const sections_types = [
            "NORMAL_SECTION",
            "INCLINED_SECTION"
    ];
	if (sections_type !== undefined) {
	  if (sections_types.indexOf(sections_type) === -1)
      {
        console.log("Wrong design sections type. Value was: " + sections_type);
		console.log("Correct values are: " + sections_types);
		return;
      }
	}
	else {
        sections_type = "INCLINED_SECTION";
	}
    switch (sections_type) {
        case "NORMAL_SECTION":
            addon_settings.property_member_normal_section_simplified_criterium = true;
            break;
        case "INCLINED_SECTION":
            addon_settings.property_member_inclined_section_spatial_section = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignMembersDesignSectionsType - unknown design sections type");
    }
}