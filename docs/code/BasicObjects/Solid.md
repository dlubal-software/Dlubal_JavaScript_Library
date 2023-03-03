---
title: Solid
---

# Solid

<a name="Solid"></a>

## Solid
**Kind**: global class  

* [Solid](#Solid)
    * [new Solid(no, boundary_surfaces, material, comment, params)](#new_Solid_new)
    * [.Standard(no, boundary_surfaces, material, comment, params)](#Solid+Standard)
    * [.Gas(no, boundary_surfaces, material, gasssolid_no, comment, params)](#Solid+Gas)
    * [.Contact(no, boundary_surfaces, material, contact_solid_no, first_contact_surface, comment, params)](#Solid+Contact)

<a name="new_Solid_new"></a>

### new Solid(no, boundary_surfaces, material, comment, params)
Create Solid

**Returns**: Solid  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Solid |
| boundary_surfaces | <code>array</code> | List of boundary surfaces |
| material | <code>int</code> | Number of material |
| comment | <code>string</code> | Comment for the Solid |
| params | <code>dictionary</code> | Parameters of the Solid |

<a name="Solid+Standard"></a>

### solid.Standard(no, boundary_surfaces, material, comment, params)
Create Standard Solid

**Kind**: instance method of [<code>Solid</code>](#Solid)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Solid |
| boundary_surfaces | <code>array</code> | List of boundary surfaces |
| material | <code>int</code> | Number of material |
| comment | <code>string</code> | Comment for the Solid |
| params | <code>dictionary</code> | Parameters of the Solid |

<a name="Solid+Gas"></a>

### solid.Gas(no, boundary_surfaces, material, gasssolid_no, comment, params)
Create Gas

**Kind**: instance method of [<code>Solid</code>](#Solid)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Solid |
| boundary_surfaces | <code>array</code> | List of boundary surfaces |
| material | <code>int</code> | Number of material |
| gasssolid_no | <code>int</code> | Gass solid index |
| comment | <code>string</code> | Comment for the Solid |
| params | <code>dictionary</code> | Parameters of the Solid |

<a name="Solid+Contact"></a>

### solid.Contact(no, boundary_surfaces, material, contact_solid_no, first_contact_surface, comment, params)
Create Contact solid

**Kind**: instance method of [<code>Solid</code>](#Solid)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>int</code> | Number of Solid |
| boundary_surfaces | <code>array</code> | List of boundary surfaces |
| material | <code>int</code> | Number of material |
| contact_solid_no | <code>int</code> | Contact solid index |
| first_contact_surface | <code>int</code> | Number of first contact surface |
| comment | <code>string</code> | Comment for the Solid |
| params | <code>dictionary</code> | Parameters of the Solid |

