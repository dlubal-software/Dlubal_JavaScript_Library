include("BaseLoad.js");

/*
* Problem:
*	VaryingZAndPerimeter - when set Varying along parameter, it says "Modification of property "recalculated_magnitude" is not allowed."
*	But it works with VaryingPerimeter load.
*/

/**
* Creates free rectangular load
* @param 	{Number}	no					Index of free rectangular load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		surfaces			List of surface indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created free rectangular load
*/
function FreeRectangularLoad(no,
                             load_case,
                             surfaces,
                             comment,
                             params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	}
}

/**
* Set parameters to free rectangular load depend on load distribution
* @param	{Object}	load				Load
* @param	{String}	load_distribution	Load distribution
* @param	{Array}		load_values			Load parameters depend of load distribution
*												- "Uniform": [location, p, X1, Y1, X2, Y2, α] for location (1) "Corner points of rectangle"
*												- 			 [location, p, Xc, Yc, a, b, α] for location (2) "Center and sides of rectangle"
*												- "Linear in X": [location, p1, p2, X1, Y1, X2, Y2, α] for location (1) "Corner points of rectangle"
*																 [location, p1, p2, Xc, Yc, a, b, α] for location (2) "Center and sides of rectangle"
*												- "Linear in Y": [location, p1, p2, X1, Y1, X2, Y2, α] for location (1) "Corner points of rectangle"
*																 [location, p1, p2, Xc, Yc, a, b, α] for location (2) "Center and sides of rectangle"
*												- "Varying in Z": [location, p, X1, Y1, X2, Y2, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn]] for location (1) "Corner points of rectangle"
*																  [location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn]] for location (2) "Center and sides of rectangle"
*												- "Varying along Perimeter": [location, p, X1, Y1, X2, Y2, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)]] for location (1) "Corner points of rectangle"
*																  			[location, p, Xc, Yc, a, b, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)]] for location (2) "Center and sides of rectangle"
*												- "Varying in Z and Perimeter": [location, p, X1, Y1, X2, Y2, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn], [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)] for location (1) "Corner points of rectangle"
*																  			   [location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn], [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)] for location (2) "Center and sides of rectangle"
* @return	{Object}	Returns modified load
*/
function setFreeRectangularLoadParameters(load,
	load_distribution,
	load_values) {
	load.load_distribution = load_distribution;

	ASSERT(load_values.length > 1);
	ASSERT(load_values[0] == "1" || load_values[0] == "2");

	if (load_values[0] == "1")	// Corner points of rectangle
	{
		load.load_location_rectangle = free_rectangular_loads.LOAD_LOCATION_RECTANGLE_CORNER_POINTS;
	}
	else	// Center and sides of rectangle
	{
		load.load_location_rectangle = free_rectangular_loads.LOAD_LOCATION_RECTANGLE_CENTER_AND_SIDES;
	}

	var rectangle = load_values[0];
	load_values.shift();	// Remove first element (load location)

	switch (load_distribution) {
		case free_rectangular_loads.LOAD_DISTRIBUTION_UNIFORM:
			if (rectangle == 1)	// Corner points of rectangle
			{
				// load_values has one less number, first (info about location rectangle) has been removed
				ASSERT(load_values.length >= 3, "Wrong number of load parameters, at least four are required (location, p, X1, Y1)");
				setLoadValues(load, load_values, "magnitude_uniform", "load_location_first_x", "load_location_first_y", "load_location_second_x", "load_location_second_y", "load_location_rotation");
			}
			else	// Center and sides of rectangle
			{
				ASSERT(load_values.length >= 5, "Wrong number of load parameters, at least six are required (location, p, Xc, Yc, a, b)");
				setLoadValues(load, load_values, "magnitude_uniform", "load_location_center_x", "load_location_center_y", "load_location_center_sides_a", "load_location_center_side_b", "load_location_rotation");
			}
			break;
		case free_rectangular_loads.LOAD_DISTRIBUTION_LINEAR_FIRST:
		case free_rectangular_loads.LOAD_DISTRIBUTION_LINEAR_SECOND:
			if (rectangle == 1)	// Corner points of rectangle
			{
				ASSERT(load_values.length >= 4, "Wrong number of load parameters, at least five are required (location, p1, p2, X1, Y1)");
				setLoadValues(load, load_values, "magnitude_linear_first", "magnitude_linear_second", "load_location_first_x", "load_location_first_y", "load_location_second_x", "load_location_second_y", "load_location_rotation");
			}
			else	// Center and sides of rectangle
			{
				ASSERT(load_values.length >= 6, "Wrong number of load parameters, at least seven are required (location, p1, p2, Xc, Yc, a, b)");
				setLoadValues(load, load_values, "magnitude_linear_first", "magnitude_linear_second", "load_location_center_x", "load_location_center_y", "load_location_center_side_a", "load_location_center_side_b", "load_location_rotation");
			}
			break;
		case free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
		case free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_ALONG_PERIMETER:
		case free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER:
			if (rectangle == 1)	// Corner points of rectangle
			{
				if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z) {
					ASSERT(load_values.length === 6, "Wrong number of load parameters, seven values are required (location, p, X1, Y1, X2, Y2, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn])");
				}
				else if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_ALONG_PERIMETER) {
					ASSERT(load_values.length === 6, "Wrong number of load,seven values are required (location, p, X1, Y1, X2, Y2, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)])");
				}
				else if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER) {
					ASSERT(load_values.length === 7, "Wrong number of load parameters, eight values are required (location, p, X1, Y1, X2, Y2, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn], [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)]");
				}
				load.magnitude_uniform = load_values[0];
				load.load_location_first_x = load_values[1];
				load.load_location_first_y = load_values[2];
				load.load_location_second_x = load_values[3];
				load.load_location_second_y = load_values[4];
			}
			else	// Center and sides of rectangle
			{
				if (load_distribution == free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z) {
					ASSERT(load_values.length === 6, "Wrong number of load parameters, seven are required (location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn])");
				}
				else if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_ALONG_PERIMETER) {
					ASSERT(load_values.length === 6, "Wrong number of load parameters, seven are required (location, p, Xc, Yc, a, b, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)");
				}
				else if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER) {
					ASSERT(load_values.length === 7, "Wrong number of load parameters, eight values are required (location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn], [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)]");
				}
				load.magnitude_uniform = load_values[0];
				load.load_location_center_x = load_values[1];
				load.load_location_center_y = load_values[2];
				load.load_location_center_side_a = load_values[3];
				load.load_location_center_side_b = load_values[4];
			}
			if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z || load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER) {
				// Varying in Z-direction
				var varying_values = load_values[5];
				ASSERT(varying_values.length % 3 === 0, "Wrong number of varyings, there must be trio of parameters");

				for (var i = 0; i < varying_values.length; i += 3) {
					load.load_varying_in_z_parameters[i / 3 + 1].distance = varying_values[i];
					load.load_varying_in_z_parameters[i / 3 + 1].factor = varying_values[i + 1];
					load.load_varying_in_z_parameters[i / 3 + 1].recalculated_magnitude = varying_values[i + 2];
				}
			}
			if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_ALONG_PERIMETER || load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER) {
				// Varying along perimeter
				var perimeter_values = load_values[5];
				if (load_distribution === free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER) {
					perimeter_values = load_values[6];
				}
				ASSERT(perimeter_values.length >= 13, "Wrong number of varying along perimeter values, at least thirteen values are required (XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2)");
				ASSERT((perimeter_values.length - 7) % 3 === 0, "Wrong number of load varying along perimeter values, there must be trio of parameters");

				load.axis_definition_p1_x = perimeter_values[0];
				load.axis_definition_p1_y = perimeter_values[1];
				load.axis_definition_p1_z = perimeter_values[2];
				load.axis_definition_p2_x = perimeter_values[3];
				load.axis_definition_p2_y = perimeter_values[4];
				load.axis_definition_p2_z = perimeter_values[5];
				load.axis_start_angle = perimeter_values[6];

				for (var i = 7; i < perimeter_values.length; i += 3) {
					load.load_varying_along_perimeter_parameters[(i - 7) / 3 + 1].alpha = perimeter_values[i];
					load.load_varying_along_perimeter_parameters[(i - 7) / 3 + 1].factor = perimeter_values[i + 1];
					load.load_varying_along_perimeter_parameters[(i - 7) / 3 + 1].recalculated_magnitude = perimeter_values[i + 2];
				}
			}
			break;
		default:
			showLoadAssert(undefined, load_distribution);
	}

	return load;
}

/**
* Creates free rectangular uniform load
* @param 	{Number}	no						Index of free rectangular uniform load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free rectangular uniform load
*/
FreeRectangularLoad.prototype.Uniform = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeRectangularLoadParameters(this.load, free_rectangular_loads.LOAD_DISTRIBUTION_UNIFORM, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free rectangular linear in X load
* @param 	{Number}	no						Index of free rectangular linear in X load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free rectangular linear in X load
*/
FreeRectangularLoad.prototype.LinearX = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeRectangularLoadParameters(this.load, free_rectangular_loads.LOAD_DISTRIBUTION_LINEAR_FIRST, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free rectangular linear in Y load
* @param 	{Number}	no						Index of free rectangular linear in Y load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free rectangular linear in Y load
*/
FreeRectangularLoad.prototype.LinearY = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeRectangularLoadParameters(this.load, free_rectangular_loads.LOAD_DISTRIBUTION_LINEAR_SECOND, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free rectangular varying in Z load
* @param 	{Number}	no						Index of free rectangular varying in Z load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free rectangular varying in Z load
*/
FreeRectangularLoad.prototype.VaryingZ = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeRectangularLoadParameters(this.load, free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free rectangular varying along perimeter load
* @param 	{Number}	no						Index of free rectangular varying along perimeter load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free rectangular varying along perimeter load
*/
FreeRectangularLoad.prototype.VaryingPerimeter = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeRectangularLoadParameters(this.load, free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_ALONG_PERIMETER, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};

/**
* Creates free rectangular varying in Z and along perimeter load
* @param 	{Number}	no						Index of free rectangular varying in Z and along perimeter load, can be undefined
* @param 	{Object}	load_case				Load case
* @param 	{Array}		surfaces				List of surface indexes
* @param	{Array}		load_values				Load parameters
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @param	{String}	comment					Comment, can be undefined
* @param	{Object}	params					Load parameters, can be undefined
* @return	{Object}	Created free rectangular varying in Z and along perimeter load
*/
FreeRectangularLoad.prototype.VaryingZAndPerimeter = function (no,
	load_case,
	surfaces,
	load_values,
	load_projection,
	load_direction,
	load_acting_region_from,
	load_acting_region_to,
	comment,
	params) {
	this.load = createBaseLoad("Free_Rectangular_Load", no, load_case, surfaces, comment, params);
	this.load = setFreeRectangularLoadParameters(this.load, free_rectangular_loads.LOAD_DISTRIBUTION_VARYING_IN_Z_AND_ALONG_PERIMETER, load_values);
	this.load = setCommonFreeLoadsValues(this.load, load_projection, load_direction, load_acting_region_from, load_acting_region_to);

	return this.load;
};