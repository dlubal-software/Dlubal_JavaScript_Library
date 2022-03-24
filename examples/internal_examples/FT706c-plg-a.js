if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}
var L = 12;     // Total Length
var n = 8;      // Number of Bays (it should be even) (min. 4)
var H = 3;      // Height

var r = H / 2 + sqr(L) / (8 * H);    // Radius of the top chord

// create material and section
var material = Material(undefined, 'S235');
var top_chord = Section(undefined, 'UPN 160', material);
var bottom_chord = Section(undefined, 'UPN 160', material);
var vertical = Section(undefined, 'HE 100 A', material);
var diagonal = Section(undefined, 'HE 100 A', material);

var ns = 1;
var nl = 1;
while (nodes.exist(ns)) { ns++; }
while (lines.exist(nl)) { nl++; }
ns = ns - 1;

Node(1 + ns, 0, 0, 0);
Node(2 + ns, L, 0, 0);

// Creating nodes
var bt = new Node();
var node_count = 3 + ns;
for (var i = 1; i < n; ++i) {
    bt.BetweenTwoNodes(node_count, 1 + ns, 2 + ns, "", [true, 100 * i / n]);
    node_count++;
    bt.BetweenTwoNodes(node_count, 1 + ns, 2 + ns, "", [true, 100 * i / n], 0, -(sqrt(sqr(r) - sqr(i * L / n - L / 2)) + H - r));
    node_count++;
}

// Creating members
var mem = new Member();
var member_count = nl;
for (var i = 0; i < n - 1; ++i)                                                                      // Verticals
{
    mem.Truss(member_count, [3 + 2 * i + ns, 4 + 2 * i + ns], 0, "", "", { "section_start": vertical });
    member_count++;
}

mem.Truss(member_count, [1 + ns, 3 + ns], -90, "", "", { "section_start": bottom_chord });             // Bottom Chord
member_count++;
for (var i = 0; i < n - 2; ++i) {
    mem.Truss(member_count, [3 + 2 * i + ns, 5 + 2 * i + ns], -90, "", "", { "section_start": bottom_chord });
    member_count++;
}
mem.Truss(member_count, [2 * n - 1 + ns, 2 + ns], -90, "", "", { "section_start": bottom_chord });
member_count++;

mem.Truss(member_count, [1 + ns, 4 + ns], 0, "", "", { "section_start": top_chord });                  // Top Chord
member_count++;
for (var i = 0; i < n - 2; ++i) {
    mem.Truss(member_count, [4 + 2 * i + ns, 6 + 2 * i + ns], 0, "", "", { "section_start": top_chord });
    member_count++;
}
mem.Truss(member_count, [2 * n + ns, 2 + ns], 0, "", "", { "section_start": top_chord });
member_count++;

for (var i = 0; i < n / 2 - 1; ++i)                                                                    // Diagonals
{
    mem.Truss(member_count, [5 + 2 * i + ns, 4 + 2 * i + ns], 0, "", "", { "section_start": diagonal });
    member_count++;
}
for (var i = 0; i < n / 2 - 1; ++i) {
    mem.Truss(member_count, [n + 1 + 2 * i + ns, n + 4 + 2 * i + ns], 0, "", "", { "section_start": diagonal });
    member_count++;
}
