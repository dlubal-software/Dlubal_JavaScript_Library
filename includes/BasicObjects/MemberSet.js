include("../Tools/high_level_functions_support.js");

/**
 * Create Member Set
 * @class
 * @constructor
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 * @returns memberSet
 */
function MemberSet(no,
    members,
    comment,
    params) {

    if (arguments.length !== 0) {
        members = typeof members !== 'undefined' ? members : [];

        this.member_set = engine.create_member_set(no, members);
        set_comment_and_parameters(this.member_set, comment, params);
        return this.member_set;
    }
}

/**
 * @returns Number of member set
 */
MemberSet.prototype.GetNo = function() {
    return this.member_set.no;
};

/**
 * @returns Member set object
 */
MemberSet.prototype.GetMemberSet = function() {
    return this.member_set;
};

/**
 * Enable / disable Design properties for member set (Steel design add-on)
 * @param {Boolean} enabled     Enable / disable Design properties, can be undefined (true as default)
 */
MemberSet.prototype.SteelDesignProperties = function (enabled) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.member_set.design_properties_activated = enabled;
}

/**
 * Sets Steel design types
 * @param {Number} steel_effective_lengths_no 					Effective length number, can be undefined
 * @param {Number} steel_boundary_conditions_no 				Boundary condition number, can be undefined
 * @param {Number} steel_member_local_section_reduction_no 		Member local section reduction number, can be undefined
 */
MemberSet.prototype.SetSteelDesignTypes = function (steel_effective_lengths_no,
	steel_boundary_conditions_no,
	steel_member_local_section_reduction_no) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof steel_effective_lengths_no !== "undefined" && __objectExists(steel_effective_lengths_no, "Effective length", steel_effective_lengths)) {
		this.member_set.steel_effective_lengths = steel_effective_lengths_no;
	}
	if (typeof steel_boundary_conditions_no !== "undefined") {
		ASSERT(Member_IsCurrentCodeOfStandard("EN") || Member_IsCurrentCodeOfStandard("NTC"), "Boundary condition can be set only for EN, NTC code of standards");
		if (__objectExists(steel_boundary_conditions_no, "Boundary condition", steel_boundary_conditions)) {
			this.member_set.steel_boundary_conditions = steel_boundary_conditions_no;
		}
	}
	if (typeof steel_member_local_section_reduction_no !== "undefined" && __objectExists(steel_member_local_section_reduction_no, "Member local section reduction", steel_member_local_section_reductions)) {
		this.member_set.steel_member_local_section_reductions = steel_member_local_section_reduction_no;
	}
};

/**
 * Sets Steel design configurations (Steel design add-on)
 * @param {Number} member_steel_design_uls_configuration_no 	Ultimate configuration number, can be undefined
 * @param {Number} member_steel_design_sls_configuration_no 	Serviceability configuration number, can be undefined
 * @param {Number} member_steel_design_fr_configuration_no 		Fire resistance configuration number, can be undefined
 */
MemberSet.prototype.SetSteeleDesignConfigurations = function (member_steel_design_uls_configuration_no,
	member_steel_design_sls_configuration_no,
	member_steel_design_fr_configuration_no) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof member_steel_design_uls_configuration_no !== "undefined") {
		ASSERT(!Member_IsCurrentCodeOfStandard("AISC"), "Ultimate configuration can't be set for AISC code of standard");
		if (__objectExists(member_steel_design_uls_configuration_no, "Ultimate configuration", STEEL_DESIGN.steel_design_uls_configurations)) {
			this.member_set.member_steel_design_uls_configuration = member_steel_design_uls_configuration_no;
		}
	}
	if (typeof member_steel_design_sls_configuration_no !== "undefined" && __objectExists(member_steel_design_sls_configuration_no, "Serviceability configuration", STEEL_DESIGN.steel_design_sls_configurations)) {
		this.member_set.member_steel_design_sls_configuration = member_steel_design_sls_configuration_no;
	}
	if (typeof member_steel_design_fr_configuration_no !== "undefined") {
		ASSERT(Member_IsCurrentCodeOfStandard("EN") || Member_IsCurrentCodeOfStandard("NTC"), "Fire resistance configuration can be set only for EN, NTC code of standards");
		if (__objectExists(member_steel_design_fr_configuration_no, "Fire resistance configuration", STEEL_DESIGN.steel_design_fr_configurations)) {
			this.member_set.member_steel_design_fr_configuration = member_steel_design_fr_configuration_no;
		}
	}
};

/**
 * Create Continuous Member memberSet type
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 */
MemberSet.prototype.ContinuousMembers = function (no,
    members,
    comment,
    params) {
    if (typeof (members) !== "undefined") {
        members = typeof members !== 'undefined' ? members : [];
        this.member_set = engine.create_member_set(no, members);
        this.member_set.set_type = member_sets.SET_TYPE_CONTINUOUS;
        set_comment_and_parameters(this.member_set, comment, params);
    }
};

/**
 * Create Group of  Member memberSet type
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 */
MemberSet.prototype.GroupOfMembers = function (no,
    members,
    comment,
    params) {
    if (typeof (members) !== "undefined") {
        members = typeof members !== 'undefined' ? members : [];
        this.member_set = engine.create_member_set(no, members);
        this.member_set.set_type = member_sets.SET_TYPE_GROUP;
        set_comment_and_parameters(this.member_set, comment, params);
    }
};

MemberSet.prototype.GetNo = function(){
	return this.member_set.no;
};

MemberSet.prototype.GetMember = function (){
	return this.member_set;
};

/**
 * Enable / disable Design properties for member set (Steel design add-on)
 * @param {Boolean} enabled 	Enable / disable Design properties, can be undefined (true as default)
 */
MemberSet.prototype.SteelDesignProperties = function (enabled) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.member_set.design_properties_activated = enabled;
};

/**
 * Sets Design supports
 * @param {Number} design_support_on_member_set_start 	Design support at member start, can be undefined
 * @param {Number} design_support_on_member_set_end 	Design support at member end, can be undefined
 */
MemberSet.prototype.SetDesignSupport = function (design_support_on_member_set_start,
	design_support_on_member_set_end) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof design_support_on_member_set_start !== "undefined") {
		if (__objectExists(design_support_on_member_set_start, "Design support", design_supports)) {
			this.member_set.design_support_on_member_set_start = design_support_on_member_set_start;
		}
	}
	if (typeof design_support_on_member_set_end !== "undefined") {
		if (__objectExists(design_support_on_member_set_end, "Design support", design_supports)) {
			this.member_set.design_support_on_member_set_end = design_support_on_member_set_end;
		}
	}
};

/**
 * Sets Design supports at internal nodes (Function takes arguments as design properties numbers)
 */
MemberSet.prototype.SetDesignSupportAtInternalNodes = function () {
	ASSERT(arguments.length < this.member_set.members.length, "Arguments count must be less then " + this.member_set.members.length);
	for (var i = 0; i < arguments.length; ++i) {
		if (typeof arguments[i] !== "undefined") {
			if (__objectExists(arguments[i], "Design support", design_supports)) {
				this.member_set.design_supports_on_internal_nodes[i + 1].design_support = arguments[i];
			}
		}
	}
};

/**
 * Sets Deflection analysis
 * @param {String} deflection_check_direction 				Check direction (LOCAL_AXIS_Z, LOCAL_AXIS_Y, LOCAL_AXIS_Z_AND_Y, RESULTING_AXIS), can be undefined (LOCAL_AXIS_Z_AND_Y as default)
 * @param {String} deflection_check_displacement_reference 	Displacement reference (DEFORMED_SEGMENT_ENDS, DEFORMED_UNDEFORMED_SYSTEM), can be undefined (DEFORMED_SEGMENT_ENDS as default)
 * @param {Array} segments_in_z_axis 						Segments in z-axis ([[active_1, length_1, precamber_1], ... [active_n, length_n, precamber_n]]), can be undefined
 * @param {Boolean} active_y 								Segment in y-axis - active, can be undefined (true as default)
 * @param {Number} length_y 								Segment in y-axis - length, can be undefined (member length as default)
 * @param {Number} precamber_y 								Segment in y-axis - precamber, can be undefined (0.0 as default)
 */
MemberSet.prototype.SetDeflectionAnalysis = function (deflection_check_direction,
	deflection_check_displacement_reference,
	deflection_segments_z_axis_items,
	active_y,
	length_y,
	precamber_y) {
	function GetDesignSupportsAtInternalNodesCount (member_set) {
		var count = 0;
		for (var i = 0; i < member_set.design_supports_on_internal_nodes.row_count(); ++i) {
			if (member_set.design_supports_on_internal_nodes[i + 1].design_support !== null) {
				count++;
			}
		}
		return count;
	}
	var designSupportAtInternalNodesCount = GetDesignSupportsAtInternalNodesCount(this.member_set);
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	this.member_set.deflection_check_direction = GetMemberDesignSupportCheckDirection(deflection_check_direction);
	this.member_set.deflection_check_displacement_reference = GetMemberDesignCheckDisplacementDirection(deflection_check_displacement_reference);
	ASSERT(Array.isArray(deflection_segments_z_axis_items), "deflection_segments_z_axis_items must be array of arrays ([[active_1, length_1, precamber_1], ... [active_n, length_n, precamber_n]])");
	ASSERT(deflection_segments_z_axis_items.length <= designSupportAtInternalNodesCount + 1, "deflection_segments_z_axis_items must have size less or equal to " + (designSupportAtInternalNodesCount + 1).toString());
	for (var i = 0; i < deflection_segments_z_axis_items.length; ++i) {
		if (deflection_segments_z_axis_items[i] === undefined) {
			continue;
		}
		ASSERT(Array.isArray(deflection_segments_z_axis_items[i], "[active_1, length_1, precamber_1]"));
		ASSERT(deflection_segments_z_axis_items[i].length === 3, "[active_1, length_1, precamber_1]");
		if (deflection_segments_z_axis_items[i][0] !== undefined) {
			ASSERT(this.member_set.deflection_check_direction !== member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y, "Check direction can't be " + member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y);
			this.member.deflection_segments_z_axis[i + 1].active = deflection_segments_z_axis_items[i][0];
		}
		if (deflection_segments_z_axis_items[i][1] !== undefined) {
			ASSERT(this.member_set.deflection_check_direction !== member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y, "Check direction can't be " + member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y);
			this.member_set.deflection_segments_defined_length_z_axis_enabled = true;
			this.member_set.deflection_segments_z_axis[i + 1].length = deflection_segments_z_axis_items[i][1];
		}
		else {
			this.member_set.deflection_segments_defined_length_z_axis_enabled = false;
		}
		if (deflection_segments_z_axis_items[i][2] !== undefined) {
			ASSERT(this.member_set.deflection_check_direction !== member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y, "Check direction can't be " + member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y);
			this.member_set.deflection_segments_z_axis[i + 1].precamber = deflection_segments_z_axis_items[i][2];
		}
	}
	if (typeof active_y !== "undefined") {
		ASSERT(this.member_set.deflection_check_direction !== member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z, "Check direction can't be " + member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z);
		this.member_set.deflection_segments_y_axis[1].active = active_y;
	}
	if (typeof length_y !== "undefined") {
		ASSERT(this.member_set.deflection_check_direction !== member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z, "Check direction can't be " + member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z);
		this.member_set.deflection_segments_defined_length_y_axis_enabled = true;
		this.member_set.deflection_segments_y_axis[1].length = length_y;
	}
	else {
		this.member_set.deflection_segments_defined_length_y_axis_enabled = false;
	}
	if (typeof precamber_y !== "undefined") {
		ASSERT(this.member_set.deflection_check_direction !== member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z, "Check direction can't be " + member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z);
		this.member_set.deflection_segments_y_axis[1].precamber = precamber_y;
	}
};

function GetMemberSetDesignSupportCheckDirection(direction_type) {
	const direction_types_dict = {
        "LOCAL_AXIS_Z": member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z,
		"LOCAL_AXIS_Y": member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Y,
		"LOCAL_AXIS_Z_AND_Y": member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z_AND_Y,
		"RESULTING_AXIS": member_sets.DEFLECTION_CHECK_DIRECTION_RESULTING_AXIS
	};

	if (direction_type !== undefined) {
		var type = direction_types_dict[direction_type];
		if (type === undefined) {
			console.log("Wrong design support check direction type. Value was: " + direction_type);
			console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
			type = member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z_AND_Y;
		}
		return type;
	}
	else {
		return member_sets.DEFLECTION_CHECK_DIRECTION_LOCAL_AXIS_Z_AND_Y;
	}
}

function GetMemberSetDesignCheckDisplacementDirection(direction_type) {
	const direction_types_dict = {
        "DEFORMED_SEGMENT_ENDS": member_sets.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_DEFORMED_SEGMENT_ENDS,
		"DEFORMED_UNDEFORMED_SYSTEM": member_sets.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_DEFORMED_UNDEFORMED_SYSTEM
	};

	if (direction_type !== undefined) {
		var type = direction_types_dict[direction_type];
		if (type === undefined) {
			console.log("Wrong design support check displacement type. Value was: " + direction_type);
			console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
			type = member_sets.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_DEFORMED_SEGMENT_ENDS;
		}
		return type;
	}
	else {
		return member_sets.DEFLECTION_CHECK_DISPLACEMENT_REFERENCE_DEFORMED_SEGMENT_ENDS;
	}
}