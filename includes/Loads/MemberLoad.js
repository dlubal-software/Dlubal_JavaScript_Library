include("LoadImpl.js");

function MemberLoad(no,
                    load_case,
                    members,
                    comment,
                    params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["members"] = typeof members !== 'undefined' ? members : [];
    return LoadImpl("Member_Load", no, load_case, comment, handled_params);
}
