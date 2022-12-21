---
title: RsectionElement
---

# RsectionElement

## Classes

<dl>
<dt><a href="#RSectionElement">RSectionElement</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseRSectionElement">createBaseRSectionElement(no, type, comment, params)</a> ⇒</dt>
<dd><p>Create base RSection Element</p>
</dd>
</dl>

<a name="RSectionElement"></a>

## RSectionElement
**Kind**: global class  

* [RSectionElement](#RSectionElement)
    * [new RSectionElement(no, type, comment, params)](#new_RSectionElement_new)
    * [.SingleLine(no, boundary_lines, thickness, shear_thickness, comment, params)](#RSectionElement+SingleLine) ⇒
    * [.Arc(no, points_of_arc, control_point, thickness, shear_thickness, arc_parameters, arc_center, alpha_adjustment_target, comment, params)](#RSectionElement+Arc) ⇒
    * [.Circle(no, circle_center, circle_radius, thickness, shear_thickness, comment, params)](#RSectionElement+Circle) ⇒
    * [.Ellipse(no, first_point, second_point, control_point, thickness, shear_thickness, comment, params)](#RSectionElement+Ellipse) ⇒
    * [.Parabola(no, points_of_parabola, control_point, thickness, shear_thickness, parabola_alpha, comment, params)](#RSectionElement+Parabola) ⇒
    * [.NURBS(no, control_points, nurbs_order, nurbs_knots, thickness, shear_thickness, comment, params)](#RSectionElement+NURBS) ⇒
    * [.Thickness(thickness, shear_thickness)](#RSectionElement+Thickness) ⇒

<a name="new_RSectionElement_new"></a>

### new RSectionElement(no, type, comment, params)
Create RSection Element

**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| type | <code>String</code> | Type of Element |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+SingleLine"></a>

### rSectionElement.SingleLine(no, boundary_lines, thickness, shear_thickness, comment, params) ⇒
Creates single line Element

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| boundary_lines | <code>Array</code> | Boundary lines |
| thickness | <code>Number</code> | Thickness, can be undefined (10 mm by default) |
| shear_thickness | <code>Number</code> | Shear thickness, can be undefined (not specified by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+Arc"></a>

### rSectionElement.Arc(no, points_of_arc, control_point, thickness, shear_thickness, arc_parameters, arc_center, alpha_adjustment_target, comment, params) ⇒
Creates RSection arc Element

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| points_of_arc | <code>Array</code> | Points numbers of arc Element |
| control_point | <code>Array</code> | Coordinates of control point |
| thickness | <code>Number</code> | Thickness, can be undefined (10 mm by default) |
| shear_thickness | <code>Number</code> | Shear thickness, can be undefined (not specified by default) |
| arc_parameters | <code>Array</code> | Arc parameters, can be undefined |
| arc_center | <code>Array</code> | Coordinates of arc center, can be undefined |
| alpha_adjustment_target | <code>String</code> | Subsequent adjustment of alpha by displacing point at, can be undefined (Beginning of arc by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+Circle"></a>

### rSectionElement.Circle(no, circle_center, circle_radius, thickness, shear_thickness, comment, params) ⇒
Creates RSection circle Element

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| circle_center | <code>Array</code> | Coordinates of circle center |
| circle_radius | <code>Number</code> | Circle radius |
| thickness | <code>Number</code> | Thickness, can be undefined (10 mm by default) |
| shear_thickness | <code>Number</code> | Shear thickness, can be undefined (not specified by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+Ellipse"></a>

### rSectionElement.Ellipse(no, first_point, second_point, control_point, thickness, shear_thickness, comment, params) ⇒
Creates RSection ellipse Element

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| first_point | <code>Number</code> | Number of first point |
| second_point | <code>Number</code> | Number of second point |
| control_point | <code>Array</code> | Control point coordinates |
| thickness | <code>Number</code> | Thickness, can be undefined (10 mm by default) |
| shear_thickness | <code>Number</code> | Shear thickness, can be undefined (not specified by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+Parabola"></a>

### rSectionElement.Parabola(no, points_of_parabola, control_point, thickness, shear_thickness, parabola_alpha, comment, params) ⇒
Creates RSection parabola Element

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| points_of_parabola | <code>Array</code> | Points numbers of parabola |
| control_point | <code>Array</code> | Control point |
| thickness | <code>Number</code> | Thickness, can be undefined (10 mm by default) |
| shear_thickness | <code>Number</code> | Shear thickness, can be undefined (not specified by default) |
| parabola_alpha | <code>Number</code> | Angle of the parabola, can be undefined (0 as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+NURBS"></a>

### rSectionElement.NURBS(no, control_points, nurbs_order, nurbs_knots, thickness, shear_thickness, comment, params) ⇒
Creates RSection NURBS Element

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| control_points | <code>Array</code> | Control points ([[y1, z1 (, weight1)], [y2, z2, weight2], ...]) |
| nurbs_order | <code>Number</code> | Nurbs order, can be undefine (2 as default) |
| nurbs_knots | <code>Array</code> | Nurbs knots, can be undefined |
| thickness | <code>Number</code> | Thickness, can be undefined (10 mm by default) |
| shear_thickness | <code>Number</code> | Shear thickness, can be undefined (not specified by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionElement+Thickness"></a>

### rSectionElement.Thickness(thickness, shear_thickness) ⇒
Sets thickness and/or shear thickness

**Kind**: instance method of [<code>RSectionElement</code>](#RSectionElement)  
**Returns**: Modified Element  

| Param | Type | Description |
| --- | --- | --- |
| thickness | <code>Number</code> | Thickness |
| shear_thickness | <code>Number</code> | Effective thickness for shear transfer, can be undefined |

<a name="createBaseRSectionElement"></a>

## createBaseRSectionElement(no, type, comment, params) ⇒
Create base RSection Element

**Kind**: global function  
**Returns**: Element  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Element, can be undefined |
| type | <code>String</code> | Type of Element |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

