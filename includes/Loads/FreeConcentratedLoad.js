include("BaseLoad.js");

/**
* Creates free concentrated load
* @class
* @constructor
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
	load_values) {
	load.load_type = load_type;

	switch (load_type) {
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
FreeConcentratedLoad.prototype.Force = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Concentrated_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeConcentratedLoadParameters(this.load, free_concentrated_loads.LOAD_TYPE_FORCE, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, GetFreeConcentratedLoadDirectionType(load_direction), load_acting_region_from, load_acting_region_to);

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
FreeConcentratedLoad.prototype.Moment = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Concentrated_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeConcentratedLoadParameters(this.load, free_concentrated_loads.LOAD_TYPE_MOMENT, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, GetFreeConcentratedLoadDirectionType(load_direction), load_acting_region_from, load_acting_region_to);

	return this.load;
};

function GetFreeConcentratedLoadDirectionType(direction_type) {
	var direction_types_dict = {
		"LOCAL_X": free_circular_loads.LOAD_DIRECTION_LOCAL_X,
		"LOCAL_Y": free_circular_loads.LOAD_DIRECTION_LOCAL_Y,
		"LOCAL_Z": free_circular_loads.LOAD_DIRECTION_LOCAL_Z,
		"GLOBAL_X": free_concentrated_loads.LOAD_DIRECTION_GLOBAL_X,
		"GLOBAL_Y": free_concentrated_loads.LOAD_DIRECTION_GLOBAL_Y,
		"GLOBAL_Z": free_concentrated_loads.LOAD_DIRECTION_GLOBAL_Z,
		"USER_DEFINED_U_TRUE": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_U_TRUE,
		"USER_DEFINED_V_TRUE": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_V_TRUE,
		"USER_DEFINED_W_TRUE": free_circular_loads.LOAD_DIRECTION_USER_DEFINED_W_TRUE
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
