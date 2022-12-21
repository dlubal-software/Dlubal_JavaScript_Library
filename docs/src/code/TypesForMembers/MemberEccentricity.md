---
title: MemberEccentricity
---

# MemberEccentricity

## Classes

<dl>
<dt><a href="#MemberEccentricity">MemberEccentricity</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setTransverseOffset">setTransverseOffset(memberEccentricity, reference_type, reference, reference_node_index, alignment_type)</a></dt>
<dd><p>Sets transverse offset (private)</p>
</dd>
<dt><a href="#createMemberEccentricity">createMemberEccentricity(no, members_start_list, members_end_list, comment, params)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates member eccentricity</p>
</dd>
<dt><a href="#setRelativeValues">setRelativeValues(member_eccentricity, alignment_type)</a></dt>
<dd><p>Sets member eccentricity for relative to section type (private)</p>
</dd>
<dt><a href="#getAlignmentParts">getAlignmentParts(alignment)</a> ⇒ <code>Array</code></dt>
<dd><p>Creates horizontal and vertical strings of alignment (private)</p>
</dd>
<dt><a href="#setAbsoluteValues">setAbsoluteValues(memberEccentricity, offset_x, offset_y, offset_z, coordinate_system)</a></dt>
<dd><p>Sets member eccentricity for absolute type (private)</p>
</dd>
</dl>

<a name="MemberEccentricity"></a>

## MemberEccentricity
**Kind**: global class  

* [MemberEccentricity](#MemberEccentricity)
    * [new MemberEccentricity(no, members_start_list, members_end_list, comment, params)](#new_MemberEccentricity_new)
    * [.RelativeToSection(no, members_start_list, members_end_list, alignment, comment, params)](#MemberEccentricity+RelativeToSection) ⇒ <code>Object</code>
    * [.Absolute(no, members_start_list, members_end_list, offset_x, offset_y, offset_z, coordinate_system, comment, params)](#MemberEccentricity+Absolute) ⇒ <code>Object</code>
    * [.RelativeAndAbsolute(no, members_start_list, members_end_list, offset_x, offset_y, offset_z, coordinate_system, alignment, comment, params)](#MemberEccentricity+RelativeAndAbsolute) ⇒ <code>Object</code>
    * [.AxialOffset(active)](#MemberEccentricity+AxialOffset)
    * [.HingeLocationAtNode(active)](#MemberEccentricity+HingeLocationAtNode)
    * [.TransverseOffsetMember(reference_member, reference_node, alignment)](#MemberEccentricity+TransverseOffsetMember)
    * [.TransverseOffsetSurface(reference_surface, alignment)](#MemberEccentricity+TransverseOffsetSurface)
    * [.TransverseOffsetNone()](#MemberEccentricity+TransverseOffsetNone)

<a name="new_MemberEccentricity_new"></a>

### new MemberEccentricity(no, members_start_list, members_end_list, comment, params)
Creates member eccentricity

**Returns**: <code>Object</code> - Created member eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member eccentricity, can be undefined |
| members_start_list | <code>Array</code> | Members start, can be undefined |
| members_end_list | <code>Array</code> | Members end, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member eccentricity parameters, can be undefined |

<a name="MemberEccentricity+RelativeToSection"></a>

### memberEccentricity.RelativeToSection(no, members_start_list, members_end_list, alignment, comment, params) ⇒ <code>Object</code>
Creates member eccentricity relative to section

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  
**Returns**: <code>Object</code> - Created member eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member eccentricity, can be undefined |
| members_start_list | <code>Array</code> | Member start |
| members_end_list | <code>Array</code> | Member end |
| alignment | <code>String</code> | Alignment, for more info look at private function setRelativeValues |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member eccentricity parameters, can be undefined |

<a name="MemberEccentricity+Absolute"></a>

### memberEccentricity.Absolute(no, members_start_list, members_end_list, offset_x, offset_y, offset_z, coordinate_system, comment, params) ⇒ <code>Object</code>
Creates absolute member eccentricity

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  
**Returns**: <code>Object</code> - Created member eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member eccentricity, can be undefined |
| members_start_list | <code>Array</code> | Members start |
| members_end_list | <code>Array</code> | Members end |
| offset_x | <code>Number</code> | Eccentricity in X |
| offset_y | <code>Number</code> | Eccentricity in Y |
| offset_z | <code>Number</code> | Eccentricity in Z |
| coordinate_system | <code>Number</code> | Coordinate system, can be undefined. Default value is "Local xyz". |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member eccentricity parameters, can be undefined |

<a name="MemberEccentricity+RelativeAndAbsolute"></a>

### memberEccentricity.RelativeAndAbsolute(no, members_start_list, members_end_list, offset_x, offset_y, offset_z, coordinate_system, alignment, comment, params) ⇒ <code>Object</code>
Creates absolute member eccentricity

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  
**Returns**: <code>Object</code> - Created member eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member eccentricity, can be undefined |
| members_start_list | <code>Array</code> | Members start |
| members_end_list | <code>Array</code> | Members end |
| offset_x | <code>Number</code> | Eccentricity in X |
| offset_y | <code>Number</code> | Eccentricity in Y |
| offset_z | <code>Number</code> | Eccentricity in Z |
| coordinate_system | <code>Number</code> | Coordinate system, can be undefined. Default value is "Local xyz". |
| alignment | <code>String</code> | Alignment, for more info look at private function setRelativeValues |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member eccentricity parameters, can be undefined |

<a name="MemberEccentricity+AxialOffset"></a>

### memberEccentricity.AxialOffset(active)
Sets axial offset from adjoining member

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  

| Param | Type | Description |
| --- | --- | --- |
| active | <code>Boolean</code> | True if undefined |

<a name="MemberEccentricity+HingeLocationAtNode"></a>

### memberEccentricity.HingeLocationAtNode(active)
Sets hinge location at node (if applied)

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  

| Param | Type | Description |
| --- | --- | --- |
| active | <code>Boolean</code> | True if undefined |

<a name="MemberEccentricity+TransverseOffsetMember"></a>

### memberEccentricity.TransverseOffsetMember(reference_member, reference_node, alignment)
Transverse offset from section of another member

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  

| Param | Type | Description |
| --- | --- | --- |
| reference_member | <code>Number</code> | Reference member |
| reference_node | <code>Number</code> | Reference member's node, can be undefined |
| alignment | <code>String</code> | Alignment, for more info look at private function setTransverseOffset |

<a name="MemberEccentricity+TransverseOffsetSurface"></a>

### memberEccentricity.TransverseOffsetSurface(reference_surface, alignment)
Transverse offset from section of another thickness of other surface

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  

| Param | Type | Description |
| --- | --- | --- |
| reference_surface | <code>Number</code> | Reference surface |
| alignment | <code>String</code> | Alignment, for more info look at private function setTransverseOffset |

<a name="MemberEccentricity+TransverseOffsetNone"></a>

### memberEccentricity.TransverseOffsetNone()
Set off transverse offset

**Kind**: instance method of [<code>MemberEccentricity</code>](#MemberEccentricity)  
<a name="setTransverseOffset"></a>

## setTransverseOffset(memberEccentricity, reference_type, reference, reference_node_index, alignment_type)
Sets transverse offset (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| memberEccentricity | <code>Object</code> | Member eccentricity to be set |
| reference_type | <code>String</code> | Reference type ("None", "Member", "Surface") |
| reference | <code>Number</code> | object index	Reference member or surface index |
| reference_node_index | <code>Number</code> | Reference member node index, in case of surface is undefined |
| alignment_type | <code>String</code> | For member offset:	SECTION_ALIGNMENT_LEFT_TOP, 																	SECTION_ALIGNMENT_CENTER_TOP, 																	SECTION_ALIGNMENT_RIGHT_TOP, 																	SECTION_ALIGNMENT_LEFT_CENTER, 																	SECTION_ALIGNMENT_CENTER_CENTER, 																	SECTION_ALIGNMENT_RIGHT_CENTER, 																	SECTION_ALIGNMENT_LEFT_BOTTOM, 																	SECTION_ALIGNMENT_CENTER_BOTTOM, 																	SECTION_ALIGNMENT_RIGHT_BOTTOM. 												For surface offset:	SECTION_ALIGNMENT_CENTER_TOP, 																	SECTION_ALIGNMENT_CENTER_CENTER, 																	SECTION_ALIGNMENT_CENTER_BOTTOM. |

<a name="createMemberEccentricity"></a>

## createMemberEccentricity(no, members_start_list, members_end_list, comment, params) ⇒ <code>Object</code>
Creates member eccentricity

**Kind**: global function  
**Returns**: <code>Object</code> - Created member eccentricity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member eccentricity, can be undefined |
| members_start_list | <code>Array</code> | Members start, can be undefined |
| members_end_list | <code>Array</code> | Members end, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member eccentricity parameters, can be undefined |

<a name="setRelativeValues"></a>

## setRelativeValues(member_eccentricity, alignment_type)
Sets member eccentricity for relative to section type (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| member_eccentricity | <code>Object</code> | Member eccentricity to be set |
| alignment_type | <code>String</code> | Alignment: 	SECTION_ALIGNMENT_LEFT_TOP, 														SECTION_ALIGNMENT_CENTER_TOP, 														SECTION_ALIGNMENT_RIGHT_TOP, 														SECTION_ALIGNMENT_LEFT_CENTER, 														SECTION_ALIGNMENT_CENTER_CENTER, 														SECTION_ALIGNMENT_RIGHT_CENTER, 														SECTION_ALIGNMENT_LEFT_BOTTOM, 														SECTION_ALIGNMENT_CENTER_BOTTOM, 														SECTION_ALIGNMENT_RIGHT_BOTTOM. |

<a name="getAlignmentParts"></a>

## getAlignmentParts(alignment) ⇒ <code>Array</code>
Creates horizontal and vertical strings of alignment (private)

**Kind**: global function  
**Returns**: <code>Array</code> - Horizontal and vertical strings of alignment  

| Param | Type | Description |
| --- | --- | --- |
| alignment | <code>String</code> | Alignment string |

<a name="setAbsoluteValues"></a>

## setAbsoluteValues(memberEccentricity, offset_x, offset_y, offset_z, coordinate_system)
Sets member eccentricity for absolute type (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| memberEccentricity | <code>Object</code> | Member eccentricity to be set |
| offset_x | <code>Number</code> | Eccentricity in X |
| offset_y | <code>Number</code> | Eccentricity in Y |
| offset_z | <code>Number</code> | Eccentricity in Z |
| coordinate_system | <code>Number</code> | Coordinate system, can be undefined. Default value is "Local xyz". |

