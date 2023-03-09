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
function Member(no,
	node_ids,
	comment,
	params) {

	if (arguments.length !== 0) {
		node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
		ASSERT(node_ids.length > 1, "Minimum two nodes must be set to Member");
		this.member = "undefined";
		if (RFEM) {
			var line = engine.create_line(no, node_ids);
			this.member = engine.create_member(no, line);
		}
		else {
			this.member = engine.create_member(no, node_ids[0], node_ids[1]);
		}
		set_comment_and_parameters(this.member, comment, params);
		return this.member;
	}
}

/**
 * @returns Member's number
 */
Member.prototype.GetNo = function () {
	return this.member.no;
};

/**
 * @returns Member object
 */
Member.prototype.GetMember = function () {
	return this.member;
};

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
 * Creates surface model member
 * @param	{Number}		no				Index of member, can be undefined
 * @param	{Array/Number}	nodes_or_line	List of node indexes or number of line
 * @param	{Number}		section_start	Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param	{Number}		material_no		Material number
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Member's parameters, can be undefined
 * @returns	Created member
 */
Member.prototype.SurfaceModel = function (no,
	nodes_or_line,
	section_start,
	material_no,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_SURFACE_MODEL, section_start, comment, params);
	ASSERT(typeof material_no !== "undefined", "Material number of Surface model member must be defined");
	if (materials.exist(material_no)) {
		this.member.section_material = material_no;
	}
	else {
		console.log("Material no. " + material_no + " doesn't exist");
	}
};

/**
* Create result beam member
* @param	{Number}		no											Index of member, can be undefined
* @param	{Array/Number}	nodes_or_line								List of node indexes or number of line
* @param	{Number}		section_start								Section start. Section end is same as section start by default. To set section end specify distribution type.
* @param	{String} 		result_beam_integrate_stresses_and_forces	Stresses and forces type, can be undefined:
*																			INTEGRATE_WITHIN_CUBOID_QUADRATIC
*																			INTEGRATE_WITHIN_CUBOID_GENERAL
*																			INTEGRATE_WITHIN_CYLINDER
*																			INTEGRATE_FROM_LISTED_OBJECT
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
	if (RFEM) {
		this.member = createBaseMember(no, nodes_or_line, members.TYPE_RESULT_BEAM, section_start, comment, params);
		if (typeof result_beam_integrate_stresses_and_forces !== "undefined") {
			switch (result_beam_integrate_stresses_and_forces) {
				case "INTEGRATE_WITHIN_CUBOID_QUADRATIC":	// Integrate stresses and forces within block with square base
					this.member.result_beam_integrate_stresses_and_forces = GetResultBeamIntegrationType(result_beam_integrate_stresses_and_forces);
					if (typeof result_beam_parameters !== "undefined") {
						ASSERT(result_beam_parameters.length === 1, "Dimension parameter is required: [Yz]");
						this.member.result_beam_y_z = result_beam_parameters[0];
					}
					break;
				case "INTEGRATE_WITHIN_CUBOID_GENERAL":		// Integrate stresses and forces within cuboid
					this.member.result_beam_integrate_stresses_and_forces = GetResultBeamIntegrationType(result_beam_integrate_stresses_and_forces);
					if (typeof result_beam_parameters !== "undefined") {
						ASSERT(result_beam_parameters.length === 4, "Four parameters are required: [Y+, Y-, Z+, Z-]");
						this.member.result_beam_y_plus = result_beam_parameters[0];
						this.member.result_beam_y_minus = result_beam_parameters[1];
						this.member.result_beam_z_plus = result_beam_parameters[2];
						this.member.result_beam_z_minus = result_beam_parameters[3];
					}
					break;
				case "INTEGRATE_WITHIN_CYLINDER":		// Integrate stresses and forces within cylinder
					this.member.result_beam_integrate_stresses_and_forces = GetResultBeamIntegrationType(result_beam_integrate_stresses_and_forces);
					if (typeof result_beam_parameters !== "undefined") {
						ASSERT(result_beam_parameters.length === 1, "Radius parameter is required: [R]");
						this.member.result_beam_radius = result_beam_parameters[0];
					}
					break;
				case "INTEGRATE_FROM_LISTED_OBJECT":		// Integrate stresses and forces from listed objects
					this.member.result_beam_integrate_stresses_and_forces = GetResultBeamIntegrationType(result_beam_integrate_stresses_and_forces);
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
	}
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
	return this.member;
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
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_RIGID_RIGID, undefined, comment, params);
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
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_RIGID_HINGE, undefined, comment, params);
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
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_HINGE_RIGID, undefined, comment, params);
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
	return this.member = createBaseMember(no, nodes_or_line, members.TYPE_COUPLING_HINGE_HINGE, undefined, comment, params);
};

/**
 *
 * @param {Array/Number} nodes_or_line	List of node indexes or number of line
 * @param {Number} no	Index of member, can be undefined
 * @param {Number} section_start Section start. Section end is same as section start by default. To set section end specify distribution type.
 * @param {String} rib_alignment Alignment of rib - "ALIGNMENT_ON_Z_SIDE_NEGATIVE","ALIGNMENT_CENTRIC","ALIGNMENT_ON_Z_SIDE_POSITIVE","ALIGNMENT_USER_DEFINED_VIA_MEMBER_ECCENTRICITY"
 * @param {Boolean} surface_assignment_autodetect
 * @param {Boolean} align_axes
 * @param {Array} flange_dimensions - two dimensional array each row could have form [end_ordinate,reference_length_definition_type,reference_length_width,width_minus_y_maximal,width_plus_y_maximal,reference_length,width_minus_y_integrative,width_plus_y_integrative]
 * @param {Array} surfaces
 * @param {String} comment
 * @param {Object} params
 * @returns object Rib
 */
Member.prototype.Rib = function (no,
	nodes_or_line,
	section_start,
	rib_alignment,
	surface_assignment_autodetect,
	align_axes,
	flange_dimensions,
	surfaces,
	comment,
	params) {
	this.member = createBaseMember(no, nodes_or_line, members.TYPE_RIB, section_start, comment, params);

	this.member.member_type_rib_alignment = GetRibAlignmentType(rib_alignment);
	this.member.member_rib_surface_assignment_autodetect = surface_assignment_autodetect;
	this.member.align_local_z_axis_to_local_z_axis_of_surface = align_axes;

	SetFlangeDimensions(this.member, flange_dimensions);

	if (surfaces !== undefined) {
		if (surfaces[0] !== undefined && typeof surfaces[1] === 'number') {
			this.member.member_rib_first_surface = surfaces[0];
		}
		if (surfaces[1] !== undefined && typeof surfaces[1] === 'number') {
			this.member.member_rib_second_surface = surfaces[1];
		}
	}
	return this.member;
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
};

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
};

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
};

/**
* Sets uniform section distribution
*/
Member.prototype.SectionDistributionUniform = function () {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_UNIFORM;
};

/**
 * Sets linear distribution
 * @param {Number} section_start Number of section at start of member
 * @param {Number} section_end Number of section at end of member
 * @param {String} section_alignment section_alignment	Section alignment (Top, Centric, Bottom), can be undefined (centric as default)
 */
Member.prototype.SectionDistributionLinear = function (section_start, section_end, section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_LINEAR;
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

/**
* Sets tapered at both sides distribution
* @param {Number} 	section_start Number of section at start of member
* @param {Number} 	section_internal Number of section at internal point of member (between start and end)
* @param {Number} 	section_end Number of section at end of member
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_distance_from_start	Member distance ([distance, is_relative]), can be undefined
* @param {Array}	section_distance_from_end	Member distance ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/
Member.prototype.SectionDistributionTaperedAtBothSides = function (section_start, section_internal, section_end, reference_type,
	section_distance_from_start,
	section_distance_from_end,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_TAPERED_AT_BOTH_SIDES;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtStart(this.member, section_distance_from_start);
	setDistributionAtEnd(this.member, section_distance_from_end);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_internal !== "undefined") {
		ASSERT(sections.exist(section_internal), "Section no. " + section_internal + " doesn't exist");
		this.member.section_internal = sections[section_internal];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}

};

/**
* Sets tapered at start distribution
* @param {Number} section_start Number of section at start of member
* @param {Number} section_end Number of section at end of member
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_distance_from_start	Member distance ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/
Member.prototype.SectionDistributionTaperedAtStart = function (section_start, section_end, reference_type,
	section_distance_from_start,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_TAPERED_AT_START_OF_MEMBER;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtStart(this.member, section_distance_from_start);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

/**
* Sets tapered at end distribution
* @param {Number} section_start Number of section at start of member
* @param {Number} section_end Number of section at end of member
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_distance_from_end	Member distance ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/
Member.prototype.SectionDistributionTaperedAtEnd = function (section_start, section_end, reference_type,
	section_distance_from_end,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_TAPERED_AT_END_OF_MEMBER;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtEnd(this.member, section_distance_from_end);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

/**
* Sets saddle distribution
* @param {Number} 	section_start Number of section at start of member
* @param {Number} 	section_internal Number of section at internal point of member (between start and end)
* @param {Number} 	section_end Number of section at end of member
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_distance_from_start	Member distance ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/
Member.prototype.SectionDistributionSaddle = function (section_start, section_internal, section_end, reference_type,
	section_distance_from_start,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_SADDLE;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtStart(this.member, section_distance_from_start);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_internal !== "undefined") {
		ASSERT(sections.exist(section_internal), "Section no. " + section_internal + " doesn't exist");
		this.member.section_internal = sections[section_internal];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

/**
* Sets offset at both sides distribution
* @param {Number} 	section_start Number of section at start of member
* @param {Number} 	section_internal Number of section at internal point of member (between start and end)
* @param {Number} 	section_end Number of section at end of member
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_offset_from_start	Member offset ([distance, is_relative]), can be undefined
* @param {Array}	section_offset_from_end		Member offset ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/
Member.prototype.SectionDistributionOffsetAtBothSides = function (section_start, section_internal, section_end, reference_type,
	section_offset_from_start,
	section_offset_from_end,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_OFFSET_AT_BOTH_SIDES;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtStart(this.member, section_offset_from_start);
	setDistributionAtEnd(this.member, section_offset_from_end);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_internal !== "undefined") {
		ASSERT(sections.exist(section_internal), "Section no. " + section_internal + " doesn't exist");
		this.member.section_internal = sections[section_internal];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

/**
* Sets offset at start distribution
* @param {Number} section_start Number of section at start of member
* @param {Number} section_end Number of section at end of member
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_offset_from_start	Member offset ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/

Member.prototype.SectionDistributionOffsetAtStart = function (section_start, section_end, reference_type,
	section_offset_from_start,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_OFFSET_AT_START_OF_MEMBER;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtStart(this.member, section_offset_from_start);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

/**
* Sets offset at end distribution
* @param {String}	reference_type				Reference type (L, XY, XZ), can be undefined
* @param {Array}	section_offset_from_end		Member offset ([distance, is_relative]), can be undefined
* @param {String}	section_alignment			Section alignment (Top, Centric, Bottom), can be undefined (top as default)
*/
Member.prototype.SectionDistributionOffsetAtEnd = function (section_start, section_end, reference_type,
	section_offset_from_end,
	section_alignment) {
	this.member.section_distribution_type = members.SECTION_DISTRIBUTION_TYPE_OFFSET_AT_END_OF_MEMBER;
	if (typeof reference_type !== "undefined") {
		this.member.reference_type = reference_type;
	}
	setDistributionAtEnd(this.member, section_offset_from_end);
	if (typeof section_alignment !== "undefined") {
		this.member.section_alignment = GetMemberSectionAlignment(section_alignment);
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		this.member.section_start = sections[section_start];
	}
	if (typeof section_end !== "undefined") {
		ASSERT(sections.exist(section_end), "Section no. " + section_end + " doesn't exist");
		this.member.section_end = sections[section_end];
	}
};

Member.prototype.GetNo = function () {
	return this.member.no;
};

Member.prototype.GetMember = function () {
	return this.member;
};

/**
* Support function for section distributions (private), more info can be find there
*/
var setDistributionAtStart = function (member,
	atStartValues) {
	if (typeof atStartValues !== "undefined") {
		ASSERT(atStartValues.length === 2, "Section distance from start: [distance, is_relative]");
		member.section_distance_from_start_is_defined_as_relative = atStartValues[1];
		if (member.section_distance_from_start_is_defined_as_relative) {
			member.section_distance_from_start_relative = atStartValues[0];
		}
		else {
			member.section_distance_from_start_absolute = atStartValues[0];
		}
	}
};

/**
* Support function for section distributions (private), more info can be find there
*/
var setDistributionAtEnd = function (member,
	atEndValues) {
	if (typeof atEndValues !== "undefined") {
		ASSERT(atEndValues.length == 2, "Section distance from end: [distance, is_relative]");
		member.section_distance_from_end_is_defined_as_relative = atEndValues[1];
		if (member.section_distance_from_end_is_defined_as_relative) {
			member.section_distance_from_end_relative = atEndValues[0];
		}
		else {
			member.section_distance_from_end_absolute = atEndValues[0];
		}
	}
};

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
	var member = undefined;
	if (RFEM) {
		if (Array.isArray(nodes_or_line)) {
			// Member is defined by line created from defined nodes
			var line = engine.create_line(no, nodes_or_line);
			member = engine.create_member(no, line);
		}
		else {
			// Member is defined by line
			member = engine.create_member(no, nodes_or_line);
		}
	}
	else {
		// Member is defined by two nodes
		member = engine.create_member(no, nodes_or_line[0], nodes_or_line[1]);
	}
	if (typeof type !== "undefined") {
		member.type = type;
	}
	if (typeof section_start !== "undefined") {
		ASSERT(sections.exist(section_start), "Section no. " + section_start + " doesn't exist");
		member.section_start = sections[section_start];
	}
	set_comment_and_parameters(member, comment, params);

	return member;
};

function GetResultBeamIntegrationType(direction) {


	const ResultBeamIntegrate_dict = {
		"INTEGRATE_WITHIN_CUBOID_QUADRATIC": members.INTEGRATE_WITHIN_CUBOID_QUADRATIC,
		"INTEGRATE_WITHIN_CUBOID_GENERAL": members.INTEGRATE_WITHIN_CUBOID_GENERAL,
		"INTEGRATE_WITHIN_CYLINDER": members.INTEGRATE_WITHIN_CYLINDER,
		"INTEGRATE_FROM_LISTED_OBJECT": members.INTEGRATE_FROM_LISTED_OBJECT,
	};

	if (direction !== undefined) {
		var ResultBeamIntegrate = ResultBeamIntegrate_dict[direction];
		if (ResultBeamIntegrate === undefined) {
			console.log("Wrong type of result beam integration type. Value was: " + direction);
			console.log("Correct values are: ( " + Object.keys(direction_dict) + ")");
			direction = members.INTEGRATE_WITHIN_CUBOID_QUADRATIC;
		}
		return ResultBeamIntegrate;
	}
	else {
		return members.INTEGRATE_WITHIN_CUBOID_QUADRATIC;
	}
}


function GetRibAlignmentType(alignment) {


	const Alignment_dict = {
		"ALIGNMENT_ON_Z_SIDE_NEGATIVE": members.ALIGNMENT_ON_Z_SIDE_NEGATIVE,
		"ALIGNMENT_CENTRIC": members.ALIGNMENT_CENTRIC,
		"ALIGNMENT_ON_Z_SIDE_POSITIVE": members.ALIGNMENT_ON_Z_SIDE_POSITIVE,
		"ALIGNMENT_USER_DEFINED_VIA_MEMBER_ECCENTRICITY": members.ALIGNMENT_USER_DEFINED_VIA_MEMBER_ECCENTRICITY,
	};

	if (alignment !== undefined) {
		var RibAlignment = Alignment_dict[alignment];
		if (RibAlignment === undefined) {
			console.log("Wrong type of rib alignment type. Value was: " + alignment);
			console.log("Correct values are: ( " + Object.keys(Alignment_dict) + ")");
			direction = members.ALIGNMENT_ON_Z_SIDE_POSITIVE;
		}
		return RibAlignment;
	}
	else {
		return members.ALIGNMENT_ON_Z_SIDE_POSITIVE;
	}
}

function GetReferenceLengthType(referenceLength) {


	const referenceLength_dict = {
		"REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH": members.REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH,
		"REFERENCE_LENGTH_TYPE_MEMBER_LENGTH": members.REFERENCE_LENGTH_TYPE_MEMBER_LENGTH,
		"REFERENCE_LENGTH_TYPE_USER_DEFINED": members.REFERENCE_LENGTH_TYPE_USER_DEFINED,
	};

	if (referenceLength !== undefined) {
		var ReferenceLength = referenceLength_dict[referenceLength];
		if (ReferenceLength === undefined) {
			console.log("Wrong type of reference length type. Value was: " + referenceLength);
			console.log("Correct values are: ( " + Object.keys(referenceLength_dict) + ")");
			direction = members.REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH;
		}
		return ReferenceLength;
	}
	else {
		return members.REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH;
	}
}

function GetReferenceWidthType(width) {


	const widthType_dict = {
		"REFERENCE_LENGTH_WIDTH_NONE": members.REFERENCE_LENGTH_WIDTH_NONE,
		"REFERENCE_LENGTH_WIDTH_SIXTH": members.REFERENCE_LENGTH_WIDTH_SIXTH,
		"REFERENCE_LENGTH_WIDTH_EIGHTH": members.REFERENCE_LENGTH_WIDTH_EIGHTH,
		"REFERENCE_LENGTH_WIDTH_EC2": members.REFERENCE_LENGTH_WIDTH_EC2,
	};

	if (width !== undefined) {
		var WidthType = widthType_dict[width];
		if (WidthType === undefined) {
			console.log("Wrong type of reference width type. Value was: " + width);
			console.log("Correct values are: ( " + Object.keys(widthType_dict) + ")");
			direction = members.REFERENCE_LENGTH_WIDTH_SIXTH;
		}
		return WidthType;
	}
	else {
		return members.REFERENCE_LENGTH_WIDTH_SIXTH;
	}
}

function SetFlangeDimensions(member, flange_dimensions) {

	if (flange_dimensions !== undefined) {

		for (var index = 0; index < flange_dimensions.length; index++) {
			const row = flange_dimensions[index];
			member.flange_dimensions[index + 1].end_ordinate = row[0];
			member.flange_dimensions[index + 1].reference_length_width = GetReferenceWidthType(row[2]);
			member.flange_dimensions[index + 1].width_minus_y_maximal = row[3];
			member.flange_dimensions[index + 1].width_plus_y_maximal = row[4];
			if (member.flange_dimensions[index + 1].reference_length_width !== members.REFERENCE_LENGTH_WIDTH_NONE) {
				member.flange_dimensions[index + 1].reference_length_definition_type = GetReferenceLengthType(row[1]);
				if (member.flange_dimensions[index + 1].reference_length_definition_type === members.REFERENCE_LENGTH_TYPE_USER_DEFINED) {
					if (row[5] !== undefined && typeof row[5] === 'number') {
						member.flange_dimensions[index + 1].reference_length = row[5];
					}
				}
			} else {
				if (row[6] !== undefined && typeof row[6] === 'number') {
					member.flange_dimensions[index + 1].width_minus_y_integrative = row[6];
				}
				if (row[7] !== undefined && typeof row[7] === 'number') {
					member.flange_dimensions[index + 1].width_plus_y_integrative = row[7];
				}
			}
		}
	}
	else {
		member.flange_dimensions[1].end_ordinate = 1.0;
		member.flange_dimensions[1].reference_length_definition_type = GetReferenceLengthType("REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH");
		member.flange_dimensions[1].reference_length_width = GetReferenceWidthType("REFERENCE_LENGTH_WIDTH_SIXTH");
		member.flange_dimensions[1].width_minus_y_maximal = 3.0;
		member.flange_dimensions[1].width_plus_y_maximal = 3.0;
	}
}

function GetMemberSectionAlignment(section_alignment) {
	const section_alignments_dict = {
        "TOP": members.SECTION_ALIGNMENT_TOP,
		"CENTRIC": members.SECTION_ALIGNMENT_CENTRIC,
		"BOTTOM": members.SECTION_ALIGNMENT_BOTTOM
	};

	if (section_alignment === "ALIGN_CENTER") {
		section_alignment = "ALIGN_MIDDLE";
	}

	if (section_alignment !== undefined) {
	  var alignment = section_alignments_dict[section_alignment];
	  if (alignment === undefined) {
		console.log("Wrong alignment type. Value was: " + section_alignment);
		console.log("Correct values are: ( " + Object.keys(section_alignments_dict) + ")");
		alignment = members.SECTION_ALIGNMENT_TOP;
	  }
	  return alignment;
	}
	else {
	  return members.SECTION_ALIGNMENT_TOP;
	}
}
