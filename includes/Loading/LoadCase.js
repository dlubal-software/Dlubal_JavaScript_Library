function LoadCase(no,
  analysisType,
  analysisSettings,
  stabilityAnalysis,
  comment,
  params) {

  /**
   * Creates Load case hight level function

   * @param   {Integer}              no                  unique ID of Load case
   * @param   {String}               analysisType        LC analysis_type parameter
   * @param   {Integer}              analysisSettings    LC analysis settings no. according to analysis type
   * @param   {Integer}              stabilityAnalysis   LC stability analysis no. (if is allowed to set)
   * @param   {String}               comment             Comment, empty by default
   * @param   {Object}               params              Load case parameters, empty by default
   */

  if (no === undefined) {
    var LC = load_cases.create();
  }
  else {
    var LC = load_cases.create(no);
  }
  this.settings = LC;

  // analysis type
  const atype = this.SetAnalysisType(analysisType);
  console.log(atype)
  if (analysisType != undefined) {
    this.settings.analysis_type = load_cases[atype];
  }

  // analysis settings
  if (analysisSettings === undefined) {
    analysisSettings = 1;
  }
  var self = this;
  this.settings = self.AnalysisSettings_dict(self, atype)(analysisSettings, undefined, self);

  if (stabilityAnalysis != undefined && analysisType != "spectral" && analysisType != "modal") {
    this.settings = self.SetStabilityAnalysis(stabilityAnalysis, self);
  }

  set_comment_and_parameters(this.settings, comment, params);

  var self = this;
  return self;
}
LoadCase.prototype.SetStabilityAnalysis = function (stabilityAnalysisSetings_no, LC) {
  // * @param   {integer}   stabilityAnalysisSetings_no         unique ID of stability analysis settings
  ASSERT(typeof stabilityAnalysisSetings_no != undefined || typeof stabilityAnalysisSetings_no != "number", "Parameter must be assigned as an integer.");
  if (LC != undefined) {
    var self = LC;
  }
  else {
    var self = this
  }
  self.settings.calculate_critical_load = true
  self.settings.stability_analysis_settings = stability_analysis_settings[stabilityAnalysisSetings_no];
  return self.settings
};
LoadCase.prototype.SetTime = function (startTime, duration) {
  // * @param   {float}   startTime         analysis start time
  // * @param   {float}   duration          analysis duration (input in second, RFEM dialog in days)
  ASSERT(typeof stabilityAnalysisSetings_no != undefined || typeof stabilityAnalysisSetings_no != "number", "Parameter must be assigned as an integer.");
  if (this.settings.analysis_type === load_cases.ANALYSIS_TYPE_TIME_DEPENDENT) {
    if (startTime === undefined) {
      startTime = 0;
    }
    if (duration === undefined) {
      duration = 100;
    }
    this.settings.loading_start = startTime;
    this.settings.time_being_investigated = duration;
  }
  else {
    console.log("This analyse is not time dependent.")
  }
};
LoadCase.prototype.SetAnalysisType = function (type) {
  const AnalysisType_dict = {
    undefined: "ANALYSIS_TYPE_STATIC",
    "static": "ANALYSIS_TYPE_STATIC",
    "DTA": "ANALYSIS_TYPE_TIME_DEPENDENT",
    //"creep"             : "ANALYSIS_TYPE_CREEP_AND_SHRINKAGE",
    "modal": "ANALYSIS_TYPE_MODAL",
    "spectral": "ANALYSIS_TYPE_RESPONSE_SPECTRUM",
    "wind": "ANALYSIS_TYPE_WIND_SIMULATION",

  };

  var AType = AnalysisType_dict[type];
  if (AType === undefined) {
    AType = "ANALYSIS_TYPE_STATIC";
    console.log("Wrong analysis type input. Value was: " + type);
    console.log("Correct values are: ( " + Object.keys(AnalysisType_dict) + ")");
  }
  console.log("Analysis type: " + AType);
  return AType;
};
LoadCase.prototype.SetStaticAnalysis = function (settings_static_no, undefined, LC) {
  if (settings_static_no === undefined) {
    settings_static_no = 1;
  }
  if (LC != undefined) {
    var self = LC;
  }
  else {
    var self = this
  }
  self.settings.static_analysis_settings = static_analysis_settings[settings_static_no];
  return self.settings;
};

LoadCase.prototype.SetModalAnalysis = function (settings_modal_no, undefined, LC) {
  if (settings_modal_no === undefined) {
    settings_modal_no = 1;
  }

  if (LC != undefined) {
    var self = LC;
  }
  else {
    var self = this
  }
  self.settings.modal_analysis_settings = modal_analysis_settings[settings_modal_no];
  return self.settings
};

LoadCase.prototype.SetDTAAnalysis = function (settings_static_no, time, LC) {
  if (settings_static_no === undefined) {
    settings_static_no = 1;
  }
  if (time === undefined) {
    time = 86400;
  }
  if (LC != undefined) {
    var self = LC;
  }
  else {
    var self = this
  }
  self.settings.static_analysis_settings = static_analysis_settings[settings_static_no];
  self.settings.time_being_investigated = time;
  return self.settings
};

LoadCase.prototype.SetSpectralAnalysis = function (settings_spectral_no, dirrection, LC) {
  if (settings_spectral_no === undefined) {
    settings_spectral_no = 1;
  }
  if (LC != undefined) {
    var self = LC;
  }
  else {
    var self = this
  }

  switch (dirrection) {
    case "x":
      self.settings.response_spectrum_is_enabled_in_direction_x = true;
      break;
    case "y":
      self.settings.response_spectrum_is_enabled_in_direction_y = true;
      break;
    case "z":
      self.settings.response_spectrum_is_enabled_in_direction_z = true;
      break;
    case "all":
      self.settings.response_spectrum_is_enabled_in_direction_x = true;
      self.settings.response_spectrum_is_enabled_in_direction_y = true;
      self.settings.response_spectrum_is_enabled_in_direction_z = true;
      break;
    default:
      self.settings.response_spectrum_is_enabled_in_direction_x = true;
  }
  self.settings.spectral_analysis_settings = spectral_analysis_settings[settings_spectral_no];
  return self.settings
};

LoadCase.prototype.SetWindSimulationAnalysis = function (settings, settings_wind_simulation, LC) {
  if (settings === undefined) {
    settings = 1;
  }

  if (settings_wind_simulation === undefined) {
    settings_wind_simulation = 1;
  }
  if (LC != undefined) {
    var self = LC;
  }
  else {
    var self = this
  }
  self.settings.static_analysis_settings = static_analysis_settings[settings];
  self.settings.wind_simulation_analysis_settings = wind_simulation_analysis_settings[settings_wind_simulation];
  self.settings.wind_simulation_wind_profile = wind_profiles[1];
  return self.settings
};
LoadCase.prototype.AnalysisSettings_dict = function (LC, atype) {
  const atype_dict = {
    "ANALYSIS_TYPE_STATIC": LC.SetStaticAnalysis,
    "ANALYSIS_TYPE_TIME_DEPENDENT": LC.SetDTAAnalysis,
    "ANALYSIS_TYPE_MODAL": LC.SetModalAnalysis,
    "ANALYSIS_TYPE_RESPONSE_SPECTRUM": LC.SetSpectralAnalysis,
    "ANALYSIS_TYPE_WIND_SIMULATION": LC.SetWindSimulationAnalysis,
  };
  return atype_dict[atype];
};

