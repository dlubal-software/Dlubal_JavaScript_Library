function SlopeDimension(no, object, symbol, offset, position, direction, plane, comment, params)
{
    // It is causing issues in blocks
    // var dim = engine.create_dimension(no);
    // dim.type = model.dimensions.DIMENSION_TYPE_SLOPE;
    // if (RFEM)
    // {
    //     dim.slope_reference_line = object;
    // }
    // else
    // {
    //     dim.slope_reference_member = object;
    // }

    // if (typeof position !== "undefined")
    // {
    //     dim.slope_position_absolute = position;
    // }

    // dim.slope_plane = GetSlopePlane(plane); <- this causing problem
    // dim.slope_direction = GetSlopeDirection(direction);

    // if (symbol)
    // {
    //     dim.symbol = symbol;
    // }

    // dim.dimension_line_offset = offset;

    // set_comment_and_parameters(dim, comment, params);

    // return dim;

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

function GetSlopeDirection(slope_direction) {
	const slope_directions_dict = {
        "UPWARD": dimensions.SLOPE_DIRECTION_UPWARD,
        "DOWNWARD": dimensions.SLOPE_DIRECTION_DOWNWARD
	};

	if (slope_direction !== undefined) {
	  var direction = slope_directions_dict[slope_direction];
	  if (direction === undefined) {
		console.log("Wrong direction type. Value was: " + slope_direction);
		console.log("Correct values are: ( " + Object.keys(slope_directions_dict) + ")");
		direction = dimensions.SLOPE_DIRECTION_UPWARD;
	  }
	  return direction;
	}
	else {
	  return dimensions.SLOPE_DIRECTION_UPWARD;
	}
}

function GetSlopePlane(slope_plane) {
	const slope_planes_dict = {
        "XY": dimensions.SLOPE_PLANE_XY,
        "YZ": dimensions.SLOPE_PLANE_YZ,
        "XZ": dimensions.SLOPE_PLANE_XZ
	};

	if (slope_plane !== undefined) {
	  var plane = slope_planes_dict[slope_plane];
	  if (plane === undefined) {
		console.log("Wrong plane type. Value was: " + slope_plane);
		console.log("Correct values are: ( " + Object.keys(slope_planes_dict) + ")");
		plane = dimensions.SLOPE_PLANE_XY;
	  }
	  return plane;
	}
	else {
	  return dimensions.SLOPE_PLANE_XY;
	}
}
