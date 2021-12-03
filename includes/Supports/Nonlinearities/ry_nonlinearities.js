// object support conditions contains set of fuctions which will be used in all types of suppports
// Access to theese functions is though supportObject.conditions.function()
// ex. f

function support_ry_nonlinearities(support)
{
	this.support = support;
	return self;
}

support_ry_nonlinearities.prototype.failIfNegative = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

support_ry_nonlinearities.prototype.failIfPositive = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

support_ry_nonlinearities.prototype.failAllIfNegative = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

support_ry_nonlinearities.prototype.failAllIfPositive = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};






