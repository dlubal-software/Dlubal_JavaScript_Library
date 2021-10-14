function Opening(no,
                 boundary_lines,
                 comment,
                 params)
{
    boundary_lines = typeof boundary_lines !== 'undefined' ? boundary_lines : [];
    ASSERT(boundary_lines.length > 0, "Boundary lines cannot be empty");

    var opening = engine.create_opening(no, boundary_lines);
    set_comment_and_parameters(opening, comment, params);
    return opening;
}
