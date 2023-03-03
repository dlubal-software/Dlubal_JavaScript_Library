---
title: RsectionLoadCombination
---

# RsectionLoadCombination

## Classes

<dl>
<dt><a href="#RSectionLoadCombination">RSectionLoadCombination</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseLoadCombinations">createBaseLoadCombinations(no, name, to_solve, comment, params)</a> ⇒</dt>
<dd><p>Create RSection Load combination</p>
</dd>
</dl>

<a name="RSectionLoadCombination"></a>

## RSectionLoadCombination
**Kind**: global class  

* [RSectionLoadCombination](#RSectionLoadCombination)
    * [new RSectionLoadCombination(no, load_combination_items, name, to_solve, comment, params)](#new_RSectionLoadCombination_new)
    * [.AssignLoadCases(load_combination_items)](#RSectionLoadCombination+AssignLoadCases) ⇒

<a name="new_RSectionLoadCombination_new"></a>

### new RSectionLoadCombination(no, load_combination_items, name, to_solve, comment, params)
Create RSection Load combination

**Returns**: Load combination  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Load case, can be undefined |
| load_combination_items | <code>Array</code> | Items of load combination - load case index and factor [[LC1no, factor], [LC2no, factor]] |
| name | <code>String</code> | Name, can be undefined |
| to_solve | <code>Boolean</code> | To solve, can be undefined (true as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLoadCombination+AssignLoadCases"></a>

### rSectionLoadCombination.AssignLoadCases(load_combination_items) ⇒
Assigns load cases

**Kind**: instance method of [<code>RSectionLoadCombination</code>](#RSectionLoadCombination)  
**Returns**: Modified load combination  

| Param | Type | Description |
| --- | --- | --- |
| load_combination_items | <code>Array</code> | Load combination itemns [[load case no, factor], .... ] |

<a name="createBaseLoadCombinations"></a>

## createBaseLoadCombinations(no, name, to_solve, comment, params) ⇒
Create RSection Load combination

**Kind**: global function  
**Returns**: Load combination  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Load case, can be undefined |
| name | <code>String</code> | Name, can be undefined |
| to_solve | <code>Boolean</code> | To solve, can be undefined (true as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

