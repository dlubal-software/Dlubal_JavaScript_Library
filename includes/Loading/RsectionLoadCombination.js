if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Load combinations.");
}

/**
 * Create RSection Load combination
 * @class
 * @constructor
 * @param {Number}  no                  Number of Load case, can be undefined
 * @param {String}  name                Name, can be undefined
 * @param {Boolean} to_solve            To solve, can be undefined (true as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Load combination
 */
function RSectionLoadCombination (no,
    name,
    to_solve,
    comment,
    params) {
    this.load_combination = createBaseLoadCombinations(no, name, to_solve, comment, params);
}

/**
 * Sets load cases
 * @param {Array} loadCases     Load cases
 * @param {Array} factors       Factors, can be undefined
 */
RSectionLoadCombination.prototype.SetLoadCases = function (loadCases,
    factors) {
    ASSERT(typeof loadCases != "undefined", "At least one load caes must be defined");
    if (typeof factors !== "undefined") {
        ASSERT(factors.length === loadCases.length, "Factor array must contains " + loadCases.length + " factor(s)");
    }
    for (var i = 0; i < loadCases.length; ++i) {
        if (!load_cases.exist(loadCases[i].no)) {
            console.log("Load case " + loadCases[i] + " doesn't exist");
        }
        else {
            this.load_combination.items[i + 1].load_case = loadCases[i];
            if (typeof factors !== "undefined") {
                this.load_combination.items[i + 1].factor = factors[i];
            }
        }
    }
};

/**
 * Create RSection Load combination
 * @param {Number}  no                  Number of Load case, can be undefined
 * @param {String}  name                Name, can be undefined
 * @param {Boolean} to_solve            To solve, can be undefined (true as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Load combination
 */
function createBaseLoadCombinations (no,
    name,
    to_solve,
    comment,
    params) {
    if (typeof no !== "undefined") {
        var load_combination = load_combinations.create(no);
    }
    else {
        var load_combination = load_combinations.create();
    }
    if (typeof name !== "undefined") {
        load_combination.user_defined_name_enabled = true;
        load_combination.name = name;
    }
    if (typeof to_solve !== "undefined") {
        load_combination.to_solve = to_solve;
    }
    set_comment_and_parameters(load_combination, comment, params);
    return load_combination;
};