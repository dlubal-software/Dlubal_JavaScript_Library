var t1 = new Date().getTime();
if (!RFEM) {
    throw new Error("This script is only for RFEM, it works with solids.");
}
include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
var solid = makeSolid([[8, -16, 0], [20, -16, 0], [20, -8, 0], [8, -8, 0], [8, -16, -5], [20, -16, -5], [20, -8, -5], [8, -8, -5]]);
var solid2 = makeSolid([[-17, -16, 0], [-5, -16, 0], [-5, -8, 0], [-17, -8, 0], [-17, -16, -5], [-5, -16, -5], [-5, -8, -5], [-17, -8, -5]], solids.TYPE_GAS, "Dry air");
var solid2 = makeSolid([[-17, -5, 0], [-5, -5, 0], [-5, 7, 0], [-17, 7, 0], [-17, -5, -5], [-5, -5, -5], [-5, 5, -5], [-17, 5, -5]], solids.TYPE_CONTACT, "C12/15");
var no = 1;

/*************************************Solid mesh refinement***********************************/
var solidMeshRefinement = new SolidMeshRefinement();
solidMeshRefinement.TargetLength(no++, [1], 0.15);
/*********************************************************************************************/

/******************************************Gas solid******************************************/
var gasSolid = new GasSolid(no++, 100, 300);
gasSolid.AssignTo([2]);
/*********************************************************************************************/

/******************************************Contact solid**************************************/
// Failure under compression, Rigid friction
var contactSolid = new ContactSolid(no++, 2, 2, [3.5]);
contactSolid.AssignTo([3]);
/*********************************************************************************************/
var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");