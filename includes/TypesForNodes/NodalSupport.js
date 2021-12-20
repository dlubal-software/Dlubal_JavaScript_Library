include("../Supports/Functions.js");
include("../Supports/Nonlinearities/Nonlinearities.js");

// Nodal support object
function NodalSupport(no, nodes, comment, params) {
    /**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes must be assigned as a list of numbers.");
  
  if (no === undefined) {
  	var support = nodal_supports.create();	
  }
  else {
  	var support = nodal_supports.create(no);
	};
	
  // Create support
	this.support = support;
  this.support.nodes = nodes;
  this.Nonlinear = new SupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("NodalSupport " + support.no + " was created");
  // object for creation new supports with callback link to instance
  var self = this;
  return self;
};

// nodal support brief report
NodalSupport.prototype.Status = function() {
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
NodalSupport.prototype.SetNodes = function(nodes) {
  //  * @param   {Array}   nodes       List of nodes
  this.support.nodes = nodes;
  console.log("NodalSupport " + this.support.no + " was asigned to nodes: " + this.support.nodes);
  console.log("NodalSupport " + this.support.no + " was edited");
  return this.support;
}


NodalSupport.prototype.SetComment = function(intent) {
  this.support.comment = intent;
  return this.support;
};

NodalSupport.prototype.SetNo = function(no) {
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  if (no === undefined) {
    this.support = nodal_supports[1]; 
    }
    else {
    this.support = nodal_supports[no];
  };
  console.log("current support is nodal_support[" + this.support.no + "].")
};


NodalSupport.prototype.GetNo = function() {
  return this.support.no;
};



// ##############  Basic types of nodal support
// ###

NodalSupport.prototype.Fixed = function() {
  this.support.spring = CreateSpringVector(true, true, true);
  this.support.rotational_restraint = CreateSpringVector(true, true, true);
  return self
   };

NodalSupport.prototype.Hinged = function() {
  this.support.spring = CreateSpringVector(true, true, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

NodalSupport.prototype.Roller = function() {
  this.support.spring = CreateSpringVector(false, false, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

NodalSupport.prototype.RollerX = function() {
  this.support.spring = CreateSpringVector(false, true, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

NodalSupport.prototype.RollerY = function() {
  this.support.spring = CreateSpringVector(true, false, true);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

NodalSupport.prototype.RollerZ = function() {
  this.support.spring = CreateSpringVector(true, true, false);
  this.support.rotational_restraint = CreateSpringVector(false, false, true);
  return self
   };

NodalSupport.prototype.Free = function() {
  this.support.spring = CreateSpringVector(false, false, false);
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  return self
   };


// ##############  Nodal support conditions
// ###

NodalSupport.prototype.Translation = function(x,y,z) {
  this.support.spring = CreateSpringVector(false, false, false);
  this.support.spring = CreateSpringVector(x, y, z);
  console.log("Spring vector changed");
  console.log("CuX: " + this.support.spring_x + "; CuY: " + this.support.spring_y + "; CuZ: " + this.support.spring_z );
  console.log("NodalSupport " + this.support.no + " was edited");
  return self
   };

NodalSupport.prototype.TranslationX = function(x) {
  this.support.spring_x = CreateSpring(false);
  this.support.spring_x = CreateSpring(x);
  return self
   };

NodalSupport.prototype.TranslationY = function(y) {
  this.support.spring_y = CreateSpring(false);
  this.support.spring_y = CreateSpring(y);
  return self
   };

NodalSupport.prototype.TranslationZ = function(z) {
  this.support.spring_z = CreateSpring(false);
  this.support.spring_z = CreateSpring(z);
  return self
   };


NodalSupport.prototype.Rotation = function(x,y,z) {
  this.support.rotational_restraint = CreateSpringVector(false, false, false);
  this.support.rotational_restraint = CreateSpringVector(x, y, z);
  console.log("Rotational restrain vector changed");
  console.log("CrX: " + this.support.rotational_restraint_x + "; CrY: " + this.support.rotational_restraint_y + "; CrZ: " + this.support.rotational_restraint_z );
  console.log("NodalSupport " + this.support.no + " was edited");
  return self
   };

NodalSupport.prototype.RotationX = function(x) {
  this.support.rotational_restraint_x = CreateSpring(false);
  this.support.rotational_restraint_x = CreateSpring(x);
  return self
   };

NodalSupport.prototype.RotationY = function(y) {
  this.support.rotational_restraint_y = CreateSpring(false);
  this.support.rotational_restraint_y = CreateSpring(y);
  return self
   };

NodalSupport.prototype.RotationZ = function(z) {
  this.support.rotational_restraint_z = CreateSpring(false);
  this.support.rotational_restraint_z = CreateSpring(z);
  return self
   };


