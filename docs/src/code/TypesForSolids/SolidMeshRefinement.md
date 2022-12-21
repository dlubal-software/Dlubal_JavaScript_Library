---
title: SolidMeshRefinement
---

# SolidMeshRefinement

## Classes

<dl>
<dt><a href="#SolidMeshRefinement">SolidMeshRefinement</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createSolidMeshRefinement">createSolidMeshRefinement(no, solid_list, comment, params)</a> ⇒</dt>
<dd><p>Creates solid mesh refinement (private)</p>
</dd>
</dl>

<a name="SolidMeshRefinement"></a>

## SolidMeshRefinement
**Kind**: global class  

* [SolidMeshRefinement](#SolidMeshRefinement)
    * [new SolidMeshRefinement(no, solid_list, comment, params)](#new_SolidMeshRefinement_new)
    * [.TargetLength(no, solid_list, target_length, comment, params)](#SolidMeshRefinement+TargetLength)

<a name="new_SolidMeshRefinement_new"></a>

### new SolidMeshRefinement(no, solid_list, comment, params)
Creates solid mesh refinement

**Returns**: Created solid mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid mesh refinement, can be undefined |
| solid_list | <code>Array</code> | List of solid indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Solid mesh refinement's parameters, can be undefined |

<a name="SolidMeshRefinement+TargetLength"></a>

### solidMeshRefinement.TargetLength(no, solid_list, target_length, comment, params)
Creates solid mesh refinement

**Kind**: instance method of [<code>SolidMeshRefinement</code>](#SolidMeshRefinement)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid mesh refinement, can be undefined |
| solid_list | <code>Array</code> | List of solid indexes |
| target_length | <code>Number</code> | Target FE length |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Solid mesh refinement's parameters, can be undefined |

<a name="createSolidMeshRefinement"></a>

## createSolidMeshRefinement(no, solid_list, comment, params) ⇒
Creates solid mesh refinement (private)

**Kind**: global function  
**Returns**: Created solid mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid mesh refinement, can be undefined |
| solid_list | <code>Array</code> | List of solid indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Solid mesh refinement's parameters, can be undefined |

