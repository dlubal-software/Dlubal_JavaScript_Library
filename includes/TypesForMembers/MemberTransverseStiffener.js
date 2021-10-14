function MemberTransverseStiffener(no,
                                   comment,
                                   params)
{
    var member_transverse_stiffener = engine.create_member_transverse_stiffener(no);
    set_comment_and_parameters(member_transverse_stiffener, comment, params);
    return member_transverse_stiffener;
}
