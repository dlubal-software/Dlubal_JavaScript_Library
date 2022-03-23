if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surface stiffness modifications.");
}

/**
 * Creates surface stiffness modification
* @class
* @constructor
* @param	{Number}	no							Index of surface stiffness modification
* @param	{Number}	structural_modification		Structural modification index
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params  					Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
function SurfaceStiffnessModification(no,
	structural_modification,
	comment,
	params)
{
	if (arguments.length !== 0) {
		return this.surface_stiffness_modification = createSurfaceStiffnessModification(no, structural_modification, comment, params);
	}
}

/**
* Creates total stiffness factor type of surface stiffness modification
* @param	{Number}	no							Index of surface stiffness modification
* @param	{Number}	structural_modification		Structural modification index
* @param	{Number}	total_stiffness				Total stiffness
* @param	{String}	comment						Comment, can be undefined, can be undefined
* @param	{Object}	params  					Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
SurfaceStiffnessModification.prototype.TotalStiffnessFactor = function (no,
	structural_modification,
	total_stiffness,
	comment,
	params) {
	this.surface_stiffness_modification = createSurfaceStiffnessModification(no, structural_modification, comment, params);
	this.surface_stiffness_modification.type = surface_stiffness_modifications.TYPE_TOTAL_STIFFNESS_FACTOR;
	this.surface_stiffness_modification.factor_of_total_stiffness = total_stiffness;
};

/**
* Creates partial stiffnesses factors type of surface stiffness modification
* @param	{Number}	no							Index of surface stiffness modification
* @param	{Number}	structural_modification		Structural modification index, can be undefined
* @param	{Number}	bending_stiffness_factor	Bending and torsional factors, can be undefined (1.00 by default)
* @param	{Number}	shear_stiffness				Shear stiffness, can be undefined (1.00 by default)
* @param	{Number}	membrane_stiffness			Membrane stiffness, can be undefined (1.00 by default)
* @param	{Number}	eccentric_effects			Eccentric stiffness, can be undefined (1.00 by default)
* @param	{Number}	weight						Weight, can be undefined (1.00 by default)
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params  					Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
SurfaceStiffnessModification.prototype.PartialStiffnessesFactors = function (no,
	structural_modification,
	bending_stiffness_factor,
	shear_stiffness,
	membrane_stiffness,
	eccentric_effects,
	weight,
	comment,
	params) {
	this.surface_stiffness_modification = createSurfaceStiffnessModification(no, structural_modification, comment, params);
	this.surface_stiffness_modification.type = surface_stiffness_modifications.TYPE_PARTIAL_STIFFNESSES_FACTORS;
	setParameter(this.surface_stiffness_modification, "factor_of_bending_stiffness", bending_stiffness_factor);
	setParameter(this.surface_stiffness_modification, "factor_of_shear_stiffness", shear_stiffness);
	setParameter(this.surface_stiffness_modification, "factor_of_membrane_stiffness", membrane_stiffness);
	setParameter(this.surface_stiffness_modification, "factor_of_eccentric_effects", eccentric_effects);
	setParameter(this.surface_stiffness_modification, "factor_of_weight", weight);
};

/**
* Creates stiffness matrix elements factors type of surface stiffness modification
* @param	{Number}	no										Index of surface stiffness modification
* @param	{Number}	structural_modification					Structural modification index, can be undefined
* @param	{Array}		bending_torsional_stiffness_elements	Bending torsional stiffness elements values ([kD11, kD12, kD13, kD22, kD23, kD33, kD11 note, kD12 note, kD13 note, kD22 note, kD23 note, kD33 note]), can be undefined (all values 1.0 by default)
* @param	{Array}		shear_stiffness_elements				Shear stiffness elements values ([kD44, kD45, kD55, kD44  note, kD45 note, kD55 note]), can be undefined (all values 1.0 by default)
* @param	{Array}		membrane_stiffness_elements				Membrane stiffness elements values ([kD66, kD67, kD68, kD77, kD78, kD88, kD66 note, kD67 note, kD68 note, kD77 note, kD78 note, kD88 note]), can be undefined (all values 1.0 by default)
* @param	{Array}		eccentric_stiffness_elements			Eccentric stiffness elements values ([kD16, kD17, kD18, kD27, kD28, kD38, kD16 note, kD17 note, kD18 note, kD27 note, kD28 note, kD38 note]), can be undefined (all values 1.0 by default)
* @param	{String}	comment									Comment, can be undefined
* @param	{Object}	params  								Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
SurfaceStiffnessModification.prototype.StiffnessMatrixElementsFactors = function (no,
	structural_modification,
	bending_torsional_stiffness_elements,
	shear_stiffness_elements,
	membrane_stiffness_elements,
	eccentric_stiffness_elements,
	comment,
	params) {
	this.surface_stiffness_modification = createSurfaceStiffnessModification(no, structural_modification, comment, params);
	this.surface_stiffness_modification.type = surface_stiffness_modifications.TYPE_STIFFNESS_MATRIX_ELEMENTS_FACTORS;
	if (typeof bending_torsional_stiffness_elements !== "undefined") {
		setStiffnessMatrixValues(this.surface_stiffness_modification, bending_torsional_stiffness_elements, "kd11", "kd12", "kd13", "kd22", "kd23", "kd33", "kd11_note", "kd12_note", "kd13_note", "kd22_note", "kd23_note", "kd33_note");
	}
	if (typeof shear_stiffness_elements !== "undefined") {
		setStiffnessMatrixValues(this.surface_stiffness_modification, shear_stiffness_elements, "kd44", "kd45", "kd55", "kd44_note", "kd45_note", "kd55_note");
	}
	if (typeof membrane_stiffness_elements !== "undefined") {
		setStiffnessMatrixValues(this.surface_stiffness_modification, membrane_stiffness_elements, "kd66", "kd67", "kd68", "kd77", "kd78", "kd88", "kd66_note", "kd67_note", "kd68_note", "kd77_note", "kd78_note", "kd88_note");
	}
	if (typeof eccentric_stiffness_elements !== "undefined") {
		setStiffnessMatrixValues(this.surface_stiffness_modification, eccentric_stiffness_elements, "kd16", "kd17", "kd18", "kd27", "kd28", "kd38", "kd16_note", "kd17_note", "kd18_note", "kd27_note", "kd28_note", "kd38_note");
	}
};

/**
* Creates concrete structure ACI type of surface stiffness modification
* @param	{Number}	no							Index of surface stiffness modification
* @param	{Number}	structural_modification		Structural modification index, can be undefined
* @param	{Number}	component_type				Component type (1 - Columns, 2 - Walls uncracked, 3 - Walls cracked, 4 - Beams, 5 - Flat plates and flat slabs), can be undefined (Columns type as default)
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params  					Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
SurfaceStiffnessModification.prototype.ConcreteStructuresACI = function (no,
	structural_modification,
	component_type,
	comment,
	params) {
	this.surface_stiffness_modification = createSurfaceStiffnessModification(no, structural_modification, comment, params);
	setConcreteStructures(this.surface_stiffness_modification, surface_stiffness_modifications.TYPE_CONCRETE_STRUCTURES_ACI, component_type);
};

/**
* Creates concrete structure CSA type of surface stiffness modification
* @param	{Number}	no							Index of surface stiffness modification
* @param	{Number}	structural_modification		Structural modification index, can be undefined
* @param	{Number}	component_type				Component type (1 - Columns, 2 - Walls uncracked, 3 - Walls cracked, 4 - Beams, 5 - Flat plates and flat slabs), can be undefined (Columns type as default)
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params  					Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
SurfaceStiffnessModification.prototype.ConcreteStructuresCSA = function (no,
	structural_modification,
	component_type,
	comment,
	params) {
	this.surface_stiffness_modification = createSurfaceStiffnessModification(no, structural_modification, comment, params);
	setConcreteStructures(this.surface_stiffness_modification, surface_stiffness_modifications.TYPE_CONCRETE_STRUCTURES_CSA, component_type);
};

/**
* Modifies concrete structures surface stiffness modification (private)
* @param	{Object}	surface_stiffness_modification	Surface stiffness modification to be set
* @param	{String}	stiffness_modification_type		Stiffness modification type
* @param	{Number}	component_type					Component type (1 - Columns, 2 - Walls uncracked, 3 - Walls cracked, 4 - Beams, 5 - Flat plates and flat slabs), can be undefined (Columns type as default)
*/
var setConcreteStructures = function (surface_stiffness_modification,
	stiffness_modification_type,
	component_type) {
	surface_stiffness_modification.type = stiffness_modification_type;
	if (typeof component_type === "undefined") {
		component_type = 1;
	}
	switch (component_type) {
		case 1:
			surface_stiffness_modification.concrete_stuctures_component_type = surface_stiffness_modifications.COMPONENT_TYPE_COLUMNS;
			break;
		case 2:
			surface_stiffness_modification.concrete_stuctures_component_type = surface_stiffness_modifications.COMPONENT_TYPE_WALLS_UNCRACKED;
			break;
		case 3:
			surface_stiffness_modification.concrete_stuctures_component_type = surface_stiffness_modifications.COMPONENT_TYPE_WALLS_CRACKED;
			break;
		case 4:
			surface_stiffness_modification.concrete_stuctures_component_type = surface_stiffness_modifications.COMPONENT_TYPE_BEAMS;
			break;
		case 5:
			surface_stiffness_modification.concrete_stuctures_component_type = surface_stiffness_modifications.COMPONENT_TYPE_FLAT_PLATES_AND_FLAT_SLABS;
			break;
		default:
			ASSERT(false, "Unknown component type");
	}
};

/**
* Creates surface stiffness modification
* @param	{Number}	no							Index of surface stiffness modification
* @param	{Number}	structural_modification		Structural modification index, can be undefined
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params  					Surface stiffness modification's parameters, can be undefined
* @returns	Created surface stiffness modification
*/
var createSurfaceStiffnessModification = function(no,
	structural_modification,
	comment,
	params) {
	var surface_stiffness_modification = surface_stiffness_modifications.create(no, structural_modification);
	set_comment_and_parameters(surface_stiffness_modification, comment, params);
	return surface_stiffness_modification;
};

/**
* Sets parameter to surface stiffness modification object (private)
* @param	{Object}	surface_stiffness_modification	Surface stiffness modification to be set
* @param	{String}	parameter_name					Name of parameter
* @param	{Number}	parameter_value					Value to be set
*/
var setParameter = function (surface_stiffness_modification,
	parameter_name,
	parameter_value) {
	if (typeof parameter_value !== "undefined") {
		surface_stiffness_modification[parameter_name] = parameter_value;
	}
};

/**
* Set load parameters
* @param 	{Array}	arguments		Arguments: arg[0] - surface stiffness modification, arg[1] - array of stiffness matrix values to set, arg[2, 3 ... n] - stiffness matrix parameters to be set
*/
var setStiffnessMatrixValues = function () {
	ASSERT(arguments.length >= 3);
	var surface_stiffness_modification = arguments[0];
	var stiffness_matrix_values = arguments[1];
	ASSERT(stiffness_matrix_values.length <= arguments.length - 2, "Stiffness matrix values count must be smaller or equal number of parameters names");
	for (var i = 0; i < stiffness_matrix_values.length; ++i) {
		var arg = arguments[i + 2];
		surface_stiffness_modification[arg] = stiffness_matrix_values[i];
	}
};