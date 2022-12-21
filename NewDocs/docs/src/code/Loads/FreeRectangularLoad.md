---
title: FreeRectangularLoad
---

# FreeRectangularLoad

## Classes

<dl>
<dt><a href="#FreeRectangularLoad">FreeRectangularLoad</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setFreeRectangularLoadParameters">setFreeRectangularLoadParameters(load, load_distribution, load_values)</a> ⇒ <code>Object</code></dt>
<dd><p>Set parameters to free rectangular load depend on load distribution</p>
</dd>
</dl>

<a name="FreeRectangularLoad"></a>

## FreeRectangularLoad
**Kind**: global class  

* [FreeRectangularLoad](#FreeRectangularLoad)
    * [new FreeRectangularLoad(no, load_case, surfaces, comment, params)](#new_FreeRectangularLoad_new)
    * [.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeRectangularLoad+Uniform) ⇒ <code>Object</code>
    * [.LinearX(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeRectangularLoad+LinearX) ⇒ <code>Object</code>
    * [.LinearY(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeRectangularLoad+LinearY) ⇒ <code>Object</code>
    * [.VaryingZ(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeRectangularLoad+VaryingZ) ⇒ <code>Object</code>
    * [.VaryingPerimeter(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeRectangularLoad+VaryingPerimeter) ⇒ <code>Object</code>
    * [.VaryingZAndPerimeter(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params)](#FreeRectangularLoad+VaryingZAndPerimeter) ⇒ <code>Object</code>

<a name="new_FreeRectangularLoad_new"></a>

### new FreeRectangularLoad(no, load_case, surfaces, comment, params)
Creates free rectangular load

**Returns**: <code>Object</code> - Created free rectangular load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeRectangularLoad+Uniform"></a>

### freeRectangularLoad.Uniform(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free rectangular uniform load

**Kind**: instance method of [<code>FreeRectangularLoad</code>](#FreeRectangularLoad)  
**Returns**: <code>Object</code> - Created free rectangular uniform load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular uniform load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeRectangularLoad+LinearX"></a>

### freeRectangularLoad.LinearX(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free rectangular linear in X load

**Kind**: instance method of [<code>FreeRectangularLoad</code>](#FreeRectangularLoad)  
**Returns**: <code>Object</code> - Created free rectangular linear in X load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular linear in X load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeRectangularLoad+LinearY"></a>

### freeRectangularLoad.LinearY(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free rectangular linear in Y load

**Kind**: instance method of [<code>FreeRectangularLoad</code>](#FreeRectangularLoad)  
**Returns**: <code>Object</code> - Created free rectangular linear in Y load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular linear in Y load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeRectangularLoad+VaryingZ"></a>

### freeRectangularLoad.VaryingZ(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free rectangular varying in Z load

**Kind**: instance method of [<code>FreeRectangularLoad</code>](#FreeRectangularLoad)  
**Returns**: <code>Object</code> - Created free rectangular varying in Z load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular varying in Z load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeRectangularLoad+VaryingPerimeter"></a>

### freeRectangularLoad.VaryingPerimeter(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free rectangular varying along perimeter load

**Kind**: instance method of [<code>FreeRectangularLoad</code>](#FreeRectangularLoad)  
**Returns**: <code>Object</code> - Created free rectangular varying along perimeter load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular varying along perimeter load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="FreeRectangularLoad+VaryingZAndPerimeter"></a>

### freeRectangularLoad.VaryingZAndPerimeter(no, load_case, surfaces, load_values, load_projection, load_direction, load_acting_region_from, load_acting_region_to, comment, params) ⇒ <code>Object</code>
Creates free rectangular varying in Z and along perimeter load

**Kind**: instance method of [<code>FreeRectangularLoad</code>](#FreeRectangularLoad)  
**Returns**: <code>Object</code> - Created free rectangular varying in Z and along perimeter load  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of free rectangular varying in Z and along perimeter load, can be undefined |
| load_case | <code>Object</code> | Load case |
| surfaces | <code>Array</code> | List of surface indexes |
| load_values | <code>Array</code> | Load parameters |
| load_projection | <code>String</code> | Load projection, can be undefined |
| load_direction | <code>String</code> | Load direction, can be undefined |
| load_acting_region_from | <code>Number</code> | Start of load acting region, can be undefined |
| load_acting_region_to | <code>Number</code> | End of load acting region, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Load parameters, can be undefined |

<a name="setFreeRectangularLoadParameters"></a>

## setFreeRectangularLoadParameters(load, load_distribution, load_values) ⇒ <code>Object</code>
Set parameters to free rectangular load depend on load distribution

**Kind**: global function  
**Returns**: <code>Object</code> - Returns modified load  

| Param | Type | Description |
| --- | --- | --- |
| load | <code>Object</code> | Load |
| load_distribution | <code>String</code> | Load distribution |
| load_values | <code>Array</code> | Load parameters depend of load distribution 												- "Uniform": [location, p, X1, Y1, X2, Y2, α] for location (1) "Corner points of rectangle" 												- 			 [location, p, Xc, Yc, a, b, α] for location (2) "Center and sides of rectangle" 												- "Linear in X": [location, p1, p2, X1, Y1, X2, Y2, α] for location (1) "Corner points of rectangle" 																 [location, p1, p2, Xc, Yc, a, b, α] for location (2) "Center and sides of rectangle" 												- "Linear in Y": [location, p1, p2, X1, Y1, X2, Y2, α] for location (1) "Corner points of rectangle" 																 [location, p1, p2, Xc, Yc, a, b, α] for location (2) "Center and sides of rectangle" 												- "Varying in Z": [location, p, X1, Y1, X2, Y2, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn]] for location (1) "Corner points of rectangle" 																  [location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn]] for location (2) "Center and sides of rectangle" 												- "Varying along Perimeter": [location, p, X1, Y1, X2, Y2, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)]] for location (1) "Corner points of rectangle" 																  			[location, p, Xc, Yc, a, b, [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)]] for location (2) "Center and sides of rectangle" 												- "Varying in Z and Perimeter": [location, p, X1, Y1, X2, Y2, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn], [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)] for location (1) "Corner points of rectangle" 																  			   [location, p, Xc, Yc, a, b, [Z1, kz1, pz1, Z2, kz2, pz2, ... Zn, kzn, pzn], [XA, YA, ZA, XB, YB, ZB, α0, (α1, kα1, pα1, α2, kα2, pα2 ... αn, kαn, pαn)] for location (2) "Center and sides of rectangle" |

