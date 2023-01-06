---
title: GasSolids
---

# GasSolids

## Classes

<dl>
<dt><a href="#GasSolid">GasSolid</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createGasSolid">createGasSolid(no, comment, params)</a> ⇒</dt>
<dd><p>Creates gas solid (private)</p>
</dd>
</dl>

<a name="GasSolid"></a>

## GasSolid
**Kind**: global class  

* [GasSolid](#GasSolid)
    * [new GasSolid(no, pressure, temperature, comment, params)](#new_GasSolid_new)
    * [.AssignTo(solid_list)](#GasSolid+AssignTo)

<a name="new_GasSolid_new"></a>

### new GasSolid(no, pressure, temperature, comment, params)
Creates gas solid

**Returns**: Created gas solid  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of gas solid |
| pressure | <code>Number</code> | Pressure, can be empty (0.0 by default) |
| temperature | <code>Number</code> | Temperature, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Gas solid's parameters, can be undefined |

<a name="GasSolid+AssignTo"></a>

### gasSolid.AssignTo(solid_list)
Assigns solids to gas solid

**Kind**: instance method of [<code>GasSolid</code>](#GasSolid)  

| Param | Type | Description |
| --- | --- | --- |
| solid_list | <code>Array</code> | List of solid's indexes |

<a name="createGasSolid"></a>

## createGasSolid(no, comment, params) ⇒
Creates gas solid (private)

**Kind**: global function  
**Returns**: Created gas solid  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of gas solid |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Gas solid's parameters, can be undefined |

