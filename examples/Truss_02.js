var L = 12;     // Total Length
var n = 6;      // Number of Bays (it should be even) (min. 4) 
var H = 3;      // Height
var r = H/2 + sqr(L)/(8*H);    // Radius of the top chord

ASSERT(n > 3, "Minimum number of bays is 4.");
ASSERT(n%2 == 0, "Number of bays should be even.");

// create material and section
var materialSteel = Material(1, 'S235');
var sectionTopChord = Section(1, 'UPN 160', materialSteel);
var sectionBottomChord = Section(2, 'UPN 160', materialSteel);
var sectionVertical = Section(3, 'HE 100 A', materialSteel);
var sectionDiagonal = Section(4, 'HE 100 A', materialSteel);

var ns = nodes.count();
var nl = lines.count();

Node(1 + ns,  0,  0,  0);
Node(2 + ns,  L,  0,  0);

// Creating nodes
var bt = new Node();
var nodeCount = 3 + ns;
for (var i = 1; i < n; ++i)
{
    bt.BetweenTwoNodes(nodeCount, 1 + ns, 2 + ns,"",[true, 100*i/n]);
    nodeCount++;
    bt.BetweenTwoNodes(nodeCount, 1 + ns, 2 + ns,"",[true, 100*i/n], 0, -(sqrt(sqr(r) - sqr(i*L/n - L/2)) + H - r));
    nodeCount++;
}

// Creating members
var mem = new Member();
var memberCount = nl + 1;
for (var i = 0; i < n - 1; ++i)                                          // Verticals
{
    mem.Truss(memberCount, [3 + 2*i + ns, 4 + 2*i + ns], 0, 3);
    memberCount++;
}

mem.Truss(memberCount, [1 + ns, 3 + ns], -90, 2);                       // Bottom Chord
memberCount++;
for (var i = 0; i < n - 2; ++i)  
{
    mem.Truss(memberCount, [3 + 2*i + ns, 5 + 2*i + ns], -90, 2);
    memberCount++;
}
mem.Truss(memberCount, [2*n - 1 + ns, 2 + ns], -90, 2);
memberCount++;

mem.Truss(memberCount, [1 + ns, 4 + ns], 0, 1);                         // Top Chord
memberCount++;
for (var i = 0; i < n - 2; ++i)  
{
    mem.Truss(memberCount, [4 + 2*i + ns, 6 + 2*i + ns], 0, 1);
    memberCount++;
}
mem.Truss(memberCount, [2*n + ns, 2 + ns], 0, 1);
memberCount++;

for (var i = 0; i < n/2 - 1; ++i)                                       // Diagonals                    
{
    mem.Truss(memberCount, [5 + 2*i + ns, 4 + 2*i + ns], 0, 4);
    memberCount++;
}
for (var i = 0; i < n/2 - 1; ++i) 
{
    mem.Truss(memberCount, [n + 1 + 2*i + ns, n + 4 + 2*i + ns], 0, 4);
    memberCount++;
}
