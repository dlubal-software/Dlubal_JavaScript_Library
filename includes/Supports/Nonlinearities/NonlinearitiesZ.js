// object support conditions contains set of functions which will be used for nodal and lines of suppports
// Access to theese functions is through supportObject.nonlinear.dirrection.function()
// ex. for nodal support: 
// var nodal_support = new NodalSupport();
// nodal_support.Fixed();
// nodal_support.Nonlinear.Z.FailAllIfPositive();
//

function SupportNonlinearitiesZ(support)
{
	this.support = support;
	return self;
}

SupportNonlinearitiesZ.prototype.FailIfNegative = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

SupportNonlinearitiesZ.prototype.FailIfPositive = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

SupportNonlinearitiesZ.prototype.FailAllIfNegative = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

SupportNonlinearitiesZ.prototype.FailAllIfPositive = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};

SupportNonlinearitiesZ.prototype.FrictionX = function(value) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
	this.support.friction_coefficient_z = value;
};

SupportNonlinearitiesZ.prototype.FrictionY = function(value) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
	this.support.friction_coefficient_z = value;
};

SupportNonlinearitiesZ.prototype.FrictionXY = function(value) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
	this.support.friction_coefficient_z = value;
};

SupportNonlinearitiesZ.prototype.FrictionXplusY = function(value1,value2) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
	this.support.friction_coefficient_zx = value1;
	this.support.friction_coefficient_zy = value2;
};


