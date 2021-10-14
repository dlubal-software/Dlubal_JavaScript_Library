function ArcLengthDimension(no, line, symbol, offset, comment, params)
{
    if (RFEM)
    {
        var dim = engine.create_dimension(no);
        dim.type = model.dimensions.DIMENSION_TYPE_ARC_LENGTH;
        dim.arc_length_reference_line = line;

        dim.arc_length_reference_table[1][1] = model.dimensions.REFERENCE_TYPE_POINT_ON_LINE;
        dim.arc_length_reference_table[1][3] = 0;
        dim.arc_length_reference_table[2][1] = model.dimensions.REFERENCE_TYPE_POINT_ON_LINE;
        dim.arc_length_reference_table[2][3] = 1;

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
