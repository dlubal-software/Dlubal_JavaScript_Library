---
title: RsectionOpening
---

# RsectionOpening

## Classes

<dl>
<dt><a href="#RSectionOpening">RSectionOpening</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseOpening">createBaseOpening(no, boundary_lines, comment, params)</a> ⇒</dt>
<dd></dd>
</dl>

<a name="RSectionOpening"></a>

## RSectionOpening
**Kind**: global class  

* [RSectionOpening](#RSectionOpening)
    * [new RSectionOpening(no, boundary_lines, comment, params)](#new_RSectionOpening_new)
    * [.Rectangle(no, top_left_corner, width, height, comment, params)](#RSectionOpening+Rectangle) ⇒
    * [.Triangle(no, first_vertex, second_vertex, third_vertex, comment, params)](#RSectionOpening+Triangle) ⇒
    * [.Circle(no, center_vertex, radius, comment, params)](#RSectionOpening+Circle) ⇒
    * [.Polygon(no, vertex_points, comment, params)](#RSectionOpening+Polygon) ⇒

<a name="new_RSectionOpening_new"></a>

### new RSectionOpening(no, boundary_lines, comment, params)
Creates RSection Opening

**Returns**: Opening  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Opening, can be undefined |
| boundary_lines | <code>Array</code> | Boundary lines |
| comment | <code>string</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionOpening+Rectangle"></a>

### rSectionOpening.Rectangle(no, top_left_corner, width, height, comment, params) ⇒
Creates rectangle Opening

**Kind**: instance method of [<code>RSectionOpening</code>](#RSectionOpening)  
**Returns**: Rectangle Opening  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Opening, can be undefined |
| top_left_corner | <code>Array</code> | Top let corner specified with y, z coordinates |
| width | <code>Number</code> | Width |
| height | <code>Number</code> | Height |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionOpening+Triangle"></a>

### rSectionOpening.Triangle(no, first_vertex, second_vertex, third_vertex, comment, params) ⇒
Creates triangle Opening

**Kind**: instance method of [<code>RSectionOpening</code>](#RSectionOpening)  
**Returns**: Triangle Opening  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Opening, can be undefined |
| first_vertex | <code>Array</code> | First point specified with y, z coordinates |
| second_vertex | <code>Array</code> | Second point specified with y, z coordinates |
| third_vertex | <code>Array</code> | Third point specified with y, z coordinates |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionOpening+Circle"></a>

### rSectionOpening.Circle(no, center_vertex, radius, comment, params) ⇒
Creates circle Opening

**Kind**: instance method of [<code>RSectionOpening</code>](#RSectionOpening)  
**Returns**: Circle Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Opening, can be undefined |
| center_vertex | <code>Array</code> | Circle center point |
| radius | <code>Number</code> | Circle radius |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionOpening+Polygon"></a>

### rSectionOpening.Polygon(no, vertex_points, comment, params) ⇒
Creates polygon Opening

**Kind**: instance method of [<code>RSectionOpening</code>](#RSectionOpening)  
**Returns**: Polygon Opening  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Opening, can be undefined |
| vertex_points | <code>Array</code> | Vertex points specified with y, z coordinates |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="createBaseOpening"></a>

## createBaseOpening(no, boundary_lines, comment, params) ⇒
**Kind**: global function  
**Returns**: Opening  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Opening, can be undefined |
| boundary_lines | <code>Array</code> | Boundary lines |
| comment | <code>string</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

