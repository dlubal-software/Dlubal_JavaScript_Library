/**
 * Creates load based on its type
 * @param	{Number}	load_type	Load type
 * @param	{Number}	no			Index of load, can be undefined
 * @param	{Object}	load_case	Load case
 * @param	{Array}		index_list	List of assigned objects (indexes), can be empty
 * @param	{String}	comment		Comment, can be undefined
 * @param	{Object}	params		Load parameters, can be undefined
 * @return 	{Object}	Created load
*/
function createBaseLoad(load_type,
						 no,
						 load_case,
						 index_list,
						 comment,
						 params)
{	
	ASSERT(typeof load_case !== "undefined", "Load case is not specified");
	
	var load = engine.create_load(no, load_type, load_case);
	var handled_params = typeof params !== "undefined" ? params : {};
	
	switch (load_type)
	{
		case "Nodal_Load":
			handled_params["nodes"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Member_Load":
			handled_params["members"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Line_Load":
			handled_params["lines"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Surface_Load":
		case "Free_Circular_Load":
		case "Free_Concentrated_Load":
		case "Free_Line_Load":
		case "Free_Rectangular_Load":
		case "Free_Polygon_Load":
			handled_params["surfaces"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Solid_Load":
			handled_params["solids"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Opening_Load":
			handled_params["openings"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Line_Set_Load":
			handled_params["line_sets"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Member_Set_Load":
			handled_params["member_sets"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Surface_Set_Load":
			handled_params["surface_sets"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		case "Solid_Set_Load":
			handled_params["solid_sets"] = typeof index_list !== "undefined" ? index_list : [];
			break;
		default:
			ASSERT(false, "Unknown load type");
	}
	
	set_comment_and_parameters(load, comment, handled_params);
	
	return load;
};

/**
 * Creates load with one only value (force, mass and so on)
 * @param	{Number}	load_type		Load type
 * @param	{Number}	no				Index of nodal load, can be undefined
 * @param	{Object}	load_case		Load case
 * @param	{Array}		nodes			List of node indexes, can be undefined
 * @param	{Number}	force			Load force value, can be undefined
 * @param	{Number}	moment			Load moment value, can be undefined
 * @param	{Number}	mass			Load mass value, can be undefined
 * @param 	{String}	load_direction	Load direction, can be undefined
 * @param	{String}	comment			Comment, can be undefined
 * @param	{Object}	params			Load parameters, can be undefined
 * @return 	{Object}	Created load
*/
function createSimplyValueLoad(load_type,
							   no,
							   load_case,
							   nodes,
							   force,
							   moment,
							   mass,
							   load_direction,
							   comment,
							   params)
{	
	var load = createBaseLoad(load_type, no, load_case, nodes, comment, params);
	
	if (typeof force !== "undefined")
	{
		load.load_type = nodal_loads.LOAD_TYPE_FORCE;
		load.force_magnitude = force;
	}
	else if (typeof moment !== "undefined")
	{
		load.load_type = nodal_loads.LOAD_TYPE_MOMENT;
		load.moment_magnitude = moment;
	}
	else
	{
		load.load_type = nodal_loads.LOAD_TYPE_MASS;
		load.mass_global = mass;
	}

	if (typeof load_direction !== "undefined")
	{
		load.load_direction = load_direction;
	}

	return load;
};

/**
* Shows assert (private)
* @param {String}	load_type			Load type
* @param {String}	load_distribution	Load distribution, can be undefined
*/
var showLoadAssert = function(load_type, load_distribution)
{
	if (typeof load_type !== "undefined" && typeof load_distribution !== "undefined")
	{
		assert(false, "Unknown load distribution (" + (load_type) + " - " + (load_distribution) + ")");
	}
	else if (load_type !== "undefined")
	{
		assert(false, "Unknown load type (" + (load_type) + ")");
	}
	else
	{
		assert(false, "Unknown load distribution (" + (load_distribution) + ")");
	}
};

/**
* Set load parameters
* @param 	{Array}	arguments		Arguments: arg[0] - load, arg[1] - load parameters, arg[2] - load parameters to be set
*/
var setLoadValues = function()
{
	ASSERT(arguments.length >= 3);
	var load = arguments[0];
	var load_values = arguments[1];
	ASSERT(load_values.length + 2 <= arguments.length, "setLoadValues assert");
	var distance_a_value = 0;
	var distance_b_value = 0;
	var distance_c_value = 0;
	
	for (var i = 0; i < load_values.length; ++i)
	{
		var arg = arguments[i + 2];
		
		// Remember value of distances, if any
		if (arg === "distance_a")
		{
			distance_a_value = load_values[i];
			continue;
		}
		if (arg === "distance_b")
		{
			distance_b_value = load_values[i];
			continue;
		}
		if (arg === "distance_c")
		{
			distance_c_value = load_values[i];
			continue
		}
		
		load[arg] = load_values[i];
	}
	
	// If some distances were specified, set them to load parameters depending of absolute or relative
	if (distance_a_value !== 0)
	{
		load.distance_a_is_defined_as_relative ? load.distance_a_relative = distance_a_value : load.distance_a_absolute = distance_a_value;
	}
	if (distance_b_value !== 0)
	{
		load.distance_b_is_defined_as_relative ? load.distance_b_relative = distance_b_value : load.distance_b_absolute = distance_b_value;
	}
	if (distance_c_value !== 0)
	{
		load.distance_c_is_defined_as_relative ? load.distance_c_relative = distance_c_value : load.distance_c_absolute = distance_c_value;
	}
};

/**
* Sets axis for rotary motion load type
* @param 	{Object}	load	Load
* @param	{String}	value	Parallel axis (X, Y, Z)
* @return	{Boolean}	True if axis and orientation was succesfully set
*/
var setAxis = function(load,
					   value)
{
	ASSERT(load.load_distribution === surface_loads.LOAD_DISTRIBUTION_RADIAL);
	
	if (value.length === 1 && value.match("[X|Y|Z]") !== null)
	{
		load.axis_definition_axis = value.substring(0, 1);
		
		return true;
	}
	
	return false;
};

/**
* Sets axis and orientation for rotary motion load type
* @param 	{Object}	load	Load
* @param	{String}	value	Parallel axis (+X, -X, ...)
* @return	{Boolean}	True if axis and orientation was succesfully set
*/
var setAxisAndOrientation = function(load,
									 value)
{
	if (value.length === 2 && value.match("[+|-][X|Y|Z]") !== null)
	{
		load.axis_definition_axis = value.substring(1, 2);
		load.axis_definition_axis_orientation = value.substring(0, 1);
		
		return true;
	}
	
	return false;
};

var setRotaryMotionLoad = function(load,
								   load_values)
{
	ASSERT(load_values.length >= 4, "Wrong number of load parameters, at least four values are required (type of axes definition, ω, α, [Node1] | XA)");
	load.axis_definition_type = load_values[0] === 1 ? member_loads.AXIS_DEFINITION_TWO_POINTS : member_loads.AXIS_DEFINITION_POINT_AND_AXIS;
	load.angular_velocity = load_values[1];
	load.angular_acceleration = load_values[2];
	var TWO_POINTS = "1";
	var POINT_AND_PARALLEL = "2";
	if (Array.isArray(load_values[3])) // Axis coordinations are defined by list of nodes
	{
		// Fourth parameter is list of nodes
		ASSERT(load_values[3].length >= 1, "Wrong number of defined nodes, at least one is required");
		var node = nodes.getNthObject(load_values[3][0]);
		load.axis_definition_p1 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
		
		// If axis definition is "Two points" and there are two axis coordinations
		if (load_values[0] === TWO_POINTS && load_values[3].length === 2)
		{
			node = nodes.getNthObject(load_values[3][1]);
			load.axis_definition_p2 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
		}
		
		// load_values = [axis_definition, ω, α, [Node1], parallel_axis]
		if (load_values[0] === POINT_AND_PARALLEL && load_values.length >= 5)
		{
			// Parallel axis is defined
			setAxisAndOrientation(load, load_values[4]);
		}
	}
	else // Axis coordinations are defined by points and its coordinations
	{
		// Fourth parameter is x-coordinate of point A - "Two Points" are defined by coordinates of A or A and B points
		ASSERT(load_values.length >= 6, "Wrong number of load parameters, at least six values are required (axes definition, ω, α, XA, YA, ZA)");
		load.axis_definition_p1 = $V(load_values[3], load_values[4], load_values[5]);
		
		if (load_values[0] === TWO_POINTS && load_values.length > 6)
		{
			// Coordinates of second axis point is defined
			ASSERT(load_values.length === 9, "Wrong number of parameters, nine values are required (axis definition, ω, α, XA, YA, ZA, XB, YB, ZB)");
			load.axis_definition_p2 = $V(load_values[6], load_values[7], load_values[8]);
		}
		
		// load_values = [axis_definition, ω, α, XA, YA, ZA, parallel_axis]
		if (load_values[0] === POINT_AND_PARALLEL && load_values.length >= 7)
		{
			// Parallel axis is defined
			setAxisAndOrientation(load, load_values[6]);
		}
	}
};

/**
* Assignes parameters to line / line set load depend of load type and load distribution (private)
* @param  {Object}	load				Load
* @param  {String}	load_type			Load type
* @param  {String}	load_distribution	Load distribution
* @param  {Array}	load_values			Load parameters depend on load type and load distribution
*										- (load type / load distribution: [valid values])
*										- "Force" / "Uniform": [p]
*										- "Force" / "Uniform - Total": [P]
*										- "Force" / "Concentrated - 1": [P, A, is_a_relative]
*										- "Force" / "Concentrated - n x": [P, n, A, B, is_a_relative, is_b_relative]
*										- "Force" / "Concentrated - 2 x 2": [P, A, B, C, is_a_relative, is_b_relative, is_c_relative]
*										- "Force" / "Concentrated - 2 x": [P1, A, P2, B, is_a_relative, is_b_relative]
*										- "Force" / "Concentrated - Varying": [P1, x1, P2, x2 ... Pn, xn]
*										- "Force" / "Trapezoidal": [p1, B, p2, A, is_b_relative, is_a_relative]
*										- "Force" / "Tapered": [p1, p2, A, B, is_a_relative, is_b_relative]
*										- "Force" / "Parabolic": [p1, p2, p3]
*										- "Force" / "Varying": [p1, x1, p2, x2 ... pn, xn]
*										- "Force" / "Varying in Z": [p1, z1, p2, z2 ... pn, zn]
*										- "Moment" / "Uniform" (load type / load distribution): [m]
*										- "Moment" / "Concentrated - 1": [M, A, is_a_reative]
*										- "Moment" / "Concentrated - n x": [M, n, A, B, is_a_relative, is_b_relative]
*										- "Moment" / "Concentrated - 2 x 2": [M, A, B, C, is_a_relative, is_b_relative, is_c_relative]
*										- "Moment" / "Concentrated - 2 x": [M1, A, M2, B, is_a_relative, is_b_relative]
*										- "Moment" / "Concentrated - Varying": [M1, x1, M2, x2 ... Mn, xn]
*										- "Moment" / "Trapezoidal": [m1, B, m2, A, is_b_relative, is_a_relative]
*										- "Moment" / "Tapered": [m1, m2, A, B, is_a_relative, is_b_relative]
*										- "Moment" / "Parabolic": [m1, m2, m3]
*										- "Moment" / "Varying": [m1, x1, m2, x2 ... mn, xn]
*										- "Mass" / "Uniform": M
* @return	{Object}	Returns modified load
*/
var setLineLoadDistribution = function(load,
									   load_type,
									   load_distribution,
									   load_values)
{
	load.load_type = load_type;
	
	if (typeof load_distribution !== "undefined")
	{
		load.load_distribution = load_distribution;
	}
	
	switch (load_type)
	{
		case line_loads.LOAD_TYPE_FORCE:
		case line_loads.LOAD_TYPE_MOMENT:
			switch (load_distribution)
			{
				case line_loads.LOAD_DISTRIBUTION_UNIFORM:
				case line_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL:
					ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (p)");
					setLoadValues(load, load_values, "magnitude");
					break;
				case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_1:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P)");
					setLoadValues(load, load_values, "magnitude", "distance_a", "distance_a_is_defined_as_relative");
					break;
				case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_N:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P)");
					setLoadValues(load, load_values, "magnitude", "count_n", "distance_a", "distance_b, distance_a_is_defined_as_relative, distance_b_is_defined_as_relative");
					break;
				case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_2x2:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P)");
					setLoadValues(load, load_values, "magnitude", "distance_a", "distance_b", "distance_c", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative", "distance_c_is_defined_as_relative");
					break;
				case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_2:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P1)");
					setLoadValues(load, load_values, "magnitude_1", "distance_a", "magnitude_2", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
					break;
				case line_loads.LOAD_DISTRIBUTION_CONCENTRATED_VARYING:
				case line_loads.LOAD_DISTRIBUTION_VARYING:
				case line_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
					ASSERT(load_values.length % 2 === 0, "Wrong number of load parameters");
					for (var i = 0; i < load_values.length; i+=2)
					{
						load.varying_load_parameters[i / 2 + 1].magnitude = load_values[i];
						load.varying_load_parameters[i / 2 + 1].distance = load_values[i + 1];
					}
					break;
				case line_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
					ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (P1, B)");
					setLoadValues(load, load_values, "magnitude_1", "distance_b", "magnitude_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
					break;
				case line_loads.LOAD_DISTRIBUTION_TAPERED:
					ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (P1, P2)");
					setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
					break;
				case line_loads.LOAD_DISTRIBUTION_PARABOLIC:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P1 or P2 or P3)");
					setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "magnitude_3");
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case line_loads.E_TYPE_MASS:
			ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (M)");
			ASSERT(load_distribution === LOAD_DISTRIBUTION_UNIFORM, "Mass load has only uniform distribution");
			setLoadValues(load, load_values, "mass_global");
			break;
		default:
			showLoadAssert(load_type);
	}
	
	return load;
};

/**
* Assignes parameters to member / member set load depend of load type and load distribution (private)
* @param  {Object}	load				Load
* @param  {String}	load_type			Load type
* @param  {String}	load_distribution	Load distribution, can be undefined
* @param  {Array}	load_values			Load parameters depend on load type and load distribution
*										- (load type / load distribution: [valid values])
*										- "Force" / "Uniform": [p]
*										- "Force" / "Uniform - Total": [P]
*										- "Force" / "Concentrated - 1": [P, A, is_a_relative]
*										- "Force" / "Concentrated - n x": [P, n, A, B, is_a_relative, is_b_relative]
*										- "Force" / "Concentrated - 2 x 2": [P, A, B, C, is_a_relative, is_b_relative, is_c_relative]
*										- "Force" / "Concentrated - 2 x": [P1, A, P2, B, is_a_relative, is_b_relative]
*										- "Force" / "Concentrated - Varying": [P1, x1, P2, x2 ... Pn, xn]
*										- "Force" / "Trapezoidal": [p1, B, p2, A, is_b_relative, is_a_relative]
*										- "Force" / "Tapered": [p1, p2, A, B, is_a_relative, is_b_relative]
*										- "Force" / "Parabolic": [p1, p2, p3]
*										- "Force" / "Varying": [p1, x1, p2, x2, ... pn, xn]
*										- "Force" / "Varying in Z": [p1, z1, p2, z2 ... pn, zn]
*										- "Moment" / "Uniform" (load type / load distribution): [m]
*										- "Moment" / "Concentrated - 1": [M, A, is_a_reative]
*										- "Moment" / "Concentrated - n x": [M, n, A, B, is_a_relative, is_b_relative]
*										- "Moment" / "Concentrated - 2 x 2": [M, A, B, C, is_a_relative, is_b_relative, is_c_relative]
*										- "Moment" / "Concentrated - 2 x": [M1, A, M2, B, is_a_relative, is_b_relative]
*										- "Moment" / "Concentrated - Varying": [M1, x1, M2, x2 ... Mn, xn]
*										- "Moment" / "Trapezoidal": [m1, B, m2, A, is_b_relative, is_a_relative]
*										- "Moment" / "Tapered": [m1, m2, A, B, is_a_relative, is_b_relative]
*										- "Moment" / "Parabolic": [m1, m2, m3]
*										- "Moment" / "Varying": [m1, x1, m2, x2, ... mn, xn]
*										- "Mass" / "Uniform": M
*										- "Temperature" / "Uniform": [Tt, Tb]
*										- "Temperature" / "Trapezoidal": [Tt1, B, Tb1, Tt2, Tb2, A, is_b_relative, is_a_relative]
*										- "Temperature" / "Tapered": [Tt1, Tb1, Tt2, Tb2, A, B, is_a_relative, is_b_relative]
*										- "Temperature" / "Parabolic": [Tt1, Tb1, Tt2, Tb2, Tt3, Tb3]
*										- "Temperature" / "Varying": [Tt1, Tb1, x1, Tt2, Tb2, x2 ... Ttn, Tbn, xn]
*										- "Temperature Change" / "Uniform": [Tc, ΔT]
*										- "Temperature Change" / "Trapezoidal": [Tc1, B, ΔT1, Tc2, ΔT2, A, is_b_relative, is_a_relative]
*										- "Temperature Change" / "Tapered": [Tc1, ΔT1, ΔT2, ΔT2, A, B, is_a_relative, is_b_relative]
*										- "Temperature Change" / "Parabolic": [Tt1, ΔT1, Tt2, ΔT2, Tt3, ΔT3]
*										- "Temperature Change" / "Varying": [Tc1, ΔT1, x1, Tc2, ΔT2, x2 ... Tcn, ΔTn, xn]
*										- "Axial Strain" / "Uniform": [ε]
*										- "Axial Strain" / "Trapezoidal": [ε1, B, ε2, A, is_b_relative, is_a_relative]
*										- "Axial Strain" / "Tapered": [ε1, ε2, A, B, is_a_relative, is_b_relative]
*										- "Axial Strain" / "Parabolic": [ε1, ε2, ε3]
*										- "Axial Strain" / Varying": [ε1, x1, ε2, x2, ... εn, xn]
*										- "Axial Displacement" / "Uniform": Δl
*										- "Precamber" / "Uniform": [κ]
*										- "Precamber" / "Trapezoidal": [κ1, B, κ2, A, is_b_relative, is_a_relative]
*										- "Precamber" / "Tapered": [κ1, A, κ2, B, is_a_relative, is_a_relative]
*										- "Precamber" / "Parabolic": [κ1, κ2, κ3]
*										- "Precamber" / "Varying": [κ1, x1, κ2, x2, ... κn, xn]
*										- "Initial Prestress" / "Uniform": V
*										- "Displacement" / "Uniform": [δ]
*										- "Displacement" / "Concentrated - 1": [Δ, A, is_a_relative]
*										- "Displacement" / "Concentrated - n x": [Δ, n, A, B, is_a_relative, is_b_relative]
*										- "Displacement" / "Concentrated - 2 x 2": [Δ, A, B, C, is_a_relative, is_b_relative, is_c_relative]
*										- "Displacement" / "Concentrated - 2 x": [Δ1, Δ2, A, B, is_a_relative, is_b_relative]
*										- "Displacement" / "Concentrated - Varying": [Δ1, x1, Δ2, x2 ... Δn, xn]
*										- "Displacement" / "Trapezoidal": [δ1, B, δ2, A, is_b_relative, is_a_relative]
*										- "Displacement" / "Tapered": [δ1, δ2, A, B, is_a_relative, is_b_relative]
*										- "Displacement" / "Parabolic": [δ1, δ2, δ3]
*										- "Displacement" / "Varying": [δ1, x1, δ2, x2, ... δn, xn]
*										- "Rotation" / "Uniform": [φ]
*										- "Rotation" / "Concentrated - 1": [φ, A, is_a_relative]
*										- "Rotation" / "Concentrated - n x": [φ, n, A, B, is_a_relative, is_b_relative]
*										- "Rotation" / "Concentrated - 2 x 2": [φ, A, B, C, is_a_relative, is_b_relative, is_c_relative]
*										- "Rotation" / "Concentrated - 2 x": [φ1, A, φ2, B, is_a_relative, is_b_relative]
*										- "Rotation" / "Concentrated - Varying": [φ1, x1, φ2, x2 ... φn, xn]
*										- "Rotation" / "Trapezoidal": [φ1, B, φ2, A, is_b_relative, is_a_relative]
*										- "Rotation" / "Tapered": [φ1, φ2, A, B, is_a_relative, is_b_relative]
*										- "Rotation" / "Parabolic": [φ1, φ2, φ3]
*										- "Rotation" / "Varying": [φ1, x1, φ2, x2, ... φn, xn]
*										- "Pipe Content - Full" / "Uniform": γ
*										- "Pipe Content - Partial" / "Uniform": [γ, d]
*										- "Pipe Internal Pressure" / "Uniform": p
*										- "Rotary Motion": [axis_definition, ω, α, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points")
*														   [axis_definition, ω, α, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis")
* @return	{Object}	Returns modified load
*/
var setMemberLoadDistribution = function(load,
										 load_type,
										 load_distribution,
										 load_values)
{
	load.load_type = load_type;
	
	if (typeof load_distribution !== "undefined")
	{
		load.load_distribution = load_distribution;
	}
	
	switch (load_type)
	{
		case member_loads.LOAD_TYPE_FORCE:
		case member_loads.LOAD_TYPE_MOMENT:
		case member_loads.LOAD_TYPE_AXIAL_STRAIN:
		case member_loads.LOAD_TYPE_PRECAMBER:
		case member_loads.LOAD_TYPE_DISPLACEMENT:
		case member_loads.LOAD_TYPE_ROTATION:
			switch (load_distribution)
			{
				case member_loads.LOAD_DISTRIBUTION_UNIFORM:
				case member_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL:
					ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (p)");
					setLoadValues(load, load_values, "magnitude");
					break;
				case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P)");
					setLoadValues(load, load_values, "magnitude", "distance_a", "distance_a_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_N:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P)");
					setLoadValues(load, load_values, "magnitude", "count_n", "distance_a", "distance_b, distance_a_is_defined_as_relative, distance_b_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_2x2:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P)");
					setLoadValues(load, load_values, "magnitude", "distance_a", "distance_b", "distance_c", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative", "distance_c_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_2:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P1)");
					setLoadValues(load, load_values, "magnitude_1", "distance_a", "magnitude_2", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_VARYING:
				case member_loads.LOAD_DISTRIBUTION_VARYING:
				case member_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
					ASSERT(load_values.length % 2 === 0, "Wrong number of load parameters");
					for (var i = 0; i < load_values.length; i+=2)
					{
						load.varying_load_parameters[i / 2 + 1].magnitude = load_values[i];
						load.varying_load_parameters[i / 2 + 1].distance = load_values[i + 1];
					}
					break;
				case member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
					ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (P1, B)");
					setLoadValues(load, load_values, "magnitude_1", "distance_b", "magnitude_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_TAPERED:
					ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (P1, P2)");
					setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_PARABOLIC:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (P1 or P2 or P3)");
					setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "magnitude_3");
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case member_loads.E_TYPE_MASS:
			ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (M)");
			ASSERT(load_distribution === LOAD_DISTRIBUTION_UNIFORM, "Mass load has only uniform distribution");
			setLoadValues(load, load_values, "mass_global");
			break;
		case member_loads.LOAD_TYPE_TEMPERATURE:
			switch (load_distribution)
			{
				case member_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (Tt or Tb)");
					setLoadValues(load, load_values, "magnitude_t_t", "magnitude_t_b");
					break;
				case member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
					ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values is required (Tt1, B)");
					setLoadValues(load, load_values, "magnitude_t_t_1", "distance_b", "magnitude_t_b_1", "magnitude_t_t_2", "magnitude_t_b_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_TAPERED:
					setLoadValues(load, load_values, "magnitude_t_t_1", "magnitude_t_b_1", "magnitude_t_t_2", "magnitude_t_b_1", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_PARABOLIC:
					setLoadValues(load, load_values, "magnitude_t_t_1", "magnitude_t_b_1", "magnitude_t_t_2", "magnitude_t_b_2", "magnitude_t_t_3", "magnitude_t_b_3");
					break;
				case member_loads.LOAD_DISTRIBUTION_VARYING:
					ASSERT(load_values.length % 3 === 0, "Wrong number of load parameters");
					for (var i = 0; i < load_values.length; i+=3)
					{
						load.varying_load_parameters[i / 3 + 1].magnitude_t_t = load_values[i];
						load.varying_load_parameters[i / 3 + 1].magnitude_t_b = load_values[i + 1];
						load.varying_load_parameters[i / 3 + 1].distance = load_values[i + 2];
					}
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case member_loads.LOAD_TYPE_TEMPERATURE_CHANGE:
			switch (load_distribution)
			{
				case member_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (Tc)");
					setLoadValues(load, load_values, "magnitude_t_c", "magnitude_delta_t");
					break;
				case member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
					ASSERT(load_values.length >= 2, "Wrong number of load parameters, at least two values are required (Tc1, B)");
					setLoadValues(load, load_values, "magnitude_t_c_1", "distance_b", "magnitude_delta_t_1", "magnitude_t_c_2", "magnitude_delta_t_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_TAPERED:
					setLoadValues(load, load_values, "magnitude_t_c_1", "magnitude_delta_t_1", "magnitude_t_c_2", "magnitude_delta_t_2", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
					break;
				case member_loads.LOAD_DISTRIBUTION_PARABOLIC:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (Tc1 or Tc2 or Tc3)");
					setLoadValues(load, load_values, "magnitude_t_c_1", "magnitude_delta_t_1", "magnitude_t_c_2", "magnitude_delta_t_2", "magnitude_t_c_3", "magnitude_delta_t_3");
					break;
				case member_loads.LOAD_DISTRIBUTION_VARYING:
					ASSERT(load_values.length % 3 === 0, "Wrong number of load parameters");
					for (var i = 0; i < load_values.length; i+=3)
					{
						load.varying_load_parameters[i / 3 + 1].magnitude_t_c = load_values[i];
						load.varying_load_parameters[i / 3 + 1].magnitude_delta_t = load_values[i + 1];
						load.varying_load_parameters[i / 3 + 1].distance = load_values[i + 2];
					}
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT:
		case member_loads.LOAD_TYPE_INITIAL_PRESTRESS:
		case member_loads.LOAD_TYPE_PIPE_CONTENT_FULL:
		case member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL:
		case member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE:
			ASSERT(load_distribution === LOAD_DISTRIBUTION_UNIFORM, "Load has only uniform distribution");
			if (load_type === member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT)
			{
				ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (Δl)");
			}
			else if (load_type === member_loads.LOAD_TYPE_INITIAL_PRESTRESS)
			{
				ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (V)");
			}
			else if (load_type === member_loads.LOAD_TYPE_PIPE_CONTENT_FULL)
			{
				ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (γ)");
			}
			else if (load_type === member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL)
			{
				ASSERT(load_values.length === 2, "Wrong number of load parameters, two values are required (γ, d)");
			}
			else
			{
				ASSERT(load_type === member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE);
				ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (p)");
			}
			if (load_type !== member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL)
			{
				setLoadValues(load, load_values, "magnitude");
			}
			else
			{
				setLoadValues(load, load_values, "magnitude", "filling_height");
			}
			break;
		case member_loads.LOAD_TYPE_ROTARY_MOTION:
			setRotaryMotionLoad(load, load_values);
			break;
		default:
			showLoadAssert(load_type);
	}
	
	return load;
};

/**
* Assignes parameters to surface / surface set load depend of load type and load distribution (private)
* @param  {Object}	load				Load
* @param  {String}	load_type			Load type
* @param  {String}	load_distribution	Load distribution, can be undefined
* @param  {Array}	load_values			Load parameters depend on load type and load distribution
*										- (load type / load distribution: [valid values])
*										- "Force" / "Uniform": [p]
*										- "Force" / "Linear": [Node1, Node2, Node3, p1, p2, p3]
*										- "Force: / "Linear in X": [Node1, Node2, p1, p2]
*										- "Force" / "Linear in Y": [Node1, Node2, p1, p2]
*										- "Force" / "Linear in Z": [Node1, Node2, p1, p2]
*										- "Force" / "Radial": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points")
*														   	  [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis")
*										- "Force" / "Varying in Z": [p1, z1, p2, z2, ... pn, zn]
*										- "Temperature" / "Uniform": [Tc, ΔT]
*										- "Temperature" / "Linear": [Node1, Node2, Node3, Tc1, Tc2, Tc3, ΔT1, ΔT2, ΔT3]
*										- "Temperature" / "Linear in X": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
*										- "Temperature" / "Linear in Y": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
*										- "Temperature" / "Linear in Z": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
*										- "Temperature" / "Radial": [axis_definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points")
*														   	  		[axis_definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis")
*										- "Axial Strain" / "Uniform": [εx, εy]
*										- "Axial Strain" / "Linear": [Node1, Node2, Node3, ε1x, ε1y, ε2x, ε2y, ε3x, ε3y]
*										- "Axial Strain" / "Linear in X": [Node1, Node2, ε1x, ε1y, ε2x, ε2y]
*										- "Axial Strain" / "Linear in Y": [Node1, Node2, ε1x, ε1y, ε2x, ε2y]
*										- "Axial Strain" / "Linear in Z": [Node1, Node2, ε1x, ε1y, ε2x, ε2y]
*										- "Precamber" / "Uniform": [κ]
*										- "Rotary Motion": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points")
*														   [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis")
*										- "Mass" / "Uniform": [M]
* @return	{Object}	Returns modified load
*/
var setSurfaceLoadDistribution = function(load,
										  load_type,
										  load_distribution,
										  load_values)
{		
	load.load_type = load_type;
	
	if (typeof load_distribution !== "undefined")
	{
		load.load_distribution = load_distribution;
	}
	
	var TWO_POINTS = 1;
	var POINT_AND_PARALLEL = 2;
	
	switch (load_type)
	{
		case surface_loads.LOAD_TYPE_FORCE:
			switch (load_distribution)
			{
				case surface_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (p)");
					setLoadValues(load, load_values, "uniform_magnitude");
					break;
				case surface_loads.LOAD_DISTRIBUTION_LINEAR:
					ASSERT(load_values.length >=4, "Wrong number of load parameters, at least four values are required (Node1, Node2, Node3, p1)");
					setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_1", "magnitude_2", "magnitude_3");
					break;
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
					ASSERT(load_values.length >=3, "Wrong number of load parameters, at least three values are required (Node1, Node2, p1)");
					setLoadValues(load, load_values, "node_1", "node_2", "magnitude_1", "magnitude_2");
					break;
				case surface_loads.LOAD_DISTRIBUTION_RADIAL:
					ASSERT(load_values.length >= 6, "Wrong number of load parameters, at least six values are required (type of axes definition, p1, p2, Node1, Node2, [Node1] | XA)");
					load.axis_definition_type = load_values[0] === 1 ? member_loads.AXIS_DEFINITION_TWO_POINTS : member_loads.AXIS_DEFINITION_POINT_AND_AXIS;
					load.magnitude_1 = load_values[1];
					load.magnitude_2 = load_values[2];
					load.node_1 = load_values[3];
					load.node_2 = load_values[4];
					if (Array.isArray(load_values[5])) // Axis coordinations are defined by list of nodes
					{
						// Sixth parameter is list of nodes
						ASSERT(load_values[5].length >= 1, "Wrong number of defined nodes, at least one is required");
						var node = nodes.getNthObject(load_values[5][0]);
						load.axis_definition_p1 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
				
						// If axis definition is "Two points" and there are two axis coordinations
						if (load_values[0] === TWO_POINTS && load_values[5].length === 2)
						{
							node = nodes.getNthObject(load_values[5][1]);
							load.axis_definition_p2 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
						}
						
						// load_values = [axis_definition, ω, α, [Node1], parallel_axis]
						if (load_values[0] === POINT_AND_PARALLEL && load_values.length >= 7)
						{
							// Parallel axis is defined
							setAxis(load, load_values[6]);
						}
					}
					else // Axis coordinations are defined by points and its coordinations
					{
						// Sixth parameter is x-coordinate of point A
						ASSERT(load_values.length >= 8, "Wrong number of load parameters, at least six values are required (axes definition, p1, p2, Node1, Node2, XA, YA, ZA)");
						load.axis_definition_p1 = $V(load_values[5], load_values[6], load_values[7]);
						
						if (load_values[0] === TWO_POINTS && load_values.length > 8)
						{
							// Coordinates of second axis point is defined
							ASSERT(load_values.length === 11, "Wrong number of parameters, nine values are required (axis definition, p1, p2, Node1, Node2, XA, YA, ZA, XB, YB, ZB)");
							load.axis_definition_p2 = $V(load_values[8], load_values[9], load_values[10]);
						}
						
						// load_values = [axis_definition, p1, p2, Node1, Node2, XA, YA, ZA, parallel_axis]
						if (load_values[0] === POINT_AND_PARALLEL && load_values.length >= 9)
						{
							// Parallel axis is defined
							setAxis(load, load_values[8]);
						}
					}
					break;
				case surface_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
					ASSERT(load_values.length % 2 === 0, "Wrong number of load parameters");
					for (var i = 0; i < load_values.length; i+=2)
					{
						load.varying_load_parameters[i / 2 + 1].magnitude = load_values[i];
						load.varying_load_parameters[i / 2 + 1].distance = load_values[i + 1];
					}
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case surface_loads.LOAD_TYPE_TEMPERATURE:
			switch (load_distribution)
			{
				case surface_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (Tc)");
					setLoadValues(load, load_values, "uniform_magnitude_t_c", "uniform_magnitude_delta_t");
					break;
				case surface_loads.LOAD_DISTRIBUTION_LINEAR:
					ASSERT(load_values.length >=4, "Wrong number of load parameters, at least four values are required (Node1, Node2, Node3, Tc1)");
					setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_t_c_1", "magnitude_t_c_2", "magnitude_t_c_3", "magnitude_delta_t_1", "magnitude_delta_t_2", "magnitude_delta_t_3");
					break;
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
					ASSERT(load_values.length >=3, "Wrong number of load parameters, at least three values are required (Node1, Node2, Tc1)");
					setLoadValues(load, load_values, "node_1", "node_2", "magnitude_t_c_1", "magnitude_t_c_2", "magnitude_delta_t_1", "magnitude_delta_t_2");
					break;
				case surface_loads.LOAD_DISTRIBUTION_RADIAL:
					ASSERT(load_values.length >= 8, "Wrong number of load parameters, at least eight values are required (type of axes definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, [Node1] | XA)");
					load.axis_definition_type = load_values[0] === 1 ? member_loads.AXIS_DEFINITION_TWO_POINTS : member_loads.AXIS_DEFINITION_POINT_AND_AXIS;
					load.magnitude_t_c_1 = load_values[1];
					load.magnitude_t_c_2 = load_values[2];
					load.magnitude_delta_t_1 = load_values[3];
					load.magnitude_delta_t_2 = load_values[4];
					load.node_1 = load_values[5];
					load.node_2 = load_values[6];
					if (Array.isArray(load_values[7])) // Axis coordinations are defined by list of nodes
					{
						// Sixth parameter is list of nodes
						ASSERT(load_values[7].length >= 1, "Wrong number of defined nodes, at least one is required");
						var node = nodes.getNthObject(load_values[7][0]);
						load.axis_definition_p1 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);

						// If axis definition is "Two points" and there are two axis coordinations
						if (load_values[0] === TWO_POINTS && load_values[7].length === 2)
						{
							node = nodes.getNthObject(load_values[7][1]);
							load.axis_definition_p2 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
						}

						// load_values = [axis_definition, ω, α, [Node1], parallel_axis]
						if (load_values[0] === POINT_AND_PARALLEL && load_values.length >= 9)
						{
							// Parallel axis is defined
							setAxis(load, load_values[8]);
						}
					}
					else // Axis coordinations are defined by points and its coordinations
					{
						// Sixth parameter is x-coordinate of point A
						ASSERT(load_values.length >= 10, "Wrong number of load parameters, at least ten values are required (axes definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, XA, YA, ZA)");
						load.axis_definition_p1 = $V(load_values[7], load_values[8], load_values[9]);
						
						if (load_values[0] === TWO_POINTS && load_values.length > 10)
						{
							// Coordinates of second axis point is defined
							ASSERT(load_values.length === 13, "Wrong number of parameters, thirteen values are required (axis definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, XA, YA, ZA, XB, YB, ZB)");
							load.axis_definition_p2 = $V(load_values[10], load_values[11], load_values[12]);
						}
						
						// load_values = [axis_definition, p1, p2, Node1, Node2, XA, YA, ZA, parallel_axis]
						if (load_values[0] === POINT_AND_PARALLEL && load_values.length >= 11)
						{
							// Parallel axis is defined
							setAxis(load, load_values[10]);
						}
					}
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case surface_loads.LOAD_TYPE_AXIAL_STRAIN:
			switch (load_distribution)
			{
				case surface_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (εx)");
					setLoadValues(load, load_values, "magnitude_axial_strain_1x", "magnitude_axial_strain_1y");
					break;
				case surface_loads.LOAD_DISTRIBUTION_LINEAR:
					ASSERT(load_values.length >=5, "Wrong number of load parameters, at least five values are required (Node1, Node2, Node3, ε1x, ε1y)");
					setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_axial_strain_1x", "magnitude_axial_strain_1y", "magnitude_axial_strain_2x", "magnitude_axial_strain_2y", "magnitude_axial_strain_3x", "magnitude_axial_strain_3y");
					break;
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
				case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
					ASSERT(load_values.length >=4, "Wrong number of load parameters, at least four values are required (Node1, Node2, ε1x, ε1y)");
					setLoadValues(load, load_values, "node_1", "node_2", "magnitude_axial_strain_1x", "magnitude_axial_strain_1y", "magnitude_axial_strain_2x", "magnitude_axial_strain_2y");
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case surface_loads.LOAD_TYPE_PRECAMBER:
			// Only Uniform
			ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (κ)");
			setLoadValues(load, load_values, "uniform_magnitude");
			break;
		case surface_loads.LOAD_TYPE_ROTARY_MOTION:
			setRotaryMotionLoad(load, load_values);
			break;
		case surface_loads.LOAD_TYPE_MASS:
			ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (M)");
			setLoadValues(load, load_values, "magnitude_mass_global");
			break;
		default:
			showLoadAssert(load_type);
	}
	
	return load;
};

/**
* Assignes parameters to solid / solid set load depend of load type and load distribution (private)
* @param  {Object}	load				Load
* @param  {String}	load_type			Load type
* @param  {String}	load_distribution	Load distribution, can be undefined
* @param  {Array}	load_values			Load parameters depend on load type and load distribution
*										- (load type / load distribution: [valid values])
*										- "Force" / "Uniform": [p]
*										- "Temperature" / "Uniform": [T]
*										- "Temperature" / "Linear in X": [Node1, Node2, T1, T2]
*										- "Temperature" / "Linear in Y": [Node1, Node2, T1, T2]
*										- "Temperature" / "Linear in Z": [Node1, Node2, T1, T2]
*										- "Strain" / "Uniform": [εx, εy, εz]
*										- "Strain" / "Linear in X": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
*										- "Strain" / "Linear in Y": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
*										- "Strain" / "Linear in Z": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
*										- "Buoyancy" / "Uniform": [p]
*										- "Rotary Motion": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points")
*														   [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis")
* @return	{Object}	Returns modified load
*/
var setSolidLoadDistribution = function(load,
										load_type,
										load_distribution,
										load_values)
{
	load.load_type = load_type;
	
	if (typeof load_distribution !== "undefined")
	{
		load.load_distribution = load_distribution;
	}
	
	switch (load_type)
	{
		case solid_loads.LOAD_TYPE_FORCE:
			ASSERT(load_values.length === 1, "Wrong number of load parameters, one value is required (p)");
			setLoadValues(load, load_values, "uniform_magnitude");
			break;
		case solid_loads.LOAD_TYPE_TEMPERATURE:
			switch (load_distribution)
			{
				case solid_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length === 1, "Wrong number of load parameters, one is required (p)");
					setLoadValues(load, load_values, "uniform_magnitude");
					break;
				case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
				case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
				case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
					ASSERT(load_values.length >= 3, "Wrong number of load parameters, at least three values are required (Node1, Node2, T1)");
					setLoadValues(load, load_values, "node_1", "node_2", "magnitude_1", "magnitude_2");
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case solid_loads.LOAD_TYPE_STRAIN:
			switch (load_distribution)
			{
				case solid_loads.LOAD_DISTRIBUTION_UNIFORM:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (εx)");
					setLoadValues(load, load_values, "strain_uniform_magnitude_x", "strain_uniform_magnitude_y", "strain_uniform_magnitude_z");
					break;
				case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
				case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
				case solid_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
					ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least three values are required (Node1, Node2, ε1x)");
					setLoadValues(load, load_values, "node_1", "node_2", "strain_magnitude_x1", "strain_magnitude_y1", "strain_magnitude_z1", "strain_magnitude_x2", "strain_magnitude_y2", "strain_magnitude_z2");
					break;
				default:
					showLoadAssert(load_type, load_distribution);
			}
			break;
		case solid_loads.LOAD_TYPE_BUOYANCY:
			ASSERT(load_values.length >= 1, "Wrong number of load parameters, at least one value is required (p)");
			setLoadValues(load, load_values, "uniform_magnitude");
			break;
		case solid_loads.LOAD_TYPE_ROTARY_MOTION:
			setRotaryMotionLoad(load, load_values);
			break;
		default:
			showLoadAssert(load_type);
	}
	
	return load;
};

/**
* Updates common parameters for free loads
* @param	{Object}	load					Load
* @param	{String}	load_projection			Load projection, can be undefined
* @param	{String}	load_direction			Load direction, can be undefined
* @param	{Number}	load_acting_region_from	Start of load acting region, can be undefined
* @param	{Number}	load_acting_region_to	End of load acting region, can be undefined
* @return	{Object}	Updated free load
*/
var setCommonFreeLoadsValues = function(load,
										load_projection,
										load_direction,
										load_acting_region_from,
										load_acting_region_to)
{
	if (typeof load_projection !== "undefined")
	{
		load.load_projection = load_projection;
	}
		
	if (typeof load_direction !== "undefined")
	{
		load.load_direction = load_direction;
	}
		
	if (typeof load_acting_region_from !== "undefined")
	{
		load.load_acting_region_from = load_acting_region_from;
	}
		
	if (typeof load_acting_region_to !== "undefined")
	{
		load.load_acting_region_to = load_acting_region_to;
	}
	
	return load;
};