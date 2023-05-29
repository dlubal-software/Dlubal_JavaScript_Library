/*
Bug 93213 - Un-complete enums (values are missing): mesh_product_range, mesh_shape
*/

include("../../Tools/jshlf_common_functions.js");
include ("../ConcreteDesign/ConcreteDesignSupport.js");

function ConcreteDesignSurfaceReinforcement (no,
    surfaces_no,
    material_no,
    comment,
    params) {
    ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
    if (typeof no === "undefined") {
        this.surface_reinforcement = surface_reinforcements.create();
    }
    else {
        this.surface_reinforcement = this.surface_reinforcements.create(no);
    }
    if (typeof surfaces_no !== "undefined") {
        ASSERT(Array.isArray(surfaces_no), "Surfaces list must be array of surface indexes");
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
        this.surface_reinforcement.surfaces = surfaces_no;
    }
    this.surface_reinforcement.material = material_no;
    set_comment_and_parameters(this.surface_reinforcement, comment, params);
}

/**
 * @returns Surface reinforcement number
 */
ConcreteDesignSurfaceReinforcement.prototype.GetNo = function () {
    return this.surface_reinforcement.no;
};

/**
 * @returns Surface reinforcement object
 */
ConcreteDesignSurfaceReinforcement.prototype.SurfaceReinforcement = function () {
    return this.surface_reinforcement;
};

/**
 * Sets Name
 * @param {String} name     Name, can be undefined (when undefined, generated name is used)
 */
ConcreteDesignSurfaceReinforcement.prototype.SetName = function (name) {
    if (typeof name !== "undefined") {
        this.surface_reinforcement.user_defined_name_enabled = true;
        this.surface_reinforcement.name = name;
    }
    else {
        this.surface_reinforcement.user_defined_name_enabled = false;
    }
};

/**
 * Sets location type
 * @param {String} location_type    Location type (ON_SURFACE, FREE_RECTANGULAR, FREE_CIRCULAR, FREE_POLYGON)
 */
ConcreteDesignSurfaceReinforcement.prototype.LocationType = function (location_type) {
    ASSERT(typeof location_type !== "undefined", "Location type must be defined");
    this.surface_reinforcement.location_type = EnumValueFromJSHLFTypeName (
        location_type,
        "location",
        {
            "ON_SURFACE": surface_reinforcements.LOCATION_TYPE_ON_SURFACE,
            "FREE_RECTANGULAR": surface_reinforcements.LOCATION_TYPE_FREE_RECTANGULAR,
            "FREE_CIRCULAR": surface_reinforcements.LOCATION_TYPE_FREE_CIRCULAR,
            "FREE_POLYGON": surface_reinforcements.LOCATION_TYPE_FREE_POLYGON
        },
        surface_reinforcements.LOCATION_TYPE_ON_SURFACE);
};

/**
 * Sets Reinforcement type
 * @param {String} reinforcement_type   Reinforcement type (MESH, REBAR, STIRRUPS)
 */
ConcreteDesignSurfaceReinforcement.prototype.ReinforcementType = function (reinforcement_type) {
    ASSERT(typeof reinforcement_type !== "undefined", "Reinforcement type must be defined");
    this.surface_reinforcement.reinforcement_type = EnumValueFromJSHLFTypeName(
        reinforcement_type,
        "reinforcement",
        {
            "MESH": surface_reinforcements.REINFORCEMENT_TYPE_MESH,
            "REBAR": surface_reinforcements.REINFORCEMENT_TYPE_REBAR,
            "STIRRUPS": surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS
        },
        surface_reinforcements.REINFORCEMENT_TYPE_REBAR);
};

ConcreteDesignSurfaceReinforcement.prototype.Mesh = function (reinforcement_type) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_MESH, "Reinforcement type must be of mesh type");
    // Bug 93213 - Un-complete enums (values are missing): mesh_product_range, mesh_shape
};

/**
 * Sets Rebar diameter
 * @param {Number} rebar_diameter    Rebar diameter
 */
ConcreteDesignSurfaceReinforcement.prototype.RebarDiameter = function (value_1,
    value_2) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("SP")) {
        ASSERT(typeof value_1 !== "undefined", "Rebar diameter must be specified");
        this.surface_reinforcement.rebar_diameter_auto_enabled = false;
        this.surface_reinforcement.rebar_diameter = value_1;
    }
    else if (IsCurrentCodeOfStandard("ACI") || IsCurrentCodeOfStandard("CSA")) {

    }
    else {
        ASSERT("Code of standard " + GetCurrentCodeOfStandard() + " is not supported");
    }
};

/**
 * Sets Rebar diameter
 * @param {Number} rebar_spacing    Rebar spacing
 */
ConcreteDesignSurfaceReinforcement.prototype.RebarSpacing = function (rebar_spacing) {
    ASSERT(typeof rebar_spacing !== "undefined", "Rebar spacing must be specified");
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.rebar_spacing_auto_enabled = false;
    this.surface_reinforcement.rebar_spacing = rebar_spacing;
};

/**
 * Sets Rebar auto diameter (geometry, settings)
 * @param {Number} rebar_diameter_auto_minimum       Minimum diameter, can be undefined (is not set, 10 mm as default)
 * @param {Number} rebar_diameter_auto_maximum       Maximum diameter, can be undefined (is not set, 20 mm as default)
 * @param {String} rebar_diameter_auto_diameters     Diameters for reinforcement (e.g. '8.0, 10.0, 12.0 ...'), can be undefined
 * @param {Number} rebar_diameter_auto_priority      Priority, can be undefined (is not set, 1 as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.RebarDiameterAuto = function (rebar_diameter_auto_minimum,
    rebar_diameter_auto_maximum,
    rebar_diameter_auto_diameters,
    rebar_diameter_auto_priority) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.rebar_diameter_auto_enabled = true;
    if (typeof rebar_diameter_auto_minimum !== "undefined") {
        this.surface_reinforcement.rebar_diameter_auto_minimum = rebar_diameter_auto_minimum;
    }
    if (typeof rebar_diameter_auto_maximum !== "undefined") {
        this.surface_reinforcement.rebar_diameter_auto_maximum = rebar_diameter_auto_maximum;
    }
    if (typeof rebar_diameter_auto_diameters !== "undefined") {
        this.surface_reinforcement.rebar_diameter_auto_diameters_enabled = true;
        this.surface_reinforcement.rebar_diameter_auto_diameters = rebar_diameter_auto_diameters;
    }
    if (typeof rebar_diameter_auto_priority !== "undefined") {
        this.surface_reinforcement.rebar_diameter_auto_priority = rebar_diameter_auto_priority;
    }
};

/**
 * Sets Rebar auto diameter (geometry, settings)
 * @param {Number} rebar_spacing_auto_minimum       Minimum spacing, can be undefined (is not set, 0.1 m as default)
 * @param {Number} rebar_spacing_auto_maximum       Maximum spacing, can be undefined (is not set, 0.3 m as default)
 * @param {Number} rebar_spacing_auto_increment     Increment, can be undefined (is not set, 0.1 m as default)
 * @param {Number} rebar_spacing_auto_priority      Priority, can be undefined (is not set, 1 as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.RebarSpacingAuto = function (rebar_spacing_auto_minimum,
    rebar_spacing_auto_maximum,
    rebar_spacing_auto_increment,
    rebar_spacing_auto_priority) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.rebar_spacing_auto_enabled = true;
    if (typeof rebar_spacing_auto_minimum !== "undefined") {
        this.surface_reinforcement.rebar_spacing_auto_minimum = rebar_spacing_auto_minimum;
    }
    if (typeof rebar_spacing_auto_maximum !== "undefined") {
        this.surface_reinforcement.rebar_spacing_auto_maximum = rebar_spacing_auto_maximum;
    }
    if (typeof rebar_spacing_auto_increment !== "undefined") {
        this.surface_reinforcement.rebar_spacing_auto_increment = rebar_spacing_auto_increment;
    }
    if (typeof rebar_spacing_auto_priority !== "undefined") {
        this.surface_reinforcement.rebar_spacing_auto_priority = rebar_spacing_auto_priority;
    }
};

/**
 * Enabled/disabled Additional transverse reinforcement
 * @param {Boolean} additional_transverse_reinforcement_enabled     Enabled/disabled, can be undefined (true as default);
 */
ConcreteDesignSurfaceReinforcement.prototype.AdditionalTransverseReinforcement = function (additional_transverse_reinforcement_enabled) {
    if (typeof additional_transverse_reinforcement_enabled === "undefined") {
        additional_transverse_reinforcement_enabled = true;
    }
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.additional_transverse_reinforcement_enabled = additional_transverse_reinforcement_enabled;
};

/**
 * Sets Additional rebar diameter
 * @param {Number} additional_rebar_diameter    Additional rebar diameter
 */
ConcreteDesignSurfaceReinforcement.prototype.AdditionalRebarDiameter = function (value_1) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("SP")) {
        ASSERT(typeof value_1 !== "undefined", "Additional rebar diameter must be specified");
        this.surface_reinforcement.additional_transverse_reinforcement_enabled = true;
        this.surface_reinforcement.additional_rebar_diameter_auto_enabled = false;
        this.surface_reinforcement.additional_rebar_diameter = value_1;
    }
    else if (IsCurrentCodeOfStandard("ACI") || IsCurrentCodeOfStandard("CSA")) {

    }
    else {
        ASSERT("Code of standard " + GetCurrentCodeOfStandard() + " is not supported");
    }
};

/**
 * Sets Additional rebar spacing
 * @param {Number} additional_rebar_spacing     Additional rebar spacing
 */
ConcreteDesignSurfaceReinforcement.prototype.AdditionalRebarSpacing = function (additional_rebar_spacing) {
    ASSERT(typeof additional_rebar_spacing !== "undefined", "Additional rebar spacing must be specified");
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.additional_transverse_reinforcement_enabled = true;
    this.surface_reinforcement.additional_rebar_spacing_auto_enabled = false;
    this.surface_reinforcement.additional_rebar_spacing = additional_rebar_spacing;
};

/**
 * Sets Additional rebar auto diameter (geometry, settings)
 * @param {Number} additional_rebar_diameter_auto_minimum       Minimum diameter, can be undefined (is not set, 10 mm as default)
 * @param {Number} additional_rebar_diameter_auto_maximum       Maximum diameter, can be undefined (is not set, 20 mm as default)
 * @param {String} additional_rebar_diameter_auto_diameters     Diameters for reinforcement (e.g. '8.0, 10.0, 12.0, 14.0')
 * @param {Number} additional_rebar_diameter_auto_priority      Priority, can be undefined (is not set, 1 as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.AdditionalRebarDiameterAuto = function (additional_rebar_diameter_auto_minimum,
    additional_rebar_diameter_auto_maximum,
    additional_rebar_diameter_auto_diameters,
    additional_rebar_diameter_auto_priority) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.additional_transverse_reinforcement_enabled = true;
    this.surface_reinforcement.additional_rebar_diameter_auto_enabled = true;
    if (typeof additional_rebar_diameter_auto_minimum !== "undefined") {
        this.surface_reinforcement.additional_rebar_diameter_auto_minimum = additional_rebar_diameter_auto_minimum;
    }
    if (typeof additional_rebar_diameter_auto_maximum !== "undefined") {
        this.surface_reinforcement.additional_rebar_diameter_auto_maximum = additional_rebar_diameter_auto_maximum;
    }
    if (typeof additional_rebar_diameter_auto_diameters !== "undefined") {
        this.surface_reinforcement.additional_rebar_diameter_auto_diameters_enabled = true;
        this.surface_reinforcement.additional_rebar_diameter_auto_diameters = additional_rebar_diameter_auto_diameters;
    }
    if (typeof additional_rebar_diameter_auto_priority !== "undefined") {
        this.surface_reinforcement.additional_rebar_diameter_auto_priority = additional_rebar_diameter_auto_priority;
    }
};

/**
 * Sets Additional rebar auto spacing (geometry, settings)
 * @param {Number} additional_rebar_spacing_auto_minimum       Minimum spacing, can be undefined (is not set, 0.1 m as default)
 * @param {Number} additional_rebar_spacing_auto_maximum       Maximum diameter, can be undefined (is not set, 0.3 m as default)
 * @param {Number} additional_rebar_spacing_auto_increment     Increment, can be undefined (is not set, 0.010 m as default)
 * @param {Number} additional_rebar_spacing_auto_priority      Priority, can be undefined (is not set, 1 as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.AdditionalRebarSpacingAuto = function (additional_rebar_spacing_auto_minimum,
    additional_rebar_spacing_auto_maximum,
    additional_rebar_spacing_auto_increment,
    additional_rebar_spacing_auto_priority) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_REBAR, "Reinforcement type must be of rebar type");
    this.surface_reinforcement.additional_transverse_reinforcement_enabled = true;
    this.surface_reinforcement.additional_rebar_spacing_auto_enabled = true;
    if (typeof additional_rebar_spacing_auto_minimum !== "undefined") {
        this.surface_reinforcement.additional_rebar_spacing_auto_minimum = additional_rebar_spacing_auto_minimum;
    }
    if (typeof additional_rebar_spacing_auto_maximum !== "undefined") {
        this.surface_reinforcement.additional_rebar_spacing_auto_maximum = additional_rebar_spacing_auto_maximum;
    }
    if (typeof additional_rebar_spacing_auto_increment !== "undefined") {
        this.surface_reinforcement.additional_rebar_spacing_auto_increment = additional_rebar_spacing_auto_increment;
    }
    if (typeof additional_rebar_spacing_auto_priority !== "undefined") {
        this.surface_reinforcement.additional_rebar_spacing_auto_priority = additional_rebar_spacing_auto_priority;
    }
};

/**
 * Sets Stirrups diameter
 * @param {Number} stirrup_diameter     Stirrups diameter
 */
ConcreteDesignSurfaceReinforcement.prototype.StirrupsDiameter = function (value_1) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS, "Reinforcement must be of stirrups type");
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("SP")) {
        ASSERT(typeof value_1 !== "undefined", "Stirrups diameter must be specified");    
        this.surface_reinforcement.stirrup_diameter_auto_enabled = false;
        this.surface_reinforcement.stirrup_diameter = value_1;
    }
    else if (IsCurrentCodeOfStandard("ACI") || IsCurrentCodeOfStandard("CSA")) {

    }
    else {
        ASSERT("Code of standard " + GetCurrentCodeOfStandard() + " is not supported");
    }
};

/**
 * Sets Stirrups spacing
 * @param {Number} stirrup_spacing  Stirrups spacing
 */
ConcreteDesignSurfaceReinforcement.prototype.StirrupsSpacing = function (stirrup_spacing) {
    ASSERT(typeof stirrup_spacing !== "undefined", "Stirrups spacing must be specified");
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS, "Reinforcement must be of stirrups type");
    this.surface_reinforcement.stirrup_spacing_auto_enabled = false;
    this.surface_reinforcement.stirrup_spacing = stirrup_spacing;
};

/**
 * Sets Stirrups auto diameter (geometry, settings)
 * @param {Number} stirrup_diameter_auto_minimum        Minimum diameter, can be undefined (is not set, 10 mm as default)
 * @param {Number} stirrup_diameter_auto_maximum        Maximum diameter, can be undefined (is not set, 20 mm as default)
 * @param {String} stirrup_diameter_auto_diameters      Diameters for reinforcement (e.g. '8.0, 10.0, 12.0 ...'), can be undefined
 * @param {Number} stirrup_diameter_auto_priority       Priority, can be undefined (is not set, 1 as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.StirrupsDiameterAuto = function (stirrup_diameter_auto_minimum,
    stirrup_diameter_auto_maximum,
    stirrup_diameter_auto_diameters,
    stirrup_diameter_auto_priority) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS, "Reinforcement must be of stirrups type");
    this.surface_reinforcement.stirrup_diameter_auto_enabled = true;
    if (typeof stirrup_diameter_auto_minimum !== "undefined") {
        this.surface_reinforcement.stirrup_diameter_auto_minimum = stirrup_diameter_auto_minimum;
    }
    if (typeof stirrup_diameter_auto_maximum !== "undefined") {
        this.surface_reinforcement.stirrup_diameter_auto_maximum = stirrup_diameter_auto_maximum;
    }
    if (typeof stirrup_diameter_auto_diameters !== "undefined") {
        this.surface_reinforcement.stirrup_diameter_auto_diameters_enabled = true;
        this.surface_reinforcement.stirrup_diameter_auto_diameters = stirrup_diameter_auto_diameters;
    }
    if (typeof stirrup_diameter_auto_priority !== "undefined") {
        this.surface_reinforcement.stirrup_diameter_auto_priority = stirrup_diameter_auto_priority;
    }
};

/**
 * Sets Stirrups auto spacing (geometry, settings)
 * @param {Number} stirrup_spacing_auto_minimum         Minimum spacing, can be undefined (is not set, 0.1 m as default)
 * @param {Number} stirrup_spacing_auto_maximum         Maximum spacing, can be undefined (is not set, 0.3 m as default)
 * @param {Number} stirrup_spacing_auto_increment       Increment, can be undefined (is not set, 0.01 m as default)
 * @param {Number} stirrup_spacing_auto_priority        Priority, can be undefined (is not set, 1 as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.StirrupsSpacingAuto = function (stirrup_spacing_auto_minimum,
    stirrup_spacing_auto_maximum,
    stirrup_spacing_auto_increment,
    stirrup_spacing_auto_priority) {
    ASSERT(this.surface_reinforcement.reinforcement_type === surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS, "Reinforcement must be of stirrups type");
    this.surface_reinforcement.stirrup_spacing_auto_enabled = true;
    if (typeof stirrup_spacing_auto_minimum !== "undefined") {
        this.surface_reinforcement.stirrup_spacing_auto_minimum = stirrup_spacing_auto_minimum;
    }
    if (typeof stirrup_spacing_auto_maximum !== "undefined") {
        this.surface_reinforcement.stirrup_spacing_auto_maximum = stirrup_spacing_auto_maximum;
    }
    if (typeof stirrup_spacing_auto_increment !== "undefined") {
        this.surface_reinforcement.stirrup_spacing_auto_increment = stirrup_spacing_auto_increment;
    }
    if (typeof stirrup_spacing_auto_priority !== "undefined") {
        this.surface_reinforcement.stirrup_spacing_auto_priority = stirrup_spacing_auto_priority;
    }
};

/**
 * Sets Assignments
 * @param {Number} additional_offset_to_concrete_cover_top      Additional offset to concrete cover, Top (-z), can be undefined (if not set, top (-z) and 0.0 mm are set)
 * @param {Number} additional_offset_to_concrete_cover_bottom   Additional offset to concrete cover, Top (-z), can be undefined (if not set, top (-z) and 0.0 mm are set)
 */
ConcreteDesignSurfaceReinforcement.prototype.Assignment = function (additional_offset_to_concrete_cover_top,
    additional_offset_to_concrete_cover_bottom) {
    ASSERT(this.surface_reinforcement.reinforcement_type !== surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS, "Assignment can't be set for stirrups reinforcement type");
    ASSERT(typeof additional_offset_to_concrete_cover_top !== "undefined" || typeof additional_offset_to_concrete_cover_bottom !== "undefined", "Offset to concrete top or bottom must be specified");
    var both_values = typeof additional_offset_to_concrete_cover_top !== "undefined" && typeof additional_offset_to_concrete_cover_bottom !== "undefined";
    var top_value = !both_values && typeof additional_offset_to_concrete_cover_top !== "undefined";
    var bottom_value = !both_values && typeof additional_offset_to_concrete_cover_bottom !== "undefined";
    if (top_value) {
        this.surface_reinforcement.assigned_to_side = surface_reinforcements.ASSIGNED_TO_SIDE_TOP;
    }
    if (bottom_value) {
        this.surface_reinforcement.assigned_to_side = surface_reinforcements.ASSIGNED_TO_SIDE_BOTTOM;
    }
    if (both_values) {
        this.surface_reinforcement.assigned_to_side = surface_reinforcements.ASSIGNED_TO_SIDE_TOP_AND_BOTTOM;
    }
    if (both_values || top_value) {
        this.surface_reinforcement.additional_offset_to_concrete_cover_top = additional_offset_to_concrete_cover_top;
    }
    if (both_values || bottom_value) {
        this.surface_reinforcement.additional_offset_to_concrete_cover_bottom = additional_offset_to_concrete_cover_bottom;
    }
};

/**
 * Sets Reinforcement direction
 * @param {String} reinforcement_direction_type     Reinforcement direction (IN_DESIGN_REINFORCEMENT_DIRECTION, PARALLEL_TO_TWO_POINTS), can be undefined (is not set, IN_DESIGN_REINFORCEMENT_DIRECTION as default)
 * @param {String} design_reinforcement_direction   In reinforcement direction of design (A_S_1, A_S_2), can be undefined (if direction type IN_DESIGN_REINFORCEMENT_DIRECTION and direction of design is not set, A_S_1 as default)
 * @param {Number} first_direction_point_1          Parallel to two points - AX, can be undefined
 * @param {Number} first_direction_point_2          Parallel to two points - AY, can be undefined
 * @param {Number} second_direction_point_1         Parallel to two points - BX, can be undefined
 * @param {Number} second_direction_point_2         Parallel to two points - BY, can be undefined
 */
ConcreteDesignSurfaceReinforcement.prototype.ReinforcementDirection = function (reinforcement_direction_type,
    design_reinforcement_direction,
    first_direction_point_1,
    first_direction_point_2,
    second_direction_point_1,
    second_direction_point_2) {
    ASSERT(this.surface_reinforcement.reinforcement_type !== surface_reinforcements.REINFORCEMENT_TYPE_STIRRUPS, "Assignment can't be set for stirrups reinforcement type");
    this.surface_reinforcement.reinforcement_direction_type = EnumValueFromJSHLFTypeName(
        reinforcement_direction_type,
        "reinforcement direction type",
        {
            "IN_DESIGN_REINFORCEMENT_DIRECTION": surface_reinforcements.REINFORCEMENT_DIRECTION_TYPE_IN_DESIGN_REINFORCEMENT_DIRECTION,
            "PARALLEL_TO_TWO_POINTS": surface_reinforcements.REINFORCEMENT_DIRECTION_TYPE_PARALLEL_TO_TWO_POINTS
        },
        surface_reinforcements.REINFORCEMENT_DIRECTION_TYPE_IN_DESIGN_REINFORCEMENT_DIRECTION);
    if (this.surface_reinforcement.reinforcement_direction_type === surface_reinforcements.REINFORCEMENT_DIRECTION_TYPE_IN_DESIGN_REINFORCEMENT_DIRECTION) {
        this.surface_reinforcement.design_reinforcement_direction = EnumValueFromJSHLFTypeName(
            design_reinforcement_direction,
            "reinforcement direction",
            {
                "A_S_1": surface_reinforcements.DESIGN_REINFORCEMENT_DIRECTION_A_S_1,
                "A_S_2": surface_reinforcements.DESIGN_REINFORCEMENT_DIRECTION_A_S_2
            },
            surface_reinforcements.DESIGN_REINFORCEMENT_DIRECTION_A_S_1);
    }
    else {
        ASSERT(first_direction_point_1 !== second_direction_point_1 && first_direction_point_2 !== second_direction_point_2, "The entered points cannot be identical");
        if (typeof first_direction_point_1 !== "undefined") {
            this.surface_reinforcement.first_direction_point_1 = first_direction_point_1;
        }
        if (typeof first_direction_point_2 !== "undefined") {
            this.surface_reinforcement.first_direction_point_2 = first_direction_point_2;
        }
        if (typeof second_direction_point_1 !== "undefined") {
            this.surface_reinforcement.second_direction_point_1 = second_direction_point_1;
        }
        if (typeof second_direction_point_2 !== "undefined") {
            this.surface_reinforcement.second_direction_point_2 = second_direction_point_2;
        }
    }
};

/**
 * Sets Projection
 * @param {Number} projection_coordinate_system     Coordination system, can be undefined (is not set, 1 as default - if any)
 * @param {String} projection_plane                 Projection (XY_OR_UV, YZ_OR_VW, XZ_OR_UW), can be undefined (is ot set, XY_OR_UV as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.Projection = function (projection_coordinate_system,
    projection_plane) {
    if (typeof projection_coordinate_system !== "undefined") {
        if (coordinate_systems.exist(projection_coordinate_system)) {
            this.surface_reinforcement.projection_coordinate_system = projection_coordinate_system;
        }
        else {
            console.log("Coordination system no. " + projection_coordinate_system + " doesnt exist");
        }
    }
    this.surface_reinforcement.projection_plane = EnumValueFromJSHLFTypeName(
        projection_plane,
        "projection plane",
        {
            "XY_OR_UV": surface_reinforcements.PROJECTION_PLANE_XY_OR_UV,
            "YZ_OR_VW": surface_reinforcements.PROJECTION_PLANE_YZ_OR_VW,
            "XZ_OR_UW": surface_reinforcements.PROJECTION_PLANE_XZ_OR_UW
        },
        surface_reinforcements.PROJECTION_PLANE_XY_OR_UV);
};

/**
 * Sets Reinforcement location
 * @param {String} location_rectangle_type  Location rectangle type (CORNER_POINTS, CENTER_AND_SIDES), can be undefined (is not set, CORNER_POINTS as default)
 * @param {Number} value_1                  X1 (CORNER_POINTS) / CX (CENTER_AND_SIDES)
 * @param {Number} value_2                  Y1 (CORNER_POINTS) / CY (CENTER_AND_SIDES)
 * @param {Number} value_3                  X2 (CORNER_POINTS) / center side a (CENTER_AND_SIDES)
 * @param {Number} value_4                  Y2 (CORNER_POINTS) / center side b (CENTER_AND_SIDES)
 * @param {Number} location_rotation        Rectangle rotation about Z
 */
ConcreteDesignSurfaceReinforcement.prototype.ReinforcementLocationFreeRectangular = function (location_rectangle_type,
    value_1,
    value_2,
    value_3,
    value_4,
    location_rotation) {
    ASSERT(this.surface_reinforcement.location_type === surface_reinforcements.LOCATION_TYPE_FREE_RECTANGULAR, "Reinforcement location can be set only for FREE_RECTANGULAR location type");
    this.surface_reinforcement.location_rectangle_type = EnumValueFromJSHLFTypeName(
        location_rectangle_type,
        "location rectangle type",
        {
            "CORNER_POINTS": surface_reinforcements.RECTANGLE_TYPE_CORNER_POINTS,
            "CENTER_AND_SIDES": surface_reinforcements.RECTANGLE_TYPE_CENTER_AND_SIDES
        },
        surface_reinforcements.RECTANGLE_TYPE_CORNER_POINTS);
    ASSERT(typeof value_1 !== "undefined" && typeof value_2 !== "undefined" && typeof value_3 !== "undefined" && typeof value_4 !== "undefined", "Location values must be specified");
    if (this.surface_reinforcement.location_rectangle_type === surface_reinforcements.RECTANGLE_TYPE_CORNER_POINTS) {
        this.surface_reinforcement.location_first_x = value_1;
        this.surface_reinforcement.location_first_y = value_2;
        this.surface_reinforcement.location_second_x = value_3;
        this.surface_reinforcement.location_second_y = value_4;
    }
    else {
        ASSERT(this.surface_reinforcement.location_rectangle_type === surface_reinforcements.RECTANGLE_TYPE_CENTER_AND_SIDES, "ReinforcementLocation");
        this.surface_reinforcement.location_center_x = value_1;
        this.surface_reinforcement.location_center_y = value_2;
        this.surface_reinforcement.location_center_side_a = value_3;
        this.surface_reinforcement.location_center_side_b = value_4;
    }
    if (typeof location_rotation !== "undefined") {
        this.surface_reinforcement.location_rotation = location_rotation;
    }
};

/**
 * Sets Reinforcement action region
 * @param {Number} acting_region_from   From, can be undefined (is not set, infinity as default)
 * @param {Number} acting_region_to     To, can be undefined (is not set, infinity as default)
 */
ConcreteDesignSurfaceReinforcement.prototype.ReinforcementActionRegion = function (acting_region_from,
    acting_region_to) {
    ASSERT(this.surface_reinforcement.location_type !== surface_reinforcements.LOCATION_TYPE_ON_SURFACE, "Reinforcement action region can't be set for ON_SURFACE location type");
    if (typeof acting_region_from !== "undefined") {
        this.surface_reinforcement.acting_region_from = acting_region_from;
    }
    if (typeof acting_region_to !== "undefined") {
        this.surface_reinforcement.acting_region_to = acting_region_to;
    }
};

ConcreteDesignSurfaceReinforcement.prototype.ReinforcementLocationFreeCircular = function (location_center_x,
    location_center_y,
    location_radius) {
    ASSERT(this.surface_reinforcement.location_type === surface_reinforcements.LOCATION_TYPE_FREE_CIRCULAR, "Reinforcement location can be set only for FREE_CIRCULAR location type");
    ASSERT(location_radius !== "undefined", "Location radius must be specified");
    if (typeof location_center_x !== "undefined") {
        this.surface_reinforcement.location_center_x = location_center_x;
    }
    if (typeof location_center_y !== "undefined") {
        this.surface_reinforcement.location_center_y = location_center_y;
    }
    this.surface_reinforcement.location_radius = location_radius;
};

/**
 * Sets Reinforcement location
 * @param {Array} polygon_points    Polygon points ([[X1, Y1, (Comment1)], [X2, Y2, (Comment2)], ... [Xn, Yn, (Commentn)]]), at least coordinations must be specified
 */
ConcreteDesignSurfaceReinforcement.prototype.ReinforcementLocationFreePolygon = function (polygon_points) {
    ASSERT(this.surface_reinforcement.location_type === surface_reinforcements.LOCATION_TYPE_FREE_POLYGON, "Reinforcement location can be set only for FREE_POLYGON location type");
    ASSERT(typeof polygon_points !== "undefined", "Polygon points must be specified ([[X1, Y1, (Comment1)], [X2, Y2, (Comment2)], ... [Xn, Yn, (Commentn)]])");
    ASSERT(polygon_points.length >= 3, "At least three coordinates must be specified");
    for (var i = 0; i < polygon_points.length; ++i) {
        ASSERT(polygon_points.length >= 2, "At least coordination (X1, Y1) must be specified");
        this.surface_reinforcement.polygon_points[i + 1].first_coordinate = polygon_points[i][0];
        this.surface_reinforcement.polygon_points[i + 1].second_coordinate = polygon_points[i][1];
        if (typeof polygon_points[2] !== "undefined") {
            this.surface_reinforcement.polygon_points[i + 1].comment = polygon_points[i][2];
        }
    }
};