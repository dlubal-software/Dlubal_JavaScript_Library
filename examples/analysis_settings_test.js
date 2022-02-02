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

                                 /*/
   /**
  * Creates static analysis settings hight level function 

  * @param   {Integer}         no                  unique ID of SAS
  * @param   {String}          analysisType        Analysis setting type ("linear", "second order", "large deformations")
  * @param   {String}          equationSolver      Equation solver ("direct", "iterative")
  * @param   {String}          nonlinearMethod     Nonlinear method ("Picard", "Combined", "Postcritical", "Newton", "Constant stiffness", "Dynamic" )  
  * @param   {String}          comment             Comment, empty by default
  * @param   {Object}          params              Static analysis settings parameters, empty by default
  */

// create empty instance
var SAS = new StaticAnalysisSettings();

// set parameters via HL functions
SAS.SetMaxNumberOfItrations(600);
SAS.SetNumberOfLoadIncremets(4);

// dirrect access to  static analysis settings
SAS.settings.comment = "Access via .settings";
SAS.settings.analysis_type = static_analysis_settings.SECOND_ORDER_P_DELTA;

// prototypes with analysis type
var l = new StaticAnalysisSettings();
l.Linear("iterative");
l.SetMaxNumberOfItrations(1000);
l.SetNumberOfLoadIncremets(4);
l.SetComment("Linear iterative, 1000 iterations, 4 load increments");


var s = new StaticAnalysisSettings();
s.SecondOrder("iterative", "Postcritical");
s.SetMaxNumberOfItrations(1500);
s.SetNumberOfLoadIncremets(6);
s.SetComment("Second order, iterative ,picard, 1500 iterations, 6 load increments");

var large_def = new StaticAnalysisSettings();
large_def.LargeDeformations("iterative", "Combined");
large_def.SetMaxNumberOfItrations(500);
large_def.SetNumberOfLoadIncremets(8);
large_def.SetComment("Second order, iterative ,combined, 500 iterations, 8 load increments");

// create instance with parameters
new StaticAnalysisSettings(undefined, "linear", "neco");
new StaticAnalysisSettings(undefined,  "fde", "direct");
var SAS2 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Postcritical" );
SAS2.SetMaxNumberOfItrations(600);
SAS2.SetNumberOfLoadIncremets(4);
var SAS3 = new StaticAnalysisSettings(undefined, "large deformations", hgfgf, "Dynamic");
SAS3.SetMaxNumberOfItrations(600);
SAS3.SetNumberOfLoadIncremets(4);
new StaticAnalysisSettings(undefined,2, 3, 4, 5, []);
new StaticAnalysisSettings(undefined, 45, "second order", "ges");
new StaticAnalysisSettings(undefined, "large deformations", "esss");

var someParams = {
    //calculation_diagrams_enabled              : true,
    //mass_conversion_enabled                       : true,
    //mass_conversion_acceleration_in_direction_z   : 30,
    max_number_of_iterations                    : 200,
    number_of_load_increments                   : 20,
    plate_bending_theory                        : static_analysis_settings.PLATE_BENDING_THEORY_KIRCHHOFF,
    //maximum_number_of_reactivations               :20
};

new StaticAnalysisSettings(undefined, "second order", "iterative", "Newton", "Analysis settings with params" ,someParams);
new StaticAnalysisSettings(undefined, "second order", "Picard");
new StaticAnalysisSettings(undefined, "large deformations", "Combined");
new StaticAnalysisSettings();
new StaticAnalysisSettings(undefined, "second order", "Newton");
new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Dynamic");
new StaticAnalysisSettings(undefined, "large deformations", čwd, "Picard");
new StaticAnalysisSettings(undefined, "second order", "direct", "Postcritical");
new StaticAnalysisSettings(undefined, "second order", "Combined");
new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Postcritical", "Iterative Postcritical");



/*  #### modal analysis
function ModalAnalysisSettings( no,
                                numberOfModes,
                                solverMethod,
                                beyondFrequency,
                                maximalFrequency,
                                comment,
                                params)
{

Access to settings via .settings
                                 /*/

   /**
  * Creates nodal support hight level function 

  * @param   {Integer}              no                  unique ID of MAS
  * @param   {String or Integer}    numberOfModes       number of modes calculated
  * @param   {String}               solverMethod        solver method definition ("root", "Lanczos","subspace")
  * @param   {float}                beyondFrequency     minimal natural frequency
  * @param   {float}                maximalFrequency    maximal natural frequency
  * @param   {String}               comment             Comment, empty by default
  * @param   {Object}               params              Nodal support parameters, empty by default
  */                                 

DYNAMIC_ANALYSIS.MODAL.setActive(true);
var MAS = new ModalAnalysisSettings();

// dirrect access to  static analysis settings
MAS.settings.comment = "Access via .settings";
MAS.settings.mass_conversion_type = modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS;

new ModalAnalysisSettings(undefined, 6);
new ModalAnalysisSettings(undefined, "auto");
new ModalAnalysisSettings(undefined, x);
new ModalAnalysisSettings(10, 8);
var MAS5 = new ModalAnalysisSettings(12);
MAS5.SetBeyondFrequency(30);

var MAS6 = new ModalAnalysisSettings(undefined, "auto", "subspace");
MAS6.SetBeyondFrequency(120);
MAS6.SetMaximalFrequency(400);
new ModalAnalysisSettings(undefined, "auto", "root");
new ModalAnalysisSettings(undefined, 11, "subspace");
new ModalAnalysisSettings(undefined, 7, "root");
new ModalAnalysisSettings(undefined, "11", "subspace");
new ModalAnalysisSettings(undefined, "17", "root");
new ModalAnalysisSettings(undefined, "3", "root", 10);
new ModalAnalysisSettings(undefined, "auto", "root", 50, 500);
new ModalAnalysisSettings(undefined, 5, "root", 50, 500);

someParams = {
	mass_conversion_type					: modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS,
	mass_matrix_type						: modal_analysis_settings.MASS_MATRIX_TYPE_DIAGONAL,
	activate_minimum_initial_prestress		: true,
	minimum_initial_strain					: 0.003
};

new ModalAnalysisSettings(undefined, 5, "root", 50, 500, "with parameters", someParams);

