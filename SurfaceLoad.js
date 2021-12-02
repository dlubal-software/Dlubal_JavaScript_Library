include("BaseLoad.js");

/**
* Creates non valid empty surface load
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
	if (arguments.length != 0)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		return this.load;
	}
	
	/**
	* Assignes values to load depend of load type and load distribution (private)
	* @param  {String}	load_type			Load type
	* @param  {String}	load_distribution	Load distribution, can be undefined
	* @param  {Array}	load_values			Load values depend on load type and load distribution
	*										- (load type / load distribution: [valid values])
	*										- "Force" / "Uniform": [p]
	*										- "Force" / "Linear": [Node1, Node2, Node3, p1, p2, p3]
	*										- "Force: / "Linear in X": [Node1, Node2, p1, p2]
	*										- "Force" / "Linear in Y": [Node1, Node2, p1, p2]
	*										- "Force" / "Linear in Z": [Node1, Node2, p1, p2]
	*										- "Force" / "Radial": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
	*														   	  [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")
	*										- "Force" / "Varying in Z": [p1, z1, p2, z2 ... pn, zn]
	*										- "Temperature" / "Uniform": [Tc, ΔT]
	*										- "Temperature" / "Linear": [Node1, Node2, Node3, Tc1, Tc2, Tc3, ΔT1, ΔT2, ΔT3]
	*										- "Temperature" / "Linear in X": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
	*										- "Temperature" / "Linear in Y": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
	*										- "Temperature" / "Linear in Z": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
	*										- "Temperature" / "Radial": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
	*														   	  		[axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")
	*										- "Axial Strain" / "Uniform": [εx, εy]
	*										- "Axial Strain" / "Linear": [Node1, Node2, Node3, ε1x, ε1y, ε2x, ε2y, ε3x, ε3y]
	*										- "Axial Strain" / "Linear in X": [Node1, Node2, ε1x, ε1y, ε2x, ε2y]
	*										- "Axial Strain" / "Linear in Y": [Node1, Node2, ε1x, ε1y, ε2x, ε2y]
	*										- "Axial Strain" / "Linear in Z": [Node1, Node2, ε1x, ε1y, ε2x, ε2y]
	*										- "Precamber" / "Uniform": [κ]
	*										- "Rotary Motion": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
	*														   [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")
	*										- "Mass" / "Uniform": [M]
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
		
		var TWO_POINTS = 1;
		var POINT_AND_PARALLEL = 2;
		
		switch (load_type)
		{
			case surface_loads.LOAD_TYPE_FORCE:
				switch (load_distribution)
				{
					case surface_loads.LOAD_DISTRIBUTION_UNIFORM:
						ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (p)");
						setLoadValues(load, load_values, "uniform_magnitude");
						break;
					case surface_loads.LOAD_DISTRIBUTION_LINEAR:
						ASSERT(load_values.length >=4, "Wrong number of load values, at least four values are required (Node1, Node2, Node3, p1)");
						setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_1", "magnitude_2", "magnitude_3");
						break;
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
						ASSERT(load_values.length >=3, "Wrong number of load values, at least three values are required (Node1, Node2, p1)");
						setLoadValues(load, load_values, "node_1", "node_2", "magnitude_1", "magnitude_2");
						break;
					case surface_loads.LOAD_DISTRIBUTION_RADIAL:
						ASSERT(load_values.length >= 6, "Wrong number of load values, at least six values are required (type of axes definition, p1, p2, Node1, Node2, [Node1] | XA)");
						load.axis_definition_type = load_values[0] == 1 ? member_loads.AXIS_DEFINITION_TWO_POINTS : member_loads.AXIS_DEFINITION_POINT_AND_AXIS;
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
							if (load_values[0] == TWO_POINTS && load_values[5].length == 2)
							{
								node = nodes.getNthObject(load_values[5][1]);
								load.axis_definition_p2 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
							}
							
							// load_values = [axis_definition, ω, α, [Node1], parallel_axis]
							if (load_values[0] == POINT_AND_PARALLEL && load_values.length >= 7)
							{
								// Parallel axis is defined
								setAxis(load, load_values[6]);
							}
						}
						else // Axis coordinations are defined by points and its coordinations
						{
							// Sixth parameter is x-coordinate of point A
							ASSERT(load_values.length >= 8, "Wrong number of load values, at least six values are required (axes definition, p1, p2, Node1, Node2, XA, YA, ZA)");
							load.axis_definition_p1 = $V(load_values[5], load_values[6], load_values[7]);
							
							if (load_values[0] == TWO_POINTS && load_values.length > 8)
							{
								// Coordinates of second axis point is defined
								ASSERT(load_values.length == 11, "Wrong number of parameters, nine values are required (axis definition, p1, p2, Node1, Node2, XA, YA, ZA, XB, YB, ZB)");
								load.axis_definition_p2 = $V(load_values[8], load_values[9], load_values[10]);
							}
							
							// load_values = [axis_definition, p1, p2, Node1, Node2, XA, YA, ZA, parallel_axis]
							if (load_values[0] == POINT_AND_PARALLEL && load_values.length >= 9)
							{
								// Parallel axis is defined
								setAxis(load, load_values[8]);
							}
						}
					case surface_loads.LOAD_DISTRIBUTION_VARYING_IN_Z:
						ASSERT(load_values.length % 2 == 0, "Wrong number of load values");
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
						ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (Tc)");
						setLoadValues(load, load_values, "uniform_magnitude_t_c", "uniform_magnitude_delta_t");
						break;
					case surface_loads.LOAD_DISTRIBUTION_LINEAR:
						ASSERT(load_values.length >=4, "Wrong number of load values, at least four values are required (Node1, Node2, Node3, Tc1)");
						setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_t_c_1", "magnitude_t_c_2", "magnitude_t_c_3", "magnitude_delta_t_1", "magnitude_delta_t_2", "magnitude_delta_t_3");
						break;
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
						ASSERT(load_values.length >=3, "Wrong number of load values, at least three values are required (Node1, Node2, Tc1)");
						setLoadValues(load, load_values, "node_1", "node_2", "magnitude_t_c_1", "magnitude_t_c_2", "magnitude_delta_t_1", "magnitude_delta_t_2");
						break;
					case surface_loads.LOAD_DISTRIBUTION_RADIAL:
						ASSERT(load_values.length >= 8, "Wrong number of load values, at least eight values are required (type of axes definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, [Node1] | XA)");
						load.axis_definition_type = load_values[0] == 1 ? member_loads.AXIS_DEFINITION_TWO_POINTS : member_loads.AXIS_DEFINITION_POINT_AND_AXIS;
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
							if (load_values[0] == TWO_POINTS && load_values[7].length == 2)
							{
								node = nodes.getNthObject(load_values[7][1]);
								load.axis_definition_p2 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
							}
							
							// load_values = [axis_definition, ω, α, [Node1], parallel_axis]
							if (load_values[0] == POINT_AND_PARALLEL && load_values.length >= 9)
							{
								// Parallel axis is defined
								setAxis(load, load_values[8]);
							}
						}
						else // Axis coordinations are defined by points and its coordinations
						{
							// Sixth parameter is x-coordinate of point A
							ASSERT(load_values.length >= 10, "Wrong number of load values, at least ten values are required (axes definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, XA, YA, ZA)");
							load.axis_definition_p1 = $V(load_values[7], load_values[8], load_values[9]);
							
							if (load_values[0] == TWO_POINTS && load_values.length > 10)
							{
								// Coordinates of second axis point is defined
								ASSERT(load_values.length == 13, "Wrong number of parameters, thirteen values are required (axis definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, XA, YA, ZA, XB, YB, ZB)");
								load.axis_definition_p2 = $V(load_values[10], load_values[11], load_values[12]);
							}
							
							// load_values = [axis_definition, p1, p2, Node1, Node2, XA, YA, ZA, parallel_axis]
							if (load_values[0] == POINT_AND_PARALLEL && load_values.length >= 11)
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
						ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (εx)");
						setLoadValues(load, load_values, "magnitude_axial_strain_1x", "magnitude_axial_strain_1y");
						break;
					case surface_loads.LOAD_DISTRIBUTION_LINEAR:
						ASSERT(load_values.length >=5, "Wrong number of load values, at least five values are required (Node1, Node2, Node3, ε1x, ε1y)");
						setLoadValues(load, load_values, "node_1", "node_2", "node_3", "magnitude_axial_strain_1x", "magnitude_axial_strain_1y", "magnitude_axial_strain_2x", "magnitude_axial_strain_2y", "magnitude_axial_strain_3x", "magnitude_axial_strain_3y");
						break;
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_X:
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Y:
					case surface_loads.LOAD_DISTRIBUTION_LINEAR_IN_Z:
						ASSERT(load_values.length >=4, "Wrong number of load values, at least four values are required (Node1, Node2, ε1x, ε1y)");
						setLoadValues(load, load_values, "node_1", "node_2", "magnitude_axial_strain_1x", "magnitude_axial_strain_1y", "magnitude_axial_strain_2x", "magnitude_axial_strain_2y");
						break;
					default:
						showLoadAssert(load_type, load_distribution);
				}
				break;
			case surface_loads.LOAD_TYPE_PRECAMBER:
				// Only Uniform
				ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (κ)");
				setLoadValues(load, load_values, "uniform_magnitude");
				break;
			case surface_loads.LOAD_TYPE_ROTARY_MOTION:
				ASSERT(load_values.length >= 4, "Wrong number of load values, at least four values are required (type of axes definition, ω, α, [Node1] | XA)");
				load.axis_definition_type = load_values[0] == 1 ? member_loads.AXIS_DEFINITION_TWO_POINTS : member_loads.AXIS_DEFINITION_POINT_AND_AXIS;
				load.angular_velocity = load_values[1];
				load.angular_acceleration = load_values[2];
				var TWO_POINTS = 1;
				var POINT_AND_PARALLEL = 2;
				if (Array.isArray(load_values[3])) // Axis coordinations are defined by list of nodes
				{
					// Fourth parameter is list of nodes
					ASSERT(load_values[3].length >= 1, "Wrong number of defined nodes, at least one is required");
					var node = nodes.getNthObject(load_values[3][0]);
					load.axis_definition_p1 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
					
					// If axis definition is "Two points" and there are two axis coordinations
					if (load_values[0] == TWO_POINTS && load_values[3].length == 2)
					{
						node = nodes.getNthObject(load_values[3][1]);
						load.axis_definition_p2 = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
					}
					
					// load_values = [axis_definition, ω, α, [Node1], parallel_axis]
					if (load_values[0] == POINT_AND_PARALLEL && load_values.length >= 5)
					{
						// Parallel axis is defined
						setAxisAndOrientation(load, load_values[4]);
					}
				}
				else // Axis coordinations are defined by points and its coordinations
				{
					// Fourth parameter is x-coordinate of point A - "Two Points" are defined by coordinates of A or A and B points
					ASSERT(load_values.length >= 6, "Wrong number of load values, at least six values are required (axes definition, ω, α, XA, YA, ZA)");
					load.axis_definition_p1 = $V(load_values[3], load_values[4], load_values[5]);
					
					if (load_values[0] == TWO_POINTS && load_values.length > 6)
					{
						// Coordinates of second axis point is defined
						ASSERT(load_values.length == 9, "Wrong number of parameters, nine values are required (axis definition, ω, α, XA, YA, ZA, XB, YB, ZB)");
						load.axis_definition_p2 = $V(load_values[6], load_values[7], load_values[8]);
					}
					
					// load_values = [axis_definition, ω, α, XA, YA, ZA, parallel_axis]
					if (load_values[0] == POINT_AND_PARALLEL && load_values.length >= 7)
					{
						// Parallel axis is defined
						setAxisAndOrientation(load, load_values[6]);
					}
				}
				break;
			case surface_loads.LOAD_TYPE_MASS:
				ASSERT(load_values.length == 1, "Wrong number of load values, one value is required (M)");
				setLoadValues(load, load_values, "magnitude_mass_global");
				break;
			default:
				showLoadAssert(load_type);
		}
		
		return load;
	}
	
	/**
	* Sets axis and orientation for rotary motion load type
	* @param 	{Object}	load	Load
	* @param	{String}	value	Parallel axis (X, Y, Z)
	* @return	{Boolean}	True if axis and orientation was succesfully set
	*/
	var setAxis = function(load,
						   value)
	{
		if (value.length == 1 && value.match("[X|Y|Z]") != null)
		{
			load.axis_definition_axis = value.substring(0, 1);
			
			return true;
		}
		
		return false;
	}
	
	/**
	 * Creates surface force load
	 * @param 	{Number}	no					Index of surface load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of surface indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param 	{String}	load_direction		Load direction, can be undefined
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface force load
	*/
	this.Force = function(no,
						  load_case,
						  surfaces,
						  load_distribution,
						  load_values,
						  load_direction,
						  comment,
						  params)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		this.load = setLoadDistribution(this.load, surface_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
		if (typeof load_direction != "undefined")
		{
			this.load.load_direction = load_direction;
		}
		
		return this.load;
	}
	
	/**
	 * Creates surface temperature load
	 * @param 	{Number}	no					Index of surface load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of surface indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface force load
	*/
	this.Temperature = function(no,
								load_case,
								surfaces,
								load_distribution,
								load_values,
								comment,
								params)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		this.load = setLoadDistribution(this.load, surface_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates surface axial strain load
	 * @param 	{Number}	no					Index of surface load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of surface indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface force load
	*/
	this.AxialStrain = function(no,
								load_case,
								surfaces,
								load_distribution,
								load_values,
								comment,
								params)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		this.load = setLoadDistribution(this.load, surface_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates surface precamber load
	 * @param 	{Number}	no					Index of surface load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of surface indexes
	 * @param	{Array}		load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface force load
	*/
	this.Precamber = function(no,
							  load_case,
							  surfaces,
							  load_value,
							  comment,
							  params)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		this.load = setLoadDistribution(this.load, surface_loads.LOAD_TYPE_PRECAMBER, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates surface rotary motion load
	 * @param 	{Number}	no					Index of surface load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of surface indexes
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setLoadDistribution function)
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface force load
	*/
	this.RotaryMotion = function(no,
								 load_case,
								 surfaces,
								 load_values,
								 comment,
								 params)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		this.load = setLoadDistribution(this.load, surface_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);
		
		return this.load;
	}
	
	/**
	 * Creates surface mass load
	 * @param 	{Number}	no					Index of surface load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of surface indexes
	 * @param	{Array}		load_value			Uniform load value
	 * @param	{String}	comment				Comment, can be undefined
	 * @param	{Object}	params				Load parameters, can be undefined
	 * @return	{Object}	Created surface force load
	*/
	this.Mass = function(no,
						 load_case,
						 surfaces,
						 load_value,
						 comment,
						 params)
	{
		this.load = createBaseLoad("Surface_Load", no, load_case, surfaces, comment, params);
		this.load = setLoadDistribution(this.load, surface_loads.LOAD_TYPE_MASS, undefined, [load_value]);
		
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
		ASSERT(this.load.load_type == surface_loads.LOAD_TYPE_MASS, "Can be set only for mass load type");
	
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