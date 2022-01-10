include("BaseLoad.js");

/**
* Creates imposed line deformation
* @class
* @constructor
* @param 	{Number}	no					Index of imposed line deformation, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		lines				List of lines indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created imposed line deformation
*/
function ImposedLineDeformation(no,
                                load_case,
                                lines,
                                comment,
                                params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Imposed_Line_Deformation", no, load_case, lines, comment, params);
	}
}

/**
* Creates imposed line deformation
* @param 	{Number}	no							Index of imposed line deformation, can be undefined
* @param 	{Object}	load_case					Load case
* @param 	{Array}		lines						List of lines indexes
* @param	{Number}	displacement_line_start_x	Imposed displacement at line start ux,i
* @param	{Number}	displacement_line_start_y	Imposed displacement at line start uy,i, can be undefined
* @param	{Number}	displacement_line_start_z	Imposed displacement at line start uz,i, can be undefined
* @param	{Number}	displacement_line_end_x		Imposed displacement at line end ux,j, can be undefined
* @param	{Number}	displacement_line_end_y		Imposed displacement at line end uy,i, can be undefined
* @param	{Number}	displacement_line_end_z		Imposed displacement at line end uz,i, can be undefined
* @param	{Number}	rotation_line_start			Imposed rotation at line start ϕx,i, can be undefined
* @param	{Number}	rotation_line_end			Imposed rotation at line end ϕx,j, can be undefined
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params						Load parameters, can be undefined
* @return	{Object}	Created imposed nodal deformation
*/
ImposedLineDeformation.prototype.Set = function (no,
	load_case,
	lines,
	displacement_line_start_x,
	displacement_line_start_y,
	displacement_line_start_z,
	displacement_line_end_x,
	displacement_line_end_y,
	displacement_line_end_z,
	rotation_line_start,
	rotation_line_end,
	comment,
	params) {
	ASSERT(arguments.length >= 4, "Wrong number of parameters, at lease four are required (no, load case, nodes, imposed displacement at line start ux,i)");

	load_values = [displacement_line_start_x];
	for (var i = 4; i < arguments.length; ++i) {
		if (typeof arguments[i] != "undefined") {
			load_values.push(arguments[i]);
		}
		else {
			load_values.push(0);
		}
		if (i == 10) {
			// comment and other params
			break;
		}
	}

	this.load = createBaseLoad("Imposed_Line_Deformation", no, load_case, lines, comment, params);
	setLoadValues(this.load, load_values, "imposed_displacement_line_start_x", "imposed_displacement_line_start_y", "imposed_displacement_line_start_z", "imposed_displacement_line_end_x", "imposed_displacement_line_end_y", "imposed_displacement_line_end_z", "imposed_rotation_line_start", "imposed_rotation_line_end");

	return this.load;
};