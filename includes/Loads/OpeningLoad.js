include("BaseLoad.js");

/**
* Creates non valid empty solid load
* @param 	{Number}	no					Index of opening load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		openings			List of opening indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created opening load
*/
function OpeningLoad(no,
                     load_case,
                     openings,
                     comment,
                     params)
{
    if (arguments.length != 0)
	{
		this.load = createBaseLoad("Opening_Load", no, load_case, openings, comment, params);
	}
	
	/**
	* Assignes values to load depend of load type and load distribution (private)
	* @param  {String}	load_type			Load type
	* @param  {String}	load_distribution	Load distribution, can be undefined
	* @param  {Array}	load_values			Load values depend on load type and load distribution
	*										- (load type / load distribution: [valid values])
	*										- "Force" / "Uniform/Trapezoidal": [p]
	*										- "Force" / "Linear/Trapezoidal": [Node1, Node2, Node3, p1, p2, p3]
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
			case opening_loads.LOAD_TYPE_FORCE:
				switch (load_distribution)
				{
					case opening_loads.LOAD_DISTRIBUTION_UNIFORM_TRAPEZOIDAL:
						ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (p)");
						setLoadValues(load, load_values, "uniform_magnitude");
						break;
					case opening_loads.LOAD_DISTRIBUTION_LINEAR_TRAPEZOIDAL:
						break;
					default:
						showLoadAssert(load_type, load_distribution);
				}
				break;
			default:
				showLoadAssert(load_type);
		}
	}
	
	/**
	 * Creates opening force load
	 * @param 	{Number}	no					Index of opening load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		openings			List of openings indexes
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created opening force load
	*/
	this.Force = function(no,
						  load_case,
						  openings,
						  load_value,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Opening_Load", no, load_case, openings, comment, params);
		this.load = setLoadDistribution(this.load, solid_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
}
