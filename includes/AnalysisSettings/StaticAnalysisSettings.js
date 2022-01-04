
function StaticAnalysisType(type) {
  const StaticAnalysisType_dict = {
    undefined           : "GEOMETRICALLY_LINEAR",
    "linear":             "GEOMETRICALLY_LINEAR",
    "second order":       "SECOND_ORDER_P_DELTA",
    "large deformations": "LARGE_DEFORMATIONS"
  };

  var SASType = StaticAnalysisType_dict[type];
  if (SASType === undefined) {
    SASType = "GEOMETRICALLY_LINEAR";
    console.log("Wrong static analysis type input. Value was: " + type);
    console.log("Correct values are: ('linear', 'second order', 'large deformations')");
  };
  console.log("Static analysis type: " + SASType);
  return SASType;  
}

function NonlinearMethods(type, method) {

  const nonlinearMethods_secondOrder_dict = {
  "Picard"        : "PICARD",
  "Postcritical"  : "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS",
  "Newton"        : "NEWTON_RAPHSON"
  };

  const nonlinearMethods_largeDeformations_dict = {
    "Picard"             : "PICARD",
    "Combined"           : "NEWTON_RAPHSON_COMBINED_WITH_PICARD",
    "Postcritical"       : "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS",
    "Newton"             : "NEWTON_RAPHSON",
    "Constant stiffness" : "NEWTON_RAPHSON_WITH_CONSTANT_STIFFNESS",
    "Dynamic"            : "DYNAMIC_RELAXATION",
  };

  const nonlinearMehodsSwitcher = {
    "Second-order (P-Δ)"   : nonlinearMethods_secondOrder_dict,
    "Large deformations"   : nonlinearMethods_largeDeformations_dict, 
  };

  const method_dict = nonlinearMehodsSwitcher[type];
  if (method_dict === undefined) {
    console.log("It is not possible to set nonlinear analysis method for analysis type: " + type);
    const nonlinear_method = undefined;
  }
  else {
    const nonlinear_method = method_dict[method];
    if (nonlinear_method === undefined) {
      nonlinear_method = "NEWTON_RAPHSON";
      console.log("Wrong nonlinear analysis method input. Value was: " + method);
      console.log("Correct values are: ( " + Object.keys(method_dict) + ")");
    };
  };
  return nonlinear_method;  
};


function SetEquationSolver(solverType) {

  const EquationSolver_dict = {
  "direct"    : "METHOD_OF_EQUATION_SYSTEM_DIRECT",
  "iterative" : "METHOD_OF_EQUATION_SYSTEM_ITERATIVE"
  };

  var equationSolver = EquationSolver_dict[solverType];
  if (equationSolver === undefined) {
    console.log("Wrong equation solver input. Value was: " + solverType);
    console.log("Correct values are: ( " + Object.keys(EquationSolver_dict) + ")");
    equationSolver = "METHOD_OF_EQUATION_SYSTEM_DIRECT";
  };
  return equationSolver 
};


// Main function
function StaticAnalysisSettings(no,
                                analysisType,
                                equationSolver,
                                nonlinearMethod,
                                comment,
                                params)
{

   /**
  * Creates nodal support hight level function 

  * @param   {Array}   surfaces      List of surfaces
  * @param   {String}  type          Analysis setting type
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
    	var SAS = static_analysis_settings.create();	
    }
    else {
    	var SAS = static_analysis_settings.create(no);
	};
  console.log("New static analysis settings no. " + SAS.no + " was created");
  // Static anlysis settings : type
  SAS.analysis_type = static_analysis_settings[StaticAnalysisType(analysisType)];
  if (equationSolver != undefined) {
    SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
  };
  // Nonlinear method
  if (nonlinearMethod != undefined) {
    var NA_method = NonlinearMethods(SAS.analysis_type, nonlinearMethod);
    if (NA_method != undefined) {
      SAS.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
      console.log("Nonlinear analysis method: " + SAS.iterative_method_for_nonlinear_analysis);
    };
  };
	// Static analysis settings
	this.SASettings = SAS;
  set_comment_and_parameters(this.SASettings, comment, params);
  console.log("-- Finish. Object created. --");
  // object for creation new supports with callback link to instance
  var self = this;
  return self;
};

function AvoidWrongAssignment(SAS, param) {
  var setParameter = false; 
  if (SAS.analysis_type === static_analysis_settings.GEOMETRICALLY_LINEAR) {
    console.log("(" + param + ") This parameter cant be set for linear analysis." );
  }
  else if (SAS.iterative_method_for_nonlinear_analysis === static_analysis_settings.DYNAMIC_RELAXATION) {
    console.log("(" + param + ") This parameter cant be set for dynamic relaxation iterative method.");
  }
  else {
  setParameter = true;
  };
  return setParameter;
};

StaticAnalysisSettings.prototype.SetMaxNumberOfItrations = function(iterations) {
  // * @param   {integer}   iterations         Maximun number of iterations
  if (AvoidWrongAssignment(this.SASettings, "max_number_of_iterations") === true) {   
    ASSERT(typeof iterations != undefined || typeof iterations != "number", "Parameter must be assigned as an integer.");
    this.SASettings.max_number_of_iterations = iterations;
  };
};


StaticAnalysisSettings.prototype.SetNumberOfLoadIncremets = function(increments) {
  // * @param   {integer}   increments         Number of load increments
if (AvoidWrongAssignment(this.SASettings, "number_of_load_increments") === true) { 
  ASSERT(typeof increments != undefined || typeof increments != "number", "Parameter must be assigned as an integer.");
  this.SASettings.number_of_load_increments = increments;
  };
};