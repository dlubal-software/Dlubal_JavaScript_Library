// create prototypes for load case types
/**
   * Creates Load case hight level function

   * @param   {Integer}              no                  unique ID of Load case
   * @param   {String}               analysisType        LC analysis_type parameter
   * @param   {Integer}              analysisSettings    LC analysis settings no. according to analysis type
   * @param   {Integer}              stabilityAnalysis   LC stability analysis no. (if is allowed to set)
   * @param   {String}               comment             Comment, empty by default
   * @param   {Object}               params              Load case parameters, empty by default
   */
function LoadCase(no,
  analysisType,
  analysisSettings,
  stabilityAnalysis,
  comment,
  params) {


  if (arguments.length !== 0) {
    // if (no === undefined) {
    //   var LC = load_cases.create();
    // }
    // else {
    //   var LC = load_cases.create(no);
    // }
    // this.settings = LC;

    // // analysis type
    // const atype = this.SetAnalysisType(analysisType);
    // console.log(atype);
    // if (analysisType != undefined) {
    //   this.settings.analysis_type = load_cases[atype];
    // }

    // // analysis settings
    // if (analysisSettings === undefined) {
    //   analysisSettings = 1;
    // }
    // var self = this;
    // this.settings = self.AnalysisSettings_dict(self, atype)(analysisSettings, undefined, self);

    // if (stabilityAnalysis != undefined && analysisType != "spectral" && analysisType != "modal") {
    //   this.settings = SetStabilityAnalysis(this.settings,stabilityAnalysis);
    // }

    set_comment_and_parameters(this.settings, comment, params);

    var self = this;
    return self;
  }
}
/**
 * 
 * @param {*} no 
 * @param {*} name 
 * @param {*} staticAnalysisSettingsNo 
 * @param {*} ActionCategory 
 * @param {*} selfWeighParams 
 * @param {*} stabilityAnalysisSettingsNo 
 * @param {*} comment 
 * @param {*} params 
 * @returns 
 */
LoadCase.prototype.StaticAnalysis = function (no, name, staticAnalysisSettingsNo, ActionCategory, selfWeighParams, stabilityAnalysisSettingsNo, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_STATIC"];
  SetStaticAnalysisSettings(this.LoadCase, staticAnalysisSettingsNo);
  SetStabilityAnalysisSettings(this.LoadCase, stabilityAnalysisSettingsNo);
  SetActionCategory(this.LoadCase, ActionCategory);
  SetSelfWeightParams(this.LoadCase, selfWeighParams);
  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};

/**
 * 
 * @param {*} no 
 * @param {*} name 
 * @param {*} modalAnalysisSettingsNo 
 * @param {*} importMassesFrom 
 * @param {*} selfWeighParams 
 * @param {*} comment 
 * @param {*} params 
 * @returns 
 */
LoadCase.prototype.ModalAnalysis = function (no, name, modalAnalysisSettingsNo, importMassesFrom, selfWeighParams, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_MODAL"];
  SetModalAnalysisSettings(this.LoadCase, modalAnalysisSettingsNo);
  ImportMassesFrom(this.LoadCase, importMassesFrom);
  //SetSelfWeightParams(this.LoadCase, selfWeighParams);
  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};
/**
 * 
 * @param {*} no 
 * @param {*} name 
 * @param {*} responseSpectrumAnalysisSettingsNo 
 * @param {*} importModalAnalysisFrom 
 * @param {*} responseSpectrums 
 * @param {*} comment 
 * @param {*} params 
 * @returns 
 */
LoadCase.prototype.ResponseSpectrumAnalysis = function (no, name, responseSpectrumAnalysisSettingsNo, importModalAnalysisFrom, responseSpectrums, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_RESPONSE_SPECTRUM"];
  SetResponseSpectrumAnalysisSettings(this.LoadCase, responseSpectrumAnalysisSettingsNo);
  ImportModalAnalysisFrom(this.LoadCase, importModalAnalysisFrom);
  SetResponseSpectrums(this.LoadCase, responseSpectrums);
  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};

LoadCase.prototype.WindSimulation = function (no, name, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_WIND_SIMULATION"];

  SetStabilityAnalysisSettings(this.settings, stabilityAnalysis);

  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};


function SetStabilityAnalysisSettings(LC, stabilityAnalysisSettingsNo) {
  ASSERT(typeof stabilityAnalysisSettingsNo !== undefined || typeof stabilityAnalysisSettings_no != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (stability_analysis_settings.exist(stabilityAnalysisSettingsNo)) {
      LC.calculate_critical_load = true;
      LC.stability_analysis_settings = stability_analysis_settings[stabilityAnalysisSettingsNo];
    }
  }
}

function SetStaticAnalysisSettings(LC, staticAnalysisSettingsNo) {
  ASSERT(typeof staticAnalysisSettingsNo !== undefined || typeof staticAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (static_analysis_settings.exist(staticAnalysisSettingsNo)) {
      LC.static_analysis_settings = static_analysis_settings[staticAnalysisSettingsNo];
    }
  }
}

function SetModalAnalysisSettings(LC, modalAnalysisSettingsNo) {
  ASSERT(typeof modalAnalysisSettingsNo !== undefined || typeof modalAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (modal_analysis_settings.exist(modalAnalysisSettingsNo)) {
      LC.modal_analysis_settings = modal_analysis_settings[modalAnalysisSettingsNo];
    }
  }
}
function SetResponseSpectrumAnalysisSettings(LC, responseAnalysisSettingsNo) {
  ASSERT(typeof responseAnalysisSettingsNo !== undefined || typeof responseAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (spectral_analysis_settings.exist(responseAnalysisSettingsNo)) {
      LC.spectral_analysis_settings = spectral_analysis_settings[responseAnalysisSettingsNo];
    }
  }
}

function SetSelfWeightParams(LC, selfWeighParams) {
  if (LC !== undefined) {
    if (selfWeighParams !== undefined && selfWeighParams.length !== 0) {
      if (selfWeighParams[0] === true && selfWeighParams.length === 4) {
        LC.self_weight_active = true;
        LC.self_weight_factors.x = selfWeighParams[1];
        LC.self_weight_factors.y = selfWeighParams[2];
        LC.self_weight_factors.z = selfWeighParams[3];
      }
      else {
        LC.self_weight_active = false;
      }
    }
    else {
      LC.self_weight_active = false;
    }
  }
}

function ImportMassesFrom(LC, importMassesFrom) {
  ASSERT(typeof importMassesFrom !== undefined || typeof importMassesFrom != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (load_cases.exist(importMassesFrom)) {
      LC.import_masses_from = load_cases[importMassesFrom];
    }
  }
}

function ImportModalAnalysisFrom(LC, importModalAnalysisFrom) {
  ASSERT(typeof importModalAnalysisFrom !== undefined || typeof importModalAnalysisFrom != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (load_cases.exist(importModalAnalysisFrom)) {
      LC.import_modal_analysis_from = load_cases[importModalAnalysisFrom];
    }
  }
}

function SetResponseSpectrums(LC, responseSpectrums) {
  if (LC !== undefined) {
    if (responseSpectrums.length === 3) {
      if (responseSpectrums[0].length === 2) {
        if (responseSpectrums[0][0] !== 0 && response_spectra.exist(responseSpectrums[0][0])) {
          LC.response_spectrum_is_enabled_in_direction_x = true;
          LC.response_spectrum_in_direction_x = response_spectra[responseSpectrums[0][0]];
          LC.response_spectrum_scale_factor_in_direction_x = responseSpectrums[0][1];
        }
      }
      else {
        LC.response_spectrum_is_enabled_in_direction_x = false;
        console.log("Response spectrum in direction x is disabled due to insufficient number of parameters.");
      }
      if (responseSpectrums[0].length === 2) {
        if (responseSpectrums[1][0] !== 0 && response_spectra.exist(responseSpectrums[1][0])) {
          LC.response_spectrum_is_enabled_in_direction_y = true;
          LC.response_spectrum_in_direction_y = response_spectra[responseSpectrums[1][0]];
          LC.response_spectrum_scale_factor_in_direction_y = responseSpectrums[1][1];
        }
      }
      else {
        LC.response_spectrum_is_enabled_in_direction_y = false;
        console.log("Response spectrum in direction y is disabled due to insufficient number of parameters.");
      }
      if (responseSpectrums[0].length === 2) {
        if (responseSpectrums[2][0] !== 0 && response_spectra.exist(responseSpectrums[2][0])) {
          LC.response_spectrum_is_enabled_in_direction_z = true;
          LC.response_spectrum_in_direction_z = response_spectra[responseSpectrums[2][0]];
          LC.response_spectrum_scale_factor_in_direction_z = responseSpectrums[2][1];
        }
      }
      else {
        LC.response_spectrum_is_enabled_in_direction_z = false;
        console.log("Response spectrum in direction z is disabled due to insufficient number of parameters.");
      }
    }
  }
}


// LoadCase.prototype.SetTime = function (startTime, duration) {
//   // * @param   {float}   startTime         analysis start time
//   // * @param   {float}   duration          analysis duration (input in second, RFEM dialog in days)
//   ASSERT(typeof stabilityAnalysisSetings_no != undefined || typeof stabilityAnalysisSetings_no != "number", "Parameter must be assigned as an integer.");
//   if (this.settings.analysis_type === load_cases.ANALYSIS_TYPE_TIME_DEPENDENT) {
//     if (startTime === undefined) {
//       startTime = 0;
//     }
//     if (duration === undefined) {
//       duration = 100;
//     }
//     this.settings.loading_start = startTime;
//     this.settings.time_being_investigated = duration;
//   }
//   else {
//     console.log("This analyse is not time dependent.");
//   }
// };
// LoadCase.prototype.SetAnalysisType = function (type) {
//   const AnalysisType_dict = {
//     undefined: "ANALYSIS_TYPE_STATIC",
//     "static": "ANALYSIS_TYPE_STATIC",
//     "DTA": "ANALYSIS_TYPE_TIME_DEPENDENT",
//     //"creep"             : "ANALYSIS_TYPE_CREEP_AND_SHRINKAGE",
//     "modal": "ANALYSIS_TYPE_MODAL",
//     "spectral": "ANALYSIS_TYPE_RESPONSE_SPECTRUM",
//     "wind": "ANALYSIS_TYPE_WIND_SIMULATION",

//   };

//   var AType = AnalysisType_dict[type];
//   if (AType === undefined) {
//     AType = "ANALYSIS_TYPE_STATIC";
//     console.log("Wrong analysis type input. Value was: " + type);
//     console.log("Correct values are: ( " + Object.keys(AnalysisType_dict) + ")");
//   }
//   console.log("Analysis type: " + AType);
//   return AType;
// };
// LoadCase.prototype.SetStaticAnalysis = function (settings_static_no, undefined, LC) {
//   if (settings_static_no === undefined) {
//     settings_static_no = 1;
//   }
//   if (LC != undefined) {
//     var self = LC;
//   }
//   else {
//     var self = this;
//   }
//   self.settings.static_analysis_settings = static_analysis_settings[settings_static_no];
//   return self.settings;
// };

// LoadCase.prototype.SetModalAnalysis = function (settings_modal_no, undefined, LC) {
//   if (settings_modal_no === undefined) {
//     settings_modal_no = 1;
//   }

//   if (LC != undefined) {
//     var self = LC;
//   }
//   else {
//     var self = this
//   }
//   self.settings.modal_analysis_settings = modal_analysis_settings[settings_modal_no];
//   return self.settings
// };

// LoadCase.prototype.SetDTAAnalysis = function (settings_static_no, time, LC) {
//   if (settings_static_no === undefined) {
//     settings_static_no = 1;
//   }
//   if (time === undefined) {
//     time = 86400;
//   }
//   if (LC != undefined) {
//     var self = LC;
//   }
//   else {
//     var self = this
//   }
//   self.settings.static_analysis_settings = static_analysis_settings[settings_static_no];
//   self.settings.time_being_investigated = time;
//   return self.settings
// };

// LoadCase.prototype.SetSpectralAnalysis = function (settings_spectral_no, direction, LC) {
//   if (settings_spectral_no === undefined) {
//     settings_spectral_no = 1;
//   }
//   if (LC != undefined) {
//     var self = LC;
//   }
//   else {
//     var self = this
//   }

//   switch (direction) {
//     case "x":
//       self.settings.response_spectrum_is_enabled_in_direction_x = true;
//       break;
//     case "y":
//       self.settings.response_spectrum_is_enabled_in_direction_y = true;
//       break;
//     case "z":
//       self.settings.response_spectrum_is_enabled_in_direction_z = true;
//       break;
//     case "all":
//       self.settings.response_spectrum_is_enabled_in_direction_x = true;
//       self.settings.response_spectrum_is_enabled_in_direction_y = true;
//       self.settings.response_spectrum_is_enabled_in_direction_z = true;
//       break;
//     default:
//       self.settings.response_spectrum_is_enabled_in_direction_x = true;
//   }
//   self.settings.spectral_analysis_settings = spectral_analysis_settings[settings_spectral_no];
//   return self.settings
// };

// LoadCase.prototype.SetWindSimulationAnalysis = function (settings, settings_wind_simulation, LC) {
//   if (settings === undefined) {
//     settings = 1;
//   }

//   if (settings_wind_simulation === undefined) {
//     settings_wind_simulation = 1;
//   }
//   if (LC != undefined) {
//     var self = LC;
//   }
//   else {
//     var self = this
//   }
//   self.settings.static_analysis_settings = static_analysis_settings[settings];
//   self.settings.wind_simulation_analysis_settings = wind_simulation_analysis_settings[settings_wind_simulation];
//   self.settings.wind_simulation_wind_profile = wind_profiles[1];
//   return self.settings
// };
// LoadCase.prototype.AnalysisSettings_dict = function (LC, atype) {
//   const atype_dict = {
//     "ANALYSIS_TYPE_STATIC": LC.SetStaticAnalysis,
//     "ANALYSIS_TYPE_TIME_DEPENDENT": LC.SetDTAAnalysis,
//     "ANALYSIS_TYPE_MODAL": LC.SetModalAnalysis,
//     "ANALYSIS_TYPE_RESPONSE_SPECTRUM": LC.SetSpectralAnalysis,
//     "ANALYSIS_TYPE_WIND_SIMULATION": LC.SetWindSimulationAnalysis,
//   };
//   return atype_dict[atype];
// };

LoadCase.prototype.ConsiderImperfection = function (imperfectionCaseNo) {
  if (this.LC !== undefined) {
    if (imperfectionCaseNo !== undefined) {
      if (imperfection_cases.exist(imperfectionCaseNo)) {
        this.LC.consider_imperfection = true;
        this.LC.imperfection_case = imperfection_cases[imperfectionCaseNo];
      } else {
        this.LC.consider_imperfection = false;
      }

    }
    else {
      this.LC.consider_imperfection = false;
    }

  }
};

LoadCase.prototype.SetStructureModification = function (structureModificationNo) {
  if (this.LC !== undefined) {
    if (imperfectionCaseNo !== undefined) {
      if (structure_modifications.exist(structureModificationNo)) {
        this.LC.structure_modification_enabled = true;
        this.LC.structure_modification = structure_modifications[structureModificationNo];
      } else {
        this.LC.structure_modification_enabled = false;
      }

    }
    else {
      this.LC.structure_modification_enabled = false;
    }
  }
};


LoadCase.prototype.ConsiderImperfection = function (imperfectionCaseNo) {
  if (this.LC !== undefined) {
    if (imperfectionCaseNo !== undefined) {
      if (imperfection_cases.exist(imperfectionCaseNo)) {
        this.LC.consider_imperfection = true;
        this.LC.imperfection_case = imperfectionCaseNo;
      } else {
        this.LC.consider_imperfection = false;
      }

    }
    else {
      this.LC.consider_imperfection = false;
    }

  }
};


function CreateLoadCase(no, name) {

  var LoadCase = undefined;
  if (no === undefined) {
    LoadCase = load_cases.create();
  }
  else {
    LoadCase = load_cases.create(no);
  }

  if (name !== undefined) {
    LoadCase.name = name;
  }
  return LoadCase;
}

function SetActionCategory(LC, actionCategory) {
  if (LC !== undefined) {
    if (actionCategory !== undefined) {
      var actionCategoryType = actionCategory_dict[actionCategory];
      if (actionCategoryType === undefined) {
        console.log("Wrong equation solver input. Value was: " + actionCategory);
        console.log("Correct values are: ( " + Object.keys(actionCategory_dict) + ")");
        actionCategory = "ACTION_CATEGORY_PERMANENT_G";
      }
      LC.action_category = load_cases[actionCategoryType];
    } else {
      LC.action_category = load_cases["ACTION_CATEGORY_PERMANENT_G"];
    }
  }
}

LoadCase.prototype.GetActionCategoryList = function () {
  return actionCategory_dict;
};


const actionCategory_dict = {

  "ACTION_CATEGORY_PERMANENT_G": "ACTION_CATEGORY_PERMANENT_G",
  "ACTION_CATEGORY_PERMANENT_SMALL_FLUCTUATIONS_G_ASTERISK": "ACTION_CATEGORY_PERMANENT_SMALL_FLUCTUATIONS_G_ASTERISK",
  "ACTION_CATEGORY_WEIGHT_OF_ICE_DI": "ACTION_CATEGORY_WEIGHT_OF_ICE_DI",
  "ACTION_CATEGORY_DEAD_LOAD_D": "ACTION_CATEGORY_DEAD_LOAD_D",
  "ACTION_CATEGORY_DEAD_LOAD_DL": "ACTION_CATEGORY_DEAD_LOAD_DL",
  "ACTION_CATEGORY_DEAD_LOAD_GK": "ACTION_CATEGORY_DEAD_LOAD_GK",
  "ACTION_CATEGORY_PERMANENT_FROM_CRANES_G_CR": "ACTION_CATEGORY_PERMANENT_FROM_CRANES_G_CR",
  "ACTION_CATEGORY_PERMANENT_IMPOSED_GQ": "ACTION_CATEGORY_PERMANENT_IMPOSED_GQ",
  "ACTION_CATEGORY_PRESTRESS_P": "ACTION_CATEGORY_PRESTRESS_P",
  "ACTION_CATEGORY_SELF_STRAINING_FORCE_T": "ACTION_CATEGORY_SELF_STRAINING_FORCE_T",
  "ACTION_CATEGORY_IMPOSED_DEFORMATIONS_DUE_TO_PRE_STRESSING_P": "ACTION_CATEGORY_IMPOSED_DEFORMATIONS_DUE_TO_PRE_STRESSING_P",
  "ACTION_CATEGORY_VARIABLE_Q": "ACTION_CATEGORY_VARIABLE_Q",
  "ACTION_CATEGORY_LIVE_LOAD_L": "ACTION_CATEGORY_LIVE_LOAD_L",
  "ACTION_CATEGORY_ROOF_LIVE_LOAD_LR": "ACTION_CATEGORY_ROOF_LIVE_LOAD_LR",
  "ACTION_CATEGORY_NOTIONAL_LOAD_FOR_STRUCTURAL_INTEGRITY_N": "ACTION_CATEGORY_NOTIONAL_LOAD_FOR_STRUCTURAL_INTEGRITY_N",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_B_OFFICE_AREAS_QI_B": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_B_OFFICE_AREAS_QI_B",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_C_CONGREGATION_AREAS_QI_C": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_C_CONGREGATION_AREAS_QI_C",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_D_SHOPPING_AREAS_QI_D": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_D_SHOPPING_AREAS_QI_D",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_E_STORAGE_AREAS_QI_E": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_E_STORAGE_AREAS_QI_E",
  "ACTION_CATEGORY_IMPOSED_LOADS_LIVE_LOADS_LL": "ACTION_CATEGORY_IMPOSED_LOADS_LIVE_LOADS_LL",
  "ACTION_CATEGORY_IMPOSED_LOAD_QK": "ACTION_CATEGORY_IMPOSED_LOAD_QK",
  "ACTION_CATEGORY_ACTIONS_WITH_LIMITED_MAXIMUM_VALUES_Q_LI": "ACTION_CATEGORY_ACTIONS_WITH_LIMITED_MAXIMUM_VALUES_Q_LI",
  "ACTION_CATEGORY_GENERAL_VARIABLE_ACTIONS_Q_GE": "ACTION_CATEGORY_GENERAL_VARIABLE_ACTIONS_Q_GE",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_F_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_F": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_F_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_F",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_160_KN_QI_G": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_160_KN_QI_G",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_I_ROOFS_HELICOPTER_QI_I": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_I_ROOFS_HELICOPTER_QI_I",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_J_ROOFS_HELIPORT_EQUIPMENT_QI_J": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_J_ROOFS_HELIPORT_EQUIPMENT_QI_J",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_INACCESSIBLE_ROOFS_QI_H": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_INACCESSIBLE_ROOFS_QI_H",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_HELICOPTER_QI_K": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_HELICOPTER_QI_K",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_OTHER_QI_K": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_OTHER_QI_K",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_H_GREATER_THAN_1000_M_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_H_GREATER_THAN_1000_M_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_H_LESS_OR_EQUAL_TO_1000_M_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_H_LESS_OR_EQUAL_TO_1000_M_QS",
  "ACTION_CATEGORY_ICE_QI": "ACTION_CATEGORY_ICE_QI",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_SK_GREATER_THAN_2_75_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_SK_GREATER_THAN_2_75_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_GREATER_THAN_2_75_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_GREATER_THAN_2_75_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_LOAD_S": "ACTION_CATEGORY_SNOW_LOAD_S",
  "ACTION_CATEGORY_WIND_QW": "ACTION_CATEGORY_WIND_QW",
  "ACTION_CATEGORY_WIND_LOAD_W": "ACTION_CATEGORY_WIND_LOAD_W",
  "ACTION_CATEGORY_WIND_ON_ICE_DETERMINED_IN_ACCORDANCE_WITH_SECTION_10_WI": "ACTION_CATEGORY_WIND_ON_ICE_DETERMINED_IN_ACCORDANCE_WITH_SECTION_10_WI",
  "ACTION_CATEGORY_LIVE_LOAD_DUE_TO_WIND_W": "ACTION_CATEGORY_LIVE_LOAD_DUE_TO_WIND_W",
  "ACTION_CATEGORY_WIND_LOAD_WL": "ACTION_CATEGORY_WIND_LOAD_WL",
  "ACTION_CATEGORY_WIND_LOAD_WK": "ACTION_CATEGORY_WIND_LOAD_WK",
  "ACTION_CATEGORY_WIND_LOAD_ACCORDING_TO_8_1_4_W": "ACTION_CATEGORY_WIND_LOAD_ACCORDING_TO_8_1_4_W",
  "ACTION_CATEGORY_TEMPERATURE_NON_FIRE_QT": "ACTION_CATEGORY_TEMPERATURE_NON_FIRE_QT",
  "ACTION_CATEGORY_INFLUENCES_RESULTING_FROM_TEMPERATURE_CHANGES_SHRINKAGE_OR_CREEP_ETC_T": "ACTION_CATEGORY_INFLUENCES_RESULTING_FROM_TEMPERATURE_CHANGES_SHRINKAGE_OR_CREEP_ETC_T",
  "ACTION_CATEGORY_TEMPERATURE_SHRINKAGE_CREEP_ETC_T": "ACTION_CATEGORY_TEMPERATURE_SHRINKAGE_CREEP_ETC_T",
  "ACTION_CATEGORY_THERMAL_ACTION_ACCORDING_TO_9_1_3_T": "ACTION_CATEGORY_THERMAL_ACTION_ACCORDING_TO_9_1_3_T",
  "ACTION_CATEGORY_FOUNDATION_SUBSIDENCE_QF": "ACTION_CATEGORY_FOUNDATION_SUBSIDENCE_QF",
  "ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_EARTH_LOADS_GS": "ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_EARTH_LOADS_GS",
  "ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_EARTH_PRESSURE_GS": "ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_EARTH_PRESSURE_GS",
  "ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_WATER_PRESSURE_GS": "ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_WATER_PRESSURE_GS",
  "ACTION_CATEGORY_ACTION_FROM_SOIL_VARIABLE_EARTH_PRESSURE_GS": "ACTION_CATEGORY_ACTION_FROM_SOIL_VARIABLE_EARTH_PRESSURE_GS",
  "ACTION_CATEGORY_ACTION_FROM_SOIL_VARIABLE_WATER_PRESSURE_GS": "ACTION_CATEGORY_ACTION_FROM_SOIL_VARIABLE_WATER_PRESSURE_GS",
  "ACTION_CATEGORY_LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_GROUND_WATER_PRESSURE_H": "ACTION_CATEGORY_LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_GROUND_WATER_PRESSURE_H",
  "ACTION_CATEGORY_LATERAL_EARTH_PRESSURE_H": "ACTION_CATEGORY_LATERAL_EARTH_PRESSURE_H",
  "ACTION_CATEGORY_GEOTECHNICAL_LOADS_PERMANENT_GEP": "ACTION_CATEGORY_GEOTECHNICAL_LOADS_PERMANENT_GEP",
  "ACTION_CATEGORY_GEOTECHNICAL_LOADS_VARIABLE_GEV": "ACTION_CATEGORY_GEOTECHNICAL_LOADS_VARIABLE_GEV",
  "ACTION_CATEGORY_OTHER_ACTIONS_QO": "ACTION_CATEGORY_OTHER_ACTIONS_QO",
  "ACTION_CATEGORY_LOAD_DUE_TO_FLUIDS_WITH_WELL_DEFINED_PRESSURES_AND_MAXIMUM_HEIGHTS_F": "ACTION_CATEGORY_LOAD_DUE_TO_FLUIDS_WITH_WELL_DEFINED_PRESSURES_AND_MAXIMUM_HEIGHTS_F",
  "ACTION_CATEGORY_FLOOD_LOAD_FA": "ACTION_CATEGORY_FLOOD_LOAD_FA",
  "ACTION_CATEGORY_RAIN_LOAD_R": "ACTION_CATEGORY_RAIN_LOAD_R",
  "ACTION_CATEGORY_CRANE_LOAD_CL": "ACTION_CATEGORY_CRANE_LOAD_CL",
  "ACTION_CATEGORY_ERECTION_LOAD_ER": "ACTION_CATEGORY_ERECTION_LOAD_ER",
  "ACTION_CATEGORY_NOTIONAL_HORIZONTAL_FORCES_ACCORDING_TO_BS_5950_NK": "ACTION_CATEGORY_NOTIONAL_HORIZONTAL_FORCES_ACCORDING_TO_BS_5950_NK",
  "ACTION_CATEGORY_ACTIONS_DURING_EXECUTION_Q_EX": "ACTION_CATEGORY_ACTIONS_DURING_EXECUTION_Q_EX",
  "ACTION_CATEGORY_RAIN_LOAD_QR": "ACTION_CATEGORY_RAIN_LOAD_QR",
  "ACTION_CATEGORY_ACCIDENTAL_ACTIONS_A": "ACTION_CATEGORY_ACCIDENTAL_ACTIONS_A",
  "ACTION_CATEGORY_ACCIDENTAL_LOAD_AL": "ACTION_CATEGORY_ACCIDENTAL_LOAD_AL",
  "ACTION_CATEGORY_EXCEPTIONAL_EXC": "ACTION_CATEGORY_EXCEPTIONAL_EXC",
  "ACTION_CATEGORY_LOAD_ARISING_FROM_EXTRAORDINARY_EVENT_AK": "ACTION_CATEGORY_LOAD_ARISING_FROM_EXTRAORDINARY_EVENT_AK",
  "ACTION_CATEGORY_SEISMIC_ACTIONS_AE": "ACTION_CATEGORY_SEISMIC_ACTIONS_AE",
  "ACTION_CATEGORY_EARTHQUAKE_LOAD_E": "ACTION_CATEGORY_EARTHQUAKE_LOAD_E",
  "ACTION_CATEGORY_LIVE_LOAD_DUE_TO_EARTHQUAKE_E": "ACTION_CATEGORY_LIVE_LOAD_DUE_TO_EARTHQUAKE_E",
  "ACTION_CATEGORY_EARTHQUAKE_LOAD_EL": "ACTION_CATEGORY_EARTHQUAKE_LOAD_EL",
  "ACTION_CATEGORY_SEISMIC_AE": "ACTION_CATEGORY_SEISMIC_AE",
  "ACTION_CATEGORY_EARTHQUAKE_LOAD_VERTICAL_EV": "ACTION_CATEGORY_EARTHQUAKE_LOAD_VERTICAL_EV",
  "ACTION_CATEGORY_EARTHQUAKE_LOAD_HORIZONTAL_EH": "ACTION_CATEGORY_EARTHQUAKE_LOAD_HORIZONTAL_EH",
  "ACTION_CATEGORY_UNEVEN_SETTLEMENTS_G_US": "ACTION_CATEGORY_UNEVEN_SETTLEMENTS_G_US",
  "ACTION_CATEGORY_GR1A_LM1_PEDESTRIAN_CYCLE_TRACK_GR1A": "ACTION_CATEGORY_GR1A_LM1_PEDESTRIAN_CYCLE_TRACK_GR1A",
  "ACTION_CATEGORY_GR1B_SINGLE_AXLE_GR1B": "ACTION_CATEGORY_GR1B_SINGLE_AXLE_GR1B",
  "ACTION_CATEGORY_GR2_HORIZONTAL_FORCES_LM1_GR2": "ACTION_CATEGORY_GR2_HORIZONTAL_FORCES_LM1_GR2",
  "ACTION_CATEGORY_GR3_PEDESTRIAN_LOAD_GR3": "ACTION_CATEGORY_GR3_PEDESTRIAN_LOAD_GR3",
  "ACTION_CATEGORY_GR4_CROWD_LOADING_PEDESTRIAN_LOAD_GR4": "ACTION_CATEGORY_GR4_CROWD_LOADING_PEDESTRIAN_LOAD_GR4",
  "ACTION_CATEGORY_GR5_SPECIAL_VEHICLES_LM1_GR5": "ACTION_CATEGORY_GR5_SPECIAL_VEHICLES_LM1_GR5",
  "ACTION_CATEGORY_WIND_LOADS_FWK_PERSISTENT_DESIGN_SITUATIONS_QWP": "ACTION_CATEGORY_WIND_LOADS_FWK_PERSISTENT_DESIGN_SITUATIONS_QWP",
  "ACTION_CATEGORY_WIND_LOADS_FWK_EXECUTION_QWE": "ACTION_CATEGORY_WIND_LOADS_FWK_EXECUTION_QWE",
  "ACTION_CATEGORY_WIND_LOADS_FW_QW": "ACTION_CATEGORY_WIND_LOADS_FW_QW",
  "ACTION_CATEGORY_CONSTRUCTION_LOADS_DUE_TO_WORKING_PERSONNEL_Q_CP": "ACTION_CATEGORY_CONSTRUCTION_LOADS_DUE_TO_WORKING_PERSONNEL_Q_CP",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_SK_GREATER_OR_EQUAL_TO_3_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_SK_GREATER_OR_EQUAL_TO_3_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_2_LESS_OR_EQUAL_TO_SK_LESSER_THAN_3_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_2_LESS_OR_EQUAL_TO_SK_LESSER_THAN_3_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_ICE_LOADS_1_LESS_OR_EQUAL_TO_SK_LESSER_THAN_2_KN_M2_QS": "ACTION_CATEGORY_SNOW_ICE_LOADS_1_LESS_OR_EQUAL_TO_SK_LESSER_THAN_2_KN_M2_QS",
  "ACTION_CATEGORY_SNOW_REGION_SAINT_PIERRE_AND_MIQUELON_QS": "ACTION_CATEGORY_SNOW_REGION_SAINT_PIERRE_AND_MIQUELON_QS",
  "ACTION_CATEGORY_SNOW_ICE_AND_RAIN_S": "ACTION_CATEGORY_SNOW_ICE_AND_RAIN_S",
  "ACTION_CATEGORY_SNOW_LOAD_ZONE_I_S": "ACTION_CATEGORY_SNOW_LOAD_ZONE_I_S",
  "ACTION_CATEGORY_SNOW_LOAD_ZONE_II_S": "ACTION_CATEGORY_SNOW_LOAD_ZONE_II_S",
  "ACTION_CATEGORY_SNOW_LOAD_ZONE_III_S": "ACTION_CATEGORY_SNOW_LOAD_ZONE_III_S",
  "ACTION_CATEGORY_OTHER_CONSTRUCTION_LOADS_Q_CO": "ACTION_CATEGORY_OTHER_CONSTRUCTION_LOADS_Q_CO",
  "ACTION_CATEGORY_SETTLEMENTS_OF_SUPPORTS_SHRINKAGE_SETT": "ACTION_CATEGORY_SETTLEMENTS_OF_SUPPORTS_SHRINKAGE_SETT",
  "ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A1_A3_Q_CR": "ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A1_A3_Q_CR",
  "ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A4_A5_Q_CR": "ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A4_A5_Q_CR",
  "ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A6_A7_Q_CR": "ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A6_A7_Q_CR",
  "ACTION_CATEGORY_CRANE_LOADS_LIFTING_HOOK_CRANES_OF_WORKING_GRADE_A8_Q_CR": "ACTION_CATEGORY_CRANE_LOADS_LIFTING_HOOK_CRANES_OF_WORKING_GRADE_A8_Q_CR",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_DWELLING_HOSTEL_HOTEL_OFFICE_HOSPITAL_WARD_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_DWELLING_HOSTEL_HOTEL_OFFICE_HOSPITAL_WARD_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_CLASSROOM_LABORATORY_READING_ROOM_MEETING_ROOM_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_CLASSROOM_LABORATORY_READING_ROOM_MEETING_ROOM_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_CANTEEN_DINING_HALL_ORDINARY_ARCHIVES_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_CANTEEN_DINING_HALL_ORDINARY_ARCHIVES_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_ASSEMBLY_HALL_THEATER_CINEMA_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_ASSEMBLY_HALL_THEATER_CINEMA_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_LAUNDRY_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_LAUNDRY_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_STORES_AND_SHOPS_EXHIBITION_HALLS_STATION_PORT_AIRPORT_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_STORES_AND_SHOPS_EXHIBITION_HALLS_STATION_PORT_AIRPORT_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_STANDS_WITHOUT_FIXED_SEAT_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_STANDS_WITHOUT_FIXED_SEAT_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_GYMNASIUM_ARENA_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_GYMNASIUM_ARENA_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_DANCE_HALL_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_DANCE_HALL_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_STOREHOUSE_FOR_COLLECTING_BOOKS_ARCHIVES_STOREROOMS_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_STOREHOUSE_FOR_COLLECTING_BOOKS_ARCHIVES_STOREROOMS_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_WAREHOUSE_WITH_A_DENSE_CONCENTRATION_OF_SHELVING_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_WAREHOUSE_WITH_A_DENSE_CONCENTRATION_OF_SHELVING_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_VENTILATOR_MOTOR_ROOM_ELEVATOR_MOTOR_ROOM_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_VENTILATOR_MOTOR_ROOM_ELEVATOR_MOTOR_ROOM_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_BUS_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_BUS_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_ROOF_BUS_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_ROOF_BUS_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_KITCHEN_FOR_DINING_HALL_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_KITCHEN_FOR_DINING_HALL_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_KITCHEN_OTHER_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_KITCHEN_OTHER_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_BUILDINGS_IN_ITEM_NO_1_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_BUILDINGS_IN_ITEM_NO_1_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_FOR_OTHER_BUILDINGS_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_FOR_OTHER_BUILDINGS_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_HOSTEL_HOTEL_NURSERY_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_HOSTEL_HOTEL_NURSERY_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_OFFICE_CLASSROOM_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_OFFICE_CLASSROOM_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_THICK_STREAM_OF_PEOPLE_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_THICK_STREAM_OF_PEOPLE_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_BALCONY_POPULATION_MAY_BE_CONCENTRATED_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_BALCONY_POPULATION_MAY_BE_CONCENTRATED_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_BALCONY_OTHER_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_BALCONY_OTHER_Q_CB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_METAL_WORKING_WORKSHOP_TABLE_D_0_1_1_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_METAL_WORKING_WORKSHOP_TABLE_D_0_1_1_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_1_2_4_6_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_1_2_4_6_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_3_5_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_3_5_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_7_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_7_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_SEMICONDUCTOR_PRODUCTION_WORKSHOP_TABLE_D_0_1_3_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_SEMICONDUCTOR_PRODUCTION_WORKSHOP_TABLE_D_0_1_3_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_COTTON_MILLING_WORKSHOP_TABLE_D_0_1_4_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_COTTON_MILLING_WORKSHOP_TABLE_D_0_1_4_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_PREPARATORY_WORKSHOP_FOR_TIRE_PLANT_TABLE_D_0_1_5_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_PREPARATORY_WORKSHOP_FOR_TIRE_PLANT_TABLE_D_0_1_5_Q_IB",
  "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_GRAIN_PROCESSING_WORKSHOP_TABLE_D_0_1_6_Q_IB": "ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_GRAIN_PROCESSING_WORKSHOP_TABLE_D_0_1_6_Q_IB",
  "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_UNMANNED_ROOF_Q_LR": "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_UNMANNED_ROOF_Q_LR",
  "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_MANNED_ROOF_Q_LR": "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_MANNED_ROOF_Q_LR",
  "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_ROOF_GARDEN_Q_LR": "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_ROOF_GARDEN_Q_LR",
  "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_HELICOPTER_ON_THE_ROOF_ACC_TO_5_3_2_Q_LR": "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_HELICOPTER_ON_THE_ROOF_ACC_TO_5_3_2_Q_LR",
  "ACTION_CATEGORY_ASH_LOAD_ON_ROOFINGS_TABLE_5_4_1_1_Q_AS": "ACTION_CATEGORY_ASH_LOAD_ON_ROOFINGS_TABLE_5_4_1_1_Q_AS",
  "ACTION_CATEGORY_ASH_LOAD_ON_ROOFINGS_ADJACENT_TO_BLAST_FURNACE_TABLE_5_4_1_2_Q_AS": "ACTION_CATEGORY_ASH_LOAD_ON_ROOFINGS_ADJACENT_TO_BLAST_FURNACE_TABLE_5_4_1_2_Q_AS",
  "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_1_7_Q_CR": "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_1_7_Q_CR",
  "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_8_Q_CR": "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_8_Q_CR",
  "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_9_10_Q_CR": "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_9_10_Q_CR",
  "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_11_12_13_Q_CR": "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_11_12_13_Q_CR",
  "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_SUPPORT_FORCES_Q_CR": "ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_SUPPORT_FORCES_Q_CR",
  "ACTION_CATEGORY_SELF_WEIGHT_OF_METAL_STRUCTURES_G_ME": "ACTION_CATEGORY_SELF_WEIGHT_OF_METAL_STRUCTURES_G_ME",
  "ACTION_CATEGORY_SELF_WEIGHT_OF_PREFABRICATED_STRUCTURES_G_PR": "ACTION_CATEGORY_SELF_WEIGHT_OF_PREFABRICATED_STRUCTURES_G_PR",
  "ACTION_CATEGORY_SELF_WEIGHT_OF_STRUCTURES_BUILT_ON_SITE_G_SI": "ACTION_CATEGORY_SELF_WEIGHT_OF_STRUCTURES_BUILT_ON_SITE_G_SI",
  "ACTION_CATEGORY_INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_G_IN": "ACTION_CATEGORY_INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_G_IN",
  "ACTION_CATEGORY_INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_WITH_ADDITION_ON_SITE_G_IS": "ACTION_CATEGORY_INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_WITH_ADDITION_ON_SITE_G_IS",
  "ACTION_CATEGORY_GENERAL_CONSTRUCTION_ELEMENTS_AND_EQUIPMENT_G_GE": "ACTION_CATEGORY_GENERAL_CONSTRUCTION_ELEMENTS_AND_EQUIPMENT_G_GE",
  "ACTION_CATEGORY_PERMANENT_SELF_WEIGHT_SELF_WEIGHT_OF_SOIL_G": "ACTION_CATEGORY_PERMANENT_SELF_WEIGHT_SELF_WEIGHT_OF_SOIL_G",
  "ACTION_CATEGORY_PERMANENT_EARTH_PRESSURE_G_E": "ACTION_CATEGORY_PERMANENT_EARTH_PRESSURE_G_E",
  "ACTION_CATEGORY_PERMANENT_WATER_PRESSURE_G_W": "ACTION_CATEGORY_PERMANENT_WATER_PRESSURE_G_W",
  "ACTION_CATEGORY_SELF_WEIGHT_G": "ACTION_CATEGORY_SELF_WEIGHT_G",
  "ACTION_CATEGORY_PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_G_GU": "ACTION_CATEGORY_PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_G_GU",
  "ACTION_CATEGORY_PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_G_GF": "ACTION_CATEGORY_PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_G_GF",
  "ACTION_CATEGORY_PERMANENT_LOADS_FROM_FLUIDS_G_FL": "ACTION_CATEGORY_PERMANENT_LOADS_FROM_FLUIDS_G_FL",
  "ACTION_CATEGORY_OTHER_IMPOSED_PERMANENT_DEFORMATIONS_FOR_EXAMPLE_SETTLEMENT_G_OT": "ACTION_CATEGORY_OTHER_IMPOSED_PERMANENT_DEFORMATIONS_FOR_EXAMPLE_SETTLEMENT_G_OT",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_E_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_E": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_E_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_E",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_F_ROOFS_ACCESSIBLE_ONLY_PRIVATELY_QI_F": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_F_ROOFS_ACCESSIBLE_ONLY_PRIVATELY_QI_F",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G1_ROOFS_SLOPE_LESS_THAN_20_Q_G1": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G1_ROOFS_SLOPE_LESS_THAN_20_Q_G1",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G2_ROOFS_SLOPE_MORE_THAN_40_Q_G2": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G2_ROOFS_SLOPE_MORE_THAN_40_Q_G2",
  "ACTION_CATEGORY_GR6_LOADS_FOR_BEARINGS_EXCHANGE_GR6": "ACTION_CATEGORY_GR6_LOADS_FOR_BEARINGS_EXCHANGE_GR6",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_STAIRS_APARTMENT_HOUSE_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_STAIRS_APARTMENT_HOUSE_Q_CB",
  "ACTION_CATEGORY_CIVIL_BUILDINGS_STAIRS_OTHER_Q_CB": "ACTION_CATEGORY_CIVIL_BUILDINGS_STAIRS_OTHER_Q_CB",
  "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_ROOF_SPORTS_GROUND_Q_LR": "ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_ROOF_SPORTS_GROUND_Q_LR",
  "ACTION_CATEGORY_CONSTRUCTION_AND_MAINTENANCE_LOADS_AND_HORIZONTAL_LOAD_ON_RAILINGS_ACC_TO_5_5_3_Q_CM": "ACTION_CATEGORY_CONSTRUCTION_AND_MAINTENANCE_LOADS_AND_HORIZONTAL_LOAD_ON_RAILINGS_ACC_TO_5_5_3_Q_CM",
  "ACTION_CATEGORY_IMPOSED_LOADS_DOMESTIC_AND_RESIDENTIAL_AREAS_Q_A": "ACTION_CATEGORY_IMPOSED_LOADS_DOMESTIC_AND_RESIDENTIAL_AREAS_Q_A",
  "ACTION_CATEGORY_IMPOSED_LOADS_PUBLIC_AREAS_NOT_SUSCEPTIBLE_TO_CROWDING_Q_B": "ACTION_CATEGORY_IMPOSED_LOADS_PUBLIC_AREAS_NOT_SUSCEPTIBLE_TO_CROWDING_Q_B",
  "ACTION_CATEGORY_IMPOSED_LOADS_AREAS_WHERE_PEOPLE_CAN_CONGREGATE_Q_C": "ACTION_CATEGORY_IMPOSED_LOADS_AREAS_WHERE_PEOPLE_CAN_CONGREGATE_Q_C",
  "ACTION_CATEGORY_IMPOSED_LOADS_SHOPPING_AREAS_Q_D": "ACTION_CATEGORY_IMPOSED_LOADS_SHOPPING_AREAS_Q_D",
  "ACTION_CATEGORY_IMPOSED_LOADS_LIGHT_INDUSTRIAL_USE_Q_E1": "ACTION_CATEGORY_IMPOSED_LOADS_LIGHT_INDUSTRIAL_USE_Q_E1",
  "ACTION_CATEGORY_IMPOSED_LOADS_INDUSTRIAL_USE_Q_E2": "ACTION_CATEGORY_IMPOSED_LOADS_INDUSTRIAL_USE_Q_E2",
  "ACTION_CATEGORY_IMPOSED_LOADS_STORAGE_AREAS_Q_E3": "ACTION_CATEGORY_IMPOSED_LOADS_STORAGE_AREAS_Q_E3",
  "ACTION_CATEGORY_IMPOSED_LOADS_FORK_LIFTS_Q_FL": "ACTION_CATEGORY_IMPOSED_LOADS_FORK_LIFTS_Q_FL",
  "ACTION_CATEGORY_IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_Q_F": "ACTION_CATEGORY_IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_Q_F",
  "ACTION_CATEGORY_IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_TO_160_KN_Q_G": "ACTION_CATEGORY_IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_TO_160_KN_Q_G",
  "ACTION_CATEGORY_IMPOSED_LOADS_INACCESSIBLE_ROOFS_Q_H": "ACTION_CATEGORY_IMPOSED_LOADS_INACCESSIBLE_ROOFS_Q_H",
  "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_EXCLUDING_CATEGORIES_A_TO_D_Q_J": "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_EXCLUDING_CATEGORIES_A_TO_D_Q_J",
  "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_A_Q_KA": "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_A_Q_KA",
  "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_B_Q_KB": "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_B_Q_KB",
  "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_C_Q_KC": "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_C_Q_KC",
  "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_D_Q_KD": "ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_D_Q_KD",
  "ACTION_CATEGORY_IMPOSED_LOADS_HELICOPTER_LOAD_Q_HC": "ACTION_CATEGORY_IMPOSED_LOADS_HELICOPTER_LOAD_Q_HC",
  "ACTION_CATEGORY_THERMAL_ACTIONS_QT": "ACTION_CATEGORY_THERMAL_ACTIONS_QT",
  "ACTION_CATEGORY_ACTIONS_DUE_TO_CRANES_HORIZONTAL_AND_VERTICAL_Q_CR": "ACTION_CATEGORY_ACTIONS_DUE_TO_CRANES_HORIZONTAL_AND_VERTICAL_Q_CR",
  "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUNDWATER_GEU1": "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUNDWATER_GEU1",
  "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUND_WATER_FLUIDS_GEU2": "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUND_WATER_FLUIDS_GEU2",
  "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_OTHER_ACTIONS_GEU3": "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_OTHER_ACTIONS_GEU3",
  "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUNDWATER_GEF1": "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUNDWATER_GEF1",
  "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUND_WATER_FLUIDS_GEF2": "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUND_WATER_FLUIDS_GEF2",
  "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_OTHER_ACTIONS_GEF3": "ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_OTHER_ACTIONS_GEF3",
  "ACTION_CATEGORY_VARIABLE_LOADS_FROM_FLUIDS_Q_FL": "ACTION_CATEGORY_VARIABLE_LOADS_FROM_FLUIDS_Q_FL",
  "ACTION_CATEGORY_OTHER_TYPES_OF_VARIABLE_LOADS_Q_OT": "ACTION_CATEGORY_OTHER_TYPES_OF_VARIABLE_LOADS_Q_OT",
  "ACTION_CATEGORY_PERMANENT_G1": "ACTION_CATEGORY_PERMANENT_G1",
  "ACTION_CATEGORY_PERMANENT_NON_STRUCTURAL_G2": "ACTION_CATEGORY_PERMANENT_NON_STRUCTURAL_G2",
  "ACTION_CATEGORY_PERMANENT_IMPOSED_NON_STRUCTURAL_G2": "ACTION_CATEGORY_PERMANENT_IMPOSED_NON_STRUCTURAL_G2",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_ACCESSIBLE_ONLY_FOR_MAINTENANCE_QI_H": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_ACCESSIBLE_ONLY_FOR_MAINTENANCE_QI_H",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_I_ROOFS_ACCESSIBLE_QI_I": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_I_ROOFS_ACCESSIBLE_QI_I",
  "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_ROOFS_FOR_SPECIAL_USES_HELIPORTS_QI_K": "ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_ROOFS_FOR_SPECIAL_USES_HELIPORTS_QI_K",
  "ACTION_CATEGORY_TEST_A": "ACTION_CATEGORY_TEST_A",
  "ACTION_CATEGORY_SELF_WEIGHT_Q1_1": "ACTION_CATEGORY_SELF_WEIGHT_Q1_1",
  "ACTION_CATEGORY_SOIL_Q1_2": "ACTION_CATEGORY_SOIL_Q1_2",
  "ACTION_CATEGORY_SUPPORTED_CONSTRUCTION_Q2_1": "ACTION_CATEGORY_SUPPORTED_CONSTRUCTION_Q2_1",
  "ACTION_CATEGORY_STORAGE_AREAS_Q2_2": "ACTION_CATEGORY_STORAGE_AREAS_Q2_2",
  "ACTION_CATEGORY_CONSTRUCTION_OPERATIONS_LOADING_Q2_3": "ACTION_CATEGORY_CONSTRUCTION_OPERATIONS_LOADING_Q2_3",
  "ACTION_CATEGORY_SNOW_AND_ICE_Q2_4": "ACTION_CATEGORY_SNOW_AND_ICE_Q2_4",
  "ACTION_CATEGORY_VARIABLE_PERSISTENT_HORIZONTAL_IMPOSED_ACTIONS_Q3": "ACTION_CATEGORY_VARIABLE_PERSISTENT_HORIZONTAL_IMPOSED_ACTIONS_Q3",
  "ACTION_CATEGORY_IN_SITU_CONCRETE_LOADING_ALLOWANCE_Q4_1": "ACTION_CATEGORY_IN_SITU_CONCRETE_LOADING_ALLOWANCE_Q4_1",
  "ACTION_CATEGORY_CONCRETE_PRESSURE_Q4_2": "ACTION_CATEGORY_CONCRETE_PRESSURE_Q4_2",
  "ACTION_CATEGORY_MAXIMUM_WIND_Q5_1": "ACTION_CATEGORY_MAXIMUM_WIND_Q5_1",
  "ACTION_CATEGORY_WORKING_WIND_Q5_2": "ACTION_CATEGORY_WORKING_WIND_Q5_2",
  "ACTION_CATEGORY_LOADS_PRODUCED_BY_FLOWING_WATER_Q6_1": "ACTION_CATEGORY_LOADS_PRODUCED_BY_FLOWING_WATER_Q6_1",
  "ACTION_CATEGORY_DEBRIS_EFFECT_Q6_2": "ACTION_CATEGORY_DEBRIS_EFFECT_Q6_2",
  "ACTION_CATEGORY_SEISMIC_EFFECTS_Q7": "ACTION_CATEGORY_SEISMIC_EFFECTS_Q7",
  "ACTION_CATEGORY_TEMPERATURE_Q8_1": "ACTION_CATEGORY_TEMPERATURE_Q8_1",
  "ACTION_CATEGORY_SETTLEMENT_Q8_2": "ACTION_CATEGORY_SETTLEMENT_Q8_2",
  "ACTION_CATEGORY_PRESTRESSING_Q8_3": "ACTION_CATEGORY_PRESTRESSING_Q8_3",
  "ACTION_CATEGORY_OTHER_LOADS_Q9": "ACTION_CATEGORY_OTHER_LOADS_Q9",
  "ACTION_CATEGORY_SELF_WEIGHT_STEEL_CONSTRUCTIONS_G_S1": "ACTION_CATEGORY_SELF_WEIGHT_STEEL_CONSTRUCTIONS_G_S1",
  "ACTION_CATEGORY_SELF_WEIGHT_STEEL_CONSTRUCTIONS_OVER_50_OF_TOTAL_LOAD_G_S2": "ACTION_CATEGORY_SELF_WEIGHT_STEEL_CONSTRUCTIONS_OVER_50_OF_TOTAL_LOAD_G_S2",
  "ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_MORE_THAN_1600_KG_M3_STONE_TIMBER_G_C1": "ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_MORE_THAN_1600_KG_M3_STONE_TIMBER_G_C1",
  "ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_PREFABRICATED_G_C2": "ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_PREFABRICATED_G_C2",
  "ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_ON_BUILDING_SITE_G_C3": "ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_ON_BUILDING_SITE_G_C3",
  "ACTION_CATEGORY_SELF_WEIGHT_SOIL_NATURAL_G_SN": "ACTION_CATEGORY_SELF_WEIGHT_SOIL_NATURAL_G_SN",
  "ACTION_CATEGORY_SELF_WEIGHT_SOIL_MODIFIED_G_SM": "ACTION_CATEGORY_SELF_WEIGHT_SOIL_MODIFIED_G_SM",
  "ACTION_CATEGORY_EQUIPMENT_PERMANENT_EQUIPMENT_Q_E1": "ACTION_CATEGORY_EQUIPMENT_PERMANENT_EQUIPMENT_Q_E1",
  "ACTION_CATEGORY_EQUIPMENT_ISOLATION_OF_EQUIPMENT_Q_E2": "ACTION_CATEGORY_EQUIPMENT_ISOLATION_OF_EQUIPMENT_Q_E2",
  "ACTION_CATEGORY_EQUIPMENT_CHARGES_OF_CONTAINERS_LIQUID_Q_E3": "ACTION_CATEGORY_EQUIPMENT_CHARGES_OF_CONTAINERS_LIQUID_Q_E3",
  "ACTION_CATEGORY_EQUIPMENT_CHARGES_OF_CONTAINERS_LOOSE_Q_E4": "ACTION_CATEGORY_EQUIPMENT_CHARGES_OF_CONTAINERS_LOOSE_Q_E4",
  "ACTION_CATEGORY_EQUIPMENT_FORKLIFTS_AND_ELECTRIC_TRUCKS_Q_E5": "ACTION_CATEGORY_EQUIPMENT_FORKLIFTS_AND_ELECTRIC_TRUCKS_Q_E5",
  "ACTION_CATEGORY_EQUIPMENT_STORED_MATERIALS_AND_PRODUCTS_Q_M": "ACTION_CATEGORY_EQUIPMENT_STORED_MATERIALS_AND_PRODUCTS_Q_M",
  "ACTION_CATEGORY_PREMISES_OF_BUILDINGS_UNIFORM_LOADS_LESS_THAN_2_KN_M2_Q_U1": "ACTION_CATEGORY_PREMISES_OF_BUILDINGS_UNIFORM_LOADS_LESS_THAN_2_KN_M2_Q_U1",
  "ACTION_CATEGORY_PREMISES_OF_BUILDINGS_UNIFORM_LOADS_2_KN_M2_AND_MORE_Q_U2": "ACTION_CATEGORY_PREMISES_OF_BUILDINGS_UNIFORM_LOADS_2_KN_M2_AND_MORE_Q_U2",
  "ACTION_CATEGORY_CONCENTRATED_AND_RAILING_LOADS_Q_CO": "ACTION_CATEGORY_CONCENTRATED_AND_RAILING_LOADS_Q_CO",
  "ACTION_CATEGORY_LOADS_FROM_VEHICLES_Q_V": "ACTION_CATEGORY_LOADS_FROM_VEHICLES_Q_V",
  "ACTION_CATEGORY_LOADS_FROM_CRANES_IN_GENERAL_Q_C1": "ACTION_CATEGORY_LOADS_FROM_CRANES_IN_GENERAL_Q_C1",
  "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_8K_RIGID_Q_C2": "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_8K_RIGID_Q_C2",
  "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_8K_ELASTIC_Q_C3": "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_8K_ELASTIC_Q_C3",
  "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_7K_Q_C4": "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_7K_Q_C4",
  "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_6K_Q_C5": "ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_6K_Q_C5",
  "ACTION_CATEGORY_LOADS_FROM_CRANES_OTHER_GROUPS_Q_C6": "ACTION_CATEGORY_LOADS_FROM_CRANES_OTHER_GROUPS_Q_C6",
  "ACTION_CATEGORY_SNOW_LOADINGS_Q_S": "ACTION_CATEGORY_SNOW_LOADINGS_Q_S",
  "ACTION_CATEGORY_WIND_LOADINGS_Q_W": "ACTION_CATEGORY_WIND_LOADINGS_Q_W",
  "ACTION_CATEGORY_ICE_LOADINGS_Q_I": "ACTION_CATEGORY_ICE_LOADINGS_Q_I",
  "ACTION_CATEGORY_TEMPERATURE_CLIMATIC_INFLUENCES_Q_T": "ACTION_CATEGORY_TEMPERATURE_CLIMATIC_INFLUENCES_Q_T",
  "ACTION_CATEGORY_NONE_NONE": "ACTION_CATEGORY_NONE_NONE",
  "ACTION_CATEGORY_HORIZONTAL_EARTHQUAKE_ACTION_EH": "ACTION_CATEGORY_HORIZONTAL_EARTHQUAKE_ACTION_EH",
  "ACTION_CATEGORY_VERTICAL_EARTHQUAKE_ACTION_EV": "ACTION_CATEGORY_VERTICAL_EARTHQUAKE_ACTION_EV",
  "ACTION_CATEGORY_EFFECTS_OF_HORIZONTAL_EARTHQUAKE_FORCES_QE": "ACTION_CATEGORY_EFFECTS_OF_HORIZONTAL_EARTHQUAKE_FORCES_QE",
  "ACTION_CATEGORY_PERMANENT_SOIL_GS": "ACTION_CATEGORY_PERMANENT_SOIL_GS",
  "ACTION_CATEGORY_DEAD_LOAD_SOIL_DS": "ACTION_CATEGORY_DEAD_LOAD_SOIL_DS",
  "ACTION_CATEGORY_DEAD_LOAD_SOIL_DLS": "ACTION_CATEGORY_DEAD_LOAD_SOIL_DLS",
  "ACTION_CATEGORY_DEAD_LOAD_SOIL_GKS": "ACTION_CATEGORY_DEAD_LOAD_SOIL_GKS",
};