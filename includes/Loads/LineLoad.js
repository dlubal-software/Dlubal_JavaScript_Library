include("BaseLoad.js");

/**
* Creates line load
* @class LineLoad
* @constructor 
* @param 	{Number}	no					Index of line load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		lines				List of line indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created line load
*/
function LineLoad(no,
				  load_case,
				  lines,
				  comment,
				  params)
{
	if (arguments.length !== 0)
	{
		this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
	}
};

/**
 * Creates line force load
 * @param 	{Number}	no					Index of line load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		lines				List of lines
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLineLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created line force load
*/
LineLoad.prototype.Force = function(no,
									load_case,
									lines,
									load_distribution,
									load_values,
									load_direction,
									comment,
									params)
{
	this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
	this.load = setLineLoadDistribution(this.load, line_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
	
	if (typeof load_direction !== "undefined")
	{
		this.load.load_direction = load_direction;
	}
	
	return this.load;
};

/**
 * Creates line moment load
 * @param 	{Number}	no					Index of line load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		lines				List of lines
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLineLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created line moment load
*/
LineLoad.prototype.Moment = function(no,
									 load_case,
									 lines,
									 load_distribution,
									 load_values,
									 load_direction,
									 comment,
									 params)
{
	this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
	this.load = setLineLoadDistribution(this.load, line_loads.LOAD_TYPE_MOMENT, load_distribution, load_values);
	
	if (typeof load_direction !== "undefined")
	{
		this.load.load_direction = load_direction;
	}
	
	return this.load;
};

/**
 * Creates line mass load
 * @param 	{Number}	no					Index of line load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		lines				List of lines
 * @param	{Number}	load_value			Uniform load value
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created line mass load
*/
LineLoad.prototype.Mass = function(no,
								   load_case,
								   lines,
								   load_value,
								   comment,
								   params)
{
	this.load = createBaseLoad("Line_Load", no, load_case, lines, comment, params);
	this.load = setLineLoadDistribution(this.load, line_loads.E_TYPE_MASS, undefined, [load_value]);
	
	return this.load;
};

/**
* Sets option for reference to list of lines
* @param 	{Boolean}	value	When undefined, true as default
*/
LineLoad.prototype.ReferenceToListOfLines = function(value)
{
	ASSERT(this.load.load_type !== line_loads.E_TYPE_MASS, "Reference to list of lines cannot be set for mass load");

	if (typeof value === "undefined")
	{
		value = true;
	}
	this.load.reference_to_list_of_lines = value;
};

/**
* Sets option for refer distance to the line end
* @param 	{Boolean}	value	When undefined, true as default
*/
LineLoad.prototype.ReferDistanceLineEnd = function(value)
{
	ASSERT(this.load.load_distribution !== line_loads.LOAD_DISTRIBUTION_UNIFORM && this.load.load_distribution !== line_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL, 
			"Refer distance to the line end cannot be set for this type of load distribution");

	if (typeof value === "undefined")
	{
		value = true;
	}
	this.load.distance_from_line_end = value;
};

/**
* Sets option for load over total length of line (only for trapezoidal load distribution)
* @param	{Boolean}	value	When undefined, true as default
*/
LineLoad.prototype.LoadOverLine = function(value)
{
	ASSERT(this.load.load_distribution === line_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL, "Load over total length of line can be set only for trapezoidal load distribution");
	
	if (typeof value === "undefined")
	{
		value = true;
	}
	
	this.load.distance_a_is_defined_as_relative = value;
	this.load.distance_b_is_defined_as_relative = value;
	this.load.distance_a_relative = 0;
	this.load.distance_b_relative = 1;
	this.load.load_is_over_total_length = value;
};

/**
* Sets individual mass components (only for mass load)
* @param	{Number}	MX		Mass in X coordination, can be undefined
* @param	{Number}	MY		Mass in Y coordination, can be undefined
* @param	{Number}	MZ		Mass in Z coordination, can be undefined
*/
LineLoad.prototype.IndividualMassComponents = function(MX,
													   MY,
													   MZ)
{
	ASSERT(this.load.load_type === nodal_loads.LOAD_TYPE_MASS, "Can be set only for mass load type");
	
	if (arguments.length === 0)
	{
		this.load.individual_mass_components = false;
		return;
	}
	
	this.load.individual_mass_components = true;
	
	if (typeof MX !== "undefined")
	{
		this.load.mass_x = MX;
	}
	
	if (typeof MY !== "undefined")
	{
		this.load.mass_y = MY;
	}
	
	if (typeof MZ !== "undefined")
	{
		this.load.mass_z = MZ;
	}
};