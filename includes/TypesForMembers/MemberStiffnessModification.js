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
    this.memberStiffnessModification = engine.create_member_stiffness_modification(no);
	if (typeof structure_modifications !== "undefined") {
		this.memberStiffnessModification.assigned_to_structure_modification = structure_modifications;
	}
    set_comment_and_parameters(this.memberStiffnessModification, comment, params);
};

/**
* Sets total stiffness factor
* @param	{Number}	total_stiffness	Total stiffness
*/
MemberStiffnessModification.prototype.TotalStiffnessFactor = function (total_stiffness) {
	this.memberStiffnessModification.type = member_stiffness_modifications.TYPE_TOTAL_STIFFNESSES_FACTORS;
	this.memberStiffnessModification.total_stiffness_factor_of_total_stiffness = total_stiffness;
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
	this.memberStiffnessModification.type = member_stiffness_modifications.TYPE_PARTIAL_STIFFNESSES_FACTORS;
	if (typeof axial_stiffness !== "undefined") {
		this.memberStiffnessModification.factor_of_axial_stiffness = axial_stiffness;
	}
	if (typeof bending_stiffness_y !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_y_stiffness = bending_stiffness_y;
	}
	if (typeof bending_stiffness_z !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_z_stiffness = bending_stiffness_z;
	}
	if (typeof shear_stiffness_y !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_shear_y_stiffness = shear_stiffness_y;
	}
	if (typeof shear_stiffness_z !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_shear_z_stiffness = shear_stiffness_z;
	}
	if (typeof torsional_stiffness !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_torsion_stiffness = torsional_stiffness;
	}
	if (typeof weight !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_weight = weight;
	}
};

/**
* Sets concrete structure ACI
* @param	{Number}	component_type			Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined
* @param	{Number}	bending_stiffness_y		Bending stiffness multiplier factors Z
* @param	{Number}	bending_stiffness_z		Bending stiffness multiplier factors Y
* @param	{Number}	axial_stiffness			Axial stiffness multiplier factor
*/
MemberStiffnessModification.prototype.ConcreteStructuresAci = function(component_type,
	bending_stiffness_y,
	bending_stiffness_z,
	axial_stiffness) {
	this.memberStiffnessModification.type = member_stiffness_modifications.TYPE_CONCRETE_STRUCTURES_ACI;
	setConcreteStructures(component_type, bending_stiffness_y, bending_stiffness_z, axial_stiffness);
};

/**
* Sets concrete structure CSA
* @param	{Number}	component_type			Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined
* @param	{Number}	bending_stiffness_y		Bending stiffness multiplier factors Z
* @param	{Number}	bending_stiffness_z		Bending stiffness multiplier factors Y
* @param	{Number}	axial_stiffness			Axial stiffness multiplier factor
*/
MemberStiffnessModification.prototype.ConcreteStructuresCsa = function(component_type,
	bending_stiffness_y,
	bending_stiffness_z,
	axial_stiffness) {
	this.memberStiffnessModification.type = member_stiffness_modifications.TYPE_CONCRETE_STRUCTURES_CSA;
	setConcreteStructures(component_type, bending_stiffness_y, bending_stiffness_z, axial_stiffness);
};

/**
* Sets steel structures AISC
* @param 	{Number}	determine_tau_b			Determine τb: Iterative (1), Set to 1 (2). Can be undefined.
* @param	{Number}	design_method			Design method: LRFD (1), ASD (2). Can be undefined.
* @param	{Number}	bending_stiffness_y		Bending stiffness multiplier factors Z, can be undefined.
* @param	{Number}	bending_stiffness_z		Bending stiffness multiplier factors Y, can be undefined.
* @param	{Number}	axial_stiffness			Axial stiffness multiplier factor, can be undefined.
*/
MemberStiffnessModification.prototype.SteelStructuresAisc = function (determine_tau_b,
	design_method,
	bending_stiffness_z,
	bending_stiffness_y,
	axial_stiffness) {
	this.memberStiffnessModification.type = member_stiffness_modifications.TYPE_STEEL_STRUCTURES;
	if (typeof determine_tau_b !== "undefined") {
		this.memberStiffnessModification.steel_structure_csa_determine_tau_b = determine_tau_b == 1 ? member_stiffness_modifications.ITERATIVE : member_stiffness_modifications.SET_TO_1;
	}
	if (typeof design_method !== "undefined") {
		this.memberStiffnessModification.steel_structure_design_method = design_method == 1 ? member_stiffness_modifications.LRFD : member_stiffness_modifications.ASD;
	}
	if (typeof bending_stiffness_y !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_y_stiffness = bending_stiffness_y;
	}
	if (typeof bending_stiffness_z !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_z_stiffness = bending_stiffness_z;
	}
	if (typeof axial_stiffness !== "undefined") {
		this.memberStiffnessModification.factor_of_axial_stiffness = axial_stiffness;
	}
};

/**,
* Sets steel structures CSA
* @param	{Number}	determine_tau_b						Determine τb: Iterative (1), Set to 1 (2). Can be undefined.
* @param	{Number}	axial_stiffness						Axial stiffness multiplier factor, can be undefined.
* @param	{Number}	bending_stiffness_y					Bending stiffness multiplier factors Z, can be undefined.
* @param	{Number}	bending_stiffness_z					Bending stiffness multiplier factors Y, can be undefined.
* @param	{Number}	shear_stiffness_y					Shear stiffness Y, can be undefined
* @param	{Number}	shear_stiffness_z					Shear stiffness Z, can be undefined
* @param	{Number}	torsional_stiffness					Torsional stiffness, can be undefined
* @param	{Boolean}	axial_stiffness_apply_tau_b			Apply τb to axial stiffness multiplier factor, can be undefined.
* @param	{Boolean}	bending_stiffness_y_apply_tau_b		Apply τb to bending stiffness multiplier factors Z, can be undefined.
* @param	{Boolean}	bending_stiffness_z_apply_tau_b		Apply τb to bending stiffness multiplier factors Y, can be undefined.
* @param	{Boolean}	shear_stiffness_y_apply_tau_b		Apply τb to shear stiffness Y, can be undefined
* @param	{Boolean}	shear_stiffness_z_apply_tau_b		Apply τb to shear stiffness Z, can be undefined
* @param	{Boolean}	torsional_stiffness_apply_tau_b		Apply τb to torsional stiffness, can be undefined
*/
MemberStiffnessModification.prototype.SteelStructuresCSA = function (determine_tau_b,
	axial_stiffness,
	bending_stiffness_y,
	bending_stiffness_z,
	shear_stiffness_y,
	shear_stiffness_z,
	torsional_stiffness,
	axial_stiffness_apply_tau_b,
	bending_stiffness_y_apply_tau_b,
	bending_stiffness_z_apply_tau_b,
	shear_stiffness_y_apply_tau_b,
	shear_stiffness_z_apply_tau_b,
	torsional_stiffness_apply_tau_b) {
	this.memberStiffnessModification.type = member_stiffness_modifications.TYPE_STEEL_STRUCTURES_CSA;
	if (typeof axial_stiffness !== "undefined") {
		this.memberStiffnessModification.factor_of_axial_stiffness = axial_stiffness;
	}
	if (typeof bending_stiffness_y !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_y_stiffness = bending_stiffness_y;
	}
	if (typeof bending_stiffness_z !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_z_stiffness = bending_stiffness_z;
	}
	if (typeof shear_stiffness_y !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_shear_y_stiffness = shear_stiffness_y;
	}
	if (typeof shear_stiffness_z !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_shear_z_stiffness = shear_stiffness_z;
	}
	if (typeof torsional_stiffness !== "undefined") {
		this.memberStiffnessModification.partial_stiffness_factor_of_torsion_stiffness = torsional_stiffness;
	}
	if (typeof axial_stiffness_apply_tau_b === "undefined") {
		axial_stiffness_apply_tau_b = true;
	}
	if (typeof bending_stiffness_y_apply_tau_b === "undefined") {
		bending_stiffness_y_apply_tau_b = true;
	}
	if (typeof bending_stiffness_z_apply_tau_b === "undefined") {
		bending_stiffness_z_apply_tau_b = true;
	}
	if (typeof shear_stiffness_y_apply_tau_b === "undefined") {
		shear_stiffness_y_apply_tau_b = true;
	}
	if (typeof shear_stiffness_z_apply_tau_b === "undefined") {
		shear_stiffness_z_apply_tau_b = true;
	}
	if (typeof torsional_stiffness_apply_tau_b === "undefined") {
		torsional_stiffness_apply_tau_b = true;
	}
	this.memberStiffnessModification.steel_structure_csa_factor_of_axial_stiffness_enable = axial_stiffness_apply_tau_b;
	this.memberStiffnessModification.steel_structure_csa_factor_of_bending_y_stiffness_enable = bending_stiffness_y_apply_tau_b;
	this.memberStiffnessModification.steel_structure_csa_factor_of_bending_z_stiffness_enable = bending_stiffness_z_apply_tau_b;
	this.memberStiffnessModification.steel_structure_csa_factor_of_shear_y_stiffness_enable = shear_stiffness_y_apply_tau_b;
	this.memberStiffnessModification.steel_structure_csa_factor_of_shear_z_stiffness_enable = shear_stiffness_z_apply_tau_b;
	this.memberStiffnessModification.steel_structure_csa_stiffness_factor_of_torsion_stiffness_enable = torsional_stiffness_apply_tau_b;
};

/**
* Sets concrete structures patameters (private)
* @param	{Number}	component_type			Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined
* @param	{Number}	bending_stiffness_y		Bending stiffness multiplier factors Z, can be undefined.
* @param	{Number}	bending_stiffness_z		Bending stiffness multiplier factors Y, can be undefined.
* @param	{Number}	axial_stiffness			Axial stiffness multiplier factor, can be undefined.
*/
var setConcreteStructures = function(component_type,
	bending_stiffness_y,
	bending_stiffness_z,
	axial_stiffness) {
	if (typeof component_type !== "undefined") {
		switch (component_type)	{
			case 1:
				this.memberStiffnessModification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_COLUMNS;
				break;
			case 2:
				this.memberStiffnessModification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_WALLS_UNCRACKED;
				break;
			case 3:
				this.memberStiffnessModification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_WALLS_CRACKED;
				break;
			case 4:
				this.memberStiffnessModification.concrete_structure_component_type = member_stiffness_modifications.COMPONENT_TYPE_BEAMS;
				break;
			case 5:
				this.memberStiffnessModification.concrete_structure_component_typ = member_stiffness_modifications.COMPONENT_TYPE_FLAT_PLATES_AND_FLAT_SLABS;
				break;
			default:
				ASSERT(false, "Unknown component type");
		}
	}
	if (typeof bending_stiffness_y !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_y_stiffness = bending_stiffness_y;
	}
	if (typeof bending_stiffness_z !== "undefined") {
		this.memberStiffnessModification.factor_of_bending_z_stiffness = bending_stiffness_z;
	}
	if (typeof axial_stiffness !== "undefined") {
		this.memberStiffnessModification.factor_of_axial_stiffness = axial_stiffness;
	}
};

