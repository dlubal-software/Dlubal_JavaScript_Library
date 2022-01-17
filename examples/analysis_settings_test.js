run("/clearAll.js");
var SAS = new StaticAnalysisSettings();
SAS.SetMaxNumberOfItrations(600);
SAS.SetNumberOfLoadIncremets(4);
var SAS0 = new StaticAnalysisSettings(undefined, "linear", "neco");
var SAS1 = new StaticAnalysisSettings(undefined,  "fde", "iterative");
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

DYNAMIC_ANALYSIS.MODAL.setActive(true);
var MAS = new ModalAnalysisSettings();
var MAS1 = new ModalAnalysisSettings(undefined, 6);
var MAS2 = new ModalAnalysisSettings(undefined, "auto");
var MAS3 = new ModalAnalysisSettings(undefined, x);
var MAS4 = new ModalAnalysisSettings(10, 8);
var MAS5 = new ModalAnalysisSettings(12);
MAS5.SetBeyondFrequency(30);

var MAS6 = new ModalAnalysisSettings(undefined, "auto", "subspace");
MAS6.SetBeyondFrequency(120);
MAS6.SetMaximalFrequency(400);
var MAS7 = new ModalAnalysisSettings(undefined, "auto", "root");
var MAS8 = new ModalAnalysisSettings(undefined, 11, "subspace");
var MAS9 = new ModalAnalysisSettings(undefined, 7, "root");
var MAS10 = new ModalAnalysisSettings(undefined, "11", "subspace");
var MAS11 = new ModalAnalysisSettings(undefined, "17", "root");
var MAS12 = new ModalAnalysisSettings(undefined, "3", "root", 10);
var MAS13 = new ModalAnalysisSettings(undefined, "auto", "root", 50, 500);
var MAS13 = new ModalAnalysisSettings(undefined, 5, "root", 50, 500);

someParams = {
	mass_conversion_type					: modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS,
	mass_matrix_type						: modal_analysis_settings.MASS_MATRIX_TYPE_DIAGONAL,
	activate_minimum_initial_prestress		: true,
	minimum_initial_strain					: 0.003
};

var MAS14 = new ModalAnalysisSettings(undefined, 5, "root", 50, 500, "with parameters", someParams);