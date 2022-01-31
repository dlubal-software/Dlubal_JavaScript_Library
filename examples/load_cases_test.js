// #### Prepare - analysis settings

run("/clearAll.js");

var SAS = new StaticAnalysisSettings();
SAS.SetMaxNumberOfItrations(600);
SAS.SetNumberOfLoadIncremets(4);

var SAS1 = new StaticAnalysisSettings(undefined, "und", "iterative");

var SAS2 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Postcritical" );
SAS2.SetMaxNumberOfItrations(600);
SAS2.SetNumberOfLoadIncremets(4);


DYNAMIC_ANALYSIS.MODAL.setActive(true);
var MAS = new ModalAnalysisSettings();

// dirrect access to  static analysis settings
MAS.settings.comment = "Access via .settings";
MAS.settings.mass_conversion_type = modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS;

var MAS1 = new ModalAnalysisSettings(undefined, 6);


STRUCTURE_STABILITY.setActive(true);

var StAS = new StabilityAnalysisSettings();

StAS.settings.comment = "Access via .settings";
StAS.settings.matrix_type = stability_analysis_settings.MATRIX_TYPE_UNIT;

var StAS01 = new StabilityAnalysisSettings(undefined,true,true);
var StAS02 = new StabilityAnalysisSettings(undefined,true,false);
var StAS03 = new StabilityAnalysisSettings(undefined,false);


DYNAMIC_ANALYSIS.SPECTRAL.setActive(true);

var SpAS = new SpectralAnalysisSettings();

SpAS.settings.save_results_of_all_selected_modes = true;

var SpAS01 = new SpectralAnalysisSettings(undefined, "CQC", "Scaled");

// WIND SIMULATION
WIND_SIMULATION.setActive(true);
TIME_DEPENDENT.setActive(true);


var WSAS = new WindSimulationSettings();
WSAS.settings.maximum_number_of_iterations = 1000;
WSAS.settings.use_second_order_numerical_scheme = true;
WSAS.settings.consider_wall_roughness = true;
WSAS.settings.roughness_constant = 0.75;
WSAS.settings.sand_grain_roughness_height = 0.4;

var WSAS01 = new WindSimulationSettings(undefined, 1.3, 32e-6);
var WSAS02 = new WindSimulationSettings(undefined, 1.7, 1e-6);

 // #########   Example load cases


 /**
function LoadCase(no,
                   analysisType,
                   analysisSettings,
                   stabilityAnalysis,
                   comment,
                   params)
{

  * Creates Load case hight level function 

  * @param   {Integer}              no                  unique ID of Load case
  * @param   {String}               analysisType        LC analysis_type parameter
  * @param   {Integer}              analysisSettings    LC analysis settings no. according to analysis type 
  * @param   {Integer}              stabilityAnalysis   LC stability analysis no. (if is allowed to set)
  * @param   {String}               comment             Comment, empty by default
  * @param   {Object}               params              Load case parameters, empty by default
  */  

var LC = new LoadCase();
LC.SetStabilityAnalysis(2);
var LC0 = new LoadCase(undefined,"modal");
var LC1 = new LoadCase(undefined,"spectral");
LC1.settings.response_spectrum_is_enabled_in_direction_x = true;

var LC2 = new LoadCase(undefined,"wind");
LC2.settings.wind_simulation_analysis_settings = WSAS.settings;
var WP = wind_profiles.create();
//wind_profiles.ACCORDING_TO_STANDARD
LC2.settings.wind_simulation_wind_profile = wind_profiles[1];

LC2.SetStabilityAnalysis(StAS03.GetNo());
var LC3 = new LoadCase(undefined,"DTA");
LC3.SetStabilityAnalysis(StAS03.settings.no);
LC3.settings.time_being_investigated = 20e5; // in sec. converted to days in RFEM (23.1)
LC3.settings.loading_start = 3e5;
console.log(Object.keys(LC3.settings));
var LC4 = new LoadCase(undefined,"static");
LC4.settings.static_analysis_settings = SAS2.settings;
LC4.settings.calculate_critical_load = true;
LC4.settings.stability_analysis_settings = StAS03.settings;
var LC5 = new LoadCase(undefined,"DTA");
LC5.SetTime(1e5, 5e6);

var LC6 = new LoadCase(undefined,"modal", 2);
var LC7 = new LoadCase(undefined,"spectral", 2);
LC7.SetSpectralAnalysis(1,"all");
var LC8 = new LoadCase(undefined,"DTA",2);
var LC9 = new LoadCase(undefined,"wind",2);
LC9.SetWindSimulationAnalysis(3,2);

var LC11 = new LoadCase(undefined,"wind",2,2);
var LC12 = new LoadCase(undefined,"modal", 2,6);
var LC13 = new LoadCase(undefined,"spectral", 2,4);
var LC14 = new LoadCase(undefined,"DTA",2,5);

var someParams = {
	action_category    : load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_D_SHOPPING_AREAS_QI_D,
	self_weight_active : true,
}
var LC15 = new LoadCase(undefined,"tt",undefined,undefined,"with params", someParams);
