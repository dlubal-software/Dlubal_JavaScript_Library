/*
1. Condition for compare of valid material of members assigned to member support is not solved. Condition can be taken from RFEM app code, MaterialImpl::isMaterialForSteelDesign(). 
   But for now there is any support for material sub type, standard group and property in API. Function memberIsValid returns true as default for this time.
2. No member supports can be assigned to member shear panel for now
*/

/**
 * Creates Member Shear Panel
 * @param {Number}  no                      Index of Member Shear Panel, can be undefined
 * @param {String}  definition_type         Definition type (TRAPEZOIDAL_SHEETING, BRACING, TRAPEZOIDAL_SHEETING_AND_BRACING, DEFINE_S_PROV), can be undefined (TRAPEZOIDAL_SHEETING  as default)
 * @param {Array}   member_supports_no      List of assigned member supports indexes, can be undefined
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Additional parameters, can be undefined
 */
function MemberShearPanel (no,
    definition_type,
    member_supports_no,
    comment,
    params) {
    if (arguments.length > 0) {
        this.member_shear_panel = createMemberShearPanel(no, definition_type, member_supports_no, comment, params);
    }
}

/**
 * Creates Trapezoidal sheeting Member Shear Panel
 * @param {Number}  no                          Index of Member Shear Panel, can be undefined
 * @param {Array}   member_supports_no          List of assigned member supports indexes, can be undefined
 * @param {String}  position_on_section         Position on section (UPPER_FLANGE, CENTROID, LOWER_FLANGE, DEFINE), can be undefined (UPPER_FLANGE as default)
 * @param {String}  trapezoidal_sheeting_name   Trapezoidal sheeting name
 * @param {String}  fastening_arrangement       Fastening arrangement (EVERY_RIB, EVERY_SECOND_RIB), can be undefined (EVERY_RIB as default)
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters, can be undefined
 */
MemberShearPanel.prototype.TrapezoidalSheeting = function (no,
    member_supports_no,
    position_on_section,
    trapezoidal_sheeting_name,
    fastening_arrangement,
    comment,
    params) {
    this.member_shear_panel = createMemberShearPanel(no, "TRAPEZOIDAL_SHEETING", member_supports_no, comment, params);
    ASSERT(typeof trapezoidal_sheeting_name !== "undefined", "Trapezoidal sheeting name must be defined");
    this.member_shear_panel.sheeting_name = trapezoidal_sheeting_name;
    this.member_shear_panel.position_on_section = GetMemberShearPanelPositionOnSection(position_on_section);
    this.member_shear_panel.fastening_arrangement = GetMemberShearPanelFasteningArrangement(fastening_arrangement);
};

/**
 * Creates Bracing Member Shear Panel
 * @param {Number}  no                      Index of Member Shear Panel, can be undefined
 * @param {Array}   member_supports_no      List of assigned member supports indexes, can be undefined
 * @param {String}  position_on_section     Position on section (UPPER_FLANGE, CENTROID, LOWER_FLANGE, DEFINE), can be undefined (UPPER_FLANGE as default)
 * @param {String}  diagonals_section_name  Diagonal section name
 * @param {String}  posts_section_name      Posts section name
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Additional parameters
 */
MemberShearPanel.prototype.Bracing = function (no,
    member_supports_no,
    position_on_section,
    diagonals_section_name,
    posts_section_name,
    comment,
    params) {
    this.member_shear_panel = createMemberShearPanel(no, "BRACING", member_supports_no, comment, params);
    ASSERT(typeof diagonals_section_name !== "undefined", "Diagonals section name must be specified");
    ASSERT(typeof posts_section_name !== "undefined", "Post section name must be defined");
    this.member_shear_panel.diagonals_section_name = diagonals_section_name;
    this.member_shear_panel.posts_section_name = posts_section_name;
    this.member_shear_panel.position_on_section = GetMemberShearPanelPositionOnSection(position_on_section);
};

/**
 * Creates Trapezoidal Sheeting and Bracing Member Shear Panel
 * @param {Number}  no                          Index of Member Shear Panel, can be undefined
 * @param {Array}   member_supports_no          List of assigned member supports indexes, can be undefined
 * @param {String}  position_on_section         Position on section (UPPER_FLANGE, CENTROID, LOWER_FLANGE, DEFINE), can be undefined (UPPER_FLANGE as default)
 * @param {String}  trapezoidal_sheeting_name   Trapezoidal sheeting name
 * @param {String}  fastening_arrangement       Fastening arrangement (EVERY_RIB, EVERY_SECOND_RIB), can be undefined (EVERY_RIB as default)  
 * @param {String}  diagonals_section_name      Diagonals section name
 * @param {String}  posts_section_name          Posts section name
 * @param {String}  comment                     Comment, can be undefined
 * @param {Object}  params                      Additional parameters
 */
MemberShearPanel.prototype.TrapezoidalSheetingAndBracing = function (no,
    member_supports_no,
    position_on_section,
    trapezoidal_sheeting_name,
    fastening_arrangement,
    diagonals_section_name,
    posts_section_name,
    comment,
    params) {
    this.TrapezoidalSheeting(no, member_supports_no, position_on_section, trapezoidal_sheeting_name, fastening_arrangement, comment, params);
    this.member_shear_panel.definition_type = member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING_AND_BRACING;
    ASSERT(typeof diagonals_section_name !== "undefined", "Diagonals section name must be specified");
    ASSERT(typeof posts_section_name !== "undefined", "Post section name must be defined");
    this.member_shear_panel.diagonals_section_name = diagonals_section_name;
    this.member_shear_panel.posts_section_name = posts_section_name;
};

/**
 * Creates Define S-prov Member Shear Panel
 * @param {Number}  no                      Index of Member Shear Panel, can be undefined
 * @param {Array}   member_supports_no      List of assigned member supports indexes, can be undefined
 * @param {String}  position_on_section     Position on section (UPPER_FLANGE, CENTROID, LOWER_FLANGE, DEFINE), can be undefined (UPPER_FLANGE as default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Additional parameters
 */
MemberShearPanel.prototype.DefineSProv = function (no,
    member_supports_no,
    position_on_section,
    comment,
    params) {
    this.member_shear_panel = createMemberShearPanel(no, "DEFINE_S_PROV", member_supports_no, comment, params);
    this.member_shear_panel.position_on_section = GetMemberShearPanelPositionOnSection(position_on_section);
};

/**
 * Sets parameters for Trapezoidal Sheeting Member Shear Panel
 * @param {Number}  shear_panel_length          Shear panel length
 * @param {Number}  girder_length               Girder length, can be undefined (define length automatically as default)
 * @param {Number}  beam_spacing                Beam spacing
 * @param {Number}  shear_panel_coefficient_k1  Shear panel coefficient K1, can be undefined
 * @param {Number}  shear_panel_coefficient_k2  Shear panel coefficient K2, can be undefined
 */
MemberShearPanel.prototype.SetTrapezoidalSheetingParameters = function (shear_panel_length,
    girder_length,
    beam_spacing,
    shear_panel_coefficient_k1,
    shear_panel_coefficient_k2) {
    ASSERT(this.member_shear_panel.definition_type === member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING, "Only for Trapezoidal Sheeting definition type");
    SetMemberShearPanelParameters(this.member_shear_panel, shear_panel_length, girder_length, beam_spacing, shear_panel_coefficient_k1, shear_panel_coefficient_k2);
};

/**
 * Sets parameters for Bracing Member Shear Panel
 * @param {Number} shear_panel_length       Shear panel length
 * @param {Number} girder_length            Girder length, can be undefined (define length automatically as default)
 * @param {Number} beam_spacing             Beam spacing
 * @param {Number} post_spacing             Posts spacing
 * @param {Number} number_of_bracings       Number of bracings, can be undefined (1 as default)
 * @param {Number} diagonals_section_area   Diagonals section area, can be undefined
 * @param {Number} posts_section_area       Posts section area, can be undefined
 */
MemberShearPanel.prototype.SetBracingParameters = function (shear_panel_length,
    girder_length,
    beam_spacing,
    post_spacing,
    number_of_bracings,
    diagonals_section_area,
    posts_section_area) {
    ASSERT(this.member_shear_panel.definition_type === member_shear_panels.DEFINITION_TYPE_BRACING, "Only for Bracing definition type");
    SetMemberShearPanelParameters(this.member_shear_panel, shear_panel_length, girder_length, beam_spacing, undefined, undefined, post_spacing, number_of_bracings, diagonals_section_area, posts_section_area);
};

/**
 * Sets parameters for Trapezoidal Sheeting and Bracing Member Shear Panel
 * @param {Number} shear_panel_length           Shear panel length
 * @param {Number} girder_length                Girder length, can be undefined (define length automatically as default)
 * @param {Number} beam_spacing                 Beam spacing
 * @param {Number} shear_panel_coefficient_k1   Shear panel coefficient K1, can be undefined
 * @param {Number} shear_panel_coefficient_k2   Shear panel coefficient K2, can be undefined
 * @param {Number} post_spacing                 Posts spacing
 * @param {Number} number_of_bracings           Number of bracings, can be undefined (1 as default)
 * @param {Number} diagonals_section_area       Diagonals section area, can be undefined
 * @param {Number} posts_section_area           Posts section area, can be undefined
 */
MemberShearPanel.prototype.TrapezoidalSheetingAndBracingParameters = function (shear_panel_length,
    girder_length,
    beam_spacing,
    shear_panel_coefficient_k1,
    shear_panel_coefficient_k2,
    post_spacing,
    number_of_bracings,
    diagonals_section_area,
    posts_section_area) {
    ASSERT(this.member_shear_panel.definition_type === member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING_AND_BRACING, "Only for Trapezoidal Sheeting and Bracing definition type");
    SetMemberShearPanelParameters(this.member_shear_panel, shear_panel_length, girder_length, beam_spacing, shear_panel_coefficient_k1, shear_panel_coefficient_k2, post_spacing, number_of_bracings, diagonals_section_area, posts_section_area);
};

/**
 * Sets parameters Define S-prov Member Shear Panel
 * @param {Number}  shear_panel_stiffness   Shear panel stiffness
 * @param {Number}  girder_length           Girder length, can be undefined (define length automatically as default)        
 */
MemberShearPanel.prototype.DefineSProvParameters = function (shear_panel_stiffness,
    girder_length,
    position_on_section_value) {
    ASSERT(this.member_shear_panel.definition_type === member_shear_panels.DEFINITION_TYPE_DEFINE_S_PROV, "Only for Define S-prov definition type");
    if (typeof position_on_section_value !== "undefined") {
        ASSERT(this.member_shear_panel.position_on_section === member_shear_panels.POSITION_DEFINE, "Position on section value can be set only if default position on section is set");
    }
    SetMemberShearPanelParameters(this.member_shear_panel, undefined, girder_length, undefined, undefined, undefined, undefined, undefined, undefined, undefined, position_on_section_value, shear_panel_stiffness);
};

function SetMemberShearPanelParameters (member_shear_panel,
    panel_length,
    girder_length,
    beam_spacing,
    coefficient_k1,
    coefficient_k2,
    post_spacing,
    number_of_bracings,
    diagonals_section_area,
    posts_section_area,
    position_on_section_value,
    stiffness) {
        console.log(position_on_section_value);
    if (typeof panel_length !== "undefined") {
        member_shear_panel.panel_length = panel_length;
    }
    // define_girder_length_automatically is set to true by default
    if (typeof girder_length !== "undefined") {
        member_shear_panel.define_girder_length_automatically = false;
        member_shear_panel.girder_length = girder_length;
    }
    if (typeof beam_spacing !== "undefined") {
        console.log(beam_spacing);
        member_shear_panel.beam_spacing = beam_spacing;
    }
    if (typeof coefficient_k1 !== "undefined") {
        member_shear_panel.coefficient_k1 = coefficient_k1;
    }
    if (typeof coefficient_k2 !== "undefined") {
        member_shear_panel.coefficient_k2 = coefficient_k2;
    }
    if (typeof post_spacing !== "undefined") {
        member_shear_panel.post_spacing = post_spacing;
    }
    if (typeof number_of_bracings !== "undefined") {
        member_shear_panel.number_of_bracings = number_of_bracings;
    }
    if (typeof diagonals_section_area !== "undefined") {
        member_shear_panel.diagonals_section_area = diagonals_section_area;
    }
    if (typeof posts_section_area !== "undefined") {
        member_shear_panel.posts_section_area = posts_section_area;
    }
    if (typeof position_on_section_value !== "undefined") {
        member_shear_panel.position_on_section_value = position_on_section_value;
    }
    if (typeof stiffness !== "undefined") {
        member_shear_panel.stiffness = stiffness;
    }
}

function createMemberShearPanel (no,
    definition_type,
    member_supports_no,
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
        var member_shear_panel = member_shear_panels.create();
    }
    else {
        var member_shear_panel = member_shear_panels.create(no);
    }
    member_shear_panel.definition_type = GetMemberShearPanelDefinitionType(definition_type);
    if (typeof member_supports_no !== "undefined") {
        member_shear_panel.member_supports = member_supports_no;
    }
    set_comment_and_parameters(member_shear_panel, comment, params);
    return member_shear_panel;
}

function GetMemberShearPanelDefinitionType (definition_type) {
	const definition_types_dict = {
        "TRAPEZOIDAL_SHEETING": member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING,
        "BRACING": member_shear_panels.DEFINITION_TYPE_BRACING,
        "TRAPEZOIDAL_SHEETING_AND_BRACING": member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING_AND_BRACING,
        "DEFINE_S_PROV": member_shear_panels.DEFINITION_TYPE_DEFINE_S_PROV
	};

	if (definition_type !== undefined) {
		var type = definition_types_dict[definition_type];
		if (type === undefined) {
			console.log("Wrong type of member shear panel definition type. Value was: " + definition_type);
			console.log("Correct values are: ( " + Object.keys(definition_types_dict) + ")");
			type = member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING;
		}
		return type;
	}
	else {
		return member_shear_panels.DEFINITION_TYPE_TRAPEZOIDAL_SHEETING;
	}
}

function GetMemberShearPanelPositionOnSection (position_type) {
	const position_types_dict = {
        "UPPER_FLANGE": member_shear_panels.POSITION_ON_UPPER_FLANGE,
        "CENTROID": member_shear_panels.POSITION_IN_CENTROID,
        "LOWER_FLANGE": member_shear_panels.POSITION_ON_LOWER_FLANGE,
        "DEFINE": member_shear_panels.POSITION_DEFINE
	};

	if (position_type !== undefined) {
		var type = position_types_dict[position_type];
		if (type === undefined) {
			console.log("Wrong type of member shear panel position type. Value was: " + position_type);
			console.log("Correct values are: ( " + Object.keys(position_types_dict) + ")");
			type = member_shear_panels.POSITION_ON_UPPER_FLANGE;
		}
		return type;
	}
	else {
		return member_shear_panels.POSITION_ON_UPPER_FLANGE;
	}
}

function GetMemberShearPanelFasteningArrangement (arrangement_type) {
	const arrangement_types_dict = {
        "EVERY_RIB": member_shear_panels.FASTENING_ARRANGEMENT_EVERY_RIB,
        "EVERY_SECOND_RIB": member_shear_panels.FASTENING_ARRANGEMENT_EVERY_SECOND_RIB
	};

	if (arrangement_type !== undefined) {
		var type = arrangement_types_dict[arrangement_type];
		if (type === undefined) {
			console.log("Wrong type of member shear panel fastening arrangement type. Value was: " + arrangement_type);
			console.log("Correct values are: ( " + Object.keys(arrangement_types_dict) + ")");
			type = member_shear_panels.FASTENING_ARRANGEMENT_EVERY_RIB;
		}
		return type;
	}
	else {
		return member_shear_panels.FASTENING_ARRANGEMENT_EVERY_RIB;
	}
}