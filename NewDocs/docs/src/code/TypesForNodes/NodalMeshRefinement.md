---
title: NodalMeshRefinement
---

# NodalMeshRefinement

## Functions

<dl>
<dt><a href="#NodalMeshRefinement">NodalMeshRefinement(no, assigned_nodes, comment, params)</a></dt>
<dd><p>Creates default nodal node refinement</p>
</dd>
<dt><a href="#createNodalMeshRefinement">createNodalMeshRefinement(no, assigned_nodes, comment, params)</a> ⇒</dt>
<dd><p>Creates default nodal node refinement</p>
</dd>
</dl>

<a name="NodalMeshRefinement"></a>

## NodalMeshRefinement(no, assigned_nodes, comment, params)
Creates default nodal node refinement

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of rectangular nodal mesh refinement, can be undefined |
| assigned_nodes | <code>Array</code> | Assigned nodes |
| comment | <code>String</code> | Comment |
| params | <code>Object</code> | Additional parameters |


* [NodalMeshRefinement(no, assigned_nodes, comment, params)](#NodalMeshRefinement)
    * [.Circular(no, assigned_nodes, radius, inner_target_fe_length, outer_target_fe_length, fe_length_arrangement, comment, params)](#NodalMeshRefinement+Circular)
    * [.Rectangular(no, assigned_nodes, side_length, inner_target_fe_length, comment, params)](#NodalMeshRefinement+Rectangular)
    * [.ApplyToSurfaces(indexes)](#NodalMeshRefinement+ApplyToSurfaces)

<a name="NodalMeshRefinement+Circular"></a>

### nodalMeshRefinement.Circular(no, assigned_nodes, radius, inner_target_fe_length, outer_target_fe_length, fe_length_arrangement, comment, params)
Creates circular nodal mesh refinement

**Kind**: instance method of [<code>NodalMeshRefinement</code>](#NodalMeshRefinement)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of circular nodal mesh refinement, can be undefined |
| assigned_nodes | <code>Array</code> | Assigned nodes |
| radius | <code>Number</code> | Circular radius, can be undefined (2.5 m by default) |
| inner_target_fe_length | <code>Number</code> | Inner target FE length, can be undefined (0.1 m by default) |
| outer_target_fe_length | <code>Number</code> | Outer target FE length, can be undefined (0.5 m by default) |
| fe_length_arrangement | <code>String</code> | FE length arrangement ("Radial", "Gradually", "Combined"), can be undefined (Radial as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="NodalMeshRefinement+Rectangular"></a>

### nodalMeshRefinement.Rectangular(no, assigned_nodes, side_length, inner_target_fe_length, comment, params)
Creates rectangular nodal mesh refinement

**Kind**: instance method of [<code>NodalMeshRefinement</code>](#NodalMeshRefinement)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of rectangular nodal mesh refinement, can be undefined |
| assigned_nodes | <code>Array</code> | Assigned nodes |
| side_length | <code>Number</code> | Side length, can be undefined (0.5 m by default) |
| inner_target_fe_length | <code>Number</code> | Inner target FE length, can be undefined (0.1 m by default) |
| comment | <code>String</code> | Comment |
| params | <code>Object</code> | Additional parameters |

<a name="NodalMeshRefinement+ApplyToSurfaces"></a>

### nodalMeshRefinement.ApplyToSurfaces(indexes)
Apply only to selected surfaces

**Kind**: instance method of [<code>NodalMeshRefinement</code>](#NodalMeshRefinement)  

| Param | Type | Description |
| --- | --- | --- |
| indexes | <code>Array</code> | Apply only on surfaces with indexes, can be undefined (no surfaces are selected) |

<a name="createNodalMeshRefinement"></a>

## createNodalMeshRefinement(no, assigned_nodes, comment, params) ⇒
Creates default nodal node refinement

**Kind**: global function  
**Returns**: Created default nodal mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of rectangular nodal mesh refinement, can be undefined |
| assigned_nodes | <code>Array</code> | Assigned nodes |
| comment | <code>String</code> | Comment |
| params | <code>Object</code> | Additional parameters |

