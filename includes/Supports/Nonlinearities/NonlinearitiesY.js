// object support conditions contains set of functions which will be used in all types of suppports
// Access to theese functions is through supportObject.conditions.function()
// ex. for nodal support: 
// var nodal_support = new NodalSupport();
// nodal_support.Fixed();
// nodal_support.Nonlinear.y.failAllIfPositive();
//

function SupportNonlinearitiesY(support)
{
	this.support = support;
	return self;
}

SupportNonlinearitiesY.prototype.FailIfNegative = function() {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

SupportNonlinearitiesY.prototype.FailIfPositive = function() {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

SupportNonlinearitiesY.prototype.FailAllIfNegative = function() {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

SupportNonlinearitiesY.prototype.FailAllIfPositive = function() {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};

SupportNonlinearitiesY.prototype.FrictionX = function(value) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
	this.support.friction_coefficient_y = value;
};

SupportNonlinearitiesY.prototype.FrictionZ = function(value) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
	this.support.friction_coefficient_y = value;
};

SupportNonlinearitiesY.prototype.FrictionXZ = function(value) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
	this.support.friction_coefficient_y = value;
};

SupportNonlinearitiesY.prototype.FrictionXplusZ = function(value1,value2) {
	this.support.spring_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
	this.support.friction_coefficient_yx = value1;
	this.support.friction_coefficient_yz = value2;
};


