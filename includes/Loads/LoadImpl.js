function LoadImpl(load_type,
                  no,
                  load_case,
                  comment,
                  params)
{
    load_case = typeof load_case !== 'undefined' ? load_case : null;
    ASSERT(load_case != null, "Load Case is required parameter");

    var nodal_load = engine.create_load(no, load_type, load_case);
    set_comment_and_parameters(nodal_load, comment, params);
    return nodal_load;
}
