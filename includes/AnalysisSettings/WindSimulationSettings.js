function SetPeriodicCombinationRule(rule) {

  const CombinationRule_dict = {
  "SRSS"        : "SRSS",
  "CQC"         : "CQC",
  "Absolute"    : "ABSOLUTE_SUM",
  };

  var CombinationRule = CombinationRule_dict[rule];
  if (CombinationRule === undefined) {
      CombinationRule = "SRSS";
      console.log("Wrong periodic combination rule method input. Value was: " + rule);
      console.log("Correct values are: ( " + Object.keys(CombinationRule_dict) + ")");
    };
  return CombinationRule;  
};

function SetDirrectionalCombinationRule(rule) {

  const CombinationRule_dict = {
  "SRSS"        : "SRSS",
  "Scaled"      : "SCALED_SUM",
  "Absolute"    : "ABSOLUTE_SUM",
  };

  var CombinationRule = CombinationRule_dict[rule];
  if (CombinationRule === undefined) {
      CombinationRule = "SRSS";
      console.log("Wrong dirrection combination rule method input. Value was: " + rule);
      console.log("Correct values are: ( " + Object.keys(CombinationRule_dict) + ")");
    };
  return CombinationRule;  
};


// Main function
function WindSimulationSettings(no,
                                density,
                                kinematicViscosity,
                                consider_turbulence,
                                comment,
                                params)
{

   /**
  * Creates wind simulation analysis settings hight level function 

  * @param   {Float}      density                 number between 1 and 2
  * @param   {Float}      kinematicViscosity      number between 1e-6 and 1e-4
  * @param   {Boolean}    consider_turbulence     consider turbulence
  * @param   {String}     comment                 Comment, empty by default
  * @param   {Object}     params                  Spectral analysis settings parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
    	var WSAS = wind_simulation_analysis_settings.create();	
    }
    else {
    	var WSAS = wind_simulation_analysis_settings.create(no);
	};

  console.log("New wind simulation analysis settings no. " + WSAS.no + " was created");
  
  // Spectral anlysis settings : combination rules
  if (density != undefined) {
    WSAS.density = density;
  };

   if (kinematicViscosity != undefined) {
    WSAS.kinematic_viscosity = kinematicViscosity;
  };

  if (consider_turbulence != undefined) {
    WSAS.consider_turbulence = consider_turbulence;
  };

 

	// Wind simulation analysis settings
	this.settings = WSAS;
  set_comment_and_parameters(this.settings, comment, params);
  console.log("-- Done. Wind simulation analysis settings no. " + WSAS.no + " all initial params set.");
  // object for creation new WSAS with callback link to instance
  var self = this;
  return self;
};

WindSimulationSettings.prototype.GetNo = function() {
  // * @param   {integer}   no         NO of settings
  return this.settings.no;
};

