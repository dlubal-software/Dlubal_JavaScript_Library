if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("../includes/tools/clearAll.js");
if (n === undefined) {
	n = 8;                // Number of Edges
	r_p = 5;              // Radius of base polygon
	r_c = 0.5;            // Radius of beams at top
	H = 4;                // Height
	thickness_1 = 0.001;  // Membrane thickness
	S_r = 0.15;           // Target relative member sag in cables
	n_x = 1500;           // Force along X axis in membrane
	n_y = 1500;           // Force along Y axis in membrane
}

FORM_FINDING.setActive(true);
ASSERT(n > 2, "Number of edges should be more than 2");
// Material
var materialSteel = new Material(1, 'S235');                    // Steel
var materialMembrane = new Material(2, 'PES-PVC Typ II');       // Membrane

// Section
var sectionCable = new Section(1, 'R 8', materialSteel.GetNo());            // Cable
var sectionCircularBeam = new Section(2, 'CHC 60.3x4.0', materialSteel.GetNo());

// Create thickness
var thickness = new Thickness();
thickness.Uniform(1, "MEMBRANE", materialMembrane.GetNo());

// Create Lines
var nPolygon = new Line();
nPolygon.nPolygon(1, [0, 0, 0], n, r_p, "x-y", 0, false);
for (var i = 0; i < n; ++i) {
    var alpha = i * PI * 2 / n;
    Node(n + 1 + i, r_c * cos(alpha), r_c * sin(alpha), -H);
}
for (var i = 0; i < n; ++i) {
    Line(n + 1 + i, [1 + i, n + 1 + i]);
}
for (var i = 0; i < n - 1; ++i) {
    var alpha = i * PI * 2 / n + PI / (2 * n);
    var l = new Line();
    l.Arc(2 * n + 1 + i, [n + 1 + i, n + 2 + i], [r_c * cos(alpha), r_c * sin(alpha), -H]);
}
var t = new Line();
t.Arc(3 * n, [2 * n, n + 1], [r_c * cos(-PI / (2 * n)), r_c * sin(-PI / (2 * n)), -H]);

// Assign Cable to polygon's lines
var cablesList = [];
var member = new Member();
for (var i = 0; i < n; ++i) {
    member.Cable(i + 1, i + 1, sectionCable.GetNo(), "Cable member");
    cablesList.push(i + 1);
}
// Assign Beam to circular lines at top
for (var i = 0; i < n; ++i) {
    member.Beam(i + 1 + n, 2 * n + i + 1, sectionCircularBeam.GetNo());
}

// Surfaces

var surfacesList = [];
for (var i = 0; i < n - 1; ++i) {
    var surface = new Surface();
    surface.Quadrangle(i + 1,  [n + 1 + i, i + 1, n + 2 + i, 2 * n + 1 + i], "MEMBRANE", thickness.GetNo());
    surfacesList.push(i + 1);
}
var surface = new Surface();
surface.Quadrangle(i + 1,  [n, n + 1, 3 * n, 2 * n], "MEMBRANE", thickness.GetNo());
surfacesList.push(n);

// Define Load case and loads
var SASLargeDeformation = new StaticAnalysisSettings();
SASLargeDeformation.LargeDeformations(3, "MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON", 100, 1, undefined, "PLATE_BENDING_THEORY_KIRCHHOFF", [true, 2.0, 3.0, 4.0], [true, 5, true]);
var formFindingLoadCase = new LoadCase(1, "Form-Finding");
formFindingLoadCase.static_analysis_settings = SASLargeDeformation.GetStaticAnalysisSettings();



load_cases_and_combinations.activate_combination_wizard_and_classification = false;

var tensionSurfaceLoad = new SurfaceLoad(1, formFindingLoadCase,surfacesList);
tensionSurfaceLoad.load_type = surface_loads.LOAD_TYPE_FORM_FINDING;
tensionSurfaceLoad.form_finding_calculation_method = surface_loads.FORM_FINDING_CALCULATION_METHOD_STANDARD;
tensionSurfaceLoad.form_finding_definition = surface_loads.FORM_FINDING_DEFINITION_FORCE;
tensionSurfaceLoad.magnitude_uniform_force_x = n_x;
tensionSurfaceLoad.magnitude_uniform_force_y = n_y;

var tensionMemberLoad = new MemberLoad(1, formFindingLoadCase,cablesList);
tensionMemberLoad.load_type = member_loads.LOAD_TYPE_FORM_FINDING;
tensionMemberLoad.form_finding_definition_type = member_loads.FORM_FINDING_TYPE_GEOMETRIC;
tensionMemberLoad.form_finding_geometry_definition = member_loads.FORM_FINDING_GEOMETRIC_INPUT_PARAMETER_SAG;
tensionMemberLoad.form_finding_magnitude_relative = S_r;
tensionMemberLoad.form_finding_internal_force = member_loads.FORM_FINDING_INTERNAL_FORCE_TENSION;

// Define Supports
var nodalSupport = new NodalSupport();
nodalSupport.Hinged();

var lineSupport = new LineSupport();
lineSupport.Hinged();

// Assign supports
for (var i = 0; i < n; ++i) {
    nodes[i + 1].support = nodalSupport.GetNo();
    lines[2 * n + i + 1].support = lineSupport.GetNo();
}
