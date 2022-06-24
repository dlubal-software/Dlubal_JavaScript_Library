run("../includes/Tools/clearAll.js");

var coordinate_system = new CoordinateSystem();
coordinate_system.Offset(undefined, [1.0, 2.0, 3.0]);
var coordinate_system1 = new CoordinateSystem();
coordinate_system1.ThreePoints(undefined, [1.0, 2.0, 3.0], [2.0, 1.0, 3.0], [1.0, 0.0, 0.0]);
var coordinate_system3 = new CoordinateSystem();
coordinate_system3.TwoPointsAndAngle(undefined, [1.0, 2.0, 3.0], [2.0, 1.0, 3.0], 50);
var coordinate_system4 = new CoordinateSystem();
coordinate_system4.PointAndThreeAngels(undefined, [1.0, 2.0, 3.0], 10, 20, 30, "X'Z'Y'");