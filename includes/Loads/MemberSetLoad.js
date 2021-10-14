include("LoadImpl.js");

function MemberSetLoad(no,
                       load_case,
                       member_sets,
                       comment,
                       params)
{
    var handled_params = typeof params !== 'undefined' ? params : {};
    handled_params["member_sets"] = typeof member_sets !== 'undefined' ? member_sets : [];
    return LoadImpl("Member_Set_Load", no, load_case, comment, handled_params);
}
