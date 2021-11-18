var L = 12;     // Total Length
var n = 6;      // Number of Bays (it should be even) (min. 4) 
var H = 2;      // Heigth
var top_chord = 1;
var bottom_chord = 2;
var vertical = 3;
var diagonal = 4;

Node(1,  0,  0,  0);
Node(2,  0,  0, -H);
Node(3,  L,  0,  0);
Node(4,  L,  0, -H);

var bt = new Node();
var node_count = 5;
for (var i = 1; i < n; ++i)
{
    bt.BetweenTwoNodes(node_count, 1, 3,"",[true, 100*i/n]);
    node_count++;
    bt.BetweenTwoNodes(node_count, 1, 3,"",[true, 100*i/n], 0, -H);
    node_count++;
}
var mem = new Member()
var member_count = 1
for (var i = 0; i < n + 1; ++i)                                     // Verticals
{
    mem.Truss(member_count, [1 + 2*i, 2 + 2*i], 0, vertical);
    member_count++;
}

mem.Truss(member_count, [1, 5], -90, bottom_chord);                 // Bottom Chord
member_count++;
for (var i = 0; i < n - 2; ++i)  
{
    mem.Truss(member_count, [5 + 2*i, 7 + 2*i], -90, bottom_chord);
    member_count++;
}
mem.Truss(member_count, [2*n + 1, 3], -90, bottom_chord);
member_count++;

mem.Truss(member_count, [2, 6], 90, top_chord);                     // Top chord
member_count++;
for (var i = 0; i < n - 2; ++i)  
{
    mem.Truss(member_count, [6 + 2*i, 8 + 2*i], 90, top_chord);
    member_count++;
}
mem.Truss(member_count, [2*n + 2, 4], 90, top_chord);
member_count++;

mem.Truss(member_count, [1, 6], 0, diagonal);                       // diagonal
member_count++;
for (var i = 0; i < n/2 - 1; ++i)  
{
    mem.Truss(member_count, [5 + 2*i, 8 + 2*i], 0, diagonal);
    member_count++;
    mem.Truss(member_count, [n + 5 + 2*i, n + 4 + 2*i], 0, diagonal);
    member_count++;
}
mem.Truss(member_count, [3, 2*n + 2], 0, diagonal);
member_count++;