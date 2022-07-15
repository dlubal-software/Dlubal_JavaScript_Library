# Overview of functions used for blocks

## Sections

1. [global_parameters()](#global_parameters)
2. [input_data()](#input_data)
3. [generate()](#generate)
4. [model variable in block scripts](#model-variable)
5. [UNIT variables](#unit)
6. [Multiplicity examples](#multiplicity-examples)
7. [Constants](#constants)

Defining of block contains two main two function:

* global_parameters() - function for creating global parameters, which are required for block.
* input_data() - create input table in block dialog with input parameters
* generate() - function of generation blocks, in this functions user can use input variables, which was added in input_data() function

## global_parameters()

In this function can used following functions:

* [function ValueGlobalParameter(name, symbol, unit_group, value, comment)](#function-valueglobalparametername-symbol-unit_group-value-comment)
* [function FormulaGlobalParameter(name, symbol, unit_group, formula, comment)](#function-formulaglobalparametername-symbol-unit_group-formula-comment)
* [function OptimizationGlobalParameter(name, symbol, unit_group, value, min, max, increment, steps, comment)](#function-optimizationglobalparametername-symbol-unit_group-value-min-max-increment-steps-comment)
* [function OptimizationAscendingGlobalParameter(name, symbol, unit_group, value, min, max, increment, steps, comment)](#function-optimizationascendingglobalparametername-symbol-unit_group-value-min-max-increment-steps-comment)
* [function OptimizationDescendingGlobalParameter(name, symbol, unit_group, value, min, max, increment, steps, comment)](#function-optimizationdescendingglobalparametername-symbol-unit_group-value-min-max-increment-steps-comment)

This function creates global parameters and bind its to block and input fields in parameters table.
If global parameters exists, RFEM try bind input fields to existing parameters if unit group is equal to required unit group, otherwise default values will be used.

### function ValueGlobalParameter(name, symbol, unit_group, value, comment)

Function creates global parameter of value definition type.

*Arguments:*

* name - name of global parameter
* symbol - symbol of global parameter, name will be used, if symbol not set.
* unit_group - unit group of global parameter, Lengths is default.
* value - default value, float type.
* comment - comment of global parameter.

### function FormulaGlobalParameter(name, symbol, unit_group, formula, comment)

Function creates global parameter of formula definition type.

*Arguments:*

* name - name of global parameter
* symbol - symbol of global parameter, name will be used, if symbol not set.
* unit_group - unit group of global parameter, Lengths is default.
* formula - formula, string type.
* comment - comment of global parameter.

### function OptimizationGlobalParameter(name, symbol, unit_group, value, min, max, increment, steps, comment)

Function creates global parameter of optimization definition type.

*Arguments:*

* name - name of global parameter
* symbol - symbol of global parameter, name will be used, if symbol not set.
* unit_group - unit group of global parameter, Lengths is default.
* value - default value, float type.
* min - minimum allowed value, float type.
* max - maximum allowed value, float type.
* increment - increment value, float type.
* steps - value of step, integer type, set this parameter, if increment is undefined.
* comment - comment of global parameter.

### function OptimizationAscendingGlobalParameter(name, symbol, unit_group, value, min, max, increment, steps, comment)

Same like OptimizationGlobalParameter, but is ascending type.

### function OptimizationDescendingGlobalParameter(name, symbol, unit_group, value, min, max, increment, steps, comment)

Same like OptimizationGlobalParameter, but is descending type.

#### Example

``` JavaScript
function global_parameters()
{
    FormulaGlobalParameter("offset", undefined, UNIT.LENGTH, "1.5+1", "Formula global parameter");
    ValueGlobalParameter("offset_1", "", UNIT.LENGTH, 1.0, "Value global parameter");
    OptimizationGlobalParameter("offset_2", "offset_2", UNIT.LENGTH, 3.0, 1.0, 10.0, 1.0, undefined, "Optimization global parameter");
    OptimizationAscendingGlobalParameter("offset_3", "offset_3", UNIT.LENGTH, 3.0, 1.0, 10.0, 1.0, undefined, "Optimization ascending global parameter");
    OptimizationDescendingGlobalParameter("offset_4", "offset_4", UNIT.LENGTH, 3.0, 1.0, 10.0, 1.0, undefined, "Optimization descending global parameter");
}
```

## input_data()

In this function can used following functions:

* [function category(name, multiplicity_counter_key, parent)](#function-categoryname-multiplicity_counter_key-parent)
* [function loading_category(name)](#function-loading_categoryname)
* [function parameter_int(name, key, symbol, value, unit, minimum,step, maximum, minimum_inclusive, maximum_inclusive, multiplicity_counter_key)](#function-parameter_intname-key-symbol-value-unit-minimum-step-maximum-minimum_inclusive-maximum_inclusive-multiplicity_counter_key)
* [function parameter_float(name, key, symbol, value, unit, minimum, step, maximum, minimum_inclusive, maximum_inclusive, multiplicity_counter_key)](#function-parameter_floatname-key-symbol-value-unit-minimum-step-maximum-minimum_inclusive-maximum_inclusive-multiplicity_counter_key)
* [function material(no, name, multiplicity_counter_key)](#function-materialno-name-multiplicity_counter_key)
* [function section(no, name, multiplicity_counter_key, category)](#function-sectionno-name-multiplicity_counter_key-category)
* [function thickness(no, name, multiplicity_counter_key)](#function-thicknessno-name-multiplicity_counter_key)
* [function nodal_support(no, name, multiplicity_counter_key)](#function-nodal_supportno-name-multiplicity_counter_key)
* [function line_support(no, name, multiplicity_counter_key)](#function-line_supportno-name-multiplicity_counter_key)
* [function member_support(no, name, multiplicity_counter_key)](#function-member_supportno-name-multiplicity_counter_key)
* [function surface_support(no, name, multiplicity_counter_key)](#function-surface_supportno-name-multiplicity_counter_key)
* [function load_case(no, name, multiplicity_counter_key)](#function-load_caseno-name-multiplicity_counter_key)
* [function parameter_check(description, key, value)](#function-parameter_checkname-key-value)
* [function condition(value)](#function-conditionvalue)
* [function editable_condition(value)](#function-editable_conditionvalue)
* [function editable(value)](#function-editablevalue)
* [function combobox(description, key)](#function-comboboxdescription-key)
* [function combobox_value(description, value, is_default)](#function-comboboxvaluename-key-is_default)
* [function set_global_parameter(value)](#function-set_global_parametervalue)

### Important behavior of input and generated objects
You can create object in [generate()](#generate) and get objects like input objects.
In this case need to control script id, because of generated objects and input objects will be add to same map.
It means, if You have input materials with id 1 and 3, then generated objects cannot be created with ids 1 and 3. You can create material with id 2, 4, and so on.

```javascript
function generate()
{
    Material(2); // Create material 2
    Material(4); // Create material 4

    materials[1]; // input material
    materials[2]; // generated material
    materials[3]; // input material
    materials[4]; // generated material
}
```

### function category(name, multiplicity_counter_key, parent)

Function create a category in the block input table. 

*Arguments:*

* name - title of category 
* multiplicity_counter_key - key of counter, which was created by function * parameter_int() function.
* parent - set this parent, if need to create category inside another category. Call this function without this argument will create category in the root of input tree table.

#### Examples
##### Common example
``` JavaScript
function input_data()
{
    category("Parameters"); // create category on first level
    category("Nodal Support"); // create category on first level

    var SECTIONS_CATEGORY = category("Sections"); // create category on first level
        category("Section 1", false, SECTIONS_CATEGORY ); // create category on second level inside category "Sections"
        category("Section 1", false, SECTIONS_CATEGORY ); // create category on second level inside category "Sections"
}
```
##### Multiplicity example
In this case we will create counter with key "n", after that we will create template multiplicity category, which will create categories by counter.
It means, if counter has value 5, then 5 categories will be created in the input table.

Also we can write special title of category with {{number}} placeholder, which will be changed on number of this category in the input table.
```javascript
function input_data()
{
    category("Multiplicity Counter ");  // create category on first level
        parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true); // create multiplicity counter

    var MEMBER_SETTINGS_CATEGORY = category("Members settings"); // create category on first level
        category("Multiplicity Group {{number}}", "n", MEMBER_SETTINGS_CATEGORY); // create multiplicity category on second level inside category Members settings"
}
```

### function loading_category(name)

Function loading_category creates special category, which can be managed by check box Loading on the main tab of Block  Dialog.
This category may exist like single instance and should contain all load cases input parameters.

This category can not be used like multiplicity category, but can contains multiplicity parameters and categories.

*Arguments:* 

* name - title of category 

#### Example
```JavaScript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Create loading category on first level
        category("Loads", false, LOADING_CATEGORY); // Create category on second level inside "Loading" category.
}
```

### function parameter_int(name, key, symbol, value, unit, minimum, step, maximum, minimum_inclusive, maximum_inclusive, multiplicity_counter_key)

Function creates integer input parameter. This parameter can be used for multiplicity parameters and categories like counter.

*Arguments:*

* name - name of parameter in input table
* key - key name, by this name we can use parameter in generate() function. Key will shown in input table, if symbol is empty.
* symbol - symbol with html tags in input table. Can be shown instead of key. 
* value - default value of parameter
* unit - unit of parameter.
* minimum - minimal limit of parameter
* step - step of changing parameter by spin box
* maximum - maximal limit of parameter
* minimum_inclusive - include minimal limit if true
* maximum_inclusive - include maximal limit if true
* multiplicity_counter_key - key of counter, which was created by parameter_int() function. It can be used like multiplicity parameter, which managed by another integer parameter.

#### Examples

##### Common example
```javascript
function input_data()
{
    category("Category");
        parameter_int("Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);
}
```
#### Multiplicity examples
Multiplicity example, when counter manages multiplicity parameters

```javascript
function input_data()
{
    category("Category");  // create category on first level
        parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true); // create multiplicity counter

    var MEMBER_SETTINGS_CATEGORY = category("Members settings"); // create category on first level
        category("Multiplicity Group {{number}}", "n", MEMBER_SETTINGS_CATEGORY); // create multiplicity category on second level inside category Members settings"
}
```

Multiplicity example, when multiplicity counter managed by another counter

```javascript
function input_data()
{
    category("Category");  // create category on first level
        parameter_int("Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true); // create multiplicity counter

    var MEMBER_SETTINGS_CATEGORY = category("Members settings"); // create category on first level
        parameter_int("Multiplicity Counter", "managed", "", 2, UNIT.NONE, 1, 1, 10, true, true, "n"); // create multiplicity "managed" counter on second level, which managed by "n" counter
}
```

### function parameter_float(name, key, symbol, value, unit, minimum, step, maximum, minimum_inclusive, maximum_inclusive, multiplicity_counter_key)

Function creates float input parameter.

*Arguments:*

* name - name of parameter in input table
* key - key name, by this name we can use parameter in generate() function. Key will shown in input table, if symbol is empty.
* symbol - symbol with html tags in input table. Can be shown instead of key. 
* value - default value of parameter
* unit - unit of parameter.
* minimum - minimal limit of parameter
* step - step of changing parameter by spin box
* maximum - maximal limit of parameter
* minimum_inclusive - include minimal limit if true
* maximum_inclusive - include maximal limit if true
* multiplicity_counter_key - key of counter, which was created by 
[function parameter_int()](#function-parameter_intname-key-symbol-value-unit-minimum-step-maximum-minimum_inclusive-maximum_inclusive-multiplicity_counter_key) function.

### function material(no, name, multiplicity_counter_key)

Function creates input field for material object, which exists in model.

*Arguments:*

* no - script id of material objects. Material will be added to materials map. We can get material by this id, from this map like this materials[4], if material input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE] 
> [Read about important behavior.](#important-behavior-of-input-and-generated-objects)

### function section(no, name, multiplicity_counter_key, category)

Function creates input field for section object, which exists in model.

*Arguments:*

* no - script id of section objects. Section will be added to sections map. We can get section by this id, from this map like this sections[4], if section input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE] 
> [Read about important behavior.](#important-behavior-of-input-and-generated-objects)

### function thickness(no, name, multiplicity_counter_key)

Function creates input field for thickness object, which exists in model.

*Arguments:*

no - script id of thickness objects. Thickness will be added to thicknesses map. We can get thickness by this id, from this map like this thicknesses[4], if thickness input field was created with script id 4.
name - name of parameter in input table
multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE] 
> [Read about important behavior.](#important-behavior-of-input-and-generated-objects)

### function nodal_support(no, name, multiplicity_counter_key)

Function creates input field for Nodal Support object, which exists in model.

*Arguments:*

* no - script id of nodal support object. Nodal Support will be added to nodal_supports map. We can get nodal support by this id, from this map like this nodal_supports[4], if nodal support input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE] 
> Nodal supports exists like input objects only.

### function line_support(no, name, multiplicity_counter_key)

Function creates input field for Line Support object, which exists in model.

*Arguments:*

* no - script id of line support objects. Line Support will be added to line_supports map. We can get line support by this id, from this map like this line_supports[4], if line support input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE]
> Line supports exists like input objects only.

### function member_support(no, name, multiplicity_counter_key)

Function creates input field for Member Support object, which exists in model.

*Arguments:*

* no - script id of member support objects. Member Support will be added to member_supports map. We can get member support by this id, from this map like this member_supports[4], if member support input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE]
> Member supports exists like input objects only.

### function surface_support(no, name, multiplicity_counter_key)

Function creates input field for Surface Support object, which exists in model.

*Arguments:*

* no - script id of surface support objects. Member Support will be added to surface_supports map. We can get surface support by this id, from this map like this surface_supports[4], if surface support input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE]
> Surface supports exists like input objects only.

### function load_case(no, name, multiplicity_counter_key)

Function creates input field for Load Case object, which exists in model. Load case fields should be located in loading category.

*Arguments:*

* no - script id of load case objects. Load Case will be added to load_cases map. We can get load case by this id, from this map like this load_cases[4], if load case input field was created with script id 4.
* name - name of parameter in input table
* multiplicity_counter_key - key of counter, which was created by function parameter_int() function.

> [!NOTE]
> Load cases exists like input objects only.

### function parameter_check(name, key, value)

Function creates input field for checkbox, which can have true or false value.

*Arguments:*

* name - name of parameter in input table
* key - key of parameter for using in visibility conditions in input table. It means, checkbox value can show or hide some input fields in the input table.
* value - default value.

### function condition(value)

Function set visibility condition to parameter or category, which was added to input table in input_data() function. It affects on parameter or category, after which this function was called.

*Arguments:*

* value - string with condition

### function editable_condition(value)

Function set editable condition to parameter, which was added to input table in input_data() function.  It affects on parameter or category, after which this function was called.
It means, when condition is true, then user can edit parameter, otherwise parameter is read only for user.

*Arguments:*

* value - string with condition

### function editable(value)

Function set editable condition to parameter, which was added to input table in input_data() function.  It affects on parameter or category, after which this function was called.
It means, that parameter will be read only if value is false.

*Arguments:*

* value - boolean value

### function combobox(name, key)

Function creates combobox input field.

*Arguments:*

* name - Name of field
* key - key used like variable name of combobox in conditions and generate() functions. It need for equal operations with possible combobox values.

### function combobox_value(name, key, is_default)

Function add popup combobox value to combobox, which was added to input table in input_data() function.  It affects on combobox, after which this ### function was called.
Can be used for comboboxes only.

*Arguments:*

* name - name of value
* key - string value for using in script and conditions
* is_default - if true, then this value will be set like default value in combobox.

### function set_global_parameter(value)

Set binding to global parameter to last created input parameter. These function should be used for float and integer input fields.

*Arguments:*

* value - name of global parameter

#### Example
```javascript
function input_data()
{
    category("Geometry");
        parameter_float("Offset", "offset", "", 1.0, UNIT.LENGTH, 0.0, 1, NAN, false, false);
        set_global_parameter("offset");
}
```

## generate()

In the generate function user can use variable **axesUp** for getting information of global axes orientation.

In this function can used following functions:

* function ASSERT(result, message)
* Basic objects
    * function Material(no, name, comment, params)
    * function Thickness(no, name, material/, uniform_thickness_d, comment, params)
    * function Section(no, name, material, comment, params)
    * function Node(no, coordiate_X, coordinate_Y, coordinate_Z, comment, params)
    * function Line(no, nodes, comment, params)
    * function Member(no, nodes, comment, params)
    * function Surface(no, boundary_lines, thickness, comment, params)
    * function Solid(no, boundary_surfaces, material, comment, params)
    * function Opening(no, boundary_lines, comment, params)
    * function LineSet(no, lines, comment, params)
    * function MemberSet(no, members, comment, params)
    * function SurfaceSet(no, surfaces, comment, params)
    * function SolidSet(no, solids, comment, params)
* Loads
    * function NodalLoad(no, load_case, nodes, comment/, params)
    * function LineLoad(no, load_case, lines, comment, params/)
    * function MemberLoad(no, load_case, members, comment, params)
    * function SurfaceLoad(no, load_case, surfaces, comment/, params)
    * function SolidLoad(no, load_case, solids, comment, params)
    * function OpeningLoad(no, load_case, openings, comment, params)
    * function LineSetLoad(no, load_case, line_sets, comment, params)
    * function MemberSetLoad(no, load_case, member_sets, comment, params)
    * function SurfaceSetLoad(no, load_case, surface_sets, comment, params)
    * function SolidSetLoad(no, load_case, solid_sets, comment, params)
    * function FreeConcentratedLoad(no, load_case, surfaces, comment, params)
    * function FreeLineLoad(no, load_case, surfaces, comment, params)
    * function FreeRectangularLoad(no, load_case, surfaces, comment, params)
    * function FreeCircularLoad(no, load_case, surfaces, comment, params)
    * function FreePolygonLoad(no, load_case, surfaces, comment, params)
    * function ImposedLineDeformation(no, load_case, lines, comment, params)
    * function ImposedNodalDeformation(no, load_case, nodes, comment, params)
* Dimensions
    * function AngularDimension(no, object_1, object_2, reference_object_type, symbol, offset, quadrant, comment, params)
    * function ArcLengthDimension(no, line, symbol, offset, comment, params)
    * function DiameterDimension(no, line, symbol, position, comment, params)
    * function LinearDimension(no, object_1, object_2, reference, symbol, offset, comment, params)
    * function RadiusDimension(no, line, symbol, offset, position, comment, params)
    * function SlopeDimension(no, object, symbol, offset, position, direction, plane, comment, params)
* Types For Lines
    * function LineHinge(no, surface, lines, comment, params)
    * function LineMeshRefinement(no, comment, params)
* Types For Members
    * function MemberDefinableStiffness(no, comment, params)
    * function MemberEccentricity(no, member_start, member_end, comment, params)
    * function MemberHinge(no, member_start, member_end, comment, params)
    * function MemberNonlinearity(no, comment, params)
    * function MemberResultIntermediatePoint(no, comment, params)
    * function MemberStiffnessModification(no, comment, params)
    * function MemberTransverseStiffener(no, comment, params)
* Types For Nodes
    * function NodalMeshRefinement(no, comment, params)
* Types For Surfaces
    * function SurfaceEccentricity(no, surface, comment, params)
    * function SurfaceMeshRefinement(no, comment, params)
* Guide Objects
    * function CoordinateSystem(no, coordinate_system_type, comment, params)

### Return value from generate function

If some values should be calculated during the generate function, these values can be set to input parameters via return dictionary from generate function.

For example

```javascript
function generate()
{
    // If block calculate some parameters, we should create dictionary variable
    // For example: var calculated_parameters = {};
    // Set calculated variable after calculation: calculated_parameters['alpha_info'] = alpha;
    // And return it on the end point of script: return calculated_parameters;
    var calculated_parameters = {};

    // 'inclination_via' has three options

    if (inclination_via ==  "define_height") // input by inclination_via = "Define height"
    {
        alpha = atan(2*H/a);
        s = 2*H/a;
    }

    if (inclination_via == "define_angle") // input by inclination_via = "Define angle"
    {
        H = 0.5*a*tan(alpha);
        s = tan(alpha);
    }

    if (inclination_via == "define_slope") // input by inclination_via = "Define slope"
    {
        H = 0.5*s*a;
        alpha = atan(s);
    }

    // 'stiffener_via' has three options

    if (stiffener_via == "define_plan_projection") // input by stiffener_via = "Plan projection"
    {
        H_1 = 2*H*a_1/a;
        l_1 = sqrt(sqr(a_1) + sqr(2*H*a_1/a));
    }

    if (stiffener_via == "define_vertical_projection") // input by stiffener_via = "Vertical projection"
    {
        a_1 = 0.5*a*H_1/H;
        l_1 = sqrt(sqr(H_1) + sqr(0.5*a*H_1/H));
    }

    if (stiffener_via == "define_length") // input by stiffener_via = "Length"
    {
        a_1 = a*l_1/sqrt(sqr(a) + 4*sqr(H));
        H_1 = H*l_1/sqrt(sqr(H) + 0.25*sqr(a));
    }

    // Set calculated variables to dictionary after calculation
    calculated_parameters['H'] = H;
    calculated_parameters['alpha'] = alpha;
    calculated_parameters['s'] = s;
    calculated_parameters['a_1'] = a_1;
    calculated_parameters['H_1'] = H_1;
    calculated_parameters['l_1'] = l_1;

    return calculated_parameters;
}
```

In this case calculated_parameters contains several input parameters, which was calculated during the generation. It needs in case, when one input parameter can be set, but several other parameters are read only, depends on first parameter and should be set to input table like as actual state of block. Block 001337 has example of behavior.

### Important behavior of loads

All loads (such as line loads, nodal loads etc.) from different load cases will be add to same map. Therefore all loads should get different script id. 

For example nodal load from load case 1 get script id 1, nodal load from load case 3 get script id 2 and etc.
After creating we can get nodal loads:

* nodal_loads[1] - nodal loads from load case 1
* nodal_loads[2] - nodal loads from load case 3

### Code example

```javascript
function generate()
{
    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = NodalLoad(1, live_load_case);
        live_load.comment = "Live Load";
    }

    var snow_load_case = load_cases[2];
    if (snow_load_case) // Check if load case exists in map, if no, it means snow load category or loading category are disabled.
    {
        var snow_load = NodalLoad(2, snow_load_case); // It is not possible to set up id 1, because of id 1 will be set for load from live load case
        snow_load .comment = "SnowLoad";
    }
}
```

### function ASSERT(result, message)

Function for send assert message from generate() function. If result is false, then script engine send message to gui and stop script evaluation.
ASSERT can be used for control complex conditions of input parameters, which can not be control by standard logic.

*Arguments:*

* result - boolean value
* message - string value, with message for user.

#### Example

```javascript
function input_data()
{
    category("Parameters");
        parameter_int("Frame count", "n", "", 4, UNIT.NONE, 1, 1, 100, false, false); // Create input field with "n" counter
}

function generate()
{
    // Check "n" counter with ASSERT
    ASSERT(n > 1, "Number of frames must be positive");
}
```

### function Material(no, name, comment, params)

Create material with selected script id inside the blok. User id will be selected from available ideces in model. But in the script we can use selected id.
Objects will be added to materials map.

*Arguments:*

* no - the number of object in block script
* name - the name of object, (undefined if not set)
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

```javascript
var params = {
    "comment": "Comment via parameters"
};
```

#### Example
```javascript
function generate()
{
    var params = {
        "comment": "Comment via parameters"
    };
    Material(4, undefined, "Material 4", params);

    // or
    var material = Material(10);
    material.comment = "Material";
    materials[10].comment = "Material 10";
}
```

### function Thickness(no, name, material, uniform_thickness_d, comment, params)

Create thickness with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to thicknesses map.

*Arguments:*

* no - the number of object in block script
* name - the name of object, (undefined if not set)
* material - material object, which should be set to thickness, (undefined if not set)
* uniform_thickness_d - uniform float value, (0.2 if undefined)
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

var params = {
    "comment": "Comment via parameters"
};

#### Example

```javascript
function generate()
{
    var params = {
        "comment": "Comment via parameters"
    };
    Thickness(4, "Thickness name", materials[2], undefined, "Thickness 4", params);

    // or
    var thickness = Thickness(10);
    thickness .comment = "Thickness ";
    thicknesses[10].comment = "Thickness 10";
}
```

### function Section(no, name, material, comment, params)

Create section with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to sections map.

*Arguments:*

* no - the number of object in block script
* name - the name of object, (undefined if not set)
* material - material object, (undefined if not set)
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

var params = {
    "comment": "Comment via parameters"
};

#### Example

```javascript
function generate()
{
    var params = {
        "comment": "Comment via parameters"
    };

    Material(1);
    Section(1, "Section 1", materials[1], "Section 1", params);
}
```

### function Node(no, coordinate_X, coordinate_Y, coordinate_Z, comment, params)

Create node with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to nodes map.

*Arguments:*

* no - the number of object in block script
* coordinate_X - x coordinate (0.0 if not set)
* coordinate_Y - y coordinate (0.0 if not set)
* coordinate_Z - z coordinate (0.0 if not set)
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

var params = {
    "comment": "Comment via parameters"
};

#### Example

```javascript
function generate()
{
    var params = {
        "comment": "Comment via parameters"
    };
    Node(1, 0.5, 0.6, 0.7, "Node 1", params);
}
```

### function Line(no, nodes, comment, params)

Create line with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to lines map.

* no - the number of object in block script
* nodes - object or object id in block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

```javascript
var params = {
    "comment": "Comment via parameters"
};
```
#### Example

```javascript
function generate()
{
    var params = {
        "comment": "Comment via parameters"
    };

    Node(1);
    Node(2);
    Line(1, [1, 2], "Comment", params);

    // or
    Node(3);
    Node(4);
    Line(2, [nodes[3], nodes[4]], undefined, params);
    lines[2].comment = "Line 2";
}
```

### function Member(no, nodes, comment, params)

Create member with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to members map.

*Arguments:*

* no - the number of object in block script
* nodes - list of nodes or numbers of node sin block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example

```javascript
function generate()
{
    var params = {
        "comment": "Comment via parameters"
    };

    Node(1);
    Node(2);
    Member(1, [1, 2], "Member 1", params);
}
```

> [!CAUTION]
> If Member created in RFEM, with Member will be created Line with same id. It means when we create member number 3, in same time will be created line number 3.

### function Surface(no, boundary_lines, thickness, comment, params)

Create surface with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to surfaces map.

*Arguments:*

* no - the number of object in block script
* boundary_lines - list of boundary lines or numbers of lines in block script
* thickness - thickness object
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }

    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [5, 6]);

    var params = {
        "comment": "Comment via parameters"
    };

    Surface(1, [1, 2, 3, 4], thicknesses[1], "Surface 1", params);
}
```

### function Solid(no, boundary_surfaces, material, comment, params)

Create solid with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to solids map.

* no - the number of object in block script
* boundary_surfaces - list of surfaces or numbers of surfaces in block script
* material - material object
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example

```javascript
function generate()
{
    for (var i = 1; i <= 8; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [4, 1]);
    Line(5, [1, 5]);
    Line(6, [2, 6]);
    Line(7, [3, 7]);
    Line(8, [4, 8]);
    Line(9, [5, 6]);
    Line(10, [6, 7]);
    Line(11, [7, 8]);
    Line(12, [8, 5]);

    Surface(1, [1, 2, 3, 4]);
    Surface(2, [1, 5, 6, 9]);
    Surface(3, [2, 6, 7, 10]);
    Surface(4, [3, 7, 8, 11]);
    Surface(5, [4, 8, 5, 12]);
    Surface(6, [9, 10, 11, 12]);

    var params = {
        "comment": "Comment via parameters"
    };

    Solid(1, [1, 2, 3, 4, 5, 6], materials[1], "Solid 1", params);
}
```

### function Opening(no, boundary_lines, comment, params)

Create opening with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to openings map.

*Arguments:*

* no - the number of object in block script
* boundary_lines - list of boundary lines or numbers of lines in block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function generate()
{
    for (var i = 1; i <= 8; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [4, 1]);
    Line(5, [5, 6]);
    Line(6, [6, 7]);
    Line(7, [7, 8]);
    Line(8, [8, 5]);

    Surface(1, [1, 2, 3, 4]);

    var params = {
        "comment": "Comment via parameters"
    };

    Opening(2, [5, 6, 7, 8], ""Opening 1", params);
}
```

### function LineSet(no, lines, comment, params)

Create line set with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to line_sets map.

*Arguments:*

* no - the number of object in block script
* lines - list of lines or numbers of lines in block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);

    var params = {
        "comment": "Comment via parameters"
    };

    LineSet(1, [1, 2, 3], "Line Set 1", params);
}
```

### function MemberSet(no, members, comment, params)

Create member set with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to member_sets map.

*Arguments:*

* no - the number of object in block script
* lines - list of members or numbers of members in block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }
    
    Member(1, [1, 2]);
    Member(2, [2, 3]);
    Member(3, [3, 4]);

    var params = {
        "comment": "Comment via parameters"
    };

    MemberSet(1, [1, 2, 3], "Member Set 1", params);
}
```

### function SurfaceSet(no, surfaces, comment, params)

Create surface set with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to surface_sets map.

*Arguments:*

* no - the number of object in block script
* lines - list of surfaces or numbers of surfaces in block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function generate()
{
    for (var i = 1; i <= 6; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [4, 1]);
    Line(5, [3, 6]);
    Line(6, [5, 6]);
    Line(7, [4, 5]);

    Surface(1, [1, 2, 3, 4]);
    Surface(2, [3, 5, 6, 7]);

    var params = {
        "comment": "Comment via parameters"
    };

    SurfaceSet(1, [1, 2], "Surface Set 1", params);
}
```

### function SolidSet(no, solids, comment, params)

Create solid set with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to solid_sets map.

*Arguments:*

* no - the number of object in block script
* solids - list of solids sor numbers of solids in block script
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function generate()
{
    // code of solids generating

    var params = {
        "comment": "Comment via parameters"
    };

    SolidSet(1, [1, 2], "Solid Set 1", params);
}
```

### function NodalLoad(no, load_case, nodes, comment, params)

Create nodal load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to nodal_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* nodes - nodes with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 10; i++)
    {
        Node(i);
        nodes[i].coordinates = $V(i, 0, 0);
    }

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var nodes_to_load = [];
        for (var i = 1; i < 10; ++i)
        {
            nodes_to_load.push(nodes[i]);
        }

        var params = {
            "load_type": model.nodal_loads.LOAD_TYPE_COMPONENTS,
            "components_force_x": 1.0,
            "components_force_y": 2.0,
            "components_force_z": 3
        }
        NodalLoad(1, live_load_case, nodes_to_load, "Live Load", params);
    }
}
```
> [!Caution]
> All nodal loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function LineLoad(no, load_case, lines, comment, params)

Create line load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to line_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* lines - lines with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    Node(1);
    Node(2);
    Node(3);
    Line(1, [1, 2]);
    Line(2, [2, 3]);


    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = LineLoad(1, live_load_case);
        live_load.comment = "Live Load";
        live_load.lines = [1, 2];        
    }
}
```
> [!Caution]
> All line loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function MemberLoad(no, load_case, members, comment, params)

Create member load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to member_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* members - members with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    Node(1);
    Node(2);
    Node(3);
    Member(1, [1, 2]);
    Member(2, [2, 3]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = MemberLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.members = [1, 2];
    }
}
```
>[!Caution]
>All member loads from different load cases will be add to same map. Therefore all loads should get different script id.
>Read more about important behavior of loads.

### function SurfaceLoad(no, load_case, surfaces, comment, params)

Create surface load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to surface_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surfaces - surfaces with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }

    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [5, 6]);

    Surface(1, [1, 2, 3, 4]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = SurfaceLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.surfaces = [1];
    }
}
```

>[!Caution]
> All surface loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function SolidLoad(no, load_case, solids, comment, params)

Create solid load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to solid_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* solids - solids with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 8; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [4, 1]);
    Line(5, [1, 5]);
    Line(6, [2, 6]);
    Line(7, [3, 7]);
    Line(8, [4, 8]);
    Line(9, [5, 6]);
    Line(10, [6, 7]);
    Line(11, [7, 8]);
    Line(12, [8, 5]);

    Surface(1, [1, 2, 3, 4]);
    Surface(2, [1, 5, 6, 9]);
    Surface(3, [2, 6, 7, 10]);
    Surface(4, [3, 7, 8, 11]);
    Surface(5, [4, 8, 5, 12]);
    Surface(6, [9, 10, 11, 12]);

    Solid(1, [1, 2, 3, 4, 5, 6]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = SolidLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.solids = [1];
    }
}
```
>[!Caution]
> All solid loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function OpeningLoad(no, load_case, openings, comment, params)

Create opening load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to opening_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* openings - openings with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 8; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [4, 1]);
    Line(5, [5, 6]);
    Line(6, [6, 7]);
    Line(7, [7, 8]);
    Line(8, [8, 5]);

    Surface(1, [1, 2, 3, 4]);

    Opening(2, [5, 6, 7, 8]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = OpeningLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.openings = [2];
    }
}
```
> [!Caution]
> All opening loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function LineSetLoad(no, load_case, line_sets, comment, params)

Create line set load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to line_set_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* line_sets - line sets with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);

    LineSet(1, [1, 2, 3]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = LineSetLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.line_sets = [1];
    }
}
```
>[!Caution]
> All line set loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function MemberSetLoad(no, load_case, member_sets, comment, params)

Create member set load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to member_set_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* member_sets - member sets with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }
    
    Member(1, [1, 2]);
    Member(2, [2, 3]);
    Member(3, [3, 4]);

    MemberSet(1, [1, 2, 3]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = MemberSetLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.member_sets = [1];
    }
}
```
> [!Caution]
> All member set loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function SurfaceSetLoad(no, load_case, surface_sets, comment, params)

Create surface set load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to surface_set_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surface_sets - surface sets with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 6; ++i)
    {
        Node(i);
    }
    
    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [4, 1]);
    Line(5, [3, 6]);
    Line(6, [5, 6]);
    Line(7, [4, 5]);

    Surface(1, [1, 2, 3, 4]);
    Surface(2, [3, 5, 6, 7]);

    SurfaceSet(1, [1, 2]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = SurfaceSetLoad(1, live_load_case);
        live_load.comment = "Live Load";
  
        live_load.surface_sets = [1];
    }
}
```
> [!Caution]
> All surface set loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function SolidSetLoad(no, load_case, solid_sets, comment, params)

Create solid set load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to solid_set_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* solid_sets - solid sets with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = SolidSetLoad(1, live_load_case);
        live_load.comment = "Live Load";
    }
}
```
> [!Caution]
> All solid set loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function FreeConcentratedLoad(no, load_case, surfaces, comment, params)

Create free concentrated load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to free_concentrated_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surfaces - surfaces with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    for (var i = 1; i <= 4; ++i)
    {
        Node(i);
    }

    Line(1, [1, 2]);
    Line(2, [2, 3]);
    Line(3, [3, 4]);
    Line(4, [5, 6]);

    Surface(1, [1, 2, 3, 4]);

    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = FreeConcentratedLoad(1, live_load_case);
        live_load.comment = "Live Load";

        live_load.surfaces = [1];
    }
}
```
> [!Caution]
> All free concentrated loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function FreeLineLoad(no, load_case, surfaces, comment, params)

Create free line load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to free_line_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surfaces - surfaces with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = FreeLineLoad(1, live_load_case);
        live_load.comment = "Live Load";
    }
}
```
> [!Caution]
> All free line loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function FreeRectangularLoad(no, load_case, surfaces, comment, params)

Create free rectangular load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to free_rectangular_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surfaces - surfaces with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = FreeRectangularLoad(1, live_load_case);
        live_load.comment = "Live Load";
    }
}
```

> [!Caution]
> All free rectangular loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function FreeCircularLoad(no, load_case, surfaces, comment, params)

Create free circular load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to free_circular_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surfaces - surfaces with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = FreeCircularLoad(1, live_load_case);
        live_load.comment = "Live Load";
    }
}
```
> [!Caution]
> All free circular loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function FreePolygonLoad(no, load_case, surfaces, comment, params)

Create free polygon load with selected script id inside the block. User id will be selected from available indexes in model. But in the script we can use selected id.
Objects will be added to free_polygon_loads map. For creating load should be used load case. Load cases can be selected from load_cases map, in which its added from input parameters only.

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* surfaces - surfaces with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

#### Example
```javascript
function input_data()
{
    var LOADING_CATEGORY = loading_category("Loading"); // Add loading category to block on first level
        parameter_check("Live Load", "live_load_checkbox", true); // Add checkbox for enabling of live load case

        category("Live Load", false, LOADING_CATEGORY); // Add category Live Load, which contains load case input field
            condition("live_load_checkbox == true"); // Set condition for enabling of Live Load Category
            load_case(1, "Load Case"); // Add load case input field to Live Load category
}

function generate()
{
    var live_load_case = load_cases[1];
    if (live_load_case) // Check if load case exists in map, if no, it means live load category or loading category are disabled.
    {
        var live_load = FreePolygonLoad(1, live_load_case);
        live_load.comment = "Live Load";
    }
}
```
> [!Caution]
> All free polygon loads from different load cases will be add to same map. Therefore all loads should get different script id.
> Read more about important behavior of loads.

### function ImposedLineDeformation(no, load_case, lines, comment, params)

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* lines - lines with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

### function ImposedNodalDeformation(no, load_case, nodes, comment, params)

*Arguments:*

* no - the number of object in block script
* load_case - load case in which will be created load
* nodes - nodes with loads
* comment - the comment for object, (undefined if not set)
* params - the dictionary of optional parameters. Name of parameter should be equal to property name of current object, (undefined if not set)

### function AngularDimension(no, object_1, object_2, reference_object_type, symbol, offset, quadrant, comment, params)

Function creates angular dimension and add it do dimensions map.

*Arguments:*

* no - script id
* object_1 - first reference object, like Node for example
* object_2 - second reference object, like Node for example
* reference_object_type - object type, possible values(right values you will find in RFEM, able to change in future):
    * model.dimensions.REFERENCE_TYPE_NODE
    * model.dimensions.REFERENCE_TYPE_POINT
    * model.dimensions.REFERENCE_TYPE_POINT_ON_LINE
    * model.dimensions.REFERENCE_TYPE_LINE
    * model.dimensions.REFERENCE_TYPE_MEMBER
    * model.dimensions.REFERENCE_TYPE_SURFACE
* symbol - string value
* offset - float value
* quadrant - possible values(right values you will find in RFEM, able to change in future):
    * model.dimensions.ANGULAR_QUADRANT_POSITIVE
    * model.dimensions.ANGULAR_QUADRANT_NEGATIVE
    * model.dimensions.ANGULAR_QUADRANT_LEFT
    * model.dimensions.ANGULAR_QUADRANT_RIGHT
* comment - comment
* params - dictionary with property names and values

#### Examples
##### Example 1
Creating angular dimension with objects with same reference type via positional parameters.
```javascript
AngularDimension(18, members[3], members[4], model.dimensions.REFERENCE_TYPE_MEMBER, "A", offset, model.dimensions.ANGULAR_QUADRANT_POSITIVE);
```
##### Example 2
Creating angular dimension with the objects via optional parameter reference_table.
```javascript
var reference_table = [
    [members[1], model.dimensions.REFERENCE_TYPE_MEMBER],
    [members[2], model.dimensions.REFERENCE_TYPE_MEMBER],
];
AngularDimension(16, undefined, undefined, undefined, "A", offset, model.dimensions.ANGULAR_QUADRANT_POSITIVE, "", {'reference_table': reference_table});
```
##### Example 3
Creating angular dimension with object with positional parameter and optional parameter reference_table.
```javascript
var reference_table = [
    [members[3], model.dimensions.REFERENCE_TYPE_MEMBER],
];
AngularDimension(17, members[2], undefined, model.dimensions.REFERENCE_TYPE_MEMBER, "A", offset, model.dimensions.ANGULAR_QUADRANT_POSITIVE, "", {'reference_table': reference_table});
```
##### Example 4
Creating angular dimension with coordinates and some object via positional parameters.

Creating angular dimension with objects with same reference type via positional parameters.
```javascript
AngularDimension(18, [3, 5, 2], members[4], model.dimensions.REFERENCE_TYPE_MEMBER, "A", offset, model.dimensions.ANGULAR_QUADRANT_POSITIVE);
```
> [!Caution]
> If you use positional parameters, you can't use reference object with different types.

The following example is bad. Because of second positional parameter is a Node, but function wait Member, by positional parameter 4 (model.dimensions.REFERENCE_TYPE_MEMBER).

```javascript
AngularDimension(18, nodes[2], members[4], model.dimensions.REFERENCE_TYPE_MEMBER, "A", offset, model.dimensions.ANGULAR_QUADRANT_POSITIVE);
```

### function ArcLengthDimension(id, line, symbol, offset, comment, params)

Function creates arc length dimension and add it to dimensions map.

*Arguments:*

* no - object id in script
* line - line object, or line id in block script
* symbol - string value
* offset - float value
* comment - comment
* params - dictionary with property names and values

### function DiameterDimension(no, line, symbol, position, comment, params)

Function creates diameter dimension and add it to dimensions map.

*Arguments:*

* no - object id in block script, which used in block generation
* line - line object, or line id in block script (different from user id in model)
* symbol - string value
* position - float value
* comment - comment
* params - dictionary with property names and values

### function LinearDimension(no, object_1, object_2, reference, symbol, offset, comment, params)

Function creates linear dimension and add it to dimensions map.

*Arguments:*

* no - object id in block script, which used in block generation
* object_1 - first reference object
* object_2 - second reference object
* reference - String, possible values:
    * "x"
    * "y"
    * "z"
    * "xy"
    * "xz"
    * "yx"
    * "yz"
    * "zx"
    * "zy"
* symbol - string value
* offset - float value
* comment - comment
* params - dictionary with property names and values

##### Examples
```javascript

// linear dimension via points
LinearDimension(1, [1, 2, 3], [3, 4, 5]);

// linear dimension via nodes
LinearDimension(2, nodes[1], nodes[2]);

// linear dimension via node and control point
// Control points had not separate map of objects, but can be get from object properties of another objects, in which was created.
LinearDimension(3, nodes[1], lines[1].arc_control_point_object);

// And you can combine points, nodes and control points in these *Arguments:* object_1, object_2
```

### function RadiusDimension(no, line, symbol, offset, position, comment, params)

Function creates radius dimension and add it to dimensions map.

*Arguments:*

* no - object id in block script
* line - line object
* symbol - string value
* offset - float value
* position - float value
* comment - comment
* params - dictionary with property names and values

### function SlopeDimension(no, object, symbol, offset, position, direction, plane, comment, params)

Function creates slope dimension and add it to dimensions map.

*Arguments:*

* no - object id in block's script
* object - line or member object, depends on program type. line for RFEM and member for RSTAB
* symbol - String
* offset - Float
* position - Float
* direction - String, possible values:
    * "up"
    * "upward"
    * "down"
    * "downward"
* plane - String, possible values:
    * "xy"
    * "yz"
    * "xz"
* comment - comment
* params - dictionary with property names and values

### function LineHinge(no, surface, lines, comment, params)

Function creates line hinge and add it to line_hinges map.

*Arguments:*

* no - object id in block's script
* surface - surface with lines, which should get this hinge
* lines - lines, which should get this hinge
* comment - comment
* params - dictionary with property names and values

#### Example
```javascript
Node(1);
Node(2);
Line(1, [1, 2]);
LineHinge(1, lines[1], lines[2]);
```

### function LineMeshRefinement(no, comment, params)

Function creates line mesh refinement and add it to line_mesh_refinements map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function MemberDefinableStiffness(no, comment, params)

Function creates member definable stiffness and add it to member_definable_stiffnesses map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function MemberEccentricity(no, member_start, member_end, comment, params)

Function creates member eccentricity and add it to member_eccentricities map.

*Arguments:*

* no - object id in block's script
* member_start - member, which should get this member eccentricity, like start member eccentricity
* member_end - member, which should get this member eccentricity, like end member eccentricity
* comment - comment
* params - dictionary with property names and values

#### Example
```javascript
Node(1);
Node(2);
Member(1, [1, 2], "Member 1", params);
MemberEccentricity(1, members[1], members[1]);
```

### function MemberHinge(no, member_start, member_end, comment, params)

Function creates member hinge and add it to member_hinges map.

*Arguments:*

* no - object id in block's script
* member_start - member, which should get this member hinge , like start member hinge 
* member_end - member, which should get this member hinge , like end member hinge 
* comment - comment
* params - dictionary with property names and values

#### Examples

##### Example 1
```javascript
Node(1);
Node(2);
Member(1, [1, 2], "Member 1", params);
MemberHinge(1, members[1], members[1]);
```

#### Example 2
Add member hinge to several members.
```javascript
MemberHinge(1);

members[1].member_hinge_start = member_hinges[1];
members[1].member_hinge_end= member_hinges[1];
members[2].member_hinge_start = member_hinges[1];
members[2].member_hinge_end= member_hinges[1];
members[3].member_hinge_start = member_hinges[1];
members[3].member_hinge_end= member_hinges[1];

var member_hinge = MemberHinge(2);

members[4].member_hinge_start = member_hinge;
members[4].member_hinge_end= member_hinge;
members[5].member_hinge_start = member_hinge;
members[5].member_hinge_end= member_hinge;
members[6].member_hinge_start = member_hinge;
members[6].member_hinge_end= member_hinge;
```

### function MemberNonlinearity(no, comment, params)

Function creates member nonlinearities and add it to member_nonlinearities map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function MemberResultIntermediatePoint(no, comment, params)

Function creates member result intermediate point and add it to member_result_intermediate_points map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function MemberStiffnessModification(no, comment, params)

Function creates member sitffness modification and add it to member_stiffness_modifications map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function MemberTransverseStiffener(no, comment, params)

Function creates member transverse stiffener and add it to member_transverse_stiffeners map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function NodalMeshRefinement(no, comment, params)

Function creates nodal mesh refinement and add it to nodal_mesh _refinements map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function SurfaceEccentricity(no, surface, comment, params)

Function creates surface eccentricity and add it to surface_eccentricities map.

*Arguments:*

* no - object id in block's script
* surface - surface, which should get this eccentricity
* comment - comment
* params - dictionary with property names and values

#### Example
```javascript
for (var i = 1; i <= 4; ++i)
{
    Node(i);
}

Line(1, [1, 2]);
Line(2, [2, 3]);
Line(3, [3, 4]);
Line(4, [5, 6]);

var params = {
    "comment": "Comment via parameters"
};

Surface(1, [1, 2, 3, 4], thicknesses[1], "Surface 1", params);
SurfaceEccentricity(1, surfaces[1]);
```

### function SurfaceMeshRefinement(no, comment, params)

Function creates surface mesh refinement and add it to surface_mesh _refinement s map.

*Arguments:*

* no - object id in block's script
* comment - comment
* params - dictionary with property names and values

### function CoordinateSystem(no, coordinate_system_type, comment, params)

Function creates coordinate system and add it to *coordinate_systems map.

*Arguments:*

* no - object id in block's script
* coordinate_system_type - set type of coordinate system. Possible values
    * model.coordinate_systems.TYPE_OFFSET_XYZ
    * model.coordinate_systems.TYPE_3_POINTS
    * model.coordinate_systems.TYPE_2_POINTS_AND_ANGLE
    * model.coordinate_systems.TYPE_POINT_AND_3_ANGLES
* comment - comment
* params - dictionary with property names and values

#### Example
```javascript
Node(1, 0.5, 0, 0);
Node(2, 0.5, 1, 0);

var coordinate_system_params =
{
    "origin_coordinates": [0, 0, 0],
    "u_axis_point_coordinates": [1, 0, 0],
    "uw_plane_point_coordinates": [0, 0, 1]
}
CoordinateSystem(1, model.coordinate_systems.TYPE_3_POINTS, undefined, coordinate_system_params);

var linear_dimension_params =
{
    "linear_coordinate_system": coordinate_systems[1],
};
LinearDimension(1, nodes[1], nodes[2], "zx", "", 1, undefined, linear_dimension_params);
```

## model variable

In script of block user can use variable model for getting constants, which exists in RFEM/RSTAB.

For example:
```javascript
function generated()
{
    var live_load = NodalLoad(1, live_load_case);
    live_load.load_type = model.nodal_loads.LOAD_TYPE_COMPONENTS; // Get constant from RFEM via model
}
```

## UNIT

Units, which can be used in integer and floats parameters.

* list of units
* Example

### List of units

```javascript
UNIT.NONE
UNIT.EG_MODULE
UNIT.STRESSES
UNIT.MATERIAL_SPECIFIC_WEIGHT
UNIT.THERMAL_EXPANSION_COEFFICIENT
UNIT.DENSITY
UNIT.POISSONS_RATIO
UNIT.HARDENING_FACTOR
UNIT.REFERENCE_ELEMENT_SIZE
UNIT.MATERIAL_FACTOR
UNIT.MATERIAL_THICKNESS
UNIT.MATERIAL_DEFORMATION
UNIT.STRAIN
UNIT.GRAVITATIONAL_ACCELERATION
UNIT.FRACTURE_ENERGY
UNIT.MATERIAL_QUANTITY_INTEGER
UNIT.MATERIAL_ANGLE

// SUBCATEGORY_MATERIALS_GAS
UNIT.THERMAL_CONDUCTIVIY
UNIT.GAS_DENSITY
UNIT.MATERIAL_TEMPERATURE
UNIT.GAS_PRESSURE
UNIT.MOLAR_MASS
UNIT.HEAT_CAPACITY
UNIT.DYNAMIC_VISCOSITY
UNIT.DYNAMIC_INCREASE_FACTOR
UNIT.STRAIN_RATE

// CATEGORY_SECTIONS
// SUBCATEGORY_SECTIONS_GENERAL
UNIT.SECTION_DIMENSION
UNIT.SECTION_PERIMETER
UNIT.SECTION_COMPLIANCE
UNIT.SECTION_AREA
UNIT.SECTION_ANGLE
UNIT.SECTION_MOMENT_OF_INERTIA
UNIT.SECTION_SECTION_FACTOR
UNIT.SECTION_SECTION_MODULUS
UNIT.SECTION_EFFECTIVE_SECOND_MOMENT_OF_AREA
UNIT.SECTION_STATICAL_MOMENT_OF_AREA
UNIT.SECTION_TENSION_FIELD_COEFFICIENT_1
UNIT.SECTION_TENSION_FIELD_COEFFICIENT_2
UNIT.SECTION_WARPING_CONSTANT
UNIT.SECTION_NORMALIZED_WARPING_CONSTANT
UNIT.SECTION_WARPING_STATICAL_MOMENT
UNIT.SECTION_BIMOMENT
UNIT.SECTION_FORCE
UNIT.SECTION_MOMENT
UNIT.SECTION_UNIT_STRESSES
UNIT.SECTION_UNIT_WARPING_FUNCTION
UNIT.SECTION_QUANTITY

// SUBCATEGORY_SECTIONS_UNIT_PARAMETERS
UNIT.SECTION_VOLUME
UNIT.SECTION_SURFACE
UNIT.SECTION_WEIGHT

// SUBCATEGORY_SECTIONS_ADDON_CONCRETE
UNIT.MATERIAL_HUMIDITY
UNIT.SECTION_COEFFICIENT
UNIT.MATERIAL_TIME
UNIT.MATERIAL_COEFFICIENT
UNIT.SECTION_STRAIN

// CATEGORY_MODEL
// SUBCATEGORY_MODEL_GENERAL
UNIT.LENGTH
UNIT.RSECTION_LENGTH
UNIT.AREA
UNIT.RSECTION_AREA
UNIT.VOLUME
UNIT.ANGLE
UNIT.GEOGRAPHIC_COORDINATES
UNIT.MASS
UNIT.THICKNESS
UNIT.TIME

// SUBCATEGORY_MODEL_DIMENSIONLESS
UNIT.DIMENSIONLESS
UNIT.RELATIVE_LENGTH
UNIT.PARTIAL_FACTOR
UNIT.WEIGHT_AND_KNOT
UNIT.RATIO
UNIT.PRECISION_FACTOR
UNIT.FRICTION_COEFFICIENT
UNIT.STIFFNESS_MULTIPLICATION_FACTOR
UNIT.QUANTITY
UNIT.QUANTITY_WITH_FIXED_PRECISION

// SUBCATEGORY_MODEL_SUPPORTS_ELASTIC_FOUNDATION_ORTHOTROPY
UNIT.SPRING_STIFFNESS
UNIT.SPRING_ROTATIONAL_STIFFNESS
UNIT.LINE_SPRING_CONSTANT
UNIT.LINE_SPRING_ROTATIONAL_STIFFNESS
UNIT.SURFACE_SPRING_CONSTANT
UNIT.SHEAR_SPRING_CONSTANT
UNIT.ORTHOTROPY_BENDING_MOMENT
UNIT.ORTHOTROPY_LINE_MOMENT
UNIT.MASS_PER_UNIT_AREA
UNIT.MASS_MOMENT_PER_UNIT_AREA
UNIT.SURFACES_CONTACT_TYPE_SHEAR_STIFFNESS
UNIT.SOLID_SHEAR_STIFFNESS

// SUBCATEGORY_MODEL_MEMBER_TRANSVERSE_STIFFENERS
UNIT.MEMBER_TRANSVERSE_STIFFENERS_WELD_SIZE

// SUBCATEGORY_MODEL_MEMBER_MATRIX_STIFFNESS_ELEMENTS
UNIT.MEMBER_BENDING_TORSION_STIFFNESS_ELEMENT
UNIT.MEMBER_SHEAR_STIFFNESS_ELEMENT
UNIT.MEMBER_ECCENTRIC_STIFFNESS_ELEMENT
UNIT.MEMBER_DEVIATORIC_STIFFNESS_ELEMENT

// SUBCATEGORY_MODEL_SURFACE_MATRIX_STIFFNESS_ELEMENTS
UNIT.SURFACE_BENDING_TORSION_STIFFNESS_ELEMENT
UNIT.SURFACE_SHEAR_STIFFNESS_ELEMENT
UNIT.SURFACE_MEMBRANE_STIFFNESS_ELEMENT
UNIT.SURFACE_ECCENTRIC_STIFFNESS_ELEMENT

//SUBCATEGORY_MODEL_SURFACE_THICKNESS_LAYERS
UNIT.SURFACE_SPECIFIC_WEIGHT
UNIT.SURFACE_WEIGHT

// CATEGORY_CONSTRUCTION_STAGES
// SUBCATEGORY_CONSTRUCTION_STAGES_GENERAL
UNIT.CONSTRUCTION_STAGES_TIME

// CATEGORY_BUILDING_MODEL
// SUBCATEGORY_BUILDING_MODEL_BUILDING_STORIES
UNIT.BUILDING_STORIES_LENGTH
UNIT.BUILDING_STORIES_AREA
UNIT.BUILDING_STORIES_VOLUME
UNIT.BUILDING_STORIES_MASS

// SUBCATEGORY_BUILDING_MODEL_TIMBER_FRAME_WALL
UNIT.TIMBER_FRAME_WALL_LENGTH
UNIT.TIMBER_FRAME_WALL_THICKNESS
UNIT.TIMBER_FRAME_WALL_CONNECTOR_DIMENSION
UNIT.TIMBER_FRAME_WALL_CONNECTOR_SPACING

// CATEGORY_LOADS
// SUBCATEGORY_LOADS_LOADS
UNIT.LOADS_FORCE
UNIT.LOADS_MOMENT
UNIT.LOADS_MASS
UNIT.LOADS_DISPLACEMENT
UNIT.LOADS_ROTATION
UNIT.LOADS_LENGTH
UNIT.LOADS_RELATIVE_LENGTH
UNIT.LOADS_TEMPERATURE
UNIT.LOADS_TEMPERATURE_CHANGE
UNIT.LOADS_AXIAL_STRAIN
UNIT.LOADS_FORCE_PER_UNIT_LENGTH
UNIT.LOADS_MOMENT_PER_UNIT_LENGTH
UNIT.LOADS_DISPLACEMENT_PER_UNIT_LENGTH
UNIT.LOADS_ROTATION_PER_UNIT_LENGTH
UNIT.LOADS_SURFACE_TYPE_LOAD
UNIT.LOADS_SOLID_TYPE_LOAD
UNIT.LOADS_DENSITY
UNIT.LOADS_PRESSURE
UNIT.SELF_WEIGHT_FACTOR
UNIT.LOADS_PRECAMBER
UNIT.LOADS_AREA_MASS
UNIT.LOADS_IMPOSED_DISPLACEMENT
UNIT.LOADS_IMPOSED_ROTATION
UNIT.LOADS_ANGULAR_VELOCITY
UNIT.LOADS_ANGULAR_ACCELERATION
UNIT.LOADS_VELOCITY
UNIT.LOADS_KINEMATIC_VISCOSITY
UNIT.LOADS_KINETIC_ENERGY
UNIT.LOADS_SPECIFIC_ENERGY

// SUBCATEGORY_LOADS_LOAD_COMBINATIONS
UNIT.LOADING_FACTOR

// CATEGORY_IMPERFECTIONS
// SUBCATEGORY_IMPERFECTIONS_GENERAL
UNIT.IMPERFECTIONS_MAGNITUDE
UNIT.IMPERFECTIONS_RELATIVE_LENGTH
UNIT.IMPERFECTIONS_RATIO
UNIT.IMPERFECTIONS_FORCE

// CATEGORY_RESULTS
// SUBCATEGORY_RESULTS_GENERAL
UNIT.RESULTS_DISPLAY_FACTOR

// SUBCATEGORY_RESULTS_RESULT_DIAGRAMS
UNIT.RESULTS_RESULT_DIAGRAMS_SMOOTHING_FORCES
UNIT.RESULTS_RESULT_DIAGRAMS_SMOOTHING_MOMENTS

// SUBCATEGORY_RESULTS_DESIGN_OVERVIEW
UNIT.RESULTS_DESIGN_OVERVIEW_DESIGN_RATIO

// CATEGORY_DIMENSIONS
// SUBCATEGORY_DIMENSIONS_GENERAL
UNIT.DIMENSIONS_LENGTH
UNIT.DIMENSIONS_ANGLE
UNIT.DIMENSIONS_SLOPE
UNIT.DIMENSIONS_ALTITUDE

// CATEGORY_CONCRETE_REINFORCEMENT
// SUBCATEGORY_CONCRETE_REFINFORCEMENT_GENERAL
UNIT.CONCRETE_REINFORCEMENT_AREA
UNIT.CONCRETE_REINFORCEMENT_DIAMETER
UNIT.CONCRETE_REINFORCEMENT_CONCRETE_COVER
UNIT.CONCRETE_REINFORCEMENT_LENGTH
UNIT.CONCRETE_REINFORCEMENT_AREA_PER_UNIT_LENGTH
UNIT.CONCRETE_REINFORCEMENT_AREA_PER_SQUARE_METER
UNIT.CONCRETE_REINFORCEMENT_RATIO
UNIT.CONCRETE_REINFORCEMENT_WEIGHT

// SUBCATEGORY_CONCRETE_EFFECTIVE_LENGTHS
UNIT.CONCRETE_EFFECTIVE_LENGTHS_FACTOR
UNIT.CONCRETE_EFFECTIVE_LENGTHS_ECCENTRICITY

// SUBCATEGORY_CONCRETE_DESIGN_GENERAL
UNIT.CONCRETE_DESIGN_CRACK_WIDTHS
UNIT.CONCRETE_DESIGN_DIMENSIONLESS
UNIT.CONCRETE_TEMPERATURE
UNIT.CONCRETE_DESIGN_PUNCHING_LENGTH
UNIT.CONCRETE_DESIGN_RATIOS
UNIT.CONCRETE_DURATION_OF_LONG_TERM_LOAD
UNIT.CONCRETE_DURATION_OF_LOAD
UNIT.CONCRETE_LIMIT_OF_ALLOWABLE_DEFLECTION

// CATEGORY_STATIC_ANALYSIS
// SUBCATEGORY_STATIC_ANALYSIS_GENERAL
UNIT.STATIC_ANALYSIS_LOAD_INCREMENT_FACTORS
UNIT.STATIC_ANALYSIS_DESIGN_RATIO

// SUBCATEGORY_STATIC_ANALYSIS_DEFORMATIONS_AND_STRAINS
UNIT.STATIC_ANALYSIS_DISPLACEMENT
UNIT.STATIC_ANALYSIS_ROTATION
UNIT.STATIC_ANALYSIS_WARPING
UNIT.STATIC_ANALYSIS_AXIAL_AND_SHEAR_STRAIN
UNIT.STATIC_ANALYSIS_TORSIONAL_AND_BENDING_STRAIN
UNIT.STATIC_ANALYSIS_STRAIN_ANGLES

// SUBCATEGORY_STATIC_ANALYSIS_SUPPORT_AND_INTERNAL_FORCES
UNIT.STATIC_ANALYSIS_MEMBER_FORCE
UNIT.STATIC_ANALYSIS_MEMBER_MOMENT
UNIT.STATIC_ANALYSIS_MEMBER_BIMOMENT
UNIT.STATIC_ANALYSIS_MEMBER_PRESSURE
UNIT.STATIC_ANALYSIS_RIB_FORCE
UNIT.STATIC_ANALYSIS_SURFACE_FORCE
UNIT.STATIC_ANALYSIS_SURFACE_MOMENT
UNIT.STATIC_ANALYSIS_ANGLES
UNIT.STATIC_ANALYSIS_RESULTANT_FORCE
UNIT.STATIC_ANALYSIS_RESULTANT_MOMENT

// SUBCATEGORY_STATIC_ANALYSIS_STRESSES
UNIT.STATIC_ANALYSIS_STRESSES_ON_SURFACES
UNIT.STATIC_ANALYSIS_STRESSES_ON_SOLIDS

// SUBCATEGORY_STATIC_ANALYSIS_ELASTIC_FOUNDATION
UNIT.STATIC_ANALYSIS_MEMBER_CONTACT_FORCE
UNIT.STATIC_ANALYSIS_MEMBER_CONTACT_MOMENT
UNIT.STATIC_ANALYSIS_SURFACE_CONTACT_STRESS

// SUBCATEGORY_STATIC_ANALYSIS_ADDON_CONCRETE
UNIT.STATIC_ANALYSIS_TIME

// SUBCATEGORY_STATIC_ANALYSIS_GAS,
UNIT.STATIC_ANALYSIS_GAS_PRESSURE
UNIT.STATIC_ANALYSIS_GAS_TEMPERATURE
UNIT.STATIC_ANALYSIS_GAS_VOLUME

// SUBCATEGORY_STATIC_ANALYSIS_CALCULATION_STATISTIC
UNIT.STATIC_ANALYSIS_VALUES_OF_STIFFNESS_MATRIX_DIAGONAL_ELEMENTS
UNIT.STATIC_ANALYSIS_STIFFNESS_MATRIX_DETERMINANT
UNIT.STATIC_ANALYSIS_INFINITY_NORM

// SUBCATEGORY_STATIC_ANALYSIS_OTHER,
UNIT.STATIC_ANALYSIS_CRITERIA_RATIO

// CATEGORY_STRESS_ANALYSIS
// SUBCATEGORY_STRESS_ANALYSIS_GENERAL
UNIT.STRESS_ANALYSIS_STRESSES
UNIT.STRESS_ANALYSIS_STRAINS
UNIT.STRESS_ANALYSIS_BENDING_STRAIN
UNIT.STRESS_ANALYSIS_RATIOS

//CATEGORY_RSECTION_RESULTS
//SUBCATEGORY_RSECTION_RESULT_STRESSES
UNIT.RSECTION_RESULT_LOCATIONS
UNIT.RSECTION_RESULT_STRESSES
UNIT.RSECTION_RESULT_RATIOS

// CATEGORY_ALUMINUM_DESIGN
// SUBCATEGORY_ALUMINUM_DESIGN_GENERAL
UNIT.ALUMINUM_DESIGN_AXIAL_AND_SHEAR_STRAIN
UNIT.ALUMINUM_DESIGN_TORSIONAL_AND_BENDING_STRAIN
UNIT.ALUMINUM_DESIGN_STRESSES
UNIT.ALUMINUM_DESIGN_RATIOS
UNIT.ALUMINUM_DESIGN_GLOBAL_BUCKLING_SLENDERNESS_RATIOS

// CATEGORY_STEEL_DESIGN
// SUBCATEGORY_STEEL_DESIGN_GENERAL
UNIT.STEEL_DESIGN_AXIAL_AND_SHEAR_STRAIN
UNIT.STEEL_DESIGN_TORSIONAL_AND_BENDING_STRAIN
UNIT.STEEL_DESIGN_STRESSES
UNIT.STEEL_DESIGN_RATIOS
UNIT.STEEL_DESIGN_GLOBAL_BUCKLING_SLENDERNESS_RATIOS
UNIT.STEEL_DESIGN_LOCAL_BUCKLING_SLENDERNESS_RATIOS
UNIT.STEEL_DESIGN_GENERAL_FACTORS
UNIT.STEEL_DESIGN_PERCENTAGE

// SUBCATEGORY_STEEL_DESIGN_RESULTS
UNIT.STEEL_DESIGN_RESULTS_FACTORS
UNIT.STEEL_DESIGN_RESULTS_MOMENT_RATIO

// SUBCATEGORY_STEEL_DESIGN_FIRE_PROTECTION
UNIT.STEEL_DESIGN_FP_TEMPERATURE
UNIT.STEEL_DESIGN_FP_TIME
UNIT.STEEL_DESIGN_FP_TIME_INTERVAL
UNIT.STEEL_DESIGN_FP_UNIT_MASS
UNIT.STEEL_DESIGN_FP_THERMAL_CONDUCTIVITY
UNIT.STEEL_DESIGN_FP_SPECIFIC_HEAT
UNIT.STEEL_DESIGN_FP_THICKNESS
UNIT.STEEL_DESIGN_FP_COEF_OF_HEAT_TRANSFER
UNIT.STEEL_DESIGN_FP_STEFAN_BOLTZMANN_CONSTANT

// CATEGORY_STEEL_JOINTS
// SUBCATEGORY_STEEL_JOINTS_GENERAL
UNIT.STEEL_JOINTS_RATIOS
UNIT.STEEL_JOINTS_PERCENTAGE
UNIT.STEEL_JOINTS_PARTIAL_FACTORS

// SUBCATEGORY_STEEL_JOINTS_GEOMETRY
UNIT.STEEL_JOINTS_GEOMETRY_LENGTHS
UNIT.STEEL_JOINTS_GEOMETRY_THICKNESSES
UNIT.STEEL_JOINTS_GEOMETRY_ANGLES
UNIT.STEEL_JOINTS_GEOMETRY_COORDINATES

// SUBCATEGORY_STEEL_JOINTS_WELDS
UNIT.STEEL_JOINTS_WELD_SIZES

// SUBCATEGORY_STEEL_JOINTS_BOLTS
UNIT.STEEL_JOINTS_BOLT_SECTION_AREAS
UNIT.STEEL_JOINTS_BOLT_DIAMETER

// SUBCATEGORY_STEEL_JOINTS_MISCELLANEOUS
UNIT.STEEL_JOINTS_MISCELLANEOUS_VECTORS

// CATEGORY_STEEL_OBJECTS
// SUBCATEGORY_STEEL_OBJECTS_ROTATIONAL_RESTRAINTS
UNIT.STEEL_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS
UNIT.STEEL_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS

// SUBCATEGORY_STEEL_OBJECTS_SHEAR_PANELS
UNIT.STEEL_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1
UNIT.STEEL_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2
UNIT.STEEL_OBJECTS_SHEAR_PANELS_STIFFNESS

// SUBCATEGORY_STEEL_OBJECTS_WELDS
UNIT.STEEL_OBJECTS_WELD_SIZE

// SUBCATEGORY_STEEL_OBJECTS_EFFECTIVE_LENGTHS
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_FACTORS
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_TOLERANCE
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_SPRING
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_WARPING
UNIT.STEEL_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY

// SUBCATEGORY_STEEL_OBJECTS_BOUNDARY_CONDITIONS
UNIT.STEEL_OBJECTS_BOUNDARY_CONDITIONS_ECCENTRICITY
UNIT.STEEL_OBJECTS_BOUNDARY_CONDITIONS_ROTATION
UNIT.STEEL_OBJECTS_BOUNDARY_CONDITIONS_STIFFNESS
UNIT.STEEL_OBJECTS_BOUNDARY_CONDITIONS_ROTATIONAL_STIFFNESS
UNIT.STEEL_OBJECTS_BOUNDARY_CONDITIONS_WARPING

// CATEGORY_TIMBER_DESIGN
// SUBCATEGORY_TIMBER_DESIGN_GENERAL
UNIT.TIMBER_DESIGN_AXIAL_AND_SHEAR_STRAIN
UNIT.TIMBER_DESIGN_TORSIONAL_AND_BENDING_STRAIN
UNIT.TIMBER_DESIGN_STRESSES
UNIT.TIMBER_DESIGN_RATIOS
UNIT.TIMBER_DESIGN_FACTORS
UNIT.TIMBER_DESIGN_FP_TIME
UNIT.TIMBER_DESIGN_FP_TIME_HOUR
UNIT.TIMBER_DESIGN_LIFETIME
UNIT.TIMBER_DESIGN_CHARRING_RATE

// SUBCATEGORY_TIMBER_OBJECTS_EFFECTIVE_LENGTHS
UNIT.TIMBER_OBJECTS_EFFECTIVE_LENGTHS_FACTORS
UNIT.TIMBER_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT
UNIT.TIMBER_OBJECTS_EFFECTIVE_LENGTHS_SPRING
UNIT.TIMBER_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS
UNIT.TIMBER_OBJECTS_EFFECTIVE_LENGTHS_WARPING
UNIT.TIMBER_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY

// SUBCATEGORY_TIMBER_OBJECTS_SHEAR_PANELS
UNIT.TIMBER_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1
UNIT.TIMBER_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2
UNIT.TIMBER_OBJECTS_SHEAR_PANELS_STIFFNESS

// SUBCATEGORY_TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS
UNIT.TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS
UNIT.TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS

// CATEGORY_ALUMINUM_OBJECTS
// SUBCATEGORY_ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_FACTORS
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_LATERAL_TORSIONAL_BUCKLING_MOMENT
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_TOLERANCE
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_SPRING
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_WARPING
UNIT.ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY

// SUBCATEGORY_ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS
UNIT.ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ECCENTRICITY
UNIT.ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ROTATION
UNIT.ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_STIFFNESS
UNIT.ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ROTATIONAL_STIFFNESS
UNIT.ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_WARPING

// SUBCATEGORY_ALUMINUM_OBJECTS_SHEAR_PANELS
UNIT.ALUMINUM_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1
UNIT.ALUMINUM_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2
UNIT.ALUMINUM_OBJECTS_SHEAR_PANELS_STIFFNESS

// SUBCATEGORY_ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS
UNIT.ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS
UNIT.ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS

// SUBCATEGORY_ALUMINUM_OBJECTS_WELDS
UNIT.ALUMINUM_OBJECTS_WELD_SIZE

// SUBCATEGORY_STABILITY_ANALYSIS_STABILITY_ANALYSIS
UNIT.STABILITY_ANALYSIS_FACTORS
UNIT.STABILITY_ANALYSIS_EIGENVECTORS
UNIT.STABILITY_ANALYSIS_INITIAL_STRAIN

//CATEGORY_DYNAMIC_ANALYSIS
//SUBCATEGORY_DYNAMIC_ANALYSIS_GENERAL
UNIT.DYNAMIC_ANALYSIS_GENERAL_ACCELERATIONS
UNIT.DYNAMIC_ANALYSIS_GENERAL_ANGULAR_ACCELERATIONS
UNIT.DYNAMIC_ANALYSIS_GENERAL_VELOCITIES
UNIT.DYNAMIC_ANALYSIS_GENERAL_ANGULAR_VELOCITIES
UNIT.DYNAMIC_ANALYSIS_GENERAL_MULTIPLIERS
UNIT.DYNAMIC_ANALYSIS_GENERAL_FREQUENCIES
UNIT.DYNAMIC_ANALYSIS_GENERAL_ROTATIONS
UNIT.DYNAMIC_ANALYSIS_GENERAL_FACTORS
UNIT.DYNAMIC_ANALYSIS_GENERAL_TIME
UNIT.DYNAMIC_ANALYSIS_GENERAL_EIGENVECTORS
UNIT.DYNAMIC_ANALYSIS_GENERAL_EIGENVALUES
UNIT.DYNAMIC_ANALYSIS_GENERAL_ANGULAR_FREQUENCIES
UNIT.DYNAMIC_ANALYSIS_GENERAL_DAMPING
UNIT.DYNAMIC_ANALYSIS_GENERAL_COMBINATION_PERCENTAGE
UNIT.DYNAMIC_ANALYSIS_GENERAL_G_FACTOR

//SUBCATEGORY_DYNAMIC_ANALYSIS_MASSES
UNIT.DYNAMIC_ANALYSIS_MASSES_MODAL_MASSES
UNIT.DYNAMIC_ANALYSIS_MASSES_TRANSLATIONAL_MASSES
UNIT.DYNAMIC_ANALYSIS_MASSES_ROTATIONAL_MASSES
UNIT.DYNAMIC_ANALYSIS_MASSES_PERCENTAGE_EFFECTIVE_MODAL_MASSES
UNIT.DYNAMIC_ANALYSIS_MASSES_ROTATIONAL_PARTICIPATION_FACTORS
UNIT.DYNAMIC_ANALYSIS_MASSES_MODAL_MASS_FACTORS

//CATEGORY_CRANEWAY_DESIGN
//SUBCATEGORY_CRANEWAY_DESIGN_GENERAL
UNIT.CRANEWAY_LENGTH
UNIT.CRANEWAY_DESIGN_RATIOS
```

### Example
```javascript
function input_data()
{
    category("Parameters");

        // Create input integer parameter without unit
        parameter_int("Frame count", "n", "", 4, UNIT.NONE, 1, 1, 100, false, false);

        // Create input float parameter with Length unit
        parameter_float("Frame spacing", "d" , "",  4.000, UNIT.LENGTH, 0.0, 1, MAXIMUM, false, false);
}
```

## Multiplicity Examples

Multiplicity parameters and categories are rows in objects, which created by counter.
It means, if counter has value 5, then will be created 5 categories or 5 parameters, which depends on this counter.

### Using

In name of parameter or category you can write special tag {{number}}, which will be changed to current number of parameter, object or category.

### category
```javascript
function input_data()
{
    category("Heights Multiplicity Category");
        // Add counter, which manage multiplicity parameters
        parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);

    var MEMBER_SETTINGS_CATEGORY = category("Members settings");
        // Create multiplicity category
        // "Multiplicity Group {{number}}" - title with {{number}} tag
        // "n" - name of counter, last argument
        category("Multiplicity Group {{number}}", "n", MEMBER_SETTINGS_CATEGORY);
}
```

### parameter_int
```javascript
function input_data()
{
    // Add counter, which manage multiplicity parameters
    parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);
    // Add multiplicity integer parameter
    // "Nodal Offset {{number}}" - title with {{number}} tag
    // "n" - name of counter, last argument
    // from key "offset" will be generated script names "offset_1", "offset_2", "offset_3" and etc.
    parameter_int("Nodal Offset {{number}}", "offset", "", 2, UNIT.NONE, 1.0, 1.0, 50, false, false, "n");
}
```

### parameter_float
```javascript
function input_data()
{
    // Add counter, which manage multiplicity parameters
    parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);
    // Add multiplicity integer parameter
    // "Nodal Offset {{number}}" - title with {{number}} tag
    // "n" - name of counter, last argument
    // from key "offset" will be generated script names "offset_1", "offset_2", "offset_3" and etc.
    parameter_float("Nodal Offset {{number}}", "offset", "", 2, UNIT.LENGTH, 1.0, 1.0, 50, false, false, "n");
}
```

### material, section, thickness, nodal_support, line_support, member_support, surface_support, load_case
```javascript
function input_data()
{
    category("Heights Multiplicity Category");
        // Add counter, which manage multiplicity parameters
        parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);

    var MEMBER_SETTINGS_CATEGORY = category("Members settings");

        // Create multiplicity category
        // "Multiplicity Group {{number}}" - title with {{number}} tag
        // "n" - name of counter, last argument
        category("Multiplicity Group {{number}}", "n", MEMBER_SETTINGS_CATEGORY);

            // Add object input multiplicity field
            // 1 - start script id of objects
            // "Section {{number}}" - title with {{number}} tag
            // "n" - name of counter, last argument
            section(1, "Section {{number}}", "n");
}
```
When added two multiplicity object input fields, need to control collision of maximum created objects.
For example, if add two fields of section, need to set maximum of counter.
```javascript
function input_data()
{
    category("Heights Multiplicity Category");
        // Add counter, which manage multiplicity parameters with maximum 10
        parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);

    var MEMBER_SETTINGS_CATEGORY = category("Members settings");

        // Create multiplicity category
        // "Multiplicity Group {{number}}" - title with {{number}} tag
        // "n" - name of counter, last argument
        category("Multiplicity Group {{number}}", "n", MEMBER_SETTINGS_CATEGORY);

            // Add first object input multiplicity field
            // 1 - start script id of objects, maximum id will be 10
            // "Section {{number}}" - title with {{number}} tag
            // "n" - name of counter, last argument
            section(1, "Section {{number}}", "n");
 
            // Add second object input multiplicity field
            // 15 - start script id of objects, maximum id will be 24
            // "Section {{number}}" - title with {{number}} tag
            // "n" - name of counter, last argument
            section(15, "Section {{number}}", "n");
}
```
### parameter_check, combobox, loading_category
Not used in multiplicity

### Example
```javascript
function input_data()
{
    // Add category with counter for multiplicity categories and parameters
    category("Heights Multiplicity Category");
        // Add counter parameter for multiplicity categories and parameters
        parameter_int("Multiplicity Counter", "n", "", 2, UNIT.NONE, 1, 1, 10, true, true);
        // Add multiplicity parameter, which depends on "n" counter (last argument)
        parameter_float("Height {{number}}", "z", "", 0, UNIT.LENGTH, 0.0, 1.0, 50, true, true, "n");

    // Add category, which contains multiplicity categories and parameters
    var MEMBER_SETTINGS_CATEGORY = category("Members settings");
        // Add multiplicity category, which depends on "n" counter
        category("Multiplicity Group {{number}}", "n", MEMBER_SETTINGS_CATEGORY);
            // Add multiplicity float parameter, which depends on "n" counter
            parameter_float("Nodal Offset {{number}}", "offset", "", 2, UNIT.LENGTH, 1.0, 1.0, 50, false, false, "n");
            // Add multiplicity section, which depends on "n" counter
            section(1, "Section {{number}}", "n");

    // Add loading category
    var LOADING_CATEGORY = loading_category("Loading");
        // Add check for enabling loads
        parameter_check("Loads", "loads_checkbox", true);
        // Add load category
        category("Loads", false, LOADING_CATEGORY);
            // which enable by condition
            condition("loads_checkbox == true");
            // Add counter "loads_n", which manage loads multiplicity parameters
            parameter_int("Load cases counter", "loads_n", "", 1, UNIT.NONE, 1, 1, 3, true, true);
            // Add multiplicity load cases, which depends on "loads_n" counter
            load_case(1, "Load case {{number}}", "loads_n");

        // Add category, with multiplicity magnitudes
        category("Load magnitudes", false, LOADING_CATEGORY);
            // which enable by condition
            condition("loads_checkbox == true");
            Add multiplicity float parameter, which depends on "loads_n" counter
            parameter_float("Magnitude {{number}}", "m", "", 1000, UNIT.LOADS_FORCE, 1000, 1, NAN, true, false, "loads_n");
}

function generate()
{
    // Create nodes
    var nodes_count = n + 1;

    for (var i = 0; i < nodes_count; ++i)
    {
        var node = Node(i);
        if (i == 0)
        {
            node.coordinate_1 = 0.0;
            node.coordinate_2 = 0.0;
            node.coordinate_3 = 0.0;
        }
        else
        {
            // multiplicity names will be generated by following logic:
            // from base name "offset" will be generated names "offset_1", "offset_2", "offset_3" and etc.
            var x = nodes[i - 1].coordinate_1 + multiplicity["offset_" + i]; // get existing object by multiplicity

            // from base name "z" will be generated names "z_1", "z_2", "z_3" and etc.
            var z = multiplicity["z_" + i] * (-1); // get existing object by multiplicity

            node.coordinate_1 = x;
            node.coordinate_2 = 0.0;
            node.coordinate_3 = z;
        }
    }

    var members_count = 0;
    for (var i = 1; i < nodes_count; ++i)
    {
        var member = Member(i, [i - 1, i]);
        // multiplicity sections will be generated from id, which was set in input_data function
        member.section_start = sections[i];
        ++members_count;
    }

    for (var i = 1; i < loads_n + 1; ++i)
    {
        // multiplicity load cases will be generated from id, which was set in input_data function
        var load_case = load_cases[i];
        if (load_case)
        {
            var member_load = MemberLoad(i, load_case);

            // from base name "m" will be generated names "m_1", "m_2", "m_3" and etc.
            member_load.magnitude = multiplicity["m_" + i]; // get existing object by multiplicity

            var members_to_load = [];

            for (var j = 1; j < members_count + 1; ++j)
            {
                members_to_load.push(members[j]);
            }

            member_load.members = members_to_load;
        }
    }
}
```
## Constants

Constants, which can be used in block scripting.
``` JavaScript
USER_ID_MIN = 1;
USER_ID_MAX = 1000000;
MAXIMUM = 2.14748e+9;
NAN = "nan"
```
