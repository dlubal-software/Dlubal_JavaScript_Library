if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
run("../includes/tools/clearAll.js");
if (a === undefined) {
    var a = 1.5;             // Short Length
    var b = 4;               // Long Length
    var H_1 = 3;             // Height 1
    var H_2 = 1.5;           // Height 2
    var r = 0.15;            // Radius of circular top beam
    var thickness_1 = 0.001; // Membrane Thickness
    var S_r = 0.07;          // Target relative member sag in cables
    var n_x = 700;           // Force along X axis in membrane
    var n_y = 700;           // Force along Y axis in membrane
}

FORM_FINDING.setActive(true);

// Material
var materialSteel = new Material(1, 'S235');                    // Steel
var materialMembrane = new Material(2, 'PES-PVC Typ II');       // Membrane

// Section
var sectionCable = new Section(1, 'R 8', materialSteel.GetNo());                   // Cable
var sectionBeam = new Section(2, 'CHC 114.3x6.0', materialSteel.GetNo());          // Beams
var sectionCircularBeam = new Section(3, 'CHC 48.3x4.0', materialSteel.GetNo());   // Circular top beam

// Create thickness
var thickness = new Thickness();
thickness.Uniform(1, "Membrane", materialMembrane.GetNo());

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
var member = new Member();

member.Beam(memberCount, [1, 2], sectionBeam.GetNo());
memberCount++;
member.Beam(memberCount, [2, 7], sectionBeam.GetNo());
memberCount++;
for (var i = 0; i < 4; ++i) {
    member.Beam(memberCount, [2, 3 + i], sectionBeam.GetNo());
    memberCount++;
}
var cablesList = [];
member.Cable(memberCount, [3, 4], sectionCable.GetNo());
cablesList.push(memberCount);
memberCount++;
member.Cable(memberCount, [4, 5], sectionCable.GetNo());
cablesList.push(memberCount);
memberCount++;
member.Cable(memberCount, [5, 6], sectionCable.GetNo());
cablesList.push(memberCount);
memberCount++;
member.Cable(memberCount, [6, 3], sectionCable.GetNo());
cablesList.push(memberCount);
memberCount++;
for (var i = 0; i < 4; ++i) {
    member.Beam(memberCount, [7, 8 + i], sectionCircularBeam.GetNo());
    memberCount++;
}

for (var i = 0; i < 3; ++i) {
    var alpha = i * PI / 2 + PI / 4;
    var l = new Line();
    l.Arc(memberCount, [8 + i, 9 + i], [r * cos(alpha), r * sin(alpha), -H_1 - H_2]);
    var arcBeam = new Member();
    arcBeam.Beam(memberCount, memberCount,  sectionCircularBeam.GetNo());
    memberCount++;
}

alpha = -PI / 4;
var m = new Line();
m.Arc(memberCount, [11, 8], [r * cos(alpha), r * sin(alpha), -H_1 - H_2]);
var arcBeam = new Member();
member.Beam(memberCount, memberCount, sectionCircularBeam.GetNo());
memberCount++;

// Create surface
for (var i = 0; i < 4; ++i) {
    Line(memberCount, [3 + i, 8 + i]);
    memberCount++;
}

var surfacesList = [];
for (var i = 0; i < 3; ++i) {
    var surface = new Surface();
    surface.Quadrangle(i + 1,  [15 + i, 19 + i, 7 + i, 20 + i], "Membrane", thickness.GetNo());
    surfacesList.push(i + 1);
}

var sur = new Surface();
surface.Quadrangle(4, [18, 22, 10, 19], "Membrane", thickness.GetNo());
surfacesList.push(4);

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
nodalSupport.Fixed();

// Assign supports
nodes[1].support = nodalSupport.GetNo();
