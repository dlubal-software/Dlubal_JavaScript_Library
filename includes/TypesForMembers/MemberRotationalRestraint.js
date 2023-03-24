/*
1. Condition for compare of valid material of members assigned to member support is not solved. Condition can be taken from RFEM app code, MaterialImpl::isMaterialForSteelDesign(). 
   But for now there is any support for material sub type, standard group and property in API. Function memberIsValid returns true as default for this time.
2. No member supports can be assigned to member shear panel for now
3. "Spring Stiffness Depending on Loading" tab - table values are not supported?
*/

/**
 * Creates Member Rotational Restraint
 * @param {Number}  no                      Index of Member Rotational Restraint, can be undefined
 * @param {Array}   member_supports_no      List of assigned member supports indexes, can be undefined
 * @param {String}  restraint_type          Rotational restraint type (CONTINUOUS, DISCRETE, MANUALLY)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Additional parameters, can be undefined
 */
function MemberRotationalRestraint (no,
    member_supports_no,
    restraint_type,
    comment,
    params) {
    if (arguments.length > 0) {
        this.member_rotational_restraint = createMemberRotationalRestraint(no, member_supports_no, restraint_type, comment, params);
    }
}

/**
 * @returns member rotational restraint index
 */
MemberRotationalRestraint.prototype.GetNo = function () {
    return this.member_rotational_restraint.no;
};

/**
 * @returns Member Rotational Restraint object
 */
MemberRotationalRestraint.prototype.GetMemberRotationalRestraint = function () {
    return this.member_rotational_restraint;
};

/**
 * Creates Continuous Member Rotational Restraint
 * @param {Number}  no                          Index of Member Rotational Restraint, can be undefined
 * @param {Array}   member_supports_no          List of assigned member supports indexes, can be undefined
 * @param {String}  material_name               Sheeting material name
 * @param {String}  sheeting_name               Sheeting name
 * @param {String}  position_of_sheeting        Position of sheeting (POSITIVE, NEGATIVE), can be undefined (POSITIVE as default)
 * @param {String}  continuous_beam_effect      Continuous beam effect, can be undefined (END_PANEL as default)
 * @param {Boolean} section_deformation_cdb     Section deformation CD,B, can be undefined (true as default)
 * @param {Number}  beam_spacing                Beam spacing, can be undefined (3 m as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters, can be undefined
 */
MemberRotationalRestraint.prototype.Continuous = function (no,
    member_supports_no,
    material_name,
    sheeting_name,
    position_of_sheeting,
    continuous_beam_effect,
    section_deformation_cdb,
    beam_spacing,
    comment,
    params) {
    this.member_rotational_restraint = createMemberRotationalRestraint(no, member_supports_no, "CONTINUOUS", comment, params);
    ASSERT(typeof material_name !== "undefined", "Sheeting material name must be defined");
    ASSERT(typeof sheeting_name !== "undefined", "Sheeting name must be defined");
    this.member_rotational_restraint.material_name = material_name;
    this.member_rotational_restraint.sheeting_name = sheeting_name;
    this.member_rotational_restraint.position_of_sheeting = GetMemberRotationalRestraintPositionOfSheetingType(position_of_sheeting);
    this.member_rotational_restraint.continuous_beam_effect = GetMemberRotationalRestraintContinuousBeamEffectType(continuous_beam_effect);
    if (typeof section_deformation_cdb === "undefined") {
        section_deformation_cdb = true;
    }
    this.member_rotational_restraint.section_deformation_cdb = section_deformation_cdb;
    if (typeof beam_spacing !== "undefined") {
        this.member_rotational_restraint.beam_spacing = beam_spacing;
    }
};

/**
 * Creates Discrete Member Rotational Restraint
 * @param {Number}  no                          Index of Member Rotational Restraint, can be undefined
 * @param {Array}   member_supports_no          List of assigned member supports indexes, can be undefined
 * @param {String}  material_name               Section material name
 * @param {String}  section_name                Section name
 * @param {String}  rotational_stiffness        Rotational stiffness CD,A, can be undefined (INFINITELY as default)  
 * @param {String}  continuous_beam_effect      Continuous beam effect, can be undefined (END_PANEL as default)
 * @param {Boolean} section_deformation_cdb     Section deformation CD,B, can be undefined (true as default)
 * @param {Number}  beam_spacing                Beam spacing, can be undefined (3 m as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters, can be undefined
 */
MemberRotationalRestraint.prototype.Discrete = function (no,
    member_supports_no,
    material_name,
    section_name,
    rotational_stiffness,
    continuous_beam_effect,
    section_deformation_cdb,
    beam_spacing,
    comment,
    params) {
    this.member_rotational_restraint = createMemberRotationalRestraint(no, member_supports_no, "DISCRETE", comment, params);
    ASSERT(typeof material_name !== "undefined", "Sheeting material name must be defined");
    ASSERT(typeof section_name !== "undefined", "Section name must be specified");
    this.member_rotational_restraint.material_name = material_name;
    this.member_rotational_restraint.section_name = section_name;
    this.member_rotational_restraint.rotational_stiffness = GetMemberRotationalRestraintStiffnessType(rotational_stiffness);
    this.member_rotational_restraint.continuous_beam_effect = GetMemberRotationalRestraintContinuousBeamEffectType(continuous_beam_effect);
    if (typeof section_deformation_cdb === "undefined") {
        section_deformation_cdb = true;
    }
    this.member_rotational_restraint.section_deformation_cdb = section_deformation_cdb;
    if (typeof beam_spacing !== "undefined") {
        this.member_rotational_restraint.beam_spacing = beam_spacing;
    }
};

/**
 * Creates Manually Member Rotational Restraint
 * @param {Number}  no                                  Index of Member Rotational Restraint, can be undefined
 * @param {Number}  total_rotational_spring_stiffness   Total rotational spring stiffness
 * @param {Array}   member_supports_no                  List of assigned member supports indexes, can be undefined
 * @param {String}  comment                             Comment, can be undefined 
 * @param {Object}  params                              Additional parameters, can be undefined
 */
MemberRotationalRestraint.prototype.Manually = function (no,
    total_rotational_spring_stiffness,
    member_supports_no,
    comment,
    params) {
    this.member_rotational_restraint = createMemberRotationalRestraint(no, member_supports_no, "MANUALLY", comment, params);
    ASSERT(typeof total_rotational_spring_stiffness !== "undefined", "Total rotational spring stiffness must be specified");
    this.member_rotational_restraint.total_rotational_spring_stiffness = total_rotational_spring_stiffness;
};

/**
 * Sets parameters for Continuous Member Rotational Restraint
 * @param {Number} modulus_of_elasticity        Modulus of elasticity, can be undefined (default value taken from selected sheeting material)
 * @param {Number} sheeting_thickness           Sheeting thickness, can be undefined (default value taken from selected section)
 * @param {Number} sheeting_moment_of_inertia   Sheeting moment of inertia, can be undefined (default value taken from selected section)
 * @param {Number} sheeting_distance_of_ribs    Sheeting distance of ribs, can be undefined (default value taken from selected section)
 * @param {Number} width_of_section_flange      Width of sheeting flange, can be undefined (default value taken from selected section)
 * @param {Number} spring_stiffness             Spring stiffness, can be undefined (different depending on loading as default)
 */
MemberRotationalRestraint.prototype.SetContinuousParameters = function (modulus_of_elasticity,
    sheeting_thickness,
    sheeting_moment_of_inertia,
    sheeting_distance_of_ribs,
    width_of_section_flange,
    spring_stiffness) {
    ASSERT(this.member_rotational_restraint.type === member_rotational_restraints.TYPE_CONTINUOUS, "Only for Continuous Member Rotational Restraint");
    if (typeof modulus_of_elasticity !== "undefined") {
        this.member_rotational_restraint.modulus_of_elasticity = modulus_of_elasticity;
    }
    if (typeof sheeting_thickness !== "undefined") {
        this.member_rotational_restraint.sheeting_thickness = sheeting_thickness;
    }
    if (typeof sheeting_moment_of_inertia !== "undefined") {
        this.member_rotational_restraint.sheeting_moment_of_inertia = sheeting_moment_of_inertia;
    }
    if (typeof sheeting_distance_of_ribs !== "undefined") {
        this.member_rotational_restraint.sheeting_distance_of_ribs = sheeting_distance_of_ribs;
    }
    if (typeof width_of_section_flange !== "undefined") {
        this.member_rotational_restraint.width_of_section_flange = width_of_section_flange;
    }
    if (typeof spring_stiffness !== "undefined") {
        this.member_rotational_restraint.different_spring_stiffness = false;
        this.member_rotational_restraint.spring_stiffness = spring_stiffness;
    }
    else {
        this.member_rotational_restraint.different_spring_stiffness = true;
    }
};

/**
 * Sets parameters for Discrete Member Rotational Restraint
 * @param {Number}  modulus_of_elasticity       Modulus of elasticity, can be undefined (default value taken from selected sheeting material)
 * @param {Number}  section_moment_of_inertia   Section moment of inertia, can be undefined (default value taken from selected section)
 * @param {Number}  purlin_spacing              Purling spacing
 * @param {Number}  rotational_stiffness_value  Rotational stiffness, can be undefined (only if rotational stiffness is INFINITELY)
 */
MemberRotationalRestraint.prototype.SetDiscreteParameters = function (modulus_of_elasticity,
    section_moment_of_inertia,
    purlin_spacing,
    rotational_stiffness_value) {
    ASSERT(this.member_rotational_restraint.type === member_rotational_restraints.TYPE_DISCRETE, "Only for Discrete Member Rotational Restraint");
    if (modulus_of_elasticity !== "undefined") {
        this.member_rotational_restraint.modulus_of_elasticity = modulus_of_elasticity;
    }
    if (typeof section_moment_of_inertia !== "undefined") {
        this.member_rotational_restraint.section_moment_of_inertia = section_moment_of_inertia;
    }
    ASSERT(typeof purlin_spacing !== "undefined", "Purling spacing must be defined");
    this.member_rotational_restraint.purlin_spacing = purlin_spacing;
    if (typeof rotational_stiffness_value !== "undefined") {
        ASSERT(this.member_rotational_restraint.rotational_stiffness === member_rotational_restraints.ROTATIONAL_STIFFNESS_MANUALLY, "Rotational stiffness can be set only if manually rotational stiffness CD,A is set");
        this.member_rotational_restraint.rotational_stiffness_value = rotational_stiffness_value;
    }
};

function createMemberRotationalRestraint (no,
    member_supports_no,
    restraint_type,
    comment,
    params) {
    if (typeof member_supports_no !== "undefined") {
        ASSERT(Array.isArray(member_supports_no), "List of member supports must be defined as array of member indexes");
        member_supports_list = member_supports_no;
        member_supports_no = [];
        // Condition can be taken from RFEM app code, MaterialImpl::isMaterialForSteelDesign(). But for now there is any support for material sub type, standard group and property in API. Returns true as default.
        function memberIsValid(member_no) {
            /*if (members.exist(member_no)) {
                var section = members[member_no].section_start;
                var material = section.material;
                var isValidType = material.material_type === materials.TYPE_STEEL || material.material_type === materials.TYPE_METAL && 
            }
            else {
                console.log("Member no " + member_no + " doesn't exist");
                return false;
            }*/
            return true;
        }
        for (var i = 0; i < member_supports_list.length; ++i) {
            if (member_supports.exist(member_supports_list[i])) {
                var member_support = member_supports[member_supports_list[i]];
                var memberValid = true;
                if (member_support.members.length > 0) {
                    for (var j = 0; j < member_support.members.length; ++j) {
                        if (!memberIsValid(member_support.members[j])) {
                            memberValid = false;
                            console.log("Member no. " + j + " is not valid for member shear panel");
                            break;  // Jump out of the support's member loop and go to the next member support
                        }
                    }
                    if (memberValid) {
                        member_supports_no.push(member_supports_list[i]);   // Assigned members in member support are valid
                    }
                }
                memberValid = true;
                if (member_support.member_sets.length > 0) {
                    for (var j = 0; j < member_support.member_sets.length; ++j) {
                        if (member_sets.exist(member_support.member_sets[j])) {
                            for (var k = 0; k < member_support.member_sets[j].members.length; ++k) {
                                if (!memberIsValid(member_support.member_sets[j][k])) {
                                    memberValid = false;
                                    console.log("Member no. " + k + " is not valid for member shear panel");
                                    break;  // Jump out of the member set list members
                                }
                            }
                            if (!memberValid) {
                                console.log("Member set no. " + j + " contains un-valid member");
                                break;  // Jump out of the support's member loop and go to the next member support
                            }
                        }
                        else {
                            console.log("Member set no. " + j + " doesn't exist");
                        }
                    }
                    if (memberValid) {
                        member_supports_no.push(member_supports_list[i]);
                    }
                }
            }
            else {
                console.log("Member support no. " + member_supports_list[i] + " doesn't exist");
            }
        }
    }
    if (typeof no === "undefined") {
        var member_rotational_restraint = member_rotational_restraints.create();
    }
    else {
        var member_rotational_restraint = member_rotational_restraints.create(no);
    }
    member_rotational_restraint.type = GetMemberRotationalRestraintType(restraint_type);
    set_comment_and_parameters(member_rotational_restraint, comment, params);
    return member_rotational_restraint;
}

function GetMemberRotationalRestraintType (restraint_type) {
	const restraint_types_dict = {
        "CONTINUOUS": member_rotational_restraints.TYPE_CONTINUOUS,
        "DISCRETE": member_rotational_restraints.TYPE_DISCRETE,
        "MANUALLY": member_rotational_restraints.TYPE_MANUALLY
	};

	if (restraint_type !== undefined) {
		var type = restraint_types_dict[restraint_type];
		if (type === undefined) {
			console.log("Wrong type of member rotational restraint type. Value was: " + restraint_type);
			console.log("Correct values are: ( " + Object.keys(restraint_types_dict) + ")");
			type = member_rotational_restraints.TYPE_CONTINUOUS;
		}
		return type;
	}
	else {
		return member_rotational_restraints.TYPE_CONTINUOUS;
	}
}

function GetMemberRotationalRestraintPositionOfSheetingType (position_type) {
	const position_types_dict = {
        "POSITIVE": member_rotational_restraints.SHEETING_POSITION_POSITIVE,
        "NEGATIVE": member_rotational_restraints.SHEETING_POSITION_NEGATIVE
	};

	if (position_type !== undefined) {
		var type = position_types_dict[position_type];
		if (type === undefined) {
			console.log("Wrong type of member rotational restraint position of sheeting type. Value was: " + position_type);
			console.log("Correct values are: ( " + Object.keys(position_types_dict) + ")");
			type = member_rotational_restraints.SHEETING_POSITION_POSITIVE;
		}
		return type;
	}
	else {
		return member_rotational_restraints.SHEETING_POSITION_POSITIVE;
	}
}

function GetMemberRotationalRestraintContinuousBeamEffectType (beam_effect_type) {
	const beam_effect_types_dict = {
        "END_PANEL": member_rotational_restraints.CONTINUOUS_BEAM_EFFECT_END_PANEL,
        "INTERNAL_PANEL": member_rotational_restraints.CONTINUOUS_BEAM_EFFECT_INTERNAL_PANEL
	};

	if (beam_effect_type !== undefined) {
		var type = beam_effect_types_dict[beam_effect_type];
		if (type === undefined) {
			console.log("Wrong type of member rotational restraint continuous beam effect type. Value was: " + beam_effect_type);
			console.log("Correct values are: ( " + Object.keys(beam_effect_types_dict) + ")");
			type = member_rotational_restraints.CONTINUOUS_BEAM_EFFECT_END_PANEL;
		}
		return type;
	}
	else {
		return member_rotational_restraints.CONTINUOUS_BEAM_EFFECT_END_PANEL;
	}
}

function GetMemberRotationalRestraintStiffnessType (stiffness_type) {
	const stiffness_types_dict = {
        "INFINITELY": member_rotational_restraints.ROTATIONAL_STIFFNESS_INFINITELY,
        "MANUALLY": member_rotational_restraints.ROTATIONAL_STIFFNESS_MANUALLY
	};

	if (stiffness_type !== undefined) {
		var type = stiffness_types_dict[stiffness_type];
		if (type === undefined) {
			console.log("Wrong type of member rotational restraint stiffness type. Value was: " + stiffness_type);
			console.log("Correct values are: ( " + Object.keys(stiffness_types_dict) + ")");
			type = member_rotational_restraints.ROTATIONAL_STIFFNESS_INFINITELY;
		}
		return type;
	}
	else {
		return member_rotational_restraints.ROTATIONAL_STIFFNESS_INFINITELY;
	}
}