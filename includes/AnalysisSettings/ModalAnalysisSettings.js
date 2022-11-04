
/**
 * AnalysisSettings namespace
 * @namespace AnalysisSettings
 * @module AnalysisSettings
 */

/**
 * Creates modal analysis settings high level function
 * @class
 * @constructor
 * @memberof AnalysisSettings
 * @classdesc Modal analysis settings high level function
 * @customTag Tohle je custom tag
 * @param {Number} no unique ID of modal analysis settings
 * @param {String} solverMethod solver method()
 * @param {String} beyondFrequency Setting of eigenvectors beyond frequency
 * @param {String} maximalFrequency Setting of eigenvectors maximal frequency
 * @param {String} comment  Comment, empty by default
 * @param {Object} params Modal analysis settings parameters, empty by default
 * @example
 * // returns 2
 * globalNS.method1(5, 10);
 * @returns Object ModalAnalysisSettings
*/
 function ModalAnalysisSettings(no,
  solverMethod,
  beyondFrequency,
  maximalFrequency,
  comment,
  params) {

  if (arguments.length !== 0) {
    ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
    ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
      var MAS = modal_analysis_settings.create();
    }
    else {
      var MAS = modal_analysis_settings.create(no);
    }
    // console.log("New modal analysis settings no. " + MAS.no + " was created");

    if (solverMethod != undefined) {
      if (RFEM) {
        MAS.solution_method = modal_analysis_settings[SolverMethodType(solverMethod)];
      }
    }

    if (beyondFrequency != undefined) {
      MAS.find_eigenvectors_beyond_frequency = true;
      MAS.frequency = beyondFrequency;
    }

    if (maximalFrequency != undefined) {
      if (MAS.number_of_modes_method === modal_analysis_settings.NUMBER_OF_MODES_METHOD_MAXIMUM_FREQUENCY) {
        MAS.maxmimum_natural_frequency = maximalFrequency;
      }
    }

    this.Settings = MAS;
    set_comment_and_parameters(this.Settings, comment, params);
    // console.log("-- Finish. Object created. --");
    // object for creation new supports with callback link to instance
    var self = this;
    return self;
  }
}

/**
 * Creates modal analysis settings
 * @param {int} no
 * @param {string} name
 * @param {int} numberOfModes
 * @param {string} solverMethod
 * @param {string} typeOfMassMatrix
 * @param {string} massConversion
 * @param {array} actingMasses
 * @param {string} comment
 * @param {dictionary} params
 * @returns Object ModalAnalysisSettings
 */

ModalAnalysisSettings.prototype.UserDefinedNumberOfModes = function (no, name, numberOfModes, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params) {

  this.Settings = CreateModalAnalysisSettings(no, name);
  this.Settings.number_of_modes_method = modal_analysis_settings.NUMBER_OF_MODES_METHOD_USER_DEFINED;

  if (numberOfModes !== undefined) {
    this.Settings.number_of_modes = numberOfModes;
  }
  else {
    this.Settings.number_of_modes = 4;
  }

  if (RFEM) {
    this.Settings.solution_method = modal_analysis_settings[SolverMethodType(solverMethod)];
  }

  this.Settings.mass_matrix_type = modal_analysis_settings[MassMatrixType(typeOfMassMatrix)];

  this.Settings.mass_conversion_type = modal_analysis_settings[MassConversionType(massConversion)];

  SetActingMasses(this.Settings, actingMasses);

  set_comment_and_parameters(this.Settings, comment, params);
  // console.log("-- Finish. Object created. --");

  var self = this;
  return self;
};

/**
 *
 * @param {*} no
 * @param {*} name
 * @param {*} effectiveModalMassFactor
 * @param {*} solverMethod
 * @param {*} typeOfMassMatrix
 * @param {*} massConversion
 * @param {*} actingMasses
 * @param {*} comment
 * @param {*} params
 * @returns Object ModalAnalysisSettings
 */
ModalAnalysisSettings.prototype.AutomaticNumberOfModesToReachEffMass = function (no, name, effectiveModalMassFactor, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params) {

  this.Settings = CreateModalAnalysisSettings(no, name);

  this.Settings.number_of_modes_method = modal_analysis_settings.NUMBER_OF_MODES_METHOD_EFFECTIVE_MASS_FACTORS;
  if (effectiveModalMassFactor !== undefined) {
    this.Settings.effective_modal_mass_factor = effectiveModalMassFactor;
  } else {
    this.Settings.effective_modal_mass_factor = 0.9;
  }
  if (RFEM) {
    this.Settings.solution_method = modal_analysis_settings[SolverMethodType(solverMethod)];
  }
  this.Settings.mass_matrix_type = modal_analysis_settings[MassMatrixType(typeOfMassMatrix)];

  this.Settings.mass_conversion_type = modal_analysis_settings[MassConversionType(massConversion)];

  SetActingMasses(this.Settings, actingMasses);

  set_comment_and_parameters(this.Settings, comment, params);
  // console.log("-- Finish. Object created. --");

  var self = this;
  return self;
};

/**
 *
 * @param {*} no
 * @param {*} name
 * @param {*} maxNaturalFrequency
 * @param {*} solverMethod
 * @param {*} typeOfMassMatrix
 * @param {*} massConversion
 * @param {*} actingMasses
 * @param {*} comment
 * @param {*} params
 * @returns Object ModalAnalysisSettings
 */
ModalAnalysisSettings.prototype.AutomaticNumberOfModesToReachMaxFreq = function (no, name, maxNaturalFrequency, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params) {

  this.Settings = CreateModalAnalysisSettings(no, name);

  this.Settings.number_of_modes_method = modal_analysis_settings.NUMBER_OF_MODES_METHOD_MAXIMUM_FREQUENCY;
  if (maxNaturalFrequency !== undefined) {
    this.Settings.maxmimum_natural_frequency = maxNaturalFrequency;
  } else {
    this.Settings.maxmimum_natural_frequency = 1600;
  }
  if (RFEM) {
    this.Settings.solution_method = modal_analysis_settings[SolverMethodType(solverMethod)];
  }
  this.Settings.mass_matrix_type = modal_analysis_settings[MassMatrixType(typeOfMassMatrix)];

  this.Settings.mass_conversion_type = modal_analysis_settings[MassConversionType(massConversion)];

  SetActingMasses(this.Settings, actingMasses);

  set_comment_and_parameters(this.Settings, comment, params);
  // console.log("-- Finish. Object created. --");

  var self = this;
  return self;
};

ModalAnalysisSettings.prototype.SetMaximalFrequency = function (frequency) {
  // * @param   {integer}   frequency         Maximal number of frequency
  ASSERT(typeof frequency != undefined || typeof frequency != "number", "Parameter must be assigned as an integer.");
  if (this.Settings.number_of_modes_method === modal_analysis_settings.NUMBER_OF_MODES_METHOD_MAXIMUM_FREQUENCY) {
    this.Settings.maxmimum_natural_frequency = frequency;
  }
};

ModalAnalysisSettings.prototype.SetBeyondFrequency = function (frequency) {
  // * @param   {integer}   frequency         Maximal number of frequency
  ASSERT(typeof frequency != undefined || typeof frequency != "number", "Parameter must be assigned as an integer.");
  this.Settings.find_eigenvectors_beyond_frequency = true;
  this.Settings.frequency = frequency;
};

// ModalAnalysisSettings.prototype.GetNo = function () {
//   return this.Settings.no;
// };

function SolverMethodType(solverMethod) {

  const SolverMethod_dict = {
    "METHOD_LANCZOS": "METHOD_LANCZOS",
    "METHOD_ROOT_OF_CHARACTERISTIC_POLYNOMIAL": "METHOD_ROOT_OF_CHARACTERISTIC_POLYNOMIAL",
    "METHOD_SUBSPACE_ITERATION": "METHOD_SUBSPACE_ITERATION",
    "METHOD_ICG_ITERATION": "METHOD_ICG_ITERATION",
    "SOLUTION_METHOD_SHIFTED_INVERSE_POWER_METHOD": "SOLUTION_METHOD_SHIFTED_INVERSE_POWER_METHOD"
  };

  if (solverMethod !== undefined) {

    var equationSolver = SolverMethod_dict[solverMethod];
    if (equationSolver === undefined) {
      console.log("Wrong equation solver input. Value was: " + solverMethod);
      console.log("Correct values are: ( " + Object.keys(EquationSolver_dict) + ")");
      equationSolver = "METHOD_LANCZOS";
    }
    return equationSolver;
  } else {
    return "METHOD_LANCZOS";
  }

}

function MassConversionType(massConversionMethod) {

  const MassConversion_dict = {
    "MASS_CONVERSION_TYPE_Z_COMPONENTS_OF_LOADS": "MASS_CONVERSION_TYPE_Z_COMPONENTS_OF_LOADS",
    "MASS_CONVERSION_TYPE_Z_COMPONENTS_OF_LOADS_IN_DIRECTION_OF_GRAVITY": "MASS_CONVERSION_TYPE_Z_COMPONENTS_OF_LOADS_IN_DIRECTION_OF_GRAVITY",
    "MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS": "MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS"
  };

  if (massConversionMethod !== undefined) {
    var massConversion = MassConversion_dict[massConversionMethod];
    if (massConversion === undefined) {
      console.log("Wrong mass conversion input. Value was: " + massConversionMethod);
      console.log("Correct values are: ( " + Object.keys(MassConversion_dict) + ")");
      massConversion = "MASS_CONVERSION_TYPE_Z_COMPONENTS_OF_LOADS";
    }
    return massConversion;
  }
  else {
    return "MASS_CONVERSION_TYPE_Z_COMPONENTS_OF_LOADS";
  }
}

function MassMatrixType(massMatrixMethod) {

  const MassMatrix_dict = {
    "MASS_MATRIX_TYPE_DIAGONAL": "MASS_MATRIX_TYPE_DIAGONAL",
    "MASS_MATRIX_TYPE_DIAGONAL_WITH_TORSIONAL_ELEMENTS": "MASS_MATRIX_TYPE_DIAGONAL_WITH_TORSIONAL_ELEMENTS",
    "MASS_MATRIX_TYPE_CONSISTENT": "MASS_MATRIX_TYPE_CONSISTENT",
    "MASS_MATRIX_TYPE_UNIT": "MASS_MATRIX_TYPE_UNIT"
  };

  if (massMatrixMethod !== undefined) {
    var massMatrix = MassMatrix_dict[massMatrixMethod];
    if (massMatrix === undefined) {
      console.log("Wrong equation solver input. Value was: " + massMatrixMethod);
      console.log("Correct values are: ( " + Object.keys(MassMatrix_dict) + ")");
      massMatrixMethod = "MASS_MATRIX_TYPE_DIAGONAL";
    }
    return massMatrixMethod;
  }
  else {
    return "MASS_MATRIX_TYPE_DIAGONAL";
  }
}

function SetActingMasses(MAS, actingMasses) {

  if (actingMasses !== undefined && actingMasses.length === 6) {
    MAS.acting_masses_about_axis_x_enabled = actingMasses[0];
    MAS.acting_masses_about_axis_y_enabled = actingMasses[1];
    MAS.acting_masses_about_axis_z_enabled = actingMasses[2];
    MAS.acting_masses_in_direction_x_enabled = actingMasses[3];
    MAS.acting_masses_in_direction_y_enabled = actingMasses[4];
    MAS.acting_masses_in_direction_z_enabled = actingMasses[5];
  }
  else {
    MAS.acting_masses_about_axis_x_enabled = true;
    MAS.acting_masses_about_axis_y_enabled = true;
    MAS.acting_masses_about_axis_z_enabled = true;
    MAS.acting_masses_in_direction_x_enabled = true;
    MAS.acting_masses_in_direction_y_enabled = true;
    MAS.acting_masses_in_direction_z_enabled = true;
  }
}
/**
 * @memberof AnalysisSettings
 * @param {*} no
 * @param {*} name
 * @returns {Object} ModalAnalysisSettings
 */
function CreateModalAnalysisSettings(no, name) {
  var ModalAnalysisSettings = undefined;
  if (no === undefined) {
    var ModalAnalysisSettings = modal_analysis_settings.create();
  }
  else {
    var ModalAnalysisSettings = modal_analysis_settings.create(no);
  }
  if (name !== undefined) {
    ModalAnalysisSettings.user_defined_name_enabled = true;
    ModalAnalysisSettings.name = name;
  }
  return ModalAnalysisSettings;
}
