function createBaseConcreteDesignConfiguration (object_to_create,
    no,
    surfaces_no,
    members_no,
    nodes_no,
    comment,
    params) {
    ASSERT(CONCRETE_DESIGN.isActive(), "Steel design must be active");
    if (typeof no === "undefined") {
        addon = object_to_create.create();
    }
    else {
        addon = object_to_create.create(no);
    }
    assignConcreteDesignObjects(addon, surfaces_no, members_no, nodes_no);
    set_comment_and_parameters(addon, comment, params);
    return addon;
}

function assignConcreteDesignObjects (object_to_set,
    surfaces_no,
    members_no,
    nodes_no) {
    if (typeof surfaces_no !== "undefined") {
        ASSERT(Array.isArray(surfaces_no), "Surface list must be array if surface indexes");
        surface_list = surfaces_no;
        surfaces_no = [];
        for (var i = 0; i < surface_list.length; ++i) {
            if (surfaces.exist(surface_list[i])) {
                var material = surfaces[surface_list[i]].material;
                if (material.material_type === materials.TYPE_CONCRETE) {
                    if (surfaces[surface_list[i]].design_properties_via_surface) {
                        surfaces_no.push(surface_list[i]);
                    }
                    else {
                        console.log("Surface no. " + surface_list[i] + " must have design properties active");
                    }
                }
                else {
                    console.log("Material of surface no. " + surface_list[i].toString() + " must be of " + materials.TYPE_CONCRETE + " type");
                }
            }
            else {
                console.log("Surface no. " + surface_list[i] + " doesn't exist");
            }
        }
        object_to_set.assigned_to_surfaces = surfaces_no;
    }
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "Member list must be array if member indexes");
        member_list = members_no;
        members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                var material = members[member_list[i]].section_material;
                if (material.material_type === materials.TYPE_CONCRETE) {
                    members_no.push(member_list[i]);
                }
                else {
                    console.log("Material of member no. " + member_list[i].toString() + " must be of " + materials.TYPE_CONCRETE + " type");
                }
            }
            else {
                console.log("Member no. " + member_list[i] + " doesn't exist");
            }
        }
        object_to_set.assigned_to_members = members_no;
    }
    if (typeof nodes_no !== "undefined") {
        ASSERT(Array.isArray(nodes_no), "Nodes list must be array on nodes indexes");
        nodes_list = nodes_no;
        nodes_no = [];
        for (var i = 0; i < nodes_list.length; ++i) {
            if (nodes.exist(nodes_list[i])) {
                if (nodes[nodes_list[i]].punching_design) {
                    nodes_no.push(nodes_list[i]);
                }
                else {
                    console.log("Node no. " + nodes_list[i] + " must have punching design active");
                }
            }
            else {
                console.log("Node no. " + nodes_list[i] + " doesn't exist");
            }
        }
        object_to_set.assigned_to_nodes = nodes_no;
    }
}

function Members_ConcreteDesignConsiderInternalForces (addon_settings,
    property_member_axial_forces,
    property_member_bending_moments_my,
    property_member_bending_moments_mz,
    property_member_torsional_moments,
    property_member_shear_forces_vy,
    property_member_shear_forces_vz) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_axial_forces !== "undefined") {
        addon_settings.property_member_axial_forces = property_member_axial_forces
    }
    if (typeof property_member_bending_moments_my !== "undefined") {
        addon_settings.property_member_bending_moments_my = property_member_bending_moments_my;
    }
    if (typeof property_member_bending_moments_mz !== "undefined") {
        addon_settings.property_member_bending_moments_mz = property_member_bending_moments_mz;
    }
    if (typeof property_member_torsional_moments !== "undefined") {
        addon_settings.property_member_torsional_moments = property_member_torsional_moments;
    }
    if (typeof property_member_shear_forces_vy !== "undefined") {
        addon_settings.property_member_shear_forces_vy = property_member_shear_forces_vy;
    }
    if (typeof property_member_shear_forces_vz !== "undefined") {
        addon_settings.property_member_shear_forces_vz = property_member_shear_forces_vz;
    }
};

function Members_ConcreteDesignRequiredLongitudinalReinforcement (addon_settings,
    property_member_reinforcement_layout,
    property_member_reinforcement_diameter_for_preliminary_design,
    property_member_reinforcement_distribute_over_slab,
    property_member_reinforcement_distribute_over_slab_reduced_width,
    property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement,
    property_member_increase_of_tension_required_reinforcement_due_to_shear) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    addon_settings.property_member_reinforcement_layout = GetConcreteDesignPropertyMemberReinforcementLayout(property_member_reinforcement_layout);
    if (typeof property_member_reinforcement_diameter_for_preliminary_design !== "undefined") {
        ASSERT(addon_settings.property_member_reinforcement_layout !== GetConcreteDesignPropertyMemberReinforcementLayout("FACTORIZED_PROVIDED_REINFORCEMENT") &&
            addon_settings.property_member_reinforcement_layout !== GetConcreteDesignPropertyMemberReinforcementLayout("OPTIMIZED_PROVIDED_REINFORCEMENT"), "Reinforcement diameter for preliminary design can be set only if not set FACTORIZED_PROVIDED_REINFORCEMENT or OPTIMIZED_PROVIDED_REINFORCEMENT");
        if (typeof property_member_reinforcement_diameter_for_preliminary_design === "string") {
            ASSERT(property_member_reinforcement_diameter_for_preliminary_design === "MAX_OF_ALL", "Reinforcement diameter for preliminary design must be of MAX_OF_ALL type");
            addon_settings.property_member_reinforcement_diameter_for_preliminary_design = GetConcreteDesignPropertyMemberReinforcementDiameterForPreliminaryDesign("MAX_OF_ALL");
        }
        else {
            ASSERT(typeof property_member_reinforcement_diameter_for_preliminary_design === "number", "Reinforcement diameter for preliminary design must be number");
            addon_settings.property_member_reinforcement_diameter_for_preliminary_design = GetConcreteDesignPropertyMemberReinforcementDiameterForPreliminaryDesign("USER_DEFINED");
            addon_settings.property_member_reinforcement_diameter_for_preliminary_design_user_value = property_member_reinforcement_diameter_for_preliminary_design;
        }
    }
    if (typeof property_member_reinforcement_distribute_over_slab !== "undefined") {
        addon_settings.property_member_reinforcement_distribute_over_slab = property_member_reinforcement_distribute_over_slab;
    }
    if (typeof property_member_reinforcement_distribute_over_slab_reduced_width !== "undefined") {
        ASSERT(addon_settings.property_member_reinforcement_distribute_over_slab, "Distribute reinforcement evenly over complete slab with must be on");
        addon_settings.property_member_reinforcement_distribute_over_slab_reduced_width = property_member_reinforcement_distribute_over_slab_reduced_width;
    }
    if (typeof property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement !== "undefined") {
        addon_settings.property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement = property_member_include_tensile_force_due_to_shear_in_required_longitudinal_reinforcement;
    }
    if (typeof property_member_increase_of_tension_required_reinforcement_due_to_shear !== "undefined") {
        addon_settings.property_member_increase_of_tension_required_reinforcement_due_to_shear = property_member_increase_of_tension_required_reinforcement_due_to_shear;
    }
};

function GetConcreteDesignPropertyMemberReinforcementDiameterForPreliminaryDesign(diameter_type) {
	var diameter_types_dict = {};
    var defaultValue;
    if (IsCurrentCodeOfStandard("EN")) {
        diameter_types_dict = {
            "MAX_OF_ALL": ulsconfig_member_ec2.E_REINFORCEMENT_DIAMETER_MAX_OF_ALL,
            "USER_DEFINED": ulsconfig_member_ec2.E_REINFORCEMENT_DIAMETER_USER_DEFINED
        };
        defaultValue = ulsconfig_member_ec2.E_REINFORCEMENT_DIAMETER_MAX_OF_ALL;
    }
    else if (IsCurrentCodeOfStandard("ACI")) {
        diameter_types_dict = {
            "MAX_OF_ALL": ulsconfig_member_aci318.E_REINFORCEMENT_DIAMETER_MAX_OF_ALL,
            "USER_DEFINED": ulsconfig_member_aci318.E_REINFORCEMENT_DIAMETER_USER_DEFINED
        };
        defaultValue = ulsconfig_member_aci318.E_REINFORCEMENT_DIAMETER_MAX_OF_ALL;
    }
    else if (IsCurrentCodeOfStandard("CSA")) {
        diameter_types_dict = {
            "MAX_OF_ALL": ulsconfig_member_csaa233.E_REINFORCEMENT_DIAMETER_MAX_OF_ALL,
            "USER_DEFINED": ulsconfig_member_csaa233.E_REINFORCEMENT_DIAMETER_USER_DEFINED
        };
        defaultValue = ulsconfig_member_csaa233.E_REINFORCEMENT_DIAMETER_MAX_OF_ALL;
    }
	if (diameter_type !== undefined) {
	  var type = diameter_types_dict[diameter_type];
	  if (type === undefined) {
		console.log("Wrong member reinforcement diameter for preliminary design type. Value was: " + diameter_type);
		console.log("Correct values are: ( " + Object.keys(diameter_type) + ")");
		type = defaultValue;
	  }
	  return type;
	}
	else {
	  return defaultValue;
	}
}

function GetConcreteDesignPropertyMemberReinforcementLayout(layout_type) {
    var layout_types_dict = {};
    var defaultValue;
    if (IsCurrentCodeOfStandard("EN")) {
        layout_types_dict = {
            "TOP_BOTTOM_OPTIMIZED_DISTRIBUTION": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_OPTIMIZED_DISTRIBUTION,
            "TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION,
            "IN_CORNERS_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_IN_CORNERS_SYMMETRICAL_DISTRIBUTION,
            "UNIFORMLY_SURROUNDING": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING,
            "FACTORIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_FACTORIZED_PROVIDED_REINFORCEMENT,
            "OPTIMIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_OPTIMIZED_PROVIDED_REINFORCEMENT
        };
        defaultValue = ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_OPTIMIZED_PROVIDED_REINFORCEMENT;
    }
    else if (IsCurrentCodeOfStandard("ACI")) {
        layout_types_dict = {
            "TOP_BOTTOM_OPTIMIZED_DISTRIBUTION": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_OPTIMIZED_DISTRIBUTION,
            "TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION,
            "IN_CORNERS_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_IN_CORNERS_SYMMETRICAL_DISTRIBUTION,
            "UNIFORMLY_SURROUNDING": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING,
            "FACTORIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_FACTORIZED_PROVIDED_REINFORCEMENT,
            "OPTIMIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_OPTIMIZED_PROVIDED_REINFORCEMENT
        };
        defaultValue = ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_OPTIMIZED_PROVIDED_REINFORCEMENT;
    }
    else if (IsCurrentCodeOfStandard("CSA")) {
        layout_types_dict = {
            "TOP_BOTTOM_OPTIMIZED_DISTRIBUTION": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_OPTIMIZED_DISTRIBUTION,
            "TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION,
            "IN_CORNERS_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_IN_CORNERS_SYMMETRICAL_DISTRIBUTION,
            "UNIFORMLY_SURROUNDING": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING,
            "FACTORIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_FACTORIZED_PROVIDED_REINFORCEMENT,
            "OPTIMIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_OPTIMIZED_PROVIDED_REINFORCEMENT
        };
        defaultValue = ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_OPTIMIZED_PROVIDED_REINFORCEMENT;
    }
    else {
        ASSERT(false, "GetConcreteDesignPropertyMemberReinforcementLayout: Unsupported standard");
        return;
    }

	if (layout_type !== undefined) {
	  var type = layout_types_dict[layout_type];
	  if (type === undefined) {
		console.log("Wrong member reinforcement layout type. Value was: " + layout_type);
		console.log("Correct values are: ( " + Object.keys(layout_types_dict) + ")");
		type = defaultValue
	  }
	  return type;
	}
	else {
	  return defaultValue;
	}
}

function SetConcreteDesignRequiredShearReinforcementType(addon_settings,
    property_kind,
    shear_reinforcement_types,
    shear_reinforcement_type) {
	if (shear_reinforcement_type !== undefined) {
	  if (shear_reinforcement_types.indexOf(shear_reinforcement_type) === -1)
      {
        console.log("Wrong shear reinforcement type. Value was: " + shear_reinforcement_type);
		console.log("Correct values are: ( " + shear_reinforcement_types + ")");
		return;
      }
	}
	else {
        shear_reinforcement_type = "REQUIRED";
	}
    switch (shear_reinforcement_type) {
        case "REQUIRED":
            if (property_kind === "member") {
                addon_settings.property_member_longitudinal_reinforcement_use_required = true;
            }
            else if (property_kind === "surface") {
                addon_settings.property_surface_longitudinal_reinforcement_use_required = true;
            }
            else {
                ASSERT(false, "SetConcreteDesignRequiredShearReinforcementType");
            }
            break;
        case "PROVIDED":
            if (property_kind === "member") {
                addon_settings.property_member_longitudinal_reinforcement_use_provided = true;
            }
            else if (property_kind === "surface") {
                addon_settings.property_surface_longitudinal_reinforcement_use_provided = true;
            }
            else {
                ASSERT(false, "SetConcreteDesignRequiredShearReinforcementType");
            }
            break;
        case "AUTOMATICALLY":
            if (property_kind === "member") {
                addon_settings.property_member_longitudinal_reinforcement_automatically_increase_required = true;
            }
            else if (property_kind === "surface") {
                addon_settings.property_surface_longitudinal_reinforcement_automatically_increase_required = true;
            }
            else {
                ASSERT(false, "SetConcreteDesignRequiredShearReinforcementType");
            }
            break;
        default:
            ASSERT(false, "SetConcreteDesignRequiredShearReinforcement - unknown shear reinforcement type");
    }
}

function GetCurrentCodeOfStandard () {
    return general.current_standard_for_concrete_design.match(/\w+/);
}

function IsCurrentCodeOfStandard (current_standard) {
    return GetCurrentCodeOfStandard() == current_standard;  // Don't use === (we don't want compare types of strings)
}

function SetConcreteDesignMembersCalculationSetting (addon_settings,
    property_member_nett_concrete_area) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_nett_concrete_area === "undefined") {
        property_member_nett_concrete_area = true;
    }
    addon_settings.property_member_nett_concrete_area = property_member_nett_concrete_area;
}

function SetConcreteDesignStabilityRequiredReinforcement (addon_settings,
    property_stability_reinforcement_layout,
    reinforcement_diameter_for_preliminary_design_user_value) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    addon_settings.property_stability_reinforcement_layout = GetConcreteDesignStabilityReinforcementLayout(property_stability_reinforcement_layout);
    if (typeof reinforcement_diameter_for_preliminary_design_user_value !== "undefined") {
        ASSERT(addon_settings.property_stability_reinforcement_layout !== GetConcreteDesignStabilityReinforcementLayout("FACTORIZED_PROVIDED_REINFORCEMENT"), "Reinforcement layout can't be of Factorize provided reinforcement type");
        if (typeof reinforcement_diameter_for_preliminary_design_user_value === "string") {
            ASSERT(reinforcement_diameter_for_preliminary_design_user_value === "MAX_OF_ALL", "reinforcement_diameter_for_preliminary_design_user_value must be of MAX_OF_ALL string type");
            addon_settings.property_stability_reinforcement_diameter_for_preliminary_design = GetConcreteDesignPropertyMemberReinforcementDiameterForPreliminaryDesign("MAX_OF_ALL");
        }
        else {
            ASSERT(typeof reinforcement_diameter_for_preliminary_design_user_value === "number", "reinforcement_diameter_for_preliminary_design_user_value must be number");
            addon_settings.property_stability_reinforcement_diameter_for_preliminary_design = GetConcreteDesignPropertyMemberReinforcementDiameterForPreliminaryDesign("USER_DEFINED");
            addon_settings.property_stability_reinforcement_diameter_for_preliminary_design_user_value = reinforcement_diameter_for_preliminary_design_user_value;
        }
    }
}

function GetConcreteDesignStabilityReinforcementLayout(reinforcement_layout_type) {
	var reinforcement_layout_types_dict = {};
    var default_value = "";
    if (IsCurrentCodeOfStandard("EN")) {
        reinforcement_layout_types_dict = {
            "TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION,
            "IN_CORNERS_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_IN_CORNERS_SYMMETRICAL_DISTRIBUTION,
            "UNIFORMLY_SURROUNDING": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING,
            "FACTORIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_FACTORIZED_PROVIDED_REINFORCEMENT
        };
        default_value = ulsconfig_member_ec2.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING;
    }
    else if (IsCurrentCodeOfStandard("ACI")) {
        reinforcement_layout_types_dict = {
            "TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION,
            "IN_CORNERS_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_IN_CORNERS_SYMMETRICAL_DISTRIBUTION,
            "UNIFORMLY_SURROUNDING": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING,
            "FACTORIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_FACTORIZED_PROVIDED_REINFORCEMENT
        }
        default_value = ulsconfig_member_aci318.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING;
    }
    else if (IsCurrentCodeOfStandard("CSA")) {
        reinforcement_layout_types_dict = {
            "TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_TOP_BOTTOM_SYMMETRICAL_DISTRIBUTION,
            "IN_CORNERS_SYMMETRICAL_DISTRIBUTION": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_IN_CORNERS_SYMMETRICAL_DISTRIBUTION,
            "UNIFORMLY_SURROUNDING": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING,
            "FACTORIZED_PROVIDED_REINFORCEMENT": ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_FACTORIZED_PROVIDED_REINFORCEMENT
        }
        default_value = ulsconfig_member_csaa233.E_REINFORCEMENT_LAYOUT_UNIFORMLY_SURROUNDING;
    }
    else {
        ASSERT(false, "GetConcreteDesignStabilityReinforcementLayout: Unsupported standard");
        return;
    }
	if (reinforcement_layout_type !== undefined) {
	  var type = reinforcement_layout_types_dict[reinforcement_layout_type];
	  if (type === undefined) {
		console.log("Wrong reinforcement layout type. Value was: " + reinforcement_layout_type);
		console.log("Correct values are: " + Object.keys(reinforcement_layout_types_dict));
		type = default_value;
	  }
	  return type;
	}
	else {
	  return default_value;
	}
}

function SetConcreteDesignSurfacesDesignMethod (settings_addon,
    optimization_type) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    SetConcreteDesignSurfacesOptimizationType(settings_addon, optimization_type);
};

function SetConcreteDesignSurfacesOptimizationType(settings_addon,
    optimization_type) {
        optimization_types = [
            "NO",
            "YES"
    ];
	if (optimization_type !== undefined) {
	  if (optimization_types.indexOf(optimization_type) === -1)
      {
        console.log("Wrong design method optimization type. Value was: " + optimization_type);
		console.log("Correct values are: " + optimization_types);
		return;
      }
	}
	else {
        optimization_type = "YES";
	}
    switch (optimization_type) {
        case "NO":
            settings_addon.property_surface_internal_forces_no_optimization = true;
            break;
        case "YES":
            settings_addon.property_surface_internal_forces_optimization = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignOptimizationType - unknown design method optimization type");
    }
}

function SetConcreteDesignSurfacesInternalForcesDiagramUsedForDesign (addon_settings,
    property_subtraction_of_rib_components) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_subtraction_of_rib_components === "undefined") {
        property_subtraction_of_rib_components = true;
    }
    addon_settings.property_subtraction_of_rib_components = property_subtraction_of_rib_components;
}

function SetConcreteDesignSurfacesMinimumLongitudinalReinforcement (addon_settings,
    property_minimum_longitudinal_reinforcement_acc_to_standard,
    reinforcement_type,
    min_reinforcement_direction,
    min_reinforcement_direction_user_values,
    main_compression_reinforcement_direction,
    property_surface_reinforcement_defined_direction_phi,
    property_surface_ratio_b_div_h) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_minimum_longitudinal_reinforcement_acc_to_standard !== "undefined") {
        addon_settings.property_minimum_longitudinal_reinforcement_acc_to_standard = property_minimum_longitudinal_reinforcement_acc_to_standard;
    }
    if (typeof reinforcement_type !== "undefined") {
        ASSERT(addon_settings.property_minimum_longitudinal_reinforcement_acc_to_standard, "Minimum longitudinal reinforcement acc. to standard must be on");
        SetConcreteDesignSurfacesMinimumLongitudinalReinforcementType(addon_settings, reinforcement_type);
    }
    if (typeof min_reinforcement_direction !== "undefined") {
        ASSERT(addon_settings.property_minimum_longitudinal_reinforcement_for_plates, "Minimum longitudinal reinforcement for plates must be on");
        SetConcreteDesignSurfacesMinDirectionReinforcementType(addon_settings, min_reinforcement_direction);
    }
    if (typeof min_reinforcement_direction_user_values !== "undefined") {
        ASSERT(Array.isArray(min_reinforcement_direction_user_values), "User-defined minimum reinforcement direction values must be array of booleans ([φ1(-z), φ2(-z), φ1(+z), φ2(+z)])");
        if (min_reinforcement_direction_user_values[0] !== undefined) {
            addon_settings.property_surface_top_reinforcement_direction_phi1 = min_reinforcement_direction_user_values[0];
        }
        if (min_reinforcement_direction_user_values[1] !== undefined) {
            addon_settings.property_surface_top_reinforcement_direction_phi2 = min_reinforcement_direction_user_values[1];
        }
        if (min_reinforcement_direction_user_values[2] !== undefined) {
            addon_settings.property_surface_bottom_reinforcement_direction_phi1 = min_reinforcement_direction_user_values[2];
        }
        if (min_reinforcement_direction_user_values[3] !== undefined) {
            addon_settings.property_surface_bottom_reinforcement_direction_phi2 = min_reinforcement_direction_user_values[3];
        }
    }
    if (typeof main_compression_reinforcement_direction !== "undefined") {
        ASSERT(addon_settings.property_minimum_longitudinal_reinforcement_for_walls, "Minimum longitudinal reinforcement for walls must be on");
        SetConcreteDesignSurfacesMainCompressionReinforcementDirectionType(addon_settings, main_compression_reinforcement_direction);
    }
    if (typeof property_surface_reinforcement_defined_direction_phi !== "undefined") {
        ASSERT(addon_settings.property_defined_in_reinforcement_direction, "Defined in reinforcement direction must be on");
        addon_settings.property_surface_reinforcement_defined_direction_phi = GetConcreteDesignSurfacesReinforcementDefinedDirectionType(property_surface_reinforcement_defined_direction_phi);
    }
    if (typeof property_surface_ratio_b_div_h !== "undefined") {
        ASSERT(addon_settings.property_minimum_longitudinal_reinforcement_for_walls, "Minimum longitudinal reinforcement for walls must be on");
        addon_settings.property_surface_ratio_b_div_h = property_surface_ratio_b_div_h;
    }
};

function SetConcreteDesignSurfacesMinimumLongitudinalReinforcementType(addon_settings,
    reinforcement_type) {
        reinforcement_types = [
            "PLATES",
            "WALLS"
    ];
	if (reinforcement_type !== undefined) {
	  if (reinforcement_types.indexOf(reinforcement_type) === -1)
      {
        console.log("Wrong longitudinal reinforcement type. Value was: " + reinforcement_type);
		console.log("Correct values are: " + reinforcement_types);
		return;
      }
	}
	else {
        reinforcement_type = "PLATES";
	}
    switch (reinforcement_type) {
        case "PLATES":
            addon_settings.property_minimum_longitudinal_reinforcement_for_plates = true;
            break;
        case "WALLS":
            addon_settings.property_minimum_longitudinal_reinforcement_for_walls = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignMinimumLongitudinalReinforcementType - unknown longitudinal reinforcement type");
    }
}

function SetConcreteDesignSurfacesMinDirectionReinforcementType(addon_settings,
    reinforcement_type) {
        reinforcement_types = [
            "MAIN_TENSION_ELEMENT",
            "MAIN_TENSION_SURFACE",
            "DEFINED"
    ];
	if (reinforcement_type !== undefined) {
	  if (reinforcement_types.indexOf(reinforcement_type) === -1)
      {
        console.log("Wrong minimum direction reinforcement type. Value was: " + reinforcement_type);
		console.log("Correct values are: " + reinforcement_types);
		return;
      }
	}
	else {
        reinforcement_type = "MAIN_TENSION_ELEMENT";
	}
    switch (reinforcement_type) {
        case "MAIN_TENSION_ELEMENT":
            addon_settings.property_direction_with_main_tension_in_the_element = true;
            break;
        case "MAIN_TENSION_SURFACE":
            addon_settings.property_direction_with_main_tension_in_the_surface = true;
            break;
        case "DEFINED":
            addon_settings.property_defined = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignMinDirectionReinforcementType - unknown minimum direction reinforcement type");
    }
}

function SetConcreteDesignSurfacesMainCompressionReinforcementDirectionType(addon_settings,
    direction_type) {
        direction_types = [
            "WITH_MAIN_COMPRESSION_FORCE",
            "DEFINED_IN_REINFORCEMENT_DIRECTION"
    ];
	if (direction_type !== undefined) {
	  if (direction_types.indexOf(direction_type) === -1)
      {
        console.log("Wrong main compression reinforcement direction type. Value was: " + direction_type);
		console.log("Correct values are: " + direction_types);
		return;
      }
	}
	else {
        direction_type = "WITH_MAIN_COMPRESSION_FORCE";
	}
    switch (direction_type) {
        case "WITH_MAIN_COMPRESSION_FORCE":
            addon_settings.property_reinforcement_direction_with_the_main_compression_force = true;
            break;
        case "DEFINED_IN_REINFORCEMENT_DIRECTION":
            addon_settings.property_defined_in_reinforcement_direction = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignMainCompressionReinforcementDirectionType - unknown main compression reinforcement direction type");
    }
}

function GetConcreteDesignSurfacesReinforcementDefinedDirectionType(direction_type) {
    var direction_types_dict = {};
    var default_value = "";
    if (IsCurrentCodeOfStandard("EN")) {
	    direction_types_dict = {
            "PHI_1": concrete_design_surface_ulsconfig_concrete_design_ec2.E_DIRECTION_PHI_1,
            "PHI_2": concrete_design_surface_ulsconfig_concrete_design_ec2.E_DIRECTION_PHI_2
	    };
        default_value = concrete_design_surface_ulsconfig_concrete_design_ec2.E_DIRECTION_PHI_1;
    }
    else if (IsCurrentCodeOfStandard("ACI")) {
        direction_types_dict = {
            "PHI_1": concrete_design_surface_ulsconfig_concrete_design_aci318.E_DIRECTION_PHI_1,
            "PHI_2": concrete_design_surface_ulsconfig_concrete_design_aci318.E_DIRECTION_PHI_2
        };
        default_value = concrete_design_surface_ulsconfig_concrete_design_aci318.E_DIRECTION_PHI_1;
    }
    else {
        ASSERT(false, "GetConcreteDesignSurfacesReinforcementDefinedDirectionType: Unsupported standard");
        return;
    }

	if (direction_type !== undefined) {
	  var type = direction_types_dict[direction_type];
	  if (type === undefined) {
		console.log("Wrong reinforcement defined direction type. Value was: " + direction_type);
		console.log("Correct values are: " + Object.keys(direction_types_dict));
		type = default_value;
	  }
	  return type;
	}
	else {
	  return default_value;
	}
}

function SetConcreteDesignSurfacesUserDefinedMinimumLongitudinalReinforcementPercentage (addon_settings,
    property_user_defined_minimum_longitudinal_reinforcement_percentage,
    property_minimum_reinforcement,
    property_minimum_secondary_reinforcement,
    property_minimum_tension_reinforcement,
    property_minimum_compression_reinforcement) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_user_defined_minimum_longitudinal_reinforcement_percentage !== "undefined") {
        addon_settings.property_user_defined_minimum_longitudinal_reinforcement_percentage = property_user_defined_minimum_longitudinal_reinforcement_percentage;
    }
    if (typeof property_minimum_reinforcement !== "undefined") {
        ASSERT(addon_settings.property_user_defined_minimum_longitudinal_reinforcement_percentage, "User-defined minimum longitudinal reinforcement percentage must be on");
        addon_settings.property_minimum_reinforcement = property_minimum_reinforcement;
    }
    if (typeof property_minimum_secondary_reinforcement !== "undefined") {
        ASSERT(addon_settings.property_user_defined_minimum_longitudinal_reinforcement_percentage, "User-defined minimum longitudinal reinforcement percentage must be on");
        addon_settings.property_minimum_secondary_reinforcement = property_minimum_secondary_reinforcement;
    }
    if (typeof property_minimum_tension_reinforcement !== "undefined") {
        ASSERT(addon_settings.property_user_defined_minimum_longitudinal_reinforcement_percentage, "User-defined minimum longitudinal reinforcement percentage must be on");
        addon_settings.property_minimum_tension_reinforcement = property_minimum_tension_reinforcement;
    }
    if (typeof property_minimum_compression_reinforcement !== "undefined") {
        ASSERT(addon_settings.property_user_defined_minimum_longitudinal_reinforcement_percentage, "User-defined minimum longitudinal reinforcement percentage must be on");
        addon_settings.property_minimum_compression_reinforcement = property_minimum_compression_reinforcement;
    }
}

function SetConcreteDesignSurfacesUserDefinedMaximumLongitudinalReinforcementPercentage (addon_settings,
    property_user_defined_maximum_longitudinal_reinforcement_percentage,
    property_user_defined_maximum_longitudinal_reinforcement_percentage_value) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_user_defined_maximum_longitudinal_reinforcement_percentage !== "undefined") {
        addon_settings.property_user_defined_maximum_longitudinal_reinforcement_percentage = property_user_defined_maximum_longitudinal_reinforcement_percentage;
    }
    if (typeof property_user_defined_maximum_longitudinal_reinforcement_percentage_value !== "undefined") {
        ASSERT(addon_settings.property_user_defined_maximum_longitudinal_reinforcement_percentage, "User-defined maximum longitudinal reinforcement percentage must be on");
        addon_settings.property_user_defined_maximum_longitudinal_reinforcement_percentage_value = property_user_defined_maximum_longitudinal_reinforcement_percentage_value;
    }
}

function SetConcreteDesignSurfacesMinimumShearReinforcement (addon_settings,
    property_minimum_shear_reinforcement) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_minimum_shear_reinforcement === "undefined") {
        property_minimum_shear_reinforcement = true;
    }
    addon_settings.property_minimum_shear_reinforcement = property_minimum_shear_reinforcement;
}

function SetConcreteDesignSurfacesUserDefinedMinimumShearReinforcementPercentage (addon_settings,
    property_user_defined_minimum_shear_reinforcement_percentage,
    property_user_defined_minimum_shear_reinforcement_percentage_value) {
    ASSERT(surfaces.count() > 0, "There must exist at least one surface in project");
    if (typeof property_user_defined_minimum_shear_reinforcement_percentage !== "undefined") {
        addon_settings.property_user_defined_minimum_shear_reinforcement_percentage = property_user_defined_minimum_shear_reinforcement_percentage;
    }
    if (typeof property_user_defined_minimum_shear_reinforcement_percentage_value !== "undefined") {
        ASSERT(addon_settings.property_user_defined_minimum_shear_reinforcement_percentage, "User-defined minimum shear reinforcement percentage must be on");
        addon_settings.property_user_defined_minimum_shear_reinforcement_percentage_value = property_user_defined_minimum_shear_reinforcement_percentage_value;
    }
}

function SetConcreteDesignMembersInternalForceReductionZ (addon_settings,
    property_member_redistribution_of_moments_in_continuous_flexural_members,
    property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support,
    property_member_reduction_of_shear_at_support) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_redistribution_of_moments_in_continuous_flexural_members !== "undefined") {
        addon_settings.property_member_redistribution_of_moments_in_continuous_flexural_members = property_member_redistribution_of_moments_in_continuous_flexural_members;
    }
    if (typeof property_member_reduction_of_shear_at_support !== "undefined") {
        addon_settings.property_member_reduction_of_shear_at_support = property_member_reduction_of_shear_at_support;
    }
    if (typeof property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support !== "undefined") {
        addon_settings.property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support = property_member_reduction_of_moments_or_dimensioning_for_moments_at_face_of_monolithic_support;
    }
}

function SetConcreteDesignMembersMinimumReinforcement (addon_settings,
    property_member_minimum_longitudinal_reinforcement,
    property_member_minimum_shear_reinforcement,
    property_member_minimum_construction_reinforcement) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_member_minimum_longitudinal_reinforcement !== "undefined") {
        addon_settings.property_member_minimum_longitudinal_reinforcement = property_member_minimum_longitudinal_reinforcement;
    }
    if (typeof property_member_minimum_shear_reinforcement !== "undefined") {
        addon_settings.property_member_minimum_shear_reinforcement = property_member_minimum_shear_reinforcement;
    }
    if (typeof property_member_minimum_construction_reinforcement !== "undefined") {
        addon_settings.property_member_minimum_construction_reinforcement = property_member_minimum_construction_reinforcement;
    }
}

function SetConcreteDesignNeutralAxisDepthLimitation (addon_settings,
    addon_settings_type,
    property_consider_neutral_axis_depth_limitation,
    property_value_of_neutral_axis_depth_limitation_user_value) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (IsCurrentCodeOfStandard("EN")) {
        ;   // Only user-defined value set
    }
    else if (IsCurrentCodeOfStandard("ACI")) {
        if (addon_settings_type === "member") {
            var automaticallyValue = ulsconfig_member_aci318.E_NEUTRAL_AXIS_DEPTH_LIMITATION_AUTOMATICALLY;
            var userDefinedValue = ulsconfig_member_aci318.E_NEUTRAL_AXIS_DEPTH_LIMITATION_USER_DEFINED;
        }
        else {
            ASSERT(addon_settings_type === "surface", "SetConcreteDesignNeutralAxisDepthLimitation");
            var automaticallyValue = concrete_design_surface_ulsconfig_concrete_design_aci318.E_NEUTRAL_AXIS_DEPTH_LIMITATION_AUTOMATICALLY;
            var userDefinedValue = concrete_design_surface_ulsconfig_concrete_design_aci318.E_NEUTRAL_AXIS_DEPTH_LIMITATION_USER_DEFINED;
        }
    }
    else if (IsCurrentCodeOfStandard("CSA")) {
        if (addon_settings_type === "member") {
            var automaticallyValue = ulsconfig_member_csaa233.E_NEUTRAL_AXIS_DEPTH_LIMITATION_AUTOMATICALLY;
            var userDefinedValue = ulsconfig_member_csaa233.E_NEUTRAL_AXIS_DEPTH_LIMITATION_USER_DEFINED;
        }
        else {
            ASSERT(addon_settings_type === "surface", "SetConcreteDesignNeutralAxisDepthLimitation");
            var automaticallyValue = concrete_design_surface_ulsconfig_concrete_design_csaa233.E_NEUTRAL_AXIS_DEPTH_LIMITATION_AUTOMATICALLY;
            var userDefinedValue = concrete_design_surface_ulsconfig_concrete_design_csaa233.E_NEUTRAL_AXIS_DEPTH_LIMITATION_USER_DEFINED;
        }
    }
    else {
        ASSERT(false, "SetConcreteDesignNeutralAxisDepthLimitation - unknown code of standard (" + GetCurrentCodeOfStandard() + ")");
    }
    if (typeof property_consider_neutral_axis_depth_limitation !== "undefined") {
        if (addon_settings_type === "member") {
            addon_settings.property_member_consider_neutral_axis_depth_limitation = property_consider_neutral_axis_depth_limitation;
        }
        else {
            addon_settings.property_surface_consider_neutral_axis_depth_limitation = property_consider_neutral_axis_depth_limitation;
        }
    }
    if (typeof property_value_of_neutral_axis_depth_limitation_user_value !== "undefined") {
        ASSERT(addon_settings_type === "member" ? addon_settings.property_member_consider_neutral_axis_depth_limitation : addon_settings.property_surface_consider_neutral_axis_depth_limitation, "Consider depth limitation of neutral axis acc. to 9.3.3.1 must be on");
        if (!IsCurrentCodeOfStandard("EN")) {
            if (typeof property_value_of_neutral_axis_depth_limitation_user_value === "string") {
                ASSERT(property_value_of_neutral_axis_depth_limitation_user_value === "AUTOMATICALLY", "Value of neutral axis depth limitation must equal ti AUTOMATICALLY");
                if (addon_settings_type === "member") {
                    addon_settings.property_member_value_of_neutral_axis_depth_limitation = automaticallyValue;
                }
                else {
                    addon_settings.property_surface_value_of_neutral_axis_depth_limitation = automaticallyValue;
                }
            }
            else {
                ASSERT(typeof property_value_of_neutral_axis_depth_limitation_user_value === "number", "Value of neutral axis depth limitation must be number");
                if (addon_settings_type === "member") {
                    addon_settings.property_member_value_of_neutral_axis_depth_limitation = userDefinedValue;
                    addon_settings.property_member_value_of_neutral_axis_depth_limitation_user_value = property_value_of_neutral_axis_depth_limitation_user_value;
                }
                else {
                    addon_settings.property_surface_value_of_neutral_axis_depth_limitation = userDefinedValue;
                    addon_settings.property_surface_value_of_neutral_axis_depth_limitation_user_value = property_value_of_neutral_axis_depth_limitation_user_value;
                }
            }
        }
        else {
            if (addon_settings_type === "member") {
                addon_settings.property_member_value_of_neutral_axis_depth_limitation = property_value_of_neutral_axis_depth_limitation_user_value;
            }
            else {
                addon_settings.property_surface_value_of_neutral_axis_depth_limitation = property_value_of_neutral_axis_depth_limitation_user_value;
            }
        }
    }
}

function SetConcreteDesignMemberEpoxyFactorType(addon_settings,
    epoxy_factor_type) {
    if (IsCurrentCodeOfStandard("ACI")) {
        var epoxy_factor_types = [
            "EPOXY_COATED_OR_ZINC",
            "UNCOATED_OR_ZINC_COATED"
        ];
        var default_value = "UNCOATED_OR_ZINC_COATED";
    }
	else if (IsCurrentCodeOfStandard("CSA")) {
        var epoxy_factor_types = [
            "EPOXY_COATED",
            "UNCOATED"
        ];
        var default_value = "UNCOATED";
    }
    else {
        ASSERT(false, "SetConcreteDesignMemberEpoxyFactorType - unknown code of standard (" + GetCurrentCodeOfStandard() + ")");
    }
	if (epoxy_factor_type !== undefined) {
	  if (epoxy_factor_types.indexOf(epoxy_factor_type) === -1)
      {
        console.log("Wrong epoxy factor type. Value was: " + epoxy_factor_type);
		console.log("Correct values are: " + epoxy_factor_types);
		return;
      }
	}
	else {
        epoxy_factor_type = default_value;
	}
    switch (epoxy_factor_type) {
        case "EPOXY_COATED_OR_ZINC":
            addon_settings.property_epoxy_coated_or_zinc_and_epoxy_dual_coated_reinforcement = true;
            break;
        case "UNCOATED_OR_ZINC_COATED":
            addon_settings.property_uncoated_or_zinc_coated_galvanized_reinforcement = true;
            break;
        case "EPOXY_COATED":
            addon_settings.property_epoxy_coated_reinforcement = true;
            break;
        case "UNCOATED":
            addon_settings.property_uncoated_reinforcement = true;
            break;
        default:
            ASSERT(false, "SetConcreteDesignMemberEpoxyFactorType - unknown epoxy factor type");
    }
}

function SetConcreteDesignStabilityUnbracedColumn (addon_settings,
    property_stability_index_qy,
    property_stability_index_qz) {
    ASSERT(members.count() > 0, "There must exist at least one member in project");
    if (typeof property_stability_index_qy !== "undefined") {
        addon_settings.property_stability_index_qy = property_stability_index_qy;
    }
    if (typeof property_stability_index_qz !== "undefined") {
        addon_settings.property_stability_index_qz = property_stability_index_qz;
    }
}