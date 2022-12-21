---
title: DesignSituation
---

# DesignSituation

## Classes

<dl>
<dt><a href="#DesignSituation">DesignSituation</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#get_design_situation_types">get_design_situation_types()</a></dt>
<dd><p>Shows list of all available design situation types</p>
</dd>
<dt><a href="#createBaseDesignSituation">createBaseDesignSituation(no, params, comment)</a> ⇒</dt>
<dd><p>Creates base design situation (private)</p>
</dd>
</dl>

<a name="DesignSituation"></a>

## DesignSituation
**Kind**: global class  

* [DesignSituation](#DesignSituation)
    * [new DesignSituation(no, design_situation_type, params, comment)](#new_DesignSituation_new)
    * [.GetDesignSituation()](#DesignSituation+GetDesignSituation) ⇒
    * [.GetNo()](#DesignSituation+GetNo) ⇒
    * [.SetCombinationWizard(combination_wizard_no)](#DesignSituation+SetCombinationWizard)
    * [.SetConsiderInclusiveExclusiveLoadCases(relationship_between_load_cases_no)](#DesignSituation+SetConsiderInclusiveExclusiveLoadCases)
    * [.SetActive(active)](#DesignSituation+SetActive)

<a name="new_DesignSituation_new"></a>

### new DesignSituation(no, design_situation_type, params, comment)
Creates design situation object

**Returns**: Created design situation object  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of design situation, can be undefined |
| design_situation_type | <code>String</code> | Design situation type |
| params | <code>Object</code> | Additional parameters, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |

<a name="DesignSituation+GetDesignSituation"></a>

### designSituation.GetDesignSituation() ⇒
Returns internal Design Situation object

**Kind**: instance method of [<code>DesignSituation</code>](#DesignSituation)  
**Returns**: Internal Design Situation object  
<a name="DesignSituation+GetNo"></a>

### designSituation.GetNo() ⇒
Returns number of Design Situation

**Kind**: instance method of [<code>DesignSituation</code>](#DesignSituation)  
**Returns**: Number of Design Situation  
<a name="DesignSituation+SetCombinationWizard"></a>

### designSituation.SetCombinationWizard(combination_wizard_no)
Sets combination wizard

**Kind**: instance method of [<code>DesignSituation</code>](#DesignSituation)  

| Param | Type | Description |
| --- | --- | --- |
| combination_wizard_no | <code>Object</code> | Combination wizard number |

<a name="DesignSituation+SetConsiderInclusiveExclusiveLoadCases"></a>

### designSituation.SetConsiderInclusiveExclusiveLoadCases(relationship_between_load_cases_no)
Sets relationship between load cases

**Kind**: instance method of [<code>DesignSituation</code>](#DesignSituation)  

| Param | Type | Description |
| --- | --- | --- |
| relationship_between_load_cases_no | <code>Object</code> | Relationship between load cases number |

<a name="DesignSituation+SetActive"></a>

### designSituation.SetActive(active)
Enables/disables design situation

**Kind**: instance method of [<code>DesignSituation</code>](#DesignSituation)  

| Param | Type | Description |
| --- | --- | --- |
| active | <code>Boolean</code> | Design situation is enabled or disabled, can be undefined (true as default) |

<a name="get_design_situation_types"></a>

## get\_design\_situation\_types()
Shows list of all available design situation types

**Kind**: global function  
<a name="createBaseDesignSituation"></a>

## createBaseDesignSituation(no, params, comment) ⇒
Creates base design situation (private)

**Kind**: global function  
**Returns**: Created design situation object  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of design situation, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |

