---
title: MemberLoad
---

# MemberLoad

<a name="MemberLoad"></a>

## MemberLoad
**Kind**: global class  

* [MemberLoad](#MemberLoad)
    * [new MemberLoad(no, load_case, members, comment, params)](#new_MemberLoad_new)
    * [.Force(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+Force) ⇒ <code>Object</code>
    * [.Moment(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+Moment) ⇒ <code>Object</code>
    * [.Mass(no, load_case, members, load_value, comment, params)](#MemberLoad+Mass) ⇒ <code>Object</code>
    * [.Temperature(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+Temperature) ⇒ <code>Object</code>
    * [.TemperatureChange(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+TemperatureChange) ⇒ <code>Object</code>
    * [.AxialStrain(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+AxialStrain) ⇒ <code>Object</code>
    * [.AxialDisplacement(no, load_case, members, load_value, comment, params)](#MemberLoad+AxialDisplacement) ⇒ <code>Object</code>
    * [.Precamber(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+Precamber) ⇒ <code>Object</code>
    * [.InitialPrestress(no, load_case, members, load_value, comment, params)](#MemberLoad+InitialPrestress) ⇒ <code>Object</code>
    * [.Displacement(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+Displacement) ⇒ <code>Object</code>
    * [.Rotation(no, load_case, members, load_distribution, load_values, load_direction, comment, params)](#MemberLoad+Rotation) ⇒ <code>Object</code>
    * [.PipeContentFull(no, load_case, members, load_value, load_direction, comment, params)](#MemberLoad+PipeContentFull) ⇒ <code>Object</code>
    * [.PipeContentPartial(no, load_case, members, load_values, load_direction, comment, params)](#MemberLoad+PipeContentPartial) ⇒ <code>Object</code>
    * [.PipeInternalPressure(no, load_case, members, load_value, comment, params)](#MemberLoad+PipeInternalPressure) ⇒ <code>Object</code>
    * [.RotaryMotion(no, load_case, members, load_values, comment, params)](#MemberLoad+RotaryMotion) ⇒ <code>Object</code>
    * [.ReferenceToListOfMembers(value)](#MemberLoad+ReferenceToListOfMembers)
    * [.ReferDistanceMemberEnd(value)](#MemberLoad+ReferDistanceMemberEnd)
    * [.LoadOverMember(value)](#MemberLoad+LoadOverMember)
    * [.Eccentricity(reference_to, offset_member_start_ey, offset_member_start_ez, offset_member_end_ey, offset_member_end_ez)](#MemberLoad+Eccentricity)
    * [.IndividualMassComponents(MX, MY, MZ)](#MemberLoad+IndividualMassComponents)

<a name="new_MemberLoad_new"></a>

### new MemberLoad(no, load_case, members, comment, params)
Creates member load

**Returns**: <code>Object</code> - Created member load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Force"></a>

### memberLoad.Force(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member force load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Moment"></a>

### memberLoad.Moment(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member moment load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member moment load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Mass"></a>

### memberLoad.Mass(no, load_case, members, load_value, comment, params) ⇒ <code>Object</code>
Creates member mass load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Temperature"></a>

### memberLoad.Temperature(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member temperature load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member temperature load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+TemperatureChange"></a>

### memberLoad.TemperatureChange(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member temperature change load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member temperature change load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+AxialStrain"></a>

### memberLoad.AxialStrain(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member axial strain load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member axial strain load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+AxialDisplacement"></a>

### memberLoad.AxialDisplacement(no, load_case, members, load_value, comment, params) ⇒ <code>Object</code>
Creates member axial displacement load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member axial displacement load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Precamber"></a>

### memberLoad.Precamber(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member precamber load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member precamber load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+InitialPrestress"></a>

### memberLoad.InitialPrestress(no, load_case, members, load_value, comment, params) ⇒ <code>Object</code>
Creates member initial prestress load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member initial prestress load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Displacement"></a>

### memberLoad.Displacement(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member displacement load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member displacement load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+Rotation"></a>

### memberLoad.Rotation(no, load_case, members, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member rotation load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member rotation load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+PipeContentFull"></a>

### memberLoad.PipeContentFull(no, load_case, members, load_value, load_direction, comment, params) ⇒ <code>Object</code>
Creates member content full load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member pipe content full load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+PipeContentPartial"></a>

### memberLoad.PipeContentPartial(no, load_case, members, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member pipe content partial load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member pipe content partial load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_values | <code>Array</code> | Load parameters for Uniform distribution |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+PipeInternalPressure"></a>

### memberLoad.PipeInternalPressure(no, load_case, members, load_value, comment, params) ⇒ <code>Object</code>
Creates member pipe internal pressure load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member pipe internal pressure load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+RotaryMotion"></a>

### memberLoad.RotaryMotion(no, load_case, members, load_values, comment, params) ⇒ <code>Object</code>
Creates member rotary motion load

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  
**Returns**: <code>Object</code> - Created member rotary motion load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member load, can be undefined |
| load_case | <code>Object</code> | Load case |
| members | <code>Array</code> | List of member indexes |
| load_values | <code>Number</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberLoad+ReferenceToListOfMembers"></a>

### memberLoad.ReferenceToListOfMembers(value)
Sets option for reference to list of members

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="MemberLoad+ReferDistanceMemberEnd"></a>

### memberLoad.ReferDistanceMemberEnd(value)
Sets option for refer distance to the member end

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="MemberLoad+LoadOverMember"></a>

### memberLoad.LoadOverMember(value)
Sets option for load over total length of member (only for trapezoidal load distribution)

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="MemberLoad+Eccentricity"></a>

### memberLoad.Eccentricity(reference_to, offset_member_start_ey, offset_member_start_ez, offset_member_end_ey, offset_member_end_ez)
Sets eccentricity (only force load)

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  

| Param | Type | Description |
| --- | --- | --- |
| reference_to | <code>String</code> | Eccentricity is refereed to what ("left_top", "center_top", "right_top", "left_center", "center_center", "right_center", 												"left_bottom", "center_bottom", "right_bottom", "center_of_gravity", "shear_center") |
| offset_member_start_ey | <code>Number</code> | Offset at member start, can be undefined |
| offset_member_start_ez | <code>Number</code> | Offset at member start, can be undefined |
| offset_member_end_ey | <code>Number</code> | Offset at member end, can be undefined |
| offset_member_end_ez | <code>Number</code> | Offset at member end, can be undefined |

<a name="MemberLoad+IndividualMassComponents"></a>

### memberLoad.IndividualMassComponents(MX, MY, MZ)
Sets individual mass components (only for mass load)

**Kind**: instance method of [<code>MemberLoad</code>](#MemberLoad)  

| Param | Type | Description |
| --- | --- | --- |
| MX | <code>Number</code> | Mass in X coordination, can be undefined |
| MY | <code>Number</code> | Mass in Y coordination, can be undefined |
| MZ | <code>Number</code> | Mass in Z coordination, can be undefined |

