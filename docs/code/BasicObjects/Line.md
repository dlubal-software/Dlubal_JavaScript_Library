---
title: Line
---

# Line

## Classes

<dl>
<dt><a href="#Line">Line</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getRotationPlane">getRotationPlane(rotation_plane)</a> ⇒</dt>
<dd><p>Returns rotation plane from string representation (private)</p>
</dd>
<dt><a href="#createBaseLine">createBaseLine(no, nodes, comment, params)</a> ⇒</dt>
<dd><p>Creates line (private)</p>
</dd>
</dl>

<a name="Line"></a>

## Line
**Kind**: global class  

* [Line](#Line)
    * [new Line(no, nodes, comment, params)](#new_Line_new)
    * [.Polyline(no, nodes, comment, params)](#Line+Polyline)
    * [.Arc(no, nodes, control_point, arc_parameters, center_of_arc, alpha_adjustement_target, comment, params)](#Line+Arc)
    * [.Circle(no, center_of_circle, circle_radius, normal_point, comment, params)](#Line+Circle)
    * [.EllipticalArc(no, control_point_1, control_point_2, perimeter_point, elliptical_arc_alpha, elliptical_arc_beta, comment, params)](#Line+EllipticalArc)
    * [.Ellipse(no, nodes, control_point, comment, params)](#Line+Ellipse)
    * [.Parabola(no, nodes, control_point, parabola_alpha, comment, params)](#Line+Parabola)
    * [.Spline(no, nodes, comment, params)](#Line+Spline)
    * [.NURBS(no, nodes, control_points_by_components, nurbs_order, comment, params)](#Line+NURBS)
    * [.RectangularPolygon(no, center_point, length, width, plane, comment, params)](#Line+RectangularPolygon) ⇒
    * [.nPolygon(no, control_point, no_edges, radius, rotation_plane, rotation_angle, join, comment, params)](#Line+nPolygon) ⇒
    * [.Rotation(rotation_values, rotation_type)](#Line+Rotation)
    * [.NodesOnLine(values)](#Line+NodesOnLine)
    * [.Supports(line_support)](#Line+Supports)
    * [.MeshRefinement(line_mesh_refinement)](#Line+MeshRefinement)
    * [.WeldedJoints(values)](#Line+WeldedJoints)

<a name="new_Line_new"></a>

### new Line(no, nodes, comment, params)
Creates line

**Returns**: Created line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | List of [Node](Node) indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+Polyline"></a>

### line.Polyline(no, nodes, comment, params)
Creates polyline

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | List of [Node](Node) indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

**Example**  
```js
// returns polylinevar line = new line();line.Polyline(1, [1,2]);
```
<a name="Line+Arc"></a>

### line.Arc(no, nodes, control_point, arc_parameters, center_of_arc, alpha_adjustement_target, comment, params)
Creates arc line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | List of [Node](Node) indexes |
| control_point | <code>Array</code> | Control point of arc |
| arc_parameters | <code>Array</code> | Arc's parameters, can be undefined (only one of three parameter can be set, when arc parameter is set, other parameters (control point) will be recalculated) |
| center_of_arc | <code>Array</code> | Center of arc, can be undefined (when center of is set, control point will be recalculated) |
| alpha_adjustement_target | <code>Number</code> | Subsequent adjustment of α by displacing node at: 														1 - Beginning of arc 														2 - Arc control point 														3 - End of arc |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+Circle"></a>

### line.Circle(no, center_of_circle, circle_radius, normal_point, comment, params)
Creates circle line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| center_of_circle | <code>Array</code> | Center point of circle |
| circle_radius | <code>Number</code> | Radius of circle, can be undefined |
| normal_point | <code>Array</code> | Point of normal ti circle plane, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+EllipticalArc"></a>

### line.EllipticalArc(no, control_point_1, control_point_2, perimeter_point, elliptical_arc_alpha, elliptical_arc_beta, comment, params)
Creates elliptical arc line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| control_point_1 | <code>Array</code> | First control point |
| control_point_2 | <code>Array</code> | Second control point |
| perimeter_point | <code>Array</code> | Third control point - perimeter |
| elliptical_arc_alpha | <code>Number</code> | Arc angle α, can be undefined |
| elliptical_arc_beta | <code>Number</code> | Arc angle β, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+Ellipse"></a>

### line.Ellipse(no, nodes, control_point, comment, params)
Creates ellipse line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | Nodes of ellipse |
| control_point | <code>Array</code> | Control point |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+Parabola"></a>

### line.Parabola(no, nodes, control_point, parabola_alpha, comment, params)
Creates parabola line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | Nodes of parabola |
| control_point | <code>Array</code> | Control point |
| parabola_alpha | <code>Number</code> | Parabola's parameter α |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+Spline"></a>

### line.Spline(no, nodes, comment, params)
Creates spline

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | Nodes of spline |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+NURBS"></a>

### line.NURBS(no, nodes, control_points_by_components, nurbs_order, comment, params)
Creates NURBS line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | Nodes of NURBS |
| control_points_by_components | <code>Array</code> | Control points |
| nurbs_order | <code>Number</code> | Nurbs order, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

<a name="Line+RectangularPolygon"></a>

### line.RectangularPolygon(no, center_point, length, width, plane, comment, params) ⇒
Create rectangular polygon

**Kind**: instance method of [<code>Line</code>](#Line)  
**Returns**: Created rectangular polygon  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of the line, can be undefined |
| center_point | <code>array</code> | Center point by format |
| length | <code>number</code> | Length |
| width | <code>number</code> | Width |
| plane | <code>string</code> | Plane XY, XZ or YZ, can be undefined |
| comment | <code>string</code> | Comment for the line, can be undefined |
| params | <code>Object</code> | Parameters of the line, can be undefined |

<a name="Line+nPolygon"></a>

### line.nPolygon(no, control_point, no_edges, radius, rotation_plane, rotation_angle, join, comment, params) ⇒
Creates nPolygon

**Kind**: instance method of [<code>Line</code>](#Line)  
**Returns**: Created nPolygon  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of the line, can be undefined |
| control_point | <code>array</code> | Control point by format [x, y, z] |
| no_edges | <code>number</code> | Number of edges |
| radius | <code>number</code> | Radius |
| rotation_plane | <code>string</code> | Rotation plane (x-y, x-z), can be undefined (x-y by default) |
| rotation_angle | <code>number</code> | Rotation angle |
| join | <code>string</code> | Join in one "true" or in separate lines "false" |
| comment | <code>string</code> | Comment for the line, can be undefined |
| params | <code>Object</code> | Parameters of the line, can be undefined |

<a name="Line+Rotation"></a>

### line.Rotation(rotation_values, rotation_type)
Sets line rotation

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| rotation_values | <code>Number</code> | Rotation values depends on rotation type: 											1 - [β] 											2 - [help_node_index, rotation_plane ("x-y"|"x-z")] 											3 - [rotation_plane ("x-y"|"x-z")] |
| rotation_type | <code>Number</code> | Line rotation via: Angle (1), Help node (2), Inside (non-straight line) (3) |

<a name="Line+NodesOnLine"></a>

### line.NodesOnLine(values)
Sets nodes on line

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | Nodes on line values in format [[node_1, reference_1, from_start_1, from_end1_1] ... [node_n, reference_n, from_start_n, from_end_1]] |

<a name="Line+Supports"></a>

### line.Supports(line_support)
Sets line supports

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| line_support | <code>Number</code> | Line supports object id |

<a name="Line+MeshRefinement"></a>

### line.MeshRefinement(line_mesh_refinement)
Sets line mesh refinement

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| line_mesh_refinement | <code>Array</code> | Line mesh refinement object id |

<a name="Line+WeldedJoints"></a>

### line.WeldedJoints(values)
Sets line welded joints

**Kind**: instance method of [<code>Line</code>](#Line)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | Line welded joints values, [[weld1, surface1,1, surface2,1, surface3,1] ... [weldn, surface1n, surface2n, surface3n]] |

<a name="getRotationPlane"></a>

## getRotationPlane(rotation_plane) ⇒
Returns rotation plane from string representation (private)

**Kind**: global function  
**Returns**: Rotation plane  

| Param | Type | Description |
| --- | --- | --- |
| rotation_plane | <code>String</code> | Rotation plane (x-y, x-z) |

<a name="createBaseLine"></a>

## createBaseLine(no, nodes, comment, params) ⇒
Creates line (private)

**Kind**: global function  
**Returns**: Created line  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line, can be undefined |
| nodes | <code>Array</code> | List of [Node](Node) indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Line's parameters, can be undefined |

