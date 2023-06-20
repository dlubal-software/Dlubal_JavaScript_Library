/*
SteelDesignUltimateConfigurationEC3.prototype.GeneralRules No API support?
SteelDesignUltimateConfigurationEC3.prototype.ColdFormDesign No API support?
SteelDesignUltimateConfigurationEC3.prototype.StainlessSteel No API support?
SteelDesignUltimateConfigurationEC3.prototype.PlatedElements No API support?
*/

/**
 * Creates Steel Design Ultimate Configuration for EN code of standard
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationEC3 (no,
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
SteelDesignUltimateConfigurationEC3.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationEC3.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets name
 * @param {String} name     Ultimate Configuration name, can be undefined
 */
SteelDesignUltimateConfigurationEC3.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (true as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetGeneral = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis === "undefined") {
        property_perform_stability_analysis = true;
    }
    this.addon.settings_ec3.property_perform_stability_analysis = property_perform_stability_analysis;
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
SteelDesignUltimateConfigurationEC3.prototype.SetLimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_ec3, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
};

/**
 * Sets thin-walled analysis design parameters
 * @param {Number} property_thin_walled_analysis_maximum_number_of_iterations           Maximum number of iterations, can be undefined (is not set, 3 as default)
 * @param {Number} property_thin_walled_analysis_maximum_difference_between_iterations  Maximum difference between iterations, can be undefined (is not set, 1.00% as default)
 * @param {Boolean} property_thin_walled_analysis_neglect_bending_moments_due_to_shift  Neglect bending moments due to the shift of the centroid, can be undefined (is not set, false as default)
 * @param {Boolean} property_thin_walled_analysis_consider_annex_e                      Consider effective widths according to EN 1993-1-5, Annex E, can be undefined (is not set, false as default)
 * @param {Boolean} property_thin_walled_analysis_increase_material_factor              For limit c/t of class 3, increase material factor epsilon acc. to 5.5.2(9), can be undefined (is not set, true as default), only when Perform stability design is on
 */
SteelDesignUltimateConfigurationEC3.prototype.SetThinWalledAnalysis = function (property_thin_walled_analysis_maximum_number_of_iterations,
    property_thin_walled_analysis_maximum_difference_between_iterations,
    property_thin_walled_analysis_neglect_bending_moments_due_to_shift,
    property_thin_walled_analysis_consider_annex_e,
    property_thin_walled_analysis_increase_material_factor) {
    if (typeof property_thin_walled_analysis_maximum_number_of_iterations !== "undefined") {
        this.addon.settings_ec3.property_thin_walled_analysis_maximum_number_of_iterations = property_thin_walled_analysis_maximum_number_of_iterations;
    }
    if (typeof property_thin_walled_analysis_maximum_difference_between_iterations !== "undefined") {
        this.addon.settings_ec3.property_thin_walled_analysis_maximum_difference_between_iterations = property_thin_walled_analysis_maximum_difference_between_iterations;
    }
    if (typeof property_thin_walled_analysis_neglect_bending_moments_due_to_shift !== "undefined") {
        this.addon.settings_ec3.property_thin_walled_analysis_neglect_bending_moments_due_to_shift = property_thin_walled_analysis_neglect_bending_moments_due_to_shift;
    }
    if (typeof property_thin_walled_analysis_consider_annex_e !== "undefined") {
        this.addon.settings_ec3.property_thin_walled_analysis_consider_annex_e = property_thin_walled_analysis_consider_annex_e;
    }
    if (typeof property_thin_walled_analysis_increase_material_factor !== "undefined") {
        ASSERT(!this.addon.settings_ec3.property_perform_stability_analysis, "Increase material factor can be set only if perform stability design is false");
        this.addon.settings_ec3.property_thin_walled_analysis_increase_material_factor = property_thin_walled_analysis_increase_material_factor;
    }
};

/**
 * Sets design parameters options
 * @param {Boolean} property_options_elastic_design                         Elastic design (also for class 1 and class 2 sections), can be undefined (is not set, false as default)
 * @param {Boolean} property_options_use_verification_for_elastic_design    Use verification acc. to equation 6.1 for elastic design, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_use_linear_interaction                 Use linear interaction acc. to 6.2.1(7) for section check for M+N, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetOptions = function (property_options_elastic_design,
    property_options_use_verification_for_elastic_design,
    property_options_use_linear_interaction) {
    if (typeof property_options_elastic_design !== "undefined") {
        this.addon.settings_ec3.property_options_elastic_design = property_options_elastic_design;
    }
    if (typeof property_options_use_verification_for_elastic_design !== "undefined") {
        this.addon.settings_ec3.property_options_use_verification_for_elastic_design = property_options_use_verification_for_elastic_design;
    }
    if (typeof property_options_use_linear_interaction !== "undefined") {
        this.addon.settings_ec3.property_options_use_linear_interaction = property_options_use_linear_interaction;
    }
};

/**
 * Sets design of cold-formed sections acc. to EN 1993-1-3
 * @param {Boolean} property_design_of_cold_formed_sections_activate    Perform design of cold-formed sections, can be undefined (is not set, true as default)
 * @param {String} property_forming_factor_k                            Forming factor k acc. to 3.2.2(3) (ROLL_FORMING, OTHER_METHODS_OF_FORMING), can be undefined (is not set, ROLL_FORMING as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetDesignOfColdFormedSection = function (property_design_of_cold_formed_sections_activate,
    property_forming_factor_k) {
    if (typeof property_design_of_cold_formed_sections_activate !== "undefined") {
        this.addon.settings_ec3.property_design_of_cold_formed_sections_activate = property_design_of_cold_formed_sections_activate;
    }
    if (typeof property_forming_factor_k !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_design_of_cold_formed_sections_activate, "Perform design of cold-formed sections must be activated");
        this.addon.settings_ec3.property_forming_factor_k = EC3FormingFactor(property_forming_factor_k);
    }
};

/**
 * Sets design of share buckling Acc. to EN 1993-1-5
 * @param {Boolean} property_design_of_shear_buckling_activate  Perform design of shear buckling, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetDesignOfShearBuckling = function (property_design_of_shear_buckling_activate) {
    if (typeof property_design_of_shear_buckling_activate !== "undefined") {
        this.addon.settings_ec3.property_design_of_shear_buckling_activate = property_design_of_shear_buckling_activate;
    }
};

/**
 * Sets stability analyses with second-order internal forces
 * @param {Boolean} property_use_gamma_m1   Use gama M1 for determination of the section resistance, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetStabilityAnalyses = function (property_use_gamma_m1) {
    if (typeof property_use_gamma_m1 !== "undefined") {
        this.addon.settings_ec3.property_use_gamma_m1 = property_use_gamma_m1;
    }
};

/**
 * Sets calculation method (Perform stability design is on)
 * @param {Boolean} property_structure_type_sway_yy                         Sway y-y, can be undefined (is not set, false as default)
 * @param {Boolean} property_structure_type_sway_zz                         Sway z-z, can be undefined (is not set, false as default)
 * @param {Boolean} property_gm_enable_also_for_non_i_sections              Enable also for non-l-sections, can be undefined (is not set, true as default)
 * @param {Boolean} property_extensional_methods                            Extension methods, can be undefined (is not set, false as default)
 * @param {Boolean} property_interpolation_acc_to_eq_666                    Interpolation acc. to Eq. 6.66, Extension method must be on (in case european lateral-torsional buckling curve is defined must be undefined)
 * @param {Boolean} property_european_lateral_torsional_buckling_curves     European lateral-torsional buckling curve, Extension method must be on (in case interpolation is defined must be undefined)
 * @param {Boolean} property_adapted_method                                 Adapted method (enable double bending), European lateral-torsional buckling curve must be on, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetCalculationMethod = function (property_structure_type_sway_yy,
    property_structure_type_sway_zz,
    property_gm_enable_also_for_non_i_sections,
    property_extensional_methods,
    property_interpolation_acc_to_eq_666,
    property_european_lateral_torsional_buckling_curves,
    property_adapted_method) {
    ASSERT(this.addon.settings_ec3.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_structure_type_sway_yy !== "undefined") {
        this.addon.settings_ec3.property_structure_type_sway_yy = property_structure_type_sway_yy;
    }
    if (typeof property_structure_type_sway_zz !== "undefined") {
        this.addon.settings_ec3.property_structure_type_sway_zz = property_structure_type_sway_zz;
    }
    if (typeof property_gm_enable_also_for_non_i_sections !== "undefined") {
        this.addon.settings_ec3.property_gm_enable_also_for_non_i_sections = property_gm_enable_also_for_non_i_sections;
    }
    if (typeof property_extensional_methods !== "undefined") {
        this.addon.settings_ec3.property_extensional_methods = property_extensional_methods;
    }
    if (typeof property_interpolation_acc_to_eq_666 !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_extensional_methods, "Extensional method must be on");
        this.addon.property_interpolation_acc_to_eq_666 = property_interpolation_acc_to_eq_666;
    }
    if (typeof property_european_lateral_torsional_buckling_curves !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_extensional_methods, "Extensional method must be on");
        this.addon.settings_ec3.property_european_lateral_torsional_buckling_curves = property_european_lateral_torsional_buckling_curves;
    }
    if (typeof property_adapted_method !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_european_lateral_torsional_buckling_curves, "European lateral-torsional buckling curve must be on");
        this.addon.settings_ec3.property_adapted_method = property_adapted_method;
    }
};

/**
 * Include second-order effects Acc. to 5.2.2(4) by increasing bending moment about
 * @param {Boolean} property_soe_major_y_axis                     Major x-axis, can be undefined (is not set, false as default)
 * @param {Number} property_soe_major_y_axis_increasing_factor   Increasing factor for major x-axis, Major x-axis must be on, can be undefined (is not set, 1.150 as default)
 * @param {String} property_soe_minor_z_axis                     Major z-axis, can be undefined (is not set, false as default)
 * @param {Number} property_soe_minor_z_axis_increasing_factor   Increasing factor for major z-axis, Major z-axis must be on, can be undefined (is not set, 1.150 as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetSecondOrderEffects = function (property_soe_major_y_axis,
    property_soe_major_y_axis_increasing_factor,
    property_soe_minor_z_axis,
    property_soe_minor_z_axis_increasing_factor) {
    ASSERT(this.addon.settings_ec3.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_soe_major_y_axis !== "undefined") {
        this.addon.settings_ec3.property_soe_major_y_axis = property_soe_major_y_axis;
    }
    if (typeof property_soe_major_y_axis_increasing_factor !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_soe_major_y_axis, "Major y-axis must be on");
        this.addon.settings_ec3.property_soe_major_y_axis_increasing_factor = property_soe_major_y_axis_increasing_factor;
    }
    if (typeof property_soe_minor_z_axis !== "undefined") {
        this.addon.settings_ec3.property_soe_minor_z_axis = property_soe_minor_z_axis;
    }
    if (typeof property_soe_minor_z_axis_increasing_factor !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_soe_minor_z_axis, "Minor z-axis must be on");
        this.addon.settings_ec3.property_soe_minor_z_axis_increasing_factor = property_soe_minor_z_axis_increasing_factor;
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_load_acts_vp_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_load_acts_vp_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_downwards_on_bottom_flange        On profile edge (is not set, stabilizing effect)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetPositionOfPositiveTransverse = function (property_load_acts_vp_downwards_on_top_flange,
    property_load_acts_vp_at_shear_point,
    property_load_acts_vp_at_center_point,
    property_load_acts_vp_downwards_on_bottom_flange) {
    setSteelDesignUltimateConfiguration_PositionOfPositiveTransverse(this.addon.settings_ec3, property_load_acts_vp_downwards_on_top_flange, property_load_acts_vp_at_shear_point, property_load_acts_vp_at_center_point,
        property_load_acts_vp_downwards_on_bottom_flange);
};

/**
 * Sets parameters for lateral-torsional buckling
 * @param {Boolean} property_determine_lateral_torsion_eq_6_56                      Always according to Eq. 6.56 general case (conservative), can be undefined (is not set, false as default)
 * @param {Boolean} property_determine_lateral_torsion_eq_6_56_or_6_57              If possible, according to Eq. 6.57, otherwise according to Eq. 6.56, can be undefined (is not set, true as default)
 * @param {Boolean} property_determine_lateral_torsion_f_factor                     Use factor f for modification of chi L, T acc. to 6.3.2.3(2), can be undefined (is not set, true as default)
 * @param {Boolean} property_perform_design_for_doubly_symmetric_hollow_sections    Perform design for non-circular doubly symmetric hollow sections, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetLateralTorsionalBuckling = function (property_determine_lateral_torsion_eq_6_56,
    property_determine_lateral_torsion_eq_6_56_or_6_57,
    property_determine_lateral_torsion_f_factor,
    property_perform_design_for_doubly_symmetric_hollow_sections) {
    ASSERT(this.addon.settings_ec3.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_determine_lateral_torsion_eq_6_56 !== "undefined") {
        this.addon.settings_ec3.property_determine_lateral_torsion_eq_6_56 = property_determine_lateral_torsion_eq_6_56;
    }
    if (typeof property_determine_lateral_torsion_eq_6_56_or_6_57 !== "undefined") {
        this.addon.settings_ec3.property_determine_lateral_torsion_eq_6_56_or_6_57 = property_determine_lateral_torsion_eq_6_56_or_6_57;
    }
    if (typeof property_determine_lateral_torsion_f_factor !== "undefined") {
        this.addon.settings_ec3.property_determine_lateral_torsion_f_factor = property_determine_lateral_torsion_f_factor;
    }
    if (typeof property_perform_design_for_doubly_symmetric_hollow_sections !== "undefined") {
        this.addon.settings_ec3.property_perform_design_for_doubly_symmetric_hollow_sections = property_perform_design_for_doubly_symmetric_hollow_sections;
    }
};

/**
 * Sets Parameters
 * @param {Boolean} property_param_k_annex_a    Method 1 acc. to Annex A, can be undefined (is not set, false as default)
 * @param {Boolean} property_param_k_annex_b    Method 2 acc. to Annex B, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationEC3.prototype.SetParameters = function (property_param_k_annex_a,
    property_param_k_annex_b) {
    ASSERT(this.addon.settings_ec3.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_param_k_annex_a !== "undefined") {
        this.addon.settings_ec3.property_param_k_annex_a = property_param_k_annex_a;
    }
    if (typeof property_param_k_annex_b !== "undefined") {
        this.addon.settings_ec3.property_param_k_annex_b = property_param_k_annex_b;
    }
}

function EC3FormingFactor(factor) {
	const factor_types_dict = {
        "ROLL_FORMING": member_ulsconfig_steel_design_ec3.E_CONSIDER_FACTOR_ROLL_FORMING,
        "OTHER_METHODS_OF_FORMING": member_ulsconfig_steel_design_ec3.E_CONSIDER_FACTOR_OTHER_METHODS_OF_FORMING
	};

	if (factor !== undefined) {
		var type = factor_types_dict[factor];
		if (type === undefined) {
			console.log("Wrong type of EC3 forming factor. Value was: " + factor);
			console.log("Correct values are: ( " + Object.keys(factor_types_dict) + ")");
			type = member_ulsconfig_steel_design_ec3.E_CONSIDER_FACTOR_ROLL_FORMING;
		}
		return type;
	}
	else {
		return member_ulsconfig_steel_design_ec3.E_CONSIDER_FACTOR_ROLL_FORMING;
	}
}