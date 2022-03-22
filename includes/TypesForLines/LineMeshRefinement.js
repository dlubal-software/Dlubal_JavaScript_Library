/**
* Creates line mesh refinement
* @functiom
* @constructor
* @param	{Number}			no						Index of line mesh refinement, can be undefined
* @param	{Number}			tagretFELenght			Length of FEA element side on the line, can be undefined
* @param	{Number}			numberOflayers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @param	{String}			comment					Comment, can be undefined
* @param	{Object}			params					line mesh refinement parameters, can be undefined
* @return	{Object}			Created line mesh refinement
*/
var createLineMeshRefinement = function (no,
										 name,
										 lines,
										 tagretFELenght,											
										 numberOflayers,
										 comment,
										 params) {


 
	if (no != undefined) {
		var lineMeshRefinement = line_mesh_refinements.create(no);
	}
	else {
	 	var lineMeshRefinement = line_mesh_refinements.create();
	}

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

	if (tagretFELenght != undefined) {
		lineMeshRefinement.target_length = tagretFELenght;
	}

	if (numberOflayers != undefined) {
		lineMeshRefinement.number_of_layers = numberOflayers;
	}

	set_comment_and_parameters(lineMeshRefinement, comment, params);


	return lineMeshRefinement;
};

/**
* Creates line mesh refinement
* @class
* @constructor
* @param	{Number}			no						Index of line mesh refinement, can be undefined
* @param	{Number}			tagretFELenght			Length of FEA element side on the line, can be undefined
* @param	{Number}			numberOflayers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @param	{String}			comment					Comment, can be undefined
* @param	{Object}			params					line mesh refinement parameters, can be undefined
* @return	{Object}			Created line mesh refinement HLF
*/
function LineMeshRefinement(no,
							name,
							lines,
							tagretFELenght,
							numberOflayers,
                            comment,
                            params)
{
    this.settings = createLineMeshRefinement(no, name, lines, tagretFELenght, numberOflayers, comment, params);
    var self = this;
    return self;
}


/**
* Change line mesh refinement to type based on element length
* @param	{Number}			tagretFELenght			Length of FEA element side on the line, can be undefined
* @param	{Number}			numberOflayers			Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.TargetFELenght = function(tagretFELenght, numberOflayers, lines) {
	
	this.settings.type = line_mesh_refinements.TYPE_LENGTH;
	if (tagretFELenght != undefined) {
		this.settings.target_length = tagretFELenght;
	}

	if (numberOflayers != undefined) {
		this.settings.number_of_layers = numberOflayers;
	}

	if (lines != undefined) {
		this.settings.lines = lines;
	}

	return this.settings;
}


/**
* Change line mesh refinement to type based on number of elements on line
* @param	{Number}			numberOfFiniteElements		Number of FEA elements on the line, can be undefined
* @param	{Number}			numberOflayers				Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines						Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.NumberFiniteElements = function(numberOfFiniteElements, numberOfLayers, lines) {

	this.settings.type = line_mesh_refinements.TYPE_ELEMENTS;
	if (elements != undefined) {
		this.settings.elements_finite_elements = numberOfFiniteElements;
	}

	if (numberOflayers != undefined) {
		this.settings.number_of_layers = numberOflayers;
	}

	if (lines != undefined) {
		this.settings.lines = lines;
	}
	return this.settings;
}


/**
* Change line mesh refinement to type gradually changed due to distance from the line
* @param	{Number}			gradual_rows			Number gradual rows of FEA elements, can be undefined
* @param	{Number}			numberOflayers			Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.Gradual = function(gradual_rows, numberOflayers, lines) {
	this.settings.type = line_mesh_refinements.TYPE_GRADUAL;
	if (gradual_rows != undefined) {
		this.settings.gradual_rows = gradual_rows;
	}

	if (numberOflayers != undefined) {
		this.settings.number_of_layers = numberOflayers;
	}

	if (lines != undefined) {
		this.settings.lines = lines;
	}
	return this.settings;

}


LineMeshRefinement.prototype.GetNo = function() {
	return this.settings.no;
}



/**
* Function for assign lines to line mesh refinement
* @param	{Number}			gradual_rows			Number gradual rows of FEA elements, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.SetLines = function(lines) {
	this.settings.lines = lines;
	return this.settings;
}
	
