include("../includes/Tools/high_level_functions_support.js");

run("/clearAll.js");

var static_analysis_setting = static_analysis_settings.create(1);
var design_situation = new DesignSituation(undefined, "DESIGN_SITUATION_TYPE_EQU_ACCIDENTAL_PSI_1_1");
var material = createMaterial("S235");
var imperfection = imperfection_cases.create();
var structure_modification = new StructureModification(undefined, "First");
structure_modification.Material("Soda-lime silicate glass", undefined, 1.50, "Factor for E and G modification");

var load_combination = new LoadCombination();
// ANALYSIS_TYPE_STATIC set as default
load_combination.StaticAnalysis(undefined, undefined, static_analysis_setting);

var load_combination2 = new LoadCombination();
load_combination2.StaticAnalysis(undefined, "ANALYSIS_TYPE_STATIC", static_analysis_setting);
load_combination2.DesignSituation(design_situation.design_situation);
load_combination2.ConsiderImperfection(imperfection);
load_combination2.StructureModification(structure_modification.structure_modification);