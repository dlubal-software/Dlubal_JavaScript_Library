include("BaseLoad.js");

/**
* Creates surface load
* @param 	{Number}	no					Index of surface load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of surface indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created surface load
*/
function SurfaceLoad(no,
					 load_case,
					 surfaces,
					 comment,
					 params)
{
	if (arguments.length !== 0)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		return this.load;
	}
}

/**
 * Creates surface force load
 * @param 	{Number}	no					Index of surface load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surfaces			List of surface indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface force load
*/
SurfaceLoad.prototype.Force = function(no,
									   load_case,
									   surfaces,
									   load_distribution,
									   load_values,
									   load_direction,
									   comment,
									   params)
{
	this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
	
	if (typeof load_direction !== "undefined")
	{
		this.load.load_direction = load_direction;
	}
	
	return this.load;
};

/**
 * Creates surface temperature load
 * @param 	{Number}	no					Index of surface load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surfaces			List of surface indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface temperature load
*/
SurfaceLoad.prototype.Temperature = function(no,
											 load_case,
											 surfaces,
											 load_distribution,
											 load_values,
											 comment,
											 params)
{
	this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);
	
	return this.load;
};

/**
 * Creates surface axial strain load
 * @param 	{Number}	no					Index of surface load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surfaces			List of surface indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface axial strain load
*/
SurfaceLoad.prototype.AxialStrain = function(no,
											 load_case,
											 surfaces,
											 load_distribution,
											 load_values,
											 comment,
											 params)
{
	this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);
	
	return this.load;
};

/**
 * Creates surface precamber load
 * @param 	{Number}	no					Index of surface load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surfaces			List of surface indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface precamber load
*/
SurfaceLoad.prototype.Precamber = function(no,
										   load_case,
										   surfaces,
										   load_value,
										   comment,
										   params)
{
	this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_loads.LOAD_TYPE_PRECAMBER, undefined, [load_value]);
	
	return this.load;
};

/**
 * Creates surface rotary motion load
 * @param 	{Number}	no					Index of surface load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surfaces			List of surface indexes
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface rotary motion load
*/
SurfaceLoad.prototype.RotaryMotion = function(no,
											  load_case,
											  surfaces,
											  load_values,
											  comment,
											  params)
{
	this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);
	
	return this.load;
};

/**
 * Creates surface mass load
 * @param 	{Number}	no					Index of surface load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surfaces			List of surface indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface mass load
*/
SurfaceLoad.prototype.Mass = function(no,
									  load_case,
									  surfaces,
									  load_value,
									  comment,
									  params)
{
	this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_loads.LOAD_TYPE_MASS, undefined, [load_value]);
	
	return this.load;
};

/**
* Sets individual mass components (only for mass load)
* @param	{Number}	MX		Mass in X coordination, can be undefined
* @param	{Number}	MY		Mass in Y coordination, can be undefined
* @param	{Number}	MZ		Mass in Z coordination, can be undefined
*/
SurfaceLoad.prototype.IndividualMassComponents = function(MX,
														  MY,
														  MZ)
{	
	ASSERT(this.load.load_type === surface_loads.LOAD_TYPE_MASS, "Can be set only for mass load type");

	if (arguments.length === 0)
	{
		this.load.individual_mass_components = false;
		return;
	}
	
	this.load.individual_mass_components = true;
	
	if (typeof MX !== "undefined")
	{
		this.load.magnitude_mass_x = MX;
	}
	
	if (typeof MY !== "undefined")
	{
		this.load.magnitude_mass_y = MY;
	}
	
	if (typeof MZ !== "undefined")
	{
		this.load.magnitude_mass_z = MZ;
	}	
};