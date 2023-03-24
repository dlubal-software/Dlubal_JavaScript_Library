/**
 * Creates Steel design Member local section reduction
 * @param {Number} no               Steel design member local section reduction index, can be undefined
 * @param {String} name             Name, can be undefined
 * @param {Array} members_no        List of members indexes, can be undefined
 * @param {Array} member_sets_no    List of member sets indexes, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignMemberLocalSectionReduction (no,
    name,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
    if (typeof no === "undefined") {
        this.member_local_section_reduction = steel_member_local_section_reductions.create();
    }
    else {
        this.member_local_section_reduction = steel_member_local_section_reductions.create(no);
    }
    if (typeof name !== "undefined") {
        this.member_local_section_reduction.user_defined_name_enabled = true;
        this.member_local_section_reduction.name = name;
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
        this.member_local_section_reduction.members = members_no;
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
        this.member_local_section_reduction.member_sets = member_sets_no;
    }
    set_comment_and_parameters(this.member_local_section_reduction, comment, params);
}

/**
 * @returns Member local section reduction number
 */
SteelDesignMemberLocalSectionReduction.prototype.GetNo = function () {
    return this.member_local_section_reduction.no;
};

/**
 * @returns Member local section reduction object
 */
SteelDesignMemberLocalSectionReduction.prototype.MemberLocalSectionReduction = function () {
    return this.member_local_section_reduction;
};

/**
 * Adds reduction type and location
 * @param {String} reduction_type   Reduction type (DESIGN_PARAMETERS, SECTION_VALUES), can be undefined (DESIGN_PARAMETERS as default)
 * @param {Number} position         Position
 * @param {Boolean} multiple        Multiple, can be undefined (false as default)
 */
SteelDesignMemberLocalSectionReduction.prototype.AddReductionType = function (reduction_type,
    position,
    multiple) {
    ASSERT(typeof position !== "undefined", "Position must be defined");
    if (typeof multiple === "undefined") {
        multiple = false;
    }
    var row_index = this.member_local_section_reduction.components.row_count();
    this.member_local_section_reduction.components[row_index].reduction_type = GetSteelDesignReductionType(reduction_type);
    if (typeof position !== "undefined") {
        this.member_local_section_reduction.components[row_index].position = position;
    }
    if (typeof multiple !== "undefined") {
        this.member_local_section_reduction.components[row_index].multiple = multiple;
    }
};

/**
 * Sets Design parameters
 * @param {Number} row                  Row
 * @param {String} definition_type      Definition type (ABSOLUTE, RELATIVE), can be undefined (ABSOLUTE as default)
 * @param {Number} reduction_area       Area of reduction
 */
SteelDesignMemberLocalSectionReduction.prototype.DesignParameters = function (row,
    definition_type,
    reduction_area) {
    ASSERT(typeof row !== "undefined", "Row must be defined");
    ASSERT(this.member_local_section_reduction.components[row].reduction_type === steel_member_local_section_reductions.REDUCTION_COMPONENT_TYPE_DESIGN_PARAMETERS, "Design parameters reduction type must be set");
    ASSERT(row >= 1 && row <= this.member_local_section_reduction.components.row_count(), "Row must be in range 1-" + this.member_local_section_reduction.components.row_count());
    ASSERT(typeof reduction_area !== "undefined", "Area of reduction must be defined, row " + row.toString());
    this.member_local_section_reduction.components[row].fastener_definition_type = GetSteelDesignDefinitionType(definition_type);
    if (this.member_local_section_reduction.components[row].fastener_definition_type === steel_member_local_section_reductions.DEFINITION_TYPE_ABSOLUTE) {
        this.member_local_section_reduction.components[row].reduction_area = reduction_area;
    }
    else {
        ASSERT(this.member_local_section_reduction.components[row].fastener_definition_type === steel_member_local_section_reductions.DEFINITION_TYPE_RELATIVE);
        this.member_local_section_reduction.components[row].reduction_area_factor = reduction_area;
    }
};

/**
 * Sets Section values
 * @param {Number} row                      Row
 * @param {String} definition_type          Definition type (ABSOLUTE, RELATIVE), can be undefined (ABSOLUTE as default)
 * @param {Number} sectional_area           Net sectional area / Sectional area factor, can be undefined (is not set, 0.1 / 100 as default)
 * @param {Number} shear_area_y             Net shear area y / Shear area y factor, can be undefined (is not set, 0.1 / 100 as default)
 * @param {Number} shear_area_z             Net shear area z / Shear area z factor, can be undefined (is not set, 0.1 / 100 as default)
 * @param {Number} moment_of_inertia_y      Net moment of inertia y / Moment of inertia y factor, can be undefined (is not set, 0.1 / 100 as default)
 * @param {Number} moment_of_inertia_z      Net moment of inertia z / Moment of inertia z factor, can be undefined (is not set, 0.1 / 100 as default)
 * @param {Number} torsional_constant       Net torsional constant / Torsional constant factor, can be undefined (is not set, 0.1 / 100 as default)
 */
SteelDesignMemberLocalSectionReduction.prototype.SectionValues = function (row,
    definition_type,
    sectional_area,
    shear_area_y,
    shear_area_z,
    moment_of_inertia_y,
    moment_of_inertia_z,
    torsional_constant) {
    ASSERT(this.member_local_section_reduction.components[row].reduction_type === steel_member_local_section_reductions.REDUCTION_COMPONENT_TYPE_SECTION_VALUES, "Section values reduction type must be set");
    ASSERT(row >= 1 && row <= this.member_local_section_reduction.components.row_count(), "Row must be in range 1-" + this.member_local_section_reduction.components.row_count());
    this.member_local_section_reduction.components[row].definition_type = GetSteelDesignDefinitionType(definition_type);
    var definitionTypeAbsolute = this.member_local_section_reduction.components[row].definition_type === steel_member_local_section_reductions.DEFINITION_TYPE_ABSOLUTE;
    if (typeof sectional_area !== "undefined") {
        if (definitionTypeAbsolute) {
            this.member_local_section_reduction.components[row].net_sectional_area = sectional_area;
        }
        else {
            this.member_local_section_reduction.components[row].sectional_area_factor = sectional_area;
        }
    }
    if (typeof shear_area_y !== "undefined") {
        if (definitionTypeAbsolute) {
            this.member_local_section_reduction.components[row].net_shear_area_y = shear_area_y;
        }
        else {
            this.member_local_section_reduction.components[row].shear_area_y_factor = shear_area_y;
        }
    }
    if (typeof shear_area_z !== "undefined") {
        if (definitionTypeAbsolute) {
            this.member_local_section_reduction.components[row].net_shear_area_z = shear_area_z;
        }
        else {
            this.member_local_section_reduction.components[row].shear_area_z_factor = shear_area_z;
        }
    }
    if (typeof moment_of_inertia_y !== "undefined") {
        if (definitionTypeAbsolute) {
            this.member_local_section_reduction.components[row].net_moment_of_inertia_y = moment_of_inertia_y;
        }
        else {
            this.member_local_section_reduction.components[row].moment_of_inertia_y_factor = moment_of_inertia_y;
        }
    }
    if (typeof moment_of_inertia_z !== "undefined") {
        if (definitionTypeAbsolute) {
            this.member_local_section_reduction.components[row].net_moment_of_inertia_z = moment_of_inertia_z;
        }
        else {
            this.member_local_section_reduction.components[row].moment_of_inertia_z_factor = moment_of_inertia_z;
        }
    }
    if (typeof torsional_constant !== "undefined") {
        if (definitionTypeAbsolute) {
            this.member_local_section_reduction.components[row].net_torsional_constant = torsional_constant;
        }
        else {
            this.member_local_section_reduction.components[row].torsional_constant_factor = torsional_constant;
        }
    }
}

/**
 * Sets multiple definition
 * @param {Number} row                                  Row
 * @param {Number} multiple_number                      Number, can be undefined (is not set, 2 as default)
 * @param {String} multiple_offset_definition_type      Offset definition type (ABSOLUTE, RELATIVE), can be undefined (is not set, ABSOLUTE as default)
 * @param {Number} multiple_offset                      Offset
 */
SteelDesignMemberLocalSectionReduction.prototype.MultipleDefinition = function (row,
    multiple_number,
    multiple_offset_definition_type,
    multiple_offset) {
    ASSERT(row >= 1 && row <= this.member_local_section_reduction.components.row_count(), "Row must be in range 1-" + this.member_local_section_reduction.components.row_count());
    ASSERT(this.member_local_section_reduction.components[row].multiple, "Multiple must be on, row " + row.toString());
    if (typeof multiple_number !== "undefined") {
        this.member_local_section_reduction.components[row].multiple_number = multiple_number;
    }
    this.member_local_section_reduction.components[row].multiple_offset_definition_type = GetSteelDesignMultipleOffsetDefinitionType(multiple_offset_definition_type);
    ASSERT(typeof multiple_offset !== "undefined", "Multiple offset must be defined, row " + multiple_offset.toString());
    this.member_local_section_reduction.components[row].multiple_offset = multiple_offset;
}

function GetSteelDesignReductionType(reduction_type) {
	const reduction_types_dict = {
        "DESIGN_PARAMETERS": steel_member_local_section_reductions.REDUCTION_COMPONENT_TYPE_DESIGN_PARAMETERS,
        "SECTION_VALUES": steel_member_local_section_reductions.REDUCTION_COMPONENT_TYPE_SECTION_VALUES
	};

	if (reduction_type !== undefined) {
		var type = reduction_types_dict[reduction_type];
		if (type === undefined) {
			console.log("Wrong reduction type. Value was: " + reduction_type);
			console.log("Correct values are: ( " + Object.keys(reduction_types_dict) + ")");
			type = steel_member_local_section_reductions.REDUCTION_COMPONENT_TYPE_DESIGN_PARAMETERS;
		}
		return type;
	}
	else {
		return steel_member_local_section_reductions.REDUCTION_COMPONENT_TYPE_DESIGN_PARAMETERS;
	}
}

function GetSteelDesignDefinitionType(definition_type) {
	const definition_types_dict = {
        "ABSOLUTE": steel_member_local_section_reductions.DEFINITION_TYPE_ABSOLUTE,
        "RELATIVE": steel_member_local_section_reductions.DEFINITION_TYPE_RELATIVE
	};

	if (definition_type !== undefined) {
		var type = definition_types_dict[definition_type];
		if (type === undefined) {
			console.log("Wrong definition type. Value was: " + definition_type);
			console.log("Correct values are: ( " + Object.keys(definition_types_dict) + ")");
			type = steel_member_local_section_reductions.DEFINITION_TYPE_ABSOLUTE;
		}
		return type;
	}
	else {
		return steel_member_local_section_reductions.DEFINITION_TYPE_ABSOLUTE;
	}
}

function GetSteelDesignMultipleOffsetDefinitionType(definition_type) {
	const definition_types_dict = {
        "ABSOLUTE": steel_member_local_section_reductions.OFFSET_DEFINITION_TYPE_ABSOLUTE,
        "RELATIVE": steel_member_local_section_reductions.OFFSET_DEFINITION_TYPE_RELATIVE
	};

	if (definition_type !== undefined) {
		var type = definition_types_dict[definition_type];
		if (type === undefined) {
			console.log("Wrong definition type. Value was: " + definition_type);
			console.log("Correct values are: ( " + Object.keys(definition_types_dict) + ")");
			type = steel_member_local_section_reductions.OFFSET_DEFINITION_TYPE_ABSOLUTE;
		}
		return type;
	}
	else {
		return steel_member_local_section_reductions.OFFSET_DEFINITION_TYPE_ABSOLUTE;
	}
}