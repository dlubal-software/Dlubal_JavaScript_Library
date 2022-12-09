/**
 * Create Surface Set
 * @class
 * @constructor
 * @param {int} no - Number of Surface Set
 * @param {array} surfaces - List of surfaces
 * @param {string} surface_set_type - Surface Set type
 * @param {string} comment - Comment for the Surface Set
 * @param {dictionary} params - Parameters of the Surface Set
 * @returns surfaceSet
 */
function SurfaceSet(no,
    surfaces,
    surface_set_type,
    comment,
    params) {

    if (arguments.length !== 0) {
        surfaces = typeof surfaces !== 'undefined' ? surfaces : [];

        this.surface_set = engine.create_surface_set(no, surfaces);

        if (surface_set_type == "") {
            this.surface_set.set_type = surface_sets.SET_TYPE_GROUP;
        }
        else {
            this.surface_set.set_type = surface_set_type;
        }
        set_comment_and_parameters(this.surface_set, comment, params);
        return this.surface_set;
    }
}

/**
 * @returns Surface set object
 */
 SurfaceSet.prototype.GetSurfaceSet = function () {
	return this.surface_set;
};

/**
 * @returns Surface set number
 */
SurfaceSet.prototype.GetNo = function () {
	return this.surface_set.no;
};

/**
 * Create Continuous Surfaces surfaceSet type
 * @param {int} no - Number of Surface Set
 * @param {array} surfaces - List of surfaces
 * @param {string} comment - Comment for the Surface Set
 * @param {dictionary} params - Parameters of the Surface Set
 */
SurfaceSet.prototype.ContinuousSurfaces = function (no,
    surfaces,
    comment,
    params) {
    surfaces = typeof surfaces !== 'undefined' ? surfaces : [];
    this.surface_set = engine.create_surface_set(no, surfaces);
    this.surface_set.set_type = surface_sets.SET_TYPE_CONTINUOUS;
    set_comment_and_parameters(this.surface_set, comment, params);
};

/**
 * Create Group of Surfaces
 * @param {int} no - Number of Surface Set
 * @param {array} surfaces - List of surfaces
 * @param {string} comment - Comment for the Surface Set
 * @param {dictionary} params - Parameters of the Surface Set
 */
SurfaceSet.prototype.GroupOfSurfaces = function (no,
    surfaces,
    comment,
    params) {
    surfaces = typeof surfaces !== 'undefined' ? surfaces : [];
    this.surface_set = engine.create_surface_set(no, surfaces);
    this.surface_set.set_type = surface_sets.SET_TYPE_GROUP;
    set_comment_and_parameters(this.surface_set, comment, params);
};