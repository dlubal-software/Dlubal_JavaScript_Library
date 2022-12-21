---
title: ImposedLineDeformation
---

# ImposedLineDeformation

<a name="ImposedLineDeformation"></a>

## ImposedLineDeformation
**Kind**: global class  

* [ImposedLineDeformation](#ImposedLineDeformation)
    * [new ImposedLineDeformation(no, load_case, lines, comment, params)](#new_ImposedLineDeformation_new)
    * [.Set(no, load_case, lines, displacement_line_start_x, displacement_line_start_y, displacement_line_start_z, displacement_line_end_x, displacement_line_end_y, displacement_line_end_z, rotation_line_start, rotation_line_end, comment, params)](#ImposedLineDeformation+Set) ⇒ <code>Object</code>

<a name="new_ImposedLineDeformation_new"></a>

### new ImposedLineDeformation(no, load_case, lines, comment, params)
Creates imposed line deformation

**Returns**: <code>Object</code> - Created imposed line deformation  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of imposed line deformation, can be undefined |
| load_case | <code>Object</code> | Load case |
| lines | <code>Array</code> | List of lines indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="ImposedLineDeformation+Set"></a>

### imposedLineDeformation.Set(no, load_case, lines, displacement_line_start_x, displacement_line_start_y, displacement_line_start_z, displacement_line_end_x, displacement_line_end_y, displacement_line_end_z, rotation_line_start, rotation_line_end, comment, params) ⇒ <code>Object</code>
Creates imposed line deformation

**Kind**: instance method of [<code>ImposedLineDeformation</code>](#ImposedLineDeformation)  
**Returns**: <code>Object</code> - Created imposed nodal deformation  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of imposed line deformation, can be undefined |
| load_case | <code>Object</code> | Load case |
| lines | <code>Array</code> | List of lines indexes |
| displacement_line_start_x | <code>Number</code> | Imposed displacement at line start ux,i |
| displacement_line_start_y | <code>Number</code> | Imposed displacement at line start uy,i, can be undefined |
| displacement_line_start_z | <code>Number</code> | Imposed displacement at line start uz,i, can be undefined |
| displacement_line_end_x | <code>Number</code> | Imposed displacement at line end ux,j, can be undefined |
| displacement_line_end_y | <code>Number</code> | Imposed displacement at line end uy,i, can be undefined |
| displacement_line_end_z | <code>Number</code> | Imposed displacement at line end uz,i, can be undefined |
| rotation_line_start | <code>Number</code> | Imposed rotation at line start ϕx,i, can be undefined |
| rotation_line_end | <code>Number</code> | Imposed rotation at line end ϕx,j, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

