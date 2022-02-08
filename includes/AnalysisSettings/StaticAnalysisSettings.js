
function StaticAnalysisType(type) {
  const StaticAnalysisType_dict = {
    undefined: "GEOMETRICALLY_LINEAR",
    "GEOMETRICALLY_LINEAR": "GEOMETRICALLY_LINEAR",
    "SECOND_ORDER_P_DELTA": "SECOND_ORDER_P_DELTA",
    "LARGE_DEFORMATIONS": "LARGE_DEFORMATIONS"
  };

  var SASType = StaticAnalysisType_dict[type];
  if (SASType === undefined) {
    SASType = "GEOMETRICALLY_LINEAR";
    console.log("Wrong static analysis type input. Value was: " + type);
    console.log("Correct values are: ('GEOMETRICALLY_LINEAR', 'SECOND_ORDER_P_DELTA', 'LARGE_DEFORMATIONS')");
  }
  console.log("Static analysis type: " + SASType);
  return SASType;
}

function plateBendingTheoryType(type) {
  const plateBendingTheoryType_dict = {
    undefined: "PLATE_BENDING_THEORY_MINDLIN",
    "PLATE_BENDING_THEORY_MINDLIN": "PLATE_BENDING_THEORY_MINDLIN",
    "PLATE_BENDING_THEORY_KIRCHHOFF": "PLATE_BENDING_THEORY_KIRCHHOFF"
  };
  var PlateType = plateBendingTheoryType_dict[type];
  if (PlateType === undefined) {
    PlateType = "PLATE_BENDING_THEORY_MINDLIN";
    console.log("Wrong plate bending type input. Value was: " + type);
    console.log("Correct values are: ('PLATE_BENDING_THEORY_MINDLIN', 'PLATE_BENDING_THEORY_KIRCHHOFF')");
  }
  // console.log("Plate bending theory: " + PlateType);
  return PlateType;
}

function NonlinearMethods(type, method) {

  const nonlinearMethods_secondOrder_dict = {
    "NEWTON_RAPHSON": "NEWTON_RAPHSON",
    "PICARD": "PICARD",
    "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS": "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS"
  };

  const nonlinearMethods_largeDeformations_dict = {
    "NEWTON_RAPHSON": "NEWTON_RAPHSON",
    "NEWTON_RAPHSON_COMBINED_WITH_PICARD": "NEWTON_RAPHSON_COMBINED_WITH_PICARD",
    "PICARD": "PICARD",
    "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS": "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS",
    "NEWTON_RAPHSON_WITH_CONSTANT_STIFFNESS": "NEWTON_RAPHSON_WITH_CONSTANT_STIFFNESS",
    "DYNAMIC_RELAXATION": "DYNAMIC_RELAXATION",
  };

  const nonlinearMethodsSwitcher = {
    "SECOND_ORDER_P_DELTA": nonlinearMethods_secondOrder_dict,
    "LARGE_DEFORMATIONS": nonlinearMethods_largeDeformations_dict,
  };

  const method_dict = nonlinearMethodsSwitcher[type];
  var nonlinear_method = undefined;

  if (method_dict === undefined) {
    console.log("It is not possible to set nonlinear analysis method for analysis type: " + type);
  }
  else {
    nonlinear_method = method_dict[method];
    if (nonlinear_method === undefined) {
      nonlinear_method = "NEWTON_RAPHSON";
      console.log("Wrong nonlinear analysis method input. Value was: " + method);
      console.log("Correct values are: ( " + Object.keys(method_dict) + ")");
    }
  }
  return nonlinear_method;
}

function SetEquationSolver(solverType) {

  const EquationSolver_dict = {
    METHOD_OF_EQUATION_SYSTEM_DIRECT: "METHOD_OF_EQUATION_SYSTEM_DIRECT",
    METHOD_OF_EQUATION_SYSTEM_ITERATIVE: "METHOD_OF_EQUATION_SYSTEM_ITERATIVE"
  };
  var equationSolver = EquationSolver_dict[solverType];
  if (equationSolver === undefined) {
    console.log("Wrong equation solver input. Value was: " + solverType);
    console.log("Correct values are: ( " + Object.keys(EquationSolver_dict) + ")");
    equationSolver = "METHOD_OF_EQUATION_SYSTEM_DIRECT";
  }
  return equationSolver;
}

/**
 * Creates static analysis settings high level function
  * @class
  * @constructor
  * @param   {Integer}         no                  unique ID of SAS
  * @param   {String}          analysisType        Analysis setting type ("linear", "second order", "large deformations")
  * @param   {String}          equationSolver      Equation solver ("direct", "iterative")
  * @param   {String}          nonlinearMethod     Nonlinear method ("Picard", "Combined", "Postcritical", "Newton", "Constant stiffness", "Dynamic" )
  * @param   {String}          comment             Comment, empty by default
  * @param   {Object}          params              Static analysis settings parameters, empty by default
 * @returns Static Analysis object
 */
function StaticAnalysisSettings(no,
  analysisType,
  equationSolver,
  nonlinearMethod,
  comment,
  params) {

  if (arguments.length != 0) {
    ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
    ASSERT(typeof analysisType != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
      var SAS = static_analysis_settings.create();
    }
    else {
      var SAS = static_analysis_settings.create(no);
    }
    console.log("New static analysis settings no. " + SAS.no + " was created");
    // Static analysis settings : type
    SAS.analysis_type = static_analysis_settings[StaticAnalysisType(analysisType)];
    if (equationSolver !== undefined) {
      SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
    }
    else {
      SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver("METHOD_OF_EQUATION_SYSTEM_DIRECT")];
    }
    // Nonlinear method
    if (nonlinearMethod != undefined) {
      var NA_method = NonlinearMethods(SAS.analysis_type, nonlinearMethod);
      if (NA_method != undefined) {
        SAS.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
        console.log("Nonlinear analysis method: " + SAS.iterative_method_for_nonlinear_analysis);
      }
    }
    // Static analysis settings
    this.settings = SAS;
    set_comment_and_parameters(this.settings, comment, params);
    console.log("-- Done. Static analysis settings no. " + SAS.no + " all initial params set.");
    // object for creation new static analysis settings with callback link to instance
    var self = this;
    return self;
  }
}

// function AvoidWrongAssignment(SAS, param) {
//   var setParameter = false;
//   if (SAS.analysis_type === static_analysis_settings.GEOMETRICALLY_LINEAR) {
//     console.log("(" + param + ") This parameter cant be set for linear analysis.");
//   }
//   else if (SAS.iterative_method_for_nonlinear_analysis === static_analysis_settings.DYNAMIC_RELAXATION) {
//     console.log("(" + param + ") This parameter cant be set for dynamic relaxation iterative method.");
//   }
//   else {
//     setParameter = true;
//   }
//   return setParameter;
// }
/**
 * Creates linear static analysis settings
 * @param   {String}          equationSolver      Equation solver ("direct", "iterative")
 */
// StaticAnalysisSettings.prototype.Linear = function (equationSolver) {
//   //
//   this.settings.analysis_type = static_analysis_settings.GEOMETRICALLY_LINEAR;
//   if (equationSolver != undefined) {
//     this.settings.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
//   }
// };

/**
 *
 * @param {*} no
 * @param {*} name
 * @param {*} equationSolver
 * @param {*} plateBendingTheory
 * @param {*} activeMass
 * @param {*} modifyLoading
 * @param {*} comment
 * @param {*} params
 * @returns
 */

StaticAnalysisSettings.prototype.GeometricallyLinear = function (no, name, equationSolver, plateBendingTheory, activeMass, modifyLoading, comment, params) {

  ASSERT(typeof no !== undefined || typeof no !== "number", "No must be assigned as an integer.");

  if (no === undefined) {
    this.SAS = static_analysis_settings.create();
  }
  else {
    this.SAS = static_analysis_settings.create(no);
  }

  if (name !== undefined) {
    this.SAS.user_defined_name_enabled = true;
    this.SAS.name = name;
  }

  this.SAS.analysis_type = static_analysis_settings[StaticAnalysisType("GEOMETRICALLY_LINEAR")];
  if (equationSolver !== undefined) {
    this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
  }
  else {
    this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver("METHOD_OF_EQUATION_SYSTEM_DIRECT")];
  }

  if (plateBendingTheory !== undefined) {
    this.SAS.plate_bending_theory = static_analysis_settings[plateBendingTheoryType(plateBendingTheory)];
  } else {
    this.SAS.plate_bending_theory = static_analysis_settings[plateBendingTheoryType("PLATE_BENDING_THEORY_MINDLIN")];
  }

  if (activeMass !== undefined) {
    if (activeMass.length === 4) {
      this.SAS.mass_conversion_enabled = activeMass[0];
      if (this.SAS.mass_conversion_enabled === true) {
        this.SAS.mass_conversion_factor_in_direction_x = activeMass[1];
        this.SAS.mass_conversion_factor_in_direction_y = activeMass[2];
        this.SAS.mass_conversion_factor_in_direction_z = activeMass[3];
      }
    }
    else {
      ASSERT(activeMass.length !== 4, "Length of activeMass array have to be equal to 4");
    }
  }

  if (modifyLoading !== undefined) {
    if (modifyLoading.length === 3) {
      this.SAS.modify_loading_by_multiplier_factor = modifyLoading[0];
      if (this.SAS.modify_loading_by_multiplier_factor === true) {
        this.SAS.loading_multiplier_factor = modifyLoading[1];
        this.SAS.divide_results_by_loading_factor = modifyLoading[2];
      }
    }
    else {
      ASSERT(modifyLoading.length !== 3, "Length of modifyLoading array have to be equal to 3");
    }
  }

  set_comment_and_parameters(this.SAS, comment, params);
  var self = this;
  return self;
};

/**
 *
 * @param   {String}          equationSolver      Equation solver ("direct", "iterative")
 * @param   {String}          nonlinearMethod     Nonlinear method ("Picard", "Postcritical", "Newton")
 */
// StaticAnalysisSettings.prototype.SecondOrder = function (equationSolver, nonlinearMethod) {

//   this.settings.analysis_type = static_analysis_settings.SECOND_ORDER_P_DELTA;
//   if (equationSolver != undefined) {
//     this.settings.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
//   }
//   if (equationSolver != undefined) {
//     this.settings.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
//   }
//   if (nonlinearMethod != undefined) {
//     var NA_method = NonlinearMethods(this.settings.analysis_type, nonlinearMethod);
//     if (NA_method != undefined) {
//       this.settings.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
//       console.log("Nonlinear analysis method: " + this.settings.iterative_method_for_nonlinear_analysis);
//     }
//   }
// };

/**
 *
 * @param {*} no
 * @param {*} name
 * @param {*} equationSolver
 * @param {*} nonlinearMethod
 * @param {*} maxNumberOfIterations
 * @param {*} numberOfLoadIncrements
 * @param {*} plateBendingTheory
 * @param {*} activeMass
 * @param {*} modifyLoading
 * @param {*} comment
 * @param {*} params
 * @returns
 */
StaticAnalysisSettings.prototype.SecondOrder = function (no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, plateBendingTheory, activeMass, modifyLoading, comment, params) {

  if (no === undefined) {
    this.SAS = static_analysis_settings.create();
  }
  else {
    this.SAS = static_analysis_settings.create(no);
  }

  if (name !== undefined) {
    this.SAS.user_defined_name_enabled = true;
    this.SAS.name = name;
  }

  this.SAS.analysis_type = static_analysis_settings[StaticAnalysisType("SECOND_ORDER_P_DELTA")];

  if (equationSolver !== undefined) {
    this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
  }
  else {
    this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver("METHOD_OF_EQUATION_SYSTEM_DIRECT")];
  }
  if (nonlinearMethod !== undefined) {
    var NA_method = NonlinearMethods("SECOND_ORDER_P_DELTA", nonlinearMethod);
    if (NA_method !== undefined) {
      this.SAS.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
      console.log("Nonlinear analysis method: " + this.SAS.iterative_method_for_nonlinear_analysis);
    }
  }
  else {
    this.SAS.iterative_method_for_nonlinear_analysis = static_analysis_settings["NEWTON_RAPHSON"];
  }

  if (maxNumberOfIterations !== undefined) {
    this.SAS.max_number_of_iterations = maxNumberOfIterations;
  }
  else {
    this.SAS.max_number_of_iterations = 100;
  }
  if (numberOfLoadIncrements !== undefined) {
    this.SAS.number_of_load_increments = numberOfLoadIncrements;
  }
  else {
    this.SAS.number_of_load_increments = 1;
  }

  if (plateBendingTheory !== undefined) {
    this.SAS.plate_bending_theory = static_analysis_settings[plateBendingTheoryType(plateBendingTheory)];
  } else {
    this.SAS.plate_bending_theory = static_analysis_settings[plateBendingTheoryType("PLATE_BENDING_THEORY_MINDLIN")];
  }

  if (activeMass !== undefined) {
    if (activeMass.length === 4) {
      this.SAS.mass_conversion_enabled = activeMass[0];
      if (this.SAS.mass_conversion_enabled === true) {
        this.SAS.mass_conversion_factor_in_direction_x = activeMass[1];
        this.SAS.mass_conversion_factor_in_direction_y = activeMass[2];
        this.SAS.mass_conversion_factor_in_direction_z = activeMass[3];
      }
    }
    else {
      ASSERT(activeMass.length !== 4, "Length of activeMass array have to be equal to 4");
    }
  }

  if (modifyLoading !== undefined) {
    if (modifyLoading.length === 3) {
      this.SAS.modify_loading_by_multiplier_factor = modifyLoading[0];
      if (this.SAS.modify_loading_by_multiplier_factor === true) {
        this.SAS.loading_multiplier_factor = modifyLoading[1];
        this.SAS.divide_results_by_loading_factor = modifyLoading[2];
      }
    }
    else {
      ASSERT(modifyLoading.length !== 3, "Length of modifyLoading array have to be equal to 3");
    }
  }

  set_comment_and_parameters(this.SAS, comment, params);
  var self = this;
  return self;
};

/**
 *
 * @param   {String}          equationSolver      Equation solver ("direct", "iterative")
 * @param   {String}          nonlinearMethod     Nonlinear method ("Picard", "Combined", "Postcritical", "Newton", "Constant stiffness", "Dynamic" )
 */
// StaticAnalysisSettings.prototype.LargeDeformations = function (equationSolver, nonlinearMethod) {

//   this.settings.analysis_type = static_analysis_settings.LARGE_DEFORMATIONS;
//   if (equationSolver != undefined) {
//     this.settings.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
//   }
//   if (equationSolver != undefined) {
//     this.settings.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
//   }
//   if (nonlinearMethod != undefined) {
//     var NA_method = NonlinearMethods(this.settings.analysis_type, nonlinearMethod);
//     if (NA_method != undefined) {
//       this.settings.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
//       console.log("Nonlinear analysis method: " + this.settings.iterative_method_for_nonlinear_analysis);
//     }
//   }
// };

StaticAnalysisSettings.prototype.LargeDeformations = function (no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, percentageOfIterations, plateBendingTheory, activeMass, modifyLoading, comment, params) {

  if (no === undefined) {
    this.SAS = static_analysis_settings.create();
  }
  else {
    this.SAS = static_analysis_settings.create(no);
  }

  if (name !== undefined) {
    this.SAS.user_defined_name_enabled = true;
    this.SAS.name = name;
  }

  this.SAS.analysis_type = static_analysis_settings[StaticAnalysisType("LARGE_DEFORMATIONS")];
  if (nonlinearMethod !== undefined) {
    var NA_method = NonlinearMethods("LARGE_DEFORMATIONS", nonlinearMethod);
    if (NA_method !== undefined) {
      this.SAS.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
      console.log("Nonlinear analysis method: " + this.SAS.iterative_method_for_nonlinear_analysis);
    }
  }
  else {
    this.SAS.iterative_method_for_nonlinear_analysis = static_analysis_settings["NEWTON_RAPHSON"];
  }

  if (nonlinearMethod !== "DYNAMIC_RELAXATION") {
    if (equationSolver !== undefined) {
      this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver(equationSolver)];
    }
    else {
      this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver("METHOD_OF_EQUATION_SYSTEM_DIRECT")];
    }
    if (maxNumberOfIterations !== undefined) {
      this.SAS.max_number_of_iterations = maxNumberOfIterations;
    }
    else {
      this.SAS.max_number_of_iterations = 100;
    }
    if (numberOfLoadIncrements !== undefined) {
      this.SAS.number_of_load_increments = numberOfLoadIncrements;
    }
    else {
      this.SAS.number_of_load_increments = 1;
    }
    if (nonlinearMethod === "NEWTON_RAPHSON_COMBINED_WITH_PICARD") {
      this.SAS.percentage_of_iteration = percentageOfIterations;
    }
  }
  else {
    this.SAS.method_of_equation_system = static_analysis_settings[SetEquationSolver("METHOD_OF_EQUATION_SYSTEM_DIRECT")];
  }

  if (plateBendingTheory !== undefined) {
    this.SAS.plate_bending_theory = static_analysis_settings[plateBendingTheoryType(plateBendingTheory)];
  } else {
    this.SAS.plate_bending_theory = static_analysis_settings[plateBendingTheoryType("PLATE_BENDING_THEORY_MINDLIN")];
  }

  if (activeMass !== undefined) {
    if (activeMass.length === 4) {
      this.SAS.mass_conversion_enabled = activeMass[0];
      if (this.SAS.mass_conversion_enabled === true) {
        this.SAS.mass_conversion_factor_in_direction_x = activeMass[1];
        this.SAS.mass_conversion_factor_in_direction_y = activeMass[2];
        this.SAS.mass_conversion_factor_in_direction_z = activeMass[3];
      }
    }
    else {
      ASSERT(activeMass.length !== 4, "Length of activeMass array have to be equal to 4");
    }
  }

  if (modifyLoading !== undefined) {
    if (modifyLoading.length === 3) {
      this.SAS.modify_loading_by_multiplier_factor = modifyLoading[0];
      if (this.SAS.modify_loading_by_multiplier_factor === true) {
        this.SAS.loading_multiplier_factor = modifyLoading[1];
        this.SAS.divide_results_by_loading_factor = modifyLoading[2];
      }
    }
    else {
      ASSERT(modifyLoading.length !== 3, "Length of modifyLoading array have to be equal to 3");
    }
  }

  set_comment_and_parameters(this.SAS, comment, params);
  var self = this;
  return self;
};

//  * @param   {String}          comment             Comment, empty by default
// StaticAnalysisSettings.prototype.SetComment = function (comment) {

//   this.settings.comment = comment;
// };

// // * @param   {integer}   iterations         Maximum number of iterations
// StaticAnalysisSettings.prototype.SetMaxNumberOfIterations = function (iterations) {

//   if (AvoidWrongAssignment(this.settings, "max_number_of_iterations") === true) {
//     ASSERT(typeof iterations != undefined || typeof iterations != "number", "Parameter must be assigned as an integer.");
//     this.settings.max_number_of_iterations = iterations;
//   }
// };

// // * @param   {integer}   increments         Number of load increments
// StaticAnalysisSettings.prototype.SetNumberOfLoadIncrements = function (increments) {

//   if (AvoidWrongAssignment(this.settings, "number_of_load_increments") === true) {
//     ASSERT(typeof increments != undefined || typeof increments != "number", "Parameter must be assigned as an integer.");
//     this.settings.number_of_load_increments = increments;
//   }
// };