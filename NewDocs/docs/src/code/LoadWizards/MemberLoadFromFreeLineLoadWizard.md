---
title: MemberLoadFromFreeLineLoadWizard
---

# MemberLoadFromFreeLineLoadWizard

## Classes

<dl>
<dt><a href="#MemberLoadFromFreeLineLoadWizard">MemberLoadFromFreeLineLoadWizard</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseMemberLoadFromFreeLineLoadWizard">createBaseMemberLoadFromFreeLineLoadWizard(no, load_case, comment, params)</a> ⇒</dt>
<dd><p>Creates member load wizard (private)</p>
</dd>
<dt><a href="#setMemberLoadFromFreeLineLoadWizardDistribution">setMemberLoadFromFreeLineLoadWizardDistribution(member_wizard, load_distribution, load_distribution_values)</a> ⇒</dt>
<dd><p>Sets load distribution to member load wizard (private)</p>
</dd>
</dl>

<a name="MemberLoadFromFreeLineLoadWizard"></a>

## MemberLoadFromFreeLineLoadWizard
**Kind**: global class  

* [MemberLoadFromFreeLineLoadWizard](#MemberLoadFromFreeLineLoadWizard)
    * [new MemberLoadFromFreeLineLoadWizard(no, load_case, comment, params)](#new_MemberLoadFromFreeLineLoadWizard_new)
    * [.Uniform(no, load_case, uniform_magnitude, node_1, node_2, coordinate_system, load_direction, comment, params)](#MemberLoadFromFreeLineLoadWizard+Uniform)
    * [.Linear(no, load_case, magnitude_1, node_1, magnitude_2, node_2, coordinate_system, load_direction, comment, params)](#MemberLoadFromFreeLineLoadWizard+Linear)
    * [.AbsoluteToleranceForMembersOnPlane(absolute_tolerance)](#MemberLoadFromFreeLineLoadWizard+AbsoluteToleranceForMembersOnPlane)
    * [.RelativeToleranceForMembersOnPlane(relative_tolerance)](#MemberLoadFromFreeLineLoadWizard+RelativeToleranceForMembersOnPlane)
    * [.AbsoluteToleranceForNodesOnLine(absolute_tolerance)](#MemberLoadFromFreeLineLoadWizard+AbsoluteToleranceForNodesOnLine)
    * [.RelativeToleranceForNodesOnLine(relative_tolerance)](#MemberLoadFromFreeLineLoadWizard+RelativeToleranceForNodesOnLine)
    * [.ExcludedMembers(excluded_members, excluded_parallel_members)](#MemberLoadFromFreeLineLoadWizard+ExcludedMembers)
    * [.LockForNewMembers(lock_for_new_members)](#MemberLoadFromFreeLineLoadWizard+LockForNewMembers)
    * [.ConsiderMemberEccentricity(consider_member_eccentricity)](#MemberLoadFromFreeLineLoadWizard+ConsiderMemberEccentricity)
    * [.ConsiderSectionDistribution(consider_section_distribution)](#MemberLoadFromFreeLineLoadWizard+ConsiderSectionDistribution)

<a name="new_MemberLoadFromFreeLineLoadWizard_new"></a>

### new MemberLoadFromFreeLineLoadWizard(no, load_case, comment, params)
Creates member load wizard


| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="MemberLoadFromFreeLineLoadWizard+Uniform"></a>

### memberLoadFromFreeLineLoadWizard.Uniform(no, load_case, uniform_magnitude, node_1, node_2, coordinate_system, load_direction, comment, params)
Creates uniform member load wizard

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| uniform_magnitude | <code>Number</code> | Uniform load magnitude |
| node_1 | <code>Number</code> | Index of first node |
| node_2 | <code>Number</code> | Index of second node |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="MemberLoadFromFreeLineLoadWizard+Linear"></a>

### memberLoadFromFreeLineLoadWizard.Linear(no, load_case, magnitude_1, node_1, magnitude_2, node_2, coordinate_system, load_direction, comment, params)
Creates linear member load wizard

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| magnitude_1 | <code>Number</code> | First area load magnitude |
| node_1 | <code>Number</code> | Index of first node |
| magnitude_2 | <code>Number</code> | Second area load magnitude |
| node_2 | <code>Number</code> | Index of second node |
| coordinate_system | <code>Number</code> | Index of coordinate system, can be undefined (Global XYZ as default) |
| load_direction | <code>String</code> | Load direction, can be undefined (ZA as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="MemberLoadFromFreeLineLoadWizard+AbsoluteToleranceForMembersOnPlane"></a>

### memberLoadFromFreeLineLoadWizard.AbsoluteToleranceForMembersOnPlane(absolute_tolerance)
Sets absolute tolerance for member on plane

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| absolute_tolerance | <code>Number</code> | Absolute tolerance by distance, can be undefined (0.0005 as default) |

<a name="MemberLoadFromFreeLineLoadWizard+RelativeToleranceForMembersOnPlane"></a>

### memberLoadFromFreeLineLoadWizard.RelativeToleranceForMembersOnPlane(relative_tolerance)
Sets relative tolerance for member on plane

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| relative_tolerance | <code>Number</code> | Relative tolerance by angle, can be undefined (1.0 by default) |

<a name="MemberLoadFromFreeLineLoadWizard+AbsoluteToleranceForNodesOnLine"></a>

### memberLoadFromFreeLineLoadWizard.AbsoluteToleranceForNodesOnLine(absolute_tolerance)
Sets absolute tolerance for nodes on line

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| absolute_tolerance | <code>Number</code> | Absolute tolerance by distance, can be undefined (0.0005 as default) |

<a name="MemberLoadFromFreeLineLoadWizard+RelativeToleranceForNodesOnLine"></a>

### memberLoadFromFreeLineLoadWizard.RelativeToleranceForNodesOnLine(relative_tolerance)
Sets relative tolerance for nodes on line

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| relative_tolerance | <code>Number</code> | Relative tolerance by angle, can be undefined (1.0 by default) |

<a name="MemberLoadFromFreeLineLoadWizard+ExcludedMembers"></a>

### memberLoadFromFreeLineLoadWizard.ExcludedMembers(excluded_members, excluded_parallel_members)
Sets excluded members

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| excluded_members | <code>Array</code> | List of excluded member indexes, can be undefined |
| excluded_parallel_members | <code>Array</code> | List of excluded parallel members, can be undefined |

<a name="MemberLoadFromFreeLineLoadWizard+LockForNewMembers"></a>

### memberLoadFromFreeLineLoadWizard.LockForNewMembers(lock_for_new_members)
Sets lock for new members

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| lock_for_new_members | <code>Boolean</code> | Lock for new members, can be undefined (true as default) |

<a name="MemberLoadFromFreeLineLoadWizard+ConsiderMemberEccentricity"></a>

### memberLoadFromFreeLineLoadWizard.ConsiderMemberEccentricity(consider_member_eccentricity)
Sets consider member eccentricity

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| consider_member_eccentricity | <code>Boolean</code> | Consider member eccentricity, can be undefined (true as default) |

<a name="MemberLoadFromFreeLineLoadWizard+ConsiderSectionDistribution"></a>

### memberLoadFromFreeLineLoadWizard.ConsiderSectionDistribution(consider_section_distribution)
Sets consider section distribution

**Kind**: instance method of [<code>MemberLoadFromFreeLineLoadWizard</code>](#MemberLoadFromFreeLineLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| consider_section_distribution | <code>Boolean</code> | Consider section distribution, can be undefined (true as default) |

<a name="createBaseMemberLoadFromFreeLineLoadWizard"></a>

## createBaseMemberLoadFromFreeLineLoadWizard(no, load_case, comment, params) ⇒
Creates member load wizard (private)

**Kind**: global function  
**Returns**: Created member load wizard  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Member load wizard index, can be undefined |
| load_case | <code>Object</code> | Load case |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="setMemberLoadFromFreeLineLoadWizardDistribution"></a>

## setMemberLoadFromFreeLineLoadWizardDistribution(member_wizard, load_distribution, load_distribution_values) ⇒
Sets load distribution to member load wizard (private)

**Kind**: global function  
**Returns**: Modified member load wizard  

| Param | Type | Description |
| --- | --- | --- |
| member_wizard | <code>Object</code> | Member load wizard |
| load_distribution | <code>Number</code> | Load distribution |
| load_distribution_values | <code>Array</code> | Load distribution values |

