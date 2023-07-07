/*
Bug 92009: Un-complete enum for structure_type_about_axis_y and structure_type_about_axis_z
*/

include("../ConcreteDesign/ConcreteDesignSupport.js");

/**
 * Creates Concrete design effective length
 * @param {Number} no               Concrete design effective length index, can be undefined
 * @param {Array} members_no        List of members indexes, can be undefined
 * @param {Array} member_sets_no    List of member sets indexes, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function ConcreteDesignEffectiveLength (no,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(!RSECTION, "This script is only for RFEM or RSTAB");
    ASSERT(CONCRETE_DESIGN.isActive(), "Concrete design add-on must be active");
    if (typeof no === "undefined") {
        this.effective_length = concrete_effective_lengths.create();
    }
    else {
        this.effective_length = concrete_effective_lengths.create(no);
    }
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "Member list must be array of member indexes");
        member_list = members_no;
        members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                members_no.push(member_list[i]);
            }
            else {
                console.log("Member no. " + member_list[i] + " doesn't exist");
            }
        }
        this.effective_length.members = members_no;
    }
    if (typeof member_sets_no !== "undefined") {
        ASSERT(Array.isArray(member_sets_no), "Member set list must be array of member sets indexes");
        member_sets_list = member_sets_no;
        member_sets_no = [];
        for (var i = 0; i < member_sets_list.length; ++i) {
            if (member_sets.exist(member_sets_list[i])) {
                member_sets_no.push(member_sets_list[i]);
            }
            else {
                console.log("Member set no. " + member_sets_list[i] + " doesn't exist");
            }
        }
        this.effective_length.member_sets = member_sets_no;
    }
    set_comment_and_parameters(this.effective_length, comment, params);
}

/**
 * @returns Effective length number
 */
ConcreteDesignEffectiveLength.prototype.GetNo = function () {
    return this.effective_length.no;
};

/**
 * @returns Effective length object
 */
ConcreteDesignEffectiveLength.prototype.GetEffectiveLength = function () {
    return this.effective_length;
};

/**
 * Sets Name
 * @param {String} name     Name, can be undefined (when undefined, generated name is used)
 */
ConcreteDesignEffectiveLength.prototype.SetName = function (name) {
    if (typeof name !== "undefined") {
        this.effective_length.user_defined_name_enabled = true;
        this.effective_length.name = name;
    }
    else {
        this.effective_length.user_defined_name_enabled = false;
    }
};

/**
 * Sets Determination type
 * @param {Boolean} flexural_buckling_about_y   Consider effective length for flexural buckling about y (major axis), can be undefined (is not set, true as default)
 * @param {Boolean} flexural_buckling_about_z   Consider effective length for flexural buckling about z (minor axis), can be undefined (is not set, true as default)
 */
ConcreteDesignEffectiveLength.prototype.SetDeterminationType = function (flexural_buckling_about_y,
    flexural_buckling_about_z) {
    if (typeof flexural_buckling_about_y !== "undefined") {
        this.effective_length.flexural_buckling_about_y = flexural_buckling_about_y;
    }
    if (typeof flexural_buckling_about_z !== "undefined") {
        this.effective_length.flexural_buckling_about_z = flexural_buckling_about_z;
    }
};

/**
 * Sets Structure type
 * @param {String} structure_type_about_axis_y  About y-axis (UNBRACED, BRACED), can be undefined (is not set, UNBRACED as default)
 * @param {String} structure_type_about_axis_z  About z-axis (UNBRACED, BRACED), can be undefined (is not set, UNBRACED as default)
 */
ConcreteDesignEffectiveLength.prototype.SetStructureType = function (structure_type_about_axis_y,
    structure_type_about_axis_z) {
    if (typeof structure_type_about_axis_y !== "undefined") {
        ASSERT(this.effective_length.flexural_buckling_about_y, "Flexural buckling about y must be on");
        this.effective_length.structure_type_about_axis_y = GetConcreteDesignStructureType(structure_type_about_axis_y);
    }
    if (typeof structure_type_about_axis_z !== "undefined") {
        ASSERT(this.effective_length.flexural_buckling_about_z, "Flexural buckling about z must be on");
        this.effective_length.structure_type_about_axis_z = GetConcreteDesignStructureType(structure_type_about_axis_z);
    }
};

/**
 * Sets Nodal supports type for start sequence node
 * @param {String} support_type     Support type (NONE, FIXED_IN_Z, FIXED_IN_Y, FIXED_ALL), can be undefined (if not set, FIXED_IN_Z as default)
 */
ConcreteDesignEffectiveLength.prototype.SetNodalSupportsStartWithSupportType = function (support_type) {
    setConcreteDesignEffectiveLengthsNodalSupports(this.effective_length, 1, support_type);
};

/**
 * Sets Nodal supports type for end sequence node
 * @param {String} support_type     Support type (NONE, FIXED_IN_Z, FIXED_IN_Y, FIXED_ALL), can be undefined (if not set, FIXED_IN_Z as default)
 */
ConcreteDesignEffectiveLength.prototype.SetNodalSupportsEndWithSupportType = function (support_type) {
    setConcreteDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count(), support_type);
};

/**
 * Sets Different properties state for nodal supports
 * @param {Boolean} different_properties   Different properties, can be undefined (true as default)
 */
ConcreteDesignEffectiveLength.prototype.DifferentPropertiesForNodalSupports = function (different_properties) {
    if (typeof different_properties === "undefined") {
        different_properties = true;
    }
    this.effective_length.different_properties = different_properties;
};

/**
 * Inserts Intermediate node with support type
 * @param {String} support_type     Support type (NONE, FIXED_IN_Z, FIXED_IN_Y, FIXED_ALL), can be undefined (if not set, FIXED_IN_Z as default)
 */
ConcreteDesignEffectiveLength.prototype.InsertNodalSupportIntermediateNodeWithSupportType = function (support_type) {
    this.effective_length.intermediate_nodes = true;
    setConcreteDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count() + 1, support_type);
};

/**
 * Sets Effective length factors for segment sequence
 * @param {Number} row                                  Segment sequence row
 * @param {Number} flexural_buckling_y                  Flexural buckling y, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_z                  Flexural axes z, can be undefined (1.00 as default if it's enabled)
 */
ConcreteDesignEffectiveLength.prototype.SetEffectiveLengthFactors = function (row,
    flexural_buckling_y,
    flexural_buckling_z) {
    this.effective_length.factors_definition_absolute = false;
    setConcreteDesignEffectiveLengthsBuckling(this.effective_length, false, this.effective_length.factors, row, flexural_buckling_y, flexural_buckling_z);
};

/**
 * Sets Overwrite effective length for segment sequence
 * @param {Number} row                                  Segment sequence row
 * @param {Number} flexural_buckling_y                  Flexural buckling y, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_z                  Flexural axes z, can be undefined (1.00 as default if it's enabled)
 */
ConcreteDesignEffectiveLength.prototype.SetOverwriteEffectiveLengths = function (row,
    flexural_buckling_y,
    flexural_buckling_z) {
    this.effective_length.factors_definition_absolute = true;
    setConcreteDesignEffectiveLengthsBuckling(this.effective_length, true, this.effective_length.lengths, row, flexural_buckling_y, flexural_buckling_z);
};

function GetConcreteDesignStructureType(structure_type) {
    if (!IsCurrentCodeOfStandard("SP")) {
        return EnumValueFromJSHLFTypeName(
            structure_type,
            "structure",
            {
                "UNBRACED": concrete_effective_lengths.STRUCTURE_TYPE_UNBRACED,
                "BRACED": concrete_effective_lengths.STRUCTURE_TYPE_BRACED
            },
            concrete_effective_lengths.STRUCTURE_TYPE_UNBRACED);
    }
    else {
        // Bug 92009: un-complete enum (Combined type is missing)
        return EnumValueFromJSHLFTypeName(
            structure_type,
            "structure",
            {
                "UNBRACED": concrete_effective_lengths.STRUCTURE_TYPE_UNBRACED,
                "BRACED": concrete_effective_lengths.STRUCTURE_TYPE_BRACED
            },
            concrete_effective_lengths.STRUCTURE_TYPE_UNBRACED);
    }
}

function setConcreteDesignEffectiveLengthsNodalSupports (effective_length,
    row,
    support_type,
    support_in_y,
    support_in_z) {
    ASSERT(effective_length.flexural_buckling_about_y || effective_length.flexural_buckling_about_z, "No buckling is specified");
    // Check if all options in column have same value (different_properties_supports is false)
    function checkUniqueValues (value_to_set, value_name) {
        if (!effective_length.different_properties) {
            var values = [];
            for (var i = 1; i <= effective_length.nodal_supports.row_count(); ++i) {
                switch (value_name)
                {
                    case "support_in_y":
                        values.push(effective_length.nodal_supports[i].support_in_y);
                        break;
                    case "support_in_z":
                        values.push(effective_length.nodal_supports[i].support_in_z);
                        break;
                    default:
                        ASSERT(false, "EffectiveLength: checkUniqueValues");
                }
            }
            function uniqueValues() {
                for (var i = 0; i < values.length; ++i) {
                    if (values[i] !== value_to_set) {
                        return false;
                    }
                }
                return true;
            }
            if (!uniqueValues()) {
                // All options in current column must be set to the same value as value_to_set
                for (var row = 1; row <= effective_length.nodal_supports.row_count(); ++row) {
                    if (value_name === "support_in_y") {
                        effective_length.nodal_supports[row].support_in_y = value_to_set;
                    }
                    else{
                        ASSERT(value_name === "support_in_z", "setBoundaryConditionNodalSupports");
                        effective_length.nodal_supports[row].support_in_z = value_to_set;
                    }
                }
                console.log(value_name + ": all values are set to " + value_to_set + " (different properties off)");
            }
        }
    }
    function isDirectionEnabled (effective_length,
        direction) {
        switch (direction) {
            case "DIRECTION_IN_Z":
                return effective_length.flexural_buckling_about_y;
            case "DIRECTION_IN_Y":
                return effective_length.flexural_buckling_about_z;
            default:
                ASSERT(false);
                return false;
            }
    }
    function isSupportTypeEnabled (support_type) {
        const supportTypeValues = {
            "NONE": [false, false],
            "FIXED_IN_Z": [true, false],
            "FIXED_IN_Y": [false, true],
            "FIXED_ALL": [true, true]
        };
        const directions = [
            "DIRECTION_IN_Z",
            "DIRECTION_IN_Y"
        ];
        if (support_type === "FIXED_ALL" || support_type === "NONE") {
            return true;
        }
        var checks = supportTypeValues[support_type];
        if (checks !== undefined) {
            for (var i = 0; i < checks.length; ++i) {
                if (checks[i] && !isDirectionEnabled(effective_length, directions[i])) {
                    return false;
                }
            }
            return true;
        }
        else {
            console.log("Wrong support type. Value was: " + support_type);
			console.log("Correct values are: ( " + Object.keys(supportTypeValues) + ")");
        }
    }
    var support_false = GetConcreteDesignSupportStatusType("SUPPORT_STATUS_NO");
    var support_true = GetConcreteDesignSupportStatusType("SUPPORT_STATUS_YES");
    function setValues(support_in_y, support_in_z) {
        if (row > effective_length.nodal_supports.row_count()) {
            row = row - 1;
            effective_length.nodal_supports.insert_row(row);
        }
        if (isDirectionEnabled(effective_length, "DIRECTION_IN_Y")) {
            checkUniqueValues(support_in_y, "support_in_y");
            effective_length.nodal_supports[row].support_in_y = support_in_y;
        }
        if (isDirectionEnabled(effective_length, "DIRECTION_IN_Z")) {
            checkUniqueValues(support_in_z, "support_in_z");
            effective_length.nodal_supports[row].support_in_z = support_in_z;
        }
    }
    function setEffectiveLengthSupportType(support_type) {
        var type = GetConcreteDesignEffectiveLengthSupportType(support_type);
        switch (type) {
            case concrete_effective_lengths.SUPPORT_TYPE_NONE:
                setValues(support_false, support_false);
                break;
            case concrete_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z:
                setValues(support_true, support_false);
                break;
            case concrete_effective_lengths.SUPPORT_TYPE_FIXED_IN_Y:
                setValues(support_false, support_true);
                break;
                case concrete_effective_lengths.SUPPORT_TYPE_FIXED_ALL:
                    setValues(support_true, support_true);
                    break;
            default:
                ASSERT(false, "setBoundaryConditionSupportType");
        }
    }
    if (support_type !== "INDIVIDUALLY") {
        ASSERT(isSupportTypeEnabled(support_type), "Support type " + support_type + " is not enabled");
        setEffectiveLengthSupportType(support_type);
    }
    else {
        if (typeof support_in_y === "undefined") {
            support_in_y = support_false;
        }
        if (typeof support_in_z === "undefined") {
            support_in_z = support_false;
        }
        setValues(support_in_y, support_in_z);
    }
}

function GetConcreteDesignSupportStatusType(support_status) {
    return EnumValueFromJSHLFTypeName(
        support_status,
        "support status",
        {
            "SUPPORT_STATUS_NO": concrete_effective_lengths.SUPPORT_STATUS_NO,
            "SUPPORT_STATUS_SPRING": concrete_effective_lengths.SUPPORT_STATUS_SPRING,
            "SUPPORT_STATUS_YES": concrete_effective_lengths.SUPPORT_STATUS_YES
        },
        concrete_effective_lengths.SUPPORT_STATUS_NO);
}

function GetConcreteDesignEffectiveLengthSupportType(support_type) {
    return EnumValueFromJSHLFTypeName(
        support_type,
        "effective length support",
        {
            "NONE": concrete_effective_lengths.SUPPORT_TYPE_NONE,
            "FIXED_IN_Z": concrete_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z,
            "FIXED_IN_Y": concrete_effective_lengths.SUPPORT_TYPE_FIXED_IN_Y,
            "FIXED_ALL": concrete_effective_lengths.SUPPORT_TYPE_FIXED_ALL,
            "INDIVIDUALLY": concrete_effective_lengths.SUPPORT_TYPE_INDIVIDUALLY
        },
        concrete_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION);
}

function setConcreteDesignEffectiveLengthsBuckling (effective_length,
    absolute_values,
    object_to_set,
    row,
    flexural_buckling_y,
    flexural_buckling_z) {
    ASSERT(row >= 1 && row < effective_length.nodal_supports.row_count(), "Row must be in range 1-" + (effective_length.nodal_supports.row_count() - 1).toString());
    var support_true = GetConcreteDesignSupportStatusType("SUPPORT_STATUS_YES");
    function isFlexuralBucklingYEnable () {
        return effective_length.flexural_buckling_about_y;
    }
    function isFlexuralBucklingZEnable () {
        return effective_length.flexural_buckling_about_z;
    }
    function getSymbolicName (value_name,
        absolute_value) {
        switch (value_name)
        {
            case "flexural_buckling_y":
                return !absolute_value ? "ky" : "Lcr,y";
            case "flexural_buckling_z":
                return !absolute_value ? "kz" : "Lcr,z";
            default:
                ASSERT(false, "Unknown value name (" + value_name + ")");
                return "??";
        }
    }
    effective_length.factors_definition_absolute = absolute_values;
    var support_true = GetConcreteDesignSupportStatusType("SUPPORT_STATUS_YES");
    if (typeof flexural_buckling_y !== "undefined") {
        ASSERT(isFlexuralBucklingYEnable(), "Row " + row.toString() + ": Flexural buckling " + getSymbolicName("flexural_buckling_y", absolute_values) + " is not enabled");
        ASSERT(effective_length.nodal_supports[row].support_in_z === support_true || row === 1 || row === effective_length.nodal_supports.row_count(), "Row " + row.toString() + ": Flexural buckling " + getSymbolicName("flexural_buckling_y", absolute_values) + " is not enabled");
        object_to_set[row].flexural_buckling_y = flexural_buckling_y;
    }
    if (typeof flexural_buckling_z !== "undefined") {
        ASSERT(isFlexuralBucklingZEnable(), "Row " + row.toString() + ": Flexural buckling " + getSymbolicName("flexural_buckling_z", absolute_values) + " is not enabled");
        ASSERT(effective_length.nodal_supports[row].support_in_y === support_true || row === 1 || row === effective_length.nodal_supports.row_count(), "Row " + row.toString() + ": Flexural buckling " + getSymbolicName("flexural_buckling_z", absolute_values) + " is not enabled");
        object_to_set[row].flexural_buckling_z = flexural_buckling_z;
    }
};
