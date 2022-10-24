if (!RSECTION) {
    throw new Error("This script is only for RSection, it creates RSection Stress Points.");
}

/**
 * Create RSection Stress Points
 * @class
 * @constructor
 * @param {Number} no       Number of Stress point, can be undefined
 * @param {String} comment  Comment, can be undefined
 * @param {Object} params   Parameters, can be undefined
 * @returns Stress point
 */
function RSectionStressPoint(no,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.stress_point = createBaseStressPoint(no, comment, params);
    }
}

/**
 * Creates Standard Stress point
 * @param {Number} no                           Number of Stress point, can be undefined
 * @param {Number} part_no                      Part number
 * @param {Number} reference_stress_point_no    Reference Stress point number, can be undefined
 * @param {Array}  non_global_coordinates       Coordinates, can be undefined
 * @param {Array}  global_coordinations         Global coordinates, can be undefined
 * @param {Number} element_no                   Element number, can be undefined
 * @param {String} comment                      Comment, can be undefined
 * @param {Object} params                       Parameters, can be undefined
 * @returns Standard Stress point
 */
RSectionStressPoint.prototype.Standard = function (no,
    part_no,
    reference_stress_point_no,
    non_global_coordinates,
    global_coordinations,
    element_no,
    comment,
    params) {
    if (typeof non_global_coordinates  !== "undefined") {
        ASSERT(typeof global_coordinations === "undefined", "Coordinates and global coordinates can't be specified together");
    }
    if (typeof(global_coordinations) !== "undefined") {
        ASSERT(typeof non_global_coordinates === "undefined", "Coordinates and global coordinates can't be specified together");
    }
    this.stress_point = createBaseStressPoint(no, comment, params);
    this.stress_point.definition_type = stress_points.TYPE_STANDARD;
    ASSERT(typeof part_no !== "undefined", "Part must be defined");
    if (parts.exist(part_no)) {
        this.stress_point.part = parts[part_no];
    }
    else {
        console.log("Part no. " + part_no + " doesn't exist");
    }
    if (typeof reference_stress_point_no !== "undefined") {
        if (stress_points.exist(reference_stress_point_no)) {
            this.stress_point.reference_stress_point = reference_stress_point_no;
            console.log(this.stress_point.reference_stress_point);
        }
        else{
            console.log("Reference stress point no." + reference_stress_point_no + " doesn't exist");
        }
    }
    if (typeof global_coordinations !== "undefined") {
        ASSERT(Array.isArray(global_coordinations) && global_coordinations.length === 2, "Global coordination must be specified as coordinations [Y, Z]");
        this.stress_point.global_coordinate_1 = global_coordinations[0];
        this.stress_point.global_coordinate_2 = global_coordinations[1];
    }
    else if (typeof non_global_coordinates !== "undefined") {
        ASSERT(Array.isArray(non_global_coordinates) && non_global_coordinates.length === 2, "Coordinates must be specified as coordinations [Y, Z]");
        this.stress_point.coordinate_1 = non_global_coordinates[0];
        this.stress_point.coordinate_2 = non_global_coordinates[1];
    }
    if (typeof element_no !== "undefined") {
        if (elements.exist(element_no)) {
            this.stress_point.element = element_no;
        }
        else {
            console.log("Element no." + element_no + " doesn't exist");
        }
    }
    this.stress_point.coordinate_system_type = stress_points.COORDINATE_SYSTEM_CARTESIAN;
    return this.stress_point;
}

/**
 * Creates Stress point on line
 * @param {Number} no                   Number of Stress point, can be undefined
 * @param {Number} line_no              Line number
 * @param {Array}  distance_points      Distance between point and start and end points, [from_start, from_end, relative], from_start or from_end can be undefined (but at least one distance must be specified), relative can be undefined (true as default)
 * @param {String} reference_type       Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default)
 * @param {Number} part_no              Part number, van be undefined
 * @param {Number} element_no           Element number, can be undefined
 * @param {String} comment              Comment, can be undefined
 * @param {Object} params               Parameters, can be undefined
 * @returns Stress point on line
 */
RSectionStressPoint.prototype.OnLine = function (no,
    line_no,
    distance_points,
    reference_type,
    part_no,
    element_no,
    comment,
    params) {
    ASSERT(typeof line_no !== "undefined", "Line number must be defined");
    this.stress_point = createBaseStressPoint(no, comment, params);
    this.stress_point.definition_type = stress_points.TYPE_ON_LINE;
    if (lines.exist(line_no)) {
        this.stress_point.on_line_reference_line = line_no;
    }
    else {
        console.log("Line no. " + line_no + " doesn't exist");
    }
    if (typeof distance_points !== "undefined") {
        ASSERT(Array.isArray(distance_points) && distance_points.length >= 2, "Distance points from left and right must be specified");
        var relative = true;
        if (distance_points.length > 2) {
            relative = distance_points[2];
        }
        this.stress_point.distance_from_start_is_defined_as_relative = relative;
        if (typeof distance_points[0] !== "undefined") {
            relative ? this.stress_point.distance_from_start_relative = distance_points[0] : this.stress_point.distance_from_start_absolute = distance_points[0];
        }
        else {
            ASSERT(distance_points[1] !== "undefined", "Distance from end relative must be defined");
            relative ? this.stress_point.distance_from_end_relative = distance_points[1] : this.stress_point.distance_from_end_absolute = distance_points[1];
        }
    }
    if (typeof reference_type !== "undefined") {
        this.stress_point.reference_type = reference_type;
    }
    if (typeof part_no !== "undefined") {
        if (parts.exist(part_no)) {
            this.stress_point.part = parts[part_no];
        }
        else {
            console.log("Par no. " + part_no + " doesn't exist");
        }
    }
    if (typeof element_no !== "undefined") {
        if (elements.exist(element_no)) {
            this.stress_point.element = elements[element_no];
        }
        else {
            console.log("Element no. " + element_no + " doesn't exist");
        }
    }
    this.stress_point.coordinate_system_type = stress_points.COORDINATE_SYSTEM_CARTESIAN;
    return this.stress_point;
}

/**
 * Creates stress point on element
 * @param {Number} no                   Number of Stress point, can be undefined
 * @param {Number} element_no           Element number
 * @param {Array}  distance_points      Distance between point and start and end points, [from_start, from_end, relative], from_start or from_end can be undefined (but at least one distance must be specified), relative can be undefined (true as default)
 * @param {String} reference_type       Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default)
 * @param {String} element_side         Element side, can be undefined ("MIDDLE" as default)
 * @param {String} comment              Comment, can be undefined
 * @param {Object} params               Parameters, can be undefined
 * @returns Modified Stress point
 */
RSectionStressPoint.prototype.OnElement = function (no,
    element_no,
    distance_points,
    reference_type,
    element_side,
    comment,
    params) {
    ASSERT(typeof element_no !== "undefined", "Element number must be defined");
    this.stress_point = createBaseStressPoint(no, comment, params);
    this.stress_point.definition_type = stress_points.TYPE_ON_ELEMENT;
    if (elements.exist(element_no)) {
        this.stress_point.on_element_reference_element = element_no;
    }
    else {
        console.log("Element no. " + element_no + " doesn't exist");
    }
    if (typeof distance_points !== "undefined") {
        ASSERT(Array.isArray(distance_points) && distance_points.length >= 2, "Distance points from left and right must be specified");
        var relative = true;
        if (distance_points.length > 2) {
            relative = distance_points[2];
        }
        this.stress_point.distance_from_start_is_defined_as_relative = relative;
        if (typeof distance_points[0] !== "undefined") {
            relative ? this.stress_point.distance_from_start_relative = distance_points[0] : this.stress_point.distance_from_start_absolute = distance_points[0];
        }
        else {
            ASSERT(distance_points[1] !== "undefined", "Distance from end relative must be defined");
            relative ? this.stress_point.distance_from_end_relative = distance_points[1] : this.stress_point.distance_from_end_absolute = distance_points[1];
        }
    }
    if (typeof reference_type !== "undefined") {
        this.stress_point.reference_type = GetReferenceType(reference_type);
    }
    this.stress_point.on_element_element_side = GetElementSide(element_side);
    return this.stress_point;
};

function GetElementSide(element_side) {
    const element_sides = {
        "MIDDLE" : stress_points.ELEMENT_SIDE_MIDDLE,
        "LEFT" : stress_points.ELEMENT_SIDE_LEFT,
        "RIGHT" : stress_points.ELEMENT_SIDE_RIGHT
    };
    if (element_side !== "undefined") {
		if (!(element_side in element_sides)) {
            console.log("Wrong element side. Value was: " + element_side);
			console.log("Correct values are: ( " + Object.keys(element_sides) + ")");
			element_side = "MIDDLE";
        }
        return element_sides[element_side];
	}
	else {
		return stress_points.ELEMENT_SIDE_MIDDLE;
	}
};

function GetReferenceType(reference_type) {
    const reference_types = {
        "L" : stress_points.REFERENCE_TYPE_L,
        "Y" : stress_points.REFERENCE_TYPE_Y,
        "Z" : stress_points.REFERENCE_TYPE_Z
    };
    if (reference_type !== "undefined") {
		if (!(reference_type in reference_types)) {
            console.log("Wrong reference type. Value was: " + reference_type);
			console.log("Correct values are: ( " + Object.keys(reference_types) + ")");
			reference_type = "L";
        }
        return reference_types[reference_type];
	}
	else {
		return stress_points.REFERENCE_TYPE_L;
	}
};

/**
 * Create RSection Stress Points
 * @param {Number} no       Number of Stress point, can be undefined
 * @param {String} comment  Comment, can be undefined
 * @param {Object} params   Parameters, can be undefined
 * @returns Stress point
 */
function createBaseStressPoint(no,
    comment,
    params) {
    if (typeof no === "undefined") {
        no = stress_points.count() + 1;
    }
    var stress_point = engine.create_rsection_stress_point(no);
    set_comment_and_parameters(stress_point, comment, params);
    return stress_point;
};