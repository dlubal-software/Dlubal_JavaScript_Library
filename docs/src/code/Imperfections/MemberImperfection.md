---
title: MemberImperfection
---

# MemberImperfection

<a name="MemberImperfection"></a>

## MemberImperfection
**Kind**: global class  

* [MemberImperfection](#MemberImperfection)
    * [new MemberImperfection(no, imperfection_case_no, members_no, comment, params)](#new_MemberImperfection_new)
    * [.InitialSway(no, imperfection_case_no, members_no, coordinate_system, imperfection_direction, reference_to_members, comment, params)](#MemberImperfection+InitialSway)
    * [.InitialBow(no, imperfection_case_no, members_no, coordinate_system, imperfection_direction, reference_to_members, comment, params)](#MemberImperfection+InitialBow)
    * [.InitialBowAndCriterion(no, imperfection_case_no, members_no, coordinate_system, imperfection_direction, reference_to_members, comment, params)](#MemberImperfection+InitialBowAndCriterion)
    * [.Relative(initial_sway, active_criterion, active_bow)](#MemberImperfection+Relative)
    * [.Absolute(initial_sway, active_criterion, active_bow)](#MemberImperfection+Absolute)
    * [.EN_1992_1(basic_value_relative, height, columns_inn_row_count, reduction_factor_h_limit)](#MemberImperfection+EN_1992_1)
    * [.EN_1993_1_1(basic_value_relative, height, columns_inn_row_count)](#MemberImperfection+EN_1993_1_1)
    * [.InitialBow_EN_1993_1_1(section_design)](#MemberImperfection+InitialBow_EN_1993_1_1)
    * [.EN_1995_1_1(value, height)](#MemberImperfection+EN_1995_1_1)
    * [.ANSI_CURRENT(notional_load_coefficient, standard_factor_enumeration)](#MemberImperfection+ANSI_CURRENT)
    * [.InitialBow_ANSI_CURRENT(initial_bow)](#MemberImperfection+InitialBow_ANSI_CURRENT)
    * [.ANSI_GRAVITY_LOAD(load_case_combination_no, notional_load_coefficient, standard_factor_enumeration)](#MemberImperfection+ANSI_GRAVITY_LOAD)
    * [.InitialBow_ANSI_GRAVITY_LOAD(load_case_combination_no, initial_bow)](#MemberImperfection+InitialBow_ANSI_GRAVITY_LOAD)
    * [.CSA_CURRENT(value)](#MemberImperfection+CSA_CURRENT)
    * [.CSA_GRAVITY_LOAD(load_case_combination_no, value)](#MemberImperfection+CSA_GRAVITY_LOAD)
    * [.GB_50017_2017_CURRENT(basic_value_relative, structure_height, number_of_floors)](#MemberImperfection+GB_50017_2017_CURRENT)
    * [.GB_50017_2017_GRAVITY_LOAD(load_case_combination_no, notional_load_coefficient, number_of_floors)](#MemberImperfection+GB_50017_2017_GRAVITY_LOAD)
    * [.EN_1999_1_1(section_design)](#MemberImperfection+EN_1999_1_1)
    * [.GB_50017_2017(buckling_curve)](#MemberImperfection+GB_50017_2017)
    * [.GetMemberImperfection()](#MemberImperfection+GetMemberImperfection) ⇒
    * [.GetNo()](#MemberImperfection+GetNo) ⇒

<a name="new_MemberImperfection_new"></a>

### new MemberImperfection(no, imperfection_case_no, members_no, comment, params)
Creates Member imperfection

**Returns**: Member imperfection  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Member imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| members_no | <code>Array</code> | Array of members numbers |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="MemberImperfection+InitialSway"></a>

### memberImperfection.InitialSway(no, imperfection_case_no, members_no, coordinate_system, imperfection_direction, reference_to_members, comment, params)
Creates Initial Sway Member imperfection

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Member imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| members_no | <code>Array</code> | Array of members numbers |
| coordinate_system | <code>String/Number</code> | Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined.                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE" |
| reference_to_members | <code>Boolean</code> | Reference to list of members, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="MemberImperfection+InitialBow"></a>

### memberImperfection.InitialBow(no, imperfection_case_no, members_no, coordinate_system, imperfection_direction, reference_to_members, comment, params)
Creates Initial Bow Member imperfection

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Member imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| members_no | <code>Array</code> | Array of members numbers |
| coordinate_system | <code>String/Number</code> | Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined.                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE" |
| reference_to_members | <code>Boolean</code> | Reference to list of members, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="MemberImperfection+InitialBowAndCriterion"></a>

### memberImperfection.InitialBowAndCriterion(no, imperfection_case_no, members_no, coordinate_system, imperfection_direction, reference_to_members, comment, params)
Creates Initial Bow and Criterion Member imperfection

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Member imperfection, can be undefined |
| imperfection_case_no | <code>Number</code> | Imperfection case number |
| members_no | <code>Array</code> | Array of members numbers |
| coordinate_system | <code>String/Number</code> | Coordinate system, can be "LOCAL" or "PRINCIPAL" or number of user coordinate system. Can be undefined |
| imperfection_direction | <code>String</code> | Imperfection direction, can be undefined.                                                  Coordinate system "LOCAL": "LOCAL_Y", "LOCAL_Z""LOCAL_Y_NEGATIVE", "LOCAL_Z_NEGATIVE"                                                  Coordinate system "PRINCIPAL": "U", "V", "U_NEGATIVE", "V_NEGATIVE"                                                  User coordinate system: "X_U", "Y_V", "Z_W", "X_U_NEGATIVE", "Y_V_NEGATIVE", "Z_W_NEGATIVE" |
| reference_to_members | <code>Boolean</code> | Reference to list of members, can be undefined (false as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="MemberImperfection+Relative"></a>

### memberImperfection.Relative(initial_sway, active_criterion, active_bow)
Modifies Member imperfection to definition type Relative

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| initial_sway | <code>Number</code> | Relative initial sway / Initial bow / Initial bow and criterion, can be undefined (200 as default) |
| active_criterion | <code>String</code> | Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined. |
| active_bow | <code>Number</code> | Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value |

<a name="MemberImperfection+Absolute"></a>

### memberImperfection.Absolute(initial_sway, active_criterion, active_bow)
Modifies Member imperfection to definition type Absolute

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| initial_sway | <code>Number</code> | Absolute initial sway / bow |
| active_criterion | <code>String</code> | Active criterion, can be undefined ("Always" as default). Can be set only when Initial bow and criterion imperfection type is defined, in other case must be undefined. |
| active_bow | <code>Number</code> | Active bow from member slenderness, can be defined only when active criterion has "DEFINE" value |

<a name="MemberImperfection+EN_1992_1"></a>

### memberImperfection.EN\_1992\_1(basic_value_relative, height, columns_inn_row_count, reduction_factor_h_limit)
Modifies Member imperfection to definition type EN 1992 1

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| basic_value_relative | <code>Number</code> | Basic value, can be undefined (200 as default) |
| height | <code>Number</code> | Structure height, can be undefined (0.001 as default) |
| columns_inn_row_count | <code>Number</code> | Number of columns in one row, can be undefined (1 as default) |
| reduction_factor_h_limit | <code>Boolean</code> | Set alpha_h >= acc. to equation (5.1), can be undefined (true as default) |

<a name="MemberImperfection+EN_1993_1_1"></a>

### memberImperfection.EN\_1993\_1\_1(basic_value_relative, height, columns_inn_row_count)
Modifies Member imperfection to definition type EN 1993 1.1

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| basic_value_relative | <code>Number</code> | Basic value, can be undefined (200 as default) |
| height | <code>Number</code> | Structure height, can be undefined (0.001 as default) |
| columns_inn_row_count | <code>Number</code> | Number of columns in one row, can be undefined (1 as default) |

<a name="MemberImperfection+InitialBow_EN_1993_1_1"></a>

### memberImperfection.InitialBow\_EN\_1993\_1\_1(section_design)
Modifies Member imperfection to definition type EN 1993 1.1 ()

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| section_design | <code>String</code> | Section design, can be undefined ("PLASTIC" as default) |

<a name="MemberImperfection+EN_1995_1_1"></a>

### memberImperfection.EN\_1995\_1\_1(value, height)
Modifies Member imperfection to definition type EN 1995 1.1

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | Basic value / initial bow, can be undefined (200 as default with Initial sway, 400 with Initial bow) |
| height | <code>Number</code> | Structure height, can be undefined (0.001 as default). With Initial Bow imperfection is undefined. |

<a name="MemberImperfection+ANSI_CURRENT"></a>

### memberImperfection.ANSI\_CURRENT(notional_load_coefficient, standard_factor_enumeration)
Modifies Member imperfection to definition type ANSI/AISC 360-16 | Current

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| notional_load_coefficient | <code>Number</code> | Notional load coefficient, can be undefined (0.002 by default) |
| standard_factor_enumeration | <code>Number</code> | Factor alpha, can be undefined (LRFD by default). With Initial Bow imperfection is undefined. |

<a name="MemberImperfection+InitialBow_ANSI_CURRENT"></a>

### memberImperfection.InitialBow\_ANSI\_CURRENT(initial_bow)
Modifies Initial Bow Member imperfection to definition type ANSI/AISC 360-16 | Current

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| initial_bow | <code>Number</code> | Initial bow |

<a name="MemberImperfection+ANSI_GRAVITY_LOAD"></a>

### memberImperfection.ANSI\_GRAVITY\_LOAD(load_case_combination_no, notional_load_coefficient, standard_factor_enumeration)
Modifies Member imperfection to definition type ANSI/AISC 360-16 | Gravity Load

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| load_case_combination_no | <code>Number</code> | Axial forces Ny from load case or load combination number |
| notional_load_coefficient | <code>Number</code> | Notional load coefficient, can be undefined (0.002 by default) |
| standard_factor_enumeration | <code>Number</code> | Factor alpha, can be undefined (LRFD by default) |

<a name="MemberImperfection+InitialBow_ANSI_GRAVITY_LOAD"></a>

### memberImperfection.InitialBow\_ANSI\_GRAVITY\_LOAD(load_case_combination_no, initial_bow)
Modifies Member imperfection to definition type ANSI/AISC 360-16 | Gravity Load

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| load_case_combination_no | <code>Number</code> | Axial forces Ny from load case or load combination number |
| initial_bow | <code>Number</code> | Initial bow, can be undefined (1000 as default) |

<a name="MemberImperfection+CSA_CURRENT"></a>

### memberImperfection.CSA\_CURRENT(value)
Modifies Member imperfection to definition type CSA S16:19 | Current

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default) |

<a name="MemberImperfection+CSA_GRAVITY_LOAD"></a>

### memberImperfection.CSA\_GRAVITY\_LOAD(load_case_combination_no, value)
Modifies Member imperfection to definition type CSA S16:19 | Gravity Load

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| load_case_combination_no | <code>Number</code> | Axial forces Ny from load case or load combination number |
| value | <code>Number</code> | Notional load coefficient (Initial Sway) / Initial bow (Initial bow), can be undefined (0.005 / 1000 by default) |

<a name="MemberImperfection+GB_50017_2017_CURRENT"></a>

### memberImperfection.GB\_50017\_2017\_CURRENT(basic_value_relative, structure_height, number_of_floors)
Modifies Member imperfection to definition type GB 50017-2017 | Current

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| basic_value_relative | <code>Number</code> | Basic value relative, can be undefined (250 by default) |
| structure_height | <code>Number</code> | Structure height, can be undefined (0.001 by default) |
| number_of_floors | <code>Number</code> | Total number of floors, can be undefined (1 by default) |

<a name="MemberImperfection+GB_50017_2017_GRAVITY_LOAD"></a>

### memberImperfection.GB\_50017\_2017\_GRAVITY\_LOAD(load_case_combination_no, notional_load_coefficient, number_of_floors)
Modifies Member imperfection to definition type GB 50017-2017 | Gravity Load

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| load_case_combination_no | <code>Number</code> | Axial forces Ny from load case or load combination number |
| notional_load_coefficient | <code>Number</code> | Notional load coefficient, can be undefined (0.004 by default) |
| number_of_floors | <code>Number</code> | Total number of floors, can be undefined (1 by default) |

<a name="MemberImperfection+EN_1999_1_1"></a>

### memberImperfection.EN\_1999\_1\_1(section_design)
Modifies Member imperfection to definition type EN 1999-1-1

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| section_design | <code>String</code> | Section design, can be undefined ("PLASTIC" as default) |

<a name="MemberImperfection+GB_50017_2017"></a>

### memberImperfection.GB\_50017\_2017(buckling_curve)
Modifies Member imperfection to definition type GB 50017-2017

**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  

| Param | Type | Description |
| --- | --- | --- |
| buckling_curve | <code>String</code> | Buckling curve, can be undefined ("d" as default) |

<a name="MemberImperfection+GetMemberImperfection"></a>

### memberImperfection.GetMemberImperfection() ⇒
**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  
**Returns**: Member imperfection object  
<a name="MemberImperfection+GetNo"></a>

### memberImperfection.GetNo() ⇒
**Kind**: instance method of [<code>MemberImperfection</code>](#MemberImperfection)  
**Returns**: Member imperfection number  
