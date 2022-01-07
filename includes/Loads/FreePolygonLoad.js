include("BaseLoad.js");

/**
* Creates free polygon load
* @param 	{Number}	no					Index of free polygon load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of surface indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created free polygon load
*/
function FreePolygonLoad(no,
                         load_case,
						 surfaces,
						 comment,
						 params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Free_Polygon_Load", no, load_case, surfaces, comment, params);
	}
}

/**
* Set parameters to free polygon load depend on load distribution
* @param	{Object}	load				Load
* @param	{String}	load_distribution	Load distribution
* @param	{Array}		load_values			Load parameters depend of load distribution
*												- "Uniform": [p, X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn]
*												- "Linear": [p1, node1, node2, node3, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2, p3]
*												- "Linear in X": [p1, node1, node2, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2]
*												- "Linear in Y": [p1, node1, node2, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2]
* @return	{Object}	Returns modified load
*/
function setFreePolygonLoadParameters(load,
	load_distribution,
	load_values) {
	load.load_distribution = load_distribution;

	switch (load_distribution) {
		case free_polygon_loads.LOAD_DISTRIBUTION_UNIFORM:
			ASSERT(load_values.length >= 7, "Wrong number of load parameters, at least seven are required (p, X1, Y1, X2, Y2, X3, Y3)");
			ASSERT((load_values.length - 1) % 2 === 0, "Defined polygon points must be in pairs (X, Y)");
			load.magnitude_uniform = load_values[0];
			for (var i = 1; i < load_values.length; i += 2) {
				load.load_location[(i - 1) / 2 + 1].first_coordinate = load_values[i];
				load.load_location[(i - 1) / 2 + 1].second_coordinate = load_values[i + 1];
			}
			break;
		case free_polygon_loads.LOAD_DISTRIBUTION_LINEAR:
		case free_polygon_loads.LOAD_DISTRIBUTION_LINEAR_FIRST:
		case free_polygon_loads.LOAD_DISTRIBUTION_LINEAR_SECOND:
			if (load_distribution === free_polygon_loads.LOAD_DISTRIBUTION_LINEAR) {
				ASSERT(load_values.length >= 5, "Wrong number of load parameters, at least five are required (p1, node1, node2, node3, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn]");
				ASSERT(Array.isArray(load_values[4]), "setFreePolygonLoadParameters, parameter is not array");
				ASSERT(load_values[1] === 1 || load_values[1] === 2 || load_values[1] === 3, "Point has to be 1, 2 or 3");
				ASSERT(load_values[2] === 1 || load_values[2] === 2 || load_values[2] === 3, "Point has to be 1, 2 or 3");
				ASSERT(load_values[3] === 1 || load_values[3] === 2 || load_values[3] === 3, "Point has to be 1, 2 or 3");

				var load_location = load_values[4];
				ASSERT(load_location.length % 2 === 0, "Defined polygon points must be in pairs format (X, Y)");
				for (var i = 0; i < load_location.length; i += 2) {
					load.load_location[i / 2 + 1].first_coordinate = load_location[i];
					load.load_location[i / 2 + 1].second_coordinate = load_location[i + 1];
				}

				load.magnitude_linear_1 = load_values[0];
				load.magnitude_linear_location_1 = load_values[1];
				load.magnitude_linear_location_2 = load_values[2];
				load.magnitude_linear_location_3 = load_values[3];

				if (load_values >= 6) {
					load.magnitude_linear_2 = load_values[5];
				}
				if (load_values >= 7) {
					load.load_magnitude_3 = load_values[6];
				}
			}
			else {
				ASSERT(load_values.length >= 4, "Wrong number of load parameters, at least five are required (p1, node1, node2, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn]");

				ASSERT(Array.isArray(load_values[3]), "setFreePolygonLoadParameters, parameter is not array");
				var load_location = load_values[3];
				ASSERT(load_location.length % 2 === 0, "Defined polygon points must be in pairs format (X, Y)");
				for (var i = 0; i < load_location.length; i += 2) {
					load.load_location[i / 2 + 1].first_coordinate = load_location[i];
					load.load_location[i / 2 + 1].second_coordinate = load_location[i + 1];
				}

				load.magnitude_linear_1 = load_values[0];
				load.magnitude_linear_location_1 = load_values[1];
				load.magnitude_linear_location_2 = load_values[2];

				if (load_values.length >= 5) {
					load.magnitude_linear_2 = load_values[4];
				}
			}
			break;
		default:
			showAssert(undefined, load_distribution);
	}

	return load;
}

/**
* Creates free polygon uniform load
* @param 	{Number}	no						Index of free polygon uniform load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free polygon uniform load
*/
FreePolygonLoad.prototype.Uniform = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Polygon_Load", no, load_case, surfaces, comment, params);
	this.load = setFreePolygonLoadParameters(this.load, free_polygon_loads.LOAD_DISTRIBUTION_UNIFORM, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free polygon linear load
* @param 	{Number}	no						Index of free polygon linear load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free polygon linear load
*/
FreePolygonLoad.prototype.Linear = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Polygon_Load", no, load_case, surfaces, comment, params);
	this.load = setFreePolygonLoadParameters(this.load, free_polygon_loads.LOAD_DISTRIBUTION_LINEAR, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free polygon linear in X load
* @param 	{Number}	no						Index of free polygon linear in X load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free polygon linear in X load
*/
FreePolygonLoad.prototype.LinearX = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Polygon_Load", no, load_case, surfaces, comment, params);
	this.load = setFreePolygonLoadParameters(this.load, free_polygon_loads.LOAD_DISTRIBUTION_LINEAR_FIRST, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free polygon linear in Y load
* @param 	{Number}	no						Index of free polygon linear in Y load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free polygon linear in Y load
*/
FreePolygonLoad.prototype.LinearY = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Polygon_Load", no, load_case, surfaces, comment, params);
	this.load = setFreePolygonLoadParameters(this.load, free_polygon_loads.LOAD_DISTRIBUTION_LINEAR_SECOND, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};