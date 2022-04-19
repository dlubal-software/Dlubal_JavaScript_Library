/**
* Creates line mesh refinement
* @param	{Number}			no						Index of line mesh refinement, can be undefined
* @param	{Number}			targetFELength			Length of FEA element side on the line, can be undefined
* @param	{Number}			numberOfLayers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number | Array}	lines					Lines assigned to this refinement, can be undefined
* @param	{String}			comment					Comment, can be undefined
* @param	{Object}			params					line mesh refinement parameters, can be undefined
* @return	{Object}			Created line mesh refinement
*/
var createLineMeshRefinement = function (no) {

	if (no != undefined) {
		var lineMeshRefinement = line_mesh_refinements.create(no);
	}
	else {
		var lineMeshRefinement = line_mesh_refinements.create();
	}
	return lineMeshRefinement;
};
var setParameterLineMeshRefinement = function (
	lineMeshRefinement,
	name,
	lines,
	targetFELength,
	numberOfFiniteElements,
	numberOfLayers,
	gradual_rows,
	comment,
	params) {

	const default_targetFELength = 0.01;
	const default_numberOfLayers = 4;
	const default_numberOfFiniteElements = 6;
	const default_gradual_rows = 3;

	const numberOfLayers_options = [2, 4, 6, 8]

	if (name != undefined) {
		lineMeshRefinement.user_defined_name_enabled = true;
		lineMeshRefinement.name = name;
	}
	else {
		lineMeshRefinement.user_defined_name_enabled = false;
	}

	if (lines != undefined) {
		lineMeshRefinement.lines = lines;
	}

	if (targetFELength === undefined) {
		targetFELength = default_targetFELength;
	}

	if (numberOfFiniteElements === undefined) {
		numberOfFiniteElements = default_numberOfFiniteElements;
	}

	if (numberOfLayers === undefined) {
		numberOfLayers = default_numberOfLayers;
	}

	if (gradual_rows === undefined) {
		gradual_rows = default_gradual_rows;
	}

	if (targetFELength != false) {
		lineMeshRefinement.type = line_mesh_refinements.TYPE_LENGTH;
		lineMeshRefinement.target_length = targetFELength;
	}

	if (numberOfLayers_options.indexOf(numberOfLayers) === -1) {
		console.log("Allowed values for layers number are: " + numberOfLayers_options)
		console.log("Number of layers for Line Mesh Refinement no. " + lineMeshRefinement.no + "  will be se to: " + default_numberOfLayers + ".")
		numberOfLayers = default_numberOfLayers;
	}

	lineMeshRefinement.number_of_layers = numberOfLayers;

	if (numberOfFiniteElements != false) {
		lineMeshRefinement.type = line_mesh_refinements.TYPE_ELEMENTS;
		lineMeshRefinement.elements_finite_elements = numberOfFiniteElements;
	}

	if (gradual_rows != false) {
		lineMeshRefinement.type = line_mesh_refinements.TYPE_GRADUAL;
		lineMeshRefinement.gradual_rows = gradual_rows;
	}

	set_comment_and_parameters(lineMeshRefinement, comment, params);

	return lineMeshRefinement;
};

/**
 * Creates line mesh refinement
 * @class
 * @constructor
 * @param	{Number}			no						Index of line mesh refinement, can be undefined
 * @param	{Number}			targetFELength			Length of FEA element side on the line, can be undefined
 * @param	{Number}			numberOfLayers					Number of layers to be affected by this refinement, can be undefined
 * @param	{Number | Array}	lines					Lines assigned to this refinement, can be undefined
 * @param	{String}			comment					Comment, can be undefined
 * @param	{Object}			params					line mesh refinement parameters, can be undefined
 * @return	{Object}			Created line mesh refinement HLF
*/
function LineMeshRefinement(no,
	name,
	lines,
	targetFELength,
	numberOfLayers,
	comment,
	params) {
	
		this.settings = createLineMeshRefinement(no);
		var self = this;
		this.settings = setParameterLineMeshRefinement(self.settings, name, lines, targetFELength, false, numberOfLayers, false, comment, params);
		return self;
	
}
/**
* Change line mesh refinement to type based on element length
* @param	{Number}			targetFELength			Length of FEA element side on the line, can be undefined
* @param	{Number}			numberOfLayers			Number of layers to be affected by this refinement, can be undefined
* @param	{Number | Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.TargetFELength = function (targetFELength, numberOfLayers, lines) {
	this.settings = setParameterLineMeshRefinement(this.settings, undefined, lines, targetFELength, false, numberOfLayers, false, undefined, undefined);
	return this.settings;
}
/**
* Change line mesh refinement to type based on number of elements on line
* @param	{Number}			numberOfFiniteElements		Number of FEA elements on the line, can be undefined
* @param	{Number}			numberOfLayers				Number of layers to be affected by this refinement, can be undefined
* @param	{Number | Array}	lines						Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.NumberFiniteElements = function (numberOfFiniteElements, numberOfLayers, lines) {
	this.settings = setParameterLineMeshRefinement(this.settings, undefined, lines, false, numberOfFiniteElements, numberOfLayers, false, undefined, undefined);
	return this.settings;
}
/**
* Change line mesh refinement to type gradually changed due to distance from the line
* @param	{Number}			gradual_rows			Number gradual rows of FEA elements, can be undefined
* @param	{Number}			numberOfLayers			Number of layers to be affected by this refinement, can be undefined
* @param	{Number | Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.Gradual = function (gradual_rows, numberOfLayers, lines) {
	this.settings = setParameterLineMeshRefinement(this.settings, undefined, lines, false, false, numberOfLayers, gradual_rows, undefined, undefined);
	return this.settings;
}
LineMeshRefinement.prototype.GetNo = function () {
	return this.settings.no;
}
/**
* Function for assign lines to line mesh refinement
* @param	{Number}			gradual_rows			Number gradual rows of FEA elements, can be undefined
* @param	{Number | Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.SetLines = function (lines) {
	this.settings.lines = lines;
	return this.settings;
}

