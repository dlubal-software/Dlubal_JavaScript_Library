function MemberHinge(no,
                     member_start,
                     member_end,
                     comment,
                     params)
{
    var member_hinge = engine.create_member_hinge(no);

    if (typeof member_start !== 'undefined')
    {
        member_start.member_hinge_start = member_hinge;
    }
    if (typeof member_end !== 'undefined')
    {
        member_end.member_hinge_end = member_hinge;
    }

    set_comment_and_parameters(member_hinge, comment, params);
    return member_hinge;
}
