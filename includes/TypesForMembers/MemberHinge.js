// Problem:
// displacement / rotation - špatně se nastavuje
// symetric - chybí v API?

/**
* Creates member hinge
* @class
* @constructor
* @param	{Number}	no				Index of member hinge, can be undefined
* @param	{Object}	member_start	Member start, can be undefined
* @param	{Object} 	member_end		Member end, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member hinge parameters, can be undefined
* @return	{Object}	Created member hinge
*/
function MemberHinge(no,
                     member_start,
                     member_end,
                     comment,
                     params) {
	if (arguments.length !== 0) {
		return this.memberHinge = createHinge(no, member_start, member_end, comment, params);
	}
}

/**
* Creates member hinge with specified axis release
* @param	{Number}	no				Index of member hinge, can be undefined
* @param	{Object}	member_start	Member start, can be undefined
* @param	{Object} 	member_end		Member end, can be undefined
* @param	{Array}		ux				Axis release for ux, for more information look at comment in private setMainHingeValues function
* @param	{Array}		uy				Axis release for uy, for more information look at comment in private setMainHingeValues function
* @param	{Array}		uz				Axis release for uz, for more information look at comment in private setMainHingeValues function
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member hinge parameters, can be undefined
* @return	{Object}	Created member hinge
*/
MemberHinge.prototype.Translational = function (no,
	member_start,
	member_end,
	ux,
	uy,
	uz,
	comment,
	params) {
	this.memberHinge = createHinge(no, member_start, member_end, comment, params);

	if (typeof ux !== "undefined") {
		ASSERT(ux.length > 0, "ux: at least two values has to be set");
		setMainHingeValues(this.memberHinge, ux, "axial_release_n", "axial_release_n_nonlinearity");
	}
	if (typeof uy !== "undefined") {
		ASSERT(uy.length > 0, "uy: at least two values has to be set");
		setMainHingeValues(this.memberHinge, uy, "axial_release_vy", "axial_release_vy_nonlinearity");
	}
	if (typeof uz !== "undefined") {
		ASSERT(uz.length > 0, "uz: at least two values has to be set");
		setMainHingeValues(this.memberHinge, uz, "axial_release_vz", "axial_release_vz_nonlinearity");
	}

	return this.memberHinge;
};

/**
* Creates member hinge with specified moment release
* @param	{Number}	no				Index of member hinge, can be undefined
* @param	{Object}	member_start	Member start, can be undefined
* @param	{Object} 	member_end		Member end, can be undefined
* @param	{Array}		φx				Moment release for φx, for more information look at comment in private setMainHingeValues function
* @param	{Array}		φy				Moment release for φy, for more information look at comment in private setMainHingeValues function
* @param	{Array}		φz				Moment release for φz, for more information look at comment in private setMainHingeValues function
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member hinge parameters, can be undefined
* @return	{Object}	Created member hinge
*/
MemberHinge.prototype.Rotational = function (no,
	member_start,
	member_end,
	fx,
	fy,
	fz,
	comment,
	params) {
	this.memberHinge = createHinge(no, member_start, member_end, comment, params);

	if (typeof fx !== "undefined") {
		ASSERT(fx.length > 0, "φx: at least two values has to be set");
		setMainHingeValues(this.memberHinge, fx, "moment_release_mt", "moment_release_mt_nonlinearity");
	}
	if (typeof fy !== "undefined") {
		ASSERT(fy.length > 0, "φy: at least two values has to be set");
		setMainHingeValues(this.memberHinge, fy, "moment_release_my", "moment_release_my_nonlinearity");
	}
	if (typeof fz !== "undefined") {
		ASSERT(fz.length > 0, "φz: at least two values has to be set");
		setMainHingeValues(this.memberHinge, fz, "moment_release_mz", "moment_release_mz_nonlinearity");
	}

	return this.memberHinge;
};

/**
* Sets negative and/or positive zone to partial activity translation x nonlinearity
* @param 	{Array}	negative_zone_values	Negative zone values depend on type (for more information look at setPartialActivityZoneValues function)
* @param	{Array} positive_zone_values	Positive zone values depend on type (for more information look at setPartialActivityZoneValues function)
*/
MemberHinge.prototype.PartialActivityTranslationalX = function (negative_zone_values,
	positive_zone_values) {
	ASSERT(this.memberHinge.axial_release_n_nonlinearity === member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY, "Member hinge ux has no partial activity nonlinearity");
	if (typeof negative_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, negative_zone_values, "partial_activity_along_x_negative_type", "partial_activity_along_x_negative_slippage", "partial_activity_along_x_negative_displacement", "partial_activity_along_x_negative_force");
	}
	if (typeof positive_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, positive_zone_values, "partial_activity_along_x_positive_type", "partial_activity_along_x_positive_slippage", "partial_activity_along_x_positive_displacement", "partial_activity_along_x_positive_force");
	}
};

/**
* Sets negative and/or positive zone to partial activity translation y nonlinearity
* @param 	{Array}	negative_zone_values	Negative zone values depend on type (for more information look at setPartialActivityZoneValues function)
* @param	{Array} positive_zone_values	Positive zone values depend on type (for more information look at setPartialActivityZoneValues function)
*/
MemberHinge.prototype.PartialActivityTranslationalY = function (negative_zone_values,
	positive_zone_values) {
	ASSERT(this.memberHinge.axial_release_vy_nonlinearity === member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY, "Member hinge uy has no partial activity nonlinearity");
	if (typeof negative_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, negative_zone_values, "partial_activity_along_y_negative_type", "partial_activity_along_y_negative_slippage", "partial_activity_along_y_negative_displacement", "partial_activity_along_y_negative_force");
	}
	if (typeof positive_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, positive_zone_values, "partial_activity_along_y_positive_type", "partial_activity_along_y_positive_slippage", "partial_activity_along_y_positive_displacement", "partial_activity_along_y_positive_force");
	}
};

/**
* Sets negative and/or positive zone to partial activity translation z nonlinearity
* @param 	{Array}	negative_zone_values	Negative zone values depend on type (for more information look at setPartialActivityZoneValues function)
* @param	{Array} positive_zone_values	Positive zone values depend on type (for more information look at setPartialActivityZoneValues function)
*/
MemberHinge.prototype.PartialActivityTranslationalZ = function (negative_zone_values,
	positive_zone_values) {
	ASSERT(this.memberHinge.axial_release_vz_nonlinearity === member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY, "Member hinge uz has no partial activity nonlinearity");
	if (typeof negative_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, negative_zone_values, "partial_activity_along_z_negative_type", "partial_activity_along_z_negative_slippage", "partial_activity_along_z_negative_displacement", "partial_activity_along_z_negative_force");
	}
	if (typeof positive_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, positive_zone_values, "partial_activity_along_z_positive_type", "partial_activity_along_z_positive_slippage", "partial_activity_along_z_positive_displacement", "partial_activity_along_z_positive_force");
	}
};

/**
* Sets negative and/or positive zone to partial activity rotational x nonlinearity
* @param 	{Array}	negative_zone_values	Negative zone values depend on type (for more information look at setPartialActivityZoneValues function)
* @param	{Array} positive_zone_values	Positive zone values depend on type (for more information look at setPartialActivityZoneValues function)
*/
MemberHinge.prototype.PartialActivityRotationalX = function (negative_zone_values,
	positive_zone_values) {
	ASSERT(this.memberHinge.moment_release_mt_nonlinearity === member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY, "Member hinge φx has no partial activity nonlinearity");
	if (typeof negative_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, negative_zone_values, "partial_activity_around_x_negative_type", "partial_activity_around_x_negative_slippage", "partial_activity_around_x_negative_rotation", "partial_activity_around_x_negative_moment");
	}
	if (typeof positive_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, positive_zone_values, "partial_activity_around_x_positive_type", "partial_activity_around_x_positive_slippage", "partial_activity_around_x_positive_rotation", "partial_activity_around_x_positive_moment");
	}
};

/**
* Sets negative and/or positive zone to partial activity rotational y nonlinearity
* @param 	{Array}	negative_zone_values	Negative zone values depend on type (for more information look at setPartialActivityZoneValues function)
* @param	{Array} positive_zone	Positive zone values depend on type (for more information look at setPartialActivityZoneValues function)
*/
MemberHinge.prototype.PartialActivityRotationalY = function (negative_zone_values,
	positive_zone_values) {
	ASSERT(this.memberHinge.moment_release_my_nonlinearity === member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY, "Member hinge φy has no partial activity nonlinearity");
	if (typeof negative_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, negative_zone_values, "partial_activity_around_y_negative_type", "partial_activity_around_y_negative_slippage", "partial_activity_around_y_negative_rotation", "partial_activity_around_y_negative_moment");
	}
	if (typeof positive_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, positive_zone_values, "partial_activity_around_y_positive_type", "partial_activity_around_y_positive_slippage", "partial_activity_around_y_positive_rotation", "partial_activity_around_y_positive_moment");
	}
};

/**
* Sets negative and/or positive zone to partial activity rotational z nonlinearity
* @param 	{Array}	negative_zone_values	Negative zone values depend on type (for more information look at setPartialActivityZoneValues function)
* @param	{Array} positive_zone_values	Positive zone values depend on type (for more information look at setPartialActivityZoneValues function)
*/
MemberHinge.prototype.PartialActivityRotationalZ = function (negative_zone_values,
	positive_zone_values) {
	ASSERT(this.memberHinge.moment_release_mz_nonlinearity === member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY, "Member hinge φz has no partial activity nonlinearity");
	if (typeof negative_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, negative_zone_values, "partial_activity_around_z_negative_type", "partial_activity_around_z_negative_slippage", "partial_activity_around_z_negative_rotation", "partial_activity_around_z_negative_moment");
	}
	if (typeof positive_zone_values !== "undefined") {
		setPartialActivityZoneValues(this.memberHinge, positive_zone_values, "partial_activity_around_z_positive_type", "partial_activity_around_z_positive_slippage", "partial_activity_around_z_positive_rotation", "partial_activity_around_z_positive_moment");
	}
};

/**
* Sets translational diagram values for ux
* @param	{Number}	ux1, N1, Cux1, ux2, N2, Cux2 ... uxn, Nn, Cuxn
*/
MemberHinge.prototype.DiagramTranslationalX = function () {
	ASSERT(this.memberHinge.axial_release_n_nonlinearity === member_hinges.NONLINEARITY_TYPE_DIAGRAM, "Member hinge ux has no diagram nonlinearity");
	ASSERT(arguments.length % 3 === 0, "Values has to be specified in format [ux1, N1, Cux1, ux2, N2, Cux2 ... uxn, Nn, Cuxn]");
	setDiagramValues(this.memberHinge, arguments, "diagram_along_x_table", "displacement", "force", "spring");
};

/**
* Sets translational diagram values for uy
* @param	{Number}	uy1, N1, Cuy1, uy2, N2, Cuy2 ... uyn, Nn, Cuyn
*/
MemberHinge.prototype.DiagramTranslationalY = function () {
	ASSERT(this.memberHinge.axial_release_vy_nonlinearity === member_hinges.NONLINEARITY_TYPE_DIAGRAM, "Member hinge uy has no diagram nonlinearity");
	ASSERT(arguments.length % 3 === 0, "Values has to be specified in format [uy1, N1, Cuy1, uy2, N2, Cuy2 ... uyn, Nn, Cuyn]");
	setDiagramValues(this.memberHinge, arguments, "diagram_along_y_table", "displacement", "force", "spring");
};

/**
* Sets translational diagram values for uz
* @param	{Number}	uz1, N1, Cuz1, uz2, N2, Cuz2 ... uzn, Nn, Cuzn
*/
MemberHinge.prototype.DiagramTranslationalZ = function () {
	ASSERT(this.memberHinge.axial_release_vz_nonlinearity === member_hinges.NONLINEARITY_TYPE_DIAGRAM, "Member hinge ux has no diagram nonlinearity");
	ASSERT(arguments.length % 3 === 0, "Values has to be specified in format [uz1, N1, Cuz1, uz2, N2, Cuz2 ... uzn, Nn, Cuzn]");
	setDiagramValues(this.memberHinge, arguments, "diagram_along_z_table", "displacement", "force", "spring");
};

/**
* Sets rotational diagram values for φx
* @param	{Number}	φx1, N1, Cφx1, φx2, N2, Cφx2 ... φxn, Nn, Cφxn
*/
MemberHinge.prototype.DiagramRotationalX = function () {
	ASSERT(this.memberHinge.moment_release_mt_nonlinearity === member_hinges.NONLINEARITY_TYPE_DIAGRAM, "Member hinge φx has no diagram nonlinearity");
	ASSERT(arguments.length % 3 === 0, "Values has to be specified in format [φx1, N1, Cφx1, φx2, N2, Cφx2 ... φxn, Nn, Cφxn]");
	setDiagramValues(this.memberHinge, arguments, "diagram_around_x_table", "rotation", "moment", "spring");
};

/**
* Sets rotational diagram values for φy
* @param	{Number}	φy1, N1, Cφy1, φy2, N2, Cφy2 ... φyn, Nn, Cφyn
*/
MemberHinge.prototype.DiagramRotationalY = function () {
	ASSERT(this.memberHinge.moment_release_my_nonlinearity === member_hinges.NONLINEARITY_TYPE_DIAGRAM, "Member hinge φy has no diagram nonlinearity");
	ASSERT(arguments.length % 3 === 0, "Values has to be specified in format [φy1, N1, Cφy1, φy2, N2, Cφy2 ... φyn, Nn, Cφyn]");
	setDiagramValues(this.memberHinge, arguments, "diagram_around_y_table", "rotation", "moment", "spring");
};

/**
* Sets rotational diagram values for φz
* @param	{Number}	φz1, N1, Cφz1, φz2, N2, Cφz2 ... φzn, Nn, Cφzn
*/
MemberHinge.prototype.DiagramRotationalZ = function () {
	ASSERT(this.memberHinge.moment_release_mz_nonlinearity === member_hinges.NONLINEARITY_TYPE_DIAGRAM, "Member hinge φz has no diagram nonlinearity");
	ASSERT(arguments.length % 3 === 0, "Values has to be specified in format [φz1, N1, Cφz1, φz2, N2, Cφz2 ... φzn, Nn, Cφzn]");
	setDiagramValues(this.memberHinge, arguments, "diagram_around_z_table", "rotation", "moment", "spring");
};

/**
* Sets translational friction Vy values for ux
* @param	{Number}	μx, Cu,x
*/
MemberHinge.prototype.FrictionVyTranslationalX = function () {
	ASSERT(this.memberHinge.axial_release_n_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1, "Member hinge ux has no friction Vy nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_x", undefined, "axial_release_n");
};

/**
* Sets translational friction Vz values for ux
* @param	{Number}	μx, Cu,x
*/
MemberHinge.prototype.FrictionVzTranslationalX = function () {
	ASSERT(this.memberHinge.axial_release_n_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_2, "Member hinge ux has no friction Vz nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_x", undefined, "axial_release_n");
};

/**
* Sets translational friction VyVz values for ux
* @param	{Number}	μx, Cu,x
*/
MemberHinge.prototype.FrictionVyVzTranslationalX = function () {
	ASSERT(this.memberHinge.axial_release_n_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2, "Member hinge ux has no friction VyVz nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_x", undefined, "axial_release_n");
};

/**
* Sets translational friction Vy+Vz values for ux
* @param	{Number}	μxy, μxz, Cu,x
*/
MemberHinge.prototype.FrictionVyPlusVzTranslationalX = function () {
	ASSERT(this.memberHinge.axial_release_n_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2, "Member hinge ux has no friction Vy+Vz nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_xy", "friction_coefficient_xz", "axial_release_n");
};

/**
* Sets translational friction N values for uy
* @param	{Number}	μy, Cu,y
*/
MemberHinge.prototype.FrictionNTranslationalY = function () {
	ASSERT(this.memberHinge.axial_release_vy_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1, "Member hinge uy has no friction N nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_y", undefined, "axial_release_vy");
};

/**
* Sets translational friction Vz values for uy
* @param	{Number}	μy, Cu,y
*/
MemberHinge.prototype.FrictionVzTranslationalY = function () {
	ASSERT(this.memberHinge.axial_release_vy_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_2, "Member hinge uy has no friction Vz nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_y", undefined, "axial_release_vy");
};

/**
* Sets translational friction NVz values for uy
* @param	{Number}	μy, Cu,y
*/
MemberHinge.prototype.FrictionNVzTranslationalY = function () {
	ASSERT(this.memberHinge.axial_release_vy_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2, "Member hinge uy has no friction NVz nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_y", undefined, "axial_release_vy");
};

/**
* Sets translational friction N+Vz values for uy
* @param	{Number}	μyy, μyz, Cu,y
*/
MemberHinge.prototype.FrictionNPlusVzTranslationalY = function () {
	ASSERT(this.memberHinge.axial_release_vy_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2, "Member hinge uy has no friction N+Vz nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_yx", "friction_coefficient_yz", "axial_release_vy");
};

/**
* Sets translational friction N values for uz
* @param	{Number}	μz, Cu,z
*/
MemberHinge.prototype.FrictionNTranslationalZ = function () {
	ASSERT(this.memberHinge.axial_release_vz_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1, "Member hinge uz has no friction N nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_z", undefined, "axial_release_vz");
};

/**
* Sets translational friction Vy values for uz
* @param	{Number}	μz, Cu,z
*/
MemberHinge.prototype.FrictionVyTranslationalZ = function () {
	ASSERT(this.memberHinge.axial_release_vz_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_2, "Member hinge uz has no friction Vy nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_z", undefined, "axial_release_vz");
};

/**
* Sets translational friction NVy values for uz
* @param	{Number}	μz, Cu,z
*/
MemberHinge.prototype.FrictionNVyTranslationalZ = function () {
	ASSERT(this.memberHinge.axial_release_vz_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2, "Member hinge uz has no friction NVy nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_z", undefined, "axial_release_vz");
};

/**
* Sets translational friction N+Vy values for uz
* @param	{Number}	μzx, μzy, Cu,z
*/
MemberHinge.prototype.FrictionNPlusVyTranslationalZ = function () {
	ASSERT(this.memberHinge.axial_release_vz_nonlinearity === member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2, "Member hinge uz has no friction N+Vy nonlinearity");
	setFrictionValues(this.memberHinge, arguments, "friction_coefficient_zx", "friction_coefficient_zy", "axial_release_vz");
};

var setDiagramValues = function (member_hinge,
	diagram_values,
	param_table_name,
	param_1_name,
	param_2_name,
	param_3_name) {
	ASSERT(diagram_values.length >= 3, "At least three values are required");

	for (var i = 0; i < diagram_values.length; i += 3)
	{
		var row = member_hinge[param_table_name].row_count();

		member_hinge[param_table_name][row][param_1_name] = diagram_values[i];
		member_hinge[param_table_name][row][param_2_name] = diagram_values[i + 1];
		member_hinge[param_table_name][row][param_3_name] = diagram_values[i + 2];
	}
};

var setFrictionValues = function (member_hinge,
	friction_values,
	param_coefficient_name,
	param_coefficient_2_name,
	param_constant_name) {
	member_hinge[param_coefficient_name] = friction_values[0];
	if (typeof param_coefficient_2_name != "undefined") {
		member_hinge[param_coefficient_2_name] = friction_values[1];
		member_hinge[param_constant_name] = friction_values[2];
	}
	else {
		member_hinge[param_constant_name] = friction_values[1];
	}
};

/**
* Sets values for partial activity zone (private)
* @param 	{Object}	member_hinge			Member hinge to which values has to be set
* @param	{Array}		zone_values				Negative / positive zone values
* 												- "Complete": [0]
*												- "Fixed": [1, u(x|y|z)-|φ(x|y|z)-, u(x|y|z)s-|φ(x|y|z)s-] / [1, u(x|y|z)+|φ(x|y|z)+, u(x|y|z)s+|φ(x|y|z)s+]
*												- "Tearing": [2, N-, u(x|y|z)s-|φ(x|y|z)s-] / [2, N+, u(x|y|z)s+|φ(x|y|z)s+]
*												- "Yielding": [3, N-, u(x|y|z)s-|φ(x|y|z)s-] / [3, N+, u(x|y|z)s+|φ(x|y|z)s+]
*												- "Spring ineffectiveness": [4]
* @param	{String}	param_type_name			Parameter name for partial activity zone name
* @param	{String}	param_slippage_name		Parameter name for partial activity slippage name
* @param	{String}	param_displacement_name	Parameter name for partial activity displacement name
* @param	{String}	param_force_name		Parameter name for partial activity force name
*/
var setPartialActivityZoneValues = function (member_hinge,
	zone_values,
	param_type_name,
	param_slippage_name,
	param_displacement_name,
	param_force_name) {
	ASSERT(zone_values.length > 0, "Zone: at least type of zone is required");

	switch (zone_values[0])
	{
		case 0:		// Complete
			ASSERT(zone_values.length === 2, "Zone type complete: two values are required (zone type, uxs-)");
			member_hinge[param_type_name] = member_hinges.PARTIAL_ACTIVITY_TYPE_COMPLETE;
			member_hinge[param_slippage_name] = zone_values[1];
			break;
		case 1:		// Fixed
			ASSERT(zone_values.length === 3, "Zone type fixed: three values are required (zone type, N-, uxs-)");
			member_hinge[param_type_name] = member_hinges.PARTIAL_ACTIVITY_TYPE_FIXED;
			member_hinge[param_displacement_name] = zone_values[1];
			member_hinge[param_slippage_name] = zone_values[2];
			break;
		case 2:		// Tearing
		case 3:		// Yielding
			ASSERT(zone_values.length === 3, "Zone type tearing/yielding: three values are required (zone type, ux-, uxs-)");
			if (zone_values[0] === 2) {
				member_hinge[param_type_name] = member_hinges.PARTIAL_ACTIVITY_TYPE_TEARING;
			}
			else {
				member_hinge[param_type_name] = member_hinges.PARTIAL_ACTIVITY_TYPE_YIELDING;
			}
			member_hinge[param_force_name] = zone_values[1];
			member_hinge[param_slippage_name] = zone_values[2];
			break;
		case 4:		// Spring ineffectiveness
			member_hinge[param_type_name] = member_hinges.PARTIAL_ACTIVITY_TYPE_INEFFECTIVNESS;
			break;
		default:
			ASSERT(false, "Unknown zone type");
	}
};

/**
* Sets values to member hinge (private)
* @param	{Object}	member_hinge	Member hinge
* @param	{Array}		values			Values to be set, [Translational/Rotational, Spring constant, Nonlinearity]
*										- Values can be in two formats:
*											[bool, float, int] - if bool is true (translation is enabled), then can be specified next two values (spring constant and nonlinearity)
*											[bool, int]		   - if bool is false (translation is disabled), then can be specified only next one value (nonlinearity)
*											Nonlinearity: can be string name or index: None (0), Fixed if negative (1), Fixed if positive (2), Failure all if negative (3), Failure all if positive (4),
*														  Partial activity (5), Diagram (6), Stiffness diagram (7), Friction direction 1 (8), Friction direction 2 (9),
*														  Friction direction 1 2 (10), Friction direction 1 + 2 (11)
* @param	{String}	property_1		Spring constant string name
* @param	{String}	property_2		Nonlinearity string name
* @return	Returns modified member hinge
*/
var setMainHingeValues = function (member_hinge,
	values,
	property_1,
	property_2) {
	ASSERT(values.length > 0);
	if (values[0]) {
		// Translational or Rotational is enabled
		ASSERT(values.length >= 2);
		member_hinge[property_1] = values[1];		// Spring constant
		if (values.length > 2) {
			member_hinge[property_2] = getNonlinearityString(values[2]);	// Nonlinearity
		}
	}
	else {
		// Translational or Rotational is enabled
		ASSERT(values.length === 2);
		member_hinge[property_1] = "inf";
		member_hinge[property_2] = getNonlinearityString(values[1]);		// Nonlinearity
	}
};

var getNonlinearityString = function (nonlinearity) {
	switch (nonlinearity)
	{
		case 0:
			return member_hinges.NONLINEARITY_TYPE_NONE;
		case 1:
			return member_hinges.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
		case 2:
			return member_hinges.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
		case 3:
			return member_hinges.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
		case 4:
			return member_hinges.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
		case 5:
			return member_hinges.NONLINEARITY_TYPE_PARTIAL_ACTIVITY;
		case 6:
			return member_hinges.NONLINEARITY_TYPE_DIAGRAM;
		case 7:
			return member_hinges.NONLINEARITY_TYPE_STIFFNESS_DIAGRAM;
		case 8:
			return member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
		case 9:
			return member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
		case 10:
			return member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
		case 11:
			return member_hinges.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
		default:
			ASSERT(false);
	}
};

/**
* Creates member hinge (private)
* @private
* @param	{Number}	no				Index of member hinge, van be undefined
* @param	{Object}	member_start	Member start, can be undefined
* @param	{Object} 	member_end		Member end, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member hinge parameters, can be undefined
* @return	{Object}	Created member hinge
*/
var createHinge = function (no,
    member_start,
	member_end,
	comment,
	params) {
	var memberHinge = engine.create_member_hinge(no);

	if (typeof member_start !== "undefined") {
		member_start.member_hinge_start = memberHinge;
	}
	if (typeof member_end !== "undefined") {
		member_end.member_hinge_end = memberHinge;
	}

	set_comment_and_parameters(memberHinge, comment, params);

	return memberHinge;
};