function ASSERT(result, message)
{
    engine.SCRIPT_ASSERT(result, message);
}

function set_comment_and_parameters(target_obj, comment, params)
{
    var handled_comment = typeof comment !== 'undefined' ? comment : "";
    var handled_params = typeof params !== 'undefined' ? params : {};

    // Comment
    target_obj.comment = handled_comment;

    // Parameters
    for (var key in handled_params)
    {
        target_obj[key] = params[key];
    }
}
