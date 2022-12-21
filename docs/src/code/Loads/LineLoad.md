---
title: LineLoad
---

# LineLoad

<a name="LineLoad"></a>

## LineLoad
**Kind**: global class  

* [LineLoad](#LineLoad)
    * [new LineLoad(no, load_case, lines, comment, params)](#new_LineLoad_new)
    * [.Force(no, load_case, lines, load_distribution, load_values, load_direction, comment, params)](#LineLoad+Force) ⇒ <code>Object</code>
    * [.Moment(no, load_case, lines, load_distribution, load_values, load_direction, comment, params)](#LineLoad+Moment) ⇒ <code>Object</code>
    * [.Mass(no, load_case, lines, load_value, comment, params)](#LineLoad+Mass) ⇒ <code>Object</code>
    * [.ReferenceToListOfLines(value)](#LineLoad+ReferenceToListOfLines)
    * [.ReferDistanceLineEnd(value)](#LineLoad+ReferDistanceLineEnd)
    * [.LoadOverLine(value)](#LineLoad+LoadOverLine)
    * [.IndividualMassComponents(MX, MY, MZ)](#LineLoad+IndividualMassComponents)

<a name="new_LineLoad_new"></a>

### new LineLoad(no, load_case, lines, comment, params)
Creates line load

**Returns**: <code>Object</code> - Created line load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line load, can be undefined |
| load_case | <code>Object</code> | Load case |
| lines | <code>Array</code> | List of line indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineLoad+Force"></a>

### lineLoad.Force(no, load_case, lines, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates line force load

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  
**Returns**: <code>Object</code> - Created line force load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line load, can be undefined |
| load_case | <code>Object</code> | Load case |
| lines | <code>Array</code> | List of lines |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load values depend on load distribution (for more information look at setLineLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineLoad+Moment"></a>

### lineLoad.Moment(no, load_case, lines, load_distribution, load_values, load_direction, comment, params) ⇒ <code>Object</code>
Creates line moment load

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  
**Returns**: <code>Object</code> - Created line moment load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line load, can be undefined |
| load_case | <code>Object</code> | Load case |
| lines | <code>Array</code> | List of lines |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load values depend on load distribution (for more information look at setLineLoadDistribution function) |
| load_direction | <code>String</code> | Load direction, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineLoad+Mass"></a>

### lineLoad.Mass(no, load_case, lines, load_value, comment, params) ⇒ <code>Object</code>
Creates line mass load

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  
**Returns**: <code>Object</code> - Created line mass load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line load, can be undefined |
| load_case | <code>Object</code> | Load case |
| lines | <code>Array</code> | List of lines |
| load_value | <code>Number</code> | Uniform load value |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="LineLoad+ReferenceToListOfLines"></a>

### lineLoad.ReferenceToListOfLines(value)
Sets option for reference to list of lines

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="LineLoad+ReferDistanceLineEnd"></a>

### lineLoad.ReferDistanceLineEnd(value)
Sets option for refer distance to the line end

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="LineLoad+LoadOverLine"></a>

### lineLoad.LoadOverLine(value)
Sets option for load over total length of line (only for trapezoidal load distribution)

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | When undefined, true as default |

<a name="LineLoad+IndividualMassComponents"></a>

### lineLoad.IndividualMassComponents(MX, MY, MZ)
Sets individual mass components (only for mass load)

**Kind**: instance method of [<code>LineLoad</code>](#LineLoad)  

| Param | Type | Description |
| --- | --- | --- |
| MX | <code>Number</code> | Mass in X coordination, can be undefined |
| MY | <code>Number</code> | Mass in Y coordination, can be undefined |
| MZ | <code>Number</code> | Mass in Z coordination, can be undefined |

