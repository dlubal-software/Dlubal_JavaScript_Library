function Member(no,
                node_ids,
                comment,
                params)
{
    node_ids = typeof node_ids !== 'undefined' ? node_ids : [];
    ASSERT(node_ids.length > 1, "Minimum two nodes must be set to line");

    var member;
    if (RFEM)
    {
        var line = engine.create_line(no, node_ids);
        member = engine.create_member(no, line);
    }
    else
    {
        member = engine.create_member(no, node_ids[0], node_ids[1]);
    }

    set_comment_and_parameters(member, comment, params);
    return member;
}
