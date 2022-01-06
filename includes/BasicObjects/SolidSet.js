/**
 * Create Solid Set
 * @param {int} no - Number of Solid Set
 * @param {array} solids_no - List of solids
 * @param {string} solid_set_type - Type of the Solid Set
 * @param {string} comment - Comment for the Solid Set
 * @param {dictionary} params - Parameters of the Solid Set
 * @returns 
 */
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
/**
 * Create Continuous Solids solidSet type
 * @param {int} no - Number of Solid Set
 * @param {array} solids_no - List of solids
 * @param {string} comment - Comment for the Solid Set
 * @param {dictionary} params - Parameters of the Solid Set
 */
SolidSet.prototype.ContinuousSolids = function (no,
                                                solids_no,
                                                comment,
                                                params)
{
        solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
        this.solid_set = engine.create_solid_set(no,  solids_no);
        this.solid_set.set_type = solid_sets.SET_TYPE_CONTINUOUS;
        set_comment_and_parameters(this.solid_set, comment, params);
};

/**
 * Create Group of Solids
 * @param {int} no - Number of Solid Set
 * @param {array} solids_no - List of solids
 * @param {string} comment - Comment for the Solid Set
 * @param {dictionary} params - Parameters of the Solid Set
 */
SolidSet.prototype.GroupOfSolids = function (no,
                                             solids_no,
                                             comment,
                                             params)
{
        solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
        this.solid_set = engine.create_solid_set(no,  solids_no);
        this.solid_set.set_type = solid_sets.SET_TYPE_GROUP;
        set_comment_and_parameters(this.solid_set, comment, params);
};