---
title: Section
---

# Section

<a name="Section"></a>

## Section
**Kind**: global class  

* [Section](#Section)
    * [new Section(no, section_name, material_no, comment, params)](#new_Section_new)
    * [.GetNo()](#Section+GetNo) ⇒
    * [.SectionType(section_type)](#Section+SectionType) ⇒
    * [.ManufacturingType(manufacturing_type)](#Section+ManufacturingType) ⇒
    * [.SectionProperties(area_shear_y, area_shear_z, warping, width_temperature_load, depth_temperature_load)](#Section+SectionProperties) ⇒
    * [.DeactivateShearStiffness(deactivated)](#Section+DeactivateShearStiffness) ⇒
    * [.Rotation(rotation_angle)](#Section+Rotation) ⇒
    * [.ThinWalledModel(thin_walled_model)](#Section+ThinWalledModel) ⇒
    * [.UsNotation(us_spelling_of_properties)](#Section+UsNotation) ⇒
    * [.StressSmoothing(stress_smoothing_to_avoid_singularities)](#Section+StressSmoothing) ⇒
    * [.DeactivateWarpingStiffness(deactivated)](#Section+DeactivateWarpingStiffness) ⇒
    * [.CostEstimation(cost_estimation)](#Section+CostEstimation) ⇒
    * [.CostEstimationValues(member_weight, member_volume, member_surface, member_length)](#Section+CostEstimationValues) ⇒
    * [.EmissionEstimation(emission_estimation)](#Section+EmissionEstimation) ⇒
    * [.EmissionEstimationValues(member_weight, member_volume, member_surface, member_length)](#Section+EmissionEstimationValues) ⇒
    * [.Optimization(optimization)](#Section+Optimization) ⇒

<a name="new_Section_new"></a>

### new Section(no, section_name, material_no, comment, params)
Create Section

**Returns**: Section  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of the Section, can be undefined |
| section_name | <code>String</code> | Name of the Section, can be undefined (IPE 300 by default) |
| material_no | <code>Number</code> | Number of the material |
| comment | <code>String</code> | Comment |
| params | <code>Object</code> | Parameters |

<a name="Section+GetNo"></a>

### section.GetNo() ⇒
**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Number of Section  
<a name="Section+SectionType"></a>

### section.SectionType(section_type) ⇒
Sets section type

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| section_type | <code>String</code> | Section type |

<a name="Section+ManufacturingType"></a>

### section.ManufacturingType(manufacturing_type) ⇒
Sets manufacturing type

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| manufacturing_type | <code>String</code> | Manufacturing type |

<a name="Section+SectionProperties"></a>

### section.SectionProperties(area_shear_y, area_shear_z, warping, width_temperature_load, depth_temperature_load) ⇒
Sets Section properties

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| area_shear_y | <code>Number</code> | Shear sectional areas, can be undefined |
| area_shear_z | <code>Number</code> | Shear sectional areas, can be undefined |
| warping | <code>Number</code> | Warping, van be undefined |
| width_temperature_load | <code>Number</code> | Width (for non-uniform temperature loads), can be undefined |
| depth_temperature_load | <code>Number</code> | Depth (for non-uniform temperature loads), can be undefined |

<a name="Section+DeactivateShearStiffness"></a>

### section.DeactivateShearStiffness(deactivated) ⇒
Deactivates shear stiffness

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| deactivated | <code>Boolean</code> | Shear stiffness deactivation/activation, can be undefined (true as default) |

<a name="Section+Rotation"></a>

### section.Rotation(rotation_angle) ⇒
Sets Section rotation

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| rotation_angle | <code>Number</code> | Rotation angle |

<a name="Section+ThinWalledModel"></a>

### section.ThinWalledModel(thin_walled_model) ⇒
Sets thin-walled model

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| thin_walled_model | <code>Boolean</code> | Thin-walled model enabling/disabling, can be undefined (true as default) |

<a name="Section+UsNotation"></a>

### section.UsNotation(us_spelling_of_properties) ⇒
Sets US notation for section properties

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| us_spelling_of_properties | <code>Boolean</code> | US notation enabling/disabling, can be undefined (true as default) |

<a name="Section+StressSmoothing"></a>

### section.StressSmoothing(stress_smoothing_to_avoid_singularities) ⇒
Sets stress smoothing to avoid singularities

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| stress_smoothing_to_avoid_singularities | <code>Boolean</code> | Stress smoothing enabling/disabling, can be undefined (true as default) |

<a name="Section+DeactivateWarpingStiffness"></a>

### section.DeactivateWarpingStiffness(deactivated) ⇒
Deactivates warping stiffness

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| deactivated | <code>Boolean</code> | Warping stiffness deactivation/activation, can be undefined (true as default). Torsional Warping add-on must be active. |

<a name="Section+CostEstimation"></a>

### section.CostEstimation(cost_estimation) ⇒
Sets cost estimation

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| cost_estimation | <code>Boolean</code> | Cost estimation apply from material enabling/disabling, can be undefined (true as default). Optimization & Costs / CO2 Emission Estimation add-on must be active. |

<a name="Section+CostEstimationValues"></a>

### section.CostEstimationValues(member_weight, member_volume, member_surface, member_length) ⇒
Sets Cost estimation values

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| member_weight | <code>Number</code> | Member weight, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |
| member_volume | <code>Number</code> | Member volume, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |
| member_surface | <code>Number</code> | Member surface, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |
| member_length | <code>Number</code> | Member length, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |

<a name="Section+EmissionEstimation"></a>

### section.EmissionEstimation(emission_estimation) ⇒
Sets estimation of CO2 emissions

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| emission_estimation | <code>Boolean</code> | Estimation of CO2 emissions enabling/disabling, can be undefined (true as default). Optimization & Costs / CO2 Emission Estimation add-on must be active. |

<a name="Section+EmissionEstimationValues"></a>

### section.EmissionEstimationValues(member_weight, member_volume, member_surface, member_length) ⇒
Sets Emission estimation values

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| member_weight | <code>Number</code> | Member weight, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |
| member_volume | <code>Number</code> | Member volume, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |
| member_surface | <code>Number</code> | Member surface, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |
| member_length | <code>Number</code> | Member length, can be undefined. Optimization & Costs / CO2 Emission Estimation add-on must be active. |

<a name="Section+Optimization"></a>

### section.Optimization(optimization) ⇒
Sets optimization

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: Modified Section  

| Param | Type | Description |
| --- | --- | --- |
| optimization | <code>Boolean</code> | Optimization enabling/disabling, can be undefined (true as default). Optimization & Costs / CO2 Emission Estimation add-on must be active. |

