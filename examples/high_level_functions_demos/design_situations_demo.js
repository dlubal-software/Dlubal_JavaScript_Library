run("../includes/Tools/clearAll.js");

load_cases_and_combinations.activate_combination_wizard = true;
combination_wizard = combination_wizards.create()
combination_wizard.static_analysis_settings = static_analysis_settings.create();
relationship_between_load_case = relationship_between_load_cases.create();

var design_situation = new DesignSituation(undefined, "DESIGN_SITUATION_TYPE_EQU_PERMANENT_AND_TRANSIENT");
var design_situation2 = new DesignSituation(undefined, "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_PSI_2_1");
var design_situation3 = new DesignSituation(undefined, "DESIGN_SITUATION_TYPE_STR_PERMANENT_AND_TRANSIENT_6_10");

var design_situation4 = new DesignSituation(undefined, "DESIGN_SITUATION_TYPE_STR_ACCIDENTAL_PSI_1_1");
design_situation4.SetCombinationWizard(combination_wizard.no);
design_situation4.SetConsiderInclusiveExclusiveLoadCases(relationship_between_load_case.no);