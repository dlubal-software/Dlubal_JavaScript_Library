/**
 * Creates member load wizard
 * @class
 * @constructor
 * @param {Number}  no          Member load wizard index, can be undefined
 * @param {Object}  load_case   Load case
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 */
function MemberLoadFromAreaLoadWizard (no,
    load_case,
    comment,
    params) {
    if (arguments.length > 0) {
        this.memberWizard = createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params);
    }
}

/**
 * Creates uniform member load wizard
 * @param {Number}  no                  Member load wizard index, can be undefined
 * @param {Object}  load_case           Load case
 * @param {Number}  uniform_magnitude   Uniform load magnitude
 * @param {Number}  coordinate_system   Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction      Load direction, can be undefined (ZA as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters
 */
 MemberLoadFromAreaLoadWizard.prototype.Uniform = function (no,
    load_case,
    uniform_magnitude,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromAreaLoadWizardDistribution(this.memberWizard, member_loads_from_area_load.LOAD_DISTRIBUTION_UNIFORM, [uniform_magnitude]);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = load_direction;
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
 * @param {Number}  magnitude_3         Third area load magnitude
 * @param {Number}  node_3              Indexof third node
 * @param {Number}  coordinate_system   Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction      Load direction, can be undefined (ZA as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters
 */
MemberLoadFromAreaLoadWizard.prototype.Linear = function (no,
    load_case,
    magnitude_1,
    node_1,
    magnitude_2,
    node_2,
    magnitude_3,
    node_3,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromAreaLoadWizardDistribution(this.memberWizard, member_loads_from_area_load.LOAD_DISTRIBUTION_LINEAR, [magnitude_1, node_1, magnitude_2, node_2, magnitude_3, node_3]);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = load_direction;
    }
};

/**
 * Creates varying in X member load wizard
 * @param {Number}  no                          Index of member load wizard
 * @param {Object}  load_case                   Load case
 * @param {Array}   load_distribution_values    Load distribution values ([Y1, ΔY1, p1, ... Yn, ΔYn, pn])
 * @param {Number}  coordinate_system           Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction              Load direction, can be undefined (ZA as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters
 */
MemberLoadFromAreaLoadWizard.prototype.VaryingInX = function (no,
    load_case,
    load_distribution_values,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromAreaLoadWizardDistribution(this.memberWizard, member_loads_from_area_load.LOAD_DISTRIBUTION_VARYING_IN_X, load_distribution_values);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = load_direction;
    }
};

/**
 * Creates varying in Y member load wizard
 * @param {Number}  no                          Index of member load wizard
 * @param {Object}  load_case                   Load case
 * @param {Array}   load_distribution_values    Load distribution values ([Y1, ΔY1, p1, ... Yn, ΔYn, pn])
 * @param {Number}  coordinate_system           Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction              Load direction, can be undefined (ZA as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters
 */
MemberLoadFromAreaLoadWizard.prototype.VaryingInY = function (no,
    load_case,
    load_distribution_values,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromAreaLoadWizardDistribution(this.memberWizard, member_loads_from_area_load.LOAD_DISTRIBUTION_VARYING_IN_Y, load_distribution_values);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = load_direction;
    }
};

/**
 * Creates varying in Z member load wizard
 * @param {Number}  no                          Index of member load wizard
 * @param {Object}  load_case                   Load case
 * @param {Array}   load_distribution_values    Load distribution values ([Y1, ΔY1, p1, ... Yn, ΔYn, pn])
 * @param {Number}  coordinate_system           Index of coordinate system, can be undefined (Global XYZ as default)
 * @param {String}  load_direction              Load direction, can be undefined (ZA as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters
 */
MemberLoadFromAreaLoadWizard.prototype.VaryingInZ = function (no,
    load_case,
    load_distribution_values,
    coordinate_system,
    load_direction,
    comment,
    params) {
    this.memberWizard = createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params);
    this.memberWizard = setMemberLoadFromAreaLoadWizardDistribution(this.memberWizard, member_loads_from_area_load.LOAD_DISTRIBUTION_VARYING_IN_Y, load_distribution_values);
    if (typeof coordinate_system !== "undefined") {
        this.memberWizard.coordinate_system = coordinate_system;
    }
    if (typeof load_direction !== "undefined") {
        this.memberWizard.load_direction = load_direction;
    }
};

/**
 * Sets geometry of member load from area load wizard
 * @param {Array}   corner_nodes                Corner nodes (["1,2,3", "4-8", ...])
 * @param {Array}   excluded_members            Single members
 * @param {Array}   excluded_parallel_members   Members parallel to member
 */
MemberLoadFromAreaLoadWizard.prototype.SetGeometry = function (corner_nodes,
    excluded_members,
    excluded_parallel_members) {
    ASSERT(corner_nodes.length > 0, "At least three corner nodes must be specified");
    for (var i = 0 ; i < corner_nodes.length; ++i) {
        this.memberWizard.corner_nodes[i + 1] = corner_nodes[i];
    }
    if (typeof excluded_members !== "undefined") {
        this.memberWizard.excluded_members = excluded_members;
    }
    if (typeof excluded_parallel_members !== "undefined") {
        this.memberWizard.excluded_parallel_members = excluded_parallel_members;
    }
};

/**
 * Sets lock for new members
 * @param {Boolean} lock_for_new_members    Lock for new members, can be undefined (true as defeault)
 */
MemberLoadFromAreaLoadWizard.prototype.LockForNewMember = function (lock_for_new_members) {
    if (typeof lock_for_new_members === "undefined") {
        lock_for_new_members = true;
    }
    this.memberWizard.lock_for_new_members = lock_for_new_members;
};

/**
 * Sets smooth concentrated load
 * @param {Boolean} smooth_punctual_load_enabled    Smooth concentrated load enabled, can be undefined (true as defeault)
 */
MemberLoadFromAreaLoadWizard.prototype.SmoothConcentratedLoad = function (smooth_punctual_load_enabled) {
    if (typeof smooth_punctual_load_enabled === "undefined") {
        smooth_punctual_load_enabled = true;
    }
    this.memberWizard.smooth_punctual_load_enabled = smooth_punctual_load_enabled;
};

/**
 * Sets consider member eccentricity
 * @param {Boolean} consider_member_eccentricity    Consider member eccentricity, can be undefined (true as defeault)
 */
MemberLoadFromAreaLoadWizard.prototype.ConsiderMemberEccentricity = function (consider_member_eccentricity) {
    if (typeof consider_member_eccentricity === "undefined") {
        consider_member_eccentricity = true;
    }
    this.memberWizard.consider_member_eccentricity = consider_member_eccentricity;
};

/**
 * Sets consider section distribution
 * @param {Boolean} consider_section_distribution   Consider section distribution, can be undefined (true as defeault)
 */
MemberLoadFromAreaLoadWizard.prototype.ConsiderSectionDistribution = function (consider_section_distribution) {
    if (typeof consider_section_distribution === "undefined") {
        consider_section_distribution = true;
    }
    this.memberWizard.consider_section_distribution = consider_section_distribution;
};

/**
 * Sets absolute tolerance for member on plane
 * @param {Number}  absolute_tolerance  Absolute tolerance by distance, can be undefined (0.0005 as default)
 */
MemberLoadFromAreaLoadWizard.prototype.AbsoluteToleranceForMembersOnPlane = function (absolute_tolerance) {
    this.memberWizard.tolerance_type_for_member_on_plane = member_loads_from_area_load.ABSOLUTE_TOLERANCE_BY_DISTANCE;
    if (typeof absolute_tolerance != "undefined") {
        this.memberWizard.absolute_tolerance_for_member_on_plane = absolute_tolerance;
    }
};

/**
 * Sets relative tolerance for member on plane
 * @param {Number}  relative_tolerance  Relative tolerance by angle, can be undefined (1.0 by default)
 */
MemberLoadFromAreaLoadWizard.prototype.RelativeToleranceForMembersOnPlane = function (relative_tolerance) {
    this.memberWizard.tolerance_type_for_member_on_plane = member_loads_from_area_load.RELATIVE_TOLERANCE_BY_ANGLE;
    if (typeof relative_tolerance !== "undefined") {
        this.memberWizard.relative_tolerance_for_member_on_plane = relative_tolerance;
    }
};

/**
 * Sets absolute tolerance for nodes on line
 * @param {Number}  absolute_tolerance  Absolute tolerance by distance, can be undefined (0.0005 as default)
 */
MemberLoadFromAreaLoadWizard.prototype.AbsoluteToleranceForNodesOnLine = function (absolute_tolerance) {
    this.memberWizard.tolerance_type_for_node_on_line = member_loads_from_area_load.ABSOLUTE_TOLERANCE_BY_DISTANCE;
    if (typeof absolute_tolerance !== "undefined") {
        this.memberWizard.absolute_tolerance_for_node_on_line = absolute_tolerance;
    }
};

/**
 * Sets relative tolerance for nodes on line
 * @param {Number}  relative_tolerance  Relative tolerance by angle, can be undefined (1.0 by default)
 */
MemberLoadFromAreaLoadWizard.prototype.RelativeToleranceForNodesOnLine = function (relative_tolerance) {
    this.memberWizard.tolerance_type_for_node_on_line = member_loads_from_area_load.RELATIVE_TOLERANCE_BY_ANGLE;
    if (typeof relative_tolerance !== "undefined") {
        this.memberWizard.relative_tolerance_for_node_on_line = relative_tolerance;
    }
};

/**
 * Creates member load wizard (private)
 * @param {Number}  no          Member load wizard index, can be undefined
 * @param {Object}  load_case   Load case
 * @param {String}  comment     Comment
 * @param {Object}  params      Additional parameters
 * @returns Created member load wizard
 */
function createBaseMemberLoadFromAreaLoadWizard (no,
    load_case,
    comment,
    params) {
    ASSERT(typeof load_case !== "undefined", "Load case must be specified");
    if (typeof no === "undefined") {
        no = member_loads_from_area_load.count() + 1;
    }
    var memberWizard = member_loads_from_area_load.create(no);
    memberWizard.load_case = load_case;
    set_comment_and_parameters(memberWizard, comment, params);
    return memberWizard;
};

/**
 * Sets load distribution to member load wizard (private)
 * @param {Object}  member_wizard               Member load wizard
 * @param {Number}  load_distribution           Load distribution
 * @param {Array}   load_distribution_values    Load distribution values
 * @returns Modified member load wizard
 */
function setMemberLoadFromAreaLoadWizardDistribution (member_wizard,
    load_distribution,
    load_distribution_values) {
    member_wizard.load_distribution = load_distribution;
    switch (load_distribution) {
        case member_loads_from_area_load.LOAD_DISTRIBUTION_UNIFORM:
            ASSERT(load_distribution_values.length === 1, "Uniform magnitude must be specified");
            member_wizard.uniform_magnitude = load_distribution_values[0];
            break;
        case member_loads_from_area_load.LOAD_DISTRIBUTION_LINEAR:
            ASSERT(load_distribution_values.length === 6, "Three magnitude values on three nodes are required");
            member_wizard.magnitude_1 = load_distribution_values[0];
            member_wizard.magnitude_2 = load_distribution_values[2];
            member_wizard.magnitude_3 = load_distribution_values[4];
            member_wizard.node_1 = load_distribution_values[1];
            member_wizard.node_2 = load_distribution_values[3];
            member_wizard.node_3 = load_distribution_values[5];
            break;
        case member_loads_from_area_load.LOAD_DISTRIBUTION_VARYING_IN_X:
        case member_loads_from_area_load.LOAD_DISTRIBUTION_VARYING_IN_Y:
        case member_loads_from_area_load.LOAD_DISTRIBUTION_VARYING_IN_Z:
            ASSERT(load_distribution_values.length === 6, "At least two area loads parameters are required [distance1, delta_distance1, magnitude1, distance2, delta_distance2, magnitude2])")
            for (var i = 0; i < load_distribution_values.length; i+=3) {
                member_wizard.varying_load_parameters[i / 3 + 1].distance = load_distribution_values[i];
                member_wizard.varying_load_parameters[i / 3 + 1].delta_distance = load_distribution_values[i + 1];
                member_wizard.varying_load_parameters[i / 3 + 1].magnitude = load_distribution_values[i + 2];
            }
            break;
        default:
            ASSERT("Unknown load distribution");
    }
    return member_wizard;
};