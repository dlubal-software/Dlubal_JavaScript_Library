include("../SteelDesign/SteelDesignSupport.js");

/**
 * Creates Concrete design effective length
 * @param {Number} no               Concrete design effective length index, can be undefined
 * @param {Array} members_no        List of members indexes, can be undefined
 * @param {Array} member_sets_no    List of member sets indexes, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function ConcreteDesignEffectiveLength (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
    if (typeof no === "undefined") {
        this.effective_length = steel_effective_lengths.create();
    }
    else {
        this.effective_length = steel_effective_lengths.create(no);
    }
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "Member list must be array of member indexes");
        member_list = members_no;
        members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                members_no.push(member_list[i]);
            }
            else {
                console.log("Member no. " + member_list[i] + " doesn't exist");
            }
        }
        this.effective_length.members = members_no;
    }
    if (typeof member_sets_no !== "undefined") {
        ASSERT(Array.isArray(member_sets_no), "Member set list must be array of member sets indexes");
        member_sets_list = member_sets_no;
        member_sets_no = [];
        for (var i = 0; i < member_sets_list.length; ++i) {
            if (member_sets.exist(member_sets_list[i])) {
                member_sets_no.push(member_sets_list[i]);
            }
            else {
                console.log("Member set no. " + member_sets_list[i] + " doesn't exist");
            }
        }
        this.effective_length.member_sets = member_sets_no;
    }
    set_comment_and_parameters(this.effective_length, comment, params);
}