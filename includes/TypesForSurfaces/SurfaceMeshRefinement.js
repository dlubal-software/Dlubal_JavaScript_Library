if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surface mesh refinements.");
}

/**
* Creates surface mesh refinement
* @class
* @constructor
* @param	{Number}	no				Index of surface stiffness modification, can be undefined
* @param	{Array}		surface_list	List of surface indexes, can be undefined
* @param	{Number}	target_length	Target FE length, can be undefined (0.05 m by default)
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface stiffness modification's parameters, can be undefined
* @returns	Created surface mesh refinement
*/
function SurfaceMeshRefinement(no,
	surface_list,
	target_length,
	comment,
	params) {
	ASSERT(arguments.length >= 2, "No/undefined and surface_list must be specified");
	this.surface_mesh_refinement = createSurfaceMeshRefinement(no, surface_list, comment, params);
	if (typeof target_length !== "undefined") {
		this.surface_mesh_refinement.target_length = target_length;
	}
	return this.surface;
}

/**
* Creates surface mesh refinement (private)
* @param	{Number}	no				Index of surface stiffness modification, can be undefined
* @param	{Array}		surface_list	List of surface indexes, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface stiffness modification's parameters, can be undefined
* @returns	Created surface mesh refinement
*/
var createSurfaceMeshRefinement = function (no,
	surface_list,
	comment,
	params) {
	var surface_mesh_refinement = engine.create_surface_mesh_refinement(no);
	set_comment_and_parameters(surface_mesh_refinement, comment, params);
	if (typeof surface_list !== "undefined") {
		var surfaceList = [];
		for (var i = 0; i < surface_list.length; ++i) {
			if (surfaces.exist(surface_list[i])) {
				surfaceList.push(surface_list[i]);
			}
			else {
				console.log("Surface no. " + surface_list[i] + " doesn't exist");
			}
		}
	}
	surface_mesh_refinement.surfaces = surfaceList;
	return surface_mesh_refinement;
};
