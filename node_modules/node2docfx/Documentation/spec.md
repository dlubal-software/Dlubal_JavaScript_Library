# Specification

## 1. Design

### 1.1 UID Specification
Based on the [namepath](http://usejsdoc.org/about-namepaths.html) in JSDoc, to avoid UID conflict between packages, the format of UID is designed to include [package name](https://docs.npmjs.com/files/package.json#name) as:
```
{packageName}.namepath
```
For global members that hasn't parent class, the format of UID is designed as:
```
{packageName}._global.namepath
```
As jsdoc's [`@link`](http://usejsdoc.org/tags-inline-link.html) supports namepath, so this tool need to convert namepath to DocFX's uid. It needs:
1. prepend package name as design above.
2. encodeURIComponent the namepath. As `#` is the separator for instance method in jsdoc, but it also means url anchor in DocFX's cross reference syntax. It should be encoded into `%23`.

### 1.2 New DocumentProcessor for DocFX
JavaScript has some language features hard to fit into DocFX's PageViewModel, like [optional parameter](221-an-optional-parameter-using-jsdoc-syntax), [multiple types parameter](231-allows-one-type-or-another-type-type-union), so some new properties are needed and some existing properties' type need to be changed.
* plugin package: https://www.nuget.org/packages/Microsoft.DocAsCode.Build.UniversalReference/
* plugin source: https://github.com/dotnet/docfx/tree/dev/plugins/Microsoft.DocAsCode.Build.UniversalReference

## 2. JavaScript Language Features
### 2.1 Parameters with properties
See http://usejsdoc.org/tags-param.html#parameters-with-properties

#### 2.1.1 Documenting a parameter's properties

* Example:

  ```js
  /**
   * Assign the project to an employee.
   * @param {Object} employee - The employee who is responsible for the project.
   * @param {string} employee.name - The name of the employee.
   * @param {string} employee.department - The employee's department.
   */
  Project.prototype.assign = function(employee) {
      // ...
  };
  ```
* Need template support:
  * [JavaScriptReference.common.js](../docfx_template/JavaScriptReference.common.js): `function groupParameters(parameters)`
  * [parameters.tmpl.partial](../docfx_template/partials/parameters.tmpl.partial)

#### 2.1.2 Documenting properties of values in an array (🛠**TO BE IMPLEMENTED**)

* Example:

  ```js
  /**
   * Assign the project to a list of employees.
   * @param {Object[]} employees - The employees who are responsible for the project.
   * @param {string} employees[].name - The name of an employee.
   * @param {string} employees[].department - The employee's department.
   */
  Project.prototype.assign = function(employees) {
      // ...
  };
  ```
  
### 2.2 Optional parameters and default values
See http://usejsdoc.org/tags-param.html#optional-parameters-and-default-values
#### 2.2.1 An optional parameter (using JSDoc syntax) (🛠**TO BE IMPLEMENTED**)

* Example:

  ```js
  /**
   * @param {string} [somebody] - Somebody's name.
   */
  function sayHello(somebody) {
      if (!somebody) {
          somebody = 'John Doe';
      }
      alert('Hello ' + somebody);
  }
  ```
  
#### 2.2.2 An optional parameter and default value (🛠**TO BE IMPLEMENTED**)

* Example:

  ```js
  /**
   * @param {string} [somebody=John Doe] - Somebody's name.
   */
  function sayHello(somebody) {
      if (!somebody) {
          somebody = 'John Doe';
      }
      alert('Hello ' + somebody);
  }
  ```

### 2.3 Multiple types and repeatable parameters
See http://usejsdoc.org/tags-param.html#multiple-types-and-repeatable-parameters
#### 2.3.1 Allows one type OR another type (type union)

* Example:

  ```js
  /**
   * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
   */
  function sayHello(somebody) {
      if (!somebody) {
          somebody = 'John Doe';
      } else if (Array.isArray(somebody)) {
          somebody = somebody.join(', ');
      }
      alert('Hello ' + somebody);
  }
  ```
* Need template support:
  * [JavaScriptReference.common.js](../docfx_template/JavaScriptReference.common.js): `function joinType(parameter)`
  
#### 2.3.2 Allows any type (🛠**TO BE IMPLEMENTED**)

* Example:

  ```js
  /**
   * @param {*} somebody - Whatever you want.
   */
  function sayHello(somebody) {
      console.log('Hello ' + JSON.stringify(somebody));
  }
  ```

#### 2.3.3 Allows a parameter to be repeated (🛠**TO BE IMPLEMENTED**)

* Example:

  ```js
  /**
   * Returns the sum of all numbers passed to the function.
   * @param {...number} num - A positive or negative number.
   */
  function sum(num) {
      var i = 0, n = arguments.length, t = 0;
      for (; i < n; i++) {
          t += arguments[i];
      }
      return t;
  }
  ```

## 3. Other Features in JSDoc

### 3.1 `{@link}`
See http://usejsdoc.org/tags-inline-link.html  
JSDoc uses `{@link}` inline tag to link to an internal item or an external URL, which is like a combination of [cross reference](http://dotnet.github.io/docfx/spec/docfx_flavored_markdown.html#cross-reference) in DFM and [link](https://help.github.com/articles/basic-writing-and-formatting-syntax/#links) in GFM.
To make it compatible with DocFX, `{@link}` syntax will be transformed to DFM syntax when generating YAML files.

### 3.2 `{@tutorial}` (:no_good_man:**NOT SUPPORTED FOR NOW**)
See http://usejsdoc.org/about-tutorials.html  
JSDoc uses `{@tutorial}` inline/block tag to link to an internal markdown or HTML file, with the filename without extension as identifier. This is not supported as it has the assumption that file under different directionaries can't have the same filename. Using [Markdown Links](https://help.github.com/articles/basic-writing-and-formatting-syntax/#links) is recommended. Another options is to use [cross reference]()
