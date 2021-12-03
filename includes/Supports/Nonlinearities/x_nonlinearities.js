// object support conditions contains set of fuctions which will be used in all types of suppports
// Access to theese functions is though supportObject.conditions.function()
// ex. f

function support_x_nonlinearities(support)
{
	this.support = support;
	return self;
}

support_x_nonlinearities.prototype.failIfNegative = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

support_x_nonlinearities.prototype.failIfPositive = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

support_x_nonlinearities.prototype.failAllIfNegative = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

support_x_nonlinearities.prototype.failAllIfPositive = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};

support_x_nonlinearities.prototype.frictionY = function(value) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
	this.support.friction_coefficient_x = value;
};

support_x_nonlinearities.prototype.frictionZ = function(value) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
	this.support.friction_coefficient_x = value;
};

support_x_nonlinearities.prototype.frictionYZ = function(value) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
	this.support.friction_coefficient_x = value;
};

support_x_nonlinearities.prototype.frictionYplusZ = function(value1,value2) {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
	this.support.friction_coefficient_xy = value1;
	this.support.friction_coefficient_xz = value2;
};




