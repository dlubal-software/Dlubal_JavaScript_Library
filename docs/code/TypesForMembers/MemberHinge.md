---
title: MemberHinge
---

# MemberHinge

## Classes

<dl>
<dt><a href="#MemberHinge">MemberHinge</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setPartialActivityZoneValues">setPartialActivityZoneValues(member_hinge, zone_values, param_type_name, param_slippage_name, param_displacement_name, param_force_name)</a></dt>
<dd><p>Sets values for partial activity zone (private)</p>
</dd>
<dt><a href="#setMainHingeValues">setMainHingeValues(member_hinge, values, property_1, property_2)</a> ⇒</dt>
<dd><p>Sets values to member hinge (private)</p>
</dd>
<dt><a href="#createMemberHinge">createMemberHinge(no, members_start_list, members_end_list, comment, params)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates member hinge (private)</p>
</dd>
</dl>

<a name="MemberHinge"></a>

## MemberHinge
**Kind**: global class  

* [MemberHinge](#MemberHinge)
    * [new MemberHinge(no, members_start_list, members_end_list, comment, params)](#new_MemberHinge_new)
    * [.Translational(no, members_start_list, members_end_list, axial_release_n, axial_release_vy, axial_release_vz, comment, params)](#MemberHinge+Translational) ⇒ <code>Object</code>
    * [.Rotational(no, members_start_list, members_end_list, moment_release_mt, moment_release_my, moment_release_mz, comment, params)](#MemberHinge+Rotational) ⇒ <code>Object</code>
    * [.PartialActivityTranslationalX(negative_zone_values, positive_zone_values)](#MemberHinge+PartialActivityTranslationalX)
    * [.PartialActivityTranslationalY(negative_zone_values, positive_zone_values)](#MemberHinge+PartialActivityTranslationalY)
    * [.PartialActivityTranslationalZ(negative_zone_values, positive_zone_values)](#MemberHinge+PartialActivityTranslationalZ)
    * [.PartialActivityRotationalX(negative_zone_values, positive_zone_values)](#MemberHinge+PartialActivityRotationalX)
    * [.PartialActivityRotationalY(negative_zone_values, positive_zone)](#MemberHinge+PartialActivityRotationalY)
    * [.PartialActivityRotationalZ(negative_zone_values, positive_zone_values)](#MemberHinge+PartialActivityRotationalZ)
    * [.DiagramTranslationalX(diagram_values)](#MemberHinge+DiagramTranslationalX)
    * [.DiagramTranslationalY(diagram_values)](#MemberHinge+DiagramTranslationalY)
    * [.DiagramTranslationalZ(diagram_values)](#MemberHinge+DiagramTranslationalZ)
    * [.DiagramRotationalX(diagram_values)](#MemberHinge+DiagramRotationalX)
    * [.DiagramRotationalY(diagram_values)](#MemberHinge+DiagramRotationalY)
    * [.DiagramRotationalZ(diagram_values)](#MemberHinge+DiagramRotationalZ)
    * [.FrictionVyTranslationalX(friction_coefficient_x, spring_constant_x)](#MemberHinge+FrictionVyTranslationalX)
    * [.FrictionVzTranslationalX(friction_coefficient_x, spring_constant_x)](#MemberHinge+FrictionVzTranslationalX)
    * [.FrictionVyVzTranslationalX(friction_coefficient_x, spring_constant_x)](#MemberHinge+FrictionVyVzTranslationalX)
    * [.FrictionVyPlusVzTranslationalX(friction_coefficient_xy, friction_coefficient_xz, spring_constant_x)](#MemberHinge+FrictionVyPlusVzTranslationalX)
    * [.FrictionNTranslationalY(friction_coefficient_y, spring_constant_y)](#MemberHinge+FrictionNTranslationalY)
    * [.FrictionVzTranslationalY(friction_coefficient_y, spring_constant_y)](#MemberHinge+FrictionVzTranslationalY)
    * [.FrictionNVzTranslationalY(friction_coefficient_y, spring_constant_y)](#MemberHinge+FrictionNVzTranslationalY)
    * [.FrictionNPlusVzTranslationalY(friction_coefficient_yx, friction_coefficient_yz, spring_constant_y)](#MemberHinge+FrictionNPlusVzTranslationalY)
    * [.FrictionNTranslationalZ(friction_coefficient_z, spring_constant_z)](#MemberHinge+FrictionNTranslationalZ)
    * [.FrictionVyTranslationalZ(friction_coefficient_z, spring_constant_z)](#MemberHinge+FrictionVyTranslationalZ)
    * [.FrictionNVyTranslationalZ(friction_coefficient_z, spring_constant_z)](#MemberHinge+FrictionNVyTranslationalZ)
    * [.FrictionNPlusVyTranslationalZ(friction_coefficient_zx, friction_coefficient_zy, spring_constant_z)](#MemberHinge+FrictionNPlusVyTranslationalZ)

<a name="new_MemberHinge_new"></a>

### new MemberHinge(no, members_start_list, members_end_list, comment, params)
Creates member hinge

**Returns**: <code>Object</code> - Created member hinge  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member hinge, can be undefined |
| members_start_list | <code>Array</code> | Member start, can be undefined |
| members_end_list | <code>Array</code> | Member end, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member hinge parameters, can be undefined |

<a name="MemberHinge+Translational"></a>

### memberHinge.Translational(no, members_start_list, members_end_list, axial_release_n, axial_release_vy, axial_release_vz, comment, params) ⇒ <code>Object</code>
Creates member hinge with specified axis release

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  
**Returns**: <code>Object</code> - Created member hinge  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member hinge, can be undefined |
| members_start_list | <code>Array</code> | Member start, can be undefined |
| members_end_list | <code>Array</code> | Member end, can be undefined |
| axial_release_n | <code>Array</code> | Axis release for ux, for more information look at comment in private setMainHingeValues function |
| axial_release_vy | <code>Array</code> | Axis release for uy, for more information look at comment in private setMainHingeValues function |
| axial_release_vz | <code>Array</code> | Axis release for uz, for more information look at comment in private setMainHingeValues function |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member hinge parameters, can be undefined |

<a name="MemberHinge+Rotational"></a>

### memberHinge.Rotational(no, members_start_list, members_end_list, moment_release_mt, moment_release_my, moment_release_mz, comment, params) ⇒ <code>Object</code>
Creates member hinge with specified moment release

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  
**Returns**: <code>Object</code> - Created member hinge  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member hinge, can be undefined |
| members_start_list | <code>Array</code> | Member start, can be undefined |
| members_end_list | <code>Array</code> | Member end, can be undefined |
| moment_release_mt | <code>Array</code> | Moment release for φx, for more information look at comment in private setMainHingeValues function |
| moment_release_my | <code>Array</code> | Moment release for φy, for more information look at comment in private setMainHingeValues function |
| moment_release_mz | <code>Array</code> | Moment release for φz, for more information look at comment in private setMainHingeValues function |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member hinge parameters, can be undefined |

<a name="MemberHinge+PartialActivityTranslationalX"></a>

### memberHinge.PartialActivityTranslationalX(negative_zone_values, positive_zone_values)
Sets negative and/or positive zone to partial activity translation x nonlinearity

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| negative_zone_values | <code>Array</code> | Negative zone values depend on type (for more information look at setPartialActivityZoneValues function) |
| positive_zone_values | <code>Array</code> | Positive zone values depend on type (for more information look at setPartialActivityZoneValues function) |

<a name="MemberHinge+PartialActivityTranslationalY"></a>

### memberHinge.PartialActivityTranslationalY(negative_zone_values, positive_zone_values)
Sets negative and/or positive zone to partial activity translation y nonlinearity

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| negative_zone_values | <code>Array</code> | Negative zone values depend on type (for more information look at setPartialActivityZoneValues function) |
| positive_zone_values | <code>Array</code> | Positive zone values depend on type (for more information look at setPartialActivityZoneValues function) |

<a name="MemberHinge+PartialActivityTranslationalZ"></a>

### memberHinge.PartialActivityTranslationalZ(negative_zone_values, positive_zone_values)
Sets negative and/or positive zone to partial activity translation z nonlinearity

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| negative_zone_values | <code>Array</code> | Negative zone values depend on type (for more information look at setPartialActivityZoneValues function) |
| positive_zone_values | <code>Array</code> | Positive zone values depend on type (for more information look at setPartialActivityZoneValues function) |

<a name="MemberHinge+PartialActivityRotationalX"></a>

### memberHinge.PartialActivityRotationalX(negative_zone_values, positive_zone_values)
Sets negative and/or positive zone to partial activity rotational x nonlinearity

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| negative_zone_values | <code>Array</code> | Negative zone values depend on type (for more information look at setPartialActivityZoneValues function) |
| positive_zone_values | <code>Array</code> | Positive zone values depend on type (for more information look at setPartialActivityZoneValues function) |

<a name="MemberHinge+PartialActivityRotationalY"></a>

### memberHinge.PartialActivityRotationalY(negative_zone_values, positive_zone)
Sets negative and/or positive zone to partial activity rotational y nonlinearity

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| negative_zone_values | <code>Array</code> | Negative zone values depend on type (for more information look at setPartialActivityZoneValues function) |
| positive_zone | <code>Array</code> | Positive zone values depend on type (for more information look at setPartialActivityZoneValues function) |

<a name="MemberHinge+PartialActivityRotationalZ"></a>

### memberHinge.PartialActivityRotationalZ(negative_zone_values, positive_zone_values)
Sets negative and/or positive zone to partial activity rotational z nonlinearity

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| negative_zone_values | <code>Array</code> | Negative zone values depend on type (for more information look at setPartialActivityZoneValues function) |
| positive_zone_values | <code>Array</code> | Positive zone values depend on type (for more information look at setPartialActivityZoneValues function) |

<a name="MemberHinge+DiagramTranslationalX"></a>

### memberHinge.DiagramTranslationalX(diagram_values)
Sets translational diagram values for ux

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| diagram_values | <code>Array</code> | [[ux1, N1, Cux1], [ux2, N2, Cux2] ... [uxn, Nn, Cuxn]] |

<a name="MemberHinge+DiagramTranslationalY"></a>

### memberHinge.DiagramTranslationalY(diagram_values)
Sets translational diagram values for uy

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| diagram_values | <code>Array</code> | [[uy1, N1, Cuy1], [uy2, N2, Cuy2] ... [uyn, Nn, Cuyn]] |

<a name="MemberHinge+DiagramTranslationalZ"></a>

### memberHinge.DiagramTranslationalZ(diagram_values)
Sets translational diagram values for uz

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| diagram_values | <code>Array</code> | [[uz1, N1, Cuz1], [uz2, N2, Cuz2] ... [uzn, Nn, Cuzn]] |

<a name="MemberHinge+DiagramRotationalX"></a>

### memberHinge.DiagramRotationalX(diagram_values)
Sets rotational diagram values for φx

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| diagram_values | <code>Array</code> | [[φx1, N1, Cφx1], [φx2, N2, Cφx2] ... [φxn, Nn, Cφxn]] |

<a name="MemberHinge+DiagramRotationalY"></a>

### memberHinge.DiagramRotationalY(diagram_values)
Sets rotational diagram values for φy

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| diagram_values | <code>Array</code> | [[φy1, N1, Cφy1], [φy2, N2, Cφy2] ... [φyn, Nn, Cφyn]] |

<a name="MemberHinge+DiagramRotationalZ"></a>

### memberHinge.DiagramRotationalZ(diagram_values)
Sets rotational diagram values for φz

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| diagram_values | <code>Array</code> | [[φz1, N1, Cφz1], [φz2, N2, Cφz2] ... [φzn, Nn, Cφzn]] |

<a name="MemberHinge+FrictionVyTranslationalX"></a>

### memberHinge.FrictionVyTranslationalX(friction_coefficient_x, spring_constant_x)
Sets translational friction Vy values for ux

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_x | <code>Number</code> | Friction coefficient X |
| spring_constant_x | <code>Number</code> | Spring constant X |

<a name="MemberHinge+FrictionVzTranslationalX"></a>

### memberHinge.FrictionVzTranslationalX(friction_coefficient_x, spring_constant_x)
Sets translational friction Vz values for ux

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_x | <code>Number</code> | Friction coefficient X |
| spring_constant_x | <code>Number</code> | Spring constant X |

<a name="MemberHinge+FrictionVyVzTranslationalX"></a>

### memberHinge.FrictionVyVzTranslationalX(friction_coefficient_x, spring_constant_x)
Sets translational friction VyVz values for ux

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_x | <code>Number</code> | Friction coefficient X |
| spring_constant_x | <code>Number</code> | Spring constant X |

<a name="MemberHinge+FrictionVyPlusVzTranslationalX"></a>

### memberHinge.FrictionVyPlusVzTranslationalX(friction_coefficient_xy, friction_coefficient_xz, spring_constant_x)
Sets translational friction Vy+Vz values for ux

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_xy | <code>Number</code> | Friction coefficient XY |
| friction_coefficient_xz | <code>Number</code> | Friction coefficient XZ |
| spring_constant_x | <code>Number</code> | Spring constant X |

<a name="MemberHinge+FrictionNTranslationalY"></a>

### memberHinge.FrictionNTranslationalY(friction_coefficient_y, spring_constant_y)
Sets translational friction N values for uy

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_y | <code>Number</code> | Friction coefficient Y |
| spring_constant_y | <code>Number</code> | Spring constant Y |

<a name="MemberHinge+FrictionVzTranslationalY"></a>

### memberHinge.FrictionVzTranslationalY(friction_coefficient_y, spring_constant_y)
Sets translational friction Vz values for uy

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_y | <code>Number</code> | Friction coefficient Y |
| spring_constant_y | <code>Number</code> | Spring constant Y |

<a name="MemberHinge+FrictionNVzTranslationalY"></a>

### memberHinge.FrictionNVzTranslationalY(friction_coefficient_y, spring_constant_y)
Sets translational friction NVz values for uy

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_y | <code>Number</code> | Friction coefficient Y |
| spring_constant_y | <code>Number</code> | Spring constant Y |

<a name="MemberHinge+FrictionNPlusVzTranslationalY"></a>

### memberHinge.FrictionNPlusVzTranslationalY(friction_coefficient_yx, friction_coefficient_yz, spring_constant_y)
Sets translational friction N+Vz values for uy

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_yx | <code>Number</code> | Friction coefficient YX |
| friction_coefficient_yz | <code>Number</code> | Friction coefficient YZ |
| spring_constant_y | <code>Number</code> | Spring constant Y |

<a name="MemberHinge+FrictionNTranslationalZ"></a>

### memberHinge.FrictionNTranslationalZ(friction_coefficient_z, spring_constant_z)
Sets translational friction N values for uz

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_z | <code>Number</code> | Friction coefficient Z |
| spring_constant_z | <code>Number</code> | Spring constant Z |

<a name="MemberHinge+FrictionVyTranslationalZ"></a>

### memberHinge.FrictionVyTranslationalZ(friction_coefficient_z, spring_constant_z)
Sets translational friction Vy values for uz

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_z | <code>Number</code> | Friction coefficient Z |
| spring_constant_z | <code>Number</code> | Spring constant Z |

<a name="MemberHinge+FrictionNVyTranslationalZ"></a>

### memberHinge.FrictionNVyTranslationalZ(friction_coefficient_z, spring_constant_z)
Sets translational friction NVy values for uz

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_z | <code>Number</code> | Friction coefficient Z |
| spring_constant_z | <code>Number</code> | Spring constant Z |

<a name="MemberHinge+FrictionNPlusVyTranslationalZ"></a>

### memberHinge.FrictionNPlusVyTranslationalZ(friction_coefficient_zx, friction_coefficient_zy, spring_constant_z)
Sets translational friction N+Vy values for uz

**Kind**: instance method of [<code>MemberHinge</code>](#MemberHinge)  

| Param | Type | Description |
| --- | --- | --- |
| friction_coefficient_zx | <code>Number</code> | Friction coefficient ZX |
| friction_coefficient_zy | <code>Number</code> | Friction coefficient ZY |
| spring_constant_z | <code>Number</code> | Spring constant Z |

<a name="setPartialActivityZoneValues"></a>

## setPartialActivityZoneValues(member_hinge, zone_values, param_type_name, param_slippage_name, param_displacement_name, param_force_name)
Sets values for partial activity zone (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| member_hinge | <code>Object</code> | Member hinge to which values has to be set |
| zone_values | <code>Array</code> | Negative / positive zone values 												- "Complete": [0] 												- "Fixed from release displacement": [1, u(x|y|z)-|φ(x|y|z)-, u(x|y|z)s-|φ(x|y|z)s-] / [1, u(x|y|z)+|φ(x|y|z)+, u(x|y|z)s+|φ(x|y|z)s+] 												- "Tearing from release force": [2, N-, u(x|y|z)s-|φ(x|y|z)s-] / [2, N+, u(x|y|z)s+|φ(x|y|z)s+] 												- "Yielding from release force": [3, N-, u(x|y|z)s-|φ(x|y|z)s-] / [3, N+, u(x|y|z)s+|φ(x|y|z)s+] 												- "Spring ineffectiveness": [4] |
| param_type_name | <code>String</code> | Parameter name for partial activity zone name |
| param_slippage_name | <code>String</code> | Parameter name for partial activity slippage name |
| param_displacement_name | <code>String</code> | Parameter name for partial activity displacement name |
| param_force_name | <code>String</code> | Parameter name for partial activity force name |

<a name="setMainHingeValues"></a>

## setMainHingeValues(member_hinge, values, property_1, property_2) ⇒
Sets values to member hinge (private)

**Kind**: global function  
**Returns**: Returns modified member hinge  

| Param | Type | Description |
| --- | --- | --- |
| member_hinge | <code>Object</code> | Member hinge |
| values | <code>Array</code> | Values to be set, [Translational/Rotational, Spring constant, Nonlinearity] 										- Values can be in two formats: 											[bool, float, int] - if bool is true (translation is enabled), then can be specified next two values (spring constant and nonlinearity) 											[bool, int]		   - if bool is false (translation is disabled), then can be specified only next one value (nonlinearity) 											Nonlinearity: can be string name or index: None (0), Fixed if negative (1), Fixed if positive (2), Failure all if negative (3), Failure all if positive (4), 														  Partial activity (5), Diagram (6), Stiffness diagram (7), Friction direction 1 (8), Friction direction 2 (9), 														  Friction direction 1 2 (10), Friction direction 1 + 2 (11) |
| property_1 | <code>String</code> | Spring constant string name |
| property_2 | <code>String</code> | Nonlinearity string name |

<a name="createMemberHinge"></a>

## createMemberHinge(no, members_start_list, members_end_list, comment, params) ⇒ <code>Object</code>
Creates member hinge (private)

**Kind**: global function  
**Returns**: <code>Object</code> - Created member hinge  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member hinge, van be undefined |
| members_start_list | <code>Array</code> | Member start, can be undefined |
| members_end_list | <code>Array</code> | Member end, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member hinge parameters, can be undefined |

