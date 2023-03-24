/**
 * Create Solid Set
 * @class
 * @constructor
 * @param {int} no - Number of Solid Set
 * @param {array} solids_no - List of solids
 * @param {string} solid_set_type - Type of the Solid Set
 * @param {string} comment - Comment for the Solid Set
 * @param {dictionary} params - Parameters of the Solid Set
 * @returns Solid Set
 */
function SolidSet(no,
    solids_no,
    solid_set_type,
    comment,
    params) {

    if (arguments.length !== 0) {
        solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
        solid_set_type = typeof solid_set_type !== 'undefined' ? solid_set_type : "";
        this.solid_set = engine.create_solid_set(no, solids_no);
        this.solid_set.set_type = GetSolidSetType(solid_set_type);
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
    params) {
    solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
    this.solid_set = engine.create_solid_set(no, solids_no);
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
    params) {
    solids_no = typeof solids_no !== 'undefined' ? solids_no : [];
    this.solid_set = engine.create_solid_set(no, solids_no);
    this.solid_set.set_type = solid_sets.SET_TYPE_GROUP;
    set_comment_and_parameters(this.solid_set, comment, params);
};

function GetSolidSetType(solid_set_type) {
	const solid_set_types_dict = {
        "TYPE_CONTINUOUS": solid_sets.SET_TYPE_CONTINUOUS,
        "TYPE_GROUP": solid_sets.SET_TYPE_GROUP
	};

	if (solid_set_type !== undefined) {
	  var type = solid_set_types_dict[solid_set_type];
	  if (type === undefined) {
		console.log("Wrong solid set type. Value was: " + solid_set_type);
		console.log("Correct values are: ( " + Object.keys(solid_set_types_dict) + ")");
		type = solid_sets.SET_TYPE_CONTINUOUS;
	  }
	  return type;
	}
	else {
	  return solid_sets.SET_TYPE_CONTINUOUS;
	}
}
