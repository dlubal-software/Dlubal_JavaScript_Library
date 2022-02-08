// nonlinearity nefungují


/**
* Creates line hinge
* @functiom
* @constructor
* @param	{Number}	no				Index of line hinge, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			line hinge parameters, can be undefined
* @return	{Object}	Created line hinge
*/
var createLineHinge = function (no,
								comment,
								params) {

	if (no != undefined) {
		var lineHinge = line_hinges.create(no);
	}
	else {
	 var lineHinge = line_hinges.create();
	}
	set_comment_and_parameters(lineHinge, comment, params);

	return lineHinge;
};


/**
* Creates line hinge constant
* @functiom
* @param	{Boolean or Float}	hinge		hinge input (true, false, number(stiffness))
* @return	{Object}	Created hinge constant
*/
function CreateHingeConstant(hinge) {
  var hinge_constant = line_hinges["SPRING_CONSTANT_NO"];

  if (hinge === true) {
    hinge_constant = line_hinges["SPRING_CONSTANT_YES"];
  }
  return hinge_constant;
}


function CreateHinge(hinge) {
  if (hinge === true || hinge === false) {
    return CreateHingeConstant(hinge);
  }
  else {
    return hinge;
  }
}


function CreateHingeVector(x, y, z) {
  var hinge_vector = [x, y, z];
  var hinge_vector_new = [0, 0, 0];
  hinge_vector.forEach(function (hinge, index) {
    hinge_vector_new[index] = CreateHinge(hinge);
  });
  return $V(hinge_vector_new[0], hinge_vector_new[1], hinge_vector_new[2]);
}


/**
* Creates line hinge
* @class
* @constructor
* @param	{Number}	no				Index of line hinge, can be undefined
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params			line hinge parameters, can be undefined
* @return	{Object}	Created line hinge
*/
function LineHinge(no,
                   comment,
                   params) {
	this.lineHinge = createLineHinge(no, comment, params);
	var self = this;
	return self;
}


/**
* Set translation constants ux, uy, uz to line hinge
* @param	{Boolean or Float}	ux				Translation ux (true, false, number(stiffness [Nm^2]))
* @param	{Boolean or Float}	uy				Translation uy (true, false, number(stiffness [Nm^2]))
* @param	{Boolean or Float}	uz				Translation uz (true, false, number(stiffness [Nm^2]))
* @return	{Object}	line hinge in parent
*/
LineHinge.prototype.Translation = function (ux, uy, uz) {
	this.lineHinge.translational_release_u_x = CreateHinge(ux);
	this.lineHinge.translational_release_u_y = CreateHinge(uy);
	this.lineHinge.translational_release_u_z = CreateHinge(uz);
	return this.lineHinge;
};


/**
* Set translation constant ux to line hinge
* @param	{Boolean or Float}	ux				Translation ux (true, false, number(stiffness [Nm^2]))
* @return	{Object}	line hinge in parent
*/
LineHinge.prototype.TranslationX = function (ux) {
	this.lineHinge.translational_release_u_x = CreateHinge(ux);
	return this.lineHinge;
};


/**
* Set translation constant uy to line hinge
* @param	{Boolean or Float}	uy				Translation uy (true, false, number(stiffness [Nm^2]))
* @return	{Object}	line hinge in parent
*/
LineHinge.prototype.TranslationY = function (uy) {
	this.lineHinge.translational_release_u_y = CreateHinge(uy);
	return this.lineHinge;
};


/**
* Set translation constant uz to line hinge
* @param	{Boolean or Float}	uz				Translation uz (true, false, number(stiffness [Nm^2]))
* @return	{Object}	line hinge in parent
*/
LineHinge.prototype.TranslationZ = function (uz) {
	this.lineHinge.translational_release_u_z = CreateHinge(uz);

	return this.lineHinge;
};


/**
* Set rotation constant rx to line hinge
* @param	{Boolean or Float}	rx				Rotation rx (true, false, number(stiffness [Nm^2]))
* @return	{Object}	line hinge in parent
*/
LineHinge.prototype.Rotation = function (rx) {
	this.lineHinge.rotational_release_phi_x = CreateHinge(rx);
	return this.lineHinge;
};


LineHinge.prototype.GetNo = function() {
	return this.settings.no;
}


/**
* Assign line hinge to line and surface (line must be involved in the surface)
* @functiom
* @param	{Integer}	table_id		Index of line_hinges_table (the range is the same as the amount of lines involved in the surface)
* @param	{Integer}	line			line id for line hinge assign
* @param	{Integer}	surface			surface id (line must lie on this surface)
*/
LineHinge.prototype.AssignTo = function(table_id, line, surface) {
	var table = surfaces[surface].line_hinges_table[table_id];
	table.line_hinge = this.lineHinge.no;
	table.line_number = line;
};

