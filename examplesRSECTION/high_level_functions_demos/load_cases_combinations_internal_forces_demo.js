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
var load_case2 = new RSectionLoadCase(undefined, "PRESTRESS_P", "Second load case", false);
var load_case3 = new RSectionLoadCase(undefined, "PRESTRESS_P", "Third load case", false);
var load_combination = new RSectionLoadCombination(undefined, [[load_case.no], [load_case2.no, 2]], "First user load combination", false);
load_combination.AssignLoadCases([[load_case3.no, 0.8]]);

var internal_force = new RSectionInternalForces(undefined, load_case.no, "Y_Z");
internal_force.AxialForce(1500);
internal_force.ShearForces(2000, 2500);
internal_force.TorsionalMoments(500, 800);
internal_force.BendingMoments(1000, 2000);
var internal_force2 = new RSectionInternalForces(undefined, load_case2.no, "U_V", 1);
internal_force2.TorsionalMoments(500, 800);
internal_force2.BendingMoments(1000, 2000);
var internal_force3 = new RSectionInternalForces(undefined, load_case2.no);
internal_force3.AssignInternalForces(2000, [0, 2500], [1200], [1500, 2000]);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
