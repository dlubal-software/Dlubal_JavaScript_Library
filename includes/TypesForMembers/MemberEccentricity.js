// AxialOffset, HingeLocationAtNode: problem

const SectionAlignment = {
	"SECTION_ALIGNMENT_LEFT_TOP" : "left_top",
	"SECTION_ALIGNMENT_CENTER_TOP" : "middle_top",
	"SECTION_ALIGNMENT_RIGHT_TOP" : "right_top",
	"SECTION_ALIGNMENT_LEFT_CENTER" : "left_middle",
	"SECTION_ALIGNMENT_CENTER_CENTER" : "middle_middle",
	"SECTION_ALIGNMENT_RIGHT_CENTER" : "right_middle",
	"SECTION_ALIGNMENT_LEFT_BOTTOM" : "left_bottom",
	"SECTION_ALIGNMENT_CENTER_BOTTOM" : "middle_bottom",
	"SECTION_ALIGNMENT_RIGHT_BOTTOM" : "right_bottom"
};

/**
* Creates member eccentricity
* @class
* @constructor
* @param	{Number}	no					Index of member eccentricity, can be undefined
* @param	{Array}		members_start_list	Members start, can be undefined
* @param	{Array} 	members_end_list	Members end, can be undefined
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
function MemberEccentricity(no,
	members_start_list,
	members_end_list,
	comment,
	params) {
    if (arguments.length !== 0) {
		this.memberEccentricity = createEccentricity(no, members_start_list, members_end_list, comment, params);
		return this.memberEccentricity;
	}
}

/**
* Creates member eccentricity relative to section
* @param	{Number}	no					Index of member eccentricity, can be undefined
* @param	{Array}		members_start_list	Member start
* @param	{Array} 	members_end_list	Member end
* @param	{String}	alignment			Alignment, for more info look at private function setRelativeValues
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
MemberEccentricity.prototype.RelativeToSection = function (no,
	members_start_list,
	members_end_list,
	alignment,
	comment,
	params) {
	this.memberEccentricity = createEccentricity(no, members_start_list, members_end_list, comment, params);
	this.memberEccentricity.specification_type = member_eccentricities.TYPE_RELATIVE;
	setRelativeValues(this.memberEccentricity, alignment);
};

/**
* Creates absolute member eccentricity
* @param	{Number}	no					Index of member eccentricity, can be undefined
* @param	{Array}		members_start_list	Members start
* @param	{Array} 	members_end_list	Members end
* @param	{Number}	offset_x			Eccentricity in X
* @param	{Number}	offset_y			Eccentricity in Y
* @param	{Number}	offset_z			Eccentricity in Z
* @param	{Number}	coordinate_system	Coordinate system, can be undefined. Default value is "Local xyz".
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
MemberEccentricity.prototype.Absolute = function (no,
	members_start_list,
	members_end_list,
	offset_x,
	offset_y,
	offset_z,
	coordinate_system,
	comment,
	params) {
	this.memberEccentricity = createEccentricity(no, members_start_list, members_end_list, comment, params);
	this.memberEccentricity.specification_type = member_eccentricities.TYPE_ABSOLUTE;
	setAbsoluteValues(this.memberEccentricity, offset_x, offset_y, offset_z, coordinate_system);
};

/**
* Creates absolute member eccentricity
* @param	{Number}	no					Index of member eccentricity, can be undefined
* @param	{Array}		members_start_list	Members start
* @param	{Array} 	members_end_list	Members end
* @param	{Number}	offset_x			Eccentricity in X
* @param	{Number}	offset_y			Eccentricity in Y
* @param	{Number}	offset_z			Eccentricity in Z
* @param	{Number}	coordinate_system	Coordinate system, can be undefined. Default value is "Local xyz".
* @param	{String}	alignment			Alignment, for more info look at private function setRelativeValues
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
MemberEccentricity.prototype.RelativeAndAbsolute = function (no,
	members_start_list,
	members_end_list,
	alignment,
	offset_x,
	offset_y,
	offset_z,
	coordinate_system,
	comment,
	params) {
	this.memberEccentricity = createEccentricity(no, members_start_list, members_end_list, comment, params);
	this.memberEccentricity.specification_type = member_eccentricities.TYPE_RELATIVE_AND_ABSOLUTE;
	setRelativeValues(this.memberEccentricity, alignment);
	setAbsoluteValues(this.memberEccentricity, offset_x, offset_y, offset_z, coordinate_system);
};

/**
* Sets axial offset from adjoining member
* @param	{Boolean}	active	True if undefined
*/
MemberEccentricity.prototype.AxialOffset = function (active) {
	if (typeof active === "undefined") {
		active = true;
	}
	this.memberEccentricity.axial_offset_active = active;
};

/**
* Sets hinge location at node (if applied)
* @param	{Boolean}	active	True if undefined
*/
MemberEccentricity.prototype.HingeLocationAtNode = function (active) {
	if (typeof active === "undefined") {
		active = true;
	}
	this.memberEccentricity.hinge_location_at_node = active;
};

/**
* Transverse offset from section of another member
* @param	{Number}	reference_member	Reference member
* @param	{Number}	reference_node		Reference member's node, can be undefined
* @param	{String}	alignment			Alignment, for more info look at private function setTransverseOffset
*/
MemberEccentricity.prototype.TransverseOffsetMember = function (reference_member_index,
	alignment,
	reference_node_index) {
	setTransverseOffset(this.memberEccentricity, member_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_MEMBER_SECTION, reference_member_index, reference_node_index, alignment);
};

/**
* Transverse offset from section of another thickness of other surface
* @param	{Number}	reference_surface	Reference surface
* @param	{String}	alignment			Alignment, for more info look at private function setTransverseOffset
*/
MemberEccentricity.prototype.TransverseOffsetSurface = function (reference_surface_index,
	alignment) {
	setTransverseOffset(this.memberEccentricity, member_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_SURFACE_THICKNESS, reference_surface_index, undefined, alignment);
};

/**
* Set off transverse offset
*/
MemberEccentricity.prototype.TransverseOffsetNone = function () {
	this.memberEccentricity.transverse_offset_reference_type = member_eccentricities.TRANSVERSE_OFFSET_TYPE_NONE;
};

/**
* Sets transverse offset (private)
* @param	{Object}	memberEccentricity		Member eccentricity to be set
* @param	{String}	reference_type			Reference type ("None", "Member", "Surface")
* @param	{Number}	reference object index	Reference member or surface index
* @param	{Number}	reference_node_index	Reference member node index, in case of surface is undefined
* @param	{String}	alignment_type			For member offset:	SECTION_ALIGNMENT_LEFT_TOP,
*																	SECTION_ALIGNMENT_CENTER_TOP,
*																	SECTION_ALIGNMENT_RIGHT_TOP,
*																	SECTION_ALIGNMENT_LEFT_CENTER,
*																	SECTION_ALIGNMENT_CENTER_CENTER,
*																	SECTION_ALIGNMENT_RIGHT_CENTER,
*																	SECTION_ALIGNMENT_LEFT_BOTTOM,
*																	SECTION_ALIGNMENT_CENTER_BOTTOM,
*																	SECTION_ALIGNMENT_RIGHT_BOTTOM.
*												For surface offset:	SECTION_ALIGNMENT_CENTER_TOP,
*																	SECTION_ALIGNMENT_CENTER_CENTER,
*																	SECTION_ALIGNMENT_CENTER_BOTTOM.
*/
var setTransverseOffset = function (member_eccentricity,
	reference_type,
	reference_object_index,
	reference_node_index,
	alignment_type) {
	member_eccentricity.transverse_offset_reference_type = reference_type;
	ASSERT(alignment_type in SectionAlignment, "Unknown alignment type");

	var alignment = SectionAlignment[alignment_type];

	if (reference_type === member_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_MEMBER_SECTION) {
		member_eccentricity.transverse_offset_reference_member = reference_object_index;
		if (typeof reference_node_index !== "undefined") {
			member_eccentricity.transverse_offset_member_reference_node = reference_node_index;
		}
		member_eccentricity.transverse_offset_horizontal_alignment = getAlignmentParts(alignment)[0];
		member_eccentricity.transverse_offset_vertical_alignment = getAlignmentParts(alignment)[1];
	}
	else {
		member_eccentricity.transverse_offset_reference_surface = reference_object_index;
		member_eccentricity.vertical_section_alignment = getAlignmentParts(alignment)[1];
	}
};

/**
* Creates member eccentricity
* @param	{Number}	no					Index of member eccentricity, can be undefined
* @param	{Array}		members_start_list	Members start, can be undefined
* @param	{Array} 	members_end_list	Members end, can be undefined
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
var createEccentricity = function (no,
	members_start_list,
	members_end_list,
	comment,
	params) {
	var member_eccentricity = engine.create_member_eccentricity(no);

	if (typeof members_start_list !== "undefined") {
		for (var i = 0; i < members_start_list.length; ++i) {
			if (members.exist(members_start_list[i])) {
				members[members_start_list[i]].member_eccentricity_start = member_eccentricity;
			}
			else {
				console.log("Member no." + members_start_list[i] + " does not exist");
			}
		}
	}

	if (typeof members_end_list !== "undefined") {
		for (var i = 0; i < members_end_list.length; ++i) {
			if (members.exist(members_end_list[i])) {
				members[members_end_list[i]].member_eccentricity_start = member_eccentricity;
			}
			else {
				console.log("Member no." + members_end_list[i] + " does not exist");
			}
		}
	}

    set_comment_and_parameters(member_eccentricity, comment, params);

	return member_eccentricity;
};

/**
* Sets member eccentricity for relative to section type (private)
* @param 	{Object}	member_eccentricity	Member eccentricity to be set
* @param	{String}	alignment_type		Alignment: 	SECTION_ALIGNMENT_LEFT_TOP,
*														SECTION_ALIGNMENT_CENTER_TOP,
*														SECTION_ALIGNMENT_RIGHT_TOP,
*														SECTION_ALIGNMENT_LEFT_CENTER,
*														SECTION_ALIGNMENT_CENTER_CENTER,
*														SECTION_ALIGNMENT_RIGHT_CENTER,
*														SECTION_ALIGNMENT_LEFT_BOTTOM,
*														SECTION_ALIGNMENT_CENTER_BOTTOM,
*														SECTION_ALIGNMENT_RIGHT_BOTTOM.
*/
var setRelativeValues = function (member_eccentricity,
	alignment_type) {
	ASSERT(member_eccentricity.specification_type !== member_eccentricities.TYPE_ABSOLUTE);
	ASSERT(alignment_type in SectionAlignment, "Unknown alignment type");

	var alignment = SectionAlignment[alignment_type];
	var horizontal = getAlignmentParts(alignment)[0];
	var vertical = getAlignmentParts(alignment)[1];

	member_eccentricity.horizontal_section_alignment = horizontal;
	member_eccentricity.vertical_section_alignment = vertical;
};

/**
* Creates horizontal and vertical strings of alignment (private)
* @param	{String}	alignment	Alignment string
* @return	{Array}		Horizontal and vertical strings of alignment
*/
var getAlignmentParts = function (alignment) {
	var params = alignment.split("_");
	ASSERT(params.length === 2, "Wrong alignment string");

	var horizontal = params[0].charAt(0).toUpperCase() + params[0].slice(1);
	var vertical = params[1].charAt(0).toUpperCase() + params[1].slice(1);
	if (horizontal !== "Middle") {
		horizontal += (horizontal === "Left") ? " (-y)" : " (+y)";
	}
	if (vertical !== "Middle") {
		vertical += (vertical === "Top") ? " (-z)" : " (+z)";
	}

	return [horizontal, vertical];
};

/**
* Sets member eccentricity for absolute type (private)
* @param	{Object}	memberEccentricity	Member eccentricity to be set
* @param	{Number}	offset_x			Eccentricity in X
* @param	{Number}	offset_y			Eccentricity in Y
* @param	{Number}	offset_z			Eccentricity in Z
* @param	{Number}	coordinate_system	Coordinate system, can be undefined. Default value is "Local xyz".
*/
var setAbsoluteValues = function (member_eccentricity,
	offset_x,
	offset_y,
	offset_z,
	coordinate_system) {
	ASSERT(member_eccentricity.specification_type !== member_eccentricities.TYPE_RELATIVE);

	if (typeof offset_x !== "undefined") {
		member_eccentricity.offset_x = offset_x;
	}
	if (typeof offset_y !== "undefined") {
		member_eccentricity.offset_y = offset_y;
	}
	if (typeof offset_z !== "undefined") {
		member_eccentricity.offset_z = offset_z;
	}
	if (typeof coordinate_system !== "undefined") {
		member_eccentricity.coordinate_system = coordinate_system;
	}
};