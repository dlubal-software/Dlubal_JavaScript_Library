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
	if (typeof perpendicular_to_surface != "undefined") {
		switch (perpendicular_to_surface) {
			case 1:	// Full force transmission
				this.contact_solid.perpendicular_to_surface = solid_contacts.FULL_FORCE_TRANSMISSION;
				break;
			case 2:	// Failure under compression
				this.contact_solid.perpendicular_to_surface = solid_contacts.FAILURE_UNDER_COMPRESSION;
				break;
			case 3:	// Failure under tension
				this.contact_solid.perpendicular_to_surface = solid_contacts.FAILURE_UNDER_TENSION;
				break;
			default:
				ASSERT(false, "Unknown contact perpendicular to surfaces type");
		}
	}
	if (typeof parallel_to_surface !== "undefined") {
		switch (parallel_to_surface) {
			case 1:	// Full force transmission
				this.contact_solid.parallel_to_surface = solid_contacts.FULL_FORCE_TRANSMISSION;
				// No additional values
				break;
			case 2:	// Rigid friction
				this.contact_solid.parallel_to_surface = solid_contacts.RIGID_FRICTION;
				if (typeof values !== "undefined") {
					ASSERT(values.length === 1, "Friction value is required");
					this.contact_solid.friction_coefficient = values[0];
				}
				break;
			case 3:	// Rigid friction with limit
				this.contact_solid.parallel_to_surface = solid_contacts.RIGID_FRICTION_LIMIT;
				if (typeof values !== "undefined") {
					ASSERT(values.length === 1, "Limit stress value is required");
					this.contact_solid.limit_stress = values[0];
				}
				break;
			case 4:	// Elastic friction
				this.contact_solid.parallel_to_surface = solid_contacts.ELASTIC_FRICTION;
				if (typeof values !== "undefined") {
					ASSERT(values.length === 2, "Shear stiffness and friction coefficient values are required");
					this.contact_solid.shear_stiffness = values[0];
					this.contact_solid.friction_coefficient = values[1];
				}
				break;
			case 5:	// Elastic friction with limit
				this.contact_solid.parallel_to_surface = solid_contacts.ELASTIC_FRICTION_LIMIT;
				if (typeof values !== "undefined") {
					ASSERT(values.length === 2, "Shear stiffness and limit stress values are required");
					this.contact_solid.shear_stiffness = values[0];
					this.contact_solid.limit_stress = values[1];
				}
				break;
			case 6:	// Elastic solid behavior
				this.contact_solid.parallel_to_surface = solid_contacts.ELASTIC_SOLID;
				if (typeof values !== "undefined") {
					ASSERT(values.length === 1, "Shear stiffness value is required");
					this.contact_solid.shear_stiffness = values[0];
				}
				break;
			case 7:	// Failure if contact perpendicular to surfaces failed
				ASSERT(typeof perpendicular_to_surface === "undefined" || perpendicular_to_surface === 2 || perpendicular_to_surface === 3, "Failure if contact perpendicular to surfaces failed type can be set only for \"Failure under tension\" or \"Failure under compression\"");
				this.contact_solid.parallel_to_surface = solid_contacts.FAILURE_IF_CONTACT_PERPENDICULAR_TO_SURFACES_FAILED;
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