---
title: OpeningLoad
---

# OpeningLoad

## Classes

<dl>
<dt><a href="#OpeningLoad">OpeningLoad</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setLoadDistribution">setLoadDistribution(load_type, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Assignes values to load depend of load type and load distribution (private)</p>
</dd>
</dl>

<a name="OpeningLoad"></a>

## OpeningLoad
**Kind**: global class  

* [OpeningLoad](#OpeningLoad)
    * [new OpeningLoad(no, load_case, openings, comment, params)](#new_OpeningLoad_new)
    * [.Force(no, load_case, openings, load_distribution, load_values, load_direction, comment, params)](#OpeningLoad+Force) ⇒ <code>Object</code>
    * [.SmoothConcentratedLoad(value,)](#OpeningLoad+SmoothConcentratedLoad)

<a name="new_OpeningLoad_new"></a>

### new OpeningLoad(no, load_case, openings, comment, params)
Creates solid load

**Returns**: <code>Object</code> - Created opening load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of opening load, can be undefined |
| load_case | <code>Object</code> | Load case |
| openings | <code>Array</code> | List of opening indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="OpeningLoad+Force"></a>

### openingLoad.Force(no, load_case, openings, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates opening force load

**Kind**: instance method of [<code>OpeningLoad</code>](#OpeningLoad)  
**Returns**: <code>Object</code> - Created opening force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of opening load, can be undefined |
| load_case | <code>Object</code> | Load case |
| openings | <code>Array</code> | List of openings indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="OpeningLoad+SmoothConcentratedLoad"></a>

### openingLoad.SmoothConcentratedLoad(value,)
Set smooth concentrated load

**Kind**: instance method of [<code>OpeningLoad</code>](#OpeningLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value, | <code>Boolean</code> | can be undefined (false) |

<a name="setLoadDistribution"></a>

## setLoadDistribution(load_type, load_distribution, load_values) ⇒ <code>Object</code>
Assignes values to load depend of load type and load distribution (private)

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load_type | <code>String</code> | Load type |
| load_distribution | <code>String</code> | Load distribution, can be undefined |
| load_values | <code>Array</code> | Load parameters depend on load type and load distribution 										- (load type / load distribution: [valid values]) 										- "Force" / "Uniform/Trapezoidal": [p] 										- "Force" / "Linear/Trapezoidal": [Node1, Node2, Node3, p1, p2, p3] |

