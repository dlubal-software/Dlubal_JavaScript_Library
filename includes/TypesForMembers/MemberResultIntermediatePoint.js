/**
* Creates member result intermediate point
* @class
* @constructor
* @param	{Number}	no				Index of member definable stiffness, can be undefined
* @param	{Array}		members			Assigned members, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			Member result intermediate point parameters, can be undefined
* @return	{Object}	Created member result intermediate point
*/
function MemberResultIntermediatePoint(no,
	members,
	comment,
	params) {
    this.memberResultIntermediatePoint = engine.create_member_result_intermediate_point(no);
	if (typeof members != "undefined") {
		this.memberResultIntermediatePoint.members = members;
	}
    set_comment_and_parameters(this.memberResultIntermediatePoint, comment, params);
}

/**
* Sets number of points
* @param	{Number}	divisions_count		Number of division ordinates
* @param	{Array}		notes				Notes to each point, can be undefined
*/
MemberResultIntermediatePoint.prototype.UniformDistances = function (division_count, notes) {
	this.memberResultIntermediatePoint.uniform_distribution = true;
	this.memberResultIntermediatePoint.point_count = division_count;
	if (typeof notes != "undefined") {
		ASSERT(notes.length === this.memberResultIntermediatePoint.distances.row_count(), "Number of notes has to be equal to points count");
		for (var i = 0; i < notes.length; ++i) {
			this.memberResultIntermediatePoint.distances[i + 1].note = notes[i];
		}
	}
};

/**
* Sets division ordinates
* @param	{Array}		division_ordinates	Division ordinates
* @param	{Array}		notes				Division ordinates notes, can be undefined
* @param	{Boolean}	clear_ordinates		Clears default ordinates, can be undefined (default value is true)
*/
MemberResultIntermediatePoint.prototype.DivisionOrdinates = function (division_ordinates,
	notes,
	clear_ordinates) {
	this.memberResultIntermediatePoint.uniform_distribution = false;
	if (typeof notes != "undefined") {
		ASSERT(division_ordinates.length === notes.length, "Number of notes has to be equal to number of points");
	}
	if (typeof clear_ordinates === "undefined" || clear_ordinates) {
		var points = this.memberResultIntermediatePoint.distances.row_count();
		while (points-- > 1) {
			this.memberResultIntermediatePoint.distances.remove_row(1);
		}
	}
	for (var i = 0; i < division_ordinates.length; ++i) {
		var row = this.memberResultIntermediatePoint.distances.row_count();
		this.memberResultIntermediatePoint.distances[row].value = division_ordinates[i];
		if (typeof notes != "undefined") {
			this.memberResultIntermediatePoint.distances[row].note = notes[i];
		}
	}
};

/**
* Sets division ordinates as absolute
* @param	{Boolean}	absolute	Division ordinates are absolute, can be undefined (default value is true)
*/
MemberResultIntermediatePoint.prototype.DistancesAreAbsolute = function (absolute) {
	ASSERT(this.memberResultIntermediatePoint.uniform_distribution === false, "Uniform distances must be off");
	if (typeof absolute === "undefined") {
		absolute = true;
	}
	this.memberResultIntermediatePoint.distances_are_defined_as_absolute = absolute;
};