---
title: MemberSetLoad
---

# MemberSetLoad

<a name="MemberSetLoad"></a>

## MemberSetLoad
**Kind**: global class  

* [MemberSetLoad](#MemberSetLoad)
    * [new MemberSetLoad(no, load_case, member_sets, comment, params)](#new_MemberSetLoad_new)
    * [.Force(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+Force) ⇒ <code>Object</code>
    * [.Moment(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+Moment) ⇒ <code>Object</code>
    * [.Mass(no, load_case, member_sets, load_value, comment, params)](#MemberSetLoad+Mass) ⇒ <code>Object</code>
    * [.Temperature(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+Temperature) ⇒ <code>Object</code>
    * [.TemperatureChange(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+TemperatureChange) ⇒ <code>Object</code>
    * [.AxialStrain(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+AxialStrain) ⇒ <code>Object</code>
    * [.AxialDisplacement(no, load_case, member_sets, load_value, comment, params)](#MemberSetLoad+AxialDisplacement) ⇒ <code>Object</code>
    * [.Precamber(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+Precamber) ⇒ <code>Object</code>
    * [.InitialPrestress(no, load_case, member_sets, load_value, comment, params)](#MemberSetLoad+InitialPrestress) ⇒ <code>Object</code>
    * [.Displacement(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+Displacement) ⇒ <code>Object</code>
    * [.Rotation(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params)](#MemberSetLoad+Rotation) ⇒ <code>Object</code>
    * [.PipeContentFull(no, load_case, member_sets, load_value, load_direction, comment, params)](#MemberSetLoad+PipeContentFull) ⇒ <code>Object</code>
    * [.PipeContentPartial(no, load_case, member_sets, load_values, load_direction, comment, params)](#MemberSetLoad+PipeContentPartial) ⇒ <code>Object</code>
    * [.PipeInternalPressure(no, load_case, member_sets, load_value, comment, params)](#MemberSetLoad+PipeInternalPressure) ⇒ <code>Object</code>
    * [.RotaryMotion(no, load_case, member_sets, load_values, comment, params)](#MemberSetLoad+RotaryMotion) ⇒ <code>Object</code>
    * [.ReferDistanceMemberSetEnd(value)](#MemberSetLoad+ReferDistanceMemberSetEnd)
    * [.LoadOverMember(value)](#MemberSetLoad+LoadOverMember)
    * [.Eccentricity(reference_to, offset_member_start_ey, offset_member_start_ez, offset_member_end_ey, offset_member_end_ez)](#MemberSetLoad+Eccentricity)
    * [.IndividualMassComponents(MX, MY, MZ)](#MemberSetLoad+IndividualMassComponents)

<a name="new_MemberSetLoad_new"></a>

### new MemberSetLoad(no, load_case, member_sets, comment, params)
Creates member set load

**Returns**: <code>Object</code> - Created member set load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Force"></a>

### memberSetLoad.Force(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set force load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Moment"></a>

### memberSetLoad.Moment(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set moment load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set moment load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Mass"></a>

### memberSetLoad.Mass(no, load_case, member_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates member set mass load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Temperature"></a>

### memberSetLoad.Temperature(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set temperature load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set temperature load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+TemperatureChange"></a>

### memberSetLoad.TemperatureChange(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set temperature change load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set temperature change load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+AxialStrain"></a>

### memberSetLoad.AxialStrain(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set axial strain load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set axial strain load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+AxialDisplacement"></a>

### memberSetLoad.AxialDisplacement(no, load_case, member_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates member set axial displacement load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set axial displacement load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Precamber"></a>

### memberSetLoad.Precamber(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set precamber load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set precamber load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+InitialPrestress"></a>

### memberSetLoad.InitialPrestress(no, load_case, member_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates member set initial prestress load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set initial prestress load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Displacement"></a>

### memberSetLoad.Displacement(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set displacement load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set displacement load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+Rotation"></a>

### memberSetLoad.Rotation(no, load_case, member_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set rotation load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set rotation load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+PipeContentFull"></a>

### memberSetLoad.PipeContentFull(no, load_case, member_sets, load_value, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set content full load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set pipe content full load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member sets indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+PipeContentPartial"></a>

### memberSetLoad.PipeContentPartial(no, load_case, member_sets, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates member set pipe content partial load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set pipe content partial load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_values | <code>Array</code> | Load parameters for Uniform distribution |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+PipeInternalPressure"></a>

### memberSetLoad.PipeInternalPressure(no, load_case, member_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates member set pipe internal pressure load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set pipe internal pressure load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_value | <code>Number</code> | Uniform load parameter |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+RotaryMotion"></a>

### memberSetLoad.RotaryMotion(no, load_case, member_sets, load_values, comment, params) ⇒ <code>Object</code>
Creates member set rotary motion load

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  
**Returns**: <code>Object</code> - Created member set rotary motion load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| member_sets | <code>Array</code> | List of member set indexes |
| load_values | <code>Number</code> | Load parameters depend on load distribution (for more information look at setMemberLoadDistribution function) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="MemberSetLoad+ReferDistanceMemberSetEnd"></a>

### memberSetLoad.ReferDistanceMemberSetEnd(value)
Sets option for refer distance to the member set end

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="MemberSetLoad+LoadOverMember"></a>

### memberSetLoad.LoadOverMember(value)
Sets option for load over total length of member set (only for trapezoidal load distribution)

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="MemberSetLoad+Eccentricity"></a>

### memberSetLoad.Eccentricity(reference_to, offset_member_start_ey, offset_member_start_ez, offset_member_end_ey, offset_member_end_ez)
Sets eccentricity (only force load)

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| reference_to | <code>String</code> | Eccentricity is refereed to what ("left_top", "center_top", "right_top", "left_center", "center_center", "right_center", 												"left_bottom", "center_bottom", "right_bottom", "center_of_gravity", "shear_center") |
| offset_member_start_ey | <code>Number</code> | Offset at member start, can be undefined |
| offset_member_start_ez | <code>Number</code> | Offset at member start, can be undefined |
| offset_member_end_ey | <code>Number</code> | Offset at member end, can be undefined |
| offset_member_end_ez | <code>Number</code> | Offset at member end, can be undefined |

<a name="MemberSetLoad+IndividualMassComponents"></a>

### memberSetLoad.IndividualMassComponents(MX, MY, MZ)
Sets individual mass components (only for mass load)

**Kind**: instance method of [<code>MemberSetLoad</code>](#MemberSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| MX | <code>Number</code> | Mass in X coordination, can be undefined |
| MY | <code>Number</code> | Mass in Y coordination, can be undefined |
| MZ | <code>Number</code> | Mass in Z coordination, can be undefined |

