if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

run("../includes/tools/clearAll.js");

// setup standard for combination wizard
general.current_standard_for_combination_wizard = general.NATIONAL_ANNEX_AND_EDITION_EN_1990_DIN_2012_08;

// prepare materials, sections and thickness for the model
var material_steel = new Material(undefined, "S235");

var section_params = { "shear_stiffness_deactivated": true };
var section_IPE240 = new Section(undefined, "IPE 240", material_steel.No(), "", section_params);
var section_IPE180 = new Section(undefined, "IPE 180", material_steel.No(), "", section_params);

var th = new Thickness();
th.Uniform(1, "test 01", 1, [0.120]);
thickness = 1;

var nodal_support_1 = new NodalSupport();
nodal_support_1.Hinged();

var line_support_1 = new LineSupport();
line_support_1.Hinged();

eccentricity = MemberEccentricity(1);
eccentricity.specification_type = member_eccentricities.TYPE_RELATIVE_AND_ABSOLUTE;
eccentricity.vertical_section_alignment = member_eccentricities.ALIGN_TOP;
eccentricity.horizontal_section_alignment = member_eccentricities.ALIGN_MIDDLE;

// create geometry of the model
Node(1, 0, 0, -4);
Node(2, 9.5, 0, -4);
Node(3, 9.5, 6, -4);
Node(4, 0, 6, -4);
Node(6, 5, 2, -4);
Node(7, 7, 2, -4);
Node(8, 7, 4, -4);
Node(9, 5, 4, -4);
Node(10, 0, 6, 0);
Node(11, 0, 0, 0);
Node(12, 6, 6, -4);
Node(13, 9.5, 0, 0);
Node(14, 9.5, 6, 0);
Node(16, 6, 6, 0, "", { "support": nodal_support_1.GetNo() });
Node(17, 0, 5, -3);
Node(18, 0, 3, -3.52);
Node(19, 0, 1, -3);
Node(20, 0, 5.456, 0);
Node(21, 0, 0.588, 0);

Line(undefined, "1,2");
Line(undefined, "11,13", "", { "support": line_support_1.GetNo() });
Member(undefined, "12,3", "", { "section_start": section_IPE240.No(), "member_eccentricity_start": 1, "member_eccentricity_end": 1 });
Line(undefined, "4,1");
Line(undefined, "17,20");
Line(undefined, "2,3");
Line(undefined, "6,7");
Line(undefined, "7,8");
Line(undefined, "8,9");
Line(undefined, "9,6");
Line(undefined, "4,10");
Line(undefined, "10,20", "", { "support": 1 });
Line(undefined, "11,1");
Line(undefined, "2,13");
Line(undefined, "17,19", "", { "type": lines.TYPE_ARC, "arc_control_point": $V(0, 3, -3.520) });
Line(undefined, "13,14", "", { "support": 1 });
Line(undefined, "3,14");
Member(undefined, "4,12", "", { "section_start": section_IPE240.No(), "member_eccentricity_start": 1, "member_eccentricity_end": 1 });
Member(undefined, "12,16", "", { "section_start": section_IPE180.No() });
Line(undefined, "20,21");
Line(undefined, "21,11", "", { "support": 1 });
Line(undefined, "21,19");

Surface(undefined, "4,13,21,20,12,11", thickness);
Surface(undefined, "6,14,16,17", thickness);
Surface(undefined, "2,14,1,13", thickness);
Surface(undefined, "1,6,3,18,4", thickness);

Opening(undefined, "5,15,22,20");
Opening(undefined, "7-10");

var line_mesh_refinment = LineMeshRefinement();
line_mesh_refinment.lines = 4;
line_mesh_refinment.target_length = 0.1m;

var surface_mesh_refinment = SurfaceMeshRefinement(undefined,[3], 0.8m);

// create load cases with loads and combinations
if (!load_cases.exist(1)) {
    var lc1 = LoadCase(1, "Self weight");
}

var lc2 = LoadCase(2, "Live load");
lc2.name = "Live load";
lc2.static_analysis_settings = 2;
lc2.action_category = load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H;

SurfaceLoad(undefined, lc2, "4", "", { "uniform_magnitude": 0.75kN/m^2});
NodalLoad(undefined, lc2, "12", "", { "load_type": nodal_loads.LOAD_TYPE_COMPONENTS, "components_force": $V(1kN, 2kN, 3kN) });
LineLoad(undefined, lc2, "15", "", { "magnitude": 1.25kN/m^2});
MemberLoad(undefined, lc2, "1,2", "", { "magnitude": 1.25kN/m^2});

var co1 = LoadCombination(undefined, undefined, undefined, [[lc1, 0]]);
co1.design_situation = 1;
co1.static_analysis_settings = 2;
co1.items[1].factor = 1.35;
co1.items[1].load_case = 1;
co1.items[2].factor = 1.5;
co1.items[2].load_case = 2;

load_cases_and_combinations.result_combinations_active = true;
var rc1 = ResultCombination(1);
rc1.design_situation = 1;
rc1.items[1].case_object_item = load_combinations[1];
rc1.items[1].case_object_factor = 1.0;
