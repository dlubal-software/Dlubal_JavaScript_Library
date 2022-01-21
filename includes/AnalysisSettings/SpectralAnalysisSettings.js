function SetPeriodicCombinationRule(rule) {

  const CombinationRule_dict = {
  "SRSS"        : "SRSS",
  "CQC"           : "CQC",
  "Absolute"       : "ABSOLUTE_SUM",
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
function SpectralAnalysisSettings(no,
                                combinationRulePeriodic,
                                combinationRuleDirrectional,
                                useEquivalentLinearCombination,
                                signedResultsUsingDominantMode,
                                saveResultsOfAllSelectedModes,
                                comment,
                                params)
{

   /**
  * Creates stability analysis settings hight level function 

  * @param   {String}     combinationRulePeriodic             combination rule for periodic responses
  * @param   {String}     combinationRuleDirrectional         combination rule for directional components
  * @param   {Boolean}    useEquivalentLinearCombination      use equivalent linear combination
  * @param   {Boolean}    signedResultsUsingDominantMode      signed results using dominant mode
  * @param   {Boolean}    saveResultsOfAllSelectedModes       save results of all selected modes
  * @param   {String}     comment       Comment, empty by default
  * @param   {Object}  params        Spectral analysis settings parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
    	var SpAS = spectral_analysis_settings.create();	
    }
    else {
    	var SpAS = spectral_analysis_settings.create(no);
	};

  console.log("New spectral analysis settings no. " + SpAS.no + " was created");
  
  // Spectral anlysis settings : combination rules
  if (combinationRulePeriodic != undefined) {
    SpAS.combination_rule_for_periodic_responses = spectral_analysis_settings[SetPeriodicCombinationRule(combinationRulePeriodic)];
  };

   if (combinationRuleDirrectional != undefined) {
    SpAS.combination_rule_for_directional_components = spectral_analysis_settings[SetDirrectionalCombinationRule(combinationRuleDirrectional)];
  };

  if (useEquivalentLinearCombination === true) {
    SpAS.use_equivalent_linear_combination = true;
  };

  if (signedResultsUsingDominantMode === true) {
    SpAS.signed_results_using_dominant_mode = true;
  };

  if (saveResultsOfAllSelectedModes === true) {
    SpAS.save_results_of_all_selected_modes = true;
  };

	// Spectral analysis settings
	this.settings = SpAS;
  set_comment_and_parameters(this.settings, comment, params);
  console.log("-- Finish. Object created. --");
  // object for creation new stas with callback link to instance
  var self = this;
  return self;
};

SpectralAnalysisSettings.prototype.GetNo = function() {
  // * @param   {integer}   no         NO of settings
  return this.settings.no;
};

