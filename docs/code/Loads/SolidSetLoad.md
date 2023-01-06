---
title: SolidSetLoad
---

# SolidSetLoad

<a name="SolidSetLoad"></a>

## SolidSetLoad
**Kind**: global class  

* [SolidSetLoad](#SolidSetLoad)
    * [new SolidSetLoad(no, load_case, solid_sets, comment, params)](#new_SolidSetLoad_new)
    * [.Force(no, load_case, solid_sets, load_value, load_direction, comment, params)](#SolidSetLoad+Force) ⇒ <code>Object</code>
    * [.Temperature(no, load_case, solid_sets, load_distribution, load_values, comment, params)](#SolidSetLoad+Temperature) ⇒ <code>Object</code>
    * [.Strain(no, load_case, solid_sets, load_distribution, load_values, comment, params)](#SolidSetLoad+Strain) ⇒ <code>Object</code>
    * [.Buoyancy(no, load_case, solid_sets, load_value, load_direction, comment, params)](#SolidSetLoad+Buoyancy) ⇒ <code>Object</code>
    * [.RotaryMotion(no, load_case, solid_sets, load_values, comment, params)](#SolidSetLoad+RotaryMotion) ⇒ <code>Object</code>
    * [.AirDensity(altitude)](#SolidSetLoad+AirDensity)

<a name="new_SolidSetLoad_new"></a>

### new SolidSetLoad(no, load_case, solid_sets, comment, params)
Creates solid set load

**Returns**: <code>Object</code> - Created solid set load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solid_sets | <code>Array</code> | List of solid set indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidSetLoad+Force"></a>

### solidSetLoad.Force(no, load_case, solid_sets, load_value, load_direction, comment, params) ⇒ <code>Object</code>
Creates solid set force load

**Kind**: instance method of [<code>SolidSetLoad</code>](#SolidSetLoad)  
**Returns**: <code>Object</code> - Created solid set force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solid_sets | <code>Array</code> | List of solid set indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidSetLoad+Temperature"></a>

### solidSetLoad.Temperature(no, load_case, solid_sets, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates solid set temperature load

**Kind**: instance method of [<code>SolidSetLoad</code>](#SolidSetLoad)  
**Returns**: <code>Object</code> - Created solid set temperature load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solid_sets | <code>Array</code> | List of solid set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidSetLoad+Strain"></a>

### solidSetLoad.Strain(no, load_case, solid_sets, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates solid set strain load

**Kind**: instance method of [<code>SolidSetLoad</code>](#SolidSetLoad)  
**Returns**: <code>Object</code> - Created solid set strain load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solid_sets | <code>Array</code> | List of solid set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidSetLoad+Buoyancy"></a>

### solidSetLoad.Buoyancy(no, load_case, solid_sets, load_value, load_direction, comment, params) ⇒ <code>Object</code>
Creates solid set buoyancy load

**Kind**: instance method of [<code>SolidSetLoad</code>](#SolidSetLoad)  
**Returns**: <code>Object</code> - Created solid set buoyancy load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solid_sets | <code>Array</code> | List of solid set indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidSetLoad+RotaryMotion"></a>

### solidSetLoad.RotaryMotion(no, load_case, solid_sets, load_values, comment, params) ⇒ <code>Object</code>
Creates solid set rotary motion load

**Kind**: instance method of [<code>SolidSetLoad</code>](#SolidSetLoad)  
**Returns**: <code>Object</code> - Created solid set rotary motion load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solid_sets | <code>Array</code> | List of solid set indexes |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidSetLoad+AirDensity"></a>

### solidSetLoad.AirDensity(altitude)
Determine air density at specified altitude

**Kind**: instance method of [<code>SolidSetLoad</code>](#SolidSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| altitude | <code>Number</code> | Altitude value, if undefined, determine air density at specified altitude will be set false |

