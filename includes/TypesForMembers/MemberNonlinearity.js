/**
* Creates member nonlinearity
* @class
* @constructor
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
function MemberNonlinearity(no,
	comment,
	params) {
    if (arguments.length !== 0)
	{
		return this.memberNonlinearity = createNonlinearity(no, undefined, comment, params);
	}
}

/**
* Creates member failure if tension nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfTension = function(no,
	members,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_TENSION;
};

/**
* Creates member failure if compression nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfCompression = function (no,
	members,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_COMPRESSION;
};

/**
* Creates member failure if tension with slippage nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{Number}	slippage		Slippage
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfTensionWithSlippage = function (no,
	members,
	slippage,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_TENSION_WITH_SLIPPAGE;
	setParameters(this.memberNonlinearity, [slippage], "slippage");
};

/**
* Creates member failure if compression with slippage nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{Number}	slippage		Slippage
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfCompressionWithSlippage = function (no,
	members,
	slippage,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_COMPRESSION_WITH_SLIPPAGE;
	setParameters(this.memberNonlinearity, [slippage], "slippage");
};

/**
* Creates member slippage nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{Number}	slippage				Slippage
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.Slippage = function (no,
	members,
	slippage,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_SLIPPAGE;
	setParameters(this.memberNonlinearity, [slippage], "slippage");
};

/**
* Creates member tearing under tension nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{Number}	tension_force	Tension force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.TearingUnderTension = function (no,
	members,
	tension_force,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_TEARING_IF_TENSION;
	setParameters(this.memberNonlinearity, [tension_force], "tension_force");
};

/**
* Creates member yielding under tension nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		members			Assigned members
* @param	{Number}	tension_force	Tension force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.YieldingUnderTension = function (no,
	members,
	tension_force,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_YIELDING_IF_TENSION;
	setParameters(this.memberNonlinearity, [tension_force], "tension_force");
};

/**
* Creates member tearing under compression nonlinearity
* @param	{Number}	no					Index of member nonlinearity, can be undefined
* @param	{Array}		members				Assigned members
* @param	{Number}	compression_force	Compression force
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.TearingUnderCompression = function (no,
	members,
	compression_force,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_TEARING_IF_COMPRESSION;
	setParameters(this.memberNonlinearity, [compression_force], "compression_force");
};

/**
* Creates member yielding under compression nonlinearity
* @param	{Number}	no					Index of member nonlinearity, can be undefined
* @param	{Array}		members				Assigned members
* @param	{Number}	compression_force	Compression force
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.YieldingUnderCompression = function (no,
	members,
	compression_force,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_YIELDING_IF_COMPRESSION;
	setParameters(this.memberNonlinearity, [compression_force], "compression_force");
};

/**
* Creates member tearing nonlinearity
* @param	{Number}	no					Index of member nonlinearity, can be undefined
* @param	{Array}		members				Assigned members
* @param	{Number}	compression_force	Compression force
* @param	{Number}	tension_force		Tension force
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.Tearing = function (no,
	members,
	compression_force,
	tension_force,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_TEARING;
	setParameters(this.memberNonlinearity, [compression_force, tension_force], "compression_force", "tension_force");
};

/**
* Creates member yielding nonlinearity
* @param	{Number}	no					Index of member nonlinearity, can be undefined
* @param	{Array}		members				Assigned members
* @param	{Number}	compression_force	Compression force
* @param	{Number}	tension_force		Tension force
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.Yielding = function (no,
	members,
	compression_force,
	tension_force,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, members, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_YIELDING;
	setParameters(this.memberNonlinearity, [compression_force, tension_force], "compression_force", "tension_force");
};

/**
* Sets parameters to member nonlinearity (private)
* @param 	{Object}	member_nonlinearity	Member nonlinearity to be setParameters
* @param	{Array}		parameters			Nonlinearity parameters
* @param	{String}	param_1_name		Name of first parameter
* @param	{String}	param_2_name		Name of first parameter, can be undefined
*/
var setParameters = function (member_nonlinearity,
	parameters,
	param_1_name,
	param_2_name) {
	ASSERT(parameters.length > 0);
	member_nonlinearity[param_1_name] = parameters[0];
	if (typeof param_2_name !== "undefined") {
		ASSERT(parameters.length > 1);
		member_nonlinearity[param_2_name] = parameters[1];
	}
};

/**
* Creates member nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Array}		member_list		Assigned members
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
var createNonlinearity = function (no,
	member_list,
	comment,
	params) {
	var memberNonlinearity = engine.create_member_nonlinearity(no);

	if (typeof member_list !== "undefined") {
		for (var i = 0; i < member_list.length; ++i) {
			if (members.exist(member_list[i])) {
				members[member_list[i]].member_nonlinearity = memberNonlinearity;
			}
			else {
				console.log("Member no." + member_list[i] + " does not exist");
			}
		}
	}

    set_comment_and_parameters(memberNonlinearity, comment, params);

	return memberNonlinearity;
};
