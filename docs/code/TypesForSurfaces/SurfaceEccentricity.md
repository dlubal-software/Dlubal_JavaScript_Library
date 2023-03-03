---
title: SurfaceEccentricity
---

# SurfaceEccentricity

## Classes

<dl>
<dt><a href="#SurfaceEccentricity">SurfaceEccentricity</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createSurfaceEccentricity">createSurfaceEccentricity(no, surfaces_list, comment, params)</a> ⇒</dt>
<dd><p>Creates base surface eccentricity</p>
</dd>
<dt><a href="#getAlignment">getAlignment(alignment)</a> ⇒</dt>
<dd><p>Convert string representation of alignment (private)</p>
</dd>
</dl>

<a name="SurfaceEccentricity"></a>

## SurfaceEccentricity
**Kind**: global class  

* [SurfaceEccentricity](#SurfaceEccentricity)
    * [new SurfaceEccentricity(no, surfaces_list, comment, params)](#new_SurfaceEccentricity_new)
    * [.OffsetAndThicknessAssignment(no, surfaces_list, offset, thickness_alignment, comment, params)](#SurfaceEccentricity+OffsetAndThicknessAssignment)
    * [.TransverseOffset(reference_type, reference_no, offset_alignment)](#SurfaceEccentricity+TransverseOffset)

<a name="new_SurfaceEccentricity_new"></a>

### new SurfaceEccentricity(no, surfaces_list, comment, params)
Creates surface eccentricity

**Returns**: Created surface eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface eccentricity, can be undefined |
| surfaces_list | <code>Array</code> | List of surfaces indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface eccentricity's parameters, can be undefined |

<a name="SurfaceEccentricity+OffsetAndThicknessAssignment"></a>

### surfaceEccentricity.OffsetAndThicknessAssignment(no, surfaces_list, offset, thickness_alignment, comment, params)
Sets offset or/and thickness alignment

**Kind**: instance method of [<code>SurfaceEccentricity</code>](#SurfaceEccentricity)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface eccentricity, can be undefined |
| surfaces_list | <code>Array</code> | List of surfaces indexes |
| offset | <code>Number</code> | Absolute ordinate (value has tu be set with this way: for example 20 mm), can be undefined |
| thickness_alignment | <code>String</code> | Thickness assignment (THICKNESS_ALIGNMENT_TOP, THICKNESS_ALIGNMENT_MIDDLE, THICKNESS_ALIGNMENT_BOTTOM), can be undefined (middle as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface eccentricity's parameters, can be undefined |

<a name="SurfaceEccentricity+TransverseOffset"></a>

### surfaceEccentricity.TransverseOffset(reference_type, reference_no, offset_alignment)
Sets transverse offset

**Kind**: instance method of [<code>SurfaceEccentricity</code>](#SurfaceEccentricity)  

| Param | Type | Description |
| --- | --- | --- |
| reference_type | <code>String</code> | Reference object type (REFERENCE_TYPE_MEMBER, REFERENCE_TYPE_SURFACE) |
| reference_no | <code>Number</code> | Member or surface Number |
| offset_alignment | <code>String</code> | Axial offset (TRANSVERSE_OFFSET_TOP, TRANSVERSE_OFFSET_MIDDLE, TRANSVERSE_OFFSET_BOTTOM), can be undefined (middle as default) |

<a name="createSurfaceEccentricity"></a>

## createSurfaceEccentricity(no, surfaces_list, comment, params) ⇒
Creates base surface eccentricity

**Kind**: global function  
**Returns**: Surface eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface eccentricity, can be undefined |
| surfaces_list | <code>Array</code> | List of surfaces indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface eccentricity's parameters, can be undefined |

<a name="getAlignment"></a>

## getAlignment(alignment) ⇒
Convert string representation of alignment (private)

**Kind**: global function  
**Returns**: Surface eccentricity alignment  

| Param | Type | Description |
| --- | --- | --- |
| alignment | <code>String</code> | Surface eccentricity alignment |

