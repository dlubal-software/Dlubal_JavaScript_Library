/**
 * Creates coordinate system
 * @param  {Number}  no          Index of coordinate system, can be undefined
 * @param  {String}  comment     Comment, can be undefined
 * @param  {Object}  params      Additional coordinate system parameters, can be undefined
 * @return {Object}              Created coordinate system
 */
 function CoordinateSystem (no,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.coordinate_system = createBaseCoordinateSystem(no, comment, params);
    }
}

/**
 * Create  coordinate system with "offset" type
 * @param {Number}	no 				Index of coordinate system, can be undefined
 * @param {Array} 	original_point 	Coordinates of original point
 * @param {String} 	comment 		Comment, can be undefined
 * @param {Object} 	params 			Additional parameters, can be undefined
 * @returns 						Created coordinate system
 */
CoordinateSystem.prototype.Offset = function (no,
    original_point,
    comment,
    params) {
	ASSERT(original_point.length === 3, "Original point has to be in form [X, Y, Z]");
    this.coordinate_system = createBaseCoordinateSystem(no, comment, params);
	this.coordinate_system.type = coordinate_systems.TYPE_OFFSET_XYZ;
    this.coordinate_system.origin_coordinate_x = original_point[0];
    this.coordinate_system.origin_coordinate_y = original_point[1];
    this.coordinate_system.origin_coordinate_z = original_point[2];
    return this.coordinate_system;
};

/**
 * Create  coordinate system with "3 Points" type
 * @param {Number}	no 							Index of coordinate system, can be undefined
 * @param {Array} 	original_point 				Coordinates of original point
 * @param {Array}	u_axis_point_coordinate		Coordinates of u axis point
 * @param {Array}	uw_plane_point_coordinate	Coordinates of uw plane point
 * @param {String} 	comment 					Comment, can be undefined
 * @param {Object} 	params 						Additional parameters, can be undefined
 * @returns 									Created coordinate system
 */
CoordinateSystem.prototype.ThreePoints = function(no,
	original_point,
	u_axis_point_coordinate,
	uw_plane_point_coordinate,
	comment,
	params) {
	ASSERT(original_point.length === 3, "Original point has must be in form [X, Y, Z] defined");
	ASSERT(u_axis_point_coordinate.length === 3, "First point (u axis) must be in form [X, Y, Z] defined");
	ASSERT(uw_plane_point_coordinate.length === 3, "Second point (uw plane) must be in form [X, Y, Z] defined");
	this.coordinate_system = createBaseCoordinateSystem(no, comment, params);
	this.coordinate_system.type = coordinate_systems.TYPE_3_POINTS;
	this.coordinate_system.origin_coordinate_x = original_point[0];
    this.coordinate_system.origin_coordinate_y = original_point[1];
    this.coordinate_system.origin_coordinate_z = original_point[2];
	this.coordinate_system.u_axis_point_coordinate_x = u_axis_point_coordinate[0];
	this.coordinate_system.u_axis_point_coordinate_y = u_axis_point_coordinate[1];
	this.coordinate_system.u_axis_point_coordinate_z = u_axis_point_coordinate[2];
	this.coordinate_system.uw_plane_point_coordinate_x = uw_plane_point_coordinate[0];
	this.coordinate_system.uw_plane_point_coordinate_y = uw_plane_point_coordinate[1];
	this.coordinate_system.uw_plane_point_coordinate_z = uw_plane_point_coordinate[2];
	return this.coordinate_system;
};

/**
 * Create  coordinate system with "2 Points and Angle" type
 * @param {Number}	no 							Index of coordinate system, can be undefined
 * @param {Array} 	original_point 				Coordinates of original point
 * @param {Array}	uw_plane_point_coordinate	Coordinates of uw plane point
 * @param {Array}	uw_plane_angle				Rotation of UW-plane
 * @param {String} 	comment 					Comment, can be undefined
 * @param {Object} 	params 						Additional parameters, can be undefined
 * @returns 									Created coordinate system
 */
CoordinateSystem.prototype.TwoPointsAndAngle = function (no,
	original_point,
	u_axis_point_coordinate,
	uw_plane_angle,
	comment,
	params) {
	ASSERT(original_point.length === 3, "Original point has must be in form [X, Y, Z] defined");
	ASSERT(u_axis_point_coordinate.length === 3, "U axis point must be in form [X, Y, Z] defined");
	this.coordinate_system = createBaseCoordinateSystem(no, comment, params);
	this.coordinate_system.type = coordinate_systems.TYPE_2_POINTS_AND_ANGLE;
	this.coordinate_system.origin_coordinate_x = original_point[0];
    this.coordinate_system.origin_coordinate_y = original_point[1];
    this.coordinate_system.origin_coordinate_z = original_point[2];
	this.coordinate_system.u_axis_point_coordinate_x = u_axis_point_coordinate[0];
	this.coordinate_system.u_axis_point_coordinate_y = u_axis_point_coordinate[1];
	this.coordinate_system.u_axis_point_coordinate_z = u_axis_point_coordinate[2];
	if (uw_plane_angle !== "undefined") {
		this.coordinate_system.uw_plane_angle = uw_plane_angle;
	}
	return this.coordinate_system;
};

/**
 * Create  coordinate system with "Points and Three Angles" type
 * @param {Number}	no 							Index of coordinate system, can be undefined
 * @param {Array} 	original_point 				Coordinates of original point
 * @param {Number}	rotation_angle_1			Rotational angle, can be undefined
 * @param {Number}	rotation_angle_2			Rotational angle, can be undefined
 * @param {Number}	rotation_angle_3			Rotational angle, can be undefined
 * @param {String}	rotation_angles_sequence	Rotational angle sequence, can be undefined
 * @param {String} 	comment 					Comment, can be undefined
 * @param {Object} 	params 						Additional parameters, can be undefined
 * @returns 									Created coordinate system
 */
CoordinateSystem.prototype.PointAndThreeAngels = function (no,
	original_point,
	rotation_angle_1,
	rotation_angle_2,
	rotation_angle_3,
	rotation_angles_sequence) {
	ASSERT(original_point.length === 3, "Original point has must be in form [X, Y, Z] defined");
	if (rotation_angles_sequence != "undefined") {
		if (rotation_angles_sequence !== "X'Y'Z'" && rotation_angles_sequence !== "X'Z'Y'" && rotation_angles_sequence !== "Y'X'Z'" && rotation_angles_sequence !== "Y'Z'X'" && rotation_angles_sequence !== "Z'X'Y'" && rotation_angles_sequence !== "Z'Y'X'") {
			ASSERT(false, "Rotation angles sequence must be in range [X'Y'Z', X'Z'Y', Y'X'Z', Y'Z'X', Z'X'Y', Z'Y'X']");
		}
	}
	this.coordinate_system = createBaseCoordinateSystem(no, comment, params);
	this.coordinate_system.type = coordinate_systems.TYPE_POINT_AND_3_ANGLES;
	this.coordinate_system.origin_coordinate_x = original_point[0];
    this.coordinate_system.origin_coordinate_y = original_point[1];
    this.coordinate_system.origin_coordinate_z = original_point[2];
	if (rotation_angle_1 != "undefined") {
		this.coordinate_system.rotation_angle_1 = rotation_angle_1;
	}
	if (rotation_angle_2 != "undefined") {
		this.coordinate_system.rotation_angle_2 = rotation_angle_2;
	}
	if (rotation_angle_3 != "undefined") {
		this.coordinate_system.rotation_angle_3 = rotation_angle_3;
	}
	if (rotation_angles_sequence != "undefined") {
		this.coordinate_system.rotation_angles_sequence = rotation_angles_sequence;
	}
	return this.coordinate_system;
};

/**
 * Create coordinate system (private)
 * @param  {Number}  no          Index of coordinate system, can be undefined
 * @param  {String}  comment     Comment, can be undefined
 * @param  {Object}  params      Additional coordinate system parameters, can be undefined
 * @return {Object}              Created coordinate system
 */
function createBaseCoordinateSystem (no,
    comment,
    params) {
    coordinate_system = engine.create_coordinate_system(no);
    set_comment_and_parameters(coordinate_system, comment, params);
    return coordinate_system;
};