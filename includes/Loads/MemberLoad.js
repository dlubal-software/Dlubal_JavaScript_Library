include("BaseLoad.js");

/**
Bug?
LOAD_TYPE_PIPE_CONTENT_FULL, LOAD_TYPE_PIPE_CONTENT_PARTIAL:
- here is bug, load direction is not allowed to set (+ZL, -ZL) - SetMemberLoadDirectionTypeWithDirectionOrientation function bellow
 */

/**
* Creates member load
* @class
* @constructor
* @param	{Number}	no					Index of member load, can be undefined
* @param	{Object}	load_case			Load case
* @param	{Array}		members				List of member indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created member load
*/
function MemberLoad(no,
				    load_case,
				    members,
				    comment,
				    params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	}
}

/**
 * Creates member force load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member force load
*/
MemberLoad.prototype.Force = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_FORCE, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_FORCE, load_direction);
	}

	return this.load;
};

/**
 * Creates member moment load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member moment load
*/
MemberLoad.prototype.Moment = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_MOMENT, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_MOMENT, load_direction);
	}

	return this.load;
};

/**
 * Creates member mass load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Number}	load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member mass load
*/
MemberLoad.prototype.Mass = function (no,
	load_case,
	members,
	load_value,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.E_TYPE_MASS, undefined, [load_value]);

	return this.load;
};

/**
 * Creates member temperature load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member temperature load
*/
MemberLoad.prototype.Temperature = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_TEMPERATURE, load_direction);
	}

	return this.load;
};

/**
 * Creates member temperature change load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member temperature change load
*/
MemberLoad.prototype.TemperatureChange = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_TEMPERATURE_CHANGE, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_TEMPERATURE_CHANGE, load_direction);
	}

	return this.load;
};

/**
 * Creates member axial strain load
 * @param	{Number}	no					Index of member load, can be undefined
 * @param	{Object}	load_case			Load case
 * @param	{Array}		members				List of member indexes
 * @param	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member axial strain load
*/
MemberLoad.prototype.AxialStrain = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);

	return this.load;
};

/**
 * Creates member axial displacement load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Number}	load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member axial displacement load
*/
MemberLoad.prototype.AxialDisplacement = function (no,
	load_case,
	members,
	load_value,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT, undefined, [load_value]);

	return this.load;
};

/**
 * Creates member precamber load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member precamber load
*/
MemberLoad.prototype.Precamber = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PRECAMBER, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_PRECAMBER, load_direction);
	}

	return this.load;
};

/**
 * Creates member initial prestress load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Number}	load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member initial prestress load
*/
MemberLoad.prototype.InitialPrestress = function (no,
	load_case,
	members,
	load_value,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_INITIAL_PRESTRESS, undefined, [load_value]);

	return this.load;
};

/**
 * Creates member displacement load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member displacement load
*/
MemberLoad.prototype.Displacement = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_DISPLACEMENT, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_DISPLACEMENT, load_direction);
	}

	return this.load;
};

/**
 * Creates member rotation load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member rotation load
*/
MemberLoad.prototype.Rotation = function (no,
	load_case,
	members,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_ROTATION, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetMemberLoadDirectionType(member_loads.LOAD_TYPE_ROTATION, load_direction);
	}

	return this.load;
};

/**
 * Creates member content full load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Number}	load_value			Uniform load parameter
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member pipe content full load
*/
MemberLoad.prototype.PipeContentFull = function (no,
	load_case,
	members,
	load_value,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_CONTENT_FULL, undefined, [load_value]);

	if (typeof load_direction !== "undefined") {
		SetMemberLoadDirectionTypeWithDirectionOrientation(this.load, load_direction);
	}

	return this.load;
};

/**
 * Creates member pipe content partial load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Array}		load_values			Load parameters for Uniform distribution
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member pipe content partial load
*/
MemberLoad.prototype.PipeContentPartial = function (no,
	load_case,
	members,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL, undefined, load_values);

	if (typeof load_direction !== "undefined") {
		SetMemberLoadDirectionTypeWithDirectionOrientation(this.load, load_direction);
	}

	return this.load;
};

/**
 * Creates member pipe internal pressure load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Number}	load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member pipe internal pressure load
*/
MemberLoad.prototype.PipeInternalPressure = function (no,
	load_case,
	members,
	load_value,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE, undefined, [load_value]);

	return this.load;
};

/**
 * Creates member rotary motion load
 * @param 	{Number}	no					Index of member load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		members				List of member indexes
 * @param	{Number}	load_values			Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created member rotary motion load
*/
MemberLoad.prototype.RotaryMotion = function (no,
	load_case,
	members,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);

	return this.load;
};

/**
* Sets option for reference to list of members
* @param 	{Boolean}	value	When undefined, true as default
*/
MemberLoad.prototype.ReferenceToListOfMembers = function (value) {
	ASSERT(this.load.load_type !== member_loads.E_TYPE_MASS && this.load.load_type !== member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT &&
		this.load.load_type !== member_loads.LOAD_TYPE_INITIAL_PRESTRESS && this.load.load_type !== member_loads.LOAD_TYPE_PIPE_CONTENT_FULL &&
		this.load.load_type !== member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL && this.load.load_type !== member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE &&
		this.load.load_type !== member_loads.LOAD_TYPE_ROTARY_MOTION, "Reference to list of members cannot be set for this type of load");

	if (typeof value === "undefined") {
		value = true;
	}
	this.load.reference_to_list_of_members = value;
};

/**
* Sets option for refer distance to the member end
* @param 	{Boolean}	value	When undefined, true as default
*/
MemberLoad.prototype.ReferDistanceMemberEnd = function (value) {
	ASSERT(this.load.load_distribution !== member_loads.LOAD_DISTRIBUTION_UNIFORM && this.load.load_distribution !== member_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL &&
		this.load.load_distribution !== member_loads.LOAD_DISTRIBUTION_VARYING_IN_Z, "Refer distance to the member end cannot be set for this type of load distribution");

	if (typeof value === "undefined") {
		value = true;
	}

	this.load.distance_from_member_end = value;
};

/**
* Sets option for load over total length of member (only for trapezoidal load distribution)
* @param	{Boolean}	value	When undefined, true as default
*/
MemberLoad.prototype.LoadOverMember = function (value) {
	ASSERT(this.load.load_distribution === member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL, "Load over total length of member can be set only for trapezoidal load distribution");

	if (typeof value === "undefined") {
		value = true;
	}

	this.load.distance_a_is_defined_as_relative = value;
	this.load.distance_b_is_defined_as_relative = value;
	this.load.distance_a_relative = 0;
	this.load.distance_b_relative = 1;
	this.load.load_is_over_total_length = value;
};

/**
* Sets eccentricity (only force load)
* @param	{String}	reference_to			Eccentricity is refereed to what ("LEFT_TOP", "CENTER_TOP", "RIGHT_TOP", "LEFT_CENTER", "CENTER_CENTER", "RIGHT_CENTER", "LEFT_BOTTOM", "CENTER_BOTTOM", "RIGHT_BOTTOM", "CENTER_OF_GRAVITY", "SHEAR_CENTER")
* @param	{Number}	offset_member_start_ey	Offset at member start, can be undefined
* @param	{Number}	offset_member_start_ez	Offset at member start, can be undefined
* @param	{Number}	offset_member_end_ey	Offset at member end, can be undefined
* @param	{Number}	offset_member_end_ez	Offset at member end, can be undefined
*/
MemberLoad.prototype.Eccentricity = function (reference_to,
	offset_member_start_ey,
	offset_member_start_ez,
	offset_member_end_ey,
	offset_member_end_ez) {
	ASSERT(this.load.load_type === member_loads.LOAD_TYPE_FORCE, "Eccentricity can be set only for force load type");

	if (arguments.length === 0) {
		this.load.has_force_eccentricity = false;
		return;
	}

	this.load.has_force_eccentricity = true;

	if (reference_to !== "MIDDLE_CENTER_OF_GRAVITY" && reference_to !== "MIDDLE_SHEAR_CENTER" && reference_to !== "MIDDLE_NONE") {
		var params = reference_to.split("_");
		ASSERT(params.length === 2, "Wrong reference string");
		this.load.eccentricity_horizontal_alignment = GetMemberLoadEccentricityAlignment("ALIGN_" + params[0]);
		this.load.eccentricity_vertical_alignment = GetMemberLoadEccentricityAlignment("ALIGN_" + params[1]);
	}
	else if (reference_to === " MIDDLE_CENTER_OF_GRAVITY" || reference_to === "MIDDLE_NONE") {
		this.load.eccentricity_section_middle = GetMemberLoadEccentricityAlignment(reference_to);
	}
	else if (reference_to === "shear_center") {
		this.load.is_eccentricity_at_end_different_from_start = true;
		this.load.eccentricity_section_middle = GetMemberLoadEccentricityAlignment(reference_to);
	}
	else {
		ASSERT(false, "Unknown type of eccentricity (" + reference_to + ")");
	}

	if (typeof offset_member_start_ey !== "undefined") {
		this.load.is_eccentricity_at_end_different_from_start = false;
		this.load.eccentricity_y_at_start = offset_member_start_ey;
	}

	if (typeof offset_member_start_ez !== "undefined") {
		this.load.is_eccentricity_at_end_different_from_start = false;
		this.load.eccentricity_z_at_start = offset_member_start_ez;
	}

	if (typeof offset_member_end_ey !== "undefined") {
		this.load.is_eccentricity_at_end_different_from_start = true;
		this.load.eccentricity_y_at_end = offset_member_end_ey;
	}

	if (typeof offset_member_end_ez !== "undefined") {
		this.load.is_eccentricity_at_end_different_from_start = true;
		this.load.eccentricity_z_at_end = offset_member_end_ez;
	}
};

/**
* Sets individual mass components (only for mass load)
* @param	{Number}	MX		Mass in X coordination, can be undefined
* @param	{Number}	MY		Mass in Y coordination, can be undefined
* @param	{Number}	MZ		Mass in Z coordination, can be undefined
*/
MemberLoad.prototype.IndividualMassComponents = function (MX,
	MY,
	MZ) {
	ASSERT(this.load.load_type === member_loads.E_TYPE_MASS, "Can be set only for mass load type");

	if (arguments.length === 0) {
		this.load.individual_mass_components = false;
		return;
	}

	this.load.individual_mass_components = true;

	if (typeof MX !== "undefined") {
		this.load.mass_x = MX;
	}

	if (typeof MY !== "undefined") {
		this.load.mass_y = MY;
	}

	if (typeof MZ !== "undefined") {
		this.load.mass_z = MZ;
	}
};

MemberLoad.prototype.GetNo = function (){
	return this.load.no;
};

MemberLoad.prototype.GetMemberLoad = function (){
	return this.load;
};

function GetMemberLoadDirectionType(load_type, direction_type) {
	var direction_types_dict = {};
	switch (load_type)
	{
		case member_loads.LOAD_TYPE_FORCE:
			direction_types_dict = {
				"GLOBAL_X_OR_USER_DEFINED_U_TRUE": member_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
				"GLOBAL_Y_OR_USER_DEFINED_V_TRUE": member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
				"GLOBAL_Z_OR_USER_DEFINED_W_TRUE": member_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE,
				"GLOBAL_X_OR_USER_DEFINED_U_PROJECTED": member_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_PROJECTED,
				"GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED": member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED,
				"GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED": member_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED
			}
			break;
		case member_loads.LOAD_TYPE_MOMENT:
		case member_loads.LOAD_TYPE_ROTATION:
			direction_types_dict = {
				"GLOBAL_X_OR_USER_DEFINED_U_TRUE": member_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
				"GLOBAL_Y_OR_USER_DEFINED_V_TRUE": member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
				"GLOBAL_Z_OR_USER_DEFINED_W_TRUE": member_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE
			};
			break;
		case member_loads.LOAD_TYPE_TEMPERATURE:
		case member_loads.LOAD_TYPE_TEMPERATURE_CHANGE:
		case member_loads.LOAD_TYPE_PRECAMBER:
			direction_types_dict = {
				"LOCAL_Y": member_loads.LOAD_DIRECTION_LOCAL_Y,
				"LOCAL_Z": member_loads.LOAD_DIRECTION_LOCAL_Z
			};
			break;
	}

	var type = direction_types_dict[direction_type];
	if (type === undefined) {
	  console.log("Wrong direction type. Value was: " + direction_type);
	  console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
	}
	return type;
}

function SetMemberLoadDirectionTypeWithDirectionOrientation(member_load, direction_type) {
	switch (member_load.load_type)
	{
		case member_loads.LOAD_TYPE_PIPE_CONTENT_FULL:
		case member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL:
			ASSERT(direction_type === "+ZL" || direction_type === "-ZL");
			member_load.load_direction_orientation = direction_type[0];
			member_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE;
			break;
		default:
			ASSERT(false);
	}
}

function GetMemberLoadEccentricityAlignment(eccentricity_type) {
	const eccentricity_types_dict = {
		"ALIGN_NONE": member_loads.ALIGN_NONE,
		"ALIGN_LEFT": member_loads.ALIGN_LEFT,
		"ALIGN_MIDDLE": member_loads.ALIGN_MIDDLE,
		"ALIGN_RIGHT": member_loads.ALIGN_RIGHT,
		"ALIGN_TOP": member_loads.ALIGN_TOP,
		"ALIGN_MIDDLE": member_loads.ALIGN_MIDDLE,
		"ALIGN_BOTTOM": member_loads.ALIGN_BOTTOM,
		"ALIGN_MIDDLE_CENTER_OF_GRAVITY": member_loads.LOAD_ECCENTRICITY_SECTION_MIDDLE_CENTER_OF_GRAVITY,
		"ALIGN_MIDDLE_SHEAR_CENTER": member_loads.LOAD_ECCENTRICITY_SECTION_MIDDLE_SHEAR_CENTER,
		"ALIGN_MIDDLE_NONE": member_loads.LOAD_ECCENTRICITY_SECTION_MIDDLE_NONE
	};

	eccentricity_type = eccentricity_type.replace("CENTER", "MIDDLE");

	if (eccentricity_type !== undefined) {
	  var type = eccentricity_types_dict[eccentricity_type];
	  if (type === undefined) {
		console.log("Wrong eccentricity alignment type. Value was: " + eccentricity_type);
		console.log("Correct values are: ( " + Object.keys(eccentricity_types_dict) + ")");
		type = member_loads.ALIGN_NONE;
	  }
	  return type;
	}
	else {
	  return member_loads.ALIGN_NONE;
	}
}
