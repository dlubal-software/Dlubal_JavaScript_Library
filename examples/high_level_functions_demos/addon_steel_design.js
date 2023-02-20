include("../../includes/Tools/high_level_functions_support.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
run("../includes/Tools/clearAll.js");

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
    7: "SP 16.13330 | 2017-02"
};

var material = new Material(undefined, "S235");
var section = new Section(undefined, "IPE 80", material.GetNo());
var member = new Member();

var nodeForMembers = createNodesGrid(-28, -28, [10, 1], [3, 0]);
for (var i = 0; i < nodeForMembers.length; i+=2) {
    member.Beam(undefined, [i + 1, i + 2], section.GetNo());
}
var memberForSteelDesignUltimateConfiguration = new Member();
memberForSteelDesignUltimateConfiguration.Beam(undefined, [4, 5], section.GetNo());
var memberSetForSteelDesignUltimateConfiguration = new MemberSet();
memberSetForSteelDesignUltimateConfiguration.ContinuousMembers(undefined, [2, memberForSteelDesignUltimateConfiguration.GetNo(), 3]);

STEEL_DESIGN.setActive(true);

general.current_standard_for_steel_design = steel_design_standards[standard_index];

switch (general.current_standard_for_steel_design)
{
    case "EN 1993 | CEN | 2015-06":
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
        break;
    case "AISC 360 | 2016":
        var steelDesignStrengthConfigurationAISC = new SteelDesignStrengthConfigurationAISC(undefined, "AICS Strength configuration for testing", [1]);
        steelDesignStrengthConfigurationAISC.General(true);
        steelDesignStrengthConfigurationAISC.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
        steelDesignStrengthConfigurationAISC.LocalBuckling(true);
        steelDesignStrengthConfigurationAISC.LocalBuckling(true, 13.5, 42.5);
        steelDesignStrengthConfigurationAISC.PositionOfPositiveTransverse(undefined, undefined, true);
        break;
    case "IS 800 | 2007-12":
        var steelDesignUltimateConfigurationIS = new SteelDesignUltimateConfigurationIS(undefined, "IS Ultimate configuration for testing", [1]);
        steelDesignUltimateConfigurationIS.General(false);
        steelDesignUltimateConfigurationIS.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
        steelDesignUltimateConfigurationIS.ElasticDesign(true);
        steelDesignUltimateConfigurationIS.DesignOfShearBuckling(true, undefined, true);
        steelDesignUltimateConfigurationIS.Combined(true);
        steelDesignUltimateConfigurationIS.CalculationMethod(true, true);
        steelDesignUltimateConfigurationIS.PositionOfPositiveTransverse(undefined, true);
        break;
    case "BS 5950 | 2001-05":
        var steelDesignUltimateConfigurationBS = new SteelDesignUltimateConfigurationBS(undefined, "BS Ultimate configuration for testing", [1]);
        steelDesignUltimateConfigurationBS.General(true);
        steelDesignUltimateConfigurationBS.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
        steelDesignUltimateConfigurationBS.Options(true,true);
        steelDesignUltimateConfigurationBS.PositionOfPositiveTransverse(undefined, undefined, true);
        steelDesignUltimateConfigurationBS.EquivalentUniformMomentFactors(undefined, true, 0.500, undefined, true, 0.600, true);
        break;
    case "GB 50017 | 2017-12":
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
        break;
    case "CSA S16 | 2019":
        var steelDesignUltimateConfigurationCSA = new SteelDesignUltimateConfigurationCSA(undefined, "CSA Ultimate configuration for testing", [1])
        steelDesignUltimateConfigurationCSA.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
        steelDesignUltimateConfigurationCSA.Options(true, undefined, true, undefined, true, 0.9, 0.95);
        steelDesignUltimateConfigurationCSA.StructureType(true, true);
        steelDesignUltimateConfigurationCSA.PositionOfPositiveTransverse(undefined, true);
        break;
    case "AS 4100 | 2016-06":
        var steelDesignUltimateConfigurationAS = new SteelDesignUltimateConfigurationAS(undefined, "AS Ultimate configuration for testing", [1]);
        steelDesignUltimateConfigurationAS.General(true);
        steelDesignUltimateConfigurationAS.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
        steelDesignUltimateConfigurationAS.Options(true, true, true);
        steelDesignUltimateConfigurationAS.SectionManufacture(true, "CF");
        steelDesignUltimateConfigurationAS.PositionOfPositiveTransverse(undefined, undefined, true);
        steelDesignUltimateConfigurationAS.FabricationOfWeldedSections(undefined, true);
        break;
    case "SP 16.13330 | 2017-02":
        var steelDesignUltimateConfigurationSP = new SteelDesignUltimateConfigurationSP(undefined, "SP Ultimate configuration for testing", [1]);
        steelDesignUltimateConfigurationSP.General(true);
        steelDesignUltimateConfigurationSP.LimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
        steelDesignUltimateConfigurationSP.ServiceFactor(0.95);
        steelDesignUltimateConfigurationSP.PartialSafetyFactor(1.12);
        steelDesignUltimateConfigurationSP.Options(true);
        steelDesignUltimateConfigurationSP.LoadSafetyCoefficient(true, 1.1);
        steelDesignUltimateConfigurationSP.DesignParameters(0.06, 0.07, undefined, true);
        break;
    default:
        ASSERT(false);
}

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");