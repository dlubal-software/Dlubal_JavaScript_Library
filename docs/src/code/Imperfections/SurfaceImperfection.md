---
title: SurfaceImperfection
---

# SurfaceImperfection

<a name="SurfaceImperfection"></a>

## SurfaceImperfection(no, imperfection_case_no, surfaces_no, comment, params) ⇒
Creates default Surface imperfection

**Kind**: global function  
**Returns**: Surface imperfection  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Surface imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| surfaces_no | <code>Array</code> | Array of surfaces numbers |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>String</code> | Parameters, can be undefined |


* [SurfaceImperfection(no, imperfection_case_no, surfaces_no, comment, params)](#SurfaceImperfection) ⇒
    * [.Relative(no, imperfection_case_no, surfaces_no, reference_length, initial_bow_relative, imperfection_direction, comment, params)](#SurfaceImperfection+Relative)
    * [.Absolute(no, imperfection_case_no, surfaces_no, initial_bow, imperfection_direction, comment, params)](#SurfaceImperfection+Absolute)
    * [.GetSurfaceImperfection()](#SurfaceImperfection+GetSurfaceImperfection) ⇒
    * [.GetNo()](#SurfaceImperfection+GetNo) ⇒

<a name="SurfaceImperfection+Relative"></a>

### surfaceImperfection.Relative(no, imperfection_case_no, surfaces_no, reference_length, initial_bow_relative, imperfection_direction, comment, params)
Creates relative Surface imperfection

**Kind**: instance method of [<code>SurfaceImperfection</code>](#SurfaceImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Surface imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| surfaces_no | <code>Array</code> | Array of surfaces numbers |
| reference_length | <code>Number</code> | Reference length |
| initial_bow_relative | <code>Number</code> | Relative initial bow, can be undefined (200 as default) |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined ("LOCAL_Z" as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>String</code> | Parameters, can be undefined |

<a name="SurfaceImperfection+Absolute"></a>

### surfaceImperfection.Absolute(no, imperfection_case_no, surfaces_no, initial_bow, imperfection_direction, comment, params)
Creates absolute Surface imperfection

**Kind**: instance method of [<code>SurfaceImperfection</code>](#SurfaceImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Surface imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| surfaces_no | <code>Array</code> | Array of surfaces numbers |
| initial_bow | <code>Number</code> | Absolute initial bow, can be undefined (100 as default) |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined ("LOCAL_Z" as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>String</code> | Parameters, can be undefined |

<a name="SurfaceImperfection+GetSurfaceImperfection"></a>

### surfaceImperfection.GetSurfaceImperfection() ⇒
**Kind**: instance method of [<code>SurfaceImperfection</code>](#SurfaceImperfection)  
**Returns**: Surface imperfection object  
<a name="SurfaceImperfection+GetNo"></a>

### surfaceImperfection.GetNo() ⇒
**Kind**: instance method of [<code>SurfaceImperfection</code>](#SurfaceImperfection)  
**Returns**: Surface imperfection number  
