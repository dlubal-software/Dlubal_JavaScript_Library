---
title: NodalSupport
---

# NodalSupport

<a name="NodalSupport"></a>

## NodalSupport
**Kind**: global class  

* [NodalSupport](#NodalSupport)
    * [new NodalSupport(no, nodes, comment, params)](#new_NodalSupport_new)
    * [.Status()](#NodalSupport+Status)
    * [.SetNodes(nodes)](#NodalSupport+SetNodes) ⇒
    * [.SetComment(comment)](#NodalSupport+SetComment) ⇒
    * [.SetNo(no)](#NodalSupport+SetNo)
    * [.Fixed()](#NodalSupport+Fixed) ⇒
    * [.Hinged()](#NodalSupport+Hinged) ⇒
    * [.Roller()](#NodalSupport+Roller) ⇒
    * [.RollerX()](#NodalSupport+RollerX) ⇒
    * [.RollerY()](#NodalSupport+RollerY) ⇒
    * [.RollerZ()](#NodalSupport+RollerZ) ⇒
    * [.Free()](#NodalSupport+Free) ⇒
    * [.Translation(x, y, z)](#NodalSupport+Translation) ⇒
    * [.TranslationX(x)](#NodalSupport+TranslationX) ⇒
    * [.TranslationY(y)](#NodalSupport+TranslationY) ⇒
    * [.TranslationZ(z)](#NodalSupport+TranslationZ) ⇒
    * [.Rotation(x, y, z)](#NodalSupport+Rotation) ⇒
    * [.RotationX(x)](#NodalSupport+RotationX) ⇒
    * [.RotationY(y)](#NodalSupport+RotationY) ⇒
    * [.RotationZ(z)](#NodalSupport+RotationZ) ⇒

<a name="new_NodalSupport_new"></a>

### new NodalSupport(no, nodes, comment, params)
Creates nodal support hight level function

**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of nodal support, empty by default |
| nodes | <code>Array</code> | List of nodes |
| comment | <code>String</code> | Comment, empty by default |
| params | <code>Object</code> | Nodal support parameters, empty by default |

<a name="NodalSupport+Status"></a>

### nodalSupport.Status()
Nodal support brief report

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
<a name="NodalSupport+SetNodes"></a>

### nodalSupport.SetNodes(nodes) ⇒
Set nodes to nodal supports

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array</code> | List of nodes |

<a name="NodalSupport+SetComment"></a>

### nodalSupport.SetComment(comment) ⇒
Set comment to nodal support

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| comment | <code>String</code> | Content of comment |

<a name="NodalSupport+SetNo"></a>

### nodalSupport.SetNo(no)
Set identification number to nodal support

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | identification number of nodal support |

<a name="NodalSupport+Fixed"></a>

### nodalSupport.Fixed() ⇒
Set nodal support as fixed

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+Hinged"></a>

### nodalSupport.Hinged() ⇒
Set nodal support as hinged

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+Roller"></a>

### nodalSupport.Roller() ⇒
Set nodal support as roller

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+RollerX"></a>

### nodalSupport.RollerX() ⇒
Set nodal support as roller in X direction

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+RollerY"></a>

### nodalSupport.RollerY() ⇒
Set nodal support as roller in Y direction

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+RollerZ"></a>

### nodalSupport.RollerZ() ⇒
Set nodal support as roller in Z direction

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+Free"></a>

### nodalSupport.Free() ⇒
Sets nodal support free

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  
<a name="NodalSupport+Translation"></a>

### nodalSupport.Translation(x, y, z) ⇒
Sets flexible stiffness for translations

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | Stiffness in X direction |
| y | <code>Number</code> | Stiffness in Y direction |
| z | <code>Number</code> | Stiffness in Z direction |

<a name="NodalSupport+TranslationX"></a>

### nodalSupport.TranslationX(x) ⇒
Sets flexible stiffness in X direction for translation

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | Stiffness in X direction |

<a name="NodalSupport+TranslationY"></a>

### nodalSupport.TranslationY(y) ⇒
Sets flexible stiffness in Y direction for translation

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| y | <code>Number</code> | Stiffness in Y direction |

<a name="NodalSupport+TranslationZ"></a>

### nodalSupport.TranslationZ(z) ⇒
Sets flexible stiffness in Z direction for translation

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| z | <code>Number</code> | Stiffness in Z direction |

<a name="NodalSupport+Rotation"></a>

### nodalSupport.Rotation(x, y, z) ⇒
Sets flexible stiffness for rotations

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | Stiffness around X direction |
| y | <code>Number</code> | Stiffness around Y direction |
| z | <code>Number</code> | Stiffness around Z direction |

<a name="NodalSupport+RotationX"></a>

### nodalSupport.RotationX(x) ⇒
Sets flexible stiffness around X direction for rotation

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | Stiffness around x direction |

<a name="NodalSupport+RotationY"></a>

### nodalSupport.RotationY(y) ⇒
Sets flexible stiffness around Y direction for rotation

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| y | <code>Number</code> | Stiffness around y direction |

<a name="NodalSupport+RotationZ"></a>

### nodalSupport.RotationZ(z) ⇒
Sets flexible stiffness around Z direction for rotation

**Kind**: instance method of [<code>NodalSupport</code>](#NodalSupport)  
**Returns**: Nodal support object  

| Param | Type | Description |
| --- | --- | --- |
| z | <code>Number</code> | Stiffness around z direction |

