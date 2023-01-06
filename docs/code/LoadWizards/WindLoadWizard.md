---
title: WindLoadWizard
---

# WindLoadWizard

## Classes

<dl>
<dt><a href="#WindLoadWizard">WindLoadWizard</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setWindDirections">setWindDirections(wind_load_wizard, roof_sides_accessibility)</a></dt>
<dd><p>Sets wind perpendicular to roofs (private)</p>
</dd>
<dt><a href="#withoutLoadsOn">withoutLoadsOn(wind_load_wizard, table_row, objects_without_loads, objects_without_loads_parallel_to)</a></dt>
<dd><p>Sets objects without load (private)</p>
</dd>
<dt><a href="#createWindLoadWizard">createWindLoadWizard(no, comment, params)</a></dt>
<dd><p>Creates empty wind load wizard (private)</p>
</dd>
</dl>

<a name="WindLoadWizard"></a>

## WindLoadWizard
**Kind**: global class  

* [WindLoadWizard](#WindLoadWizard)
    * [new WindLoadWizard(no, comment, params)](#new_WindLoadWizard_new)
    * [.WallsRoofMonopitch(no, base_corner_nodes, roof_corner_nodes, load_cases, wind_directions, comment, params)](#WindLoadWizard+WallsRoofMonopitch)
    * [.WallsRoofDuoPitch(no, base_corner_nodes, roof_corner_nodes, load_cases, wind_directions, comment, params)](#WindLoadWizard+WallsRoofDuoPitch)
    * [.RoofMonoPitch(no, roof_corner_nodes, load_cases, wind_directions, comment, params)](#WindLoadWizard+RoofMonoPitch)
    * [.RoofDuopitch(no, roof_corner_nodes, load_cases, wind_directions, comment, params)](#WindLoadWizard+RoofDuopitch)
    * [.SetLoadedWallsAndRoofs(roofs_accessibility)](#WindLoadWizard+SetLoadedWallsAndRoofs)
    * [.WithoutLoadsOnMembers(objects_without_loads, objects_without_loads_parallel_to)](#WindLoadWizard+WithoutLoadsOnMembers)
    * [.WithoutLoadsOnSurfaces(objects_without_loads, objects_without_loads_parallel_to)](#WindLoadWizard+WithoutLoadsOnSurfaces)
    * [.WithoutLoadsOnLines(objects_without_loads, objects_without_loads_parallel_to)](#WindLoadWizard+WithoutLoadsOnLines)
    * [.LockForNewObjects(enabled)](#WindLoadWizard+LockForNewObjects)
    * [.ConsiderMemberEccentricity(enabled)](#WindLoadWizard+ConsiderMemberEccentricity)
    * [.ConsiderSectionDistribution(enabled)](#WindLoadWizard+ConsiderSectionDistribution)

<a name="new_WindLoadWizard_new"></a>

### new WindLoadWizard(no, comment, params)
Creates empty wind load wizard


| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Wind load wizard index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="WindLoadWizard+WallsRoofMonopitch"></a>

### windLoadWizard.WallsRoofMonopitch(no, base_corner_nodes, roof_corner_nodes, load_cases, wind_directions, comment, params)
Creates vertical walls with flat/monopitch roof

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Wind load wizard index, can be undefined |
| base_corner_nodes | <code>Array</code> | Base corner nodes indexes |
| roof_corner_nodes | <code>Array</code> | Roof corner nodes indexes |
| load_cases | <code>Array</code> | Load case 1, load case 2 |
| wind_directions | <code>Array</code> | Wind directions (roof sides accessibility), can be undefined, for info setWindDirections function |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="WindLoadWizard+WallsRoofDuoPitch"></a>

### windLoadWizard.WallsRoofDuoPitch(no, base_corner_nodes, roof_corner_nodes, load_cases, wind_directions, comment, params)
Creates vertical walls with duopitch roof

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Wind load wizard index, can be undefined |
| base_corner_nodes | <code>Array</code> | Base corner nodes indexes |
| roof_corner_nodes | <code>Array</code> | Roof corner nodes indexes |
| load_cases | <code>Array</code> | Load cases |
| wind_directions | <code>Array</code> | Wind directions (roof sides accessibility), can be undefined, for info setWindDirections function |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="WindLoadWizard+RoofMonoPitch"></a>

### windLoadWizard.RoofMonoPitch(no, roof_corner_nodes, load_cases, wind_directions, comment, params)
Creates flat/monopitch roof

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Wind load wizard index, can be undefined |
| roof_corner_nodes | <code>Array</code> | Roof corner nodes indexes |
| load_cases | <code>Array</code> | Load cases |
| wind_directions | <code>Array</code> | Wind directions (roof sides accessibility), can be undefined, for info setWindDirections function |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="WindLoadWizard+RoofDuopitch"></a>

### windLoadWizard.RoofDuopitch(no, roof_corner_nodes, load_cases, wind_directions, comment, params)
Creates duopitch roof

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Wind load wizard index, can be undefined |
| roof_corner_nodes | <code>Array</code> | Roof corner nodes indexes |
| load_cases | <code>Array</code> | Load cases |
| wind_directions | <code>Array</code> | Wind directions (roof sides accessibility), can be undefined, for info setWindDirections function |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

<a name="WindLoadWizard+SetLoadedWallsAndRoofs"></a>

### windLoadWizard.SetLoadedWallsAndRoofs(roofs_accessibility)
Sets loaded walls/roofs

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| roofs_accessibility | <code>Array</code> | Roofs/walls accessibility                                      [Wall 1, Wall 2, Wall 3, Wall4] (Vertical walls with flat/monopitch roof, Vertical walls with duopitch roof)                                      [Roof 1] (Flat/monopitch roof)                                      [Roof 1, Roof 2] (Duopitch roof) |

<a name="WindLoadWizard+WithoutLoadsOnMembers"></a>

### windLoadWizard.WithoutLoadsOnMembers(objects_without_loads, objects_without_loads_parallel_to)
Generated on members

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| objects_without_loads | <code>Array</code> | Without load on members, can be undefined |
| objects_without_loads_parallel_to | <code>Array</code> | Without load parallel to members, can be undefined |

<a name="WindLoadWizard+WithoutLoadsOnSurfaces"></a>

### windLoadWizard.WithoutLoadsOnSurfaces(objects_without_loads, objects_without_loads_parallel_to)
Generated on surfaces

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| objects_without_loads | <code>Array</code> | Without load on surfaces, can be undefined |
| objects_without_loads_parallel_to | <code>Array</code> | Without load parallel to surfaces, can be undefined |

<a name="WindLoadWizard+WithoutLoadsOnLines"></a>

### windLoadWizard.WithoutLoadsOnLines(objects_without_loads, objects_without_loads_parallel_to)
Generated on lines

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| objects_without_loads | <code>Array</code> | Without load on lines, can be undefined |
| objects_without_loads_parallel_to | <code>Array</code> | Without load parallel to lines, can be undefined |

<a name="WindLoadWizard+LockForNewObjects"></a>

### windLoadWizard.LockForNewObjects(enabled)
Sets lock for new members

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="WindLoadWizard+ConsiderMemberEccentricity"></a>

### windLoadWizard.ConsiderMemberEccentricity(enabled)
Sets consider member eccentricity

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="WindLoadWizard+ConsiderSectionDistribution"></a>

### windLoadWizard.ConsiderSectionDistribution(enabled)
Sets consider section distribution

**Kind**: instance method of [<code>WindLoadWizard</code>](#WindLoadWizard)  

| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>Boolean</code> | Can be undefined, true as default |

<a name="setWindDirections"></a>

## setWindDirections(wind_load_wizard, roof_sides_accessibility)
Sets wind perpendicular to roofs (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wind_load_wizard | <code>Object</code> | Wind load wizard to set |
| roof_sides_accessibility | <code>Array</code> | Roof sides accessibility                                             [Wall 1, Wall 2, Wall 3, Wall 4] (Vertical walls with flat/monopitch roof, Vertical walls with duopitch roof)                                             [Direction 1, Direction 2, Direction 3, Direction 4] (Flat monopitch roof, Duopitch roof) |

<a name="withoutLoadsOn"></a>

## withoutLoadsOn(wind_load_wizard, table_row, objects_without_loads, objects_without_loads_parallel_to)
Sets objects without load (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wind_load_wizard | <code>Object</code> | Wind load wizard |
| table_row | <code>Number</code> | Table row to which values hes to be set |
| objects_without_loads | <code>Array</code> | Object's indexes without loads |
| objects_without_loads_parallel_to | <code>Array</code> | Object's indexes without loads parallel to |

<a name="createWindLoadWizard"></a>

## createWindLoadWizard(no, comment, params)
Creates empty wind load wizard (private)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| no | <code>Number</code> | Wind load wizard index, can be undefined |
| comment | <code>String</code> | Comment, can be undefined |
| params | <code>Object</code> | Additional parameters, can be undefined |

