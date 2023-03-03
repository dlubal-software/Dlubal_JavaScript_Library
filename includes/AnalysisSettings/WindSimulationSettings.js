
function SetTurbulenceModel(model) {

  const model_dict = {
    "TURBULENCE_TYPE_OMEGA": wind_simulation_analysis_settings.TURBULENCE_TYPE_OMEGA,
    "TURBULENCE_TYPE_EPSILON": wind_simulation_analysis_settings.TURBULENCE_TYPE_EPSILON,
    "TURBULENCE_TYPE_LES": wind_simulation_analysis_settings.TURBULENCE_TYPE_LES
  };
  if (model != undefined) {
    var modelType = model_dict[model];
    if (modelType === undefined) {
      modelType = wind_simulation_analysis_settings.TURBULENCE_TYPE_OMEGA;
      console.log("Wrong turbulence type input. Value was: " + model);
      console.log("Correct values are: ( " + Object.keys(model_dict) + ")");
    }
    return modelType;
  }
  else {
    return wind_simulation_analysis_settings.TURBULENCE_TYPE_OMEGA;
  }
}

function SetMemberLoadDistribution(type) {

  const distribution_dict = {
    "UNIFORM": wind_simulation_analysis_settings.UNIFORM,
    "CONCENTRATED": wind_simulation_analysis_settings.CONCENTRATED,
    "TRAPEZOIDAL": wind_simulation_analysis_settings.TRAPEZOIDAL
  };
  if (type != undefined) {
    var distributionType = distribution_dict[type];
    if (distributionType === undefined) {
      modelType = wind_simulation_analysis_settings.CONCENTRATED;
      console.log("Wrong member load distribution type. Value was: " + type);
      console.log("Correct values are: ( " + Object.keys(distribution_dict) + ")");
    }
    return distributionType;
  }
  else {
    return wind_simulation_analysis_settings.CONCENTRATED;
  }
}

/**
 * @class WindSimulationSettings
 * @description Basic constuctor
 * @classdesc Class creates WindSimulationSettings object
 * @param {*} no
 * @param {*} name
 * @param {*} density
 * @param {*} kinematicViscosity
 * @param {*} consider_turbulence
 * @param {*} turbulenceModel
 * @param {*} memberLoadDistribution
 * @param {*} comment
 * @param {*} params
 * @returns Object WindSimulationSettings
 */
function WindSimulationSettings(no,
  name,
  density,
  kinematicViscosity,
  consider_turbulence,
  turbulenceModel,
  memberLoadDistribution,
  comment,
  params) {

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

  if (no === undefined) {
    this.Settings = wind_simulation_analysis_settings.create();
  }
  else {
    this.Settings = wind_simulation_analysis_settings.create(no);
  }
  if (name !== undefined) {
    this.Settings.user_defined_name_enabled = true;
    this.Settings.name = name;
  }
  // console.log("New wind simulation analysis settings no. " + this.Settings.no + " was created");
  if (density !== undefined) {
    this.Settings.density = density;
  }
  else {
    this.Settings.density = 1.25;
  }

  if (kinematicViscosity !== undefined) {
    this.Settings.kinematic_viscosity = kinematicViscosity;
  }
  else {
    this.Settings.kinematic_viscosity = 0.000015;
  }

  if (consider_turbulence !== undefined) {
    this.Settings.consider_turbulence = consider_turbulence;
    this.Settings.turbulence_model_type = SetTurbulenceModel(turbulenceModel);
  }

  this.Settings.member_load_distribution = SetMemberLoadDistribution(memberLoadDistribution);

  // Wind simulation analysis settings

  set_comment_and_parameters(this.Settings, comment, params);
  // console.log("-- Done. Wind simulation analysis settings no. " + this.Settings.no + " all initial params set.");
  // object for creation new WSAS with callback link to instance
  var self = this;
  return self;
}

WindSimulationSettings.prototype.GetNo = function () {
  // * @param   {integer}   no         NO of settings
  return this.Settings.no;
};

