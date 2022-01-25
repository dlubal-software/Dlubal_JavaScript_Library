run("/clearAll.js");

/*  #### static analysis
//function StaticAnalysisSettings(no,
                                analysisType,
                                equationSolver,
                                nonlinearMethod,
                                comment,
                                params)

Access to settings via .settings
                                 /*/

// create empty instance
var SAS = new StaticAnalysisSettings();

// set parameters via HL functions
SAS.SetMaxNumberOfItrations(600);
SAS.SetNumberOfLoadIncremets(4);

// dirrect access to  static analysis settings
SAS.settings.comment = "Access via .settings";
SAS.settings.analysis_type = static_analysis_settings.SECOND_ORDER_P_DELTA;

// create instance with parameters
var SAS0 = new StaticAnalysisSettings(undefined, "linear", "neco");
var SAS1 = new StaticAnalysisSettings(undefined,  "fde", "direct");
var SAS2 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Postcritical" );
SAS2.SetMaxNumberOfItrations(600);
SAS2.SetNumberOfLoadIncremets(4);
var SAS3 = new StaticAnalysisSettings(undefined, "large deformations", hgfgf, "Dynamic");
SAS3.SetMaxNumberOfItrations(600);
SAS3.SetNumberOfLoadIncremets(4);
var SAS4 = new StaticAnalysisSettings(undefined,2, 3, 4, 5, []);
var SAS5 = new StaticAnalysisSettings(undefined, 45, "second order", "ges");
var SAS6 = new StaticAnalysisSettings(undefined, "large deformations", "esss");

var someParams = {
	//calculation_diagrams_enabled				: true,
	//mass_conversion_enabled						: true,
	//mass_conversion_acceleration_in_direction_z	: 30,
	max_number_of_iterations					: 200,
	number_of_load_increments					: 20,
	plate_bending_theory						: static_analysis_settings.PLATE_BENDING_THEORY_KIRCHHOFF,
	//maximum_number_of_reactivations				:20
};

var SAS7 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Newton", "Analysis settings with params" ,someParams);
var SAS8 = new StaticAnalysisSettings(undefined, "second order", "Picard");
var SAS9 = new StaticAnalysisSettings(undefined, "large deformations", "Combined");
var SAS10 = new StaticAnalysisSettings();
var SAS11 = new StaticAnalysisSettings(undefined, "second order", "Newton");
var SAS12 = new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Dynamic");
var SAS13 = new StaticAnalysisSettings(undefined, "large deformations", čwd, "Picard");
var SAS14 = new StaticAnalysisSettings(undefined, "second order", "direct", "Postcritical");
var SAS15 = new StaticAnalysisSettings(undefined, "second order", "Combined");
var SAS16 = new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Postcritical", "Iterative Postcritical");


