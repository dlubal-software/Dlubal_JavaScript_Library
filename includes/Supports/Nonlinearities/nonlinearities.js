// object with collection of functions to set nonlinearities
include("NonlinearitiesX.js");
include("NonlinearitiesY.js");
include("NonlinearitiesZ.js");
include("NonlinearitiesRx.js");
include("NonlinearitiesRy.js");
include("NonlinearitiesRz.js");


function SupportNonlinearities(support){
	this.support = support;
	this.X = new SupportNonlinearitiesX(this.support); 
	this.Y = new SupportNonlinearitiesY(this.support);
	this.Z = new SupportNonlinearitiesZ(this.support);
	this.Rx = new SupportNonlinearitiesRx(this.support); 
	this.Ry = new SupportNonlinearitiesRy(this.support);
	this.Rz = new SupportNonlinearitiesRz(this.support);
	return self;
};

function MemberSupportNonlinearities(support){
	this.support = support;
};



MemberSupportNonlinearities.prototype.FailIfPositive = function(){
	this.support.nonlinearity = member_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
};

MemberSupportNonlinearities.prototype.FailIfNegative = function(){
	this.support.nonlinearity = member_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
};

MemberSupportNonlinearities.prototype.None = function(){
	this.support.nonlinearity = member_supports.NONLINEARITY_NONE;
};


function SurfaceSupportNonlinearities(support){
	this.support = support;
	this.FailIfPositive = new SurfaceSupportPositiveNonlinearities(support);
	this.FailIfNegative = new SurfaceSupportNegativeNonlinearities(support);
	return self;
};


function SurfaceSupportPositiveNonlinearities(support){
	this.support = support;
};

SurfaceSupportPositiveNonlinearities.prototype.Basic = function(){ 
	if  (CheckIfNonlinearityCanBeSet(this.support.translation_z, "Cu,z", "failure if") === true) {
		this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
		this.support.positive_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_BASIC_UNDIRECTIONAL_ACTION;
		};
};


SurfaceSupportPositiveNonlinearities.prototype.Friction = function(xy){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
	this.support.positive_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_FRICTION_PLANE_XY;
	this.support.positive_friction_coefficient = xy;
};

SurfaceSupportPositiveNonlinearities.prototype.Stress = function(sigma){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_POSITIVE_CONTACT_STRESS_Z;
	this.support.positive_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_YIELDING_CONTACT_STRESS_SIGMA_Z;
	this.support.positive_contact_stress = sigma;
};

function SurfaceSupportNegativeNonlinearities(support){
	this.support = support;
};

SurfaceSupportNegativeNonlinearities.prototype.Basic = function(){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
	this.support.negative_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_BASIC_UNDIRECTIONAL_ACTION;
};


SurfaceSupportNegativeNonlinearities.prototype.Friction = function(xy){

	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
	this.support.negative_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_FRICTION_PLANE_XY;
	this.support.negative_friction_coefficient = xy;
};

SurfaceSupportNegativeNonlinearities.prototype.Stress = function(sigma){ 
	this.support.nonlinearity = surface_supports.NONLINEARITY_FAILURE_IF_NEGATIVE_CONTACT_STRESS_Z;
	this.support.negative_nonlinearity_type = surface_supports.NONLINEARITY_DEFINITION_TYPE_YIELDING_CONTACT_STRESS_SIGMA_Z;
	this.support.negative_contact_stress = sigma;
}








