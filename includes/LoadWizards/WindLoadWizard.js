/**
 * IMPORTANT: only some parameters ("Parameters" tab) can be set via API (Lock for new objects, Consider member eccentricity, Consider section distribution)
 * RoofMonopitch, RoofDuopitch - non valid (how would be height specified via API?!)
 */

/**
 * Creates empty wind load wizard
 * @class
 * @constructor
 * @param {Number}  no          Wind load wizard index, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 */
function WindLoadWizard () {
}

/**
 * Creates vertical walls with flat/monopitch roof
 * @param {Number}  no                  Wind load wizard index, can be undefined
 * @param {Array}   base_corner_nodes   Base corner nodes indexes
 * @param {Array}   roof_corner_nodes   Roof corner nodes indexes
 * @param {Array}   load_cases          Load case 1, load case 2
 * @param {Array}   wind_directions     Wind directions (roof sides accesibility), can be undefined, for info setWindDirections function
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
WindLoadWizard.prototype.WallsRoofMonopitch = function (no,
    base_corner_nodes,
    roof_corner_nodes,
    load_cases,
    wind_directions,
    comment,
    params) {
    ASSERT(typeof base_corner_nodes !== "undefined" && base_corner_nodes.length === 4, "Four base corner nodes must be specified");
    ASSERT(typeof roof_corner_nodes !== "undefined" && roof_corner_nodes.length === 4, "Four roof corner nodes must be specified");
    ASSERT(typeof load_cases !== "undefined" && load_cases.length === 2, "Two load cases must be specified");
    this.windLoadWizard = createWindLoadWizard(no, comment, params);
    this.windLoadWizard.type = wind_loads.TYPE_WALLS_ROOF_MONOPITCH;
    this.windLoadWizard.base_corner_nodes = base_corner_nodes;
    this.windLoadWizard.roof_corner_nodes = roof_corner_nodes;
    this.windLoadWizard.generate_into_load_cases[1].load_case = load_cases[0];
    this.windLoadWizard.generate_into_load_cases[4].load_case = load_cases[1];
    if (typeof wind_directions !== "undefined") {
        setWindDirections(this.windLoadWizard, wind_directions);
    }
};

/**
 * Creates vertical walls with duopitch roof
 * @param {Number}  no                  Wind load wizard index, can be undefined
 * @param {Array}   base_corner_nodes   Base corner nodes indexes
 * @param {Array}   roof_corner_nodes   Roof corner nodes indexes
 * @param {Array}   load_cases          Load cases
 * @param {Array}   wind_directions     Wind directions (roof sides accesibility), can be undefined, for info setWindDirections function
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
WindLoadWizard.prototype.WallsRoofDuoPitch = function (no,
    base_corner_nodes,
    roof_corner_nodes,
    load_cases,
    wind_directions,
    comment,
    params) {
    ASSERT(typeof base_corner_nodes !== "undefined" && base_corner_nodes.length === 4, "Four base corner nodes must be specified");
    ASSERT(typeof roof_corner_nodes !== "undefined" && roof_corner_nodes.length === 6, "Six roof corner nodes must be specified");
    ASSERT(typeof load_cases !== "undefined" && load_cases.length === 4, "Four load cases must be specified");
    this.windLoadWizard = createWindLoadWizard(no, comment, params);
    this.windLoadWizard.type = wind_loads.TYPE_WALLS_ROOF_DUOPITCH;
    this.windLoadWizard.base_corner_nodes = base_corner_nodes;
    this.windLoadWizard.roof_corner_nodes = roof_corner_nodes;
    for (var i = 0; i < load_cases.length; ++i) {
        this.windLoadWizard.generate_into_load_cases[i + 1].load_case = load_cases[i];
    }
    if (typeof wind_directions !== "undefined") {
        setWindDirections(this.windLoadWizard, wind_directions);
    }
};

/**
 * Creates flat/monopitch roof
 * @param {Number}  no                  Wind load wizard index, can be undefined
 * @param {Array}   roof_corner_nodes   Roof corner nodes indexes
 * @param {Array}   load_cases          Load cases
 * @param {Array}   wind_directions     Wind directions (roof sides accesibility), can be undefined, for info setWindDirections function
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
WindLoadWizard.prototype.RoofMonoPitch = function (no,
    roof_corner_nodes,
    load_cases,
    wind_directions,
    comment,
    params) {
    ASSERT(typeof roof_corner_nodes !== "undefined" && roof_corner_nodes.length === 4, "Four roof corner nodes must be specified");
    ASSERT(typeof load_cases !== "undefined" && load_cases.length === 8, "Eight load cases must be specified");
    this.windLoadWizard = createWindLoadWizard(no, comment, params);
    this.windLoadWizard.type = wind_loads.TYPE_ROOF_MONOPITCH;
    this.windLoadWizard.roof_corner_nodes = roof_corner_nodes;
    for (var i = 0; i < load_cases.length; ++i) {
        this.windLoadWizard.generate_into_load_cases[i + 1].load_case = load_cases[i];
    }
    if (typeof wind_directions !== "undefined") {
        setWindDirections(this.windLoadWizard, wind_directions);
    }
};

/**
 * Creates duopitch roof
 * @param {Number}  no                  Wind load wizard index, can be undefined
 * @param {Array}   roof_corner_nodes   Roof corner nodes indexes
 * @param {Array}   load_cases          Load cases
 * @param {Array}   wind_directions     Wind directions (roof sides accesibility), can be undefined, for info setWindDirections function
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
WindLoadWizard.prototype.RoofDuopitch = function (no,
    roof_corner_nodes,
    load_cases,
    wind_directions,
    comment,
    params) {
    ASSERT(typeof roof_corner_nodes !== "undefined" && roof_corner_nodes.length === 6, "Six roof corner nodes must be specified");
    ASSERT(typeof load_cases !== "undefined" && load_cases.length === 12, "Twelve load cases must be specified");
    this.windLoadWizard = createWindLoadWizard(no, comment, params);
    this.windLoadWizard.type = wind_loads.TYPE_ROOF_DUOPITCH;
    this.windLoadWizard.roof_corner_nodes = roof_corner_nodes;
    for (var i = 0; i < load_cases.length; ++i) {
        this.windLoadWizard.generate_into_load_cases[i + 1].load_case = load_cases[i];
    }
    if (typeof wind_directions !== "undefined") {
        setWindDirections(this.windLoadWizard, wind_directions);
    }
};

/**
 * Sets wind perpendicular to roofs (private)
 * @param {Object}  wind_load_wizard           Wind load wizard to set
 * @param {Array}   roof_sides_accessibility   Roof sides accessibility
 *                                             [Wall 1, Wall 2, Wall 3, Wall 4] (Vertical walls with flat/monopitch roof, Vertical walls with duopitch roof)
 *                                             [Direction 1, Direction 2, Direction 3, Direction 4] (Flat monopitch roof, Duopitch roof)
 */
function setWindDirections (wind_load_wizard,
    roof_sides_accessibility) {
    ASSERT(typeof roof_sides_accessibility !== "undefined", "Roof sides accessibility must be specified");
    ASSERT(roof_sides_accessibility.length === wind_load_wizard.directions.row_count(), "Number of specified roofs has to be equal to number of roofs");
    for (var i = 1; i <= wind_load_wizard.directions.row_count(); ++i) {
        wind_load_wizard.directions[i].enabled = roof_sides_accessibility[i - 1];
    }
}

/**
 * Sets loaded walls/roofs
 * @param {Array} roofs_accessibility   Roofs/walls accessibility 
 *                                      [Wall 1, Wall 2, Wall 3, Wall4] (Vertical walls with flat/monopitch roof, Vertical walls with duopitch roof)
 *                                      [Roof 1] (Flat/monopitch roof)
 *                                      [Roof 1, Roof 2] (Duopitch roof)
 */
WindLoadWizard.prototype.SetLoadedWallsAndRoofs = function (roofs_accessibility) {
    ASSERT(typeof roofs_accessibility !== "undefined", "Roofs/walls accessibility must be specified");
    for (var i = 0; i < roofs_accessibility.length; ++i) {
        this.windLoadWizard.loaded_planes[i + 1].checked = roofs_accessibility[i];
    }
};

/**
 * Generated on members
 * @param {Array}   objects_without_loads               Without load on members, can be undefined
 * @param {Array}   objects_without_loads_parallel_to   Without load parallel to members, can be undefined
 */
 WindLoadWizard.prototype.WithoutLoadsOnMembers = function(objects_without_loads,
    objects_without_loads_parallel_to) {
    withoutLoadsOn(this.windLoadWizard, 1, objects_without_loads, objects_without_loads_parallel_to);
};

/**
 * Generated on surfaces
 * @param {Array}   objects_without_loads               Without load on surfaces, can be undefined
 * @param {Array}   objects_without_loads_parallel_to   Without load parallel to surfaces, can be undefined
 */
WindLoadWizard.prototype.WithoutLoadsOnSurfaces = function(objects_without_loads,
    objects_without_loads_parallel_to) {
    withoutLoadsOn(this.windLoadWizard, 2, objects_without_loads, objects_without_loads_parallel_to);
};

/**
 * Generated on lines
 * @param {Array}   objects_without_loads               Without load on lines, can be undefined
 * @param {Array}   objects_without_loads_parallel_to   Without load parallel to lines, can be undefined
 */
WindLoadWizard.prototype.WithoutLoadsOnLines = function(objects_without_loads,
    objects_without_loads_parallel_to) {
    withoutLoadsOn(this.windLoadWizard, 3, objects_without_loads, objects_without_loads_parallel_to);
};

/**
 * Sets lock for new members
 * @param {Boolean} enabled     Can be undefined, true as default
 */
 WindLoadWizard.prototype.LockForNewObjects = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.windLoadWizard.lock_for_new_objects = enabled;
};

/**
 * Sets consider member eccentricity
 * @param {Boolean} enabled     Can be undefined, true as default
 */
 WindLoadWizard.prototype.ConsiderMemberEccentricity = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.windLoadWizard.consider_member_eccentricity = enabled;
};

/**
 * Sets consider section distribution
 * @param {Boolean} enabled     Can be undefined, true as default
 */
 WindLoadWizard.prototype.ConsiderSectionDistribution = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.windLoadWizard.consider_section_distribution = enabled;
};

/**
 * Sets objects withoud load (private)
 * @param {Object}  wind_load_wizard                    Wind load wizard
 * @param {Number}  table_row                           Table row to which values hes to be set
 * @param {Array}   objects_without_loads               Object's indexes without loads
 * @param {Array}   objects_without_loads_parallel_to   Object's indexes without loads parallel to
 */
 function withoutLoadsOn (wind_load_wizard,
    table_row,
    objects_without_loads,
    objects_without_loads_parallel_to) {
    if (typeof objects_without_loads !== "undefined") {
        wind_load_wizard.generated_on[table_row].objects_without_loads = objects_without_loads;
    }
    if (typeof objects_without_loads_parallel_to !== "undefined") {
        wind_load_wizard.generated_on[table_row].objects_without_loads_parallel_to = objects_without_loads_parallel_to;
    }
}

/**
 * Creates empty wind load wizard (private)
 * @param {Number}  no          Wind load wizard index, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 */
function createWindLoadWizard (no,
    comment,
    params) {
    if (typeof no === "undefined") {
        no = wind_loads.count() + 1;
    }
    var windLoadWizard = wind_loads.create(no);
    set_comment_and_parameters(windLoadWizard, comment, params);
    return windLoadWizard;
}