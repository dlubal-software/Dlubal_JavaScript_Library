include("nodal_support_conditions.js");
include("nodal_support_basic_types.js");
include("../../Supports/Nonlinearities/nonlinearities.js");

// Nodal support object
function NodalSupport(nodes, no, comment, params) {
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
  this.nonlinear = new SupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("NodalSupport " + support.no + " was created");
  // object for creation new supports with callback link to instance
  var self = this;
  this.create = new NewNodalSupport(false, self);
  return self;
};

// nodal support brief report
NodalSupport.prototype.status = function() {
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
NodalSupport.prototype.nodes = function(nodes) {
  //  * @param   {Array}   nodes       List of nodes
  this.support.nodes = nodes;
  console.log("NodalSupport " + this.support.no + " was asigned to nodes: " + this.support.nodes);
  console.log("NodalSupport " + this.support.no + " was edited");
  return this.support;
}


NodalSupport.prototype.comment = function(intent) {
  this.support.comment = intent;
  return this.support;
};

NodalSupport.prototype.setNo = function(no) {
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  if (no === undefined) {
    this.support = nodal_supports[1]; 
    }
    else {
    this.support = nodal_supports[no];
  };
  console.log("current support is nodal_support[" + this.support.no + "].")
}


NodalSupport.prototype.getNo = function() {
  return this.support.no;
}




