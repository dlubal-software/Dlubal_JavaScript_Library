include("ImperfectionSupport.js");

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
 */
MemberImperfection.prototype.Relative = function (initial_sway,
    active_criterion,
    active_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY ? "RELATIVE" : "MANUALLY_RELATIVE");
    this.memberImperfection.basic_value_relative = initial_sway;
    if (typeof active_criterion !== "undefined") {
        ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION, "Initial bow and criterion imperfection type must be defined");
        this.memberImperfection.active_criterion = GetMemberImperfectionActivityCriterionType(active_criterion);
        if (this.memberImperfection.active_criterion === member_imperfections.ACTIVITY_CRITERION_DEFINE) {
            ASSERT(typeof active_bow !== "undefined" && active_bow > 0, "Active bow must be defined");
            this.memberImperfection.active_bow = active_bow;
        }
    }
};

/**
 * Modifies Member imperfection to definition type Absolute
 * @param {Number} initial_sway         Absolute initial sway / bow
 * @param {String} active_criterion     Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined.
 * @param {Number} active_bow           Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value
 */
MemberImperfection.prototype.Absolute = function (initial_sway,
    active_criterion,
    active_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY ? "ABSOLUTE" : "MANUALLY_ABSOLUTE");
    ASSERT(typeof initial_sway !== "undefined", "Initial sway must be defined");
    this.memberImperfection.basic_value_absolute = initial_sway;
    if (typeof active_criterion !== "undefined") {
        ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION, "Initial bow and criterion imperfection type must be defined");
        this.memberImperfection.active_criterion = GetMemberImperfectionActivityCriterionType(active_criterion);
        if (this.memberImperfection.active_criterion === member_imperfections.ACTIVITY_CRITERION_DEFINE) {
            ASSERT(typeof active_bow !== "undefined" && active_bow > 0, "Active bow must be defined");
            this.memberImperfection.active_bow = active_bow;
        }
    }
};

/**
 * Modifies Member imperfection to definition type EN 1992 1
 * @param {Number}  basic_value_relative        Basic value, can be undefined (200 as default)
 * @param {Number}  height                      Structure height, can be undefined (0.001 as default)
 * @param {Number}  columns_inn_row_count       Number of columns in one row, can be undefined (1 as default)
 * @param {Boolean} reduction_factor_h_limit    Set alpha_h >= acc. to equation (5.1), can be undefined (true as default)
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
};

/**
 * Modifies Member imperfection to definition type EN 1993 1.1
 * @param {Number}  basic_value_relative        Basic value, can be undefined (200 as default)
 * @param {Number}  height                      Structure height, can be undefined (0.001 as default)
 * @param {Number}  columns_inn_row_count       Number of columns in one row, can be undefined (1 as default)
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
};

/**
 * Modifies Member imperfection to definition type EN 1993 1.1 ()
 * @param {String}  section_design        Section design, can be undefined ("PLASTIC" as default)
 */
 MemberImperfection.prototype.InitialBow_EN_1993_1_1 = function (section_design) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1993_1_1");
    this.memberImperfection.section_design = GetMemberImperfectionSectionDesignType(section_design);
};

/**
 * Modifies Member imperfection to definition type EN 1995 1.1
 * @param {Number}  value        Basic value / initial bow, can be undefined (200 as default with Initial sway, 400 with Initial bow)
 * @param {Number}  height       Structure height, can be undefined (0.001 as default). With Initial Bow imperfection is undefined.
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
};

/**
 * Modifies Member imperfection to definition type ANSI/AISC 360-16 | Current
 * @param {Number} notional_load_coefficient        Notional load coefficient, can be undefined (0.002 by default)
 * @param {Number} standard_factor_enumeration      Factor alpha, can be undefined (LRFD by default). With Initial Bow imperfection is undefined.
 */
MemberImperfection.prototype.ANSI_CURRENT = function (notional_load_coefficient,
    standard_factor_enumeration) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_CURRENT");
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    this.memberImperfection.standard_factor_enumeration = GetMemberImperfectionStandardFactorEnumerationType(standard_factor_enumeration);
};

/**
 * Modifies Initial Bow Member imperfection to definition type ANSI/AISC 360-16 | Current
 * @param {Number} initial_bow  Initial bow
 */
MemberImperfection.prototype.InitialBow_ANSI_CURRENT = function (initial_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_CURRENT");
    if (typeof initial_bow !== "undefined") {
        this.memberImperfection.basic_value_relative = initial_bow;
    }
};

/**
 * Modifies Member imperfection to definition type ANSI/AISC 360-16 | Gravity Load
 * @param {Number} load_case_combination_no         Axial forces Ny from load case or load combination number
 * @param {Number} notional_load_coefficient        Notional load coefficient, can be undefined (0.002 by default)
 * @param {Number} standard_factor_enumeration      Factor alpha, can be undefined (LRFD by default)
 */
 MemberImperfection.prototype.ANSI_GRAVITY_LOAD = function (load_case_combination_no, 
    notional_load_coefficient,
    standard_factor_enumeration) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_GRAVITY_LOAD");
    ASSERT(typeof load_case_combination_no !== "undefined", "Load case or load combination must be specified");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    this.memberImperfection.standard_factor_enumeration = GetMemberImperfectionStandardFactorEnumerationType(standard_factor_enumeration);
};

/**
 * Modifies Member imperfection to definition type ANSI/AISC 360-16 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} initial_bow                  Initial bow, can be undefined (1000 as default)                
 */
MemberImperfection.prototype.InitialBow_ANSI_GRAVITY_LOAD = function (load_case_combination_no, 
    initial_bow) {
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "ANSI_GRAVITY_LOAD");
    ASSERT(typeof load_case_combination_no !== "undefined", "Load case or load combination must be specified");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof initial_bow !== "undefined") {
        this.memberImperfection.basic_value_relative = initial_bow;
    }
};

/**
 * Modifies Member imperfection to definition type CSA S16:19 | Current
 * @param {Number} value    Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default)
 */
MemberImperfection.prototype.CSA_CURRENT = function (value) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this type of imperfection");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "CSA_CURRENT");
    if (typeof value !== "undefined") {
        if (this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY) {
            this.memberImperfection.basic_value_coefficient = value;
        }
        else {
            this.memberImperfection.basic_value_relative = value;
        }
    }
};

/**
 * Modifies Member imperfection to definition type CSA S16:19 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} value                        Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default)
 */
MemberImperfection.prototype.CSA_GRAVITY_LOAD = function (load_case_combination_no,
    value) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this type of imperfection");
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
};

/**
 * Modifies Member imperfection to definition type GB 50017-2017 | Current
 * @param {Number} basic_value_relative     Basic value relative, can be undefined (250 by default)
 * @param {Number} structure_height         Structure height, can be undefined (0.001 by default)
 * @param {Number} number_of_floors         Total number of floors, can be undefined (1 by default)
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
};

/**
 * Modifies Member imperfection to definition type GB 50017-2017 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} notional_load_coefficient    Notional load coefficient, can be undefined (0.004 by default)
 * @param {Number} number_of_floors             Total number of floors, can be undefined (1 by default)
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
};

/**
 * Modifies Member imperfection to definition type EN 1999-1-1
 * @param {String} section_design   Section design, can be undefined ("PLASTIC" as default)
 */
MemberImperfection.prototype.EN_1999_1_1 = function (section_design) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function can be used only with Initial Bow imperfection type");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "EN_1999_1_1");
    this.memberImperfection.section_design = GetMemberImperfectionSectionDesignType(section_design);
};

/**
 * Modifies Member imperfection to definition type GB 50017-2017
 * @param {String} buckling_curve   Buckling curve, can be undefined ("d" as default)
 */
MemberImperfection.prototype.GB_50017_2017 = function (buckling_curve) {
    ASSERT(this.memberImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function can be used only with Initial Bow imperfection type");
    this.memberImperfection.definition_type = GetMemberImperfectionDefinitionType(this.memberImperfection.imperfection_type, "GB_50017_2017");
    if (typeof buckling_curve !== "undefined") {
        //this.memberImperfection.xxx = buckling_curve;  What value name??
    }
};

/**
 * @returns Member imperfection object
 */
MemberImperfection.prototype.GetMemberImperfection = function () {
    return this.memberImperfection;
};

/**
 * @returns Member imperfection number
 */
MemberImperfection.prototype.GetNo = function () {
    return this.memberImperfection.no;
};

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
        console.log("Imperfection case no. " + imperfection_case_no + " doesn't exist");
    }
}