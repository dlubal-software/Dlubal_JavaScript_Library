function MemberResultIntermediatePoint(no,
                                       comment,
                                       params)
{
    var member_result_intermediate_point = engine.create_member_result_intermediate_point(no);
    set_comment_and_parameters(member_result_intermediate_point, comment, params);
    return member_result_intermediate_point;
}
