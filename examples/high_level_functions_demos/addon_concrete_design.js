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

/****************************************************************** Ultimate configuration ***************************************************************************/
switch (general.current_standard_for_concrete_design)
{
    case general.NATIONAL_ANNEX_AND_EDITION_EN_1992_CEN_2014_11:
        var ultimateConfiguration = new ConcreteDesignUltimateConfigurationEN(undefined, [surfaceList[0].no], [memberList[0].GetNo()], [nodes[31].no, nodes[32].no]);
        ultimateConfiguration.SetName("Ultimate configuration (EN)");
        ultimateConfiguration.Members_ConsiderInternalForces(false, undefined, true, false, false, false);
        ultimateConfiguration.Members_ReductionsOfInternalForcesInZ(true, true, false, true, true);
        ultimateConfiguration.Members_LongitudinalReinforcement("UNIFORMLY_SURROUNDING", 0.01, true, 0.99, false);
        ultimateConfiguration.Members_DetailingAndParticularRules(false, undefined, undefined, 0.0010, 0.0020, 0.0030, true, 0.05, undefined, true, "MAXIMUM_STIRRUP_SPACING_PROVIDED", false, false);
        ultimateConfiguration.Members_RequiredShearReinforcement("AUTOMATICALLY");
        ultimateConfiguration.Members_ShearJoint(undefined, "GENERAL_INTEGRATION_OF_AXIAL_STRESSES", true, 55000, true);
        ultimateConfiguration.Members_NeutralAxisDepthLimitation(true, 0.55);
        ultimateConfiguration.Members_CalculationSetting();
        ultimateConfiguration.Members_FiberConcrete("BENDING_AND_SHEAR_DESIGN", "SDL3", false);
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
        // For trying uncomment row bellow
        //ultimateConfiguration.Surfaces_MinimumLongitudinalReinforcement(undefined, "WALLS", undefined, undefined, "DEFINED_IN_REINFORCEMENT_DIRECTION", "PHI_2");
        ultimateConfiguration.Surfaces_UserDefinedMinimumLongitudinalReinforcementPercentage(true, 0.1, 0.11, 0.12, 0.13);
        ultimateConfiguration.Surfaces_MaximumLongitudinalReinforcement(true, "WALLS");
        ultimateConfiguration.Surfaces_UserDefinedMaximumLongitudinalReinforcementPercentage(true, 0.05);
        ultimateConfiguration.Surfaces_MinimumShearReinforcement(false);
        ultimateConfiguration.Surfaces_UserDefinedMinimumShearReinforcementPercentage(true, 0.01);
        ultimateConfiguration.Surfaces_RequiredLongitudinalReinforcement();
        ultimateConfiguration.Surfaces_RequiredShearReinforcement("PROVIDED");
        ultimateConfiguration.Surfaces_NeutralAxisDepthLimitation(true, 0.55);
        ultimateConfiguration.Surfaces_FiberConcrete("SDL2", false);
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_ACI_318_2019_CONCRETE_DESIGN:
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_CSA_A23_3_2019:
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_SP_63_13330_2018_12:
        break;
    case general.NATIONAL_ANNEX_AND_EDITION_NTC_2018_01_CONCRETE_DESIGN:
        break;
    default:
        ASSERT(false, "Unknown code of standard");
}

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");