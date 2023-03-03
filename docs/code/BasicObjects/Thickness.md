---
title: Thickness
---

# Thickness

<a name="Thickness"></a>

## Thickness
**Kind**: global class  

* [Thickness](#Thickness)
    * [new Thickness(no, name, material, uniform_thickness_d, comment, params)](#new_Thickness_new)
    * [.Uniform(no, name, material, thickness, comment, params)](#Thickness+Uniform)
    * [.Variable_3Nodes(no, name, material, thicknessProperties, comment, params)](#Thickness+Variable_3Nodes)
    * [.Variable_2NodesAndDirection(no, name, material, thicknessProperties, comment, params)](#Thickness+Variable_2NodesAndDirection)
    * [.Variable_4SurfaceCorners(no, name, material, thicknessProperties, comment, params)](#Thickness+Variable_4SurfaceCorners)
    * [.Variable_Circle(no, name, material, thicknessProperties, comment, params)](#Thickness+Variable_Circle)
    * [.Layers(no, name, layers, comment, params)](#Thickness+Layers)
    * [.ShapeOrthotropy(no, name, layers, orthotropy_type, rotation_beta, consideration_of_self_weight, parameters, comment, params)](#Thickness+ShapeOrthotropy)
    * [.StiffnessMatrix(no, name, rotation_beta, consideration_of_self_weight, coefficient_of_thermal_expansion, stiffness_matrix, comment, params)](#Thickness+StiffnessMatrix)

<a name="new_Thickness_new"></a>

### new Thickness(no, name, material, uniform_thickness_d, comment, params)
Create Thickness

**Returns**: Thickness  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| material | <code>int</code> | Number of material |
| uniform_thickness_d | <code>number</code> | Uniform thickness in meters. |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+Uniform"></a>

### thickness.Uniform(no, name, material, thickness, comment, params)
Create Uniform thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| material | <code>int</code> | Number of material |
| thickness | <code>number</code> | Properties of thickness in format [thickness] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+Variable_3Nodes"></a>

### thickness.Variable\_3Nodes(no, name, material, thicknessProperties, comment, params)
Create Variable - 3 Nodes thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| material | <code>int</code> | Number of material |
| thicknessProperties | <code>array</code> | Properties of thickness [thickness_1,node_1,thickness_2,node_2,thickness_3,node_3] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+Variable_2NodesAndDirection"></a>

### thickness.Variable\_2NodesAndDirection(no, name, material, thicknessProperties, comment, params)
Create Variable - 2 Nodes and Direction thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| material | <code>int</code> | Number of material |
| thicknessProperties | <code>array</code> | Properties of thickness [thickness_1,node_1,thickness_2,node_2,direction] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+Variable_4SurfaceCorners"></a>

### thickness.Variable\_4SurfaceCorners(no, name, material, thicknessProperties, comment, params)
Create Variable - 4 Surface Corners thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| material | <code>int</code> | Number of material |
| thicknessProperties | <code>array</code> | Properties of thickness [thickness_1,node_1,thickness_2,node_2,thickness_3,node_3,thickness_4,node_4] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+Variable_Circle"></a>

### thickness.Variable\_Circle(no, name, material, thicknessProperties, comment, params)
Create Variable - Circle thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| material | <code>int</code> | Number of material |
| thicknessProperties | <code>array</code> | Properties of thickness [thickness_circle_center,thickness_circle_line] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+Layers"></a>

### thickness.Layers(no, name, layers, comment, params)
Create Layers thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| layers | <code>array</code> | List of layers [[material,thickness,angle,comment],] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+ShapeOrthotropy"></a>

### thickness.ShapeOrthotropy(no, name, layers, orthotropy_type, rotation_beta, consideration_of_self_weight, parameters, comment, params)
Create Shape Orthotropy thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| layers | <code>array</code> | List of layers |
| orthotropy_type | <code>string</code> | Orthotropy Type |
| rotation_beta | <code>number</code> | Rotation about Z-axis of surface (Degree) |
| consideration_of_self_weight | <code>string</code> | Self-Weight definition |
| parameters | <code>array</code> | Parameters of Shame Orthotropy |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

<a name="Thickness+StiffnessMatrix"></a>

### thickness.StiffnessMatrix(no, name, rotation_beta, consideration_of_self_weight, coefficient_of_thermal_expansion, stiffness_matrix, comment, params)
Create Stiffness Matrix thickness

**Kind**: instance method of [<code>Thickness</code>](#Thickness)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Thickness |
| name | <code>string</code> | Name of the Thickness |
| rotation_beta | <code>number</code> | Rotation about Z-axis of surface (Degree) |
| consideration_of_self_weight | <code>string</code> | Self-Weight definition |
| coefficient_of_thermal_expansion | <code>array</code> | Coefficient of thermal expansion |
| stiffness_matrix | <code>array</code> | Stiffness Matrix [[D11,D12,D13,D22,D23,D33],....] |
| comment | <code>string</code> | Comment for the Thickness |
| params | <code>dictionary</code> | Parameters of the Thickness |

