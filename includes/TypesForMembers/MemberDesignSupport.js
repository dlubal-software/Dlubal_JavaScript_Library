function MemberDesignSupport (no,
    assigned_members_no,
    assigned_member_sets_no,
    assigned_nodes_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
    ASSERT(typeof assigned_members_no !== "undefined" || typeof assigned_member_sets_no !== "undefined", "Assigned members or member sets must be specified");
    ASSERT(typeof assigned_nodes_no !== "undefined", "Assigned nodes must be specified");
    if (typeof no === "undefined") {
        this.member_design_support = design_supports.create();
    }
    else {
        this.member_design_support = design_supports.create(no);
    }
    if (typeof assigned_members_no !== "undefined") {
        ASSERT(typeof assigned_member_sets_no === "undefined", "You can't specify assigned members and member sets together");
        ASSERT(Array.isArray(assigned_members_no), "Member list must be array of member indexes");
        member_list = assigned_members_no;
        assigned_members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                assigned_members_no.push(member_list[i]);
            }
            else {
                console.log("Member no. " + member_list[i] + " doesn't exist");
            }
        }
        this.member_design_support.assigned_to_members = assigned_members_no;
    }
    if (typeof assigned_member_sets_no !== "undefined") {
        ASSERT(typeof assigned_members_no === "undefined", "You can't specify assigned members and member sets together");
        ASSERT(Array.isArray(assigned_member_sets_no), "Member set list must be array of member sets indexes");
        member_sets_list = assigned_member_sets_no;
        assigned_member_sets_no = [];
        for (var i = 0; i < member_sets_list.length; ++i) {
            if (member_sets.exist(member_sets_list[i])) {
                assigned_member_sets_no.push(member_sets_list[i]);
            }
            else {
                console.log("Member set no. " + member_sets_list[i] + " doesn't exist");
            }
        }
        this.member_design_support.assigned_to_member_sets = assigned_member_sets_no;
    }
    set_comment_and_parameters(this.member_design_support, comment, params);
}

/**
 * @returns Member design support number
 */
MemberDesignSupport.prototype.GetNo = function () {
	return this.member_design_support.no;
};

/**
 * @returns Member design support object
 */
MemberDesignSupport.prototype.GetMember = function () {
	return this.member_design_support;
};

/**
 * Sets name
 * @param {String} name     Name
 */
MemberDesignSupport.prototype.Name = function (name) {
    ASSERT(typeof name !== "undefined", "name must be defined");
    this.member_design_support.name = name;
};

MemberDesignSupport.prototype.GeneralInZ = function (activate_in_z,
    support_width_z,
    support_depth_by_section_width_of_member_z_enabled,
    support_depth_z,
    design_support_orientation_z,
    consider_in_deflection_design_z) {
    ASSERT(typeof activate_in_z !== "undefined", "Active state must be specified");
    this.member_design_support.activate_in_z = activate_in_z;
    if (typeof support_width_z !== "undefined") {
        ASSERT(this.member_design_support.activate_in_z, "Activate state must be on");
        this.member_design_support.support_width_z = support_width_z;
    }
    if (typeof support_depth_by_section_width_of_member_z_enabled !== undefined) {
        ASSERT(this.member_design_support.activate_in_z, "Activate state must be on");
        this.member_design_support.support_depth_by_section_width_of_member_z_enabled = support_depth_by_section_width_of_member_z_enabled;
    }
    if (typeof support_depth_z !== "undefined") {
        ASSERT(this.member_design_support.activate_in_z, "Activate state must be on");
        ASSERT(!this.member_design_support.support_depth_by_section_width_of_member_z_enabled, "By section width of member state must be off");
        this.member_design_support.support_depth_z = support_depth_z;
    }
    if (typeof design_support_orientation_z !== "undefined") {
        ASSERT(this.member_design_support.activate_in_z, "Activate state must be on");
        this.member_design_support.design_support_orientation_z = GetMemberDesignSupportOrientationZ(design_support_orientation_z);
    }
    if (typeof consider_in_deflection_design_z !== "undefined") {
        ASSERT(this.member_design_support.activate_in_z, "Activate state must be on");
        this.member_design_support.consider_in_deflection_design_z = consider_in_deflection_design_z;
    }
};

MemberDesignSupport.prototype.GeneralInY = function (activate_in_y,
    support_width_y,
    support_depth_by_section_width_of_member_y_enabled,
    support_depth_y,
    design_support_orientation_y,
    consider_in_deflection_design_y) {
    ASSERT(typeof activate_in_y !== "undefined", "Active state must be specified");
    this.member_design_support.activate_in_y = activate_in_y;
    if (typeof support_width_y !== "undefined") {
        ASSERT(this.member_design_support.activate_in_y, "Activate state must be on");
        this.member_design_support.support_width_y = support_width_y;
    }
    if (typeof support_depth_by_section_width_of_member_y_enabled !== "undefined") {
        ASSERT(this.member_design_support.activate_in_y, "Activate state must be on");
        this.member_design_support.support_depth_by_section_width_of_member_y_enabled = support_depth_by_section_width_of_member_y_enabled;
    }
    if (typeof support_depth_y !== "undefined") {
        ASSERT(this.member_design_support.activate_in_y, "Activate state must be on");
        ASSERT(!this.member_design_support.support_depth_by_section_width_of_member_y_enabled, "By section width of member state must be off");
        this.member_design_support.support_depth_y = support_depth_y;
    }
    if (typeof design_support_orientation_y !== "undefined") {
        ASSERT(this.member_design_support.activate_in_y, "Activate state must be on");
        this.member_design_support.design_support_orientation_y = GetMemberDesignSupportOrientationY(design_support_orientation_y);
    }
    if (typeof consider_in_deflection_design_y !== "undefined") {
        ASSERT(this.member_design_support.activate_in_y, "Activate state must be on");
        this.member_design_support.consider_in_deflection_design_y = consider_in_deflection_design_y;
    }
};

function GetMemberDesignSupportOrientationZ(orientation_type) {
	const orientation_types_dict = {
        "ZAXIS_POSITIVE": design_supports.DESIGN_SUPPORT_ORIENTATION_ZAXIS_POSITIVE,
        "ZAXIS_NEGATIVE": design_supports.DESIGN_SUPPORT_ORIENTATION_ZAXIS_NEGATIVE,
        "ZAXIS_BOTH": design_supports.DESIGN_SUPPORT_ORIENTATION_ZAXIS_BOTH
	};

	if (orientation_type !== undefined) {
		var type = orientation_types_dict[orientation_type];
		if (type === undefined) {
			console.log("Wrong design support orientation in Z type. Value was: " + orientation_type);
			console.log("Correct values are: ( " + Object.keys(orientation_types_dict) + ")");
			type = design_supports.DESIGN_SUPPORT_ORIENTATION_ZAXIS_POSITIVE;
		}
		return type;
	}
	else {
		return design_supports.DESIGN_SUPPORT_ORIENTATION_ZAXIS_POSITIVE;
	}
}

function GetMemberDesignSupportOrientationY(orientation_type) {
	const orientation_types_dict = {
        "YAXIS_POSITIVE": design_supports.DESIGN_SUPPORT_ORIENTATION_YAXIS_POSITIVE,
        "YAXIS_NEGATIVE": design_supports.DESIGN_SUPPORT_ORIENTATION_YAXIS_NEGATIVE,
        "YAXIS_BOTH": design_supports.DESIGN_SUPPORT_ORIENTATION_YAXIS_BOTH
	};

	if (orientation_type !== undefined) {
		var type = orientation_types_dict[orientation_type];
		if (type === undefined) {
			console.log("Wrong design support orientation in Y type. Value was: " + orientation_type);
			console.log("Correct values are: ( " + Object.keys(orientation_types_dict) + ")");
			type = design_supports.DESIGN_SUPPORT_ORIENTATION_YAXIS_POSITIVE;
		}
		return type;
	}
	else {
		return design_supports.DESIGN_SUPPORT_ORIENTATION_YAXIS_POSITIVE;
	}
}