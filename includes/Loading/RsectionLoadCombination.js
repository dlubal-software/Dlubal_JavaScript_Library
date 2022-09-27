if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Load combinations.");
}

function RSectionLoadCombinations (no,
    name,
    to_solve,
    comment,
    params) {
    this.load_combination = createBaseLoadCombinations(no, name, to_solve, comment, params);
}

RSectionLoadCombinations.prototype.SetLoadCases = function (loadCases) {
    ASSERT(typeof loadCases != "undefined", "At least one load caes must be defined");
    for (var i = 0; i < loadCases.length; ++i) {
        if (!load_cases.exist)
    }
}

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
}