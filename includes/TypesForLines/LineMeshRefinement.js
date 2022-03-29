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
var createLineMeshRefinement = function (no) {

	if (no != undefined) {
		var lineMeshRefinement = line_mesh_refinements.create(no);
	}
	else {
	 	var lineMeshRefinement = line_mesh_refinements.create();
	}
	return lineMeshRefinement;
};


var setParemetersLineMeshRefinement = function (
										 lineMeshRefinement,
										 name,
										 lines,
										 tagretFELenght,
										 numberOfFiniteElements,											
										 numberOflayers,
										 gradual_rows,
										 comment,
										 params) {

	const default_tagretFELenght = 0.01;
	const default_numberOflayers = 4;
	const default_numberOfFiniteElements = 6;
	const default_gradual_rows = 3;

	const numberOflayers_options = [2, 4, 6, 8]

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

	if (tagretFELenght === undefined) {
		tagretFELenght = default_tagretFELenght; 
	}

	if (numberOfFiniteElements === undefined) {
		numberOfFiniteElements = default_numberOfFiniteElements; 
	}

	if (numberOflayers === undefined) {
		numberOflayers = default_numberOflayers;
	}

	if (gradual_rows === undefined) {
		gradual_rows = default_gradual_rows;
	}

	if (tagretFELenght != false) {
		lineMeshRefinement.type = line_mesh_refinements.TYPE_LENGTH;
		lineMeshRefinement.target_length = tagretFELenght;
	}

	if (numberOflayers_options.indexOf(numberOflayers) === -1) {
		console.log("Allowed values for layers number are: " + numberOflayers_options)
		console.log("Number of layers for Line Mesh Refinement no. " + lineMeshRefinement.no + "  will be se to: " + default_numberOflayers + ".")		
		numberOflayers = default_numberOflayers;
	}

	lineMeshRefinement.number_of_layers = numberOflayers;

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
    this.settings = createLineMeshRefinement()
    var self = this;
    this.settings = setParemetersLineMeshRefinement(self.settings, name, lines, tagretFELenght, false, numberOflayers, false, comment, params);
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
	this.settings = setParemetersLineMeshRefinement(this.settings, undefined, lines, tagretFELenght, false, numberOflayers, false, undefined, undefined);
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
	this.settings = setParemetersLineMeshRefinement(this.settings, undefined, lines, false, numberOfFiniteElements, numberOflayers, false, undefined, undefined);
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
	this.settings = setParemetersLineMeshRefinement(this.settings, undefined, lines, false, false, numberOflayers, gradual_rows, undefined, undefined);	
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
	
