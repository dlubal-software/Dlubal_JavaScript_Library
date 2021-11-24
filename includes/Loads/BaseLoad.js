/**
 * Creates load based on its type
 * @param	{Number}	load_type	Load type
 * @param	{Number}	no			Index of nodal load
 * @param	{Object}	load_case	Load case
 * @param	{Array}		index_list	List of assigned objects (indexes), can be empty
 * @param	{String}	comment		Comment, can be empty
 * @param	{Object}	params		Load parameters, can be empty
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
	
	if (load_type == "Nodal_Load")
	{
		handled_params["nodes"] = typeof index_list != "undefined" ? index_list : [];
	}
	else if (load_type == "Member_Load")
	{
		handled_params["members"] = typeof index_list != "undefined" ? index_list : [];
	}
	else
	{
		ASSERT(false, "Unknown load type");
	}
	
	set_comment_and_parameters(load, comment, handled_params);
	
	return load;
}

/**
 * Creates load with one only value (force, mass and so on)
 * @param	{Number}	load_type		Load type
 * @param	{Number}	no				Index of nodal load
 * @param	{Object}	load_case		Load case
 * @param	{Array}		nodes			List of nodes, can be empty
 * @param	{Number}	force			Load force value, can be empty
 * @param	{Number}	moment			Load moment value, van be empty
 * @param	{Number}	mass			Load mass value, can be empty
 * @param 	{String}	load_direction	Load direction.
 * @param	{String}	comment			Comment, can be empty
 * @param	{Object}	params			Load parameters, , can be empty
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