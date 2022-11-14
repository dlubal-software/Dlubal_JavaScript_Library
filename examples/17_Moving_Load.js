/* var Load = 1000;
var Steps = 4;
var Element = 1; */

var SASExists = false;
var SASNo = 0;
for (var i = 1; i < static_analysis_settings.count() + 1; i++) {
    if (static_analysis_settings[i].analysis_type === static_analysis_settings.GEOMETRICALLY_LINEAR) {
        SASExists = true;
        SASNo = i;
        break;
    }
}
if (!SASExists) {
    var SASGeometricallyLinear = new StaticAnalysisSettings();
    SASNo = static_analysis_settings.lastId()+1;
    SASGeometricallyLinear.GeometricallyLinear(SASNo);
}


for (var i = 0; i < Steps + 1; i++) {

    var Loadcase = new LoadCase();
    Loadcase.StaticAnalysis(load_cases.lastId() + 1, "Moving Load " + i, SASNo, "ACTION_CATEGORY_PERMANENT_G", [false, 0, 0, 1.0]);

    var distance = 1 / Steps * i;
    var memberLoad = new MemberLoad();
    memberLoad.Force(1, Loadcase.GetLoadCase(), Element, member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1, [Load, distance, true], LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE);
    memberLoad.GetMemberLoad().coordinate_system = 1;

}