---
title: SurfaceSetLoad
---

# SurfaceSetLoad

<a name="SurfaceSetLoad"></a>

## SurfaceSetLoad
**Kind**: global class  

* [SurfaceSetLoad](#SurfaceSetLoad)
    * [new SurfaceSetLoad(no, load_case, line_sets, comment, params)](#new_SurfaceSetLoad_new)
    * [.Force(no, load_case, surface_sets, load_distribution, load_values, load_direction, comment, params)](#SurfaceSetLoad+Force) ⇒ <code>Object</code>
    * [.Temperature(no, load_case, surface_sets, load_distribution, load_values, comment, params)](#SurfaceSetLoad+Temperature) ⇒ <code>Object</code>
    * [.AxialStrain(no, load_case, surface_sets, load_distribution, load_values, comment, params)](#SurfaceSetLoad+AxialStrain) ⇒ <code>Object</code>
    * [.Precamber(no, load_case, surface_sets, load_value, comment, params)](#SurfaceSetLoad+Precamber) ⇒ <code>Object</code>
    * [.RotaryMotion(no, load_case, surface_sets, load_values, comment, params)](#SurfaceSetLoad+RotaryMotion) ⇒ <code>Object</code>
    * [.Mass(no, load_case, surface_sets, load_value, comment, params)](#SurfaceSetLoad+Mass) ⇒ <code>Object</code>
    * [.IndividualMassComponents(MX, MY, MZ)](#SurfaceSetLoad+IndividualMassComponents)

<a name="new_SurfaceSetLoad_new"></a>

### new SurfaceSetLoad(no, load_case, line_sets, comment, params)
Creates line set load

**Returns**: <code>Object</code> - Created line set load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| line_sets | <code>Array</code> | List of line set indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+Force"></a>

### surfaceSetLoad.Force(no, load_case, surface_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates surface set force load

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  
**Returns**: <code>Object</code> - Created surface set force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surface_sets | <code>Array</code> | List of surface set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+Temperature"></a>

### surfaceSetLoad.Temperature(no, load_case, surface_sets, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates surface set temperature load

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  
**Returns**: <code>Object</code> - Created surface set temperature load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surface_sets | <code>Array</code> | List of surface set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+AxialStrain"></a>

### surfaceSetLoad.AxialStrain(no, load_case, surface_sets, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates surface set axial strain load

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  
**Returns**: <code>Object</code> - Created surface set axial strain load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surface_sets | <code>Array</code> | List of surface set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+Precamber"></a>

### surfaceSetLoad.Precamber(no, load_case, surface_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates surface set precamber load

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  
**Returns**: <code>Object</code> - Created surface set precamber load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surface_sets | <code>Array</code> | List of surface set indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+RotaryMotion"></a>

### surfaceSetLoad.RotaryMotion(no, load_case, surface_sets, load_values, comment, params) ⇒ <code>Object</code>
Creates surface set rotary motion load

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  
**Returns**: <code>Object</code> - Created surface set rotary motion load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surface_sets | <code>Array</code> | List of surface set indexes |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+Mass"></a>

### surfaceSetLoad.Mass(no, load_case, surface_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates surface set mass load

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  
**Returns**: <code>Object</code> - Created surface set mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surface_sets | <code>Array</code> | List of surface set indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceSetLoad+IndividualMassComponents"></a>

### surfaceSetLoad.IndividualMassComponents(MX, MY, MZ)
Sets individual mass components (only for mass load)

**Kind**: instance method of [<code>SurfaceSetLoad</code>](#SurfaceSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| MX | <code>Number</code> | Mass in X coordination, can be undefined |
| MY | <code>Number</code> | Mass in Y coordination, can be undefined |
| MZ | <code>Number</code> | Mass in Z coordination, can be undefined |

