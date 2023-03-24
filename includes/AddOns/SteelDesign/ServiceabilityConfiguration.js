/**
 * Creates Steel Design Serviceability Configuration
 * @param {Number} no               Serviceability Configuration index, can be undefined
 * @param {String} name             Serviceability Configuration name, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignServiceabilityConfiguration (no,
    name,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
    this.addon = createBaseSteelDesignConfiguration(STEEL_DESIGN.steel_design_sls_configurations, no, name, members_no, member_sets_no, comment, params);
}

/**
 * @returns Serviceability Configuration index
 */
SteelDesignServiceabilityConfiguration.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Serviceability Configuration object
 */
SteelDesignServiceabilityConfiguration.prototype.GetServiceabilityConfiguration = function () {
    return this.addon;
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit_characteristic            Beam limits - action combination, characteristic, can be undefined (is not set, 300 as default)
 * @param {Number} property_sl_beam_limit_frequent                  Beam limits - action combination, frequent, can be undefined (is not set, 200 as default)
 * @param {Number} property_sl_beam_limit_quasi_permanent           Beam limits - action combination, quasi-permanent, can be undefined (is not set, 200 as default)
 * @param {Number} property_sl_cantilever_limit_characteristic      Cantilever limits - action combination, characteristic, can be undefined (is not set, 150 as default)
 * @param {Number} property_sl_cantilever_limit_frequent            Cantilever limits - action combination, frequent, can be undefined (is not set, 100 as default)
 * @param {Number} property_sl_cantilever_limit_quasi_permanent     Cantilever limits - action combination, quasi-permanent, can be undefined (is not set, 100 as default)
 * @param {Number} property_vibration_design                        Vibration design, can be undefined (is not set, 5 mm as default)
 * @param {Boolean} property_lowb_design_of_steel_structure         Limitation of web breathing, Design as steel bridge structure acc. to EN 1993-2, 7.4, can be undefined (is not set, false as default)
 * @param {Boolean} property_lowb_road_bridge                       Limitation of web breathing, Road bridge, can be undefined (is not set, true as default) 
 * @param {Boolean} property_lowb_railway_bridge                    Limitation of web breathing, Railway bridge, can be undefined (is not set, false as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersEC3 = function (property_sl_beam_limit_characteristic,
    property_sl_beam_limit_frequent,
    property_sl_beam_limit_quasi_permanent,
    property_sl_cantilever_limit_characteristic,
    property_sl_cantilever_limit_frequent,
    property_sl_cantilever_limit_quasi_permanent,
    property_vibration_design,
    property_lowb_design_of_steel_structure,
    property_lowb_road_bridge,
    property_lowb_railway_bridge) {
    if (typeof property_sl_beam_limit_characteristic !== "undefined") {
        this.addon.settings_ec3.property_sl_beam_limit_characteristic = property_sl_beam_limit_characteristic;
    }
    if (typeof property_sl_beam_limit_frequent !== "undefined") {
        this.addon.settings_ec3.property_sl_beam_limit_frequent = property_sl_beam_limit_frequent;
    }
    if (typeof property_sl_beam_limit_quasi_permanent !== "undefined") {
        this.addon.settings_ec3.property_sl_beam_limit_quasi_permanent = property_sl_beam_limit_quasi_permanent;
    }
    if (typeof property_sl_cantilever_limit_characteristic !== "undefined") {
        this.addon.settings_ec3.property_sl_cantilever_limit_characteristic = property_sl_cantilever_limit_characteristic;
    }
    if (typeof property_sl_cantilever_limit_frequent !== "undefined") {
        this.addon.settings_ec3.property_sl_cantilever_limit_frequent = property_sl_cantilever_limit_frequent;
    }
    if (typeof property_sl_cantilever_limit_quasi_permanent !== "undefined") {
        this.addon.settings_ec3.property_sl_cantilever_limit_quasi_permanent = property_sl_cantilever_limit_quasi_permanent;
    }
    if (typeof property_vibration_design !== "undefined") {
        this.addon.settings_ec3.property_vibration_design = property_vibration_design;
    }
    if (typeof property_lowb_design_of_steel_structure !== "undefined") {
        this.addon.settings_ec3.property_lowb_design_of_steel_structure = property_lowb_design_of_steel_structure;
    }
    if (typeof property_lowb_road_bridge !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_lowb_design_of_steel_structure, "Design as steel bridge must be on");
        this.addon.settings_ec3.property_lowb_road_bridge = property_lowb_road_bridge;
    }
    if (typeof property_lowb_railway_bridge !== "undefined") {
        ASSERT(this.addon.settings_ec3.property_lowb_design_of_steel_structure, "Design as steel bridge must be on");
        this.addon.settings_ec3.property_lowb_railway_bridge = property_lowb_railway_bridge;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit           Beam limits, can be undefined (is not set, 360 as default)
 * @param {Number} property_sl_cantilever_limit     Cantilever limits, can be undefined (is not set, 180 as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersAISC = function (property_sl_beam_limit,
    property_sl_cantilever_limit) {
    if (typeof property_sl_beam_limit !== "undefined") {
        this.addon.settings_aisc.property_sl_beam_limit = property_sl_beam_limit;
    }
    if (typeof property_sl_cantilever_limit !== "undefined") {
        this.addon.settings_aisc.property_sl_cantilever_limit = property_sl_cantilever_limit;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit           Beam limits, can be undefined (is not set, 360 as default)
 * @param {Number} property_sl_cantilever_limit     Cantilever limits, can be undefined (is not set, 180 as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersIS = function (property_sl_beam_limit,
    property_sl_cantilever_limit) {
    if (typeof property_sl_beam_limit !== "undefined") {
        this.addon.settings_is.property_sl_beam_limit = property_sl_beam_limit;
    }
    if (typeof property_sl_cantilever_limit !== "undefined") {
        this.addon.settings_is.property_sl_cantilever_limit = property_sl_cantilever_limit;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit_value         Beam limits, can be undefined (is not set, 360 as default)
 * @param {Number} property_sl_cantilever_limit_value   Cantilever limits, can be undefined (is not set, 180 as default)
 * @param {Number} property_vibration_design            Vibration design, can be undefined (is not set, 5 mm as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersBS = function (property_sl_beam_limit_value,
    property_sl_cantilever_limit_value,
    property_vibration_design) {
    if (typeof property_sl_beam_limit_value !== "undefined") {
        this.addon.settings_bs5.property_sl_beam_limit_value = property_sl_beam_limit_value;
    }
    if (typeof property_sl_cantilever_limit_value !== "undefined") {
        this.addon.settings_bs5.property_sl_cantilever_limit_value = property_sl_cantilever_limit_value;
    }
    if (typeof property_vibration_design !== "undefined") {
        this.addon.settings_bs5.property_vibration_design = property_vibration_design;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit_characteristic_permanent_and_variable          Beam limits acc. to GB 50017, Annex B, permanent and variable, can be undefined (is not set, 1000 as default)
 * @param {Number} property_sl_beam_limit_characteristic_variable                        Beam limits acc. to GB 50017, Annex B, variable, can be undefined (is not set, 1000 as default)
 * @param {Number} property_sl_cantilever_limit_characteristic_permanent_and_variable    Cantilever limits acc. to GB 50017, Annex B, permanent and variable, can be undefined (is not set, 500 as default)
 * @param {Number} property_sl_cantilever_limit_characteristic_variable                  Cantilever limits acc. to GB 50017, Annex B, variable, can be undefined (is not set, 500 as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersGB = function (property_sl_beam_limit_characteristic_permanent_and_variable,
    property_sl_beam_limit_characteristic_variable,
    property_sl_cantilever_limit_characteristic_permanent_and_variable,
    property_sl_cantilever_limit_characteristic_variable) {
    if (typeof property_sl_beam_limit_characteristic_permanent_and_variable !== "undefined") {
        this.addon.settings_gb50017.property_sl_beam_limit_characteristic_permanent_and_variable = property_sl_beam_limit_characteristic_permanent_and_variable;
    }
    if (typeof property_sl_beam_limit_characteristic_variable !== "undefined") {
        this.addon.settings_gb50017.property_sl_beam_limit_characteristic_variable = property_sl_beam_limit_characteristic_variable;
    }
    if (typeof property_sl_cantilever_limit_characteristic_permanent_and_variable !== "undefined") {
        this.addon.settings_gb50017.property_sl_cantilever_limit_characteristic_permanent_and_variable = property_sl_cantilever_limit_characteristic_permanent_and_variable;
    }
    if (typeof property_sl_cantilever_limit_characteristic_variable !== "undefined") {
        this.addon.settings_gb50017.property_sl_cantilever_limit_characteristic_variable = property_sl_cantilever_limit_characteristic_variable;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit           Beam limits, can be undefined (is not set, 360 as default)
 * @param {Number} property_sl_cantilever_limit     Cantilever limits, can be undefined (is not set, 180 as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersCSA = function (property_sl_beam_limit,
    property_sl_cantilever_limit) {
    if (typeof property_sl_beam_limit !== "undefined") {
        this.addon.settings_csa.property_sl_beam_limit = property_sl_beam_limit;
    }
    if (typeof property_sl_cantilever_limit !== "undefined") {
        this.addon.settings_csa.property_sl_cantilever_limit = property_sl_cantilever_limit;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit_short_term_effects            Beam limits, short-term effects, can be undefined (is not set, 500 as default)
 * @param {Number} property_sl_beam_limit_long_term_effects             Beam limits, long-term effects, can be undefined (is not set, 250 as default)
 * @param {Number} property_sl_cantilever_limit_short_term_effects      Cantilever limits, short-term effects, can be undefined (is not set, 250 as default)
 * @param {Number} property_sl_cantilever_limit_long_term_effects       Cantilever effects, long-term effects, can be undefined (is not set, 125 as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersAS = function (property_sl_beam_limit_short_term_effects,
    property_sl_beam_limit_long_term_effects,
    property_sl_cantilever_limit_short_term_effects,
    property_sl_cantilever_limit_long_term_effects) {
    if (typeof property_sl_beam_limit_short_term_effects !== "undefined") {
        this.addon.settings_as4100.property_sl_beam_limit_short_term_effects = property_sl_beam_limit_short_term_effects;
    }
    if (typeof property_sl_beam_limit_long_term_effects !== "undefined") {
        this.addon.settings_as4100.property_sl_beam_limit_long_term_effects = property_sl_beam_limit_long_term_effects;
    }
    if (typeof property_sl_cantilever_limit_short_term_effects !== "undefined") {
        this.addon.settings_as4100.property_sl_cantilever_limit_short_term_effects = property_sl_cantilever_limit_short_term_effects;
    }
    if (typeof property_sl_cantilever_limit_long_term_effects !== "undefined") {
        this.addon.settings_as4100.property_sl_cantilever_limit_long_term_effects = property_sl_cantilever_limit_long_term_effects;
    }
};

/**
 * Sets Design parameters
 * @param {Number} property_sl_beam_limit           Beam limits, can be undefined (is not set, 360 as default)
 * @param {Number} property_sl_cantilever_limit     Cantilever limits, can be undefined (is not set, 180 as default)
 */
SteelDesignServiceabilityConfiguration.prototype.DesignParametersSP = function (property_sl_beam_limit,
    property_sl_cantilever_limit) {
    if (typeof property_sl_beam_limit !== "undefined") {
        this.addon.settings_sp16.property_sl_beam_limit = property_sl_beam_limit;
    }
    if (typeof property_sl_cantilever_limit !== "undefined") {
        this.addon.settings_sp16.property_sl_cantilever_limit = property_sl_cantilever_limit;
    }
};