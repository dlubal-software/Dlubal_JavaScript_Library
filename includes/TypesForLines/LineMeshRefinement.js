/**
* Creates line mesh refinement
* @functiom
* @constructor
* @param	{Number}			no						Index of line mesh refinement, can be undefined
* @param	{Number}			target_length			Length of FEA element side on the line, can be undefined
* @param	{Number}			layers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @param	{String}			comment					Comment, can be undefined
* @param	{Object}			params					line mesh refinement parameters, can be undefined
* @return	{Object}			Created line mesh refinement
*/
var createLineMeshRefinement = function (no,
										 target_length,											
										 layers,
										 lines,
										 comment,
										 params) {



	if (no != undefined) {
		var lineMeshRefinement = line_mesh_refinements.create(no);
	}
	else {
	 	var lineMeshRefinement = line_mesh_refinements.create();
	}

	if (target_length != undefined) {
		lineMeshRefinement.target_length = target_length;
	}

	if (layers != undefined) {
		lineMeshRefinement.number_of_layers = layers;
	}

	if (lines != undefined) {
		lineMeshRefinement.lines = lines;
	}
	set_comment_and_parameters(lineMeshRefinement, comment, params);


	return lineMeshRefinement;
};

/**
* Creates line mesh refinement
* @class
* @constructor
* @param	{Number}			no						Index of line mesh refinement, can be undefined
* @param	{Number}			target_length			Length of FEA element side on the line, can be undefined
* @param	{Number}			layers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @param	{String}			comment					Comment, can be undefined
* @param	{Object}			params					line mesh refinement parameters, can be undefined
* @return	{Object}			Created line mesh refinement HLF
*/
function LineMeshRefinement(no,
							target_length,
							layers,
							lines,
                            comment,
                            params)
{
    this.settings = createLineMeshRefinement(no, target_length, layers, lines, comment, params);
    var self = this;
    return self;
}


/**
* Change line mesh refinement to type based on element length
* @param	{Number}			target_length			Length of FEA element side on the line, can be undefined
* @param	{Number}			layers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.Lenght = function(target_length, layers, lines) {
	
	this.settings.type = line_mesh_refinements.TYPE_LENGTH;
	if (target_length != undefined) {
		this.settings.target_length = target_length;
	}

	if (layers != undefined) {
		this.settings.number_of_layers = layers;
	}

	if (lines != undefined) {
		this.settings.lines = lines;
	}

	return this.settings
}


/**
* Change line mesh refinement to type based on number of elements on line
* @param	{Number}			elements			Number of FEA elements on the line, can be undefined
* @param	{Number}			layers				Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines				Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.Elements = function(elements, layers, lines) {

	this.settings.type = line_mesh_refinements.TYPE_ELEMENTS;
	if (elements != undefined) {
		this.settings.elements_finite_elements = elements;
	}

	if (layers != undefined) {
		this.settings.number_of_layers = layers;
	}

	if (lines != undefined) {
		this.settings.lines = lines;
	}
	return this.settings
}


/**
* Change line mesh refinement to type gradually changed due to distance from the line
* @param	{Number}			gradual_rows			Number gradual rows of FEA elements, can be undefined
* @param	{Number}			layers					Number of layers to be affected by this refinement, can be undefined
* @param	{Number or Array}	lines					Lines assigned to this refinement, can be undefined
* @return	{Object}			Created line mesh refinement
*/
LineMeshRefinement.prototype.Gradual = function(gradual_rows, layers, lines) {
	this.settings.type = line_mesh_refinements.TYPE_GRADUAL;
	if (gradual_rows != undefined) {
		this.settings.gradual_rows = gradual_rows;
	}

	if (layers != undefined) {
		this.settings.number_of_layers = layers;
	}

	if (lines != undefined) {
		this.settings.lines = lines;
	}
	return this.settings

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
	return this.settings
}
	
