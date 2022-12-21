---
title: ImposedNodalDeformation
---

# ImposedNodalDeformation

<a name="ImposedNodalDeformation"></a>

## ImposedNodalDeformation
**Kind**: global class  

* [ImposedNodalDeformation](#ImposedNodalDeformation)
    * [new ImposedNodalDeformation(no, load_case, nodes, comment, params)](#new_ImposedNodalDeformation_new)
    * [.Set(no, load_case, nodes, imposed_displacement_x, imposed_displacement_y, imposed_displacement_z, imposed_rotation_x, imposed_rotation_y, imposed_rotation_z, comment, params)](#ImposedNodalDeformation+Set) ⇒ <code>Object</code>

<a name="new_ImposedNodalDeformation_new"></a>

### new ImposedNodalDeformation(no, load_case, nodes, comment, params)
Creates imposed nodal deformation

**Returns**: <code>Object</code> - Created imposed nodal deformation  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of imposed nodal deformation, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of nodes indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="ImposedNodalDeformation+Set"></a>

### imposedNodalDeformation.Set(no, load_case, nodes, imposed_displacement_x, imposed_displacement_y, imposed_displacement_z, imposed_rotation_x, imposed_rotation_y, imposed_rotation_z, comment, params) ⇒ <code>Object</code>
Creates imposed nodal deformation

**Kind**: instance method of [<code>ImposedNodalDeformation</code>](#ImposedNodalDeformation)  
**Returns**: <code>Object</code> - Created imposed nodal deformation  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of imposed nodal deformation, can be undefined |
| load_case | <code>Object</code> | Load case |
| nodes | <code>Array</code> | List of nodes indexes |
| imposed_displacement_x | <code>Number</code> | Imposed displacement uX' |
| imposed_displacement_y | <code>Number</code> | Imposed displacement uY', can be undefined |
| imposed_displacement_z | <code>Number</code> | Imposed displacement uZ', can be undefined |
| imposed_rotation_x | <code>Number</code> | Imposed rotation ϕX', can be undefined |
| imposed_rotation_y | <code>Number</code> | Imposed rotation ϕY', can be undefined |
| imposed_rotation_z | <code>Number</code> | Imposed rotation ϕZ', can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

