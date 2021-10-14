include("LoadImpl.js");

function SolidLoad(no,
                   load_case,
                   solids,
                   comment,
                   params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["solids"] = typeof solids !== 'undefined' ? solids : [];
    return LoadImpl("Solid_Load", no, load_case, comment, handled_params);
}
