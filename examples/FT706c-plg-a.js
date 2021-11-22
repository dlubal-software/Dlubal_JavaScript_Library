var L = 12;     // Total Length
var n = 8;      // Number of Bays (it should be even) (min. 4) 
var H = 3;      // Heigth

var r =  r = H/2 + sqr(L)/(8*H);    // Radius of the top chord

// create material and section
var material = Material(undefined, 'S235');
var top_chord = Section(undefined, 'UPN 160', material);
var bottom_chord = Section(undefined, 'UPN 160', material);
var vertical = Section(undefined, 'HE 100 A', material);
var diagonal = Section(undefined, 'HE 100 A', material);

Node(1,  0,  0,  0);
Node(2,  L,  0,  0);

// Creating nodes
var bt = new Node();
var node_count = 3;
for (var i = 1; i < n; ++i)
{
    bt.BetweenTwoNodes(node_count, 1, 2,"",[true, 100*i/n]);
    node_count++;
    bt.BetweenTwoNodes(node_count, 1, 2,"",[true, 100*i/n], 0, -(sqrt(sqr(r) - sqr(i*L/n - L/2)) + H - r));
    node_count++;
}

// Creating members
var mem = new Member()
var member_count = 1
for (var i = 0; i < n - 1; ++i)                                                               // Verticals
{
    mem.Truss(member_count, [3 + 2*i, 4 + 2*i], 0, "", "", {"section_start": vertical});
    member_count++;
}

mem.Truss(member_count, [1, 3], -90, "", "", {"section_start": bottom_chord});                // Bottom Chord
member_count++;
for (var i = 0; i < n - 2; ++i)  
{
    mem.Truss(member_count, [3 + 2*i, 5 + 2*i], -90, "", "", {"section_start": bottom_chord});
    member_count++;
}
mem.Truss(member_count, [2*n - 1, 2], -90, "", "", {"section_start": bottom_chord});
member_count++;

mem.Truss(member_count, [1, 4], 0, "", "", {"section_start": top_chord});                    // Top Chord
member_count++;
for (var i = 0; i < n - 2; ++i)  
{
    mem.Truss(member_count, [4 + 2*i, 6 + 2*i], 0, "", "", {"section_start": top_chord});
    member_count++;
}
mem.Truss(member_count, [2*n, 2], 0, "", "", {"section_start": top_chord});
member_count++;

for (var i = 0; i < n/2 - 1; ++i)                                                              // Diagonals                    
{
    mem.Truss(member_count, [5 + 2*i, 4 + 2*i], 0, "", "", {"section_start": diagonal});
    member_count++;
}
for (var i = 0; i < n/2 - 1; ++i) 
{
    mem.Truss(member_count, [n + 1 + 2*i, n + 4 + 2*i], 0, "", "", {"section_start": diagonal});
    member_count++;
}
/*
var l = new Line();
mem.Truss(member_count, [1, 4], 0, "", "", {"section_start": top_chord});                      // Top Chord
l.Arc(member_count, [1, 4], [L/(2*n), 0, -(sqrt(sqr(r) - sqr(L/(2*n) - L/2)) + H - r)]);
// mem.Truss(member_count, [1, 3], -90, "", "", {"section_start": bottom_chord});                
// member_count++;
*/