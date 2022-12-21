---
title: BaseLoad
---

# BaseLoad

## Functions

<dl>
<dt><a href="#createBaseLoad">createBaseLoad(load_type, no, load_case, index_list, comment, params)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates load based on its type</p>
</dd>
<dt><a href="#createSimplyValueLoad">createSimplyValueLoad(load_type, no, load_case, nodes, force, moment, mass, load_direction, comment, params)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates load with one only value (force, mass and so on)</p>
</dd>
<dt><a href="#showLoadAssert">showLoadAssert(load_type, load_distribution)</a></dt>
<dd><p>Shows assert (private)</p>
</dd>
<dt><a href="#setLoadValues">setLoadValues(arguments)</a></dt>
<dd><p>Set load parameters</p>
</dd>
<dt><a href="#setAxis">setAxis(load, value)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Sets axis for rotary motion load type</p>
</dd>
<dt><a href="#setAxisAndOrientation">setAxisAndOrientation(load, value)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Sets axis and orientation for rotary motion load type</p>
</dd>
<dt><a href="#setLineLoadDistribution">setLineLoadDistribution(load, load_type, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Function assigns parameters to line / line set load depend of load type and load distribution (private)</p>
</dd>
<dt><a href="#setMemberLoadDistribution">setMemberLoadDistribution(load, load_type, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Function assigns parameters to member / member set load depend of load type and load distribution (private)</p>
</dd>
<dt><a href="#setSurfaceLoadDistribution">setSurfaceLoadDistribution(load, load_type, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Function assigns parameters to surface / surface set load depend of load type and load distribution (private)</p>
</dd>
<dt><a href="#setSolidLoadDistribution">setSolidLoadDistribution(load, load_type, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Function assigns parameters to solid / solid set load depend of load type and load distribution (private)</p>
</dd>
<dt><a href="#setCommonFreeLoadsValues">setCommonFreeLoadsValues(load, load_projection, load_direction, load_acting_region_from, load_acting_region_to)</a> ⇒ <code>Object</code></dt>
<dd><p>Updates common parameters for free loads</p>
</dd>
</dl>

<a name="createBaseLoad"></a>

## createBaseLoad(load_type, no, load_case, index_list, comment, params) ⇒ <code>Object</code>
Creates load based on its type

**Kind**: global function  
**Returns**: <code>Object</code> - Created load  

| Param | Type | Description |
| --- | --- | --- |
| load_type | <code>Number</code> | Load type |
| no | <code>Number</code> | Index of load, can be undefined |
| load_case | <code>Object</code> | Load case |
| index_list | <code>Array</code> | List of assigned objects (indexes), can be empty |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="createSimplyValueLoad"></a>

## createSimplyValueLoad(load_type, no, load_case, nodes, force, moment, mass, load_direction, comment, params) ⇒ <code>Object</code>
Creates load with one only value (force, mass and so on)

**Kind**: global function  
**Returns**: <code>Object</code> - Created load  

| Param | Type | Description |
| --- | --- | --- |
| load_type | <code>Number</code> | Load type |
| no | <code>Number</code> | Index of nodal load, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of node indexes, can be undefined |
| force | <code>Number</code> | Load force value, can be undefined |
| moment | <code>Number</code> | Load moment value, can be undefined |
| mass | <code>Number</code> | Load mass value, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="showLoadAssert"></a>

## showLoadAssert(load_type, load_distribution)
Shows assert (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| load_type | <code>String</code> | Load type |
| load_distribution | <code>String</code> | Load distribution, can be undefined |

<a name="setLoadValues"></a>

## setLoadValues(arguments)
Set load parameters

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| arguments | <code>Array</code> | Arguments: arg[0] - load, arg[1] - load parameters, arg[2] - load parameters to be set |

<a name="setAxis"></a>

## setAxis(load, value) ⇒ <code>Boolean</code>
Sets axis for rotary motion load type

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if axis and orientation was successfully set  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| value | <code>String</code> | Parallel axis (X, Y, Z) |

<a name="setAxisAndOrientation"></a>

## setAxisAndOrientation(load, value) ⇒ <code>Boolean</code>
Sets axis and orientation for rotary motion load type

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if axis and orientation was successfully set  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| value | <code>String</code> | Parallel axis (+X, -X, ...) |

<a name="setLineLoadDistribution"></a>

## setLineLoadDistribution(load, load_type, load_distribution, load_values) ⇒ <code>Object</code>
Function assigns parameters to line / line set load depend of load type and load distribution (private)

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_type | <code>String</code> | Load type |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load type and load distribution 										- (load type / load distribution: [valid values]) 										- "Force" / "Uniform": [p] 										- "Force" / "Uniform - Total": [P] 										- "Force" / "Concentrated - 1": [P, A, is_a_relative] 										- "Force" / "Concentrated - n x": [P, n, A, B, is_a_relative, is_b_relative] 										- "Force" / "Concentrated - 2 x 2": [P, A, B, C, is_a_relative, is_b_relative, is_c_relative] 										- "Force" / "Concentrated - 2 x": [P1, A, P2, B, is_a_relative, is_b_relative] 										- "Force" / "Concentrated - Varying": [P1, x1, P2, x2 ... Pn, xn] 										- "Force" / "Trapezoidal": [p1, B, p2, A, is_b_relative, is_a_relative] 										- "Force" / "Tapered": [p1, p2, A, B, is_a_relative, is_b_relative] 										- "Force" / "Parabolic": [p1, p2, p3] 										- "Force" / "Varying": [p1, x1, p2, x2 ... pn, xn] 										- "Force" / "Varying in Z": [p1, z1, p2, z2 ... pn, zn] 										- "Moment" / "Uniform" (load type / load distribution): [m] 										- "Moment" / "Concentrated - 1": [M, A, is_a_relative] 										- "Moment" / "Concentrated - n x": [M, n, A, B, is_a_relative, is_b_relative] 										- "Moment" / "Concentrated - 2 x 2": [M, A, B, C, is_a_relative, is_b_relative, is_c_relative] 										- "Moment" / "Concentrated - 2 x": [M1, A, M2, B, is_a_relative, is_b_relative] 										- "Moment" / "Concentrated - Varying": [M1, x1, M2, x2 ... Mn, xn] 										- "Moment" / "Trapezoidal": [m1, B, m2, A, is_b_relative, is_a_relative] 										- "Moment" / "Tapered": [m1, m2, A, B, is_a_relative, is_b_relative] 										- "Moment" / "Parabolic": [m1, m2, m3] 										- "Moment" / "Varying": [m1, x1, m2, x2 ... mn, xn] 										- "Mass" / "Uniform": M |

<a name="setMemberLoadDistribution"></a>

## setMemberLoadDistribution(load, load_type, load_distribution, load_values) ⇒ <code>Object</code>
Function assigns parameters to member / member set load depend of load type and load distribution (private)

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_type | <code>String</code> | Load type |
| load_distribution | <code>String</code> | Load distribution, can be undefined |
| load_values | <code>Array</code> | Load parameters depend on load type and load distribution 										- (load type / load distribution: [valid values]) 										- "Force" / "Uniform": [p] 										- "Force" / "Uniform - Total": [P] 										- "Force" / "Concentrated - 1": [P, A, is_a_relative] 										- "Force" / "Concentrated - n x": [P, n, A, B, is_a_relative, is_b_relative] 										- "Force" / "Concentrated - 2 x 2": [P, A, B, C, is_a_relative, is_b_relative, is_c_relative] 										- "Force" / "Concentrated - 2 x": [P1, A, P2, B, is_a_relative, is_b_relative] 										- "Force" / "Concentrated - Varying": [P1, x1, P2, x2 ... Pn, xn] 										- "Force" / "Trapezoidal": [p1, B, p2, A, is_b_relative, is_a_relative] 										- "Force" / "Tapered": [p1, p2, A, B, is_a_relative, is_b_relative] 										- "Force" / "Parabolic": [p1, p2, p3] 										- "Force" / "Varying": [p1, x1, p2, x2, ... pn, xn] 										- "Force" / "Varying in Z": [p1, z1, p2, z2 ... pn, zn] 										- "Moment" / "Uniform" (load type / load distribution): [m] 										- "Moment" / "Concentrated - 1": [M, A, is_a_relative] 										- "Moment" / "Concentrated - n x": [M, n, A, B, is_a_relative, is_b_relative] 										- "Moment" / "Concentrated - 2 x 2": [M, A, B, C, is_a_relative, is_b_relative, is_c_relative] 										- "Moment" / "Concentrated - 2 x": [M1, A, M2, B, is_a_relative, is_b_relative] 										- "Moment" / "Concentrated - Varying": [M1, x1, M2, x2 ... Mn, xn] 										- "Moment" / "Trapezoidal": [m1, B, m2, A, is_b_relative, is_a_relative] 										- "Moment" / "Tapered": [m1, m2, A, B, is_a_relative, is_b_relative] 										- "Moment" / "Parabolic": [m1, m2, m3] 										- "Moment" / "Varying": [m1, x1, m2, x2, ... mn, xn] 										- "Mass" / "Uniform": M 										- "Temperature" / "Uniform": [Tt, Tb] 										- "Temperature" / "Trapezoidal": [Tt1, B, Tb1, Tt2, Tb2, A, is_b_relative, is_a_relative] 										- "Temperature" / "Tapered": [Tt1, Tb1, Tt2, Tb2, A, B, is_a_relative, is_b_relative] 										- "Temperature" / "Parabolic": [Tt1, Tb1, Tt2, Tb2, Tt3, Tb3] 										- "Temperature" / "Varying": [Tt1, Tb1, x1, Tt2, Tb2, x2 ... Ttn, Tbn, xn] 										- "Temperature Change" / "Uniform": [Tc, ΔT] 										- "Temperature Change" / "Trapezoidal": [Tc1, B, ΔT1, Tc2, ΔT2, A, is_b_relative, is_a_relative] 										- "Temperature Change" / "Tapered": [Tc1, ΔT1, ΔT2, ΔT2, A, B, is_a_relative, is_b_relative] 										- "Temperature Change" / "Parabolic": [Tt1, ΔT1, Tt2, ΔT2, Tt3, ΔT3] 										- "Temperature Change" / "Varying": [Tc1, ΔT1, x1, Tc2, ΔT2, x2 ... Tcn, ΔTn, xn] 										- "Axial Strain" / "Uniform": [ε] 										- "Axial Strain" / "Trapezoidal": [ε1, B, ε2, A, is_b_relative, is_a_relative] 										- "Axial Strain" / "Tapered": [ε1, ε2, A, B, is_a_relative, is_b_relative] 										- "Axial Strain" / "Parabolic": [ε1, ε2, ε3] 										- "Axial Strain" / Varying": [ε1, x1, ε2, x2, ... εn, xn] 										- "Axial Displacement" / "Uniform": Δl 										- "Precamber" / "Uniform": [κ] 										- "Precamber" / "Trapezoidal": [κ1, B, κ2, A, is_b_relative, is_a_relative] 										- "Precamber" / "Tapered": [κ1, A, κ2, B, is_a_relative, is_a_relative] 										- "Precamber" / "Parabolic": [κ1, κ2, κ3] 										- "Precamber" / "Varying": [κ1, x1, κ2, x2, ... κn, xn] 										- "Initial Prestress" / "Uniform": V 										- "Displacement" / "Uniform": [δ] 										- "Displacement" / "Concentrated - 1": [Δ, A, is_a_relative] 										- "Displacement" / "Concentrated - n x": [Δ, n, A, B, is_a_relative, is_b_relative] 										- "Displacement" / "Concentrated - 2 x 2": [Δ, A, B, C, is_a_relative, is_b_relative, is_c_relative] 										- "Displacement" / "Concentrated - 2 x": [Δ1, Δ2, A, B, is_a_relative, is_b_relative] 										- "Displacement" / "Concentrated - Varying": [Δ1, x1, Δ2, x2 ... Δn, xn] 										- "Displacement" / "Trapezoidal": [δ1, B, δ2, A, is_b_relative, is_a_relative] 										- "Displacement" / "Tapered": [δ1, δ2, A, B, is_a_relative, is_b_relative] 										- "Displacement" / "Parabolic": [δ1, δ2, δ3] 										- "Displacement" / "Varying": [δ1, x1, δ2, x2, ... δn, xn] 										- "Rotation" / "Uniform": [φ] 										- "Rotation" / "Concentrated - 1": [φ, A, is_a_relative] 										- "Rotation" / "Concentrated - n x": [φ, n, A, B, is_a_relative, is_b_relative] 										- "Rotation" / "Concentrated - 2 x 2": [φ, A, B, C, is_a_relative, is_b_relative, is_c_relative] 										- "Rotation" / "Concentrated - 2 x": [φ1, A, φ2, B, is_a_relative, is_b_relative] 										- "Rotation" / "Concentrated - Varying": [φ1, x1, φ2, x2 ... φn, xn] 										- "Rotation" / "Trapezoidal": [φ1, B, φ2, A, is_b_relative, is_a_relative] 										- "Rotation" / "Tapered": [φ1, φ2, A, B, is_a_relative, is_b_relative] 										- "Rotation" / "Parabolic": [φ1, φ2, φ3] 										- "Rotation" / "Varying": [φ1, x1, φ2, x2, ... φn, xn] 										- "Pipe Content - Full" / "Uniform": γ 										- "Pipe Content - Partial" / "Uniform": [γ, d] 										- "Pipe Internal Pressure" / "Uniform": p 										- "Rotary Motion": [axis_definition, ω, α, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points") 														   [axis_definition, ω, α, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis") |

<a name="setSurfaceLoadDistribution"></a>

## setSurfaceLoadDistribution(load, load_type, load_distribution, load_values) ⇒ <code>Object</code>
Function assigns parameters to surface / surface set load depend of load type and load distribution (private)

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_type | <code>String</code> | Load type |
| load_distribution | <code>String</code> | Load distribution, can be undefined |
| load_values | <code>Array</code> | Load parameters depend on load type and load distribution 										- (load type / load distribution: [valid values]) 										- "Force" / "Uniform": [p] 										- "Force" / "Linear": [Node1, Node2, Node3, p1, p2, p3] 										- "Force: / "Linear in X": [Node1, Node2, p1, p2] 										- "Force" / "Linear in Y": [Node1, Node2, p1, p2] 										- "Force" / "Linear in Z": [Node1, Node2, p1, p2] 										- "Force" / "Radial": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points") 														   	  [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis") 										- "Force" / "Varying in Z": [p1, z1, p2, z2, ... pn, zn] 										- "Temperature" / "Uniform": [Tc, ΔT] 										- "Temperature" / "Linear": [Node1, Node2, Node3, Tc1, Tc2, Tc3, ΔT1, ΔT2, ΔT3] 										- "Temperature" / "Linear in X": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2] 										- "Temperature" / "Linear in Y": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2] 										- "Temperature" / "Linear in Z": [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2] 										- "Temperature" / "Radial": [axis_definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points") 														   	  		[axis_definition, Tc1, Tc2, ΔT1, ΔT2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis") 										- "Axial Strain" / "Uniform": [εx, εy] 										- "Axial Strain" / "Linear": [Node1, Node2, Node3, ε1x, ε1y, ε2x, ε2y, ε3x, ε3y] 										- "Axial Strain" / "Linear in X": [Node1, Node2, ε1x, ε1y, ε2x, ε2y] 										- "Axial Strain" / "Linear in Y": [Node1, Node2, ε1x, ε1y, ε2x, ε2y] 										- "Axial Strain" / "Linear in Z": [Node1, Node2, ε1x, ε1y, ε2x, ε2y] 										- "Precamber" / "Uniform": [κ] 										- "Rotary Motion": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points") 														   [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis") 										- "Mass" / "Uniform": [M] |

<a name="setSolidLoadDistribution"></a>

## setSolidLoadDistribution(load, load_type, load_distribution, load_values) ⇒ <code>Object</code>
Function assigns parameters to solid / solid set load depend of load type and load distribution (private)

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_type | <code>String</code> | Load type |
| load_distribution | <code>String</code> | Load distribution, can be undefined |
| load_values | <code>Array</code> | Load parameters depend on load type and load distribution 										- (load type / load distribution: [valid values]) 										- "Force" / "Uniform": [p] 										- "Temperature" / "Uniform": [T] 										- "Temperature" / "Linear in X": [Node1, Node2, T1, T2] 										- "Temperature" / "Linear in Y": [Node1, Node2, T1, T2] 										- "Temperature" / "Linear in Z": [Node1, Node2, T1, T2] 										- "Strain" / "Uniform": [εx, εy, εz] 										- "Strain" / "Linear in X": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z] 										- "Strain" / "Linear in Y": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z] 										- "Strain" / "Linear in Z": [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z] 										- "Buoyancy" / "Uniform": [p] 										- "Rotary Motion": [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 === "Two points") 														   [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 === "Point and axis") |

<a name="setCommonFreeLoadsValues"></a>

## setCommonFreeLoadsValues(load, load_projection, load_direction, load_acting_region_from, load_acting_region_to) ⇒ <code>Object</code>
Updates common parameters for free loads

**Kind**: global function  
**Returns**: <code>Object</code> - Updated free load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |

