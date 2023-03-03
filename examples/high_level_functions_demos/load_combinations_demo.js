include("../includes/Tools/high_level_functions_support.js");

run("load_cases_demo.js");

var static_analysis_setting = static_analysis_settings.create(static_analysis_settings.lastId() + 1);
var design_situation = new DesignSituation(undefined, "EQU_PERMANENT_AND_TRANSIENT");
var material = createMaterial("S235");
var materialGlass = createMaterial("Soda-lime silicate glass");
var imperfection = imperfection_cases.create();
var structure_modification = new StructureModification(undefined, "First");
structure_modification.Material("Soda-lime silicate glass", undefined, 1.50, "Factor for E and G modification");

var load_combination = new LoadCombination(undefined,static_analysis_setting.no,design_situation.GetNo(),[[load_cases[1].no,1.35], [load_cases[4].no,1.5]]);
var load_combination2 = new LoadCombination();
load_combination2.StaticAnalysis(undefined, static_analysis_setting.no, design_situation.GetNo());
load_combination2.ConsiderImperfection(imperfection);
load_combination2.StructureModification(structure_modification.structure_modification);
load_combination2.AssignLoadCases([[load_cases[1].no,1.35], [load_cases[4].no,1.5]]);
