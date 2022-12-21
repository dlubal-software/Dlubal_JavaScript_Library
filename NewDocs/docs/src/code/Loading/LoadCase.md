---
title: LoadCase
---

# LoadCase

## Classes

<dl>
<dt><a href="#LoadCase">LoadCase</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#actionCategory_dict">actionCategory_dict</a></dt>
<dd><p>Dictionary</p>
</dd>
</dl>

<a name="LoadCase"></a>

## LoadCase
**Kind**: global class  

* [LoadCase](#LoadCase)
    * [new LoadCase(no, name, comment, params)](#new_LoadCase_new)
    * [.StaticAnalysis(no, name, staticAnalysisSettingsNo, ActionCategory, selfWeighParams, stabilityAnalysisSettingsNo, comment, params)](#LoadCase+StaticAnalysis) ⇒
    * [.ModalAnalysis(no, name, modalAnalysisSettingsNo, importMassesFrom, selfWeighParams, comment, params)](#LoadCase+ModalAnalysis) ⇒
    * [.ResponseSpectrumAnalysis(no, name, responseSpectrumAnalysisSettingsNo, importModalAnalysisFrom, responseSpectrums, comment, params)](#LoadCase+ResponseSpectrumAnalysis) ⇒
    * [.WindSimulation(no, name, staticAnalysisSettingsNo, windAnalysisSettingsNo, windProfileNo, windDirection, terrainOffset, stabilityAnalysisSettingsNo, comment, params)](#LoadCase+WindSimulation) ⇒
    * [.ConsiderImperfection(imperfectionCaseNo)](#LoadCase+ConsiderImperfection)
    * [.SetStructureModification(structureModificationNo)](#LoadCase+SetStructureModification)
    * [.GetActionCategoryList()](#LoadCase+GetActionCategoryList) ⇒
    * [.GetLoadCase()](#LoadCase+GetLoadCase) ⇒
    * [.GetNo()](#LoadCase+GetNo) ⇒

<a name="new_LoadCase_new"></a>

### new LoadCase(no, name, comment, params)
Creates load case

**Returns**: Object of LoadCase  

| Param | Type |
| --- | --- |
| no | <code>Number</code> | 
| name | <code>String</code> | 
| comment | <code>String</code> | 
| params | <code>Object</code> | 

<a name="LoadCase+StaticAnalysis"></a>

### loadCase.StaticAnalysis(no, name, staticAnalysisSettingsNo, ActionCategory, selfWeighParams, stabilityAnalysisSettingsNo, comment, params) ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: Object of LoadCase  

| Param | Type |
| --- | --- |
| no | <code>Number</code> | 
| name | <code>String</code> | 
| staticAnalysisSettingsNo | <code>Number</code> | 
| ActionCategory | <code>String</code> | 
| selfWeighParams | <code>Array</code> | 
| stabilityAnalysisSettingsNo | <code>Number</code> | 
| comment | <code>String</code> | 
| params | <code>Object</code> | 

<a name="LoadCase+ModalAnalysis"></a>

### loadCase.ModalAnalysis(no, name, modalAnalysisSettingsNo, importMassesFrom, selfWeighParams, comment, params) ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: Object of LoadCase  

| Param | Type |
| --- | --- |
| no | <code>Number</code> | 
| name | <code>String</code> | 
| modalAnalysisSettingsNo | <code>Number</code> | 
| importMassesFrom | <code>Boolean</code> | 
| selfWeighParams | <code>Array</code> | 
| comment | <code>String</code> | 
| params | <code>Object</code> | 

<a name="LoadCase+ResponseSpectrumAnalysis"></a>

### loadCase.ResponseSpectrumAnalysis(no, name, responseSpectrumAnalysisSettingsNo, importModalAnalysisFrom, responseSpectrums, comment, params) ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: Object of LoadCase  

| Param | Type |
| --- | --- |
| no | <code>Number</code> | 
| name | <code>String</code> | 
| responseSpectrumAnalysisSettingsNo | <code>Number</code> | 
| importModalAnalysisFrom | <code>Number</code> | 
| responseSpectrums | <code>Array</code> | 
| comment | <code>String</code> | 
| params | <code>Object</code> | 

<a name="LoadCase+WindSimulation"></a>

### loadCase.WindSimulation(no, name, staticAnalysisSettingsNo, windAnalysisSettingsNo, windProfileNo, windDirection, terrainOffset, stabilityAnalysisSettingsNo, comment, params) ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: Object of LoadCase  

| Param | Type |
| --- | --- |
| no | <code>Number</code> | 
| name | <code>String</code> | 
| staticAnalysisSettingsNo | <code>Number</code> | 
| windAnalysisSettingsNo | <code>Number</code> | 
| windProfileNo | <code>Number</code> | 
| windDirection | <code>String</code> | 
| terrainOffset | <code>Number</code> | 
| stabilityAnalysisSettingsNo | <code>Number</code> | 
| comment | <code>String</code> | 
| params | <code>Object</code> | 

<a name="LoadCase+ConsiderImperfection"></a>

### loadCase.ConsiderImperfection(imperfectionCaseNo)
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  

| Param | Type |
| --- | --- |
| imperfectionCaseNo | <code>Number</code> | 

<a name="LoadCase+SetStructureModification"></a>

### loadCase.SetStructureModification(structureModificationNo)
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  

| Param | Type |
| --- | --- |
| structureModificationNo | <code>Number</code> | 

<a name="LoadCase+GetActionCategoryList"></a>

### loadCase.GetActionCategoryList() ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: List of action categories  
<a name="LoadCase+GetLoadCase"></a>

### loadCase.GetLoadCase() ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: Load case object  
<a name="LoadCase+GetNo"></a>

### loadCase.GetNo() ⇒
**Kind**: instance method of [<code>LoadCase</code>](#LoadCase)  
**Returns**: Number of Load case  
<a name="actionCategory_dict"></a>

## actionCategory\_dict
Dictionary

**Kind**: global constant  
