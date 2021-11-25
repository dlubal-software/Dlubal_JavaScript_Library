include("../functions.js");




SurfaceSupport.prototype.translation = function(x,y,z) {
	this.support.translation = create_spring_vector(x, y, z);
	return self
	 };


SurfaceSupport.prototype.translation_x = function(x) {
	this.support.translation_x = create_spring(x);
	return self
	 };


SurfaceSupport.prototype.translation_y = function(y) {
	this.support.translation_y = create_spring(y);
	return self
	 };


SurfaceSupport.prototype.translation_z = function(z) {
	this.support.translation_z = create_spring(z);
	return self
	 };


SurfaceSupport.prototype.shear_x = function(x) {
	if (x != true && this.support.translation_z != surface_supports.SPRING_CONSTANT_NO) {
		console.log("Shear spring constant is allowed only in case that translation Z is set to free.")
	}
	else {
		this.support.shear_xz = create_spring(x);
	}
	 };


SurfaceSupport.prototype.shear_y = function(y) {
	if (x != true && this.support.translation_z != surface_supports.SPRING_CONSTANT_NO) {
		console.log("Shear spring constant is allowed only in case that translation Z is set to free.")
	}
	else {
		this.support.shear_yz = create_spring(y);
	}
	 };













