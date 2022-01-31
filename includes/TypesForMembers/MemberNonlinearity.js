/**
* Creates member nonlinearity
* @class
* @constructor
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
function MemberNonlinearity(no,
	member,
	comment,
	params)
{
    if (arguments.length !== 0)
	{
		this.memberNonlinearity = createNonlinearity(no, member, comment, params);
		return this.memberNonlinearity;
	}
}

/**
* Creates member failure if tension nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfTension = function(no,
	member,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_TENSION;
};

/**
* Creates member failure if compression nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfCompression = function (no,
	member,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_COMPRESSION;
};

/**
* Creates member failure if tension with slippage nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	ux				Slippage
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfTensionWithSlippage = function (no,
	member,
	ux,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_TENSION_WITH_SLIPPAGE;
	setParameters(this.memberNonlinearity, [ux], "slippage");
};

/**
* Creates member failure if compression with slippage nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	ux				Slippage
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.FailureIfCompressionWithSlippage = function (no,
	member,
	ux,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_FAILURE_IF_COMPRESSION_WITH_SLIPPAGE;
	setParameters(this.memberNonlinearity, [ux], "slippage");
};

/**
* Creates member slippage nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	ux				Slippage
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.Slippage = function (no,
	member,
	ux,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_SLIPPAGE;
	setParameters(this.memberNonlinearity, [ux], "slippage");
};

/**
* Creates member tearing under tension nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	nt				Tension force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.TearingUnderTension = function (no,
	member,
	nt,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_TEARING_IF_TENSION;
	setParameters(this.memberNonlinearity, [nt], "tension_force");
};

/**
* Creates member yielding under tension nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	nt				Tension force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.YieldingUnderTension = function (no,
	member,
	nt,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_YIELDING_IF_TENSION;
	setParameters(this.memberNonlinearity, [nt], "tension_force");
};

/**
* Creates member tearing under compression nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	nc				Compression force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.TearingUnderCompression = function (no,
	member,
	nc,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_TEARING_IF_COMPRESSION;
	setParameters(this.memberNonlinearity, [nc], "compression_force");
};

/**
* Creates member yielding under compression nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	nc				Compression force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.YieldingUnderCompression = function (no,
	member,
	nc,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_YIELDING_IF_COMPRESSION;
	setParameters(this.memberNonlinearity, [nc], "compression_force");
};

/**
* Creates member tearing nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	nc				Compression force
* @param	{Number}	nt				Tension force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.Tearing = function (no,
	member,
	nc,
	nt,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_TEARING;
	setParameters(this.memberNonlinearity, [nc, nt], "compression_force", "tension_force");
};

/**
* Creates member yielding nonlinearity
* @param	{Number}	no				Index of member nonlinearity, can be undefined
* @param	{Object}	member			Assigned member
* @param	{Number}	nc				Compression force
* @param	{Number}	nt				Tension force
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
MemberNonlinearity.prototype.Yielding = function (no,
	member,
	nc,
	nt,
	comment,
	params) {
	this.memberNonlinearity = createNonlinearity(no, member, comment, params);
	this.memberNonlinearity.type = member_nonlinearities.TYPE_YIELDING;
	setParameters(this.memberNonlinearity, [nc, nt], "compression_force", "tension_force");
};

/**
* Sets parameters to member nonlinearity (private)
* @param 	{Object}	member_nonlinearity	Member nonlinearity to be setParameters
* @param	{Array}		parameters			Nonlinearity parameters
* @param	{String}	param_1_name		Name of first parameter
* @param	{String}	param_2_name			Name of first parameter, can be undefined
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
* @param	{Object}	member			Assigned member
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member nonlinearity parameters, can be undefined
* @return	{Object}	Created member nonlinearity
*/
var createNonlinearity = function (no,
	member,
	comment,
	params) {
	var memberNonlinearity = engine.create_member_nonlinearity(no);

	if (typeof member !== "undefined") {
		member.member_nonlinearity = memberNonlinearity;
	}
    set_comment_and_parameters(memberNonlinearity, comment, params);

	return memberNonlinearity;
};