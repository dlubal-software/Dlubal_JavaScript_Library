---
title: RsectionLoadCase
---

# RsectionLoadCase

## Classes

<dl>
<dt><a href="#RSectionLoadCase">RSectionLoadCase</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createBaseLoadCase">createBaseLoadCase(no, action_category, name, to_solve, comment, params)</a> ⇒</dt>
<dd></dd>
<dt><a href="#get_action_categories_types">get_action_categories_types()</a></dt>
<dd><p>Shows list of all available design situation types</p>
</dd>
</dl>

<a name="RSectionLoadCase"></a>

## RSectionLoadCase
**Kind**: global class  

* [RSectionLoadCase](#RSectionLoadCase)
    * [new RSectionLoadCase(no, action_category, name, to_solve, comment, params)](#new_RSectionLoadCase_new)
    * [.GetLoadcase()](#RSectionLoadCase+GetLoadcase)
    * [.GetNo()](#RSectionLoadCase+GetNo)

<a name="new_RSectionLoadCase_new"></a>

### new RSectionLoadCase(no, action_category, name, to_solve, comment, params)
Create RSection Load case

**Returns**: Load case  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Load case, can be undefined |
| action_category | <code>String</code> | Action category |
| name | <code>String</code> | Name, can be undefined |
| to_solve | <code>Boolean</code> | To solve, can be undefined (true as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="RSectionLoadCase+GetLoadcase"></a>

### rSectionLoadCase.GetLoadcase()
Returns load case object

**Kind**: instance method of [<code>RSectionLoadCase</code>](#RSectionLoadCase)  
<a name="RSectionLoadCase+GetNo"></a>

### rSectionLoadCase.GetNo()
Returns load case number

**Kind**: instance method of [<code>RSectionLoadCase</code>](#RSectionLoadCase)  
<a name="createBaseLoadCase"></a>

## createBaseLoadCase(no, action_category, name, to_solve, comment, params) ⇒
**Kind**: global function  
**Returns**: Load case  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Number of Load case, can be undefined |
| action_category | <code>String</code> | Action category |
| name | <code>String</code> | Name, can be undefined |
| to_solve | <code>Boolean</code> | To solve, can be undefined (true as default) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Parameters, can be undefined |

<a name="get_action_categories_types"></a>

## get\_action\_categories\_types()
Shows list of all available design situation types

**Kind**: global function  
