include("../Supports/Functions.js");
include("../Supports/Nonlinearities/Nonlinearities.js");

/**
 * Creates nodal support hight level function
 * @class
 * @constructor
 * @param {Number}  no            Index of nodal support, empty by default
 * @param {Array}   nodes         List of nodes
 * @param {String}  comment       Comment, empty by default
 * @param {Object}  params        Nodal support parameters, empty by default
 * @returns Nodal support object
 */
function NodalSupport(no, nodes, comment, params) {

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes must be assigned as a list of numbers.");

  if (no === undefined) {
    var support = nodal_supports.create();
  }
  else {
    var support = nodal_supports.create(no);
  }

  // Create support
  this.support = support;
  this.support.nodes = nodes;
  this.Nonlinear = new SupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  // object for creation new supports with callback link to instance
  var self = this;
  return self;
}

/**
 * Nodal support brief report
 */
NodalSupport.prototype.Status = function () {
  console.log("no: " + this.support.no);
  console.log("assigned to nodes: " + this.support.nodes);
  console.log("CuX " + this.support.spring_x);
  console.log("CuY " + this.support.spring_y);
  console.log("CuZ " + this.support.spring_z);
  console.log("CrX: " + this.support.rotational_restraint_x);
  console.log("CrY: " + this.support.rotational_restraint_y);
  console.log("CrZ: " + this.support.rotational_restraint_z);
};

// assign nodes to nodal support
/**
 * Set nodes to nodal supports
 * @param {Array}   nodes       List of nodes
 * @returns Nodal support object
 */
NodalSupport.prototype.SetNodes = function (nodes) {
  this.support.nodes = nodes;
  return this.support;
};

/**
 * Set comment to nodal support
 * @param {String} comment Content of comment
 * @returns Nodal support object
 */
NodalSupport.prototype.SetComment = function (comment) {
  this.support.comment = comment;
  return this.support;
};

/**
 * Set identification number to nodal support
 * @param {Number} no identification number of nodal support
 */
NodalSupport.prototype.SetNo = function (no) {
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  if (no === undefined) {
    this.support = nodal_supports[1];
  }
  else {
    this.support = nodal_supports[no];
  }
};

NodalSupport.prototype.GetNo = function () {
  return this.support.no;
};

// ##############  Basic types of nodal support
// ###
/**
 * Set nodal support as fixed
 * @returns Nodal support object
 */
NodalSupport.prototype.Fixed = function () {
  this.support.spring = CreateSpringVector(true, true, true);
  this.support.rotational_restraint = CreateSpringVector(true, true, true);
  return self;
};

/**
 * Set nodal support as hinged
 * @returns Nodal support object
 */
NodalSupport.prototype.Hinged = function () {
  this.support.spring = CreateSpringVector(true, true, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self;
};

/**
 * Set nodal support as roller
 * @returns Nodal support object
 */
NodalSupport.prototype.Roller = function () {
  this.support.spring = CreateSpringVector(false, false, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self;
};

/**
 * Set nodal support as roller in X direction
 * @returns Nodal support object
 */
NodalSupport.prototype.RollerX = function () {
  this.support.spring = CreateSpringVector(false, true, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self;
};

/**
 * Set nodal support as roller in Y direction
 * @returns Nodal support object
 */
NodalSupport.prototype.RollerY = function () {
  this.support.spring = CreateSpringVector(true, false, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self;
};

/**
 * Set nodal support as roller in Z direction
 * @returns Nodal support object
 */
NodalSupport.prototype.RollerZ = function () {
  this.support.spring = CreateSpringVector(true, true, false);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self;
};

/**
 * Sets nodal support free
 * @returns Nodal support object
 */
NodalSupport.prototype.Free = function () {
  this.support.spring = CreateSpringVector(false, false, false);
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  return self;
};

// ##############  Nodal support conditions
// ###

/**
 * Sets flexible stiffness for translations
 * @param {Number} x Stiffness in X direction
 * @param {Number} y Stiffness in Y direction
 * @param {Number} z Stiffness in Z direction
 * @returns Nodal support object
 */
NodalSupport.prototype.Translation = function (x, y, z) {
  this.support.spring = CreateSpringVector(false, false, false);
  this.support.spring = CreateSpringVector(x, y, z);
  return self;
};

/**
 * Sets flexible stiffness in X direction for translation
 * @param {Number} x Stiffness in X direction
 * @returns Nodal support object
 */
NodalSupport.prototype.TranslationX = function (x) {
  this.support.spring_x = CreateSpring(false);
  this.support.spring_x = CreateSpring(x);
  return self;
};

/**
 * Sets flexible stiffness in Y direction for translation
 * @param {Number} y Stiffness in Y direction
 * @returns Nodal support object
 */
NodalSupport.prototype.TranslationY = function (y) {
  this.support.spring_y = CreateSpring(false);
  this.support.spring_y = CreateSpring(y);
  return self;
};

/**
 * Sets flexible stiffness in Z direction for translation
 * @param {Number} z Stiffness in Z direction
 * @returns Nodal support object
 */
NodalSupport.prototype.TranslationZ = function (z) {
  this.support.spring_z = CreateSpring(false);
  this.support.spring_z = CreateSpring(z);
  return self;
};

/**
 * Sets flexible stiffness for rotations
 * @param {Number} x Stiffness around X direction
 * @param {Number} y Stiffness around Y direction
 * @param {Number} z Stiffness around Z direction
 * @returns Nodal support object
 */
NodalSupport.prototype.Rotation = function (x, y, z) {
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  this.support.rotational_restraint = CreateSpringVector(x, y, z);
  return self;
};

/**
 * Sets flexible stiffness around X direction for rotation
 * @param {Number} x Stiffness around x direction
 * @returns Nodal support object
 */
NodalSupport.prototype.RotationX = function (x) {
  this.support.rotational_restraint_x = CreateSpring(false);
  this.support.rotational_restraint_x = CreateSpring(x);
  return self;
};

/**
 * Sets flexible stiffness around Y direction for rotation
 * @param {Number} y Stiffness around y direction
 * @returns Nodal support object
 */
NodalSupport.prototype.RotationY = function (y) {
  this.support.rotational_restraint_y = CreateSpring(false);
  this.support.rotational_restraint_y = CreateSpring(y);
  return self;
};

/**
 * Sets flexible stiffness around Z direction for rotation
 * @param {Number} z Stiffness around z direction
 * @returns Nodal support object
 */
NodalSupport.prototype.RotationZ = function (z) {
  this.support.rotational_restraint_z = CreateSpring(false);
  this.support.rotational_restraint_z = CreateSpring(z);
  return self;
};
