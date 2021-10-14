include("LoadImpl.js");

function NodalLoad(no,
                   load_case,
                   nodes,
                   comment,
                   params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["nodes"] = typeof nodes !== 'undefined' ? nodes : [];
    return LoadImpl("Nodal_Load", no, load_case, comment, handled_params);
}
