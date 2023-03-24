include("../Tools/high_level_functions_support.js");

/**
 * Create Member Set
 * @class
 * @constructor
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 * @returns memberSet
 */
function MemberSet(no,
    members,
    comment,
    params) {

    if (arguments.length !== 0) {
        members = typeof members !== 'undefined' ? members : [];

        this.member_set = engine.create_member_set(no, members);
        set_comment_and_parameters(this.member_set, comment, params);
        return this.member_set;
    }
}

/**
 * @returns Number of member set
 */
MemberSet.prototype.GetNo = function() {
    return this.member_set.no;
};

/**
 * @returns Member set object
 */
MemberSet.prototype.GetMemberSet = function() {
    return this.member_set;
};

/**
 * Enable / disable Design properties for member set (Steel design add-on)
 * @param {Boolean} enabled     Enable / disable Design properties, can be undefined (true as default)
 */
MemberSet.prototype.SteelDesignProperties = function (enabled) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof enabled === "undefined") {
		enabled = true;
	}
	this.member_set.design_properties_activated = enabled;
}

/**
 * Sets Steel design types
 * @param {Number} steel_effective_lengths_no 					Effective length number, can be undefined
 * @param {Number} steel_boundary_conditions_no 				Boundary condition number, can be undefined
 * @param {Number} steel_member_local_section_reduction_no 		Member local section reduction number, can be undefined
 */
MemberSet.prototype.SetSteelDesignTypes = function (steel_effective_lengths_no,
	steel_boundary_conditions_no,
	steel_member_local_section_reduction_no) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof steel_effective_lengths_no !== "undefined" && __objectExists(steel_effective_lengths_no, "Effective length", steel_effective_lengths)) {
		this.member_set.steel_effective_lengths = steel_effective_lengths_no;
	}
	if (typeof steel_boundary_conditions_no !== "undefined") {
		ASSERT(Member_IsCurrentCodeOfStandard("EN") || Member_IsCurrentCodeOfStandard("NTC"), "Boundary condition can be set only for EN, NTC code of standards");
		if (__objectExists(steel_boundary_conditions_no, "Boundary condition", steel_boundary_conditions)) {
			this.member_set.steel_boundary_conditions = steel_boundary_conditions_no;
		}
	}
	if (typeof steel_member_local_section_reduction_no !== "undefined" && __objectExists(steel_member_local_section_reduction_no, "Member local section reduction", steel_member_local_section_reductions)) {
		this.member_set.steel_member_local_section_reductions = steel_member_local_section_reduction_no;
	}
};

/**
 * Sets Steel design configurations (Steel design add-on)
 * @param {Number} member_steel_design_uls_configuration_no 	Ultimate configuration number, can be undefined
 * @param {Number} member_steel_design_sls_configuration_no 	Serviceability configuration number, can be undefined
 * @param {Number} member_steel_design_fr_configuration_no 		Fire resistance configuration number, can be undefined
 */
MemberSet.prototype.SetSteeleDesignConfigurations = function (member_steel_design_uls_configuration_no,
	member_steel_design_sls_configuration_no,
	member_steel_design_fr_configuration_no) {
	ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	if (typeof member_steel_design_uls_configuration_no !== "undefined") {
		ASSERT(!Member_IsCurrentCodeOfStandard("AISC"), "Ultimate configuration can't be set for AISC code of standard");
		if (__objectExists(member_steel_design_uls_configuration_no, "Ultimate configuration", STEEL_DESIGN.steel_design_uls_configurations)) {
			this.member_set.member_steel_design_uls_configuration = member_steel_design_uls_configuration_no;
		}
	}
	if (typeof member_steel_design_sls_configuration_no !== "undefined" && __objectExists(member_steel_design_sls_configuration_no, "Serviceability configuration", STEEL_DESIGN.steel_design_sls_configurations)) {
		this.member_set.member_steel_design_sls_configuration = member_steel_design_sls_configuration_no;
	}
	if (typeof member_steel_design_fr_configuration_no !== "undefined") {
		ASSERT(Member_IsCurrentCodeOfStandard("EN") || Member_IsCurrentCodeOfStandard("NTC"), "Fire resistance configuration can be set only for EN, NTC code of standards");
		if (__objectExists(member_steel_design_fr_configuration_no, "Fire resistance configuration", STEEL_DESIGN.steel_design_fr_configurations)) {
			this.member_set.member_steel_design_fr_configuration = member_steel_design_fr_configuration_no;
		}
	}
};

/**
 * Create Continuous Member memberSet type
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 */
MemberSet.prototype.ContinuousMembers = function (no,
    members,
    comment,
    params) {
    if (typeof (members) !== "undefined") {
        members = typeof members !== 'undefined' ? members : [];
        this.member_set = engine.create_member_set(no, members);
        this.member_set.set_type = member_sets.SET_TYPE_CONTINUOUS;
        set_comment_and_parameters(this.member_set, comment, params);
    }
};

/**
 * Create Group of  Member memberSet type
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 */
MemberSet.prototype.GroupOfMembers = function (no,
    members,
    comment,
    params) {
    if (typeof (members) !== "undefined") {
        members = typeof members !== 'undefined' ? members : [];
        this.member_set = engine.create_member_set(no, members);
        this.member_set.set_type = member_sets.SET_TYPE_GROUP;
        set_comment_and_parameters(this.member_set, comment, params);
    }
};

MemberSet.prototype.GetNo = function(){
	return this.member_set.no;
};

MemberSet.prototype.GetMember = function (){
	return this.member_set;
};
