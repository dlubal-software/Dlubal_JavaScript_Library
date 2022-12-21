---
title: LoadCombination
---

# LoadCombination

## Functions

<dl>
<dt><a href="#LoadCombination">LoadCombination(no, design_situation_no, load_combination_items, comment, params)</a> ⇒</dt>
<dd><p>Creates load combination</p>
</dd>
<dt><a href="#createBaseLoadCombination">createBaseLoadCombination(no, comment, params)</a> ⇒</dt>
<dd><p>Creates load combination (private)</p>
</dd>
<dt><a href="#get_analysis_types">get_analysis_types()</a></dt>
<dd><p>Gets all available analysis types strings</p>
</dd>
<dt><a href="#get_initial_state_definition_types">get_initial_state_definition_types()</a></dt>
<dd><p>Gets all available initial state definition types strings</p>
</dd>
</dl>

<a name="LoadCombination"></a>

## LoadCombination(no, design_situation_no, load_combination_items, comment, params) ⇒
Creates load combination

**Kind**: global function  
**Returns**: Created load combination  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Load combination index, can be undefined |
| design_situation_no | <code>Object</code> | Index of design situation, can be undefined |
| load_combination_items | <code>Array</code> | Items of load combination - load case index and factor [[LC1no,factor],[LC2no,factor]] |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |


* [LoadCombination(no, design_situation_no, load_combination_items, comment, params)](#LoadCombination) ⇒
    * [.StaticAnalysis(no, static_analysis_settings, design_situation, comment, params)](#LoadCombination+StaticAnalysis) ⇒
    * [.ConsiderImperfection(imperfection_case, enabled)](#LoadCombination+ConsiderImperfection) ⇒
    * [.StructureModification(structure_modification, enabled)](#LoadCombination+StructureModification) ⇒
    * [.ConsiderInitialState(initial_state_case, initial_state_definition_type, enabled)](#LoadCombination+ConsiderInitialState) ⇒
    * [.CriticalLoadForCalculation(stability_analysis_settings, enabled)](#LoadCombination+CriticalLoadForCalculation) ⇒
    * [.CreepCausedByPermanentLoadingCase(creep_caused_by_permanent_loading_case, enabled)](#LoadCombination+CreepCausedByPermanentLoadingCase) ⇒
    * [.ConsiderConstructionStage(construction_stage, enabled)](#LoadCombination+ConsiderConstructionStage) ⇒
    * [.AssignLoadCases(load_combination_items)](#LoadCombination+AssignLoadCases) ⇒
    * [.ToSolve(to_solve)](#LoadCombination+ToSolve) ⇒

<a name="LoadCombination+StaticAnalysis"></a>

### loadCombination.StaticAnalysis(no, static_analysis_settings, design_situation, comment, params) ⇒
Sets analysis type and static analysis settings

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Load combination index, can be undefined |
| static_analysis_settings | <code>Object</code> | Static analysis settings |
| design_situation | <code>Object</code> | Design situation |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="LoadCombination+ConsiderImperfection"></a>

### loadCombination.ConsiderImperfection(imperfection_case, enabled) ⇒
Sets imperfection case

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| imperfection_case | <code>Object</code> | Imperfection case, can be undefined (in case of disabling ) |
| enabled | <code>Boolean</code> | Enable/disable imperfection case, can be undefined (true as default) |

<a name="LoadCombination+StructureModification"></a>

### loadCombination.StructureModification(structure_modification, enabled) ⇒
Sets structure modification

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| structure_modification | <code>Object</code> | Structure modification, can be undefined (in case of disabling) |
| enabled | <code>Boolean</code> | Enable/disable structure modification, can be undefined (true as default) |

<a name="LoadCombination+ConsiderInitialState"></a>

### loadCombination.ConsiderInitialState(initial_state_case, initial_state_definition_type, enabled) ⇒
Sets initial state from

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| initial_state_case | <code>Object</code> | Initial state, can be undefined (in case of disabling) |
| initial_state_definition_type | <code>String</code> | Initial state definition type, can be undefined (DEFINITION_TYPE_FINAL_STATE as default) |
| enabled | <code>Boolean</code> | Enable/disable initial state, can be undefined (true as default) |

<a name="LoadCombination+CriticalLoadForCalculation"></a>

### loadCombination.CriticalLoadForCalculation(stability_analysis_settings, enabled) ⇒
Calculates critical load

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| stability_analysis_settings | <code>Object</code> | Stability analysis settings, can be undefined (in case of disabling) |
| enabled | <code>Boolean</code> | Enable/disable initial state, can be undefined (true as default) |

<a name="LoadCombination+CreepCausedByPermanentLoadingCase"></a>

### loadCombination.CreepCausedByPermanentLoadingCase(creep_caused_by_permanent_loading_case, enabled) ⇒
Creep caused by permanent load from

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| creep_caused_by_permanent_loading_case | <code>Object</code> | Creep caused by permanent loading case, can be undefined (in case of disabling) |
| enabled | <code>Boolean</code> | Enable/disable loading case, can be undefined (true as default) |

<a name="LoadCombination+ConsiderConstructionStage"></a>

### loadCombination.ConsiderConstructionStage(construction_stage, enabled) ⇒
Consider construction stage

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| construction_stage | <code>Object</code> | Construction stage, can be undefined (in case of disabling) |
| enabled | <code>Boolean</code> | Enable/disable construction stage, can be undefined (true as default) |

<a name="LoadCombination+AssignLoadCases"></a>

### loadCombination.AssignLoadCases(load_combination_items) ⇒
Assigns load cases

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| load_combination_items | <code>Array</code> | Load combination itemns [[load case no, factor], .... ] |

<a name="LoadCombination+ToSolve"></a>

### loadCombination.ToSolve(to_solve) ⇒
Sets load combination to solve

**Kind**: instance method of [<code>LoadCombination</code>](#LoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| to_solve | <code>Boolean</code> | Enable/disable load combination to solve, can be undefined (true as default) |

<a name="createBaseLoadCombination"></a>

## createBaseLoadCombination(no, comment, params) ⇒
Creates load combination (private)

**Kind**: global function  
**Returns**: Created load combination  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Load combination index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="get_analysis_types"></a>

## get\_analysis\_types()
Gets all available analysis types strings

**Kind**: global function  
<a name="get_initial_state_definition_types"></a>

## get\_initial\_state\_definition\_types()
Gets all available initial state definition types strings

**Kind**: global function  
