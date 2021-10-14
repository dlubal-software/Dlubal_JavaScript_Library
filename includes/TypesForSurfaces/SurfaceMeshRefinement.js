function SurfaceMeshRefinement(no,
                               comment,
                               params)
{
    var surface_mesh_refinement = engine.create_surface_mesh_refinement(no);
    set_comment_and_parameters(surface_mesh_refinement, comment, params);
    return surface_mesh_refinement;
}
