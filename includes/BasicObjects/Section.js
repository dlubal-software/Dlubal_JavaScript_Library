/**
 * Create Section
 * @class
 * @constructor
 * @param {int} no - Number of the Section
 * @param {string} name - Name of the Section
 * @param {int} material - Number of the material
 * @param {string} comment - Comment for the Opening
 * @param {dictionary} params - Parameters of the Opening
 * @returns section
 */
function Section(no,
    name,
    material,
    comment,
    params) {

    name = typeof name !== 'undefined' ? name : "IPE 300";
    ASSERT(typeof material !== 'undefined', "Material should be set");

    var section = engine.create_section(no, material);

    section.name = name;

    set_comment_and_parameters(section, comment, params);
    return section;
}
