function Thickness(no,
                   name,
                   material,
                   uniform_thickness_d,
                   comment,
                   params)
{
    name = typeof name !== 'undefined' ? name : "";
    uniform_thickness_d = typeof uniform_thickness_d !== 'undefined' ? uniform_thickness_d : 0.2;

    var thickness = engine.create_thickness(no);

    // Thickness Name
    thickness.name = name

    // Set material
    if (material !== 'undefined')
    {
        thickness.material = material;
    }

    // Uniform Thickness d
    thickness.uniform_thickness = uniform_thickness_d;

    set_comment_and_parameters(thickness, comment, params);
    return thickness;
}
