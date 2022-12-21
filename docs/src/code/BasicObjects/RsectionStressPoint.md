---
title: RsectionStressPoint
---

# RsectionStressPoint

## Classes

<dl>
<dt><a href="#RSectionStressPoint">RSectionStressPoint</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseStressPoint">createBaseStressPoint(no, comment, params)</a> ⇒</dt>
<dd><p>Create RSection Stress Points</p>
</dd>
</dl>

<a name="RSectionStressPoint"></a>

## RSectionStressPoint
**Kind**: global class  

* [RSectionStressPoint](#RSectionStressPoint)
    * [new RSectionStressPoint(no, comment, params)](#new_RSectionStressPoint_new)
    * [.Standard(no, part_no, reference_stress_point_no, non_global_coordinates, global_coordinations, element_no, comment, params)](#RSectionStressPoint+Standard) ⇒
    * [.OnLine(no, line_no, distance_points, reference_type, part_no, element_no, comment, params)](#RSectionStressPoint+OnLine) ⇒
    * [.OnElement(no, element_no, distance_points, reference_type, element_side, comment, params)](#RSectionStressPoint+OnElement) ⇒

<a name="new_RSectionStressPoint_new"></a>

### new RSectionStressPoint(no, comment, params)
Create RSection Stress Points

**Returns**: Stress point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Stress point, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionStressPoint+Standard"></a>

### rSectionStressPoint.Standard(no, part_no, reference_stress_point_no, non_global_coordinates, global_coordinations, element_no, comment, params) ⇒
Creates Standard Stress point

**Kind**: instance method of [<code>RSectionStressPoint</code>](#RSectionStressPoint)  
**Returns**: Standard Stress point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Stress point, can be undefined |
| part_no | <code>Number</code> | Part number |
| reference_stress_point_no | <code>Number</code> | Reference Stress point number, can be undefined |
| non_global_coordinates | <code>Array</code> | Coordinates, can be undefined |
| global_coordinations | <code>Array</code> | Global coordinates, can be undefined |
| element_no | <code>Number</code> | Element number, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionStressPoint+OnLine"></a>

### rSectionStressPoint.OnLine(no, line_no, distance_points, reference_type, part_no, element_no, comment, params) ⇒
Creates Stress point on line

**Kind**: instance method of [<code>RSectionStressPoint</code>](#RSectionStressPoint)  
**Returns**: Stress point on line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Stress point, can be undefined |
| line_no | <code>Number</code> | Line number |
| distance_points | <code>Array</code> | Distance between point and start and end points, [from_start, from_end, relative], from_start or from_end can be undefined (but at least one distance must be specified), relative can be undefined (true as default) |
| reference_type | <code>String</code> | Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default) |
| part_no | <code>Number</code> | Part number, van be undefined |
| element_no | <code>Number</code> | Element number, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionStressPoint+OnElement"></a>

### rSectionStressPoint.OnElement(no, element_no, distance_points, reference_type, element_side, comment, params) ⇒
Creates stress point on element

**Kind**: instance method of [<code>RSectionStressPoint</code>](#RSectionStressPoint)  
**Returns**: Modified Stress point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Stress point, can be undefined |
| element_no | <code>Number</code> | Element number |
| distance_points | <code>Array</code> | Distance between point and start and end points, [from_start, from_end, relative], from_start or from_end can be undefined (but at least one distance must be specified), relative can be undefined (true as default) |
| reference_type | <code>String</code> | Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default) |
| element_side | <code>String</code> | Element side, can be undefined ("MIDDLE" as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="createBaseStressPoint"></a>

## createBaseStressPoint(no, comment, params) ⇒
Create RSection Stress Points

**Kind**: global function  
**Returns**: Stress point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Stress point, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

