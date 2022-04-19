/**
 * Creates member load wizard
 * @class
 * @constructor
 * @param {Number}  no          Member load wizard index, can be undefined
 * @param {Object}  load_case   Load case
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 */
function MemberLoadFromFreeLineLoadWizard (no,
    load_case,
    comment,
    params) {
    if (arguments.length > 0) {
        this.memberWizard = createBaseMemberLoadFromFreeLineLoadWizard(no, load_case, comment, params);
    }
}

/**
 * Creates uniform member load wizard
 * @param {Number}  no                  Member load wizard index, can be undefined
 * @param {Object}  load_case           Load case
 * @param {Number}  uniform_magnitude   Uniform load magnitude
 * @param {Number}  node_1              Index of first node
 * @param {Number}  node_2              Index of second node
 * @param {Number}  coordinate_system   Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction      Load direction, can be undefined (ZA as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
 MemberLoadFromFreeLineLoadWizard.prototype.Uniform = function (no,
    load_case,
    uniform_magnitude,
    node_1,
    node_2,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromFreeLineLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromFreeLineLoadWizardDistribution(this.memberWizard, member_loads_from_free_line_load.LOAD_DISTRIBUTION_UNIFORM, [uniform_magnitude, node_1, node_2]);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = member_loads_from_free_line_load[GetDirectionOfMemberLoad(load_direction)];
    }
};

/**
 * Creates linear member load wizard
 * @param {Number}  no                  Member load wizard index, can be undefined
 * @param {Object}  load_case           Load case
 * @param {Number}  magnitude_1         First area load magnitude
 * @param {Number}  node_1              Index of first node
 * @param {Number}  magnitude_2         Second area load magnitude
 * @param {Number}  node_2              Index of second node
 * @param {Number}  coordinate_system   Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction      Load direction, can be undefined (ZA as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
MemberLoadFromFreeLineLoadWizard.prototype.Linear = function (no,
    load_case,
    magnitude_1,
    node_1,
    magnitude_2,
    node_2,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromFreeLineLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromFreeLineLoadWizardDistribution(this.memberWizard, member_loads_from_free_line_load.LOAD_DISTRIBUTION_LINEAR, [magnitude_1, node_1, magnitude_2, node_2]);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = member_loads_from_free_line_load[GetDirectionOfMemberLoad(load_direction)];
    }
};

/**
 * Sets absolute tolerance for member on plane
 * @param {Number}  absolute_tolerance  Absolute tolerance by distance, can be undefined (0.0005 as default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.AbsoluteToleranceForMembersOnPlane = function (absolute_tolerance) {
    this.memberWizard.tolerance_type_for_member_on_plane = member_loads_from_free_line_load.ABSOLUTE_TOLERANCE_BY_DISTANCE;
    if (typeof absolute_tolerance != "undefined") {
        this.memberWizard.absolute_tolerance_for_member_on_plane = absolute_tolerance;
    }
};

/**
 * Sets relative tolerance for member on plane
 * @param {Number}  relative_tolerance  Relative tolerance by angle, can be undefined (1.0 by default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.RelativeToleranceForMembersOnPlane = function (relative_tolerance) {
    this.memberWizard.tolerance_type_for_member_on_plane = member_loads_from_free_line_load.RELATIVE_TOLERANCE_BY_ANGLE;
    if (typeof relative_tolerance !== "undefined") {
        this.memberWizard.relative_tolerance_for_member_on_plane = relative_tolerance;
    }
};

/**
 * Sets absolute tolerance for nodes on line
 * @param {Number}  absolute_tolerance  Absolute tolerance by distance, can be undefined (0.0005 as default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.AbsoluteToleranceForNodesOnLine = function (absolute_tolerance) {
    this.memberWizard.tolerance_type_for_node_on_line = member_loads_from_free_line_load.ABSOLUTE_TOLERANCE_BY_DISTANCE;
    if (typeof absolute_tolerance !== "undefined") {
        this.memberWizard.absolute_tolerance_for_node_on_line = absolute_tolerance;
    }
};

/**
 * Sets relative tolerance for nodes on line
 * @param {Number}  relative_tolerance  Relative tolerance by angle, can be undefined (1.0 by default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.RelativeToleranceForNodesOnLine = function (relative_tolerance) {
    this.memberWizard.tolerance_type_for_node_on_line = member_loads_from_free_line_load.RELATIVE_TOLERANCE_BY_ANGLE;
    if (typeof relative_tolerance !== "undefined") {
        this.memberWizard.relative_tolerance_for_node_on_line = relative_tolerance;
    }
};

/**
 * Sets excluded members
 * @param {Array}   excluded_members            List of excluded member indexes, can be undefined
 * @param {Array}   excluded_parallel_members   List of excluded parallel members, can be undefined
 */
MemberLoadFromFreeLineLoadWizard.prototype.ExcludedMembers = function (excluded_members,
    excluded_parallel_members) {
    if (typeof excluded_members !== "undefined") {
        this.memberWizard.excluded_members = excluded_members;
    }
    if (typeof excluded_parallel_members !== "undefined") {
        this.memberWizard.excluded_parallel_members = excluded_parallel_members;
    }
};

/**
 * Sets lock for new members
 * @param {Boolean} lock_for_new_members    Lock for new members, can be undefined (true as default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.LockForNewMembers = function (lock_for_new_members) {
    if (typeof lock_for_new_members === "undefined") {
        lock_for_new_members = true;
    }
    this.memberWizard.lock_for_new_members = lock_for_new_members;
};

/**
 * Sets consider member eccentricity
 * @param {Boolean} consider_member_eccentricity    Consider member eccentricity, can be undefined (true as default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.ConsiderMemberEccentricity = function (consider_member_eccentricity) {
    if (typeof consider_member_eccentricity === "undefined") {
        consider_member_eccentricity = true;
    }
    this.memberWizard.consider_member_eccentricity = consider_member_eccentricity;
};

/**
 * Sets consider section distribution
 * @param {Boolean} consider_section_distribution   Consider section distribution, can be undefined (true as default)
 */
 MemberLoadFromFreeLineLoadWizard.prototype.ConsiderSectionDistribution = function (consider_section_distribution) {
    if (typeof consider_section_distribution === "undefined") {
        consider_section_distribution = true;
    }
    this.memberWizard.consider_section_distribution = consider_section_distribution;
};

/**
 * Creates member load wizard (private)
 * @param {Number}  no          Member load wizard index, can be undefined
 * @param {Object}  load_case   Load case
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 * @returns Created member load wizard
 */
 function createBaseMemberLoadFromFreeLineLoadWizard (no,
    load_case,
    comment,
    params) {
    ASSERT(typeof load_case !== "undefined", "Load case must be specified");
    if (typeof no === "undefined") {
        no = member_loads_from_free_line_load.count() + 1;
    }
    var memberWizard = member_loads_from_free_line_load.create(no);
    memberWizard.load_case = load_case;
    set_comment_and_parameters(memberWizard, comment, params);
    return memberWizard;
}

/**
 * Sets load distribution to member load wizard (private)
 * @param {Object}  member_wizard               Member load wizard
 * @param {Number}  load_distribution           Load distribution
 * @param {Array}   load_distribution_values    Load distribution values
 * @returns Modified member load wizard
 */
 function setMemberLoadFromFreeLineLoadWizardDistribution (member_wizard,
    load_distribution,
    load_distribution_values) {
    member_wizard.load_distribution = load_distribution;
    switch (load_distribution) {
        case member_loads_from_area_load.LOAD_DISTRIBUTION_UNIFORM:
            ASSERT(load_distribution_values.length === 3, "Three load distribution values are required (load magnitude, two nodes)");
            member_wizard.magnitude_uniform = load_distribution_values[0];
            member_wizard.node_1 = load_distribution_values[1];
            member_wizard.node_2 = load_distribution_values[2];
            break;
        case member_loads_from_area_load.LOAD_DISTRIBUTION_LINEAR:
            ASSERT(load_distribution_values.length === 4, "Two magnitude values on two nodes are required");
            member_wizard.magnitude_first = load_distribution_values[0];
            member_wizard.magnitude_second = load_distribution_values[2];
            member_wizard.node_1 = load_distribution_values[1];
            member_wizard.node_2 = load_distribution_values[3];
            break;
        default:
            ASSERT("Unknown load distribution");
    }
    return member_wizard;
}
function GetDirectionOfMemberLoad(direction) {

    const direction_dict = {
        "LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE": "LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE",
        "LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE": "LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE",
        "LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE": "LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE",
        "LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_PROJECTED": "LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_PROJECTED",
        "LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED": "LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED",
        "LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED": "LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED",
    };

    if (direction !== undefined) {
        var loadDirection = direction_dict[direction];
        if (loadDirection === undefined) {
            console.log("Wrong direction. Value was: " + direction);
            console.log("Correct values are: ( " + Object.keys(direction_dict) + ")");
            direction = "LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED";
        }
        return loadDirection;
    }
    else {
        return "LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED";
    }
}
