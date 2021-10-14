function SolidSet(no,
                  solids,
                  comment,
                  params)
{
    solids = typeof solids !== 'undefined' ? solids : [];

    var solid_set = engine.create_solid_set(no,  solids);
    set_comment_and_parameters(solid_set, comment, params);
    return solid_set;
}
