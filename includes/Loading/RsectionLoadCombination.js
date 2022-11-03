if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Load combinations.");
}

/**
 * Create RSection Load combination
 * @class
 * @constructor
 * @param {Number}  no                      Number of Load case, can be undefined
 * @param {Array}   load_combination_items  Items of load combination - load case index and factor [[LC1no, factor], [LC2no, factor]]   
 * @param {String}  name                    Name, can be undefined
 * @param {Boolean} to_solve                To solve, can be undefined (true as default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Parameters, can be undefined
 * @returns Load combination
 */
function RSectionLoadCombination (no,
    load_combination_items,
    name,
    to_solve,
    comment,
    params) {
    this.load_combination = createBaseLoadCombinations(no, name, to_solve, comment, params);
    SetLoadCombinationItems(this.load_combination, load_combination_items);
}

function SetLoadCombinationItems(load_combination, 
    load_combination_items) {
    ASSERT(typeof load_combination !== "undefined", "Load combination number must be specified");
    ASSERT(typeof load_combination_items !== "undefined" && Array.isArray(load_combination_items), "At least one load case must be specified [[load_case_no1, factor1], [load_case_no2, factor2], ...]");
    var count = load_combination.items.row_count();
    for (var i = 0; i < load_combination_items.length; i++) {
        load_combination.items[count + i].load_case = load_combination_items[i][0];
        if (load_combination_items[i][1] !== "undefined") {
            load_combination.items[count + i].factor = load_combination_items[i][1];
        }
        else {
            load_combination.items[count + i + 1].factor = 1.0;
        }
    }
}

/**
 * Assigns load cases
 * @param {Array} load_combination_items    Load combination itemns [[load case no, factor], .... ]
 * @returns Modified load combination
 */
 RSectionLoadCombination.prototype.AssignLoadCases = function (load_combination_items) {
    if (this.load_combination !== "undefined") {
        SetLoadCombinationItems(this.load_combination, load_combination_items);
        return this.load_combination;
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