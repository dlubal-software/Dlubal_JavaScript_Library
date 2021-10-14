function LineMeshRefinement(no,
                            comment,
                            params)
{
    var line_mesh_refinement = engine.create_line_mesh_refinement(no);
    set_comment_and_parameters(line_mesh_refinement, comment, params);
    return line_mesh_refinement;
}
