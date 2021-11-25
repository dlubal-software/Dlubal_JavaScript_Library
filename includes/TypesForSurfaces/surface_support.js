

include("../Supports/Linear/surface/surface_support_conditions.js");
include("../Supports/Linear/surface/surface_support_conditions.js");
include("../Supports/Linear/surface/surface_support_conditions.js");
include("../Supports/Nonlinearities/nonlinearities.js");
//run("clearAll.js");



function SurfaceSupport(surfaces,
                       no,
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
  this.nonlinear = new SurfaceSupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("SurfaceSupport " + support.no + " was created");
  // object for creation new supports with callback link to instance
  var self = this;
  this.create = new NewSurfaceSupport(false, self);
  return self;
}

SurfaceSupport.prototype.setNo = function(no) {
  // * @param   {Number}  no            Index of surface support, empty by default
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support = surface_supports[no];
}

SurfaceSupport.prototype.comment = function(intent) {
  this.support.comment = intent;
  return this.support;
}




