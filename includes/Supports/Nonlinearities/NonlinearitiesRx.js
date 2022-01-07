// object support conditions contains set of functions which will be used for nodal and lines of suppports
// Access to theese functions is through supportObject.nonlinear.dirrection.function()
// ex. for nodal support: 
// var nodal_support = new NodalSupport();
// nodal_support.Fixed();
// nodal_support.Nonlinear.Rx.FailAllIfPositive();
//

function SupportNonlinearitiesRx(support)
{
	this.support = support;
	return self;
}

SupportNonlinearitiesRx.prototype.FailIfNegative = function() {
	this.support.rotational_restraint_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

SupportNonlinearitiesRx.prototype.FailIfPositive = function() {
	this.support.rotational_restraint_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

SupportNonlinearitiesRx.prototype.FailAllIfNegative = function() {
	this.support.rotational_restraint_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

SupportNonlinearitiesRx.prototype.FailAllIfPositive = function() {
	this.support.rotational_restraint_x_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};






