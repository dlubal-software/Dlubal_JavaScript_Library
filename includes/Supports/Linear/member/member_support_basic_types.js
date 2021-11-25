include("../functions.js");

MemberSupport.prototype.fixed = function() {
	this.support.spring_translation = create_spring_vector(true, true, true);
	this.support.spring_shear = create_spring_vector(true, true, true);
	this.support.spring_rotation = create_spring(true);
	return self
	 };

MemberSupport.prototype.slidingXY = function() {
	this.support.spring_translation = create_spring_vector(false, false, true);
	this.support.spring_shear = create_spring_vector(false, false, true);
	this.support.spring_rotation = create_spring(true);
	return self
	 };

MemberSupport.prototype.slidingX = function() {
	this.support.spring_translation = create_spring_vector(false, true, true);
	this.support.spring_shear = create_spring_vector(false, true, true);
	this.support.spring_rotation = create_spring(true);
	return self
	 };

MemberSupport.prototype.slidingY = function() {
	this.support.spring_translation = create_spring_vector(true, false, true);
	this.support.spring_shear = create_spring_vector(true, false, true);
	this.support.spring_rotation = create_spring(true);
	return self
	 };

MemberSupport.prototype.slidingZ = function() {
	this.support.spring_translation = create_spring_vector(true, true, false);
	this.support.spring_shear = create_spring_vector(true, true, false);
	this.support.spring_rotation = create_spring(true);
	return self
	 };


MemberSupport.prototype.free = function() {
	this.support.spring_translation = create_spring_vector(false, false, false);
	this.support.spring_shear = create_spring_vector(false, false, false);
	this.support.spring_rotation = create_spring(false);
	return self
	 };











