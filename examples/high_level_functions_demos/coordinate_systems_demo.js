include("../../includes/Tools/global.js")

run("../../includes/Tools/clearAll.js");

var coordinate_system = new CoordinateSystem();
coordinate_system.Offset(undefined, [1.0, 2.0, 3.0]);
var coordinate_system1 = new CoordinateSystem();
coordinate_system1.ThreePoints(undefined, [1.0, 2.0, 3.0], [2.0, 1.0, 3.0], [1.0, 0.0, 0.0]);
var coordinate_system3 = new CoordinateSystem();
coordinate_system3.TwoPointsAndAngle(undefined, [1.0, 2.0, 3.0], [2.0, 1.0, 3.0], degrees2Radians(90));
var coordinate_system4 = new CoordinateSystem();
coordinate_system4.PointAndThreeAngels(undefined, [1.0, 2.0, 3.0], degrees2Radians(10), degrees2Radians(20), degrees2Radians(45), "SEQUENCE_XZY");
