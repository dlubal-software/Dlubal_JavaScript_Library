include("../functions.js");

function createNewNodalSupport(no) {
	if (no === undefined) {
		var support = nodal_supports.create();
	}
  	else {
    	var support = nodal_supports.create(no);
  	};
	return support;
};

function NewNodalSupport(message, obj) {
	if (message != false){
	console.log("for new node support use option for some base type. ex: .fixed(), .hinged()")
	};
	// access to instance of NodalSupport object
	this.obj = obj;
};


NewNodalSupport.prototype.fixed = function(nodes, no, comment, params) {
	    /**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(true, true, true);
	support.rotational_restraint = create_spring_vector(true, true, true); 
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'Fixed'");
	change_active_obj(this.obj, support);
	return support;
	 };


NewNodalSupport.prototype.hinged = function(nodes, no, comment, params) {
	/**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(true, true, true);
	support.rotational_restraint = create_spring_vector(false, false, false);
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'Hinged'");
	change_active_obj(this.obj, support);
	return support
	 };

NewNodalSupport.prototype.roller = function(nodes, no, comment, params) {
 /**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(false, false, true);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'rollerXY'");
	change_active_obj(this.obj, support);
	return support
	 };

NewNodalSupport.prototype.rollerX = function(nodes, no, comment, params) {
	    /**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(false, true, true);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'rollerX'");
	change_active_obj(this.obj, support);
	return support
	 };


NewNodalSupport.prototype.rollerY = function(nodes, no, comment, params) {
	    /**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");	
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(true, false, true);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'rollerY'");
	change_active_obj(this.obj, support);
	return support
	 };


NewNodalSupport.prototype.rollerZ = function(nodes, no, comment, params) {
	    /**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(true, true, false);
	support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'rollerZ'");
	change_active_obj(this.obj, support);
	return support
	 };


NewNodalSupport.prototype.free = function(nodes, no, comment, params) {
/**
   * Creates nodal support hight level function 

   * @param   {Array}   nodes         List of nodes
   * @param   {Number}  no            Index of nodal support, empty by default
   * @param   {String}  comment       Comment, empty by default
   * @param   {Object}  params        Nodal support parameters, empty by default
  */
	ASSERT(typeof no != undefined || typeof no != "number", "No is assigned as a number.");
  	ASSERT(typeof nodes != undefined || typeof nodes != "number", "Nodes is assigned as a list of numbers.");	
	support = createNewNodalSupport(no);
	support.nodes = nodes;
	support.spring = create_spring_vector(false, false, false);
	support.rotational_restraint = create_spring_vector(false, false, false);
	set_comment_and_parameters(support, comment, params);
	console.log("NodalSupport " + support.no + " was created. Base type 'free'");
	change_active_obj(this.obj, support);
	return support
	 };









