include("BaseLoad.js");

/**
* Creates non valid empty member load
* @param 	{Number}	no					Index of member load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		members				List of member indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created member load
*/
function MemberLoad(no,
				    load_case,
				    members,
				    comment,
				    params)
{	
	if (arguments.length != 0)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
	}

	/**
	* Assignes values to load depend of load type and load distribution (private)
	* @param  {String}	load_type			Load type
	* @param  {String}	load_distribution	Load distribution, can be undefined
	* @param  {Array}	load_values			Load values depend on load type and load distribution
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
	*										- "Rotary Motion": [axis_definition, ω, α, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
	*														   [axis_definition, ω, α, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")
	* @return	{Object}	Returns modified load
	*/
	var setLoadDistribution = function(load,
									   load_type,
									   load_distribution,
									   load_values)
	{
		load.load_type = load_type;
		
		if (typeof load_distribution != "undefined")
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
						ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (p)");
						setLoadValues(load, load_values, "magnitude");
						break;
					case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P)");
						setLoadValues(load, load_values, "magnitude", "distance_a", "distance_a_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_N:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P)");
						setLoadValues(load, load_values, "magnitude", "count_n", "distance_a", "distance_b, distance_a_is_defined_as_relative, distance_b_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_2x2:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P)");
						setLoadValues(load, load_values, "magnitude", "distance_a", "distance_b", "distance_c", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative", "distance_c_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_2:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P1)");
						setLoadValues(load, load_values, "magnitude_1", "distance_a", "magnitude_2", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_CONCENTRATED_VARYING:
					case member_loads.LOAD_DISTRIBUTION_VARYING:
					case member_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
						ASSERT(load_values.length % 2 == 0, "Wrong number of load values");
						for (var i = 0; i < load_values.length; i+=2)
						{
							load.varying_load_parameters[i / 2 + 1].magnitude = load_values[i];
							load.varying_load_parameters[i / 2 + 1].distance = load_values[i + 1];
						}
						break;
					case member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
						ASSERT(load_values.length >= 2, "Wrong number of load values, at least two values are required (P1, B)");
						setLoadValues(load, load_values, "magnitude_1", "distance_b", "magnitude_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_TAPERED:
						ASSERT(load_values.length >= 2, "Wrong number of load values, at least two values are required (P1, P2)");
						setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_PARABOLIC:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (P1 or P2 or P3)");
						setLoadValues(load, load_values, "magnitude_1", "magnitude_2", "magnitude_3");
						break;
					default:
						showLoadAssert(load_type, load_distribution);
				}
				break;
			case member_loads.E_TYPE_MASS:
				ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (M)");
				ASSERT(load_distribution == LOAD_DISTRIBUTION_UNIFORM, "Mass load has only uniform distribution");
				setLoadValues(load, load_values, "mass_global");
				break;
			case member_loads.LOAD_TYPE_TEMPERATURE:
				switch (load_distribution)
				{
					case member_loads.LOAD_DISTRIBUTION_UNIFORM:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (Tt or Tb)");
						setLoadValues(load, load_values, "magnitude_t_t", "magnitude_t_b");
						break;
					case member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
						ASSERT(load_values.length >= 2, "Wrong number of load values, at least two values is required (Tt1, B)");
						setLoadValues(load, load_values, "magnitude_t_t_1", "distance_b", "magnitude_t_b_1", "magnitude_t_t_2", "magnitude_t_b_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_TAPERED:
						setLoadValues(load, load_values, "magnitude_t_t_1", "magnitude_t_b_1", "magnitude_t_t_2", "magnitude_t_b_1", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_PARABOLIC:
						setLoadValues(load, load_values, "magnitude_t_t_1", "magnitude_t_b_1", "magnitude_t_t_2", "magnitude_t_b_2", "magnitude_t_t_3", "magnitude_t_b_3");
						break;
					case member_loads.LOAD_DISTRIBUTION_VARYING:
						ASSERT(load_values.length % 3 == 0, "Wrong number of load values");
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
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (Tc)");
						setLoadValues(load, load_values, "magnitude_t_c", "magnitude_delta_t");
						break;
					case member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL:
						ASSERT(load_values.length >= 2, "Wrong number of load values, at least two values are required (Tc1, B)");
						setLoadValues(load, load_values, "magnitude_t_c_1", "distance_b", "magnitude_delta_t_1", "magnitude_t_c_2", "magnitude_delta_t_2", "distance_a", "distance_b_is_defined_as_relative", "distance_a_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_TAPERED:
						setLoadValues(load, load_values, "magnitude_t_c_1", "magnitude_delta_t_1", "magnitude_t_c_2", "magnitude_delta_t_2", "distance_a", "distance_b", "distance_a_is_defined_as_relative", "distance_b_is_defined_as_relative");
						break;
					case member_loads.LOAD_DISTRIBUTION_PARABOLIC:
						ASSERT(load_values.length >= 1, "Wrong number of load values, at least one value is required (Tc1 or Tc2 or Tc3)");
						setLoadValues(load, load_values, "magnitude_t_c_1", "magnitude_delta_t_1", "magnitude_t_c_2", "magnitude_delta_t_2", "magnitude_t_c_3", "magnitude_delta_t_3");
						break;
					case member_loads.LOAD_DISTRIBUTION_VARYING:
						ASSERT(load_values.length % 3 == 0, "Wrong number of load values");
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
				ASSERT(load_distribution == LOAD_DISTRIBUTION_UNIFORM, "Load has only uniform distribution");
				if (load_type == member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT)
				{
					ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (Δl)");
				}
				else if (load_type == member_loads.LOAD_TYPE_INITIAL_PRESTRESS)
				{
					ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (V)");
				}
				else if (load_type == member_loads.LOAD_TYPE_PIPE_CONTENT_FULL)
				{
					ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (γ)");
				}
				else if (load_type == member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL)
				{
					ASSERT(load_values.length == 2, "Wrong number of load values, two values are required (γ, d)");
				}
				else
				{
					ASSERT(load_type == member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE);
					ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (p)");
				}
				if (load_type != member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL)
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
	}
	
	/**
	 * Creates member force load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Force = function(no,
						  load_case,
						  members,
						  load_distribution,
						  load_values,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member moment load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Moment = function(no,
						   load_case,
						   members,
						   load_distribution,
						   load_values,
						   load_direction,
						   comment,
						   params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_MOMENT, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member mass load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Mass = function(no,
						 load_case,
						 members,
						 load_value,
						 comment,
						 params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.E_TYPE_MASS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member temperature load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Temperature = function(no,
								load_case,
								members,
								load_distribution,
								load_values,
								load_direction,
								comment,
								params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member temperature change load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.TemperatureChange = function(no,
									  load_case,
									  members,
									  load_distribution,
									  load_values,
									  load_direction,
									  comment,
									  params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_TEMPERATURE_CHANGE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member axial strain load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.AxialStrain = function(no,
								load_case,
								members,
								load_distribution,
								load_values,
								comment,
								params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates member axial displacement load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.AxialDisplacement = function(no,
									  load_case,
									  members,
									  load_value,
									  comment,
									  params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member precamber load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Precamber = function(no,
							  load_case,
							  members,
							  load_distribution,
							  load_values,
							  load_direction,
							  comment,
							  params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_PRECAMBER, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member initial prestress load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.InitialPrestress = function(no,
									 load_case,
									 members,
									 load_value,
									 comment,
									 params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_INITIAL_PRESTRESS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member displacement load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Displacement = function(no,
								 load_case,
								 members,
								 load_distribution,
								 load_values,
								 load_direction,
								 comment,
								 params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_DISPLACEMENT, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member rotation load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.Rotation = function(no,
							 load_case,
							 members,
							 load_distribution,
							 load_values,
							 load_direction,
							 comment,
							 params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_ROTATION, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member content full load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_value			Uniform load value
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.PipeContentFull = function(no,
									load_case,
								    members,
								    load_value,
								    load_direction,
								    comment,
								    params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_CONTENT_FULL, undefined, [load_value]);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member pipe content partial load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Array}		load_values			Load values for Uniform distribution
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.PipeContentPartial = function(no,
									   load_case,
									   members,
									   load_values,
									   load_direction,
									   comment,
									   params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL, undefined, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates member pipe internal pressure load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.PipeInternalPressure = function(no,
										 load_case,
									     members,
									     load_value,
									     comment,
									     params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member rotary motion load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_values			Load values (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created member force load
	*/
	this.RotaryMotion = function(no,
								 load_case,
								 members,
								 load_values,
								 comment,
								 params)
	{
		this.load = createBaseLoad("Member_Load", no, load_case, members, comment, params);
		this.load = setLoadDistribution(this.load, member_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);
		
		return this.load;
	}

	/**
	* Sets option for reference to list of members
	* @param 	{Boolean}	value	When undefined, true as default
	*/
	this.reference_to_list_of_members = function(value)
	{
		ASSERT(this.load.load_type != member_loads.E_TYPE_MASS && this.load.load_type != member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT &&
				this.load.load_type != member_loads.LOAD_TYPE_INITIAL_PRESTRESS && this.load.load_type != member_loads.LOAD_TYPE_PIPE_CONTENT_FULL &&
				this.load.load_type != member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL && this.load.load_type != member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE &&
				this.load.load_type != member_loads.LOAD_TYPE_ROTARY_MOTION, "Reference to list of members cannot be set for this type of load");

		if (typeof value == "undefined")
		{
			value = true;
		}
		this.load.reference_to_list_of_members = value;
	}
	
	/**
	* Sets option for refer distance to the member end
	* @param 	{Boolean}	value	When undefined, true as default
	*/
	this.refer_distance_member_end = function(value)
	{
		ASSERT(this.load.load_distribution != member_loads.LOAD_DISTRIBUTION_UNIFORM && this.load.load_distribution != member_loads.LOAD_DISTRIBUTION_UNIFORM_TOTAL &&
				this.load.load_distribution != member_loads.LOAD_DISTRIBUTION_VARYING_IN_Z, "Refer distance to the member end cannot be set for this type of load distribution");

		if (typeof value == "undefined")
		{
			value = true;
		}
		
		this.load.distance_from_member_end = value;
	}
	
	/**
	* Sets option for load over total length of member (only for trapezoidal load distribution)
	* @param	{Boolean}	value	When undefined, true as default
	*/
	this.load_over_member = function(value)
	{
		ASSERT(this.load.load_distribution == member_loads.LOAD_DISTRIBUTION_TRAPEZOIDAL, "Load over total length of member can be set only for trapezoidal load distribution");
		
		if (typeof value == "undefined")
		{
			value = true;
		}
		
		this.load.distance_a_is_defined_as_relative = value;
		this.load.distance_b_is_defined_as_relative = value;
		this.load.distance_a_relative = 0;
		this.load.distance_b_relative = 1;
		this.load.load_is_over_total_length = value;
	}

	/**
	* Sets eccentricity (only force load)
	* @param 	{String}	reference_to			Eccentricity is reffered to what ("left_top", "center_top", "right_top", "left_center", "center_center", "right_center",
	*												"left_bottom", "center_bottom", "right_bottom", "center_of_gravity", "shear_center")
	* @param	{Number}	offset_member_start_ey	Offset at member start, can be undefined
	* @param	{Number}	offset_member_start_ez	Offset at member start, can be undefined
	* @param	{Number}	offset_member_end_ey	Offset at member end, can be undefined
	* @param	{Number}	offset_member_end_ez	Offset at member end, can be undefined
	*/
	this.eccentricity = function(reference_to, offset_member_start_ey, offset_member_start_ez, offset_member_end_ey, offset_member_end_ez)
	{
		ASSERT(this.load.load_type == member_loads.LOAD_TYPE_FORCE, "Eccentericity can be set only for force load type");
		
		if (arguments.length == 0)
		{
			this.load.has_force_eccentricity = false;
			return;
		}
		
		this.load.has_force_eccentricity = true;
		
		if (reference_to != "center_of_gravity" && reference_to != "shear_center")
		{
			var params = reference_to.split("_");
			ASSERT(params.length == 2, "Wrong reference string");
			var horizontal = params[0];
			var vertical = params[1];
			this.load.eccentricity_horizontal_alignment = horizontal.charAt(0).toUpperCase() + horizontal.slice(1);
			this.load.eccentricity_vertical_alignment = vertical.charAt(0).toUpperCase() + vertical.slice(1);
		}
		else if (reference_to == " center_of_gravity")
		{
			this.load.eccentricity_section_middle = member_loads.LOAD_ECCENTRICITY_SECTION_MIDDLE_CENTER_OF_GRAVITY;
		}
		else if (reference_to == "shear_center")
		{
			this.load.is_eccentricity_at_end_different_from_start = true;
			this.load.eccentricity_section_middle = member_loads.LOAD_ECCENTRICITY_SECTION_MIDDLE_SHEAR_CENTER;
		}
		else
		{
			ASSERT(false, "Unknown type of eccentricity (" + reference_to + ")");
		}
		
		if (typeof offset_member_start_ey != "undefined")
		{
			this.load.is_eccentricity_at_end_different_from_start = false;
			this.load.eccentricity_y_at_start = offset_member_start_ey;
		}
		
		if (typeof offset_member_start_ez != "undefined")
		{
			this.load.is_eccentricity_at_end_different_from_start = false;
			this.load.eccentricity_z_at_start = offset_member_start_ez;
		}
		
		if (typeof offset_member_end_ey != "undefined")
		{
			this.load.is_eccentricity_at_end_different_from_start = true;
			this.load.eccentricity_y_at_end = offset_member_end_ey;
		}
		
		if (typeof offset_member_end_ez != "undefined")
		{
			this.load.is_eccentricity_at_end_different_from_start = true;
			this.load.eccentricity_z_at_end = offset_member_end_ez;
		}
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
		ASSERT(this.load.load_type == member_loads.E_TYPE_MASS, "Can be set only for mass load type");
	
		if (arguments.length == 0)
		{
			this.load.individual_mass_components = false;
			return;
		}
		
		this.load.individual_mass_components = true;
		
		if (typeof MX != "undefined")
		{
			this.load.mass_x = MX;
		}
		
		if (typeof MY != "undefined")
		{
			this.load.mass_y = MY;
		}
		
		if (typeof MZ != "undefined")
		{
			this.load.mass_z = MZ;
		}
	}
}