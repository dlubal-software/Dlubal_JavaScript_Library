---
title: FreeLineLoad
---

# FreeLineLoad

## Classes

<dl>
<dt><a href="#FreeLineLoad">FreeLineLoad</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setFreeLineLoadParameters">setFreeLineLoadParameters(load, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Set parameters to free line load depend on load distribution</p>
</dd>
</dl>

<a name="FreeLineLoad"></a>

## FreeLineLoad
**Kind**: global class  

* [FreeLineLoad](#FreeLineLoad)
    * [new FreeLineLoad(no, load_case, surfaces, comment, params)](#new_FreeLineLoad_new)
    * [.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeLineLoad+Uniform) ⇒ <code>Object</code>
    * [.Linear(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeLineLoad+Linear) ⇒ <code>Object</code>

<a name="new_FreeLineLoad_new"></a>

### new FreeLineLoad(no, load_case, surfaces, comment, params)
Creates free line load

**Returns**: <code>Object</code> - Created free line load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free line load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeLineLoad+Uniform"></a>

### freeLineLoad.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free line uniform load

**Kind**: instance method of [<code>FreeLineLoad</code>](#FreeLineLoad)  
**Returns**: <code>Object</code> - Created free line uniform load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free line uniform load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeLineLoad+Linear"></a>

### freeLineLoad.Linear(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free line linear load

**Kind**: instance method of [<code>FreeLineLoad</code>](#FreeLineLoad)  
**Returns**: <code>Object</code> - Created free line linear load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free line linear load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="setFreeLineLoadParameters"></a>

## setFreeLineLoadParameters(load, load_distribution, load_values) ⇒ <code>Object</code>
Set parameters to free line load depend on load distribution

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend of load distribution 												- "Force": [p, X1, Y1, X2, Y2] 												- "Linear": [p1, p2, X1, Y1, X2, Y2] |

