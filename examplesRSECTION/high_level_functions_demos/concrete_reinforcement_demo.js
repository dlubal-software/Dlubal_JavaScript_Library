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

var material = new Material(undefined, "S235");
var material2 = new Material(undefined, "Grade 40");
var section = new Section(1, "IPE 80", material.GetNo());
var section2 = new Section(2, "IPE 100", material.GetNo());

var pointsList = [
    [0.1, -0.15], [0.1, -0.144], [0.097656854249492, -0.138343145750508], [0.092, -0.136], [0.015, -0.136], [0.007928932188135, -0.133071067811865], [0.005, -0.126],
    [0.005, 0.126], [0.007928932188135, 0.133071067811865], [0.015, 0.136], [0.092, 0.136], [0.097656854249492, 0.138343145750508], [0.1, 0.144], [0.1, 0.15],
    [-0.1, 0.15], [-0.1, 0.144], [-0.097656854249492, 0.138343145750508], [-0.092, 0.136], [-0.015, 0.136], [-0.007928932188135, 0.133071067811865], [-0.005, 0.126],
    [-0.005, -0.126], [-0.007928932188135, -0.133071067811865], [-0.015, -0.136], [-0.092, -0.136], [-0.097656854249492, -0.138343145750508], [-0.1, -0.144],
    [-0.1, -0.15]
];

var polylinesList = [
    [1, 2], [4, 5], [7, 8], [10, 11], [13, 14], [14, 15], [15,16], [18, 19], [21, 22], [24, 25], [27, 28], [28, 1]
];

var arclineList = [
    [2, 4, 3], [5, 7, 6], [8, 10, 9], [11, 13, 12], [16, 18, 17], [19, 21, 20], [22, 24, 23], [25, 27, 26]
];

var rsPoint = new RSectionPoint();
var rsLine = new RSectionLine();
var linesForPart = [];

for (var i = 0; i < pointsList.length; ++i) {
    rsPoint.Standard(undefined, pointsList[i][0], pointsList[i][1]);
}

for (var i = 0; i < polylinesList.length; ++i) {
    linesForPart.push(rsLine.Polyline(undefined, polylinesList[i]));
}

for (var i = 0; i < arclineList.length; ++i) {
    if (i == 0 || i == 7) {
        continue;
    }
    var point = points[arclineList[i][2]];
    linesForPart.push(rsLine.Arc(undefined, [arclineList[i][0], arclineList[i][1]], [point.coordinate_1, point.coordinate_2]));
}

/*********************************************** Bars ********************************************/
general.has_concrete_reinforcement = true;
var userLayer = new Layer(undefined, "User layer"); 
var bar = new Bar();
bar.MultiUniform(undefined, material2.GetNo(), 1, "REFERENCE_TYPE_Y", 0.001, -0.020);     // With default 2 bars
bar.StartPoint(31);
bar.EndPoint(32);
var bar2 = new Bar();
bar2.MultiVariable(undefined, material2.GetNo(), 1, "REFERENCE_TYPE_Z", 0.010, -0.020, undefined, undefined, 0.020, 0.010); // With added axial distance sj
bar2.StartPoint(28);
bar2.EndPoint(1);
var bar3 = new Bar();
bar3.SingleBetweenTwoPoints(undefined, material2.GetNo(), 1, undefined, 0.010, -0.020, 0.02, undefined, false); // With default ("L") reference type and absolute Xj-k value specified
bar3.StartPoint(15);
bar3.EndPoint(14);
var bar4 = new Bar();
bar4.SingleBetweenTwoPoints(undefined, material2.GetNo(), 1, undefined, 0.010, -0.020, 0.3); // With default ("L") reference type and relative Xi-k value specified
bar4.StartPoint(15);
bar4.EndPoint(14);
var bar5 = new Bar();
bar5.SinglePoint(undefined, material2.GetNo(), 1, undefined, 0.05, 0.05);  // With default diameter
bar5.StartPoint(40);
var bar6 = new Bar();
bar6.SinglePoint(undefined, material2.GetNo(), 1);  // With default diameter and offsets
bar6.StartPoint(50);
var bar7 = new Bar();
bar7.SinglePoint(undefined, material2.GetNo(), 1);  // With default diameter and offsets
bar7.StartPoint(51);
var bar8 = new Bar();
bar8.SinglePoint(undefined, material2.GetNo(), 1);  // With default diameter and offsets
bar8.StartPoint(52);
var bar9 = new Bar();
bar9.SinglePoint(undefined, material2.GetNo(), 1);  // With default diameter and offsets
bar9.StartPoint(53);

/*********************************************** Stirrups ****************************************/
var concreteMaterial = new Material(undefined, "C12/15");
var rsPart = new RSectionPart();
var reinforcedSteelMaterial = new Material(undefined, "Grade 40");
rsPart.Rectangle(undefined, [0.3, -0.18], 0.28, 0.11, concreteMaterial.GetNo());
var stirrup = new Stirrup(undefined, [501, 502, 503, 504, 501], reinforcedSteelMaterial.GetNo(), 0.022, 0.022, 1);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
