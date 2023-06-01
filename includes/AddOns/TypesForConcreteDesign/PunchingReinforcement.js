include("../../Tools/jshlf_common_functions.js");
include ("../ConcreteDesign/ConcreteDesignSupport.js");

/**
 * Creates Concrete design punching reinforcement
 * @param {Number} no               Concrete design punching reinforcement index, can be undefined
 * @param {Array} nodes_no          List of nodes indexes, can be undefined
 * @param {Array} material_no       Material number, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function ConcreteDesignPunchingReinforcement (no,
    nodes_no,
    material_no,
    comment,
    params) {
    ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
    if (typeof no === "undefined") {
        this.punching_reinforcement = punching_reinforcements.create();
    }
    else {
        this.punching_reinforcement = this.punching_reinforcements.create(no);
    }
    if (typeof nodes_no !== "undefined") {
        ASSERT(Array.isArray(nodes_no), "Nodes list must be array of nodes indexes");
        nodes_list = nodes_no;
        nodes_no = [];
        for (var i = 0; i < nodes_list.length; ++i) {
            if (nodes.exist(nodes_list[i])) {
                nodes_no.push(nodes_list[i]);
            }
            else {
                console.log("Node no. " + nodes_list[i] + " doesn't exist");
            }
        }
        this.punching_reinforcement.nodes = nodes_no;
    }
    this.punching_reinforcement.material = material_no;
    set_comment_and_parameters(this.punching_reinforcement, comment, params);
}

/**
 * @returns Punching reinforcement number
 */
ConcreteDesignPunchingReinforcement.prototype.GetNo = function () {
    return this.punching_reinforcement.no;
};

/**
 * @returns Punching reinforcement object
 */
ConcreteDesignPunchingReinforcement.prototype.SurfaceReinforcement = function () {
    return this.punching_reinforcement;
};

/**
 * Sets Name
 * @param {String} name     Name, can be undefined (when undefined, generated name is used)
 */
ConcreteDesignPunchingReinforcement.prototype.SetName = function (name) {
    if (typeof name !== "undefined") {
        this.punching_reinforcement.user_defined_name_enabled = true;
        this.punching_reinforcement.name = name;
    }
    else {
        this.punching_reinforcement.user_defined_name_enabled = false;
    }
};

/**
 * Sets type
 * @param {String} type     Type (VERTICAL)
 */
ConcreteDesignPunchingReinforcement.prototype.Type = function (type) {
    ASSERT(typeof type !== "undefined", "Type must be specified");
    this.punching_reinforcement.type = EnumValueFromJSHLFTypeName(
        type,
        "type",
        {
            "VERTICAL": punching_reinforcements.TYPE_VERTICAL
        },
        punching_reinforcements.TYPE_VERTICAL);
};

/**
 * Sets Placement
 * @param {String} placement_type   Placement (UNIFORM, AUTOMATICALLY)
 */
ConcreteDesignPunchingReinforcement.prototype.Placement = function (placement_type) {
    ASSERT(typeof placement_type !== "undefined", "Placement type must be specified");
    this.punching_reinforcement.placement_type = EnumValueFromJSHLFTypeName(
        placement_type,
        "placement type",
        {
            "UNIFORM": punching_reinforcements.PLACEMENT_TYPE_UNIFORM,
            "AUTOMATICALLY": punching_reinforcements.PLACEMENT_TYPE_AUTOMATICALLY
        },
        punching_reinforcements.PLACEMENT_TYPE_UNIFORM);
};

/**
 * sets Options
 * @param {Boolean} loading_area_for_single_forces_enabled              Load area for single forces, can be undefined (is not set, false as default)
 * @param {Boolean} longitudinal_reinforcement_from_surface_enabled     Longitudinal reinforcement from surface, can be undefined (is not set, true as default)
 */
ConcreteDesignPunchingReinforcement.prototype.Options = function (loading_area_for_single_forces_enabled,
    longitudinal_reinforcement_from_surface_enabled) {
    if (typeof loading_area_for_single_forces_enabled !== "undefined") {
        this.punching_reinforcement.loading_area_for_single_forces_enabled = loading_area_for_single_forces_enabled;
    }
    if (typeof longitudinal_reinforcement_from_surface_enabled !== "undefined") {
        this.punching_reinforcement.longitudinal_reinforcement_from_surface_enabled = longitudinal_reinforcement_from_surface_enabled;
    }
};

ConcreteDesignPunchingReinforcement.prototype.BendUpDiameter = function (bend_up_diameter) {
    ASSERT(typeof bend_up_diameter !== "undefined", "Bend-up diameter must be specified");
    if (typeof bend_up_diameter === "number") {
        this.punching_reinforcement.bend_up_diameter = bend_up_diameter;
    }
    else {
        ASSERT(typeof bend_up_diameter === "boolean", "Bend-up diameter must be of boolean type");
        this.punching_reinforcement.bend_up_diameter_set_automatically_enabled = bend_up_diameter;
    }
};