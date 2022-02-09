run("/clearAll.js");

var SASGeometricallyLinear = new StaticAnalysisSettings().GeometricallyLinear(1, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
// var DiagramParams = {
// 	//calculation_diagrams_enabled				: true,
// 	//mass_conversion_enabled						: true,
// 	//mass_conversion_acceleration_in_direction_z	: 30,
// 	max_number_of_iterations					: 200,
// 	number_of_load_increments					: 20,
// 	plate_bending_theory						: static_analysis_settings.PLATE_BENDING_THEORY_KIRCHHOFF,
// 	//maximum_number_of_reactivations				:20
// };
var SASSecondOrder = new StaticAnalysisSettings().SecondOrder(2, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON", 100, 1, "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var SASLargeDeformation = new StaticAnalysisSettings().LargeDeformations(3, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON", 100, 1, undefined, "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
// Modal
DYNAMIC_ANALYSIS.MODAL.setActive(true);
var MAS = new ModalAnalysisSettings();

// dirrect access to  static analysis settings
// MAS.settings.comment = "Access via .settings";
// MAS.settings.mass_conversion_type = modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS;

new ModalAnalysisSettings(undefined, 6);
// new ModalAnalysisSettings(undefined, "auto");
// new ModalAnalysisSettings(undefined, x);
// new ModalAnalysisSettings(10, 8);
// var MAS5 = new ModalAnalysisSettings(12);
// MAS5.SetBeyondFrequency(30);

// var MAS6 = new ModalAnalysisSettings(undefined, "auto", "subspace");
// MAS6.SetBeyondFrequency(120);
// MAS6.SetMaximalFrequency(400);
// new ModalAnalysisSettings(undefined, "auto", "root");
// new ModalAnalysisSettings(undefined, 11, "subspace");
// new ModalAnalysisSettings(undefined, 7, "root");
// new ModalAnalysisSettings(undefined, "11", "subspace");
// new ModalAnalysisSettings(undefined, "17", "root");
// new ModalAnalysisSettings(undefined, "3", "root", 10);
// new ModalAnalysisSettings(undefined, "auto", "root", 50, 500);
// new ModalAnalysisSettings(undefined, 5, "root", 50, 500);

// someParams = {
//   mass_conversion_type: modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS,
//   mass_matrix_type: modal_analysis_settings.MASS_MATRIX_TYPE_DIAGONAL,
//   activate_minimum_initial_prestress: true,
//   minimum_initial_strain: 0.003
// };

// new ModalAnalysisSettings(undefined, 5, "root", 50, 500, "with parameters", someParams);
// Stability
STRUCTURE_STABILITY.setActive(true);

var StAS = new StabilityAnalysisSettings();

StAS.settings.comment = "Access via .settings";
StAS.settings.matrix_type = stability_analysis_settings.MATRIX_TYPE_UNIT;

new StabilityAnalysisSettings(undefined, true, true);
new StabilityAnalysisSettings(undefined, true, false);
new StabilityAnalysisSettings(undefined, false);
new StabilityAnalysisSettings(undefined, true, true, "root");
new StabilityAnalysisSettings(undefined, true, true, "subspace");
new StabilityAnalysisSettings(undefined, true, true, "Lanczos");
new StabilityAnalysisSettings(undefined, true, true, "ICG");
new StabilityAnalysisSettings(undefined, false, true, "root");
new StabilityAnalysisSettings(undefined, true, false, "subspace");
new StabilityAnalysisSettings(undefined, true, true, "Lanczos");
new StabilityAnalysisSettings(undefined, true, true, "ICG");
new StabilityAnalysisSettings(undefined, false, true, "root", 5);
new StabilityAnalysisSettings(undefined, true, false, "subspace", 8);
new StabilityAnalysisSettings(undefined, true, true, "Lanczos", 3);
new StabilityAnalysisSettings(undefined, true, true, "ICG", 2);

someParams = {
  activate_stopping_of_load_increasing: true,
  stopping_of_load_increasing_limit_result_displacement: 0.02,
  matrix_type: stability_analysis_settings.MATRIX_TYPE_UNIT,
  activate_minimum_initial_prestress: true,
  minimum_initial_strain: 0.003,
  save_results_of_all_increments: true
};

new StabilityAnalysisSettings(undefined, true, true, "ICG", 3, "With parameters", someParams);
// spectral
/* #### response spectrum analysis
//### function SpectralAnalysisSettings(no,
                                combinationRulePeriodic,
                                combinationRuleDirrectional,
                                useEquivalentLinearCombination,
                                signedResultsUsingDominantMode,
                                saveResultsOfAllSelectedModes,
                                comment,
                                params) ###/*/
/**
* Creates stability analysis settings hight level function
* @param   {Boolean}   isEigenvalueSolver             is eigenvalue solver
* @param   {Boolean}   isIncremental                  is incremental method
* @param   {String}    eigenvalueMethod               Definition of eigenvalue method
* @param   {Integer}   numberOfLowestEigenvalues      Number of lowest eigenvalues
* @param   {String}     comment       Comment, empty by default
* @param   {Object}  params        Stability analysis settings parameters, empty by default
*/

DYNAMIC_ANALYSIS.SPECTRAL.setActive(true);

var SpAS = new SpectralAnalysisSettings();

SpAS.settings.save_results_of_all_selected_modes = true;

new SpectralAnalysisSettings(undefined, "CQC", "Scaled");
new SpectralAnalysisSettings(undefined, "Absolute", "Absolute");
new SpectralAnalysisSettings(undefined, "Absolute", "Absolute", true, true, true);

someParams = {
  constant_d_for_each_mode: 0.03,
  combination_rule_for_directional_components_value: 0.02,
};

new SpectralAnalysisSettings(undefined, "SRSj", "gfgfd", x, f, x, "With comment.");
new SpectralAnalysisSettings(undefined, "CQC", "Scaled", true, f, true, "With parameters.", someParams);

//Wind
/* #### WIND SIMULATION analysis
// Main function
function WindSimulationSettings(no,
                                density,
                                kinematicViscosity,
                                consider_turbulence,
                                comment,
                                params)
{
   /**
  * Creates stability analysis settings hight level function
  * @param   {Float}      density                 number between 1 and 2
  * @param   {Float}      kinematicViscosity      number between 1e-6 and 1e-4
  * @param   {Boolean}    consider_turbulence     consider turbulence
  * @param   {String}     comment       Comment, empty by default
  * @param   {Object}  params        Spectral analysis settings parameters, empty by default
  */
WIND_SIMULATION.setActive(true);
var WSAS = new WindSimulationSettings();
WSAS.settings.maximum_number_of_iterations = 1000;
WSAS.settings.use_second_order_numerical_scheme = true;
WSAS.settings.consider_wall_roughness = true;
WSAS.settings.roughness_constant = 0.75;
WSAS.settings.sand_grain_roughness_height = 0.4;

new WindSimulationSettings(undefined, 1.3, 32e-6);
new WindSimulationSettings(undefined, 1.3, 4e-6, false);
new WindSimulationSettings(undefined, 1.3, 4e-6, false, "with comment");

someParams = {
  turbulence_model_type: wind_simulation_analysis_settings.TURBULENCE_TYPE_OMEGA,
  slip_boundary_condition_on_bottom_boundary: true,
  member_load_distribution: wind_simulation_analysis_settings.TRAPEZOIDAL,
  boundary_layers_checked: true,
  boundary_layers_value: 7,
  target_residue: 1e-6,
  finite_volume_mesh_density: 0.15
};

new WindSimulationSettings(undefined, 1.3, 4e-6, fs, "with parameters", someParams);