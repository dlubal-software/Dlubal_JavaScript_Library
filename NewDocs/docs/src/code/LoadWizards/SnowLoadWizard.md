---
title: SnowLoadWizard
---

# SnowLoadWizard

## Classes

<dl>
<dt><a href="#SnowLoadWizard">SnowLoadWizard</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#withoutLoadsOn">withoutLoadsOn(snow_load_wizard, table_row, objects_without_loads, objects_without_loads_parallel_to)</a></dt>
<dd><p>Sets objects without load (private)</p>
</dd>
<dt><a href="#createSnowLoadWizard">createSnowLoadWizard(no, comment, params)</a></dt>
<dd><p>Creates empty snow load wizard (private)</p>
</dd>
</dl>

<a name="SnowLoadWizard"></a>

## SnowLoadWizard
**Kind**: global class  

* [SnowLoadWizard](#SnowLoadWizard)
    * [new SnowLoadWizard(no, comment, params)](#new_SnowLoadWizard_new)
    * [.SetMonoPitchRoofType(no, roof_corner_nodes, load_case, comment, params)](#SnowLoadWizard+SetMonoPitchRoofType)
    * [.SetDuopitch(no, roof_corner_nodes, load_case_1, load_case_2, load_case_3, comment, params)](#SnowLoadWizard+SetDuopitch)
    * [.SetLoadedRoofs(loaded_planes_accessibility)](#SnowLoadWizard+SetLoadedRoofs)
    * [.WithoutLoadsOnMembers(objects_without_loads, objects_without_loads_parallel_to)](#SnowLoadWizard+WithoutLoadsOnMembers)
    * [.WithoutLoadsOnSurfaces(objects_without_loads, objects_without_loads_parallel_to)](#SnowLoadWizard+WithoutLoadsOnSurfaces)
    * [.WithoutLoadsOnLines(objects_without_loads, objects_without_loads_parallel_to)](#SnowLoadWizard+WithoutLoadsOnLines)
    * [.SnowOverhang(enabled)](#SnowLoadWizard+SnowOverhang)
    * [.SnowGuard(enabled)](#SnowLoadWizard+SnowGuard)
    * [.LockForNewObjects(enabled)](#SnowLoadWizard+LockForNewObjects)
    * [.ConsiderMemberEccentricity(enabled)](#SnowLoadWizard+ConsiderMemberEccentricity)
    * [.ConsiderSectionDistribution(enabled)](#SnowLoadWizard+ConsiderSectionDistribution)

<a name="new_SnowLoadWizard_new"></a>

### new SnowLoadWizard(no, comment, params)
Creates empty snow load wizard


| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Snow load wizard index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="SnowLoadWizard+SetMonoPitchRoofType"></a>

### snowLoadWizard.SetMonoPitchRoofType(no, roof_corner_nodes, load_case, comment, params)
Creates flat/monopitch snow load wizard

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Snow load wizard index, can be undefined |
| roof_corner_nodes | <code>Array</code> | Roofs corner nodes indexes |
| load_case | <code>Object</code> | Load case |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="SnowLoadWizard+SetDuopitch"></a>

### snowLoadWizard.SetDuopitch(no, roof_corner_nodes, load_case_1, load_case_2, load_case_3, comment, params)
Creates duopitch snow load wizard

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Snow load wizard index, can be undefined |
| roof_corner_nodes | <code>Array</code> | Roofs corner nodes indexes |
| load_case_1 | <code>Object</code> | Load case (Case i) |
| load_case_2 | <code>Object</code> | Load case (Case ii) |
| load_case_3 | <code>Object</code> | Load case (Case iii) |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="SnowLoadWizard+SetLoadedRoofs"></a>

### snowLoadWizard.SetLoadedRoofs(loaded_planes_accessibility)
Sets loaded roofs

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| loaded_planes_accessibility | <code>Array</code> | Enable or disable loaded roofs (array of booleans [roof1 | roof1, roof2]) |

<a name="SnowLoadWizard+WithoutLoadsOnMembers"></a>

### snowLoadWizard.WithoutLoadsOnMembers(objects_without_loads, objects_without_loads_parallel_to)
Generated on members

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| objects_without_loads | <code>Array</code> | Without load on members, can be undefined |
| objects_without_loads_parallel_to | <code>Array</code> | Without load parallel to members, can be undefined |

<a name="SnowLoadWizard+WithoutLoadsOnSurfaces"></a>

### snowLoadWizard.WithoutLoadsOnSurfaces(objects_without_loads, objects_without_loads_parallel_to)
Generated on surfaces

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| objects_without_loads | <code>Array</code> | Without load on surfaces, can be undefined |
| objects_without_loads_parallel_to | <code>Array</code> | Without load parallel to surfaces, can be undefined |

<a name="SnowLoadWizard+WithoutLoadsOnLines"></a>

### snowLoadWizard.WithoutLoadsOnLines(objects_without_loads, objects_without_loads_parallel_to)
Generated on lines

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| objects_without_loads | <code>Array</code> | Without load on lines, can be undefined |
| objects_without_loads_parallel_to | <code>Array</code> | Without load parallel to lines, can be undefined |

<a name="SnowLoadWizard+SnowOverhang"></a>

### snowLoadWizard.SnowOverhang(enabled)
Sets snow overhang

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="SnowLoadWizard+SnowGuard"></a>

### snowLoadWizard.SnowGuard(enabled)
Sets snow guard

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="SnowLoadWizard+LockForNewObjects"></a>

### snowLoadWizard.LockForNewObjects(enabled)
Sets lock for new members

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="SnowLoadWizard+ConsiderMemberEccentricity"></a>

### snowLoadWizard.ConsiderMemberEccentricity(enabled)
Sets consider member eccentricity

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="SnowLoadWizard+ConsiderSectionDistribution"></a>

### snowLoadWizard.ConsiderSectionDistribution(enabled)
Sets consider section distribution

**Kind**: instance method of [<code>SnowLoadWizard</code>](#SnowLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="withoutLoadsOn"></a>

## withoutLoadsOn(snow_load_wizard, table_row, objects_without_loads, objects_without_loads_parallel_to)
Sets objects without load (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| snow_load_wizard | <code>Object</code> | Snow load wizard |
| table_row | <code>Number</code> | Table row to which values hes to be set |
| objects_without_loads | <code>Array</code> | Object's indexes without loads |
| objects_without_loads_parallel_to | <code>Array</code> | Object's indexes without loads parallel to |

<a name="createSnowLoadWizard"></a>

## createSnowLoadWizard(no, comment, params)
Creates empty snow load wizard (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Snow load wizard index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

