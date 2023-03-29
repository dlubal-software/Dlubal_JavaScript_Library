if (!PRERELEASE_MODE) {
    throw new Error("This script uses some prerelease functionality.");
}

/*
Effective length	Boundary condition	Local section red.	Ultimate conf.	Serviceability conf.	Fire resistance conf.	Strength conf.	Seismic configuration
EN	                EN	                EN	                EN	            EN	                    EN		
AISC		                            AISC		                        AISC		                                    AISC	        AISC
IS		                                IS	                IS	            IS			
BS		                                BS	                BS	            BS			
GB		                                GB	                GB	            GB			
CSA		                                CSA	                CSA	            CSA			                                                    CSA
AS		                                AS	                AS	            AS			
SP		                                SP	                SP	            SP			
NTC                 NTC	                NTC	                NTC	            NTC	                    NTC		
NBR		                                NBR	                NBR	            NBR			
SIA		                                SIA	                SIA	            SIA
*/

include("../../includes/Tools/high_level_functions_support.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
run("../includes/Tools/clearAll.js");

function IsCurrent (current_standard) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	var current = general.current_standard_for_steel_design.match(/\w+/);
    return current == current_standard;  // Don't use === (we don't want compare types of strings, only its string's values)
}

var t1 = new Date().getTime();

if (standard_index === undefined) {
    standard_index = 1;
}

const steel_design_standards = {
    0: "EN 1993 | CEN | 2015-06",
    1: "AISC 360 | 2016",
    2: "IS 800 | 2007-12",
    3: "BS 5950 | 2001-05",
    4: "GB 50017 | 2017-12",
    5: "CSA S16 | 2019",
    6: "AS 4100 | 2016-06",
    7: "SP 16.13330 | 2017-02",
    8: "NTC | 2018-01",
    9: "NBR 8800 | 2008-08",
    10: "SIA 263 | 2013-01"
};

var material = new Material(undefined, "S235");
var section = new Section(undefined, "IPE 80", material.GetNo());
var memberList = [];

var nodeForMembers = createNodesGrid(-28, -28, [12, 3], [3, 2]);
for (var i = 0; i < nodeForMembers.length; i+=2) {
    var member = new Member();
    memberList.push(member);
    member.Beam(undefined, [i + 1, i + 2], section.GetNo());
}

STEEL_DESIGN.setActive(true);
general.current_standard_for_steel_design = steel_design_standards[standard_index];

/********************************************** Ultimate, Serviceability, Fire resistance configurations *****************************************************************/
if (RFEM) {
    switch (general.current_standard_for_steel_design)
    {
        case "EN 1993 | CEN | 2015-06": // 0
            var steelDesignUltimateConfigurationEC3 = new SteelDesignUltimateConfigurationEC3(undefined, "EC3 Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationEC3.General(true);
            steelDesignUltimateConfigurationEC3.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationEC3.ThinWalledAnalysis(5, 0.015, true, true);
            steelDesignUltimateConfigurationEC3.Options(true, true, true);
            steelDesignUltimateConfigurationEC3.DesignOfColdFormedSection(true, "OTHER_METHODS_OF_FORMING");
            steelDesignUltimateConfigurationEC3.DesignOfShearBuckling(true);
            steelDesignUltimateConfigurationEC3.StabilityAnalyses(true);
            steelDesignUltimateConfigurationEC3.CalculationMethod(true, true, false, true, undefined, true, false);
            steelDesignUltimateConfigurationEC3.SecondOrderEffects(true, 1.250, true, 1.350);
            steelDesignUltimateConfigurationEC3.PositionOfPositiveTransverse(undefined, undefined, undefined, true);
            steelDesignUltimateConfigurationEC3.LateralTorsionalBuckling(true, undefined, false, false);
            steelDesignUltimateConfigurationEC3.Parameters(true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "EC3 Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersEC3(400, 500, 600, 450, 550, 650, 0.006, true, undefined, true);
            var steelDesignFireResistanceConfigurationEC3 = new SteelDesignFireResistanceConfiguration(undefined, "EC3 Fire resistance configuration for testing", [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationEC3.FinalTemperature("ANALYTICALLY");
            steelDesignFireResistanceConfigurationEC3.AnalyticallyDesignSettings(1200, 6.5, "3_SIDES", undefined, true, 1.5);
            steelDesignFireResistanceConfigurationEC3.AnalyticallyFireProtection("HOLLOW", 333, 0.111, 1222, 0.011);
            steelDesignFireResistanceConfigurationEC3.AnalyticallyTemperatureCurve(undefined, true, undefined, 30);
            steelDesignFireResistanceConfigurationEC3.AnalyticallyThermalActions(0.999, 0.8, 0.5, 0.777, undefined, 0.888);
            var steelDesignFireResistanceConfigurationEC3_2 = new SteelDesignFireResistanceConfiguration(undefined, "EC3 Fire resistance configuration for testing", [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationEC3_2.FinalTemperature("MANUALLY");
            steelDesignFireResistanceConfigurationEC3_2.ManuallyFinalTemperature(undefined, "3_SIDES", true);
            break;
        case "AISC 360 | 2016": // 1
            var steelDesignStrengthConfigurationAISC = new SteelDesignStrengthConfigurationAISC(undefined, "AICS Strength configuration for testing", [1]);
            steelDesignStrengthConfigurationAISC.General(true);
            steelDesignStrengthConfigurationAISC.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignStrengthConfigurationAISC.LocalBuckling(true);
            steelDesignStrengthConfigurationAISC.LocalBuckling(true, 13.5, 42.5);
            steelDesignStrengthConfigurationAISC.PositionOfPositiveTransverse(undefined, undefined, true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "AISC Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersAISC(200, 300);
            break;
        case "IS 800 | 2007-12":    // 2
            var steelDesignUltimateConfigurationIS = new SteelDesignUltimateConfigurationIS(undefined, "IS Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationIS.General(true);
            steelDesignUltimateConfigurationIS.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationIS.ElasticDesign(true);
            steelDesignUltimateConfigurationIS.DesignOfShearBuckling(true, undefined, true);
            steelDesignUltimateConfigurationIS.Combined(true);
            steelDesignUltimateConfigurationIS.CalculationMethod(true, true);
            steelDesignUltimateConfigurationIS.PositionOfPositiveTransverse(undefined, true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "IS Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersIS(200, 300);
            break;
        case "BS 5950 | 2001-05":   // 3
            var steelDesignUltimateConfigurationBS = new SteelDesignUltimateConfigurationBS(undefined, "BS Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationBS.General(true);
            steelDesignUltimateConfigurationBS.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationBS.Options(true,true);
            steelDesignUltimateConfigurationBS.PositionOfPositiveTransverse(undefined, undefined, true);
            steelDesignUltimateConfigurationBS.EquivalentUniformMomentFactors(undefined, true, 0.500, undefined, true, 0.600, true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "BS Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersBS(300, 400, 0.01);
            break;
        case "GB 50017 | 2017-12":  // 4
            var steelDesignUltimateConfigurationGB = new SteelDesignUltimateConfigurationGB(undefined, "GB Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationGB.General(true);
            steelDesignUltimateConfigurationGB.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationGB.Options(true, false, true);
            steelDesignUltimateConfigurationGB.ImportanceFactorOfStructure(true, 1.5);
            steelDesignUltimateConfigurationGB.AnotherStandard(true, 1.1);
            steelDesignUltimateConfigurationGB.StabilityAnalysis(undefined, undefined, true);
            steelDesignUltimateConfigurationGB.OverallStabilityFactor(true, 0.1);
            steelDesignUltimateConfigurationGB.PositionOfPositiveTransverse(undefined, undefined, undefined, true);
            steelDesignUltimateConfigurationGB.LocalStability(true);
            steelDesignUltimateConfigurationGB.WeldedSection(undefined, undefined, true);
            steelDesignUltimateConfigurationGB.GeneralSections("A", "B");
            steelDesignUltimateConfigurationGB.ImaginaryAxis1(0.3);
            steelDesignUltimateConfigurationGB.EquivalentMomentFactors(true, true, 0.5, undefined, true, true, 0.4, undefined, 0.1, 0.2);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "GB Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersGB(1100, 1200, 501, 502);
            break;
        case "CSA S16 | 2019":  // 5
            var steelDesignUltimateConfigurationCSA = new SteelDesignUltimateConfigurationCSA(undefined, "CSA Ultimate configuration for testing", [1])
            steelDesignUltimateConfigurationCSA.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationCSA.Options(true, undefined, true, undefined, true, 0.9, 0.95);
            steelDesignUltimateConfigurationCSA.StructureType(true, true);
            steelDesignUltimateConfigurationCSA.PositionOfPositiveTransverse(undefined, true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "CSA Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersCSA(300, 400);
            break;
        case "AS 4100 | 2016-06":   // 6
            var steelDesignUltimateConfigurationAS = new SteelDesignUltimateConfigurationAS(undefined, "AS Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationAS.General(true);
            steelDesignUltimateConfigurationAS.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationAS.Options(true, true, true);
            steelDesignUltimateConfigurationAS.SectionManufacture(true, "CF");
            steelDesignUltimateConfigurationAS.PositionOfPositiveTransverse(undefined, undefined, true);
            steelDesignUltimateConfigurationAS.FabricationOfWeldedSections(undefined, true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "AS Serviceability configuration for testing", [2]);
            steelDesignServiceabilityConfiguration.DesignParametersAS(101, 102, 103, 104);
            break;
        case "SP 16.13330 | 2017-02":   // 7
            var steelDesignUltimateConfigurationSP = new SteelDesignUltimateConfigurationSP(undefined, "SP Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationSP.General(true);
            steelDesignUltimateConfigurationSP.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationSP.ServiceFactor(0.95);
            steelDesignUltimateConfigurationSP.PartialSafetyFactor(1.12);
            steelDesignUltimateConfigurationSP.Options(true);
            steelDesignUltimateConfigurationSP.LoadSafetyCoefficient(true, 1.1);
            steelDesignUltimateConfigurationSP.DesignParameters(0.06, 0.07, undefined, true);
            var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, "SP Serviceability configuration for testing", [2], undefined, "Last test example");
            steelDesignServiceabilityConfiguration.DesignParametersSP(101, 102);
            break;
        case "NTC | 2018-01":   // 8 (API support is missing)
            var steelDesignUltimateConfigurationNTC = new SteelDesignUltimateConfigurationNTC(undefined, "NTC Ultimate configuration for testing", [1]);
            var steelDesignFireResistanceConfigurationNTC = new SteelDesignFireResistanceConfiguration(undefined, "NTC Fire resistance configuration for testing", [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationNTC.FinalTemperature("ANALYTICALLY");
            steelDesignFireResistanceConfigurationNTC.AnalyticallyDesignSettings(1200, 6.5, "3_SIDES", undefined, true, 1.5);
            steelDesignFireResistanceConfigurationNTC.AnalyticallyFireProtection("HOLLOW", 333, 0.111, 1222, 0.011);
            steelDesignFireResistanceConfigurationNTC.AnalyticallyTemperatureCurve(undefined, true, undefined, 30);
            steelDesignFireResistanceConfigurationNTC.AnalyticallyThermalActions(0.999, 0.8, 0.5, 0.777, undefined, 0.888);
            var steelDesignFireResistanceConfigurationNTC_2 = new SteelDesignFireResistanceConfiguration(undefined, "NTC Fire resistance configuration for testing", [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationNTC_2.FinalTemperature("MANUALLY");
            steelDesignFireResistanceConfigurationNTC_2.ManuallyFinalTemperature(undefined, "3_SIDES", true);
            break;
        case "NBR 8800 | 2008-08":  // 9
            var steelDesignUltimateConfigurationNBR = new SteelDesignUltimateConfigurationNBR(undefined, "NBR Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationNBR.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08);
            steelDesignUltimateConfigurationNBR.Options(0.9, false);
            steelDesignUltimateConfigurationNBR.PositionOfPositiveTransverse(undefined, true);
            break;
        case "SIA 263 | 2013-01":   // 10
            var steelDesignUltimateConfigurationSIA = new SteelDesignUltimateConfigurationSIA(undefined, "SIA Ultimate configuration for testing", [1]);
            steelDesignUltimateConfigurationSIA.LimitValues(0.002, 0.003, 0.004, 0.05, 0.006, 0.007);
            steelDesignUltimateConfigurationSIA.PositionOfPositiveTransverse(undefined, undefined, true);
            break;
        default:
            ASSERT(false);
    }
}

if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC")) {
    /******************************************************* Types for Steel designs - Boundary conditions ********************************************************/
    var boundaryCondition = new SteelDesignBoundaryCondition(undefined, undefined, [3], undefined, "Steel design boundary condition");
    boundaryCondition.DifferentPropertiesForNodalSupports();
    boundaryCondition.NodalSupportsStartWithSupportType("FIXED_IN_Y");                          // Node sequence Start
    boundaryCondition.SetAdditionalParametersForStart(0.1, "AT_UPPER_FLANGE", 0.05);
    boundaryCondition.NodalSupportsEndWithIndividuallySupportType(true, true, true, false);     // Node sequence End
    boundaryCondition.SetAdditionalParametersForEnd(0.2, "USER_VALUE", 0.1, 0.05);
    boundaryCondition.NodalSupportsEndEdit();
    boundaryCondition.MemberHingesForStart(true, true, true, true);
    boundaryCondition.MemberHingesForEnd(false, true, false, true);
    boundaryCondition.DifferentPropertiesForMemberHinges(false);

    var boundaryCondition2 = new SteelDesignBoundaryCondition(undefined, "User defined name", [4], undefined, "Steel design boundary condition with intermediate nodes");
    boundaryCondition2.DifferentPropertiesForNodalSupports(false);
    boundaryCondition2.NodalSupportsStartWithSupportType("FIXED_IN_Y");                              // Node sequence Start
    boundaryCondition2.SetAdditionalParametersForStart(0.1, "AT_UPPER_FLANGE", 0.05);
    boundaryCondition2.NodalSupportsEndWithIndividuallySupportType(true, true, true, true);     // Node sequence End
    boundaryCondition2.SetAdditionalParametersForEnd(0.2, "USER_VALUE", 0.1, 0.05);
    boundaryCondition2.IntermediateNodes();
    boundaryCondition2.InsertNodalSupportIntermediateNode(true, true, true, true);
    boundaryCondition2.InsertNodalSupportIntermediateNode(true, true, true, true);
    boundaryCondition2.SetAdditionalParametersForIntermediateRow(3, 0.1, "USER_VALUE", 0.2, 0.07);  // second intermediate node
    boundaryCondition2.NodalSupportsEndEdit();
    boundaryCondition2.DifferentPropertiesForMemberHinges();
    boundaryCondition2.MemberHingesForStart(true, true, true, true);
    boundaryCondition2.MemberHingesForEnd(false, true, false, true);
    boundaryCondition2.SetMemberHingeIntermediateNode(5, true, false, true, false);
}

/******************************************************* Types for Steel designs - Effective lengths ********************************************************/
switch (general.current_standard_for_steel_design)
{
    case "EN 1993 | CEN | 2015-06": // 0
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (EN)");
        effectiveLength.DeterminationType(false, false, true, true, "EUROPE_USER_DEFINED");
        effectiveLength.BucklingAxes(false, true);
        effectiveLength.DifferentPropertiesForNodalSupports(false);
        effectiveLength.NodalSupportsStartWithSupportType("FIXED_IN_Y");
        effectiveLength.NodalSupportsEndWithSupportType("FIXED_ALL");
        break;
    case "AISC 360 | 2016": // 1
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (AISC)");
        effectiveLength.BucklingFactorType("RECOMMENDED");
        effectiveLength.EffectiveLengthsAccToStandard("AISI_S100");
        effectiveLength.DeterminationType(true, false, false, true, "ACC_TO_CHAPTERS_E2_F21");
        effectiveLength.ModificationFactor("CB_USER_DEFINED", 1.5);
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Z_AND_TORSION");
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Z");
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Y");
        effectiveLength.Eccentricity(4, "USER_VALUE", 0.055);
        break;
    case "IS 800 | 2007-12":    // 2
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (IS)");
        effectiveLength.DeterminationType(true, false, undefined, false);
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("NONE");
        break;
    case "BS 5950 | 2001-05":   // 3
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (BS)");
        effectiveLength.DeterminationType(true, true, undefined, true, "BS5_ACC_TO_ANNEX_B");
        effectiveLength.BucklingAxes(undefined, true);
        effectiveLength.NodalSupportsStartWithSupportType("FIXED_IN_Y");
        effectiveLength.NodalSupportsEndWithSupportType("FIXED_IN_Z");
        const support_types = ["FIXED_IN_Z", "FIXED_IN_Y", "RESTRAINT_ABOUT_X", "FIXED_IN_Z_AND_TORSION",
            "FIXED_IN_Z_Y_AND_TORSION", "FIXED_IN_Z_AND_TORSION_AND_WARPING", "FIXED_IN_Z_Y_AND_TORSION_AND_WARPING",
            "FIXED_ALL"];
        for (var i = 0; i < support_types.length; ++i) {
            effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType(support_types[i]);
        }
        // Start node sequence
        effectiveLength.OverwriteEffectiveLengths(1, 1.001, 1.002, 1.003, 1.004, undefined, 1.005);
        // Node seq. .1
        effectiveLength.OverwriteEffectiveLengths(2, 1.006, undefined, 1.007, undefined, undefined);
        break;
    case "GB 50017 | 2017-12":  // 4
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (GB)");
        effectiveLength.DeterminationType(false, false, false, true, "GB50_NOT_USED");
        effectiveLength.MemberType(undefined, "CANTILEVER", "CANTILEVER");
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Y");
        effectiveLength.Eccentricity(2, "AT_UPPER_FLANGE");
        // Start node sequence
        effectiveLength.EffectiveLengthFactors(1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1.01, 1.02);
        // Node seq. .1
        effectiveLength.EffectiveLengthFactors(2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1.5);
        break;
    case "CSA S16 | 2019":  // 5
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (CSA)");
        effectiveLength.DeterminationType(undefined, undefined, undefined, undefined, "CSA_ACC_TO_CHAPTER_13_6");
        effectiveLength.MemberType("CANTILEVER");
        effectiveLength.BucklingFactorType("RECOMMENDED");
        //effectiveLength.ModificationFactor("CB_USER_DEFINED", 2.5); There is no support for Modification factor for CSA and NBR standards? Only for AISC?
        break;
    case "AS 4100 | 2016-06":   // 6
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (AS)");
        effectiveLength.BucklingFactorType("RECOMMENDED");
        effectiveLength.BucklingAxes(false, true);
        effectiveLength.SegmentsRestrainedBothEnds("USER_DEFINED", 2.0/*, "EIGENVALUE_METHOD"*/);   // API enum bug?
        effectiveLength.SegmentsUnrestrainedOneEnd("USER_DEFINED", 2.5);
        break;
    case "SP 16.13330 | 2017-02":   // 7
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (SP)");
        effectiveLength.DeterminationType(false, false, undefined, true);
        effectiveLength.MemberType("CANTILEVER");
        break;
    case "NTC | 2018-01":   // 8
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (NTC)");
        effectiveLength.DeterminationType(undefined, undefined, undefined, undefined);  // No API enum for Determination of Mcr (NTC standard)
        break;
    case "NBR 8800 | 2008-08":  // 9
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (NBR)");
        effectiveLength.DeterminationType(false, false, false);
        //effectiveLength.ModificationFactor("CB_USER_DEFINED", 1.8); There is no support for Modification factor for CSA and NBR standards? Only for AISC?
        break;
    case "SIA 263 | 2013-01":   // 10
        var effectiveLength = new SteelDesignEffectiveLength(undefined, "User defined name for effective length", [5], undefined, "Steel design effective length (SIA)");
        effectiveLength.DifferentPropertiesForNodalSupports();
        effectiveLength.NodalSupportsStartWithSupportType("FIXED_IN_Z_Y_AND_TORSION");
        effectiveLength.NodalSupportsEndWithSupportType("RESTRAINT_ABOUT_X");
        break;
    default:
        ASSERT(false, "Unknown general.current_standard_for_steel_design");
}

/******************************************************* Types for Steel designs - Member local section reduction ********************************************************/
var memberLocalSectionReduction = new SteelDesignMemberLocalSectionReduction(undefined, "User defined name for member local section reduction", [6], undefined, "Member local section reduction");
memberLocalSectionReduction.AddReductionType("DESIGN_PARAMETERS", 1.5);
memberLocalSectionReduction.AddReductionType("DESIGN_PARAMETERS", 1.6, true);
memberLocalSectionReduction.AddReductionType("SECTION_VALUES", 2.5);
memberLocalSectionReduction.AddReductionType("SECTION_VALUES", 2.6, true);
memberLocalSectionReduction.DesignParameters(1, undefined, 0.00075);
memberLocalSectionReduction.DesignParameters(2, "RELATIVE", 0.025);
memberLocalSectionReduction.SectionValues(3, "RELATIVE", 0.019, 0.02, 0.021, 0.022, 0.023, 0.024, 0.025);
memberLocalSectionReduction.SectionValues(4, "ABSOLUTE", 1.1, 1.2, 1.3, 0.0001, 0.0002, 0.0003);
memberLocalSectionReduction.MultipleDefinition(2, 3, "ABSOLUTE", 0.1);
memberLocalSectionReduction.MultipleDefinition(4, undefined, "RELATIVE", 0.02);

/******************************************************************** Steel design add-on **************************************************************************************/
var member = new Member();
member.Beam(undefined, [16, 17], section.GetNo());
var memberSet = new MemberSet();
memberSet.ContinuousMembers(undefined, [memberList[7].GetNo(), member.GetNo(), memberList[8].GetNo()]);
memberSet.SteelDesignProperties();

/********************************************************* Member, Member set - Design types (Steel design add-on) ********************************************************/
var effectiveLengthNo = 1;
var boundaryConditionNo = (IsCurrent("EN") || IsCurrent("NTC")) ? 2 : undefined;
var localSectionReductionNo = 1;

memberList[6].SteelDesignProperties();
memberList[6].SetSteelDesignTypes(effectiveLengthNo, boundaryConditionNo, localSectionReductionNo);
memberSet.SetSteelDesignTypes(effectiveLengthNo, boundaryConditionNo, localSectionReductionNo);

/********************************************************* Member, Member set - Design configurations (Steel design add-on) ********************************************************/
var ultimateConfigurationNo = !IsCurrent("AISC") ? 2 : undefined;
var serviceabilityConfigurationNo = 2;
var fireResistanceConfigurationNo = (IsCurrent("EN") || IsCurrent("NTC")) ? 2 : undefined;
//var strengthConfiguration = IsCurrent("AISC") ? 1 : undefined;    There is no API support for Strength configuration?
//var seismicConfigurationNo = (IsCurrent("AISC") || IsCurrent("CSA")) ? 1 : undefined; There is no API support for Seismic configuration?

memberList[6].SetSteeleDesignConfigurations(ultimateConfigurationNo, serviceabilityConfigurationNo, fireResistanceConfigurationNo);
memberSet.SetSteeleDesignConfigurations(ultimateConfigurationNo, serviceabilityConfigurationNo, fireResistanceConfigurationNo);

/**************************************************** Members - Design support & deflection (Steel design add-on) ******************************************************/
var memberDesignSupport = new MemberDesignSupport(undefined, undefined, [memberSet.GetNo()], [15, 16, 17, 18]);
memberDesignSupport.Name("Member design support");
memberDesignSupport.GeneralInZ(true, 0.25, false, 0.15, "ZAXIS_NEGATIVE");
memberDesignSupport.GeneralInY(true, undefined, undefined, undefined, "YAXIS_BOTH", false);

memberList[9].SteelDesignProperties();
memberList[9].SetDesignSupport(memberDesignSupport.GetNo(), memberDesignSupport.GetNo());

memberList[11].SetDesignSupport(memberDesignSupport.GetNo(), memberDesignSupport.GetNo());
memberList[11].SetDeflectionAnalysis("LOCAL_AXIS_Z_AND_Y", "DEFORMED_UNDEFORMED_SYSTEM", false, 1.5, 0.02);

/**************************************************** Member Sets - Design support & deflection (Steel design add-on) **************************************************/
var member = new Member();
member.Beam(undefined, [26, 27], section.GetNo());
member.SteelDesignPropertiesViaParentMemberSet(false);  // Can't be set?
var member2 = new Member();
member2.Beam(undefined, [28, 29], section.GetNo());
memberSet.ContinuousMembers(undefined, [memberList[12].GetNo(), member.GetNo(), memberList[13].GetNo(), member2.GetNo(), memberList[14].GetNo()]);
memberSet.SteelDesignProperties();
memberSet.SetDesignSupport(memberDesignSupport.GetNo(), memberDesignSupport.GetNo());
memberSet.SetDesignSupportAtInternalNodes(memberDesignSupport.GetNo(), undefined, undefined, memberDesignSupport.GetNo());
memberSet.SetDeflectionAnalysis("LOCAL_AXIS_Z", "DEFORMED_SEGMENT_ENDS", [undefined, [undefined, 8.0, 0.02]]);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");