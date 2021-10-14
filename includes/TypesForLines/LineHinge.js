function LineHinge(no,
                   surface,
                   lines,
                   comment,
                   params)
{
    var line_hinge = engine.create_line_hinge(no);

    if (typeof surface !== 'undefined')
    {
        if (typeof lines === 'undefined')
        {
            for (var i = 0; i < surface.boundary_lines.length; ++i)
            {
                surface.line_hinges_table[i + 1].line_number = surface.boundary_lines[i];
                surface.line_hinges_table[i + 1].line_hinge = line_hinge;
            }
        }
        else
        {
            for (var i = 0; i < lines.length; ++i)
            {
                surface.line_hinges_table[i + 1].line_number = lines[i];
                surface.line_hinges_table[i + 1].line_hinge = line_hinge;
            }
        }
    }

    set_comment_and_parameters(line_hinge, comment, params);
    return line_hinge;
}
