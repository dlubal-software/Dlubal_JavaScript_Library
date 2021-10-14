function RadiusDimension(no, line, symbol, offset, position, comment, params)
{
    if (RFEM)
    {
        var dim = engine.create_dimension(no);
        dim.type = model.dimensions.DIMENSION_TYPE_RADIUS;
        dim.radius_diameter_reference_line = line;

        dim.radius_diameter_position_on_line = position;

        if (symbol)
        {
            dim.symbol = symbol;
        }

        dim.dimension_line_offset = offset;

        set_comment_and_parameters(dim, comment, params);

        return dim;
    }
    return null;
}
