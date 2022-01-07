include("BaseLoad.js");

/**
* Creates free circular load
* @param 	{Number}	no					Index of free circular load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of surface indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created free circular load
*/
function FreeCircularLoad(no,
                          load_case,
                          surfaces,
                          comment,
                          params)
{
    if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Free_Circular_Load", no, load_case, surfaces, comment, params);
	}
}

/**
* Set parameters to free circular load depend on load distribution
* @param	{Object}	load				Load
* @param	{String}	load_distribution	Load distribution
* @param	{Array}		load_values			Load parameters depend of load distribution
*											- "Uniform": [p, R, CX, CY]
*											- "Linear": [pC, R, pR, CX, CY]
* @return	{Object}	Returns modified load
*/
var setFreeCircularLoadParameters = function(load,
											 load_distribution,
											 load_values)
{
	load.load_distribution = load_distribution;

	switch (load_distribution)
	{
		case free_circular_loads.LOAD_DISTRIBUTION_UNIFORM:
			ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (p, R)");
			setLoadValues(load, load_values, "magnitude_uniform", "load_location_radius", "load_location_x", "load_location_y");
			break;
		case free_circular_loads.LOAD_DISTRIBUTION_LINEAR:
			ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (pC, R)");
			setLoadValues(load, load_values, "magnitude_center", "load_location_radius", "magnitude_radius", "load_location_x", "load_location_y");
			break;
		default:
			showLoadAssert(undefined, load_distribution);
	}
	
	return load;
};

/**
* Creates free circular uniform load
* @param 	{Number}	no						Index of free circular uniform load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free circular uniform load
*/
FreeCircularLoad.prototype.Uniform = function(no,
											  load_case,
											  surfaces,
											  load_values,
											  load_projection,
											  load_direction,
											  load_acting_region_from,
											  load_acting_region_to,
											  comment,
											  params)
{
	this.load = createBaseLoad("Free_Circular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeCircularLoadParameters(this.load, free_circular_loads.LOAD_DISTRIBUTION_UNIFORM, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);
	
	return this.load;
};

/**
* Creates free circular linear load
* @param 	{Number}	no						Index of free circular linear load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free linear uniform load
*/
FreeCircularLoad.prototype.Linear = function(no,
											 load_case,
											 surfaces,
											 load_values,
											 load_projection,
											 load_direction,
											 load_acting_region_from,
											 load_acting_region_to,
											 comment,
											 params)
{
	this.load = createBaseLoad("Free_Circular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeCircularLoadParameters(this.load, free_circular_loads.LOAD_DISTRIBUTION_LINEAR, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);
	
	return this.load;
};