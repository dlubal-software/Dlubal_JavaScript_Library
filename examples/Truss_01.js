var L = 12;     // Total Length
var n = 6;      // Number of Bays (it should be even) (min. 4)
var H = 2;      // Height

ASSERT(n > 3, "Minimum number of bays is 4.");
ASSERT(n % 2 == 0, "Number of bays should be even.");

// create material and section
var materialSteel = Material(1, 'S235');
var sectionTopChord = Section(1, 'UPN 160', materialSteel);
var sectionBottomChord = Section(2, 'UPN 160', materialSteel);
var sectionVertical = Section(3, 'HE 100 A', materialSteel);
var sectionDiagonal = Section(4, 'HE 100 A', materialSteel);
var ns = nodes.count();

Node(1 + ns, 0, 0, 0);
Node(2 + ns, 0, 0, -H);
Node(3 + ns, L, 0, 0);
Node(4 + ns, L, 0, -H);

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
    mem.Truss(memberCount, [1 + 2 * i + ns, 2 + 2 * i + ns], 0, sectionVertical.no);
    memberCount++;
}

mem.Truss(memberCount, [1 + ns, 5 + ns], -90, sectionBottomChord.no);        // Bottom Chord
memberCount++;
for (var i = 0; i < n - 2; ++i) {
    mem.Truss(memberCount, [5 + 2 * i + ns, 7 + 2 * i + ns], -90, sectionBottomChord.no);
    memberCount++;
}
mem.Truss(memberCount, [2 * n + 1 + ns, 3 + ns], -90, sectionBottomChord.no);
memberCount++;

mem.Truss(memberCount, [2 + ns, 6 + ns], 90, sectionTopChord.no);                  // Top chord
memberCount++;
for (var i = 0; i < n - 2; ++i) {
    mem.Truss(memberCount, [6 + 2 * i + ns, 8 + 2 * i + ns], 90, sectionTopChord.no);
    memberCount++;
}
mem.Truss(memberCount, [2 * n + 2 + ns, 4 + ns], 90, sectionTopChord.no);
memberCount++;

mem.Truss(memberCount, [1 + ns, 6 + ns], 0, sectionDiagonal.no);                      // Diagonal
memberCount++;
for (var i = 0; i < n / 2 - 1; ++i) {
    mem.Truss(memberCount, [5 + 2 * i + ns, 8 + 2 * i + ns], 0, sectionDiagonal.no);
    memberCount++;
    mem.Truss(memberCount, [n + 5 + 2 * i + ns, n + 4 + 2 * i + ns], 0, sectionDiagonal.no);
    memberCount++;
}
mem.Truss(memberCount, [3 + ns, 2 * n + 2 + ns], 0, sectionDiagonal.no);