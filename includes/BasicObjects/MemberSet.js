/**
 * Create Member Set
 * @param {int} no - Number of Member Set
 * @param {array} members - List of the number of the members
 * @param {string} comment - Comment for the Member Set
 * @param {dictionary} params - Parameters of the Member Set
 * @returns memberSet
 */
function MemberSet(no,
                   members,
                   comment,
                   params)
{
    if (typeof (members) !== "undefined") 
    {
        members = typeof members !== 'undefined' ? members : [];

        this.member_set = engine.create_member_set(no,  members);
        set_comment_and_parameters(this.member_set, comment, params);
        return this.member_set;
    };
}

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
                                                  params)
{
    if (typeof (members) !== "undefined") 
    {
        members = typeof members !== 'undefined' ? members : [];
        this.member_set = engine.create_member_set(no,  members);
        this.member_set.set_type = member_sets.SET_TYPE_CONTINUOUS;
        set_comment_and_parameters(this.member_set, comment, params);
    }
};

MemberSet.prototype.GroupOfMembers = function (no,
                                                  members,
                                                  comment,
                                                  params)
{
    if (typeof (members) !== "undefined") 
    {
        members = typeof members !== 'undefined' ? members : [];
        this.member_set = engine.create_member_set(no,  members);
        this.member_set.set_type = member_sets.SET_TYPE_GROUP;
        set_comment_and_parameters(this.member_set, comment, params);
    }
};

