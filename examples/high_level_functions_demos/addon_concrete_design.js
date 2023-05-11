include("../../includes/Tools/high_level_functions_support.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
run("../includes/Tools/clearAll.js");

var material = new Material(undefined, "C12/15");
var section = new Section(undefined, "IPE 80", material.GetNo());
var thickness = createThickness("0.250", material.GetNo(), thicknesses.TYPE_UNIFORM);
var memberList = [];
var surfaceList = [];

var nodeForMembers = createNodesGrid(-28, -28, [10, 3], [3, 2]);
for (var i = 0; i < nodeForMembers.length; i+=2) {
    var member = new Member();
    memberList.push(member);
    member.Beam(undefined, [i + 1, i + 2], section.GetNo());
}

var nodesForSurfaces = createNodesGrid(-28, -18, [10, 4], [3, 2]);
surface_dict = createSurfacesFromNodesGrid(nodesForSurfaces, [5, 2], surfaces.TYPE_STANDARD, thickness);
for (var key in surface_dict) {
    surfaceList.push(surface_dict[key][0]);
}

var t1 = new Date().getTime();

if (standard_index === undefined) {
    standard_index = 0; // EN standard
}

const concrete_design_standards = {
    0: general.NATIONAL_ANNEX_AND_EDITION_EN_1992_CEN_2014_11,
    1: general.NATIONAL_ANNEX_AND_EDITION_ACI_318_2019_CONCRETE_DESIGN,
    2: general.NATIONAL_ANNEX_AND_EDITION_CSA_A23_3_2019,
    3: general.NATIONAL_ANNEX_AND_EDITION_SP_63_13330_2018_12,
    4: general.NATIONAL_ANNEX_AND_EDITION_NTC_2018_01_CONCRETE_DESIGN
};

CONCRETE_DESIGN.setActive(true);
general.current_standard_for_concrete_design = concrete_design_standards[standard_index];

nodes[31].punching_design = true;
nodes[32].punching_design = true;

switch (general.current_standard_for_concrete_design)
{
    case general.NATIONAL_ANNEX_AND_EDITION_EN_1992_CEN_2014_11:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        var ultimateConfiguration = new ConcreteDesignUltimateConfigurationEN(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
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
    /****************************************************************** Serviceability configuration ***********************************************************************/
        var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationEN(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        serviceabilityConfiguration.SetName("Serviceability configuration (EN)");
        serviceabilityConfiguration.StressAnaLysis(true, false);
        // Bug 90054
        serviceabilityConfiguration.CrackAnalysisLimitValues(true, "02_EXPOSURE_CLASS_FROM_XC2_TO_XC4_STRUCTURAL_ELEMENT_PRESTRESSING", "03_EXPOSURE_CLASS_FROM_XS1_TO_XS3_STRUCTURAL_ELEMENT_REINFORCEMENT_CONCRETE_UNBONDED_PRESTRESSING");
        serviceabilityConfiguration.DesignWithoutDirectCrackWidthCalculation(false, false);
        serviceabilityConfiguration.CrackAnalysisOther(0.99, true);
        serviceabilityConfiguration.EffectsDueToRestraint(true, "APPROACH_BENDING_RESTRAINT", "AREA_TOP_BOTTOM", false, false, false, true, true, 0.98);
        serviceabilityConfiguration.DeflectionAnalysis(true, 251, 252, false, true, 0.501);
        serviceabilityConfiguration.CrackStateDetection("INDEPENDENT_OF_LOAD");
        serviceabilityConfiguration.FiberConcrete("SDL2", false);
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_ACI_318_2019_CONCRETE_DESIGN:
    /****************************************************************** Strength configuration ***************************************************************************/
        var strengthConfiguration = new ConcreteDesignStrengthConfigurationACI(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
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
    /****************************************************************** Serviceability configuration ***********************************************************************/
        var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationACI(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        serviceabilityConfiguration.SetName("Serviceability configuration (ACI)");
        serviceabilityConfiguration.CrackAnalysis(true, false, true, true, "01_USE_IN_WATER_RETAINING_STRUCTURES", "04_DRY_AIR_OR_PROTECTIVE_MEMBRANE", undefined, undefined, undefined, true, false, false, false, false);
        serviceabilityConfiguration.DeflectionAnalysis(true, 241, 242, false, true, 0.501, undefined, undefined, 137788000); // 52 months in seconds
        serviceabilityConfiguration.CrackStateDetection("INDEPENDENT_OF_LOAD");
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_CSA_A23_3_2019:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        var ultimateConfiguration = new ConcreteDesignUltimateConfigurationCSA(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
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
    /****************************************************************** Serviceability configuration ***********************************************************************/
        var serviceabilityConfiguration = new ConcreteDesignServiceabilityConfigurationCSA(undefined, [surfaceList[1].no], [memberList[1].GetNo()]);
        serviceabilityConfiguration.SetName("Serviceability configuration (CSA)");
        serviceabilityConfiguration.Exposure("EXTERIOR", "EXTERIOR", "EXTERIOR", "EXTERIOR", "EXTERIOR", "EXTERIOR");
        serviceabilityConfiguration.CrackAnalysis(false);
        serviceabilityConfiguration.SkinReinforcement();
        serviceabilityConfiguration.DeflectionAnalysis(true, 241, 242, false, true, 0.501, undefined, undefined, 137788000); // 52 months in seconds
        serviceabilityConfiguration.CrackStateDetection("DETERMINED_AS_ENVELOPE_FROM_ALL_DESIGN_SITUATIONS");
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_SP_63_13330_2018_12:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        var ultimateConfiguration = new ConcreteDesignUltimateConfigurationSP(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
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
    /****************************************************************** Serviceability configuration ***********************************************************************/
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_NTC_2018_01_CONCRETE_DESIGN:
    /****************************************************************** Ultimate configuration ***************************************************************************/
        var ultimateConfiguration = new ConcreteDesignUltimateConfigurationNTC(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        ultimateConfiguration.SetName("Ultimate configuration (NTC)");
        break;
    /****************************************************************** Serviceability configuration ***********************************************************************/
    default:
        ASSERT(false, "Unknown code of standard");
}

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");;