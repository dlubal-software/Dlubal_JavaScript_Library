include("BaseLoad.js");

/**
* Creates line set load
* @param 	{Number}	no					Index of line set load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		line_sets			List of line set indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created line set load
*/
function SurfaceSetLoad(no,
                        load_case,
                        surface_sets,
                        comment,
                        params)
{
	if (arguments.length != 0)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, line_sets, comment, params);
	}
	
	/**
	 * Creates surface set force load
	 * @param 	{Number}	no					Index of surface set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		surface_sets		List of surface set indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface set force load
	*/
	this.Force = function(no,
						  load_case,
						  surface_sets,
						  load_distribution,
						  load_values,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
		this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates surface set temperature load
	 * @param 	{Number}	no					Index of surface set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		surface_sets		List of surface set indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface set temperature load
	*/
	this.Temperature = function(no,
								load_case,
								surface_sets,
								load_distribution,
								load_values,
								comment,
								params)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
		this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates surface set axial strain load
	 * @param 	{Number}	no					Index of surface set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		surface_sets		List of surface set indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface set axial strain load
	*/
	this.AxialStrain = function(no,
								load_case,
								surface_sets,
								load_distribution,
								load_values,
								comment,
								params)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
		this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates surface set precamber load
	 * @param 	{Number}	no					Index of surface set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		surface_sets		List of surface set indexes
	 * @param	{Array}		load_value			Uniform load parameter
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface set precamber load
	*/
	this.Precamber = function(no,
							  load_case,
							  surface_sets,
							  load_value,
							  comment,
							  params)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
		this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_PRECAMBER, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates surface set rotary motion load
	 * @param 	{Number}	no					Index of surface set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		surface_sets		List of surface set indexes
	 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface set rotary motion load
	*/
	this.RotaryMotion = function(no,
								 load_case,
								 surface_sets,
								 load_values,
								 comment,
								 params)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
		this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates surface set mass load
	 * @param 	{Number}	no					Index of surface set load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		surface_sets		List of surface set indexes
	 * @param	{Array}		load_value			Uniform load parameter
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface set mass load
	*/
	this.Mass = function(no,
						 load_case,
						 surface_sets,
						 load_value,
						 comment,
						 params)
	{
		this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
		this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_MASS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	* Sets individual mass components (only for mass load)
	* @param	{Number}	MX		Mass in X coordination, can be undefined
	* @param	{Number}	MY		Mass in Y coordination, can be undefined
	* @param	{Number}	MZ		Mass in Z coordination, can be undefined
	*/
	this.individual_mass_components = function(MX,
											   MY,
											   MZ)
	{	
		ASSERT(this.load.load_type == surface_set_loads.LOAD_TYPE_MASS, "Can be set only for mass load type");
	
		if (arguments.length == 0)
		{
			this.load.individual_mass_components = false;
			return;
		}
		
		this.load.individual_mass_components = true;
		
		if (typeof MX != "undefined")
		{
			this.load.magnitude_mass_x = MX;
		}
		
		if (typeof MY != "undefined")
		{
			this.load.magnitude_mass_y = MY;
		}
		
		if (typeof MZ != "undefined")
		{
			this.load.magnitude_mass_z = MZ;
		}	
	}
}
