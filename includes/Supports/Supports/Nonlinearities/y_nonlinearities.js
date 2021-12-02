// object support conditions contains set of fuctions which will be used in all types of suppports
// Access to theese functions is though supportObject.conditions.function()
// ex. f

function support_y_nonlinearities(support)
{
	this.support = support;
	return self;
}

support_y_nonlinearities.prototype.failIfNegative = function() {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

support_y_nonlinearities.prototype.failIfPositive = function() {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

support_y_nonlinearities.prototype.failAllIfNegative = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

support_y_nonlinearities.prototype.failAllIfPositive = function() {
	this.support.spring_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};

support_y_nonlinearities.prototype.frictionX = function(value) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
	this.support.friction_coefficient_y = value;
};

support_y_nonlinearities.prototype.frictionZ = function(value) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
	this.support.friction_coefficient_y = value;
};

support_y_nonlinearities.prototype.frictionXZ = function(value) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
	this.support.friction_coefficient_y = value;
};

support_y_nonlinearities.prototype.frictionXplusZ = function(value1,value2) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
	this.support.friction_coefficient_yx = value1;
	this.support.friction_coefficient_yz = value2;
};


