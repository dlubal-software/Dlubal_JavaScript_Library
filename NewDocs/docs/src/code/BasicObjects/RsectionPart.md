---
title: RsectionPart
---

# RsectionPart

## Classes

<dl>
<dt><a href="#RSectionPart">RSectionPart</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseRSectionPart">createBaseRSectionPart(no, comment, params)</a> ⇒</dt>
<dd><p>Creates base RSection Part</p>
</dd>
</dl>

<a name="RSectionPart"></a>

## RSectionPart
**Kind**: global class  

* [RSectionPart](#RSectionPart)
    * [new RSectionPart(no, comment, params)](#new_RSectionPart_new)
    * [.Rectangle(no, top_left_corner, width, height, material, comment, params)](#RSectionPart+Rectangle) ⇒
    * [.Triangle(no, first_vertex, second_vertex, third_vertex, material, comment, params)](#RSectionPart+Triangle) ⇒
    * [.Circle(no, center_vertex, radius, material, comment, params)](#RSectionPart+Circle) ⇒
    * [.Polygon(no, vertex_points, material, comment, params)](#RSectionPart+Polygon) ⇒
    * [.WithBoundaryLines(no, boundary_lines, material, comment, params)](#RSectionPart+WithBoundaryLines) ⇒
    * [.IntegratedObjects(enable, automatic_object_detection, integrated_openings)](#RSectionPart+IntegratedObjects) ⇒
    * [.No()](#RSectionPart+No) ⇒

<a name="new_RSectionPart_new"></a>

### new RSectionPart(no, comment, params)
Creates RSection Part

**Returns**: Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Part, can be undefined |
| comment | <code>string</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPart+Rectangle"></a>

### rSectionPart.Rectangle(no, top_left_corner, width, height, material, comment, params) ⇒
Creates rectangle Part

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Rectangle Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Part, can be undefined |
| top_left_corner | <code>Array</code> | Top let corner specified with y, z coordinates |
| width | <code>Number</code> | Width |
| height | <code>Number</code> | Height |
| material | <code>Object</code> | Material |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPart+Triangle"></a>

### rSectionPart.Triangle(no, first_vertex, second_vertex, third_vertex, material, comment, params) ⇒
Creates triangle Part

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Triangle Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Part, can be undefined |
| first_vertex | <code>Array</code> | First point specified with y, z coordinates |
| second_vertex | <code>Array</code> | Second point specified with y, z coordinates |
| third_vertex | <code>Array</code> | Third point specified with y, z coordinates |
| material | <code>Object</code> | Material |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPart+Circle"></a>

### rSectionPart.Circle(no, center_vertex, radius, material, comment, params) ⇒
Creates circle Part

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Circle Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Part, can be undefined |
| center_vertex | <code>Array</code> | Circle center point |
| radius | <code>Number</code> | Circle radius |
| material | <code>Object</code> | Material |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPart+Polygon"></a>

### rSectionPart.Polygon(no, vertex_points, material, comment, params) ⇒
Creates polygon Part

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Polygon Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Part, can be undefined |
| vertex_points | <code>Array</code> | Vertex points specified with y, z coordinates |
| material | <code>Object</code> | Material |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPart+WithBoundaryLines"></a>

### rSectionPart.WithBoundaryLines(no, boundary_lines, material, comment, params) ⇒
Creates Part with boundary line

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Part, can be undefined |
| boundary_lines | <code>Array</code> | Boundary lines |
| material | <code>Object</code> | Material |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionPart+IntegratedObjects"></a>

### rSectionPart.IntegratedObjects(enable, automatic_object_detection, integrated_openings) ⇒
Integrates objects to Part

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Modified Part  

| Param | Type | Description |
| --- | --- | --- |
| enable | <code>Boolean</code> | Objects are integrated, can be undefined (true as default) |
| automatic_object_detection | <code>Boolean</code> | Objects are integrated automatically, can be undefined (true as default) |
| integrated_openings | <code>Array</code> | Integrated openings |

<a name="RSectionPart+No"></a>

### rSectionPart.No() ⇒
Returns number of Part

**Kind**: instance method of [<code>RSectionPart</code>](#RSectionPart)  
**Returns**: Number of Part  
<a name="createBaseRSectionPart"></a>

## createBaseRSectionPart(no, comment, params) ⇒
Creates base RSection Part

**Kind**: global function  
**Returns**: Part  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Part, can be undefined |
| comment | <code>string</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

