function LineSet(no,
                 lines,
                 comment,
                 params)
{
    lines = typeof lines !== 'undefined' ? lines : [];

    var line_set = engine.create_line_set(no,  lines);
    set_comment_and_parameters(line_set, comment, params);
    return line_set;
}
