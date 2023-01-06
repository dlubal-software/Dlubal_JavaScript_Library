---
title: LineSetLoad
---

# LineSetLoad

<a name="LineSetLoad"></a>

## LineSetLoad
**Kind**: global class  

* [LineSetLoad](#LineSetLoad)
    * [new LineSetLoad(no, load_case, line_sets, comment, params)](#new_LineSetLoad_new)
    * [.Force(no, load_case, line_sets, load_distribution, load_values, load_direction, comment, params)](#LineSetLoad+Force) ⇒ <code>Object</code>
    * [.Moment(no, load_case, line_sets, load_distribution, load_values, load_direction, comment, params)](#LineSetLoad+Moment) ⇒ <code>Object</code>
    * [.Mass(no, load_case, line_sets, load_value, comment, params)](#LineSetLoad+Mass) ⇒ <code>Object</code>
    * [.ReferDistanceLineSetEnd(value)](#LineSetLoad+ReferDistanceLineSetEnd)
    * [.LoadOverLineSet(value)](#LineSetLoad+LoadOverLineSet)
    * [.IndividualMassComponents(MX, MY, MZ)](#LineSetLoad+IndividualMassComponents)

<a name="new_LineSetLoad_new"></a>

### new LineSetLoad(no, load_case, line_sets, comment, params)
Creates line set load

**Returns**: <code>Object</code> - Created line set load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| line_sets | <code>Array</code> | List of line sets indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineSetLoad+Force"></a>

### lineSetLoad.Force(no, load_case, line_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates line set force load

**Kind**: instance method of [<code>LineSetLoad</code>](#LineSetLoad)  
**Returns**: <code>Object</code> - Created line set force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| line_sets | <code>Array</code> | List of line sets |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setLineLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineSetLoad+Moment"></a>

### lineSetLoad.Moment(no, load_case, line_sets, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates line set moment load

**Kind**: instance method of [<code>LineSetLoad</code>](#LineSetLoad)  
**Returns**: <code>Object</code> - Created line set moment load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| line_sets | <code>Array</code> | List of line sets |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend on load distribution (for more information look at setLineLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineSetLoad+Mass"></a>

### lineSetLoad.Mass(no, load_case, line_sets, load_value, comment, params) ⇒ <code>Object</code>
Creates line set mass load

**Kind**: instance method of [<code>LineSetLoad</code>](#LineSetLoad)  
**Returns**: <code>Object</code> - Created line set mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line set load, can be undefined |
| load_case | <code>Object</code> | Load case |
| line_sets | <code>Array</code> | List of line sets |
| load_value | <code>Number</code> | Uniform parameter value |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineSetLoad+ReferDistanceLineSetEnd"></a>

### lineSetLoad.ReferDistanceLineSetEnd(value)
Sets option for refer distance to the end of line set

**Kind**: instance method of [<code>LineSetLoad</code>](#LineSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="LineSetLoad+LoadOverLineSet"></a>

### lineSetLoad.LoadOverLineSet(value)
Sets option for load over total length of line set (only for trapezoidal load distribution)

**Kind**: instance method of [<code>LineSetLoad</code>](#LineSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="LineSetLoad+IndividualMassComponents"></a>

### lineSetLoad.IndividualMassComponents(MX, MY, MZ)
Sets individual mass components (only for mass load)

**Kind**: instance method of [<code>LineSetLoad</code>](#LineSetLoad)  

| Param | Type | Description |
| --- | --- | --- |
| MX | <code>Number</code> | Mass in X coordination, can be undefined |
| MY | <code>Number</code> | Mass in Y coordination, can be undefined |
| MZ | <code>Number</code> | Mass in Z coordination, can be undefined |

