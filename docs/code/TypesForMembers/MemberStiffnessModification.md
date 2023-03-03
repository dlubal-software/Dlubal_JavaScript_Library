---
title: MemberStiffnessModification
---

# MemberStiffnessModification

## Classes

<dl>
<dt><a href="#MemberStiffnessModification">MemberStiffnessModification</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setConcreteStructuresComponentType">setConcreteStructuresComponentType(member_stiffness_modification, component_type)</a></dt>
<dd><p>Sets concrete structures parameters (private)</p>
</dd>
</dl>

<a name="MemberStiffnessModification"></a>

## MemberStiffnessModification
**Kind**: global class  

* [MemberStiffnessModification](#MemberStiffnessModification)
    * [new MemberStiffnessModification(no, structure_modifications, comment, params)](#new_MemberStiffnessModification_new)
    * [.TotalStiffnessFactor(total_stiffness)](#MemberStiffnessModification+TotalStiffnessFactor)
    * [.PartialStiffnessFactors(axial_stiffness, bending_stiffness_y, bending_stiffness_z, shear_stiffness_y, shear_stiffness_z, torsional_stiffness, weight)](#MemberStiffnessModification+PartialStiffnessFactors)
    * [.ConcreteStructuresAci(component_type)](#MemberStiffnessModification+ConcreteStructuresAci)
    * [.ConcreteStructuresCsa(component_type)](#MemberStiffnessModification+ConcreteStructuresCsa)
    * [.SteelStructuresAisc(determine_tau_b, design_method)](#MemberStiffnessModification+SteelStructuresAisc)
    * [.SteelStructuresCSA(determine_tau_b, axial_stiffness, bending_stiffness_y, bending_stiffness_z, shear_stiffness_y, shear_stiffness_z, torsional_stiffness)](#MemberStiffnessModification+SteelStructuresCSA)

<a name="new_MemberStiffnessModification_new"></a>

### new MemberStiffnessModification(no, structure_modifications, comment, params)
Creates member stiffness modification

**Returns**: <code>Object</code> - Created member stiffness modification  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member stiffness modification, can be undefined |
| structure_modifications | <code>Array</code> | Assigned structure modifications, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member stiffness modification parameters, can be undefined |

<a name="MemberStiffnessModification+TotalStiffnessFactor"></a>

### memberStiffnessModification.TotalStiffnessFactor(total_stiffness)
Sets total stiffness factor

**Kind**: instance method of [<code>MemberStiffnessModification</code>](#MemberStiffnessModification)  

| Param | Type | Description |
| --- | --- | --- |
| total_stiffness | <code>Number</code> | Total stiffness |

<a name="MemberStiffnessModification+PartialStiffnessFactors"></a>

### memberStiffnessModification.PartialStiffnessFactors(axial_stiffness, bending_stiffness_y, bending_stiffness_z, shear_stiffness_y, shear_stiffness_z, torsional_stiffness, weight)
Sets partial stiffness factors

**Kind**: instance method of [<code>MemberStiffnessModification</code>](#MemberStiffnessModification)  

| Param | Type | Description |
| --- | --- | --- |
| axial_stiffness | <code>Number</code> | Axial stiffness, can be undefined |
| bending_stiffness_y | <code>Number</code> | Bending stiffness Y, can be undefined |
| bending_stiffness_z | <code>Number</code> | Bending stiffness Z, can be undefined |
| shear_stiffness_y | <code>Number</code> | Shear stiffness Y, can be undefined |
| shear_stiffness_z | <code>Number</code> | Shear stiffness Z, can be undefined |
| torsional_stiffness | <code>Number</code> | Torsional stiffness, can be undefined |
| weight | <code>Number</code> | Weight, can be undefined |

<a name="MemberStiffnessModification+ConcreteStructuresAci"></a>

### memberStiffnessModification.ConcreteStructuresAci(component_type)
Sets concrete structure ACI

**Kind**: instance method of [<code>MemberStiffnessModification</code>](#MemberStiffnessModification)  

| Param | Type | Description |
| --- | --- | --- |
| component_type | <code>Number</code> | Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined |

<a name="MemberStiffnessModification+ConcreteStructuresCsa"></a>

### memberStiffnessModification.ConcreteStructuresCsa(component_type)
Sets concrete structure CSA

**Kind**: instance method of [<code>MemberStiffnessModification</code>](#MemberStiffnessModification)  

| Param | Type | Description |
| --- | --- | --- |
| component_type | <code>Number</code> | Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined |

<a name="MemberStiffnessModification+SteelStructuresAisc"></a>

### memberStiffnessModification.SteelStructuresAisc(determine_tau_b, design_method)
Sets steel structures AISC

**Kind**: instance method of [<code>MemberStiffnessModification</code>](#MemberStiffnessModification)  

| Param | Type | Description |
| --- | --- | --- |
| determine_tau_b | <code>Number</code> | Determine τb: Iterative (1), Set to 1 (2). Can be undefined. |
| design_method | <code>Number</code> | Design method: LRFD (1), ASD (2). Can be undefined. If determine τb has "Set to 1" value, must be undefined. |

<a name="MemberStiffnessModification+SteelStructuresCSA"></a>

### memberStiffnessModification.SteelStructuresCSA(determine_tau_b, axial_stiffness, bending_stiffness_y, bending_stiffness_z, shear_stiffness_y, shear_stiffness_z, torsional_stiffness)
,Sets steel structures CSA

**Kind**: instance method of [<code>MemberStiffnessModification</code>](#MemberStiffnessModification)  

| Param | Type | Description |
| --- | --- | --- |
| determine_tau_b | <code>Number</code> | Determine τb: Iterative (1), Set to 1 (2). Can be undefined. |
| axial_stiffness | <code>Number</code> | Axial stiffness multiplier factor, can be undefined. If defined, apply τb is set to true. |
| bending_stiffness_y | <code>Number</code> | Bending stiffness multiplier factors Z, can be undefined. If defined, apply τb is set to true. |
| bending_stiffness_z | <code>Number</code> | Bending stiffness multiplier factors Y, can be undefined. If defined, apply τb is set to true. |
| shear_stiffness_y | <code>Number</code> | Shear stiffness Y, can be undefined. If defined, apply τb is set to true. |
| shear_stiffness_z | <code>Number</code> | Shear stiffness Z, can be undefined. If defined, apply τb is set to true. |
| torsional_stiffness | <code>Number</code> | Torsional stiffness, can be undefined. If defined, apply τb is set to true. |

<a name="setConcreteStructuresComponentType"></a>

## setConcreteStructuresComponentType(member_stiffness_modification, component_type)
Sets concrete structures parameters (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| member_stiffness_modification | <code>Object</code> | Member stiffness modification to set |
| component_type | <code>Number</code> | Component type: Columns (1), Walls uncracked (2), Walls cracked (3), Beams (4), Flat plates and flat stabs (5). Can be undefined |

