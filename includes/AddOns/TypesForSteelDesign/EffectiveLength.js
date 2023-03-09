/*
1. API has no support for second enum item "CSA S136"?? There is no enum value for CSA critical stress?
2. effective_length.slenderness_reduction_restrained_segments_as: cannot be set, API enum bug(?), same values as for slenderness_reduction_unrestrained_segments_as.
3. No API enum for Determination of Mcr (NTC standard)?
4. There is no support for Modification factor for CSA and NBR standards? Only for AISC?
*/

include("../SteelDesign/SteelDesignSupport.js");

/**
 * Creates Steel design effective length
 * @param {Number} no               Steel design boundary condition index, can be undefined
 * @param {String} name             Name, can be undefined
 * @param {Array} members_no        List of members indexes, can be undefined
 * @param {Array} member_sets_no    List of member sets indexes, can be undefined
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Additional parameters, can be undefined
 */
function SteelDesignEffectiveLength (no,
    name,
    members_no,
    member_sets_no,
    comment,
    params) {
    if (typeof no === "undefined") {
        this.effective_length = steel_effective_lengths.create();
    }
    else {
        this.effective_length = steel_effective_lengths.create(no);
    }
    if (typeof name !== "undefined") {
        this.effective_length.user_defined_name_enabled = true;
        this.effective_length.name = name;
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
SteelDesignEffectiveLength.prototype.GetNo = function () {
    return this.effective_length.no;
};

/**
 * @returns Effective length object
 */
SteelDesignEffectiveLength.prototype.EffectiveLength = function () {
    return this.effective_length;
};

/**
 * Sets Determination Type
 * @param {Boolean} flexural_buckling_about_y   Consider effective lengths for flexural buckling about y/u, can be undefined (is not set, true as default)
 * @param {Boolean} flexural_buckling_about_z   Consider effective lengths for flexural buckling about z/v, can be undefined (is not set, true as default)
 * @param {Boolean} torsional_buckling          Consider effective lengths for torsional buckling (for all standards except IS, BS and Sp ones), can be undefined (is not set, true as default)
 * @param {Boolean} lateral_torsional_buckling  Consider effective lengths for lateral-torsional buckling, can be undefined (is not set, true as default)
 * @param {String} determination_mcr            Determination of elastic critical moment Mcr (for all standards except Sp one), values are different along to current code for standard, can be undefined
 */
SteelDesignEffectiveLength.prototype.DeterminationType = function (flexural_buckling_about_y,
    flexural_buckling_about_z,
    torsional_buckling,
    lateral_torsional_buckling,
    determination_mcr) {
    if (typeof flexural_buckling_about_y !== "undefined") {
        this.effective_length.flexural_buckling_about_y = flexural_buckling_about_y;
    }
    if (typeof flexural_buckling_about_z !== "undefined") {
        this.effective_length.flexural_buckling_about_z = flexural_buckling_about_z;
    }
    if (typeof torsional_buckling !== "undefined") {
        ASSERT(!IsCurrentCodeOfStandard("IS") && !IsCurrentCodeOfStandard("BS") && !IsCurrentCodeOfStandard("SP"), "Can't set torsional buckling, it is disabled for IS, BS and SP standards");
        this.effective_length.torsional_buckling = torsional_buckling;
    }
    if (typeof lateral_torsional_buckling !== "undefined") {
        this.effective_length.lateral_torsional_buckling = lateral_torsional_buckling;
    }
    ASSERT(this.effective_length.flexural_buckling_about_y || this.effective_length.flexural_buckling_about_z || this.effective_length.lateral_torsional_buckling,"At least one buckling must be enabled");
    if (typeof determination_mcr !== "undefined") {
        ASSERT(!IsCurrentCodeOfStandard("SP"), "Can't set determination of elastic critical moment, it is disabled for SP standard");
        ASSERT(this.effective_length.lateral_torsional_buckling, "Lateral torsional buckling must be on");
        SetDeterminationOfElasticCriticalMoment(this.effective_length, determination_mcr);
    }
};

/**
 * Sets Buckling axes
 * @param {Boolean} principal_section_axes  Principal section axes y/u and z/v, can be undefined (is not set, true as default)
 * @param {Boolean} geometric_section_axes  Geometric section axes y and z, can be undefined (is not set, false as default)
 */
SteelDesignEffectiveLength.prototype.BucklingAxes = function (principal_section_axes,
    geometric_section_axes) {
    if (typeof principal_section_axes !== "undefined") {
        this.effective_length.principal_section_axes = principal_section_axes;
    }
    if (typeof geometric_section_axes !== "undefined") {
        this.effective_length.geometric_section_axes = geometric_section_axes;
    }
};

/**
 * Sets Buckling factor type
 * @param {String} buckling_factor_type     Buckling factor type (THEORETICAL, RECOMMENDED), can be undefined (is not set, THEORETICAL as default)
 */
SteelDesignEffectiveLength.prototype.BucklingFactorType = function (buckling_factor_type) {
    ASSERT(IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA") || IsCurrentCodeOfStandard("SIA") || IsCurrentCodeOfStandard("NBR") || IsCurrentCodeOfStandard("AS"), "Can't set buckling factor type, it is enabled for AISC, CSA, SIA, NBR, AS");
    this.effective_length.buckling_factor_value_type = GetSteelDesignBucklingFactorType(buckling_factor_type);
};

SteelDesignEffectiveLength.prototype.MemberType = function (member_type,
    member_type_yy,
    member_type_zz) {
    if (typeof member_type_yy !== "undefined") {
        ASSERT(IsCurrentCodeOfStandard("GB"), "Can't set member type (yy), it is enabled for GB standard");
        this.effective_length.member_type_yy = GetSteelDesignMemberType(member_type_yy);
    }
    if (typeof member_type_zz !== "undefined") {
        ASSERT(IsCurrentCodeOfStandard("GB"), "Can't set member type (zz), it is enabled for GB standard");
        this.effective_length.member_type_zz = GetSteelDesignMemberType(member_type_zz);
    }
    if (typeof member_type !== "undefined") {
        if (IsCurrentCodeOfStandard("SP")) {
            this.effective_length.member_type = GetSteelDesignMemberType(member_type);
        }
        else if (IsCurrentCodeOfStandard("CSA")) {
            ASSERT(this.effective_length.determination_mcr_csa === steel_effective_lengths.DETERMINATION_CSA_ACC_TO_CHAPTER_13_6, "Can't set member type (Mu acc. to chapter 13.6 must be set)");
            this.effective_length.member_type = GetSteelDesignMemberType(member_type);
        }
        else {
            ASSERT("Can't set member type, it is enabled for SP and CSA standards");
        }
    }
};

/**
 * Sets Effective lengths acc. to standard
 * @param {String} standard_of_effective_lengths    Standard (AISC_360, AISI_S100), can be undedined (is not set, AISC_360 as default)
 */
SteelDesignEffectiveLength.prototype.EffectiveLengthsAccToStandard = function (standard_of_effective_lengths) {
    ASSERT(IsCurrentCodeOfStandard("AISC"), "Effective length acc. to standard can be set only for AISC code of standard");
    this.effective_length.standard_of_effective_lengths = GetSteelDesignEffectiveLengthAccToStandardType(standard_of_effective_lengths);
};

SteelDesignEffectiveLength.prototype.SegmentsRestrainedBothEnds = function (moment_modification_restrained_segments_as,
    modification_factor_alpha_restrained_segments_as,
    slenderness_reduction_restrained_segments_as) {
    ASSERT(IsCurrentCodeOfStandard("AS"), "Segments fully or partially restrained at both ends can be set only with AS standard");
    this.effective_length.moment_modification_restrained_segments_as = GetSteelDesignMomentModificationRestrainedType(moment_modification_restrained_segments_as);
    if (typeof modification_factor_alpha_restrained_segments_as !== "undefined") {
        ASSERT(this.effective_length.moment_modification_restrained_segments_as === steel_effective_lengths.MOMENT_ALPHA_USER_DEFINED, "Factor alpha can be set only with user-defined moment modification type");
        this.effective_length.modification_factor_alpha_restrained_segments_as = modification_factor_alpha_restrained_segments_as;
    }
    // API enum bug? Same values as for slenderness_reduction_unrestrained_segments_as. Cannot be set.
    //this.effective_length.slenderness_reduction_restrained_segments_as = GetSteelDesignSlendernessReductionRestrainedType(slenderness_reduction_restrained_segments_as);
};

SteelDesignEffectiveLength.prototype.SegmentsUnrestrainedOneEnd = function (moment_modification_unrestrained_segments_as,
    modification_factor_alpha_unrestrained_segments_as,
    slenderness_reduction_unrestrained_segments_as) {
    ASSERT(IsCurrentCodeOfStandard("AS"), "Segments fully or partially restrained at both ends can be set only with AS standard");
    if (typeof moment_modification_unrestrained_segments_as !== "undefined") {
        if (typeof slenderness_reduction_unrestrained_segments_as !== "undefined") {
            ASSERT(slenderness_reduction_unrestrained_segments_as !== "EIGENVALUE_METHOD", "Moment mod. factor cannot be set when slenderness red. factor is if Eigenvalue method");
        }
        this.effective_length.moment_modification_unrestrained_segments_as = GetSteelDesignMomentModificationUnrestrainedType(moment_modification_unrestrained_segments_as);
    }
    if (typeof modification_factor_alpha_unrestrained_segments_as !== "undefined") {
        ASSERT(this.effective_length.moment_modification_unrestrained_segments_as === steel_effective_lengths.MOMENT_ALPHA_USER_DEFINED, "Factor alpha can be set only with user-defined moment modification type");
        this.effective_length.modification_factor_alpha_unrestrained_segments_as = modification_factor_alpha_unrestrained_segments_as;
    }
    this.effective_length.slenderness_reduction_unrestrained_segments_as = GetSteelDesignSlendernessReductionUnrestrainedType(slenderness_reduction_unrestrained_segments_as);
};

// TODO
SteelDesignEffectiveLength.prototype.ModificationFactor = function (modification_factor_cb_aisi,
    modification_factor_cb_aisi_user_defined_value) {
    ASSERT(IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA") || IsCurrentCodeOfStandard("NBR"), "Modification factor type can be set only for AISC, NBR and CSA standards");
    if (typeof modification_factor_cb_aisi !== "undefined") {
        ASSERT(this.effective_length.lateral_torsional_buckling, "Modification factor type can be set only with lateral-torsional buckling");
        if (IsCurrentCodeOfStandard("CSA") && this.effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_CSA_S16) {
            ASSERT(this.effective_length.determination_mcr_csa === steel_effective_lengths.DETERMINATION_CSA_ACC_TO_CHAPTER_13_6, "Modification factor type can be set only with Mu acc. to chapter 13.6");
        }
        this.effective_length.modification_factor_cb_aisi = GetSteelDesignModificationFactorType(modification_factor_cb_aisi);
    }
    if (typeof modification_factor_cb_aisi_user_defined_value !== "undefined") {
        ASSERT(this.effective_length.modification_factor_cb_aisi === steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_USER_DEFINED, "User-defined type must be enabled");
    }
    this.effective_length.modification_factor_cb_aisi_user_defined_value = modification_factor_cb_aisi_user_defined_value;
};

SteelDesignEffectiveLength.prototype.NodalSupportsStartWithSupportType = function (support_type) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, 1, support_type);
};

SteelDesignEffectiveLength.prototype.NodalSupportsEndWithSupportType = function (support_type) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count(), support_type);
};

SteelDesignEffectiveLength.prototype.NodalSupportsStartWithIndividuallySupportType = function (support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_spring_warping) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, 1, "INDIVIDUALLY", support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_spring_warping);
};

SteelDesignEffectiveLength.prototype.NodalSupportsEndWithIndividuallySupportType = function (support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_spring_warping) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count(), "INDIVIDUALLY", support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_spring_warping);
};

SteelDesignEffectiveLength.prototype.InsertNodalSupportIntermediateNode = function (support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_spring_warping) {
    ASSERT(this.effective_length.intermediate_nodes, "Intermediate nodes must be on");
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count() + 1, "INDIVIDUALLY", support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_spring_warping);
};

function setSteelDesignEffectiveLengthsNodalSupports (effective_length,
    row,
    support_type,
    support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_spring_warping) {
    ASSERT(effective_length.flexural_buckling_about_y || effective_length.flexural_buckling_about_z || effective_length.torsional_buckling || effective_length.lateral_torsional_buckling, "No buckling is specified");
    // Check if all options in column have same value (different_properties_supports is false)
    function checkUniqueValues (value_to_set, value_name) {
        if (!effective_length.different_properties) {
            var values = [];
            for (var row = 1; row <= effective_length.nodal_supports.row_count(); ++row) {
                switch (value_name)
                {
                    case "support_in_y":
                        values.push(steel_effective_lengths.nodal_supports[row].support_in_y);
                        break;
                    case "support_in_z":
                        values.push(steel_effective_lengths.nodal_supports[row].support_in_z);
                        break;
                    case "restraint_about_x":
                        values.push(steel_effective_lengths.nodal_supports[row].restraint_about_x);
                        break;
                    case "restraint_about_z":
                        values.push(steel_effective_lengths.nodal_supports[row].restraint_about_z);
                        break;
                    case "restraint_warping":
                        values.push(steel_effective_lengths.nodal_supports[row].restraint_warping);
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
                        steel_effective_lengths.nodal_supports[row].support_in_y = value_to_set;
                    }
                    else if (value_name === "support_in_z") {
                        steel_effective_lengths.nodal_supports[row].support_in_z = value_to_set;
                    }
                    else if (value_name === "restraint_about_x") {
                        steel_effective_lengths.nodal_supports[row].restraint_about_x = value_to_set;
                    }
                    else if (value_name === "restraint_about_z") {
                        steel_effective_lengths.nodal_supports[row].restraint_about_z = value_to_set;
                    }
                    else {
                        ASSERT(value_name === restraint_spring_warping, "setBoundaryConditionNodalSupports");
                        steel_effective_lengths.nodal_supports[row].restraint_spring_warping = value_to_set;
                    }
                }
                console.log(value_name + ": all values have been set to " + value_to_set + " (different properties off)");
            }
        }
    }
    function isSupportTypeEnabled (support_type) {
        const supportTypeValues = {
            "FIXED_IN_Z": [false, true, false, false, false],
            "FIXED_IN_Y": [true, false, false, false, false],
            "RESTRAINT_ABOUT_X": [false, false, true, false, false],
            "FIXED_IN_Z_AND_TORSION": [false, true, true, false, false],
            "FIXED_IN_Z_Y_AND_TORSION": [true, true, true, false, false],
            "FIXED_IN_Z_AND_TORSION_AND_WARPING": [false, true, true, false, true],
            "FIXED_IN_Z_Y_AND_TORSION_AND_WARPING": [true, true, true, false, true],
            "FIXED_ALL": [true, true, true, true, true]
        };
        const directions = [
            "DIRECTION_IN_Z",
            "DIRECTION_IN_Y",
            "DIRECTION_ABOUT_X",
            "DIRECTION_ABOUT_Z",
            "DIRECTION_WARPING"
        ];
        function itemExists(arr, item) {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        }
        const STATE_FALSE = 0;
        const STATE_TRUE = 1;
        const STATE_ANY = 2;
        var usedPresets = [];
        var supportedTypes = [];
        for (var supportType in supportTypeValues) {
            var intChecks = [];
            var checks = supportTypeValues[supportType];
            for (var i = 0; i < checks.length; ++i) {
                var direction = directions[i];
                var enabled = false;
                switch (direction) {
                    case "DIRECTION_IN_Z":
                        enabled = effective_length.flexural_buckling_about_y;
                        break;
                    case "DIRECTION_IN_Y":
                        enabled = effective_length.flexural_buckling_about_z || effective_length.lateral_torsional_buckling;
                        break;
                    case "DIRECTION_ABOUT_X":
                        enabled = effective_length.torsional_buckling || effective_length.lateral_torsional_buckling;
                        break;
                    case "DIRECTION_ABOUT_Z":
                    case "DIRECTION_WARPING":
                        enabled = effective_length.lateral_torsional_buckling;
                        break;
                    default:
                        ASSERT(false);
                }
                if (!enabled) {
                    intChecks.push(STATE_ANY);
                }
                else {
                    intChecks.push(checks[i] ? STATE_TRUE : STATE_FALSE);
                }
            }
            if (!itemExists(usedPresets, intChecks)) {
                usedPresets.push(intChecks);
                supportedTypes.push(supportType);
            }
        }
        return itemExists(supportedTypes, support_type);
    }
    function setValues(support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_warping) {
        if (row > effective_length.nodal_supports.row_count()) {
            row = row - 1;
            effective_length.nodal_supports.insert_row(row);
        }
        checkUniqueValues(support_in_y, "support_in_y");
        effective_length.nodal_supports[row].support_in_y = support_in_y;
        checkUniqueValues(support_in_z, "support_in_z");
        effective_length.nodal_supports[row].support_in_z = support_in_z;
        checkUniqueValues(restraint_about_x, "restraint_about_x");
        effective_length.nodal_supports[row].restraint_about_x = restraint_about_x;
        checkUniqueValues(restraint_about_z, "restraint_about_z");
        effective_length.nodal_supports[row].restraint_about_z = restraint_about_z;
        checkUniqueValues(restraint_warping, "restraint_warping");
        effective_length.nodal_supports[row].restraint_warping = restraint_spring_warping;
    }
    function setEffectiveLengthSupportType(support_type) {
        var type = SteelDesignEffectiveLengthSupportType(support_type);
        switch (type) {
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z:
                setValues(false, true, false, false, false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Y:
                setValues(true, false, false, false, false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_RESTRAINT_ABOUT_X:
                setValues(false, false, true, false, false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_AND_TORSION:
                setValues(false, true, true, false, false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION:
                setValues(true, true, true, false, false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_AND_TORSION_AND_WARPING:
                setValues(false, true, true, false, true);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION_AND_WARPING:
                setValues(true, true, true, false, true);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_ALL:
                setValues(true, true, true, true, true);
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
            support_in_y = false;
        }
        if (typeof support_in_z === "undefined") {
            support_in_z = false;
        }
        if (typeof restraint_about_x === "undefined") {
            restraint_about_x = false;
        }
        if (typeof restraint_about_z === "undefined") {
            restraint_about_z = false;
        }
        if (typeof restraint_spring_warping === "undefined") {
            restraint_spring_warping = false;
        }
        setValues(support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_spring_warping);
    }
}

function SetDeterminationOfElasticCriticalMoment (effective_length,
    mcr_type) {
    var mcr_types = {}
    if (IsCurrentCodeOfStandard("AISC")) {
        if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISC_360) {
            mcr_types = {
                "AISC_EIGENVALUE": steel_effective_lengths.DETERMINATION_AISC_EIGENVALUE,
                "AISC_USER_DEFINED": steel_effective_lengths.DETERMINATION_AISC_USER_DEFINED,
                "AISC_ACC_TO_CHAPTER_F": steel_effective_lengths.DETERMINATION_AISC_ACC_TO_CHAPTER_F
            };
        }
        else if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISI_S100) {
            mcr_types = {
                "FINITE_STRIP_METHOD": steel_effective_lengths.AISI_DETERMINATION_OF_FCRE_FINITE_STRIP_METHOD,
                "ACC_TO_CHAPTERS_E2_F21": steel_effective_lengths.AISI_DETERMINATION_OF_FCRE_ACC_TO_CHAPTERS_E2_F21
            };
        }
        else {
            ASSERT(false);
        }
    }
    else if (IsCurrentCodeOfStandard("BS")) {
        mcr_types = {
            "BS5_EIGENVALUE": steel_effective_lengths.DETERMINATION_BS5_EIGENVALUE,
            "BS5_ACC_TO_ANNEX_B": steel_effective_lengths.DETERMINATION_BS5_ACC_TO_ANNEX_B,
            "BS5_USER_DEFINED": steel_effective_lengths.DETERMINATION_BS5_USER_DEFINED
        };
    }
    else if (IsCurrentCodeOfStandard("CSA")) {
        if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_CSA_S16) {
            mcr_types = {
                "CSA_EIGENVALUE": steel_effective_lengths.DETERMINATION_CSA_EIGENVALUE,
                "CSA_USER_DEFINED": steel_effective_lengths.DETERMINATION_CSA_USER_DEFINED,
                "CSA_ACC_TO_CHAPTER_13_6": steel_effective_lengths.DETERMINATION_CSA_ACC_TO_CHAPTER_13_6
            };
        }
        else {  // API has no support for second enum item "CSA S136"?? There is no enum value  for CSA critical stress?
            mcr_types = {
                "FINITE_STRIP_METHOD": steel_effective_lengths.AISI_DETERMINATION_OF_FCRE_FINITE_STRIP_METHOD,
                "ACC_TO_CHAPTERS_E2_F21": steel_effective_lengths.AISI_DETERMINATION_OF_FCRE_ACC_TO_CHAPTERS_E2_F21
            };
            console.log("For now is not able to set CSA S136 type");
        }
    }
    else if (IsCurrentCodeOfStandard("EN")) {
        mcr_types = {
            "EUROPE_EIGENVALUE": steel_effective_lengths.DETERMINATION_EUROPE_EIGENVALUE,
            "EUROPE_USER_DEFINED": steel_effective_lengths.DETERMINATION_EUROPE_USER_DEFINED
        };
    }
    else if (IsCurrentCodeOfStandard("GB")) {
        mcr_types = {
            "GB50_EIGENVALUE": steel_effective_lengths.DETERMINATION_GB50_EIGENVALUE,
            "GB50_USER_DEFINED": steel_effective_lengths.DETERMINATION_GB50_USER_DEFINED,
            "GB50_NOT_USED": steel_effective_lengths.DETERMINATION_GB50_NOT_USED
        };
    }
    else if (IsCurrentCodeOfStandard("IS")) {
        mcr_types = {
            "IS800_EIGENVALUE": steel_effective_lengths.DETERMINATION_IS800_EIGENVALUE,
            "IS800_USER_DEFINED": steel_effective_lengths.DETERMINATION_IS800_USER_DEFINED
        };
    }
    else if (IsCurrentCodeOfStandard("SIA")) {
        mcr_types = {
            "SIA263_EIGENVALUE": steel_effective_lengths.DETERMINATION_SIA263_EIGENVALUE,
            "SIA263_USER_DEFINED": steel_effective_lengths.DETERMINATION_SIA263_USER_DEFINED
        };
    }
    else if (IsCurrentCodeOfStandard("NTC")) {
        mcr_types = {
            
        };  // No API enum for Determination of Mcr (NTC standard)
    }
    else {
        ASSERT(false);
    }

    var type;

    if (mcr_type !== undefined) {
		type = mcr_types[mcr_type];
		if (type === undefined) {
			console.log("Wrong type of elastic critical moment. Value was: " + mcr_type);
			console.log("Correct values are: ( " + Object.keys(mcr_types) + ")");
			type = mcr_types[Object.keys(mcr_types)[0]];
		}
	}
	else {
		type = mcr_types[Object.keys(mcr_types)[0]];
	}

    if (IsCurrentCodeOfStandard("AISC")) {
        if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISC_360) {
            effective_length.determination_mcr = type;
        }
        else if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISI_S100) {
            effective_length.determination_of_elastic_critical_stress_aisi = type;
        }
        else {
            ASSERT(false);
        }
    }
    else if (IsCurrentCodeOfStandard("BS")) {
        effective_length.determination_mcr_bs5 = type;
    }
    else if (IsCurrentCodeOfStandard("CSA")) {
        if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_CSA_S16) {
            effective_length.determination_mcr_csa = type;
        }
        else {
            effective_length.determination_of_elastic_critical_stress_aisi = type;
        }
    }
    else if (IsCurrentCodeOfStandard("EN")) {
        effective_length.determination_mcr_europe = type;
    }
    else if (IsCurrentCodeOfStandard("GB")) {
        effective_length.determination_mcr_gb50 = type;
    }
    else if (IsCurrentCodeOfStandard("IS")) {
        effective_length.determination_mcr_is800 = type;
    }
    else if (IsCurrentCodeOfStandard("SIA")) {
        effective_length.determination_mcr_sia263 = type;
    }
    else {
        ASSERT(false);
    }
}

function GetSteelDesignBucklingFactorType (buckling_factor_type) {
    const buckling_factor_types = {
        "THEORETICAL": steel_effective_lengths.BUCKLING_FACTOR_VALUE_TYPE_THEORETICAL,
        "RECOMMENDED": steel_effective_lengths.BUCKLING_FACTOR_VALUE_TYPE_RECOMMENDED
    };
    if (buckling_factor_type !== undefined) {
		type = buckling_factor_types[buckling_factor_type];
		if (type === undefined) {
			console.log("Wrong buckling factor type. Value was: " + buckling_factor_type);
			console.log("Correct values are: ( " + Object.keys(buckling_factor_types) + ")");
			type = steel_effective_lengths.BUCKLING_FACTOR_VALUE_TYPE_THEORETICAL;
		}
        return type;
	}
	else {
		return steel_effective_lengths.BUCKLING_FACTOR_VALUE_TYPE_THEORETICAL;
	}
}

function GetSteelDesignEffectiveLengthAccToStandardType (standard_type) {
    const standard_types = {
        "AISC_360": steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISC_360,
        "CSA_S16": steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_CSA_S16,
        "AISI_S100": steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISI_S100
    };
    if (standard_type !== undefined) {
		type = standard_types[standard_type];
		if (type === undefined) {
			console.log("Wrong effective lengths acc. to standard type. Value was: " + standard_type);
			console.log("Correct values are: ( " + Object.keys(standard_types) + ")");
			type = steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISC_360;
		}
        return type;
	}
	else {
		return steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISC_360;
	}
}

function GetSteelDesignMemberType (member_type) {
    const member_types = {
        "BEAM": steel_effective_lengths.MEMBER_TYPE_BEAM,
        "CANTILEVER": steel_effective_lengths.MEMBER_TYPE_CANTILEVER
    };
    if (member_type !== undefined) {
		type = member_types[member_type];
		if (type === undefined) {
			console.log("Wrong member type. Value was: " + member_type);
			console.log("Correct values are: ( " + Object.keys(member_types) + ")");
			type = steel_effective_lengths.MEMBER_TYPE_BEAM;
		}
        return type;
	}
	else {
		return steel_effective_lengths.MEMBER_TYPE_BEAM;
	}
}

function GetSteelDesignMomentModificationRestrainedType (moment_type) {
    const moment_types = {
        "BASIC_VALUE": steel_effective_lengths.MOMENT_ALPHA_BASIC_VALUE,
        "ACC_TO_5611_II": steel_effective_lengths.MOMENT_ALPHA_ACC_TO_5611_II,
        "ACC_TO_5611_III": steel_effective_lengths.MOMENT_ALPHA_ACC_TO_5611_III,
        "EIGENVALUE_METHOD": steel_effective_lengths.MOMENT_ALPHA_EIGENVALUE_METHOD,
        "USER_DEFINED": steel_effective_lengths.MOMENT_ALPHA_USER_DEFINED
    };
    if (moment_type !== undefined) {
		type = moment_types[moment_type];
		if (type === undefined) {
			console.log("Wrong moment modification restrained type. Value was: " + moment_type);
			console.log("Correct values are: ( " + Object.keys(moment_types) + ")");
			type = steel_effective_lengths.MOMENT_ALPHA_BASIC_VALUE;
		}
        return type;
	}
	else {
		return steel_effective_lengths.MOMENT_ALPHA_BASIC_VALUE;
	}
}

function GetSteelDesignMomentModificationUnrestrainedType (moment_type) {
    const moment_types = {
        "BASIC_VALUE": steel_effective_lengths.MOMENT_ALPHA_BASIC_VALUE,
        "ACC_TO_5611_II": steel_effective_lengths.MOMENT_ALPHA_ACC_TO_5611_II,
        "USER_DEFINED": steel_effective_lengths.MOMENT_ALPHA_USER_DEFINED
    };
    if (moment_type !== undefined) {
		type = moment_types[moment_type];
		if (type === undefined) {
			console.log("Wrong moment modification restrained type. Value was: " + moment_type);
			console.log("Correct values are: ( " + Object.keys(moment_types) + ")");
			type = steel_effective_lengths.MOMENT_ALPHA_BASIC_VALUE;
		}
        return type;
	}
	else {
		return steel_effective_lengths.MOMENT_ALPHA_BASIC_VALUE;
	}
}

function GetSteelDesignSlendernessReductionRestrainedType (slenderness_type) {
    const slenderness_types = {
        "ACC_TO_5611": steel_effective_lengths.SLENDERNESS_ALPHA_ACC_TO_5611,
        "EIGENVALUE_METHOD": steel_effective_lengths.SLENDERNESS_ALPHA_EIGENVALUE_METHOD
    };
    if (slenderness_type !== undefined) {
		type = slenderness_types[slenderness_type];
		if (type === undefined) {
			console.log("Wrong slenderness reduction restrained type. Value was: " + slenderness_type);
			console.log("Correct values are: ( " + Object.keys(slenderness_types) + ")");
			type = steel_effective_lengths.SLENDERNESS_ALPHA_ACC_TO_5611;
		}
        return type;
	}
	else {
		return steel_effective_lengths.SLENDERNESS_ALPHA_ACC_TO_5611;
	}
}

function GetSteelDesignSlendernessReductionUnrestrainedType (slenderness_type) {
    const slenderness_types = {
        "ACC_TO_5611": steel_effective_lengths.SLENDERNESS_ALPHA_ACC_TO_5611,
        "EIGENVALUE_METHOD": steel_effective_lengths.SLENDERNESS_ALPHA_EIGENVALUE_METHOD
    };
    if (slenderness_type !== undefined) {
		type = slenderness_types[slenderness_type];
		if (type === undefined) {
			console.log("Wrong slenderness reduction restrained type. Value was: " + slenderness_type);
			console.log("Correct values are: ( " + Object.keys(slenderness_types) + ")");
			type = steel_effective_lengths.SLENDERNESS_ALPHA_ACC_TO_5611;
		}
        return type;
	}
	else {
		return steel_effective_lengths.SLENDERNESS_ALPHA_ACC_TO_5611;
	}
}

function GetSteelDesignModificationFactorType (factor_type) {
    const factor_types = {
        "CB_BASIC_VALUE": steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_BASIC_VALUE,
        "AUTOMATICALLY_ACC_TO_EQ_F2112": steel_effective_lengths.AISI_MODIFICATION_FACTOR_AUTOMATICALLY_ACC_TO_EQ_F2112,
        "CB_USER_DEFINED": steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_USER_DEFINED
    };
    if (factor_type !== undefined) {
		type = factor_types[factor_type];
		if (type === undefined) {
			console.log("Wrong modification factor type type. Value was: " + factor_type);
			console.log("Correct values are: ( " + Object.keys(factor_types) + ")");
			type = steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_BASIC_VALUE;
		}
        return type;
	}
	else {
		return steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_BASIC_VALUE;
	}
}

function SteelDesignEffectiveLengthSupportType(support_type) {
	const support_types_dict = {
        "NONE": steel_effective_lengths.SUPPORT_TYPE_NONE,
        "FIXED_IN_Z": steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z,
        "FIXED_IN_Y": steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Y,
        "RESTRAINT_ABOUT_X": steel_effective_lengths.SUPPORT_TYPE_RESTRAINT_ABOUT_X,
        "FIXED_IN_Z_AND_TORSION": steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_AND_TORSION,
        "FIXED_IN_Z_Y_AND_TORSION": steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION,
        "FIXED_IN_Z_AND_TORSION_AND_WARPING": steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_AND_TORSION_AND_WARPING,
        "FIXED_IN_Z_Y_AND_TORSION_AND_WARPING": steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION_AND_WARPING,
        "FIXED_ALL": steel_effective_lengths.SUPPORT_TYPE_FIXED_ALL,
        "INDIVIDUALLY": steel_effective_lengths.SUPPORT_TYPE_INDIVIDUALLY
	};

	if (support_type !== undefined) {
		var type = support_types_dict[support_type];
		if (type === undefined) {
			console.log("Wrong type of support. Value was: " + support_type);
			console.log("Correct values are: ( " + Object.keys(support_types_dict) + ")");
			type = steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION;
		}
		return type;
	}
	else {
		return steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION;
	}
}