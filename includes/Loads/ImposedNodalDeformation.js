include("BaseLoad.js");

/**
* Creates imposed nodal deformation
* @param 	{Number}	no					Index of imposed nodal deformation, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		nodes				List of nodes indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created imposed nodal deformation
*/
function ImposedNodalDeformation(no,
                                 load_case,
                                 nodes,
                                 comment,
                                 params)
{
	if (arguments.length !== 0)
	{
		this.load = createBaseLoad("Imposed_Nodal_Deformation", no, load_case, nodes, comment, params);
	}
};

/**
* Creates imposed nodal deformation
* @param 	{Number}	no						Index of imposed nodal deformation, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		nodes					List of nodes indexes
* @param	{Number}	imposed_displacement_x	Imposed displacement uX'
* @param	{Number}	imposed_displacement_y	Imposed displacement uY', can be undefined
* @param	{Number}	imposed_displacement_z	Imposed displacement uZ', can be undefined
* @param	{Number}	imposed_rotation_x		Imposed rotation ϕX', can be undefined
* @param	{Number}	imposed_rotation_y		Imposed rotation ϕY', can be undefined
* @param	{Number}	imposed_rotation_z		Imposed rotation ϕZ', can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created imposed nodal deformation
*/
ImposedNodalDeformation.prototype.Set = function(no,
												 load_case,
												 nodes,
												 imposed_displacement_x,
												 imposed_displacement_y,
												 imposed_displacement_z,
												 imposed_rotation_x,
												 imposed_rotation_y,
												 imposed_rotation_z,
												 comment,
												 params)
{
	ASSERT(arguments.length >= 4, "Wrong number of parameters, at lease four are required (no, load case, nodes, imposed displacement x)");
	
	load_values = [imposed_displacement_x];
	for (var i = 4; i < arguments.length; ++i)
	{
		if (typeof arguments[i] != "undefined")
		{
			load_values.push(arguments[i]);
		}
		else
		{
			load_values.push(0);
		}
		if (i == 8)
		{
			// comment and other params
			break;
		}
	}
	
	this.load = createBaseLoad("Imposed_Nodal_Deformation", no, load_case, nodes, comment, params);
	setLoadValues(this.load, load_values, "imposed_displacement_x", "imposed_displacement_y", "imposed_displacement_z", "imposed_rotation_x", "imposed_rotation_y", "imposed_rotation_z");
	
	return this.load;
};