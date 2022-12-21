---
title: MemberDefinableStiffness
---

# MemberDefinableStiffness

<a name="MemberDefinableStiffness"></a>

## MemberDefinableStiffness
**Kind**: global class  

* [MemberDefinableStiffness](#MemberDefinableStiffness)
    * [new MemberDefinableStiffness(no, member_list, comment, params)](#new_MemberDefinableStiffness_new)
    * [.TorsionalAndBendingStiffness(torsional_stiffness, bending_stiffness_y, bending_stiffness_z)](#MemberDefinableStiffness+TorsionalAndBendingStiffness)
    * [.AxialAndShearStiffness(axial_stiffness, shear_stiffness_y, shear_stiffness_z)](#MemberDefinableStiffness+AxialAndShearStiffness)
    * [.SelfWeightAndSectionArea(specific_weight, section_area)](#MemberDefinableStiffness+SelfWeightAndSectionArea)
    * [.MainAxesRotation(rotation)](#MemberDefinableStiffness+MainAxesRotation)
    * [.ThermalExpansionCoefficient(thermal_expansion, width, height)](#MemberDefinableStiffness+ThermalExpansionCoefficient)

<a name="new_MemberDefinableStiffness_new"></a>

### new MemberDefinableStiffness(no, member_list, comment, params)
Creates member definable stiffness

**Returns**: <code>Object</code> - Created member definable stiffness  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member definable stiffness, can be undefined |
| member_list | <code>Array</code> | Assigned members, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member definable stiffness parameters, can be undefined |

<a name="MemberDefinableStiffness+TorsionalAndBendingStiffness"></a>

### memberDefinableStiffness.TorsionalAndBendingStiffness(torsional_stiffness, bending_stiffness_y, bending_stiffness_z)
Sets torsional and bending stiffness parameters

**Kind**: instance method of [<code>MemberDefinableStiffness</code>](#MemberDefinableStiffness)  

| Param | Type | Description |
| --- | --- | --- |
| torsional_stiffness | <code>Number</code> | Torsional stiffness |
| bending_stiffness_y | <code>Number</code> | Bending stiffness Y |
| bending_stiffness_z | <code>Number</code> | Bending stiffness Z |

<a name="MemberDefinableStiffness+AxialAndShearStiffness"></a>

### memberDefinableStiffness.AxialAndShearStiffness(axial_stiffness, shear_stiffness_y, shear_stiffness_z)
Sets axial and shear stiffness parameters

**Kind**: instance method of [<code>MemberDefinableStiffness</code>](#MemberDefinableStiffness)  

| Param | Type | Description |
| --- | --- | --- |
| axial_stiffness | <code>Number</code> | Axial stiffness |
| shear_stiffness_y | <code>Number</code> | Shear stiffness Y |
| shear_stiffness_z | <code>Number</code> | Shear stiffness Z |

<a name="MemberDefinableStiffness+SelfWeightAndSectionArea"></a>

### memberDefinableStiffness.SelfWeightAndSectionArea(specific_weight, section_area)
Sets self weight stiffness parameters

**Kind**: instance method of [<code>MemberDefinableStiffness</code>](#MemberDefinableStiffness)  

| Param | Type | Description |
| --- | --- | --- |
| specific_weight | <code>Number</code> | Specific weight |
| section_area | <code>Number</code> | Section area |

<a name="MemberDefinableStiffness+MainAxesRotation"></a>

### memberDefinableStiffness.MainAxesRotation(rotation)
Sets main axes rotation parameter

**Kind**: instance method of [<code>MemberDefinableStiffness</code>](#MemberDefinableStiffness)  

| Param | Type | Description |
| --- | --- | --- |
| rotation | <code>Number</code> | Rotation |

<a name="MemberDefinableStiffness+ThermalExpansionCoefficient"></a>

### memberDefinableStiffness.ThermalExpansionCoefficient(thermal_expansion, width, height)
Sets coefficient of thermal expansion stiffness parameters

**Kind**: instance method of [<code>MemberDefinableStiffness</code>](#MemberDefinableStiffness)  

| Param | Type | Description |
| --- | --- | --- |
| thermal_expansion | <code>Number</code> | Thermal expansion |
| width | <code>Number</code> | Width |
| height | <code>Number</code> | Height |

