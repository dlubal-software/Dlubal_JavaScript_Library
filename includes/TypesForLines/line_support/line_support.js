

include("line_support_conditions.js");
include("line_support_basic_types.js");
include("line_support_new_object_basic_types.js");
include("../../Supports/Nonlinearities/nonlinearities.js");
//run("clearAll.js");


function LineSupport(  lines,
                       no,
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
  this.nonlinear = new SupportNonlinearities(support);
  set_comment_and_parameters(this.support, comment, params);
  console.log("LineSupport " + support.no + " was created");
   // object for creation new supports with callback link to instance
  var self = this;
  this.create = new NewLineSupport(false, self);
  return self;
}

LineSupport.prototype.setNo = function(no) {
  // * @param   {Number}  no            Index of line support, empty by default
  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  this.support = line_supports[no];
}

LineSupport.prototype.comment = function(intent) {
  this.support.comment = intent;
  return this.support;
}

LineSupport.prototype.LCS = function() {
  this.support.coordinate_system = line_supports.COORDINATE_SYSTEM_LOCAL;
  console.log("LineSupport " + this.support.no + " coords changed to LCS");
  return self;
}

LineSupport.prototype.GCS = function() {
  this.support.coordinate_system = line_supports.COORDINATE_SYSTEM_GLOBAL;
  console.log("LineSupport " + this.support.no + " coords changed to GCS")
  return self;
};






