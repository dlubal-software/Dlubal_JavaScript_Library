---
title: Member
---

# Member

## Classes

<dl>
<dt><a href="#Member">Member</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setDistributionAtStart">setDistributionAtStart()</a></dt>
<dd><p>Support function for section distributions (private), more info can be find there</p>
</dd>
<dt><a href="#setDistributionAtEnd">setDistributionAtEnd()</a></dt>
<dd><p>Support function for section distributions (private), more info can be find there</p>
</dd>
<dt><a href="#setResultBeamObjects">setResultBeamObjects(member, param1_to_set, param2_to_set, value)</a> ⇒</dt>
<dd><p>Sets result beam objects</p>
</dd>
<dt><a href="#createBaseMember">createBaseMember(no, nodes_or_line, type, section_start, comment, params)</a> ⇒</dt>
<dd><p>Creates member (private)</p>
</dd>
</dl>

<a name="Member"></a>

## Member
**Kind**: global class  

* [Member](#Member)
    * [new Member(no, nodes_or_line, comment, params)](#new_Member_new)
    * [.GetNo()](#Member+GetNo) ⇒
    * [.GetMember()](#Member+GetMember) ⇒
    * [.Beam(no, nodes_or_line, section_start, comment, params)](#Member+Beam) ⇒
    * [.Rigid(no, nodes_or_line, comment, params)](#Member+Rigid) ⇒
    * [.Truss(no, nodes_or_line, section_start, comment, params)](#Member+Truss) ⇒
    * [.TrussOnlyN(no, nodes_or_line, section_start, comment, params)](#Member+TrussOnlyN) ⇒
    * [.Tension(no, nodes_or_line, section_start, comment, params)](#Member+Tension) ⇒
    * [.Compression(no, nodes_or_line, section_start, comment, params)](#Member+Compression) ⇒
    * [.Buckling(no, nodes_or_line, section_start, comment, params)](#Member+Buckling) ⇒
    * [.Cable(no, nodes_or_line, section_start, comment, params)](#Member+Cable) ⇒
    * [.ResultBeam(no, nodes_or_line, section_start, result_beam_integrate_stresses_and_forces, result_beam_parameters, included_objects, excluded_objects, comment, params)](#Member+ResultBeam) ⇒
    * [.DefinableStiffness(no, nodes_or_line, definable_stiffness, comment, params)](#Member+DefinableStiffness) ⇒
    * [.CouplingRigidRigid(no, nodes_or_line, comment, params)](#Member+CouplingRigidRigid) ⇒
    * [.CouplingRigidHinge(no, nodes_or_line, comment, params)](#Member+CouplingRigidHinge) ⇒
    * [.CouplingHingeRigid(no, nodes_or_line, comment, params)](#Member+CouplingHingeRigid) ⇒
    * [.CouplingHingeHinge(no, nodes_or_line, comment, params)](#Member+CouplingHingeHinge) ⇒
    * [.Rib(nodes_or_line, no, section_start, rib_alignment, surface_assignment_autodetect, align_axes, flange_dimensions, surfaces, comment, params)](#Member+Rib) ⇒
    * [.NodesOnMember(values)](#Member+NodesOnMember)
    * [.Hinges(member_start_hinge, member_end_hinge)](#Member+Hinges)
    * [.Eccentricities(member_start_eccentricity, member_end_eccentricity)](#Member+Eccentricities)
    * [.Supports(member_support)](#Member+Supports)
    * [.Nonlinearity(member_nonlinearity)](#Member+Nonlinearity)
    * [.ResultIntermediatePoints(member_result_intermediate_point)](#Member+ResultIntermediatePoints)
    * [.EndModifications(member_start, member_end)](#Member+EndModifications)
    * [.SectionDistributionUniform()](#Member+SectionDistributionUniform)
    * [.SectionDistributionLinear(section_start, section_end, section_alignment)](#Member+SectionDistributionLinear)
    * [.SectionDistributionTaperedAtBothSides(section_start, section_internal, section_end, reference_type, section_distance_from_start, section_distance_from_end, section_alignment)](#Member+SectionDistributionTaperedAtBothSides)
    * [.SectionDistributionTaperedAtStart(section_start, section_end, reference_type, section_distance_from_start, section_alignment)](#Member+SectionDistributionTaperedAtStart)
    * [.SectionDistributionTaperedAtEnd(section_start, section_end, reference_type, section_distance_from_end, section_alignment)](#Member+SectionDistributionTaperedAtEnd)
    * [.SectionDistributionSaddle(section_start, section_internal, section_end, reference_type, section_distance_from_start, section_alignment)](#Member+SectionDistributionSaddle)
    * [.SectionDistributionOffsetAtBothSides(section_start, section_internal, section_end, reference_type, section_offset_from_start, section_offset_from_end, section_alignment)](#Member+SectionDistributionOffsetAtBothSides)
    * [.SectionDistributionOffsetAtStart(section_start, section_end, reference_type, section_offset_from_start, section_alignment)](#Member+SectionDistributionOffsetAtStart)
    * [.SectionDistributionOffsetAtEnd(reference_type, section_offset_from_end, section_alignment)](#Member+SectionDistributionOffsetAtEnd)

<a name="new_Member_new"></a>

### new Member(no, nodes_or_line, comment, params)
Creates member

**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+GetNo"></a>

### member.GetNo() ⇒
**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Member's number  
<a name="Member+GetMember"></a>

### member.GetMember() ⇒
**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Member object  
<a name="Member+Beam"></a>

### member.Beam(no, nodes_or_line, section_start, comment, params) ⇒
Creates beam member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Rigid"></a>

### member.Rigid(no, nodes_or_line, comment, params) ⇒
Creates rigid member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Truss"></a>

### member.Truss(no, nodes_or_line, section_start, comment, params) ⇒
Creates truss member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+TrussOnlyN"></a>

### member.TrussOnlyN(no, nodes_or_line, section_start, comment, params) ⇒
Creates truss (only N) member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Tension"></a>

### member.Tension(no, nodes_or_line, section_start, comment, params) ⇒
Creates tension member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Compression"></a>

### member.Compression(no, nodes_or_line, section_start, comment, params) ⇒
Creates compression member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Buckling"></a>

### member.Buckling(no, nodes_or_line, section_start, comment, params) ⇒
Creates buckling member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Cable"></a>

### member.Cable(no, nodes_or_line, section_start, comment, params) ⇒
Creates cable member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+ResultBeam"></a>

### member.ResultBeam(no, nodes_or_line, section_start, result_beam_integrate_stresses_and_forces, result_beam_parameters, included_objects, excluded_objects, comment, params) ⇒
Create result beam member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| result_beam_integrate_stresses_and_forces | <code>String</code> | Stresses and forces type, can be undefined: 																			INTEGRATE_WITHIN_CUBOID_QUADRATIC 																			INTEGRATE_WITHIN_CUBOID_GENERAL 																			INTEGRATE_WITHIN_CYLINDER 																			INTEGRATE_FROM_LISTED_OBJECT |
| result_beam_parameters | <code>Array</code> | Result beam parameters, can be undefined 																			1 - [Yz] 																			2 - [Y+, Y-, Z+, Z-] 																			3 - [R] 																			4 - undefined |
| included_objects | <code>Array</code> | Included surfaces, members and solids, can be undefined ([true, [1, 2], true]: true = all objects, array of indexes = only specified objects) |
| excluded_objects | <code>Array</code> | Excluded surfaces, members and solids, can be undefined ([undefined, [1, 2], undefined]: array of indexes = only specified objects) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+DefinableStiffness"></a>

### member.DefinableStiffness(no, nodes_or_line, definable_stiffness, comment, params) ⇒
Create definable stiffness member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created definable stiffness member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| definable_stiffness | <code>Number</code> | Definable stiffness |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+CouplingRigidRigid"></a>

### member.CouplingRigidRigid(no, nodes_or_line, comment, params) ⇒
Create coupling rigid-rigid member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created coupling rigid-rigid member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+CouplingRigidHinge"></a>

### member.CouplingRigidHinge(no, nodes_or_line, comment, params) ⇒
Create coupling rigid-hinge member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created coupling rigid-hinge member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+CouplingHingeRigid"></a>

### member.CouplingHingeRigid(no, nodes_or_line, comment, params) ⇒
Create coupling hinge-rigid member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created coupling hinge-rigid member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+CouplingHingeHinge"></a>

### member.CouplingHingeHinge(no, nodes_or_line, comment, params) ⇒
Create coupling hinge-hinge member

**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: Created coupling hinge-hinge member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

<a name="Member+Rib"></a>

### member.Rib(nodes_or_line, no, section_start, rib_alignment, surface_assignment_autodetect, align_axes, flange_dimensions, surfaces, comment, params) ⇒
**Kind**: instance method of [<code>Member</code>](#Member)  
**Returns**: object Rib  

| Param | Type | Description |
| --- | --- | --- |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| no | <code>Number</code> | Index of member, can be undefined |
| section_start | <code>Number</code> | Section start. Section end is same as section start by default. To set section end specify distribution type. |
| rib_alignment | <code>String</code> | Alignment of rib - "ALIGNMENT_ON_Z_SIDE_NEGATIVE","ALIGNMENT_CENTRIC","ALIGNMENT_ON_Z_SIDE_POSITIVE","ALIGNMENT_USER_DEFINED_VIA_MEMBER_ECCENTRICITY" |
| surface_assignment_autodetect | <code>Boolean</code> |  |
| align_axes | <code>Boolean</code> |  |
| flange_dimensions | <code>Array</code> | two dimensional array each row could have form [end_ordinate,reference_length_definition_type,reference_length_width,width_minus_y_maximal,width_plus_y_maximal,reference_length,width_minus_y_integrative,width_plus_y_integrative] |
| surfaces | <code>Array</code> |  |
| comment | <code>String</code> |  |
| params | <code>Object</code> |  |

<a name="Member+NodesOnMember"></a>

### member.NodesOnMember(values)
Sets nodes on member

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | Nodes on member values in format [[node_1, reference_1, from_start_1, from_end1_1] ... [node_n, reference_n, from_start_n, from_end_1]] |

<a name="Member+Hinges"></a>

### member.Hinges(member_start_hinge, member_end_hinge)
Sets member start and/or member end hinges

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| member_start_hinge | <code>Number</code> | Member hinge object id at member start, can be undefined |
| member_end_hinge | <code>Number</code> | Member hinge object id at member end, can be undefined |

<a name="Member+Eccentricities"></a>

### member.Eccentricities(member_start_eccentricity, member_end_eccentricity)
Sets member start and/or member end eccentricities

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| member_start_eccentricity | <code>Number</code> | Member eccentricity object id at member start, can be undefined |
| member_end_eccentricity | <code>Number</code> | Member eccentricity object id at member end, can be undefined |

<a name="Member+Supports"></a>

### member.Supports(member_support)
Sets member supports

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| member_support | <code>Number</code> | Member supports object id |

<a name="Member+Nonlinearity"></a>

### member.Nonlinearity(member_nonlinearity)
Sets member nonlinearity

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| member_nonlinearity | <code>Number</code> | Member nonlinearity object id |

<a name="Member+ResultIntermediatePoints"></a>

### member.ResultIntermediatePoints(member_result_intermediate_point)
**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| member_result_intermediate_point | <code>Number</code> | member result intermediate point object id |

<a name="Member+EndModifications"></a>

### member.EndModifications(member_start, member_end)
Sets member start and/or member end extensions

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| member_start | <code>Array</code> | Member start values, can be undefined ([Δi, αi,y, αi,z]) |
| member_end | <code>Array</code> | Member end values, can be undefined ([Δj, αj,y, αj,z]) |

<a name="Member+SectionDistributionUniform"></a>

### member.SectionDistributionUniform()
Sets uniform section distribution

**Kind**: instance method of [<code>Member</code>](#Member)  
<a name="Member+SectionDistributionLinear"></a>

### member.SectionDistributionLinear(section_start, section_end, section_alignment)
Sets linear distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_end | <code>Number</code> | Number of section at end of member |
| section_alignment | <code>String</code> | section_alignment	Section alignment (Top, Centric, Bottom), can be undefined (centric as default) |

<a name="Member+SectionDistributionTaperedAtBothSides"></a>

### member.SectionDistributionTaperedAtBothSides(section_start, section_internal, section_end, reference_type, section_distance_from_start, section_distance_from_end, section_alignment)
Sets tapered at both sides distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_internal | <code>Number</code> | Number of section at internal point of member (between start and end) |
| section_end | <code>Number</code> | Number of section at end of member |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_distance_from_start | <code>Array</code> | Member distance ([distance, is_relative]), can be undefined |
| section_distance_from_end | <code>Array</code> | Member distance ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="Member+SectionDistributionTaperedAtStart"></a>

### member.SectionDistributionTaperedAtStart(section_start, section_end, reference_type, section_distance_from_start, section_alignment)
Sets tapered at start distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_end | <code>Number</code> | Number of section at end of member |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_distance_from_start | <code>Array</code> | Member distance ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="Member+SectionDistributionTaperedAtEnd"></a>

### member.SectionDistributionTaperedAtEnd(section_start, section_end, reference_type, section_distance_from_end, section_alignment)
Sets tapered at end distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_end | <code>Number</code> | Number of section at end of member |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_distance_from_end | <code>Array</code> | Member distance ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="Member+SectionDistributionSaddle"></a>

### member.SectionDistributionSaddle(section_start, section_internal, section_end, reference_type, section_distance_from_start, section_alignment)
Sets saddle distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_internal | <code>Number</code> | Number of section at internal point of member (between start and end) |
| section_end | <code>Number</code> | Number of section at end of member |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_distance_from_start | <code>Array</code> | Member distance ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="Member+SectionDistributionOffsetAtBothSides"></a>

### member.SectionDistributionOffsetAtBothSides(section_start, section_internal, section_end, reference_type, section_offset_from_start, section_offset_from_end, section_alignment)
Sets offset at both sides distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_internal | <code>Number</code> | Number of section at internal point of member (between start and end) |
| section_end | <code>Number</code> | Number of section at end of member |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_offset_from_start | <code>Array</code> | Member offset ([distance, is_relative]), can be undefined |
| section_offset_from_end | <code>Array</code> | Member offset ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="Member+SectionDistributionOffsetAtStart"></a>

### member.SectionDistributionOffsetAtStart(section_start, section_end, reference_type, section_offset_from_start, section_alignment)
Sets offset at start distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| section_start | <code>Number</code> | Number of section at start of member |
| section_end | <code>Number</code> | Number of section at end of member |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_offset_from_start | <code>Array</code> | Member offset ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="Member+SectionDistributionOffsetAtEnd"></a>

### member.SectionDistributionOffsetAtEnd(reference_type, section_offset_from_end, section_alignment)
Sets offset at end distribution

**Kind**: instance method of [<code>Member</code>](#Member)  

| Param | Type | Description |
| --- | --- | --- |
| reference_type | <code>String</code> | Reference type (L, XY, XZ), can be undefined |
| section_offset_from_end | <code>Array</code> | Member offset ([distance, is_relative]), can be undefined |
| section_alignment | <code>String</code> | Section alignment (Top, Centric, Bottom), can be undefined (top as default) |

<a name="setDistributionAtStart"></a>

## setDistributionAtStart()
Support function for section distributions (private), more info can be find there

**Kind**: global function  
<a name="setDistributionAtEnd"></a>

## setDistributionAtEnd()
Support function for section distributions (private), more info can be find there

**Kind**: global function  
<a name="setResultBeamObjects"></a>

## setResultBeamObjects(member, param1_to_set, param2_to_set, value) ⇒
Sets result beam objects

**Kind**: global function  
**Returns**: Modified member  

| Param | Type | Description |
| --- | --- | --- |
| member | <code>Object</code> | Member to be set |
| param1_to_set | <code>String</code> | Name of parameter for include/exclude "all" objects |
| param2_to_set | <code>String</code> | Name of parameter for include/exclude object's indexes |
| value | <code>Boolean/Array</code> | Value can be specified in two formats, as boolean or array with numbers |

<a name="createBaseMember"></a>

## createBaseMember(no, nodes_or_line, type, section_start, comment, params) ⇒
Creates member (private)

**Kind**: global function  
**Returns**: Created member  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member, can be undefined |
| nodes_or_line | <code>Array/Number</code> | List of node indexes or number of line |
| type | <code>String</code> | Type of member, can be undefined |
| section_start | <code>Number</code> | Section start, can be undefined. Section end is same as section start by default. To set section end specify distribution type. |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member's parameters, can be undefined |

