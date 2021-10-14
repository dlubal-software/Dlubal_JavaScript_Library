include("LoadImpl.js");

function ImposedNodalDeformation(no,
                                 load_case,
                                 nodes,
                                 comment,
                                 params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["nodes"] = typeof nodes !== 'undefined' ? nodes : [];
    return LoadImpl("Imposed_Nodal_Deformation", no, load_case, comment, handled_params);
}
