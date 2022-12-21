---
title: MemberNonlinearity
---

# MemberNonlinearity

## Classes

<dl>
<dt><a href="#MemberNonlinearity">MemberNonlinearity</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setParameters">setParameters(member_nonlinearity, parameters, param_1_name, param_2_name)</a></dt>
<dd><p>Sets parameters to member nonlinearity (private)</p>
</dd>
<dt><a href="#createNonlinearity">createNonlinearity(no, member_list, comment, params)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates member nonlinearity</p>
</dd>
</dl>

<a name="MemberNonlinearity"></a>

## MemberNonlinearity
**Kind**: global class  

* [MemberNonlinearity](#MemberNonlinearity)
    * [new MemberNonlinearity(no, comment, params)](#new_MemberNonlinearity_new)
    * [.FailureIfTension(no, members, comment, params)](#MemberNonlinearity+FailureIfTension) ⇒ <code>Object</code>
    * [.FailureIfCompression(no, members, comment, params)](#MemberNonlinearity+FailureIfCompression) ⇒ <code>Object</code>
    * [.FailureIfTensionWithSlippage(no, members, slippage, comment, params)](#MemberNonlinearity+FailureIfTensionWithSlippage) ⇒ <code>Object</code>
    * [.FailureIfCompressionWithSlippage(no, members, slippage, comment, params)](#MemberNonlinearity+FailureIfCompressionWithSlippage) ⇒ <code>Object</code>
    * [.Slippage(no, members, slippage, comment, params)](#MemberNonlinearity+Slippage) ⇒ <code>Object</code>
    * [.FailureUnderTension(no, members, tension_force, comment, params)](#MemberNonlinearity+FailureUnderTension) ⇒ <code>Object</code>
    * [.YieldingUnderTension(no, members, tension_force, comment, params)](#MemberNonlinearity+YieldingUnderTension) ⇒ <code>Object</code>
    * [.FailureUnderCompression(no, members, compression_force, comment, params)](#MemberNonlinearity+FailureUnderCompression) ⇒ <code>Object</code>
    * [.YieldingUnderCompression(no, members, compression_force, comment, params)](#MemberNonlinearity+YieldingUnderCompression) ⇒ <code>Object</code>
    * [.Failure(no, members, compression_force, tension_force, comment, params)](#MemberNonlinearity+Failure) ⇒ <code>Object</code>
    * [.Yielding(no, members, compression_force, tension_force, comment, params)](#MemberNonlinearity+Yielding) ⇒ <code>Object</code>

<a name="new_MemberNonlinearity_new"></a>

### new MemberNonlinearity(no, comment, params)
Creates member nonlinearity

**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+FailureIfTension"></a>

### memberNonlinearity.FailureIfTension(no, members, comment, params) ⇒ <code>Object</code>
Creates member failure if tension nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+FailureIfCompression"></a>

### memberNonlinearity.FailureIfCompression(no, members, comment, params) ⇒ <code>Object</code>
Creates member failure if compression nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+FailureIfTensionWithSlippage"></a>

### memberNonlinearity.FailureIfTensionWithSlippage(no, members, slippage, comment, params) ⇒ <code>Object</code>
Creates member failure if tension with slippage nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| slippage | <code>Number</code> | Slippage |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+FailureIfCompressionWithSlippage"></a>

### memberNonlinearity.FailureIfCompressionWithSlippage(no, members, slippage, comment, params) ⇒ <code>Object</code>
Creates member failure if compression with slippage nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| slippage | <code>Number</code> | Slippage |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+Slippage"></a>

### memberNonlinearity.Slippage(no, members, slippage, comment, params) ⇒ <code>Object</code>
Creates member slippage nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| slippage | <code>Number</code> | Slippage |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+FailureUnderTension"></a>

### memberNonlinearity.FailureUnderTension(no, members, tension_force, comment, params) ⇒ <code>Object</code>
Creates member tearing under tension nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| tension_force | <code>Number</code> | Tension force |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+YieldingUnderTension"></a>

### memberNonlinearity.YieldingUnderTension(no, members, tension_force, comment, params) ⇒ <code>Object</code>
Creates member yielding under tension nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| tension_force | <code>Number</code> | Tension force |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+FailureUnderCompression"></a>

### memberNonlinearity.FailureUnderCompression(no, members, compression_force, comment, params) ⇒ <code>Object</code>
Creates member tearing under compression nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| compression_force | <code>Number</code> | Compression force |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+YieldingUnderCompression"></a>

### memberNonlinearity.YieldingUnderCompression(no, members, compression_force, comment, params) ⇒ <code>Object</code>
Creates member yielding under compression nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| compression_force | <code>Number</code> | Compression force |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+Failure"></a>

### memberNonlinearity.Failure(no, members, compression_force, tension_force, comment, params) ⇒ <code>Object</code>
Creates member tearing nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| compression_force | <code>Number</code> | Compression force |
| tension_force | <code>Number</code> | Tension force |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="MemberNonlinearity+Yielding"></a>

### memberNonlinearity.Yielding(no, members, compression_force, tension_force, comment, params) ⇒ <code>Object</code>
Creates member yielding nonlinearity

**Kind**: instance method of [<code>MemberNonlinearity</code>](#MemberNonlinearity)  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| members | <code>Array</code> | Assigned members |
| compression_force | <code>Number</code> | Compression force |
| tension_force | <code>Number</code> | Tension force |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

<a name="setParameters"></a>

## setParameters(member_nonlinearity, parameters, param_1_name, param_2_name)
Sets parameters to member nonlinearity (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| member_nonlinearity | <code>Object</code> | Member nonlinearity to be setParameters |
| parameters | <code>Array</code> | Nonlinearity parameters |
| param_1_name | <code>String</code> | Name of first parameter |
| param_2_name | <code>String</code> | Name of first parameter, can be undefined |

<a name="createNonlinearity"></a>

## createNonlinearity(no, member_list, comment, params) ⇒ <code>Object</code>
Creates member nonlinearity

**Kind**: global function  
**Returns**: <code>Object</code> - Created member nonlinearity  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of member nonlinearity, can be undefined |
| member_list | <code>Array</code> | Assigned members |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Member nonlinearity parameters, can be undefined |

