if (!RFEM) {
	throw new Error("This script is only for RFEM, it works with solids.");
}

/**
 * Creates solid mesh refinement
* @class
* @constructor
* @param	{Number}	no			Index of solid mesh refinement, can be undefined
* @param	{Array}		solid_list	List of solid indexes
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Solid mesh refinement's parameters, can be undefined
* @returns	Created solid mesh refinement
*/
function SolidMeshRefinement (no,
	solid_list,
	comment,
	params) {
	if (arguments.length !== 0) {
		return this.solid_mesh_refinement = createSolidMeshRefinement(no, solid_list, comment, params);
	}
}

/**
* Creates solid mesh refinement
* @param	{Number}	no				Index of solid mesh refinement, can be undefined
* @param	{Array}		solid_list		List of solid indexes
* @param	{Number}	target_length	Target FE length
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Solid mesh refinement's parameters, can be undefined
*/
SolidMeshRefinement.prototype.TargetLength = function (no,
	solid_list,
	target_length,
	comment,
	params) {
	this.solid_mesh_refinement = createSolidMeshRefinement(no, solid_list, comment, params);
	this.solid_mesh_refinement.target_length = target_length;
};

/**
* Creates solid mesh refinement (private)
* @param	{Number}	no			Index of solid mesh refinement, can be undefined
* @param	{Array}		solid_list	List of solid indexes
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Solid mesh refinement's parameters, can be undefined
* @returns	Created solid mesh refinement
*/
var createSolidMeshRefinement = function (no, 
	solid_list,
	comment,
	params) {
	var solid_mesh_refinement = solid_mesh_refinements.create(no);
	set_comment_and_parameters(solid_mesh_refinement, comment, params);
	var solidList = [];
	for (var i = 0; i < solid_list.length; ++i) {
		if (solids.exist(solid_list[i])) {
			solidList.push(solid_list[i]);
		}
		else {
			console.log("Solid no. " + solid_list[i] + " doesn't exist");
		}
	}
	solid_mesh_refinement.solids = solidList;
	return solid_mesh_refinement;
};