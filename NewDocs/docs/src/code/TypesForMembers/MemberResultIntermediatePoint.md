---
title: MemberResultIntermediatePoint
---

# MemberResultIntermediatePoint

## Classes

<dl>
<dt><a href="#MemberResultIntermediatePoint">MemberResultIntermediatePoint</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#DistancesAreAbsolute">DistancesAreAbsolute(memberResultIntermediatePoint, absolute)</a></dt>
<dd><p>Sets division ordinates as absolute (private)</p>
</dd>
</dl>

<a name="MemberResultIntermediatePoint"></a>

## MemberResultIntermediatePoint
**Kind**: global class  

* [MemberResultIntermediatePoint](#MemberResultIntermediatePoint)
    * [new MemberResultIntermediatePoint(no, members, comment, params)](#new_MemberResultIntermediatePoint_new)
    * [.UniformDistances(divisions_count, notes)](#MemberResultIntermediatePoint+UniformDistances)
    * [.DivisionOrdinates(division_ordinates, notes, absolute, clear_ordinates)](#MemberResultIntermediatePoint+DivisionOrdinates)

<a name="new_MemberResultIntermediatePoint_new"></a>

### new MemberResultIntermediatePoint(no, members, comment, params)
Creates member result intermediate point

**Returns**: <code>Object</code> - Created member result intermediate point  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member definable stiffness, can be undefined |
| members | <code>Array</code> | Assigned members, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member result intermediate point parameters, can be undefined |

<a name="MemberResultIntermediatePoint+UniformDistances"></a>

### memberResultIntermediatePoint.UniformDistances(divisions_count, notes)
Sets number of points

**Kind**: instance method of [<code>MemberResultIntermediatePoint</code>](#MemberResultIntermediatePoint)  

| Param | Type | Description |
| --- | --- | --- |
| divisions_count | <code>Number</code> | Number of division ordinates |
| notes | <code>Array</code> | Notes to each point, can be undefined |

<a name="MemberResultIntermediatePoint+DivisionOrdinates"></a>

### memberResultIntermediatePoint.DivisionOrdinates(division_ordinates, notes, absolute, clear_ordinates)
Sets division ordinates

**Kind**: instance method of [<code>MemberResultIntermediatePoint</code>](#MemberResultIntermediatePoint)  

| Param | Type | Description |
| --- | --- | --- |
| division_ordinates | <code>Array</code> | Division ordinates |
| notes | <code>Array</code> | Division ordinates notes, can be undefined |
| absolute | <code>Boolean</code> | Distances are absolute or relative can be undefined (default value is absolute) |
| clear_ordinates | <code>Boolean</code> | Clears default ordinates, can be undefined (default value is true) |

<a name="DistancesAreAbsolute"></a>

## DistancesAreAbsolute(memberResultIntermediatePoint, absolute)
Sets division ordinates as absolute (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| memberResultIntermediatePoint | <code>Object</code> | Member result intermediate point to be set |
| absolute | <code>Boolean</code> | Division ordinates are absolute, can be undefined (default value is true) |

