// var a = 1.5;             // Short Length
// var b = 4;               // Long Length
// var H_1 = 3;             // Height 1
// var H_2 = 1.5;           // Height 2
// var r = 0.15;            // Radius of circular top beam
// var thickness_1 = 0.001  // Membrane
// var S_r = 0.07;          // Target relative member sag in cables
// var n_x = 700;           // Force along X axis in membrane
// var n_y = 700;           // Force along Y axis in membrane

FORM_FINDING.setActive(true);

// Material 
var material_1 = Material(undefined, 'S235');                 // Steel
var material_2 = Material(undefined, 'PES-PVC Typ II');       // Membrane
material_2.material_model = materials.MODEL_ORTHOTROPIC_2D; 

// Section
var section_1 = Section(undefined, 'R 8', material_1);            // Cable
var section_2 = Section(undefined, 'CHC 114.3x6.0', material_1);  // Beams
var section_3 = Section(undefined, 'CHC 48.3x4.0', material_1);   // Circular top beam

// Create thickness
var th = new Thickness();
th.Uniform(1, "Membrane", "", [thickness_1],"", {"material": material_2});

// Create Nodes
Node(1,  0,  0,          0);
Node(2,  0,  0,       -H_1);
Node(3,  a,  0,       -H_1);
Node(4,  0,  b,       -H_1);
Node(5, -a,  0,       -H_1);
Node(6,  0, -a,       -H_1);
Node(7,  0,  0, -H_1 - H_2);
for (var i = 0; i < 4; ++i)
{
    var alpha = i*PI/2;
    Node(8 + i, r*cos(alpha),  r*sin(alpha),  -H_1 - H_2);
}

// Create members
var mem_count = 1;
var mem = new Member();

mem.Beam(mem_count, [1, 2], 0, "", "", "", "", "", {"section_start": section_2});
mem_count++;
mem.Beam(mem_count, [2, 7], 0, "", "", "", "", "", {"section_start": section_2});
mem_count++;
for (var i = 0; i < 4; ++i)
{
    mem.Beam(mem_count, [2, 3 + i], 0, "", "", "", "", "", {"section_start": section_2});
    mem_count++;
}
var cables_01 = [];
mem.Cable(mem_count, [3, 4], 0, "", "", {"section_start": section_1});
cables_01.push(mem_count);
mem_count++;
mem.Cable(mem_count, [4, 5], 0, "", "", {"section_start": section_1});
cables_01.push(mem_count);
mem_count++;
mem.Cable(mem_count, [5, 6], 0, "", "", {"section_start": section_1});
cables_01.push(mem_count);
mem_count++;
mem.Cable(mem_count, [6, 3], 0, "", "", {"section_start": section_1});
cables_01.push(mem_count);
mem_count++;
for (var i = 0; i < 4; ++i)
{
    mem.Beam(mem_count, [7, 8 + i], 0, "", "", "", "", "", {"section_start": section_3});
    mem_count++;
}
var l = new Line();
for (var i = 0; i < 3; ++i)
{
    var alpha = i*PI/2 + PI/4;
    l.Arc(mem_count, [8 + i, 9 + i], [r*cos(alpha),  r*sin(alpha),  -H_1 - H_2])
    mem.BeamByLine(mem_count, mem_count, 0, "", "", "", "", "", {"section_start": section_3});
    mem_count++;
}
alpha = -PI/4;
l.Arc(mem_count, [11, 8], [r*cos(alpha),  r*sin(alpha),  -H_1 - H_2])
mem.BeamByLine(mem_count, mem_count, 0, "", "", "", "", "", {"section_start": section_3});
mem_count++;

// Create surface
for (var i = 0; i < 4; ++i)
{
    Line(mem_count, [3 + i, 8 + i])
    mem_count++;
}
var sur = new Surface();
var surfaces_01 = [];
for (var i = 0; i < 3; ++i)
{
    sur.Membrane(i + 1, surfaces.GEOMETRY_QUADRANGLE, "", [15 + i, 19 + i, 7 + i, 20 + i], 1);
    surfaces_01.push(i + 1);
}
sur.Membrane(4, surfaces.GEOMETRY_QUADRANGLE, "", [18, 22, 10, 19], 1);
surfaces_01.push(4);


// Define Load case and loads
LoadCase(1, "Form-Finding");
var FF_load_case = load_cases[1];
load_cases_and_combinations.activate_combination_wizard_and_classification = false;
FF_load_case.analysis_type = load_cases.ANALYSIS_TYPE_STATIC;
FF_load_case.static_analysis_settings = StaticAnalysisSettings(1);
static_analysis_settings[1].analysis_type.analysis_type = static_analysis_settings.LARGE_DEFORMATIONS;
static_analysis_settings[1].iterative_method_for_nonlinear_analysis = static_analysis_settings.NEWTON_RAPHSON;

var tension_surface_load = SurfaceLoad(1, FF_load_case);
tension_surface_load.load_type = surface_loads.LOAD_TYPE_FORM_FINDING;
tension_surface_load.form_finding_calculation_method = surface_loads.FORM_FINDING_CALCULATION_METHOD_PROJECTION;
tension_surface_load.form_finding_definition = surface_loads.FORM_FINDING_DEFINITION_FORCE;
tension_surface_load.magnitude_force_x = n_x;
tension_surface_load.magnitude_force_y = n_y;
tension_surface_load.surfaces = surfaces_01;
    
var tension_member_load = MemberLoad(1, FF_load_case);
tension_member_load.load_type = member_loads.LOAD_TYPE_FORM_FINDING;
tension_member_load.form_finding_definition_type = member_loads.FORM_FINDING_TYPE_GEOMETRIC;
tension_member_load.form_finding_geometry_definition = member_loads.FORM_FINDING_GEOMETRIC_INPUT_PARAMETER_SAG;
tension_member_load.form_finding_magnitude_relative = S_r;
tension_member_load.form_finding_internal_force = member_loads.FORM_FINDING_INTERNAL_FORCE_TENSION;
tension_member_load.members = cables_01;

// Define Supports
var nod_sup = NodalSupport(undefined);
nod_sup.spring_x = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.spring_y = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.spring_z = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.rotational_restraint_x = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.rotational_restraint_y = nodal_supports.SPRING_CONSTANT_YES;
nod_sup.rotational_restraint_z = nodal_supports.SPRING_CONSTANT_YES;

// Assign supports
nodes[1].support = nod_sup.no;  
