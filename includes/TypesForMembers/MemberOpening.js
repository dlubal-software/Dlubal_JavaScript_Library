/**
 * Creates Member Opening
 * @param {Number}  no                  Index of member opening, can be undefined
 * @param {Array}   members_no          Index list of assigned members, can be undefined (only in case list of member_sets_no is defined)
 * @param {Array}   member_sets_no      Index list of assigned member sets, can be undefined (only in case list of members_no is defined)
 * @param {String}  comment             Comment
 * @param {Object}  params              Additional parameters
 */
function MemberOpening (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    this.member_opening = createMemberOpening(no, members_no, member_sets_no, comment, params);
}

/**
 * @returns Member Opening object
 */
MemberOpening.prototype.GetMemberOpening = function () {
    return this.member_opening;
};

/**
 * @returns Member Opening index
 */
MemberOpening.prototype.GetNo = function () {
    return this.member_opening.no;
};

/**
 * Adds component row
 * @param {String} reduction_type   Reduction type (CIRCLE_OPENING, RECTANGULAR_OPENING, HEXAGONAL_OPENING)
 * @param {Number} position         Position of opening, can be undefined (1.0 as default)
 * @param {String} note             Note, can be undefined
 */
MemberOpening.prototype.AddTypeAndLocation = function (reduction_type,
    position,
    note) {
    var row = this.member_opening.components.row_count();
    this.member_opening.components[row].reduction_type = GetMemberOpeningReductionType(reduction_type);
    if (typeof position !== "undefined") {
        this.member_opening.components[row].position = position;
    }
    if (typeof note != "undefined") {
        this.member_opening.components[row].note = note;
    }
};

/**
 * Sets rectangle dimensions
 * @param {Number} component_row    Component row for which dimension is set
 * @param {Number} width            Width, can be undefined (100 mm as default)
 * @param {Number} height           Height, can be undefined (100 mm as default)
 */
MemberOpening.prototype.SetRectangleDimension = function (component_row,
    width,
    height) {
    SetMemberOpeningParameters(this.member_opening, component_row, "RECTANGLE_OPENING", width, height);
};

/**
 * Sets circle dimension
 * @param {Number}  component_row   Component row for which dimension is set
 * @param {Number}  diameter        Diameter, can be undefined (50 mm as default)
 */
MemberOpening.prototype.SetCircleDimension = function (component_row,
    diameter) {
    SetMemberOpeningParameters(this.member_opening, component_row, "CIRCLE_OPENING", undefined, undefined, diameter);
};

/**
 * Sets hexagonal dimensions
 * @param {Number}  component_row   Component row for which dimension is set
 * @param {Number}  width           Width, can be undefined (250 mm as default)
 * @param {Number}  height          Height, can be undefined (50 mm as default)
 * @param {Number}  width_center    Center width, can be undefined (50 mm as default)
 */
MemberOpening.prototype.SetHexagonalDimension = function (component_row,
    width,
    height,
    width_center) {
    SetMemberOpeningParameters(this.member_opening, component_row, "HEXAGONAL_OPENING", width_center, height, undefined, width);
};

/**
 * Sets position
 * @param {Number}  component_row       Component row for which dimension is set
 * @param {Number}  z_axis_reference    Z-axis reference (TOP, CENTER, BOTTOM), can be undefined (CENTER as default)
 * @param {Number}  distance            Distance, can be undefined (0 mm as default)
 */
MemberOpening.prototype.SetPosition = function (component_row,
    z_axis_reference,
    distance) {
    SetMemberOpeningParameters(this.member_opening, component_row, undefined, undefined, undefined, undefined, undefined, z_axis_reference, distance);
};

/**
 * Sets multiple definition
 * @param {Number}  component_row                       Component row for which dimension is set
 * @param {Number}  multiple_number                     Number, can be undefined (2 as default)
 * @param {String}  multiple_offset_definition_type     Offset definition type (ABSOLUTE, RELATIVE), can be undefined (ABSOLUTE as default)
 * @param {Number}  multiple_offset                     Offset, can be undefined (0 m as default)
 */
MemberOpening.prototype.SetMultipleDefinition = function (component_row,
    multiple_number,
    multiple_offset_definition_type,
    multiple_offset) {
    if (multiple_offset_definition_type === "RELATIVE") {
        ASSERT(multiple_offset > 0 && multiple_offset <= 1);
    }
    SetMemberOpeningParameters(this.member_opening, component_row, undefined, undefined, undefined, undefined, undefined, undefined, undefined, multiple_number, multiple_offset_definition_type, multiple_offset);
};

function createMemberOpening (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(!(typeof members_no !== "undefined" && typeof member_sets_no !== "undefined"), "You can't specify members or member sets together");
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "List of members must be defined as array of member indexes");
        member_list = members_no;
        members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                if (members[member_list[i]].type === members.TYPE_SURFACE_MODEL) {
                    members_no.push(member_list[i]);
                }
                else {
                    console.log("Only member with Surface model type can be used");
                }
            }
            else {
                console.log("Member no. " + str(i) + " doesn't exist");
            }
        }
    }
    if (typeof member_sets_no !== "undefined") {
        ASSERT(Array.isArray(member_sets_no), "List of member sets must be defined as array of member indexes");
        member_sets_list = member_sets_no;
        member_sets_no = [];
        for (var i = 0; i < member_sets_list.length; ++i) {
            if (member_sets.exist(member_sets_list[i])) {
                member_set_is_valid = true;
                for (var j = 0; j < member_sets[member_sets_list[i]].members.length; ++j) {
                    member_no = member_sets[member_sets_list[i]].members[j].no;
                    if (members[member_no].type !== members.TYPE_SURFACE_MODEL) {
                        member_set_is_valid = false;
                        console.log("Member set no. " + member_sets_list[i] + "is not valid. One or more members has unsupported type (Surface model type is required)");
                        break;
                    }
                }
                if (member_set_is_valid) {
                    member_sets_no.push(member_sets_list[i]);
                }
            }
            else {
                console.log("Member set no. " + i + " doesn't exist");
            }
        }
    }
    if (typeof members_no !== "undefined" && members_no.length > 0 || typeof member_sets_no !== "undefined" && member_sets_no.length > 0) {
        if (typeof no === "undefined") {
            member_opening = member_openings.create();
        }
        else {
            member_opening = member_openings.create(no);
        }
        if (typeof members_no !== "undefined" && members_no.length > 0) {
            member_opening.members = members_no;
        }
        else {
            member_opening.member_sets = member_sets_no;
        }
        set_comment_and_parameters(member_opening, comment, params);
        return member_opening;
    }
    return undefined;
}

function SetMemberOpeningParameters (member_opening,
    row,
    reduction_type,
    dimension_width,
    dimension_height,
    dimension_diameter,
    dimension_width_center,
    position_z_axis_reference,
    position_distance,
    multiple_definition_number,
    multiple_definition_offset_definition_type,
    multiple_definition_offset) {
    if (row >= 1 && row <= member_opening.components.row_count()) {
        if (typeof reduction_type !== "undefined") {
            if (GetMemberOpeningReductionType(reduction_type) === member_opening.components[row].reduction_type) {
                switch (reduction_type)
                {
                    case "CIRCLE_OPENING":
                        if (typeof dimension_diameter !== "undefined") {
                            member_opening.components[row].diameter = dimension_diameter;
                        }
                        break;
                    case "RECTANGLE_OPENING":
                        if (typeof dimension_width !== "undefined") {
                            member_opening.components[row].width = dimension_width;
                        }
                        if (typeof dimension_height !== "undefined") {
                            member_opening.components[row].height = dimension_height;
                        }
                        break;
                    case "HEXAGONAL_OPENING":
                        if (typeof dimension_width !== "undefined") {
                            member_opening.components[row].width = dimension_width;
                        }
                        if (typeof dimension_height !== "undefined") {
                            member_opening.components[row].height = dimension_height;
                        }
                        if (typeof dimension_width_center !== "undefined") {
                            member_opening.components[row].width_center = dimension_width_center;
                        }
                        break;
                    default:
                        ASSERT(false, "Unknown reduction type");
                }
            }
            else {
                console.log("Component type on row " + row + " (" + member_opening.components[row].reduction_type + ") is differ from " + GetMemberOpeningReductionType(reduction_type));
                ASSERT(false);
            }
        }

        if (typeof position_z_axis_reference !== "undefined") {
            member_opening.components[row].z_axis_reference = GetMemberOpeningZAxisReferenceType(position_z_axis_reference);
        }
        if (typeof position_distance !== "undefined") {
            member_opening.components[row].distance = position_distance;
        }
        if (typeof multiple_definition_number !== "undefined") {
            member_opening.components[row].multiple = true;
            member_opening.components[row].multiple_number = multiple_definition_number;
        }
        if (typeof multiple_definition_offset_definition_type !== "undefined") {
            member_opening.components[row].multiple = true;
            member_opening.components[row].multiple_offset_definition_type = GetMemberOpeningOffsetDefinitionType(multiple_definition_offset_definition_type);
        }
        if (typeof multiple_definition_offset !== "undefined") {
            member_opening.components[row].multiple = true;
            member_opening.components[row].multiple_offset = multiple_definition_offset;
        }
    }
    else {
        console.log("Row " + row + " is bigger then member opening's components count");
        ASSERT(false);
    }
}

function GetMemberOpeningReductionType (reduction_type) {
	const reduction_types_dict = {
		"CIRCLE_OPENING": member_openings.REDUCTION_COMPONENT_TYPE_CIRCLE_OPENING,
        "RECTANGLE_OPENING": member_openings.REDUCTION_COMPONENT_TYPE_RECTANGLE_OPENING,
        "HEXAGONAL_OPENING": member_openings.REDUCTION_COMPONENT_TYPE_HEXAGONAL_OPENING
	};

	if (reduction_type !== undefined) {
		var type = reduction_types_dict[reduction_type];
		if (type === undefined) {
			console.log("Wrong type of assignment type. Value was: " + reduction_type);
			console.log("Correct values are: ( " + Object.keys(reduction_types_dict) + ")");
			type = member_openings.REDUCTION_COMPONENT_TYPE_CIRCLE_OPENING;
		}
		return type;
	}
	else {
		return member_openings.REDUCTION_COMPONENT_TYPE_CIRCLE_OPENING;
	}
}

function GetMemberOpeningOffsetDefinitionType (offset_type) {
	const offset_types_dict = {
		"ABSOLUTE": member_openings.OFFSET_DEFINITION_TYPE_ABSOLUTE,
        "RELATIVE": member_openings.OFFSET_DEFINITION_TYPE_RELATIVE
	};

	if (offset_type !== undefined) {
		var type = offset_types_dict[offset_type];
		if (type === undefined) {
			console.log("Wrong type of assignment type. Value was: " + offset_type);
			console.log("Correct values are: ( " + Object.keys(offset_types_dict) + ")");
			type = member_openings.OFFSET_DEFINITION_TYPE_ABSOLUTE;
		}
		return type;
	}
	else {
		return member_openings.OFFSET_DEFINITION_TYPE_ABSOLUTE;
	}
}

function GetMemberOpeningZAxisReferenceType (axis_type) {
	const axis_types_dict = {
        "TOP": member_openings.E_POSITION_REFERENCE_TOP,
        "CENTER": member_openings.E_POSITION_REFERENCE_CENTER,
        "BOTTOM": member_openings.E_POSITION_REFERENCE_BOTTOM
	};

	if (axis_type !== undefined) {
		var type = axis_types_dict[axis_type];
		if (type === undefined) {
			console.log("Wrong type of assignment type. Value was: " + axis_type);
			console.log("Correct values are: ( " + Object.keys(axis_types_dict) + ")");
			type = member_openings.E_POSITION_REFERENCE_CENTER;
		}
		return type;
	}
	else {
		return member_openings.E_POSITION_REFERENCE_CENTER;
	}
}