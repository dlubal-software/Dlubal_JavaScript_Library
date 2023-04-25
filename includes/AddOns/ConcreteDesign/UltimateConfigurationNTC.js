/*
API support is missing?
*/

/**
 * Creates Concrete design ultimate configuration (NTC standard)
 * @class
 * @constructor
 * @param {Number} no           Ultimate configuration number, can be undefined
 * @param {Array} surfaces_no   Assigned surfaces numbers, can be undefined
 * @param {Array} members_no    Assigned members numbers, can be undefined
 * @param {Array} nodes_no      Assigned nodes numbers, can be undefined
 * @param {String} comment      Comment, can be undefined
 * @param {Object} params       Additional parameters, can be undefined
 */
function ConcreteDesignUltimateConfigurationNTC (no,
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
ConcreteDesignUltimateConfigurationNTC.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Ultimate Configuration object
 */
ConcreteDesignUltimateConfigurationNTC.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Ultimate configuration name, can be undefined
 */
ConcreteDesignUltimateConfigurationNTC.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};