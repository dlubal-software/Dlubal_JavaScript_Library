/*
property_material_final_temperature cannot be set??
*/

/**
 * Creates Steel Design Fire resistance Configuration
 * @param {Number} no               Fire resistance Configuration index, can be undefined
 * @param {String} name             Fire resistance Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignFireResistanceConfiguration (no,
    name,
    members_no,
    member_sets_no,
    comment,
    params) {
    this.addon = createBaseSteelDesignConfiguration(STEEL_DESIGN.steel_design_fr_configurations, no, name, members_no, member_sets_no, comment, params);
}

/**
 * @returns Fire resistance Configuration index
 */
SteelDesignFireResistanceConfiguration.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Fire resistance Configuration object
 */
SteelDesignFireResistanceConfiguration.prototype.GetFireResistanceConfiguration = function () {
    return this.addon;
};

/**
 * Defines final temperature
 * @param {String} property_define_final_temperature    Final temperature (MANUALLY, ANALYTICALLY), can be undefined (is not set, ANALYTICALLY as default)
 */
SteelDesignFireResistanceConfiguration.prototype.FinalTemperatureEC3 = function (property_define_final_temperature) {
    this.addon.settings_ec3.property_define_final_temperature = EC3FinalTemperature(property_define_final_temperature);
};

/**
 * Sets Fire design settings (Analytically final temperature must be set)
 * @param {Number} property_required_time_of_fire_resistance                        Required time of fire resistance, can be undefined (is not set, 15 min. by default)
 * @param {Number} property_time_interval_of_analysis                               Time interval of analysis, can be undefined (is not set, 5.000 s. by default)
 * @param {String} property_fire_exposure                                           Fire exposure (3_SIDES, ALL_SIDES), can be undefined (is not set, ALL_SIDES by default)
 * @param {Boolean} property_fire_exposure_3_sides_covered_width_calculated         Assume total width of section as covered, can be undefined (is not set, true as default)
 * @param {Boolean} property_fire_exposure_3_sides_covered_width_user_defined       Assume user-defined width of section as covered, can be undefined (is not set, false as default)
 * @param {Number} property_fire_exposure_3_sides_covered_width_user_defined_value  User-defined width, can be undefined (is not set, 0 s. as default)
 */
SteelDesignFireResistanceConfiguration.prototype.AnalyticallyDesignSettingsEC3 = function (property_required_time_of_fire_resistance,
    property_time_interval_of_analysis,
    property_fire_exposure,
    property_fire_exposure_3_sides_covered_width_calculated,
    property_fire_exposure_3_sides_covered_width_user_defined,
    property_fire_exposure_3_sides_covered_width_user_defined_value) {
    ASSERT(this.addon.settings_ec3.property_define_final_temperature === member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY, "Analytically final temperature must be on");
    if (typeof property_required_time_of_fire_resistance !== "undefined") {
        this.addon.settings_ec3.property_required_time_of_fire_resistance = property_required_time_of_fire_resistance;
    }
    if (typeof property_time_interval_of_analysis !== "undefined") {
        this.addon.settings_ec3.property_time_interval_of_analysis = property_time_interval_of_analysis;
    }
    this.addon.settings_ec3.property_fire_exposure = EC3FireExposure(property_fire_exposure);
    if (typeof property_fire_exposure_3_sides_covered_width_calculated !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_fire_exposure === member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_3_SIDES, "Fire exposure must be type of 3 Sides");
        this.addon.settings_ec3.property_fire_exposure_3_sides_covered_width_calculated = property_fire_exposure_3_sides_covered_width_calculated;
    }
    if (typeof property_fire_exposure_3_sides_covered_width_user_defined !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_fire_exposure === member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_3_SIDES, "Fire exposure must be type of 3 Sides");
        this.addon.settings_ec3.property_fire_exposure_3_sides_covered_width_user_defined = property_fire_exposure_3_sides_covered_width_user_defined;
    }
    if (typeof property_fire_exposure_3_sides_covered_width_user_defined_value !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_fire_exposure_3_sides_covered_width_user_defined, "User-defined width of section as covered must be set");
        this.addon.settings_ec3.property_fire_exposure_3_sides_covered_width_user_defined_value = property_fire_exposure_3_sides_covered_width_user_defined_value;
    }
};

/**
 * Sets Fire protection (Analytically final temperature must be set)
 * @param {String} property_protection_type         Protection type (CONTOUR, HOLLOW), can be undefined (is not set, CONTOUR as default)
 * @param {Number} property_unit_mass               Unit mass, can be undefined (is not set, 300.00 as default)
 * @param {Number} property_thermal_conductivity    Thermal conductivity, can be undefined (is not set, 0.120 as default)
 * @param {Number} property_specific_heat           Specific heat, can be undefined (is not set, 1200.0 as default)
 * @param {Number} property_thickness               Thickness, can be undefined (is not set, 10.0 as default)
 */
SteelDesignFireResistanceConfiguration.prototype.AnalyticallyFireProtectionEC3 = function (property_protection_type,
    property_unit_mass,
    property_thermal_conductivity,
    property_specific_heat,
    property_thickness) {
    ASSERT(this.addon.settings_ec3.property_define_final_temperature === member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY, "Analytically final temperature must be on");
    this.addon.settings_ec3.property_set_fire_protection_parameters = (typeof property_protection_type !== "undefined" && typeof property_unit_mass !== "undefined" && typeof property_thermal_conductivity !== "undefined" &&
        typeof property_specific_heat !== "undefined" && typeof property_thickness !== "undefined");
    this.addon.settings_ec3.property_protection_type = EC3FireProtection(property_protection_type);
    if (typeof property_unit_mass !== "undefined") {
        this.addon.settings_ec3.property_unit_mass = property_unit_mass;
    }
    if (typeof property_thermal_conductivity !== "undefined") {
        this.addon.settings_ec3.property_thermal_conductivity = property_thermal_conductivity;
    }
    if (typeof property_specific_heat !== "undefined") {
        this.addon.settings_ec3.property_specific_heat = property_specific_heat;
    }
    if (typeof property_thickness !== "undefined") {
        this.addon.settings_ec3.property_thickness = property_thickness;
    }
};

/**
 * Temperature curve for determination of temperature of gases (Analytically final temperature must be set)
 * @param {Boolean} property_standard_temperature_time_curve                Standard temperature-time curve, can be undefined (is not set, true as default)
 * @param {Boolean} property_external_fire_curve                            External fire curve, can be undefined (is not set, false as default)
 * @param {Boolean} property_hydrocarbon_curve                              Hydrocarbon curve, can be undefined (is not set, false as default)
 * @param {Number} property_coefficient_of_heat_transfer_by_convention      Coefficient of heat transfer by convection, can be undefined (is not set, 25 as default)
 */
SteelDesignFireResistanceConfiguration.prototype.AnalyticallyTemperatureCurveEC3 = function (property_standard_temperature_time_curve,
    property_external_fire_curve,
    property_hydrocarbon_curve,
    property_coefficient_of_heat_transfer_by_convention) {
    ASSERT(this.addon.settings_ec3.property_define_final_temperature === member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY, "Analytically final temperature must be on");
    if (typeof property_standard_temperature_time_curve !== "undefined") {
        this.addon.settings_ec3.property_standard_temperature_time_curve = property_standard_temperature_time_curve;
    }
    if (typeof property_external_fire_curve !== "undefined") {
        this.addon.settings_ec3.property_external_fire_curve = property_external_fire_curve;
    }
    if (typeof property_hydrocarbon_curve !== "undefined") {
        this.addon.settings_ec3.property_hydrocarbon_curve = property_hydrocarbon_curve;
    }
    if (typeof property_coefficient_of_heat_transfer_by_convention !== "undefined") {
        this.addon.settings_ec3.property_coefficient_of_heat_transfer_by_convention = property_coefficient_of_heat_transfer_by_convention;
    }
};

/**
 * Sets Thermal actions for temperature analysis (Analytically final temperature must be set)
 * @param {Number} property_configuration_factor                                                    Configuration factor, can be undefined (is not set, 1.000 as default)
 * @param {Number} property_surface_emissivity_of_carbon_steel_member                               Surface emissivity of carbon steel member, can be undefined (is not set, 0.700 as default)
 * @param {Number} property_surface_emissivity_of_stainless_steel_member                            Surface emissivity of stainless steel member, can be undefined (is not set, 0.400 as default)
 * @param {Number} property_emissivity_of_fire                                                      Emissivity of fire, can be undefined (is not set, 1.000 as default)
 * @param {Number} property_temperature_limit_of_galvanization_effect                               Galvanized surface of carbon steel member, Temperature limit of galvanization effect, can be undefined (is not set, 500 as default)
 * @param {Number} property_surface_emissivity_of_carbon_steel_member_with_temperature_below_limit  Galvanized surface of carbon steel member, Surface emissivity of carbon steel member with temperature below, can be undefined (is not set, 0.350 as default)
 */
SteelDesignFireResistanceConfiguration.prototype.AnalyticallyThermalActionsEC3 = function (property_configuration_factor,
    property_surface_emissivity_of_carbon_steel_member,
    property_surface_emissivity_of_stainless_steel_member,
    property_emissivity_of_fire,
    property_temperature_limit_of_galvanization_effect,
    property_surface_emissivity_of_carbon_steel_member_with_temperature_below_limit) {
    ASSERT(this.addon.settings_ec3.property_define_final_temperature === member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY, "Analytically final temperature must be on");
    if (typeof property_configuration_factor !== "undefined") {
        this.addon.settings_ec3.property_configuration_factor = property_configuration_factor;
    }
    if (typeof property_surface_emissivity_of_carbon_steel_member !== "undefined") {
        this.addon.settings_ec3.property_surface_emissivity_of_carbon_steel_member = property_surface_emissivity_of_carbon_steel_member;
    }
    if (typeof property_surface_emissivity_of_stainless_steel_member !== "undefined") {
        this.addon.settings_ec3.property_surface_emissivity_of_stainless_steel_member = property_surface_emissivity_of_stainless_steel_member;
    }
    if (typeof property_emissivity_of_fire !== "undefined") {
        this.addon.settings_ec3.property_emissivity_of_fire = property_emissivity_of_fire;
    }
    this.addon.settings_ec3.property_galvanized_surface_of_carbon_steel_member = (typeof property_temperature_limit_of_galvanization_effect !== "undefined" || typeof property_surface_emissivity_of_carbon_steel_member_with_temperature_below_limit !== "undefined");
    if (typeof property_temperature_limit_of_galvanization_effect !== "undefined") {
        this.addon.settings_ec3.property_temperature_limit_of_galvanization_effect = property_temperature_limit_of_galvanization_effect;
    }
    if (typeof property_surface_emissivity_of_carbon_steel_member_with_temperature_below_limit !== "undefined") {
        this.addon.settings_ec3.property_surface_emissivity_of_carbon_steel_member_with_temperature_below_limit = property_surface_emissivity_of_carbon_steel_member_with_temperature_below_limit;
    }
};

/**
 * Sets Manually final temperature
 * @param {Number} property_material_final_temperature      Material final temperature, can be undefined (is not set, 300 as default)
 * @param {String} property_fire_exposure                   Fire exposure (3_SIDES, ALL_SIDES), can be undefined (is not set, ALL_SIDES as default)
 * @param {Boolean} property_member_with_fire_protection    Member with fire protection, can be undefined (is not set, false as default)
 */
SteelDesignFireResistanceConfiguration.prototype.ManuallyFinalTemperatureEC3 = function (property_material_final_temperature,
    property_fire_exposure,
    property_member_with_fire_protection) {
    ASSERT(this.addon.settings_ec3.property_define_final_temperature === member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_MANUALLY, "Manually final temperature must be on");
    if (typeof property_material_final_temperature !== "undefined") {
        this.addon.settings_ec3.property_material_final_temperature = property_material_final_temperature;
    }
    this.addon.settings_ec3.property_fire_exposure = EC3FireExposure(property_fire_exposure);
    if (typeof property_member_with_fire_protection !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_fire_exposure === member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_3_SIDES, "Fire exposure 3 sides must be on");
        this.addon.settings_ec3.property_member_with_fire_protection = property_member_with_fire_protection;
    }
};

function EC3FinalTemperature(final_temperature_type) {
	const final_temperature_types_dict = {
        "MANUALLY": member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_MANUALLY,
        "ANALYTICALLY": member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY
	};

	if (final_temperature_type !== undefined) {
		var type = final_temperature_types_dict[final_temperature_type];
		if (type === undefined) {
			console.log("Wrong type of file temperature. Value was: " + final_temperature_type);
			console.log("Correct values are: ( " + Object.keys(final_temperature_types_dict) + ")");
			type = member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY;
		}
		return type;
	}
	else {
		return member_frconfig_steel_design_ec3.E_DEFINITION_OF_TEMPERATURE_ANALYTICALLY;
	}
}

function EC3FireExposure(fire_exposure_type) {
	const fire_exposure_types_dict = {
        "3_SIDES": member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_3_SIDES,
        "ALL_SIDES": member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_ALL_SIDES
	};

	if (fire_exposure_type !== undefined) {
		var type = fire_exposure_types_dict[fire_exposure_type];
		if (type === undefined) {
			console.log("Wrong type of fire exposure. Value was: " + fire_exposure_type);
			console.log("Correct values are: ( " + Object.keys(fire_exposure_types_dict) + ")");
			type = member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_ALL_SIDES;
		}
		return type;
	}
	else {
		return member_frconfig_steel_design_ec3.E_FIRE_EXPOSURE_ALL_SIDES;
	}
}

function EC3FireProtection(protection_type) {
	const protection_types_dict = {
        "CONTOUR": member_frconfig_steel_design_ec3.E_PROTECTION_TYPE_CONTOUR,
        "HOLLOW": member_frconfig_steel_design_ec3.E_PROTECTION_TYPE_HOLLOW
	};

	if (protection_type !== undefined) {
		var type = protection_types_dict[protection_type];
		if (type === undefined) {
			console.log("Wrong type of fire protection. Value was: " + protection_type);
			console.log("Correct values are: ( " + Object.keys(protection_types_dict) + ")");
			type = member_frconfig_steel_design_ec3.E_PROTECTION_TYPE_CONTOUR;
		}
		return type;
	}
	else {
		return member_frconfig_steel_design_ec3.E_PROTECTION_TYPE_CONTOUR;
	}
}