include("../../includes/Tools/high_level_functions_support.js");
include("../../includes/AddOns/ConcreteDesign/ConcreteDesignSupport.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
run("../includes/Tools/clearAll.js");

var material = new Material(undefined, "C12/15");
var section = new Section(undefined, "IPE 80", material.GetNo());
if (RFEM) {
    var thickness = createThickness("0.250", material.GetNo(), thicknesses.TYPE_UNIFORM);
}
var memberList = [];
var surfaceList = [];

var nodeForMembers = createNodesGrid(-28, -28, [10, 3], [3, 2]);
for (var i = 0; i < nodeForMembers.length; i+=2) {
    var member = new Member();
    memberList.push(member);
    member.Beam(undefined, [i + 1, i + 2], section.GetNo());
}

var nodesForSurfaces = createNodesGrid(-28, -18, [10, 6], [3, 2]);
if (RFEM) {
    surface_dict = createSurfacesFromNodesGrid(nodesForSurfaces, [5, 3], surfaces.TYPE_STANDARD, thickness);
    for (var key in surface_dict) {
        surfaceList.push(surface_dict[key][0]);
    }
}

var t1 = new Date().getTime();

if (standard_index === undefined) {
    standard_index = 0; // EN standard
}

if (!PRERELEASE_MODE) {
    var concrete_design_standards = {
        0: general.NATIONAL_ANNEX_AND_EDITION_EN_1992_CEN_2014_11,
        1: general.NATIONAL_ANNEX_AND_EDITION_ACI_318_2019_CONCRETE_DESIGN,
        2: general.NATIONAL_ANNEX_AND_EDITION_CSA_A23_3_2019,
        3: general.NATIONAL_ANNEX_AND_EDITION_SP_63_13330_2018_12
    };
}
else {
    var concrete_design_standards = {
        0: general.NATIONAL_ANNEX_AND_EDITION_EN_1992_CEN_2014_11,
        1: general.NATIONAL_ANNEX_AND_EDITION_ACI_318_2019_CONCRETE_DESIGN,
        2: general.NATIONAL_ANNEX_AND_EDITION_CSA_A23_3_2019,
        3: general.NATIONAL_ANNEX_AND_EDITION_SP_63_13330_2018_12,
        4: general.NATIONAL_ANNEX_AND_EDITION_NTC_2018_01_CONCRETE_DESIGN
    };
}

if (standard_index >= Object.keys(concrete_design_standards).length) {
    console.log("start_index must be from range 0-" + (Object.keys(concrete_design_standards).length - 1).toString());
}

CONCRETE_DESIGN.setActive(true);
general.current_standard_for_concrete_design = concrete_design_standards[standard_index];

if (RFEM) {
    nodes[31].punching_design = true;
    nodes[32].punching_design = true;
}

switch (general.current_standard_for_concrete_design)
{
    case general.NATIONAL_ANNEX_AND_EDITION_EN_1992_CEN_2014_11:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        if (RFEM) {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationEN(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        }
        else {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationEN(undefined, undefined, [memberList[0].GetNo()]);
        }
        ultimateConfiguration.SetName("Ultimate configuration (EN)");
        ultimateConfiguration.Members_ConsiderInternalForces(false, undefined, true, false, false, false);
        ultimateConfiguration.Members_ReductionsOfInternalForcesInZ(true, true, false, true, true);
        ultimateConfiguration.Members_RequiredLongitudinalReinforcement("UNIFORMLY_SURROUNDING", 0.01, true, 0.99, false);
        ultimateConfiguration.Members_DetailingAndParticularRules(false, undefined, undefined, 0.0010, 0.0020, 0.0030, true, 0.05, undefined, true, "MAXIMUM_STIRRUP_SPACING_PROVIDED", false, false);
        ultimateConfiguration.Members_RequiredShearReinforcement("AUTOMATICALLY");
        ultimateConfiguration.Members_ShearJoint(undefined, "GENERAL_INTEGRATION_OF_AXIAL_STRESSES", true, 55000, true);
        ultimateConfiguration.Members_NeutralAxisDepthLimitation(true, 0.55);
        ultimateConfiguration.Members_CalculationSetting();
        if (PRERELEASE_MODE) {
            ultimateConfiguration.Members_FiberConcrete("BENDING_AND_SHEAR_DESIGN", "SDL3", false);
        }
        ultimateConfiguration.Stability_SlendernessAboutY(true, 0.8, true, 1.2, true, 0.9);
        ultimateConfiguration.Stability_SlendernessAboutZ(true, 0.8, true, 1.2, true, 0.9);
        ultimateConfiguration.Stability_LoadDistribution(false, 3);
        ultimateConfiguration.Stability_BiaxialBending(true, true);
        ultimateConfiguration.Stability_Curvature("USER_DEFINED", 0.9);
        ultimateConfiguration.Stability_RequiredReinforcement("UNIFORMLY_SURROUNDING", 0.005);
        if (RFEM) {
            ultimateConfiguration.FatigueDesign("DAMAGE_METHOD", true, "CORRECTION_FACTOR", 1.05);
            ultimateConfiguration.Surfaces_DesignMethod("NO");
            ultimateConfiguration.Surfaces_InternalForcesDiagramUsedForDesign(false);
            ultimateConfiguration.Surfaces_MinimumLongitudinalReinforcement(undefined, "PLATES", "DEFINED", [false, undefined, false]);
            ultimateConfiguration.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage(true, 0.1, 0.11, 0.12, 0.13);
            ultimateConfiguration.Surfaces_MaximumLongitudinalReinforcement(true, "WALLS");
            ultimateConfiguration.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage(true, 0.05);
            ultimateConfiguration.Surfaces_MinimumShearReinforcement(false);
            ultimateConfiguration.Surfaces_UserDefinedMinimumShearReinforcementPercentage(true, 0.01);
            ultimateConfiguration.Surfaces_RequiredLongitudinalReinforcement();
            ultimateConfiguration.Surfaces_RequiredShearReinforcement("PROVIDED");
            ultimateConfiguration.Surfaces_NeutralAxisDepthLimitation(true, 0.55);
            if (PRERELEASE_MODE) {
                ultimateConfiguration.Surfaces_FiberConcrete("SDL2", false);
            }
            ultimateConfiguration.Punching_StructuralElement("SLAB");
            if (PRERELEASE_MODE) {
                ultimateConfiguration.Punching_PunchingLoadForColumns("USER_DEFINED", 110E3, "PLUS_Z", true, true, 12E3);
                ultimateConfiguration.Punching_PunchingLoadForWalls("UNSMOOTHED_SHEAR_FORCE", true, true, 13E3);
            }
            ultimateConfiguration.Punching_DeductibleSurfaceLoadForSlab(true, "USER_DEFINED", undefined, 12E3, "K_D", 2);
            ultimateConfiguration.Punching_FactorBeta("USER_DEFINITION", 2);
            ultimateConfiguration.Punching_LoadedAreaOfPunchingNode(true, "RECTANGULAR", [0.401, 0.402, Math.PI / 10], true, 0.241, 0.201);
            ultimateConfiguration.Punching_BasicControlPerimeter(true, 0.3);
            ultimateConfiguration.Punching_MeanEffectiveDepth(true, 0.501, true, 0.021, 0.022);
            if (PRERELEASE_MODE) {
                ultimateConfiguration.Punching_PunchingShearReinforcement(0.101, true, true, 3, true, 0.305, 0.302, true, 2.001);
                ultimateConfiguration.Punching_AdditionalParameters(0.005, "SELECTED", 2);
                ultimateConfiguration.Punching_AxialForceDefinition(15E3);
            }
            ultimateConfiguration.Punching_RequiredPunchingReinforcement_PunchingShareCapacity("PROVIDED");
            ultimateConfiguration.Punching_MinimumReinforcement(false);
        }
    /****************************************************************** Serviceability configuration ***********************************************************************/
        if (RFEM) {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationEN(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        }
        else {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationEN(undefined, undefined, [memberList[1].GetNo()]);
        }
        serviceabilityConfiguration.SetName("Serviceability configuration (EN)");
        serviceabilityConfiguration.StressAnaLysis(true, false);
        // Bug 90054
        serviceabilityConfiguration.CrackAnalysisLimitValues(true, "02_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_PRESTRESSING", "03_EXPOSURE_CLASS_FROM_XS1_TO_XS3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING");
        serviceabilityConfiguration.DesignWithoutDirectCrackWidthCalculation(false, false);
        serviceabilityConfiguration.CrackAnalysisOther(0.99, true);
        if (RFEM) {
            serviceabilityConfiguration.EffectsDueToRestraint(true, "APPROACH_BENDING_RESTRAINT", "AREA_TOP_BOTTOM", false, false, false, true, true, 0.98);
        }
        else {
            serviceabilityConfiguration.EffectsDueToRestraint(true, "APPROACH_BENDING_RESTRAINT", "AREA_TOP_BOTTOM", undefined, undefined, undefined, undefined, true, 0.98);
        }
        serviceabilityConfiguration.DeflectionAnalysis(true, 251, 252, false, true, 0.501);
        serviceabilityConfiguration.CrackStateDetection("INDEPENDENT_OF_LOAD");
        if (PRERELEASE_MODE) {
            serviceabilityConfiguration.FiberConcrete("SDL2", false);
        }
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_ACI_318_2019_CONCRETE_DESIGN:
        /****************************************************************** Strength configuration ***************************************************************************/
        if (RFEM) {
            var strengthConfiguration = new ConcreteDesignStrengthConfigurationACI(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        }
        else {
            var strengthConfiguration = new ConcreteDesignStrengthConfigurationACI(undefined, undefined, [memberList[0].GetNo()]);
        }
        strengthConfiguration.SetName("Strength configuration (ACI)");
        strengthConfiguration.Members_ConsiderInternalForces(false, undefined, true, false, false, false);
        strengthConfiguration.Members_InternalForceReductionZ(true, false);
        strengthConfiguration.Members_RequiredLongitudinalReinforcement("IN_CORNERS_SYMMETRICAL_DISTRIBUTION", 0.05, false);
        if (PRERELEASE_MODE) {
            strengthConfiguration.Members_ProvidedLongitudinalReinforcement(false, true, true);
        }
        strengthConfiguration.Members_Factors(0.75, 0.95, 0.85);
        strengthConfiguration.Members_MinimumReinforcement(false, false, false);
        strengthConfiguration.Members_RequiredShearReinforcement("PROVIDED");
        strengthConfiguration.Members_TorsionCapacity("TORSION_COMPATIBILITY");
        strengthConfiguration.Members_ShearAndTorsionReinforcement("EQUATION_B", 0.8);
        strengthConfiguration.Members_NeutralAxisDepthLimitation(true, 0.7);
        strengthConfiguration.Members_CalculationSetting();
        strengthConfiguration.Members_EpoxyFactor("EPOXY_COATED_OR_ZINC");
        strengthConfiguration.Stability_UnbracedColumn(0.06, 0.07);
        strengthConfiguration.Stability_StiffnessReductionCoefficientToConsiderCreep("CALCULATED", 0.15, 0.25);
        strengthConfiguration.Stability_MomentMagnification("P_METHOD");
        strengthConfiguration.Stability_RequiredReinforcement("UNIFORMLY_SURROUNDING", 0.015);
        if (RFEM) {
            strengthConfiguration.Surfaces_DesignMethod("YES");
            strengthConfiguration.Surfaces_InternalForcesDiagramUsedForDesign(false);
            strengthConfiguration.Surfaces_Factors(0.75, 0.95, 0.85);
            strengthConfiguration.Surfaces_MinimumLongitudinalReinforcement(undefined, "WALLS", undefined, undefined, "DEFINED_IN_REINFORCEMENT_DIRECTION", "PHI_2", 2.6);
            strengthConfiguration.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage(true, 0.1, 0.11, 0.12, 0.13);
            strengthConfiguration.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage(true, 0.15);
            strengthConfiguration.Surfaces_MinimumShearReinforcement(false);
            strengthConfiguration.Surfaces_UserDefinedMinimumShearReinforcementPercentage(true, 0.15);
            strengthConfiguration.Surfaces_RequiredShearReinforcement("PROVIDED");
            strengthConfiguration.Surfaces_ShearAndTorsionReinforcement("MAX_OF_A_B", Math.PI / 5);
            strengthConfiguration.Surfaces_NeutralAxisDepthLimitation(true, 0.795);
            if (PRERELEASE_MODE) {
                strengthConfiguration.Punching_PunchingLoad(110E3, "SMOOTHED_SHEAR_FORCE", undefined, 5);
            }
            strengthConfiguration.Punching_AdditionalParameters(0.2);
            strengthConfiguration.Punching_Factors(1.0, 0.85);
        }
    /****************************************************************** Serviceability configuration ***********************************************************************/
        if (RFEM) {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationACI(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        }
        else {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationACI(undefined, undefined, [memberList[1].GetNo()]);
        }
        serviceabilityConfiguration.SetName("Serviceability configuration (ACI)");
        serviceabilityConfiguration.CrackAnalysis(true, false, true, true, "01_USE_IN_WATER_RETAINING_STRUCTURES", "04_DRY_AIR_OR_PROTECTIVE_MEMBRANE", undefined, undefined, undefined, true, false, false, false, false);
        serviceabilityConfiguration.DeflectionAnalysis(true, 241, 242, false, true, 0.501, undefined, undefined, 137788000); // 52 months in seconds
        serviceabilityConfiguration.CrackStateDetection("INDEPENDENT_OF_LOAD");
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_CSA_A23_3_2019:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        if (RFEM) {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationCSA(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        }
        else {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationCSA(undefined, undefined, [memberList[0].GetNo()]);
        }
        ultimateConfiguration.SetName("Ultimate configuration (CSA)");
        ultimateConfiguration.Members_ConsiderInternalForces(undefined, undefined, undefined, undefined, false, false);
        ultimateConfiguration.Members_InternalForceReductionZ(true, true, false);
        ultimateConfiguration.Members_RequiredLongitudinalReinforcement("TOP_BOTTOM_OPTIMIZED_DISTRIBUTION", 0.06, false);
        ultimateConfiguration.Members_Factors(0.75, 0.95, 0.96);
        ultimateConfiguration.Members_MinimumReinforcement(false, undefined, false);
        ultimateConfiguration.Members_RequiredShearReinforcement("REQUIRED");
        ultimateConfiguration.Members_ShearAndTorsionReinforcement("SPECIAL_MEMBERS", 0.5, Math.PI / 4);
        ultimateConfiguration.Members_NeutralAxisDepthLimitation(true, "AUTOMATICALLY");
        ultimateConfiguration.Members_CalculationSetting(true);
        ultimateConfiguration.Members_EpoxyFactor("EPOXY_COATED");
        ultimateConfiguration.Stability_UnbracedColumn(0.09, 0.10);
        ultimateConfiguration.Stability_RequiredReinforcement("IN_CORNERS_SYMMETRICAL_DISTRIBUTION", 0.035);
        if (RFEM) {
            ultimateConfiguration.Surfaces_DesignMethod("YES");
            ultimateConfiguration.Surfaces_InternalForcesDiagramUsedForDesign(false);
            ultimateConfiguration.Surfaces_Factors(0.75, 0.95, 0.85);
            ultimateConfiguration.Surfaces_MinimumLongitudinalReinforcement(true, "PLATES", "DEFINED", [true, false, true, false]);
            ultimateConfiguration.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage(true, 0.01, 0.02, 0.03, 0.04);
            ultimateConfiguration.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage(true, 0.15);
            ultimateConfiguration.Surfaces_MinimumShearReinforcement(false);
            ultimateConfiguration.Surfaces_UserDefinedMinimumShearReinforcementPercentage(true, 0.05);
            ultimateConfiguration.Surfaces_RequiredShearReinforcement("PROVIDED");
            ultimateConfiguration.Surfaces_ShearReinforcement("SPECIAL_SURFACES", 0.22, Math.PI / 4);
            ultimateConfiguration.Surfaces_NeutralAxisDepthLimitation(true, 0.895);
            if (PRERELEASE_MODE) {
                ultimateConfiguration.Punching_PunchingLoad(110E3, "SMOOTHED_SHEAR_FORCE", undefined, 5);
            }
            ultimateConfiguration.Punching_AdditionalParameters(0.111);
            ultimateConfiguration.Punching_Factors(0.651, 0.851);
        }
    /****************************************************************** Serviceability configuration ***********************************************************************/
        if (RFEM) {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationCSA(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        }
        else {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationCSA(undefined, undefined, [memberList[1].GetNo()]);
        }
        serviceabilityConfiguration.SetName("Serviceability configuration (CSA)");
        serviceabilityConfiguration.Exposure("EXTERIOR", "EXTERIOR", "EXTERIOR", "EXTERIOR", "EXTERIOR", "EXTERIOR");
        serviceabilityConfiguration.CrackAnalysis(false);
        serviceabilityConfiguration.SkinReinforcement();
        serviceabilityConfiguration.DeflectionAnalysis(true, 241, 242, false, true, 0.501, undefined, undefined, 137788000); // 52 months in seconds
        serviceabilityConfiguration.CrackStateDetection("DETERMINED_AS_ENVELOPE_FROM_ALL_DESIGN_SITUATIONS");
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_SP_63_13330_2018_12:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        if (RFEM) {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationSP(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        }
        else {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationSP(undefined, undefined, [memberList[0].GetNo()]);
        }
        ultimateConfiguration.SetName("Ultimate configuration (SP)");
        ultimateConfiguration.Members_ConsiderInternalForces(false, false, true, false, false, false);
        ultimateConfiguration.Members_FactorsOfConcreteServiceConditions(true, true, true, true);
        ultimateConfiguration.Members_InternalForceReductionZ(false, true);
        ultimateConfiguration.Members_RequiredLongitudinalReinforcement("IN_CORNERS_SYMMETRICAL_DISTRIBUTION", 0.030);
        ultimateConfiguration.Members_DesignSectionsTypesForShearAndTorsionDesignChecks("NORMAL_SECTION");
        ultimateConfiguration.Members_RequiredReinforcementMomentInInclinedSection("TRANSVERSE", "PROVIDED");
        ultimateConfiguration.Members_MinimumReinforcement(false, false);
        ultimateConfiguration.Members_NeutralAxisDepthLimitation(true, 0.595);
        ultimateConfiguration.Members_CalculationSetting(false);
        ultimateConfiguration.Stability_Slenderness(201, 202);
        ultimateConfiguration.Stability_MembersWithRectangularSectionAndLowSlenderness();
        ultimateConfiguration.Stability_BiaxialBending(true, true, true);
        ultimateConfiguration.Stability_LoadDirections(0.51, 0.52);
        ultimateConfiguration.Stability_LongTermLoadComponent(0.53, 0.54);
        ultimateConfiguration.Stability_RequiredReinforcement("TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION", 0.036);
        if (RFEM) {
            ultimateConfiguration.Surfaces_DesignMethod("NO");
            ultimateConfiguration.Surfaces_InternalForcesDiagramUsedForDesign(false);
            ultimateConfiguration.Surfaces_MinimumLongitudinalReinforcement(true, "PLATES", "DEFINED", [false, false, false, false]);
            ultimateConfiguration.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage(true, 0.11, 0.12, 0.13, 0.14);
            ultimateConfiguration.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage(true, 0.06);
            ultimateConfiguration.Surfaces_MinimumShearReinforcement(false);
            ultimateConfiguration.Surfaces_UserDefinedMinimumShearReinforcementPercentage(true, 0.05);
            ultimateConfiguration.Surfaces_NeutralAxisDepthLimitation(true, "AUTOMATICALLY");
            if (PRERELEASE_MODE) {
                ultimateConfiguration.Punching_PunchingLoad("SMOOTHED_SHEAR_FORCE", "PLUS_Z", 120E3, "MINUS_Z");
                ultimateConfiguration.Punching_AdditionalParameters_Perimeter(true, 0.39, true, 0.49, true, 3, true, 0.31, 0.21, true, 2.01);
                ultimateConfiguration.Punching_AdditionalParameters_Thickness(0.02, "SELECTED", 2);
            }
            ultimateConfiguration.Punching_NeutralAxisDepthLimitation(true, 0.81);
        }
    /****************************************************************** Serviceability configuration ***********************************************************************/
        if (RFEM) {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationSP(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        }
        else {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationSP(undefined, undefined, [memberList[1].GetNo()]);
        }
        serviceabilityConfiguration.SetName("Serviceability configuration (SP)");
        serviceabilityConfiguration.CrackStateDetection("ELASTIC");
        serviceabilityConfiguration.CrackWidthAnalysis(0.000201, 0.000202, 0.000203, 0.000204);
        serviceabilityConfiguration.DeflectionAnalysis(true, 121, 122, false, undefined, undefined, 0.70);
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_NTC_2018_01_CONCRETE_DESIGN:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        if (RFEM) {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationNTC(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        }
        else {
            var ultimateConfiguration = new ConcreteDesignUltimateConfigurationNTC(undefined, undefined, [memberList[0].GetNo()]);
        }
        ultimateConfiguration.SetName("Ultimate configuration (NTC)");
    /****************************************************************** Serviceability configuration ***********************************************************************/
        if (RFEM) {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationNTC(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        }
        else {
            var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationNTC(undefined, undefined, [memberList[1].GetNo()]);
        }
        serviceabilityConfiguration.SetName("Serviceability configuration (NTC)");
        break;
    default:
        ASSERT(false, "Unknown code of standard");
}

/********************************************** Types for concrete design - Effective length ********************************************************/
var memberForSetOfMembers = new Member();
memberForSetOfMembers.Beam(undefined, [14, 15], section.GetNo());
var memberSet = new MemberSet();
memberSet.ContinuousMembers(undefined, [memberList[6].GetNo(), memberForSetOfMembers.GetNo(), memberList[7].GetNo()]);

var effectiveLength = new ConcreteDesignEffectiveLength(undefined, [memberList[5].GetNo()], [memberSet.GetNo()], "Concrete design effective length");
effectiveLength.SetName("Test effective length");
effectiveLength.DeterminationType(true, true);
effectiveLength.StructureType("BRACED");
effectiveLength.NodalSupportsStartWithSupportType("FIXED_IN_Z");
effectiveLength.NodalSupportsEndWithSupportType("FIXED_IN_Y");
effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Z");
effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Y");
effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_ALL");
effectiveLength.OverwriteEffectiveLengths(1, 1.01, 1.02);
effectiveLength.OverwriteEffectiveLengths(2, undefined, 1.02);
effectiveLength.OverwriteEffectiveLengths(3, 1.03);
effectiveLength.OverwriteEffectiveLengths(4, 1.04, 1.05);

if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC")) {
    /********************************************** Types for concrete design - Durabilities ********************************************************/
    var memberForSetOfMembers2 = new Member();
    memberForSetOfMembers2.Beam(undefined, [18, 19], section.GetNo());
    var memberSet2 = new MemberSet();
    memberSet2.ContinuousMembers(undefined, [memberList[8].GetNo(), memberForSetOfMembers2.GetNo(), memberList[9].GetNo()]);
    
    if (RFEM) {
        var concreteDurability = new ConcreteDesignConcreteDurability(undefined, undefined, [surfaceList[2].no, surfaceList[3].no], undefined, "Concrete design concrete durabilities")
    }
    else {
        var concreteDurability = new ConcreteDesignConcreteDurability(undefined, undefined, undefined, undefined, "Concrete design concrete durabilities")
    }
    concreteDurability.SetName("Testing concrete durability object");
    concreteDurability.NoRiskOfCorrosionOrAttack(undefined, false);
    concreteDurability.CorrosionInducedByCarbonation("MODERATE_HUMIDITY");
    concreteDurability.CorrosionInducedByChlorides("CYCLIC_WET_AND_DRY");
    concreteDurability.CorrosionInducedByChloridesFromSeaWater("SPLASH_AND_SPRAY_ZONES");
    concreteDurability.FreezeThawAttack("HIGH_SATURATION_NO_DEICING");
    concreteDurability.ChemicalAttack("HIGHLY_AGGRESSIVE");
    concreteDurability.ConcreteCorrosionInducedByWear("HIGH");
    concreteDurability.StructuralClassAccordingTo4_4_1_2(true, true, true, true);
    concreteDurability.StainlessSteel("STANDARD");
    concreteDurability.AdditionalProtection(0.005);
    concreteDurability.AllowanceForDeviation("STANDARD", true, "DIRECTLY_AGAINST_SOIL");
}
else {
    console.log("Concrete durabilities is enabled only for EN and NTC");
}

if (RFEM) {
    /*************************************************** Types for concrete design - Reinforcement direction ****************************************************/
    var reinforcementDirection = new ConcreteDesignReinforcementDirection(undefined, [surfaceList[4].no, surfaceList[5].no], "Concrete design Reinforcement direction");
    reinforcementDirection.SetName("Reinforcement direction for test");
    reinforcementDirection.DirectionType("ROTATED");
    reinforcementDirection.DirectionRotations(Math.PI / 4, Math.PI / 2);

    /**************************************************** Types for concrete design - Surface reinforcement ****************************************************/
    var reinforcementMaterial = new Material(undefined, "Grade 40");
    var coordinateSystem = new CoordinateSystem();
    coordinateSystem.Offset(undefined, [1, 1, 0]);

    var surfaceReinforcement = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[6].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - mesh");
    surfaceReinforcement.SetName("Surface reinforcement - mesh");
    surfaceReinforcement.ReinforcementType("MESH");
    surfaceReinforcement.Assignment(0.010, 0.011);
    surfaceReinforcement.LocationType("ON_SURFACE");
    surfaceReinforcement.ReinforcementDirection("PARALLEL_TO_TWO_POINTS", 1.0, 1.0, 2.0, 2.0);
    surfaceReinforcement.Projection(coordinateSystem.GetNo(), "XZ_OR_UW");
    var surfaceReinforcement2 = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[7].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - rebar");
    surfaceReinforcement2.SetName("Surface reinforcement - rebar");
    surfaceReinforcement2.ReinforcementType("REBAR");
    surfaceReinforcement2.LocationType("FREE_RECTANGULAR");
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("SP")) {
        surfaceReinforcement2.RebarDiameter(0.015);
        surfaceReinforcement2.AdditionalRebarDiameter(0.009);
    }
    else {

    }
    surfaceReinforcement2.RebarSpacingAuto(0.101, 0.301, 0.011, 2);
    surfaceReinforcement2.AdditionalRebarSpacingAuto(0.012, 0.022, 0.016, 2);
    surfaceReinforcement2.Assignment(0);
    surfaceReinforcement2.ReinforcementDirection("IN_DESIGN_REINFORCEMENT_DIRECTION", "A_S_2");
    surfaceReinforcement2.ReinforcementLocationFreeRectangular("CORNER_POINTS", -15.65, -13.63, -13.36, -12.5, Math.PI / 4);
    var surfaceReinforcement3 = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[8].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - rebar (2)");
    surfaceReinforcement3.SetName("Surface reinforcement - rebar (2)");
    surfaceReinforcement3.LocationType("FREE_RECTANGULAR");
    surfaceReinforcement3.ReinforcementType("REBAR");
    surfaceReinforcement3.RebarDiameterAuto(0.011, 0.021, "0.008, 0.010, 0.012, 0.014", 2);
    surfaceReinforcement3.RebarSpacing(0.151);
    surfaceReinforcement3.AdditionalRebarSpacing(0.008);
    surfaceReinforcement3.AdditionalRebarDiameterAuto(0.012, 0.014, "0.008, 0.010, 0.012, 0.014, 0.016", 2);
    surfaceReinforcement3.Assignment(undefined, 0.005);
    surfaceReinforcement3.ReinforcementLocationFreeRectangular("CENTER_AND_SIDES", 1.0, 1.5, 2.0, 2.5);
    surfaceReinforcement3.ReinforcementActionRegion(-5, -6);
    var surfaceReinforcement4 = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[9].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - stirrups");
    surfaceReinforcement4.SetName("Surface reinforcement - stirrups")
    surfaceReinforcement4.ReinforcementType("STIRRUPS");
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("SP")) {
        surfaceReinforcement4.StirrupsDiameter(0.021);
    }
    else {

    }
    surfaceReinforcement4.StirrupsSpacingAuto(0.101, 0.301, 0.011, 3);
    var surfaceReinforcement5 = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[10].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - stirrups (2)");
    surfaceReinforcement5.SetName("Surface reinforcement - stirrups (2)")
    surfaceReinforcement5.ReinforcementType("STIRRUPS");
    surfaceReinforcement5.StirrupsDiameterAuto(0.011, 0.021, "0.008, 0.010", 2);
    surfaceReinforcement5.StirrupsSpacing(0.020);
    var surfaceReinforcement6 = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[8].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - rebar (3)");
    surfaceReinforcement6.SetName("Surface reinforcement - rebar (3)");
    surfaceReinforcement6.LocationType("FREE_CIRCULAR");
    surfaceReinforcement6.ReinforcementLocationFreeCircular(-8.5, -13.0, 0.8);
    var surfaceReinforcement7 = new ConcreteDesignSurfaceReinforcement(undefined, [surfaceList[10].no], reinforcementMaterial.GetNo(), "Concrete design Surface reinforcement - rebar (4)");
    surfaceReinforcement7.SetName("Surface reinforcement - rebar (4)");
    surfaceReinforcement7.LocationType("FREE_POLYGON");
    surfaceReinforcement7.ReinforcementLocationFreePolygon([[-28.0, -10.0, "Comment 1"], [-25.0, -10.0], [-26.5, -8.0, "Comment 2"]]);

    if (PRERELEASE_MODE) {
        /**************************************************** Types for concrete design - Punching reinforcement ****************************************************/
        if (!IsCurrentCodeOfStandard("SP")) {
            var materialForPunching = new Material(undefined, "Grade 40");
        }
        else {
            var materialForPunching = new Material(undefined, "B500 (transverse reinforcement)");
        }

        var punchingReinforcement = new ConcreteDesignPunchingReinforcement(undefined, [75, 76, 85, 86], materialForPunching.GetNo(), "Punching reinforcement for test");
        punchingReinforcement.SetName("Punching reinforcement 1");
        punchingReinforcement.Type("VERTICAL");
        punchingReinforcement.Placement("AUTOMATICALLY");
        punchingReinforcement.Options(true, false);
        punchingReinforcement.BendUpDiameter(true);
    }

    /***************************************** Concrete design for surfaces ****************************************************/
    var nodesForSurfaces2 = createNodesGrid(-28, -4, [4, 2], [3, 2]);
    var surface_dict2 = createSurfacesFromNodesGrid(nodesForSurfaces2, [2, 1], undefined, undefined, true);
    var surfaceList2 = [];
    for (var i = 0; i < Object.keys(surface_dict2).length; ++i) {
        var surface = new Surface();
        surface.Standard(undefined, surface_dict2[i + 1][0], thickness.no);
        surface.ConcreteDesignProperties();
        surfaceList2.push(surface);
    }

    surfaceList2[0].UserDefinedConcreteCover(0.035, 0.036);
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC")) {
        surfaceList2[0].ConcreteDesignConcreteDurability(1, 2);
    }
    surfaceList2[0].ConcreteDesignReinforcementDirections(1, 2);
    surfaceList2[0].ConcreteDesignSurfaceReinforcement([1, 3, 5, 7]);

    surfaceList2[1].ConcreteCoverAccToEn1992();
    if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC")) {
        surfaceList2[1].ConcreteDesignConcreteDurability(2, 1);
    }
    surfaceList2[1].ConcreteDesignReinforcementDirections(2, 1);
    surfaceList2[1].ConcreteDesignSurfaceReinforcement([2, 4, 6]);
    surfaceList2[1].Assignments(2, 1);
    surfaceList2[1].DeflectionAnalysis("CANTILEVER", "DEFORMED_USER_DEFINED_REFERENCE_PLANE", "MANUALLY", 5.0);
    surfaceList2[1].UserDefinedReferencePlane([-21.6, -3.7, 0, -19.6, -3.5, 0, -20.5, -2.5, 0]);
}

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");