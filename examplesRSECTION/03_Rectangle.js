// var a = 0.1;
// var r = 0.01;
// var t = 0.004;
if (!RSECTION) {
    throw new Error("This script is only for RSECTION.");
}

run("../includes/Tools/clearAll.js");
// create material and section
var materialSteel = new Material(1, 'S235');

var rsPoint = new RSectionPoint();
var id = 0;
for (var i = 0; i < 2; i++) {
    id = 1 + i * 8;
    rsPoint.Standard(id, -a / 2 + r, -a / 2 + i * t);
    rsPoint.Standard(id + 1, a / 2 - r, -a / 2 + i * t);
    rsPoint.Standard(id + 2, a / 2 - i * t, -a / 2 + r);
    rsPoint.Standard(id + 3, a / 2 - i * t, a / 2 - r);
    rsPoint.Standard(id + 4, a / 2 - r, a / 2 - i * t);
    rsPoint.Standard(id + 5, -a / 2 + r, a / 2 - i * t);
    rsPoint.Standard(id + 6, -a / 2 + i * t, a / 2 - r);
    rsPoint.Standard(id + 7, -a / 2 + i * t, -a / 2 + r);
};

// Create lines
var rsLine = new RSectionLine();
rsLine.Polyline(1, [1, 2]);
rsLine.Arc(2, [2, 3],[ a/2 - (r - r/sqrt(2)),  -a/2 + (r - r/sqrt(2))]);
rsLine.Polyline(3, [3, 4]);
rsLine.Arc(4, [4, 5],[a / 2 - (r - r / sqrt(2)), a / 2 - (r - r / sqrt(2))]);
rsLine.Polyline(5, [5, 6]);
rsLine.Arc(6, [6, 7],[-a / 2 + (r - r / sqrt(2)), a / 2 - (r - r / sqrt(2))]);
rsLine.Polyline(7, [7, 8]);
rsLine.Arc(8, [8, 1],[-a / 2 + (r - r / sqrt(2)), -a / 2 + (r - r / sqrt(2))]);

var r_1 = r - t;
rsLine.Polyline(9, [9, 10]);
rsLine.Arc(10, [10, 11],[a / 2 - (r_1 - r_1 / sqrt(2)) - t, -a / 2 + (r_1 - r_1 / sqrt(2)) + t]);
rsLine.Polyline(11, [11, 12]);
rsLine.Arc(12, [12, 13],[a / 2 - (r_1 - r_1 / sqrt(2)) - t, a / 2 - (r_1 - r_1 / sqrt(2)) - t]);
rsLine.Polyline(13, [13, 14]);
rsLine.Arc(14, [14, 15],[-a / 2 + (r_1 - r_1 / sqrt(2)) + t, a / 2 - (r_1 - r_1 / sqrt(2)) - t]);
rsLine.Polyline(15, [15, 16]);
rsLine.Arc(16, [16, 9],[-a / 2 + (r_1 - r_1 / sqrt(2)) + t, -a / 2 + (r_1 - r_1 / sqrt(2)) + t]);

//part
var boundaryLines = [1, 2, 3, 4, 5, 6, 7, 8];
var rsPart = new RSectionPart();
rsPart.WithBoundaryLines(1, boundaryLines, materialSteel.GetNo());

// Create opening
var boundaryLinesOpening = [9, 10, 11, 12, 13, 14, 15, 16];
var rsOpening = new RSectionOpening(1, boundaryLinesOpening);

var load_case = new RSectionLoadCase(undefined, "PERMANENT_G", "First load case", false);
var internal_force = new RSectionInternalForces(undefined, load_case.no, "Y_Z");
internal_force.AxialForce(1500);
internal_force.ShearForces(2000, 2500);
internal_force.TorsionalMoments(500, 800);
internal_force.BendingMoments(1000, 2000);
