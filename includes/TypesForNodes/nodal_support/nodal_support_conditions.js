include("../../Supports/Linear/functions.js");


NodalSupport.prototype.translation = function(x,y,z) {
	this.support.spring = create_spring_vector(false, false, false);
	this.support.spring = create_spring_vector(x, y, z);
	console.log("Spring vector changed");
	console.log("CuX: " + this.support.spring_x + "; CuY: " + this.support.spring_y + "; CuZ: " + this.support.spring_z );
	console.log("NodalSupport " + this.support.no + " was edited");
	return self
	 };

NodalSupport.prototype.translation_x = function(x) {
	this.support.spring_x = create_spring(false);
	this.support.spring_x = create_spring(x);
	return self
	 };

NodalSupport.prototype.translation_y = function(y) {
	this.support.spring_y = create_spring(false);
	this.support.spring_y = create_spring(y);
	return self
	 };

NodalSupport.prototype.translation_z = function(z) {
	this.support.spring_z = create_spring(false);
	this.support.spring_z = create_spring(z);
	return self
	 };


NodalSupport.prototype.rotation = function(x,y,z) {
	this.support.rotational_restraint = create_spring_vector(false, false, false);
	this.support.rotational_restraint = create_spring_vector(x, y, z);
	console.log("Rotational restrain vector changed");
	console.log("CrX: " + this.support.rotational_restraint_x + "; CrY: " + this.support.rotational_restraint_y + "; CrZ: " + this.support.rotational_restraint_z );
	console.log("NodalSupport " + this.support.no + " was edited");
	return self
	 };

NodalSupport.prototype.rotation_x = function(x) {
	this.support.rotational_restraint_x = create_spring(false);
	this.support.rotational_restraint_x = create_spring(x);
	return self
	 };

NodalSupport.prototype.rotation_y = function(y) {
	this.support.rotational_restraint_y = create_spring(false);
	this.support.rotational_restraint_y = create_spring(y);
	return self
	 };

NodalSupport.prototype.rotation_z = function(z) {
	this.support.rotational_restraint_z = create_spring(false);
	this.support.rotational_restraint_z = create_spring(z);
	return self
	 };

