if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
// var a = 1.5;             // Short Length
// var b = 4;               // Long Length
// var H_1 = 3;             // Height 1
// var H_2 = 1.5;           // Height 2
// var r = 0.15;            // Radius of circular top beam
// var thickness_1 = 0.001; // Membrane Thickness
// var S_r = 0.07;          // Target relative member sag in cables
// var n_x = 700;           // Force along X axis in membrane
// var n_y = 700;           // Force along Y axis in membrane

FORM_FINDING.setActive(true);

// Material
var materialSteel = Material(1, 'S235');                    // Steel
var materialMembrane = Material(2, 'PES-PVC Typ II');       // Membrane
materialMembrane.material_model = materials.MODEL_ORTHOTROPIC_2D;

// Section
var sectionCable = Section(1, 'R 8', materialSteel);                   // Cable
var sectionBeam = Section(2, 'CHC 114.3x6.0', materialSteel);          // Beams
var sectionCircularBeam = Section(3, 'CHC 48.3x4.0', materialSteel);   // Circular top beam

// Create thickness
var th = new Thickness();
th.Uniform(1, "Membrane", "", [thickness_1], "", { "material": materialMembrane });

// Create Nodes
Node(1, 0, 0, 0);
Node(2, 0, 0, -H_1);
Node(3, a, 0, -H_1);
Node(4, 0, b, -H_1);
Node(5, -a, 0, -H_1);
Node(6, 0, -a, -H_1);
Node(7, 0, 0, -H_1 - H_2);
for (var i = 0; i < 4; ++i) {
    var alpha = i * PI / 2;
    Node(8 + i, r * cos(alpha), r * sin(alpha), -H_1 - H_2);
}

// Create members
var memberCount = 1;
var mem = new Member();

mem.Beam(memberCount, [1, 2], 0, 2);
memberCount++;
mem.Beam(memberCount, [2, 7], 0, 2);
memberCount++;
for (var i = 0; i < 4; ++i) {
    mem.Beam(memberCount, [2, 3 + i], 0, 2);
    memberCount++;
}
var cablesList = [];
mem.Cable(memberCount, [3, 4], 0, 1);
cablesList.push(memberCount);
memberCount++;
mem.Cable(memberCount, [4, 5], 0, 1);
cablesList.push(memberCount);
memberCount++;
mem.Cable(memberCount, [5, 6], 0, 1);
cablesList.push(memberCount);
memberCount++;
mem.Cable(memberCount, [6, 3], 0, 1);
cablesList.push(memberCount);
memberCount++;
for (var i = 0; i < 4; ++i) {
    mem.Beam(memberCount, [7, 8 + i], 0, 3);
    memberCount++;
}
var l = new Line();
for (var i = 0; i < 3; ++i) {
    var alpha = i * PI / 2 + PI / 4;
    l.Arc(memberCount, [8 + i, 9 + i], [r * cos(alpha), r * sin(alpha), -H_1 - H_2]);
    mem.BeamByLine(memberCount, memberCount, 0, 3);
    memberCount++;
}
alpha = -PI / 4;
l.Arc(memberCount, [11, 8], [r * cos(alpha), r * sin(alpha), -H_1 - H_2]);
mem.BeamByLine(memberCount, memberCount, 0, 3);
memberCount++;

// Create surface
for (var i = 0; i < 4; ++i) {
    Line(memberCount, [3 + i, 8 + i]);
    memberCount++;
}
var sur = new Surface();
var surfacesList = [];
for (var i = 0; i < 3; ++i) {
    sur.Membrane(i + 1, surfaces.GEOMETRY_QUADRANGLE, "", [15 + i, 19 + i, 7 + i, 20 + i], 1);
    surfacesList.push(i + 1);
}
sur.Membrane(4, surfaces.GEOMETRY_QUADRANGLE, "", [18, 22, 10, 19], 1);
surfacesList.push(4);


// Define Load case and loads
if (!load_cases.exist(1)) {
    var formFindingLoadCase = LoadCase(1, "Form-Finding");
}
else {
    var formFindingLoadCase = load_cases[1];
}
load_cases_and_combinations.activate_combination_wizard_and_classification = false;
formFindingLoadCase.analysis_type = load_cases.ANALYSIS_TYPE_STATIC;
if (!static_analysis_settings.exist(1)) {
    var staticAnalysisSettings = StaticAnalysisSettings(1);

}
else {
    var staticAnalysisSettings = static_analysis_settings[1];
}
static_analysis_settings[1].analysis_type.analysis_type = static_analysis_settings.LARGE_DEFORMATIONS;
static_analysis_settings[1].iterative_method_for_nonlinear_analysis = static_analysis_settings.NEWTON_RAPHSON;
formFindingLoadCase.static_analysis_settings = staticAnalysisSettings;



var tensionSurfaceLoad = SurfaceLoad(1, formFindingLoadCase);
tensionSurfaceLoad.load_type = surface_loads.LOAD_TYPE_FORM_FINDING;
tensionSurfaceLoad.form_finding_calculation_method = surface_loads.FORM_FINDING_CALCULATION_METHOD_PROJECTION;
tensionSurfaceLoad.form_finding_definition = surface_loads.FORM_FINDING_DEFINITION_FORCE;
tensionSurfaceLoad.magnitude_force_x = n_x;
tensionSurfaceLoad.magnitude_force_y = n_y;
tensionSurfaceLoad.surfaces = surfacesList;

var tensionMemberLoad = MemberLoad(1, formFindingLoadCase);
tensionMemberLoad.load_type = member_loads.LOAD_TYPE_FORM_FINDING;
tensionMemberLoad.form_finding_definition_type = member_loads.FORM_FINDING_TYPE_GEOMETRIC;
tensionMemberLoad.form_finding_geometry_definition = member_loads.FORM_FINDING_GEOMETRIC_INPUT_PARAMETER_SAG;
tensionMemberLoad.form_finding_magnitude_relative = S_r;
tensionMemberLoad.form_finding_internal_force = member_loads.FORM_FINDING_INTERNAL_FORCE_TENSION;
tensionMemberLoad.members = cablesList;

// Define Supports
var nodalSupport = new NodalSupport();
nodalSupport.Fixed();

// Assign supports
nodes[1].support = nodalSupport.GetNo();
