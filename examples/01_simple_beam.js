run("../includes/tools/clearAll.js");
// create material and section
var material = new Material(undefined, 'S235');
var section = new Section(undefined, 'IPE 200', material.GetNo());

// create topology of the member
var firstNode = new Node();
firstNode.Standard(1, [0, 0, 0]);
var secondNode = new Node();
secondNode.Standard(2, [10, 0, 0]);

var member = new Member();
if (RFEM) {
    // Member defined by line
    var line = new Line();
    line.Polyline(1, [firstNode.GetNo(), secondNode.GetNo()]);
    member.Beam(1, line.GetNo(), section.GetNo());
} else {
    // Member defined by nodes
    member.Beam(1, [firstNode.GetNo(), secondNode.GetNo()], section.GetNo());
}

// assign one of pre-defined nodal supports to new nodes
var nodalSupport1 = new NodalSupport(1, [firstNode.GetNo()]);
nodalSupport1.Hinged();

var nodalSupport2 = new NodalSupport(2, [secondNode.GetNo()]);
nodalSupport2.Hinged();
nodalSupport2.TranslationX(false);
nodalSupport2.RotationX(true);

var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);

// create load case and two member loads
var load_case = new LoadCase();
load_case.StaticAnalysis(1, "Variable LC", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A", [false, 0, 0, 1.0]);

// uniform member load
var liveLoadMember = new MemberLoad();
liveLoadMember.Force(1, load_case.GetLoadCase(), [member.GetNo()], "Uniform", [1000]);

// concentrated member load
var concentrated_load = new MemberLoad();
concentrated_load.Force(2, load_case.GetLoadCase(), [member.GetNo()], member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1, [-2000, 5, false]);
