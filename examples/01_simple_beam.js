// create material and section
var material = Material(undefined, 'S235');
var section = Section(undefined, 'IPE 200', material);

// create topology of the member
var first = Node(undefined, 0, 0, 0);
var second = Node(undefined, 10, 0, 0);

var member = new Member(undefined, [first, second]);
member.section_start = section;

// assign one of pre-defined nodal supports to new nodes
nodal_supports[1].nodes = [first, second];

// create load case and two member loads
var load_case = LoadCase(undefined);

// uniform member load
var uniform_load = MemberLoad(undefined, load_case, [member]);
uniform_load.magnitude = 1kN/m;

// concentrated member load
var concentrated_load = MemberLoad(undefined, load_case, [member]);
concentrated_load.load_distribution = member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1;
concentrated_load.load_direction = member_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE;
concentrated_load.magnitude = -2kN;
concentrated_load.distance_a_absolute = 5m;
