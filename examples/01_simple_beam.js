run("../includes/Tools/clearAll.js");
// create material and section
var material = Material(undefined, 'S235');
var section = Section(undefined, 'IPE 200', material.No());

// create topology of the member
var first = Node(undefined, 0, 0, 0);
var second = Node(undefined, 10, 0, 0);

var member = new Member(undefined, [first, second]);
member.section_start = section;

// assign one of pre-defined nodal supports to new nodes
var nodal_support_1 = new NodalSupport(1, [1]);
nodal_support_1.Hinged();

var nodal_support_2 = new NodalSupport(2, [2]);
nodal_support_2.Hinged();
nodal_support_2.TranslationX(false);
nodal_support_2.RotationX(true);

var SASGeometricallyLinear = new StaticAnalysisSettings().GeometricallyLinear(1);

// create load case and two member loads
var load_case = new LoadCase().StaticAnalysis(1, "", SASGeometricallyLinear.Settings.no, "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A", [false, 0, 0, 1.0]);

// uniform member load
var uniform_load = MemberLoad(undefined, load_case.GetLoadCase(), [member]);
uniform_load.magnitude = 1kN/m;

// concentrated member load
var concentrated_load = MemberLoad(undefined, load_case.GetLoadCase(), [member]);
concentrated_load.load_distribution = member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1;
concentrated_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE;
concentrated_load.magnitude = -2kN;
concentrated_load.distance_a_absolute = 5m;
