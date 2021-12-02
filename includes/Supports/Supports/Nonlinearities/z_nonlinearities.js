// object support conditions contains set of fuctions which will be used in all types of suppports
// Access to theese functions is though supportObject.conditions.function()
// ex. f

function support_z_nonlinearities(support)
{
	this.support = support;
	return self;
}

support_z_nonlinearities.prototype.failIfNegative = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
	console.log("Support " + this.support.no + " was edited. Nonlinearity: Failure if negative reaction Z");
};

support_z_nonlinearities.prototype.failIfPositive = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

support_z_nonlinearities.prototype.failAllIfNegative = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

support_z_nonlinearities.prototype.failAllIfPositive = function() {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};

support_z_nonlinearities.prototype.frictionX = function(value) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1;
	this.support.friction_coefficient_z = value;
};

support_z_nonlinearities.prototype.frictionY = function(value) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_2;
	this.support.friction_coefficient_z = value;
};

support_z_nonlinearities.prototype.frictionXY = function(value) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_2;
	this.support.friction_coefficient_z = value;
};

support_z_nonlinearities.prototype.frictionXplusZ = function(value1,value2) {
	this.support.spring_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FRICTION_DIRECTION_1_PLUS_2;
	this.support.friction_coefficient_zx = value1;
	this.support.friction_coefficient_zy = value2;
};


