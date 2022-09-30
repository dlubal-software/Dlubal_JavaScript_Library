if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Internal forces.");
}

/*
There is no value ("u,v", "y,z") - bug?
load_cases.E_INTERNAL_FORCES_SYSTEM_PRINCIPAL_AXES_U_V
load_cases.E_INTERNAL_FORCES_SYSTEM_AXES_X_Y
*/

/**
 * Creates Internal forces
 * @class
 * @constructor
 * @param {Number} no                       Number of internal forces, can be undefined
 * @param {Object} load_case_no             Number of Load case
 * @param {String} internal_forces_system   Internal forces relative to, can be undefined ("y,z" as default)
 * @param {Number} location_x               Location, can be undefined (0 as default)
 * @param {Number} member_no                Number of member, can be undefined
 * @param {String} comment                  Comment, can be undefined
 * @param {Object} params                   Parameters, can be undefined
 * @returns Created Internal forces
 */
function RSectionInternalForces (no,
    load_case_no,
    internal_forces_system,
    location_x,
    member_no,
    comment,
    params) {
    ASSERT(typeof load_case_no !== "undefined", "Load case must be specified");
    if (load_cases.exist(load_case_no)) {
        var row = load_cases[load_case_no].internal_forces.count();
        if (typeof internal_forces_system !== "undefined") {
            if (internal_forces_system in internal_forces_system_types) {
                this.internal_forces = load_cases[load_case_no].internal_forces.create();
                load_cases[load_case_no].internal_forces[row + 1].internal_forces_system = internal_forces_system_types[internal_forces_system];
            }
            else {
                console.log("Internal forces system type " + internal_forces_system + " doesn't exist");
                get_internal_forces_system_types();
            }
        }
        if (typeof location_x !== "undefined") {
            this.internal_forces.location_x = location_x;
        }
        if (typeof member_no !== "undefined") {
            this.internal_forces.member_no = member_no;
        }
        set_comment_and_parameters(internal_forces, comment, params);
    }
    else {
        console.log("Load case no. " + load_case_no + " doesn't exist");
    }
}

/**
 * Sets axial force
 * @param {Number} axial_force  Axial force
 * @returns Modified internal forces
 */
RSectionInternalForces.prototype.AxialForce = function (axial_force) {
    ASSERT(typeof axial_force !== "undefined", "Axial force must be defined");
    this.internal_forces.axial_force_n = axial_force;
    return this.internal_forces;
};

/**
 * Sets shear forces
 * @param {Number} shear_force_1    Shear force Vu|Vy (in condition of intrenal forces system), can be undefined (0 by default)
 * @param {Number} shear_force_2    Shear force Vv|Vz (in condition of internal forces system), can be undefined (0 by default)
 * @returns Modified Internal forces
 */
RSectionInternalForces.prototype.ShearForces = function (shear_force_1,
    shear_force_2) {
    if (this.internal_forces.internal_forces_system === internal_forces_system_types["U_V"]) {
        if (typeof shear_force_1 !== "undefined") {
            this.internal_forces.shear_force_v_u = shear_force_1;
        }
        if (typeof shear_force_2 !== "undefined") {
            this.internal_forces.shear_force_v_v = shear_force_2;
        }
    }
    else {
        ASSERT(this.internal_forces.internal_forces_system === internal_forces_system_types["Y_Z"]);
        if (typeof shear_force_1 !== "undefined") {
            this.internal_forces.shear_force_v_y = shear_force_1;
        }
        if (typeof shear_force_2 !== "undefined") {
            this.internal_forces.shear_force_v_z = shear_force_2;
        }
    }
    return this.internal_forces;
};

/**
 * Sets torsional moments
 * @param {Number} torsional_moment_m_xp   Torsional moment Mxp, can be undefined (0 by default)
 * @param {Number} torsional_moment_m_xs   Torsional moment Mxs, can be undefined (0 by default)
 * @return Modified Internal forces
 */
RSectionInternalForces.prototype.TorsionalMoments = function (torsional_moment_m_xp,
    torsional_moment_m_xs) {
    if (typeof torsional_moment_m_xp !== "undefined") {
        this.internal_forces.torsional_moment_m_xp = torsional_moment_m_xp;
    }
    if (typeof torsional_moment_m_xs !== "undefined") {
        this.internal_forces.torsional_moment_m_xs = torsional_moment_m_xs;
    }
    return this.internal_forces;
};

/**
 * Sets bending moments
 * @param {Number} bending_moment_1    Bending moment Mu|My (in condition of intrenal forces system), can be undefined (0 by default)
 * @param {Number} bending_moment_2    Bending moment Mv|Mz (in condition of internal forces system), can be undefined (0 by default)
 * @returns Modified Internal forces
 */
RSectionInternalForces.prototype.BendingMoments = function (bending_moment_1,
    bending_moment_2) {
     if (this.internal_forces.internal_forces_system === internal_forces_system_types["U_V"]) {
        if (typeof bending_moment_1 !== "undefined") {
            this.internal_forces.bending_moment_m_u = bending_moment_1;
        }
        if (typeof bending_moment_2 !== "undefined") {
            this.internal_forces.bending_moment_m_v = bending_moment_2;
        }
    }
    else {
        ASSERT(this.internal_forces.internal_forces_system === internal_forces_system_types["Y_Z"]);
        if (typeof bending_moment_1 !== "undefined") {
            this.internal_forces.bending_moment_m_y = bending_moment_1;
        }
        if (typeof bending_moment_2 !== "undefined") {
            this.internal_forces.bending_moment_m_z = bending_moment_2;
        }
    }
    return this.internal_forces;
};

RSectionInternalForces.prototype.Bimoment = function (bimoment_m_omega) {
    ASSERT(typeof bimoment_m_omega !== "undefined", "Bimoment must be defined");
    this.internal_forces.bimoment_m_omega = bimoment_m_omega;
    return this.internal_forces;
};

/**
 * Shows list of all available internal forces system types
 */
 function get_internal_forces_system_types () {
    console.log(Object.keys(internal_forces_system_types));
};

const internal_forces_system_types = {
    "U_V" : /*load_cases.E_INTERNAL_FORCES_SYSTEM_PRINCIPAL_AXES_U_V*/"u,v",
    "Y_Z" : /*load_cases.E_INTERNAL_FORCES_SYSTEM_AXES_X_Y*/"y,z"
};