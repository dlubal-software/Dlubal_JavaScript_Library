function MemberSet(no,
                   members,
                   comment,
                   params)
{
    members = typeof members !== 'undefined' ? members : [];

    var member_set = engine.create_member_set(no,  members);
    set_comment_and_parameters(member_set, comment, params);
    return member_set;
}
