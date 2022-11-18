/**
* Creates Imperfection case
* @class
* @constructor
* @param	{Number}	no				Index of Imperfection case, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Parameters, can be undefined
 * @returns	Created empty Imperfection case
*/
function ImperfectionCase (no,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.imperfectionCase = createTypedImperfectionCase(no, undefined, comment, params);
    }
}

/**
 * Returns Imperfection case number.
 * @returns Imperfection case number
 */
ImperfectionCase.prototype.No = function () {
    return this.imperfectionCase.no;
};

/**
 * Creates Local imperfection case
 * @param {Number}  no                      Index of Imperfection case, can be undefined
 * @param {Array}   load_cases_to_assign    Load cases to assign (array of numbers)
 * @param {Boolean} assign_to_all_load      Assign to all load combinations without assigned imperfection case, can be undefined (true as default)
 * @param {Boolean} is_active               Is imperfection case active, can be undefined (false as default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Parameters, can be undefined
 * @returns Imperfection case
 */
ImperfectionCase.prototype.LocalImperfection = function (no,
    load_cases_to_assign,
    assign_to_all_load,
    is_active,
    comment,
    params) {
    this.imperfectionCase = createTypedImperfectionCase(no, "LOCAL_IMPERFECTIONS", comment, params);
    this.imperfectionCase = assignCommonValues(this.imperfectionCase, load_cases_to_assign, assign_to_all_load, is_active);
    return this.imperfectionCase;
};

/**
 * Creates Notional loads from load case imperfection case
 * @param {Number}  no                                  Index of imperfection case, can be undefined
 * @param {Array}   load_cases_to_assign                Load cases to assign (array of numbers)
 * @param {Number}  notional_loads_from_load_case_no    Notional loads from load case
 * @param {Boolean} assign_to_all_load                  Assign to all load combinations without assigned imperfection case, can be undefined (true as default)
 * @param {Boolean} is_active                           Is imperfection case active, can be undefined (false as default)
 * @param {String}  comment                             Comment, can be undefined
 * @param {Object}  params                              Parameters, can be undefined
 * @returns Imperfection case
 */
ImperfectionCase.prototype.Notional = function (no,
    load_cases_to_assign,
    notional_loads_from_load_case_no,
    assign_to_all_load,
    is_active,
    comment,
    params) {
    this.imperfectionCase = createTypedImperfectionCase(no, "NOTIONAL_LOADS_FROM_LOAD_CASE", comment, params);
    this.imperfectionCase = assignCommonValues(this.imperfectionCase, load_cases_to_assign, assign_to_all_load, is_active);
    ASSERT(typeof notional_loads_from_load_case_no !== "undefined", "Notional load must be defined");
    if (!load_cases.exist(notional_loads_from_load_case_no)) {
        console.log("Load case no. " + notional_loads_from_load_case_no + " doesn't exist");
        ASSERT(false);
    }
    var load_case = load_cases[notional_loads_from_load_case_no];
    ASSERT(load_case.action_category === load_cases.ACTION_CATEGORY_NONE_NONE, "Only load case from None category is allowed");
    this.imperfectionCase.load_case_for_notional_loads = notional_load_from_no;
    return this.imperfectionCase;
};

/**
 * Creates Initial sway imperfection case
 * @param {Number}  no                              Index of imperfection case, can be undefined
 * @param {Array}   load_cases_to_assign            Load cases to assign (array of numbers)
 * @param {Array}   level_imperfections             Level imperfections ([level1, [level2, theta_1_x, theta_1_y], ... [leveln, theta_n_x, theta_n_x]])
 * @param {Number}  coordinate_system_no            Coordinate system, can be undefined (Global XYZ by default)
 * @param {String}  level_direction                 Level direction, can be undefined (GLOBAL_IN_Z by default if Global XYZ is specified, otherwise USER_DEFINED_IN_W by default)
 * @param {String}  imperfection_direction          Imperfection direction, can be undefined (XY by default)
 * @param {Boolean} sway_coefficients_reciprocal    Sway coeficient as reciprocal by 1, can be undefined (true as default)
 * @param {Boolean} assign_to_all_load              Assign to all load combinations without assigned imperfection case, can be undefined (true as default)       
 * @param {Boolean} is_active                       Is imperfection case active, can be undefined (false as default)
 * @param {String}  comment                         Comment, can be undefined
 * @param {Object}  params                          Parameters, can be undefined
 * @returns Imperfection case
 */
ImperfectionCase.prototype.InitialSway = function (no,
    load_cases_to_assign,
    level_imperfections,
    coordinate_system_no,
    level_direction,
    imperfection_direction,
    sway_coefficients_reciprocal,
    assign_to_all_load,
    is_active,
    comment,
    params) {
    this.imperfectionCase = createTypedImperfectionCase(no, "INITIAL_SWAY_VIA_TABLE", comment, params);
    this.imperfectionCase = assignCommonValues(this.imperfectionCase, load_cases_to_assign, assign_to_all_load, is_active);
    if (typeof coordinate_system_no !== "undefined") {
        if (coordinate_systems.exist(coordinate_system_no)) {
            this.imperfectionCase.coordinate_system = coordinate_systems[coordinate_system_no];
        }
        else {
            console.log("Coordinate system no. " + coordinate_system_no + " doesn't exist");
        }
    }
    if (typeof level_direction !== "undefined") {
        if (this.imperfectionCase.coordinate_system.type === coordinate_systems.TYPE_GLOBAL_XYZ) {
            ASSERT(level_direction === "GLOBAL_IN_X" || level_direction === "GLOBAL_IN_Y" || level_direction === "GLOBAL_IN_Z", "Wrong level direction");
        }
        else {
            ASSERT(level_direction === "USER_DEFINED_IN_U" || level_direction === "USER_DEFINED_IN_V" || level_direction === "USER_DEFINED_IN_W", "Wrong level direction");
        }
        this.imperfectionCase.direction = GetLevelDirection(level_direction);
    }
    if (typeof imperfection_direction !== "undefined") {
        if (this.imperfectionCase.coordinate_system.type === coordinate_systems.TYPE_GLOBAL_XYZ) {
            switch (level_direction)
            {
                case "GLOBAL_IN_X":
                    ASSERT(imperfection_direction === "DIRECTION_Y" || imperfection_direction === "DIRECTION_Z" || imperfection_direction === "DIRECTION_YZ", "Wrong imperfection direction. Level direction has value " + level_direction + ", imperfection case must be from string range DIRECTION_Y, DIRECTION_Z, DIRECTION_YZ");
                    break;
                case "GLOBAL_IN_Y":
                    ASSERT(imperfection_direction === "DIRECTION_X" || imperfection_direction === "DIRECTION_Z" || imperfection_direction === "DIRECTION_XZ", "Wrong imperfection direction. Level direction has value " + level_direction + ", imperfection case must be from string range DIRECTION_X, DIRECTION_Z, DIRECTION_XZ");
                    break;
                case "GLOBAL_IN_Z":
                    ASSERT(imperfection_direction === "DIRECTION_X" || imperfection_direction === "DIRECTION_Y" || imperfection_direction === "DIRECTION_XY", "Wrong imperfection direction. Level direction has value " + level_direction + ", imperfection case must be from string range DIRECTION_X, DIRECTION_Y, DIRECTION_XY");
                    break;
                default:
                    ASSERT(false, "Unknown level direction: " + level_direction);
            }
        }
        else {
            switch (level_direction)
            {
                case "USER_DEFINED_IN_U":
                    ASSERT(imperfection_direction === "DIRECTION_V" || imperfection_direction === "DIRECTION_W" || imperfection_direction === "DIRECTION_VW", "Wrong imperfection direction. Level direction has value " + level_direction + ", imperfection case must be from string range DIRECTION_Y, DIRECTION_Z, DIRECTION_YZ");
                    break;
                case "USER_DEFINED_IN_V":
                    ASSERT(imperfection_direction === "DIRECTION_U" || imperfection_direction === "DIRECTION_W" || imperfection_direction === "DIRECTION_UW", "Wrong imperfection direction. Level direction has value " + level_direction + ", imperfection case must be from string range DIRECTION_X, DIRECTION_Z, DIRECTION_XZ");
                    break;
                case "USER_DEFINED_IN_W":
                    ASSERT(imperfection_direction === "DIRECTION_U" || imperfection_direction === "DIRECTION_V" || imperfection_direction === "DIRECTION_UV", "Wrong imperfection direction. Level direction has value " + level_direction + ", imperfection case must be from string range DIRECTION_X, DIRECTION_Y, DIRECTION_XY");
                    break;
                default:
                    ASSERT(false, "Unknown level direction: " + level_direction);
            }
        }
        
        this.imperfectionCase.direction_for_level_direction = GetImperfectionDirection(this.imperfectionCase.coordinate_system.type, imperfection_direction);
    }
    if (typeof sway_coefficients_reciprocal === "undefined") {
        sway_coefficients_reciprocal = true;
    }
    this.imperfectionCase.sway_coefficients_reciprocal = sway_coefficients_reciprocal;
    ASSERT(Array.isArray(level_imperfections) && level_imperfections.length >= 1, "Level imperfections must be array of arrays (first item contains only level value, the other contain level, theta_x, theta_y");
    for (var i = 0; i < level_imperfections.length; ++i) {
        var row = this.imperfectionCase.level_imperfections.row_count();
        this.imperfectionCase.level_imperfections.insert_row(row);
        ASSERT(Array.isArray(level_imperfections[i]), i + 1 + ". item must be array");
        if (imperfection_direction === "DIRECTION_XY" || imperfection_direction === "DIRECTION_XZ" || imperfection_direction === "DIRECTION_YZ") {
            if (i === 0) {
                ASSERT(level_imperfections[i].length === 1, "First array item can contain only level");
                this.imperfectionCase.level_imperfections[row].level = level_imperfections[i][0];
                if (level_imperfections[i].length > 1) {
                    this.imperfectionCase.level_imperfections[row].comment = level_imperfections[i][1];
                }
            }
            else {
                ASSERT(level_imperfections[i].length >= 3, "Item array must containt at least three values");
                this.imperfectionCase.level_imperfections[row].level = level_imperfections[i][0];
                this.imperfectionCase.level_imperfections[row].theta_1 = level_imperfections[i][1];
                this.imperfectionCase.level_imperfections[row].theta_2 = level_imperfections[i][2];
                if (level_imperfections[i].length > 3) {
                    this.imperfectionCase.level_imperfections[row].comment = level_imperfections[i][3];
                }
            }
        }
        else {
            // We set only level and theta 1 (+ comment)
            if (i === 0) {
                ASSERT(level_imperfections[i].length === 1, "First array item can contain only level");
                this.imperfectionCase.level_imperfections[row].level = level_imperfections[i][0];
                if (level_imperfections[i].length > 1) {
                    this.imperfectionCase.level_imperfections[row].comment = level_imperfections[i][1];
                }
            }
            else {
                ASSERT(level_imperfections[i].length >= 2, "Item array must containt at least two values");
                this.imperfectionCase.level_imperfections[row].level = level_imperfections[i][0];
                this.imperfectionCase.level_imperfections[row].theta_2 = level_imperfections[i][1];
                if (level_imperfections[i].length > 2) {
                    this.imperfectionCase.level_imperfections[row].comment = level_imperfections[i][2];
                }
            }
        }
    }
    if (this.imperfectionCase.level_imperfections.row_count() == level_imperfections.length + 1) {
        // There is one empty extra row, delete it! Bug?
        this.imperfectionCase.level_imperfections.remove_row(level_imperfections.length + 1);
    }

    return this.imperfectionCase;
};

/**
 * Returns Static deformation Imperfection case
 * @param {Number}  no                              Number of Imperfection case, can be undefined
 * @param {Array}   load_cases_to_assign            Array of load case numbers
 * @param {String}  source_type                     Source type, can be undefined ("Select load case" by default)
 * @param {Number}  shape_from_no                   Static deformation from load case (source type is Select load case) or from load combination (source type is Select load combination)
 * @param {Number}  imperfection_magnitude          Imperfection magnitude - Imperfection magnitude
 * @param {String}  magnitude_assignment_type       Imperfection magnitude - reference location, can be undefined ("Location with largest displacement" by default)
 * @param {Number}  node_no                         Node number, additional parameter to "Node no." reference location, with "Location with largest displacement" must be undefined
 * @param {Number}  coordinate_system_no            Coordinate system, can be undefined (Global XYZ by default)
 * @param {String}  imperfection_direction          Imperfection direction, can be undefined (XY by default)
 * @param {Boolean} assign_to_all_load              Assign to all load combinations without assigned imperfection case, can be undefined (true as default)
 * @param {Boolean} is_active                       Is imperfection case active, can be undefined (false as default)
 * @param {String}  comment                         Comment, can be undefined
 * @param {Object}  params                          Parameters, can be undefined
 * @returns Imperfection load
 */
ImperfectionCase.prototype.StaticDeformation = function (no,
    load_cases_to_assign,
    source_type,
    shape_from_no,
    imperfection_magnitude,
    magnitude_assignment_type,
    coordinate_system_no,
    imperfection_direction,
    assign_to_all_load,
    is_active,
    comment,
    params) {
    this.imperfectionCase = createTypedImperfectionCase(no, "STATIC_DEFORMATION", comment, params);
    this.imperfectionCase = assignCommonValues(this.imperfectionCase, load_cases_to_assign, assign_to_all_load, is_active);
    ASSERT(typeof source_type !== "undefined", "Source type must be defined");
    if (source_type === "LOAD_CASE") {
        this.imperfectionCase.source = GetStaticDeformationSourceType(source_type);
        if (load_cases.exist(shape_from_no)) {
            this.imperfectionCase.shape_from_load_case = shape_from_no;
        }
        else {
            console.log("Load case no. " + shape_from_no + " doesn't exist");
        }
    }
    else {
        ASSERT(source_type === "LOAD_COMBINATION", "Unknown source type (" + source_type + ")");
        if (load_combinations.exist(shape_from_no)) {
            this.imperfectionCase.shape_from_load_combination = shape_from_no;
        }
        else {
            console.log("Load comabination no. " + shape_from_no + " doesn't exist");
        }
    }
    ASSERT(typeof imperfection_magnitude !== "undefined", "Imperfection magnitude must be defined");
    this.imperfectionCase.delta_zero = imperfection_magnitude;
    this.imperfectionCase.magnitude_assignment_type = GetAssignmentType(magnitude_assignment_type);
    if (typeof coordinate_system_no !== "undefined") {
        if (coordinate_systems.exist(coordinate_system_no)) {
            this.imperfectionCase.coordinate_system = coordinate_systems[coordinate_system_no];
        }
        else {
            console.log("Coordinate system no. " + coordinate_system_no + " doesn't exist");
        }
    }
    this.imperfectionCase.direction = GetLevelDirection(imperfection_direction);   // We have to use this function for imperfection direction
    return this.imperfectionCase;
};

/**
 * Returns Group of Imperfections Imperfection case
 * @param {Number}  no                              Number of Imperfection case, can be undefined
 * @param {Array}   load_cases_to_assign            Array of load case numbers
 * @param {Array}   imperfection_cases              Imperfection cases ([[case_no_1, factor_1, (comment_1)], ... [case_no_n, factor_n, (comment_n)]])
 * @param {Boolean} assign_to_all_load              Assign to all load combinations without assigned imperfection case, can be undefined (true as default)
 * @param {Boolean} is_active                       Is imperfection case active, can be undefined (false as default)
 * @param {String}  comment                         Comment, can be undefined
 * @param {Object}  params                          Parameters, can be undefined
 * @returns Imperfection load
 */
ImperfectionCase.prototype.GroupOfImperfection = function (no,
    load_cases_to_assign,
    imperfection_cases,
    assign_to_all_load,
    is_active,
    comment,
    params) {
    this.imperfectionCase = createTypedImperfectionCase(no, "IMPERFECTION_CASES_GROUP", comment, params);
    this.imperfectionCase = assignCommonValues(this.imperfectionCase, load_cases_to_assign, assign_to_all_load, is_active);
    ASSERT(Array.isArray(imperfection_cases) && imperfection_cases.length > 0, "Imperfection cases must be specified");
    for (var i = 0; i < imperfection_cases.length; ++i) {
        ASSERT(imperfection_cases[i].length >= 2, "Imperfection case must be specified in this way: [case_no, factor, (comment)]");
        var row = this.imperfectionCase.imperfection_cases_items.row_count();
        this.imperfectionCase.imperfection_cases_items.insert_row(row);
        if (load_cases.exist(imperfection_cases[i][0])) {
            this.imperfectionCase.imperfection_cases_items[row].name = imperfection_cases[i][0];
            this.imperfectionCase.imperfection_cases_items[row].factor = imperfection_cases[i][1];
            if (imperfection_cases[i].length === 3) {
                this.imperfectionCase.imperfection_cases_items[row].comment = imperfection_cases[i][2];
            }
        }
    }
    if (this.imperfectionCase.imperfection_cases_items.row_count() == imperfection_cases.length + 1) {
        // There is one empty extra row, delete it! Bug?
        this.imperfectionCase.imperfection_cases_items.remove_row(imperfection_cases.length + 1);
    }
    return this.imperfectionCase;
};

function assignCommonValues (imperfection_case,
    load_cases_to_assign,
    assign_to_all_load,
    is_active) {
    if (typeof load_cases_to_assign !== "undefined") {
        ASSERT(Array.isArray(load_cases_to_assign) && load_cases_to_assign.length > 0, "At least one load case to assign must be defined");
        for (var i = 0; i < load_cases_to_assign.length; ++i) {
            if (!load_cases.exist(load_cases_to_assign[i])) {
                console.log("Load case no ." + load_cases_to_assign[i] + " doesn't exist");
            }
        }
        imperfection_case.assigned_to_load_cases = load_cases_to_assign;
    }
    if (typeof assign_to_all_load === "undefined") {
        assign_to_all_load = true;
    }
    imperfection_case.assign_to_combinations_without_assigned_imperfection_case = assign_to_all_load;
    if (typeof is_active === "undefined") {
        is_active = false;
    }
    imperfection_case.is_active = is_active;
    return imperfection_case;
}

function createTypedImperfectionCase (no,
    imperfection_type,
    comment,
    params) {
    var imperfectionCase = imperfection_cases.create();
    imperfectionCase.type = GetImperfectionCaseImperfectionType(imperfection_type);
    set_comment_and_parameters(imperfectionCase, comment, params);
    return imperfectionCase;
}

function GetLevelDirection(level_direction) {
	const level_directions_dict = {
		"GLOBAL_IN_X" : imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
        "GLOBAL_IN_Y" : imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
        "GLOBAL_IN_Z" : imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE,
        "USER_DEFINED_IN_U" : imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
        "USER_DEFINED_IN_V" : imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
        "USER_DEFINED_IN_W" : imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE
	};

	if (level_direction !== undefined) {
		var ld = level_directions_dict[level_direction];
		if (ld === undefined) {
			console.log("Wrong type of level direction. Value was: " + level_direction);
			console.log("Correct values are: ( " + Object.keys(level_directions_dict) + ")");
			ld = imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE;
		}
		return ld;
	}
	else {
		return imperfection_cases.IMPERFECTION_CASE_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE;
	}
}

function GetImperfectionDirection(coordination_type, imperfection_direction) {
    if (coordination_type === coordinate_systems.TYPE_GLOBAL_XYZ) {
        const imperfection_directions_dict = {
            "DIRECTION_X" : imperfection_cases.DIRECTION_X,
            "DIRECTION_Y" : imperfection_cases.DIRECTION_Y,
            "DIRECTION_Z" : imperfection_cases.DIRECTION_Z,
            "DIRECTION_XY" : imperfection_cases.DIRECTION_XY,
            "DIRECTION_XZ" : imperfection_cases.DIRECTION_XZ,
            "DIRECTION_YZ" : imperfection_cases.DIRECTION_YZ
        };
    }
    else {
        const imperfection_directions_dict = {
            "DIRECTION_U" : imperfection_cases.DIRECTION_X,
            "DIRECTION_V" : imperfection_cases.DIRECTION_Y,
            "DIRECTION_W" : imperfection_cases.DIRECTION_Z,
            "DIRECTION_UV" : imperfection_cases.DIRECTION_XY,
            "DIRECTION_UW" : imperfection_cases.DIRECTION_XZ,
            "DIRECTION_VW" : imperfection_cases.DIRECTION_YZ
        };
    }

	if (imperfection_direction !== undefined) {
		var id = imperfection_directions_dict[imperfection_direction];
		if (id === undefined) {
			console.log("Wrong type of imperfection direction. Value was: " + imperfection_direction);
			console.log("Correct values are: ( " + Object.keys(imperfection_directions_dict) + ")");
			id = imperfection_cases.DIRECTION_X;
		}
		return id;
	}
	else {
		return imperfection_cases.DIRECTION_X;
	}
}

function GetImperfectionCaseImperfectionType(imperfection_type) {
	const imperfection_types_dict = {
		"LOCAL_IMPERFECTIONS" : imperfection_cases.IMPERFECTION_TYPE_LOCAL_IMPERFECTIONS,
        "NOTIONAL_LOADS_FROM_LOAD_CASE" : imperfection_cases.IMPERFECTION_TYPE_NOTIONAL_LOADS_FROM_LOAD_CASE,
        "INITIAL_SWAY_VIA_TABLE" : imperfection_cases.IMPERFECTION_TYPE_INITIAL_SWAY_VIA_TABLE,
        "STATIC_DEFORMATION" : imperfection_cases.IMPERFECTION_TYPE_STATIC_DEFORMATION,
        "BUCKLING_MODE" : imperfection_cases.IMPERFECTION_TYPE_BUCKLING_MODE,
        "DYNAMIC_EIGENMODE" : imperfection_cases.IMPERFECTION_TYPE_DYNAMIC_EIGENMODE,
        "IMPERFECTION_CASES_GROUP" : imperfection_cases.IMPERFECTION_TYPE_IMPERFECTION_CASES_GROUP
	};

	if (imperfection_type !== undefined) {
		var imperfectionType = imperfection_types_dict[imperfection_type];
		if (imperfectionType === undefined) {
			console.log("Wrong type of imperfection type. Value was: " + imperfection_type);
			console.log("Correct values are: ( " + Object.keys(imperfection_types_dict) + ")");
			imperfectionType = imperfection_cases.IMPERFECTION_TYPE_LOCAL_IMPERFECTIONS;
		}
		return imperfectionType;
	}
	else {
		return imperfection_cases.IMPERFECTION_TYPE_LOCAL_IMPERFECTIONS;
	}
}

function GetStaticDeformationSourceType(source_type) {
	const source_types_dict = {
		/*"OWN_LOAD_CASE_OR_COMBINATION" : imperfection_cases.SOURCE_TYPE_OWN_LOAD_CASE_OR_COMBINATION,*/
        "LOAD_CASE" : imperfection_cases.SOURCE_TYPE_LOAD_CASE,
        "LOAD_COMBINATION" : imperfection_cases.SOURCE_TYPE_LOAD_COMBINATION/*,
        "AUTOMATICALLY" : imperfection_cases.SOURCE_TYPE_AUTOMATICALLY*/
	};

	if (source_type !== undefined) {
		var sourceType = source_types_dict[source_type];
		if (sourceType === undefined) {
			console.log("Wrong type of source type. Value was: " + source_type);
			console.log("Correct values are: ( " + Object.keys(source_types_dict) + ")");
			sourceType = imperfection_cases.SOURCE_TYPE_LOAD_CASE;
		}
		return sourceType;
	}
	else {
		return imperfection_cases.SOURCE_TYPE_LOAD_CASE;
	}
}

function GetAssignmentType(assignment_type) {
	const assignment_types_dict = {
		"LOCATION_WITH_LARGEST_DISPLACEMENT" : imperfection_cases.MAGNITUDE_ASSIGNMENT_LOCATION_WITH_LARGEST_DISPLACEMENT,
        "SPECIFIC_NODE" : imperfection_cases.MAGNITUDE_ASSIGNMENT_SPECIFIC_NODE
	};

	if (assignment_type !== undefined) {
		var assignmentType = assignment_types_dict[assignment_type];
		if (assignmentType === undefined) {
			console.log("Wrong type of assignment type. Value was: " + assignment_type);
			console.log("Correct values are: ( " + Object.keys(assignment_types_dict) + ")");
			assignmentType = imperfection_cases.MAGNITUDE_ASSIGNMENT_LOCATION_WITH_LARGEST_DISPLACEMENT;
		}
		return assignmentType;
	}
	else {
		return imperfection_cases.MAGNITUDE_ASSIGNMENT_LOCATION_WITH_LARGEST_DISPLACEMENT;
	}
}