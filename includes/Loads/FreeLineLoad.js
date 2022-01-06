include("BaseLoad.js");

/**
* Creates free line load
* @param 	{Number}	no					Index of free line load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of surface indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created free line load
*/
function FreeLineLoad(no,
	load_case,
	surfaces,
	comment,
	params) {
	if (arguments.length !== 0) {
		this.load = createBaseLoad("Free_Line_Load", no, load_case, surfaces, comment, params);
		return this.load;
	}

	/**
	* Set parameters to free line load depend on load distribution
	* @param	{Object}	load				Load
	* @param	{String}	load_distribution	Load distribution
	* @param	{Array}		load_values			Load parameters depend of load distribution
	*												- "Force": [p, X1, Y1, X2, Y2]
	*												- "Linear": [p1, p2, X1, Y1, X2, Y2]
	* @return	{Object}	Returns modified load
	*/
	function setFreeLineLoadParameters(load,
		load_distribution,
		load_values) {
		load.load_distribution = load_distribution;

		switch (load_distribution) {
			case free_line_loads.LOAD_DISTRIBUTION_UNIFORM:
				ASSERT(load_values.length >= 3, "Wrong number of load parameters, at least three are required (p, X1, Y1)");
				setLoadValues(load, load_values, "magnitude_uniform", "load_location_first_x", "load_location_first_y", "load_location_second_x", "load_location_second_y");
				break;
			case free_line_loads.LOAD_DISTRIBUTION_LINEAR:
				ASSERT(load_values.length >= 3, "Wrong number of load parameters, at least three are required (p, X1, Y1)");
				setLoadValues(load, load_values, "magnitude_first", "magnitude_second", "load_location_first_x", "load_location_first_y", "load_location_second_x", "load_location_second_y");
				break;
			default:
				showLoadAssert(undefined, load_distribution);
		}

		return load;
	}

	/**
	* Creates free line uniform load
	* @param 	{Number}	no						Index of free line uniform load, can be undefined
	* @param 	{Object}	load_case				Load case
	* @param 	{Array}		surfaces				List of surface indexes
	* @param	{Array}		load_values				Load parameters
	* @param	{String}	load_projection			Load projection, can be undefined
	* @param	{String}	load_direction			Load direction, can be undefined
	* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
	* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
	* @param	{String}	comment					Comment, can be undefined
	* @param	{Object}	params					Load parameters, can be undefined
	* @return	{Object}	Created free line uniform load
	*/
	FreeLineLoad.prototype.Uniform = function (no,
		load_case,
		surfaces,
		load_values,
		load_projection,
		load_direction,
		load_acting_region_from,
		load_acting_region_to,
		comment,
		params) {
		this.load = createBaseLoad("Free_Line_Load", no, load_case, surfaces, comment, params);
		this.load = setFreeLineLoadParameters(this.load, free_line_loads.LOAD_DISTRIBUTION_UNIFORM, load_values);
		this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

		return this.load;
	};

	/**
	* Creates free line linear load
	* @param 	{Number}	no						Index of free line linear load, can be undefined
	* @param 	{Object}	load_case				Load case
	* @param 	{Array}		surfaces				List of surface indexes
	* @param	{Array}		load_values				Load parameters
	* @param	{String}	load_projection			Load projection, can be undefined
	* @param	{String}	load_direction			Load direction, can be undefined
	* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
	* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
	* @param	{String}	comment					Comment, can be undefined
	* @param	{Object}	params					Load parameters, can be undefined
	* @return	{Object}	Created free line linear load
	*/
	FreeLineLoad.prototype.Linear = function (no,
		load_case,
		surfaces,
		load_values,
		load_projection,
		load_direction,
		load_acting_region_from,
		load_acting_region_to,
		comment,
		params) {
		this.load = createBaseLoad("Free_Line_Load", no, load_case, surfaces, comment, params);
		this.load = setFreeLineLoadParameters(this.load, free_line_loads.LOAD_DISTRIBUTION_LINEAR, load_values);
		this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

		return this.load;
	};