function GetMemberImperfectionDirection(coordinate_system, imperfection_direction) {
    if (coordinate_system === "LOCAL") {
        const imperfection_directions_dict = {
            "LOCAL_Y" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Y,
            "LOCAL_Z" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z,
            "LOCAL_Y_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Y_NEGATIVE,
            "LOCAL_Z_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z_NEGATIVE
        };
    }
    else if (coordinate_system === "PRINCIPAL") {
        const imperfection_directions_dict = {
            "U" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_U,
            "V" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_V,
            "U_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_U_NEGATIVE,
            "V_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_V_NEGATIVE
        };
    }
    else {
        const imperfection_directions_dict = {
            "X_U" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
            "Y_V" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
            "Z_W" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE,
            "X_U_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_NEGATIVE,
            "Y_V_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_NEGATIVE,
            "Z_W_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_NEGATIVE
        };
    }

    if (imperfection_direction !== undefined) {
		var imperfectionDirection = imperfection_directions_dict[imperfection_direction];
		if (imperfectionDirection === undefined) {
			console.log("Wrong type of imperfection direction. Value was: " + imperfection_direction);
			console.log("Correct values are: ( " + Object.keys(imperfection_directions_dict) + ")");
			imperfectionDirection = imperfection_directions_dict[Object.keys(imperfection_directions_dict)[0]];
		}
		return imperfectionDirection;
	}
	else {
		return imperfection_directions_dict[Object.keys(imperfection_directions_dict)[0]];
	}
}

function GetMemberImperfectionCoordinateSystemType(coordinate_type) {
	const coordinate_types_dict = {
		"LOCAL" : member_imperfections.COORDINATE_SYSTEM_TYPE_LOCAL,
        "PRINCIPAL" : member_imperfections.COORDINATE_SYSTEM_TYPE_PRINCIPAL
	};
    
	if (coordinate_type !== "undefined") {
		var coordinateType = coordinate_types_dict[coordinate_type];
		if (coordinateType === "undefined") {
			console.log("Wrong type of coordinate system type. Value was: " + coordinate_type);
			console.log("Correct values are: ( " + Object.keys(coordinate_types_dict) + ")");
			coordinateType = member_imperfections.COORDINATE_SYSTEM_TYPE_LOCAL;
		}
		return coordinateType;
	}
	else {
		return member_imperfections.COORDINATE_SYSTEM_TYPE_LOCAL;
	}
}

function GetMemberImperfectionType(imperfection_type) {
	const imperfection_types_dict = {
		"INITIAL_SWAY" : member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY,
        "INITIAL_BOW" : member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW,
        "INITIAL_BOW_AND_CRITERION" : member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION
	};

	if (imperfection_type !== undefined) {
		var imperfectionType = imperfection_types_dict[imperfection_type];
		if (imperfectionType === undefined) {
			console.log("Wrong type of imperfection type. Value was: " + imperfection_type);
			console.log("Correct values are: ( " + Object.keys(imperfection_types_dict) + ")");
			imperfectionType = member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY;
		}
		return imperfectionType;
	}
	else {
		return member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY;
	}
}

function GetMemberImperfectionDefinitionType(imperfection_type, definition_type) {
	if (imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY) {
        const definition_types_dict = {
            "RELATIVE" : member_imperfections.DEFINITION_TYPE_RELATIVE,
            "ABSOLUTE" : member_imperfections.DEFINITION_TYPE_ABSOLUTE,
            "EN_1992_1" : member_imperfections.DEFINITION_TYPE_EN_1992_1,
            "EN_1993_1_1" : member_imperfections.DEFINITION_TYPE_EN_1993_1_1,
            "EN_1995_1_1" : member_imperfections.DEFINITION_TYPE_EN_1995_1_1,
            "ANSI_CURRENT" : member_imperfections.DEFINITION_TYPE_ANSI_CURRENT,
            "ANSI_GRAVITY_LOAD" : member_imperfections.DEFINITION_TYPE_ANSI_GRAVITY_LOAD,
            "CSA_CURRENT" : member_imperfections.DEFINITION_TYPE_CSA_CURRENT,
            "CSA_GRAVITY_LOAD" : member_imperfections.DEFINITION_TYPE_CSA_GRAVITY_LOAD,
            "GB_50017_2017_CURRENT" : member_imperfections.DEFINITION_TYPE_GB_50017_2017_CURRENT,
            "GB_50017_2017_GRAVITY_LOAD" : member_imperfections.DEFINITION_TYPE_GB_50017_2017_GRAVITY_LOAD
        };
    }
    else if (imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW) {
        const definition_types_dict = {
            "MANUALLY_RELATIVE" : member_imperfections.DEFINITION_TYPE_RELATIVE,
            "MANUALLY_ABSOLUTE" : member_imperfections.DEFINITION_TYPE_ABSOLUTE,
            "EN_1993_1_1" : member_imperfections.DEFINITION_TYPE_EN_1993_1_1,
            "EN_1995_1_1" : member_imperfections.DEFINITION_TYPE_EN_1995_1_1,
            "EN_1999_1_1" : member_imperfections.DEFINITION_TYPE_EN_1999_1_1,
            "ANSI_CURRENT" : member_imperfections.DEFINITION_TYPE_ANSI_CURRENT,
            "ANSI_GRAVITY_LOAD" : member_imperfections.DEFINITION_TYPE_ANSI_GRAVITY_LOAD,
            "CSA_CURRENT" : member_imperfections.DEFINITION_TYPE_CSA_CURRENT,
            "CSA_GRAVITY_LOAD" : member_imperfections.DEFINITION_TYPE_CSA_GRAVITY_LOAD,
            "GB_50017_2017" : member_imperfections.DEFINITION_TYPE_GB_50017_2017
        };
    }
    else if (imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION) {
        const definition_types_dict = {
            "MANUALLY_RELATIVE" : member_imperfections.DEFINITION_TYPE_RELATIVE,
            "MANUALLY_ABSOLUTE" : member_imperfections.DEFINITION_TYPE_ABSOLUTE
        };
    }
    else {
        ASSERT(false, "Unknown imperfection type");
    }

	if (definition_type !== undefined) {
		var definitionType = definition_types_dict[definition_type];
		if (definitionType === undefined) {
			console.log("Wrong type of definition type. Value was: " + definition_type);
			console.log("Correct values are: ( " + Object.keys(definition_types_dict) + ")");
			definitionType = member_imperfections.DEFINITION_TYPE_RELATIVE;
		}
		return definitionType;
	}
	else {
		return member_imperfections.DEFINITION_TYPE_RELATIVE;
	}
}

function GetMemberImperfectionSectionDesignType(section_design) {
	const section_designs_dict = {
        "ELASTIC" : member_imperfections.SECTION_DESIGN_ELASTIC,
        "PLASTIC" : member_imperfections.SECTION_DESIGN_PLASTIC
	};

	if (section_design !== undefined) {
		var sectionDesign = section_designs_dict[section_design];
		if (sectionDesign === undefined) {
			console.log("Wrong section design type. Value was: " + section_design);
			console.log("Correct values are: ( " + Object.keys(section_designs_dict) + ")");
			sectionDesign = member_imperfections.SECTION_DESIGN_PLASTIC;
		}
		return sectionDesign;
	}
	else {
		return member_imperfections.SECTION_DESIGN_PLASTIC;
	}
}

function GetMemberImperfectionActivityCriterionType(activity_criterion_type) {
	const activity_criterion_types_dict = {
		"ALWAYS" : member_imperfections.ACTIVITY_CRITERION_ALWAYS,
        "EN_1993" : member_imperfections.ACTIVITY_CRITERION_EN_1993,
        "EN_1999" : member_imperfections.ACTIVITY_CRITERION_EN_1999,
        "DIN_18800" : member_imperfections.ACTIVITY_CRITERION_DIN_18800,
        "DEFINE" : member_imperfections.ACTIVITY_CRITERION_DEFINE
	};

	if (activity_criterion_type !== undefined) {
		var activityType = activity_criterion_types_dict[activity_criterion_type];
		if (activityType === undefined) {
			console.log("Wrong type of activity criterion type. Value was: " + activity_criterion_type);
			console.log("Correct values are: ( " + Object.keys(activity_criterion_types_dict) + ")");
			activityType = member_imperfections.ACTIVITY_CRITERION_ALWAYS;
		}
		return activityType;
	}
	else {
		return member_imperfections.ACTIVITY_CRITERION_ALWAYS;
	}
}

function GetMemberImperfectionStandardFactorEnumerationType(factor_type) {
	const factor_types_dict = {
		"LRFD" : member_imperfections.STANDARD_FACTOR_LRFD,
        "ASD" : member_imperfections.STANDARD_FACTOR_ASD
	};

	if (factor_type !== undefined) {
		var standardType = factor_types_dict[factor_type];
		if (standardType === undefined) {
			console.log("Wrong standard factor enumeration type. Value was: " + factor_type);
			console.log("Correct values are: ( " + Object.keys(factor_types_dict) + ")");
			standardType = member_imperfections.STANDARD_FACTOR_LRFD;
		}
		return standardType;
	}
	else {
		return member_imperfections.STANDARD_FACTOR_LRFD;
	}
}

function GetMemberSetImperfectionDirection(coordinate_system, imperfection_direction) {
    return GetMemberImperfectionDirection(coordinate_system, imperfection_direction);
}

function GetMemberSetImperfectionCoordinateSystemType(coordinate_type) {
	return GetMemberImperfectionCoordinateSystemType(coordinate_type);
}

function GetMemberSetImperfectionType(imperfection_type) {
	return GetMemberImperfectionType(imperfection_type);
}

function GetMemberSetImperfectionDefinitionType(imperfection_type, definition_type) {
	return GetMemberImperfectionDefinitionType(imperfection_type, definition_type);
}

function GetMemberSetImperfectionSectionDesignType(section_design) {
	return GetMemberImperfectionSectionDesignType(section_design);
}

function GetMemberSetImperfectionActivityCriterionType(activity_criterion_type) {
	return GetMemberImperfectionActivityCriterionType(activity_criterion_type);
}

function GetMemberSetImperfectionStandardFactorEnumerationType(factor_type) {
	return GetMemberImperfectionStandardFactorEnumerationType(factor_type);
}

function GetSurfaceImperfectionDefinitionType(definition_type) {
	const definition_types_dict = {
        "RELATIVE" : surface_imperfections.RELATIVE,
		"ABSOLUTE" : surface_imperfections.ABSOLUTE
	};

	if (definition_type !== undefined) {
		var definitionType = definition_types_dict[definition_type];
		if (definitionType === undefined) {
			console.log("Wrong definition type. Value was: " + definition_type);
			console.log("Correct values are: ( " + Object.keys(definition_types_dict) + ")");
			definitionType = surface_imperfections.ABSOLUTE;
		}
		return definitionType;
	}
	else {
		return surface_imperfections.ABSOLUTE;
	}
}

function GetSurfaceImperfectionDirection(direction_type) {
	const direction_types_dict = {
        "LOCAL_Z" : surface_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z,
        "LOCAL_Z_NEGATIVE" : surface_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z_NEGATIVE
	};

	if (direction_type !== undefined) {
		var directionType = direction_types_dict[direction_type];
		if (directionType === undefined) {
			console.log("Wrong direction type. Value was: " + direction_type);
			console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
			directionType = surface_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z;
		}
		return directionType;
	}
	else {
		return surface_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z;
	}
}

function GetSurfaceSetImperfectionDefinitionType(definition_type) {
	return GetSurfaceImperfectionDefinitionType(definition_type);
}

function GetSurfaceSetImperfectionDirection(direction_type) {
	return GetSurfaceImperfectionDirection(direction_type);
}