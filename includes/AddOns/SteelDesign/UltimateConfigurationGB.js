/**
 * Creates Steel Design Ultimate Configuration
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {String} name             Ultimate Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationGB (no,
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
SteelDesignUltimateConfigurationGB.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationGB.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets general design parameters
 * @param {Boolean} property_perform_stability_analysis     Perform stability design, can be undefined (is not set, true as default)
 */
SteelDesignUltimateConfigurationGB.prototype.General = function (property_perform_stability_analysis) {
    if (typeof property_perform_stability_analysis !== "undefined") {
        this.addon.settings_gb50017.property_perform_stability_analysis = property_perform_stability_analysis;
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
SteelDesignUltimateConfigurationGB.prototype.LimitValues = function (property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    setSteelDesignUltimateConfiguration_LimitValues(this.addon.settings_gb50017, property_limit_values_tension, property_limit_values_compression, property_limit_values_shear_y, property_limit_values_shear_z,
        property_limit_values_torsion, property_limit_values_bending_about_major_axis_y, property_limit_values_bending_about_minor_axis_z);
};

/**
 * Sets Options
 * @param {Boolean} property_options_elastic_or_fatigue_design              Elastic of fatigue design acc. to 6.1.2 and 8.1.1, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_take_post_buckling_strength_of_web     Post-buckling strength of web for l-shape section acc. to 6.4.1, can be undefined (is not set, false as default)
 * @param {Boolean} property_options_plastic_design                         Plastic resistance of section acc. to 10.1, 10.3 and 10.4, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationGB.prototype.Options = function (property_options_elastic_or_fatigue_design,
    property_options_take_post_buckling_strength_of_web,
    property_options_plastic_design) {
    if (typeof property_options_elastic_or_fatigue_design !== "undefined") {
        this.addon.settings_gb50017.property_options_elastic_or_fatigue_design = property_options_elastic_or_fatigue_design;
    }
    if (typeof property_options_take_post_buckling_strength_of_web !== "undefined") {
        this.addon.settings_gb50017.property_options_take_post_buckling_strength_of_web = property_options_take_post_buckling_strength_of_web;
    }
    if (typeof property_options_plastic_design != "undefined") {
        this.addon.settings_gb50017.property_options_plastic_design = property_options_plastic_design;
    }
};

/**
 * Sets Importance factor of structure
 * @param {Boolean} property_importance_factor_is_used  Use the importance factor of structure for all load combinations, can be undefined (is not set, true as default)
 * @param {Number} property_importance_factor_value     Importance factor acc. to 3.1.9, can be undefined (is not set, 1.000 as default)
 */
SteelDesignUltimateConfigurationGB.prototype.ImportanceFactorOfStructure = function (property_importance_factor_is_used,
    property_importance_factor_value) {
    if (typeof property_importance_factor_is_used !== "undefined") {
        this.addon.settings_gb50017.property_importance_factor_is_used = property_importance_factor_is_used;
    }
    if (typeof property_importance_factor_value !== "undefined") {
        ASSERT(this.addon.settings_gb50017.property_importance_factor_is_used, "Use the importance factor of structure for all load combinations must be on");
        this.addon.settings_gb50017.property_importance_factor_value = property_importance_factor_value;
    }
};

/**
 * Sets Partial safety factor of materials from another standard
 * @param {Boolean} property_partial_safety_factor_is_user_defined  User-defined factor, can be undefined (is not set, false as default)
 * @param {Number} property_partial_safety_factor_value             Partial safety factor, can be undefined (is not set, 1.000 as default)
 */
SteelDesignUltimateConfigurationGB.prototype.AnotherStandard = function (property_partial_safety_factor_is_user_defined,
    property_partial_safety_factor_value) {
    if (typeof property_partial_safety_factor_is_user_defined !== "undefined") {
        this.addon.settings_gb50017.property_partial_safety_factor_is_user_defined = property_partial_safety_factor_is_user_defined;
    }
    if (typeof property_partial_safety_factor_value !== "undefined") {
        ASSERT(this.addon.settings_gb50017.property_partial_safety_factor_is_user_defined, "User-defined partial factor must be on");
        this.addon.settings_gb50017.property_partial_safety_factor_value = property_partial_safety_factor_value;
    }
};

/**
 * Sets Stability analysis (only one option can be set)
 * @param {Boolean} property_stability_analysis_equivalent_member       Equivalent member method acc. to 5.3, can be undefined (is not set, true as default)
 * @param {Boolean} property_stability_analysis_p_delta_second_order    Elastic second-order P-Delta method acc. to 5.4, can be undefined (is not set, false as default)
 * @param {Boolean} property_stability_analysis_direct_method           Direct method acc. to 5.5, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationGB.prototype.StabilityAnalysis = function (property_stability_analysis_equivalent_member,
    property_stability_analysis_p_delta_second_order,
    property_stability_analysis_direct_method) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_stability_analysis_equivalent_member !== "undefined") {
        this.addon.settings_gb50017.property_stability_analysis_equivalent_member = property_stability_analysis_equivalent_member;
    }
    if (typeof property_stability_analysis_p_delta_second_order !== "undefined") {
        this.addon.settings_gb50017.property_stability_analysis_p_delta_second_order = property_stability_analysis_p_delta_second_order;
    }
    if (typeof property_stability_analysis_direct_method !== "undefined") {
        this.addon.settings_gb50017.property_stability_analysis_direct_method = property_stability_analysis_direct_method
    }
};

/**
 * Sets Determination of overall stability factor of beams acc. to annex C
 * @param {Boolean} property_determination_of_overall_stability_use_approximate_calculation     Use approximate calculation acc. to C.0.5 for I- and H-sections, can be undefined (is not set, false as default)
 * @param {Number} property_tolerance_of_ltb_support_distribution                               Tolerance for uniform distribution of side supports for tab. C.0.1, can be undefined (is not set, 0.05 as default)
 */
SteelDesignUltimateConfigurationGB.prototype.OverallStabilityFactor = function (property_determination_of_overall_stability_use_approximate_calculation,
    property_tolerance_of_ltb_support_distribution) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_determination_of_overall_stability_use_approximate_calculation !== "undefined") {
        this.addon.settings_gb50017.property_determination_of_overall_stability_use_approximate_calculation = property_determination_of_overall_stability_use_approximate_calculation;
    }
    if (typeof property_tolerance_of_ltb_support_distribution !== "undefined") {
        this.addon.settings_gb50017.property_tolerance_of_ltb_support_distribution = property_tolerance_of_ltb_support_distribution;
    }
};

/**
 * Sets Distorsional buckling of beams acc. to 6.2.7
 * @param {Boolean} property_check_compression_flange   Check compression of flange acc. to 6.2.7 for I-sections, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationGB.prototype.DistorsionalBucklingOfBeams = function (property_check_compression_flange) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_check_compression_flange !== "undefined") {
        this.addon.settings_gb50017.property_check_compression_flange = property_check_compression_flange;
    }
};

/**
 * Sets position of positive transverse load application (only one option can be set)
 * @param {Boolean} property_load_acts_vp_downwards_on_top_flange           On profile edge (destabilizing effect), can be undefined (is not set, true as default)
 * @param {Boolean} property_load_acts_vp_at_shear_point                    At shear point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_at_center_point                   At center point, can be undefined (is not set, false as default)
 * @param {Boolean} property_load_acts_vp_downwards_on_bottom_flange        On profile edge (stabilizing effect)
 */
SteelDesignUltimateConfigurationGB.prototype.PositionOfPositiveTransverse = function (property_load_acts_vp_downwards_on_top_flange,
    property_load_acts_vp_at_shear_point,
    property_load_acts_vp_at_center_point,
    property_load_acts_vp_downwards_on_bottom_flange) {
    setSteelDesignUltimateConfiguration_PositionOfPositiveTransverse(this.addon.settings_gb50017, property_load_acts_vp_downwards_on_top_flange, property_load_acts_vp_at_shear_point, property_load_acts_vp_at_center_point,
        property_load_acts_vp_downwards_on_bottom_flange);
};

/**
 * Sets Local stability acc. to 6.3
 * @param {Boolean} property_is_compression_flange_torsionally_restrained   Torsion of compression flange is restrained, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationGB.prototype.LocalStability = function (property_is_compression_flange_torsionally_restrained) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_is_compression_flange_torsionally_restrained !== "undefined") {
        this.addon.settings_gb50017.property_is_compression_flange_torsionally_restrained = property_is_compression_flange_torsionally_restrained;
    }
};

/**
 * Sets Classification of welded sections acc. to tab. 7.2.1 (only one option can be set)
 * @param {Boolean} property_welded_cross_sections_classification_rolled        Rolled flange edges, can be undefined (is not set, true as default)
 * @param {Boolean} property_welded_cross_sections_classification_flame_cut     Flame-cut flange edge, can be undefined (is not set, false as default)
 * @param {Boolean} property_welded_cross_sections_classification_sheared       Shared flange edges, can be undefined (is not set, false as default)
 */
SteelDesignUltimateConfigurationGB.prototype.WeldedSection = function (property_welded_cross_sections_classification_rolled,
    property_welded_cross_sections_classification_flame_cut,
    property_welded_cross_sections_classification_sheared) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_welded_cross_sections_classification_rolled !== "undefined") {
        this.addon.settings_gb50017.property_welded_cross_sections_classification_rolled = property_welded_cross_sections_classification_rolled;
    }
    if (typeof property_welded_cross_sections_classification_flame_cut !== "undefined") {
        this.addon.settings_gb50017.property_welded_cross_sections_classification_flame_cut = property_welded_cross_sections_classification_flame_cut;
    }
    if (typeof property_welded_cross_sections_classification_sheared !== "undefined") {
        this.addon.settings_gb50017.property_welded_cross_sections_classification_sheared = property_welded_cross_sections_classification_sheared;
    }
};

/**
 * Sets Classification of general sections acc. to tyb 7.2.1
 * @param {String} property_general_cross_sections_buckling_about_y_u   Buckling about y/u axis, can be undefined (is not set, C as default)
 * @param {String} property_general_cross_sections_buckling_about_z_v   Buckling about z/v axis, can be undefined (is not set, D as default)
 */
SteelDesignUltimateConfigurationGB.prototype.GeneralSections = function (property_general_cross_sections_buckling_about_y_u,
    property_general_cross_sections_buckling_about_z_v) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_general_cross_sections_buckling_about_y_u !== "undefined") {
        this.addon.settings_gb50017.property_general_cross_sections_buckling_about_y_u = GBBucklingAboutType(property_general_cross_sections_buckling_about_y_u);
    }
    if (typeof property_general_cross_sections_buckling_about_z_v !== "undefined") {
        this.addon.settings_gb50017.property_general_cross_sections_buckling_about_z_v = GBBucklingAboutType(property_general_cross_sections_buckling_about_z_v);
    }
};

/**
 * Sets Connections of Built-up sections with imaginary axes acc. to 7.2.3
 * @param {Number} property_effective_length_of_built_up_part_l1    Longitudinal distance of built-up sections joints, can be undefined (is not set, 0.200 as default)
 */
SteelDesignUltimateConfigurationGB.prototype.ImaginaryAxis1 = function (property_effective_length_of_built_up_part_l1) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_effective_length_of_built_up_part_l1 !== "undefined") {
        this.addon.settings_gb50017.property_effective_length_of_built_up_part_l1 = property_effective_length_of_built_up_part_l1;
    }
};

SteelDesignUltimateConfigurationGB.prototype.EquivalentMomentFactors = function (property_frame_column_y_u,
    property_frame_column_y_u_unbraced,
    property_unbraced_frame_column_beta_m_y_u,
    property_frame_column_y_u_braced,
    property_frame_column_z_v,
    property_frame_column_z_v_unbraced,
    property_unbraced_frame_column_beta_m_z_v,
    property_frame_column_z_v_braced,
    property_cantilever_beta_m_y_u,
    property_cantilever_beta_m_z_v) {
    ASSERT(this.addon.settings_gb50017.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_frame_column_y_u !== "undefined") {
        this.addon.settings_gb50017.property_frame_column_y_u = property_frame_column_y_u;
    }
    if (typeof property_frame_column_y_u_unbraced !== "undefined") {
        ASSERT(this.addon.settings_gb50017.property_frame_column_y_u, "Consider frame column in y/u-direction must be on");
        this.addon.settings_gb50017.property_frame_column_y_u_unbraced = property_frame_column_y_u_unbraced;
    }
    if (typeof property_unbraced_frame_column_beta_m_y_u !== "property_cantilever_beta_m_y_u") {
        ASSERT(this.addon.settings_gb50017.property_frame_column_y_u_unbraced, "Unbraced frame must be on");
        this.addon.settings_gb50017.property_unbraced_frame_column_beta_m_y_u = property_unbraced_frame_column_beta_m_y_u;
    }
    if (typeof property_frame_column_y_u_braced !== "undefined") {
        this.addon.settings_gb50017.property_frame_column_y_u_braced = property_frame_column_y_u_braced;
    }
    if (typeof property_frame_column_z_v !== "undefined") {
        this.addon.settings_gb50017.property_frame_column_z_v = property_frame_column_z_v;
    }
    if (typeof property_frame_column_z_v_unbraced !== "undefined") {
        ASSERT(this.addon.settings_gb50017.property_frame_column_z_v, "Consider frame column in z/v-direction must be on");
        this.addon.settings_gb50017.property_frame_column_z_v_unbraced = property_frame_column_z_v_unbraced;
    }
    if (typeof property_unbraced_frame_column_beta_m_z_v !== "undefined") {
        ASSERT(this.addon.settings_gb50017.property_frame_column_z_v_unbraced, "Unbraced frame must be on");
        this.addon.settings_gb50017.property_unbraced_frame_column_beta_m_z_v = property_unbraced_frame_column_beta_m_z_v;
    }
    if (typeof property_frame_column_z_v_braced !== "undefined") {
        this.addon.settings_gb50017.property_frame_column_z_v_braced = property_frame_column_z_v_braced;
    }
    if (typeof property_cantilever_beta_m_y_u !== "undefined") {
        this.addon.settings_gb50017.property_cantilever_beta_m_y_u = property_cantilever_beta_m_y_u;
    }
    if (typeof property_cantilever_beta_m_z_v !== "undefined") {
        this.addon.settings_gb50017.property_cantilever_beta_m_z_v = property_cantilever_beta_m_z_v;
    }
};

function GBBucklingAboutType(buckling_about_type) {
	const buckling_about_types_dict = {
        "A": member_ulsconfig_steel_design_gb50.E_BUCKLING_CLASS_A,
        "B": member_ulsconfig_steel_design_gb50.E_BUCKLING_CLASS_B,
        "C": member_ulsconfig_steel_design_gb50.E_BUCKLING_CLASS_C,
        "D": member_ulsconfig_steel_design_gb50.E_BUCKLING_CLASS_D
	};

	if (buckling_about_type !== undefined) {
		var type = buckling_about_types_dict[buckling_about_type];
		if (type === undefined) {
			console.log("Wrong type of GB buckling about type. Value was: " + buckling_about_type);
			console.log("Correct values are: ( " + Object.keys(buckling_about_types_dict) + ")");
			type = member_ulsconfig_steel_design_gb50.E_BUCKLING_CLASS_A;
		}
		return type;
	}
	else {
		return member_ulsconfig_steel_design_gb50.E_BUCKLING_CLASS_A;
	}
}