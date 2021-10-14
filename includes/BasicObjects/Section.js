function Section(no,
                 name,
                 material,
                 comment,
                 params)
{
    name = typeof name !== 'undefined' ? name : "IPE 300";
    ASSERT(typeof material !== 'undefined', "Material should be set");

    var section = engine.create_section(no, material);

    section.name = name;

    set_comment_and_parameters(section, comment, params);
    return section;
}
