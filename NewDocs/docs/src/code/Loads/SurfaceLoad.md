---
title: SurfaceLoad
---

# SurfaceLoad

<a name="SurfaceLoad"></a>

## SurfaceLoad
**Kind**: global class  

* [SurfaceLoad](#SurfaceLoad)
    * [new SurfaceLoad(no, load_case, surfaces, comment, params)](#new_SurfaceLoad_new)
    * [.Force(no, load_case, surfaces, load_distribution, load_values, load_direction, comment, params)](#SurfaceLoad+Force) ⇒ <code>Object</code>
    * [.Temperature(no, load_case, surfaces, load_distribution, load_values, comment, params)](#SurfaceLoad+Temperature) ⇒ <code>Object</code>
    * [.AxialStrain(no, load_case, surfaces, load_distribution, load_values, comment, params)](#SurfaceLoad+AxialStrain) ⇒ <code>Object</code>
    * [.Precamber(no, load_case, surfaces, load_value, comment, params)](#SurfaceLoad+Precamber) ⇒ <code>Object</code>
    * [.RotaryMotion(no, load_case, surfaces, load_values, comment, params)](#SurfaceLoad+RotaryMotion) ⇒ <code>Object</code>
    * [.Mass(no, load_case, surfaces, load_value, comment, params)](#SurfaceLoad+Mass) ⇒ <code>Object</code>
    * [.IndividualMassComponents(MX, MY, MZ)](#SurfaceLoad+IndividualMassComponents)

<a name="new_SurfaceLoad_new"></a>

### new SurfaceLoad(no, load_case, surfaces, comment, params)
Creates surface load

**Returns**: <code>Object</code> - Created surface load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+Force"></a>

### surfaceLoad.Force(no, load_case, surfaces, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates surface force load

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  
**Returns**: <code>Object</code> - Created surface force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+Temperature"></a>

### surfaceLoad.Temperature(no, load_case, surfaces, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates surface temperature load

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  
**Returns**: <code>Object</code> - Created surface temperature load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+AxialStrain"></a>

### surfaceLoad.AxialStrain(no, load_case, surfaces, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates surface axial strain load

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  
**Returns**: <code>Object</code> - Created surface axial strain load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+Precamber"></a>

### surfaceLoad.Precamber(no, load_case, surfaces, load_value, comment, params) ⇒ <code>Object</code>
Creates surface precamber load

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  
**Returns**: <code>Object</code> - Created surface precamber load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+RotaryMotion"></a>

### surfaceLoad.RotaryMotion(no, load_case, surfaces, load_values, comment, params) ⇒ <code>Object</code>
Creates surface rotary motion load

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  
**Returns**: <code>Object</code> - Created surface rotary motion load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+Mass"></a>

### surfaceLoad.Mass(no, load_case, surfaces, load_value, comment, params) ⇒ <code>Object</code>
Creates surface mass load

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  
**Returns**: <code>Object</code> - Created surface mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SurfaceLoad+IndividualMassComponents"></a>

### surfaceLoad.IndividualMassComponents(MX, MY, MZ)
Sets individual mass components (only for mass load)

**Kind**: instance method of [<code>SurfaceLoad</code>](#SurfaceLoad)  

| Param | Type | Description |
| --- | --- | --- |
| MX | <code>Number</code> | Mass in X coordination, can be undefined |
| MY | <code>Number</code> | Mass in Y coordination, can be undefined |
| MZ | <code>Number</code> | Mass in Z coordination, can be undefined |

