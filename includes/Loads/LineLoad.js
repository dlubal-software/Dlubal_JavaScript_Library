include("BaseLoad.js");

function LineLoad(no,
				  load_case,
				  lines,
				  comment,
				  params)
{
	if (arguments.length != 0)
	{
		this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
		return this.load;
	}
	
	/**
	* Assignes values to load depend of load type and load distribution (private)
	* @param  {String}	load_type			Load type
	* @param  {String}	load_distribution	Load distribution
	* @param  {Array}	load_values			Load values depend on load type and load distribution
	*										- (load type / load distribution: [valid values])
	*										- "Force" / "Uniform": [p]
	*										- "Force" / "Uniform - Total": [P]
	*										- "Force" / "Concentrated - 1": [P, A, is_a_relative]
	*										- "Force" / "Concentrated - n x": [P, n, A, B, is_a_relative, is_b_relative]
	*										- "Force" / "Concentrated - 2 x 2": [P, A, B, C, is_a_relative, is_b_relative, is_c_relative]
	*										- "Force" / "Concentrated - 2 x": [P1, A, P2, B, is_a_relative, is_b_relative]
	*										- "Force" / "Concentrated - Varying": [P1, x1, P2, x2 ... Pn, xn]
	*										- "Force" / "Trapezoidal": [p1, B, p2, A, is_b_relative, is_a_relative]
	*										- "Force" / "Tapered": [p1, p2, A, B, is_a_relative, is_b_relative]
	*										- "Force" / "Parabolic": [p1, p2, p3]
	*										- "Force" / "Varying": [p1, x1, p2, x2 ... pn, xn]
	*										- "Force" / "Varying in Z": [p1, z1, p2, z2 ... pn, zn]
	*										- "Moment" / "Uniform" (load type / load distribution): [m]
	*										- "Moment" / "Concentrated - 1": [M, A, is_a_reative]
	*										- "Moment" / "Concentrated - n x": [M, n, A, B, is_a_relative, is_b_relative]
	*										- "Moment" / "Concentrated - 2 x 2": [M, A, B, C, is_a_relative, is_b_relative, is_c_relative]
	*										- "Moment" / "Concentrated - 2 x": [M1, A, M2, B, is_a_relative, is_b_relative]
	*										- "Moment" / "Concentrated - Varying": [M1, x1, M2, x2 ... Mn, xn]
	*										- "Moment" / "Trapezoidal": [m1, B, m2, A, is_b_relative, is_a_relative]
	*										- "Moment" / "Tapered": [m1, m2, A, B, is_a_relative, is_b_relative]
	*										- "Moment" / "Parabolic": [m1, m2, m3]
	*										- "Moment" / "Varying": [m1, x1, m2, x2 ... mn, xn]
	*										- "Mass" / "Uniform": M
	* @return	{Object}	Returns modified load
	*/
	var setLoadDistribution = function(load,
									   load_type,
									   load_distribution,
									   load_values)
	{
		load.load_type = load_type;
		
		if (typeof load_distribution != "undefined")
		{
			load.load_distribution = load_distribution;
		}
		
		switch (load_type)
		{
			case line_loads.LOAD_TYPE_FORCE:
			case line_loads.LOAD_TYPE_MOMENT:
				switch (load_distribution)
				{
					case line_loads.LOAD_DISTRIBUTION_UNIFORM:
					case line_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL:
						ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (p)");
						setLoadValues(load, load_values, "magnitude");
						break;
					case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_1:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P)");
						setLoadValues(load, load_values, "magnitude", "distance_a", "distance_a_is_defined_as_relative");
						break;
					case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_N:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P)");
						setLoadValues(load, load_values, "magnitude", "count_n", "distance_a", "distance_b, distance_a_is_defined_as_relative, distance_b_is_defined_as_relative");
						break;
					case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_2x2:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P)");
						setLoadValues(load, load_values, "magnitude", "distance_a", "distance_b", "distance_c", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative", "distance_c_is_defined_as_relative");
						break;
					case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_2:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P1)");
						setLoadValues(load, load_values, "magnitude_1", "distance_a", "magnitude_2", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
						break;
					case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_VARYING:
					case line_loads.LOAD_DISTRIBUTION_VARYING:
					case line_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
						ASSERT(load_values.length % 2 == 0, "Wrong number of load values");
						for (var i = 0; i < load_values.length; i+=2)
						{
							load.varying_load_parameters[i / 2 + 1].magnitude = load_values[i];
							load.varying_load_parameters[i / 2 + 1].distance = load_values[i + 1];
						}
						break;
					case line_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
						ASSERT(load_values.length >= 2, "Wrong number of load values, at least two values are required (P1, B)");
						setLoadValues(load, load_values, "magnitude_1", "distance_b", "magnitude_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
						break;
					case line_loads.LOAD_DISTRIBUTION_TAPERED:
						ASSERT(load_values.length >= 2, "Wrong number of load values, at least two values are required (P1, P2)");
						setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
						break;
					case line_loads.LOAD_DISTRIBUTION_PARABOLIC:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P1 or P2 or P3)");
						setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "magnitude_3");
						break;
					default:
						showLoadAssert(load_type, load_distribution);
				}
				break;
			case line_loads.E_TYPE_MASS:
				ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (M)");
				ASSERT(load_distribution == LOAD_DISTRIBUTION_UNIFORM, "Mass load has only uniform distribution");
				setLoadValues(load, load_values, "mass_global");
				break;
			default:
				showLoadAssert(load_type);
		}
		
		return load;
	}
	
	/**
	 * Creates line force load
	 * @param 	{Number}	no					Index of line load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		lines				List of lines
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created line force load
	*/
	this.Force = function(no,
						  load_case,
						  lines,
						  load_distribution,
						  load_values,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
		this.load = setLoadDistribution(this.load, line_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates line moment load
	 * @param 	{Number}	no					Index of line load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		lines				List of lines
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created line force load
	*/
	this.Moment = function(no,
						   load_case,
						   lines,
						   load_distribution,
						   load_values,
						   load_direction,
						   comment,
						   params)
	{
		this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
		this.load = setLoadDistribution(this.load, line_loads.LOAD_TYPE_MOMENT, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates line mass load
	 * @param 	{Number}	no					Index of line load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		lines				List of lines
	 * @param	{Number}	load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created line force load
	*/
	this.Mass = function(no,
						 load_case,
						 lines,
						 load_value,
						 comment,
						 params)
	{
		this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
		this.load = setLoadDistribution(this.load, line_loads.E_TYPE_MASS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	* Sets option for reference to list of lines
	* @param 	{Boolean}	value	When undefined, true as default
	*/
	this.reference_to_list_of_lines = function(value)
	{
		ASSERT(this.load.load_type != line_loads.E_TYPE_MASS, "Reference to list of lines cannot be set for mass load");

		if (typeof value == "undefined")
		{
			value = true;
		}
		this.load.reference_to_list_of_lines = value;
	}
	
	/**
	* Sets option for refer distance to the line end
	* @param 	{Boolean}	value	When undefined, true as default
	*/
	this.refer_distance_line_end = function(value)
	{
		ASSERT(this.load.load_distribution != line_loads.LOAD_DISTRIBUTION_UNIFORM && this.load.load_distribution != line_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL, 
				"Refer distance to the line end cannot be set for this type of load distribution");

		if (typeof value == "undefined")
		{
			value = true;
		}
		this.load.distance_from_line_end = value;
	}
	
	/**
	* Sets option for load over total length of line (only for trapezoidal load distribution)
	* @param	{Boolean}	value	When undefined, true as default
	*/
	this.load_over_line = function(value)
	{
		ASSERT(this.load.load_distribution == line_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL, "Load over total length of line can be set only for trapezoidal load distribution");
		
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