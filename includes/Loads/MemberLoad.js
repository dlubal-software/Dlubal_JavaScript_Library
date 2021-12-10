include("BaseLoad.js");

/**
* Creates member load
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
	 * Creates member force load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_FORCE, load_distribution, load_values);
		
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
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_MOMENT, load_distribution, load_values);
		
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
		this.load = setMemberLoadDistribution(this.load, member_loads.E_TYPE_MASS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member temperature load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);
		
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
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_TEMPERATURE_CHANGE, load_distribution, load_values);
		
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
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);
		
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_AXIAL_DISPLACEMENT, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member precamber load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PRECAMBER, load_distribution, load_values);
		
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_INITIAL_PRESTRESS, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member displacement load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param 	{String}	load_distribution	Load distribution
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_DISPLACEMENT, load_distribution, load_values);
		
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
	 * @param	{Array}		load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_ROTATION, load_distribution, load_values);
		
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_CONTENT_FULL, undefined, [load_value]);
		
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_CONTENT_PARTIAL, undefined, load_values);
		
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_PIPE_INTERNAL_PRESSURE, undefined, [load_value]);
		
		return this.load;
	}
	
	/**
	 * Creates member rotary motion load
	 * @param 	{Number}	no					Index of member load, can be undefined
	 * @param 	{Object}	load_case			Load case
	 * @param 	{Array}		members				List of member indexes
	 * @param	{Number}	load_values			Load values depend on load distribution (for more information look at setMemberLoadDistribution function)
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
		this.load = setMemberLoadDistribution(this.load, member_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);
		
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