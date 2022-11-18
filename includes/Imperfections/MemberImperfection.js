/*
MemberImperfection.prototype.GB_50017_2017 - buckling_shape - what value name from API (values "a", "b", "c" or "d")??
 */
/**
 * Creates Member imperfection
 * @class
 * @constructor
 * @param {Number} no                       Number of Member imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  members_no               Array of members numbers
 * @param {String} comment                  Comment, can be undefined
 * @param {Object} params                   Parameters, can be undefined
 * @returns Member imperfection
 */
function MemberImperfection (no,
    imperfection_case_no,
    members_no,
    comment,
    params) {
    if (arguments.length > 0) {
        return this.memberImperfection = createBaseMemberImperfection(no, imperfection_case_no, members_no, "INITIAL_SWAY", undefined, undefined, undefined, comment, params);
    }
}

/**
 * Creates Initial Sway Member imperfection
 * @param {Number}          no                      Number of Member imperfection, can be undefined
 * @param {Number}          imperfection_case_no    Imperfection case number
 * @param {Array}           members_no              Array of members numbers
 * @param {String/Number}   coordinate_system       Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined
 * @param {String}          imperfection_direction  Imperfection direction, can be undefined.
 *                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"
 *                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"
 *                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE"
 * @param {Boolean}         reference_to_members    Reference to list of members, can be undefined (false as default)
 * @param {String}          comment                 Comment, can be undefined
 * @param {Object}          params                  Parameters, can be undefined
 */
MemberImperfection.prototype.InitialSway = function (no,
    imperfection_case_no,
    members_no,
    coordinate_system,
    imperfection_direction,
    reference_to_members,
    comment,
    params) {
    this.memberImperfection = createBaseMemberImperfection(no, imperfection_case_no, members_no, "INITIAL_SWAY", coordinate_system, imperfection_direction, reference_to_members, comment, params);
};

/**
 * Creates Initial Bow Member imperfection
 * @param {Number}          no                      Number of Member imperfection, can be undefined
 * @param {Number}          imperfection_case_no    Imperfection case number
 * @param {Array}           members_no              Array of members numbers
 * @param {String/Number}   coordinate_system       Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined
 * @param {String}          imperfection_direction  Imperfection direction, can be undefined.
 *                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"
 *                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"
 *                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE"
 * @param {Boolean}         reference_to_members    Reference to list of members, can be undefined (false as default)
 * @param {String}          comment                 Comment, can be undefined
 * @param {Object}          params                  Parameters, can be undefined
 */
MemberImperfection.prototype.InitialBow = function (no,
    imperfection_case_no,
    members_no,
    coordinate_system,
    imperfection_direction,
    reference_to_members,
    comment,
    params) {
    this.memberImperfection = createBaseMemberImperfection(no, imperfection_case_no, members_no, "INITIAL_BOW", coordinate_system, imperfection_direction, reference_to_members, comment, params);
};

/**
 * Creates Initial Bow and Criterion Member imperfection
 * @param {Number}          no                      Number of Member imperfection, can be undefined
 * @param {Number}          imperfection_case_no    Imperfection case number
 * @param {Array}           members_no              Array of members numbers
 * @param {String/Number}   coordinate_system       Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined
 * @param {String}          imperfection_direction  Imperfection direction, can be undefined.
 *                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"
 *                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"
 *                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE"
 * @param {Boolean}         reference_to_members    Reference to list of members, can be undefined (false as default)
 * @param {String}          comment                 Comment, can be undefined
 * @param {Object}          params                  Parameters, can be undefined
 */
MemberImperfection.prototype.InitialBowAndCriterion = function (no,
    imperfection_case_no,
    members_no,
    coordinate_system,
    imperfection_direction,
    reference_to_members,
    comment,
    params) {
    this.memberImperfection = createBaseMemberImperfection(no, imperfection_case_no, members_no, "INITIAL_BOW_AND_CRITERION", coordinate_system, imperfection_direction, reference_to_members, comment, params);
};

/**
 * Modifies Member imperfection to definition type Relative
 * @param {Number} initial_sway         Relative initial sway / Initial bow / Initial bow and criterion, can be undefined (200 as default)
 * @param {String} active_criterion     Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined.
 * @param {Number} active_bow           Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.Relative = function (initial_sway,
    active_criterion,
    active_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY ? "RELATIVE" : "MANUALLY_RELATIVE");
    this.memberImperfection.basic_value_relative = initial_sway;
    if (typeof active_criterion !== "undefined") {
        ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION, "Initial bow and criterion imperfection type must be defined");
        this.memberImperfection.active_criterion = GetActivityCriterionType(active_criterion);
        if (this.memberImperfection.active_criterion === member_imperfections.ACTIVITY_CRITERION_DEFINE) {
            ASSERT(typeof active_bow !== "undefined" && active_bow > 0, "Active bow must be defined");
            this.memberImperfection.active_bow = active_bow;
        }
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type Absolute
 * @param {Number} initial_sway         Absolute initial sway / bow
 * @param {String} active_criterion     Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined.
 * @param {Number} active_bow           Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.Absolute = function (initial_sway,
    active_criterion,
    active_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY ? "ABSOLUTE" : "MANUALLY_ABSOLUTE");
    ASSERT(typeof initial_sway !== "undefined", "Initial sway must be defined");
    this.memberImperfection.basic_value_absolute = initial_sway;
    if (typeof active_criterion !== "undefined") {
        ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION, "Initial bow and criterion imperfection type must be defined");
        this.memberImperfection.active_criterion = GetActivityCriterionType(active_criterion);
        if (this.memberImperfection.active_criterion === member_imperfections.ACTIVITY_CRITERION_DEFINE) {
            ASSERT(typeof active_bow !== "undefined" && active_bow > 0, "Active bow must be defined");
            this.memberImperfection.active_bow = active_bow;
        }
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type EN 1992 1
 * @param {Number}  basic_value_relative        Basic value, can be undefined (200 as default)
 * @param {Number}  height                      Structure height, can be undefined (0.001 as default)
 * @param {Number}  columns_inn_row_count       Number of columns in one row, can be undefined (1 as default)
 * @param {Boolean} reduction_factor_h_limit    Set alpha_h >= acc. to equation (5.1), can be undefined (true as default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.EN_1992_1 = function (basic_value_relative,
    structure_height,
    columns_inn_row_count,
    reduction_factor_h_limit) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1992_1");
    if (typeof basic_value_relative !== "undefined") {
        this.memberImperfection.basic_value_relative = basic_value_relative;
    }
    if (typeof structure_height !== "undefined") {
        this.memberImperfection.height = structure_height;
    }
    if (typeof columns_inn_row_count !== "undefined") {
        this.memberImperfection.column_in_row = columns_inn_row_count;
    }
    if (typeof reduction_factor_h_limit !== "undefined") {
        this.memberImperfection.reduction_factor_h_limit = reduction_factor_h_limit;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type EN 1993 1.1
 * @param {Number}  basic_value_relative        Basic value, can be undefined (200 as default)
 * @param {Number}  height                      Structure height, can be undefined (0.001 as default)
 * @param {Number}  columns_inn_row_count       Number of columns in one row, can be undefined (1 as default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.EN_1993_1_1 = function (basic_value_relative,
    height,
    columns_inn_row_count) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1993_1_1");
    if (typeof basic_value_relative !== "undefined") {
        this.memberImperfection.basic_value_relative = basic_value_relative;
    }
    if (typeof height !== "undefined") {
        this.memberImperfection.height = height;
    }
    if (typeof columns_inn_row_count !== "undefined") {
        this.memberImperfection.column_in_row = columns_inn_row_count;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type EN 1993 1.1 ()
 * @param {String}  section_design        Section design, can be undefined ("PLASTIC" as default)
 * @returns Modified Member imperfection
 */
 MemberImperfection.prototype.InitialBow_EN_1993_1_1 = function (section_design) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1993_1_1");
    this.memberImperfection.section_design = GetMemberImperfectionSectionDesignType(section_design);
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type EN 1995 1.1
 * @param {Number}  value        Basic value / initial bow, can be undefined (200 as default with Initial sway, 400 with Initial bow)
 * @param {Number}  height       Structure height, can be undefined (0.001 as default). With Initial Bow imperfection is undefined.
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.EN_1995_1_1 = function (value,
    height) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this imperfection");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1995_1_1");
    if (typeof value !== "undefined") {
        this.memberImperfection.basic_value_relative = value;
    }
    if (typeof height !== "undefined") {
        ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY, "Height must be undefined with Initial Bow imperfection");
        this.memberImperfection.height = height;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type ANSI/AISC 360-16 | Current
 * @param {Number} notional_load_coefficient        Notional load coefficient, can be undefined (0.002 by default)
 * @param {Number} standard_factor_enumeration      Factor alpha, can be undefined (LRFD by default). With Initial Bow imperfection is undefined.
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.ANSI_CURRENT = function (notional_load_coefficient,
    standard_factor_enumeration) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_CURRENT");
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    this.memberImperfection.standard_factor_enumeration = GetStandardFactorEnumerationType(standard_factor_enumeration);
    return this.memberImperfection;
};

/**
 * Modifies Initial Bow Member imperfection to definition type ANSI/AISC 360-16 | Current
 * @param {Number} initial_bow  Initial bow
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.InitialBow_ANSI_CURRENT = function (initial_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_CURRENT");
    if (typeof initial_bow !== "undefined") {
        this.memberImperfection.basic_value_relative = initial_bow;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type ANSI/AISC 360-16 | Gravity Load
 * @param {Number} load_case_combination_no         Axial forces Ny from load case or load combination number
 * @param {Number} notional_load_coefficient        Notional load coefficient, can be undefined (0.002 by default)
 * @param {Number} standard_factor_enumeration      Factor alpha, can be undefined (LRFD by default)
 * @returns Modified Member imperfection
 */
 MemberImperfection.prototype.ANSI_GRAVITY_LOAD = function (load_case_combination_no, 
    notional_load_coefficient,
    standard_factor_enumeration) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_GRAVITY_LOAD");
    ASSERT(typeof load_case_combination_no !== "undefined", "LOad case or load combination must be specified");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    this.memberImperfection.standard_factor_enumeration = GetStandardFactorEnumerationType(standard_factor_enumeration);
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type ANSI/AISC 360-16 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} initial_bow                  Initial bow, can be undefined (1000 as default)                
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.InitialBow_ANSI_GRAVITY_LOAD = function (load_case_combination_no, 
    initial_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_GRAVITY_LOAD");
    ASSERT(typeof load_case_combination_no !== "undefined", "LOad case or load combination must be specified");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof initial_bow !== "undefined") {
        this.memberImperfection.basic_value_relative = initial_bow;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type CSA S16:19 | Current
 * @param {Number} value    Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.CSA_CURRENT = function (value) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this imperfection");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "CSA_CURRENT");
    if (typeof value !== "undefined") {
        if (this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY) {
            this.memberImperfection.basic_value_coefficient = value;
        }
        else {
            this.memberImperfection.basic_value_relative = value;
        }
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type CSA S16:19 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} value                        Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.CSA_GRAVITY_LOAD = function (load_case_combination_no,
    value) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this imperfection");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "CSA_GRAVITY_LOAD");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof value !== "undefined") {
        if (this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY) {
            this.memberImperfection.basic_value_coefficient = value;
        }
        else {
            this.memberImperfection.basic_value_relative = value;
        }
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type GB 50017-2017 | Current
 * @param {Number} basic_value_relative     Basic value relative, can be undefined (250 by default)
 * @param {Number} structure_height         Structure height, can be undefined (0.001 by default)
 * @param {Number} number_of_floors         Total number of floors, can be undefined (1 by default)
 * @returns MOdified Member imperfection
 */
MemberImperfection.prototype.GB_50017_2017_CURRENT = function (basic_value_relative,
    structure_height,
    number_of_floors) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY, "This function can be used only with Initial Sway imperfection type");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "GB_50017_2017_CURRENT");
    if (typeof basic_value_relative !== "undefined") {
        this.memberImperfection.basic_value_relative = basic_value_relative;
    }
    if (typeof structure_height !== "undefined") {
        this.memberImperfection.height = structure_height;
    }
    if (typeof number_of_floors !== "undefined") {
        this.memberImperfection.number_of_floors = number_of_floors;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type GB 50017-2017 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} notional_load_coefficient    Notional load coefficient, can be undefined (0.004 by default)
 * @param {Number} number_of_floors             Total number of floors, can be undefined (1 by default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.GB_50017_2017_GRAVITY_LOAD = function (load_case_combination_no,
    notional_load_coefficient,
    number_of_floors) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY, "This function can be used only with Initial Sway imperfection type");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "GB_50017_2017_GRAVITY_LOAD");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    if (typeof number_of_floors !== "undefined") {
        this.memberImperfection.number_of_floors = number_of_floors;
    }
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type EN 1999-1-1
 * @param {String} section_design   Section design, can be undefined ("PLASTIC" as default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.EN_1999_1_1 = function (section_design) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function can be used only with Initial Bow imperfection type");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1999_1_1");
    this.memberImperfection.section_design = GetMemberImperfectionSectionDesignType(section_design);
    return this.memberImperfection;
};

/**
 * Modifies Member imperfection to definition type GB 50017-2017
 * @param {String} buckling_curve   Buckling curve, can be undefined ("d" as default)
 * @returns Modified Member imperfection
 */
MemberImperfection.prototype.GB_50017_2017 = function (buckling_curve) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function can be used only with Initial Bow imperfection type");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "GB_50017_2017");
    if (typeof buckling_curve !== "undefined") {
        //this.memberImperfection.xxx = buckling_curve;  What value name??
    }
    return this.memberImperfection;
}

function createBaseMemberImperfection (no,
    imperfection_case_no,
    members_no,
    imperfection_type,
    coordinate_system,
    imperfection_direction,
    reference_to_members,
    comment,
    params) {
    ASSERT(typeof imperfection_case_no !== "undefined", "Imperfection case number must be specified");
    if (imperfection_cases.exist(imperfection_case_no)) {
        if (typeof no === "undefined") {
            var memberImperfection = imperfection_cases[imperfection_case_no].member_imperfections.create();
        }
        else {
            var memberImperfection = imperfection_cases[imperfection_case_no].member_imperfections.create(no);
        }
        set_comment_and_parameters(memberImperfection, comment, params);

        if (typeof members_no !== "undefined") {
            for (var i = 0; i < members_no.length; ++i) {
                if (!members.exist(members_no[i])) {
                    console.log("Member no. " + members_no[i] + " doesn't exist");
                }
            }
            memberImperfection.members = members_no.join(",");
        }
        else {
            console.log("No members are defined");
        }
        memberImperfection.imperfection_type = GetMemberImperfectionType(imperfection_type);
        if (typeof coordinate_system === "undefined") {
            coordinate_system = "LOCAL";
            memberImperfection.coordinate_system = GetMemberImperfectionCoordinateSystemType(coordinate_system);
        }
        else if (typeof coordinate_system === "string") {
            memberImperfection.coordinate_system = GetMemberImperfectionCoordinateSystemType(coordinate_system);
        }
        else if (coordinate_systems.exist(coordinate_system)) {
            memberImperfection.coordinate_system = coordinate_system;
        }
        else {
            console.log("Coordinate system no. " + coordinate_system + " doesn't exist");
        }
        memberImperfection.imperfection_direction = GetMemberImperfectionDirection(coordinate_system, imperfection_direction);
        if (typeof reference_to_members === "undefined") {
            reference_to_members = false;
        }
        memberImperfection.reference_to_list_of_members = reference_to_members;
        return memberImperfection;
    }
    else {
        console.log("Imperfection case no. " + imperfection_case_no + "doesn't exist");
    }
}

function GetMemberImperfectionDirection(coordinate_system, imperfection_direction) {
    if (coordinate_system === "LOCAL") {
        const imperfection_directions_dict = {
            "LOCAL_Y" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Y,
            "LOCAL_Z" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z,
            "LOCAL_Y_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Y_NEGATIVE,
            "LOCAL_Z_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_LOCAL_Z_NEGATIVE
        }
    }
    else if (coordinate_system === "PRINCIPAL") {
        const imperfection_directions_dict = {
            "U" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_U,
            "V" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_V,
            "U_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_U_NEGATIVE,
            "V_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_PRINCIPAL_V_NEGATIVE
        }
    }
    else {
        const imperfection_directions_dict = {
            "X_U" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
            "Y_V" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
            "Z_W" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE,
            "X_U_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_NEGATIVE,
            "Y_V_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_NEGATIVE,
            "Z_W_NEGATIVE" : member_imperfections.IMPERFECTION_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_NEGATIVE
        }
    }

    if (imperfection_direction !== undefined) {
		var imperfectionDirection = imperfection_directions_dict[imperfection_direction];
		if (imperfectionDirection === undefined) {
			console.log("Wrong type of imperfection direction. Value was: " + imperfection_direction);
			console.log("Correct values are: ( " + Object.keys(imperfection_directions_dict) + ")");
			imperfectionDirection = imperfection_directions_dict[Object.keys(imperfection_directions_dict)[0]]
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
			console.log("Wrong type of coordinate type. Value was: " + coordinate_type);
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
        }
    }
    else if (imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION) {
        const definition_types_dict = {
            "MANUALLY_RELATIVE" : member_imperfections.DEFINITION_TYPE_RELATIVE,
            "MANUALLY_ABSOLUTE" : member_imperfections.DEFINITION_TYPE_ABSOLUTE
        }
    }
    else {
        ASSERT(false, "Unknow imperfection type");
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

function GetActivityCriterionType(activity_criterion_type) {
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

function GetStandardFactorEnumerationType(factor_type) {
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