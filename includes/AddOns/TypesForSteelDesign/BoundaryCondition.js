/*
boundary_condition.nodal_supports[row].eccentricity_type_z - should be string value, but it takes only number index
*/

/*
IMPORTANT: Boundary condition can be set only for EN 1993 standard
*/

include("../SteelDesign/SteelDesignSupport.js");

/**
 * Creates Steel design boundary condition
 * @param {Number} no               Steel design boundary condition index, can be undefined
 * @param {Array} members_no        List of members indexes, can be undefined
 * @param {Array} member_sets_no    List of member sets indexes, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignBoundaryCondition (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    if (typeof no === "undefined") {
        this.boundary_condition = steel_boundary_conditions.create();
    }
    else {
        this.boundary_condition = steel_boundary_conditions.create(no);
    }
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "Member list must be array of member indexes");
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
        this.boundary_condition.members = members_no;
    }
    if (typeof member_sets_no !== "undefined") {
        ASSERT(Array.isArray(member_sets_no), "Member set list must be array of member sets indexes");
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
        this.boundary_condition.member_sets = member_sets_no;
    }
    set_comment_and_parameters(this.boundary_condition, comment, params);
}

/**
 * Sets Nodal supports for start node sequence
 * @param {String} support_type     Support type (NONE, FIXED_IN_Y, TORSION, FIXED_IN_Y_AND_TORSION, FIXED_IN_Y_AND_WARPING, TORSION_AND_WARPING, FIXED_IN_Y_AND_TORSION_AND_WARPING, FIXED_ALL), can be undefined (FIXED_IN_Y_AND_TORSION as default)
 */
SteelDesignBoundaryCondition.prototype.NodalSupportsStartWithSupportType = function (support_type) {
    setBoundaryConditionNodalSupports(this.boundary_condition, 1, support_type);
};

/**
 * Sets Nodal supports for end node sequence
 * @param {String} support_type     Support type (NONE, FIXED_IN_Y, TORSION, FIXED_IN_Y_AND_TORSION, FIXED_IN_Y_AND_WARPING, TORSION_AND_WARPING, FIXED_IN_Y_AND_TORSION_AND_WARPING, FIXED_ALL), can be undefined (FIXED_IN_Y_AND_TORSION as default)
 */
SteelDesignBoundaryCondition.prototype.NodalSupportsEndWithSupportType = function (support_type) {
    setBoundaryConditionNodalSupports(this.boundary_condition, this.boundary_condition.nodal_supports.row_count(), support_type);
};

/**
 * Inserts Nodal support intermediate node
 * @param {Boolean} support_in_y        Support in y', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_about_x   Restraint about x', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_about_z   Restraint about z', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_warping   Warping, can be undefined (is not set, false as default)
 */
SteelDesignBoundaryCondition.prototype.InsertNodalSupportIntermediateNode = function (support_in_y,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    ASSERT(this.boundary_condition.intermediate_nodes, "Intermediate nodes must be on");
    setBoundaryConditionNodalSupports(this.boundary_condition, this.boundary_condition.nodal_supports.row_count() + 1, "INDIVIDUALLY", support_in_y, restraint_about_x, restraint_about_z, restraint_warping);
};

/**
 * Sets individually values for start node sequence
 * @param {Boolean} support_in_y        Support in y', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_about_x   Restraint about x', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_about_z   Restraint about z', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_warping   Warping, can be undefined (is not set, false as default)
 */
SteelDesignBoundaryCondition.prototype.NodalSupportsStartWithIndividuallySupportType = function (support_in_y,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    setBoundaryConditionNodalSupports(this.boundary_condition, 1, "INDIVIDUALLY", support_in_y, restraint_about_x, restraint_about_z, restraint_warping);
};

/**
 * Sets individually values for end node sequence
 * @param {Boolean} support_in_y        Support in y', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_about_x   Restraint about x', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_about_z   Restraint about z', can be undefined (is not set, false as default)
 * @param {Boolean} restraint_warping   Warping, can be undefined (is not set, false as default)
 */
SteelDesignBoundaryCondition.prototype.NodalSupportsEndWithIndividuallySupportType = function (support_in_y,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    setBoundaryConditionNodalSupports(this.boundary_condition, this.boundary_condition.nodal_supports.row_count(), "INDIVIDUALLY", support_in_y, restraint_about_x, restraint_about_z, restraint_warping);
};

/**
 * Sets Additional parameters for start node sequence
 * @param {Number} rotation                 Rotation, can be undefined (is not set, 0.00 as default)
 * @param {String} eccentricity_type_z      Type of eccentricity in z-axis (NONE, AT_UPPER_FLANGE, AT_LOWER_FLANGE, USER_VALUE), can be undefined (is not set, USER_VALUE as default)
 * @param {Number} eccentricity_x           Eccentricity in x'-axis, can be undefined (is not set, 0.0 as default)
 * @param {Number} eccentricity_z           Eccentricity in z'-axis, can be undefined (is not set, 0.0 as default)
 */
SteelDesignBoundaryCondition.prototype.SetAdditionalParametersForStart = function (rotation,
    eccentricity_type_z,
    eccentricity_x,
    eccentricity_z) {
    setNodalSupportsAdditionalParameters(this.boundary_condition, 1, rotation, eccentricity_type_z, eccentricity_x, eccentricity_z);
};

/**
 * Sets Additional parameters for end node sequence
 * @param {Number} rotation                 Rotation, can be undefined (is not set, 0.00 as default)
 * @param {String} eccentricity_type_z      Type of eccentricity in z-axis (NONE, AT_UPPER_FLANGE, AT_LOWER_FLANGE, USER_VALUE), can be undefined (is not set, USER_VALUE as default)
 * @param {Number} eccentricity_x           Eccentricity in x'-axis, can be undefined (is not set, 0.0 as default)
 * @param {Number} eccentricity_z           Eccentricity in z'-axis, can be undefined (is not set, 0.0 as default)
 */
SteelDesignBoundaryCondition.prototype.SetAdditionalParametersForEnd = function (rotation,
    eccentricity_type_z,
    eccentricity_x,
    eccentricity_z) {
    setNodalSupportsAdditionalParameters(this.boundary_condition, this.boundary_condition.nodal_supports.row_count(), rotation, eccentricity_type_z, eccentricity_x, eccentricity_z);
};

/**
 * Sets Additional parameters for intermediate node
 * @param {Number} row                      Row, first intermediate row begins on index 2
 * @param {Number} rotation                 Rotation, can be undefined (is not set, 0.00 as default)
 * @param {String} eccentricity_type_z      Type of eccentricity in z-axis (NONE, AT_UPPER_FLANGE, AT_LOWER_FLANGE, USER_VALUE), can be undefined (is not set, USER_VALUE as default)
 * @param {Number} eccentricity_x           Eccentricity in x'-axis, can be undefined (is not set, 0.0 as default)
 * @param {Number} eccentricity_z           Eccentricity in z'-axis, can be undefined (is not set, 0.0 as default)
 */
SteelDesignBoundaryCondition.prototype.SetAdditionalParametersForIntermediateRow = function (row,
    rotation,
    eccentricity_type_z,
    eccentricity_x,
    eccentricity_z) {
    setNodalSupportsAdditionalParameters(this.boundary_condition, row, rotation, eccentricity_type_z, eccentricity_x, eccentricity_z);
};

/**
 * Sets Intermediate nodes state
 * @param {Boolean} intermediate_nodes  Intermediate nodes, can be undefined (true as default)
 */
SteelDesignBoundaryCondition.prototype.IntermediateNodes = function (intermediate_nodes) {
    if (typeof intermediate_nodes === "undefined") {
        intermediate_nodes = true;
    }
    this.boundary_condition.intermediate_nodes = intermediate_nodes;
};

/**
 * Sets Different properties state for nodal supports
 * @param {Boolean} different_properties_supports   Different properties, can be undefined (true as default)
 */
SteelDesignBoundaryCondition.prototype.DifferentPropertiesForNodalSupports = function (different_properties_supports) {
    if (typeof different_properties_supports === "undefined") {
        different_properties_supports = true;
    }
    this.boundary_condition.different_properties_supports = different_properties_supports;
};

/**
 * Sets Hinge releases for start node sequence
 * @param {Number} release_in_y         Release in y, can be undefined (is not set, false as default)
 * @param {Number} release_about_x      Release about x, can be undefined (is not set, false as default)
 * @param {Number} release_about_z      Release about z, can be undefined (is not set, false as default)
 * @param {Number} release_warping      Release of warping, can be undefined (is not set, false as default)
 */
SteelDesignBoundaryCondition.prototype.MemberHingesForStart = function (release_in_y,
    release_about_x,
    release_about_z,
    release_warping) {
    setBoundaryConditionMemberHinges(this.boundary_condition, 1, release_in_y, release_about_x, release_about_z, release_warping);
};

/**
 * Sets Hinge releases for end node sequence
 * @param {Number} release_in_y         Release in y, can be undefined (is not set, false as default)
 * @param {Number} release_about_x      Release about x, can be undefined (is not set, false as default)
 * @param {Number} release_about_z      Release about z, can be undefined (is not set, false as default)
 * @param {Number} release_warping      Release of warping, can be undefined (is not set, false as default)
 */
SteelDesignBoundaryCondition.prototype.MemberHingesForEnd = function (release_in_y,
    release_about_x,
    release_about_z,
    restraint_warping) {
    setBoundaryConditionMemberHinges(this.boundary_condition, this.boundary_condition.member_hinges.row_count(), release_in_y, release_about_x, release_about_z, restraint_warping);
};

/**
 * Sets member hinge intermediate node
 * @param {Number} row                  Row (intermediate node begins on index 2)
 * @param {Number} release_in_y         Release in y, can be undefined (is not set, false as default)
 * @param {Number} release_about_x      Release about x, can be undefined (is not set, false as default)
 * @param {Number} release_about_z      Release about z, can be undefined (is not set, false as default)
 * @param {Number} release_warping      Release of warping, can be undefined (is not set, false as default)
 */
SteelDesignBoundaryCondition.prototype.SetMemberHingeIntermediateNode = function (row,
    release_in_y,
    release_about_x,
    release_about_z,
    release_warping) {
    ASSERT(this.boundary_condition.intermediate_nodes, "Intermediate nodes must be on");
    ASSERT(typeof row !== "undefined", "Row must be undefined");
    setBoundaryConditionMemberHinges(this.boundary_condition, row, release_in_y, release_about_x, release_about_z, release_warping);
};

/**
 * Sets Different properties state for member hinges
 * @param {Boolean} different_properties_hinges     Different properties, can be undefined (true as default)
 */
SteelDesignBoundaryCondition.prototype.DifferentPropertiesForMemberHinges = function (different_properties_hinges) {
    if (typeof different_properties_hinges === "undefined") {
        different_properties_hinges = true;
    }
    this.boundary_condition.different_properties_hinges = different_properties_hinges;
};

/**
 * @returns Nodal supports are set correctly
 */
SteelDesignBoundaryCondition.prototype.NodalSupportsEndEdit = function () {
    var support_in_y = false;
    var restraint_about_x = false;
    
    for (var row = 1; row <= this.boundary_condition.nodal_supports.row_count(); ++row) {
        if (this.boundary_condition.nodal_supports[row].support_in_y) {
            support_in_y = true;
        }
        if (this.boundary_condition.nodal_supports[row].restraint_about_x) {
            restraint_about_x = true;
        }
    }

    if (!support_in_y) {
        console.log("At least one support in y' must be on");
    }
    if (!restraint_about_x) {
        console.log("At least one restraint about x' must be on");
    }

    return support_in_y && restraint_about_x;
};

function setBoundaryConditionNodalSupports (boundary_condition,
    row,
    support_type,
    support_in_y,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    // Check if all options in column have same value (different_properties_supports is false)
    function checkUniqueValues (value_to_set, value_name) {
        if (!boundary_condition.different_properties_supports) {
            var values = [];
            for (var row = 1; row <= boundary_condition.nodal_supports.row_count(); ++row) {
                values.push(value_name === "support_in_y" ? boundary_condition.nodal_supports[row].support_in_y : (value_name === "restraint_about_x" ? boundary_condition.nodal_supports[row].restraint_about_x : (value_name === "restraint_about_z" ? boundary_condition.nodal_supports[row].restraint_about_z : boundary_condition.nodal_supports[row].restraint_warping)));
            }
            function uniqueValues() {
                for (var i = 0; i < values.length; ++i) {
                    if (values[i] !== value_to_set) {
                        return false;
                    }
                }
                return true;
            }
            if (!uniqueValues()) {
                // All options in current column must be set to the same value as value_to_set
                for (var row = 1; row <= boundary_condition.nodal_supports.row_count(); ++row) {
                    if (value_name === "support_in_y") {
                        boundary_condition.nodal_supports[row].support_in_y = value_to_set;
                    }
                    else if (value_name === "restraint_about_x") {
                        boundary_condition.nodal_supports[row].restraint_about_x = value_to_set;
                    }
                    else if (value_name === "restraint_about_z") {
                        boundary_condition.nodal_supports[row].restraint_about_z = value_to_set;
                    }
                    else {
                        boundary_condition.nodal_supports[row].restraint_warping = value_to_set;
                    }
                }
                console.log(value_name + ": all values have been set to " + value_to_set + " (different properties off)");
            }
        }
    }
    function setValues(support_in_y, restraint_about_x, restraint_about_z, restraint_warping) {
        if (row > boundary_condition.nodal_supports.row_count()) {
            row = row - 1;
            boundary_condition.nodal_supports.insert_row(row);
        }
        checkUniqueValues(support_in_y, "support_in_y");
        boundary_condition.nodal_supports[row].support_in_y = support_in_y;
        checkUniqueValues(restraint_about_x, "restraint_about_x");
        boundary_condition.nodal_supports[row].restraint_about_x = restraint_about_x;
        checkUniqueValues(restraint_about_z, "restraint_about_z");
        boundary_condition.nodal_supports[row].restraint_about_z = restraint_about_z;
        checkUniqueValues(restraint_warping, "restraint_warping");
        boundary_condition.nodal_supports[row].restraint_warping = restraint_warping;
    }
    function setBoundaryConditionSupportType(support_type) {
        var type = BoundaryConditionSupportType(support_type);
        switch (type) {
            case steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y:
                setValues(true, false, false, false);
                break;
            case steel_boundary_conditions.SUPPORT_TYPE_TORSION:
                setValues(false, true, false, false);
                break;
            case steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_TORSION:
                setValues(true, true, false, false);
                break;
            case steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_WARPING:
                setValues(true, false, false, true);
                break;
            case steel_boundary_conditions.SUPPORT_TYPE_TORSION_AND_WARPING:
                setValues(false, true, false, true);
                break;
            case steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_TORSION_AND_WARPING:
                setValues(true, true, false, true);
                break;
            case steel_boundary_conditions.SUPPORT_TYPE_FIXED_ALL:
                setValues(true, true, true, true);
                break;
            default:
                ASSERT(false);
        }
    }
    //boundary_condition.nodal_supports[index].support_type = BoundaryConditionSupportType(support_type);   // Can't set this way, always "None"
    if (support_type !== "INDIVIDUALLY") {
        setBoundaryConditionSupportType(support_type);
    }
    else {
        if (typeof support_in_y === "undefined") {
            support_in_y = false;
        }
        if (typeof restraint_about_x === "undefined") {
            restraint_about_x = false;
        }
        if (typeof restraint_about_z === "undefined") {
            restraint_about_z = false;
        }
        if (typeof restraint_warping === "undefined") {
            restraint_warping = false;
        }
        setValues(support_in_y, restraint_about_x, restraint_about_z, restraint_warping);
    }
}

function setBoundaryConditionMemberHinges (boundary_condition,
    row,
    release_in_y,
    release_about_x,
    release_about_z,
    release_warping) {
    if (row != 1 && row != boundary_condition.member_hinges.row_count()) {
        ASSERT(row > 1 && row < boundary_condition.member_hinges.row_count(), "Intermediate node index must be in range <2-" + boundary_condition.member_hinges.row_count() - 1 + ">");
    }
    // Check if all options in column have same value (different_properties_supports is false)
    function checkUniqueValues (value_to_set, value_name) {
        if (!boundary_condition.different_properties_hinges) {
            var values = [];
            for (var row = 1; row <= boundary_condition.member_hinges.row_count(); ++row) {
                values.push(value_name === "release_in_y" ? boundary_condition.member_hinges[row].release_in_y : (value_name === "release_about_x" ? boundary_condition.member_hinges[row].release_about_x : (value_name === "release_about_z" ? boundary_condition.member_hinges[row].release_about_z : boundary_condition.member_hinges[row].release_warping)));
            }
            function uniqueValues() {
                for (var i = 0; i < values.length; ++i) {
                    if (values[i] !== value_to_set) {
                        return false;
                    }
                }
                return true;
            }
            if (!uniqueValues()) {
                // All options in current column must be set to the same value as value_to_set
                for (var row = 1; row <= boundary_condition.member_hinges.row_count(); ++row) {
                    if (value_name === "release_in_y") {
                        boundary_condition.member_hinges[row].release_in_y = value_to_set;
                    }
                    else if (value_name === "release_about_x") {
                        boundary_condition.member_hinges[row].release_about_x = value_to_set;
                    }
                    else if (value_name === "release_about_z") {
                        boundary_condition.member_hinges[row].release_about_z = value_to_set;
                    }
                    else {
                        boundary_condition.member_hinges[row].release_warping = value_to_set;
                    }
                }
                console.log(value_name + ": all values have been set to " + value_to_set + " (different properties off)");
            }
        }
    }
    function setValues(release_in_y, release_about_x, release_about_z, release_warping) {
        if (row > boundary_condition.member_hinges.row_count()) {
            row = row - 1;
            boundary_condition.member_hinges.insert_row(row);
        }
        checkUniqueValues(release_in_y, "release_in_y");
        boundary_condition.member_hinges[row].release_in_y = release_in_y;
        checkUniqueValues(release_about_x, "release_about_x");
        boundary_condition.member_hinges[row].release_about_x = release_about_x;
        checkUniqueValues(release_about_z, "release_about_z");
        boundary_condition.member_hinges[row].release_about_z = release_about_z;
        checkUniqueValues(release_warping, "release_warping");
        boundary_condition.member_hinges[row].release_warping = release_warping;
    }
    if (typeof release_in_y === "undefined") {
        release_in_y = false;
    }
    if (typeof release_about_x === "undefined") {
        release_about_x = false;
    }
    if (typeof release_about_z === "undefined") {
        release_about_z = false;
    }
    if (typeof release_warping === "undefined") {
        release_warping = false;
    }
    setValues(release_in_y, release_about_x, release_about_z, release_warping);
}

function setNodalSupportsAdditionalParameters (boundary_condition,
    row,
    rotation,
    eccentricity_type_z,
    eccentricity_x,
    eccentricity_z) {
    ASSERT(boundary_condition.nodal_supports[row].support_type !== steel_boundary_conditions.SUPPORT_TYPE_NONE, "Support type must be different from None");
    if (typeof rotation !== !undefined) {
        boundary_condition.nodal_supports[row].rotation = rotation;
    }
    boundary_condition.nodal_supports[row].eccentricity_type_z = BoundaryConditionEccentricityType(eccentricity_type_z);
    if (typeof eccentricity_x !== "undefined") {
        boundary_condition.nodal_supports[row].eccentricity_x = eccentricity_x;
    }
    if (typeof eccentricity_z !== "undefined") {
        ASSERT(boundary_condition.nodal_supports[row].eccentricity_type_z === BoundaryConditionEccentricityType("USER_VALUE"), "Type of eccentricity in z-axis must be of User value");
        boundary_condition.nodal_supports[row].eccentricity_z = eccentricity_z;
    }
}

function BoundaryConditionSupportType(support_type) {
	const support_types_dict = {
        "NONE": steel_boundary_conditions.SUPPORT_TYPE_NONE,
        "FIXED_IN_Y": steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y,
        "TORSION": steel_boundary_conditions.SUPPORT_TYPE_TORSION,
        "FIXED_IN_Y_AND_TORSION": steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_TORSION,
        "FIXED_IN_Y_AND_WARPING": steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_WARPING,
        "TORSION_AND_WARPING": steel_boundary_conditions.SUPPORT_TYPE_TORSION_AND_WARPING,
        "FIXED_IN_Y_AND_TORSION_AND_WARPING": steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_TORSION_AND_WARPING,
        "FIXED_ALL": steel_boundary_conditions.SUPPORT_TYPE_FIXED_ALL,
        "INDIVIDUALLY": steel_boundary_conditions.SUPPORT_TYPE_INDIVIDUALLY
	};

	if (support_type !== undefined) {
		var type = support_types_dict[support_type];
		if (type === undefined) {
			console.log("Wrong type of support. Value was: " + support_type);
			console.log("Correct values are: ( " + Object.keys(support_types_dict) + ")");
			type = steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_TORSION;
		}
		return type;
	}
	else {
		return steel_boundary_conditions.SUPPORT_TYPE_FIXED_IN_Y_AND_TORSION;
	}
}

function BoundaryConditionEccentricityType(eccentricity_type) {
	const eccentricity_types_dict = {
        "NONE": 0,
        "AT_UPPER_FLANGE": 1,
        "AT_LOWER_FLANGE": 2,
        "USER_VALUE": 3
	};

	if (eccentricity_type !== undefined) {
		var type = eccentricity_types_dict[eccentricity_type];
		if (type === undefined) {
			console.log("Wrong type of eccentricity. Value was: " + eccentricity_type);
			console.log("Correct values are: ( " + Object.keys(eccentricity_types_dict) + ")");
			type = 3;
		}
		return type;
	}
	else {
		return 3;
	}
}