/**
 * Create Material
 * @param {int} no - Number of Material
 * @param {string} name - Name of Material
 * @param {string} comment - Comment for the Material
 * @param {dictionary} params - Parameters of the Material
 * @returns material
 */
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
