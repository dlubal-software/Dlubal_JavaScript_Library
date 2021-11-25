include("../functions.js");

function createNewLineSupport(no) {
	if (no === undefined) {
		var support = line_supports.create();
	}
  	else {
    	var support = line_supports.create(no);
  	};
	return support;
};

function NewLineSupport(message, obj) {
	if (message != false){
	console.log("for new line support use option for some base type. ex: .fixed(), .hinged()")
	};
	// Access to instance of LineSupport object
	this.obj = obj;
};

NewLineSupport.prototype.fixed = function(lines, no, comment, params) {
/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");

	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(true, true, true);
	support.rotational_restraint = create_spring_vector(true, true, true);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'Fixed'");
	change_active_obj(this.obj, support);
	return support
	 };


NewLineSupport.prototype.hinged = function(lines, no, comment, params) {
	/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */

	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	
	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(true, true, true);
	support.rotational_restraint = create_spring_vector(false, false, false);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'Hinged'");
	change_active_obj(this.obj, support);
	return support
	 };


NewLineSupport.prototype.slidingXY = function(lines, no, comment, params) {
/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */

	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	
	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(false, false, true);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'SlidingXY'");
	change_active_obj(this.obj, support);
	return support
	 };


NewLineSupport.prototype.slidingX = function(lines, no, comment, params) {
/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */

	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	
	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(false, true, true);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'SlidingX'");
	change_active_obj(this.obj, support);
	return support
	 };

NewLineSupport.prototype.slidingY = function(lines, no, comment, params) {
/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");

	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(true, false, true);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'SlidingY'");
	change_active_obj(this.obj, support);
	return support
	 };

NewLineSupport.prototype.slidingZ = function(lines, no, comment, params) {
/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");

	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(true, true, false);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'SlidingZ'");
	change_active_obj(this.obj, support);
	return support
	 };

NewLineSupport.prototype.free = function(lines, no, comment, params) {
/**
   * Creates line support from instance of hight level function 

   * @param   {Array}   lines         List of lines
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");

	support = createNewLineSupport(no);
	support.lines = lines;
	support.spring = create_spring_vector(false, false, false);
	support.rotational_restraint = create_spring_vector(false, false, false);
	set_comment_and_parameters(support, comment, params);
	console.log("LineSupport " + support.no + " was created. Base type 'Free'");
	change_active_obj(this.obj, support);
	return support
	 };









