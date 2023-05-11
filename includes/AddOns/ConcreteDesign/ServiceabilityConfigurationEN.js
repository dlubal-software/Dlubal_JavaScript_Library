/*
Bug 90054: GetConcreteDesignCrackWidthLimitValues function (some values of enum have the same text representation)
Bug 90372: property_quasi_permament_support_on_both_sides, property_quasi_permament_one_sided_support
*/

function ConcreteDesignServiceabilityConfigurationEN (no,
    surfaces_no,
    members_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_sls_configurations, no, surfaces_no, members_no, undefined, comment, params);
}

/**
 * @returns Serviceability Configuration index
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Serviceability Configuration object
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Serviceability configuration name, can be undefined
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets Stress Analysis
 * @param {Boolean} property_limitation_of_concrete_pressure_stress_sigma_c     Limitation of concrete pressure stress σc, can be undefined (is not set, false as default)
 * @param {Boolean} property_limitation_of_steel_stress_sigma_s                 Limitation of steel stress σs, can be undefined (is not set, true as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.StressAnaLysis = function (property_limitation_of_concrete_pressure_stress_sigma_c,
    property_limitation_of_steel_stress_sigma_s) {
    if (typeof property_limitation_of_concrete_pressure_stress_sigma_c !== "undefined") {
        this.addon.settings_main_ec2.property_limitation_of_concrete_pressure_stress_sigma_c = property_limitation_of_concrete_pressure_stress_sigma_c;
    }
    if (typeof property_limitation_of_steel_stress_sigma_s !== "undefined") {
        this.addon.settings_main_ec2.property_limitation_of_steel_stress_sigma_s = property_limitation_of_steel_stress_sigma_s;
    }
};

/**
 * Sets Crack Analysis
 * @param {Boolean} property_limit_values_of_allowable_crack_width_acc_to_standard          Limit values of allowable crack width acc. to standard, can be undefined (is not set, true as default)
 * @param {String} property_top_limit_values_of_allowable_crack_width_acc_to_standard       Top (-z) limit values of allowable crack width (
 *                                                                                              AUTOMATICALLY, 
 *                                                                                              02_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_PRESTRESSING,
 *                                                                                              02_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_PRESTRESSING, 
 *                                                                                              04_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              03_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              03_EXPOSURE_CLASS_FROM_XD1_TO_XD3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              03_EXPOSURE_CLASS_FROM_XS1_TO_XS3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              HEADER), can be undefined (is not set, AUTOMATICALLY as default)
 * @param {String} property_bottom_limit_values_of_allowable_crack_width_acc_to_standard    Bottom (+z) limit values of allowable crack width (
 *                                                                                              AUTOMATICALLY, 
 *                                                                                              02_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_PRESTRESSING,
 *                                                                                              02_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_PRESTRESSING, 
 *                                                                                              04_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              03_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              03_EXPOSURE_CLASS_FROM_XD1_TO_XD3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              03_EXPOSURE_CLASS_FROM_XS1_TO_XS3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
 *                                                                                              HEADER), can be undefined (is not set, AUTOMATICALLY as default)
 * @param {Boolean} property_user_defined_limit_values_of_allowable_crack_width                 User-defined limit values of allowable crack width, can be undefined (is not set, false as default)
 * @param {Number} property_user_defined_top_limit_values_of_allowable_crack                    Limit values of allowable crack width (top), can be undefined (is not set, 0.3 mm as default)
 * @param {Number} property_user_defined_bottom_limit_values_of_allowable_crack                 Limit values of allowable crack width (bottom), can be undefined (is not set, 0.3 mm as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.CrackAnalysisLimitValues = function (property_limit_values_of_allowable_crack_width_acc_to_standard,
    property_top_limit_values_of_allowable_crack_width_acc_to_standard,
    property_bottom_limit_values_of_allowable_crack_width_acc_to_standard,
    property_user_defined_limit_values_of_allowable_crack_width,
    property_user_defined_top_limit_values_of_allowable_crack,
    property_user_defined_bottom_limit_values_of_allowable_crack) {
    if (typeof property_limit_values_of_allowable_crack_width_acc_to_standard !== "undefined") {
        this.addon.settings_main_ec2.property_limit_values_of_allowable_crack_width_acc_to_standard = property_limit_values_of_allowable_crack_width_acc_to_standard;
    }
    if (typeof property_top_limit_values_of_allowable_crack_width_acc_to_standard !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_limit_values_of_allowable_crack_width_acc_to_standard, "Limit values of allowable crack width must be on");
        // Bug 90054
        this.addon.settings_main_ec2.property_top_limit_values_of_allowable_crack_width_acc_to_standard = GetConcreteDesignCrackWidthLimitValues(property_top_limit_values_of_allowable_crack_width_acc_to_standard);
    }
    if (typeof property_bottom_limit_values_of_allowable_crack_width_acc_to_standard !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_limit_values_of_allowable_crack_width_acc_to_standard, "Limit values of allowable crack width must be on");
        // Bug 90054
        this.addon.settings_main_ec2.property_bottom_limit_values_of_allowable_crack_width_acc_to_standard = GetConcreteDesignCrackWidthLimitValues(property_bottom_limit_values_of_allowable_crack_width_acc_to_standard);
    }
    if (typeof property_user_defined_limit_values_of_allowable_crack_width !== "undefined") {
        this.addon.settings_main_ec2.property_user_defined_limit_values_of_allowable_crack_width = property_user_defined_limit_values_of_allowable_crack_width;
    }
    if (typeof property_user_defined_top_limit_values_of_allowable_crack !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_user_defined_limit_values_of_allowable_crack_width, "User-defined limit values of allowable crack width must be on");
        this.addon.settings_main_ec2.property_user_defined_top_limit_values_of_allowable_crack = property_user_defined_top_limit_values_of_allowable_crack;
    }
    if (typeof property_user_defined_bottom_limit_values_of_allowable_crack !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_user_defined_limit_values_of_allowable_crack_width, "User-defined limit values of allowable crack width must be on");
        this.addon.settings_main_ec2.property_user_defined_bottom_limit_values_of_allowable_crack = property_user_defined_bottom_limit_values_of_allowable_crack;
    }
};

/**
 * Sets Design without direct crack width calculation
 * @param {Boolean} property_calculation_of_limit_diameter          Calculation of limit diameter lim ds, can be undefined (is not set, true as default)
 * @param {Boolean} property_calculation_of_maximum_member_spacing  Calculation of maximum reinforcement spacing lim sl, can be undefined (is not set, true as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.DesignWithoutDirectCrackWidthCalculation = function (property_calculation_of_limit_diameter,
    property_calculation_of_maximum_member_spacing) {
    if (typeof property_calculation_of_limit_diameter !== "undefined") {
        this.addon.settings_main_ec2.property_calculation_of_limit_diameter = property_calculation_of_limit_diameter;
    }
    if (typeof property_calculation_of_maximum_member_spacing !== "undefined") {
        this.addon.settings_main_ec2.property_calculation_of_maximum_member_spacing = property_calculation_of_maximum_member_spacing;
    }
};

/**
 * Sets Design with direct crack width calculation
 * @param {Boolean} property_use_equation_for_s_r_max   Use Eq. (7.14) for sr,max, can be undefined (true as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.DesignWithDirectCrackWidthCalculation = function (property_use_equation_for_s_r_max) {
    if (typeof property_use_equation_for_s_r_max === "undefined") {
        property_use_equation_for_s_r_max = true;
    }
    this.addon.settings_main_ec2.property_use_equation_for_s_r_max = property_use_equation_for_s_r_max;
};

/**
 * Sets other Crack Analysis parameters
 * @param {Number} property_effective_concrete_tensile_strength_at_time_of_cracking                 Effective concrete tensile strength at time of cracking, can be undefined (is not set, 1.0 as default)
 * @param {Boolean} property_crack_width_control_for_sig_c_l_ed_less_or_equal_than_f_ct_eff_wk      Crack width control for σc,l,Ed ≤ fct,eff,wk, can be undefined (is not set, false as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.CrackAnalysisOther = function (property_effective_concrete_tensile_strength_at_time_of_cracking,
    property_crack_width_control_for_sig_c_l_ed_less_or_equal_than_f_ct_eff_wk) {
    if (typeof property_effective_concrete_tensile_strength_at_time_of_cracking !== "undefined") {
        this.addon.settings_main_ec2.property_effective_concrete_tensile_strength_at_time_of_cracking  =property_effective_concrete_tensile_strength_at_time_of_cracking;
    }
    if (typeof property_crack_width_control_for_sig_c_l_ed_less_or_equal_than_f_ct_eff_wk !== "undefined") {
        this.addon.settings_main_ec2.property_crack_width_control_for_sig_c_l_ed_less_or_equal_than_f_ct_eff_wk = property_crack_width_control_for_sig_c_l_ed_less_or_equal_than_f_ct_eff_wk;
    }
};

/**
 * Sets As,min for Effects Due to Restraint
 * @param {Boolean} property_calculation_of_minimal_reinforcement_area_a_s_min                                  Calculation of minimum reinforcement area As,min, can be undefined (is not set, true as default)
 * @param {String} stress_distribution_within_section_prior_to_cracking                                         Stress distribution within the section prior to cracking (
 *                                                                                                                  DEPENDING_ON_LOAD (Depending on the defined load (kc = 0.0 ... 1.0))
 *                                                                                                                  APPROACH_PURE_RESTRAINT (Approach of pure tension restraint (kc = 1.0))
 *                                                                                                                  APPROACH_BENDING_RESTRAINT (Approach of bending restraint (kc = 0.4))), can be undefined (is not set, DEPENDING_ON_LOAD as default)
 * @param {String} property_a_s_min_layout_on_member                                                            As,min layout on member (AREA_TOP_BOTTOM, AREA_TOP, AREA_BOTTOM, AREA_TENSION_SIDE), can be undefined (is not set, AREA_TENSION_SIDE as default)
 * @param {Boolean} property_top_reinforcement_in_direction_fi1                                                 Top (-z) reinforcement φ1, can be undefined (is not set, true as default)
 * @param {Boolean} property_top_reinforcement_in_direction_fi2                                                 Top (-z) reinforcement φ2, can be undefined (is not set, true as default)
 * @param {Boolean} property_bottom_reinforcement_in_direction_fi1                                              Bottom (+z) reinforcement φ1, can be undefined (is not set, true as default)
 * @param {Boolean} property_bottom_reinforcement_in_direction_fi2                                              Bottom (+z) reinforcement φ2, can be undefined (is not set, true as default)
 * @param {Boolean} property_crack_formation_within_the_first_28_days                                           Crack formation within the first 28 days, can be undefined (is not set, false as default)
 * @param {Number} property_effective_concrete_tensile_strength_at_time_of_cracking_within_the_first_28_days    Effective concrete tensile strength at time of cracking, can be undefined (is not set, 1.0 as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.EffectsDueToRestraint = function (property_calculation_of_minimal_reinforcement_area_a_s_min,
    stress_distribution_within_section_prior_to_cracking,
    property_a_s_min_layout_on_member,
    property_top_reinforcement_in_direction_fi1,
    property_top_reinforcement_in_direction_fi2,
    property_bottom_reinforcement_in_direction_fi1,
    property_bottom_reinforcement_in_direction_fi2,
    property_crack_formation_within_the_first_28_days,
    property_effective_concrete_tensile_strength_at_time_of_cracking_within_the_first_28_days) {
    if (typeof property_calculation_of_minimal_reinforcement_area_a_s_min !== "undefined") {
        this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min = property_calculation_of_minimal_reinforcement_area_a_s_min;
    }
    if (typeof stress_distribution_within_section_prior_to_cracking !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        SetConcreteDesignStressDistributionWithinSectionPriorToCrackingType(this.addon, stress_distribution_within_section_prior_to_cracking);
    }
    if (typeof property_a_s_min_layout_on_member !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        if (this.addon.settings_main_ec2.property_depending_on_the_defined_load || this.addon.settings_main_ec2.property_approach_of_pure_tension_restraint) {
            ASSERT(property_a_s_min_layout_on_member === "AREA_TENSION_SIDE", "AREA_TENSION_SIDE is allowed only");
        }
        this.addon.settings_main_ec2.property_a_s_min_layout_on_member = GetConcreteDesignMinimalReinforcementAreaType(property_a_s_min_layout_on_member);
    }
    if (typeof property_top_reinforcement_in_direction_fi1 !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        this.addon.settings_main_ec2.property_top_reinforcement_in_direction_fi1 = property_top_reinforcement_in_direction_fi1;
    }
    if (typeof property_top_reinforcement_in_direction_fi2 !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        this.addon.settings_main_ec2.property_top_reinforcement_in_direction_fi2 = property_top_reinforcement_in_direction_fi2;
    }
    if (typeof property_bottom_reinforcement_in_direction_fi1 !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        this.addon.settings_main_ec2.property_bottom_reinforcement_in_direction_fi1 = property_bottom_reinforcement_in_direction_fi1;
    }
    if (typeof property_bottom_reinforcement_in_direction_fi2 !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        this.addon.settings_main_ec2.property_bottom_reinforcement_in_direction_fi2 = property_bottom_reinforcement_in_direction_fi2;
    }
    if (typeof property_crack_formation_within_the_first_28_days !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_calculation_of_minimal_reinforcement_area_a_s_min, "Calculation of minimum reinforcement area must be on");
        this.addon.settings_main_ec2.property_crack_formation_within_the_first_28_days = property_crack_formation_within_the_first_28_days;
    }
    if (typeof property_effective_concrete_tensile_strength_at_time_of_cracking_within_the_first_28_days !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_crack_formation_within_the_first_28_days, "Crack formation within the first 28 days must be on");
        this.addon.settings_main_ec2.property_effective_concrete_tensile_strength_at_time_of_cracking_within_the_first_28_days = property_effective_concrete_tensile_strength_at_time_of_cracking_within_the_first_28_days;
    }
};

/**
 * Sets Deflection Analysis
 * @param {Boolean} property_limitation_of_deflection_enabled       Limitation of deflection, can be undefined (is not set, true as default)
 * @param {Number} property_quasi_permament_support_on_both_sides   Quasi-permanent - Support on both sides, can be undefined (is not set, 250 as default)
 * @param {Number} property_quasi_permament_one_sided_support       Quasi-permanent - One-sided support, can be undefined (is not set, 250 as default)
 * @param {Boolean} property_tension_stiffening_effect_enabled      Consider resistance of concrete between cracks (tension stiffening effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_minimum_zeta_enabled                   Consider minimum value of distribution factor, can be undefined (is not set, false as default)
 * @param {Number} property_minimum_zeta_value                      Minimum value of distribution factor, can be undefined (is not set, 0.5 as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.DeflectionAnalysis = function (property_limitation_of_deflection_enabled,
    property_quasi_permament_support_on_both_sides,     // Bug 90372
    property_quasi_permament_one_sided_support,         // Bug 90372
    property_tension_stiffening_effect_enabled,
    property_minimum_zeta_enabled,
    property_minimum_zeta_value) {
    if (typeof property_limitation_of_deflection_enabled !== "undefined") {
        this.addon.settings_main_ec2.property_limitation_of_deflection_enabled = property_limitation_of_deflection_enabled;
    }
    if (typeof property_quasi_permament_support_on_both_sides !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_limitation_of_deflection_enabled, "Limitation of deflection must be on");
        this.addon.settings_main_ec2.property_quasi_permament_support_on_both_sides = property_quasi_permament_support_on_both_sides;
    }
    if (typeof property_quasi_permament_one_sided_support !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_limitation_of_deflection_enabled, "Limitation of deflection must be on");
        this.addon.settings_main_ec2.property_quasi_permament_one_sided_support = property_quasi_permament_one_sided_support;
    }
    if (typeof property_tension_stiffening_effect_enabled !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_limitation_of_deflection_enabled, "Limitation of deflection must be on");
        this.addon.settings_main_ec2.property_tension_stiffening_effect_enabled = property_tension_stiffening_effect_enabled;
    }
    if (typeof property_minimum_zeta_enabled !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_limitation_of_deflection_enabled, "Limitation of deflection must be on");
        this.addon.settings_main_ec2.property_minimum_zeta_enabled = property_minimum_zeta_enabled;
    }
    if (typeof property_minimum_zeta_value !== "undefined") {
        ASSERT(this.addon.settings_main_ec2.property_minimum_zeta_enabled, "Consider minimum value of distribution factor must be on");
        this.addon.settings_main_ec2.property_minimum_zeta_value = property_minimum_zeta_value;
    }
};

/**
 * Sets Crack state detection
 * @param {String} crack_state_detection    Crack state detection (
 *                                              CALCULATED_FROM_ASSOCIATED_LOAD (Crack state calculated from associated load),
 *                                              DETERMINED_AS_ENVELOPE_FROM_ALL_DESIGN_SITUATIONS (Crack state determined as envelope from all SLS design situations),
 *                                              INDEPENDENT_OF_LOAD (Crack state independent of load)) can be undefined (is not set, CALCULATED_FROM_ASSOCIATED_LOAD as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.CrackStateDetection = function (crack_state_detection) {
    SetConcreteDesignServiceabilityConfigurationCrackStateDetection(this.addon.settings_main_ec2, crack_state_detection);
};

/**
 * Sets Fiber Concrete
 * @param {String} property_fiber_concrete_material_model_for_tension_strains               Material model for tension strains (SDL1, SDL2, SDL3), can be undefined (is not set, SDL1 as default)
 * @param {Boolean} property_fiber_concrete_size_factor_kfg_calculate_from_tension_area     Size factor κfG calculated from tension area Afct, can be undefined (is not set, true as default)
 */
ConcreteDesignServiceabilityConfigurationEN.prototype.FiberConcrete = function (property_fiber_concrete_material_model_for_tension_strains,
    property_fiber_concrete_size_factor_kfg_calculate_from_tension_area) {
    this.addon.settings_main_ec2.property_fiber_concrete_material_model_for_tension_strains = GetConcreteDesignMaterialModelForTensionStrainsType(property_fiber_concrete_material_model_for_tension_strains);
    if (typeof property_fiber_concrete_size_factor_kfg_calculate_from_tension_area !== "undefined") {
        this.addon.settings_main_ec2.property_fiber_concrete_size_factor_kfg_calculate_from_tension_area = property_fiber_concrete_size_factor_kfg_calculate_from_tension_area;
    }
};

function GetConcreteDesignMaterialModelForTensionStrainsType(material_model_type) {
    const material_model_types_dict = {
        "SDL1": main_slsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1,
        "SDL2": main_slsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL2,
        "SDL3": main_slsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL3
    };
	if (material_model_type !== undefined) {
	  var type = material_model_types_dict[material_model_type];
	  if (type === undefined) {
		console.log("Wrong material model for tension strains type. Value was: " + material_model_type);
		console.log("Correct values are: " + Object.keys(material_model_types_dict));
		type = main_slsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1;
	  }
	  return type;
	}
	else {
	  return main_slsconfig_concrete_design_ec2.E_FIBER_CONCRETE_TENSION_MATERIAL_MODEL_SDL1;
	}
}

function SetConcreteDesignStressDistributionWithinSectionPriorToCrackingType (addon,
    section_prior_type) {
    const section_prior_types = [
        "DEPENDING_ON_LOAD",
        "APPROACH_PURE_RESTRAINT",
        "APPROACH_BENDING_RESTRAINT"
    ];
	if (section_prior_type !== undefined) {
	  if (section_prior_types.indexOf(section_prior_type) === -1)
      {
        console.log("Wrong stress distribution crack type. Value was: " + section_prior_type);
		console.log("Correct values are: " + section_prior_types);
		return;
      }
	}
	else {
        section_prior_type = "DEPENDING_ON_LOAD";
	}
    switch (section_prior_type) {
        case "DEPENDING_ON_LOAD":
            addon.settings_main_ec2.property_depending_on_the_defined_load = true;
            break;
        case "APPROACH_PURE_RESTRAINT":
            addon.settings_main_ec2.property_approach_of_pure_tension_restraint = true;
            break;
        case "APPROACH_BENDING_RESTRAINT":
            addon.settings_main_ec2.property_approach_of_bending_restraint = true;
            break;
        default:
            ASSERT(false, "GetConcreteDesignStressDistributionWithinSectionPriorToCrackingType - unknown stress distribution crack type");
    }
}

function GetConcreteDesignMinimalReinforcementAreaType(minimal_reinforcement_type) {
    const minimal_reinforcement_types_dict = {
        "AREA_TOP_BOTTOM": main_slsconfig_concrete_design_ec2.E_MINIMAL_REINFORCEMENT_AREA_TOP_BOTTOM,
        "AREA_TOP": main_slsconfig_concrete_design_ec2.E_MINIMAL_REINFORCEMENT_AREA_TOP,
        "AREA_BOTTOM": main_slsconfig_concrete_design_ec2.E_MINIMAL_REINFORCEMENT_AREA_BOTTOM,
        "AREA_TENSION_SIDE": main_slsconfig_concrete_design_ec2.E_MINIMAL_REINFORCEMENT_AREA_TENSION_SIDE
    };
	if (minimal_reinforcement_type !== undefined) {
	  var type = minimal_reinforcement_types_dict[minimal_reinforcement_type];
	  if (type === undefined) {
		console.log("Wrong minimal reinforcement area type. Value was: " + minimal_reinforcement_type);
		console.log("Correct values are: " + Object.keys(minimal_reinforcement_types_dict));
		type = main_slsconfig_concrete_design_ec2.E_MINIMAL_REINFORCEMENT_AREA_TENSION_SIDE;
	  }
	  return type;
	}
	else {
	  return main_slsconfig_concrete_design_ec2.E_MINIMAL_REINFORCEMENT_AREA_TENSION_SIDE;
	}
}

function GetConcreteDesignCrackWidthLimitValues(limit_values_type) {
    const limit_values_types_dict = {
        "AUTOMATICALLY": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_AUTOMATICALLY,
        "02_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_PRESTRESSING": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_02_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_PRESTRESSING,
        "02_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_PRESTRESSING": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_02_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_PRESTRESSING,
        "04_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_04_EXPOSURE_CLASS_X0_AND_XC1_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
        "03_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_03_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
        "03_EXPOSURE_CLASS_FROM_XD1_TO_XD3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_03_EXPOSURE_CLASS_FROM_XD1_TO_XD3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
        "03_EXPOSURE_CLASS_FROM_XS1_TO_XS3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_03_EXPOSURE_CLASS_FROM_XS1_TO_XS3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING,
        "HEADER": main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_HEADER
    };
	if (limit_values_type !== undefined) {
	  var type = limit_values_types_dict[limit_values_type];
	  if (type === undefined) {
		console.log("Wrong crack width limit type. Value was: " + limit_values_type);
		console.log("Correct values are: " + Object.keys(limit_values_types_dict));
		type = main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_AUTOMATICALLY;
	  }
	  return type;
	}
	else {
	  return main_slsconfig_concrete_design_ec2.E_CRACK_WIDTH_AUTOMATICALLY;
	}
}