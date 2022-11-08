/**
 * Create Section
 * @class
 * @constructor
 * @param {Number} no               Number of the Section, can be undefined
 * @param {String} section_name     Name of the Section, can be undefined (IPE 300 by default)
 * @param {Number} material_no      Number of the material
 * @param {String} comment          Comment
 * @param {Object} params           Parameters
 * @returns Section
 */
function Section(no,
    section_name,
    material_no,
    comment,
    params) {
    var name = typeof section_name !== "undefined" ? section_name : "IPE 300";
    ASSERT(typeof material_no !== "undefined", "Material number must be set");
    if (!materials.exist(material_no)) {
        console.log("Material no. " + material_no + " doesn't exist");
    }
    this.section = engine.create_section(no, material_no);
    this.section.name = name;
    set_comment_and_parameters(this.section, comment, params);
}

/**
 * 
 * @returns Number of Section
 */
Section.prototype.GetNo = function() {
    return this.section.no;
};

Section.prototype.GetSection = function() {
    return this.section;
};



/**
 * Sets section type
 * @param {String} section_type     Section type
 * @returns Modified Section
 */
Section.prototype.SectionType = function(section_type) {
    ASSERT(section_type !== "undefined", "Section type must be defined");
    this.section.type = GetSectionType(section_type);
    return this.section;
};

/**
 * Sets manufacturing type
 * @param {String} manufacturing_type   Manufacturing type
 * @returns Modified Section
 */
Section.prototype.ManufacturingType = function(manufacturing_type) {
    ASSERT(typeof manufacturing_type !== "undefined", "Manufacturing type must be defined");
    if (manufacturing_type === "HOT_ROLLED") {
        ASSERT(this.section.type === sections.TYPE_STANDARDIZED_STEEL || this.section.type === sections.TYPE_PARAMETRIC_THIN_WALLED || this.section.type === sections.TYPE_PARAMETRIC_BARS, "Manufacturing type cannot be set for this section type");
    }
    else if (manufacturing_type === "SAWN") {
        ASSERT(this.section.type === sections.TYPE_STANDARDIZED_TIMBER, "Manufacturing type cannot be set for this section type");
    }
    else if (manufacturing_type === "WELDED") {
        ASSERT(this.section.type === sections.TYPE_PARAMETRIC_THIN_WALLED, "Manufacturing type cannot be set for this section type");
    }
    this.section.manufacturing_type = GetManufacturingType(manufacturing_type);
    return this.section;
};

/**
 * Sets Section properties
 * @param {Number} area_shear_y             Shear sectional areas, can be undefined
 * @param {Number} area_shear_z             Shear sectional areas, can be undefined
 * @param {Number} warping                  Warping, van be undefined
 * @param {Number} width_temperature_load   Width (for non-uniform temperature loads), can be undefined
 * @param {Number} depth_temperature_load   Depth (for non-uniform temperature loads), can be undefined
 * @returns Modified Section
 */
Section.prototype.SectionProperties = function (area_shear_y,
    area_shear_z,
    warping,
    width_temperature_load,
    depth_temperature_load) {
    if (typeof area_shear_y !== "undefined") {
        ASSERT(this.section.shear_stiffness_deactivated, "Shear stiffness is deactivated");
        this.section.area_shear_y = area_shear_y;
    }
    if (typeof area_shear_z !== "undefined") {
        ASSERT(this.section.shear_stiffness_deactivated, "Shear stiffness is deactivated");
        this.section.area_shear_z = area_shear_z;
    }
    if (typeof warping !== "undefined") {
        ASSERT(TORSIONAL_WARPING.isActive(), "Torsional Warping add-on must be active");
        ASSERT(!this.section.warping_stiffness_deactivated, "Warping stiffness must be enabled");
        this.section.warping = warping;
    }
    if (typeof width_temperature_load !== "undefined") {
        this.section.width_temperature_load = width_temperature_load;
    }
    if (typeof depth_temperature_load !== "undefined") {
        this.section.depth_temperature_load = depth_temperature_load;
    }
    return this.section;
};

/**
 * Deactivates shear stiffness
 * @param {Boolean} deactivated     Shear stiffness deactivation/activation, can be undefined (true as default)
 * @returns Modified Section
 */
Section.prototype.DeactivateShearStiffness = function (deactivated) {
    if (typeof deactivated === "undefined") {
        deactivated = true;
    }
    this.section.shear_stiffness_deactivated = deactivated;
    return this.section;
};

/**
 * Sets Section rotation
 * @param {Number} rotation_angle   Rotation angle
 * @returns Modified Section
 */
Section.prototype.Rotation = function (rotation_angle) {
    ASSERT(typeof rotation_angle !== "undefined", "Rotation angle must be defined");
    this.section.rotation_angle = rotation_angle;
    return this.section;
};

/**
 * Sets thin-walled model
 * @param {Boolean} thin_walled_model   Thin-walled model enabling/disabling, can be undefined (true as default)
 * @returns Modified Section
 */
Section.prototype.ThinWalledModel = function (thin_walled_model) {
    if (typeof thin_walled_model === "undefined") {
        thin_walled_model = true;
    }
    this.section.thin_walled_model = thin_walled_model;
    return this.section;
};

/**
 * Sets US notation for section properties
 * @param {Boolean} us_spelling_of_properties   US notation enabling/disabling, can be undefined (true as default)
 * @returns Modified Section
 */
Section.prototype.UsNotation = function (us_spelling_of_properties) {
    if (typeof us_spelling_of_properties === "undefined") {
        us_spelling_of_properties = true;
    }
    // us_spelling_of_properites - API name bug
    this.section.us_spelling_of_properites = us_spelling_of_properties;
    return this.section;
};

/**
 * Sets stress smoothing to avoid singularities
 * @param {Boolean} stress_smoothing_to_avoid_singularities     Stress smoothing enabling/disabling, can be undefined (true as default)
 * @returns Modified Section
 */
Section.prototype.StressSmoothing = function (stress_smoothing_to_avoid_singularities) {
    if (typeof stress_smoothing_to_avoid_singularities === "undefined") {
        stress_smoothing_to_avoid_singularities = true;
    }
    this.section.stress_smoothing_to_avoid_singularities = stress_smoothing_to_avoid_singularities;
    return this.section;
};

/**
 * Deactivates warping stiffness
 * @param {Boolean} deactivated   Warping stiffness deactivation/activation, can be undefined (true as default). Torsional Warping add-on must be active.
 * @returns Modified Section
 */
Section.prototype.DeactivateWarpingStiffness = function (deactivated) {
    ASSERT(TORSIONAL_WARPING.isActive(), "Torsional Warping add-on must be active");
    if (typeof deactivated === "undefined") {
        deactivated = true;
    }
    this.section.warping_stiffness_deactivated = deactivated;
    return this.section;
};

/**
 * Sets cost estimation
 * @param {Boolean} cost_estimation     Cost estimation apply from material enabling/disabling, can be undefined (true as default). Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @returns Modified Section
 */
Section.prototype.CostEstimation = function (cost_estimation) {
    ASSERT(COST_ESTIMATION.isActive(), "Optimization & Costs / CO2 Emission Estimation add-on must be active");
    if (typeof cost_estimation === "undefined") {
        cost_estimation = true;
    }
    this.section.has_cost_estimation = cost_estimation;
    return this.section;
};

/**
 * Sets Cost estimation values
 * @param {Number} member_weight    Member weight, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @param {Number} member_volume    Member volume, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @param {Number} member_surface   Member surface, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @param {Number} member_length    Member length, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @returns Modified Section
 */
Section.prototype.CostEstimationValues = function (member_weight,
    member_volume,
    member_surface,
    member_length) {
    ASSERT(COST_ESTIMATION.isActive(), "Optimization & Costs / CO2 Emission Estimation add-on must be active");
    ASSERT(this.section.has_cost_estimation, "Cost estimation must be enabled");
    if (typeof member_weight !== "undefined") {
        this.section.members_weight_active = true;
        this.members_weight_unit_cost = member_weight;
    }
    if (typeof member_volume !== "undefined") {
        this.section.members_volume_active = true;
        this.members_volume_unit_cost = member_volume;
    }
    if (typeof member_surface !== "undefined") {
        this.members_surface_active = true;
        this.members_surface_unit_cost = member_surface;
    }
    if (typeof member_length !== "undefined") {
        this.section.members_length_active = true;
        this.section.members_length_unit_cost = member_length;
    }
    return this.section;
};

/**
 * Sets estimation of CO2 emissions
 * @param {Boolean} emission_estimation     Estimation of CO2 emissions enabling/disabling, can be undefined (true as default). Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @returns Modified Section
 */
Section.prototype.EmissionEstimation = function (emission_estimation) {
    ASSERT(COST_ESTIMATION.isActive(), "Optimization & Costs / CO2 Emission Estimation add-on must be active");
    if (typeof emission_estimation === "undefined") {
        emission_estimation = true;
    }
    this.section.has_emissions_estimation = emission_estimation;
    return this.section;
};

/**
 * Sets Emission estimation values
 * @param {Number} member_weight    Member weight, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @param {Number} member_volume    Member volume, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @param {Number} member_surface   Member surface, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @param {Number} member_length    Member length, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @returns Modified Section
 */
Section.prototype.EmissionEstimationValues = function (member_weight,
    member_volume,
    member_surface,
    member_length) {
    ASSERT(COST_ESTIMATION.isActive(), "Optimization & Costs / CO2 Emission Estimation add-on must be active");
    ASSERT(this.section.has_emissions_estimation, "Estimation of CO2 emissions must be enabled");
    if (typeof member_weight !== "undefined") {
        this.section.emissions_estimation_apply_from_material = false;
        this.section.emissions_members_weight_active = true;
        this.section.emissions_members_weight_unit_cost = member_weight;
    }
    if (typeof member_volume !== "undefined") {
        this.section.emissions_estimation_apply_from_material = false;
        this.section.emissions_members_volume_active = true;
        this.section.emissions_members_volume_unit_cost = member_volume;
    }
    if (typeof member_surface !== "undefined") {
        this.section.emissions_estimation_apply_from_material = false;
        this.section.emissions_members_surface_active = true;
        this.section.emissions_members_surface_unit_cost = member_surface;
    }
    if (typeof member_length !== "undefined") {
        this.section.emissions_estimation_apply_from_material = false;
        this.section.emissions_members_length_active = true;
        this.section.emissions_members_length_unit_cost = member_length;
    }
    return this.section;
};

/**
 * Sets optimization
 * @param {Boolean} optimization    Optimization enabling/disabling, can be undefined (true as default). Optimization & Costs / CO2 Emission Estimation add-on must be active.
 * @returns Modified Section
 */
Section.prototype.Optimization = function (optimization) {
    ASSERT(COST_ESTIMATION.isActive(), "Optimization & Costs / CO2 Emission Estimation add-on must be active");
    if (typeof optimization === "undefined") {
        optimization = true;
    }
    this.section.optimization = optimization;
    return this.section;
};

function GetSectionType(section_type) {
    const section_types = {
        "STANDARDIZED_STEEL" : sections.TYPE_STANDARDIZED_STEEL,
        "STANDARDIZED_TIMBER" : sections.TYPE_STANDARDIZED_TIMBER,
        "PARAMETRIC_THIN_WALLED" : sections.TYPE_PARAMETRIC_THIN_WALLED,
        "PARAMETRIC_MASSIVE_I" : sections.TYPE_PARAMETRIC_MASSIVE_I,
        "PARAMETRIC_MASSIVE_II" : sections.TYPE_PARAMETRIC_MASSIVE_II,
        "PARAMETRIC_BARS" : sections.TYPE_PARAMETRIC_BARS,
        "BUILT_UP_STEEL" : sections.TYPE_BUILT_UP_STEEL,
        "BUILT_UP_TIMBER" : sections.TYPE_BUILT_UP_TIMBER,
        "BASIC" : sections.TYPE_BASIC,
        "GENERAL_BY_RSECTION" : sections.TYPE_GENERAL_BY_RSECTION,
        "PHASE" : sections.TYPE_PHASE
    };
    if (section_type !== "undefined") {
		if (!(section_type in section_types)) {
            console.log("Wrong section type. Value was: " + section_type);
			console.log("Correct values are: ( " + Object.keys(section_types) + ")");
			section_type = "STANDARDIZED_STEEL";
        }
        return section_types[section_type];
	}
	else {
		return sections.TYPE_STANDARDIZED_STEEL;
	}
}

function GetManufacturingType(manufacturing_type) {
    const manufacturing_types = {
        "HOT_ROLLED" : sections.MANUFACTURING_TYPE_HOT_ROLLED,
        "COLD_FORMED" : sections.MANUFACTURING_TYPE_COLD_FORMED,
        "WELDED" : sections.MANUFACTURING_TYPE_WELDED,
        "SAWN" : sections.MANUFACTURING_TYPE_SAWN,
        "NONE" : sections.MANUFACTURING_TYPE_NONE,
        "GLULAM" : sections.MANUFACTURING_TYPE_GLULAM
    };
    if (manufacturing_type !== "undefined") {
		if (!(manufacturing_type in manufacturing_types)) {
            console.log("Wrong manufacturing type. Value was: " + manufacturing_type);
			console.log("Correct values are: ( " + Object.keys(manufacturing_types) + ")");
			manufacturing_type = "HOT_ROLLED";
        }
        return manufacturing_types[manufacturing_type];
	}
	else {
		return sections.MANUFACTURING_TYPE_HOT_ROLLED;
	}
}
