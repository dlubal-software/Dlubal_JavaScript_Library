# Instructions for scripts and formulas in RFEM 6

## Introduction

This article describes how to write scripts and formulas in RFEM 6. The vast majority of the rules apply to scripts and formulas at the same time (and also to commands in the console), so we will only talk about scripts.

## Syntax

RFEM 6 scripts are written in JavaScript (ECMA-262 standard). However, we've modified the syntax a bit to better meet the needs of RFEM customers:

### Operator Power
The ^ operator is a power, not a bit xor. Expressions of type a^b are equivalent to Math.pow(a, b).

### Units
In script code, you can use units for entering numeric values:

```javascript
var a = 10mm;
var b = 10 kN/m;
var c = (1mm + 3mm) + 2mm;
```

Almost all RFEM units are available in the code, an overview of which can be found, for example, in the "Units and decimal places" dialog. Exceptions are units that have no symbols (e.g. factors) and percentage (% is an operator in JavaScript).

Units can be used either after a number or after a closing bracket. This restriction allows you to use unit texts as variable identifiers.

```javascript
var m = 1;                 // Is not unit
var a = 2 + m;             // Is not unit 
var b = 2 m;               // Is unit
var c = Math.sin(2) m;     // IS unit
```

Expression of type .. unit is equivalent to notation .. * coefficient_unit, where the coefficient means the number of given units in the SI unit (e.g. 0.001 for mm).

## Object containers

In scripts, special objects with names of type "nodes", "lines", "member_end_releases", etc. are accessible. These objects serve as containers for model objects. These containers are treated as arrays:

```javascript
var node = nodes[1];             // Ziskání uzlu č. 1 
var c = nodes[2].coordinate_x;   // Ziskání x-ové souřadnice uzlu č. 2 
```

Container objects have additional methods:

* count() .. returns the number of objects
* create(id) .. creates an object with a given id (default type for the  given container)
* create() .. the same as create(id), only new objects will have user id selected automatically according to normal rules
* erase(id) .. deletes object with inputed id
* lastId() .. returns the id of the last object
* getNthObjectId(order).. returns the id of the object with the given sequence number

The create and erase methods may fail (e.g. when an object with a given id already exists or when the object is not erasable), in which case it throws an exception.

A list of all accessible containers can be found in the "Object Properties" dialog.

## RFEM objects

Containers return objects that allow access to the properties of the corresponding RFEM object. This approach is implemented via classic JavaScript dot notation:

```javascript
var c = nodes[2].coordinate_x;    // Get value of property
nodes[2].coordinate_x = 3;        // Set value of property
var node = nodes[2];
node.coordinate_y = 4;
```

> [!NOTE] :bulb: 
> A list of all properties of a particular object type can be found in the "Object Properties" dialog box.

In addition, each object has additional properties:

* id.. the id of the object
* parentId .. id of the parent object (has meaning for loads that can belong to different load times) 
* method equals ... compares the variable to an object with another and tells if it is the same object. 

Some properties are not editable. When trying to change the value of such properties, an exception is thrown.

When you set a property value, that value is validated (usually in the same way as in the table). If the value has not passed the validation, an exception is thrown.

Object properties can be of different types, which are also listed in the "Object Properties" dialog box. The same behavior can be expected from properties of the same type.

### Float
Returns as a JavaScript number. When you set properties, either a number or a string that can be converted to a number is also expected. 
> [!Caution] The value is always returned and set in SI units.

### String
It returns as String. Almost anything can be set (converted to text).

### Boolean
He returns as Bool. You can set boole values or something that can be converted to bool.

### Integer
It returns as Number (it is guaranteed to be an integer). You can set anything that can be converted to a number. You can set a less than a number, but the fractional part will be ignored.

### Enumeration
The value of a given attribute can only be a value from a specific list, which are represented in the scripts through a package of variables ("constants"). Their names for each attribute are listed in the "Object Properties" dialog box.

Example of work:
```javascript
var a = nodes[2].coordinate_system;
if (a == nodes.COORDINATE_SYSTEM_CARTESIAN) {..}             // Check of value
nodes[2].coordinate_system = nodes.COORDINATE_SYSTEM_POLAR;  // Set of value for property 
```

### Vector
The value is returned as an instance of the Vector class from the Sylvester library (see. Sylvester). By analogy, an instance of this class is expected when set up.

### Matrix
The value is returned as an instance of the Matrix class from the Sylvester library (see. Sylvester). By analogy, an instance of this class is expected when set up.

### Object
Returns an object that is the value of a given property. The returned object is exactly the same as the object with the same id in the corresponding object container (e.g. materials or nodes).

Example: let us have node #1 referencing node #2 (reference node). Then nodes[1].reference_node is the same as nodes[2] (it is the same object that has the same properties). It is possible to work from this object further, e.g.:

```javascript
nodes[1].reference_node.coordinate_1 = 12; //(stejný efekt, co u volání 'nodes[2].coordinate_1 = 12;')
```
When set, either a different object of a supported type or an integer in the valid for the range object id is expected. Values of 0 or null represent the setting of an empty reference to an object (similar to a table). E.g.:

```javascript
nodes[1].reference_node = nodes[3];
nodes[1].reference_node = 3;
nodes[2].reference_node = nodes[1].reference_node;
nodes[2].reference_node = 0;
nodes[1].reference_node = null;
```

### Object List

Returns a list of objects as a standard JavaScript array. The items in this array are directly topological objects (similar to atribits of the "Object" type). When set up, either an array of objects or an array of integers is expected, each of which will be treated as the id of the object required by the type attribute. You can also set the value with a string in the common for writing a list of format numbers, e.g. "1,2,5-10,12". Emptying the list is logically done by setting an empty field, an empty string, or a null value.

```javascript
lines[1].definition_nodes = [nodes[7], nodes[5], nodes[3]];
lines[1].definition_nodes = [7, 5, 3];
lines[1].definition_nodes = "7, 5, 3";
lines[1].definition_nodes[1].coordinate_1;       to same, co nodes[7].coordinate_1 
lines[2].definition_nodes = lines[1].definition_nodes;
lines[1].definition_nodes = [];
lines[1].definition_nodes = "";
lines[1].definition_nodes = null;
```

### Nested container (table)
This property returns an object that itself acts as a container for other objects. These objects can also have their own properties, an overview of which can also be found in the "Object Properties" dialog. These properties act as named table columns.

An example of a property of this type is the NURBS line checkpoints.

```javascript
var v = lines[1].nurbs_control_points[1].coordinates;
lines[1].nurbs_control_points[1].weight = 0.5;
```

Some nested tables do not have named columns, then they are treated as a two-dimensional array:

```javascript
var v = surfaces[1].nurbs_control_points[1][1].coordinates;
surfaces[1].nurbs_control_points[1][1].weight = 0.5;
```

:bulb: All nested containers (tables) have several helper methods:

* row_count.. returns the number of rows
* column_count .. returns the number of columns (or attributes)
* insert_row(index) .. inserts a new line at the position
* remove_row(index) .. removes a line from the given position

Insert/remove method throws an exception when it fails.

It is forbidden to set anything to the properties of the "nested table" type.

## Vectors and matrices in scripts

The Sylvester library is used to work with vector values in scripts. Its full documentation can be found on the [http://sylvester.jcoglan.com/](http://sylvester.jcoglan.com/). However, we have made some changes to this library that should make it easier to work with three-dimensional vectors.

The standard vector constructor can now take multiple values to create a vector from. That is, instead

```javascript
var v = Vector.create([1, 2, 3]);
```

can only be written

```javascript
var v = Vector.create(1, 2, 3);
```

The vector has three auxiliary properties x, y, from which it returns the values of the first or second or third element of the vector. That is, instead

```javascript
var c = v.e(0) + v.e(1);
```

can only be written

```javascript
var c = v.x + v.y;
```

The length method now returns the size of the vector (modulus), not the number of items.

For the toUnitVector method, we added the alias normalize.

## Notes on formulas

For formulas, everything that was written above applies, except for the specificity that any modification of objects/containers is prohibited. Getting properties works exactly the same, but when you try to set them up, an exception will be thrown. The same applies, for example, to the create, erase, insert_row, remove_row methods in containers.

## Console notes

The console allows you to execute small scripts, and everything that was written above applies to them. However, when entered into the console, some special strings are processed in a special way (they are not considered scripts). They are

* run [path] ... runs a script with the specified file name; the path is either absolute or relative to the application's launch location.
* Clr... cleans the console.