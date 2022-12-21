---
title: StructureModification
---

# StructureModification

## Classes

<dl>
<dt><a href="#StructureModification">StructureModification</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setTableValue">setTableValue(value, table, tableParameter, row, controlParameter, errorString)</a></dt>
<dd><p>Sets table value (private)</p>
</dd>
<dt><a href="#getMembersWithHinges">getMembersWithHinges()</a> ⇒</dt>
<dd><p>Finds all members with hinges (private)</p>
</dd>
<dt><a href="#getLinesWithHinges">getLinesWithHinges()</a> ⇒</dt>
<dd><p>Finds all lines with hinges (private)</p>
</dd>
<dt><a href="#getObjectsWithSupport">getObjectsWithSupport(objects_list)</a> ⇒</dt>
<dd><p>Finds all specified objects with hinges</p>
</dd>
</dl>

<a name="StructureModification"></a>

## StructureModification
**Kind**: global class  

* [StructureModification](#StructureModification)
    * [new StructureModification(no, comment, params)](#new_StructureModification_new)
    * [.Material(material_name, modification_type, factor_for_e_and_g, comment)](#StructureModification+Material)
    * [.Section(section_name, sectional_areas_factor_a, sectional_areas_factor_a_y, sectional_areas_factor_a_z, moment_of_inertia_factor_j, moment_of_inertia_favor_i_y, moment_of_inertia_favor_i_z)](#StructureModification+Section)
    * [.Members(member_stiffness_modification, members, comment)](#StructureModification+Members)
    * [.Surfaces(surface_stiffness_modification, surfaces, comment)](#StructureModification+Surfaces)
    * [.MemberHinges(member_no, member_side, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, rotational_factor_phi_x, rotational_factor_phi_y, rotational_factor_phi_z)](#StructureModification+MemberHinges)
    * [.LineHinges(surface_no, line_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, rotational_factor_phi_x)](#StructureModification+LineHinges)
    * [.NodalSupports(node_no, support_factor_ux, support_factor_uy, support_factor_uz, restraint_factor_phi_x, restraint_factor_phi_y, restraint_factor_phi_z)](#StructureModification+NodalSupports)
    * [.LineSupports(line_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, rotational_factor_phi_x, rotational_factor_phi_y, rotational_factor_phi_z)](#StructureModification+LineSupports)
    * [.MemberSupports(member_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, shear_factor_s_x, shear_factor_s_y, shear_factor_s_z, rotational_factor_phi_x)](#StructureModification+MemberSupports)
    * [.SurfaceSupports(surface_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, shear_factor_v_xz, shear_factor_v_yz)](#StructureModification+SurfaceSupports)
    * [.DeactivateObjects(members_object_selection, surfaces_object_selection, solids_object_selection, support_on_nodes_object_selection, support_on_lines_object_selection, support_on_members_object_selection, support_on_surfaces_object_selection)](#StructureModification+DeactivateObjects)
    * [.ModifyMemberReinforcement(enabled)](#StructureModification+ModifyMemberReinforcement)
    * [.ModifySurfaceReinforcement(enabled)](#StructureModification+ModifySurfaceReinforcement)
    * [.ModifyTimberMember(enabled)](#StructureModification+ModifyTimberMember)
    * [.DisableMaterialNonlinearityModels(disabled)](#StructureModification+DisableMaterialNonlinearityModels)
    * [.DisableTemperatureDependencies(disabled)](#StructureModification+DisableTemperatureDependencies)
    * [.DisableNonlinearitiesLineHinges(disabled)](#StructureModification+DisableNonlinearitiesLineHinges)
    * [.DisableNonlinearitiesMemberTypes(disabled)](#StructureModification+DisableNonlinearitiesMemberTypes)
    * [.DisableNonlinearitiesMemberHinges(disabled)](#StructureModification+DisableNonlinearitiesMemberHinges)
    * [.DisableMemberNonlinearities(disabled)](#StructureModification+DisableMemberNonlinearities)
    * [.DisableNonlinearitiesSurfaceOrSolidContact(disabled)](#StructureModification+DisableNonlinearitiesSurfaceOrSolidContact)
    * [.DisableNonlinearitiesNodalSupports(disabled)](#StructureModification+DisableNonlinearitiesNodalSupports)
    * [.DisableNonlinearitiesLineSupports(disabled)](#StructureModification+DisableNonlinearitiesLineSupports)
    * [.DisableNonlinearitiesMemberSupports(disabled)](#StructureModification+DisableNonlinearitiesMemberSupports)
    * [.DisableNonlinearitiesSurfaceSupports(disabled)](#StructureModification+DisableNonlinearitiesSurfaceSupports)

<a name="new_StructureModification_new"></a>

### new StructureModification(no, comment, params)
Creates member

**Returns**: Created structure modification  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of structure modification, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Structure modification's parameters, can be undefined |

<a name="StructureModification+Material"></a>

### structureModification.Material(material_name, modification_type, factor_for_e_and_g, comment)
Modification of material

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| material_name | <code>String</code> | Name of material |
| modification_type | <code>String</code> | Type of modification ("Multiplier factor", "Division factor"), can be undefined (Multiplier factor as default) |
| factor_for_e_and_g | <code>Number</code> | Factor for E and G, can be undefined (1.00 by default) |
| comment | <code>String</code> | Comment, can be undefined |

<a name="StructureModification+Section"></a>

### structureModification.Section(section_name, sectional_areas_factor_a, sectional_areas_factor_a_y, sectional_areas_factor_a_z, moment_of_inertia_factor_j, moment_of_inertia_favor_i_y, moment_of_inertia_favor_i_z)
Modification of section

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| section_name | <code>String</code> | Name of section |
| sectional_areas_factor_a | <code>Number</code> | Sectional areas factor A, can be undefined (1.00 by default) |
| sectional_areas_factor_a_y | <code>Number</code> | Sectional areas factor Ay, can be undefined (1.00 by default) |
| sectional_areas_factor_a_z | <code>Number</code> | Sectional areas factor Az, can be undefined (1.00 by default) |
| moment_of_inertia_factor_j | <code>Number</code> | Moment of inertia factor J, can be undefined (1.00 by default) |
| moment_of_inertia_favor_i_y | <code>Number</code> | Moment of inertia factor Iy, can be undefined (1.00 by default) |
| moment_of_inertia_favor_i_z | <code>Number</code> | Moment of inertia factor Iz, can be undefined (1.00 by default) |

<a name="StructureModification+Members"></a>

### structureModification.Members(member_stiffness_modification, members, comment)
Modification of members

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| member_stiffness_modification | <code>Object</code> | Member stiffness modification index |
| members | <code>Array</code> | List of members indexes |
| comment | <code>String</code> | Comment, can be undefined, can be undefined |

<a name="StructureModification+Surfaces"></a>

### structureModification.Surfaces(surface_stiffness_modification, surfaces, comment)
Modification of surfaces

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| surface_stiffness_modification | <code>Object</code> | Surface stiffness modification index |
| surfaces | <code>Array</code> | List of surfaces indexes |
| comment | <code>String</code> | Comment, can be undefined |

<a name="StructureModification+MemberHinges"></a>

### structureModification.MemberHinges(member_no, member_side, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, rotational_factor_phi_x, rotational_factor_phi_y, rotational_factor_phi_z)
Modification of member hinges

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| member_no | <code>Number</code> | Member index |
| member_side | <code>String</code> | Member hinge side (start, end) |
| translational_factor_u_x | <code>Number</code> | Translational spring constant Cu,x, can be undefined (1.00 by default) |
| translational_factor_u_y | <code>Number</code> | Translational spring constant Cu,y, can be undefined (1.00 by default) |
| translational_factor_u_z | <code>Number</code> | Translational spring constant Cu,z, can be undefined (1.00 by default) |
| rotational_factor_phi_x | <code>Number</code> | Rotational spring constant Cφ,x, can be undefined (1.00 by default) |
| rotational_factor_phi_y | <code>Number</code> | Rotational spring constant Cφ,y, can be undefined (1.00 by default) |
| rotational_factor_phi_z | <code>Number</code> | Rotational spring constant Cφ,z, can be undefined (1.00 by default) |

<a name="StructureModification+LineHinges"></a>

### structureModification.LineHinges(surface_no, line_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, rotational_factor_phi_x)
MOdification for line hinges

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| surface_no | <code>Number</code> | Surface index |
| line_no | <code>Number</code> | Line index |
| translational_factor_u_x | <code>Number</code> | Translational factor Cu,x, can be undefined (1.00 by default) |
| translational_factor_u_y | <code>Number</code> | Translational factor Cu,y, can be undefined (1.00 by default) |
| translational_factor_u_z | <code>Number</code> | Translational factor Cu,z, can be undefined (1.00 by default) |
| rotational_factor_phi_x | <code>Number</code> | Rotational factor Cφ,x, can be undefined (1.00 by default) |

<a name="StructureModification+NodalSupports"></a>

### structureModification.NodalSupports(node_no, support_factor_ux, support_factor_uy, support_factor_uz, restraint_factor_phi_x, restraint_factor_phi_y, restraint_factor_phi_z)
Modification of nodal supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| node_no | <code>Number</code> | Node index |
| support_factor_ux | <code>Number</code> | Support factor Cu,x, can be undefined (1.00 by default) |
| support_factor_uy | <code>Number</code> | Support factor Cu,y, can be undefined (1.00 by default) |
| support_factor_uz | <code>Number</code> | Support factor Cu,z, can be undefined (1.00 by default) |
| restraint_factor_phi_x | <code>Number</code> | Restraint factor Cφ,x, can be undefined (1.00 by default) |
| restraint_factor_phi_y | <code>Number</code> | Restraint factor Cφ,y, can be undefined (1.00 by default) |
| restraint_factor_phi_z | <code>Number</code> | Restraint factor Cφ,z, can be undefined (1.00 by default) |

<a name="StructureModification+LineSupports"></a>

### structureModification.LineSupports(line_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, rotational_factor_phi_x, rotational_factor_phi_y, rotational_factor_phi_z)
Mofification of line supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| line_no | <code>Number</code> | Line index |
| translational_factor_u_x | <code>Number</code> | Translational factor Cu,x, can be undefined (1.00 by default) |
| translational_factor_u_y | <code>Number</code> | Translational factor Cu,y, can be undefined (1.00 by default) |
| translational_factor_u_z | <code>Number</code> | Transational factor Cu,z, can be undefined (1.00 by default) |
| rotational_factor_phi_x | <code>Number</code> | Rotational factor Cφ,x, can be undefined (1.00 by default) |
| rotational_factor_phi_y | <code>Number</code> | Rotational factor Cφ,z, can be undefined (1.00 by default) |
| rotational_factor_phi_z | <code>Number</code> | Rotational factor Cφ,z, can be undefined (1.00 by default) |

<a name="StructureModification+MemberSupports"></a>

### structureModification.MemberSupports(member_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, shear_factor_s_x, shear_factor_s_y, shear_factor_s_z, rotational_factor_phi_x)
Modification of member supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| member_no | <code>Number</code> | Member index |
| translational_factor_u_x | <code>Number</code> | Translational factor Cu,x, can be undefined (1.00 by default) |
| translational_factor_u_y | <code>Number</code> | Translational factor Cu,y, can be undefined (1.00 by default) |
| translational_factor_u_z | <code>Number</code> | Translational factor Cu,z, can be undefined (1.00 by default) |
| shear_factor_s_x | <code>Number</code> | Shear factor Cs,x, can be undefined (1.00 by default) |
| shear_factor_s_y | <code>Number</code> | Shear factor Cs,y, can be undefined (1.00 by default) |
| shear_factor_s_z | <code>Number</code> | Shear factor Cs,z, can be undefined (1.00 by default) |
| rotational_factor_phi_x | <code>Number</code> | Rotational factor Cφ,x, can be undefined (1.00 by default) |

<a name="StructureModification+SurfaceSupports"></a>

### structureModification.SurfaceSupports(surface_no, translational_factor_u_x, translational_factor_u_y, translational_factor_u_z, shear_factor_v_xz, shear_factor_v_yz)
Modification of surface supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| surface_no | <code>Number</code> | Surface index |
| translational_factor_u_x | <code>Number</code> | Translational factor Cu,x, can be undefined (1.00 by default) |
| translational_factor_u_y | <code>Number</code> | Translational factor Cu,y, can be undefined (1.00 by default) |
| translational_factor_u_z | <code>Number</code> | Translational factor Cu,z, can be undefined (1.00 by default) |
| shear_factor_v_xz | <code>Number</code> | Shear factor Cv,xz, can be undefined (1.00 by default) |
| shear_factor_v_yz | <code>Number</code> | Shear factor Cv,yz, can be undefined (1.00 by default) |

<a name="StructureModification+DeactivateObjects"></a>

### structureModification.DeactivateObjects(members_object_selection, surfaces_object_selection, solids_object_selection, support_on_nodes_object_selection, support_on_lines_object_selection, support_on_members_object_selection, support_on_surfaces_object_selection)
Deactivation of objects

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| members_object_selection | <code>Object</code> | Object selection with deactivated members, can be undefined  (1.00 by default) |
| surfaces_object_selection | <code>Object</code> | Object selection with deactivated surfaces, can be undefined  (1.00 by default) |
| solids_object_selection | <code>Object</code> | Object selection with deactivated solids, can be undefined  (1.00 by default) |
| support_on_nodes_object_selection | <code>Object</code> | Object selection with deactivated nodal's supports, can be undefined  (1.00 by default) |
| support_on_lines_object_selection | <code>Object</code> | Object selection with deactivated line's supports, can be undefined  (1.00 by default) |
| support_on_members_object_selection | <code>Object</code> | Object selection with deactivated member's supports, can be undefined  (1.00 by default) |
| support_on_surfaces_object_selection | <code>Object</code> | Object selection with deactivated surfaces's supports, can be undefined  (1.00 by default) |

<a name="StructureModification+ModifyMemberReinforcement"></a>

### structureModification.ModifyMemberReinforcement(enabled)
Sets member concrete reinforcement

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Enabled, true if undefined |

<a name="StructureModification+ModifySurfaceReinforcement"></a>

### structureModification.ModifySurfaceReinforcement(enabled)
Sets surface concrete reinforcement

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Enabled, true if undefined |

<a name="StructureModification+ModifyTimberMember"></a>

### structureModification.ModifyTimberMember(enabled)
Sets timber members due to moisture class

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Enabled, true if undefined |

<a name="StructureModification+DisableMaterialNonlinearityModels"></a>

### structureModification.DisableMaterialNonlinearityModels(disabled)
Deactivates material nonlinearity models

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableTemperatureDependencies"></a>

### structureModification.DisableTemperatureDependencies(disabled)
Deactivates temperature dependencies

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesLineHinges"></a>

### structureModification.DisableNonlinearitiesLineHinges(disabled)
Deactivates line nonlinearities - line hinges

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesMemberTypes"></a>

### structureModification.DisableNonlinearitiesMemberTypes(disabled)
Deactivates member nonlinearities - member types

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesMemberHinges"></a>

### structureModification.DisableNonlinearitiesMemberHinges(disabled)
Deactivates member nonlinearities - member hinges

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableMemberNonlinearities"></a>

### structureModification.DisableMemberNonlinearities(disabled)
Deactivates member nonlinearities

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesSurfaceOrSolidContact"></a>

### structureModification.DisableNonlinearitiesSurfaceOrSolidContact(disabled)
Deactivates contact nonlinearities - surface contact, solid types "Contact"

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesNodalSupports"></a>

### structureModification.DisableNonlinearitiesNodalSupports(disabled)
Deactivates support nonlinearities - nodal supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesLineSupports"></a>

### structureModification.DisableNonlinearitiesLineSupports(disabled)
Deactivates support nonlinearities - line supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesMemberSupports"></a>

### structureModification.DisableNonlinearitiesMemberSupports(disabled)
Deactivates support nonlinearities - member supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="StructureModification+DisableNonlinearitiesSurfaceSupports"></a>

### structureModification.DisableNonlinearitiesSurfaceSupports(disabled)
Deactivates support nonlinearities - surface supports

**Kind**: instance method of [<code>StructureModification</code>](#StructureModification)  

| Param | Type | Description |
| --- | --- | --- |
| disabled | <code>Boolean</code> | Disabled, true if undefined |

<a name="setTableValue"></a>

## setTableValue(value, table, tableParameter, row, controlParameter, errorString)
Sets table value (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | Value to set |
| table | <code>String</code> | Table to set |
| tableParameter | <code>String</code> | Table parameter with value to set |
| row | <code>Number</code> | Row with parameter and its value |
| controlParameter | <code>Number</code> | Control parameter to check, if value can be set |
| errorString | <code>Number</code> | Error message in case the value cannot be set |

<a name="getMembersWithHinges"></a>

## getMembersWithHinges() ⇒
Finds all members with hinges (private)

**Kind**: global function  
**Returns**: List with array (member index, member side, member hinge)  
<a name="getLinesWithHinges"></a>

## getLinesWithHinges() ⇒
Finds all lines with hinges (private)

**Kind**: global function  
**Returns**: List with array (surface index, line index, line hinge)  
<a name="getObjectsWithSupport"></a>

## getObjectsWithSupport(objects_list) ⇒
Finds all specified objects with hinges

**Kind**: global function  
**Returns**: List with array (object's index, support)  

| Param | Type | Description |
| --- | --- | --- |
| objects_list | <code>Object</code> | Object's container |

