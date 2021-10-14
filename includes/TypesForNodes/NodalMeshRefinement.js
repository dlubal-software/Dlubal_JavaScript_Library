function NodalMeshRefinement(no,
                             comment,
                             params)
{
    var nodal_mesh_refinement = engine.create_nodal_mesh_refinement(no);
    set_comment_and_parameters(nodal_mesh_refinement, comment, params);
    return nodal_mesh_refinement;
}
