/**
* Creates line hinge
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

/**
 * Creates Hinge
 * @param {Object} hinge
 * @returns Hinge object
 */
function CreateHinge(hinge) {
  if (hinge === true || hinge === false) {
    return CreateHingeConstant(hinge);
  }
  else {
    return hinge;
  }
}
/**
 * Creates line hinge
 * @class
 * @constructor
 * @param	{Number}				no				Index of line hinge, can be undefined
 * @param	{Integer}				surface			Surface id (lines must lie on this surface)
 * @param	{Integer or Array}		lines			One or more lines id for line hinge assign
 * @param	{String}				comment			Comment, can be undefined
 * @param	{Object}				params			line hinge parameters, can be undefined
 * @return	{Object}	Created line hinge
*/
function LineHinge(no,
				   surface,
				   lines,
                   comment,
                   params) {
	lineHinge = createLineHinge(no, comment, params);
	this.lineHinge = lineHinge;
	this.NonlinearX = new LineHingeNonlinearity(lineHinge, "X");
	this.NonlinearY = new LineHingeNonlinearity(lineHinge, "Y");
	this.NonlinearZ = new LineHingeNonlinearity(lineHinge, "Z");
	this.NonlinearPhiX = new LineHingeNonlinearity(lineHinge, "phiX");
	var self = this;
	if (surface !== undefined && lines !== undefined) {
		self.AssignTo(surface, lines);
	}

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
	return this.lineHinge.no;
};
/**
* Assign line hinge to line and surface (line must be involved in the surface)
* @param	{Integer}				surface			surface id (lines must lie on this surface)
* @param	{Integer or Array}		lines			one or more lines id for line hinge assign
*/
LineHinge.prototype.AssignTo = function(surface, lines) {
	if (surface != undefined){
		var row = surfaces[surface].line_hinges_table.row_count();
		var table = surfaces[surface].line_hinges_table[row];
		table.line_hinge = this.lineHinge.no;
		if (typeof lines === "number") {
			table.line_number = lines;
		}
		else {
			for (var i = 0; i < lines.length; ++i)
            {
            	table = surfaces[surface].line_hinges_table[row + i];
                table.line_number = lines[i];
                table.line_hinge = this.lineHinge.no;
            }
		}
	}
};
/**
* Assign wall-slab connection to line hinge
* @function
* @param	{Integer}				surface			surface id (lines must lie on this surface)
* @param	{Integer} or {Array}	lines			one or more lines id for line hinge assign
*/
LineHinge.prototype.WallSlabConnection = function(offset, blockWidth) {
	this.lineHinge.slab_wall_connection = true;
	this.lineHinge.slab_wall_connection_offset = offset;
	if (blockWidth != undefined) {
		if (offset >= blockWidth) {
			this.lineHinge.slab_wall_with_slab_edge_block;
			this.lineHinge.slab_edge_block_width = blockWidth;
		}
		else {
			console.log("The width of the slab-edge line hinge no." + this.lineHinge.no + " was not set.");
			console.log("The width of the slab-edge block must be less than the slab offset.");
		}
	}
	return this.lineHinge.no;
};
function LineHingeNonlinearity(hinge, direction) {
	direction_switcher = {
		"X"		: "translational_release_u_x_nonlinearity",
		"Y"		: "translational_release_u_y_nonlinearity",
		"Z"		: "translational_release_u_z_nonlinearity",
		"phiX"	: "rotational_release_phi_x_nonlinearity",
	};

	table_switcher = {
		"X"		: "diagram_along_x_table",
		"Y"		: "diagram_along_y_table",
		"Z"		: "diagram_along_z_table",
		"phiX"	: "diagram_around_x_table",
	};

	table_keys_switcher = {
		"X"		: ["displacement", "force"],
		"Y"		: ["displacement", "force"],
		"Z"		: ["displacement", "force"],
		"phiX"	: ["rotation", "moment"],
	};

	this.direction = direction_switcher[direction];
	this.table = table_switcher[direction];
	this.table_keys = table_keys_switcher[direction];
	this.hinge = hinge;
	applyChanges();
	var self = this;
	return self;
}
LineHingeNonlinearity.prototype.FixedIfNegative = function() {
	this.hinge[this.direction] = line_hinges.NONLINEARITY_TYPE_FAILURE_IF_NEGATIVE;
};
LineHingeNonlinearity.prototype.FixedIfPositive = function() {
	this.hinge[this.direction] = line_hinges.NONLINEARITY_TYPE_FAILURE_IF_POSITIVE;
};
LineHingeNonlinearity.prototype.Diagram = function(displacement, force) {
	this.hinge[this.direction] = line_hinges.NONLINEARITY_TYPE_DIAGRAM;
	applyChanges();
	createNonlinearityTable(this.hinge, this.table, this.table_keys, displacement, force);

};
function createNonlinearityTable(lineHinge, table, table_keys, displacement, force) {
	if (displacement === undefined) {
		displacement = [1];
	}
	if (force === undefined) {
		force = [10];
	}
	const hingeTable = lineHinge[table];
	const key_1 = table_keys[0];
	const key_2 = table_keys[1];
	if (displacement.length === force.length) {
		for (var i = 0; i < displacement.length; ++i) {
			var row = hingeTable.row_count();
			hingeTable[row][key_1]= displacement[i];
			hingeTable[row][key_2]= force[i];
		}
	}
}
