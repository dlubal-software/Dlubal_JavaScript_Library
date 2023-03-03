if (!RFEM) {
	throw new Error("This script is only for RFEM, it works with solids.");
}

/**
BUG??
Limit_stress and shear_stiffness cannot be set?? I tried it directly in RFEM console too and no success...
*/

/**
* Creates contact solid
* @class
* @constructor
* @param	{Number}	no							Index of contact solid
* @param	{Number}	perpendicular_to_surface	Contact perpendicular to surfaces, can be undefined ("Failure force transmission" by default)
*														1 - Full force transmission
*														2 - Failure under compression
*														3 - Failure under tension
* @param	{Number}	parallel_to_surface			Contact parallel to surfaces, can be undefined ("Failure if contact perpendicular to surfaces failed" by default)
*														1 - Full force transmission
* 														2 - Rigid friction
*														3 - Rigid friction with limit
*														4 - Elastic friction
*														5 - Elastic friction with limit
*														6 - Elastic solid behavior
*														7 - Failure if contact perpendicular to surfaces failed (only for failure perpendicular - 2 and 3)
* @param	{Array}		values						Values depends on contact parallel to surface type, can be undefined
* @param	{String}	comment						Comment, can be undefined
* @param	{Object}	params  					Contact solid's parameters, can be undefined
* @returns	Created contact solid
*/
function ContactSolid (no,
	perpendicular_to_surface,
	parallel_to_surface,
	comment,
	params) {
	this.contact_solid = createContactSolid(no, comment, params);
	this.contact_solid.perpendicular_to_surface = GetContactSolidPerpendicularToSurfaceType(perpendicular_to_surface);
	this.contact_solid.parallel_to_surface = GetContactSolidParallelToSurfaceType(parallel_to_surface);
	if (typeof parallel_to_surface !== "undefined") {
		switch (parallel_to_surface) {
			case "FULL_FORCE_TRANSMISSION":
				// No additional values
				break;
			case "RIGID_FRICTION":
				if (typeof values !== "undefined") {
					ASSERT(values.length === 1, "Friction value is required");
					this.contact_solid.friction_coefficient = values[0];
				}
				break;
			case "RIGID_FRICTION_LIMIT":
				if (typeof values !== "undefined") {
					ASSERT(values.length === 1, "Limit stress value is required");
					this.contact_solid.limit_stress = values[0];
				}
				break;
			case "ELASTIC_FRICTION":
				if (typeof values !== "undefined") {
					ASSERT(values.length === 2, "Shear stiffness and friction coefficient values are required");
					this.contact_solid.shear_stiffness = values[0];
					this.contact_solid.friction_coefficient = values[1];
				}
				break;
			case "ELASTIC_FRICTION_LIMIT":
				if (typeof values !== "undefined") {
					ASSERT(values.length === 2, "Shear stiffness and limit stress values are required");
					this.contact_solid.shear_stiffness = values[0];
					this.contact_solid.limit_stress = values[1];
				}
				break;
			case "ELASTIC_SOLID":
				if (typeof values !== "undefined") {
					ASSERT(values.length === 1, "Shear stiffness value is required");
					this.contact_solid.shear_stiffness = values[0];
				}
				break;
			case "FAILURE_IF_CONTACT_PERPENDICULAR_TO_SURFACES_FAILED":
				ASSERT(typeof perpendicular_to_surface === "undefined" || perpendicular_to_surface === 2 || perpendicular_to_surface === 3, "Failure if contact perpendicular to surfaces failed type can be set only for \"Failure under tension\" or \"Failure under compression\"");
				// No additional values
				break;
		}
	}
}

/**
* Assigns solids to contact solid
* @param	{Array}	solid_list	List of solid's indexes
*/
ContactSolid.prototype.AssignTo = function (solid_list) {
	var solidList = [];
	for (var i = 0; i < solid_list.length; ++i) {
		if (solids.exist(solid_list[i])) {
			solidList.push(solid_list[i]);
		}
		else {
			console.log("Solid no. " + solid_list[i] + " doesn't exist");
		}
	}
	this.contact_solid.solids = solidList;
};

/**
* Creates contact solid (private)
* @param	{Number}	no			Index of contact solid
* @param	{String}	comment		Comment, can be undefined
* @param	{Object}	params  	Contact solid's parameters, can be undefined
* @returns	Created contact solid
*/
var createContactSolid = function (no,
	comment,
	params) {
	var contact_solid = solid_contacts.create(no);
	set_comment_and_parameters(contact_solid, comment, params);
	return contact_solid;
};

function GetContactSolidPerpendicularToSurfaceType(perpendicular_type) {
	const perpendicular_types_dict = {
		"FULL_FORCE_TRANSMISSION": solid_contacts.FULL_FORCE_TRANSMISSION,
		"FAILURE_UNDER_COMPRESSION": solid_contacts.FAILURE_UNDER_COMPRESSION,
		"FAILURE_UNDER_TENSION": solid_contacts.FAILURE_UNDER_TENSION
	};

	if (perpendicular_type !== undefined) {
	  var type = perpendicular_types_dict[perpendicular_type];
	  if (type === undefined) {
		console.log("Wrong perpendicular to surface type. Value was: " + perpendicular_type);
		console.log("Correct values are: ( " + Object.keys(perpendicular_types_dict) + ")");
		type = solid_contacts.FULL_FORCE_TRANSMISSION;
	  }
	  return type;
	}
	else {
	  return solid_contacts.FULL_FORCE_TRANSMISSION;
	}
}

function GetContactSolidParallelToSurfaceType(parallel_type) {
	const parallel_types_dict = {
		"FAILURE_IF_CONTACT_PERPENDICULAR_TO_SURFACES_FAILED": solid_contacts.FAILURE_IF_CONTACT_PERPENDICULAR_TO_SURFACES_FAILED,
		"FULL_FORCE_TRANSMISSION": solid_contacts.FULL_FORCE_TRANSMISSION,
		"RIGID_FRICTION": solid_contacts.RIGID_FRICTION,
		"RIGID_FRICTION_LIMIT": solid_contacts.RIGID_FRICTION_LIMIT,
		"ELASTIC_FRICTION": solid_contacts.ELASTIC_FRICTION,
		"ELASTIC_FRICTION_LIMIT": solid_contacts.ELASTIC_FRICTION_LIMIT,
		"ELASTIC_SOLID": solid_contacts.ELASTIC_SOLID
	};

	if (parallel_type !== undefined) {
	  var type = parallel_types_dict[parallel_type];
	  if (type === undefined) {
		console.log("Wrong parallel to surface type. Value was: " + parallel_type);
		console.log("Correct values are: ( " + Object.keys(parallel_types_dict) + ")");
		type = solid_contacts.FAILURE_IF_CONTACT_PERPENDICULAR_TO_SURFACES_FAILED;
	  }
	  return type;
	}
	else {
	  return solid_contacts.FAILURE_IF_CONTACT_PERPENDICULAR_TO_SURFACES_FAILED;
	}
}
