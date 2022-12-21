---
title: FreeConcentratedLoad
---

# FreeConcentratedLoad

## Classes

<dl>
<dt><a href="#FreeConcentratedLoad">FreeConcentratedLoad</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setFreeConcentratedLoadParameters">setFreeConcentratedLoadParameters(load, load_type, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Set parameters to free concentrated load depend on load type</p>
</dd>
</dl>

<a name="FreeConcentratedLoad"></a>

## FreeConcentratedLoad
**Kind**: global class  

* [FreeConcentratedLoad](#FreeConcentratedLoad)
    * [new FreeConcentratedLoad(no, load_case, surfaces, comment, params)](#new_FreeConcentratedLoad_new)
    * [.Force(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeConcentratedLoad+Force) ⇒ <code>Object</code>
    * [.Moment(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeConcentratedLoad+Moment) ⇒ <code>Object</code>

<a name="new_FreeConcentratedLoad_new"></a>

### new FreeConcentratedLoad(no, load_case, surfaces, comment, params)
Creates free concentrated load

**Returns**: <code>Object</code> - Created free concentrated load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free concentrated load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeConcentratedLoad+Force"></a>

### freeConcentratedLoad.Force(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free concentrated force load

**Kind**: instance method of [<code>FreeConcentratedLoad</code>](#FreeConcentratedLoad)  
**Returns**: <code>Object</code> - Created free concentrated force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free concentrated force load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeConcentratedLoad+Moment"></a>

### freeConcentratedLoad.Moment(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free concentrated moment load

**Kind**: instance method of [<code>FreeConcentratedLoad</code>](#FreeConcentratedLoad)  
**Returns**: <code>Object</code> - Created free concentrated moment load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free concentrated moment load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="setFreeConcentratedLoadParameters"></a>

## setFreeConcentratedLoadParameters(load, load_type, load_values) ⇒ <code>Object</code>
Set parameters to free concentrated load depend on load type

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_type | <code>String</code> | Load type |
| load_values | <code>Array</code> | Load parameters depend of load type 											- "Force": [p, X, Y] 											- "Moment": [M, X, Y] |

