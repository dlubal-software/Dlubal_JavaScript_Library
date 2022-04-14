include("../Supports/Nonlinearities/Nonlinearities.js");
include("../Supports/Functions.js");

function MemberSupport(no,
  members,
  comment,
  params) {
  /**
  * Creates nodal support hight level function

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof members != undefined || typeof members != "number", "Members must be assigned as a list of numbers.");

  if (no === undefined) {
    var support = member_supports.create();
  }
  else {
    var support = member_supports.create(no);
  }
  // Create support
  this.support = support;
  this.support.members = members;
  // Create functions for support conditions
  this.Nonlinear = new MemberSupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  // object for creation new supports with callback link to instance
  var self = this;
  return self;
}

MemberSupport.prototype.SetNo = function (no) {
  // * @param   {Number}  no            Index of member support, empty by default
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support = member_supports[no];
};

MemberSupport.prototype.SetMembers = function (members) {
  // * @param   {Array}   members       List of members
  ASSERT(typeof members != undefined || typeof members != "number", "Members must be assigned as a list of numbers.");
  this.support.members = members;
};

MemberSupport.prototype.SetComment = function (intent) {
  this.support.comment = intent;
  return this.support;
};

// ##############  Basic types of member support
// ###
MemberSupport.prototype.Fixed = function () {
  this.support.spring_translation = CreateSpringVector(true, true, true);
  this.support.spring_shear = CreateSpringVector(true, true, true);
  this.support.spring_rotation = CreateSpring(true);
  return self;
};

MemberSupport.prototype.SlidingXY = function () {
  this.support.spring_translation = CreateSpringVector(false, false, true);
  this.support.spring_shear = CreateSpringVector(false, false, true);
  this.support.spring_rotation = CreateSpring(true);
  return self;
};

MemberSupport.prototype.SlidingX = function () {
  this.support.spring_translation = CreateSpringVector(false, true, true);
  this.support.spring_shear = CreateSpringVector(false, true, true);
  this.support.spring_rotation = CreateSpring(true);
  return self;
};

MemberSupport.prototype.SlidingY = function () {
  this.support.spring_translation = CreateSpringVector(true, false, true);
  this.support.spring_shear = CreateSpringVector(true, false, true);
  this.support.spring_rotation = CreateSpring(true);
  return self;
};

MemberSupport.prototype.SlidingZ = function () {
  this.support.spring_translation = CreateSpringVector(true, true, false);
  this.support.spring_shear = CreateSpringVector(true, true, false);
  this.support.spring_rotation = CreateSpring(true);
  return self;
};

MemberSupport.prototype.Free = function () {
  this.support.spring_translation = CreateSpringVector(false, false, false);
  this.support.spring_shear = CreateSpringVector(false, false, false);
  this.support.spring_rotation = CreateSpring(false);
  return self;
};

// ##############  Member support conditions
// ###
MemberSupport.prototype.Translation = function (x, y, z) {
  this.support.spring_translation = CreateSpringVector(x, y, z);
  return self;
};

MemberSupport.prototype.Shear = function (x, y, z) {
  this.support.spring_shear = CreateSpringVector(x, y, z);
  return self;
};

MemberSupport.prototype.Rotation = function (rx) {
  this.support.spring_rotation = CreateSpring(rx);
  return self;
};

MemberSupport.prototype.TranslationX = function (x) {
  this.support.spring_translation_x = CreateSpring(x);
  return self;
};

MemberSupport.prototype.TranslationY = function (y) {
  this.support.spring_translation_y = CreateSpring(y);
  return self;
};

MemberSupport.prototype.TranslationZ = function (z) {
  this.support.spring_translation_z = CreateSpring(z);
  return self;
};

MemberSupport.prototype.ShearX = function (x) {
  this.support.spring_shear_x = CreateSpring(x);
  return self;
};

MemberSupport.prototype.ShearY = function (y) {
  this.support.spring_shear_y = CreateSpring(y);
  return self;
};

MemberSupport.prototype.ShearZ = function (z) {
  this.support.spring_shear_z = CreateSpring(z);
  return self;
};
