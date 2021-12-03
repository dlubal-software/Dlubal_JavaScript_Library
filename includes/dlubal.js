include("table_shortcuts.js");
include("block.js");
// Global Parameters
include("GlobalParameters/FormulaGlobalParameter.js");
include("GlobalParameters/OptimizationGlobalParameter.js");
include("GlobalParameters/OptimizationAscendingGlobalParameter.js");
include("GlobalParameters/OptimizationDescendingGlobalParameter.js");
include("GlobalParameters/ValueGlobalParameter.js");
// Basic objects
if (RFEM)
{
    include("BasicObjects/LineSet.js");
    include("BasicObjects/Line.js");
    include("BasicObjects/SolidSet.js");
    include("BasicObjects/solid.js");
    include("BasicObjects/SurfaceSet.js");
    include("BasicObjects/Surface.js");
    include("BasicObjects/Opening.js");
    include("BasicObjects/Thickness.js");
}
include("BasicObjects/Material.js");
include("BasicObjects/MemberSet.js");
include("BasicObjects/Member.js");
include("BasicObjects/Node.js");
include("BasicObjects/Section.js");
// Supports
include("Supports/Linear/functions.js");
include("Supports/Nonlinearities/nonlinearities.js");
include("Supports/Nonlinearities/x_nonlinearities.js");
include("Supports/Nonlinearities/y_nonlinearities.js");
include("Supports/Nonlinearities/z_nonlinearities.js");
include("Supports/Nonlinearities/rx_nonlinearities.js");
include("Supports/Nonlinearities/ry_nonlinearities.js");
include("Supports/Nonlinearities/rz_nonlinearities.js");
// Types for Nodes
include("TypesForNodes/NodalMeshRefinement.js");
include("TypesForNodes/nodal_support/nodal_support.js");
include("TypesForNodes/nodal_support/nodal_support_conditions.js");
include("TypesForNodes/nodal_support/nodal_support_basic_types.js");
include("TypesForNodes/nodal_support/nodal_support_new_object_basic_types.js");

// Types for Lines
if (RFEM)
{
    include("TypesForLines/LineHinge.js");
    include("TypesForLines/LineMeshRefinement.js");
    include("TypesForLines/line_support/line_support.js");
    include("TypesForLines/line_support/line_support_basic_types.js");
    include("TypesForLines/line_support/line_support_new_object_basic_types.js");
}
// Types for Members
include("TypesForMembers/MemberDefinableStiffness.js");
include("TypesForMembers/MemberEccentricity.js");
include("TypesForMembers/MemberHinge.js");
include("TypesForMembers/MemberNonlinearity.js");
include("TypesForMembers/MemberResultIntermediatePoint.js");
include("TypesForMembers/member_support/member_support.js");
include("TypesForMembers/member_support/member_support_conditions.js");
include("TypesForMembers/member_support/member_support_basic_types.js");
include("TypesForMembers/member_support/member_support_new_object_basic_types.js");
include("TypesForMembers/MemberStiffnessModification.js");
include("TypesForMembers/MemberTransverseStiffener.js");
// Types for Surfaces
if (RFEM)
{
    include("TypesForSurfaces/SurfaceEccentricity.js");
    include("TypesForSurfaces/surface_support/surface_support.js");
    include("TypesForSurfaces/surface_support/surface_support_conditions.js");
    include("TypesForSurfaces/surface_support/surface_support_basic_types.js");
    include("TypesForSurfaces/SurfaceMeshRefinement.js");
}
// Loading
include("Loading/LoadCombination.js");
// Loads
if (RFEM)
{
    include("Loads/FreeCircularLoad.js");
    include("Loads/FreeConcentratedLoad.js");
    include("Loads/FreeLineLoad.js");
    include("Loads/FreePolygonLoad.js");
    include("Loads/FreeRectangularLoad.js");
    include("Loads/LineLoad.js");
    include("Loads/LineSetLoad.js");
    include("Loads/OpeningLoad.js");
    include("Loads/SolidLoad.js");
    include("Loads/SolidSetLoad.js");
    include("Loads/SurfaceLoad.js");
    include("Loads/SurfaceSetLoad.js");
}
include("Loads/ImposedLineDeformation.js");
include("Loads/ImposedNodalDeformation.js");
include("Loads/MemberLoad.js");
include("Loads/MemberSetLoad.js");
include("Loads/NodalLoad.js");
// Dimensions
include("Dimensions/AngularDimension.js");
include("Dimensions/ArcLengthDimension.js");
include("Dimensions/DiameterDimension.js");
include("Dimensions/LinearDimension.js");
include("Dimensions/RadiusDimension.js");
include("Dimensions/SlopeDimension.js");
// Guide objects
include("GuideObjects/CoordinateSystem.js");
include("table_shortcuts.js");
include("block.js");