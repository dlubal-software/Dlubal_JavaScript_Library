function CoordinateSystem(no, coordinate_system_type, comment, params)
{
    var coordinate_system = engine.create_coordinate_system(no);

    var coordinate_system_type_handled = typeof coordinate_system_type !== 'undefined' ? coordinate_system_type : model.coordinate_systems.TYPE_3_POINTS;
    coordinate_system.type = coordinate_system_type_handled;
    var handled_params = typeof params !== 'undefined' ? params : {};

    function set_coordinates(coordinates_parameter, coordinate_properties)
    {
        if (handled_params.hasOwnProperty(coordinates_parameter))
        {
            var point = handled_params[coordinates_parameter];
            if (Array.isArray(point))
            {
                coordinate_system[coordinate_properties[0]] = point[0];
                coordinate_system[coordinate_properties[1]] = point[1];
                coordinate_system[coordinate_properties[2]] = point[2];
            }
            else if (point['objectType'] !== undefined && point.objectType() == model.nodes.objectType())
            {
                coordinate_system[coordinate_properties[0]] = point.coordinate_1;
                coordinate_system[coordinate_properties[1]] = point.coordinate_2;
                coordinate_system[coordinate_properties[2]] = point.coordinate_3;
            }
            delete handled_params[coordinates_parameter];
        }
    }

    set_coordinates('origin_coordinates', ['origin_coordinate_x', 'origin_coordinate_y', 'origin_coordinate_z']);
    set_coordinates('u_axis_point_coordinates', ['u_axis_point_coordinate_x', 'u_axis_point_coordinate_y', 'u_axis_point_coordinate_z']);
    set_coordinates('uw_plane_point_coordinates', ['uw_plane_point_coordinate_x', 'uw_plane_point_coordinate_y', 'uw_plane_point_coordinate_z']);

    set_comment_and_parameters(coordinate_system, comment, handled_params);
    return coordinate_system;
}
