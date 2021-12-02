// var n = 8;                // Number of Edges
// var r_p = 5;              // Radius of base polygon
// var r_c = 0.5;            // Radius of beams at top
// var H = 4;                // Height
// var thickness_1 = 0.001   // Membrane
// var S_r = 0.15;           // Target relative member sag in cables
// var n_x = 1500;           // Force along X axis in membrane
// var n_y = 1500;           // Force along Y axis in membrane

FORM_FINDING.setActive(true);
ASSERT(n > 2, "Number of edges should be more than 2");
// Material 
var material_1 = Material(undefined, 'S235');                 // Steel
var material_2 = Material(undefined, 'PES-PVC Typ II');       // Membrane
material_2.material_model = materials.MODEL_ORTHOTROPIC_2D; 

// Section
var section_1 = Section(undefined, 'R 8', material_1);        // Cable
var section_2 = Section(undefined, 'CHC 60.3x4.0', material_1)

// Create thickness
var th = new Thickness();
th.Uniform(1, "Membrane", "", [thickness_1],"", {"material": material_2});

// Create Lines
var l = new Line();
l.nPolygon(1, [0, 0, 0], n, r_p, "XY", 0, "false");
for (var i = 0; i < n; ++i)
{
    var alpha = i*PI*2/n + PI/n;
    Node(n + 1 + i, r_c*cos(alpha),  r_c*sin(alpha),  -H);
}
for (var i = 0; i < n; ++i)
{
    Line(n + 1 + i, [1 + i, n + 1 + i])
}
for (var i = 0; i < n - 1; ++i)
{
    var alpha = i*PI*2/n + 3*PI/(2*n);
    l.Arc(2*n + 1 + i, [n + 1 + i, n + 2 + i], [r_c*cos(alpha),  r_c*sin(alpha),  -H])
}
l.Arc(3*n, [2*n, n + 1], [r_c*cos(PI/(2*n)),  r_c*sin(PI/(2*n)),  -H])

// Assign Cable to polygon's lines
var cables_01 = [];
var mem = new Member();
for (var i = 0; i < n; ++i)
{
    mem.CableByLine(i + 1, i + 1, 0, "", "", {"section_start": section_1})
    cables_01.push(i + 1);
}
// Asign Beam to circular lines at top
for (var i = 0; i < n; ++i)
{
    mem.BeamByLine(i + 1 + n, 2*n + i + 1, 0, "", "", "","", "", {"section_start": section_2})
}

// Surfaces
var sur = new Surface();
var surfaces_01 = [];
for (var i = 0; i < n - 1; ++i)
{
    sur.Membrane(i + 1, surfaces.GEOMETRY_QUADRANGLE, "", [n + 1 + i, i + 1, n + 2 + i, 2*n + 1 + i], 1);
    surfaces_01.push(i + 1);
}
sur.Membrane(n, surfaces.GEOMETRY_QUADRANGLE, "", [n, n + 1, 3*n, 2*n], 1);
surfaces_01.push(n);

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
nod_sup.rotational_restraint_z = nodal_supports.SPRING_CONSTANT_YES;

var lin_sup = LineSupport(undefined)
lin_sup.spring_x = line_supports.SPRING_CONSTANT_YES;
lin_sup.spring_y = line_supports.SPRING_CONSTANT_YES;
lin_sup.spring_z = line_supports.SPRING_CONSTANT_YES;
lin_sup.rotational_restraint_z = line_supports.SPRING_CONSTANT_YES;

// Assign supports
for (var i = 0; i < n; ++i)
{
    nodes[i + 1].support = nod_sup.no;  
    lines[2*n + i + 1].support = lin_sup.no; 
}