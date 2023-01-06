---
title: LineHinge
---

# LineHinge

## Classes

<dl>
<dt><a href="#LineHinge">LineHinge</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createLineHinge">createLineHinge(no, comment, params)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates line hinge</p>
</dd>
<dt><a href="#CreateHingeConstant">CreateHingeConstant(hinge)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates line hinge constant</p>
</dd>
<dt><a href="#CreateHinge">CreateHinge(hinge)</a> ⇒</dt>
<dd><p>Creates Hinge</p>
</dd>
</dl>

<a name="LineHinge"></a>

## LineHinge
**Kind**: global class  

* [LineHinge](#LineHinge)
    * [new LineHinge(no, surface, lines, comment, params)](#new_LineHinge_new)
    * [.Translation(ux, uy, uz)](#LineHinge+Translation) ⇒ <code>Object</code>
    * [.TranslationX(ux)](#LineHinge+TranslationX) ⇒ <code>Object</code>
    * [.TranslationY(uy)](#LineHinge+TranslationY) ⇒ <code>Object</code>
    * [.TranslationZ(uz)](#LineHinge+TranslationZ) ⇒ <code>Object</code>
    * [.Rotation(rx)](#LineHinge+Rotation) ⇒ <code>Object</code>
    * [.AssignTo(surface, lines)](#LineHinge+AssignTo)
    * [.WallSlabConnection(surface, or)](#LineHinge+WallSlabConnection)

<a name="new_LineHinge_new"></a>

### new LineHinge(no, surface, lines, comment, params)
Creates line hinge

**Returns**: <code>Object</code> - Created line hinge  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line hinge, can be undefined |
| surface | <code>Integer</code> | Surface id (lines must lie on this surface) |
| lines | <code>Integer</code> \| <code>Array</code> | One or more lines id for line hinge assign |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | line hinge parameters, can be undefined |

<a name="LineHinge+Translation"></a>

### lineHinge.Translation(ux, uy, uz) ⇒ <code>Object</code>
Set translation constants ux, uy, uz to line hinge

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  
**Returns**: <code>Object</code> - line hinge in parent  

| Param | Type | Description |
| --- | --- | --- |
| ux | <code>Boolean</code> \| <code>Float</code> | Translation ux (true, false, number(stiffness [Nm^2])) |
| uy | <code>Boolean</code> \| <code>Float</code> | Translation uy (true, false, number(stiffness [Nm^2])) |
| uz | <code>Boolean</code> \| <code>Float</code> | Translation uz (true, false, number(stiffness [Nm^2])) |

<a name="LineHinge+TranslationX"></a>

### lineHinge.TranslationX(ux) ⇒ <code>Object</code>
Set translation constant ux to line hinge

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  
**Returns**: <code>Object</code> - line hinge in parent  

| Param | Type | Description |
| --- | --- | --- |
| ux | <code>Boolean</code> \| <code>Float</code> | Translation ux (true, false, number(stiffness [Nm^2])) |

<a name="LineHinge+TranslationY"></a>

### lineHinge.TranslationY(uy) ⇒ <code>Object</code>
Set translation constant uy to line hinge

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  
**Returns**: <code>Object</code> - line hinge in parent  

| Param | Type | Description |
| --- | --- | --- |
| uy | <code>Boolean</code> \| <code>Float</code> | Translation uy (true, false, number(stiffness [Nm^2])) |

<a name="LineHinge+TranslationZ"></a>

### lineHinge.TranslationZ(uz) ⇒ <code>Object</code>
Set translation constant uz to line hinge

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  
**Returns**: <code>Object</code> - line hinge in parent  

| Param | Type | Description |
| --- | --- | --- |
| uz | <code>Boolean</code> \| <code>Float</code> | Translation uz (true, false, number(stiffness [Nm^2])) |

<a name="LineHinge+Rotation"></a>

### lineHinge.Rotation(rx) ⇒ <code>Object</code>
Set rotation constant rx to line hinge

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  
**Returns**: <code>Object</code> - line hinge in parent  

| Param | Type | Description |
| --- | --- | --- |
| rx | <code>Boolean</code> \| <code>Float</code> | Rotation rx (true, false, number(stiffness [Nm^2])) |

<a name="LineHinge+AssignTo"></a>

### lineHinge.AssignTo(surface, lines)
Assign line hinge to line and surface (line must be involved in the surface)

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  

| Param | Type | Description |
| --- | --- | --- |
| surface | <code>Integer</code> | surface id (lines must lie on this surface) |
| lines | <code>Integer</code> \| <code>Array</code> | one or more lines id for line hinge assign |

<a name="LineHinge+WallSlabConnection"></a>

### lineHinge.WallSlabConnection(surface, or)
Assign wall-slab connection to line hinge

**Kind**: instance method of [<code>LineHinge</code>](#LineHinge)  

| Param | Type | Description |
| --- | --- | --- |
| surface | <code>Integer</code> | surface id (lines must lie on this surface) |
| or | <code>Integer</code> | {Array}	lines			one or more lines id for line hinge assign |

<a name="createLineHinge"></a>

## createLineHinge(no, comment, params) ⇒ <code>Object</code>
Creates line hinge

**Kind**: global function  
**Returns**: <code>Object</code> - Created line hinge  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line hinge, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | line hinge parameters, can be undefined |

<a name="CreateHingeConstant"></a>

## CreateHingeConstant(hinge) ⇒ <code>Object</code>
Creates line hinge constant

**Kind**: global function  
**Returns**: <code>Object</code> - Created hinge constant  

| Param | Type | Description |
| --- | --- | --- |
| hinge | <code>Boolean</code> \| <code>Float</code> | hinge input (true, false, number(stiffness)) |

<a name="CreateHinge"></a>

## CreateHinge(hinge) ⇒
Creates Hinge

**Kind**: global function  
**Returns**: Hinge object  

| Param | Type |
| --- | --- |
| hinge | <code>Object</code> | 

