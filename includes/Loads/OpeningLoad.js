include("BaseLoad.js");

/**
* Creates solid load
* @class
* @constructor
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
    if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Opening_Load", no, load_case, openings, comment, params);
	}
}

/**
* Assignes values to load depend of load type and load distribution (private)
* @param  {String}	load_type			Load type
* @param  {String}	load_distribution	Load distribution, can be undefined
* @param  {Array}	load_values			Load parameters depend on load type and load distribution
*										- (load type / load distribution: [valid values])
*										- "Force" / "Uniform/Trapezoidal": [p]
*										- "Force" / "Linear/Trapezoidal": [Node1, Node2, Node3, p1, p2, p3]
* @return	{Object}	Returns modified load
*/
var setLoadDistribution = function (load,
	load_type,
	load_distribution,
	load_values) {
	// In case of more load types remove this condition
	if (load_type !== opening_loads.LOAD_TYPE_FORCE) {
		load.load_type = load_type;
	}

	const load_distribution_dict = {
		"UNIFORM_TRAPEZOIDAL": opening_loads.LOAD_DISTRIBUTION_UNIFORM_TRAPEZOIDAL,
		"LINEAR_TRAPEZOIDAL": opening_loads.LOAD_DISTRIBUTION_LINEAR_TRAPEZOIDAL
	};

	if (typeof load_distribution !== "undefined") {
		var type = load_distribution_dict[load_distribution];
		if (type === undefined) {
			console.log("Wrong load distribution type. Value was: " + load_distribution);
			console.log("Correct values are: ( " + Object.keys(load_distribution_dict) + ")");
		}
		load.load_distribution = type;
	}

	switch (load_type) {
		case opening_loads.LOAD_TYPE_FORCE:
			switch (load_distribution) {
				case "UNIFORM_TRAPEZOIDAL":
					ASSERT(load_values.length === 1, "Wrong number of load values, one value is required (p)");
					setLoadValues(load, load_values, "magnitude");
					break;
				case "LINEAR_TRAPEZOIDAL":
					ASSERT(load_values.length >= 4, "Wrong number of load values, at least four values are required (p)");
					setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_1", "magnitude_2", "magnitude_3");
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		default:
			showLoadAssert(load_type);
	}

	return load;
};

/**
 * Creates opening force load
 * @param 	{Number}	no					Index of opening load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		openings			List of openings indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created opening force load
*/
OpeningLoad.prototype.Force = function (no,
	load_case,
	openings,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Opening_Load", no, load_case, openings, comment, params);
	this.load = setLoadDistribution(this.load, opening_loads.LOAD_TYPE_FORCE, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetOpeningLoadDirectionType(load_direction);
	}

	return this.load;
};

/**
* Set smooth concentrated load
* @param	{Boolean}	value, can be undefined (false)
*/
OpeningLoad.prototype.SmoothConcentratedLoad = function (value) {
	if (typeof value === "undefined") {
		value = false;
	}

	this.load.smooth_punctual_load_enabled = value;
};

function GetOpeningLoadDirectionType(direction_type) {
	direction_types_dict = {
		"GLOBAL_X_OR_USER_DEFINED_U_TRUE": opening_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
		"GLOBAL_Y_OR_USER_DEFINED_V_TRUE": opening_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
		"GLOBAL_Z_OR_USER_DEFINED_W_TRUE": opening_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE,
		"GLOBAL_X_OR_USER_DEFINED_U_PROJECTED": opening_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_PROJECTED,
		"GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED": opening_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED,
		"GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED": opening_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED
	}

	var type = direction_types_dict[direction_type];
	if (type === undefined) {
	  console.log("Wrong direction type. Value was: " + direction_type);
	  console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
	  type = opening_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE;
	}
	return type;
}
