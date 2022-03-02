if (!RFEM) {
	throw new Error("This script is only for RFEM, it works with solids.");
}

/*
this.gas_solid.temperature = temperature (doesn't work??)
*/

/**
* Creates gas solid
* @class
* @constructor
* @param	{Number}	no			Index of gas solid
* @param	{Array}		solid_list	List of solid indexes
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Gas solid's parameters, can be undefined
* @returns	Created gas solid
*/
function GasSolid (no,
	solid_list,
	comment,
	params) {
	if (arguments.length !== 0) {
		return this.gas_solid = createGasSolid(no, solid_list, comment, params);
	}
}

/**
* Creates gas solid with parameters
* @param	{Number}	no			Index of gas solid
* @param	{Array}		solid_list	List of solid indexes
* @param	{Number}	pressure	Pressure, can be empty (0.0 by default)
* @param	{Number}	temperature	Temperature, can be undefined
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Gas solid's parameters, can be undefined
* @returns	Created gas solid
*/
GasSolid.prototype.GasSolidWithParameters = function (no,
	solid_list,
	pressure,
	temperature,
	comment,
	params) {
	this.gas_solid = createGasSolid(no, solid_list, comment, params);
	if (typeof pressure !== "undefined") {
		this.gas_solid.pressure = pressure;
	}
	if (typeof temperature !== "undefined") {
		this.gas_solid.temperature = temperature;
	}
};

/** Creates gas solid (private)
* @param	{Number}	no			Index of gas solid
* @param	{Array}		solid_list	List of solid indexes
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Gas solid's parameters, can be undefined
* @returns	Created gas solid
*/
var createGasSolid = function (no, 
	solid_list,
	comment,
	params) {
	var gas_solid = solid_gases.create(no);
	set_comment_and_parameters(gas_solid, comment, params);
	var solidList = [];
	for (var i = 0; i < solid_list.length; ++i) {
		if (solids.exist(solid_list[i])) {
			solidList.push(solid_list[i]);
		}
		else {
			console.log("Solid no. " + solid_list[i] + " doesn't exist");
		}
	}
	gas_solid.solids = solidList;
	return gas_solid;
};