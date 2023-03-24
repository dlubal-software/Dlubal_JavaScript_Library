/*
1. API has no support for second enum item "CSA S136"?? There is no enum value for CSA critical stress?
2. effective_length.slenderness_reduction_restrained_segments_as: cannot be set, API enum bug(?), same values as for slenderness_reduction_unrestrained_segments_as.
3. No API enum for Determination of Mcr (NTC standard)?
4. There is no support for Modification factor for CSA and NBR standards? Only for AISC?
5. There is found bug 71428 with radio buttons view, check condition after it is fixed! The isLateralTorsionalBucklingEnable sub-function.
6. nodal_supports[row].eccentricity_type: there is API support, but value cannot be set with enumeration value? Only with index. Bug 72773
7. ModificationFactor: NBR standard, user-value cannot be set?
*/

/*
effective_length.standard_of_effective_lengths - PRERELEASE
*/

include("../SteelDesign/SteelDesignSupport.js");

/**
 * Creates Steel design effective length
 * @param {Number} no               Steel design effective lengths index, can be undefined
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
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
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
 * @param {Boolean} flexural_buckling_about_y   Consider effective lengths for flexural buckling about y/u, can be undefined (if not set, true as default)
 * @param {Boolean} flexural_buckling_about_z   Consider effective lengths for flexural buckling about z/v, can be undefined (if not set, true as default)
 * @param {Boolean} torsional_buckling          Consider effective lengths for torsional buckling (for all standards except IS, BS and SP ones), can be undefined (if not set, true as default)
 * @param {Boolean} lateral_torsional_buckling  Consider effective lengths for lateral-torsional buckling, can be undefined (if not set, true as default)
 * @param {String}  determination_mcr           Determination of elastic critical moment Mcr (for all standards except SP one), values are different along to current code for standard, can be undefined
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
 * @param {Boolean} principal_section_axes  Principal section axes y/u and z/v, can be undefined (if not set, true as default)
 * @param {Boolean} geometric_section_axes  Geometric section axes y and z, can be undefined (if not set, false as default)
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
 * @param {String} buckling_factor_type     Buckling factor type (THEORETICAL, RECOMMENDED), can be undefined (if not set, THEORETICAL as default)
 */
SteelDesignEffectiveLength.prototype.BucklingFactorType = function (buckling_factor_type) {
    ASSERT(IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA") || IsCurrentCodeOfStandard("SIA") || IsCurrentCodeOfStandard("NBR") || IsCurrentCodeOfStandard("AS"), "Can't set buckling factor type, it is enabled for AISC, CSA, SIA, NBR, AS");
    this.effective_length.buckling_factor_value_type = GetSteelDesignBucklingFactorType(buckling_factor_type);
};

/**
 * Sets member type
 * @param {String} member_type      Member type (BEAM, CANTILEVER), can be undefined (if not set, BEAM as default)
 * @param {String} member_type_yy   Member type y-y (BEAM, CANTILEVER), can be undefined (if not set, BEAM as default)
 * @param {String} member_type_zz   Member type z-z (BEAM, CANTILEVER), can be undefined (if not set, BEAM as default)
 */
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
 * @param {String} standard_of_effective_lengths    Standard (AISC_360, AISI_S100), can be undedined (if not set, AISC_360 as default)
 */
SteelDesignEffectiveLength.prototype.EffectiveLengthsAccToStandard = function (standard_of_effective_lengths) {
    ASSERT(IsCurrentCodeOfStandard("AISC"), "Effective length acc. to standard can be set only for AISC code of standard");
    this.effective_length.standard_of_effective_lengths = GetSteelDesignEffectiveLengthAccToStandardType(standard_of_effective_lengths);
};

/**
 * Sets Segments fully or partially restrained at both ends
 * @param {String} moment_modification_restrained_segments_as           Moment modification factor αm acc. to 5.6.1.1(a) (BASIC_VALUE, ACC_TO_5611_II, ACC_TO_5611_III, EIGENVALUE_METHOD, USER_DEFINED), can be undefined (if not set, BASIC_VALUE as default)
 * @param {Number} modification_factor_alpha_restrained_segments_as     User defined αm, can be undefined (if not set, 1.00 as default)
 * @param {String} slenderness_reduction_restrained_segments_as         Slenderness reduction factor αs acc. to Eq. 5.6.1.1(2) (ACC_TO_5611, EIGENVALUE_METHOD), can be undefined (if not set, ACC_TO_5611 as default)
 */
SteelDesignEffectiveLength.prototype.SegmentsRestrainedBothEnds = function (moment_modification_restrained_segments_as,
    modification_factor_alpha_restrained_segments_as,
    slenderness_reduction_restrained_segments_as) {
    ASSERT(IsCurrentCodeOfStandard("AS"), "Segments fully or partially restrained at both ends can be set only with AS standard");
    this.effective_length.moment_modification_restrained_segments_as = GetSteelDesignMomentModificationRestrainedType(moment_modification_restrained_segments_as);
    if (typeof modification_factor_alpha_restrained_segments_as !== "undefined") {
        ASSERT(this.effective_length.moment_modification_restrained_segments_as === steel_effective_lengths.MOMENT_ALPHA_USER_DEFINED, "Factor alpha can be set only with user-defined moment modification type");
        this.effective_length.modification_factor_alpha_restrained_segments_as = modification_factor_alpha_restrained_segments_as;
    }
    if (typeof slenderness_reduction_restrained_segments_as !== "undefined") {
        // API enum bug? Same values as for slenderness_reduction_unrestrained_segments_as. Cannot be set.
        //this.effective_length.slenderness_reduction_restrained_segments_as = GetSteelDesignSlendernessReductionRestrainedType(slenderness_reduction_restrained_segments_as);
        ASSERT(false, "TODO: SteelDesignEffectiveLength.prototype.SegmentsRestrainedBothEnds");
    }
};

/**
 * Sets Segments unrestrained at one end
 * @param {String} moment_modification_unrestrained_segments_as         Moment modification factor αm acc. to 5.6.1.1(a) (BASIC_VALUE, ACC_TO_5611_II, USER_DEFINED), can be undefined (if not set, BASIC_VALUE as default)
 * @param {Number} modification_factor_alpha_unrestrained_segments_as   User defined αm, can be undefined (if not set, 1.00 as default)
 * @param {String} slenderness_reduction_unrestrained_segments_as       Slenderness reduction factor αs acc. to 5.6.2 (ACC_TO_5611, EIGENVALUE_METHOD), can be undefined (if not set, ACC_TO_5611 as default)
 */
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

/**
 * Sets Modification factor Cb/ω2 (only for CSA/AISI S100, NBR, CSA standards)
 * @param {String} modification_factor_cb_aisi                      Factor type (CB_BASIC_VALUE, AUTOMATICALLY_ACC_TO_EQ_F2112, CB_USER_DEFINED), can be undefined (if not set, CB_BASIC_VALUE as default)
 * @param {Number} modification_factor_cb_aisi_user_defined_value   User-defined value, can be undefined (if not set, 1.5 (Cb), 1.0 (ω2) as default)
 */
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

/**
 * Sets nodal supports type for start sequence node
 * @param {String} support_type     Support type (NONE, FIXED_IN_Z, FIXED_IN_Y, RESTRAINT_ABOUT_X, FIXED_IN_Z_AND_TORSION, FIXED_IN_Z_Y_AND_TORSION, FIXED_IN_Z_AND_TORSION_AND_WARPING, FIXED_IN_Z_Y_AND_TORSION_AND_WARPING, FIXED_ALL, INDIVIDUALLY), can be undefined (if not set, FIXED_IN_Z_Y_AND_TORSION as default)
 */
SteelDesignEffectiveLength.prototype.NodalSupportsStartWithSupportType = function (support_type) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, 1, support_type);
};

/**
 * Sets nodal supports type for end sequence node
 * @param {String} support_type     Support type (NONE, FIXED_IN_Z, FIXED_IN_Y, RESTRAINT_ABOUT_X, FIXED_IN_Z_AND_TORSION, FIXED_IN_Z_Y_AND_TORSION, FIXED_IN_Z_AND_TORSION_AND_WARPING, FIXED_IN_Z_Y_AND_TORSION_AND_WARPING, FIXED_ALL, INDIVIDUALLY), can be undefined (if not set, FIXED_IN_Z_Y_AND_TORSION as default)
 */
SteelDesignEffectiveLength.prototype.NodalSupportsEndWithSupportType = function (support_type) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count(), support_type);
};

/**
 * Sets nodal supports individually values for start sequence node
 * @param {Boolean} support_in_y          Fixed support in y/u, can be undefined (if not set, true as default)
 * @param {Boolean} support_in_z          Fixed support in z/v, can be undefined (if not set, true as default)
 * @param {Boolean} restraint_about_x     Restraint about x, can be undefined (if not set, true as default)
 * @param {Boolean} restraint_about_z     Restraint about z, can be undefined (if not set, false as default)
 * @param {Boolean} restraint_warping     Warping ω, can be undefined (if not set, false as default)
 */
SteelDesignEffectiveLength.prototype.NodalSupportsStartWithIndividuallySupportType = function (support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, 1, "INDIVIDUALLY", support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_warping);
};

/**
 * Sets nodal supports individually values for end sequence node
 * @param {Boolean} support_in_y          Fixed support in y/u, can be undefined (if not set, true as default)
 * @param {Boolean} support_in_z          Fixed support in z/v, can be undefined (if not set, true as default)
 * @param {Boolean} restraint_about_x     Restraint about x, can be undefined (if not set, true as default)
 * @param {Boolean} restraint_about_z     Restraint about z, can be undefined (if not set, false as default)
 * @param {Boolean} restraint_warping     Warping ω, can be undefined (if not set, false as default)
 */
SteelDesignEffectiveLength.prototype.NodalSupportsEndWithIndividuallySupportType = function (support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count(), "INDIVIDUALLY", support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_warping);
};

/**
 * Inserts intermediate node with support type
 * @param {String} support_type     Support type (NONE, FIXED_IN_Z, FIXED_IN_Y, RESTRAINT_ABOUT_X, FIXED_IN_Z_AND_TORSION, FIXED_IN_Z_Y_AND_TORSION, FIXED_IN_Z_AND_TORSION_AND_WARPING, FIXED_IN_Z_Y_AND_TORSION_AND_WARPING, FIXED_ALL, INDIVIDUALLY), can be undefined (if not set, FIXED_IN_Z_Y_AND_TORSION as default)
 */
SteelDesignEffectiveLength.prototype.InsertNodalSupportIntermediateNodeWithSupportType = function (support_type) {
    this.effective_length.intermediate_nodes = true;
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count() + 1, support_type);
};

/**
 * Insert intermediate node with individually support values
 * @param {Boolean} support_in_y          Fixed support in y/u, can be undefined (if not set, true as default)
 * @param {Boolean} support_in_z          Fixed support in z/v, can be undefined (if not set, true as default)
 * @param {Boolean} restraint_about_x     Restraint about x, can be undefined (if not set, true as default)
 * @param {Boolean} restraint_about_z     Restraint about z, can be undefined (if not set, false as default)
 * @param {Boolean} restraint_warping     Warping ω, can be undefined (if not set, false as default)
 */
SteelDesignEffectiveLength.prototype.InsertNodalIndividuallySupportIntermediateNode = function (support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    this.effective_length.intermediate_nodes = true;
    setSteelDesignEffectiveLengthsNodalSupports(this.effective_length, this.effective_length.nodal_supports.row_count() + 1, "INDIVIDUALLY", support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_warping);
};

/**
 * Sets Different properties state for nodal supports
 * @param {Boolean} different_properties   Different properties, can be undefined (true as default)
 */
SteelDesignEffectiveLength.prototype.DifferentPropertiesForNodalSupports = function (different_properties) {
    if (typeof different_properties === "undefined") {
        different_properties = true;
    }
    this.effective_length.different_properties = different_properties;
};

/**
 * Sets Effective length factors for segment sequence
 * @param {Number} row                                  Segment sequence row
 * @param {Number} flexural_buckling_u                  Principal axes u, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_v                  Principal axes v, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_y                  Geometrical axes y, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_z                  Geometrical axes z, can be undefined (1.00 as default if it's enabled)
 * @param {Number} torsional_buckling                   Torsional, can be undefined (1.00 as default if it's enabled)
 * @param {Number} lateral_torsional_buckling           Lateral-torsional buckling, can be undefined (1.00 as default if it's enabled)
 * @param {Number} critical_moment                      Critical moment, can be undefined (1.00 as default if it's enabled)
 * @param {Number} lateral_torsional_buckling_top       Lateral-torsional buckling top, can be undefined (1.00 as default if it's enabled)
 * @param {Number} lateral_torsional_buckling_bottom    Lateral-torsional buckling bottom, can be undefined (1.00 as default if it's enabled)
 */
SteelDesignEffectiveLength.prototype.EffectiveLengthFactors = function (row,
    flexural_buckling_u,
    flexural_buckling_v,
    flexural_buckling_y,
    flexural_buckling_z,
    torsional_buckling,
    lateral_torsional_buckling,
    critical_moment,
    lateral_torsional_buckling_top,
    lateral_torsional_buckling_bottom) {
    this.effective_length.factors_definition_absolute = false;
    setSteelDesignEffectiveLengthsBuckling(this.effective_length, false, this.effective_length.factors, row, flexural_buckling_u,
        flexural_buckling_v, flexural_buckling_y, flexural_buckling_z, torsional_buckling, lateral_torsional_buckling, critical_moment,
        lateral_torsional_buckling_top, lateral_torsional_buckling_bottom);
};

/**
 * Sets Overwrite effective length for segment sequence
 * @param {Number} row                                  Segment sequence row
 * @param {Number} flexural_buckling_u                  Principal axes u, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_v                  Principal axes v, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_y                  Geometrical axes y, can be undefined (1.00 as default if it's enabled)
 * @param {Number} flexural_buckling_z                  Geometrical axes z, can be undefined (1.00 as default if it's enabled)
 * @param {Number} torsional_buckling                   Torsional, can be undefined (1.00 as default if it's enabled)
 * @param {Number} lateral_torsional_buckling           Lateral-torsional buckling, can be undefined (1.00 as default if it's enabled)
 * @param {Number} critical_moment                      Critical moment, can be undefined (1.00 as default if it's enabled)
 * @param {Number} lateral_torsional_buckling_top       Lateral-torsional buckling top, can be undefined (1.00 as default if it's enabled)
 * @param {Number} lateral_torsional_buckling_bottom    Lateral-torsional buckling bottom, can be undefined (1.00 as default if it's enabled)
 */
SteelDesignEffectiveLength.prototype.OverwriteEffectiveLengths = function (row,
    flexural_buckling_u,
    flexural_buckling_v,
    flexural_buckling_y,
    flexural_buckling_z,
    torsional_buckling,
    lateral_torsional_buckling,
    critical_moment,
    lateral_torsional_buckling_top,
    lateral_torsional_buckling_bottom) {
    this.effective_length.factors_definition_absolute = true;
    setSteelDesignEffectiveLengthsBuckling(this.effective_length, true, this.effective_length.lengths, row, flexural_buckling_u,
        flexural_buckling_v, flexural_buckling_y, flexural_buckling_z, torsional_buckling, lateral_torsional_buckling, critical_moment,
        lateral_torsional_buckling_top, lateral_torsional_buckling_bottom);
};

/**
 * Sets Eccentricity
 * @param {Number} row                  Segment sequence row
 * @param {String} eccentricity_type    Eccentricity type (NONE, AT_UPPER_FLANGE, AT_LOWER_FLANGE, USER_VALUE), can be undefined (if not set, NONE as default)
 * @param {Number} eccentricity_ez      User-defined eccentricity value
 */
SteelDesignEffectiveLength.prototype.Eccentricity = function (row,
    eccentricity_type,
    eccentricity_ez) {
    ASSERT(row >= 1 && row < this.effective_length.nodal_supports.row_count(), "Row must be in range 1-" + (this.effective_length.nodal_supports.row_count() - 1).toString());
    ASSERT(isSteelDesignNodalSupportEccentricityEnable(row, this.effective_length), "Eccentricity cannot be set");
    // there is API support, but value cannot be set with enumeration value? Only with index. Bug 72773
    this.effective_length.nodal_supports[row].eccentricity_type = GetSteelDesignNodalSupportEccentricityType(eccentricity_type);
    if (typeof eccentricity_ez !== "undefined") {
        var enable = IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("SP") || IsCurrentCodeOfStandard("NBR");
        if (IsCurrentCodeOfStandard("IS")) {
            enable = this.effective_length.determination_mcr_is800 === steel_effective_lengths.DETERMINATION_IS800_EIGENVALUE;
        }
        if (IsCurrentCodeOfStandard("BS")) {
            enable = this.effective_length.determination_mcr_bs5 === steel_effective_lengths.DETERMINATION_BS5_EIGENVALUE;
        }
        if (IsCurrentCodeOfStandard("GB")) {
            enable = this.effective_length.determination_mcr_gb50 === steel_effective_lengths.DETERMINATION_GB50_EIGENVALUE;
        }
        if (IsCurrentCodeOfStandard("NTC")) {
            ASSERT(false, "No API enum for Determination of Mcr (NTC standard)");
            enable = false;
        }
        ASSERT(enable, "User-defined eccentricity_ez cannot be set");
        this.effective_length.nodal_supports[row].eccentricity_ez = eccentricity_ez;
    }
};

function isSteelDesignNodalSupportEccentricityEnable (row,
    effective_length) {
    return effective_length.nodal_supports[row].support_in_y === GetSteelDesignSupportStatusType("SUPPORT_STATUS_YES") && effective_length.nodal_supports[row].restraint_about_x === GetSteelDesignSupportStatusType("SUPPORT_STATUS_NO");
}

function setSteelDesignEffectiveLengthsBuckling (effective_length,
    absolute_values,
    object_to_set,
    row,
    flexural_buckling_u,
    flexural_buckling_v,
    flexural_buckling_y,
    flexural_buckling_z,
    torsional_buckling,
    lateral_torsional_buckling,
    critical_moment,
    lateral_torsional_buckling_top,
    lateral_torsional_buckling_bottom) {
    ASSERT(row >= 1 && row < effective_length.nodal_supports.row_count(), "Row must be in range 1-" + (effective_length.nodal_supports.row_count() - 1).toString());
    var support_true = GetSteelDesignSupportStatusType("SUPPORT_STATUS_YES");
    function isPrincipalAxesUEnable () {
        var enable = effective_length.flexural_buckling_about_y && effective_length.principal_section_axes &&
            (row === 1 || effective_length.nodal_supports[row].support_in_z === support_true);  // Node sequence start (row = 1) has no conditions
        if (isSteelDesignNodalSupportEccentricityEnable(row, effective_length)) {
            enable &= effective_length.nodal_supports[row].eccentricity_type === GetSteelDesignNodalSupportEccentricityType("NONE");
        }
        return enable;
    }
    function isPrincipalAxesVEnable () {
        var enable = effective_length.flexural_buckling_about_z && effective_length.principal_section_axes &&
            (row === 1 || effective_length.nodal_supports[row].support_in_y === support_true);  // Node sequence start (row = 1) has no conditions
        if (isSteelDesignNodalSupportEccentricityEnable(row, effective_length)) {
            enable &= effective_length.nodal_supports[row].eccentricity_type === GetSteelDesignNodalSupportEccentricityType("NONE");
        }
        return enable;
    }
    function isGeometricalAxesYEnable () {
        var enable = effective_length.flexural_buckling_about_y && effective_length.geometric_section_axes &&
            (row === 1 || effective_length.nodal_supports[row].support_in_z === support_true);  // Node sequence start (row = 1) has no conditions
        if (isSteelDesignNodalSupportEccentricityEnable(row, effective_length)) {
            enable &= effective_length.nodal_supports[row].eccentricity_type === GetSteelDesignNodalSupportEccentricityType("NONE");
        }
        return enable;
    }
    function isGeometricalAxesZEnable () {
        var enable = effective_length.flexural_buckling_about_z && effective_length.geometric_section_axes &&
            (row === 1 || effective_length.nodal_supports[row].support_in_y === support_true);  // Node sequence start (row = 1) has no conditions
        if (isSteelDesignNodalSupportEccentricityEnable(row, effective_length)) {
            enable &= effective_length.nodal_supports[row].eccentricity_type === GetSteelDesignNodalSupportEccentricityType("NONE");
        }
        return enable;
    }
    function isTorsionalBucklingEnable () {
        var enable = !IsCurrentCodeOfStandard("IS") && !IsCurrentCodeOfStandard("BS") && !IsCurrentCodeOfStandard("SP") ||
            IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("GB") || IsCurrentCodeOfStandard("CSA") ||
            IsCurrentCodeOfStandard("AS") || IsCurrentCodeOfStandard("NTC") || IsCurrentCodeOfStandard("NBR");
        enable &= row === 1 || effective_length.nodal_supports[row].restraint_about_x === support_true;
        return enable;
    }
    function isLateralTorsionalBucklingEnable () {
        var enable = !IsCurrentCodeOfStandard("EN") && !IsCurrentCodeOfStandard("NTC") || 
            IsCurrentCodeOfStandard("SP") || IsCurrentCodeOfStandard("NBR");
        enable &= row === 1 || effective_length.nodal_supports[row].support_in_y === support_true || effective_length.nodal_supports[row].restraint_about_x === support_true ||
            effective_length.nodal_supports[row].restraint_about_z === support_true || effective_length.nodal_supports[row].restraint_warping === support_true;
        if (IsCurrentCodeOfStandard("AISC")) {
            enable &= effective_length.lateral_torsional_buckling;
            if (effective_length.standard_of_effective_lengths === steel_effective_lengths.STANDARD_OF_EFFECTIVE_LENGTHS_AISC_360) {
                enable &= effective_length.determination_mcr === GetDeterminationOfElasticCriticalMoment("AISC_USER_DEFINED");
            }
        }
        if (IsCurrentCodeOfStandard("IS")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_is800 === GetDeterminationOfElasticCriticalMoment("IS800_EIGENVALUE");
        }
        if (IsCurrentCodeOfStandard("BS")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_bs5 !== GetDeterminationOfElasticCriticalMoment("BS5_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("GB")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_gb50 !== GetDeterminationOfElasticCriticalMoment("GB50_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("CSA")) {
            //There is bug 71428 with bad radio buttons displaying, check condition after it is fixed!
        }
        if (IsCurrentCodeOfStandard("AS")) {
            enable &= absolute_values;
        }
        return enable;
    }
    function isCriticalMomentEnable() {
        var enable = !IsCurrentCodeOfStandard("AS") && !IsCurrentCodeOfStandard("SP") && !IsCurrentCodeOfStandard("NBR");
        enable &= effective_length.nodal_supports[row].support_in_y === support_true || effective_length.nodal_supports[row].restraint_about_x === support_true ||
            effective_length.nodal_supports[row].restraint_about_z === support_true || effective_length.nodal_supports[row].restraint_warping === support_true;
        if (IsCurrentCodeOfStandard("EN")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_europe === GetDeterminationOfElasticCriticalMoment("EUROPE_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("AISC")) {
            var enable = effective_length.lateral_torsional_buckling;
            enable &= GetDeterminationOfElasticCriticalMoment("AISC_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("IS")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_is800 === GetDeterminationOfElasticCriticalMoment("IS800_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("BS")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_bs5 === GetDeterminationOfElasticCriticalMoment("BS5_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("GB")) {
            enable &= effective_length.lateral_torsional_buckling;
            enable &= effective_length.determination_mcr_gb50 === GetDeterminationOfElasticCriticalMoment("GB50_USER_DEFINED");
        }
        if (IsCurrentCodeOfStandard("CSA")) {
            //There is bug 71428 with bad radio buttons displaying, check condition after it is fixed!
        }
        if (IsCurrentCodeOfStandard("NTC")) {
            // No API support?
            // enable &= user-defined
        }
        return enable;
    }
    function isLateralTorsionalBucklingEccentricityTopEnable(effective_length) {
        var enable = isLateralTorsionalBucklingEnable();
        enable &= !IsCurrentCodeOfStandard("AISC") && !IsCurrentCodeOfStandard("IS");
        if (IsCurrentCodeOfStandard("BS")) {
            enable &= effective_length.determination_mcr_bs5 === steel_effective_lengths.DETERMINATION_BS5_ACC_TO_ANNEX_B;
        }
        else if (IsCurrentCodeOfStandard("GB")) {
            enable &= effective_length.determination_mcr_gb50 === steel_effective_lengths.DETERMINATION_GB50_NOT_USED;
        }
        else if (IsCurrentCodeOfStandard("CSA")) {
            ASSERT(false, "Need check CSA format, bug 71428");
        }
        if (isSteelDesignNodalSupportEccentricityEnable(row, effective_length)) {
            enable &= effective_length.nodal_supports[row].eccentricity_type === GetSteelDesignNodalSupportEccentricityType("AT_UPPER_FLANGE");
        }
        return enable;
    }
    function isLateralTorsionalBucklingEccentricityBottomEnable(effective_length) {
        var enable = isLateralTorsionalBucklingEnable();
        enable &= !IsCurrentCodeOfStandard("AISC") && !IsCurrentCodeOfStandard("IS");
        if (IsCurrentCodeOfStandard("BS")) {
            enable &= effective_length.determination_mcr_bs5 === steel_effective_lengths.DETERMINATION_BS5_ACC_TO_ANNEX_B;
        }
        else if (IsCurrentCodeOfStandard("GB")) {
            enable &= effective_length.determination_mcr_gb50 === steel_effective_lengths.DETERMINATION_GB50_NOT_USED;
        }
        else if (IsCurrentCodeOfStandard("CSA")) {
            ASSERT(false, "Need check CSA format, bug 71428");
        }
        if (isSteelDesignNodalSupportEccentricityEnable(row, effective_length)) {
            enable &= effective_length.nodal_supports[row].eccentricity_type === GetSteelDesignNodalSupportEccentricityType("AT_LOWER_FLANGE");
        }
        return enable;
    }
    function getSymbolicName (value_name,
        absolute_value) {
        switch (value_name)
        {
            case "flexural_buckling_u":
                if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("GB") || IsCurrentCodeOfStandard("NTC")) {
                    return !absolute_value ? "ky/u" : "Lcr,y/u";
                }
                else if (IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "Ky/u" : "Ky/u * L";
                }
                else if (IsCurrentCodeOfStandard("IS") || IsCurrentCodeOfStandard("NBR")) {
                    return !absolute_value ? "Ky/u" : "Lcr,y/u";
                }
                else if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "Ky/u" : "LE,y/u";
                }
                else if (IsCurrentCodeOfStandard("AS")) {
                    return !absolute_value ? "ke,y/u" : "le,y/u";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μy/u" : "Lcr,y/u";
                }
                return "(" + GetCurrentCodeOfStandard() + " standard)";
            case "flexural_buckling_v":
                if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("GB")) {
                    return !absolute_value ? "kz/v" : "Lcr,z/v";
                }
                else if (IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "Kz/v" : "Kz/v * L";
                }
                else if (IsCurrentCodeOfStandard("IS") || IsCurrentCodeOfStandard("NBR")) {
                    return !absolute_value ? "Kz/v" : "Lcr,z/v";
                }
                else if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "Kz/v" : "LE,z/v";
                }
                else if (IsCurrentCodeOfStandard("AS")) {
                    return !absolute_value ? "ke,z/v" : "le,z/v";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μz/v" : "Lcr,z/v";
                }
                return "( " + GetCurrentCodeOfStandard() + " standard)";
            case "flexural_buckling_y":
                if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("GB") || IsCurrentCodeOfStandard("NTC")) {
                    return !absolute_value ? "ky" : "Lcr,y";
                }
                else if (IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "Ky" : "Ky * L";
                }
                else if (IsCurrentCodeOfStandard("IS") || IsCurrentCodeOfStandard("NBR")) {
                    return !absolute_value ? "Ky" : "Lcr,y";
                }
                else if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "Ky" : "LE,y";
                }
                else if (IsCurrentCodeOfStandard("AS")) {
                    return !absolute_value ? "ke,y" : "le,y";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μy" : "Lcr,y";
                }
                return "( " + GetCurrentCodeOfStandard() + " standard)";
            case "flexural_buckling_z":
                if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("GB")) {
                    return !absolute_value ? "kz" : "Lcr,z";
                }
                else if (IsCurrentCodeOfStandard("AISC")) {
                    return !absolute_value ? "Kz" : "Kz * L";
                }
                else if (IsCurrentCodeOfStandard("IS") || IsCurrentCodeOfStandard("NBR")) {
                    return !absolute_value ? "Kz" : "Lcr,z";
                }
                else if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "Kz" : "LE,z";
                }
                else if (IsCurrentCodeOfStandard("AS")) {
                    return !absolute_value ? "ke,z" : "le,z";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μz" : "Lcr,z";
                }
                return "( " + GetCurrentCodeOfStandard() + " standard)";
            case "torsional_buckling":
                if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("GB") || IsCurrentCodeOfStandard("NTC")) {
                    return !absolute_value ? "kT" : "Lcr,T";
                }
                else if (IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "KT" : "KT * L";
                }
                else if (IsCurrentCodeOfStandard("AS")) {
                    return !absolute_value ? "kx" : "lx";
                }
                else if (IsCurrentCodeOfStandard("NBR")) {
                    return !absolute_value ? "Kx" : "Lcr,T";
                }
                return "( " + GetCurrentCodeOfStandard() + " standard)";
            case "lateral_torsional_buckling":
                if (IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "KLT" : "Lb";
                }
                else if (IsCurrentCodeOfStandard("IS") || IsCurrentCodeOfStandard("NBR")) {
                    return !absolute_value ? "KLT" : "LLT";
                }
                else if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "KLT" : "LE,LT";
                }
                else if (IsCurrentCodeOfStandard("GB")) {
                    return !absolute_value ? "KL1" : "LL1";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μLT" : "LLT";
                }
                return "( " + GetCurrentCodeOfStandard() + " standard)";
            case "critical_moment":
                return "Mcr";
            case "lateral_torsional_buckling_top":
                if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "KLT, top" : "LE,LT, top";
                }
                else if (IsCurrentCodeOfStandard("GB")) {
                    return !absolute_value ? "KL1, top" : "LL1, top";
                }
                else if (IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "KLT, top" : "Lb, top";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μLT, top" : "LLT, top";
                }
                break;
            case "lateral_torsional_buckling_bottom":
                if (IsCurrentCodeOfStandard("BS")) {
                    return !absolute_value ? "KLT, bottom" : "LE,LT, bottom";
                }
                else if (IsCurrentCodeOfStandard("GB")) {
                    return !absolute_value ? "KL1, bottom" : "LL1, top";
                }
                else if (IsCurrentCodeOfStandard("CSA")) {
                    return !absolute_value ? "KLT, bottom" : "Lb, bottom";
                }
                else if (IsCurrentCodeOfStandard("SP")) {
                    return !absolute_value ? "μLT, bottom" : "LLT, bottom";
                }
                break;
            default:
                ASSERT(false, "Unknown value name (" + value_name + ")");
                return "??";
        }
    }
    effective_length.factors_definition_absolute = absolute_values;
    if (typeof flexural_buckling_u !== "undefined") {
        ASSERT(isPrincipalAxesUEnable(), "Flexural buckling u " + getSymbolicName("flexural_buckling_u", absolute_values) + " (principal axes) is not enabled");
        object_to_set[row].flexural_buckling_u = flexural_buckling_u;
    }
    if (typeof flexural_buckling_v !== "undefined") {
        ASSERT(isPrincipalAxesVEnable(), "Flexural buckling v " + getSymbolicName("flexural_buckling_v", absolute_values) + " (principal axes) is not enabled");
        object_to_set[row].flexural_buckling_v = flexural_buckling_v;
    }
    if (typeof flexural_buckling_y !== "undefined") {
        ASSERT(isGeometricalAxesYEnable(), "Flexural buckling y " + getSymbolicName("flexural_buckling_y", absolute_values) + " (geometrical axes) is not enabled");
        object_to_set[row].flexural_buckling_y = flexural_buckling_y;
    }
    if (typeof flexural_buckling_z !== "undefined") {
        ASSERT(isGeometricalAxesZEnable(), "Flexural buckling z " + getSymbolicName("flexural_buckling_z", absolute_values) + " (geometrical axes) is not enabled");
        object_to_set[row].flexural_buckling_z = flexural_buckling_z;
    }
    if (typeof torsional_buckling !== "undefined") {
        ASSERT(isTorsionalBucklingEnable(), "Torsional buckling " + getSymbolicName("torsional_buckling", absolute_values) + " is not enabled");
        object_to_set[row].torsional_buckling = torsional_buckling;
    }
    if (typeof lateral_torsional_buckling !== "undefined") {
        if (!isLateralTorsionalBucklingEnable() || isSteelDesignNodalSupportEccentricityEnable(row, effective_length) && effective_length.nodal_supports[row].eccentricity_type !== GetSteelDesignNodalSupportEccentricityType("NONE")) {
            ASSERT(false, "Lateral-torsional buckling " + getSymbolicName("lateral_torsional_buckling", absolute_values) + " cannot be set");
        }
        object_to_set[row].lateral_torsional_buckling = lateral_torsional_buckling;
    }
    if (typeof critical_moment !== "undefined") {
        ASSERT(isCriticalMomentEnable(), "Critical moment " + getSymbolicName("critical_moment", absolute_values) + " cannot be set");
        object_to_set[row].critical_moment = critical_moment;
    }
    if (typeof lateral_torsional_buckling_top !== "undefined") {
        ASSERT(isLateralTorsionalBucklingEccentricityTopEnable(effective_length), "Lateral-torsional buckling " + getSymbolicName("lateral_torsional_buckling_top", absolute_values) + " cannot be set");
        object_to_set[row].lateral_torsional_buckling_top = lateral_torsional_buckling_top;
    }
    if (typeof lateral_torsional_buckling_bottom !== "undefined") {
        ASSERT(isLateralTorsionalBucklingEccentricityBottomEnable(effective_length), "Lateral-torsional buckling " + getSymbolicName("lateral_torsional_buckling_bottom", absolute_values) + " cannot be set");
        object_to_set[row].lateral_torsional_buckling_bottom = lateral_torsional_buckling_bottom;
    }
};

function setSteelDesignEffectiveLengthsNodalSupports (effective_length,
    row,
    support_type,
    support_in_y,
    support_in_z,
    restraint_about_x,
    restraint_about_z,
    restraint_warping) {
    ASSERT(effective_length.flexural_buckling_about_y || effective_length.flexural_buckling_about_z || effective_length.torsional_buckling || effective_length.lateral_torsional_buckling, "No buckling is specified");
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
                    case "restraint_about_x":
                        values.push(effective_length.nodal_supports[i].restraint_about_x);
                        break;
                    case "restraint_about_z":
                        values.push(effective_length.nodal_supports[i].restraint_about_z);
                        break;
                    case "restraint_warping":
                        values.push(effective_length.nodal_supports[i].restraint_warping);
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
                    else if (value_name === "support_in_z") {
                        effective_length.nodal_supports[row].support_in_z = value_to_set;
                    }
                    else if (value_name === "restraint_about_x") {
                        effective_length.nodal_supports[row].restraint_about_x = value_to_set;
                    }
                    else if (value_name === "restraint_about_z") {
                        effective_length.nodal_supports[row].restraint_about_z = value_to_set;
                    }
                    else {
                        ASSERT(value_name === "restraint_warping", "setBoundaryConditionNodalSupports");
                        effective_length.nodal_supports[row].restraint_warping = value_to_set;
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
                return effective_length.flexural_buckling_about_z || effective_length.lateral_torsional_buckling;
            case "DIRECTION_ABOUT_X":
                if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("AISC") || IsCurrentCodeOfStandard("GB") ||
                    IsCurrentCodeOfStandard("CSA") || IsCurrentCodeOfStandard("AS") || IsCurrentCodeOfStandard("NTC") ||
                    IsCurrentCodeOfStandard("NBR") || IsCurrentCodeOfStandard("SIA")) {
                    return effective_length.torsional_buckling || effective_length.lateral_torsional_buckling;
                }
                else if (IsCurrentCodeOfStandard("IS") || IsCurrentCodeOfStandard("BS") || IsCurrentCodeOfStandard("SP")) {
                    effective_length.lateral_torsional_buckling;
                }
                else {
                    ASSERT(false, "Unknown standard (isSteelDesignEffectiveLengthDirectionEnabled function)")
                }
            case "DIRECTION_ABOUT_Z":
            case "DIRECTION_WARPING":
                return effective_length.lateral_torsional_buckling;
            default:
                ASSERT(false);
                return false;
            }
    }
    function isSupportTypeEnabled (support_type) {
        const supportTypeValues = {
            "NONE": [false, false, false, false, false],
            "FIXED_IN_Z": [true, false, false, false, false],
            "FIXED_IN_Y": [false, true, false, false, false],
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
    var support_false = GetSteelDesignSupportStatusType("SUPPORT_STATUS_NO");
    var support_true = GetSteelDesignSupportStatusType("SUPPORT_STATUS_YES");
    function setValues(support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_warping) {
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
        if (isDirectionEnabled(effective_length, "DIRECTION_ABOUT_X")) {
            checkUniqueValues(restraint_about_x, "restraint_about_x");
            effective_length.nodal_supports[row].restraint_about_x = restraint_about_x;
        }
        if (isDirectionEnabled(effective_length, "DIRECTION_ABOUT_Z")) {
            checkUniqueValues(restraint_about_z, "restraint_about_z");
            effective_length.nodal_supports[row].restraint_about_z = restraint_about_z;
        }
        if (isDirectionEnabled(effective_length, "DIRECTION_WARPING")) {
            checkUniqueValues(restraint_warping, "restraint_warping");
            effective_length.nodal_supports[row].restraint_warping = restraint_warping;
        }
    }
    function setEffectiveLengthSupportType(support_type) {
        var type = GetSteelDesignEffectiveLengthSupportType(support_type);
        switch (type) {
            case steel_effective_lengths.SUPPORT_TYPE_NONE:
                setValues(support_false, support_false, support_false, support_false, support_false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z:
                setValues(support_false, support_true, support_false, support_false, support_false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Y:
                setValues(support_true, support_false, support_false, support_false, support_false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_RESTRAINT_ABOUT_X:
                setValues(support_false, support_false, support_true, support_false, support_false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_AND_TORSION:
                setValues(support_false, support_true, support_true, support_false, support_false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION:
                setValues(support_true, support_true, support_true, support_false, support_false);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_AND_TORSION_AND_WARPING:
                setValues(support_false, support_true, support_true, support_false, support_true);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_IN_Z_Y_AND_TORSION_AND_WARPING:
                setValues(support_true, support_true, support_true, support_false, support_true);
                break;
            case steel_effective_lengths.SUPPORT_TYPE_FIXED_ALL:
                setValues(support_true, support_true, support_true, support_true, support_true);
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
        if (typeof restraint_about_x === "undefined") {
            restraint_about_x = support_false;
        }
        if (typeof restraint_about_z === "undefined") {
            restraint_about_z = support_false;
        }
        if (typeof restraint_warping === "undefined") {
            restraint_warping = support_false;
        }
        setValues(support_in_y, support_in_z, restraint_about_x, restraint_about_z, restraint_warping);
    }
}

function GetDeterminationOfElasticCriticalMoment (effective_length,
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

    return type;
}

function SetDeterminationOfElasticCriticalMoment (effective_length,
    mcr_type) {
    var type = GetDeterminationOfElasticCriticalMoment(effective_length, mcr_type);
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
    else if (IsCurrentCodeOfStandard("NTC"))
    {
        // No API enum for Determination of Mcr (NTC standard)
        return false;
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
			console.log("Wrong moment modification unrestrained type. Value was: " + moment_type);
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
			console.log("Wrong modification factor type. Value was: " + factor_type);
			console.log("Correct values are: ( " + Object.keys(factor_types) + ")");
			type = steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_BASIC_VALUE;
		}
        return type;
	}
	else {
		return steel_effective_lengths.AISI_MODIFICATION_FACTOR_CB_BASIC_VALUE;
	}
}

function GetSteelDesignEffectiveLengthSupportType(support_type) {
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

function GetSteelDesignSupportStatusType(support_status) {
	const support_status_dict = {
        "SUPPORT_STATUS_NO": steel_effective_lengths.SUPPORT_STATUS_NO,
        "SUPPORT_STATUS_SPRING": steel_effective_lengths.SUPPORT_STATUS_SPRING,
        "SUPPORT_STATUS_YES": steel_effective_lengths.SUPPORT_STATUS_YES
	};

	if (support_status !== undefined) {
		var type = support_status_dict[support_status];
		if (type === undefined) {
			console.log("Wrong type of support status. Value was: " + support_status);
			console.log("Correct values are: ( " + Object.keys(support_status_dict) + ")");
			type = steel_effective_lengths.SUPPORT_STATUS_NO;
		}
		return type;
	}
	else {
		return steel_effective_lengths.SUPPORT_STATUS_NO;
	}
}

function GetSteelDesignNodalSupportEccentricityType(eccentricity_type) {
	const eccentricity_types_dict = {
        /* Temporary comment, bug 72773
        "NONE": steel_effective_lengths.ECCENTRICITY_TYPE_NONE,
        "AT_UPPER_FLANGE": steel_effective_lengths.ECCENTRICITY_TYPE_AT_UPPER_FLANGE,
        "AT_LOWER_FLANGE": steel_effective_lengths.ECCENTRICITY_TYPE_AT_LOWER_FLANGE,
        "USER_VALUE": steel_effective_lengths.ECCENTRICITY_TYPE_USER_VALUE*/
        "NONE": 0,
        "AT_UPPER_FLANGE": 1,
        "AT_LOWER_FLANGE": 2,
        "USER_VALUE": 3
	};

	if (eccentricity_type !== undefined) {
		var type = eccentricity_types_dict[eccentricity_type];
		if (type === undefined) {
			console.log("Wrong eccentricity type. Value was: " + eccentricity_type);
			console.log("Correct values are: ( " + Object.keys(eccentricity_types_dict) + ")");
			type = steel_effective_lengths.ECCENTRICITY_TYPE_NONE;
		}
		return type;
	}
	else {
		return steel_effective_lengths.ECCENTRICITY_TYPE_NONE;
	}
}