---
title: SurfaceSet
---

# SurfaceSet

<a name="SurfaceSet"></a>

## SurfaceSet
**Kind**: global class  

* [SurfaceSet](#SurfaceSet)
    * [new SurfaceSet(no, surfaces, surface_set_type, comment, params)](#new_SurfaceSet_new)
    * [.GetSurfaceSet()](#SurfaceSet+GetSurfaceSet) ⇒
    * [.GetNo()](#SurfaceSet+GetNo) ⇒
    * [.ContinuousSurfaces(no, surfaces, comment, params)](#SurfaceSet+ContinuousSurfaces)
    * [.GroupOfSurfaces(no, surfaces, comment, params)](#SurfaceSet+GroupOfSurfaces)

<a name="new_SurfaceSet_new"></a>

### new SurfaceSet(no, surfaces, surface_set_type, comment, params)
Create Surface Set

**Returns**: surfaceSet  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Surface Set |
| surfaces | <code>array</code> | List of surfaces |
| surface_set_type | <code>string</code> | Surface Set type |
| comment | <code>string</code> | Comment for the Surface Set |
| params | <code>dictionary</code> | Parameters of the Surface Set |

<a name="SurfaceSet+GetSurfaceSet"></a>

### surfaceSet.GetSurfaceSet() ⇒
**Kind**: instance method of [<code>SurfaceSet</code>](#SurfaceSet)  
**Returns**: Surface set object  
<a name="SurfaceSet+GetNo"></a>

### surfaceSet.GetNo() ⇒
**Kind**: instance method of [<code>SurfaceSet</code>](#SurfaceSet)  
**Returns**: Surface set number  
<a name="SurfaceSet+ContinuousSurfaces"></a>

### surfaceSet.ContinuousSurfaces(no, surfaces, comment, params)
Create Continuous Surfaces surfaceSet type

**Kind**: instance method of [<code>SurfaceSet</code>](#SurfaceSet)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Surface Set |
| surfaces | <code>array</code> | List of surfaces |
| comment | <code>string</code> | Comment for the Surface Set |
| params | <code>dictionary</code> | Parameters of the Surface Set |

<a name="SurfaceSet+GroupOfSurfaces"></a>

### surfaceSet.GroupOfSurfaces(no, surfaces, comment, params)
Create Group of Surfaces

**Kind**: instance method of [<code>SurfaceSet</code>](#SurfaceSet)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Surface Set |
| surfaces | <code>array</code> | List of surfaces |
| comment | <code>string</code> | Comment for the Surface Set |
| params | <code>dictionary</code> | Parameters of the Surface Set |

