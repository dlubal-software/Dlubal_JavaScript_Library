/*
API support is missing.
*/

/**
 * Creates Steel Design Ultimate Configuration for NTC code of standard
 * @param {Number} no               Ultimate Configuration index, can be undefined
 * @param {Array} members_no        List of members assigned, can be undefined
 * @param {Array} member_sets_no    List of member sets assigned, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignUltimateConfigurationNTC (no,
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
SteelDesignUltimateConfigurationNTC.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
SteelDesignUltimateConfigurationNTC.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Fire resistance Configuration name, can be undefined
 */
SteelDesignUltimateConfigurationNTC.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};