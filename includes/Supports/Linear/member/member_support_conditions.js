include("../functions.js");

MemberSupport.prototype.translation = function(x,y,z) {
	this.support.spring_translation = create_spring_vector(x, y, z);
	return self
	 };

MemberSupport.prototype.shear = function(x,y,z) {
	this.support.spring_shear = create_spring_vector(x, y, z);
	return self
	 };

MemberSupport.prototype.rotation = function(rx) {
	this.support.spring_rotation = create_spring(rx);
	return self
	 };

MemberSupport.prototype.translation_x = function(x) {
	this.support.spring_translation_x = create_spring(x);
	return self
	 };

MemberSupport.prototype.translation_y = function(y) {
	this.support.spring_translation_y = create_spring(y);
	return self
	 };

MemberSupport.prototype.translation_z = function(z) {
	this.support.spring_translation_z = create_spring(z);
	return self
	 };


MemberSupport.prototype.shear_x = function(x) {
	this.support.spring_shear_x = create_spring(x);
	return self
	 };

MemberSupport.prototype.shear_y = function(y) {
	this.support.spring_shear_y = create_spring(y);
	return self
	 };

MemberSupport.prototype.shear_z = function(z) {
	this.support.spring_shear_z = create_spring(z);
	return self
	 };












