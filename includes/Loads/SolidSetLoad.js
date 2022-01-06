include("BaseLoad.js");

/**
* Creates solid set load
* @param 	{Number}	no					Index of solid set load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		solid_sets			List of solid set indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created solid set load
*/
function SolidSetLoad(no,
	load_case,
	solid_sets,
	comment,
	params) {
	if (arguments.length !== 0) {
		this.load = createBaseLoad("Solid_Set_Load", no, load_case, solid_sets, comment, params);
		return this.load;
	}
}

/**
 * Creates solid set force load
 * @param 	{Number}	no					Index of solid set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solid_sets			List of solid set indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid set force load
*/
SolidSetLoad.prototype.Force = function (no,
	load_case,
	solid_sets,
	load_value,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Set_Load", no, load_case, solid_sets, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_set_loads.LOAD_TYPE_FORCE, undefined, [load_value]);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = load_direction;
	}

	return this.load;
};

/**
 * Creates solid set temperature load
 * @param 	{Number}	no					Index of solid set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solid_sets			List of solid set indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid set temperature load
*/
SolidSetLoad.prototype.Temperature = function (no,
	load_case,
	solid_sets,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Set_Load", no, load_case, solid_sets, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_set_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);

	return this.load;
};

/**
 * Creates solid set strain load
 * @param 	{Number}	no					Index of solid set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solid_sets			List of solid set indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid set strain load
*/
SolidSetLoad.prototype.Strain = function (no,
	load_case,
	solid_sets,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Set_Load", no, load_case, solid_sets, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_set_loads.LOAD_TYPE_STRAIN, load_distribution, load_values);

	return this.load;
};

/**
 * Creates solid set buoyancy load
 * @param 	{Number}	no					Index of solid set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solid_sets			List of solid set indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid set buoyancy load
*/
SolidSetLoad.prototype.Buoyancy = function (no,
	load_case,
	solid_sets,
	load_value,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Set_Load", no, load_case, solid_sets, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_set_loads.LOAD_TYPE_BUOYANCY, undefined, [load_value]);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = load_direction;
	}

	return this.load;
};

/**
 * Creates solid set rotary motion load
 * @param 	{Number}	no					Index of solid set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solid_sets			List of solid set indexes
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid set rotary motion load
*/
SolidSetLoad.prototype.RotaryMotion = function (no,
	load_case,
	solid_sets,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Set_Load", no, load_case, solid_sets, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_set_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);

	return this.load;
};

/**
* Determine air density at specified altitude
* @param	{Number}	altitude	Altitude value, if undefined, determine air density at specified altitude will be set false
*/
SolidSetLoad.prototype.AirDensity = function (altitude) {
	ASSERT(this.load.load_type === solid_loads.LOAD_TYPE_BUOYANCY, "Can be set only for buoyancy load type");

	if (typeof altitude === "undefined") {
		this.load.is_density_defined_by_altitude = false;
	}
	else {
		this.load.is_density_defined_by_altitude = true;
		this.load.altitude = altitude;
	}
};
