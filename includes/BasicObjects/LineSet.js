/**
 * @class LineSet
 * @constructor
 * @param {int} no - Number of Line Set
 * @param {array} lines - List of the number of the lines
 * @param {string} comment - Comment for the Line Set
 * @param {dictionary} params - Parameters of the Line Set
 * @returns lineSet
 */
function LineSet(no,
    lines,
    comment,
    params) {
    if (typeof (lines) !== "undefined") {
        lines = typeof lines !== 'undefined' ? lines : [];
        this.line_set = engine.create_line_set(no, lines);
        set_comment_and_parameters(this.line_set, comment, params);
        return this.line_set;
    }
}

/**
 * Create Continuous Lines lineSet type
 * @param {int} no - Number of Line Set
 * @param {array} lines - List of the number of the lines
 * @param {string} comment - Comment for the Line Set
 * @param {dictionary} params - Parameters of the Line Set
 */
LineSet.prototype.ContinuousLines = function (no,
    lines,
    comment,
    params) {
    lines = typeof lines !== 'undefined' ? lines : [];
    this.line_set = engine.create_line_set(no, lines);
    this.line_set.set_type = line_sets.SET_TYPE_CONTINUOUS;
    set_comment_and_parameters(this.line_set, comment, params);
};

/**
 * Create Group of Lines
 * @param {int} no - Number of Line Set
 * @param {array} lines - List of the number of the lines
 * @param {string} comment - Comment for the Line Set
 * @param {dictionary} params - Parameters of the Line Set
 */
LineSet.prototype.GroupOfLines = function (no,
    lines,
    comment,
    params) {
    lines = typeof lines !== 'undefined' ? lines : [];
    this.line_set = engine.create_line_set(no, lines);
    this.line_set.set_type = line_sets.SET_TYPE_GROUP;
    set_comment_and_parameters(this.line_set, comment, params);
};
