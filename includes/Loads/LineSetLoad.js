include("BaseLoad.js");

/**
* Creates line set load
* @param 	{Number}	no					Index of line set load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		line_sets			List of line sets indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created line set load
*/
function LineSetLoad(no,
                     load_case,
                     line_sets,
                     comment,
                     params)
{
    if (arguments.length != 0)
	{
		this.load = createBaseLoad("Line_Set_Load", no, load_case, line_sets, comment, params);
	}
	
	/**
	 * Creates line set force load
	 * @param 	{Number}	no					Index of line set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		line_sets			List of line sets
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setLineLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created line set force load
	*/
	this.Force = function(no,
						  load_case,
						  line_sets,
						  load_distribution,
						  load_values,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Line_Set_Load", no, load_case, line_sets, comment, params);
		this.load = setLineLoadDistribution(this.load, line_set_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates line set moment load
	 * @param 	{Number}	no					Index of line set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		line_sets			List of line sets
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setLineLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created line set moment load
	*/
	this.Moment = function(no,
						   load_case,
						   line_sets,
						   load_distribution,
						   load_values,
						   load_direction,
						   comment,
						   params)
	{
		this.load = createBaseLoad("Line_Set_Load", no, load_case, line_sets, comment, params);
		this.load = setLineLoadDistribution(this.load, line_set_loads.LOAD_TYPE_MOMENT, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates line set mass load
	 * @param 	{Number}	no					Index of line set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		line_sets			List of line sets
	 * @param	{Number}	load_value			Uniform parameter value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created line set mass load
	*/
	this.Mass = function(no,
						 load_case,
						 line_sets,
						 load_value,
						 comment,
						 params)
	{
		this.load = createBaseLoad("Line_Set_Load", no, load_case, line_sets, comment, params);
		this.load = setLineLoadDistribution(this.load, line_set_loads.E_TYPE_MASS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	* Sets option for refer distance to the end of line set
	* @param 	{Boolean}	value	When undefined, true as default
	*/
	this.refer_distance_line_set_end = function(value)
	{
		ASSERT(this.load.load_distribution != line_set_loads.LOAD_DISTRIBUTION_UNIFORM && this.load.load_distribution != line_set_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL, 
				"Refer distance to the line end cannot be set for this type of load distribution");

		if (typeof value == "undefined")
		{
			value = true;
		}
		this.load.reference_to_list_of_line_sets = value;
	}
	
	/**
	* Sets option for load over total length of line set (only for trapezoidal load distribution)
	* @param	{Boolean}	value	When undefined, true as default
	*/
	this.load_over_line_set = function(value)
	{
		ASSERT(this.load.load_distribution == line_set_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL, "Load over total length of line can be set only for trapezoidal load distribution");
		
		if (typeof value == "undefined")
		{
			value = true;
		}
		
		this.load.distance_a_is_defined_as_relative = value;
		this.load.distance_b_is_defined_as_relative = value;
		this.load.distance_a_relative = 0;
		this.load.distance_b_relative = 1;
		this.load.load_is_over_total_length = value;
	}
	
	/**
	* Sets individual mass components (only for mass load)
	* @param	{Number}	MX		Mass in X coordination, can be undefined
	* @param	{Number}	MY		Mass in Y coordination, can be undefined
	* @param	{Number}	MZ		Mass in Z coordination, can be undefined
	*/
	this.individual_mass_componnets = function(MX, MY, MZ)
	{
		ASSERT(this.load.load_type == nodal_loads.LOAD_TYPE_MASS, "Can be set only for mass load type");
		
		if (arguments.length == 0)
		{
			this.load.individual_mass_components = false;
			return;
		}
		
		this.load.individual_mass_components = true;
		
		if (typeof MX != "undefined")
		{
			this.load.mass_x = MX;
		}
		
		if (typeof MY != "undefined")
		{
			this.load.mass_y = MY;
		}
		
		if (typeof MZ != "undefined")
		{
			this.load.mass_z = MZ;
		}
	}
}
