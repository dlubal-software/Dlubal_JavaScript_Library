function Node(no,
              coordinate_X,
              coordinate_Y,
              coordinate_Z,
              comment,
              params)
{
    coordinate_X = typeof coordinate_X !== 'undefined' ? coordinate_X : 0.0;
    coordinate_Y = typeof coordinate_Y !== 'undefined' ? coordinate_Y : 0.0;
    coordinate_Z = typeof coordinate_Z !== 'undefined' ? coordinate_Z : 0.0;

    var node = engine.create_node(no);

    // Coordinates
    node.coordinate_1 = coordinate_X;
    node.coordinate_2 = coordinate_Y;
    node.coordinate_3 = coordinate_Z;

    set_comment_and_parameters(node, comment, params);
    return node;
}
