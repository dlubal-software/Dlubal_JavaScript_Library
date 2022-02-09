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

function NonlinearMethodsType(type, method) {

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

function EquationSolverType(solverType) {

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
  * @param   {String}          analysisType        Analysis setting type ("GEOMETRICALLY_LINEAR", "SECOND_ORDER_P_DELTA", "LARGE_DEFORMATIONS")
  * @param   {String}          equationSolver      Equation solver ("METHOD_OF_EQUATION_SYSTEM_DIRECT", "METHOD_OF_EQUATION_SYSTEM_ITERATIVE")
  * @param   {String}          nonlinearMethod     Nonlinear method ("NEWTON_RAPHSON", "NEWTON_RAPHSON_COMBINED_WITH_PICARD", "PICARD", "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS", "NEWTON_RAPHSON_WITH_CONSTANT_STIFFNESS", "DYNAMIC_RELAXATION" )
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

  if (arguments.length !== 0) {
    ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
    ASSERT(typeof analysisType != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
      this.Settings = static_analysis_settings.create();
    }
    else {
      this.Settings = static_analysis_settings.create(no);
    }
    console.log("New static analysis settings no. " + this.Settings.no + " was created");
    // Static analysis settings : type
    this.Settings.analysis_type = static_analysis_settings[StaticAnalysisType(analysisType)];
    SetEquationSolver(this.Settings, equationSolver);

    // Nonlinear method
    if (nonlinearMethod !== undefined) {
      var NA_method = NonlinearMethodsType(this.Settings.analysis_type, nonlinearMethod);
      if (NA_method != undefined) {
        this.Settings.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
        console.log("Nonlinear analysis method: " + this.Settings.iterative_method_for_nonlinear_analysis);
      }
    }

    set_comment_and_parameters(this.Settings, comment, params);
    console.log("-- Done. Static analysis settings no. " + this.Settings.no + " all initial params set.");
    // object for creation new static analysis settings with callback link to instance
    var self = this;
    return self;
  }
}

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

  this.Settings = CreateStaticAnalysisSettings(no, name);

  this.Settings.analysis_type = static_analysis_settings[StaticAnalysisType("GEOMETRICALLY_LINEAR")];

  SetEquationSolver(this.Settings, equationSolver);

  SetPlateBendingTheory(this.Settings, plateBendingTheory);

  SetActiveMass(this.Settings, activeMass);

  SetLoadModification(this.Settings, modifyLoading);

  set_comment_and_parameters(this.Settings, comment, params);
  var self = this;
  return self;
};

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

  ASSERT(typeof no !== undefined || typeof no !== "number", "No must be assigned as an integer.");

  this.Settings = CreateStaticAnalysisSettings(no, name);

  this.Settings.analysis_type = static_analysis_settings[StaticAnalysisType("SECOND_ORDER_P_DELTA")];

  SetEquationSolver(this.Settings, equationSolver);

  SetPlateBendingTheory(this.Settings, plateBendingTheory);

  SetActiveMass(this.Settings, activeMass);

  SetLoadModification(this.Settings, modifyLoading);

  SetNonlinearMethod(this.Settings, "SECOND_ORDER_P_DELTA", nonlinearMethod);

  SetMaxNumberOfIterations(this.Settings, maxNumberOfIterations);

  SetNumberOfLoadIncrements(this.Settings, numberOfLoadIncrements);

  set_comment_and_parameters(this.Settings, comment, params);
  var self = this;
  return self;
};

/**
 *
 * @param {*} no
 * @param {*} name
 * @param {*} equationSolver
 * @param {*} nonlinearMethod
 * @param {*} maxNumberOfIterations
 * @param {*} numberOfLoadIncrements
 * @param {*} percentageOfIterations
 * @param {*} plateBendingTheory
 * @param {*} activeMass
 * @param {*} modifyLoading
 * @param {*} comment
 * @param {*} params
 * @returns
 */
StaticAnalysisSettings.prototype.LargeDeformations = function (no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, percentageOfIterations, plateBendingTheory, activeMass, modifyLoading, comment, params) {

  this.Settings = CreateStaticAnalysisSettings(no, name);

  this.Settings.analysis_type = static_analysis_settings[StaticAnalysisType("SECOND_ORDER_P_DELTA")];

  if (nonlinearMethod === "DYNAMIC_RELAXATION" && equationSolver !== "METHOD_OF_EQUATION_SYSTEM_DIRECT") {
    equationSolver = "METHOD_OF_EQUATION_SYSTEM_DIRECT";
  }
  SetEquationSolver(this.Settings, equationSolver);

  SetPlateBendingTheory(this.Settings, plateBendingTheory);

  SetActiveMass(this.Settings, activeMass);

  SetLoadModification(this.Settings, modifyLoading);

  SetNonlinearMethod(this.Settings, "LARGE_DEFORMATIONS", nonlinearMethod);
  if (nonlinearMethod !== "DYNAMIC_RELAXATION") {
    SetMaxNumberOfIterations(this.Settings, maxNumberOfIterations);

    SetNumberOfLoadIncrements(this.Settings, numberOfLoadIncrements);
    if (nonlinearMethod === "NEWTON_RAPHSON_COMBINED_WITH_PICARD") {
      this.Settings.percentage_of_iteration = percentageOfIterations;
    }
  }
  set_comment_and_parameters(this.Settings, comment, params);
  var self = this;
  return self;
};


StaticAnalysisSettings.prototype.SetComment = function (comment) {
  //  * @param   {String}          comment             Comment, empty by default
  this.settings.comment = comment;
};



function SetMaxNumberOfIterations(StaticAnalysisSettings, iterations) {

  if (maxNumberOfIterations === undefined) {
    StaticAnalysisSettings.max_number_of_iterations = 100;
  }
  if (AvoidWrongAssignment(StaticAnalysisSettings, "max_number_of_iterations") === true) {
    StaticAnalysisSettings.max_number_of_iterations = iterations;
  }
}


function SetNumberOfLoadIncrements(StaticAnalysisSettings, increments) {
  // * @param   {integer}   increments         Number of load increments
  if (numberOfLoadIncrements === undefined) {
    StaticAnalysisSettings.number_of_load_increments = 1;
  }
  if (AvoidWrongAssignment(StaticAnalysisSettings, "number_of_load_increments") === true) {
    StaticAnalysisSettings.number_of_load_increments = increments;
  }
};

function SetNonlinearMethod(StaticAnalysisSettings, staticAnalysisType, nonlinearMethod) {
  if (nonlinearMethod !== undefined) {
    var NA_method = NonlinearMethodsType(staticAnalysisType, nonlinearMethod);
    if (NA_method !== undefined) {
      StaticAnalysisSettings.iterative_method_for_nonlinear_analysis = static_analysis_settings[NA_method];
      console.log("Nonlinear analysis method: " + StaticAnalysisSettings.iterative_method_for_nonlinear_analysis);
    }
  }
  else {
    StaticAnalysisSettings.iterative_method_for_nonlinear_analysis = static_analysis_settings["NEWTON_RAPHSON"];
  }
}

function SetLoadModification(StaticAnalysisSettings, modifyLoading) {
  if (modifyLoading !== undefined) {
    if (modifyLoading.length === 3) {
      StaticAnalysisSettings.modify_loading_by_multiplier_factor = modifyLoading[0];
      if (StaticAnalysisSettings.modify_loading_by_multiplier_factor === true) {
        StaticAnalysisSettings.loading_multiplier_factor = modifyLoading[1];
        StaticAnalysisSettings.divide_results_by_loading_factor = modifyLoading[2];
      }
    }
    else {
      ASSERT(modifyLoading.length !== 3, "Length of modifyLoading array have to be equal to 3");
    }
  }
}

function SetActiveMass(StaticAnalysisSettings, activeMass) {
  if (activeMass !== undefined) {
    if (activeMass.length === 4) {
      StaticAnalysisSettings.mass_conversion_enabled = activeMass[0];
      if (StaticAnalysisSettings.mass_conversion_enabled === true) {
        StaticAnalysisSettings.mass_conversion_factor_in_direction_x = activeMass[1];
        StaticAnalysisSettings.mass_conversion_factor_in_direction_y = activeMass[2];
        StaticAnalysisSettings.mass_conversion_factor_in_direction_z = activeMass[3];
      }
    }
    else {
      ASSERT(activeMass.length !== 4, "Length of activeMass array have to be equal to 4");
    }
  }
}

function SetPlateBendingTheory(StaticAnalysisSettings, plateBendingTheory) {
  if (plateBendingTheory !== undefined) {
    StaticAnalysisSettings.plate_bending_theory = static_analysis_settings[plateBendingTheoryType(plateBendingTheory)];
  } else {
    StaticAnalysisSettings.plate_bending_theory = static_analysis_settings[plateBendingTheoryType("PLATE_BENDING_THEORY_MINDLIN")];
  }
}

function SetEquationSolver(StaticAnalysisSettings, equationSolver) {

  if (equationSolver !== undefined) {
    StaticAnalysisSettings.method_of_equation_system = static_analysis_settings[EquationSolverType(equationSolver)];
  }
  else {
    StaticAnalysisSettings.method_of_equation_system = static_analysis_settings[EquationSolverType("METHOD_OF_EQUATION_SYSTEM_DIRECT")];
  }
}

function CreateStaticAnalysisSettings(no, name) {

  var StaticAnalysisSettings = undefined;
  if (no === undefined) {
    StaticAnalysisSettings = static_analysis_settings.create();
  }
  else {
    StaticAnalysisSettings = static_analysis_settings.create(no);
  }

  if (name !== undefined) {
    StaticAnalysisSettings.user_defined_name_enabled = true;
    StaticAnalysisSettings.name = name;
  }
  return StaticAnalysisSettings;
}

function AvoidWrongAssignment(SAS, param) {
  var setParameter = false;
  if (SAS.analysis_type === static_analysis_settings.GEOMETRICALLY_LINEAR) {
    console.log("(" + param + ") This parameter cant be set for linear analysis.");
  }
  else if (SAS.iterative_method_for_nonlinear_analysis === static_analysis_settings.DYNAMIC_RELAXATION) {
    console.log("(" + param + ") This parameter cant be set for dynamic relaxation iterative method.");
  }
  else {
    setParameter = true;
  }
  return setParameter;
}
