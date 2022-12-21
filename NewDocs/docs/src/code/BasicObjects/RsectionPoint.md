---
title: RsectionPoint
---

# RsectionPoint

## Classes

<dl>
<dt><a href="#RSectionPoint">RSectionPoint</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBasePoint">createBasePoint(no, coordinate_y, coordinate_z, comment, params)</a> ⇒</dt>
<dd><p>Creates base RSection Point (private)</p>
</dd>
</dl>

<a name="RSectionPoint"></a>

## RSectionPoint
**Kind**: global class  

* [RSectionPoint](#RSectionPoint)
    * [new RSectionPoint(no, coordinate_y, coordinate_z, comment, params)](#new_RSectionPoint_new)
    * [.y()](#RSectionPoint+y)
    * [.z()](#RSectionPoint+z)
    * [.Standard(no, coordinate_y, coordinate_z, reference_point, comment, params)](#RSectionPoint+Standard) ⇒
    * [.BetweenTwoLocations(no, start_location, end_location, distance_from_start, distance_from_end, distance_from_start_relative, reference_type, offset_in_local_direction, comment, params)](#RSectionPoint+BetweenTwoLocations) ⇒
    * [.BetweenTwoPoints(no, start_point, end_point, distance_from_start, distance_from_end, distance_from_start_relative, reference_type, offset_in_local_direction, comment, params)](#RSectionPoint+BetweenTwoPoints) ⇒
    * [.OnLine(no, line, distance_from_start, distance_from_end, distance_from_start_relative, reference_type, comment, params)](#RSectionPoint+OnLine) ⇒

<a name="new_RSectionPoint_new"></a>

### new RSectionPoint(no, coordinate_y, coordinate_z, comment, params)
Creates RSection Point

**Returns**: Point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Point, can be undefined |
| coordinate_y | <code>Number</code> | Coordinate Y |
| coordinate_z | <code>Number</code> | Coordinate Z |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPoint+y"></a>

### rSectionPoint.y()
Returns y coordinate

**Kind**: instance method of [<code>RSectionPoint</code>](#RSectionPoint)  
<a name="RSectionPoint+z"></a>

### rSectionPoint.z()
Returns z coordinate

**Kind**: instance method of [<code>RSectionPoint</code>](#RSectionPoint)  
<a name="RSectionPoint+Standard"></a>

### rSectionPoint.Standard(no, coordinate_y, coordinate_z, reference_point, comment, params) ⇒
Creates standard RSection Point

**Kind**: instance method of [<code>RSectionPoint</code>](#RSectionPoint)  
**Returns**: Point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Point, can be undefined |
| coordinate_y | <code>Number</code> | Coordinate Y |
| coordinate_z | <code>Number</code> | Coordinate Z |
| reference_point | <code>Number</code> | Reference point number, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPoint+BetweenTwoLocations"></a>

### rSectionPoint.BetweenTwoLocations(no, start_location, end_location, distance_from_start, distance_from_end, distance_from_start_relative, reference_type, offset_in_local_direction, comment, params) ⇒
Creates Between two locations RSection Point

**Kind**: instance method of [<code>RSectionPoint</code>](#RSectionPoint)  
**Returns**: Point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Point, can be undefined |
| start_location | <code>Array</code> | Coordinates for start location [y, z] |
| end_location | <code>Array</code> | Coordinates for end location [y, z] |
| distance_from_start | <code>Number</code> | Distance from start |
| distance_from_end | <code>Number</code> | Distance from end |
| distance_from_start_relative | <code>Boolean</code> | Distance from start point, can be undefined (True as default) |
| reference_type | <code>String</code> | Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default) |
| offset_in_local_direction | <code>Number</code> | Offset in local direction, can be undefined (0 as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPoint+BetweenTwoPoints"></a>

### rSectionPoint.BetweenTwoPoints(no, start_point, end_point, distance_from_start, distance_from_end, distance_from_start_relative, reference_type, offset_in_local_direction, comment, params) ⇒
Creates Between two points RSection Point

**Kind**: instance method of [<code>RSectionPoint</code>](#RSectionPoint)  
**Returns**: Point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Point, can be undefined |
| start_point | <code>Object</code> | Number of start point |
| end_point | <code>Object</code> | Number of end point |
| distance_from_start | <code>Number</code> | Distance from start |
| distance_from_end | <code>Number</code> | Distance from end |
| distance_from_start_relative | <code>Boolean</code> | Distance from start point, can be undefined (True asy default) |
| reference_type | <code>String</code> | Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default) |
| offset_in_local_direction | <code>Number</code> | Offset in local direction, can be undefined (0 as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPoint+OnLine"></a>

### rSectionPoint.OnLine(no, line, distance_from_start, distance_from_end, distance_from_start_relative, reference_type, comment, params) ⇒
Creates On lines RSection Point

**Kind**: instance method of [<code>RSectionPoint</code>](#RSectionPoint)  
**Returns**: Point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Point, can be undefined |
| line | <code>Number</code> | Line number |
| distance_from_start | <code>Number</code> | Distance from start |
| distance_from_end | <code>Number</code> | Distance from end |
| distance_from_start_relative | <code>Boolean</code> | Distance from start point, can be undefined (True as default) |
| reference_type | <code>String</code> | Reference type, can be undefined ("L" by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="createBasePoint"></a>

## createBasePoint(no, coordinate_y, coordinate_z, comment, params) ⇒
Creates base RSection Point (private)

**Kind**: global function  
**Returns**: Point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Point, can be undefined |
| coordinate_y | <code>Number</code> | Coordinate Y |
| coordinate_z | <code>Number</code> | Coordinate Z |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

