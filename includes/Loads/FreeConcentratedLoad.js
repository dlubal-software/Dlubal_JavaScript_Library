include("LoadImpl.js");

function FreeConcentratedLoad(no,
                              load_case,
                              surfaces,
                              comment,
                              params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["surfaces"] = typeof surfaces !== 'undefined' ? surfaces : [];
    return LoadImpl("Free_Concentrated_Load", no, load_case, comment, handled_params);
}
