// object with collection of functions to set nonlinearities
include("x_nonlinearities.js");
include("y_nonlinearities.js");
include("z_nonlinearities.js");
include("rx_nonlinearities.js");
include("ry_nonlinearities.js");
include("rz_nonlinearities.js");


function SupportNonlinearities(support){
	this.support = support;
	this.x = new support_x_nonlinearities(this.support); 
	this.y = new support_y_nonlinearities(this.support);
	this.z = new support_z_nonlinearities(this.support);
	this.rx = new support_rx_nonlinearities(this.support); 
	this.ry = new support_ry_nonlinearities(this.support);
	this.rz = new support_rz_nonlinearities(this.support);
	return self;
};

function MemberSupportNonlinearities(support){
	this.support = support;
	this.z = new member_support_z_nonlinearities(this.support);
	return self;
};

function member_support_z_nonlinearities(support){
	this.support = support;
	return self;
};

member_support_z_nonlinearities.prototype.failIfPositive = function(){
	this.support.nonlinearity = member_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
};

member_support_z_nonlinearities.prototype.failIfNegative = function(){
	this.support.nonlinearity = member_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
};

member_support_z_nonlinearities.prototype.none = function(){
	this.support.nonlinearity = member_supports.NONLINEARITY_NONE;
};


function SurfaceSupportNonlinearities(support){
	this.support = support;
	this.failIfPositive = new surface_support_positive_nonlinearities(support);
	this.failIfNegative = new surface_support_negative_nonlinearities(support);
	return self;
};


function surface_support_positive_nonlinearities(support){
	this.support = support;
};

surface_support_positive_nonlinearities.prototype.basic = function(){ 
	if  (CheckIfNonlinearityCanBeSet(this.support.translation_z, "Cu,z", "failure if") === true) {
		this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
		this.support.positive_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_BASIC_UNDIRECTIONAL_ACTION;
		};
};


surface_support_positive_nonlinearities.prototype.friction = function(xy){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
	this.support.positive_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_FRICTION_PLANE_XY;
	this.support.positive_friction_coefficient = xy;
};

surface_support_positive_nonlinearities.prototype.stress = function(sigma){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
	this.support.positive_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_YIELDING_CONTACT_STRESS_SIGMA_Z;
	this.support.positive_contact_stress = sigma;
};

function surface_support_negative_nonlinearities(support){
	this.support = support;
};

surface_support_negative_nonlinearities.prototype.basic = function(){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
	this.support.negative_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_BASIC_UNDIRECTIONAL_ACTION;
};


surface_support_negative_nonlinearities.prototype.friction = function(xy){

	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
	this.support.negative_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_FRICTION_PLANE_XY;
	this.support.negative_friction_coefficient = xy;
};

surface_support_negative_nonlinearities.prototype.stress = function(sigma){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
	this.support.negative_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_YIELDING_CONTACT_STRESS_SIGMA_Z;
	//this.support.negative_contact_stress = sigma;
}








