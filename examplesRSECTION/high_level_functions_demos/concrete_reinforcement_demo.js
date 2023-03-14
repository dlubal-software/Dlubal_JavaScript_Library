if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

/*
Bar & Stirrups - PRERELEASE MODE!
*/

include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

var t1 = new Date().getTime();

run("../includes/Tools/clearAll.js");

general.has_concrete_reinforcement = true;
/*********************************************** Stirrups ****************************************/
var concreteMaterial = new Material(undefined, "C12/15");
var rsPart = new RSectionPart();
var reinforcedSteelMaterial = new Material(undefined, "B550S(B)");
rsPart.Rectangle(undefined, [-0.3, -0.6], 0.6, 1.2, concreteMaterial.GetNo());
var stirrup = new Stirrup(undefined, [501, 502, 503, 504, 501], reinforcedSteelMaterial.GetNo(), 0.022, 0.022, 1);



/*********************************************** Bars ********************************************/

var userLayer1 = new Layer(2, "User layer1"); 
var userLayer2 = new Layer(3, "User layer2"); 
var userLayer3 = new Layer(4, "User laye3r"); 
var userLayer4 = new Layer(5, "User layer4"); 
var userLayer5 = new Layer(6, "User layer5"); 
var userLayer6 = new Layer(7, "User layer6"); 
var bar = new Bar();
bar.MultiUniform(1, reinforcedSteelMaterial.GetNo(), userLayer1.GetNo(), "REFERENCE_TYPE_Y", 0.01, -0.015);   
bar.StartAndEndPoint(506,511);
var bar2 = new Bar();
bar2.MultiVariable(2, reinforcedSteelMaterial.GetNo(), userLayer2.GetNo(), "REFERENCE_TYPE_Y", 0.010, -0.020, 3, 0.01, 0.20, 0.010);
bar2.StartAndEndPoint(517,512);
var bar3 = new Bar();
bar3.SingleBetweenTwoPoints(3, reinforcedSteelMaterial.GetNo(), userLayer3.GetNo(), "REFERENCE_TYPE_Z", 0.010, 0.050, "DISTANCE_FROM_START", 0.25, false);
bar3.StartAndEndPoint(4,1);
var bar4 = new Bar();
bar4.SingleBetweenTwoPoints(4, reinforcedSteelMaterial.GetNo(), userLayer4.GetNo(),  "REFERENCE_TYPE_Z", 0.010, 0.1, "DISTANCE_FROM_START", 0.75, true);
bar4.StartAndEndPoint(4,1);
var bar5 = new Bar();
bar5.SingleBetweenTwoPoints(5, reinforcedSteelMaterial.GetNo(), userLayer4.GetNo(),  "REFERENCE_TYPE_Z", 0.010, -0.1, "DISTANCE_FROM_END", 0.25, false);//????
bar5.StartAndEndPoint(3,2);
var bar6 = new Bar();
bar6.SingleBetweenTwoPoints(6, reinforcedSteelMaterial.GetNo(), userLayer4.GetNo(),  "REFERENCE_TYPE_Z", 0.010, -0.1, "DISTANCE_FROM_END", 0.75, true);
bar6.StartAndEndPoint(3,2);

var bar7 = new Bar();
bar7.SinglePoint(7, reinforcedSteelMaterial.GetNo(), userLayer5.GetNo(), 0.01, 0.05, -0.75); 
bar7.StartPoint(4);



var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
