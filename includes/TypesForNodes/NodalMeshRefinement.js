/**
 * Creates default nodal node refinement
 * @param {Number}  no                      Index of rectangular nodal mesh refinement, can be undefined
 * @param {Array}   assigned_nodes          Assigned nodes
 * @param {String}  comment                 Comment
 * @param {Object}  params                  Additional parameters
 */
function NodalMeshRefinement(no,
    assigned_nodes,
    comment,
    params)
{
    if (arguments.length > 0) {
        return this.nodalMeshRefinement = createNodalMeshRefinement(no, assigned_nodes, comment, params);
    }
}

/**
 * Creates circular nodal mesh refinement
 * @param {Number}  no                      Index of circular nodal mesh refinement, can be undefined
 * @param {Array}   assigned_nodes          Assigned nodes
 * @param {Number}  radius                  Circular radius, can be undefined (2.5 m by default)
 * @param {Number}  inner_target_fe_length  Inner target FE length, can be undefined (0.1 m by default)
 * @param {Number}  outer_target_fe_length  Outer target FE length, can be undefined (0.5 m by default)
 * @param {String}  fe_length_arrangement    FE length arrangement ("Radial", "Gradually", "Combined"), can be undefined (Radial as default)
 * @param {String}  comment                 Comment, can be undefined
 * @param {Object}  params                  Additional parameters, can be undefined
 */
NodalMeshRefinement.prototype.Circular = function (no,
    assigned_nodes,
    radius,
    inner_target_fe_length,
    outer_target_fe_length,
    fe_length_arrangement,
    comment,
    params) {
    this.nodalMeshRefinement = createNodalMeshRefinement(no, assigned_nodes, comment, params);
    this.nodalMeshRefinement.type = nodal_mesh_refinements.TYPE_CIRCULAR;
    if (typeof radius !== "undefined") {
        this.nodalMeshRefinement.circular_radius = radius;
    }
    if (typeof inner_target_fe_length !== "undefined") {
        this.nodalMeshRefinement.circular_target_inner_length = inner_target_fe_length;
    }
    if (typeof outer_target_fe_length !== "undefined") {
        this.nodalMeshRefinement.circular_target_outer_length = outer_target_fe_length;
    }
    if (typeof fe_length_arrangement !== "undefined") {
        this.nodalMeshRefinement.circular_length_arrangement = GetNodalMeshRefinementCircularLengthArrangement(fe_length_arrangement);
    }
};

/**
 * Creates rectangular nodal mesh refinement
 * @param {Number}  no                      Index of rectangular nodal mesh refinement, can be undefined
 * @param {Array}   assigned_nodes          Assigned nodes
 * @param {Number}  side_length             Side length, can be undefined (0.5 m by default)
 * @param {Number}  inner_target_fe_length  Inner target FE length, can be undefined (0.1 m by default)
 * @param {String}  comment                 Comment
 * @param {Object}  params                  Additional parameters
 */
NodalMeshRefinement.prototype.Rectangular = function (no,
    assigned_nodes,
    side_length,
    inner_target_fe_length,
    comment,
    params) {
    this.nodalMeshRefinement = createNodalMeshRefinement(no, assigned_nodes, comment, params);
    this.nodalMeshRefinement.type = nodal_mesh_refinements.TYPE_RECTANGULAR;
    if (typeof side_length !== "undefined") {
        this.nodalMeshRefinement.rectangular_side = side_length;
    }
    if (typeof inner_target_fe_length !== "undefined") {
        this.nodalMeshRefinement.rectangular_target_inner_length = inner_target_fe_length;
    }
};

/**
 * Apply only to selected surfaces
 * @param {Array}   indexes     Apply only on surfaces with indexes, can be undefined (no surfaces are selected)
 */
NodalMeshRefinement.prototype.ApplyToSurfaces = function (indexes) {
    var surface_list = [];
    if (typeof indexes !== "undefined") {
        for (var i = 0; i < indexes.length; ++i) {
            if (surfaces.exist(indexes[i])) {
                surface_list.push(indexes[i]);
            }
            else {
                console.log("Surface no. " + indexes[i] + " doesn't exist");
            }
        }
    }
    this.nodalMeshRefinement.apply_only_on_selected_surfaces = surface_list.length > 0;
    this.nodalMeshRefinement.selected_surfaces = surface_list;
};

/**
 * Creates default nodal node refinement
 * @param {Number}  no                      Index of rectangular nodal mesh refinement, can be undefined
 * @param {Array}   assigned_nodes          Assigned nodes
 * @param {String}  comment                 Comment
 * @param {Object}  params                  Additional parameters
 * @returns Created default nodal mesh refinement
 */
var createNodalMeshRefinement = function (no,
    assigned_nodes,
    comment,
    params) {
    ASSERT(typeof assigned_nodes !== "undefined", "Assigned nodes must be specified");
    var nodalMeshRefinement = engine.create_nodal_mesh_refinement(no);
    var node_list = [];
    for (var i = 0; i < assigned_nodes.length; ++i) {
        if (nodes.exist(assigned_nodes[i])) {
            node_list.push(assigned_nodes[i]);
        }
        else {
            console.log("Node no. " + assigned_nodes[i] + " doesn't exist");
        }
    }
    nodalMeshRefinement.nodes = node_list;
    set_comment_and_parameters(nodalMeshRefinement, comment, params);
    return nodalMeshRefinement;
};

function GetNodalMeshRefinementCircularLengthArrangement(arrangement_type) {
	const arrangement_types_dict = {
        "RADIAL": nodal_mesh_refinements.LENGTH_ARRANGEMENT_RADIAL,
        "GRADUALLY": nodal_mesh_refinements.LENGTH_ARRANGEMENT_GRADUALLY,
        "COMBINED": nodal_mesh_refinements.LENGTH_ARRANGEMENT_COMBINED
	};

	if (arrangement_type !== undefined) {
	  var type = arrangement_types_dict[arrangement_type];
	  if (type === undefined) {
		console.log("Wrong circular length arrangement type. Value was: " + arrangement_type);
		console.log("Correct values are: ( " + Object.keys(arrangement_types_dict) + ")");
		type = nodal_mesh_refinements.LENGTH_ARRANGEMENT_RADIAL;
	  }
	  return type;
	}
	else {
	  return nodal_mesh_refinements.LENGTH_ARRANGEMENT_RADIAL;
	}
}
