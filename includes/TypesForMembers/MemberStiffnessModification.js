/**
* Creates member stiffness modification
* @class
* @constructor
* @param	{Number}	no							Index of member stiffness modification, can be undefined
* @param	{Array}		structure_modifications		Assigned structure modifications, can be undefined
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params						Member stiffness modification parameters, can be undefined
* @return	{Object}	Created member stiffness modification
*/
function MemberStiffnessModification(no,
	structure_modifications,
	comment,
	params) {
    this.member_stiffness_modification = engine.create_member_stiffness_modification(no);
	if (typeof structure_modifications !== "undefined") {
		this.member_stiffness_modification.assigned_to_structure_modification = structure_modifications;
	}
    set_comment_and_parameters(this.member_stiffness_modification, comment, params);
}

/**
* Sets total stiffness factor
* @param	{Number}	total_stiffness	Total stiffness
*/
MemberStiffnessModification.prototype.TotalStiffnessFactor = function (total_stiffness) {
	this.member_stiffness_modification.type = member_stiffness_modifications.TYPE_TOTAL_STIFFNESSES_FACTORS;
	this.member_stiffness_modification.total_stiffness_factor_of_total_stiffness = total_stiffness;
};

/**
* Sets partial stiffness factors
* @param	{Number}	axial_stiffness			Axial stiffness, can be undefined
* @param	{Number}	bending_stiffness_y		Bending stiffness Y, can be undefined
* @param 	{Number}	bending_stiffness_z		Bending stiffness Z, can be undefined
* @param	{Number}	shear_stiffness_y		Shear stiffness Y, can be undefined
* @param	{Number}	shear_stiffness_z		Shear stiffness Z, can be undefined
* @param	{Number}	torsional_stiffness		Torsional stiffness, can be undefined
* @param	{Number}	weight					Weight, can be undefined
*/
MemberStiffnessModification.prototype.PartialStiffnessFactors = function (axial_stiffness,
	bending_stiffness_y,
	bending_stiffness_z,
	shear_stiffness_y,
	shear_stiffness_z,
	torsional_stiffness,
	weight) {
	this.member_stiffness_modification.type = member_stiffness_modifications.TYPE_PARTIAL_STIFFNESSES_FACTORS;
	if (typeof axial_stiffness !== "undefined") {
		this.member_stiffness_modification.factor_of_axial_stiffness = axial_stiffness;
	}
	if (typeof bending_stiffness_y !== "undefined") {
		this.member_stiffness_modification.factor_of_bending_y_stiffness = bending_stiffness_y;
	}
	if (typeof bending_stiffness_z !== "undefined") {
		this.member_stiffness_modification.factor_of_bending_z_stiffness = bending_stiffness_z;
	}
	if (typeof shear_stiffness_y !== "undefined") {
		this.member_stiffness_modification.partial_stiffness_factor_of_shear_y_stiffness = shear_stiffness_y;
	}
	if (typeof shear_stiffness_z !== "undefined") {
		this.member_stiffness_modification.partial_stiffness_factor_of_shear_z_stiffness = shear_stiffness_z;
	}
	if (typeof torsional_stiffness !== "undefined") {
		this.member_stiffness_modification.partial_stiffness_factor_of_torsion_stiffness = torsional_stiffness;
	}
	if (typeof weight !== "undefined") {
		this.member_stiffness_modification.partial_stiffness_factor_of_weight = weight;
	}
};

/**
* Sets concrete structure ACI
* @param	{Number}	component_type	Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined
*/
MemberStiffnessModification.prototype.ConcreteStructuresAci = function (component_type) {
	this.member_stiffness_modification.type = member_stiffness_modifications.TYPE_CONCRETE_STRUCTURES_ACI;
	setConcreteStructuresComponentType(this.member_stiffness_modification, component_type);
};

/**
* Sets concrete structure CSA
* @param	{Number}	component_type	Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined
*/
MemberStiffnessModification.prototype.ConcreteStructuresCsa = function(component_type) {
	this.member_stiffness_modification.type = member_stiffness_modifications.TYPE_CONCRETE_STRUCTURES_CSA;
	setConcreteStructuresComponentType(this.member_stiffness_modification, component_type);
};

/**
* Sets steel structures AISC
* @param 	{Number}	determine_tau_b		Determine τb: Iterative (1), Set to 1 (2). Can be undefined.
* @param	{Number}	design_method		Design method: LRFD (1), ASD (2). Can be undefined. If determine τb has "Set to 1" value, must be undefined.
*/
MemberStiffnessModification.prototype.SteelStructuresAisc = function (determine_tau_b,
	design_method) {
	this.member_stiffness_modification.type = member_stiffness_modifications.TYPE_STEEL_STRUCTURES;
	if (typeof determine_tau_b !== "undefined") {
		this.member_stiffness_modification.steel_structure_determine_tau_b = determine_tau_b == 1 ? member_stiffness_modifications.ITERATIVE : member_stiffness_modifications.SET_TO_1;
	}
	if (typeof design_method !== "undefined") {
		ASSERT(this.member_stiffness_modification.steel_structure_determine_tau_b == member_stiffness_modifications.ITERATIVE, "Design method cannot be set if determine τb is set to 1");
		this.member_stiffness_modification.steel_structure_design_method = design_method == 1 ? member_stiffness_modifications.LRFD : member_stiffness_modifications.ASD;
	}
	// The parameters bending_stiffness_y, bending_stiffness_z, axial_stiffness cannot be set, they are disabled
};

/**,
* Sets steel structures CSA
* @param	{Number}	determine_tau_b			Determine τb: Iterative (1), Set to 1 (2). Can be undefined.
* @param	{Number}	axial_stiffness			Axial stiffness multiplier factor, can be undefined. If defined, apply τb is set to true.
* @param	{Number}	bending_stiffness_y		Bending stiffness multiplier factors Z, can be undefined. If defined, apply τb is set to true.
* @param	{Number}	bending_stiffness_z		Bending stiffness multiplier factors Y, can be undefined. If defined, apply τb is set to true.
* @param	{Number}	shear_stiffness_y		Shear stiffness Y, can be undefined. If defined, apply τb is set to true.
* @param	{Number}	shear_stiffness_z		Shear stiffness Z, can be undefined. If defined, apply τb is set to true.
* @param	{Number}	torsional_stiffness		Torsional stiffness, can be undefined. If defined, apply τb is set to true.
*/
MemberStiffnessModification.prototype.SteelStructuresCSA = function (determine_tau_b,
	axial_stiffness,
	bending_stiffness_y,
	bending_stiffness_z,
	shear_stiffness_y,
	shear_stiffness_z,
	torsional_stiffness) {
	this.member_stiffness_modification.type = member_stiffness_modifications.TYPE_STEEL_STRUCTURES_CSA;
	if (typeof determine_tau_b !== "undefined") {
		this.member_stiffness_modification.steel_structure_csa_determine_tau_b = determine_tau_b === 1 ? member_stiffness_modifications.ITERATIVE : member_stiffness_modifications.SET_TO_1;
	}
	this.member_stiffness_modification.steel_structure_csa_factor_of_axial_stiffness_enable = !(typeof axial_stiffness !== "undefined");
	if (!this.member_stiffness_modification.steel_structure_csa_factor_of_axial_stiffness_enable) {
		this.member_stiffness_modification.factor_of_axial_stiffness = axial_stiffness;
	}
	this.member_stiffness_modification.steel_structure_csa_factor_of_bending_y_stiffness_enable = !(typeof bending_stiffness_y !== "undefined");
	if (!this.member_stiffness_modification.steel_structure_csa_factor_of_bending_y_stiffness_enable) {
		this.member_stiffness_modification.factor_of_bending_y_stiffness = bending_stiffness_y;
	}
	this.member_stiffness_modification.steel_structure_csa_factor_of_bending_z_stiffness_enable = !(typeof bending_stiffness_z !== "undefined");
	if (!this.member_stiffness_modification.steel_structure_csa_factor_of_bending_z_stiffness_enable) {
		this.member_stiffness_modification.factor_of_bending_z_stiffness = bending_stiffness_z;
	}
	this.member_stiffness_modification.steel_structure_csa_factor_of_shear_y_stiffness_enable = !(typeof shear_stiffness_y !== "undefined");
	if (!this.member_stiffness_modification.steel_structure_csa_factor_of_shear_y_stiffness_enable) {
		this.member_stiffness_modification.partial_stiffness_factor_of_shear_y_stiffness = shear_stiffness_y;
	}
	this.member_stiffness_modification.steel_structure_csa_factor_of_shear_z_stiffness_enable = !(typeof shear_stiffness_z !== "undefined");
	if (!this.member_stiffness_modification.steel_structure_csa_factor_of_shear_z_stiffness_enable) {
		this.member_stiffness_modification.partial_stiffness_factor_of_shear_z_stiffness = shear_stiffness_z;
	}
	this.member_stiffness_modification.steel_structure_csa_stiffness_factor_of_torsion_stiffness_enable = !(typeof torsional_stiffness !== "undefined");
	if (!this.member_stiffness_modification.steel_structure_csa_stiffness_factor_of_torsion_stiffness_enable) {
		this.member_stiffness_modification.partial_stiffness_factor_of_torsion_stiffness = torsional_stiffness;
	}
};

/**
* Sets concrete structures parameters (private)
* @param	{Object}	member_stiffness_modification	Member stiffness modification to set
* @param	{Number}	component_type					Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined
*/
var setConcreteStructuresComponentType = function(member_stiffness_modification,
	component_type) {
	if (typeof component_type !== "undefined") {
		switch (component_type)	{
			case 1:
				member_stiffness_modification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_COLUMNS;
				break;
			case 2:
				member_stiffness_modification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_WALLS_UNCRACKED;
				break;
			case 3:
				member_stiffness_modification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_WALLS_CRACKED;
				break;
			case 4:
				member_stiffness_modification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_BEAMS;
				break;
			case 5:
				member_stiffness_modification.concrete_structure_component_typ = member_stiffness_modifications.COMPONENT_TYPE_FLAT_PLATES_AND_FLAT_SLABS;
				break;
			default:
				ASSERT(false, "Unknown component type");
		}
	}
};

