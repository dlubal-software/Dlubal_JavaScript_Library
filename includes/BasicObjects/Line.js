function Line(no,
              nodes,
              comment,
              params)
{
    nodes = typeof nodes !== 'undefined' ? nodes : [];
    ASSERT(nodes.length > 1, "Minimum two nodes must be set to line");

    var line = engine.create_line(no, nodes);
    set_comment_and_parameters(line, comment, params);
    return line;
}
