---
title: StaticAnalysisSettings
---

# StaticAnalysisSettings

<a name="StaticAnalysisSettings"></a>

## StaticAnalysisSettings
**Kind**: global class  

* [StaticAnalysisSettings](#StaticAnalysisSettings)
    * [new StaticAnalysisSettings(no, analysisType, equationSolver, nonlinearMethod, comment, params)](#new_StaticAnalysisSettings_new)
    * [.GetNo()](#StaticAnalysisSettings+GetNo) ⇒
    * [.GetStaticAnalysisSettings()](#StaticAnalysisSettings+GetStaticAnalysisSettings) ⇒
    * [.GeometricallyLinear(no, name, equationSolver, plateBendingTheory, activeMass, modifyLoading, comment, params)](#StaticAnalysisSettings+GeometricallyLinear) ⇒
    * [.SecondOrder(no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, plateBendingTheory, activeMass, modifyLoading, comment, params)](#StaticAnalysisSettings+SecondOrder) ⇒
    * [.LargeDeformations(no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, percentageOfIterations, plateBendingTheory, activeMass, modifyLoading, comment, params)](#StaticAnalysisSettings+LargeDeformations) ⇒

<a name="new_StaticAnalysisSettings_new"></a>

### new StaticAnalysisSettings(no, analysisType, equationSolver, nonlinearMethod, comment, params)
Creates static analysis settings high level function

**Returns**: Static Analysis object  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Integer</code> | unique ID of SAS |
| analysisType | <code>String</code> | Analysis setting type ("GEOMETRICALLY_LINEAR", "SECOND_ORDER_P_DELTA", "LARGE_DEFORMATIONS") |
| equationSolver | <code>String</code> | Equation solver ("METHOD_OF_EQUATION_SYSTEM_DIRECT", "METHOD_OF_EQUATION_SYSTEM_ITERATIVE") |
| nonlinearMethod | <code>String</code> | Nonlinear method ("NEWTON_RAPHSON", "NEWTON_RAPHSON_COMBINED_WITH_PICARD", "PICARD", "NEWTON_RAPHSON_WITH_POSTCRITICAL_ANALYSIS", "NEWTON_RAPHSON_WITH_CONSTANT_STIFFNESS", "DYNAMIC_RELAXATION" ) |
| comment | <code>String</code> | Comment, empty by default |
| params | <code>Object</code> | Static analysis settings parameters, empty by default |

<a name="StaticAnalysisSettings+GetNo"></a>

### staticAnalysisSettings.GetNo() ⇒
**Kind**: instance method of [<code>StaticAnalysisSettings</code>](#StaticAnalysisSettings)  
**Returns**: Number of Static analysis setting  
<a name="StaticAnalysisSettings+GetStaticAnalysisSettings"></a>

### staticAnalysisSettings.GetStaticAnalysisSettings() ⇒
**Kind**: instance method of [<code>StaticAnalysisSettings</code>](#StaticAnalysisSettings)  
**Returns**: Static analysis settings object  
<a name="StaticAnalysisSettings+GeometricallyLinear"></a>

### staticAnalysisSettings.GeometricallyLinear(no, name, equationSolver, plateBendingTheory, activeMass, modifyLoading, comment, params) ⇒
**Kind**: instance method of [<code>StaticAnalysisSettings</code>](#StaticAnalysisSettings)  
**Returns**: Object Static Analysis Settings  

| Param | Type |
| --- | --- |
| no | <code>\*</code> | 
| name | <code>\*</code> | 
| equationSolver | <code>\*</code> | 
| plateBendingTheory | <code>\*</code> | 
| activeMass | <code>\*</code> | 
| modifyLoading | <code>\*</code> | 
| comment | <code>\*</code> | 
| params | <code>\*</code> | 

<a name="StaticAnalysisSettings+SecondOrder"></a>

### staticAnalysisSettings.SecondOrder(no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, plateBendingTheory, activeMass, modifyLoading, comment, params) ⇒
**Kind**: instance method of [<code>StaticAnalysisSettings</code>](#StaticAnalysisSettings)  
**Returns**: Object Static Analysis Settings  

| Param | Type |
| --- | --- |
| no | <code>\*</code> | 
| name | <code>\*</code> | 
| equationSolver | <code>\*</code> | 
| nonlinearMethod | <code>\*</code> | 
| maxNumberOfIterations | <code>\*</code> | 
| numberOfLoadIncrements | <code>\*</code> | 
| plateBendingTheory | <code>\*</code> | 
| activeMass | <code>\*</code> | 
| modifyLoading | <code>\*</code> | 
| comment | <code>\*</code> | 
| params | <code>\*</code> | 

<a name="StaticAnalysisSettings+LargeDeformations"></a>

### staticAnalysisSettings.LargeDeformations(no, name, equationSolver, nonlinearMethod, maxNumberOfIterations, numberOfLoadIncrements, percentageOfIterations, plateBendingTheory, activeMass, modifyLoading, comment, params) ⇒
**Kind**: instance method of [<code>StaticAnalysisSettings</code>](#StaticAnalysisSettings)  
**Returns**: Object Static Analysis Settings  

| Param | Type |
| --- | --- |
| no | <code>\*</code> | 
| name | <code>\*</code> | 
| equationSolver | <code>\*</code> | 
| nonlinearMethod | <code>\*</code> | 
| maxNumberOfIterations | <code>\*</code> | 
| numberOfLoadIncrements | <code>\*</code> | 
| percentageOfIterations | <code>\*</code> | 
| plateBendingTheory | <code>\*</code> | 
| activeMass | <code>\*</code> | 
| modifyLoading | <code>\*</code> | 
| comment | <code>\*</code> | 
| params | <code>\*</code> | 

