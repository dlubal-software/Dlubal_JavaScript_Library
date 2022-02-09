run("/clearAll.js");

var SASGeometricallyLinear = new StaticAnalysisSettings().GeometricallyLinear(1,"MySASLinear","METHOD_OF_EQUATION_SYSTEM_DIRECT","PLATE_BENDING_THEORY_KIRCHHOFF",[true,2.0,3.0,4.0],[true,5,true]);
// var DiagramParams = {
// 	//calculation_diagrams_enabled				: true,
// 	//mass_conversion_enabled						: true,
// 	//mass_conversion_acceleration_in_direction_z	: 30,
// 	max_number_of_iterations					: 200,
// 	number_of_load_increments					: 20,
// 	plate_bending_theory						: static_analysis_settings.PLATE_BENDING_THEORY_KIRCHHOFF,
// 	//maximum_number_of_reactivations				:20
// };
var SASSecondOrder = new StaticAnalysisSettings().SecondOrder(2,"MySASLinear","METHOD_OF_EQUATION_SYSTEM_DIRECT","NEWTON_RAPHSON",100,1,"PLATE_BENDING_THEORY_KIRCHHOFF",[true,2.0,3.0,4.0],[true,5,true]);
var SASSecondOrder = new StaticAnalysisSettings().LargeDeformations(3,"MySASLinear","METHOD_OF_EQUATION_SYSTEM_DIRECT","NEWTON_RAPHSON",100,1,undefined,"PLATE_BENDING_THEORY_KIRCHHOFF",[true,2.0,3.0,4.0],[true,5,true]);