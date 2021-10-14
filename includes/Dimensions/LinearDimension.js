function LinearDimension(no, object_1, object_2, reference, symbol, offset, comment, params)
{
    var dim = engine.create_dimension(no);
    dim.type = model.dimensions.DIMENSION_TYPE_LINEAR;

    function add_row_to_reference_table(dim, row, object)
    {
        if (object)
        {
            if (Array.isArray(object))
            {
                dim.linear_reference_table[row].reference_object_type = model.dimensions.REFERENCE_TYPE_POINT;
                dim.linear_reference_table[row].coordinate_x = object[0];
                dim.linear_reference_table[row].coordinate_y = object[1];
                dim.linear_reference_table[row].coordinate_z = object[2];
            }
            else if (object['objectType'] !== undefined && object.objectType() == model.nodes.objectType())
            {
                dim.linear_reference_table[row].reference_object_type = model.dimensions.REFERENCE_TYPE_NODE;
                dim.linear_reference_table[row].reference_object = object;
            }
            else
            {
                dim.linear_reference_table[row].reference_object_type = model.dimensions.REFERENCE_TYPE_CONTROL_POINT;
                dim.linear_reference_table[row].reference_object = object;
            }
        }
    }

    add_row_to_reference_table(dim, 1, object_1);
    add_row_to_reference_table(dim, 2, object_2);

    switch (reference)
    {
        case "x":
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_X;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "y":
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_Y;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "z":
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_Z;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "xy":
            dim.linear_plane = model.dimensions.PLANE_FIRST;
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_X;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "xz":
            dim.linear_plane = model.dimensions.PLANE_SECOND;
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_X;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "yx":
            dim.linear_plane = model.dimensions.PLANE_FIRST;
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_Y;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "yz":
            dim.linear_plane = model.dimensions.PLANE_SECOND;
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_Y;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "zx":
            dim.linear_plane = model.dimensions.PLANE_SECOND;
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_Z;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;

        case "zy":
            dim.linear_plane = model.dimensions.PLANE_FIRST;
            dim.linear_reference = model.dimensions.REFERENCE_PROJECTION_Z;
            dim.is_global_dimension_line_offset = true;
            dim.dimension_line_offset = offset;
            break;
    }

    if (dim.linear_reference == model.dimensions.REFERENCE_LENGTH)
    {
        dim.dimension_line_offset = offset;
    }

    if (symbol)
    {
        dim.symbol = symbol;
    }

    set_comment_and_parameters(dim, comment, params);

    return dim;
}
