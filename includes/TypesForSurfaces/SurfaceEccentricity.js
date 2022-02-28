if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates surfaces.");
}

/**
 * Creates surface eccentricity
 * @class
 * @constructor
 * @param	{Number}	no				Index of surface eccentricity, can be undefined
 * @param	{Array}		surfaces_list	List of surfaces indexes
 * @param	{String}	comment			Comment, can be undefined
 * @param	{Object}	params  		Surface eccentricity's parameters, can be undefined
 * @returns	Created surface eccentricity
 */
function SurfaceEccentricity(no,
	surfaces_list,
	comment,
	params)
{
	this.surface_eccentricity = createEccentricity(no, surfaces_list, comment, params);
};

/**
* Sets offset or/and thickness alignment
* @param	{Number}	no					Index of surface eccentricity, can be undefined
* @param	{Array}		surfaces_list		List of surfaces indexes
* @param	{Number}	offset				Absolute ordinate (value has tu be set with this way: for example 20 mm), can be undefined
* @param	{String}	thickness_alignment	Thickness assignment (THICKNESS_ALIGNMENT_TOP, THICKNESS_ALIGNMENT_MIDDLE, THICKNESS_ALIGNMENT_BOTTOM), can be undefined (middle as default)
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params  			Surface eccentricity's parameters, can be undefined
*/
SurfaceEccentricity.prototype.OffsetAndThicknessAssignment = function (offset,
	thickness_alignment) {
	ASSERT(typeof offset !== "undefined" || typeof thickness_alignment !== "undefined", "Offset or thickness assignment must be defined");
	if (typeof offset !== "undefined") {
		this.surface_eccentricity.offset = offset;
	}
	if (typeof thickness_alignment !== "undefined") {
		this.surface_eccentricity.thickness_alignment = getAlignment(thickness_alignment);
	}
};

/**
* Sets transverse offset
* @param	{String}	reference_type		Reference object type (REFERENCE_TYPE_MEMBER, REFERENCE_TYPE_SURFACE)
* @param	{Number}	reference_no		Member or surface Number
* @param	{String}	offset_alignment	Axial offset (TRANSVERSE_OFFSET_TOP, TRANSVERSE_OFFSET_MIDDLE, TRANSVERSE_OFFSET_BOTTOM), can be undefined (middle as default)
*/
SurfaceEccentricity.prototype.TransverseOffset = function (reference_type,
	reference_no,
	offset_alignment) {
	ASSERT(typeof reference_type !== "undefined", "Reference type must be specified");
	ASSERT(typeof reference_no !== "undefined", "Reference member/surface number must be specified");
	switch (reference_type) {
		case "REFERENCE_TYPE_MEMBER":
			this.surface_eccentricity.transverse_offset_reference_type = surface_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_MEMBER_SECTION;
			this.surface_eccentricity.transverse_offset_reference_member = reference_no;
			break;
		case "REFERENCE_TYPE_SURFACE":
			this.surface_eccentricity.transverse_offset_reference_type = surface_eccentricities.TRANSVERSE_OFFSET_TYPE_FROM_SURFACE_THICKNESS;
			this.surface_eccentricity.transverse_offset_reference_surface = reference_no;
			break;
		default:
			ASSERT(false, "Unknown reference type");
	}
	if (typeof offset_alignment !== "undefined") {
		this.surface_eccentricity.transverse_offset_alignment = getAlignment(offset_alignment);
	}
};

/**
* Creates base surface eccentricity
* @param	{Number}	no				Index of surface eccentricity, can be undefined
* @param	{Array}		surfaces_list	List of surfaces indexes
* @param	{String}	comment			Comment, can be undefined
* @param	{Object}	params  		Surface eccentricity's parameters, can be undefined
* @return Surface eccentricity
*/
var createEccentricity = function (no,
	surfaces_list,
	comment,
	params) {
	ASSERT(typeof surfaces_list !== "undefined", "Surfaces indexes must be specified");
	var surface_eccentricity = engine.create_surface_eccentricity(no);
	var assignedSurfaces = [];
	for (var i = 0; i < surfaces_list.length; ++i) {
		if (surfaces.exist(surfaces_list[i])) {
			assignedSurfaces.push(surfaces[surfaces_list[i]]);
		}
		else {
			console.log("Surface no " + surfaces_list[i] + " doesn't exist");
		}
	}
	surface_eccentricity.assigned_to_surfaces = assignedSurfaces;
	set_comment_and_parameters(surface_eccentricity, comment, params);
	return surface_eccentricity;
};

/**
* Convert string representation of alignment (private)
* @param	{String}	alignment	Surface eccentricity alignment
* @return	Surface eccentricity alignment
*/
var getAlignment = function (alignment) {
	switch (alignment) {
		case "THICKNESS_ALIGNMENT_TOP":
		case "TRANSVERSE_OFFSET_TOP":
			return surface_eccentricities.ALIGN_TOP;
		case "THICKNESS_ALIGNMENT_MIDDLE":
		case "TRANSVERSE_OFFSET_MIDDLE":
			return surface_eccentricities.ALIGN_MIDDLE;
		case "THICKNESS_ALIGNMENT_BOTTOM":
		case "TRANSVERSE_OFFSET_BOTTOM":
			return surface_eccentricities.ALIGN_BOTTOM;
		default:
			ASSERT(false, "Unknown thickness alignment");
	}
}
