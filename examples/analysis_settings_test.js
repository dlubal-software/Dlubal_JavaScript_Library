run("/clearAll.js");

// create empty instance
// var SAS = new StaticAnalysisSettings();

// // set parameters via HL functions
// SAS.SetMaxNumberOfIterations(600);
// SAS.SetNumberOfLoadIncrements(4);

// // direct access to  static analysis settings
// SAS.settings.comment = "Access via .settings";
// SAS.settings.analysis_type = static_analysis_settings.SECOND_ORDER_P_DELTA;
// // prototypes with analysis type
// var l = new StaticAnalysisSettings();
// l.Linear("iterative");
// l.SetMaxNumberOfIterations(1000);
// l.SetNumberOfLoadIncrements(4);
// l.SetComment("Linear iterative, 1000 iterations, 4 load increments");
// var s = new StaticAnalysisSettings();
// s.SecondOrder("iterative", "Postcritical");
// s.SetMaxNumberOfIterations(1500);
// s.SetNumberOfLoadIncrements(6);
// s.SetComment("Second order, iterative ,picard, 1500 iterations, 6 load increments");

// var large_def = new StaticAnalysisSettings();
// large_def.LargeDeformations("iterative", "Combined");
// large_def.SetMaxNumberOfIterations(500);
// large_def.SetNumberOfLoadIncrements(8);
// large_def.SetComment("Second order, iterative ,combined, 500 iterations, 8 load increments");
// // create instance with parameters
// new StaticAnalysisSettings(undefined, "linear", "neco");
// new StaticAnalysisSettings(undefined,  "fde", "direct");
// var SAS2 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Postcritical" );
// SAS2.SetMaxNumberOfIterations(600);
// SAS2.SetNumberOfLoadIncrements(4);
// var SAS3 = new StaticAnalysisSettings(undefined, "large deformations", hgfgf, "Dynamic");
// SAS3.SetMaxNumberOfIterations(600);
// SAS3.SetNumberOfLoadIncrements(4);
// new StaticAnalysisSettings(undefined,2, 3, 4, 5, []);
// new StaticAnalysisSettings(undefined, 45, "second order", "ges");
// new StaticAnalysisSettings(undefined, "large deformations", "esss");

// var someParams = {
// 	//calculation_diagrams_enabled				: true,
// 	//mass_conversion_enabled						: true,
// 	//mass_conversion_acceleration_in_direction_z	: 30,
// 	max_number_of_iterations					: 200,
// 	number_of_load_increments					: 20,
// 	plate_bending_theory						: static_analysis_settings.PLATE_BENDING_THEORY_KIRCHHOFF,
// 	//maximum_number_of_reactivations				:20
// };
// new StaticAnalysisSettings(undefined, "second order", "iterative", "Newton", "Analysis settings with params" ,someParams);
// new StaticAnalysisSettings(undefined, "second order", "Picard");
// new StaticAnalysisSettings(undefined, "large deformations", "Combined");
// new StaticAnalysisSettings();
// new StaticAnalysisSettings(undefined, "second order", "Newton");
// new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Dynamic");
// new StaticAnalysisSettings(undefined, "large deformations", čwd, "Picard");
// new StaticAnalysisSettings(undefined, "second order", "direct", "Postcritical");
// new StaticAnalysisSettings(undefined, "second order", "Combined");
// new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Postcritical", "Iterative Postcritical");


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