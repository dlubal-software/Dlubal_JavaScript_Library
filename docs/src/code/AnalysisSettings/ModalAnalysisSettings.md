---
title: ModalAnalysisSettings
---

# ModalAnalysisSettings

<a name="ModalAnalysisSettings"></a>

## ModalAnalysisSettings
Modal analysis settings high level function

**Kind**: global class  

* [ModalAnalysisSettings](#ModalAnalysisSettings)
    * [new ModalAnalysisSettings(no, solverMethod, beyondFrequency, maximalFrequency, comment, params)](#new_ModalAnalysisSettings_new)
    * [.UserDefinedNumberOfModes(no, name, numberOfModes, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params)](#ModalAnalysisSettings+UserDefinedNumberOfModes) ⇒
    * [.AutomaticNumberOfModesToReachEffMass(no, name, effectiveModalMassFactor, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params)](#ModalAnalysisSettings+AutomaticNumberOfModesToReachEffMass) ⇒
    * [.AutomaticNumberOfModesToReachMaxFreq(no, name, maxNaturalFrequency, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params)](#ModalAnalysisSettings+AutomaticNumberOfModesToReachMaxFreq) ⇒

<a name="new_ModalAnalysisSettings_new"></a>

### new ModalAnalysisSettings(no, solverMethod, beyondFrequency, maximalFrequency, comment, params)
Creates modal analysis settings high level function

**Returns**: Object ModalAnalysisSettings  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | unique ID of modal analysis settings |
| solverMethod | <code>String</code> | solver method() |
| beyondFrequency | <code>String</code> | Setting of eigenvectors beyond frequency |
| maximalFrequency | <code>String</code> | Setting of eigenvectors maximal frequency |
| comment | <code>String</code> | Comment, empty by default |
| params | <code>Object</code> | Modal analysis settings parameters, empty by default |

**Example**  
```js
// returns 2globalNS.method1(5, 10);
```
<a name="ModalAnalysisSettings+UserDefinedNumberOfModes"></a>

### modalAnalysisSettings.UserDefinedNumberOfModes(no, name, numberOfModes, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params) ⇒
Creates modal analysis settings

**Kind**: instance method of [<code>ModalAnalysisSettings</code>](#ModalAnalysisSettings)  
**Returns**: Object ModalAnalysisSettings  

| Param | Type |
| --- | --- |
| no | <code>int</code> | 
| name | <code>string</code> | 
| numberOfModes | <code>int</code> | 
| solverMethod | <code>string</code> | 
| typeOfMassMatrix | <code>string</code> | 
| massConversion | <code>string</code> | 
| actingMasses | <code>array</code> | 
| comment | <code>string</code> | 
| params | <code>dictionary</code> | 

<a name="ModalAnalysisSettings+AutomaticNumberOfModesToReachEffMass"></a>

### modalAnalysisSettings.AutomaticNumberOfModesToReachEffMass(no, name, effectiveModalMassFactor, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params) ⇒
**Kind**: instance method of [<code>ModalAnalysisSettings</code>](#ModalAnalysisSettings)  
**Returns**: Object ModalAnalysisSettings  

| Param | Type |
| --- | --- |
| no | <code>\*</code> | 
| name | <code>\*</code> | 
| effectiveModalMassFactor | <code>\*</code> | 
| solverMethod | <code>\*</code> | 
| typeOfMassMatrix | <code>\*</code> | 
| massConversion | <code>\*</code> | 
| actingMasses | <code>\*</code> | 
| comment | <code>\*</code> | 
| params | <code>\*</code> | 

<a name="ModalAnalysisSettings+AutomaticNumberOfModesToReachMaxFreq"></a>

### modalAnalysisSettings.AutomaticNumberOfModesToReachMaxFreq(no, name, maxNaturalFrequency, solverMethod, typeOfMassMatrix, massConversion, actingMasses, comment, params) ⇒
**Kind**: instance method of [<code>ModalAnalysisSettings</code>](#ModalAnalysisSettings)  
**Returns**: Object ModalAnalysisSettings  

| Param | Type |
| --- | --- |
| no | <code>\*</code> | 
| name | <code>\*</code> | 
| maxNaturalFrequency | <code>\*</code> | 
| solverMethod | <code>\*</code> | 
| typeOfMassMatrix | <code>\*</code> | 
| massConversion | <code>\*</code> | 
| actingMasses | <code>\*</code> | 
| comment | <code>\*</code> | 
| params | <code>\*</code> | 

