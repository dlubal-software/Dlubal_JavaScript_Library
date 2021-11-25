include("../functions.js");

function createNewMemberSupport(no) {
	if (no === undefined) {
		var support = member_supports.create();
	}
  	else {
    	var support = member_supports.create(no);
  	};
	return support;
};

function NewMemberSupport(message, obj) {
	if (message != false){
	console.log("for new Member support use option for some base type. ex: .fixed(), .hinged()")
	createNewMemberSupport();	
	};
	// Access to instance of MemberSupport object
	this.obj = obj;
};

NewMemberSupport.prototype.fixed = function(members, no, comment, params) {
/**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

	support = createNewMemberSupport(no);
	support.members = members;
	support.spring_translation = create_spring_vector(true, true, true);
	support.spring_shear = create_spring_vector(true, true, true);
	support.spring_rotation = create_spring(true);
	set_comment_and_parameters(support, comment, params);
	console.log("MemberSupport " + support.no + " was created. Base type 'Fixed'");
	change_active_obj_member(this.obj, support);
	return self
	 };


NewMemberSupport.prototype.slidingXY = function(members, no, comment, params) {
/**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

	support = createNewMemberSupport(no);
	support.members = members;
	support.spring_translation = create_spring_vector(false, false, true);
	support.spring_shear = create_spring_vector(false, false, true);
	support.spring_rotation = create_spring(true);
	set_comment_and_parameters(support, comment, params);
	console.log("MemberSupport " + support.no + " was created. Base type 'SlidingXY'");
	change_active_obj_member(this.obj, support);
	return self
	 };

NewMemberSupport.prototype.slidingX = function(members, no, comment, params) {
/**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

	support = createNewMemberSupport(no);
	support.members = members;
	support.spring_translation = create_spring_vector(false, true, true);
	support.spring_shear = create_spring_vector(false, true, true);
	support.spring_rotation = create_spring(true);
	set_comment_and_parameters(support, comment, params);
	console.log("MemberSupport " + support.no + " was created. Base type 'SlidingX'");
	change_active_obj_member(this.obj, support);
	return self
	 };


NewMemberSupport.prototype.slidingY = function(members, no, comment, params) {
/**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

	support = createNewMemberSupport(no);
	support.members = members;
	support.spring_translation = create_spring_vector(true, false, true);
	support.spring_shear = create_spring_vector(true, false, true);
	support.spring_rotation = create_spring(true);
	set_comment_and_parameters(support, comment, params);
	console.log("MemberSupport " + support.no + " was created. Base type 'SlidingY'");
	change_active_obj_member(this.obj, support);
	return self
	 };


NewMemberSupport.prototype.slidingZ = function(members, no, comment, params) {
/**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

	support = createNewMemberSupport(no);
	support.members = members;
	support.spring_translation = create_spring_vector(true, true, false);
	support.spring_shear = create_spring_vector(true, true, false);
	support.spring_rotation = create_spring(true);
	set_comment_and_parameters(support, comment, params);
	console.log("MemberSupport " + support.no + " was created. Base type 'SlidingZ'");
	change_active_obj_member(this.obj, support);
	return self
	 };

NewMemberSupport.prototype.free = function(members, no, comment, params) {
/**
  * Creates nodal support hight level function 

  * @param   {Array}   members       List of members
  * @param   {Number}  no            Index of member support, empty by default
  * @param   {String}  comment       Comment, empty by default
  * @param   {Object}  params        Nodal support parameters, empty by default
  */

	support = createNewMemberSupport(no);
	support.members = members;
	support.spring_translation = create_spring_vector(false, false, false);
	support.spring_shear = create_spring_vector(false, false, false);
	support.spring_rotation = create_spring(false);
	set_comment_and_parameters(support, comment, params);
	console.log("MemberSupport " + support.no + " was created. Base type 'Free'");
	change_active_obj_member(this.obj, support);
	return self
	 };









