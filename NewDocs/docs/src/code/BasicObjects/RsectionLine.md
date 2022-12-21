---
title: RsectionLine
---

# RsectionLine

## Classes

<dl>
<dt><a href="#RSectionLine">RSectionLine</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseRSectionLine">createBaseRSectionLine(no, type, comment, params)</a> ⇒</dt>
<dd><p>Creates RSection base Line</p>
</dd>
</dl>

<a name="RSectionLine"></a>

## RSectionLine
**Kind**: global class  

* [RSectionLine](#RSectionLine)
    * [new RSectionLine(no, type, comment, params)](#new_RSectionLine_new)
    * [.Polyline(no, definition_points, comment, params)](#RSectionLine+Polyline) ⇒
    * [.Arc(no, points_of_arc, control_point, arc_parameters, arc_center, alpha_adjustment_target, comment, params)](#RSectionLine+Arc) ⇒
    * [.Circle(no, circle_center, circle_radius, comment, params)](#RSectionLine+Circle) ⇒
    * [.Ellipse(no, first_point, second_point, control_point, comment, params)](#RSectionLine+Ellipse) ⇒
    * [.Parabola(no, points_of_parabola, control_point, parabola_alpha, comment, params)](#RSectionLine+Parabola) ⇒
    * [.NURBS(no, definition_points, control_points, nurbs_order, nurbs_knots, comment, params)](#RSectionLine+NURBS) ⇒
    * [.PointsOnLine(points_on_line)](#RSectionLine+PointsOnLine)

<a name="new_RSectionLine_new"></a>

### new RSectionLine(no, type, comment, params)
Creates RSection Line

**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| type | <code>String</code> | Type of line |
| comment | <code>String</code> | Comment for the Line, can be undefined |
| params | <code>Object</code> | Parameters of the Line, can be undefined |

<a name="RSectionLine+Polyline"></a>

### rSectionLine.Polyline(no, definition_points, comment, params) ⇒
Creates RSection polyline

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| definition_points | <code>Array</code> | Definition point numbers |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLine+Arc"></a>

### rSectionLine.Arc(no, points_of_arc, control_point, arc_parameters, arc_center, alpha_adjustment_target, comment, params) ⇒
Creates RSection arc Line

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| points_of_arc | <code>Array</code> | Points numbers of arc lLne |
| control_point | <code>Array</code> | Coordinates of control point |
| arc_parameters | <code>Array</code> | Arc parameters [height, radius, alpha], can be undefined |
| arc_center | <code>Array</code> | Coordinates of arc center, can be undefined |
| alpha_adjustment_target | <code>String</code> | Subsequent adjustment of alpha by displaycing point at, can be undefined (beginning of arc by default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLine+Circle"></a>

### rSectionLine.Circle(no, circle_center, circle_radius, comment, params) ⇒
Creates RSection circle Line

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| circle_center | <code>Array</code> | Coordinates of circle center [y, z] |
| circle_radius | <code>Number</code> | Circle radius |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLine+Ellipse"></a>

### rSectionLine.Ellipse(no, first_point, second_point, control_point, comment, params) ⇒
Creates RSection ellipse Line

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| first_point | <code>Number</code> | Number of first point |
| second_point | <code>Number</code> | Number of second point |
| control_point | <code>Array</code> | Control point coordinates |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLine+Parabola"></a>

### rSectionLine.Parabola(no, points_of_parabola, control_point, parabola_alpha, comment, params) ⇒
Creates RSection parabola Line

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| points_of_parabola | <code>Array</code> | Points numbers of parabola |
| control_point | <code>Array</code> | Control point |
| parabola_alpha | <code>Number</code> | Angle of the parabola, can be undefined (0 as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLine+NURBS"></a>

### rSectionLine.NURBS(no, definition_points, control_points, nurbs_order, nurbs_knots, comment, params) ⇒
Creates RSection NURBS

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| definition_points | <code>Array</code> | Definition points |
| control_points | <code>Array</code> | Control points [[y1, z1 (, weight1)], [y2, z2, weight2], ...] |
| nurbs_order | <code>Number</code> | Nurbs order, can be undefine (2 as default) |
| nurbs_knots | <code>Array</code> | Nurbs knots, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLine+PointsOnLine"></a>

### rSectionLine.PointsOnLine(points_on_line)
Sets points on line

**Kind**: instance method of [<code>RSectionLine</code>](#RSectionLine)  

| Param | Type | Description |
| --- | --- | --- |
| points_on_line | <code>Array</code> | [[distance1, from_start1, reference1, point_no1], [distance2, from_start2, reference2, point_no2], ...]                                  from_start = true => node distance from start, otherwise distance from end                                  reference - "L" by default                                  point_no - empty by default |

<a name="createBaseRSectionLine"></a>

## createBaseRSectionLine(no, type, comment, params) ⇒
Creates RSection base Line

**Kind**: global function  
**Returns**: Line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Line, can be undefined |
| type | <code>String</code> | Type of Line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

