---
title: SurfaceMeshRefinement
---

# SurfaceMeshRefinement

## Classes

<dl>
<dt><a href="#SurfaceMeshRefinement">SurfaceMeshRefinement</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createSurfaceMeshRefinement">createSurfaceMeshRefinement(no, surface_list, comment, params)</a> ⇒</dt>
<dd><p>Creates surface mesh refinement (private)</p>
</dd>
</dl>

<a name="SurfaceMeshRefinement"></a>

## SurfaceMeshRefinement
**Kind**: global class  
<a name="new_SurfaceMeshRefinement_new"></a>

### new SurfaceMeshRefinement(no, surface_list, target_length, comment, params)
Creates surface mesh refinement

**Returns**: Created surface mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface mesh refinement, can be undefined |
| surface_list | <code>Array</code> | List of surface indexes, can be undefined |
| target_length | <code>Number</code> | Target FE length, can be undefined (0.05 m by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface stiffness modification's parameters, can be undefined |

<a name="createSurfaceMeshRefinement"></a>

## createSurfaceMeshRefinement(no, surface_list, comment, params) ⇒
Creates surface mesh refinement (private)

**Kind**: global function  
**Returns**: Created surface mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface stiffness modification, can be undefined |
| surface_list | <code>Array</code> | List of surface indexes, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface stiffness modification's parameters, can be undefined |

