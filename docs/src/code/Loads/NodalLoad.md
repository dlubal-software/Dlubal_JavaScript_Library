---
title: NodalLoad
---

# NodalLoad

<a name="NodalLoad"></a>

## NodalLoad
**Kind**: global class  

* [NodalLoad](#NodalLoad)
    * [new NodalLoad(no, load_case, nodes, comment, params)](#new_NodalLoad_new)
    * [.Force(no, load_case, nodes, force, load_direction, comment, params)](#NodalLoad+Force) ⇒ <code>Object</code>
    * [.Moment(no, load_case, nodes, moment, load_direction, comment, params)](#NodalLoad+Moment) ⇒ <code>Object</code>
    * [.Components(no, load_case, nodes, forces, moments, comment, params)](#NodalLoad+Components) ⇒ <code>Object</code>
    * [.Mass(no, load_case, nodes, mass, comment, params)](#NodalLoad+Mass) ⇒ <code>Object</code>
    * [.SpecificDirection(type, values)](#NodalLoad+SpecificDirection)
    * [.ForceEccentricity(eccentricity_x, eccentricity_y, eccentricity_z)](#NodalLoad+ForceEccentricity)
    * [.ShiftedDisplay(offset, distance)](#NodalLoad+ShiftedDisplay)
    * [.IndividualMassComponents(mass, distance)](#NodalLoad+IndividualMassComponents)

<a name="new_NodalLoad_new"></a>

### new NodalLoad(no, load_case, nodes, comment, params)
Creates nodal load

**Returns**: <code>Object</code> - Created nodal load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of nodal load, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of node indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="NodalLoad+Force"></a>

### nodalLoad.Force(no, load_case, nodes, force, load_direction, comment, params) ⇒ <code>Object</code>
Creates nodal force load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  
**Returns**: <code>Object</code> - Created nodal force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of nodal load, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of node indexes |
| force | <code>Number</code> | Load force value |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="NodalLoad+Moment"></a>

### nodalLoad.Moment(no, load_case, nodes, moment, load_direction, comment, params) ⇒ <code>Object</code>
Creates nodal moment load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  
**Returns**: <code>Object</code> - Created nodal moment load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of nodal load, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of node indexes |
| moment | <code>Number</code> | Load moment value |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="NodalLoad+Components"></a>

### nodalLoad.Components(no, load_case, nodes, forces, moments, comment, params) ⇒ <code>Object</code>
Creates nodal moment load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  
**Returns**: <code>Object</code> - Create nodal components load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of nodal load, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of node indexes |
| forces | <code>Array</code> | List of forces [FX, FX, FY] |
| moments | <code>Array</code> | List of moments [MX, MY, MZ] |
| comment | <code>String</code> | Comment, van be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="NodalLoad+Mass"></a>

### nodalLoad.Mass(no, load_case, nodes, mass, comment, params) ⇒ <code>Object</code>
Creates nodal moment load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  
**Returns**: <code>Object</code> - Create nodal mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of nodal load, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of node indexes |
| mass | <code>Number</code> | Load mass value |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="NodalLoad+SpecificDirection"></a>

### nodalLoad.SpecificDirection(type, values)
Adds specific direction to load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Number</code> | Specific direction type, can be one of: 								- 1 (Rotated view 3 angles) 								- 2 (Directed to node) 								- 3 (Parallel to two nodes) 								- 4 (Parallel to CS of line) 								- 4 (Parallel to CS of line) 								- 5 (Parallel to CS of member) |
| values | <code>Array</code> | List of values for specified direction: 								- [αX',αY',αZ',sequence] (for 1), example: [0.1,0.2,0.1,"X'Y'Z'"], sequence can be empty by default 								- [node_index] (for 2) 								- [node1_index, node2_index] (for 3) 								- [line_no] (for 4) 								- [member_no] (for 5) |

<a name="NodalLoad+ForceEccentricity"></a>

### nodalLoad.ForceEccentricity(eccentricity_x, eccentricity_y, eccentricity_z)
Adds eccentricity to load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  

| Param | Type | Description |
| --- | --- | --- |
| eccentricity_x | <code>Number</code> | Eccentricity eX |
| eccentricity_y | <code>Number</code> | Eccentricity eY |
| eccentricity_z | <code>Number</code> | Eccentricity eZ |

<a name="NodalLoad+ShiftedDisplay"></a>

### nodalLoad.ShiftedDisplay(offset, distance)
Adds shifted display to load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>Array</code> | Offset [ΔX,ΔY,ΔZ], example [0.1,0.2,0] |
| distance | <code>Number</code> | Distance Δ |

<a name="NodalLoad+IndividualMassComponents"></a>

### nodalLoad.IndividualMassComponents(mass, distance)
Adds individual mass components to load

**Kind**: instance method of [<code>NodalLoad</code>](#NodalLoad)  

| Param | Type | Description |
| --- | --- | --- |
| mass | <code>Array</code> | mass [MX,MY,MZ], example [0.1,0.2,0] |
| distance | <code>Number</code> | mass_moment_of_inertia [IX,IY,IZ], example [0.1,0.2,0]			- |

