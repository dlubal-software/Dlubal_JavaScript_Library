include("../functions.js");

LineSupport.prototype.fixed = function() {
	this.support.spring = create_spring_vector(true, true, true);
	this.support.rotational_restraint = create_spring_vector(true, true, true);
	console.log("LineSupport " + this.support.no + " was changed to base type 'Fixed'");
	return this.support
	 };

LineSupport.prototype.hinged = function() {
	this.support.spring = create_spring_vector(true, true, true);
	this.support.rotational_restraint = create_spring_vector(false, false, false);
	console.log("LineSupport " + this.support.no + " was changed to base type 'Hinged'");
	return self
	 };

LineSupport.prototype.slidingXY = function() {
	this.support.spring = create_spring_vector(false, false, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

LineSupport.prototype.slidingX = function() {
	this.support.spring = create_spring_vector(false, true, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

LineSupport.prototype.slidingY = function() {
	this.support.spring = create_spring_vector(true, false, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

LineSupport.prototype.slidingZ = function() {
	this.support.spring = create_spring_vector(true, true, false);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

LineSupport.prototype.free = function() {
	this.support.spring = create_spring_vector(false, false, false);
	this.support.rotational_restraint = create_spring_vector(false, false, false);
	return self
	 };









