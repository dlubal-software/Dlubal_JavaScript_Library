include("../functions.js");


SurfaceSupport.prototype.fixed = function() {
	this.support.translation = create_spring_vector(true, true, true);
	this.support.shear_xz = create_spring(true);
	this.support.shear_xz = create_spring(true);

	console.log("SurfaceSupport " + this.support.no + " was edited. Base type 'Fixed'");
	return self
	 };


SurfaceSupport.prototype.slidingXY = function() {
	this.support.translation = create_spring_vector(false, false, true);
	this.support.shear_xz = create_spring(true);
	this.support.shear_xz = create_spring(true);
	console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingXY'");
	return self
	 };

SurfaceSupport.prototype.slidingX = function() {
	this.support.translation = create_spring_vector(false, true, true);
	this.support.shear_xz = create_spring(true);
	this.support.shear_xz = create_spring(true);
	console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingX'");
	return self
	 };


SurfaceSupport.prototype.slidingY = function() {
	this.support.translation = create_spring_vector(true, false, true);
	this.support.shear_xz = create_spring(true);
	this.support.shear_xz = create_spring(true);
	console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingY'");
	return self
	 };


SurfaceSupport.prototype.slidingZ = function() {
	this.support.translation = create_spring_vector(true, true, false);
	this.support.shear_xz = create_spring(false);
	this.support.shear_xz = create_spring(false);
	console.log("SurfaceSupport " + this.support.no + " was created. Base type 'SlidingZ'");
	return self
	 };

SurfaceSupport.prototype.free = function() {
	this.support.translation = create_spring_vector(false, false, false);
	this.support.shear_xz = create_spring(false);
	this.support.shear_xz = create_spring(false);
	console.log("SurfaceSupport " + this.support.no + " was created. Base type 'Free'");
	return self
	 };









