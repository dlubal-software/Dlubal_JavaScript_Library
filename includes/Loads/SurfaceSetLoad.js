include("LoadImpl.js");

function SurfaceSetLoad(no,
                        load_case,
                        surface_sets,
                        comment,
                        params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["surface_sets"] = typeof surface_sets !== 'undefined' ? surface_sets : [];
    return LoadImpl("Surface_Set_Load", no, load_case, comment, handled_params);
}
