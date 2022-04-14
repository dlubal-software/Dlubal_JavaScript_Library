/**
 * Creates empty snow load wizard
 * @class
 * @constructor
 * @param {Number}  no          Snow load wizard index, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 */
function SnowLoadWizard () {
}

/**
 * Creates flat/monopitch snow load wizard
 * @param {Number}  no                  Snow load wizard index, can be undefined
 * @param {Array}   roof_corner_nodes   Roofs corner nodes indexes
 * @param {Object}  load_case           Load case
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
SnowLoadWizard.prototype.SetMonoPitchRoofType = function (no,
    roof_corner_nodes,
    load_case,
    comment,
    params) {
    ASSERT(typeof roof_corner_nodes !== undefined, "Roof corner nodes must be specified");
    ASSERT(roof_corner_nodes.length === 4, "Four corner nodes are requested");
    ASSERT(typeof load_case !== "undefined", "Load case must be specified");
    this.snowLoadWizard = createSnowLoadWizard(no, comment, params);
    this.snowLoadWizard.type = snow_loads.TYPE_MONOPITCH;
    this.snowLoadWizard.roof_corner_nodes = roof_corner_nodes;
    this.snowLoadWizard.generate_into_load_cases[1].load_case = load_case.no;
};

/**
 * Creates duopitch snow load wizard
 * @param {Number}  no                  Snow load wizard index, can be undefined
 * @param {Array}   roof_corner_nodes   Roofs corner nodes indexes
 * @param {Object}  load_case_1         Load case (Case i)
 * @param {Object}  load_case_2         Load case (Case ii)
 * @param {Object}  load_case_3         Load case (Case iii)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Additional parameters, can be undefined
 */
SnowLoadWizard.prototype.SetDuopitch = function (no,
    roof_corner_nodes,
    load_case_1,
    load_case_2,
    load_case_3,
    comment,
    params) {
    ASSERT(typeof roof_corner_nodes !== undefined, "Roof corner nodes must be specified");
    ASSERT(roof_corner_nodes.length === 6, "Six corner nodes are requested");
    ASSERT(typeof load_case_1 !== "undefined" && typeof load_case_2 !== "undefined" && typeof load_case_3 !== "undefined", "Three different load cases must be specified");
    this.snowLoadWizard = createSnowLoadWizard(no, comment, params);
    this.snowLoadWizard.type = snow_loads.TYPE_DUOPITCH;
    this.snowLoadWizard.roof_corner_nodes = roof_corner_nodes;
    this.snowLoadWizard.generate_into_load_cases[1].load_case = load_case_1.no;
    this.snowLoadWizard.generate_into_load_cases[2].load_case = load_case_2.no;
    this.snowLoadWizard.generate_into_load_cases[3].load_case = load_case_3.no;
};

/**
 * Sets loaded roofs
 * @param {Array}   loaded_planes_accessibility   Enable or disable loaded roofs (array of booleans [roof1 | roof1, roof2])
 */
SnowLoadWizard.prototype.SetLoadedRoofs = function(loaded_planes_accessibility) {
    console.log(this.snowLoadWizard.loaded_planes.row_count());
    ASSERT(loaded_planes_accessibility.length === this.snowLoadWizard.loaded_planes.row_count(), "Number of specified planes has to be equal to number of roofs");
    for (var i = 1; i <= this.snowLoadWizard.loaded_planes.row_count(); ++i) {
        this.snowLoadWizard.loaded_planes[i].checked = loaded_planes_accessibility[i - 1];
    }
};

/**
 * Generated on members
 * @param {Array}   objects_without_loads               Without load on members, can be undefined
 * @param {Array}   objects_without_loads_parallel_to   Without load parallel to members, can be undefined
 */
SnowLoadWizard.prototype.WithoutLoadsOnMembers = function(objects_without_loads,
    objects_without_loads_parallel_to) {
    withoutLoadsOn(this.snowLoadWizard, 1, objects_without_loads, objects_without_loads_parallel_to);
};

/**
 * Generated on surfaces
 * @param {Array}   objects_without_loads               Without load on surfaces, can be undefined
 * @param {Array}   objects_without_loads_parallel_to   Without load parallel to surfaces, can be undefined
 */
SnowLoadWizard.prototype.WithoutLoadsOnSurfaces = function(objects_without_loads,
    objects_without_loads_parallel_to) {
    withoutLoadsOn(this.snowLoadWizard, 2, objects_without_loads, objects_without_loads_parallel_to);
};

/**
 * Generated on lines
 * @param {Array}   objects_without_loads               Without load on lines, can be undefined
 * @param {Array}   objects_without_loads_parallel_to   Without load parallel to lines, can be undefined
 */
SnowLoadWizard.prototype.WithoutLoadsOnLines = function(objects_without_loads,
    objects_without_loads_parallel_to) {
    withoutLoadsOn(this.snowLoadWizard, 3, objects_without_loads, objects_without_loads_parallel_to);
};

/**
 * Sets snow overhang
 * @param {Boolean} enabled     Can be undefined, true as default
 */
SnowLoadWizard.prototype.SnowOverhang = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.snowLoadWizard.snow_overhang = enabled;
};

/**
 * Sets snow guard
 * @param {Boolean} enabled     Can be undefined, true as default
 */
SnowLoadWizard.prototype.SnowGuard = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.snowLoadWizard.snow_guard = enabled;
};

/**
 * Sets lock for new members
 * @param {Boolean} enabled     Can be undefined, true as default
 */
SnowLoadWizard.prototype.LockForNewObjects = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.snowLoadWizard.lock_for_new_objects = enabled;
};

/**
 * Sets consider member eccentricity
 * @param {Boolean} enabled     Can be undefined, true as default
 */
SnowLoadWizard.prototype.ConsiderMemberEccentricity = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.snowLoadWizard.consider_member_eccentricity = enabled;
};

/**
 * Sets consider section distribution
 * @param {Boolean} enabled     Can be undefined, true as default
 */
SnowLoadWizard.prototype.ConsiderSectionDistribution = function (enabled) {
    if (typeof enabled === "undefined") {
        enabled = true;
    }
    this.snowLoadWizard.consider_section_distribution = enabled;
};

/**
 * Sets objects without load (private)
 * @param {Object}  snow_load_wizard                    Snow load wizard
 * @param {Number}  table_row                           Table row to which values hes to be set
 * @param {Array}   objects_without_loads               Object's indexes without loads
 * @param {Array}   objects_without_loads_parallel_to   Object's indexes without loads parallel to
 */
function withoutLoadsOn (snow_load_wizard,
    table_row,
    objects_without_loads,
    objects_without_loads_parallel_to) {
    if (typeof objects_without_loads !== "undefined") {
        snow_load_wizard.generated_on[table_row].objects_without_loads = objects_without_loads;
    }
    if (typeof objects_without_loads_parallel_to !== "undefined") {
        snow_load_wizard.generated_on[table_row].objects_without_loads_parallel_to = objects_without_loads_parallel_to;
    }
}

/**
 * Creates empty snow load wizard (private)
 * @param {Number}  no          Snow load wizard index, can be undefined
 * @param {String}  comment     Comment, can be undefined
 * @param {Object}  params      Additional parameters, can be undefined
 */
function createSnowLoadWizard (no,
    comment,
    params) {
    if (typeof no === "undefined") {
        no = snow_loads.count() + 1;
    }
    var snowLoadWizard = snow_loads.create(no);
    set_comment_and_parameters(snowLoadWizard, comment, params);
    return snowLoadWizard;
}