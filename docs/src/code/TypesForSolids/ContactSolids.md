---
title: ContactSolids
---

# ContactSolids

## Classes

<dl>
<dt><a href="#ContactSolid">ContactSolid</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createContactSolid">createContactSolid(no, comment, params)</a> ⇒</dt>
<dd><p>Creates contact solid (private)</p>
</dd>
</dl>

<a name="ContactSolid"></a>

## ContactSolid
**Kind**: global class  

* [ContactSolid](#ContactSolid)
    * [new ContactSolid(no, perpendicular_to_surface, parallel_to_surface, values, comment, params)](#new_ContactSolid_new)
    * [.AssignTo(solid_list)](#ContactSolid+AssignTo)

<a name="new_ContactSolid_new"></a>

### new ContactSolid(no, perpendicular_to_surface, parallel_to_surface, values, comment, params)
Creates contact solid

**Returns**: Created contact solid  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of contact solid |
| perpendicular_to_surface | <code>Number</code> | Contact perpendicular to surfaces, can be undefined ("Failure force transmission" by default) 														1 - Full force transmission 														2 - Failure under compression 														3 - Failure under tension |
| parallel_to_surface | <code>Number</code> | Contact parallel to surfaces, can be undefined ("Failure if contact perpendicular to surfaces failed" by default) 														1 - Full force transmission 														2 - Rigid friction 														3 - Rigid friction with limit 														4 - Elastic friction 														5 - Elastic friction with limit 														6 - Elastic solid behavior 														7 - Failure if contact perpendicular to surfaces failed (only for failure perpendicular - 2 and 3) |
| values | <code>Array</code> | Values depends on contact parallel to surface type, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Contact solid's parameters, can be undefined |

<a name="ContactSolid+AssignTo"></a>

### contactSolid.AssignTo(solid_list)
Assigns solids to contact solid

**Kind**: instance method of [<code>ContactSolid</code>](#ContactSolid)  

| Param | Type | Description |
| --- | --- | --- |
| solid_list | <code>Array</code> | List of solid's indexes |

<a name="createContactSolid"></a>

## createContactSolid(no, comment, params) ⇒
Creates contact solid (private)

**Kind**: global function  
**Returns**: Created contact solid  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of contact solid |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Contact solid's parameters, can be undefined |

