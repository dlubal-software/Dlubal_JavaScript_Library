/**
 * 'Consider construction stage' option is not cover: option is still disabled (Construction stage object has 'Construction stage analysis via', but it is disabled too).
 */

/**
 * Creates Result combination object
 * @class
 * @constructor
 * @param {Number}  no                        Number of Result combination, can be undefined
 * @param {Number}  design_situation_no       Design situation number
 * @param {Array}   load_case_items           Array of load cases, can be undefined
 *                                            At least one load case must be specified:
 *                                              - combination type 'General': [[load_case, factor, load_type, operator], [load_case, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_case], [load_case], ...]
 *                                            
 * @param {Array}   load_combination_items    Array of load combinations, can be undefined
 *                                            At least one load combination must be specified:
 *                                              - combination type 'General': [[load_combination, factor, load_type, operator], [load_combination, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_combination], [load_combination], ...] 
 * @param {String}  combination_type          Combination type, can be one of these types: GENERAL, ENVELOPE_PERMANENT, ENVELOPE_TRANSIENT, SUPERPOSITION.
 * @param {String}  comment                   Comment, can be undefined
 * @param {String}  params                    Additional parameters, can be undefined
 */
function ResultCombination(no,
  design_situation_no,
  load_case_items,
  load_combination_items,
  combination_type,
  comment,
  params) {
  if (arguments.length > 0) {
    this.result_combination = createResultCombination(no, design_situation_no, load_case_items, load_combination_items, combination_type, comment, params);
  }
}

/**
 * Creates General Result combination object
 * @param {Number}  no                        Number of Result combination, can be undefined
 * @param {Number}  design_situation_no       Design situation number
 * @param {Array}   load_case_items           Array of load cases, can be undefined
 *                                            At least one load case must be specified:
 *                                              - combination type 'General': [[load_case, factor, load_type, operator], [load_case, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_case], [load_case], ...]
 *                                            
 * @param {Array}   load_combination_items    Array of load combinations, can be undefined
 *                                            At least one load combination must be specified:
 *                                              - combination type 'General': [[load_combination, factor, load_type, operator], [load_combination, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_combination], [load_combination], ...] 
 * @param {String}  comment                   Comment, can be undefined
 * @param {String}  params                    Additional parameters, can be undefined
 */
ResultCombination.prototype.General = function (no,
  design_situation_no,
  load_case_items,
  load_combination_items,
  comment,
  params) {
  this.result_combination = createResultCombination(no, design_situation_no, load_case_items, load_combination_items, "GENERAL", comment, params);
};

/**
 * Creates Envelope permanent Result combination object
 * @param {Number}  no                        Number of Result combination, can be undefined
 * @param {Number}  design_situation_no       Design situation number
 * @param {Array}   load_case_items           Array of load cases, can be undefined
 *                                            At least one load case must be specified:
 *                                              - combination type 'General': [[load_case, factor, load_type, operator], [load_case, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_case], [load_case], ...]
 *                                            
 * @param {Array}   load_combination_items    Array of load combinations, can be undefined
 *                                            At least one load combination must be specified:
 *                                              - combination type 'General': [[load_combination, factor, load_type, operator], [load_combination, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_combination], [load_combination], ...] 
 * @param {String}  comment                   Comment, can be undefined
 * @param {String}  params                    Additional parameters, can be undefined
 */
ResultCombination.prototype.EnvelopePermanent = function (no,
  design_situation_no,
  load_case_items,
  load_combination_items,
  comment,
  params) {
  this.result_combination = createResultCombination(no, design_situation_no, load_case_items, load_combination_items, "ENVELOPE_PERMANENT", comment, params);
};

/**
 * Creates Envelope transient Result combination object
 * @param {Number}  no                        Number of Result combination, can be undefined
 * @param {Number}  design_situation_no       Design situation number
 * @param {Array}   load_case_items           Array of load cases, can be undefined
 *                                            At least one load case must be specified:
 *                                              - combination type 'General': [[load_case, factor, load_type, operator], [load_case, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_case], [load_case], ...]
 *                                            
 * @param {Array}   load_combination_items    Array of load combinations, can be undefined
 *                                            At least one load combination must be specified:
 *                                              - combination type 'General': [[load_combination, factor, load_type, operator], [load_combination, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_combination], [load_combination], ...] 
 * @param {String}  comment                   Comment, can be undefined
 * @param {String}  params                    Additional parameters, can be undefined
 */
ResultCombination.prototype.EnvelopeTransient = function (no,
  design_situation,
  load_case_items,
  load_combination_items,
  comment,
  params) {
  this.result_combination = createResultCombination(no, design_situation, load_case_items, load_combination_items, "ENVELOPE_TRANSIENT", comment, params);
};

/**
 * Creates Superposition Result combination object
 * @param {Number}  no                        Number of Result combination, can be undefined
 * @param {Number}  design_situation_no       Design situation number
 * @param {Array}   load_case_items           Array of load cases, can be undefined (in case the load combinations are specified).
 *                                            At least one load case must be specified:
 *                                              - combination type 'General': [[load_case, factor, load_type, operator], [load_case, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_case], [load_case], ...]
 *                                            
 * @param {Array}   load_combination_items    Array of load combinations, can be undefined
 *                                            At least one load combination must be specified:
 *                                              - combination type 'General': [[load_combination, factor, load_type, operator], [load_combination, factor, load_type, load_operator], ...]
 *                                              - other combination types: [[load_combination], [load_combination], ...] 
 * @param {String}  comment                   Comment, can be undefined
 * @param {String}  params                    Additional parameters, can be undefined
 */
ResultCombination.prototype.Superposition = function (no,
  design_situation_no,
  load_case_items,
  load_combination_items,
  comment,
  params) {
  this.result_combination = createResultCombination(no, design_situation_no, load_case_items, load_combination_items, "SUPERPOSITION", comment, params);
};

/**
 * Sets SRSS combination
 * @param {Boolean} use_equivalent_linear_combination   Use equivalent linear combination, can be undefined (false as default)
 * @param {String}  extreme_value_sign                  Extreme value sign, can be undefined ('SIGN_POSITIVE_OR_NEGATIVE' as default)
 * @param {Object}  according_load_case_or_combination  According load case or combination, can be undefined in case extreme_value_sign is not 'SIGN_ACCORDING_TO_LC_CO'; otherwise must be specified
 */
ResultCombination.prototype.SRSSCombination = function (use_equivalent_linear_combination,
  extreme_value_sign,
  according_load_case_or_combination) {
  ASSERT(this.result_combination.combination_type !== result_combinations.COMBINATION_TYPE_SUPERPOSITION, "If 'Superposition' combination type is set, SRSS combination is disabled");
  ASSERT(this.result_combination.generate_subcombinations === false, "If Generate sub-combinations of type 'Superposition' is set, SRSS combination is disabled");
  this.result_combination.srss_combination = true;
  if (typeof use_equivalent_linear_combination !== "undefined") {
    this.result_combination.srss_use_equivalent_linear_combination = use_equivalent_linear_combination;
  }
  this.result_combination.srss_extreme_value_sign = GetResultCombinationExtremeValueSign(extreme_value_sign);
  if (typeof according_load_case_or_combination !== "undefined") {
    ASSERT(this.result_combination.srss_extreme_value_sign === result_combinations.EXTREME_VALUE_SIGN_ACCORDING_TO_LC_CO, "Load case or combination can be specified only with 'According to LC/CO' extreme value sign");
    this.result_combination.srss_according_load_case_or_combination = according_load_case_or_combination;
  }
};

/**
 * Sets to solve
 * @param {Boolean}   to_solve  To solve state, can be undefined (true as default)
 */
ResultCombination.prototype.ToSolve = function (to_solve) {
  if (typeof to_solve === "undefined") {
      to_solve = true;
  }
  this.result_combination.to_solve = to_solve;
};

/**
 * Sets Generate sub-combinations of type 'Superposition'
 * @param {Boolean}   generate  Generate sub-combinations of 'Superposition' combination type, can be undefined (true as default)
 */
ResultCombination.prototype.GenerateSubCombinations = function (generate) {
  if (typeof generate === "undefined") {
    generate = true;
  }
  ASSERT(this.result_combination.combination_type !== result_combinations.COMBINATION_TYPE_SUPERPOSITION, "If 'Superposition' combination type is set, generation sub combinations is disabled");
  this.result_combination.generate_subcombinations = generate;
};

/**
 * @returns Number of Result combination
 */
ResultCombination.prototype.GetNo = function() {
  return this.result_combination.no;
};

/**
 * @returns Result combination object
 */
ResultCombination.prototype.GetResultCombination = function() {
  return this.result_combination;
};

function createResultCombination(no,
  design_situation_no,
  load_case_items,
  load_combination_items,
  combination_type,
  comment,
  params) {
  if (typeof no === "undefined") {
    var result_combination = result_combinations.create();
  }
  else {
      var result_combination = result_combinations.create(no);
  }
  if (design_situations.exist(design_situation_no)) {
    result_combination.design_situation = design_situations[design_situation_no];
  }
  else {
      console.log("Design situation no. " + design_situation_no + " doesn't exist");
  }
  result_combination.combination_type = GetResultCombinationType(combination_type);;
  SetResultCombinationItems(result_combination, load_case_items, load_combination_items);
  set_comment_and_parameters(result_combination, comment, params);
  return result_combination;
}

function GetResultCombinationType(combination_type) {
  const combination_types_dict = {
      "GENERAL" : result_combinations.COMBINATION_TYPE_GENERAL,
      "ENVELOPE_PERMANENT" : result_combinations.COMBINATION_TYPE_ENVELOPE_PERMANENT,
      "ENVELOPE_TRANSIENT" : result_combinations.COMBINATION_TYPE_ENVELOPE_TRANSIENT,
      "SUPERPOSITION" : result_combinations.COMBINATION_TYPE_SUPERPOSITION
  };
  if (combination_type !== undefined) {
    var combinationType = combination_types_dict[combination_type];
    if (combinationType === undefined) {
      combinationType = result_combinations.COMBINATION_TYPE_GENERAL;
      console.log("Wrong result combination type. Value was: " + combination_type);
      console.log("Correct values are: ( " + Object.keys(combination_types_dict) + ")");
    }
    return combinationType;
  }
  else {
    return result_combinations.COMBINATION_TYPE_GENERAL;
  }
}

function GetResultCombinationLoadType(combination_load_type) {
  const combination_load_types_dict = {
      "TRANSIENT" : result_combinations.LOAD_TYPE_TRANSIENT,
      "PERMANENT" : result_combinations.LOAD_TYPE_PERMANENT
  };
  if (combination_load_type !== undefined) {
    var combinationLoadType = combination_load_types_dict[combination_load_type];
    if (combinationLoadType === undefined) {
      combinationLoadType = result_combinations.LOAD_TYPE_TRANSIENT;
      console.log("Wrong result combination load type. Value was: " + combination_load_type);
      console.log("Correct values are: ( " + Object.keys(combination_load_types_dict) + ")");
    }
    return combinationLoadType;
  }
  else {
    return result_combinations.LOAD_TYPE_TRANSIENT;
  }
}

function GetResultCombinationOperator(combination_operator) {
  const combination_operators_dict = {
      "OR" : result_combinations.OPERATOR_OR,
      "AND" : result_combinations.OPERATOR_AND
  };
  if (combination_operator !== undefined) {
    var combinationOperator = combination_operators_dict[combination_operator];
    if (combinationOperator === undefined) {
      combinationOperator = result_combinations.OPERATOR_NONE;
      console.log("Wrong result combination operator. Value was: " + combination_operator);
      console.log("Correct values are: ( " + Object.keys(combination_operators_dict) + ")");
    }
    return combinationOperator;
  }
  else {
    return result_combinations.OPERATOR_NONE;
  }
}

function GetResultCombinationExtremeValueSign(extreme_value_sign) {
  const extreme_value_signs_dict = {
    "SIGN_POSITIVE_OR_NEGATIVE" : result_combinations.EXTREME_VALUE_SIGN_POSITIVE_OR_NEGATIVE,
    "SIGN_POSITIVE" : result_combinations.EXTREME_VALUE_SIGN_POSITIVE,
    "SIGN_NEGATIVE" : result_combinations.EXTREME_VALUE_SIGN_NEGATIVE,
    "SIGN_ACCORDING_TO_LC_CO" : result_combinations.EXTREME_VALUE_SIGN_ACCORDING_TO_LC_CO
  };
  if (extreme_value_sign !== undefined) {
    var extremeValueSign = extreme_value_signs_dict[extreme_value_sign];
    if (extremeValueSign === undefined) {
      extremeValueSign = result_combinations.EXTREME_VALUE_SIGN_POSITIVE_OR_NEGATIVE;
      console.log("Wrong result combination extreme value sign. Value was: " + extreme_value_sign);
      console.log("Correct values are: ( " + Object.keys(extreme_value_signs_dict) + ")");
    }
    return extremeValueSign;
  }
  else {
    return result_combinations.EXTREME_VALUE_SIGN_POSITIVE_OR_NEGATIVE;
  }
}

function SetResultCombinationItems(result_combination,
  load_case_items,
  load_combination_items) {
  ASSERT(typeof result_combination !== "undefined", "Result combination must be specified");
  if (typeof load_case_items !== "undefined") {
    if (result_combination.combination_type === result_combinations.COMBINATION_TYPE_GENERAL) {
      ASSERT(Array.isArray(load_case_items) && load_case_items.length > 0, "At least one load case must be specified [[load_case, factor, load_type, operator], [load_case, factor, load_type, load_operator], ...]");
    }
    else {
      ASSERT(Array.isArray(load_case_items) && load_case_items.length > 0, "At least one load case must be specified [[load_case], [load_case], ...]");
    }
  }
  if (typeof load_combination_items !== "undefined") {
    if (result_combination.combination_type === result_combinations.COMBINATION_TYPE_GENERAL) {
      ASSERT(Array.isArray(load_combination_items) && load_combination_items.length > 0, "At least one load combination must be specified [[load_combination, factor, load_type, operator], [load_combination, factor, load_type, load_operator], ...]");
    }
    else {
      ASSERT(Array.isArray(load_combination_items) && load_combination_items.length > 0, "At least one load combination must be specified [[load_combination], [load_combination], ...]");
    }
  }

  function setLoadCaseOrLoadCombinationItems(result_combination, items) {
    for (var i = 0; i < items.length; i++) {
      var row = result_combination.items.row_count();
      result_combination.items[row].case_object_item = items[i][0].no;
      if (result_combination.combination_type !== result_combinations.COMBINATION_TYPE_GENERAL && items[i].length > 1) {
        console.log("Only load case/combination will be set, factor/load type/operator can be set only with 'General' combination type");
      }
      if (items[i].length > 1) {
          result_combination.items[row].case_object_factor = items[i][1];
      }
      if (items[i].length > 2) {
          result_combination.items[row].case_object_load_type = GetResultCombinationLoadType(items[i][2]);
      }
      if (items[i].length > 3) {
          result_combination.items[row].operator = GetResultCombinationOperator(items[i][3]);
      }
    }
  }

  // Check parameters of load case/combination items array
  if (typeof load_case_items !== "undefined") {
    for (var i = 0; i < load_case_items.length; ++i) {
      ASSERT(load_case_items[i].length > 0, "At least one load case must be specified [load_case, (factor, load_type, operator)]");
      if (!load_cases.exist(load_case_items[i][0].no)) {
        console.log("Load case no. " + load_case_items[i][0].no + " doesn't exist");
      }
    }
  }
  if (typeof load_combination_items !== "undefined") {
    for (var i = 0; i < load_combination_items.length; ++i) {
      ASSERT(load_combination_items[i].length > 0, "At least one load combination must be specified [load_case, (factor, load_type, operator)]");
      if (!load_combinations.exist(load_combination_items[i][0].no)) {
        console.log("Load combination no. " + load_combination_items[i][0].no + " doesn't exist");
      }
    }
  }

  if (typeof load_case_items !== "undefined") {
    setLoadCaseOrLoadCombinationItems(result_combination, load_case_items);
  }
  if (typeof load_combination_items !== "undefined") {
    setLoadCaseOrLoadCombinationItems(result_combination, load_combination_items);
  }
}