function MemberDefinableStiffness(no,
                                  comment,
                                  params)
{
    var member_definable_stiffness = engine.create_member_definable_stiffness(no);
    set_comment_and_parameters(member_definable_stiffness, comment, params);
    return member_definable_stiffness;
}
