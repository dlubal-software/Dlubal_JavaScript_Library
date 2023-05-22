include("../../Tools/jshlf_common_functions.js");

function ConcreteDesignReinforcementDirection (no,
    surfaces_no,
    comment,
    params) {
    ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
    if (typeof no === "undefined") {
        this.reinforcement_direction = reinforcement_directions.create();
    }
    else {
        this.reinforcement_direction = this.reinforcement_directions.create(no);
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
        this.reinforcement_direction.surfaces = surfaces_no;
    }
    set_comment_and_parameters(this.reinforcement_direction, comment, params);
}

/**
 * @returns Reinforcement direction number
 */
ConcreteDesignReinforcementDirection.prototype.GetNo = function () {
    return this.reinforcement_direction.no;
};

/**
 * @returns Reinforcement direction object
 */
ConcreteDesignReinforcementDirection.prototype.ReinforcementDirection = function () {
    return this.reinforcement_direction;
};

/**
 * Sets Name
 * @param {String} name     Name, can be undefined (when undefined, generated name is used)
 */
ConcreteDesignReinforcementDirection.prototype.SetName = function (name) {
    if (typeof name !== "undefined") {
        this.reinforcement_direction.user_defined_name_enabled = true;
        this.reinforcement_direction.name = name;
    }
    else {
        this.reinforcement_direction.user_defined_name_enabled = false;
    }
};

/**
 * Sets Direction type
 * @param {String} reinforcement_direction_type     Direction type (FIRST_REINFORCEMENT_IN_X, FIRST_REINFORCEMENT_IN_Y, ROTATED)
 */
ConcreteDesignReinforcementDirection.prototype.DirectionType = function (reinforcement_direction_type) {
    ASSERT(typeof reinforcement_direction_type !== "undefined", "Reinforcement direction type must be specified");
    this.reinforcement_direction.reinforcement_direction_type = EnumValueFromJSHLFTypeName(
        reinforcement_direction_type,
        "reinforcement direction type",
        {
            "FIRST_REINFORCEMENT_IN_X": reinforcement_directions.REINFORCEMENT_DIRECTION_TYPE_FIRST_REINFORCEMENT_IN_X,
            "FIRST_REINFORCEMENT_IN_Y": reinforcement_directions.REINFORCEMENT_DIRECTION_TYPE_FIRST_REINFORCEMENT_IN_Y,
            "ROTATED": reinforcement_directions.REINFORCEMENT_DIRECTION_TYPE_ROTATED
        },
        reinforcement_directions.REINFORCEMENT_DIRECTION_TYPE_FIRST_REINFORCEMENT_IN_X);
};

/**
 * Sets Reinforcement direction rotations about z related to x
 * @param {Number} first_reinforcement_angle    First reinforcement angle
 * @param {Number} second_reinforcement_angle   Second reinforcement angle
 */
ConcreteDesignReinforcementDirection.prototype.DirectionRotations = function (first_reinforcement_angle,
    second_reinforcement_angle) {
    if (typeof first_reinforcement_angle !== "undefined") {
        ASSERT(this.reinforcement_direction.reinforcement_direction_type === reinforcement_directions.REINFORCEMENT_DIRECTION_TYPE_ROTATED, "Direction type must be of ROTATED type.");
        this.reinforcement_direction.first_reinforcement_angle = first_reinforcement_angle;
    }
    if (typeof second_reinforcement_angle !== "undefined") {
        ASSERT(this.reinforcement_direction.reinforcement_direction_type === reinforcement_directions.REINFORCEMENT_DIRECTION_TYPE_ROTATED, "Direction type must be of ROTATED type.");
        this.reinforcement_direction.second_reinforcement_angle = second_reinforcement_angle;
    }
};