include("BaseLoad.js");

/**
* Creates free concentrated load
* @param 	{Number}	no					Index of free concentrated load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of surface indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created free concentrated load
*/
function FreeConcentratedLoad(no,
                              load_case,
                              surfaces,
                              comment,
                              params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Free_Concentrated_Load", no, load_case, surfaces, comment, params);
	}
}

/**
* Set parameters to free concentrated load depend on load type
* @param	{Object}	load			Load
* @param	{String}	load_type		Load type
* @param	{Array}		load_values		Load parameters depend of load type
*											- "Force": [p, X, Y]
*											- "Moment": [M, X, Y]
* @return	{Object}	Returns modified load
*/
function setFreeConcentratedLoadParameters(load,
										   load_type,
										   load_values)
{
	load.load_type = load_type;
	
	switch (load_type)
	{
		case free_concentrated_loads.LOAD_TYPE_FORCE:
			ASSERT(load_values.length === 3, "Wrong number of load parameters, three are required (p, X, Y)");
			setLoadValues(load, load_values, "magnitude", "load_location_x", "load_location_y");
			break;
		case free_concentrated_loads.LOAD_TYPE_MOMENT:
			ASSERT(load_values.length === 3, "Wrong number of load parameters, three are required (M, X, Y)");
			setLoadValues(load, load_values, "magnitude", "load_location_x", "load_location_y");
			break;
		default:
			showLoadAssert(load_type);
	}
	
	return load;
}

/**
* Creates free concentrated force load
* @param 	{Number}	no						Index of free concentrated force load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free concentrated force load
*/
FreeConcentratedLoad.prototype.Force = function(no,
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
	this.load = createBaseLoad("Free_Concentrated_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeConcentratedLoadParameters(this.load, free_concentrated_loads.LOAD_TYPE_FORCE, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);
	
	return this.load;
};

/**
* Creates free concentrated moment load
* @param 	{Number}	no						Index of free concentrated moment load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free concentrated moment load
*/
FreeConcentratedLoad.prototype.Moment = function(no,
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
	this.load = createBaseLoad("Free_Concentrated_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeConcentratedLoadParameters(this.load, free_concentrated_loads.LOAD_TYPE_MOMENT, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);
	
	return this.load;
};