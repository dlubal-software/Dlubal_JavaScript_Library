---
title: RsectionInternalForces
---

# RsectionInternalForces

## Classes

<dl>
<dt><a href="#RSectionInternalForces">RSectionInternalForces</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#get_internal_forces_system_types">get_internal_forces_system_types()</a></dt>
<dd><p>Shows list of all available internal forces system types</p>
</dd>
</dl>

<a name="RSectionInternalForces"></a>

## RSectionInternalForces
**Kind**: global class  

* [RSectionInternalForces](#RSectionInternalForces)
    * [new RSectionInternalForces(no, load_case_no, internal_forces_system, member_no, location_x, comment, params)](#new_RSectionInternalForces_new)
    * [.AxialForce(axial_force)](#RSectionInternalForces+AxialForce) ⇒
    * [.ShearForces(shear_force_1, shear_force_2)](#RSectionInternalForces+ShearForces) ⇒
    * [.TorsionalMoments(torsional_moment_m_xp, torsional_moment_m_xs)](#RSectionInternalForces+TorsionalMoments) ⇒
    * [.BendingMoments(bending_moment_1, bending_moment_2)](#RSectionInternalForces+BendingMoments) ⇒
    * [.Bimoment(bimoment_m_omega)](#RSectionInternalForces+Bimoment) ⇒
    * [.AssignInternalForces(axial_force, shear_forces, torsional_moments, bending_moments, bimoment)](#RSectionInternalForces+AssignInternalForces)

<a name="new_RSectionInternalForces_new"></a>

### new RSectionInternalForces(no, load_case_no, internal_forces_system, member_no, location_x, comment, params)
Creates Internal forces

**Returns**: Created Internal forces  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of internal forces, can be undefined |
| load_case_no | <code>Object</code> | Number of Load case |
| internal_forces_system | <code>String</code> | Internal forces relative to, can be undefined ("Y_Z" as default) |
| member_no | <code>Number</code> | Number of member, can be undefined |
| location_x | <code>Number</code> | Location, can be undefined (0 as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionInternalForces+AxialForce"></a>

### rSectionInternalForces.AxialForce(axial_force) ⇒
Sets axial force

**Kind**: instance method of [<code>RSectionInternalForces</code>](#RSectionInternalForces)  
**Returns**: Modified internal forces  

| Param | Type | Description |
| --- | --- | --- |
| axial_force | <code>Number</code> | Axial force |

<a name="RSectionInternalForces+ShearForces"></a>

### rSectionInternalForces.ShearForces(shear_force_1, shear_force_2) ⇒
Sets shear forces

**Kind**: instance method of [<code>RSectionInternalForces</code>](#RSectionInternalForces)  
**Returns**: Modified Internal forces  

| Param | Type | Description |
| --- | --- | --- |
| shear_force_1 | <code>Number</code> | Shear force Vu|Vy (in condition of internal forces system), can be undefined (0 by default) |
| shear_force_2 | <code>Number</code> | Shear force Vv|Vz (in condition of internal forces system), can be undefined (0 by default) |

<a name="RSectionInternalForces+TorsionalMoments"></a>

### rSectionInternalForces.TorsionalMoments(torsional_moment_m_xp, torsional_moment_m_xs) ⇒
Sets torsional moments

**Kind**: instance method of [<code>RSectionInternalForces</code>](#RSectionInternalForces)  
**Returns**: Modified Internal forces  

| Param | Type | Description |
| --- | --- | --- |
| torsional_moment_m_xp | <code>Number</code> | Torsional moment Mxp, can be undefined (0 by default) |
| torsional_moment_m_xs | <code>Number</code> | Torsional moment Mxs, can be undefined (0 by default) |

<a name="RSectionInternalForces+BendingMoments"></a>

### rSectionInternalForces.BendingMoments(bending_moment_1, bending_moment_2) ⇒
Sets bending moments

**Kind**: instance method of [<code>RSectionInternalForces</code>](#RSectionInternalForces)  
**Returns**: Modified Internal forces  

| Param | Type | Description |
| --- | --- | --- |
| bending_moment_1 | <code>Number</code> | Bending moment Mu|My (in condition of internal forces system), can be undefined (0 by default) |
| bending_moment_2 | <code>Number</code> | Bending moment Mv|Mz (in condition of internal forces system), can be undefined (0 by default) |

<a name="RSectionInternalForces+Bimoment"></a>

### rSectionInternalForces.Bimoment(bimoment_m_omega) ⇒
Sets bimoment

**Kind**: instance method of [<code>RSectionInternalForces</code>](#RSectionInternalForces)  
**Returns**: Modified Internal forces  

| Param | Type | Description |
| --- | --- | --- |
| bimoment_m_omega | <code>Number</code> | Bimoment |

<a name="RSectionInternalForces+AssignInternalForces"></a>

### rSectionInternalForces.AssignInternalForces(axial_force, shear_forces, torsional_moments, bending_moments, bimoment)
Assigns all internal forces

**Kind**: instance method of [<code>RSectionInternalForces</code>](#RSectionInternalForces)  

| Param | Type | Description |
| --- | --- | --- |
| axial_force | <code>Number</code> | Axial force |
| shear_forces | <code>Array</code> | Sher forces (Vy, Vz | Vu, Vv) |
| torsional_moments | <code>Array</code> | Torsional moments (Mxp, Mxs) |
| bending_moments | <code>Array</code> | Bending moments (My, Mz | Mu, Mv) |
| bimoment | <code>Number</code> | Bimoment |

<a name="get_internal_forces_system_types"></a>

## get\_internal\_forces\_system\_types()
Shows list of all available internal forces system types

**Kind**: global function  
