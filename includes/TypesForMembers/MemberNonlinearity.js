function MemberNonlinearity(no,
                            comment,
                            params)
{
    var member_nonlinearity = engine.create_member_nonlinearity(no);
    set_comment_and_parameters(member_nonlinearity, comment, params);
    return member_nonlinearity;
}
