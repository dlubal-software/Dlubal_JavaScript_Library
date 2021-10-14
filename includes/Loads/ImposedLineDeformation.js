include("LoadImpl.js");

function ImposedLineDeformation(no,
                                load_case,
                                lines,
                                comment,
                                params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["lines"] = typeof lines !== 'undefined' ? lines : [];
    return LoadImpl("Imposed_Line_Deformation", no, load_case, comment, handled_params);
}
