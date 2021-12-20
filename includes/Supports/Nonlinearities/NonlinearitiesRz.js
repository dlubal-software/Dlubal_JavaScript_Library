// object support conditions contains set of functions which will be used for nodal and lines of suppports
// Access to theese functions is through supportObject.nonlinear.dirrection.function()
// ex. for nodal support: 
// var nodal_support = new NodalSupport();
// nodal_support.Fixed();
// nodal_support.Nonlinear.Rz.FailAllIfPositive();
//

function SupportNonlinearitiesRz(support)
{
	this.support = support;
	return self;
}

SupportNonlinearitiesRz.prototype.FailIfNegative = function() {
	this.support.rotational_restraint_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};

SupportNonlinearitiesRz.prototype.FailIfPositive = function() {
	this.support.rotational_restraint_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};

SupportNonlinearitiesRz.prototype.FailAllIfNegative = function() {
	this.support.rotational_restraint_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_NEGATIVE;
};

SupportNonlinearitiesRz.prototype.FailAllIfPositive = function() {
	this.support.rotational_restraint_z_nonlinearity = nodal_supports.NONLINEARITY_TYPE_FAILURE_ALL_IF_POSITIVE;
};






