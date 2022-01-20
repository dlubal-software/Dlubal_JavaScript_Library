// AxialOffset, HingeLocationAtNode: problem

/**
* Creates member eccentricity
* @class
* @constructor
* @param	{Number}	no				Index of member eccentricity, can be undefined
* @param	{Object}	member_start	Member start, can be undefined
* @param	{Object} 	member_end		Member end, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
function MemberEccentricity(no,
	member_start,
	member_end,
	comment,
	params) {
    if (arguments.length !== 0) {
		return this.memberEccentricity = createEccentricity(no, member_start, member_end, comment, params);
	}
};

/**
* Creates member eccentricity relative to section
* @param	{Number}	no				Index of member eccentricity, can be undefined
* @param	{Object}	member_start	Member start
* @param	{Object} 	member_end		Member end
* @param	{String}	alignment		Alignment, for more info look at private function setRelativeValues
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
MemberEccentricity.prototype.RelativeToSection = function (no,
	member_start,
	member_end,
	alignment,
	comment,
	params) {
	this.memberEccentricity = createEccentricity(no, member_start, member_end, comment, params);
	this.memberEccentricity.specification_type = member_eccentricities.TYPE_RELATIVE;
	setRelativeValues(this.memberEccentricity, alignment);
};

/**
* Creates absolute member eccentricity
* @param	{Number}	no				Index of member eccentricity, can be undefined
* @param	{Object}	member_start	Member start
* @param	{Object} 	member_end		Member end
* @param	{Number}	ex				Eccentricity in X
* @param	{Number}	ey				Eccentricity in Y
* @param	{Number}	ez				Eccentricity in Z
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
MemberEccentricity.prototype.Absolute = function (no,
	member_start,
	member_end,
	ex,
	ey,
	ez,
	comment,
	params) {
	this.memberEccentricity = createEccentricity(no, member_start, member_end, comment, params);
	this.memberEccentricity.specification_type = member_eccentricities.TYPE_ABSOLUTE;
	setAbsoluteValues(this.memberEccentricity, ex, ey, ez);
};

/**
* Creates absolute member eccentricity
* @param	{Number}	no				Index of member eccentricity, can be undefined
* @param	{Object}	member_start	Member start
* @param	{Object} 	member_end		Member end
* @param	{Number}	ex				Eccentricity in X
* @param	{Number}	ey				Eccentricity in Y
* @param	{Number}	ez				Eccentricity in Z
* @param	{String}	alignment		Alignment, for more info look at private function setRelativeValues
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
MemberEccentricity.prototype.RelativeAndAbsolute = function (no,
	member_start,
	member_end,
	alignment,
	ex,
	ey,
	ez,
	comment,
	params) {
	this.memberEccentricity = createEccentricity(no, member_start, member_end, comment, params);
	this.memberEccentricity.specification_type = member_eccentricities.TYPE_RELATIVE_AND_ABSOLUTE;
	setRelativeValues(this.memberEccentricity, alignment);
	setAbsoluteValues(this.memberEccentricity, ex, ey, ez);
};

/**
* Sets axial offset from adjoining member
* @param	{Boolean}	active	True if undefined
*/
MemberEccentricity.prototype.AxialOffset = function (active) {
	if (typeof active !== "undefined") {
		active = true;
	}
	this.memberEccentricity.axial_offset_active = active;
};

/**
* Sets hinge location at node (if applied)
* @param	{Boolean}	active	True if undefined
*/
MemberEccentricity.prototype.HingeLocationAtNode = function (active) {
	if (typeof active !== "undefined") {
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
* @param	{String}	reference_type			Reference type
* @param	{Number}	reference object index	Reference member or surface index
* @param	{Number}	reference_node_index	Reference member node index, in case of surface is undefined
* @param	{String}	alignment				For member offset: "left_top", "middle_top", "right_top", "left_middle", "middle_middle", "right_middle", "left_bottom", "middle_bottom", "right_bottom"
*												For surface offset: "middle_top", "middle_middle", "middle_bottom"
*/
var setTransverseOffset = function (memberEccentricity,
	reference_type,
	reference_object_index,
	reference_node_index,
	alignment) {
	memberEccentricity.transverse_offset_reference_type = reference_type;
	
	if (reference_type === member_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_MEMBER_SECTION) {
		memberEccentricity.transverse_offset_reference_member = reference_object_index;
		if (typeof reference_node_index !== "undefined") {
			memberEccentricity.transverse_offset_member_reference_node = reference_node_index;
		}
		memberEccentricity.transverse_offset_horizontal_alignment = getAlignmentParts(alignment)[0];
		memberEccentricity.transverse_offset_vertical_alignment = getAlignmentParts(alignment)[1];
	}
	else {
		memberEccentricity.transverse_offset_reference_surface = reference_object_index;	
		memberEccentricity.vertical_section_alignment = getAlignmentParts(alignment)[1];
	}
};

/**
* Creates member eccentricity
* @param	{Number}	no				Index of member eccentricity, can be undefined
* @param	{Object}	member_start	Member start, can be undefined
* @param	{Object} 	member_end		Member end, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member eccentricity parameters, can be undefined
* @return	{Object}	Created member eccentricity
*/
var createEccentricity = function (no,
	member_start,
	member_end,
	comment,
	params) {
	var member_eccentricity = engine.create_member_eccentricity(no);

    if (typeof member_start !== "undefined")
    {
        member_start.member_eccentricity_start = member_eccentricity;
    }
    if (typeof member_end !== "undefined")
    {
        member_end.member_eccentricity_end = member_eccentricity;
    }

    set_comment_and_parameters(member_eccentricity, comment, params);
    
	return member_eccentricity;
};

/**
* Sets member eccentricity for relative to section type (private)
* @param 	{Object}	memberEccentricity	Member eccentricity to be set
* @param	{String}	alignment			Alignment ("left_top", "middle_top", "right_top", "left_middle", "middle_middle", "right_middle", "left_bottom", "middle_bottom", "right_bottom")
*/
var setRelativeValues = function (memberEccentricity,
	alignment) {
	ASSERT(memberEccentricity.specification_type !== member_eccentricities.TYPE_ABSOLUTE);
	
	var horizontal = getAlignmentParts(alignment)[0];
	var vertical = getAlignmentParts(alignment)[1];

	memberEccentricity.horizontal_section_alignment = horizontal;
	memberEccentricity.vertical_section_alignment = vertical;
};

/**
* Creates horizontal and vertical strings of alignment (private)
* @param	{String}	alignment	Alignment string
* @return	{Array}		Horizontal and vertical strings of alignment
*/
var getAlignmentParts = function (alignment) {
	var params = alignment.split("_");
	ASSERT(params.length === 2, "Wrong alignemtn string");
	
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
* @param	{Number}	ex					Eccentricity in X
* @param	{Number}	ey					Eccentricity in Y
* @param	{Number}	ez					Eccentricity in Z
*/
var setAbsoluteValues = function (memberEccentricity,
	ex,
	ey,
	ez) {
	ASSERT(memberEccentricity.specification_type !== member_eccentricities.TYPE_RELATIVE);
	
	if (typeof ex !== "undefined") {
		memberEccentricity.offset_x = ex;
	}
	if (typeof ey !== "undefined") {
		memberEccentricity.offset_y = ey;
	}
	if (typeof ez !== "undefined") {
		memberEccentricity.offset_z = ez;
	}
};