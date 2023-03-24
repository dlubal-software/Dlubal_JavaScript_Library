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