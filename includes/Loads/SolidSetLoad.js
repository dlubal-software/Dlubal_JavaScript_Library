include("LoadImpl.js");

function SolidSetLoad(no,
                      load_case,
                      solid_sets,
                      comment,
                      params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["solid_sets"] = typeof solid_sets !== 'undefined' ? solid_sets : [];
    return LoadImpl("Solid_Set_Load", no, load_case, comment, handled_params);
}
