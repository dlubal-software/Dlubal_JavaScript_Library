---
title: FreePolygonLoad
---

# FreePolygonLoad

## Classes

<dl>
<dt><a href="#FreePolygonLoad">FreePolygonLoad</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setFreePolygonLoadParameters">setFreePolygonLoadParameters(load, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Set parameters to free polygon load depend on load distribution</p>
</dd>
</dl>

<a name="FreePolygonLoad"></a>

## FreePolygonLoad
**Kind**: global class  

* [FreePolygonLoad](#FreePolygonLoad)
    * [new FreePolygonLoad(no, load_case, surfaces, comment, params)](#new_FreePolygonLoad_new)
    * [.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreePolygonLoad+Uniform) ⇒ <code>Object</code>
    * [.Linear(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreePolygonLoad+Linear) ⇒ <code>Object</code>
    * [.LinearX(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreePolygonLoad+LinearX) ⇒ <code>Object</code>
    * [.LinearY(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreePolygonLoad+LinearY) ⇒ <code>Object</code>

<a name="new_FreePolygonLoad_new"></a>

### new FreePolygonLoad(no, load_case, surfaces, comment, params)
Creates free polygon load

**Returns**: <code>Object</code> - Created free polygon load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free polygon load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreePolygonLoad+Uniform"></a>

### freePolygonLoad.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free polygon uniform load

**Kind**: instance method of [<code>FreePolygonLoad</code>](#FreePolygonLoad)  
**Returns**: <code>Object</code> - Created free polygon uniform load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free polygon uniform load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreePolygonLoad+Linear"></a>

### freePolygonLoad.Linear(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free polygon linear load

**Kind**: instance method of [<code>FreePolygonLoad</code>](#FreePolygonLoad)  
**Returns**: <code>Object</code> - Created free polygon linear load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free polygon linear load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreePolygonLoad+LinearX"></a>

### freePolygonLoad.LinearX(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free polygon linear in X load

**Kind**: instance method of [<code>FreePolygonLoad</code>](#FreePolygonLoad)  
**Returns**: <code>Object</code> - Created free polygon linear in X load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free polygon linear in X load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreePolygonLoad+LinearY"></a>

### freePolygonLoad.LinearY(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free polygon linear in Y load

**Kind**: instance method of [<code>FreePolygonLoad</code>](#FreePolygonLoad)  
**Returns**: <code>Object</code> - Created free polygon linear in Y load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free polygon linear in Y load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="setFreePolygonLoadParameters"></a>

## setFreePolygonLoadParameters(load, load_distribution, load_values) ⇒ <code>Object</code>
Set parameters to free polygon load depend on load distribution

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend of load distribution 												- "Uniform": [p, X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn] 												- "Linear": [p1, node1, node2, node3, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2, p3] 												- "Linear in X": [p1, node1, node2, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2] 												- "Linear in Y": [p1, node1, node2, [X1, Y1, X2, Y2, X3, Y3 ... Xn, Yn], p2] |

