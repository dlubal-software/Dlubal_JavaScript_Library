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

function NewLineSupport(message) {
	if (message != false){
	console.log("for new line support use option for some base type. ex: .fixed(), .hinged()")
	createNewLineSupport();	
	}
};

NewLineSupport.prototype.fixed = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(true, true, true);
	this.support.rotational_restraint = create_spring_vector(true, true, true);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'Fixed'");
	return self
	 };

NewLineSupport.prototype.hinged = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(true, true, true);
	this.support.rotational_restraint = create_spring_vector(false, false, false);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'Hinged'");
	return self
	 };

NewLineSupport.prototype.slidingXY = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(false, false, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'SlidingXY'");
	return self
	 };

NewLineSupport.prototype.slidingX = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(false, true, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'SlidingX'");
	return self
	 };

NewLineSupport.prototype.slidingY = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(true, false, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'SlidingY'");
	return self
	 };

NewLineSupport.prototype.slidingZ = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(true, true, false);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'SlidingZ'");
	return self
	 };

NewLineSupport.prototype.free = function(lines, no, comment, params) {
	this.support = createNewLineSupport(no);
	this.support.lines = lines;
	this.support.spring = create_spring_vector(false, false, false);
	this.support.rotational_restraint = create_spring_vector(false, false, false);
	set_comment_and_parameters(this.support, comment, params);
	console.log("LineSupport " + this.support.no + " was created. Base type 'Free'");
	return self
	 };









