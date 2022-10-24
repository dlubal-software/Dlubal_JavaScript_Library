/*
Concrete material type - is there any API support for Strengths, Strains an Moduli values?
Steel material type - Correlation factor?
Timber material type - Strength, Moduli, Additional?
*/

/**
 * Create Material
 * @class
 * @constructor
 * @param {Number} no               Number of Material, can be undefined
 * @param {String} name             Name of Material, can be undefined
 * @param {String} basic_material   Basic material type, can be undefined (false as default)
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Parameters, can be undefined
 */
function Material(no,
    name,
    basic_material,
    comment,
    params) {
    var name = typeof name !== "undefined" ? name : "S235";
    this.material = engine.create_material(no);
    this.material.name = name;
    if (typeof basic_material !== "undefined") {
        this.material.material_type = GetMaterialType("BASIC");
    }
    set_comment_and_parameters(this.material, comment, params);
}

Material.prototype.No = function() {
    return this.material.no;
};

Material.prototype.Type = function() {
    return this.material.material_type;
};

/**
 * Sets base material properties
 * @param {Number} modulus_of_elasticity    Modulus of elasticity, can be undefined (value specified by default)
 * @param {Number} shear_modulus            Shear modulus, can be undefined (value specified by default)
 * @param {Number} definition_type          Definition type, can be undefined (value specified by default)
 * @param {Number} poisson_ratio            Poisson's ration, can be undefined (value specified by default)
 * @param {Number} specific_weight          Specific weight, can be undefined (value specified by default)
 * @param {Number} mass_density             Mass density, can be undefined (value specified by default)
 * @param {Number} thermal_coefficient      Coefficient of thermal expansion, can be undefined (value specified by default)
 * @returns Modified material
 */
Material.prototype.BasicProperties = function(modulus_of_elasticity,
    shear_modulus,
    definition_type,
    poisson_ratio,
    specific_weight,
    mass_density,
    thermal_coefficient) {
    this.material.user_defined = true;
    if (typeof modulus_of_elasticity !== "undefined") {
        this.material.elasticity_modulus_global = modulus_of_elasticity;
    }
    if (typeof shear_modulus !== "undefined") {
        this.material.shear_modulus_global = shear_modulus;
    }
    if (typeof definition_type !== "undefined") {
        this.material.definition_type = GetDefinitionType(definition_type);
    }
    if (typeof poisson_ratio !== "undefined") {
        this.material.poisson_ratio_global = poisson_ratio;
    }
    if (typeof specific_weight !== "undefined") {
        this.material.specific_weight = specific_weight;
    }
    if (typeof mass_density !== "undefined") {
        this.material.mass_density - mass_density;
    }
    if (typeof thermal_coefficient !== "undefined") {
        this.material.thermal_expansion_coefficient_global = thermal_coefficient;
    }
    return this.material;
};

Material.prototype.DefineConcreteMaterial = function(strains,
    moduli) {
    ASSERT(this.Type() === materials.TYPE_CONCRETE, "Only for material with Concrete type");
    this.material.user_defined = true;
    if (typeof strengths !== undefined) {
        ASSERT(Array.isArray(strengths), "Strengths must be in array format [fck, fcuk, fcm, fctm, fctk_0.05, fctk_0.95, nifc, taufc], undefined values are allowed");
        ASSERT(strengths.length >= 1, "At least Modulus of elasticity must be defined");
    }
    if (typeof strains !== "undefined") {
        ASSERT(Array.isArray(strains), "Strains must be in array format [epsilonc1, epsilon_c2, ni, epsilon_c1d, epsilon_c2d], undefined values are allowed");
        ASSERT(strains.length >= 1, "At least ")
    }
    if (typeof moduli !== "undefined") {

    }
    return this.material;
};

Material.prototype.DefineSteelMaterial = function (thickness_ranges,
    correlation_factor) {
    ASSERT(this.Type() === materials.TYPE_STEEL, "Only for material with Steel type");
    if (typeof thickness_ranges !== "undefined") {
        ASSERT(Array.isArray(thickness_ranges), "Thickness ranges must defined as array [[tmax1, fy1, fu1, tmax2, fy2, fu2, ...]]");
        ASSERT(thickness_ranges.length <= this.material.thickness_range_size, "Thickness range must not exceed " + this.material.thickness_range_size);
        for (var i = 0; i < thickness_ranges.length; ++i) {
            if (typeof thickness_ranges[i] != "undefined") {
                ASSERT(Array.isArray(thickness_ranges[i]));
                if (thickness_ranges[i][0] !== "undefined") {
                    this.material.maximum_thickness[i + 1] = thickness_ranges[i][0];
                }
                if (thickness_ranges[i + 1][1] !== "undefined") {
                    this.material.yield_strength_for_thickness = thickness_ranges[i][1];
                }
                if (thickness_ranges[i + 1][2] !== "undefined") {
                    this.material.ultimate_strength_for_thickness = thickness_ranges[i][2];
                }
            }
        }
    }
    if (typeof correlation_factor !== "undefined") {

    }
    return this.material;
};

Material.prototype.Timber = function (strengths,
    moduli,
    additional_information) {
    ASSERT(this.Type() === materials.TYPE_TIMBER, "Only for material with Timber type");
    if (typeof strengths !== "undefined") {
        ASSERT(Array.isArray(strengths), "Strength must be defined as array [fb, fv, ft, fc, fcp, fRk]");
        if (typeof strengths[0] !== "undefined") {
            this.material.masonry_compressive_strength = strengths[0];
        }
    }
    return this.material;
};

Material.prototype.Aluminum = function (thickness_range,
    tension_coefficient,
    temper) {
    ASSERT(this.Type() === materials.TYPE_ALUMINUM, "Only for material with Aluminum type");
    if (typeof thickness_range !== "undefined") {
        ASSERT(Array.isArray(thickness_range), "Thickness range must be specified as array");

    }
}

function GetMaterialType(material_type) {
    const material_types = {
        "BASIC" : materials.TYPE_BASIC,
        "CONCRETE" : materials.TYPE_CONCRETE,
        "METAL" : materials.TYPE_METAL,
        "TIMBER" : materials.TYPE_TIMBER,
        "ALUMINUM" : materials.TYPE_ALUMINUM,
        "MASONRY" : materials.TYPE_MASONRY,
        "GLASS" : materials.TYPE_GLASS,
        "FOIL" : materials.TYPE_FOIL,
        "GAS" : materials.TYPE_GAS,
        "REINFORCING_STEEL" : materials.TYPE_REINFORCING_STEEL,
        "STEEL" : materials.TYPE_STEEL,
        "SOIL" : materials.TYPE_SOIL,
        "FABRIC" : materials.TYPE_FABRIC
    };
    if (material_type !== "undefined") {
		if (!(material_type in material_types)) {
            console.log("Wrong material type. Value was: " + material_type);
			console.log("Correct values are: ( " + Object.keys(material_types) + ")");
			material_type = "BASIC";
        }
        return material_types[material_type];
	}
	else {
		return materials.TYPE_BASIC;
	}
}

function GetDefinitionType(definition_type) {
    const definition_types = {
        "DERIVED_NU" : materials.DERIVED_NU,
        "DERIVED_G" : materials.DERIVED_G,
        "E_G_NU" : materials.E_G_NU,
        "E_G_NO_NU" : materials.E_G_NO_NU,
        "NONE" : materials.NONE
    };
    if (definition_type !== "undefined") {
		if (!(definition_type in definition_types)) {
            console.log("Wrong definition type. Value was: " + definition_type);
			console.log("Correct values are: ( " + Object.keys(definition_types) + ")");
			definition_type = "NONE";
        }
        return definition_types[definition_type];
	}
	else {
		return materials.NONE;
	}
}