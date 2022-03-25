
run("/clearAll.js");
//Static analysis settings
var SASGeometricallyLinear = new StaticAnalysisSettings().GeometricallyLinear(1, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var SASSecondOrder = new StaticAnalysisSettings().SecondOrder(2, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON", 100, 1, "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var SASLargeDeformation = new StaticAnalysisSettings().LargeDeformations(3, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON", 100, 1, undefined, "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
// Modal analysis settings
DYNAMIC_ANALYSIS.MODAL.setActive(true);
modal_analysis_settings.erase(1);
modal_analysis_settings.erase(2);
modal_analysis_settings.erase(3);
var MASUserDefined = new ModalAnalysisSettings().UserDefinedNumberOfModes(1, "UserDefinedNumberOfModes", 10, "METHOD_LANCZOS");
var MASMaxFrequency = new ModalAnalysisSettings().AutomaticNumberOfModesToReachMaxFreq(2, "AutomaticMaxFreq", 1200, "METHOD_LANCZOS");
if (PRERELEASE_MODE) {
  var MASMass = new ModalAnalysisSettings().AutomaticNumberOfModesToReachEffMass(3, "AutomaticMass", 0.8, "METHOD_LANCZOS");
}
// direct access to  static analysis settings
MASUserDefined.Settings.comment = "Access via .settings";
// use of modification
MASMaxFrequency.SetBeyondFrequency(100);

// Stability analysis settings
if (RFEM) {
  STRUCTURE_STABILITY.setActive(true);
  stability_analysis_settings.erase(1);
  stability_analysis_settings.erase(2);
  stability_analysis_settings.erase(3);
  var StASEigenValue = new StabilityAnalysisSettings().EigenValueMethod(1, "EigenValueMethod name", 5, "EIGENVALUE_METHOD_LANCZOS", "MATRIX_TYPE_STANDARD");
  var StASIncremental = new StabilityAnalysisSettings().IncrementalMethodWithoutEigenValueAnalysis(2, "Incremental without EV", 1, 0.1, 100, 10);
  var StASIncrementalWithEigenValue = new StabilityAnalysisSettings().IncrementalMethodWithEigenValueAnalysis(3, "Incremental with EV", [5, "EIGENVALUE_METHOD_LANCZOS", "MATRIX_TYPE_STANDARD"], [1, 0.1, 100, 10]);
}
// spectral analysis settings
DYNAMIC_ANALYSIS.SPECTRAL.setActive(true);
spectral_analysis_settings.erase(1);

var SpAS = new SpectralAnalysisSettings(1, "Spectral analysis", "CQC", "SCALED_SUM", 0.3, true, true, true);
SpAS.SetDampingRuleForCQC("CONSTANT_FOR_EACH_MODE", 0.3);
if (PRERELEASE_MODE) {
  SpAS.IncludeMissingMasses("SRSS", "USER_DEFINED", 0.05);
}

// Wind simulation settings
WIND_SIMULATION.setActive(true);
wind_simulation_analysis_settings.erase(1);
var WSAS = new WindSimulationSettings(20, "Wind simulation:", 1.25, 0.000015, true, "TURBULENCE_TYPE_OMEGA", "CONCENTRATED");
