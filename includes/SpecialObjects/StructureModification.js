/**
Support for object deactivation (with object selection) is prepared, but for now it seems there is no javascript support for object selections.
 */

/**
 * Creates member
 * @class
 * @constructor
 * @param	{Number}		no				Index of structure modification, can be undefined
 * @param	{String}		comment			Comment, can be undefined
 * @param	{Object}		params  		Structure modification's parameters, can be undefined
 * @returns	Created structure modification
 */
function StructureModification (no,
	comment,
	params) {
	this.structure_modification = structure_modifications.create();
	set_comment_and_parameters(this.structure_modification, comment, params);
}

/**
 * Modification of material
 * @param {String}	material_name		Name of material
 * @param {String} 	modification_type	Type of modification ("Multiplier factor", "Division factor"), can be undefined (Multiplier factor as default)
 * @param {Number}	factor_for_e_and_g	Factor for E and G, can be undefined (1.00 by default)
 * @param {String}	comment				Comment, can be undefined
 */
StructureModification.prototype.Material = function (material_name,
	modification_type,
	factor_for_e_and_g,
	comment) {
	this.structure_modification.modify_stiffnesses_materials = true;
	var table = this.structure_modification.modify_stiffnesses_material_table;
	for (var row = 1; row <= table.row_count(); ++row) {
		if (table[row].material_name.name === material_name) {
			if (typeof modification_type !== "undefined") {
				table[row].modification_type = modification_type;
			}
			if (typeof factor_for_e_and_g !== "undefined") {
				table[row].E_and_G = factor_for_e_and_g;
			}
			if (typeof comment !== "undefined") {
				table[row].comment = comment;
			}
			return;
		}
	}
	console.log("Material " + material_name + " doesn't exist in model");
};

/**
 * Modification of section
 * @param {String}	section_name 				Name of section
 * @param {Number}	sectional_areas_factor_a 	Sectional areas factor A, can be undefined (1.00 by default)
 * @param {Number}	sectional_areas_factor_a_y 	Sectional areas factor Ay, can be undefined (1.00 by default)
 * @param {Number} 	sectional_areas_factor_a_z	Sectional areas factor Az, can be undefined (1.00 by default)
 * @param {Number}	moment_of_inertia_fator_j	Moment of inertia factor J, can be undefined (1.00 by default)
 * @param {Number}	moment_of_inertia_fator_i_y	Moment of inertia factor Iy, can be undefined (1.00 by default)
 * @param {Number}	moment_of_inertia_fator_i_z	Moment of inertia factor Iz, can be undefined (1.00 by default)
 */
StructureModification.prototype.Section = function (section_name,
	sectional_areas_factor_a,
	sectional_areas_factor_a_y,
	sectional_areas_factor_a_z,
	moment_of_inertia_fator_j,
	moment_of_inertia_fator_i_y,
	moment_of_inertia_fator_i_z) {
	this.structure_modification.modify_stiffnesses_sections = true;
	var table = this.structure_modification.modify_stiffnesses_section_table;
	for (var row = 1; row <= table.row_count(); ++row) {
		if (table[row].section_name === section_name) {
			if (typeof sectional_areas_factor_a !== "undefined") {
				table[row].A = sectional_areas_factor_a;
			}
			if (typeof sectional_areas_factor_a_y !== "undefined") {
				table[row].A_y = sectional_areas_factor_a_y;
			}
			if (typeof sectional_areas_factor_a_z !== "undefined") {
				table[row].A_z = sectional_areas_factor_a_z;
			}
			if (typeof moment_of_inertia_fator_j !== "undefined") {
				table[row].J = moment_of_inertia_fator_j;
			}
			if (typeof moment_of_inertia_fator_i_y !== "undefined") {
				table[row].I_y = moment_of_inertia_fator_i_y;
			}
			if (typeof moment_of_inertia_fator_i_z !== "undefined") {
				table[row].I_z = moment_of_inertia_fator_i_z;
			}
			return;
		};
	}
	console.log("Section " + section_name + " doesn't exist in model");
};

/**
 * Modification of members
 * @param {Object} 	member_stiffness_modification 	Member stiffness modification
 * @param {Array} 	members 						List of members indexes
 * @param {String} 	comment 						Comment, can be undefined, can be undefined
 */
StructureModification.prototype.Members = function (member_stiffness_modification,
	members,
	comment) {
	ASSERT(typeof member_stiffness_modification !== "undefined", "Member stiffness modification must be specified");
	ASSERT(typeof members !== "undefined", "Member(s) must be specified");
	this.structure_modification.modify_stiffnesses_members = true;
	var row = this.structure_modification.modify_stiffnesses_member_table.row_count();
	this.structure_modification.modify_stiffnesses_member_table[row].member_modification = member_stiffness_modification;
	this.structure_modification.modify_stiffnesses_member_table[row].members = members.join();
	if (typeof comment !== "undefined") {
		this.structure_modification.modify_stiffnesses_member_table[row].comment = comment;
	}
};

/**
 * Modification of surfaces
 * @param {Object} 	surface_stiffness_modification 	Surface stiffness modification
 * @param {Array}	surfaces						List of surfaces indexes
 * @param {String}	comment 						Comment, can be undefined
 */
StructureModification.prototype.Surfaces = function (surface_stiffness_modification,
	surfaces,
	comment) {
	ASSERT(typeof surface_stiffness_modification !== "undefined", "Surface stiffness modification must be defined");
	ASSERT(typeof surfaces !== "undefined", "Surface(s) must  be defined");
	this.structure_modification.modify_stiffnesses_surfaces = true;
	var row = this.structure_modification.modify_stiffnesses_surface_table.row_count();
	this.structure_modification.modify_stiffnesses_surface_table[row].surface_modification = surface_stiffness_modification;
	this.structure_modification.modify_stiffnesses_surface_table[row].surfaces = surfaces.join();
	if (typeof comment !== "undefined") {
		this.structure_modification.modify_stiffnesses_surface_table[row].comment = comment;
	}
};

/**
 * Modification of member hinges
 * @param {Number}	member_no					Member index
 * @param {String}	member_side 				Member hinge side (start, end)
 * @param {Number}	translational_factor_u_x	Translational spring constant Cu,x, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_y 	Translational spring constant Cu,y, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_z 	Translational spring constant Cu,z, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_x 	Rotational spring constant Cφ,x, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_y 	Rotational spring constant Cφ,y, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_z 	Rotational spring constant Cφ,z, can be undefined (1.00 by default)
 */
StructureModification.prototype.MemberHinges = function (member_no,
	member_side,
	translational_factor_u_x,
	translational_factor_u_y,
	translational_factor_u_z,
	rotational_factor_phi_x,
	rotational_factor_phi_y,
	rotational_factor_phi_z) {
	ASSERT(typeof member_no !== "undefined", "Member with hinge must be specified");
	ASSERT(typeof member_side !== "undefined", "Member side must be specified");
	this.structure_modification.modify_stiffnesses_member_hinges = true;
	var membersWithHinges = getMembersWithHinges();
	ASSERT(membersWithHinges.length === this.structure_modification.modify_stiffnesses_member_hinges_table.row_count(), "StructureModification.prototype.MemberHinges");

	var row = -1;
	for (var i = 0; i < membersWithHinges.length; ++i) {
		if (member_no === membersWithHinges[i][0] && member_side.toLowerCase() === membersWithHinges[i][1].toLowerCase()) {
			row = i + 1;
			var memberHinge = membersWithHinges[i][2];
		}
	}

	if (row != -1) {
		var tableToSet = this.structure_modification.modify_stiffnesses_member_hinges_table;
		setTableValue(translational_factor_u_x, tableToSet, "C_u_x", row, memberHinge.axial_release_n, "Member hinge no. " + memberHinge.no + " has no translational spring constant Cu,x specified, parameter is disabled.");
		setTableValue(translational_factor_u_y, tableToSet, "C_u_y", row, memberHinge.axial_release_vy, "Member hinge no. " + memberHinge.no + " has no translational spring constant Cu,y specified, parameter is disabled.");
		setTableValue(translational_factor_u_z, tableToSet, "C_u_z", row, memberHinge.axial_release_vz, "Member hinge no. " + memberHinge.no + " has no translational spring constant Cu,z specified, parameter is disabled.");
		setTableValue(rotational_factor_phi_x, tableToSet, "C_phi_x", row, memberHinge.moment_release_mt, "Member hinge no. " + memberHinge.no + " has no rotational spring constant Cφ,x specified, parameter is disabled.");
		setTableValue(rotational_factor_phi_y, tableToSet, "C_phi_y", row, memberHinge.moment_release_my, "Member hinge no. " + memberHinge.no + " has no rotational spring constant Cφ,y specified, parameter is disabled.");
		setTableValue(rotational_factor_phi_z, tableToSet, "C_phi_z", row, memberHinge.moment_release_mz, "Member hinge no. " + memberHinge.no + " has no rotational spring constant Cφ,z specified, parameter is disabled.");
	}
	else {
		console.log("Member no. " + member_no + "with member side '" + member_side + "' has no hinge");
	}
};

/**
 * MOdification for line hinges
 * @param {Number}	surface_no					Surface index
 * @param {Number}	line_no						Line index
 * @param {Number}	translational_factor_u_x 	Translational factor Cu,x, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_y 	Translational factor Cu,y, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_z 	Translational factor Cu,z, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_x 	Rotational factor Cφ,x, can be undefined (1.00 by default)
 */
StructureModification.prototype.LineHinges = function (surface_no,
	line_no,
	translational_factor_u_x,
	translational_factor_u_y,
	translational_factor_u_z,
	rotational_factor_phi_x) {
	ASSERT(typeof surface_no !== "undefined", "Surface index must be specified");
	ASSERT(typeof line_no !== "undefined", "Line index must be specified");
	this.structure_modification.modify_stiffnesses_line_hinges = true;
	var lineWithHinges = getLinesWithHinges();
	ASSERT(lineWithHinges.length === this.structure_modification.modify_stiffnesses_line_hinges_table.row_count(), "StructureModification.prototype.LineHinges");

	var row = -1;
	for (var i = 0; i < lineWithHinges.length; ++i) {
		if (lineWithHinges[i][0] === surface_no && lineWithHinges[i][1] === line_no) {
			row = i + 1;
			var lineHinge = lineWithHinges[i][2];
			break;
		}
	}
	if (row != -1) {
		var tableToSet = this.structure_modification.modify_stiffnesses_line_hinges_table;
		setTableValue(translational_factor_u_x, tableToSet, "C_u_x", row, lineHinge.translational_release_u_x, "Line hinge no. " + lineHinge.no + " has no translational spring constant Cu,x specified, parameter is disabled.");
		setTableValue(translational_factor_u_y, tableToSet, "C_u_y", row, lineHinge.translational_release_u_y, "Line hinge no. " + lineHinge.no + " has no translational spring constant Cu,y specified, parameter is disabled.");
		setTableValue(translational_factor_u_z, tableToSet, "C_u_z", row, lineHinge.translational_release_u_z, "Line hinge no. " + lineHinge.no + " has no translational spring constant Cu,z specified, parameter is disabled.");
		setTableValue(rotational_factor_phi_x, tableToSet, "C_phi_x", row, lineHinge.rotational_release_phi_x, "Line hinge no. " + lineHinge.no + " has no rotational spring constant Cφ,x specified, parameter is disabled.");
	}
	else {
		console.log("Line no. " + line_no + " in surface no. " + surface_no + "' has no hinge");
	}
};

/**
 * Modification of nodal supports
 * @param {Number}	node_no 				Node index
 * @param {Number}	support_factor_ux 		Support factor Cu,x, can be undefined (1.00 by default)
 * @param {Number}	support_factor_uy 		Support factor Cu,y, can be undefined (1.00 by default)
 * @param {Number}	support_factor_uz 		Support factor Cu,z, can be undefined (1.00 by default)
 * @param {Number}	restraint_factor_phi_x	Restraint factor Cφ,x, can be undefined (1.00 by default)
 * @param {Number}	restraint_factor_phi_y	Restraint factor Cφ,y, can be undefined (1.00 by default)
 * @param {Number}	restraint_factor_phi_z	Restraint factor Cφ,z, can be undefined (1.00 by default)
 */
StructureModification.prototype.NodalSupports = function (node_no,
	support_factor_ux,
	support_factor_uy,
	support_factor_uz,
	restraint_factor_phi_x,
	restraint_factor_phi_y,
	restraint_factor_phi_z) {
	ASSERT(typeof node_no !== "undefined", "Node index must be specified");

	var row = -1;
	this.structure_modification.modify_stiffnesses_nodal_supports = true;
	var nodesWithSupport = getObjectsWithSupport(nodes);
	ASSERT(nodesWithSupport.length === this.structure_modification.modify_stiffnesses_nodal_supports_table.row_count(), "StructureModification.prototype.NodalSupports");
	for (var i = 0; i < nodesWithSupport.length; ++i) {
		if (nodesWithSupport[i][0] === node_no) {
			row = i + 1;
			var nodalSupport = nodesWithSupport[i][1];
			break;
		}
	}
	if (row !== -1) {
		var tableToSet = this.structure_modification.modify_stiffnesses_nodal_supports_table;
		setTableValue(support_factor_ux, tableToSet, "C_u_X", row, nodalSupport.spring_x, "Nodal support no. " + nodalSupport.no + " has no translational spring Cu,x specified, parameter is disabled");
		setTableValue(support_factor_uy, tableToSet, "C_u_Y", row, nodalSupport.spring_y, "Nodal support no. " + nodalSupport.no + " has no translational spring Cu,y specified, parameter is disabled");
		setTableValue(support_factor_uz, tableToSet, "C_u_Z", row, nodalSupport.spring_z, "Nodal support no. " + nodalSupport.no + " has no translational spring Cu,z specified, parameter is disabled");
		setTableValue(restraint_factor_phi_x, tableToSet, "C_phi_X", row, nodalSupport.rotational_restraint_x, "Nodal support no. " + nodalSupport.no + " has no rotational spring Cφ,x specified, parameter is disabled");
		setTableValue(restraint_factor_phi_y, tableToSet, "C_phi_Y", row, nodalSupport.rotational_restraint_y, "Nodal support no. " + nodalSupport.no + " has no rotational spring Cφ,y specified, parameter is disabled");
		setTableValue(restraint_factor_phi_z, tableToSet, "C_phi_Z", row, nodalSupport.rotational_restraint_z, "Nodal support no. " + nodalSupport.no + " has no rotational spring Cφ,z specified, parameter is disabled");
	}
	else{
		console.log("Node no. " + node_no + " has no support");
	}
};

/**
 * Mofification of line supports
 * @param {Number}	line_no 					Line index
 * @param {Number}	translational_factor_u_x	Translational factor Cu,x, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_y 	Translational factor Cu,y, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_z 	Transational factor Cu,z, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_x 	Rotational factor Cφ,x, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_y 	Rotational factor Cφ,z, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_z 	Rotational factor Cφ,z, can be undefined (1.00 by default)
 */
StructureModification.prototype.LineSupports = function (line_no,
	translational_factor_u_x,
	translational_factor_u_y,
	translational_factor_u_z,
	rotational_factor_phi_x,
	rotational_factor_phi_y,
	rotational_factor_phi_z
	) {
	ASSERT(typeof line_no !== "undefined", "Line index must be specified");
	var row = -1;
	this.structure_modification.modify_stiffnesses_line_supports = true;
	var linesWithSupport = getObjectsWithSupport(lines);
	ASSERT(linesWithSupport.length === this.structure_modification.modify_stiffnesses_line_supports_table.row_count(), "StructureModification.prototype.LineSupports");
	for (var i = 0; i < linesWithSupport.length; ++i) {
		if (linesWithSupport[i][0] === line_no) {
			row = i + 1;
			var lineSupport = linesWithSupport[i][1];
			break;
		}
	}

	if (row !== -1) {
		var tableToSet = this.structure_modification.modify_stiffnesses_line_supports_table;
		setTableValue(translational_factor_u_x, tableToSet, "C_u_X", row, lineSupport.spring_x, "Line support no. " + lineSupport.no + " has no translational factor Cu,x specified, parameter is disabled");
		setTableValue(translational_factor_u_y, tableToSet, "C_u_Y", row, lineSupport.spring_y, "Line support no. " + lineSupport.no + " has no translational factor Cu,y specified, parameter is disabled");
		setTableValue(translational_factor_u_z, tableToSet, "C_u_Z", row, lineSupport.spring_z, "Line support no. " + lineSupport.no + " has no translational factor Cu,z specified, parameter is disabled");
		setTableValue(rotational_factor_phi_x, tableToSet, "C_phi_X", row, lineSupport.rotational_restraint_x, "Line support no. " + lineSupport.no + " has no rotational factor Cφ,x specified, parameter is disabled");
		setTableValue(rotational_factor_phi_y, tableToSet, "C_phi_Y", row, lineSupport.rotational_restraint_y, "Line support no. " + lineSupport.no + " has no rotational factor Cφ,y specified, parameter is disabled");
		setTableValue(rotational_factor_phi_z, tableToSet, "C_phi_Z", row, lineSupport.rotational_restraint_z, "Line support no. " + lineSupport.no + " has no rotational factor Cφ,z specified, parameter is disabled");
	}
};

/**
 * Modification of member supports
 * @param {Number}	member_no 					Member index
 * @param {Number}	translational_factor_u_x 	Translational factor Cu,x, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_y 	Translational factor Cu,y, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_z 	Translational factor Cu,z, can be undefined (1.00 by default)
 * @param {Number}	shear_factor_s_x 			Shear factor Cs,x, can be undefined (1.00 by default)
 * @param {Number}	shear_factor_s_y 			Shear factor Cs,y, can be undefined (1.00 by default)
 * @param {Number}	shear_factor_s_z 			Shear factor Cs,z, can be undefined (1.00 by default)
 * @param {Number}	rotational_factor_phi_x 	Rotational factor Cφ,x, can be undefined (1.00 by default)
 */
StructureModification.prototype.MemberSupports = function (member_no,
	translational_factor_u_x,
	translational_factor_u_y,
	translational_factor_u_z,
	shear_factor_s_x,
	shear_factor_s_y,
	shear_factor_s_z,
	rotational_factor_phi_x) {
	ASSERT(typeof member_no !== "undefined", "Member index must be specified");
	var row = -1;
	this.structure_modification.modify_stiffnesses_member_supports = true;
	var membersWithSupport = getObjectsWithSupport(members);
	ASSERT(membersWithSupport.length === this.structure_modification.modify_stiffnesses_member_supports_table.row_count(), "StructureModification.prototype.MemberSupports");
	for (var i = 0; i < membersWithSupport.length; ++i) {
		if (membersWithSupport[i][0] === member_no) {
			row = i + 1;
			var memberSupport = membersWithSupport[i][1];
			break;
		}
	}

	if (row !== -1) {
		var tableToSet = this.structure_modification.modify_stiffnesses_member_supports_table;
		setTableValue(translational_factor_u_x, tableToSet, "C_u_x", row, memberSupport.spring_translation_x, "Member support no. " + memberSupport.no + " has no translational factor Cu,x specified, parameter is disabled");
		setTableValue(translational_factor_u_y, tableToSet, "C_u_y", row, memberSupport.spring_translation_y, "Member support no. " + memberSupport.no + " has no translational factor Cu,y specified, parameter is disabled");
		setTableValue(translational_factor_u_z, tableToSet, "C_u_z", row, memberSupport.spring_translation_z, "Member support no. " + memberSupport.no + " has no translational factor Cu,z specified, parameter is disabled");
		setTableValue(shear_factor_s_x, tableToSet, "C_s_x", row, memberSupport.spring_shear_x, "Member support no. " + memberSupport.no + " has no shear factor Cs,x specified, parameter is disabled");
		setTableValue(shear_factor_s_y, tableToSet, "C_s_y", row, memberSupport.spring_shear_y, "Member support no. " + memberSupport.no + " has no shear factor Cs,y specified, parameter is disabled");
		setTableValue(shear_factor_s_z, tableToSet, "C_s_z", row, memberSupport.spring_shear_z, "Member support no. " + memberSupport.no + " has no shear factor Cs,z specified, parameter is disabled");
		setTableValue(rotational_factor_phi_x, tableToSet, "C_phi_x", row, memberSupport.spring_rotation, "Member support no. " + memberSupport.no + " has no rotational factor Cφ,x specified, parameter is disabled");
	}
};

/**
 * Modification of surface supports
 * @param {Number}	surface_no 					Surface index
 * @param {Number}	translational_factor_u_x 	Translational factor Cu,x, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_y 	Translational factor Cu,y, can be undefined (1.00 by default)
 * @param {Number}	translational_factor_u_z 	Translational factor Cu,z, can be undefined (1.00 by default)
 * @param {Number}	shear_factor_v_xz 			Shear factor Cv,xz, can be undefined (1.00 by default)
 * @param {Number}	shear_factor_v_yz 			Shear factor Cv,yz, can be undefined (1.00 by default)
 */
StructureModification.prototype.SurfaceSupports = function (surface_no,
	translational_factor_u_x,
	translational_factor_u_y,
	translational_factor_u_z,
	shear_factor_v_xz,
	shear_factor_v_yz) {
	ASSERT(typeof surface_no !== "undefined", "Surface index must be specified");
	var row = -1;
	this.structure_modification.modify_stiffnesses_surface_supports = true;
	var surfacesWithSupport = getObjectsWithSupport(surfaces);
	ASSERT(surfacesWithSupport.length === this.structure_modification.modify_stiffnesses_surface_supports_table.row_count(), "StructureModification.prototype.SurfaceSupports");
	for (var i = 0; i < surfacesWithSupport.length; ++i) {
		if (surfacesWithSupport[i][0] === surface_no) {
			row = i + 1;
			var surfaceSupport = surfacesWithSupport[i][1];
			break;
		}
	}

	if (row !== -1) {
		var tableToSet = this.structure_modification.modify_stiffnesses_surface_supports_table;
		setTableValue(translational_factor_u_x, tableToSet, "C_u_X", row, surfaceSupport.translation_x, "Surface support no. " + surfaceSupport.no + " has no translational factor Cu,x specified, parameter is disabled");
		setTableValue(translational_factor_u_y, tableToSet, "C_u_Y", row, surfaceSupport.translation_y, "Surface support no. " + surfaceSupport.no + " has no translational factor Cu,y specified, parameter is disabled");
		setTableValue(translational_factor_u_z, tableToSet, "C_u_Z", row, surfaceSupport.translation_z, "Surface support no. " + surfaceSupport.no + " has no translational factor Cu,z specified, parameter is disabled");
		setTableValue(shear_factor_v_xz, tableToSet, "C_v_xz", row, surfaceSupport.shear_xz, "Surface support no. " + surfaceSupport.no + " has no translational factor Cv,xz specified, parameter is disabled");
		setTableValue(shear_factor_v_yz, tableToSet, "C_v_yz", row, surfaceSupport.shear_yz, "Surface support no. " + surfaceSupport.no + " has no translational factor Cv,yz specified, parameter is disabled");
	}
};

/**
 * Deactiovation of objects
 * @param {Object}	members_object_selection 				Object selection with deactivated members, can be undefined  (1.00 by default)
 * @param {Object}	surfaces_object_selection 				Object selection with deactivated surfaces, can be undefined  (1.00 by default)
 * @param {Object}	solids_object_selection 				Object selection with deactivated solids, can be undefined  (1.00 by default)
 * @param {Object}	support_on_nodes_object_selection 		Object selection with deactivated nodal's supports, can be undefined  (1.00 by default)
 * @param {Object}	support_on_lines_object_selection 		Object selection with deactivated line's supports, can be undefined  (1.00 by default)
 * @param {Object}	support_on_members_object_selection		Object selection with deactivated member's supports, can be undefined  (1.00 by default)
 * @param {Object}	support_on_surfaces_object_selection 	Object selection with deactivated surfaces's supports, can be undefined  (1.00 by default)
 */
StructureModification.prototype.DeactivateObjects = function (members_object_selection,
	surfaces_object_selection,
	solids_object_selection,
	support_on_nodes_object_selection,
	support_on_lines_object_selection,
	support_on_members_object_selection,
	support_on_surfaces_object_selection) {
	if (typeof members_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_members = members_object_selection;
	}
	if (typeof surfaces_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_surfaces = surfaces_object_selection;
	}
	if (typeof solids_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_solids = solids_object_selection;
	}
	if (typeof support_on_nodes_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_support_on_nodes = support_on_nodes_object_selection;
	}
	if (typeof support_on_lines_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_support_on_lines = support_on_lines_object_selection;
	}
	if (typeof support_on_members_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_support_on_members = support_on_members_object_selection;
	}
	if (typeof support_on_surfaces_object_selection !== "undefined") {
		this.structure_modification.object_selection_for_deactivate_support_on_surfaces = support_on_surfaces_object_selection;
	}
};

/**
 * Sets member concrete reinforcement
 * @param {Boolean}	enabled 	Enabled, true if undefined
 */
StructureModification.prototype.ModifyMemberReiforcement = function (enabled) {
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.structure_modification.modify_stiffness_member_reinforcement = value;
};

/**
 * Sets surface concrete reinforcement
 * @param {Boolean}	enabled 	Enabled, true if undefined
 */
StructureModification.prototype.ModifySurfaceReiforcement = function (enabled) {
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.structure_modification.modify_stiffness_surface_reinforcement = enabled;
};

/**
 * Sets timber members due to moisture class
 * @param {Boolean}	enabled 	Enabled, true if undefined
 */
StructureModification.prototype.ModifyTimberMember = function (enabled) {
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.structure_modification.modify_stiffness_timber_members_due_moisture_class = enabled;
};

/**
 * Deactivates material nonlinearity models
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableMaterialNonlinearityModels = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_material_nonlinearity_models = disabled;
};

/**
 * Deactivates temperature dependencies
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableTemperatureDependencies = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_material_temperature_nonlinearities = disabled;
};

/**
 * Deactivates line nonlinearities - line hinges
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesLineHinges = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_line_hinges = enabled;
};

/**
 * Deactivates member nonlinearities - member types
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesMemberTypes = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_member_types = disabled;
};

/**
 * Deactivates member nonlinearities - member hinges
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesMemberHinges = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_member_hinges = disabled;
};

/**
 * Deactivates member nonlinearities
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableMemberNonlinearities = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_member_nonlinearities = disabled;
};

/**
 * Deactivates contact nonlinearities - surface contact, solid types "Contact"
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesSurfaceOrSolidContact = function(disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_solid_types_contact_or_surfaces_contact = disabled;
};

/**
 * Deactivates support nonlinearities - nodal supports
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesNodalSupports = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_nodal_supports = disabled;
};

/**
 * Deactivates support nonlinearities - line supports
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesLineSupports = function (disabled) {
	if (typeof disabled === "undefinied") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_line_supports = disabled;
};

/**
 * Deactivates support nonlinearities - member supports
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesMemberSupports = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_member_supports = disabled;
};

/**
 * Deactivates support nonlinearities - surface supports
 * @param {Boolean}	disabled 	Disabled, true if undefined
 */
StructureModification.prototype.DisableNonlinearitiesSurfaceSupports = function (disabled) {
	if (typeof disabled === "undefined") {
		disabled = true;
	}
	this.structure_modification.nonlinearities_disabled_surface_supports = disabled;
};

/**
 * Sets table value (private)
 * @param {Number}	value 				Value to set
 * @param {String}	table 				Table to set
 * @param {String}	tableParameter 		Table parameter with value to set
 * @param {Number}	row 				Row with parameter and its value
 * @param {Number}	controlParameter 	Control parameter to check, if value can be set
 * @param {Number}	errorString 		Error message in case the value cannot be set
 */
var setTableValue = function(value,
	table,
	tableParameter,
	row,
	controlParameter,
	errorString) {
	if (typeof value !== "undefined") {
		if (controlParameter !== 0) {
			table[row][tableParameter] = value;
		}
		else {
			console.log(errorString);
		}
	}
};

/**
 * Finds all members with hinges (private)
 * @returns List with array (member index, member side, member hinge)
 */
var getMembersWithHinges = function() {
	var memberIndexesList = [];
	for (var i = 1; i <= members.count(); ++i) {
		if (members[i].member_hinge_start) {
			memberIndexesList.push([members[i].no, "Start", members[i].member_hinge_start]);
		}
		if (members[i].member_hinge_end) {
			memberIndexesList.push([members[i].no, "End", members[i].member_hinge_end]);
		}
	}
	return memberIndexesList;
};

/**
 * Finds all lines with hinges (private)
 * @returns List with array (surface index, line index, line hinge)
 */
var getLinesWithHinges = function() {
	var lineIndexesList = [];
	for (var i = 1; i <= surfaces.count(); ++i) {
		if (surfaces[i].line_hinges_table.row_count() > 1) {
			for (var row = 1; row < surfaces[i].line_hinges_table.row_count(); ++row) {
				lineIndexesList.push([surfaces[i].line_hinges_table[row].surface_number, surfaces[i].line_hinges_table[row].line_number.no, surfaces[i].line_hinges_table[row].line_hinge]);
			}
		}
	}
	return lineIndexesList;
};

/**
 * Finds all specified objects with hinges
 * @param {Object}	objects_list 	Object's container
 * @returns List with array (object's index, support)
 */
var getObjectsWithSupport = function(objects_list) {
	var indexesList = [];
	for (var i = 1; i <= objects_list.count(); ++i) {
		if (objects_list[i].support) {
			indexesList.push([objects_list[i].no, objects_list[i].support]);
		}
	}
	return indexesList;
};