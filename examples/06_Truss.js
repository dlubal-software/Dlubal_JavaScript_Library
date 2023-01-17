run("../includes/tools/clearAll.js");
include("../includes/Tools/global.js");
var L = 12;     // Total Length
var n = 6;      // Number of Bays (it should be even) (min. 4)
var H = 2;      // Height

ASSERT(n > 3, "Minimum number of bays is 4.");
ASSERT(n % 2 == 0, "Number of bays should be even.");

// create material and section
var materialSteel = new Material(1, 'S235');
var sectionTopChord = new Section(1, 'UPN 160', materialSteel.GetNo());
sectionTopChord.Rotation(degrees2Radians(90));
var sectionBottomChord = new Section(2, 'UPN 160', materialSteel.GetNo());
sectionBottomChord.Rotation(degrees2Radians(-90));
var sectionVertical = new Section(3, 'HE 100 A', materialSteel.GetNo());
var sectionDiagonal = new Section(4, 'HE 100 A', materialSteel.GetNo());
var ns = nodes.count();

Node(1 + ns, 0, 0, 0);
Node(2 + ns, 0, 0, -H);
Node(3 + ns, L, 0, 0);
Node(4 + ns, L, 0, -H);
var nodalSupport = new NodalSupport(1,[1]);
nodalSupport.Hinged();

var nodalSupport2 = new NodalSupport(2, [3]);
nodalSupport2.Hinged();
nodalSupport2.TranslationX(false);
nodalSupport2.RotationX(true);

var bt = new Node();
var nodeCount = 5 + ns;
for (var i = 1; i < n; ++i) {
    bt.BetweenTwoNodes(nodeCount, 1 + ns, 3 + ns, "", [true, 100 * i / n]);
    nodeCount++;
    bt.BetweenTwoNodes(nodeCount, 1 + ns, 3 + ns, "", [true, 100 * i / n], 0, -H);
    nodeCount++;
}
var mem = new Member();
var memberCount = 1;
for (var i = 0; i < n + 1; ++i)                                     // Verticals
{
    mem.Truss(memberCount, [1 + 2 * i + ns, 2 + 2 * i + ns], sectionVertical.GetNo());
    memberCount++;
}
mem.Truss(memberCount, [1 + ns, 5 + ns], sectionBottomChord.GetNo());// Bottom Chord
memberCount++;

for (var i = 0; i < n - 2; ++i) {
    mem.Truss(memberCount, [5 + 2 * i + ns, 7 + 2 * i + ns], sectionBottomChord.GetNo());
    memberCount++;
}
mem.Truss(memberCount, [2 * n + 1 + ns, 3 + ns], sectionBottomChord.GetNo());
memberCount++;

mem.Truss(memberCount, [2 + ns, 6 + ns], sectionTopChord.GetNo());// Top chord
memberCount++;

for (var i = 0; i < n - 2; ++i) {
    mem.Truss(memberCount, [6 + 2 * i + ns, 8 + 2 * i + ns], sectionTopChord.GetNo());
    memberCount++;
}
mem.Truss(memberCount, [2 * n + 2 + ns, 4 + ns], sectionTopChord.GetNo());
memberCount++;

mem.Truss(memberCount, [1 + ns, 6 + ns], sectionTopChord.GetNo());// Diagonal
memberCount++;

for (var i = 0; i < n / 2 - 1; ++i) {
    mem.Truss(memberCount, [5 + 2 * i + ns, 8 + 2 * i + ns], sectionDiagonal.GetNo());
    memberCount++;
    mem.Truss(memberCount, [n + 5 + 2 * i + ns, n + 4 + 2 * i + ns], sectionDiagonal.GetNo());
    memberCount++;
}
mem.Truss(memberCount, [3 + ns, 2 * n + 2 + ns], sectionDiagonal.GetNo());

//load
var SASGeometricallyLinear = new StaticAnalysisSettings();
SASGeometricallyLinear.GeometricallyLinear(1);
var SASSecondOrder = new StaticAnalysisSettings();
SASSecondOrder.SecondOrder(2,"MySASLinear", "METHOD_OF_EQUATION_SYSTEM_DIRECT", "NEWTON_RAPHSON");
var lc1 = new LoadCase();
lc1.StaticAnalysis(1, "Self weight", SASGeometricallyLinear.GetNo(), "ACTION_CATEGORY_PERMANENT_G", [true, 0, 0, 1.0]);
