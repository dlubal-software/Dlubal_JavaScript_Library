---
title: Material
---

# Material

<a name="Material"></a>

## Material
**Kind**: global class  

* [Material](#Material)
    * [new Material(no, name, basic_material, comment, params)](#new_Material_new)
    * [.BasicProperties(modulus_of_elasticity, shear_modulus, definition_type, poisson_ratio, specific_weight, mass_density, thermal_coefficient)](#Material+BasicProperties) ⇒

<a name="new_Material_new"></a>

### new Material(no, name, basic_material, comment, params)
Create Material


| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Material, can be undefined |
| name | <code>String</code> | Name of Material, can be undefined |
| basic_material | <code>String</code> | Basic material type, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="Material+BasicProperties"></a>

### material.BasicProperties(modulus_of_elasticity, shear_modulus, definition_type, poisson_ratio, specific_weight, mass_density, thermal_coefficient) ⇒
Sets base material properties

**Kind**: instance method of [<code>Material</code>](#Material)  
**Returns**: Modified material  

| Param | Type | Description |
| --- | --- | --- |
| modulus_of_elasticity | <code>Number</code> | Modulus of elasticity, can be undefined (value specified by default) |
| shear_modulus | <code>Number</code> | Shear modulus, can be undefined (value specified by default) |
| definition_type | <code>Number</code> | Definition type, can be undefined (value specified by default) |
| poisson_ratio | <code>Number</code> | Poisson's ration, can be undefined (value specified by default) |
| specific_weight | <code>Number</code> | Specific weight, can be undefined (value specified by default) |
| mass_density | <code>Number</code> | Mass density, can be undefined (value specified by default) |
| thermal_coefficient | <code>Number</code> | Coefficient of thermal expansion, can be undefined (value specified by default) |

