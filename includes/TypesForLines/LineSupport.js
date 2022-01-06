include("../Supports/Nonlinearities/nonlinearities.js");
include("../Supports/Functions.js");
//run("clearAll.js");


function LineSupport(  no,
                       lines,
                       comment,
                       params)
{
  /**
   * Creates nodal support hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of line support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */

    if (no === undefined) {
    	var support = line_supports.create();	
    }
    else {
    	var support = line_supports.create(no);
	};

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof lines != undefined || typeof lines != "number", "lines must be assigned as a list of numbers.");

	// Create support
	this.support = support;
  this.support.lines = lines;
  this.Nonlinear = new SupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("LineSupport " + support.no + " was created");
  var self = this;
  return self;
};

LineSupport.prototype.SetNo = function(no) {
  // * @param   {Number}  no            Index of line support, empty by default
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support = line_supports[no];
};

LineSupport.prototype.GetNo = function() {
  return this.support.no;
};

LineSupport.prototype.SetLines = function(lines) {
  // * @param   {Array}   lines         List of lines
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support.lines = lines;
}

LineSupport.prototype.SetComment = function(intent) {
  this.support.comment = intent;
  return this.support;
};

LineSupport.prototype.SetLocalCoordinateSystem = function() {
  this.support.coordinate_system = line_supports.COORDINATE_SYSTEM_LOCAL;
  console.log("LineSupport " + this.support.no + " coords changed to LCS");
  return self;
}

LineSupport.prototype.SetGlobalCoordinateSystem = function() {
  this.support.coordinate_system = line_supports.COORDINATE_SYSTEM_GLOBAL;
  console.log("LineSupport " + this.support.no + " coords changed to GCS")
  return self;
};



// ##############  Basic types of line support
// ###

LineSupport.prototype.Fixed = function() {
  this.support.spring = CreateSpringVector(true, true, true);
  this.support.rotational_restraint = CreateSpringVector(true, true, true);
  console.log("LineSupport " + this.support.no + " was changed to base type 'Fixed'");
  return this.support
   };

LineSupport.prototype.Hinged = function() {
  this.support.spring = CreateSpringVector(true, true, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  console.log("LineSupport " + this.support.no + " was changed to base type 'Hinged'");
  return self
   };

LineSupport.prototype.SlidingXY = function() {
  this.support.spring = CreateSpringVector(false, false, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

LineSupport.prototype.SlidingX = function() {
  this.support.spring = CreateSpringVector(false, true, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

LineSupport.prototype.SlidingY = function() {
  this.support.spring = CreateSpringVector(true, false, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

LineSupport.prototype.SlidingZ = function() {
  this.support.spring = CreateSpringVector(true, true, false);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

LineSupport.prototype.Free = function() {
  this.support.spring = CreateSpringVector(false, false, false);
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  return self
   };



// ##############  Line support conditions
// ###

LineSupport.prototype.Translation = function(x,y,z) {
  this.support.spring = CreateSpringVector(false, false, false);
  this.support.spring = CreateSpringVector(x, y, z);
  console.log("Spring vector changed");
  console.log("CuX: " + this.support.spring_x + "; CuY: " + this.support.spring_y + "; CuZ: " + this.support.spring_z );
  console.log("LineSupport " + this.support.no + " was edited");
  return self
   };

LineSupport.prototype.TranslationX = function(x) {
  this.support.spring_x = CreateSpring(false);
  this.support.spring_x = CreateSpring(x);
  return self
   };

LineSupport.prototype.TranslationY = function(y) {
  this.support.spring_y = CreateSpring(false);
  this.support.spring_y = CreateSpring(y);
  return self
   };

LineSupport.prototype.TranslationZ = function(z) {
  this.support.spring_z = CreateSpring(false);
  this.support.spring_z = CreateSpring(z);
  return self
   };


LineSupport.prototype.Rotation = function(x,y,z) {
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  this.support.rotational_restraint = CreateSpringVector(x, y, z);
  console.log("Rotational restrain vector changed");
  console.log("CrX: " + this.support.rotational_restraint_x + "; CrY: " + this.support.rotational_restraint_y + "; CrZ: " + this.support.rotational_restraint_z );
  console.log("LineSupport " + this.support.no + " was edited");
  return self
   };

LineSupport.prototype.RotationX = function(x) {
  this.support.rotational_restraint_x = CreateSpring(false);
  this.support.rotational_restraint_x = CreateSpring(x);
  return self
   };

LineSupport.prototype.RotationY = function(y) {
  this.support.rotational_restraint_y = CreateSpring(false);
  this.support.rotational_restraint_y = CreateSpring(y);
  return self
   };

LineSupport.prototype.RotationZ = function(z) {
  this.support.rotational_restraint_z = CreateSpring(false);
  this.support.rotational_restraint_z = CreateSpring(z);
  return self
   };



