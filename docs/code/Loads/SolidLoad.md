---
title: SolidLoad
---

# SolidLoad

<a name="SolidLoad"></a>

## SolidLoad
**Kind**: global class  

* [SolidLoad](#SolidLoad)
    * [new SolidLoad(no, load_case, solids, comment, params)](#new_SolidLoad_new)
    * [.Force(no, load_case, solids, load_value, load_direction, comment, params)](#SolidLoad+Force) ⇒ <code>Object</code>
    * [.Temperature(no, load_case, solids, load_distribution, load_values, comment, params)](#SolidLoad+Temperature) ⇒ <code>Object</code>
    * [.Strain(no, load_case, solids, load_distribution, load_values, comment, params)](#SolidLoad+Strain) ⇒ <code>Object</code>
    * [.Buoyancy(no, load_case, solids, load_value, load_direction, comment, params)](#SolidLoad+Buoyancy) ⇒ <code>Object</code>
    * [.RotaryMotion(no, load_case, solids, load_values, comment, params)](#SolidLoad+RotaryMotion) ⇒ <code>Object</code>
    * [.AirDensity(altitude)](#SolidLoad+AirDensity)

<a name="new_SolidLoad_new"></a>

### new SolidLoad(no, load_case, solids, comment, params)
Creates solid load

**Returns**: <code>Object</code> - Created solid load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solids | <code>Array</code> | List of solid indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidLoad+Force"></a>

### solidLoad.Force(no, load_case, solids, load_value, load_direction, comment, params) ⇒ <code>Object</code>
Creates solid force load

**Kind**: instance method of [<code>SolidLoad</code>](#SolidLoad)  
**Returns**: <code>Object</code> - Created solid force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solids | <code>Array</code> | List of solid indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidLoad+Temperature"></a>

### solidLoad.Temperature(no, load_case, solids, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates solid temperature load

**Kind**: instance method of [<code>SolidLoad</code>](#SolidLoad)  
**Returns**: <code>Object</code> - Created solid temperature load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solids | <code>Array</code> | List of solid indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidLoad+Strain"></a>

### solidLoad.Strain(no, load_case, solids, load_distribution, load_values, comment, params) ⇒ <code>Object</code>
Creates solid strain load

**Kind**: instance method of [<code>SolidLoad</code>](#SolidLoad)  
**Returns**: <code>Object</code> - Created solid strain load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solids | <code>Array</code> | List of solid indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidLoad+Buoyancy"></a>

### solidLoad.Buoyancy(no, load_case, solids, load_value, load_direction, comment, params) ⇒ <code>Object</code>
Creates solid buoyancy load

**Kind**: instance method of [<code>SolidLoad</code>](#SolidLoad)  
**Returns**: <code>Object</code> - Created solid buoyancy load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solids | <code>Array</code> | List of solid indexes |
| load_value | <code>Array</code> | Uniform load parameter |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidLoad+RotaryMotion"></a>

### solidLoad.RotaryMotion(no, load_case, solids, load_values, comment, params) ⇒ <code>Object</code>
Creates solid rotary motion load

**Kind**: instance method of [<code>SolidLoad</code>](#SolidLoad)  
**Returns**: <code>Object</code> - Created solid rotary motion load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of solid load, can be undefined |
| load_case | <code>Object</code> | Load case |
| solids | <code>Array</code> | List of solid indexes |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setSolidLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="SolidLoad+AirDensity"></a>

### solidLoad.AirDensity(altitude)
Determine air density at specified altitude

**Kind**: instance method of [<code>SolidLoad</code>](#SolidLoad)  

| Param | Type | Description |
| --- | --- | --- |
| altitude | <code>Number</code> | Altitude value, if undefined, determine air density at specified altitude will be set false |

