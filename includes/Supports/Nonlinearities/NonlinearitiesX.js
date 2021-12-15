// object support conditions contains set of functions which will be used for nodal and lines of suppports
// Access to theese functions is through supportObject.nonlinear.dirrection.function()
// ex. for nodal support: 
// var nodal_support = new NodalSupport();
// nodal_support.Fixed();
// nodal_support.Nonlinear.X.FailAllIfPositive();
//

function SupportNonlinearitiesX(support)
{
	this.support = support;
	return self;
}

SupportNonlinearitiesX.prototype.FailIfNegative = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

SupportNonlinearitiesX.prototype.FailIfPositive = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

SupportNonlinearitiesX.prototype.FailAllIfNegative = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

SupportNonlinearitiesX.prototype.FailAllIfPositive = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};

SupportNonlinearitiesX.prototype.FrictionY = function(value) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
	this.support.friction_coefficient_x = value;
};

SupportNonlinearitiesX.prototype.FrictionZ = function(value) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
	this.support.friction_coefficient_x = value;
};

SupportNonlinearitiesX.prototype.FrictionYZ = function(value) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
	this.support.friction_coefficient_x = value;
};

SupportNonlinearitiesX.prototype.FrictionYplusZ = function(value1,value2) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
	this.support.friction_coefficient_xy = value1;
	this.support.friction_coefficient_xz = value2;
};


