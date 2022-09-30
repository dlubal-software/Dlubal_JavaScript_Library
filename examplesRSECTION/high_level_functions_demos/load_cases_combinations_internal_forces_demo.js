if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

var load_case = new RSectionLoadCase(undefined, "PERMANENT_G", "First load case", false);
var load_case2 = new RSectionLoadCase(undefined, "PRESTRESS_P", "First load case", false);
var load_combination = new RSectionLoadCombination(undefined, "First user load combination", false);
load_combination.SetLoadCases([load_case, load_case2], [0.5, 2]);

console.log(load_cases.E_INTERNAL_FORCES_SYSTEM_PRINCIPAL_AXES_U_V);
var internal_force = new RSectionInternalForces(undefined, load_case.no, "Y_Z");
internal_force.AxialForce(1500);
internal_force.ShearForces(2000, 2500);
internal_force.TorsionalMoments(500, 800);
internal_force.BendingMoments(1000, 2000);
var internal_force = new RSectionInternalForces(undefined, load_case.no, "U_V", 1);
internal_force.TorsionalMoments(500, 800);
internal_force.BendingMoments(1000, 2000);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
