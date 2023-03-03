/**
 * Create Node
 * @class
 * @constructor
 * @param {int} no - Number of Node
 * @param {number} coordinate_X - Coordinate X
 * @param {number} coordinate_Y - Coordinate Y
 * @param {number} coordinate_Z - Coordinate Z
 * @param {string} comment - Comment for the Node
 * @param {dictionary} params - Parameters of the Node
 * @returns node
 */
function Node(no,
    coordinate_X,
    coordinate_Y,
    coordinate_Z,
    comment,
    params) {

    if (arguments.length !== 0) {
        coordinate_X = typeof coordinate_X !== 'undefined' ? coordinate_X : 0.0;
        coordinate_Y = typeof coordinate_Y !== 'undefined' ? coordinate_Y : 0.0;
        coordinate_Z = typeof coordinate_Z !== 'undefined' ? coordinate_Z : 0.0;
        this.node = engine.create_node(no);

        // Coordinates
        this.node.coordinate_1 = coordinate_X;
        this.node.coordinate_2 = coordinate_Y;
        this.node.coordinate_3 = coordinate_Z;

        set_comment_and_parameters(this.node, comment, params);
        return this.node;
    }
}

/**
 * Create Standard node
 * @param {int} no - Number of Node
 * @param {array} coordinates - Coordinate of node in format [x, y, z]
 * @param {string} coordinate_system_type - Type of Coordinate System
 * @param {string} comment - Comment for the Node
 * @param {dictionary} params - Parameters of the Node
 */
Node.prototype.Standard = function (no,
    coordinates,
    coordinate_system_type,
    comment,
    params) {
    if (typeof (coordinates) !== "undefined") {
        coordinates = typeof coordinates !== 'undefined' ? coordinates : [];
        ASSERT(coordinates.length == 3, "WARNING: The coordinate system needs to be of length 3. Kindly check list inputs for completeness and correctness.");
        this.node = engine.create_node(no);
        if (typeof coordinate_system_type !== "undefined") {
            this.node.coordinate_system_type = GetNodeCoordinateSystemType(coordinate_system_type);
        }
        if (coordinate_system_type == "COORDINATE_SYSTEM_CARTESIAN" || coordinate_system_type == "") {
            this.node.coordinate_2 = coordinates[1];
            this.node.coordinate_3 = coordinates[2];
        }
        else if (coordinate_system_type == "COORDINATE_SYSTEM_X_CYLINDRICAL") {
            this.node.coordinate_2 = coordinates[1];
            this.node.coordinate_3 = coordinates[2] * PI / 180;
        }
        else if (coordinate_system_type == "COORDINATE_SYSTEM_Y_CYLINDRICAL") {
            this.node.coordinate_2 = coordinates[1];
            this.node.coordinate_3 = coordinates[2] * PI / 180;
        }
        else if (coordinate_system_type == "COORDINATE_SYSTEM_Z_CYLINDRICAL") {
            this.node.coordinate_2 = coordinates[1] * PI / 180;
            this.node.coordinate_3 = coordinates[2];
        }
        else if (coordinate_system_type == "COORDINATE_SYSTEM_POLAR") {
            this.node.coordinate_2 = coordinates[1] * PI / 180;
            this.node.coordinate_3 = coordinates[2] * PI / 180;
        }
        this.node.coordinate_1 = coordinates[0];
        set_comment_and_parameters(this.node, comment, params);
    }
};

/**
 * Create Node between two nodes
 * @param {int} no - Number of Node
 * @param {int} start_node_no - Number of start node
 * @param {int} end_node_no - Number of end node
 * @param {string} node_reference - Node Reference
 * @param {array} parameters - List of parameters of node
 * @param {number} offset_y - Offset in Y direction
 * @param {number} offset_z - Offset in Z direction
 * @param {string} comment - Comment for the Node
 * @param {dictionary} params - Parameters of the Node
 */
Node.prototype.BetweenTwoNodes = function (no,
    start_node_no,
    end_node_no,
    node_reference,
    parameters,
    offset_y,
    offset_z,
    comment,
    params) {
    start_node_no = typeof start_node_no !== 'undefined' ? start_node_no : 0;
    end_node_no = typeof end_node_no !== 'undefined' ? end_node_no : 0;
    node_reference = typeof node_reference !== 'undefined' ? node_reference : "";
    parameters = typeof parameters !== 'undefined' ? parameters : [];
    offset_y = typeof offset_y !== 'undefined' ? offset_y : 0.0;
    offset_z = typeof offset_z !== 'undefined' ? offset_z : 0.0;

    this.node = engine.create_node(no);
    this.node.type = nodes.TYPE_BETWEEN_TWO_NODES;
    this.node.between_two_nodes_start_node = start_node_no;
    this.node.between_two_nodes_end_node = end_node_no;
    this.node.reference_type = GetNodeReferenceType(node_reference);

    if (parameters[0] == true) {
        ASSERT(parameters[1] < 100, "Relative distance percentage should be less than 100");
        ASSERT(parameters[1] > 0, "Relative distance percentage should be more than 0");
        this.node.distance_from_start_is_defined_as_relative = true;
        this.node.distance_from_start_relative = parameters[1] / 100;
    }
    else if (parameters[0] == false) {
        this.node.distance_from_start_is_defined_as_relative = false;
        this.node.distance_from_start_absolute = parameters[1];
    }

    if (node_reference == "REFERENCE_TYPE_L" || node_reference == "") {
        this.node.offset_in_local_direction_y = offset_y;
        this.node.offset_in_local_direction_z = offset_z;
    }
    set_comment_and_parameters(this.node, comment, params);
};

/**
 * Create Node between two points
 * @param {int} no - Number of Node
 * @param {array} start_point - Coordinate of start point in format [x, y, z]
 * @param {array} end_point - Coordinate of end point in format [x, y, z]
 * @param {string} node_reference - Node Reference
 * @param {array} parameters - List of parameters of node
 * @param {number} offset_y - Offset in Y direction
 * @param {number} offset_z - Offset in Z direction
 * @param {string} comment - Comment for the Node
 * @param {dictionary} params - Parameters of the Node
 */
Node.prototype.BetweenTwoPoints = function (no,
    start_point,
    end_point,
    node_reference,
    parameters,
    offset_y,
    offset_z,
    comment,
    params) {
    start_point = typeof start_point !== 'undefined' ? start_point : [];
    end_point = typeof end_point !== 'undefined' ? end_point : [];
    node_reference = typeof node_reference !== 'undefined' ? node_reference : "";
    parameters = typeof parameters !== 'undefined' ? parameters : [];
    offset_y = typeof offset_y !== 'undefined' ? offset_y : 0.0;
    offset_z = typeof offset_z !== 'undefined' ? offset_z : 0.0;
    ASSERT(start_point.length == 3, "Define start point by this format [0.0, 0.0, 0.0]");
    ASSERT(end_point.length == 3, "Define end point by this format [0.0, 0.0, 0.0]");

    this.node = engine.create_node(no);
    this.node.type = nodes.TYPE_BETWEEN_TWO_POINTS;
    this.node.between_two_points_start_point_coordinate_1 = start_point[0];
    this.node.between_two_points_start_point_coordinate_2 = start_point[1];
    this.node.between_two_points_start_point_coordinate_3 = start_point[2];
    this.node.between_two_points_end_point_coordinate_1 = end_point[0];
    this.node.between_two_points_end_point_coordinate_2 = end_point[1];
    this.node.between_two_points_end_point_coordinate_3 = end_point[2];
    this.node.reference_type = GetNodeReferenceType(node_reference);

    if (parameters[0] == true) {
        ASSERT(parameters[1] < 100, "Relative distance percentage should be less than 100");
        ASSERT(parameters[1] > 0, "Relative distance percentage should be more than 0");
        this.node.distance_from_start_is_defined_as_relative = true;
        this.node.distance_from_start_relative = parameters[1] / 100;
    }
    else if (parameters[0] == false) {
        this.node.distance_from_start_is_defined_as_relative = false;
        this.node.distance_from_start_absolute = parameters[1];
    }

    if (node_reference == "REFERENCE_TYPE_L" || node_reference == "") {
        this.node.offset_in_local_direction_y = offset_y;
        this.node.offset_in_local_direction_z = offset_z;
    }
    set_comment_and_parameters(this.node, comment, params);
};

/**
 * Create Node On Line
 * @param {int} no - Number of the Node
 * @param {int} line_number - Number of the Line
 * @param {string} node_reference - Node Reference
 * @param {array} parameters - List of parameters of node
 * @param {string} comment - Comment for the Node
 * @param {dictionary} params - Parameters of the Node
 */
Node.prototype.OnLine = function (no,
    line_number,
    node_reference,
    parameters,
    comment,
    params) {
    line_number = typeof line_number !== 'undefined' ? line_number : 0;
    node_reference = typeof node_reference !== 'undefined' ? node_reference : "";
    parameters = typeof parameters !== 'undefined' ? parameters : [];

    this.node = engine.create_node(no);
    this.node.type = nodes.TYPE_ON_LINE;
    this.node.on_line_reference_line = line_number;
    this.node.reference_type = GetNodeReferenceType(node_reference);

    if (parameters[0] == true) {
        ASSERT(parameters[1] < 100, "Relative distance percentage should be less than 100");
        ASSERT(parameters[1] > 0, "Relative distance percentage should be more than 0");
        this.node.distance_from_start_is_defined_as_relative = true;
        this.node.distance_from_start_relative = parameters[1] / 100;
    }
    else if (parameters[0] == false) {
        this.node.distance_from_start_is_defined_as_relative = false;
        this.node.distance_from_start_absolute = parameters[1];
    }
    set_comment_and_parameters(this.node, comment, params);
};

/**
 * Create Node on Member
 * @param {int} no - Number of the Node
 * @param {int} member_number - Number of member
 * @param {string} node_reference - Node Reference
 * @param {array} parameters - List of parameters of node
 * @param {string} comment - Comment for the Node
 * @param {dictionary} params - Parameters of the Node
 */
Node.prototype.OnMember = function (no,
    member_number,
    node_reference,
    parameters,
    comment,
    params) {
    member_number = typeof member_number !== 'undefined' ? member_number : 0;
    node_reference = typeof node_reference !== 'undefined' ? node_reference : "";
    parameters = typeof parameters !== 'undefined' ? parameters : [];

    this.node = engine.create_node(no);
    this.node.type = nodes.TYPE_ON_MEMBER;
    this.node.on_member_reference_member = member_number;
    this.node.reference_type = GetNodeReferenceType(node_reference);

    if (parameters[0] == true) {
        ASSERT(parameters[1] < 100, "Relative distance percentage should be less than 100");
        ASSERT(parameters[1] > 0, "Relative distance percentage should be more than 0");
        this.node.distance_from_start_is_defined_as_relative = true;
        this.node.distance_from_start_relative = parameters[1] / 100;
    }
    else if (parameters[0] == false) {
        this.node.distance_from_start_is_defined_as_relative = false;
        this.node.distance_from_start_absolute = parameters[1];
    }
    set_comment_and_parameters(this.node, comment, params);
};

Node.prototype.GetNo = function(){
	return this.node.no;
};

Node.prototype.GetNode = function () {
    return this.node;
};

function GetNodeCoordinateSystemType(coordination_system_type) {
	const coordination_system_types_dict = {
        "COORDINATE_SYSTEM_CARTESIAN": nodes.COORDINATE_SYSTEM_CARTESIAN,
        "COORDINATE_SYSTEM_X_CYLINDRICAL": nodes.COORDINATE_SYSTEM_X_CYLINDRICAL,
        "COORDINATE_SYSTEM_Y_CYLINDRICAL": nodes.COORDINATE_SYSTEM_Y_CYLINDRICAL,
        "COORDINATE_SYSTEM_Z_CYLINDRICAL": nodes.COORDINATE_SYSTEM_Z_CYLINDRICAL,
        "COORDINATE_SYSTEM_POLAR": nodes.COORDINATE_SYSTEM_POLAR
	};

	if (coordination_system_type !== undefined) {
	  var type = coordination_system_types_dict[coordination_system_type];
	  if (type === undefined) {
		console.log("Wrong coordinate system type. Value was: " + coordination_system_type);
		console.log("Correct values are: ( " + Object.keys(coordination_system_types_dict) + ")");
		type = "";
	  }
	  return type;
	}
	else {
	  return "";
	}
}

function GetNodeReferenceType(reference_type) {
	const reference_types_dict = {
        "REFERENCE_TYPE_L": nodes.REFERENCE_TYPE_L,
        "REFERENCE_TYPE_XY": nodes.REFERENCE_TYPE_XY,
        "REFERENCE_TYPE_XZ": nodes.REFERENCE_TYPE_XZ,
        "REFERENCE_TYPE_YZ": nodes.REFERENCE_TYPE_YZ
	};

	if (reference_type !== undefined && reference_type != "") {
	  var type = reference_types_dict[reference_type];
	  if (type === undefined) {
		console.log("Wrong reference type. Value was: " + reference_type);
		console.log("Correct values are: ( " + Object.keys(reference_types_dict) + ")");
		type = nodes.REFERENCE_TYPE_L;
	  }
	  return type;
	}
	else {
	  return nodes.REFERENCE_TYPE_L;
	}
}
