run("../includes/Tools/clearAll.js");

var CLEAR_ALL_DISABLED = true;
run("../examples/high_level_functions_demos/load_cases_demo.js");
run("../examples/high_level_functions_demos/load_combinations_demo.js");
run("../examples/high_level_functions_demos/design_situations_demo.js");

load_cases_and_combinations.result_combinations_active = true;

var resultCombination = new ResultCombination();
resultCombination.General(undefined, design_situations[2].no, [[load_cases[3], 0.5, "PERMANENT", "AND"], [load_cases[7], 1.5, "PERMANENT"]]);
var resultCombination2 = new ResultCombination();
resultCombination2.EnvelopePermanent(undefined, design_situations[1].no, [[load_cases[3]], [load_cases[7]]]);
resultCombination2.SRSSCombination(true, "SIGN_ACCORDING_TO_LC_CO", load_cases[7]);
var resultCombination3 = new ResultCombination();
resultCombination3.EnvelopeTransient(undefined, design_situations[1].no, [[load_cases[3]], [load_cases[7]]]);
resultCombination3.GenerateSubCombinations();
var resultCombination4 = new ResultCombination();
resultCombination4.EnvelopeTransient(undefined, design_situations[1].no, [[load_cases[3]], [load_cases[7]]]);
resultCombination4.SRSSCombination(true, "SIGN_POSITIVE");
resultCombination4.ToSolve(false);
var resultCombination5 = new ResultCombination();
resultCombination5.Superposition(undefined, design_situations[1].no, [[load_cases[1]]]);

CONSTRUCTION_STAGES.setActive(true);
