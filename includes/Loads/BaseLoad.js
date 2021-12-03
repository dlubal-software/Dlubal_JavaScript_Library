/**
 * Creates load based on its type
 * @param	{Number}	load_type	Load type
 * @param	{Number}	no			Index of load, can be undefined
 * @param	{Object}	load_case	Load case
 * @param	{Array}		index_list	List of assigned objects (indexes), can be empty
 * @param	{String}	comment		Comment, can be undefined
 * @param	{Object}	params		Load parameters, can be undefined
 * @return 	{Object}	Created load
*/
function createBaseLoad (load_type,
						 no,
						 load_case,
						 index_list,
						 comment,
						 params)
{	
	ASSERT(typeof load_case != "undefined", "Load case is not specified");
	
	var load = engine.create_load(no, load_type, load_case);
	var handled_params = typeof params != "undefined" ? params : {};
	
	switch (load_type)
	{
		case "Nodal_Load":
			handled_params["nodes"] = typeof index_list != "undefined" ? index_list : [];
			break;
		case "Member_Load":
			handled_params["members"] = typeof index_list != "undefined" ? index_list : [];
			break;
		case "Line_Load":
			handled_params["lines"] = typeof index_list != "undefined" ? index_list : [];
			break;
		case "Surface_Load":
			handled_params["surfaces"] = typeof index_list != "undefined" ? index_list : [];
			break;
		default:
			ASSERT(false, "Unknown load type");
	}
	
	set_comment_and_parameters(load, comment, handled_params);
	
	return load;
}

/**
 * Creates load with one only value (force, mass and so on)
 * @param	{Number}	load_type		Load type
 * @param	{Number}	no				Index of nodal load, can be undefined
 * @param	{Object}	load_case		Load case
 * @param	{Array}		nodes			List of node indexes, can be undefined
 * @param	{Number}	force			Load force value, can be undefined
 * @param	{Number}	moment			Load moment value, can be undefined
 * @param	{Number}	mass			Load mass value, can be undefined
 * @param 	{String}	load_direction	Load direction, can be undefined
 * @param	{String}	comment			Comment, can be undefined
 * @param	{Object}	params			Load parameters, can be undefined
 * @return 	{Object}	Created load
*/
function createSimplyValueLoad(load_type,
							   no,
							   load_case,
							   nodes,
							   force,
							   moment,
							   mass,
							   load_direction,
							   comment,
							   params)
{	
	var load = createBaseLoad(load_type, no, load_case, nodes, comment, params);
	
	if (typeof force != "undefined")
	{
		load.load_type = nodal_loads.LOAD_TYPE_FORCE;
		load.force_magnitude = force;
	}
	else if (typeof moment != "undefined")
	{
		load.load_type = nodal_loads.LOAD_TYPE_MOMENT;
		load.moment_magnitude = moment;
	}
	else
	{
		load.load_type = nodal_loads.LOAD_TYPE_MASS;
		load.mass_global = mass;
	}

	if (typeof load_direction == "undefined")
	{
		load.load_direction = nodal_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W;
	}
	else
	{
		load.load_direction = load_direction;
	}

	return load;
}

/**
* Shows assert (private)
* @param {String}	load_type			Load type
* @param {String}	load_distribution	Load distribution, can be undefined
*/
var showLoadAssert = function(load_type, load_distribution)
{
	if (typeof load_distribution != "undefined")
	{
		assert(false, "Unknown load distribution (" + (load_type) + " - " + (load_distribution) + ")");
	}
	else
	{
		assert(false, "Unknown load type (" + (load_type) + ")");
	}
}

/**
* Set load values (private)
* @param 	{Array}	arguments		Arguments: arg[0] - load, arg[1] - load values, arg[2] - load parameters to be set
*/
var setLoadValues = function()
{
	ASSERT(arguments.length >= 3);
	var load = arguments[0];
	var load_values = arguments[1];
	ASSERT(load_values.length + 2 <= arguments.length);
	
	var distance_a_value = 0;
	var distance_b_value = 0;
	var distance_c_value = 0;
	
	for (var i = 0; i < load_values.length; ++i)
	{
		var arg = arguments[i + 2];
		
		// Remember value of distances, if any
		if (arg == "distance_a")
		{
			distance_a_value = load_values[i];
			continue;
		}
		if (arg == "distance_b")
		{
			distance_b_value = load_values[i];
			continue;
		}
		if (arg == "distance_c")
		{
			distance_c_value = load_values[i];
			continue
		}
		
		load[arg] = load_values[i];
	}
	
	// If some distances were specified, set them to load values depending of absolute or relative
	if (distance_a_value != 0)
	{
		load.distance_a_is_defined_as_relative ? load.distance_a_relative = distance_a_value : load.distance_a_absolute = distance_a_value;
	}
	if (distance_b_value != 0)
	{
		load.distance_b_is_defined_as_relative ? load.distance_b_relative = distance_b_value : load.distance_b_absolute = distance_b_value;
	}
	if (distance_c_value != 0)
	{
		load.distance_c_is_defined_as_relative ? load.distance_c_relative = distance_c_value : load.distance_c_absolute = distance_c_value;
	}
}

/**
* Sets axis and orientation for rotary motion load type
* @param 	{Object}	load	Load
* @param	{String}	value	Parallel axis (+X, -X, ...)
* @return	{Boolean}	True if axis and orientation was succesfully set
*/
var setAxisAndOrientation = function(load,
										 value)
{
	if (value.length == 2 && value.match("[+|-][X|Y|Z]") != null)
	{
		load.axis_definition_axis = value.substring(1, 2);
		load.axis_definition_axis_orientation = value.substring(0, 1);
		
		return true;
	}
	
	return false;
}