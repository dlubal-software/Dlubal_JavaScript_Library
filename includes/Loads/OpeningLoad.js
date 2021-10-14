include("LoadImpl.js");

function OpeningLoad(no,
                     load_case,
                     openings,
                     comment,
                     params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["openings"] = typeof openings !== 'undefined' ? openings : [];
    return LoadImpl("Opening_Load", no, load_case, comment, handled_params);
}
