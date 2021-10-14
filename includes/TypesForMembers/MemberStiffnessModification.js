function MemberStiffnessModification(no,
                                     comment,
                                     params)
{
    var member_stiffness_modification = engine.create_member_stiffness_modification(no);
    set_comment_and_parameters(member_stiffness_modification, comment, params);
    return member_stiffness_modification;
}
