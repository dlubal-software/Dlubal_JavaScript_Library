---
title: FreeCircularLoad
---

# FreeCircularLoad

## Classes

<dl>
<dt><a href="#FreeCircularLoad">FreeCircularLoad</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setFreeCircularLoadParameters">setFreeCircularLoadParameters(load, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Set parameters to free circular load depend on load distribution</p>
</dd>
</dl>

<a name="FreeCircularLoad"></a>

## FreeCircularLoad
**Kind**: global class  

* [FreeCircularLoad](#FreeCircularLoad)
    * [new FreeCircularLoad(no, load_case, surfaces, comment, params)](#new_FreeCircularLoad_new)
    * [.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeCircularLoad+Uniform) ⇒ <code>Object</code>
    * [.Linear(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeCircularLoad+Linear) ⇒ <code>Object</code>

<a name="new_FreeCircularLoad_new"></a>

### new FreeCircularLoad(no, load_case, surfaces, comment, params)
Creates free circular load

**Returns**: <code>Object</code> - Created free circular load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free circular load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeCircularLoad+Uniform"></a>

### freeCircularLoad.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free circular uniform load

**Kind**: instance method of [<code>FreeCircularLoad</code>](#FreeCircularLoad)  
**Returns**: <code>Object</code> - Created free circular uniform load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free circular uniform load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeCircularLoad+Linear"></a>

### freeCircularLoad.Linear(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free circular linear load

**Kind**: instance method of [<code>FreeCircularLoad</code>](#FreeCircularLoad)  
**Returns**: <code>Object</code> - Created free linear uniform load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free circular linear load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="setFreeCircularLoadParameters"></a>

## setFreeCircularLoadParameters(load, load_distribution, load_values) ⇒ <code>Object</code>
Set parameters to free circular load depend on load distribution

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend of load distribution 											- "Uniform": [p, R, CX, CY] 											- "Linear": [pC, R, pR, CX, CY] |

