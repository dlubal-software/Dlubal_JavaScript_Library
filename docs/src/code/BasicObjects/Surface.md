---
title: Surface
---

# Surface

## Classes

<dl>
<dt><a href="#Surface">Surface</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createSurfaceWithType">createSurfaceWithType(no, boundary_lines, stiffness_type, thickness, comment, params)</a> ⇒</dt>
<dd><p>Creates surface (private)</p>
</dd>
</dl>

<a name="Surface"></a>

## Surface
**Kind**: global class  

* [Surface](#Surface)
    * [new Surface(no, boundary_lines, thickness, comment, params)](#new_Surface_new)
    * [.GetSurface()](#Surface+GetSurface) ⇒
    * [.GetNo()](#Surface+GetNo) ⇒
    * [.Standard(no, boundary_lines, thickness, comment, params)](#Surface+Standard) ⇒
    * [.WithoutThickness(no, boundary_lines, comment, params)](#Surface+WithoutThickness) ⇒
    * [.Rigid(no, boundary_lines, comment, params)](#Surface+Rigid) ⇒
    * [.Membrane(no, boundary_lines, thickness, comment, params)](#Surface+Membrane) ⇒
    * [.WithoutMembraneTension(no, boundary_lines, thickness, comment, params)](#Surface+WithoutMembraneTension) ⇒
    * [.LoadTransfer(no, boundary_lines, values, comment, params)](#Surface+LoadTransfer) ⇒
    * [.SurfaceType(stiffness_type, material, thickness)](#Surface+SurfaceType)
    * [.Plane()](#Surface+Plane)
    * [.Quadrangle(no, boundary_lines, stiffness_type, thickness, boundary_line, corner_node_1, corner_node_2, corner_node_3, corner_node_4, comment, params)](#Surface+Quadrangle)
    * [.NURBS()](#Surface+NURBS)
    * [.Rotated(no, boundary_lines, thickness, boundary_line, angle_of_rotation, rotation_axis_p, rotation_axis_r, comment, params)](#Surface+Rotated)
    * [.Pipe(center_line, radius)](#Surface+Pipe)
    * [.Hinges(hinges_values)](#Surface+Hinges)
    * [.Support(support)](#Surface+Support)
    * [.Eccentricity(eccentricity)](#Surface+Eccentricity)
    * [.MeshRefinement(mesh_refinement, meshing_type)](#Surface+MeshRefinement)
    * [.SpecificAxes(input_axes, result_axes)](#Surface+SpecificAxes)
    * [.GridForResults(grid_type, number_of_grid_points, grid_adapt_automatically, grid_distancies, grid_rotation, grid_origin)](#Surface+GridForResults)
    * [.IntegratedObjects(auto_detection_of_integrated_objects, integrated_nodes, integrated_lines, integrated_openings)](#Surface+IntegratedObjects)

<a name="new_Surface_new"></a>

### new Surface(no, boundary_lines, thickness, comment, params)
Creates surface

**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| thickness | <code>Number</code> | Thickness index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+GetSurface"></a>

### surface.GetSurface() ⇒
**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Surface object  
<a name="Surface+GetNo"></a>

### surface.GetNo() ⇒
**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Surface number  
<a name="Surface+Standard"></a>

### surface.Standard(no, boundary_lines, thickness, comment, params) ⇒
Creates standard surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| thickness | <code>Number</code> | Thickness index |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+WithoutThickness"></a>

### surface.WithoutThickness(no, boundary_lines, comment, params) ⇒
Creates without thickness surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+Rigid"></a>

### surface.Rigid(no, boundary_lines, comment, params) ⇒
Creates rigid surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+Membrane"></a>

### surface.Membrane(no, boundary_lines, thickness, comment, params) ⇒
Creates membrane surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| thickness | <code>Number</code> | Thickness index |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+WithoutMembraneTension"></a>

### surface.WithoutMembraneTension(no, boundary_lines, thickness, comment, params) ⇒
Creates without membrane tension surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| thickness | <code>Number</code> | Thickness index |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+LoadTransfer"></a>

### surface.LoadTransfer(no, boundary_lines, values, comment, params) ⇒
Creates load transfer surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| values | <code>Array</code> | Load transfer's parameters, can be undefined 											[load_transfer_direction, surface_weight, consider_member_eccentricity, consider_section_distribution 											excluded_members, excluded_parallel_to_members, excluded_lines, excluded_parallel_to_lines, 											loaded_lines, loaded_members] |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+SurfaceType"></a>

### surface.SurfaceType(stiffness_type, material, thickness)
Sets surface type with material and thickness

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| stiffness_type | <code>String</code> | Stiffness type |
| material | <code>Object</code> | Material, can be undefined |
| thickness | <code>Object</code> | Thickness, can be undefined |

<a name="Surface+Plane"></a>

### surface.Plane()
Sets plane geometry type of surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
<a name="Surface+Quadrangle"></a>

### surface.Quadrangle(no, boundary_lines, stiffness_type, thickness, boundary_line, corner_node_1, corner_node_2, corner_node_3, corner_node_4, comment, params)
Sets quadrangle geometry type of surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| stiffness_type | <code>String</code> | Stiffness type |
| thickness | <code>Number</code> | Thickness index, can be undefined |
| boundary_line | <code>Number</code> | Index of boundary line |
| corner_node_1 | <code>Number</code> | Quadrangle corner 1, can be undefined |
| corner_node_2 | <code>Number</code> | Quadrangle corner 2, can be undefined |
| corner_node_3 | <code>Number</code> | Quadrangle corner 3, can be undefined |
| corner_node_4 | <code>Number</code> | Quadrangle corner 4, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+NURBS"></a>

### surface.NURBS()
Sets NURBS geometry type of surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  
<a name="Surface+Rotated"></a>

### surface.Rotated(no, boundary_lines, thickness, boundary_line, angle_of_rotation, rotation_axis_p, rotation_axis_r, comment, params)
Sets rotated geometry type of surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| thickness | <code>Number</code> | Thickness index, can be undefined |
| boundary_line | <code>Number</code> | Index of boundary line |
| angle_of_rotation | <code>Number</code> | Angle of rotation, can be undefined |
| rotation_axis_p | <code>Array</code> | Rotation axis, point P ([X, Y, Z]). Can be undefined. |
| rotation_axis_r | <code>Array</code> | Rotation axis, point R ([X, Y, Z]). Can be undefined. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

<a name="Surface+Pipe"></a>

### surface.Pipe(center_line, radius)
Sets pipe geometry type of surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| center_line | <code>Number</code> | Index of center lineHeight |
| radius | <code>Number</code> | Radius |

<a name="Surface+Hinges"></a>

### surface.Hinges(hinges_values)
Sets surface hinges

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| hinges_values | <code>Array</code> | Line hinges values ([[line_no1, line_hinge_no1] ... [line_non, line_hinge_non]]) |

<a name="Surface+Support"></a>

### surface.Support(support)
Sets surface support

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| support | <code>Number</code> | Index of surface support |

<a name="Surface+Eccentricity"></a>

### surface.Eccentricity(eccentricity)
Sets surface eccentricity

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| eccentricity | <code>Number</code> | Index of surface eccentricity |

<a name="Surface+MeshRefinement"></a>

### surface.MeshRefinement(mesh_refinement, meshing_type)
Sets surface mesh refinement

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| mesh_refinement | <code>Number</code> | Index of surface mesh refinement |
| meshing_type | <code>Number</code> | Meshing type, can be undefined (According to global settings by default) 												1 - According to global settings 												2 - Mapped 												3 - Free |

<a name="Surface+SpecificAxes"></a>

### surface.SpecificAxes(input_axes, result_axes)
**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| input_axes | <code>Array</code> | Input axes values [category, [values], reverse_local_z_axis], can be undefined 											1 - Angular rotation category, values: [α, [X, Y, Z], [X2, Y2, Z2]], first and second point can be undefined 											2 - Axis parallel to lines category, values: [[line1_no, line2_no ... linen_no], axis (Axis x|Axis y)], second parameter can be undefined ("Axis x" as default) 											3 - Axis directed to point category, values: [[X1, Y1, Z1], [X2, Y2, Z2], axis (Axis x|Axis y)], third parameter can be undefined ("Axis x" by default) 											4 - Axis parallel to coordinate system category, values: [coordinate_system_no], can be undefined (Global XYZ by default) 											reverse_local_z_axis, can be undefined |
| result_axes | <code>Array</code> | Result axes values [category], can be undefined (Identical to input axes by default) 											1 - Identical to input axes category, by default |

<a name="Surface+GridForResults"></a>

### surface.GridForResults(grid_type, number_of_grid_points, grid_adapt_automatically, grid_distancies, grid_rotation, grid_origin)
Sets surface's grid for results values

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| grid_type | <code>Number</code> | Grid type (1 - Cartesian, 2 - Polar) |
| number_of_grid_points | <code>Array</code> | Number of grid points in (-) and (+), can be undefined 													Grid type cartesian: [nx+, nx-, ny+, ny-] 													Grid type polar: [nr+] |
| grid_adapt_automatically | <code>Boolean</code> | Adapt automatically, can be undefined (true by default) |
| grid_distancies | <code>Array</code> | Grid distancies ([b, h]), can be undefined |
| grid_rotation | <code>Array</code> | Grid rotation ([α, β]), can be undefined |
| grid_origin | <code>Array</code> | Grid origin ([X, Y, Z]), can be undefined |

<a name="Surface+IntegratedObjects"></a>

### surface.IntegratedObjects(auto_detection_of_integrated_objects, integrated_nodes, integrated_lines, integrated_openings)
Sets integrated objects to surface

**Kind**: instance method of [<code>Surface</code>](#Surface)  

| Param | Type | Description |
| --- | --- | --- |
| auto_detection_of_integrated_objects | <code>Boolean</code> | Integrated objects are detected automatically, can be undefined (true by default) |
| integrated_nodes | <code>Array</code> | List of integrated nodes indexes, can be undefined |
| integrated_lines | <code>Array</code> | List of integrated lines indexes, can be undefined |
| integrated_openings | <code>Array</code> | List of integrated openings indexes, can be undefined; |

<a name="createSurfaceWithType"></a>

## createSurfaceWithType(no, boundary_lines, stiffness_type, thickness, comment, params) ⇒
Creates surface (private)

**Kind**: global function  
**Returns**: Created surface  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of surface, can be undefined |
| boundary_lines | <code>Array</code> | List of boundary lines indexes |
| stiffness_type | <code>String</code> | Stiffness type |
| thickness | <code>Number</code> | Thickness index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Surface's parameters, can be undefined |

