include("LoadImpl.js");

function LineLoad(no,
                  load_case,
                  lines,
                  comment,
                  params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["lines"] = typeof lines !== 'undefined' ? lines : [];
    return LoadImpl("Line_Load", no, load_case, comment, handled_params);
}
