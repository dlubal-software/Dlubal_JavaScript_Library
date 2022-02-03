/**
* Creates member definable stiffness
* @class
* @constructor
* @param	{Number}	no				Index of member definable stiffness, can be undefined
* @param	{Array}		member_list		Assigned members, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member definable stiffness parameters, can be undefined
* @return	{Object}	Created member definable stiffness
*/
function MemberDefinableStiffness(no,
	member_list,
	comment,
	params) {
	this.memberDefinableStiffness = engine.create_member_definable_stiffness(no);
	
	if (typeof member_list !== "undefined") {
		for (var i = 0; i < member_list.length; ++i) {
			if (members.exist(member_list[i])) {
				var member = members[member_list[i]];
				ASSERT(member.type === members.TYPE_DEFINABLE_STIFFNESS, "Definable stiffness can be set only for member type definable stiffness");
			}
			else {
				ASSERT(false, "Member no." + member_list[i] + " does not exist");
			}
		}
		
		this.memberDefinableStiffness.assigned_to = member_list;
	}
	
	set_comment_and_parameters(this.memberDefinableStiffness, comment, params);
}

/**
* Sets torsional and bending stiffness parameters
* @param	{Number}	torsional_stiffness		Torsional stiffness
* @param	{Number}	bending_stiffness_y		Bending stiffness Y
* @param 	{Number}	bending_stiffness_z		Bending stiffness Z
*/
MemberDefinableStiffness.prototype.TorsionalAndBendingStiffness = function (torsional_stiffness,
	bending_stiffness_y,
	bending_stiffness_z) {
	this.memberDefinableStiffness.torsional_stiffness = torsional_stiffness;
	this.memberDefinableStiffness.bending_stiffness_y = bending_stiffness_y;
	this.memberDefinableStiffness.bending_stiffness_z = bending_stiffness_z;
};

/**
* Sets axial and shear stiffness parameters
* @param	{Number}	axial_stiffness		Axial stiffness
* @param	{Number}	shear_stiffness_y	Shear stiffness Y
* @param 	{Number}	shear_stiffness_z	Shear stiffness Z
*/
MemberDefinableStiffness.prototype.AxialAndShearStiffness = function (axial_stiffness,
	shear_stiffness_y,
	shear_stiffness_z) {
	this.memberDefinableStiffness.axial_stiffness = axial_stiffness;
	this.memberDefinableStiffness.shear_stiffness_y = shear_stiffness_y;
	this.memberDefinableStiffness.shear_stiffness_z = shear_stiffness_z;
};

/**
* Sets self weight stiffness parameters
* @param	{Number}	specific_weight		Specific weight
* @param	{Number}	section_area		Section area
*/
MemberDefinableStiffness.prototype.SelfWeight = function (specific_weight,
	section_area) {
	this.memberDefinableStiffness.specific_weight = specific_weight;
	this.memberDefinableStiffness.section_area = section_area;
};

/**
* Sets main axes rotation parameter
* @param	{Number}	rotation		Rotation
*/
MemberDefinableStiffness.prototype.MainAxes = function (rotation) {
	this.memberDefinableStiffness.rotation = rotation;
};

/**
* Sets coefficient of thermal expansion stiffness parameters
* @param	{Number}	thermal_expansion	Thermal expansion
* @param	{Number}	width				Width
* @param 	{Number}	height				Height
*/
MemberDefinableStiffness.prototype.ThermalExpansionCoefficient = function (thermal_expansion,
	width,
	height) {
	this.memberDefinableStiffness.thermal_expansion_alpha = thermal_expansion;
	this.memberDefinableStiffness.thermal_expansion_width = width;
	this.memberDefinableStiffness.thermal_expansion_height = height;
};