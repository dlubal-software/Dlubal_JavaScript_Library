include("../functions.js");

function createNewSurfaceSupport(no) {
	if (no === undefined) {
		var support = surface_supports.create();
	}
  	else {
    	var support = surface_supports.create(no);
  	};
	return support;
};


function NewSurfaceSupport(message, obj) {
	if (message != false){
	console.log("for new Surface support use option for some base type. ex: .fixed(), .hinged()")
	};
	this.obj = obj;
};

NewSurfaceSupport.prototype.fixed = function(surfaces, no, comment, params) {
	support = createNewSurfaceSupport(no);
	support.surfaces = surfaces;
	support.translation = create_spring_vector(true, true, true);
	set_comment_and_parameters(support, comment, params);
	console.log("SurfaceSupport " + support.no + " was created. Base type 'Fixed'");
	change_active_obj_surface(this.obj, support);
	return self
	 };


NewSurfaceSupport.prototype.slidingXY = function(surfaces, no, comment, params) {
	support = createNewSurfaceSupport(no);
	support.surfaces = surfaces;
	support.translation = create_spring_vector(false, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("SurfaceSupport " + support.no + " was created. Base type 'SlidingXY'");
	change_active_obj_surface(this.obj, support);
	return self
	 };

NewSurfaceSupport.prototype.slidingX = function(surfaces, no, comment, params) {
	support = createNewSurfaceSupport(no);
	support.surfaces = surfaces;
	support.translation = create_spring_vector(false, true, true);
	set_comment_and_parameters(support, comment, params);
	console.log("SurfaceSupport " + support.no + " was created. Base type 'SlidingX'");
	change_active_obj_surface(this.obj, support);
	return self
	 };


NewSurfaceSupport.prototype.slidingY = function(surfaces, no, comment, params) {
	support = createNewSurfaceSupport(no);
	support.surfaces = surfaces;
	support.translation = create_spring_vector(true, false, true);
	set_comment_and_parameters(support, comment, params);
	console.log("SurfaceSupport " + support.no + " was created. Base type 'SlidingY'");
	change_active_obj_surface(this.obj, support);
	return self
	 };


NewSurfaceSupport.prototype.slidingZ = function(surfaces, no, comment, params) {
	support = createNewSurfaceSupport(no);
	support.surfaces = surfaces;
	support.translation = create_spring_vector(true, true, false);
	support.shear_xz = create_spring(false);
	support.shear_xz = create_spring(false);
	set_comment_and_parameters(support, comment, params);
	console.log("SurfaceSupport " + support.no + " was created. Base type 'SlidingZ'");
	change_active_obj_surface(this.obj, support);
	return self
	 };

NewSurfaceSupport.prototype.free = function(surfaces, no, comment, params) {
	support = createNewSurfaceSupport(no);
	support.surfaces = surfaces;
	support.translation = create_spring_vector(false, false, false);
	support.shear_xz = create_spring(false);
	support.shear_xz = create_spring(false);
	set_comment_and_parameters(support, comment, params);
	console.log("SurfaceSupport " + support.no + " was created. Base type 'Free'");
	change_active_obj_surface(this.obj, support);
	return self
	 };









