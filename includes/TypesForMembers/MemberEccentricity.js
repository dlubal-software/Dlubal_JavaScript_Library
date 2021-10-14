function MemberEccentricity(no,
                            member_start,
                            member_end,
                            comment,
                            params)
{
    var member_eccentricity = engine.create_member_eccentricity(no);

    if (typeof member_start !== 'undefined')
    {
        member_start.member_eccentricity_start = member_eccentricity;
    }
    if (typeof member_end !== 'undefined')
    {
        member_end.member_eccentricity_end = member_eccentricity;
    }

    set_comment_and_parameters(member_eccentricity, comment, params);
    return member_eccentricity;
}
