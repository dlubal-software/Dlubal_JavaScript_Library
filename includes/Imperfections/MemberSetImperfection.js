include("ImperfectionSupport.js");

/*
MemberSetImperfection.prototype.GB_50017_2017 - buckling_shape - what value name from API (values "a", "b", "c" or "d")??
 */
/**
 * Creates Member Set imperfection
 * @class
 * @constructor
 * @param {Number} no                       Number of Member set imperfection, can be undefined
 * @param {Number} imperfection_case_no     Imperfection case number
 * @param {Array}  member_sets_no           Array of member sets numbers
 * @param {String} comment                  Comment, can be undefined
 * @param {Object} params                   Parameters, can be undefined
 * @returns Member set imperfection
 */
function MemberSetImperfection (no,
    imperfection_case_no,
    member_sets_no,
    comment,
    params) {
    if (arguments.length > 0) {
        return this.memberSetImperfection = createBaseMemberSetImperfection(no, imperfection_case_no, member_sets_no, "INITIAL_SWAY", undefined, undefined, undefined, comment, params);
    }
}

/**
 * Creates Initial Sway Member set imperfection
 * @param {Number}          no                      Number of Member set imperfection, can be undefined
 * @param {Number}          imperfection_case_no    Imperfection case number
 * @param {Array}           member_sets_no          Array of member sets numbers
 * @param {String/Number}   coordinate_system       Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined
 * @param {String}          imperfection_direction  Imperfection direction, can be undefined.
 *                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"
 *                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"
 *                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE"
 * @param {String}          comment                 Comment, can be undefined
 * @param {Object}          params                  Parameters, can be undefined
 */
MemberSetImperfection.prototype.InitialSway = function (no,
    imperfection_case_no,
    member_sets_no,
    coordinate_system,
    imperfection_direction,
    comment,
    params) {
    this.memberSetImperfection = createBaseMemberSetImperfection(no, imperfection_case_no, member_sets_no, "INITIAL_SWAY", coordinate_system, imperfection_direction, comment, params);
};

/**
 * Creates Initial Bow Member set imperfection
 * @param {Number}          no                      Number of Member set imperfection, can be undefined
 * @param {Number}          imperfection_case_no    Imperfection case number
 * @param {Array}           member_sets_no          Array of member sets numbers
 * @param {String/Number}   coordinate_system       Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined
 * @param {String}          imperfection_direction  Imperfection direction, can be undefined.
 *                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"
 *                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"
 *                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE"
 * @param {String}          comment                 Comment, can be undefined
 * @param {Object}          params                  Parameters, can be undefined
 */
MemberSetImperfection.prototype.InitialBow = function (no,
    imperfection_case_no,
    member_sets_no,
    coordinate_system,
    imperfection_direction,
    comment,
    params) {
    this.memberSetImperfection = createBaseMemberSetImperfection(no, imperfection_case_no, member_sets_no, "INITIAL_BOW", coordinate_system, imperfection_direction, comment, params);
};

/**
 * Creates Initial Bow and Criterion Member set imperfection
 * @param {Number}          no                      Number of Member set imperfection, can be undefined
 * @param {Number}          imperfection_case_no    Imperfection case number
 * @param {Array}           member_sets_no          Array of member sets numbers
 * @param {String/Number}   coordinate_system       Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined
 * @param {String}          imperfection_direction  Imperfection direction, can be undefined.
 *                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"
 *                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"
 *                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE"
 * @param {String}          comment                 Comment, can be undefined
 * @param {Object}          params                  Parameters, can be undefined
 */
MemberSetImperfection.prototype.InitialBowAndCriterion = function (no,
    imperfection_case_no,
    member_sets_no,
    coordinate_system,
    imperfection_direction,
    comment,
    params) {
    this.memberSetImperfection = createBaseMemberSetImperfection(no, imperfection_case_no, member_sets_no, "INITIAL_BOW_AND_CRITERION", coordinate_system, imperfection_direction, comment, params);
};

/**
 * Modifies Member set imperfection to definition type Relative
 * @param {Number} initial_sway         Relative initial sway / Initial bow / Initial bow and criterion, can be undefined (200 as default)
 * @param {String} active_criterion     Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined.
 * @param {Number} active_bow           Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value
 */
MemberSetImperfection.prototype.Relative = function (initial_sway,
    active_criterion,
    active_bow) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY ? "RELATIVE" : "MANUALLY_RELATIVE");
    this.memberSetImperfection.basic_value_relative = initial_sway;
    if (typeof active_criterion !== "undefined") {
        ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION, "Initial bow and criterion imperfection type must be defined");
        this.memberSetImperfection.active_criterion = GetMemberSetImperfectionActivityCriterionType(active_criterion);
        if (this.memberSetImperfection.active_criterion === member_imperfections.ACTIVITY_CRITERION_DEFINE) {
            ASSERT(typeof active_bow !== "undefined" && active_bow > 0, "Active bow must be defined");
            this.memberSetImperfection.active_bow = active_bow;
        }
    }
};

/**
 * Modifies Member set imperfection to definition type Absolute
 * @param {Number} initial_sway         Absolute initial sway / bow
 * @param {String} active_criterion     Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined.
 * @param {Number} active_bow           Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value
 */
MemberSetImperfection.prototype.Absolute = function (initial_sway,
    active_criterion,
    active_bow) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY ? "ABSOLUTE" : "MANUALLY_ABSOLUTE");
    ASSERT(typeof initial_sway !== "undefined", "Initial sway must be defined");
    this.memberSetImperfection.basic_value_absolute = initial_sway;
    if (typeof active_criterion !== "undefined") {
        ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW_AND_CRITERION, "Initial bow and criterion imperfection type must be defined");
        this.memberSetImperfection.active_criterion = GetMemberSetImperfectionActivityCriterionType(active_criterion);
        if (this.memberSetImperfection.active_criterion === member_imperfections.ACTIVITY_CRITERION_DEFINE) {
            ASSERT(typeof active_bow !== "undefined" && active_bow > 0, "Active bow must be defined");
            this.memberSetImperfection.active_bow = active_bow;
        }
    }
};

/**
 * Modifies Member set imperfection to definition type EN 1992 1
 * @param {Number}  basic_value_relative        Basic value, can be undefined (200 as default)
 * @param {Number}  height                      Structure height, can be undefined (0.001 as default)
 * @param {Number}  columns_inn_row_count       Number of columns in one row, can be undefined (1 as default)
 * @param {Boolean} reduction_factor_h_limit    Set alpha_h >= acc. to equation (5.1), can be undefined (true as default)
 */
MemberSetImperfection.prototype.EN_1992_1 = function (basic_value_relative,
    structure_height,
    columns_inn_row_count,
    reduction_factor_h_limit) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "EN_1992_1");
    if (typeof basic_value_relative !== "undefined") {
        this.memberSetImperfection.basic_value_relative = basic_value_relative;
    }
    if (typeof structure_height !== "undefined") {
        this.memberSetImperfection.height = structure_height;
    }
    if (typeof columns_inn_row_count !== "undefined") {
        this.memberSetImperfection.column_in_row = columns_inn_row_count;
    }
    if (typeof reduction_factor_h_limit !== "undefined") {
        this.memberSetImperfection.reduction_factor_h_limit = reduction_factor_h_limit;
    }
};

/**
 * Modifies Member set imperfection to definition type EN 1993 1.1
 * @param {Number}  basic_value_relative        Basic value, can be undefined (200 as default)
 * @param {Number}  height                      Structure height, can be undefined (0.001 as default)
 * @param {Number}  columns_inn_row_count       Number of columns in one row, can be undefined (1 as default)
 */
MemberSetImperfection.prototype.EN_1993_1_1 = function (basic_value_relative,
    height,
    columns_inn_row_count) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "EN_1993_1_1");
    if (typeof basic_value_relative !== "undefined") {
        this.memberSetImperfection.basic_value_relative = basic_value_relative;
    }
    if (typeof height !== "undefined") {
        this.memberSetImperfection.height = height;
    }
    if (typeof columns_inn_row_count !== "undefined") {
        this.memberSetImperfection.column_in_row = columns_inn_row_count;
    }
};

/**
 * Modifies Member set imperfection to definition type EN 1993 1.1 ()
 * @param {String}  section_design        Section design, can be undefined ("PLASTIC" as default)
 */
 MemberSetImperfection.prototype.InitialBow_EN_1993_1_1 = function (section_design) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "EN_1993_1_1");
    this.memberSetImperfection.section_design = GetMemberSetImperfectionSectionDesignType(section_design);
};

/**
 * Modifies Member set imperfection to definition type EN 1995 1.1
 * @param {Number}  value        Basic value / initial bow, can be undefined (200 as default with Initial sway, 400 with Initial bow)
 * @param {Number}  height       Structure height, can be undefined (0.001 as default). With Initial Bow imperfection is undefined.
 */
MemberSetImperfection.prototype.EN_1995_1_1 = function (value,
    height) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this imperfection");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "EN_1995_1_1");
    if (typeof value !== "undefined") {
        this.memberSetImperfection.basic_value_relative = value;
    }
    if (typeof height !== "undefined") {
        ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY, "Height must be undefined with Initial Bow imperfection");
        this.memberSetImperfection.height = height;
    }
};

/**
 * Modifies Member set imperfection to definition type ANSI/AISC 360-16 | Current
 * @param {Number} notional_load_coefficient        Notional load coefficient, can be undefined (0.002 by default)
 * @param {Number} standard_factor_enumeration      Factor alpha, can be undefined (LRFD by default). With Initial Bow imperfection is undefined.
 */
MemberSetImperfection.prototype.ANSI_CURRENT = function (notional_load_coefficient,
    standard_factor_enumeration) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "ANSI_CURRENT");
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberSetImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    this.memberSetImperfection.standard_factor_enumeration = GetMemberSetImperfectionStandardFactorEnumerationType(standard_factor_enumeration);
};

/**
 * Modifies Initial Bow Member set imperfection to definition type ANSI/AISC 360-16 | Current
 * @param {Number} initial_bow  Initial bow
 */
MemberSetImperfection.prototype.InitialBow_ANSI_CURRENT = function (initial_bow) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "ANSI_CURRENT");
    if (typeof initial_bow !== "undefined") {
        this.memberSetImperfection.basic_value_relative = initial_bow;
    }
};

/**
 * Modifies Member set imperfection to definition type ANSI/AISC 360-16 | Gravity Load
 * @param {Number} load_case_combination_no         Axial forces Ny from load case or load combination number
 * @param {Number} notional_load_coefficient        Notional load coefficient, can be undefined (0.002 by default)
 * @param {Number} standard_factor_enumeration      Factor alpha, can be undefined (LRFD by default)
 */
 MemberSetImperfection.prototype.ANSI_GRAVITY_LOAD = function (load_case_combination_no, 
    notional_load_coefficient,
    standard_factor_enumeration) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "ANSI_GRAVITY_LOAD");
    ASSERT(typeof load_case_combination_no !== "undefined", "Load case or load combination must be specified");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberSetImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberSetImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    this.memberSetImperfection.standard_factor_enumeration = GetMemberSetImperfectionStandardFactorEnumerationType(standard_factor_enumeration);
};

/**
 * Modifies Member set imperfection to definition type ANSI/AISC 360-16 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} initial_bow                  Initial bow, can be undefined (1000 as default)                
 */
MemberSetImperfection.prototype.InitialBow_ANSI_GRAVITY_LOAD = function (load_case_combination_no, 
    initial_bow) {
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "ANSI_GRAVITY_LOAD");
    ASSERT(typeof load_case_combination_no !== "undefined", "Load case or load combination must be specified");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberSetImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof initial_bow !== "undefined") {
        this.memberSetImperfection.basic_value_relative = initial_bow;
    }
};

/**
 * Modifies Member set imperfection to definition type CSA S16:19 | Current
 * @param {Number} value    Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default)
 */
MemberSetImperfection.prototype.CSA_CURRENT = function (value) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this type of imperfection");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "CSA_CURRENT");
    if (typeof value !== "undefined") {
        if (this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY) {
            this.memberSetImperfection.basic_value_coefficient = value;
        }
        else {
            this.memberSetImperfection.basic_value_relative = value;
        }
    }
};

/**
 * Modifies Member set imperfection to definition type CSA S16:19 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} value                        Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default)
 */
MemberSetImperfection.prototype.CSA_GRAVITY_LOAD = function (load_case_combination_no,
    value) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY || this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function cannot be use on this type of imperfection");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "CSA_GRAVITY_LOAD");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberSetImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof value !== "undefined") {
        if (this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY) {
            this.memberSetImperfection.basic_value_coefficient = value;
        }
        else {
            this.memberSetImperfection.basic_value_relative = value;
        }
    }
};

/**
 * Modifies Member set imperfection to definition type GB 50017-2017 | Current
 * @param {Number} basic_value_relative     Basic value relative, can be undefined (250 by default)
 * @param {Number} structure_height         Structure height, can be undefined (0.001 by default)
 * @param {Number} number_of_floors         Total number of floors, can be undefined (1 by default)
 */
MemberSetImperfection.prototype.GB_50017_2017_CURRENT = function (basic_value_relative,
    structure_height,
    number_of_floors) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY, "This function can be used only with Initial Sway imperfection type");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "GB_50017_2017_CURRENT");
    if (typeof basic_value_relative !== "undefined") {
        this.memberSetImperfection.basic_value_relative = basic_value_relative;
    }
    if (typeof structure_height !== "undefined") {
        this.memberSetImperfection.height = structure_height;
    }
    if (typeof number_of_floors !== "undefined") {
        this.memberSetImperfection.number_of_floors = number_of_floors;
    }
};

/**
 * Modifies Member set imperfection to definition type GB 50017-2017 | Gravity Load
 * @param {Number} load_case_combination_no     Axial forces Ny from load case or load combination number
 * @param {Number} notional_load_coefficient    Notional load coefficient, can be undefined (0.004 by default)
 * @param {Number} number_of_floors             Total number of floors, can be undefined (1 by default)
 */
MemberSetImperfection.prototype.GB_50017_2017_GRAVITY_LOAD = function (load_case_combination_no,
    notional_load_coefficient,
    number_of_floors) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_SWAY, "This function can be used only with Initial Sway imperfection type");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "GB_50017_2017_GRAVITY_LOAD");
    if (load_cases.exist(load_case_combination_no) || load_combinations.exist(load_case_combination_no)) {
        this.memberSetImperfection.case_object = load_case_combination_no;
    }
    else {
        console.log("Load case or load combination no. " + load_case_combination_no + " doesn't exist");
    }
    if (typeof notional_load_coefficient !== "undefined") {
        this.memberSetImperfection.basic_value_coefficient = notional_load_coefficient;
    }
    if (typeof number_of_floors !== "undefined") {
        this.memberSetImperfection.number_of_floors = number_of_floors;
    }
};

/**
 * Modifies Member set imperfection to definition type EN 1999-1-1
 * @param {String} section_design   Section design, can be undefined ("PLASTIC" as default)
 */
MemberSetImperfection.prototype.EN_1999_1_1 = function (section_design) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function can be used only with Initial Bow imperfection type");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "EN_1999_1_1");
    this.memberSetImperfection.section_design = GetMemberSetImperfectionSectionDesignType(section_design);
};

/**
 * Modifies Member set imperfection to definition type GB 50017-2017
 * @param {String} buckling_curve   Buckling curve, can be undefined ("d" as default)
 */
MemberSetImperfection.prototype.GB_50017_2017 = function (buckling_curve) {
    ASSERT(this.memberSetImperfection.imperfection_type === member_imperfections.IMPERFECTION_TYPE_INITIAL_BOW, "This function can be used only with Initial Bow imperfection type");
    this.memberSetImperfection.definition_type = GetMemberSetImperfectionDefinitionType(this.memberSetImperfection.imperfection_type, "GB_50017_2017");
    if (typeof buckling_curve !== "undefined") {
        //this.memberSetImperfection.xxx = buckling_curve;  What value name??
    }
}

/**
 * @returns Member set imperfection object
 */
 MemberSetImperfection.prototype.GetMemberSetImperfection = function () {
    return this.memberSetImperfection;
};

/**
 * @returns Member set imperfection number
 */
MemberSetImperfection.prototype.GetNo = function () {
    return this.memberSetImperfection.no;
};

function createBaseMemberSetImperfection (no,
    imperfection_case_no,
    member_sets_no,
    imperfection_type,
    coordinate_system,
    imperfection_direction,
    comment,
    params) {
    ASSERT(typeof imperfection_case_no !== "undefined", "Imperfection case number must be specified");
    if (imperfection_cases.exist(imperfection_case_no)) {
        if (typeof no === "undefined") {
            var memberSetImperfection = imperfection_cases[imperfection_case_no].member_set_imperfections.create();
        }
        else {
            var memberSetImperfection = imperfection_cases[imperfection_case_no].member_set_imperfections.create(no);
        }
        set_comment_and_parameters(memberSetImperfection, comment, params);

        if (typeof member_sets_no !== "undefined") {
            for (var i = 0; i < member_sets_no.length; ++i) {
                if (!member_sets.exist(member_sets_no[i])) {
                    console.log("Member set no. " + member_sets_no[i] + " doesn't exist");
                }
                else if (member_sets[member_sets_no[i]].set_type !== member_sets.SET_TYPE_CONTINUOUS) {
                    console.log("Member set " + member_sets_no[i] + " must be of continuos type");
                }
            }
            memberSetImperfection.member_sets = member_sets_no.join(",");
        }
        else {
            console.log("No member sets are defined");
        }
        memberSetImperfection.imperfection_type = GetMemberSetImperfectionType(imperfection_type);
        if (typeof coordinate_system === "undefined") {
            coordinate_system = "LOCAL";
            memberSetImperfection.coordinate_system = GetMemberSetImperfectionCoordinateSystemType(coordinate_system);
        }
        else if (typeof coordinate_system === "string") {
            memberSetImperfection.coordinate_system = GetMemberSetImperfectionCoordinateSystemType(coordinate_system);
        }
        else if (coordinate_systems.exist(coordinate_system)) {
            memberSetImperfection.coordinate_system = coordinate_system;
        }
        else {
            console.log("Coordinate system no. " + coordinate_system + " doesn't exist");
        }
        memberSetImperfection.imperfection_direction = GetMemberSetImperfectionDirection(coordinate_system, imperfection_direction);
        return memberSetImperfection;
    }
    else {
        console.log("Imperfection case no. " + imperfection_case_no + "doesn't exist");
    }
}

