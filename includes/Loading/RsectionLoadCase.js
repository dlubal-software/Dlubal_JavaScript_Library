if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Load cases.");
}

/**
 * Create RSection Load case
 * @class
 * @constructor
 * @param {Number}  no                  Number of Load case, can be undefined
 * @param {String}  action_category     Action category
 * @param {String}  name                Name, can be undefined
 * @param {Boolean} to_solve            To solve, can be undefined (true as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Load case
 */
function RSectionLoadCase (no,
    action_category,
    name,
    to_solve,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.load_case = createBaseLoadCase(no, action_category, name, to_solve, comment, params);
    }
}

/**
 * Returns load case object
 */
RSectionLoadCase.prototype.GetLoadcase = function () {
    return this.load_case;
}

/**
 * Returns load case number
 */
RSectionLoadCase.prototype.GetNo = function () {
    return this.load_case.no;
}

/**
 * @param {Number}  no                  Number of Load case, can be undefined
 * @param {String}  action_category     Action category
 * @param {String}  name                Name, can be undefined
 * @param {Boolean} to_solve            To solve, can be undefined (true as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 * @returns Load case
 */
function createBaseLoadCase (no,
    action_category,
    name,
    to_solve,
    comment,
    params) {
    if (typeof no !== "undefined") {
        var load_case = load_cases.create(no);
    }
    else {
        var load_case = load_cases.create();
    }
    ASSERT(typeof action_category !== "undefined", "Action category must be defined");
    if (!(action_category in actionCategories)) {
        console.log("Action category " + action_category + " doesn't match");
        get_action_categories_types();
    }
    else {
        load_case.action_category = actionCategories[action_category];
    }
    if (typeof to_solve !== "undefined") {
        load_case.to_solve = to_solve;
    }
    load_case.name = name;
    set_comment_and_parameters(load_case, comment, params);
    return load_case;
}

/**
 * Shows list of all available design situation types
 */
 function get_action_categories_types () {
    console.log(Object.keys(actionCategories));
};

const actionCategories = {
    "PERMANENT_G" : "Permanent | G",
    "PERMANENT_SMALL_FLUCTUATIONS_G_ASTERISK" : "Permanent - small fluctuations | G*",
    "WEIGHT_OF_ICE_DI" : "Weight of ice | Di",
    "DEAD_LOAD_D" : "Dead load | D",
    "DEAD_LOAD_DL" : "Dead load | DL",
    "DEAD_LOAD_GK" : "Dead load | GK",
    "PERMANENT_FROM_CRANES_G_CR" : "Permanent from cranes | G Cr",
    "PERMANENT_IMPOSED_GQ" : "Permanent/Imposed | Gq",
    "PRESTRESS_P" : "Prestress | P",
    "SELF_STRAINING_FORCE_T" : "Self-straining force | T",
    "IMPOSED_DEFORMATIONS_DUE_TO_PRE_STRESSING_P" : "Imposed deformations due to pre-stressing | P",
    "VARIABLE_Q" : "Variable | Q",
    "LIVE_LOAD_L" : "Live load | L",
    "ROOF_LIVE_LOAD_LR" : "Roof live load | Lr",
    "NOTIONAL_LOAD_FOR_STRUCTURAL_INTEGRITY_N" : "Notional load for structural integrity | N",
    "IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A" : "Imposed loads - category A: domestic, residential areas | QI A",
    "IMPOSED_LOADS_CATEGORY_B_OFFICE_AREAS_QI_B" : "Imposed loads - category B: office areas | QI B",
    "IMPOSED_LOADS_CATEGORY_C_CONGREGATION_AREAS_QI_C" : "Imposed loads - category C: congregation areas | QI C",
    "IMPOSED_LOADS_CATEGORY_D_SHOPPING_AREAS_QI_D" : "Imposed loads - category D: shopping areas | QI D",
    "IMPOSED_LOADS_CATEGORY_E_STORAGE_AREAS_QI_E" : "Imposed loads - category E: storage areas | QI E",
    "IMPOSED_LOADS_LIVE_LOADS_LL" : "Imposed loads (live loads) | LL",
    "IMPOSED_LOAD_QK" : "Imposed load | QK",
    "ACTIONS_WITH_LIMITED_MAXIMUM_VALUES_Q_LI" : "Actions with limited maximum values | Q Li",
    "GENERAL_VARIABLE_ACTIONS_Q_GE" : "General variable actions | Q Ge",
    "IMPOSED_LOADS_CATEGORY_F_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_F" : "Imposed loads - category F: traffic area - vehicle weight <= 30 kN | QI F",
    "IMPOSED_LOADS_CATEGORY_G_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_160_KN_QI_G" : "Imposed loads - category G: traffic area - vehicle weight <= 160 kN | QI G",
    "IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H" : "Imposed loads - category H: roofs | QI H",
    "IMPOSED_LOADS_CATEGORY_I_ROOFS_HELICOPTER_QI_I" : "Imposed loads - category I: roofs - helicopter | QI I",
    "IMPOSED_LOADS_CATEGORY_J_ROOFS_HELIPORT_EQUIPMENT_QI_J" : "Imposed loads - category J: roofs - heliport, equipment | QI J",
    "IMPOSED_LOADS_CATEGORY_H_INACCESSIBLE_ROOFS_QI_H" : "Imposed loads - category H: inaccessible roofs | QI H",
    "IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_HELICOPTER_QI_K" : "Imposed loads - category K: flat roofs - helicopter | QI K",
    "IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_OTHER_QI_K" : "Imposed loads - category K´: flat roofs - other | QI K´",
    "SNOW_ICE_LOADS_QS" : "Snow/Ice loads | Qs",
    "SNOW_ICE_LOADS_FINLAND_ICELAND_QS" : "Snow/Ice loads - Finland, Iceland, ... | Qs",
    "SNOW_ICE_LOADS_H_GREATER_THAN_1000_M_QS" : "Snow/Ice loads - H > 1000 m | Qs",
    "SNOW_ICE_LOADS_H_LESS_OR_EQUAL_TO_1000_M_QS" : "Snow/Ice loads - H <= 1000 m | Qs",
    "ICE_QI" : "Ice | Qi",
    "SNOW_ICE_LOADS_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS" : "Snow/Ice loads - sk <= 2.75 kN/m2 | Qs",
    "SNOW_ICE_LOADS_SK_GREATER_THAN_2_75_KN_M2_QS" : "Snow/Ice loads - sk > 2.75 kN/m2 | Qs",
    "SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS" : "Snow/Ice loads - outdoor terraces and balconies - sk <= 2.75 kN/m2 | Qs",
    "SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_GREATER_THAN_2_75_KN_M2_QS" : "Snow/Ice loads - outdoor terraces and balconies - sk > 2.75 kN/m2 | Qs",
    "SNOW_LOAD_S" : "Snow load | S",
    "WIND_QW" : "Wind | Qw",
    "WIND_LOAD_W" : "Wind load | W",
    "WIND_ON_ICE_DETERMINED_IN_ACCORDANCE_WITH_SECTION_10_WI" : "Wind-on-ice determined in accordance with section 10 | WI",
    "LIVE_LOAD_DUE_TO_WIND_W" : "Live load due to wind | W",
    "WIND_LOAD_WL" : "Wind load | WL",
    "WIND_LOAD_WK" : "Wind load | WK",
    "WIND_LOAD_ACCORDING_TO_8_1_4_W" : "Wind load according to 8.1.4 | W",
    "TEMPERATURE_NON_FIRE_QT" : "Temperature (non-fire) | QT",
    "INFLUENCES_RESULTING_FROM_TEMPERATURE_CHANGES_SHRINKAGE_OR_CREEP_ETC_T" : "Influences resulting from temperature changes, shrinkage or creep, etc. | T",
    "TEMPERATURE_SHRINKAGE_CREEP_ETC_T" : "Temperature, shrinkage, creep, etc. | T",
    "THERMAL_ACTION_ACCORDING_TO_9_1_3_T" : "Thermal action according to 9.1.3 | T",
    "FOUNDATION_SUBSIDENCE_QF" : "Foundation subsidence | Qf",
    "ACTION_FROM_SOIL_PERMANENT_EARTH_LOADS_GS" : "Action from soil - permanent - earth loads | Gs",
    "ACTION_FROM_SOIL_PERMANENT_EARTH_PRESSURE_GS" : "Action from soil - permanent - earth pressure | Gs",
    "ACTION_FROM_SOIL_PERMANENT_WATER_PRESSURE_GS" : "Action from soil - permanent - water pressure | Gs",
    "ACTION_FROM_SOIL_VARIABLE_EARTH_PRESSURE_GS" : "Action from soil - variable - earth pressure | Gs",
    "ACTION_FROM_SOIL_VARIABLE_WATER_PRESSURE_GS" : "Action from soil - variable - water pressure | Gs",
    "LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_GROUND_WATER_PRESSURE_H" : "Load due to lateral earth pressure, ground water pressure | H",
    "LATERAL_EARTH_PRESSURE_H" : "Lateral earth pressure | H",
    "GEOTECHNICAL_LOADS_PERMANENT_GEP" : "Geotechnical loads - permanent | GeP",
    "GEOTECHNICAL_LOADS_VARIABLE_GEV" : "Geotechnical loads - variable | GeV",
    "OTHER_ACTIONS_QO" : "Other actions | Qo",
    "LOAD_DUE_TO_FLUIDS_WITH_WELL_DEFINED_PRESSURES_AND_MAXIMUM_HEIGHTS_F" : "Load due to fluids with well-defined pressures and maximum heights | F",
    "FLOOD_LOAD_FA" : "Flood load | Fa",
    "RAIN_LOAD_R" : "Rain load | R",
    "CRANE_LOAD_CL" : "Crane load | CL",
    "ERECTION_LOAD_ER" : "Erection load | ER",
    "ACTION_CATEGORY_NOTIONAL_HORIZONTAL_FORCES_ACCORDING_TO_BS_5950_NK" : "Notional horizontal forces according to BS 5950 | NK",
    "DURING_EXECUTION_Q_EX" : "Actions during Execution | Q Ex",
    "RAIN_LOAD_QR" : "Rain load | Qr",
    "ACCIDENTAL_ACTIONS_A" : "Accidental actions | A",
    "ACCIDENTAL_LOAD_AL" : "Accidental load | AL",
    "EXCEPTIONAL_EXC" : "Exceptional | Exc",
    "LOAD_ARISING_FROM_EXTRAORDINARY_EVENT_AK" : "Load arising from extraordinary event | Ak",
    "SEISMIC_ACTIONS_AE" : "Seismic actions | AE",
    "EARTHQUAKE_LOAD_E" : "Earthquake load | E",
    "LIVE_LOAD_DUE_TO_EARTHQUAKE_E" : "Live load due to earthquake | E",
    "EARTHQUAKE_LOAD_EL" : "Earthquake load | EL",
    "SEISMIC_AE" : "Seismic | AE",
    "EARTHQUAKE_LOAD_VERTICAL_EV" : "Earthquake load, vertical | Ev",
    "EARTHQUAKE_LOAD_HORIZONTAL_EH" : "Earthquake load, horizontal | Eh",
    "UNEVEN_SETTLEMENTS_G_US" : "Uneven Settlements | G uS",
    "GR1A_LM1_PEDESTRIAN_CYCLE_TRACK_GR1A" : "gr1a - LM1 + pedestrian + cycle track | gr1a",
    "GR1B_SINGLE_AXLE_GR1B" : "gr1b - single axle | gr1b",
    "GR2_HORIZONTAL_FORCES_LM1_GR2" : "gr2 - Horizontal forces + LM1 | gr2",
    "GR3_PEDESTRIAN_LOAD_GR3" : "gr3 - Pedestrian load | gr3",
    "GR4_CROWD_LOADING_PEDESTRIAN_LOAD_GR4" : "gr4 - Crowd loading + pedestrian load | gr4",
    "GR5_SPECIAL_VEHICLES_LM1_GR5" : "gr5 - Special vehicles + LM1 | gr5",
    "WIND_LOADS_FWK_PERSISTENT_DESIGN_SITUATIONS_QWP" : "Wind loads - FWK - Persistent design situations | QwP",
    "WIND_LOADS_FWK_EXECUTION_QWE" : "Wind loads - FWK - Execution | QwE",
    "WIND_LOADS_FW_QW" : "Wind loads - FW´´ | Qw",
    "CONSTRUCTION_LOADS_DUE_TO_WORKING_PERSONNEL_Q_CP" : "Construction loads due to working personnel | Q CP",
    "SNOW_ICE_LOADS_SK_GREATER_OR_EQUAL_TO_3_KN_M2_QS" : "Snow/Ice Loads - sk >= 3 kN/m2 | Qs",
    "SNOW_ICE_LOADS_2_LESS_OR_EQUAL_TO_SK_LESSER_THAN_3_KN_M2_QS" : "Snow/Ice Loads - 2 <= sk < 3 kN/m2 | Qs",
    "SNOW_ICE_LOADS_1_LESS_OR_EQUAL_TO_SK_LESSER_THAN_2_KN_M2_QS" : "Snow/Ice Loads - 1 <= sk < 2 kN/m2 | Qs",
    "SNOW_REGION_SAINT_PIERRE_AND_MIQUELON_QS" : "Snow - region Saint-Pierre and Miquelon | Qs",
    "SNOW_ICE_AND_RAIN_S" : "Snow, ice and rain | S",
    "SNOW_LOAD_ZONE_I_S" : "Snow load - zone I | S",
    "SNOW_LOAD_ZONE_II_S" : "Snow load - zone II | S",
    "SNOW_LOAD_ZONE_III_S" : "Snow load - zone III | S",
    "OTHER_CONSTRUCTION_LOADS_Q_CO" : "Other construction loads | Q CO",
    "SETTLEMENTS_OF_SUPPORTS_SHRINKAGE_SETT" : "Settlements of supports, shrinkage | Sett",
    "CRANE_LOADS_WORKING_GRADES_A1_A3_Q_CR" : "Crane loads - working grades A1 - A3 | Q Cr",
    "CRANE_LOADS_WORKING_GRADES_A4_A5_Q_CR" : "Crane loads - working grades A4, A5 | Q Cr",
    "CRANE_LOADS_WORKING_GRADES_A6_A7_Q_CR" : "Crane loads - working grades A6, A7 | Q Cr",
    "CRANE_LOADS_LIFTING_HOOK_CRANES_OF_WORKING_GRADE_A8_Q_CR" : "Crane loads - lifting hook cranes of working grade A8 | Q Cr",
    "CIVIL_BUILDINGS_DWELLING_HOSTEL_HOTEL_OFFICE_HOSPITAL_WARD_Q_CB" : "Civil buildings - dwelling, hostel, hotel, office, hospital ward | Q CB",
    "CIVIL_BUILDINGS_CLASSROOM_LABORATORY_READING_ROOM_MEETING_ROOM_Q_CB" : "Civil buildings - classroom, laboratory, reading room, meeting room | Q CB",
    "CIVIL_BUILDINGS_CANTEEN_DINING_HALL_ORDINARY_ARCHIVES_Q_CB" : "Civil buildings - canteen, dining hall, ordinary archives | Q CB",
    "CIVIL_BUILDINGS_ASSEMBLY_HALL_THEATER_CINEMA_Q_CB" : "Civil buildings - assembly hall, theater, cinema | Q CB",
    "CIVIL_BUILDINGS_LAUNDRY_Q_CB" : "Civil buildings - laundry | Q CB",
    "CIVIL_BUILDINGS_STORES_AND_SHOPS_EXHIBITION_HALLS_STATION_PORT_AIRPORT_Q_CB" : "Civil buildings - stores and shops, exhibition halls, station, port, airport | Q CB",
    "CIVIL_BUILDINGS_STANDS_WITHOUT_FIXED_SEAT_Q_CB" : "Civil buildings - stands without fixed seat | Q CB",
    "CIVIL_BUILDINGS_GYMNASIUM_ARENA_Q_CB" : "Civil buildings - gymnasium, arena | Q CB",
    "CIVIL_BUILDINGS_DANCE_HALL_Q_CB" : "Civil buildings - dance hall | Q CB",
    "CIVIL_BUILDINGS_STOREHOUSE_FOR_COLLECTING_BOOKS_ARCHIVES_STOREROOMS_Q_CB" :  "Civil buildings - storehouse for collecting books, archives, storerooms | Q CB",
    "CIVIL_BUILDINGS_WAREHOUSE_WITH_A_DENSE_CONCENTRATION_OF_SHELVING_Q_CB" : "Civil buildings - warehouse with a dense concentration of shelving | Q CB",
    "CIVIL_BUILDINGS_VENTILATOR_MOTOR_ROOM_ELEVATOR_MOTOR_ROOM_Q_CB" : "Civil buildings - ventilator motor room, elevator motor room | Q CB",
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_BUS_Q_CB" : "Civil buildings - automobile passage and garage, one-way slab floor, bus | Q CB",
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_ROOF_BUS_Q_CB" : "Civil buildings - automobile passage and garage, two-way slab roof, bus | Q CB",
    "CIVIL_BUILDINGS_KITCHEN_FOR_DINING_HALL_Q_CB" : "Civil buildings - kitchen for dining hall | Q CB",
    "CIVIL_BUILDINGS_KITCHEN_OTHER_Q_CB" : "Civil buildings - kitchen, other | Q CB",
    "CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_BUILDINGS_IN_ITEM_NO_1_Q_CB" : "Civil buildings - bathroom, toilet and washroom, buildings in item No. 1 | Q CB",
    "CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_FOR_OTHER_BUILDINGS_Q_CB" : "Civil buildings - bathroom, toilet and washroom, for other buildings | Q CB",
    "CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_HOSTEL_HOTEL_NURSERY_Q_CB" : "Civil buildings - passage, entrance hall, staircase - hostel, hotel, nursery | Q CB",
    "CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_OFFICE_CLASSROOM_Q_CB" : "Civil buildings - passage, entrance hall, staircase - office, classroom | Q CB",
    "CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_THICK_STREAM_OF_PEOPLE_Q_CB" : "Civil buildings - passage, entrance hall, staircase - thick stream of people | Q CB",
    "CIVIL_BUILDINGS_BALCONY_POPULATION_MAY_BE_CONCENTRATED_Q_CB" : "Civil buildings - balcony, population may be concentrated | Q CB",
    "CIVIL_BUILDINGS_BALCONY_OTHER_Q_CB" : "Civil buildings - balcony, other | Q CB",
    "INDUSTRIAL_BUILDINGS_METAL_WORKING_WORKSHOP_TABLE_D_0_1_1_Q_IB" : "Industrial buildings - metal working workshop, Table D.0.1-1 | Q IB",
    "INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_1_2_4_6_Q_IB" : "Industrial buildings - manufacturing workshop, Table D.0.1-2, Item No. 1,2,4,6 | Q IB",
    "INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_3_5_Q_IB" : "Industrial buildings - manufacturing workshop, Table D.0.1-2, Item No. 3,5 | Q IB",
    "INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_7_Q_IB" : "Industrial buildings - manufacturing workshop, Table D.0.1-2, Item No. 7 | Q IB",
    "INDUSTRIAL_BUILDINGS_SEMICONDUCTOR_PRODUCTION_WORKSHOP_TABLE_D_0_1_3_Q_IB" : "Industrial buildings - semiconductor production workshop, Table D.0.1-3 | Q IB",
    "INDUSTRIAL_BUILDINGS_COTTON_MILLING_WORKSHOP_TABLE_D_0_1_4_Q_IB" : "Industrial buildings - cotton milling workshop, Table D.0.1-4 | Q IB",
    "INDUSTRIAL_BUILDINGS_PREPARATORY_WORKSHOP_FOR_TIRE_PLANT_TABLE_D_0_1_5_Q_IB" : "Industrial buildings - preparatory workshop for tire plant, Table D.0.1-5 | Q IB",
    "INDUSTRIAL_BUILDINGS_GRAIN_PROCESSING_WORKSHOP_TABLE_D_0_1_6_Q_IB" : "Industrial buildings - grain processing workshop, Table D.0.1-6 | Q IB",
    "LIVE_LOADS_ON_ROOFS_UNMANNED_ROOF_Q_LR" : "Live loads on roofs - unmanned roof | Q LR",
    "LIVE_LOADS_ON_ROOFS_MANNED_ROOF_Q_LR" : "Live loads on roofs - manned roof | Q LR",
    "LIVE_LOADS_ON_ROOFS_ROOF_GARDEN_Q_LR" : "Live loads on roofs - roof garden | Q LR",
    "LIVE_LOADS_ON_ROOFS_HELICOPTER_ON_THE_ROOF_ACC_TO_5_3_2_Q_LR" : "Live loads on roofs - helicopter on the roof, acc. to 5.3.2 | Q LR",
    "ASH_LOAD_ON_ROOFINGS_TABLE_5_4_1_1_Q_AS" : "Ash load on roofings, Table 5.4.1-1 | Q As",
    "ASH_LOAD_ON_ROOFINGS_ADJACENT_TO_BLAST_FURNACE_TABLE_5_4_1_2_Q_AS" : "Ash load on roofings, adjacent to blast furnace, Table 5.4.1-2 | Q As",
    "IMPOSED_LOADS_FROM_CRANES_CLASS_1_7_Q_CR" : "Imposed loads from cranes - Class 1-7 | Q Cr",
    "IMPOSED_LOADS_FROM_CRANES_CLASS_8_Q_CR" : "Imposed loads from cranes - Class 8 | Q Cr",
    "IMPOSED_LOADS_FROM_CRANES_CLASS_9_10_Q_CR" : "Imposed loads from cranes - Class 9, 10 | Q Cr",
    "IMPOSED_LOADS_FROM_CRANES_CLASS_11_12_13_Q_CR" : "Imposed loads from cranes - Class 11, 12, 13 | Q Cr",
    "IMPOSED_LOADS_FROM_CRANES_SUPPORT_FORCES_Q_CR" : "Imposed loads from cranes - Support forces | Q Cr",
    "SELF_WEIGHT_OF_METAL_STRUCTURES_G_ME" : "Self-weight of metal structures | G Me",
    "SELF_WEIGHT_OF_PREFABRICATED_STRUCTURES_G_PR" : "Self-weight of prefabricated structures | G Pr",
    "SELF_WEIGHT_OF_STRUCTURES_BUILT_ON_SITE_G_SI" : "Self weight of structures built on site | G Si",
    "INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_G_IN" : "Industrialized construction elements | G In",
    "INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_WITH_ADDITION_ON_SITE_G_IS" : "Industrialized construction elements with addition on site | G IS",
    "GENERAL_CONSTRUCTION_ELEMENTS_AND_EQUIPMENT_G_GE" : "General construction elements and equipment | G Ge",
    "PERMANENT_SELF_WEIGHT_SELF_WEIGHT_OF_SOIL_G" : "Permanent - self-weight, self-weight of soil | G",
    "PERMANENT_EARTH_PRESSURE_G_E" : "Permanent - earth pressure | G E",
    "PERMANENT_WATER_PRESSURE_G_W" : "Permanent - water pressure | G W",
    "SELF_WEIGHT_G" : "Self-weight | G",
    "PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_G_GU" : "Permanent geotechnical actions - soil parameters un-factored | G Gu",
    "PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_G_GF" : "Permanent geotechnical actions - soil parameters factored | G Gf",
    "PERMANENT_LOADS_FROM_FLUIDS_G_FL" : "Permanent loads from fluids | G Fl",
    "OTHER_IMPOSED_PERMANENT_DEFORMATIONS_FOR_EXAMPLE_SETTLEMENT_G_OT" : "Other imposed permanent deformations (for example settlement) | G Ot",
    "IMPOSED_LOADS_CATEGORY_E_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_E" : "Imposed loads - category E: traffic area - vehicle weight <= 30 kN | QI E",
    "IMPOSED_LOADS_CATEGORY_E_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_E" : "Imposed loads - category E: traffic area - vehicle weight <= 30 kN | QI E",
    "IMPOSED_LOADS_CATEGORY_G1_ROOFS_SLOPE_LESS_THAN_20_Q_G1" : "Imposed loads - category G1: roofs - slope less than 20° | Q G1",
    "IMPOSED_LOADS_CATEGORY_G2_ROOFS_SLOPE_MORE_THAN_40_Q_G2" : "Imposed loads - category G2: roofs - slope more than 40° | Q G2",
    "GR6_LOADS_FOR_BEARINGS_EXCHANGE_GR6" : "gr6 - Loads for bearings exchange | gr6",
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB" : "Civil buildings - automobile passage and garage, one-way slab floor, fire engine | Q CB",
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB" : "Civil buildings - automobile passage and garage, two-way slab floor, fire engine | Q CB",
    "CIVIL_BUILDINGS_STAIRS_APARTMENT_HOUSE_Q_CB" : "Civil buildings - stairs, apartment house | Q CB",
    "CIVIL_BUILDINGS_STAIRS_OTHER_Q_CB" : "Civil buildings - stairs, other | Q CB",
    "LIVE_LOADS_ON_ROOFS_ROOF_SPORTS_GROUND_Q_LR" : "Live loads on roofs - roof sports ground | Q LR",
    "CONSTRUCTION_AND_MAINTENANCE_LOADS_AND_HORIZONTAL_LOAD_ON_RAILINGS_ACC_TO_5_5_3_Q_CM" : "Construction and maintenance loads, and horizontal load on railings acc. to 5.5.3 | Q CM",
    "IMPOSED_LOADS_DOMESTIC_AND_RESIDENTIAL_AREAS_Q_A" : "Imposed loads: domestic and residential areas | Q A",
    "IMPOSED_LOADS_PUBLIC_AREAS_NOT_SUSCEPTIBLE_TO_CROWDING_Q_B" : "Imposed loads: public areas not susceptible to crowding | Q B",
    "IMPOSED_LOADS_AREAS_WHERE_PEOPLE_CAN_CONGREGATE_Q_C" : "Imposed loads: areas where people can congregate | Q C",
    "IMPOSED_LOADS_SHOPPING_AREAS_Q_D" : "Imposed loads: shopping areas | Q D",
    "IMPOSED_LOADS_LIGHT_INDUSTRIAL_USE_Q_E1" : "Imposed loads: light industrial use | Q E1",
    "IMPOSED_LOADS_INDUSTRIAL_USE_Q_E2" : "Imposed loads: industrial use | Q E2",
    "IMPOSED_LOADS_STORAGE_AREAS_Q_E3" : "Imposed loads: storage areas | Q E3",
    "IMPOSED_LOADS_FORK_LIFTS_Q_FL" : "Imposed loads: fork lifts | Q FL",
    "IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_Q_F" : "Imposed loads: traffic and parking areas for vehicles ≤ 25 kN | Q F",
    "IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_TO_160_KN_Q_G" : "Imposed loads: traffic and parking areas for vehicles 25 kN to 160 kN | Q G",
    "IMPOSED_LOADS_INACCESSIBLE_ROOFS_Q_H" : "Imposed loads: inaccessible roofs | Q H",
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_EXCLUDING_CATEGORIES_A_TO_D_Q_J" : "Imposed loads: accessible flat roofs, excluding categories A to D | Q J",
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_A_Q_KA" : "Imposed loads: accessible flat roofs with occupancy A | Q KA",
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_B_Q_KB" : "Imposed loads: accessible flat roofs with occupancy B | Q KB",
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_C_Q_KC" : "Imposed loads: accessible flat roofs with occupancy C | Q KC",
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_D_Q_KD" : "Imposed loads: accessible flat roofs with occupancy D | Q KD",
    "IMPOSED_LOADS_HELICOPTER_LOAD_Q_HC" : "Imposed loads: helicopter load | Q HC",
    "THERMAL_ACTIONS_QT" : "Thermal actions | Qt",
    "ACTIONS_DUE_TO_CRANES_HORIZONTAL_AND_VERTICAL_Q_CR" : "Actions due to cranes (horizontal and vertical) | Q Cr",
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUNDWATER_GEU1" : "Variable geotechnical actions - soil parameters un-factored: groundwater | GeU1",
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUND_WATER_FLUIDS_GEU2" : "Variable geotechnical actions - soil parameters un-factored: ground water (fluids) | GeU2",
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_OTHER_ACTIONS_GEU3" : "Variable geotechnical actions - soil parameters un-factored: other actions | GeU3",
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUNDWATER_GEF1" : "Variable geotechnical actions - soil parameters factored: groundwater | GeF1",
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_OTHER_ACTIONS_GEF3" : "Variable geotechnical actions - soil parameters factored: other actions | GeF3",
    "VARIABLE_LOADS_FROM_FLUIDS_Q_FL" : "Variable loads from fluids | Q Fl",
    "OTHER_TYPES_OF_VARIABLE_LOADS_Q_OT" : "Other types of variable loads | Q Ot",
    "PERMANENT_G1" : "Permanent | G1",
    "PERMANENT_NON_STRUCTURAL_G2" : "Permanent - non-structural | G2",
    "PERMANENT_IMPOSED_NON_STRUCTURAL_G2" : "Permanent/Imposed - non-structural | G2´",
    "IMPOSED_LOADS_CATEGORY_H_ROOFS_ACCESSIBLE_ONLY_FOR_MAINTENANCE_QI_H" : "Imposed loads - category H: roofs - accessible only for maintenance | QI H",
    "IMPOSED_LOADS_CATEGORY_I_ROOFS_ACCESSIBLE_QI_I" : "Imposed loads - category I: roofs - accessible | QI I",
    "IMPOSED_LOADS_CATEGORY_K_ROOFS_FOR_SPECIAL_USES_HELIPORTS_QI_K" : "Imposed loads - category K: roofs - for special uses (heliports, ...) | QI K",
    "SELF_WEIGHT_Q1_1" : "Self-weight | Q1,1",
    "SOIL_Q1_2" : "Soil | Q1,2",
    "SUPPORTED_CONSTRUCTION_Q2_1" : "Supported construction | Q2,1",
    "STORAGE_AREAS_Q2_2" : "Storage areas | Q2,2",
    "CONSTRUCTION_OPERATIONS_LOADING_Q2_3" : "Construction operations loading | Q2,3",
    "SNOW_AND_ICE_Q2_4" : "Snow and ice | Q2,4",
    "VARIABLE_PERSISTENT_HORIZONTAL_IMPOSED_ACTIONS_Q3" : "Variable persistent horizontal imposed actions | Q3",
    "IN_SITU_CONCRETE_LOADING_ALLOWANCE_Q4_1" : "In situ concrete loading allowance | Q4,1",
    "CONCRETE_PRESSURE_Q4_2" : "Concrete pressure | Q4,2",
    "MAXIMUM_WIND_Q5_1" : "Maximum wind | Q5,1",
    "WORKING_WIND_Q5_2" : "Working wind | Q5,2",
    "LOADS_PRODUCED_BY_FLOWING_WATER_Q6_1" : "Loads produced by flowing water | Q6,1",
    "DEBRIS_EFFECT_Q6_2" : "Debris effect | Q6,2",
    "SEISMIC_EFFECTS_Q7" : "Seismic effects | Q7",
    "TEMPERATURE_Q8_1" : "Temperature | Q8,1",
    "SETTLEMENT_Q8_2" : "Settlement | Q8,2",
    "PRESTRESSING_Q8_3" : "Prestressing | Q8,3",
    "OTHER_LOADS_Q9" : "Other loads | Q9",
    "SELF_WEIGHT_STEEL_CONSTRUCTIONS_G_S1" : "Self weight - steel constructions | G S1",
    "SELF_WEIGHT_STEEL_CONSTRUCTIONS_OVER_50_OF_TOTAL_LOAD_G_S2" : "Self weight - steel constructions (over 50% of total load) | G S2",
    "SELF_WEIGHT_CONCRETE_MORE_THAN_1600_KG_M3_STONE_TIMBER_G_C1" : "Self weight - concrete (more than 1600 kg/m3), stone, timber | G C1",
    "SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_PREFABRICATED_G_C2" : "Self weight - concrete (1600 kg/m3 and less) - prefabricated | G C2",
    "SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_ON_BUILDING_SITE_G_C3" : "Self weight - concrete (1600 kg/m3 and less) - on building site | G C3",
    "SELF_WEIGHT_SOIL_NATURAL_G_SN" : "Self weight - soil natural | G Sn",
    "SELF_WEIGHT_SOIL_MODIFIED_G_SM" : "Self weight - soil modified | G Sm",
    "EQUIPMENT_PERMANENT_EQUIPMENT_Q_E1" : "Equipment - permanent equipment | Q E1",
    "EQUIPMENT_ISOLATION_OF_EQUIPMENT_Q_E2" : "Equipment - isolation of equipment | Q E2",
    "EQUIPMENT_CHARGES_OF_CONTAINERS_LIQUID_Q_E3" : "Equipment - charges of containers - liquid | Q E3",
    "EQUIPMENT_CHARGES_OF_CONTAINERS_LOOSE_Q_E4" : "Equipment - charges of containers - loose | Q E4",
    "EQUIPMENT_FORKLIFTS_AND_ELECTRIC_TRUCKS_Q_E5" : "Equipment - forklifts and electric trucks | Q E5",
    "EQUIPMENT_STORED_MATERIALS_AND_PRODUCTS_Q_M" : "Equipment - stored materials and products | Q M",
    "PREMISES_OF_BUILDINGS_UNIFORM_LOADS_LESS_THAN_2_KN_M2_Q_U1" : "Premises of buildings - uniform loads - less than 2 kN/m2 | Q U1",
    "PREMISES_OF_BUILDINGS_UNIFORM_LOADS_2_KN_M2_AND_MORE_Q_U2" : "Premises of buildings - uniform loads - 2 kN/m2 and more | Q U2",
    "CONCENTRATED_AND_RAILING_LOADS_Q_CO" : "Concentrated and railing loads | Q Co",
    "LOADS_FROM_VEHICLES_Q_V" : "Loads from vehicles | Q V",
    "LOADS_FROM_CRANES_IN_GENERAL_Q_C1" : "Loads from cranes - in general | Q C1",
    "LOADS_FROM_CRANES_GROUP_8K_RIGID_Q_C1" : "Loads from cranes - group 8K, rigid | Q C1",
    "LOADS_FROM_CRANES_GROUP_8K_ELASTIC_Q_C2" : "Loads from cranes - group 8K, elastic | Q C2",
    "LOADS_FROM_CRANES_GROUP_7K_Q_C3" : "Loads from cranes - group 7K | Q C3",
    "LOADS_FROM_CRANES_GROUP_6K_Q_C4" : "Loads from cranes - group 6K | Q C4",
    "LOADS_FROM_CRANES_OTHER_GROUPS_Q_C5" : "Loads from cranes - other groups | Q C5",
    "SNOW_LOADINGS_Q_S" : "Snow loadings | Q S",
    "CATEGORY_WIND_LOADINGS_Q_W" : "Wind loadings | Q W",
    "ICE_LOADINGS_Q_I" : "Ice loadings | Q I",
    "TEMPERATURE_CLIMATIC_INFLUENCES_Q_T" : "Temperature climatic influences | Q T",
    "NONE_NONE" : "None | None",
    "UNIT_LOADS_QU" : "Unit loads | Qu",
    "PLACEMENT_LOADS_QP" : "Placement loads | Qp",
    "OTHER_LIVE_LOADS_QO" : "Other live loads | Qo",
    "HORIZONTAL_EARTHQUAKE_ACTION_EH" : "Horizontal earthquake action | Eh",
    "VERTICAL_EARTHQUAKE_ACTION_EV" : "Vertical earthquake action | Ev",
    "EFFECTS_OF_HORIZONTAL_EARTHQUAKE_FORCES_QE" : "Effects of horizontal earthquake forces | Qe",
    "PERMANENT_SOIL_GS" : "Permanent/Soil | Gs",
    "DEAD_LOAD_SOIL_DS" : "Dead load - soil | Ds",
    "DEAD_LOAD_SOIL_DLS" : "Dead load - soil | DLs",
    "DEAD_LOAD_SOIL_GKS": "Dead load - soil | GKs",
    "IMPOSED_ACTION_Q" : "Imposed action | Q",
    "ULTIMATE_WIND_ACTION_WU" : "Ultimate wind action | Wu",
    "SERVICEABILITY_WIND_ACTION_WS" : "Serviceability wind action | Ws",
    "SNOW_ACTION_FSN" : "Snow action | Fsn",
    "ICE_ACTION_FICE" : "Ice action | Fice",
    "ULTIMATE_EARTHQUAKE_ACTION_EU" : "Ultimate earthquake action | Eu",
    "SERVICEABILITY_EARTHQUAKE_ACTION_ES" : "Serviceability earthquake action | Es",
    "LIQUID_PRESSURE_FLP" : "Liquid pressure | Flp",
    "GROUND_WATER_FGW" : "Ground water | Fgw",
    "RAINWATER_PONDING_FPND" : "Rainwater ponding | Fpnd",
    "EARTH_PRESSURE_FE" : "Earth pressure | Fe",
    "THERMAL_ACTIONS_ARISING_FROM_THE_FIRE_T" : "Thermal actions arising from the fire | T",
    "SPECIAL_LOADINGS_PS" : "Special loadings | Ps",
    "LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_OR_PRESSURE_OF_BULK_MATERIALS_HEB" : "Load due to lateral earth pressure or pressure of bulk materials | Heb",
    "LOAD_DUE_TO_GROUND_WATER_PRESSURE_HW" : "Load due to ground water pressure | Hw",
    "TORNADO_LOAD_WT" : "Tornado load | Wt",
    "ACCIDENTAL_ACTION_A" : "Accidental action | A"
}
