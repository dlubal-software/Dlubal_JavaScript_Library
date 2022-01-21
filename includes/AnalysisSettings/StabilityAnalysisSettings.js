function StabilityAnalysisType(eigenValue, incremental) {
  if (eigenValue === undefined) {
    eigenValue = true;
  };
  if (incremental === undefined) {
    incremental = false;
  };
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
    };
  }; 
}

function SetEigenValueMethod(method) {

  const eigenValueMethods_dict = {
  "Lanczos"        : "EIGENVALUE_METHOD_LANCZOS",
  "root"           : "EIGENVALUE_METHOD_ROOTS_OF_CHARACTERISTIC_POLYNOMIAL",
  "subspace"       : "EIGENVALUE_METHOD_SUBSPACE_ITERATION",
  "ICG"            : "EIGENVALUE_METHOD_ICG_ITERATION"
  };

  const eigenValueMethod = eigenValueMethods_dict[method];
  if (eigenValueMethod === undefined) {
      eigenValueMethod = "EIGENVALUE_METHOD_LANCZOS";
      console.log("Wrong eigenvalue solver method input. Value was: " + method);
      console.log("Correct values are: ( " + Object.keys(eigenValueMethods_dict) + ")");
    };
  return eigenValueMethod;  
};



// Main function
function StabilityAnalysisSettings(no,
                                isEigenvalueSolver,
                                isIncremental,
                                eigenvalueMethod,
                                numberOfLowestEigenvalues,
                                comment,
                                params)
{

   /**
  * Creates stability analysis settings hight level function 

  * @param   {Boolean}   isEigenvalueSolver             is eigenvalue solver
  * @param   {Boolean}   isIncremental                  is incremental method
  * @param   {String}    eigenvalueMethod               Definition of eigenvalue method
  * @param   {Integer}   numberOfLowestEigenvalues      Number of lowest eigenvalues
  * @param   {String}     comment       Comment, empty by default
  * @param   {Object}  params        Stability analysis settings parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
    	var StAS = stability_analysis_settings.create();	
    }
    else {
    	var StAS = stability_analysis_settings.create(no);
	};
  console.log("New stability analysis settings no. " + StAS.no + " was created");
  // Static anlysis settings : type
  StAS.analysis_type = stability_analysis_settings[StabilityAnalysisType(isEigenvalueSolver,isIncremental)];
  if (eigenvalueMethod != undefined && isEigenvalueSolver != false) {
    StAS.eigenvalue_method = stability_analysis_settings[SetEigenValueMethod(eigenvalueMethod)];
  };
  if (numberOfLowestEigenvalues != undefined && isEigenvalueSolver != false) {
    StAS.number_of_lowest_eigenvalues = numberOfLowestEigenvalues;
  };
	// Stability analysis settings
	this.settings = StAS;
  set_comment_and_parameters(this.settings, comment, params);
  console.log("-- Finish. Object created. --");
  // object for creation new stas with callback link to instance
  var self = this;
  return self;
};

StabilityAnalysisSettings.prototype.GetNo = function() {
  // * @param   {integer}   no         NO of settings
  return this.settings.no;
};

