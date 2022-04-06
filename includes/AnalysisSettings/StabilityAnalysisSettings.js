/**
 * Constructor creates a new object of type StabilityAnalysisSettings
 * @class
 * @classdesc StabilityAnalysisSettings is a class that represents a stability analysis settings.
 * @param {*} no 
 * @param {*} isEigenvalueSolver 
 * @param {*} isIncremental 
 * @param {*} eigenvalueMethod 
 * @param {*} numberOfLowestEigenvalues 
 * @param {*} comment 
 * @param {*} params 
 * @returns object Stability Analysis Settings
 */
function StabilityAnalysisSettings(no,
  isEigenvalueSolver,
  isIncremental,
  eigenvalueMethod,
  numberOfLowestEigenvalues,
  comment,
  params) {

  /**
 * Creates stability analysis settings hight level function

 * @param   {Boolean}    isEigenvalueSolver             is eigenvalue solver
 * @param   {Boolean}    isIncremental                  is incremental method
 * @param   {String}     eigenvalueMethod               Definition of eigenvalue method
 * @param   {Integer}    numberOfLowestEigenvalues      Number of lowest eigenvalues
 * @param   {String}     comment                        Comment, empty by default
 * @param   {Object}     params                         Stability analysis settings parameters, empty by default
 */

  if (arguments.length !== 0) {
    ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
    ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
      var StAS = stability_analysis_settings.create();
    }
    else {
      var StAS = stability_analysis_settings.create(no);
    }
    console.log("New stability analysis settings no. " + StAS.no + " was created");
    // Static anlysis settings : type
    StAS.analysis_type = stability_analysis_settings[StabilityAnalysisType(isEigenvalueSolver, isIncremental)];
    if (eigenvalueMethod != undefined && isEigenvalueSolver != false) {
      StAS.eigenvalue_method = stability_analysis_settings[SetEigenValueMethod(eigenvalueMethod)];
    }
    if (numberOfLowestEigenvalues != undefined && isEigenvalueSolver != false) {
      StAS.number_of_lowest_eigenvalues = numberOfLowestEigenvalues;
    }
    // Stability analysis settings
    this.settings = StAS;
    set_comment_and_parameters(this.settings, comment, params);
    console.log("-- Done. Stability analysis settings no. " + StAS.no + " all initial params set.");
    // object for creation new stas with callback link to instance
    var self = this;
    return self;
  }
}

StabilityAnalysisSettings.prototype.EigenValueMethod = function (no, name, numberOfLowestEigenvalues, eigenValueMethod, matrixType, eigenValueBeyondCriticalFactor, comment, params) {

  this.Settings = CreateStabilityAnalysisSettings(no, name);

  this.Settings.analysis_type = stability_analysis_settings["EIGENVALUE_METHOD"];

  SetPropertiesForEigenValueMethod(this.Settings, numberOfLowestEigenvalues, eigenValueMethod, matrixType, eigenValueBeyondCriticalFactor);
  //stability_analysis_settings[].minimum_initial_strain
  set_comment_and_parameters(this.Settings, comment, params);
  var self = this;
  return self;
};

StabilityAnalysisSettings.prototype.IncrementalMethodWithEigenValueAnalysis = function (no, name, eigenValueMethodSettings, incrementalMethodSettings, comment, params) {
  eigenValueMethodSettings = typeof Array !== 'undefined' ? eigenValueMethodSettings : [];
  evmSettingsLengths = eigenValueMethodSettings.length;
  var numberOfLowestEigenvalues = undefined; var eigenValueMethod = undefined; matrixType = undefined; eigenValueBeyondCriticalFactor = undefined;
  switch (evmSettingsLengths) {
    case 1:
      numberOfLowestEigenvalues = eigenValueMethodSettings[0];
      break;
    case 2:
      numberOfLowestEigenvalues = eigenValueMethodSettings[0];
      eigenValueMethod = eigenValueMethodSettings[1];
      break;
    case 3:
      numberOfLowestEigenvalues = eigenValueMethodSettings[0];
      eigenValueMethod = eigenValueMethodSettings[1];
      matrixType = eigenValueMethodSettings[2];
      break;
    case 4:
      numberOfLowestEigenvalues = eigenValueMethodSettings[0];
      eigenValueMethod = eigenValueMethodSettings[1];
      matrixType = eigenValueMethodSettings[2];
      eigenValueBeyondCriticalFactor = eigenValueMethodSettings[3];
      break;
  }

  incrementalMethodSettings = typeof Array !== 'undefined' ? incrementalMethodSettings : [];
  imSettingsLengths = incrementalMethodSettings.length;
  var initialLoadFactor = undefined; var loadFactorIncrement = undefined; var maximumNumberLoadIncrements = undefined; var refinementLastLoadIncrement = undefined;
  switch (imSettingsLengths) {
    case 1:
      initialLoadFactor = incrementalMethodSettings[0];
      break;
    case 2:
      initialLoadFactor = incrementalMethodSettings[0];
      loadFactorIncrement = incrementalMethodSettings[1];
      break;
    case 3:
      initialLoadFactor = incrementalMethodSettings[0];
      loadFactorIncrement = incrementalMethodSettings[1];
      maximumNumberLoadIncrements = incrementalMethodSettings[2];
      break;
    case 4:
      initialLoadFactor = incrementalMethodSettings[0];
      loadFactorIncrement = incrementalMethodSettings[1];
      maximumNumberLoadIncrements = incrementalMethodSettings[2];
      refinementLastLoadIncrement = incrementalMethodSettings[3];
      break;
  }

  this.Settings = CreateStabilityAnalysisSettings(no, name);
  this.Settings.analysis_type = stability_analysis_settings["INCREMENTALY_METHOD_WITH_EIGENVALUE"];

  //numberOfLowestEigenvalues, eigenValueMethod, matrixType, eigenValueBeyondCriticalFactor
  SetPropertiesForEigenValueMethod(this.Settings, numberOfLowestEigenvalues, eigenValueMethod, matrixType, eigenValueBeyondCriticalFactor);

  //initialLoadFactor, loadFactorIncrement, maximumNumberLoadIncrements, refinementLastLoadIncrement
  SetPropertiesForIncrementalMethod(this.Settings, initialLoadFactor, loadFactorIncrement, maximumNumberLoadIncrements, refinementLastLoadIncrement);

  set_comment_and_parameters(this.Settings, comment, params);
  var self = this;
  return self;
};

StabilityAnalysisSettings.prototype.IncrementalMethodWithoutEigenValueAnalysis = function (no, name, initialLoadFactor, loadFactorIncrement, maximumNumberLoadIncrements, refinementLastLoadIncrement, comment, params) {

  this.Settings = CreateStabilityAnalysisSettings(no, name);
  this.Settings.analysis_type = stability_analysis_settings["INCREMENTALY_METHOD_WITHOUT_EIGENVALUE"];

  SetPropertiesForIncrementalMethod(this.Settings, initialLoadFactor, loadFactorIncrement, maximumNumberLoadIncrements, refinementLastLoadIncrement);
  set_comment_and_parameters(this.Settings, comment, params);
  var self = this;
  return self;
};

StabilityAnalysisSettings.prototype.GetNo = function () {
  return this.Settings.no;
};

function SetPropertiesForIncrementalMethod(StAS, initialLoadFactor, loadFactorIncrement, maximumNumberLoadIncrements, refinementLastLoadIncrement) {

  if (initialLoadFactor !== undefined) {
    StAS.initial_load_factor = initialLoadFactor;
  }
  else {
    StAS.initial_load_factor = 1.0;
  }
  if (loadFactorIncrement !== undefined) {
    StAS.load_factor_increment = loadFactorIncrement;
  }
  else {
    StAS.load_factor_increment = 0.1;
  }
  if (maximumNumberLoadIncrements !== undefined) {
    StAS.maximum_number_of_load_increments = maximumNumberLoadIncrements;
  }
  else {
    StAS.maximum_number_of_load_increments = 100;
  }
  if (refinementLastLoadIncrement !== undefined) {
    StAS.refinement_of_the_last_load_increment = refinementLastLoadIncrement;
  }
  else {
    StAS.refinement_of_the_last_load_increment = 10;
  }
}
function SetPropertiesForEigenValueMethod(StAS, numberOfLowestEigenvalues, eigenValueMethod, matrixType, eigenValueBeyondCriticalFactor) {
  if (numberOfLowestEigenvalues !== undefined) {
    StAS.number_of_lowest_eigenvalues = numberOfLowestEigenvalues;
  }
  else {
    StAS.number_of_lowest_eigenvalues = 4;
  }
  StAS.eigenvalue_method = stability_analysis_settings[SetEigenValueMethod(eigenValueMethod)];
  StAS.matrix_type = stability_analysis_settings[SetMatrixType(matrixType)];

  if (eigenValueBeyondCriticalFactor !== undefined) {
    StAS.find_eigenvectors_beyond_critical_load_factor = true;
    StAS.critical_load_factor = eigenValueBeyondCriticalFactor
  }
  else {
    StAS.find_eigenvectors_beyond_critical_load_factor = false;
  }

}

function StabilityAnalysisType(eigenValue, incremental) {
  if (eigenValue === undefined) {
    eigenValue = true;
  }
  if (incremental === undefined) {
    incremental = false;
  }
  switch (eigenValue) {
    case false:
      return "INCREMENTALY_METHOD_WITHOUT_EIGENVALUE";
      break;
    case true:
      switch (incremental) {
        case false:
          return "EIGENVALUE_METHOD";
          break;
        case true:
          return "INCREMENTALY_METHOD_WITH_EIGENVALUE";
          break;
      }
  }
}

function SetEigenValueMethod(method) {

  var eigenValueMethods_dict = {
    "EIGENVALUE_METHOD_LANCZOS": "EIGENVALUE_METHOD_LANCZOS",
    "EIGENVALUE_METHOD_ROOTS_OF_CHARACTERISTIC_POLYNOMIAL": "EIGENVALUE_METHOD_ROOTS_OF_CHARACTERISTIC_POLYNOMIAL",
    "EIGENVALUE_METHOD_SUBSPACE_ITERATION": "EIGENVALUE_METHOD_SUBSPACE_ITERATION",
    "EIGENVALUE_METHOD_ICG_ITERATION": "EIGENVALUE_METHOD_ICG_ITERATION",
  };

  if (method !== undefined) {
    var eigenValueMethod = eigenValueMethods_dict[method];
    if (eigenValueMethod === undefined) {
      eigenValueMethod = "EIGENVALUE_METHOD_LANCZOS";
      console.log("Wrong eigenvalue solver method input. Value was: " + method);
      console.log("Correct values are: ( " + Object.keys(eigenValueMethods_dict) + ")");
    }
    return eigenValueMethod;
  }
  else {
    return "EIGENVALUE_METHOD_LANCZOS";
  }
}

function SetMatrixType(matrixType) {

  var eigenValueMethods_dict = {
    "MATRIX_TYPE_STANDARD": "MATRIX_TYPE_STANDARD",
    "MATRIX_TYPE_UNIT": "MATRIX_TYPE_UNIT"
  };

  if (matrixType !== undefined) {
    var matrix = eigenValueMethods_dict[matrixType];
    if (matrix === undefined) {
      matrix = "MATRIX_TYPE_STANDARD";
      console.log("Wrong eigenvalue solver method input. Value was: " + matrixType);
      console.log("Correct values are: ( " + Object.keys(eigenValueMethods_dict) + ")");
    }
    return matrix;
  }
  else {
    return "MATRIX_TYPE_STANDARD";
  }
}

function CreateStabilityAnalysisSettings(no, name) {
  var StabilityAnalysisSettings = undefined;
  if (no === undefined) {
    var StabilityAnalysisSettings = stability_analysis_settings.create();
  }
  else {
    var StabilityAnalysisSettings = stability_analysis_settings.create(no);
  }
  if (name !== undefined) {
    StabilityAnalysisSettings.user_defined_name_enabled = true;
    StabilityAnalysisSettings.name = name;
  }
  return StabilityAnalysisSettings;
}

