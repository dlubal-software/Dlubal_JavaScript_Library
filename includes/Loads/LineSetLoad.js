include("LoadImpl.js");

function LineSetLoad(no,
                     load_case,
                     line_sets,
                     comment,
                     params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["line_sets"] = typeof line_sets !== 'undefined' ? line_sets : [];
    return LoadImpl("Line_Set_Load", no, load_case, comment, handled_params);
}
