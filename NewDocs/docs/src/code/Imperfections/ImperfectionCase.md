---
title: ImperfectionCase
---

# ImperfectionCase

<a name="ImperfectionCase"></a>

## ImperfectionCase
**Kind**: global class  

* [ImperfectionCase](#ImperfectionCase)
    * [new ImperfectionCase(no, comment, params)](#new_ImperfectionCase_new)
    * [.GetNo()](#ImperfectionCase+GetNo) ⇒
    * [.GetImperfectionCase()](#ImperfectionCase+GetImperfectionCase) ⇒
    * [.LocalImperfection(no, load_cases_to_assign, assign_to_all_load, is_active, comment, params)](#ImperfectionCase+LocalImperfection)
    * [.Notional(no, load_cases_to_assign, notional_loads_from_load_case_no, assign_to_all_load, is_active, comment, params)](#ImperfectionCase+Notional)
    * [.InitialSway(no, load_cases_to_assign, level_imperfections, coordinate_system_no, level_direction, imperfection_direction, sway_coefficients_reciprocal, assign_to_all_load, is_active, comment, params)](#ImperfectionCase+InitialSway)
    * [.StaticDeformation(no, load_cases_to_assign, source_type, shape_from_no, imperfection_magnitude, magnitude_assignment_type, node_no, coordinate_system_no, imperfection_direction, assign_to_all_load, is_active, comment, params)](#ImperfectionCase+StaticDeformation)
    * [.GroupOfImperfection(no, load_cases_to_assign, imperfection_cases, assign_to_all_load, is_active, comment, params)](#ImperfectionCase+GroupOfImperfection)
    * [.GetImperfectionCase()](#ImperfectionCase+GetImperfectionCase) ⇒
    * [.GetNo()](#ImperfectionCase+GetNo) ⇒

<a name="new_ImperfectionCase_new"></a>

### new ImperfectionCase(no, comment, params)
Creates Imperfection case

**Returns**: Created empty Imperfection case  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of Imperfection case, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="ImperfectionCase+GetNo"></a>

### imperfectionCase.GetNo() ⇒
**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  
**Returns**: Imperfection case number  
<a name="ImperfectionCase+GetImperfectionCase"></a>

### imperfectionCase.GetImperfectionCase() ⇒
**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  
**Returns**: Imperfection case object  
<a name="ImperfectionCase+LocalImperfection"></a>

### imperfectionCase.LocalImperfection(no, load_cases_to_assign, assign_to_all_load, is_active, comment, params)
Creates Local imperfection case

**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of Imperfection case, can be undefined |
| load_cases_to_assign | <code>Array</code> | Load cases to assign (array of numbers) |
| assign_to_all_load | <code>Boolean</code> | Assign to all load combinations without assigned imperfection case, can be undefined (true as default) |
| is_active | <code>Boolean</code> | Is imperfection case active, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="ImperfectionCase+Notional"></a>

### imperfectionCase.Notional(no, load_cases_to_assign, notional_loads_from_load_case_no, assign_to_all_load, is_active, comment, params)
Creates Notional loads from load case imperfection case

**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of imperfection case, can be undefined |
| load_cases_to_assign | <code>Array</code> | Load cases to assign (array of numbers) |
| notional_loads_from_load_case_no | <code>Number</code> | Notional loads from load case |
| assign_to_all_load | <code>Boolean</code> | Assign to all load combinations without assigned imperfection case, can be undefined (true as default) |
| is_active | <code>Boolean</code> | Is imperfection case active, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="ImperfectionCase+InitialSway"></a>

### imperfectionCase.InitialSway(no, load_cases_to_assign, level_imperfections, coordinate_system_no, level_direction, imperfection_direction, sway_coefficients_reciprocal, assign_to_all_load, is_active, comment, params)
Creates Initial sway imperfection case

**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of imperfection case, can be undefined |
| load_cases_to_assign | <code>Array</code> | Load cases to assign (array of numbers) |
| level_imperfections | <code>Array</code> | Level imperfections ([level1, [level2, theta_1_x, theta_1_y], ... [level_n, theta_n_x, theta_n_x]]) |
| coordinate_system_no | <code>Number</code> | Coordinate system, can be undefined (Global XYZ by default) |
| level_direction | <code>String</code> | Level direction, can be undefined (GLOBAL_IN_Z by default if Global XYZ is specified, otherwise USER_DEFINED_IN_W by default) |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined (XY by default) |
| sway_coefficients_reciprocal | <code>Boolean</code> | Sway coefficient as reciprocal by 1, can be undefined (true as default) |
| assign_to_all_load | <code>Boolean</code> | Assign to all load combinations without assigned imperfection case, can be undefined (true as default) |
| is_active | <code>Boolean</code> | Is imperfection case active, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="ImperfectionCase+StaticDeformation"></a>

### imperfectionCase.StaticDeformation(no, load_cases_to_assign, source_type, shape_from_no, imperfection_magnitude, magnitude_assignment_type, node_no, coordinate_system_no, imperfection_direction, assign_to_all_load, is_active, comment, params)
Returns Static deformation Imperfection case

**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Imperfection case, can be undefined |
| load_cases_to_assign | <code>Array</code> | Array of load case numbers |
| source_type | <code>String</code> | Source type, can be undefined ("Select load case" by default) |
| shape_from_no | <code>Number</code> | Static deformation from load case (source type is Select load case) or from load combination (source type is Select load combination) |
| imperfection_magnitude | <code>Number</code> | Imperfection magnitude - Imperfection magnitude |
| magnitude_assignment_type | <code>String</code> | Imperfection magnitude - reference location, can be undefined ("Location with largest displacement" by default) |
| node_no | <code>Number</code> | Node number, additional parameter to "Node no." reference location, with "Location with largest displacement" must be undefined |
| coordinate_system_no | <code>Number</code> | Coordinate system, can be undefined (Global XYZ by default) |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined (XY by default) |
| assign_to_all_load | <code>Boolean</code> | Assign to all load combinations without assigned imperfection case, can be undefined (true as default) |
| is_active | <code>Boolean</code> | Is imperfection case active, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="ImperfectionCase+GroupOfImperfection"></a>

### imperfectionCase.GroupOfImperfection(no, load_cases_to_assign, imperfection_cases, assign_to_all_load, is_active, comment, params)
Returns Group of Imperfection cases

**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Imperfection case, can be undefined |
| load_cases_to_assign | <code>Array</code> | Array of load case numbers |
| imperfection_cases | <code>Array</code> | Imperfection cases ([[case_no_1, factor_1, (comment_1)], ... [case_no_n, factor_n, (comment_n)]]) |
| assign_to_all_load | <code>Boolean</code> | Assign to all load combinations without assigned imperfection case, can be undefined (true as default) |
| is_active | <code>Boolean</code> | Is imperfection case active, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="ImperfectionCase+GetImperfectionCase"></a>

### imperfectionCase.GetImperfectionCase() ⇒
**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  
**Returns**: Imperfection case object  
<a name="ImperfectionCase+GetNo"></a>

### imperfectionCase.GetNo() ⇒
**Kind**: instance method of [<code>ImperfectionCase</code>](#ImperfectionCase)  
**Returns**: Imperfection case number  
