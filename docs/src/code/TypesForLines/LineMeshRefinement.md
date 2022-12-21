---
title: LineMeshRefinement
---

# LineMeshRefinement

<a name="LineMeshRefinement"></a>

## LineMeshRefinement
**Kind**: global class  

* [LineMeshRefinement](#LineMeshRefinement)
    * [new LineMeshRefinement(no, targetFELength, numberOfLayers, lines, comment, params)](#new_LineMeshRefinement_new)
    * [.TargetFELength(targetFELength, numberOfLayers, lines)](#LineMeshRefinement+TargetFELength) ⇒ <code>Object</code>
    * [.NumberFiniteElements(numberOfFiniteElements, numberOfLayers, lines)](#LineMeshRefinement+NumberFiniteElements) ⇒ <code>Object</code>
    * [.Gradual(gradual_rows, numberOfLayers, lines)](#LineMeshRefinement+Gradual) ⇒ <code>Object</code>
    * [.SetLines(gradual_rows, lines)](#LineMeshRefinement+SetLines) ⇒ <code>Object</code>

<a name="new_LineMeshRefinement_new"></a>

### new LineMeshRefinement(no, targetFELength, numberOfLayers, lines, comment, params)
Creates line mesh refinement

**Returns**: <code>Object</code> - Created line mesh refinement HLF  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Index of line mesh refinement, can be undefined |
| targetFELength | <code>Number</code> | Length of FEA element side on the line, can be undefined |
| numberOfLayers | <code>Number</code> | Number of layers to be affected by this refinement, can be undefined |
| lines | <code>Number</code> \| <code>Array</code> | Lines assigned to this refinement, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | line mesh refinement parameters, can be undefined |

<a name="LineMeshRefinement+TargetFELength"></a>

### lineMeshRefinement.TargetFELength(targetFELength, numberOfLayers, lines) ⇒ <code>Object</code>
Change line mesh refinement to type based on element length

**Kind**: instance method of [<code>LineMeshRefinement</code>](#LineMeshRefinement)  
**Returns**: <code>Object</code> - Created line mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| targetFELength | <code>Number</code> | Length of FEA element side on the line, can be undefined |
| numberOfLayers | <code>Number</code> | Number of layers to be affected by this refinement, can be undefined |
| lines | <code>Number</code> \| <code>Array</code> | Lines assigned to this refinement, can be undefined |

<a name="LineMeshRefinement+NumberFiniteElements"></a>

### lineMeshRefinement.NumberFiniteElements(numberOfFiniteElements, numberOfLayers, lines) ⇒ <code>Object</code>
Change line mesh refinement to type based on number of elements on line

**Kind**: instance method of [<code>LineMeshRefinement</code>](#LineMeshRefinement)  
**Returns**: <code>Object</code> - Created line mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| numberOfFiniteElements | <code>Number</code> | Number of FEA elements on the line, can be undefined |
| numberOfLayers | <code>Number</code> | Number of layers to be affected by this refinement, can be undefined |
| lines | <code>Number</code> \| <code>Array</code> | Lines assigned to this refinement, can be undefined |

<a name="LineMeshRefinement+Gradual"></a>

### lineMeshRefinement.Gradual(gradual_rows, numberOfLayers, lines) ⇒ <code>Object</code>
Change line mesh refinement to type gradually changed due to distance from the line

**Kind**: instance method of [<code>LineMeshRefinement</code>](#LineMeshRefinement)  
**Returns**: <code>Object</code> - Created line mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| gradual_rows | <code>Number</code> | Number gradual rows of FEA elements, can be undefined |
| numberOfLayers | <code>Number</code> | Number of layers to be affected by this refinement, can be undefined |
| lines | <code>Number</code> \| <code>Array</code> | Lines assigned to this refinement, can be undefined |

<a name="LineMeshRefinement+SetLines"></a>

### lineMeshRefinement.SetLines(gradual_rows, lines) ⇒ <code>Object</code>
Function for assign lines to line mesh refinement

**Kind**: instance method of [<code>LineMeshRefinement</code>](#LineMeshRefinement)  
**Returns**: <code>Object</code> - Created line mesh refinement  

| Param | Type | Description |
| --- | --- | --- |
| gradual_rows | <code>Number</code> | Number gradual rows of FEA elements, can be undefined |
| lines | <code>Number</code> \| <code>Array</code> | Lines assigned to this refinement, can be undefined |

