/*
NO API support?
*/

function ConcreteDesignServiceabilityConfigurationNTC (no,
    surfaces_no,
    members_no,
    comment,
    params) {
    this.addon = createBaseConcreteDesignConfiguration(CONCRETE_DESIGN.concrete_design_sls_configurations, no, surfaces_no, members_no, undefined, comment, params);
}

/**
 * @returns Serviceability Configuration index
 */
ConcreteDesignServiceabilityConfigurationNTC.prototype.GetNo = function () {
    return this.addon.no;
};

/**
 * @returns Serviceability Configuration object
 */
ConcreteDesignServiceabilityConfigurationNTC.prototype.GetUltimateConfiguration = function () {
    return this.addon;
};

/**
 * Sets Name
 * @param {String} name     Serviceability configuration name, can be undefined
 */
ConcreteDesignServiceabilityConfigurationNTC.prototype.SetName = function (name) {
    ASSERT(typeof name !== "undefined", "Name must be specified");
    this.addon.name = name;
};