
include("../../Supports/Linear/functions.js");


NodalSupport.prototype.fixed = function() {
	this.support.spring = create_spring_vector(true, true, true);
	this.support.rotational_restraint = create_spring_vector(true, true, true);
	return self
	 };

NodalSupport.prototype.hinged = function() {
	this.support.spring = create_spring_vector(true, true, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

NodalSupport.prototype.roller = function() {
	this.support.spring = create_spring_vector(false, false, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

NodalSupport.prototype.rollerX = function() {
	this.support.spring = create_spring_vector(false, true, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

NodalSupport.prototype.rollerY = function() {
	this.support.spring = create_spring_vector(true, false, true);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

NodalSupport.prototype.rollerZ = function() {
	this.support.spring = create_spring_vector(true, true, false);
	this.support.rotational_restraint = create_spring_vector(false, false, true);
	return self
	 };

NodalSupport.prototype.free = function() {
	this.support.spring = create_spring_vector(false, false, false);
	this.support.rotational_restraint = create_spring_vector(false, false, false);
	return self
	 };









