---
title: SurfaceSetImperfection
---

# SurfaceSetImperfection

<a name="SurfaceSetImperfection"></a>

## SurfaceSetImperfection(no, imperfection_case_no, surface_sets_no, comment, params) ⇒
Creates default Surface set imperfection

**Kind**: global function  
**Returns**: Surface set imperfection  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Surface set imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| surface_sets_no | <code>Array</code> | Array of surfaces numbers |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>String</code> | Parameters, can be undefined |


* [SurfaceSetImperfection(no, imperfection_case_no, surface_sets_no, comment, params)](#SurfaceSetImperfection) ⇒
    * [.Relative(no, imperfection_case_no, surface_sets_no, reference_length, initial_bow_relative, imperfection_direction, comment, params)](#SurfaceSetImperfection+Relative)
    * [.Absolute(no, imperfection_case_no, surface_sets_no, initial_bow, imperfection_direction, comment, params)](#SurfaceSetImperfection+Absolute)
    * [.GetSurfaceImperfection()](#SurfaceSetImperfection+GetSurfaceImperfection) ⇒
    * [.GetNo()](#SurfaceSetImperfection+GetNo) ⇒

<a name="SurfaceSetImperfection+Relative"></a>

### surfaceSetImperfection.Relative(no, imperfection_case_no, surface_sets_no, reference_length, initial_bow_relative, imperfection_direction, comment, params)
Creates relative Surface set imperfection

**Kind**: instance method of [<code>SurfaceSetImperfection</code>](#SurfaceSetImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Surface set imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| surface_sets_no | <code>Array</code> | Array of surface sets numbers |
| reference_length | <code>Number</code> | Reference length |
| initial_bow_relative | <code>Number</code> | Relative initial bow, can be undefined (200 as default) |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined ("LOCAL_Z" as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>String</code> | Parameters, can be undefined |

<a name="SurfaceSetImperfection+Absolute"></a>

### surfaceSetImperfection.Absolute(no, imperfection_case_no, surface_sets_no, initial_bow, imperfection_direction, comment, params)
Creates absolute Surface set imperfection

**Kind**: instance method of [<code>SurfaceSetImperfection</code>](#SurfaceSetImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Surface set imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| surface_sets_no | <code>Array</code> | Array of surface sets numbers |
| initial_bow | <code>Number</code> | Absolute initial bow, can be undefined (100 as default) |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined ("LOCAL_Z" as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>String</code> | Parameters, can be undefined |

<a name="SurfaceSetImperfection+GetSurfaceImperfection"></a>

### surfaceSetImperfection.GetSurfaceImperfection() ⇒
**Kind**: instance method of [<code>SurfaceSetImperfection</code>](#SurfaceSetImperfection)  
**Returns**: Surface set imperfection object  
<a name="SurfaceSetImperfection+GetNo"></a>

### surfaceSetImperfection.GetNo() ⇒
**Kind**: instance method of [<code>SurfaceSetImperfection</code>](#SurfaceSetImperfection)  
**Returns**: Surface set imperfection number  
