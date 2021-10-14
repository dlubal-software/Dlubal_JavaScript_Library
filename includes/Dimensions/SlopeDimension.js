function SlopeDimension(no, object, symbol, offset, position, direction, plane, comment, params)
{
    var dim = engine.create_dimension(no);
    dim.type = model.dimensions.DIMENSION_TYPE_SLOPE;
    if (RFEM)
    {
        dim.slope_reference_line = object;
    }
    else
    {
        dim.slope_reference_member = object;
    }

    if (typeof position !== "undefined")
    {
        dim.slope_position_absolute = position;
    }

    if (typeof plane !== "undefined")
    {
        switch (plane)
        {
            case "xy":
                dim.slope_plane = model.dimensions.SLOPE_PLANE_XY;
                break;

            case "yz":
                dim.slope_plane = model.dimensions.SLOPE_PLANE_YZ;
                break;

            case "xz":
                dim.slope_plane = model.dimensions.SLOPE_PLANE_XZ;
                break;
        }
    }

    if (typeof direction !== "undefined")
    {
        switch (direction)
        {
            case "up":
            case "upward":
                dim.slope_direction = model.dimensions.SLOPE_DIRECTION_UPWARD;
                break;

            case "down":
            case "downward":
                dim.slope_direction = model.dimensions.SLOPE_DIRECTION_DOWNWARD;
                break;
        }
    }

    if (symbol)
    {
        dim.symbol = symbol;
    }

    dim.dimension_line_offset = offset;

    set_comment_and_parameters(dim, comment, params);

    return dim;
}
