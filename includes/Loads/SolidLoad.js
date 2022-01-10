include("BaseLoad.js");

/**
* Creates solid load
* @class
* @constructor
* @param 	{Number}	no					Index of solid load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		solids				List of solid indexes
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
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	}
}

/**
 * Creates solid force load
 * @param 	{Number}	no					Index of solid load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solids				List of solid indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid force load
*/
SolidLoad.prototype.Force = function (no,
	load_case,
	solids,
	load_value,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_loads.LOAD_TYPE_FORCE, undefined, [load_value]);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = load_direction;
	}

	return this.load;
};

/**
 * Creates solid temperature load
 * @param 	{Number}	no					Index of solid load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solids				List of solid indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid temperature load
*/
SolidLoad.prototype.Temperature = function (no,
	load_case,
	solids,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);

	return this.load;
};

/**
 * Creates solid strain load
 * @param 	{Number}	no					Index of solid load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solids				List of solid indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid strain load
*/
SolidLoad.prototype.Strain = function (no,
	load_case,
	solids,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_loads.LOAD_TYPE_STRAIN, load_distribution, load_values);

	return this.load;
};

/**
 * Creates solid buoyancy load
 * @param 	{Number}	no					Index of solid load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solids				List of solid indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid buoyancy load
*/
SolidLoad.prototype.Buoyancy = function (no,
	load_case,
	solids,
	load_value,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_loads.LOAD_TYPE_BUOYANCY, undefined, [load_value]);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = load_direction;
	}

	return this.load;
};

/**
 * Creates solid rotary motion load
 * @param 	{Number}	no					Index of solid load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		solids				List of solid indexes
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created solid rotary motion load
*/
SolidLoad.prototype.RotaryMotion = function (no,
	load_case,
	solids,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Solid_Load", no, load_case, solids, comment, params);
	this.load = setSolidLoadDistribution(this.load, solid_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);

	return this.load;
};

/**
* Determine air density at specified altitude
* @param	{Number}	altitude	Altitude value, if undefined, determine air density at specified altitude will be set false
*/
SolidLoad.prototype.AirDensity = function (altitude) {
	ASSERT(this.load.load_type === solid_loads.LOAD_TYPE_BUOYANCY, "Can be set only for buoyancy load type");

	if (typeof altitude === "undefined") {
		this.load.is_density_defined_by_altitude = false;
	}
	else {
		this.load.is_density_defined_by_altitude = true;
		this.load.altitude = altitude;
	}
};