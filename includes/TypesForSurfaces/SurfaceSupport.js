include("../Supports/Nonlinearities/nonlinearities.js");
include("../Supports/Functions.js");



function SurfaceSupport(no,
                       surfaces,
                       comment,
                       params)
{

   /**
  * Creates nodal support hight level function 

  * @param   {Array}   surfaces       List of surfaces
  * @param   {Number}  no            Index of surface support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof surfaces != undefined || typeof surfaces != "number", "Nodes must be assigned as a list of numbers.");

    if (no === undefined) {
    	var support = surface_supports.create();	
    }
    else {
    	var support = surface_supports.create(no);
	};
	// Create support
	this.support = support;
  this.support.surfaces = surfaces;
  // Create functions for support conditions
  this.Nonlinear = new SurfaceSupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("SurfaceSupport " + support.no + " was created");
  // object for creation new supports with callback link to instance
  var self = this;
  return self;
}

SurfaceSupport.prototype.SetNo = function(no) {
  // * @param   {Number}  no            Index of surface support, empty by default
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support = surface_supports[no];
}

SurfaceSupport.prototype.SetComment = function(intent) {
  this.support.comment = intent;
  return this.support;
};


// ##############  Basic types of surface support
// ###

SurfaceSupport.prototype.Fixed = function() {
  this.support.translation = CreateSpringVector(true, true, true);
  console.log("SurfaceSupport " + this.support.no + " was edited. Base type 'Fixed'");
  return self
   };


SurfaceSupport.prototype.SlidingXY = function() {
  this.support.translation = CreateSpringVector(false, false, true);
  console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingXY'");
  return self
   };

SurfaceSupport.prototype.SlidingX = function() {
  this.support.translation = CreateSpringVector(false, true, true);
  console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingX'");
  return self
   };


SurfaceSupport.prototype.SlidingY = function() {
  this.support.translation = CreateSpringVector(true, false, true);
  console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingY'");
  return self
   };


SurfaceSupport.prototype.SlidingZ = function() {
  this.support.translation = CreateSpringVector(true, true, false);
  this.support.shear_xz = CreateSpring(false);
  this.support.shear_xz = CreateSpring(false);
  console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingZ'");
  return self
   };

SurfaceSupport.prototype.Free = function() {
  this.support.translation = CreateSpringVector(false, false, false);
  this.support.shear_xz = CreateSpring(false);
  this.support.shear_xz = CreateSpring(false);
  console.log("SurfaceSupport " + this.support.no + " was created. Base type 'Free'");
  return self
   };



// ##############  Surface support conditions
// ###

SurfaceSupport.prototype.Translation = function(x,y,z) {
  this.support.translation = CreateSpringVector(x, y, z);
  return self
   };


SurfaceSupport.prototype.TranslationX = function(x) {
  this.support.translation_x = CreateSpring(x);
  return self
   };


SurfaceSupport.prototype.TranslationY = function(y) {
  this.support.translation_y = CreateSpring(y);
  return self
   };


SurfaceSupport.prototype.TranslationZ = function(z) {
  this.support.translation_z = CreateSpring(z);
  return self
   };


SurfaceSupport.prototype.ShearX = function(x) {
  if (this.support.translation_z != surface_supports.SPRING_CONSTANT_NO) {
    console.log("Shear spring constant is allowed only in case that translation Z is set to free.")
  }
  else {
    this.support.shear_xz = CreateSpring(x);
  }
   };


SurfaceSupport.prototype.ShearY = function(y) {
  if (this.support.translation_z != surface_supports.SPRING_CONSTANT_NO) {
    console.log("Shear spring constant is allowed only in case that translation Z is set to free.")
  }
  else {
    this.support.shear_yz = CreateSpring(y);
  }
   };