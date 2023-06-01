if (RSECTION) {
	throw new Error("This script is only for RFEM or RSTAB.");
}

include("../ConcreteDesign/ConcreteDesignSupport.js");
include("../../Tools/jshlf_common_functions.js");

/**
 * Creates Concrete design Concrete durability
 * @param {Number} no               Concrete durability index, can be undefined
 * @param {Array} members_no        List of members indexes, can be undefined
 * @param {Array} surfaces_no       List of surfaces indexes, can be undefined
 * @param {Array} member_sets_no    List of member sets indexes, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function ConcreteDesignConcreteDurability (no,
    members_no,
    surfaces_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
    ASSERT(IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC"), "Concrete durability is enabled only for EN and NTC")
    if (typeof no === "undefined") {
        this.durability = concrete_durabilities.create();
    }
    else {
        this.durability = concrete_durabilities.create(no);
    }
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "Members list must be array of member indexes");
        member_list = members_no;
        members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                members_no.push(member_list[i]);
            }
            else {
                console.log("Member no. " + member_list[i] + " doesn't exist");
            }
        }
        this.durability.members = members_no;
    }
    if (typeof surfaces_no !== "undefined") {
        ASSERT(Array.isArray(surfaces_no), "Surfaces list must be array of member indexes");
        surfaces_list = surfaces_no;
        surfaces_no = [];
        for (var i = 0; i < surfaces_list.length; ++i) {
            if (surfaces.exist(surfaces_list[i])) {
                surfaces_no.push(surfaces_list[i]);
            }
            else {
                console.log("Surface no. " + surfaces_list[i] + " doesn't exist");
            }
        }
        this.durability.surfaces = surfaces_no;
    }
    if (typeof member_sets_no !== "undefined") {
        ASSERT(Array.isArray(member_sets_no), "Member sets list must be array of member sets indexes");
        member_sets_list = member_sets_no;
        member_sets_no = [];
        for (var i = 0; i < member_sets_list.length; ++i) {
            if (member_sets.exist(member_sets_list[i])) {
                member_sets_no.push(member_sets_list[i]);
            }
            else {
                console.log("Member set no. " + member_sets_list[i] + " doesn't exist");
            }
        }
        this.durability.member_sets = member_sets_no;
    }
    set_comment_and_parameters(this.durability, comment, params);
}

/**
 * @returns Concrete durability number
 */
ConcreteDesignConcreteDurability.prototype.GetNo = function () {
    return this.durability.no;
};

/**
 * @returns Concrete durability object
 */
ConcreteDesignConcreteDurability.prototype.ConcreteDurability = function () {
    return this.durability;
};

/**
 * Sets Name
 * @param {String} name     Name, can be undefined (when undefined, generated name is used)
 */
ConcreteDesignConcreteDurability.prototype.SetName = function (name) {
    if (typeof name !== "undefined") {
        this.durability.user_defined_name_enabled = true;
        this.durability.name = name;
    }
    else {
        this.durability.user_defined_name_enabled = false;
    }
};

/**
 * Sets no risk of corrosion or attack
 * @param {String} no_risk_of_corrosion_or_attack           No risk of corrosion or attack type (VERY_DRY), can be undefined (is not set, VERY_DRY as default)
 * @param {Boolean} no_risk_of_corrosion_or_attack_enabled  Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.NoRiskOfCorrosionOrAttack = function (no_risk_of_corrosion_or_attack,
    no_risk_of_corrosion_or_attack_enabled) {
    if (typeof no_risk_of_corrosion_or_attack_enabled === "undefined") {
        no_risk_of_corrosion_or_attack_enabled = true;
    }
    this.durability.no_risk_of_corrosion_or_attack_enabled = no_risk_of_corrosion_or_attack_enabled;
    if (typeof no_risk_of_corrosion_or_attack !== "undefined") {
        ASSERT(this.durability.no_risk_of_corrosion_or_attack_enabled, "No risk of corrosion or attack must be on");
        this.durability.no_risk_of_corrosion_or_attack = EnumValueFromJSHLFTypeName(
            no_risk_of_corrosion_or_attack,
            "no risk of corrosion or attack",
            {
                "VERY_DRY": concrete_durabilities.VERY_DRY
            },
            concrete_durabilities.VERY_DRY);
    }
};

/**
 * Sets Corrosion induced by carbonation
 * @param {String} corrosion_induced_by_carbonation             Corrosion induced by carbonation type (DRY_OR_PERMANENTLY_WET, WET_RARELY_DRY, MODERATE_HUMIDITY, CYCLIC_WET_AND_DRY), can be undefined (is not set, DRY_OR_PERMANENTLY_WET as default)
 * @param {Boolean} corrosion_induced_by_carbonation_enabled    Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.CorrosionInducedByCarbonation = function (corrosion_induced_by_carbonation,
    corrosion_induced_by_carbonation_enabled) {
    ASSERT(!this.durability.no_risk_of_corrosion_or_attack_enabled, "No risk of corrosion or attack must be off");
    if (typeof corrosion_induced_by_carbonation_enabled === "undefined") {
        corrosion_induced_by_carbonation_enabled = true;
    }
    this.durability.corrosion_induced_by_carbonation_enabled = corrosion_induced_by_carbonation_enabled;
    if (typeof corrosion_induced_by_carbonation !== "undefined") {
        ASSERT(this.durability.corrosion_induced_by_carbonation_enabled, "Corrosion induced by carbonation must be on");
        this.durability.corrosion_induced_by_carbonation = EnumValueFromJSHLFTypeName(
            corrosion_induced_by_carbonation,
            "risk of corrosion or attack",
            {
                "DRY_OR_PERMANENTLY_WET": concrete_durabilities.CORROSION_INDUCED_BY_CARBONATION_TYPE_DRY_OR_PERMANENTLY_WET,
                "WET_RARELY_DRY": concrete_durabilities.CORROSION_INDUCED_BY_CARBONATION_TYPE_WET_RARELY_DRY,
                "MODERATE_HUMIDITY": concrete_durabilities.CORROSION_INDUCED_BY_CARBONATION_TYPE_MODERATE_HUMIDITY,
                "CYCLIC_WET_AND_DRY": concrete_durabilities.CORROSION_INDUCED_BY_CARBONATION_TYPE_CYCLIC_WET_AND_DRY
            },
            concrete_durabilities.CORROSION_INDUCED_BY_CARBONATION_TYPE_DRY_OR_PERMANENTLY_WET);
    }
};

/**
 * Sets Corrosion induced by chlorides
 * @param {String} corrosion_induced_by_chlorides           Corrosion induced by chlorides (MODERATE_HUMIDITY, WET_RARELY_DRY, CYCLIC_WET_AND_DRY), can be undefined (is not set, MODERATE_HUMIDITY as default)
 * @param {Boolean} corrosion_induced_by_chlorides_enabled  Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.CorrosionInducedByChlorides = function (corrosion_induced_by_chlorides,
    corrosion_induced_by_chlorides_enabled) {
    ASSERT(!this.durability.no_risk_of_corrosion_or_attack_enabled, "No risk of corrosion or attack must be off");
    if (typeof corrosion_induced_by_chlorides_enabled === "undefined") {
        corrosion_induced_by_chlorides_enabled = true;
    }
    this.durability.corrosion_induced_by_chlorides_enabled = corrosion_induced_by_chlorides_enabled;
    if (typeof corrosion_induced_by_chlorides !== "undefined") {
        ASSERT(this.durability.corrosion_induced_by_chlorides_enabled, "Corrosion induced by chlorides must be on");
        this.durability.corrosion_induced_by_chlorides = EnumValueFromJSHLFTypeName(
            corrosion_induced_by_chlorides,
            "corrosion induced by chlorides",
            {
                "MODERATE_HUMIDITY": concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_TYPE_MODERATE_HUMIDITY,
                "WET_RARELY_DRY": concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_TYPE_WET_RARELY_DRY,
                "CYCLIC_WET_AND_DRY": concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_TYPE_CYCLIC_WET_AND_DRY
            },
            concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_TYPE_MODERATE_HUMIDITY);
    }
};

/**
 * Sets Corrosion induced by chlorides from sea water
 * @param {String} corrosion_induced_by_chlorides_from_sea_water            Corrosion induced by chlorides from sea water (AIRBORNE_SALT, PERMANENTLY_SUBMERGED, SPLASH_AND_SPRAY_ZONES), can be undefined (is not set, AIRBORNE_SALT as default)
 * @param {Boolean} corrosion_induced_by_chlorides_from_sea_water_enabled   Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.CorrosionInducedByChloridesFromSeaWater = function (corrosion_induced_by_chlorides_from_sea_water,
    corrosion_induced_by_chlorides_from_sea_water_enabled) {
    ASSERT(!this.durability.no_risk_of_corrosion_or_attack_enabled, "No risk of corrosion or attack must be off");
    if (typeof corrosion_induced_by_chlorides_from_sea_water_enabled === "undefined") {
        corrosion_induced_by_chlorides_from_sea_water_enabled = true;
    }
    this.durability.corrosion_induced_by_chlorides_from_sea_water_enabled = corrosion_induced_by_chlorides_from_sea_water_enabled;
    if (typeof corrosion_induced_by_chlorides_from_sea_water !== "undefined") {
        ASSERT(this.durability.corrosion_induced_by_chlorides_from_sea_water_enabled, "Corrosion induced by chlorides from sea water must be on");
        this.durability.corrosion_induced_by_chlorides_from_sea_water = EnumValueFromJSHLFTypeName(
            corrosion_induced_by_chlorides_from_sea_water,
            "corrosion induced by chlorides sea water",
            {
                "AIRBORNE_SALT": concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_FROM_SEA_WATER_TYPE_AIRBORNE_SALT,
                "PERMANENTLY_SUBMERGED": concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_FROM_SEA_WATER_TYPE_PERMANENTLY_SUBMERGED,
                "SPLASH_AND_SPRAY_ZONES": concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_FROM_SEA_WATER_TYPE_SPLASH_AND_SPRAY_ZONES
            },
            concrete_durabilities.CORROSION_INDUCED_BY_CHLORIDES_FROM_SEA_WATER_TYPE_AIRBORNE_SALT);
    }
};

/**
 * Sets Freeze/Thaw attack
 * @param {String} freeze_thaw_attack           Freeze/thaw attack (MODERATE_SATURATION_NO_DEICING, MODERATE_SATURATION_DEICING, HIGH_SATURATION_NO_DEICING, HIGH_SATURATION_DEICING), can be undefined (is not set, MODERATE_SATURATION_NO_DEICING as default)
 * @param {Boolean} freeze_thaw_attack_enabled  Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.FreezeThawAttack = function (freeze_thaw_attack,
    freeze_thaw_attack_enabled) {
    if (typeof freeze_thaw_attack_enabled === "undefined") {
        freeze_thaw_attack_enabled = true;
    }
    this.durability.freeze_thaw_attack_enabled = freeze_thaw_attack_enabled;
    if (typeof freeze_thaw_attack !== "undefined") {
        ASSERT(this.durability.freeze_thaw_attack_enabled, "Freeze/thaw attack must be on");
        this.durability.freeze_thaw_attack = EnumValueFromJSHLFTypeName(
            freeze_thaw_attack,
            "freeze/thaw attack",
            {
                "MODERATE_SATURATION_NO_DEICING": concrete_durabilities.FREEZE_THAW_ATTACK_TYPE_MODERATE_SATURATION_NO_DEICING,
                "MODERATE_SATURATION_DEICING": concrete_durabilities.FREEZE_THAW_ATTACK_TYPE_MODERATE_SATURATION_DEICING,
                "HIGH_SATURATION_NO_DEICING": concrete_durabilities.FREEZE_THAW_ATTACK_TYPE_HIGH_SATURATION_NO_DEICING,
                "HIGH_SATURATION_DEICING": concrete_durabilities.FREEZE_THAW_ATTACK_TYPE_HIGH_SATURATION_DEICING
            },
            concrete_durabilities.FREEZE_THAW_ATTACK_TYPE_MODERATE_SATURATION_NO_DEICING);
    }
};

/**
 * Sets Chemical attack
 * @param {String} chemical_attack              Chemical attack (SLIGHTLY_AGGRESSIVE, MODERATELY_AGGRESSIVE, HIGHLY_AGGRESSIVE), can be undefined (is not set, SLIGHTLY_AGGRESSIVE as default)
 * @param {Boolean} chemical_attack_enabled     Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.ChemicalAttack = function (chemical_attack,
    chemical_attack_enabled) {
    if (typeof chemical_attack_enabled === "undefined") {
        chemical_attack_enabled = true;
    }
    this.durability.chemical_attack_enabled = chemical_attack_enabled;
    if (typeof chemical_attack !== "undefined") {
        ASSERT(this.durability.chemical_attack_enabled, "Chemical attack must be on");
        this.durability.chemical_attack = EnumValueFromJSHLFTypeName(
            chemical_attack,
            "chemical attack",
            {
                "SLIGHTLY_AGGRESSIVE": concrete_durabilities.CHEMICAL_ATTACK_TYPE_SLIGHTLY_AGGRESSIVE,
                "MODERATELY_AGGRESSIVE": concrete_durabilities.CHEMICAL_ATTACK_TYPE_MODERATELY_AGGRESSIVE,
                "HIGHLY_AGGRESSIVE": concrete_durabilities.CHEMICAL_ATTACK_TYPE_HIGHLY_AGGRESSIVE
            },
            concrete_durabilities.CHEMICAL_ATTACK_TYPE_SLIGHTLY_AGGRESSIVE);
    }
};

/**
 * Sets Concrete corrosion induced by wear
 * @param {String} concrete_corrosion_induced_by_wear               Concrete corrosion induced ba wear (MODERATE, HIGH, VERY_HIGH), can be undefined (is not set, MODERATE as default)
 * @param {Boolean} concrete_corrosion_induced_by_wear_enabled      Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.ConcreteCorrosionInducedByWear = function (concrete_corrosion_induced_by_wear,
    concrete_corrosion_induced_by_wear_enabled) {
    if (typeof concrete_corrosion_induced_by_wear_enabled === "undefined") {
        concrete_corrosion_induced_by_wear_enabled = true;
    }
    this.durability.concrete_corrosion_induced_by_wear_enabled = concrete_corrosion_induced_by_wear_enabled;
    if (typeof concrete_corrosion_induced_by_wear !== "undefined") {
        ASSERT(this.durability.concrete_corrosion_induced_by_wear_enabled, "Concrete corrosion induced by wear must be on");
        this.durability.concrete_corrosion_induced_by_wear = EnumValueFromJSHLFTypeName(
            concrete_corrosion_induced_by_wear,
            "concrete corrosion induced by wear",
            {
                "MODERATE": concrete_durabilities.CONCRETE_CORROSION_INDUCED_BY_WEAR_TYPE_MODERATE,
                "HIGH": concrete_durabilities.CONCRETE_CORROSION_INDUCED_BY_WEAR_TYPE_HIGH,
                "VERY_HIGH": concrete_durabilities.CONCRETE_CORROSION_INDUCED_BY_WEAR_TYPE_VERY_HIGH
            },
            concrete_durabilities.CONCRETE_CORROSION_INDUCED_BY_WEAR_TYPE_MODERATE);
    }
};

/**
 * Sets Structural class according to 4.4.1.2(5)
 * @param {Boolean} increase_design_working_life_from_50_to_100_years_enabled                   Increase design working life from 50 to 100 years, can be undefined (is not set, false as default)
 * @param {Boolean} position_of_reinforcement_not_affected_by_construction_process_enabled      Position of reinforcement not affected by construction process (slab geometry), can be undefined (is not set, false as default)
 * @param {Boolean} special_quality_control_of_production_enabled                               Special quality control of the concrete production, can be undefined (is not set, false as default)
 * @param {Boolean} air_entrainment_of_more_than_4_percent_enabled                              Air entrainment of more then 4% according to 4.4.1.2(5), can be undefined (is not set, false as default)
 */
ConcreteDesignConcreteDurability.prototype.StructuralClassAccordingTo4_4_1_2 = function (increase_design_working_life_from_50_to_100_years_enabled,
    position_of_reinforcement_not_affected_by_construction_process_enabled,
    special_quality_control_of_production_enabled,
    air_entrainment_of_more_than_4_percent_enabled) {
    this.durability.allowance_of_deviation_type = concrete_durabilities.STANDARD;
    if (typeof increase_design_working_life_from_50_to_100_years_enabled !== "undefined") {
        this.durability.increase_design_working_life_from_50_to_100_years_enabled = increase_design_working_life_from_50_to_100_years_enabled;
    }
    if (typeof position_of_reinforcement_not_affected_by_construction_process_enabled !== "undefined") {
        this.durability.position_of_reinforcement_not_affected_by_construction_process_enabled = position_of_reinforcement_not_affected_by_construction_process_enabled;
    }
    if (typeof special_quality_control_of_production_enabled !== "undefined") {
        this.durability.special_quality_control_of_production_enabled = special_quality_control_of_production_enabled;
    }
    if (typeof air_entrainment_of_more_than_4_percent_enabled !== "undefined") {
        this.durability.air_entrainment_of_more_than_4_percent_enabled = air_entrainment_of_more_than_4_percent_enabled;
    }
};

/**
 * Sets User-defined structural class
 * @param {String} userdefined_structural_class     User-defined structural class (S1, S2, S3, S4, S5, S6), can be undefined  (is not set, S4 as default)
 */
ConcreteDesignConcreteDurability.prototype.StructuralClassUserDefined = function (userdefined_structural_class) {
    this.durability.structural_class_type = concrete_durabilities.DEFINED;
    this.durability.userdefined_structural_class = EnumValueFromJSHLFTypeName(
        userdefined_structural_class,
        "user defined structural class",
        {
            "S1": concrete_durabilities.S1,
            "S2": concrete_durabilities.S2,
            "S3": concrete_durabilities.S3,
            "S4": concrete_durabilities.S4,
            "S5": concrete_durabilities.S5,
            "S6": concrete_durabilities.S6
        },
        concrete_durabilities.S4);
};

/**
 * Sets Reduction of concrete cover for durability - Stainless steel
 * @param {String/Number} stainless_steel       Stainless steel (STANDARD - According to standard, or user-defined value), can be undefined (is not set, STANDARD as default)
 * @param {Boolean} stainless_steel_enabled     Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.StainlessSteel = function (stainless_steel,
    stainless_steel_enabled) {
    if (typeof stainless_steel_enabled === "undefined") {
        stainless_steel_enabled = true;
    }
    this.durability.stainless_steel_enabled = stainless_steel_enabled;
    if (typeof stainless_steel !== "undefined") {
        ASSERT(this.durability.stainless_steel_enabled, "Stainless steel must be on");
        if (typeof stainless_steel === "string") {
            ASSERT(stainless_steel === "STANDARD", "Stainless steel according to 4.4.1.2 must be of STANDARD type");
            this.durability.stainless_steel_type = concrete_durabilities.STANDARD;
        }
        else {
            ASSERT(typeof stainless_steel === "number", "Stainless steel must be user-defined value");
            this.durability.stainless_steel_type = concrete_durabilities.DEFINED;
            this.durability.stainless_steel_factor = stainless_steel;
        }
    }
};

/**
 * Sets Reduction of concrete cover for durability - Additional protection
 * @param {String/Number} additional_protection       Additional protection (STANDARD - According to standard, or user-defined value), can be undefined (is not set, STANDARD as default)
 * @param {Boolean} additional_protection_enabled     Enable/disable, can be undefined (true as default)
 */
ConcreteDesignConcreteDurability.prototype.AdditionalProtection = function (additional_protection,
    additional_protection_enabled) {
    if (typeof additional_protection_enabled === "undefined") {
        additional_protection_enabled = true;
    }
    this.durability.additional_protection_enabled = additional_protection_enabled;
    if (typeof additional_protection !== "undefined") {
        ASSERT(this.durability.additional_protection_enabled, "Additional protection must be on");
        if (typeof additional_protection === "string") {
            ASSERT(additional_protection === "STANDARD", "Additional protection according to 4.4.1.2 must be of STANDARD type");
            this.durability.additional_protection_type = concrete_durabilities.STANDARD;
        }
        else {
            ASSERT(typeof additional_protection === "number", "Additional standard according to 4.4.1.2 must be user-defined value");
            this.durability.additional_protection_type = concrete_durabilities.DEFINED;
            this.durability.additional_protection_factor = additional_protection;
        }
    }
};

/**
 * Sets Allowance for deviation
 * @param {String}  allowance_of_deviation_type                 Allowance for deviation (STANDARD, DEFINED)
 * @param {Boolean} concrete_cast_enabled                       Concrete cast against uneven surfaces according to 4.4.1.3(4), can be undefined (is not set, false as default)
 * @param {String} concrete_cast                                Concrete cast (AGAINST_PREPARED_GROUND, DIRECTLY_AGAINST_SOIL), can be undefined (is not set, AGAINST_PREPARED_GROUND as default)
 * @param {Number} userdefined_allowance_of_deviation_factor    User-defined allowance of deviation factor, can be undefined (is not set, 10 mm as default)
 */
ConcreteDesignConcreteDurability.prototype.AllowanceForDeviation = function (allowance_of_deviation_type,
    concrete_cast_enabled,
    concrete_cast,
    userdefined_allowance_of_deviation_factor) {
    this.durability.allowance_of_deviation_type = EnumValueFromJSHLFTypeName(
        allowance_of_deviation_type,
        "allowance of deviation type",
        {
            "STANDARD": concrete_durabilities.STANDARD,
            "DEFINED": concrete_durabilities.DEFINED
        },
        concrete_durabilities.STANDARD);
    if (typeof concrete_cast_enabled !== "undefined") {
        ASSERT(this.durability.allowance_of_deviation_type === concrete_durabilities.STANDARD, "According to 4.4.1.3 must be on");
        this.durability.concrete_cast_enabled = concrete_cast_enabled;
    }
    if (typeof concrete_cast !== "undefined") {
        ASSERT(this.durability.concrete_cast_enabled = concrete_cast_enabled, "Concrete cast against uneven surfaces must be on");
        this.durability.concrete_cast = EnumValueFromJSHLFTypeName(
            concrete_cast,
            "concrete cast",
            {
                "AGAINST_PREPARED_GROUND": concrete_durabilities.AGAINST_PREPARED_GROUND,
                "DIRECTLY_AGAINST_SOIL": concrete_durabilities.DIRECTLY_AGAINST_SOIL
            },
            concrete_durabilities.AGAINST_PREPARED_GROUND);
    }
    if (typeof userdefined_allowance_of_deviation_factor !== "undefined") {
        ASSERT(this.durability.allowance_of_deviation_type === concrete_durabilities.DEFINED, "User-defined allowance must be on");
        this.durability.userdefined_allowance_of_deviation_factor = userdefined_allowance_of_deviation_factor;
    }
};