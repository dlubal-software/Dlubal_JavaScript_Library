function Material(no,
                  name,
                  comment,
                  params)
{
    name = typeof name !== 'undefined' ? name : "S235";

    var material = engine.create_material(no);

    material.name = name;

    set_comment_and_parameters(material, comment, params);
    return material;
}
