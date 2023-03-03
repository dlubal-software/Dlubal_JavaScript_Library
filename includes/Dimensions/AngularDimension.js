function AngularDimension(no, object_1, object_2, reference_object_type, symbol, offset, quadrant, comment, params)
{
    // It is causing issues in blocks
    // var dim = engine.create_dimension(no);
    // dim.type = model.dimensions.DIMENSION_TYPE_ANGULAR;

    // function add_row_to_reference_table(dim, object, object_type)
    // {
    //     if (typeof object === 'undefined' || object == null)
    //     {
    //         return;
    //     }

    //     var row = dim.angular_reference_table.row_count();
    //     dim.angular_reference_table[row].reference_object_type = GetDimensionReferenceObjectType(object_type); //<- this causing problem
    //     if (Array.isArray(object) || object_type == "POINT")
    //     {
    //         dim.angular_reference_table[row].coordinate_x = object[0];
    //         dim.angular_reference_table[row].coordinate_y = object[1];
    //         dim.angular_reference_table[row].coordinate_z = object[2];
    //     }
    //     else
    //     {
    //         dim.angular_reference_table[row].reference_object = object;
    //     }
    // }

    // add_row_to_reference_table(dim, object_1, reference_object_type);
    // add_row_to_reference_table(dim, object_2, reference_object_type);

    // var handled_params = typeof params !== 'undefined' ? params : {};
    // if (handled_params.hasOwnProperty('reference_table'))
    // {
    //     var reference_table = handled_params['reference_table'];
    //     for (var i = 0; i < reference_table.length; ++i)
    //     {
    //         var item = reference_table[i];
    //         var object_type = item.length > 1 ? item[1] : null;
    //         add_row_to_reference_table(dim, item[0], object_type);
    //     }
    //     delete handled_params['reference_table'];
    // }

    // if (symbol)
    // {
    //     dim.symbol = symbol;
    // }

    // dim.dimension_line_offset = offset;

    // if (quadrant)
    // {
    //     dim.angular_quadrant = quadrant;
    // }

    // set_comment_and_parameters(dim, comment, handled_params);

    // return dim;
    var dim = engine.create_dimension(no);
    dim.type = model.dimensions.DIMENSION_TYPE_ANGULAR;

    function add_row_to_reference_table(dim, object, object_type)
    {
        if (typeof object === 'undefined' || object == null)
        {
            return;
        }

        var row = dim.angular_reference_table.row_count();
        if (Array.isArray(object) || object_type == model.dimensions.REFERENCE_TYPE_POINT)
        {
            dim.angular_reference_table[row].reference_object_type = model.dimensions.REFERENCE_TYPE_POINT;
            dim.angular_reference_table[row].coordinate_x = object[0];
            dim.angular_reference_table[row].coordinate_y = object[1];
            dim.angular_reference_table[row].coordinate_z = object[2];
        }
        else
        {
            dim.angular_reference_table[row].reference_object_type = object_type;
            dim.angular_reference_table[row].reference_object = object;
        }
    }

    add_row_to_reference_table(dim, object_1, reference_object_type);
    add_row_to_reference_table(dim, object_2, reference_object_type);

    var handled_params = typeof params !== 'undefined' ? params : {};
    if (handled_params.hasOwnProperty('reference_table'))
    {
        var reference_table = handled_params['reference_table'];
        for (var i = 0; i < reference_table.length; ++i)
        {
            var item = reference_table[i];
            var object_type = item.length > 1 ? item[1] : null;
            add_row_to_reference_table(dim, item[0], object_type);
        }
        delete handled_params['reference_table'];
    }

    if (symbol)
    {
        dim.symbol = symbol;
    }

    dim.dimension_line_offset = offset;

    if (quadrant)
    {
        dim.angular_quadrant = quadrant;
    }

    set_comment_and_parameters(dim, comment, handled_params);

    return dim;
}

function GetDimensionReferenceObjectType(reference_type) {
	const reference_types_dict = {
        "NODE": dimensions.REFERENCE_TYPE_NODE,
        "CONTROL_POINT": dimensions.REFERENCE_TYPE_CONTROL_POINT,
        "POINT": dimensions.REFERENCE_TYPE_POINT,
        "POINT_ON_LINE": dimensions.REFERENCE_TYPE_POINT_ON_LINE,
        "LINE": dimensions.REFERENCE_TYPE_LINE,
        "MEMBER": dimensions.REFERENCE_TYPE_MEMBER,
        "SURFACE": dimensions.REFERENCE_TYPE_SURFACE
	};

	if (reference_type !== undefined) {
	  var type = reference_types_dict[reference_type];
	  if (type === undefined) {
		console.log("Wrong reference type. Value was: " + reference_type);
		console.log("Correct values are: ( " + Object.keys(reference_types_dict) + ")");
		type = dimensions.REFERENCE_TYPE_NODE;
	  }
	  return type;
	}
	else {
	  return dimensions.REFERENCE_TYPE_NODE;
	}
}
