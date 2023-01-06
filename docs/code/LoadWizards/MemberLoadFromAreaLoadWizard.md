---
title: MemberLoadFromAreaLoadWizard
---

# MemberLoadFromAreaLoadWizard

## Classes

<dl>
<dt><a href="#MemberLoadFromAreaLoadWizard">MemberLoadFromAreaLoadWizard</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseMemberLoadFromAreaLoadWizard">createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params)</a> ⇒</dt>
<dd><p>Creates member load wizard (private)</p>
</dd>
<dt><a href="#setMemberLoadFromAreaLoadWizardDistribution">setMemberLoadFromAreaLoadWizardDistribution(member_wizard, load_distribution, load_distribution_values)</a> ⇒</dt>
<dd><p>Sets load distribution to member load wizard (private)</p>
</dd>
</dl>

<a name="MemberLoadFromAreaLoadWizard"></a>

## MemberLoadFromAreaLoadWizard
**Kind**: global class  

* [MemberLoadFromAreaLoadWizard](#MemberLoadFromAreaLoadWizard)
    * [new MemberLoadFromAreaLoadWizard(no, load_case, comment, params)](#new_MemberLoadFromAreaLoadWizard_new)
    * [.Uniform(no, load_case, uniform_magnitude, coordinate_system, load_direction, comment, params)](#MemberLoadFromAreaLoadWizard+Uniform)
    * [.Linear(no, load_case, magnitude_1, node_1, magnitude_2, node_2, magnitude_3, node_3, coordinate_system, load_direction, comment, params)](#MemberLoadFromAreaLoadWizard+Linear)
    * [.VaryingInX(no, load_case, load_distribution_values, coordinate_system, load_direction, comment, params)](#MemberLoadFromAreaLoadWizard+VaryingInX)
    * [.VaryingInY(no, load_case, load_distribution_values, coordinate_system, load_direction, comment, params)](#MemberLoadFromAreaLoadWizard+VaryingInY)
    * [.VaryingInZ(no, load_case, load_distribution_values, coordinate_system, load_direction, comment, params)](#MemberLoadFromAreaLoadWizard+VaryingInZ)
    * [.SetCornerNodes(corner_nodes)](#MemberLoadFromAreaLoadWizard+SetCornerNodes)
    * [.SetExcludedMembers(excluded_members, excluded_parallel_members)](#MemberLoadFromAreaLoadWizard+SetExcludedMembers)
    * [.LockForNewMembers(lock_for_new_members)](#MemberLoadFromAreaLoadWizard+LockForNewMembers)
    * [.SmoothConcentratedLoad(smooth_punctual_load_enabled)](#MemberLoadFromAreaLoadWizard+SmoothConcentratedLoad)
    * [.ConsiderMemberEccentricity(consider_member_eccentricity)](#MemberLoadFromAreaLoadWizard+ConsiderMemberEccentricity)
    * [.ConsiderSectionDistribution(consider_section_distribution)](#MemberLoadFromAreaLoadWizard+ConsiderSectionDistribution)
    * [.AbsoluteToleranceForMembersOnPlane(absolute_tolerance)](#MemberLoadFromAreaLoadWizard+AbsoluteToleranceForMembersOnPlane)
    * [.RelativeToleranceForMembersOnPlane(relative_tolerance)](#MemberLoadFromAreaLoadWizard+RelativeToleranceForMembersOnPlane)
    * [.AbsoluteToleranceForNodesOnLine(absolute_tolerance)](#MemberLoadFromAreaLoadWizard+AbsoluteToleranceForNodesOnLine)
    * [.RelativeToleranceForNodesOnLine(relative_tolerance)](#MemberLoadFromAreaLoadWizard+RelativeToleranceForNodesOnLine)

<a name="new_MemberLoadFromAreaLoadWizard_new"></a>

### new MemberLoadFromAreaLoadWizard(no, load_case, comment, params)
Creates member load wizard


| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="MemberLoadFromAreaLoadWizard+Uniform"></a>

### memberLoadFromAreaLoadWizard.Uniform(no, load_case, uniform_magnitude, coordinate_system, load_direction, comment, params)
Creates uniform member load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| uniform_magnitude | <code>Number</code> | Uniform load magnitude |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters |

<a name="MemberLoadFromAreaLoadWizard+Linear"></a>

### memberLoadFromAreaLoadWizard.Linear(no, load_case, magnitude_1, node_1, magnitude_2, node_2, magnitude_3, node_3, coordinate_system, load_direction, comment, params)
Creates linear member load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| magnitude_1 | <code>Number</code> | First area load magnitude |
| node_1 | <code>Number</code> | Index of first node |
| magnitude_2 | <code>Number</code> | Second area load magnitude |
| node_2 | <code>Number</code> | Index of second node |
| magnitude_3 | <code>Number</code> | Third area load magnitude |
| node_3 | <code>Number</code> | Index of third node |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters |

<a name="MemberLoadFromAreaLoadWizard+VaryingInX"></a>

### memberLoadFromAreaLoadWizard.VaryingInX(no, load_case, load_distribution_values, coordinate_system, load_direction, comment, params)
Creates varying in X member load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load wizard |
| load_case | <code>Object</code> | Load case |
| load_distribution_values | <code>Array</code> | Load distribution values ([Y1, ΔY1, p1, ... Yn, ΔYn, pn]) |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters |

<a name="MemberLoadFromAreaLoadWizard+VaryingInY"></a>

### memberLoadFromAreaLoadWizard.VaryingInY(no, load_case, load_distribution_values, coordinate_system, load_direction, comment, params)
Creates varying in Y member load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load wizard |
| load_case | <code>Object</code> | Load case |
| load_distribution_values | <code>Array</code> | Load distribution values ([Y1, ΔY1, p1, ... Yn, ΔYn, pn]) |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters |

<a name="MemberLoadFromAreaLoadWizard+VaryingInZ"></a>

### memberLoadFromAreaLoadWizard.VaryingInZ(no, load_case, load_distribution_values, coordinate_system, load_direction, comment, params)
Creates varying in Z member load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load wizard |
| load_case | <code>Object</code> | Load case |
| load_distribution_values | <code>Array</code> | Load distribution values ([Y1, ΔY1, p1, ... Yn, ΔYn, pn]) |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters |

<a name="MemberLoadFromAreaLoadWizard+SetCornerNodes"></a>

### memberLoadFromAreaLoadWizard.SetCornerNodes(corner_nodes)
Sets corner nodes for member load from area load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| corner_nodes | <code>Array</code> | Corner nodes (["1,2,3", "4-8", ...]) |

<a name="MemberLoadFromAreaLoadWizard+SetExcludedMembers"></a>

### memberLoadFromAreaLoadWizard.SetExcludedMembers(excluded_members, excluded_parallel_members)
Sets excluded members for member load from area load wizard

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| excluded_members | <code>Array</code> | Single members |
| excluded_parallel_members | <code>Array</code> | Members parallel to member |

<a name="MemberLoadFromAreaLoadWizard+LockForNewMembers"></a>

### memberLoadFromAreaLoadWizard.LockForNewMembers(lock_for_new_members)
Sets lock for new members

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| lock_for_new_members | <code>Boolean</code> | Lock for new members, can be undefined (true as default) |

<a name="MemberLoadFromAreaLoadWizard+SmoothConcentratedLoad"></a>

### memberLoadFromAreaLoadWizard.SmoothConcentratedLoad(smooth_punctual_load_enabled)
Sets smooth concentrated load

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| smooth_punctual_load_enabled | <code>Boolean</code> | Smooth concentrated load enabled, can be undefined (true as default) |

<a name="MemberLoadFromAreaLoadWizard+ConsiderMemberEccentricity"></a>

### memberLoadFromAreaLoadWizard.ConsiderMemberEccentricity(consider_member_eccentricity)
Sets consider member eccentricity

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| consider_member_eccentricity | <code>Boolean</code> | Consider member eccentricity, can be undefined (true as default) |

<a name="MemberLoadFromAreaLoadWizard+ConsiderSectionDistribution"></a>

### memberLoadFromAreaLoadWizard.ConsiderSectionDistribution(consider_section_distribution)
Sets consider section distribution

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| consider_section_distribution | <code>Boolean</code> | Consider section distribution, can be undefined (true as default) |

<a name="MemberLoadFromAreaLoadWizard+AbsoluteToleranceForMembersOnPlane"></a>

### memberLoadFromAreaLoadWizard.AbsoluteToleranceForMembersOnPlane(absolute_tolerance)
Sets absolute tolerance for member on plane

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| absolute_tolerance | <code>Number</code> | Absolute tolerance by distance, can be undefined (0.0005 as default) |

<a name="MemberLoadFromAreaLoadWizard+RelativeToleranceForMembersOnPlane"></a>

### memberLoadFromAreaLoadWizard.RelativeToleranceForMembersOnPlane(relative_tolerance)
Sets relative tolerance for member on plane

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| relative_tolerance | <code>Number</code> | Relative tolerance by angle, can be undefined (1.0 by default) |

<a name="MemberLoadFromAreaLoadWizard+AbsoluteToleranceForNodesOnLine"></a>

### memberLoadFromAreaLoadWizard.AbsoluteToleranceForNodesOnLine(absolute_tolerance)
Sets absolute tolerance for nodes on line

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| absolute_tolerance | <code>Number</code> | Absolute tolerance by distance, can be undefined (0.0005 as default) |

<a name="MemberLoadFromAreaLoadWizard+RelativeToleranceForNodesOnLine"></a>

### memberLoadFromAreaLoadWizard.RelativeToleranceForNodesOnLine(relative_tolerance)
Sets relative tolerance for nodes on line

**Kind**: instance method of [<code>MemberLoadFromAreaLoadWizard</code>](#MemberLoadFromAreaLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| relative_tolerance | <code>Number</code> | Relative tolerance by angle, can be undefined (1.0 by default) |

<a name="createBaseMemberLoadFromAreaLoadWizard"></a>

## createBaseMemberLoadFromAreaLoadWizard(no, load_case, comment, params) ⇒
Creates member load wizard (private)

**Kind**: global function  
**Returns**: Created member load wizard  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| comment | <code>String</code> | Comment |
| params | <code>Object</code> | Additional parameters |

<a name="setMemberLoadFromAreaLoadWizardDistribution"></a>

## setMemberLoadFromAreaLoadWizardDistribution(member_wizard, load_distribution, load_distribution_values) ⇒
Sets load distribution to member load wizard (private)

**Kind**: global function  
**Returns**: Modified member load wizard  

| Param | Type | Description |
| --- | --- | --- |
| member_wizard | <code>Object</code> | Member load wizard |
| load_distribution | <code>Number</code> | Load distribution |
| load_distribution_values | <code>Array</code> | Load distribution values |

