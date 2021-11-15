function SolidSet(no,
                  solids_no,
                  solid_set_type,
                  comment,
                  params)
{
    if (typeof (solids_no) !== "undefined") 
    {
        solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
        solid_set_type = typeof solid_set_type !== 'undefined' ? solid_set_type : "";
        this.solid_set = engine.create_solid_set(no,  solids_no);
        if (solid_set_type == "SET_TYPE_CONTINUOUS" || solid_set_type =="")
        {
            this.solid_set.set_type = solid_sets.SET_TYPE_CONTINUOUS;
        }
        if (solid_set_type == "SET_TYPE_GROUP")
        {
            this.solid_set.set_type = solid_sets.SET_TYPE_GROUP;
        }
        set_comment_and_parameters(this.solid_set, comment, params);
        return this.solid_set;
    }
}

SolidSet.prototype.ContinuousSolids = function (no,
                                                solids_no,
                                                comment,
                                                params)
{
        solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
        this.solid_set = engine.create_solid_set(no,  solids_no);
        this.solid_set.set_type = solid_sets.SET_TYPE_CONTINUOUS;
        set_comment_and_parameters(this.solid_set, comment, params);
}

SolidSet.prototype.GroupOfSolids = function (no,
                                             solids_no,
                                             comment,
                                             params)
{
        solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
        this.solid_set = engine.create_solid_set(no,  solids_no);
        this.solid_set.set_type = solid_sets.SET_TYPE_GROUP;
        set_comment_and_parameters(this.solid_set, comment, params);
}
