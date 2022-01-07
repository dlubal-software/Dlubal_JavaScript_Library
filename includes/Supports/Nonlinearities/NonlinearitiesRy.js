// object support conditions contains set of functions which will be used for nodal and lines of suppports
// Access to theese functions is through supportObject.nonlinear.dirrection.function()
// ex. for nodal support: 
// var nodal_support = new NodalSupport();
// nodal_support.Fixed();
// nodal_support.Nonlinear.Ry.FailAllIfPositive();
//

function SupportNonlinearitiesRy(support)
{
	this.support = support;
	return self;
}

SupportNonlinearitiesRy.prototype.FailIfNegative = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

SupportNonlinearitiesRy.prototype.FailIfPositive = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

SupportNonlinearitiesRy.prototype.FailAllIfNegative = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

SupportNonlinearitiesRy.prototype.FailAllIfPositive = function() {
	this.support.rotational_restraint_y_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};






