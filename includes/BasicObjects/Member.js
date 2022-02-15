/**
 * Creates member
 * @class
 * @constructor
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
function Member (no,
    nodes_or_line,
    comment,
    params) {
    if (arguments.length !== 0) {
		return this.member = createBaseMember(no, nodes_or_line, members.TYPE_BEAM, undefined, comment, params);
    }
}

/**
 * Creates beam member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Beam = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_BEAM, section_start, comment, params);
};

/**
 * Creates rigid member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Rigid = function (no,
	nodes_or_line,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_RIGID, undefined, comment, params);
};

/**
 * Creates truss member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Truss = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_TRUSS, section_start, comment, params);
};

/**
 * Creates truss (only N) member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.TrussOnlyN = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_TRUSS_ONLY_N, section_start, comment, params);
};

/**
 * Creates tension member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Tension = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_TENSION, section_start, comment, params);
};

/**
 * Creates compression member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Compression = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_COMPRESSION, section_start, comment, params);
};

/**
 * Creates buckling member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Buckling = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_BUCKLING, section_start, comment, params);
};

/**
 * Creates cable member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.Cable = function (no,
	nodes_or_line,
	section_start,
	comment,
	params) {
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_CABLE, section_start, comment, params);
};

/**
* Create result beam member
* @param	{Number}		no											Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line								List of node indexes or number of line
* @param	{Number}		section_start								Section start. Section end is same as section start by default. To set section end specify distribution type.
* @param	{Number} 		result_beam_integrate_stresses_and_forces	Stresses and forces type, can be undefined:
*																			1 - Integrate stresses and forces within block with square area
*																			2 - Integrate stresses and forces within cuboid
*																			3 - Integrate stresses and forces within cylinder
*																			4 - Integrate stresses and forces from listed objects
* @param	{Array}			result_beam_parameters						Result beam parameters, can be undefined
*																			1 - [Yz]
*																			2 - [Y+, Y-, Z+, Z-]
*																			3 - [R]
*																			4 - undefined
* @param	{Array}			included_objects							Included surfaces, members and solids, can be undefined ([true, [1, 2], true]: true = all objects, array of indexes = only specified objects)
* @param	{Array}			excluded_objects							Excluded surfaces, members and solids, can be undefined ([undefined, [1, 2], undefined]: array of indexes = only specified objects)
* @param	{String}		comment										Comment, can be undefined
* @param	{Object}		params  									Member's parameters, can be undefined
* @returns	Created member
*/
Member.prototype.ResultBeam = function (no,
	nodes_or_line,
	section_start,
	result_beam_integrate_stresses_and_forces,
	result_beam_parameters,
	included_objects,
	excluded_objects,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_RESULT_BEAM, section_start, comment, params);
	if (typeof result_beam_integrate_stresses_and_forces !== "undefined") {
		switch (result_beam_integrate_stresses_and_forces)
		{
			case 1:		// Integrate stresses and forces within block with square area
				this.member.result_beam_integrate_stresses_and_forces = members.INTEGRATE_WITHIN_CUBOID_QUADRATIC;
				if (typeof result_beam_parameters !== "undefined") {
					ASSERT(result_beam_parameters.length === 1, "Dimension parameter is required: [Yz]");
					this.member.result_beam_y_z = result_beam_parameters[0];
				}
				break;
			case 2:		// Integrate stresses and forces within cuboid
				this.member.result_beam_integrate_stresses_and_forces = members.INTEGRATE_WITHIN_CUBOID_GENERAL;
				if (typeof result_beam_parameters !== "undefined") {
					ASSERT(result_beam_parameters.length === 4, "Four parameters are required: [Y+, Y-, Z+, Z-]");
					this.member.result_beam_y_plus = result_beam_parameters[0];
					this.member.result_beam_y_minus = result_beam_parameters[1];
					this.member.result_beam_z_plus = result_beam_parameters[2];
					this.member.result_beam_z_minus = result_beam_parameters[3];
				}
				break;
			case 3:		// Integrate stresses and forces within cylinder
				this.member.result_beam_integrate_stresses_and_forces = members.INTEGRATE_WITHIN_CYLINDER;
				if (typeof result_beam_parameters !== "undefined") {
					ASSERT(result_beam_parameters.length === 1, "Radius parameter is required: [R]");
					this.member.result_beam_radius = result_beam_parameters[0];
				}
				break;
			case 4:		// Integrate stresses and forces from listed objects
				this.member.result_beam_integrate_stresses_and_forces = members.INTEGRATE_FROM_LISTED_OBJECT;
				break;
			default:
				ASSERT(false, "Unknown stresses and forces type");
		}
	}
	if (typeof included_objects !== "undefined") {
		ASSERT(included_objects.length === 3, "Three parameters are required");
		setResultBeamObjects(this.member, "result_beam_include_all_surfaces", "result_beam_include_surfaces", included_objects[0]);
		setResultBeamObjects(this.member, "result_beam_include_all_members", "result_beam_include_members", included_objects[1]);
		setResultBeamObjects(this.member, "result_beam_include_all_solids", "result_beam_include_solids", included_objects[2]);
	}
	if (typeof excluded_objects !== "undefined") {
		ASSERT(excluded_objects.length === 3, "Three parameters are required");
		setResultBeamObjects(this.member, undefined, "result_beam_exclude_surfaces", excluded_objects[0]);
		setResultBeamObjects(this.member, undefined, "result_beam_exclude_members", excluded_objects[1]);
		setResultBeamObjects(this.member, undefined, "result_beam_exclude_solids", excluded_objects[2]);
	}
	return this.member;
};

/**
* Create definable stiffness member
* @param	{Number}		no					Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line		List of node indexes or number of line
* @param	{Number}		definable_stiffness	Definable stiffness
* @param	{String}		comment				Comment, can be undefined
* @param	{Object}		params  			Member's parameters, can be undefined
* @return 	Created definable stiffness member
*/
Member.prototype.DefinableStiffness = function (no,
	nodes_or_line,
	definable_stiffness,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_DEFINABLE_STIFFNESS, undefined, comment, params);
	ASSERT(member_definable_stiffnesses.exist(definable_stiffness), "Member definable stiffness no. " + definable_stiffness + " doesn't exist");
	this.member.member_type_definable_stiffness = member_definable_stiffnesses[definable_stiffness];
};

/**
* Create coupling rigid-rigid member
* @param	{Number}		no					Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line		List of node indexes or number of line
* @param	{String}		comment				Comment, can be undefined
* @param	{Object}		params  			Member's parameters, can be undefined
* @return 	Created coupling rigid-rigid member
*/
Member.prototype.CouplingRigidRigid = function (no,
	nodes_or_line,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_RIGID_RIGID, undefined, comment, params);
};

/**
* Create coupling rigid-hinge member
* @param	{Number}		no					Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line		List of node indexes or number of line
* @param	{String}		comment				Comment, can be undefined
* @param	{Object}		params  			Member's parameters, can be undefined
* @return 	Created coupling rigid-hinge member
*/
Member.prototype.CouplingRigidHinge = function (no,
	nodes_or_line,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_RIGID_HINGE, undefined, comment, params);
};

/**
* Create coupling hinge-rigid member
* @param	{Number}		no					Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line		List of node indexes or number of line
* @param	{String}		comment				Comment, can be undefined
* @param	{Object}		params  			Member's parameters, can be undefined
* @return 	Created coupling hinge-rigid member
*/
Member.prototype.CouplingHingeRigid = function (no,
	nodes_or_line,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_HINGE_RIGID, undefined, comment, params);
};

/**
* Create coupling hinge-hinge member
* @param	{Number}		no					Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line		List of node indexes or number of line
* @param	{String}		comment				Comment, can be undefined
* @param	{Object}		params  			Member's parameters, can be undefined
* @return 	Created coupling hinge-hinge member
*/
Member.prototype.CouplingHingeHinge = function (no,
	nodes_or_line,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_HINGE_HINGE, undefined, comment, params);
};

/**
* Sets nodes on member
* @param	{Array}		values	Nodes on member values in format [[node_1, reference_1, from_start_1, from_end1_1] ... [node_n, reference_n, from_start_n, from_end_1]]
*/
Member.prototype.NodesOnMember = function (values) {
	for (var i = 0; i < values.length; ++i) {
		ASSERT(values[i].length === 4, "Values has to be set in this format: [[node_1, reference_1, from_start_1, from_end1_1] ... [node_n, reference_n, from_start_n, from_end_1]]");
		if (typeof values[i][0] !== "undefined") {
			this.member.nodes_on_member_assignment[i + 1].node = values[i][0];
		}
		this.member.nodes_on_member_assignment[i + 1].reference = values[i][1];
		this.member.nodes_on_member_assignment[i + 1].fromStart = values[i][2];
		this.member.nodes_on_member_assignment[i + 1].fromEnd = values[i][3];
	}
};

/**
* Sets member start and/or member end hinges
* @param	{Number}	member_start_hinge	Member hinge object id at member start, can be undefined
* @param	{Number}	member_end_hinge	Member hinge object id at member end, can be undefined
*/
Member.prototype.Hinges = function (member_start_hinge,
	member_end_hinge) {
	ASSERT(this.member.type === members.TYPE_BEAM || this.member.type === members.TYPE_RIGID || this.member.type === members.TYPE_RIB || this.member.type === members.TYPE_DEFINABLE_STIFFNESS, "Hinges cannot be set for this type of member");
	if (typeof member_start_hinge !== "undefined") {
		ASSERT(member_hinges.exist(member_start_hinge), "Member hinge no. " + member_start_hinge + " doesn't exist");
		this.member.member_hinge_start = member_hinges[member_start_hinge];
	}
	if (typeof member_end_hinge !== "undefined") {
		ASSERT(member_hinges.exist(member_end_hinge), "Member hinge no. " + member_end_hinge + " doesn't exist");
		this.member.member_hinge_end = member_hinges[member_end_hinge];
	}
}

/**
* Sets member start and/or member end eccentricities
* @param	{Number}	member_start_eccentricity	Member eccentricity object id at member start, can be undefined
* @param	{Number}	member_end_eccentricity		Member eccentricity object id at member end, can be undefined
*/
Member.prototype.Eccentricities = function (member_start_eccentricity,
	member_end_eccentricity) {
	ASSERT(this.member.type === members.TYPE_BEAM || this.member.type === members.TYPE_RIGID || this.member.type === members.TYPE_TRUSS || this.member.type === members.TYPE_TRUSS_ONLY_N ||
		this.member.type === members.TYPE_TENSION || this.member.type === members.TYPE_COMPRESSION || this.member.type === members.TYPE_BUCKLING ||
		this.member.type === members.TYPE_DEFINABLE_STIFFNESS, "Eccentricity cannot be set for this type of member");
	if (typeof member_start_eccentricity !== "undefined") {
		ASSERT(member_eccentricities.exist(member_start_eccentricity), "Member eccentricity no. " + member_start_eccentricity + " doesn't exist");
		this.member.member_eccentricity_start = member_eccentricities[member_start_eccentricity];
	}
	if (typeof member_end_eccentricity !== "undefined") {
		ASSERT(member_eccentricities.exist(member_end_eccentricity), "Member eccentricity no. " + member_end_eccentricity + " doesn't exist");
		this.member.member_eccentricity_end = member_eccentricities[member_end_eccentricity];
	}
};

/**
* Sets member supports
* @param	{Number}	member_support	Member supports object id
*/
Member.prototype.Supports = function (member_support) {
	ASSERT(this.member.type === members.TYPE_BEAM || this.member.type === members.TYPE_RIGID || this.member.type === members.TYPE_RIB, "Support cannot be set to this type of member");
	ASSERT(typeof member_support !== "undefined");
	ASSERT(member_supports.exist(member_support), "Member support no. " + member_support + " doesn't exist");
	this.member.support = member_supports[member_support];
};

/**
* Sets member nonlinearity
* @param	{Number}	member_nonlinearity	Member nonlinearity object id
*/
Member.prototype.Nonlinearity = function (member_nonlinearity) {
	ASSERT(this.member.type === members.TYPE_BEAM || this.member.type === members.TYPE_RIGID || this.member.type === members.TYPE_TRUSS || this.member.type === members.TYPE_TRUSS_ONLY_N ||
		this.member.type === members.TYPE_DEFINABLE_STIFFNESS, "Nonlinearity cannot be set for this type of member");
	ASSERT(typeof member_nonlinearity !== "undefined");
	ASSERT(member_nonlinearities.exist(member_nonlinearity), "Member nonlinearity no. " + member_nonlinearity + " doesn't exist");
	this.member.member_nonlinearity = member_nonlinearities[member_nonlinearity];
};

/**
* @param	{Number}	member_result_intermediate_point	member result intermediate point object id
*/
Member.prototype.ResultIntermediatePoints = function (member_result_intermediate_point) {
	ASSERT(this.member.type === members.TYPE_BEAM || this.member.type === members.TYPE_RIGID || this.member.type === members.TYPE_RIB || this.member.type === members.TYPE_RESULT_BEAM ||
		this.member.type === members.TYPE_DEFINABLE_STIFFNESS, "Result intermediate points cannot be set for this type of member");
	ASSERT(typeof member_result_intermediate_points !== "undefined");
	ASSERT(member_result_intermediate_points.exist(member_result_intermediate_point), "Result intermediate points no. " + member_result_intermediate_points + " doesn't exist");
	this.member.member_result_intermediate_point = member_result_intermediate_point;
}

/**
* Sets member start and/or member end extensions
* @param	{Array}		member_start	Member start values, can be undefined ([Δi, αi,y, αi,z])
* @param	{Array}		member_end		Member end values, can be undefined ([Δj, αj,y, αj,z])
*/
Member.prototype.EndModifications = function (member_start,
	member_end) {
	ASSERT(this.member.type === members.TYPE_BEAM || this.member.type === members.TYPE_RIB || this.member.type === members.TYPE_TRUSS || this.member.type === members.TYPE_TRUSS_ONLY_N ||
		this.member.type === members.TYPE_TENSION || this.member.type === members.TYPE_COMPRESSION || this.member.type === members.TYPE_BUCKLING || this.member.type === members.TYPE_CABLE ||
		this.member.type === members.TYPE_RESULT_BEAM, "End modification cannot be set for this type of member");
	if (typeof member_start !== "undefined") {
		ASSERT(member_start.length === 3, "Member start requires three values: [Δi, αi,y, αi,z]");
		this.member.end_modifications_member_start_extension = member_start[0];
		this.member.end_modifications_member_start_slope_y = member_start[1];
		this.member.end_modifications_member_start_slope_z = member_start[2];
	}
	if (typeof member_end !== "undefined") {
		ASSERT(member_end.length === 3, "Member end extension requires three values: [Δj, αj,y, αj,z]");
		this.member.end_modifications_member_end_extension = member_end[0];
		this.member.end_modifications_member_end_slope_y = member_end[1];
		this.member.end_modifications_member_end_slope_z = member_end[2];
	}
};

Member.prototype.DeactivateForCalculation = function (deactivate) {
	if (typeof deactivate === "undefined") {
		deactivate = true;
	}
	this.member.is_deactivated_for_calculation = deactivate;
}

/**
* Sets result beam objects
* @param	{Object}		member			Member to be set
* @param	{String}		param1_to_set	Name of parameter for include/exclude "all" objects
* @param	{String}		param2_to_set	Name of parameter for include/exclude object's indexes
* @param	{Boolean/Array}	value			Value can be specified in two formats, as boolean or array with numbers
* @return	Modified member	
*/
var setResultBeamObjects = function (member,
	param1_to_set,
	param2_to_set,
	value) {
	if (typeof value === "boolean") {
		member[param1_to_set] = value;
	}
	else if (typeof value !== "undefined") {
		ASSERT(Array.isArray(value), "It must be specified true or indexes of included objects");
		if (typeof param1_to_set !== "undefined") {
			member[param1_to_set] = false;
		}
		member[param2_to_set] = value;
	}
};

/**
 * Creates member (private)
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{String}		type			Type of member, can be undefined
 * @param	{Number}		section_start	Section start, can be undefined. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
var createBaseMember = function (no,
	nodes_or_line,
	type,
	section_start,
	comment,
	params) {
	ASSERT(typeof nodes_or_line !== "undefined", "Nodes or line must be defined");
	
	if (Array.isArray(nodes_or_line)) {
		// Member is defined by nodes
		if (RFEM) {
			// Member will be defined by line with defined nodes
			ASSERT(nodes_or_line.length >= 2, "At least two nodes must be set as member's defined nodes");
		}
		else {
			// RSTAB has no lines, therefore member will be defined by two nodes
			ASSERT(nodes_or_line.length === 2, "Two nodes must be set as member's defined nodes");
		}
	}
	else {
		ASSERT(RFEM, "Member can be defined by line only with RFEM");
	}

	if (RFEM) {
		if (Array.isArray(nodes_or_line)) {
			// Member is defined by line created from defined nodes
			var line = engine.create_line(no, nodes_or_line);
			var member = engine.create_member(no, line);
		}
		else {
			// Member is defined by line
			var member = engine.create_member(no, nodes_or_line);
		}
	}
	else {
		// Member is defined by two nodes
		var member = engine.create_member(no, nodes_or_line[0], nodes_or_line[1]);
	}
	
	member.type = type;
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		member.section_start = sections[section_start];
	}
	set_comment_and_parameters(member, comment, params);
	
	return member;
};