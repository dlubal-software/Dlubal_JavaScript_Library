include("BaseLoad.js");

/**
* Creates free circular load
* @class
* @constructor
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
var setFreeCircularLoadParameters = function (load,
	load_distribution,
	load_values) {
	load.load_distribution = load_distribution;

	switch (load_distribution) {
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
FreeCircularLoad.prototype.Uniform = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Circular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeCircularLoadParameters(this.load, free_circular_loads.LOAD_DISTRIBUTION_UNIFORM, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, GetFreeCircularLoadDirectionType(load_direction), load_acting_region_from, load_acting_region_to);

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
FreeCircularLoad.prototype.Linear = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Circular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeCircularLoadParameters(this.load, free_circular_loads.LOAD_DISTRIBUTION_LINEAR, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, GetFreeCircularLoadDirectionType(load_direction), load_acting_region_from, load_acting_region_to);

	return this.load;
};

function GetFreeCircularLoadDirectionType(direction_type) {
	var direction_types_dict = {
		"LOCAL_X": free_circular_loads.LOAD_DIRECTION_LOCAL_X,
		"LOCAL_Y": free_circular_loads.LOAD_DIRECTION_LOCAL_Y,
		"LOCAL_Z": free_circular_loads.LOAD_DIRECTION_LOCAL_Z,
		"GLOBAL_X_TRUE": free_circular_loads.LOAD_DIRECTION_GLOBAL_X_TRUE,
		"GLOBAL_Y_TRUE": free_circular_loads.LOAD_DIRECTION_GLOBAL_Y_TRUE,
		"GLOBAL_Z_TRUE": free_circular_loads.LOAD_DIRECTION_GLOBAL_Z_TRUE,
		"GLOBAL_X_PROJECTED": free_circular_loads.LOAD_DIRECTION_GLOBAL_X_PROJECTED,
		"GLOBAL_Y_PROJECTED": free_circular_loads.LOAD_DIRECTION_GLOBAL_Y_PROJECTED,
		"GLOBAL_Z_PROJECTED": free_circular_loads.LOAD_DIRECTION_GLOBAL_Z_PROJECTED,
		"USER_DEFINED_U_TRUE": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_U_TRUE,
		"USER_DEFINED_V_TRUE": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_V_TRUE,
		"USER_DEFINED_W_TRUE": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_W_TRUE,
		"USER_DEFINED_U_PROJECTED": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_U_PROJECTED,
		"USER_DEFINED_V_PROJECTED": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_V_PROJECTED,
		"USER_DEFINED_W_PROJECTED": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_W_PROJECTED
	};

	if (typeof direction_type !== "undefined") {
		var type = direction_types_dict[direction_type];
		if (type === "undefined") {
		  console.log("Wrong direction type. Value was: " + direction_type);
		  console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
		  type = free_circular_loads.LOAD_DIRECTION_GLOBAL_Z_TRUE;
		}
		return type;
	}
	return free_circular_loads.LOAD_DIRECTION_GLOBAL_Z_TRUE;
}
