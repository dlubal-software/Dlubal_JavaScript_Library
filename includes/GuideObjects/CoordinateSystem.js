/**
 * Creates coordinate system
 * @class
 * @constructor
 * @param  {Number}  no			Index of coordinate system, can be undefined
 * @param  {String}  coordinate_system_type type of coordinate system
 * @param  {String}  comment     Comment, can be undefined
 * @param  {Object}  params      Additional coordinate system parameters, can be undefined
 * @return {Object}              Created coordinate system
 */
 function CoordinateSystem(no, coordinate_system_type, comment, params) {
	if (arguments.length !== 0) {
		var coordinate_system = engine.create_coordinate_system(no);

		var coordinate_system_type_handled = typeof coordinate_system_type !== 'undefined' ? coordinate_system_type : coordinate_systems.TYPE_3_POINTS;
		coordinate_system.type = coordinate_system_type_handled;
		var handled_params = typeof params !== 'undefined' ? params : {};

		function set_coordinates(coordinates_parameter, coordinate_properties) {
			if (handled_params.hasOwnProperty(coordinates_parameter)) {
				var point = handled_params[coordinates_parameter];
				if (Array.isArray(point)) {
					coordinate_system[coordinate_properties[0]] = point[0];
					coordinate_system[coordinate_properties[1]] = point[1];
					coordinate_system[coordinate_properties[2]] = point[2];
				}
				else if (point['objectType'] !== undefined && point.objectType() == model.nodes.objectType()) {
					coordinate_system[coordinate_properties[0]] = point.coordinate_1;
					coordinate_system[coordinate_properties[1]] = point.coordinate_2;
					coordinate_system[coordinate_properties[2]] = point.coordinate_3;
				}
				delete handled_params[coordinates_parameter];
			}
		}

		set_coordinates('origin_coordinates', ['origin_coordinate_x', 'origin_coordinate_y', 'origin_coordinate_z']);
		set_coordinates('u_axis_point_coordinates', ['u_axis_point_coordinate_x', 'u_axis_point_coordinate_y', 'u_axis_point_coordinate_z']);
		set_coordinates('uw_plane_point_coordinates', ['uw_plane_point_coordinate_x', 'uw_plane_point_coordinate_y', 'uw_plane_point_coordinate_z']);

		set_comment_and_parameters(coordinate_system, comment, handled_params);
		return coordinate_system;
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
CoordinateSystem.prototype.ThreePoints = function (no,
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
 * @param {Number}	uw_plane_angle				Rotation of UW-plane in radians
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
 * @param {Number}	rotation_angle_1			Rotational angle in radians, can be undefined
 * @param {Number}	rotation_angle_2			Rotational angle in radians, can be undefined
 * @param {Number}	rotation_angle_3			Rotational angle in radians, can be undefined
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
		if (!(rotation_angles_sequence in rotation_angles_sequences)) {
			console.log("Rotation angle sequence " + rotation_angles_sequence + " does not exist");
			getRotationAnglesSequences();
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
		this.coordinate_system.rotation_angles_sequence = rotation_angles_sequences[rotation_angles_sequence];
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
function createBaseCoordinateSystem(no,
	comment,
	params) {
	coordinate_system = engine.create_coordinate_system(no);
	set_comment_and_parameters(coordinate_system, comment, params);
	return coordinate_system;
};

function getRotationAnglesSequences() {
	console.log(Object.keys(rotation_angles_sequences));
};

const rotation_angles_sequences = {
	"SEQUENCE_XYZ": "X'Y'Z'",
	"SEQUENCE_XZY": "X'Z'Y'",
	"SEQUENCE_YXZ": "Y'X'Z'",
	"SEQUENCE_YZX": "Y'Z'X'",
	"SEQUENCE_ZXY": "Z'X'Y'",
	"SEQUENCE_ZYX": "Z'Y'X'"
};
