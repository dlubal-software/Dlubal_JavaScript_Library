include("BaseLoad.js");

/**
* Creates solid load
* @param 	{Number}	no					Index of solid load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of solid indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created solid load
*/
function SolidLoad(no,
				   load_case,
				   solids,
				   comment,
				   params)
{
	if (arguments.length != 0)
	{
		this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	}
	
	/**
	* Assignes values to load depend of load type and load distribution (private)
	* @param  {String}	load_type			Load type
	* @param  {String}	load_distribution	Load distribution, can be undefined
	* @param  {Array}	load_values			Load values depend on load type and load distribution
	*										- (load type / load distribution: [valid values])
	*										- "Force" / "Uniform": [p]
	*										- "Temperature" / "Uniform": [T]
	*										- "Temperature" / "Linear in X": [Node1, Node2, T1, T2]
	*										- "Temperature" / "Linear in Y": [Node1, Node2, T1, T2]
	*										- "Temperature" / "Linear in Z": [Node1, Node2, T1, T2]
	*										- "Strain" / "Uniform": [εx, εy, εz]
	*										- "Strain" / "Linear in X": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
	*										- "Strain" / "Linear in Y": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
	*										- "Strain" / "Linear in Z": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
	*										- "Buoyancy" / "Uniform": [p]
	*										- "Rotary Motion": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
	*														   [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")
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
			case solid_loads.LOAD_TYPE_FORCE:
				ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (p)");
				setLoadValues(load, load_values, "uniform_magnitude");
				break;
			case solid_loads.LOAD_TYPE_TEMPERATURE:
				switch (load_distribution)
				{
					case solid_loads.LOAD_DISTRIBUTION_UNIFORM:
						ASSERT(load_values.length == 1, "Wrong number of load values, one is required (p)");
						setLoadValues(load, load_values, "uniform_magnitude");
						break;
					case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
					case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
					case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
						ASSERT(load_values.length >= 3, "Wrong number of load values, at least three values are required (Node1, Node2, T1)");
						setLoadValues(load, load_values, "node_1", "node_2", "magnitude_1", "magnitude_2");
						break;
					default:
						showLoadAssert(load_type, load_distribution);
				}
				break;
			case solid_loads.LOAD_TYPE_STRAIN:
				switch (load_distribution)
				{
					case solid_loads.LOAD_DISTRIBUTION_UNIFORM:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (εx)");
						setLoadValues(load, load_values, "strain_uniform_magnitude_x", "strain_uniform_magnitude_y", "strain_uniform_magnitude_z");
						break;
					case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
					case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
					case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least three values are required (Node1, Node2, ε1x)");
						setLoadValues(load, load_values, "node_1", "node_2", "strain_magnitude_x1", "strain_magnitude_y1", "strain_magnitude_z1", "strain_magnitude_x2", "strain_magnitude_y2", "strain_magnitude_z2");
						break;
					default:
						showLoadAssert(load_type, load_distribution);
				}
				break;
			case solid_loads.LOAD_TYPE_BUOYANCY:
				ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (p)");
				setLoadValues(load, load_values, "uniform_magnitude");
				break;
			case solid_loads.LOAD_TYPE_ROTARY_MOTION:
				setRotaryMotionLoad(load, load_values);
				break;
			default:
				showLoadAssert(load_type);
		}
		
		return load;
	}
	
	/**
	 * Creates solid force load
	 * @param 	{Number}	no					Index of solid load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		solids				List of solid indexes
	 * @param	{Array}		load_value			Uniform load value
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created solid force load
	*/
	this.Force = function(no,
						  load_case,
						  solids,
						  load_value,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
		this.load = setLoadDistribution(this.load, solid_loads.LOAD_TYPE_FORCE, undefined, [load_value]);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates solid temperature load
	 * @param 	{Number}	no					Index of solid load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		solids				List of solid indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created solid temperature load
	*/
	this.Temperature = function(no,
								load_case,
								solids,
								load_distribution,
								load_values,
								comment,
								params)
	{
		this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
		this.load = setLoadDistribution(this.load, solid_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates solid strain load
	 * @param 	{Number}	no					Index of solid load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		solids				List of solid indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created solid strain load
	*/
	this.Strain = function(no,
						   load_case,
						   solids,
						   load_distribution,
						   load_values,
						   comment,
						   params)
	{
		this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
		this.load = setLoadDistribution(this.load, solid_loads.LOAD_TYPE_STRAIN, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates solid buoyancy load
	 * @param 	{Number}	no					Index of solid load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		solids				List of solid indexes
	 * @param	{Array}		load_value			Uniform load value
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created solid buoyancy load
	*/
	this.Buoyancy = function(no,
							 load_case,
						     solids,
						     load_value,
						     load_direction,
						     comment,
						     params)
	{
		this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
		this.load = setLoadDistribution(this.load, solid_loads.LOAD_TYPE_BUOYANCY, undefined, [load_value]);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates solid rotary motion load
	 * @param 	{Number}	no					Index of solid load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		solids				List of solid indexes
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created solid rotary motion load
	*/
	this.RotaryMotion = function(no,
								 load_case,
								 solids,
								 load_values,
								 comment,
								 params)
	{
		this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
		this.load = setLoadDistribution(this.load, solid_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);
		
		return this.load;
	}
	
	/**
	* Determine air density at specified altitude
	* @param	{Number}	altitude	Altitude value, if undefined, determine air density at specified altitude will be set false
	*/
	this.air_density = function(altitude)
	{
		ASSERT(this.load.load_type == solid_loads.LOAD_TYPE_BUOYANCY, "Can be set only for buoyancy load type");
		
		if (typeof altitude == "undefined")
		{
			this.load.is_density_defined_by_altitude = false;
		}
		else
		{
			this.load.is_density_defined_by_altitude = true;
			this.load.altitude = altitude;
		}
	}
}