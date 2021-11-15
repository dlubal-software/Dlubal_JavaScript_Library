/*global alert, globalNS*/
/*eslint no-unused-vars: "off"*/
/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
function MyClass() {
  /**
   * @param {string} somebody Somebody's name.
   * @customTag This is an unknown tag to jsdoc.
   */
  function sayHello(somebody) {
    alert('Hello ' + somebody);
  }

  /**
   * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
   */
  function sayHelloAllowsMultipleTypes(somebody) {
    if (!somebody) {
      somebody = 'John Doe';
    } else if (Array.isArray(somebody)) {
      somebody = somebody.join(', ');
    }
    alert('Hello ' + somebody);
  }

  /**
   * @param {string} [somebody] - Somebody's name.
   */
  function sayHelloWithOptionalParameter(somebody) {
    if (!somebody) {
      somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
  }
}

/**
 * Solves equations of the form a * x = b
 * @example
 * // returns 2
 * globalNS.method1(5, 10);
 * @example
 * // returns 3
 * globalNS.method(5, 15);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function (a, b) {
  return b / a;
};

/** @namespace */
var Documents = {
    /**
     * An ordinary newspaper.
     */
  Newspaper: 1,
    /**
     * My diary.
     * @private
     */
  Diary: 2
};

/**
 * Generic dairy product.
 * @constructor
 */
function DairyProduct() {}

/**
 * Check whether the dairy product is solid at room temperature.
 * @abstract
 * @return {boolean}
 */
DairyProduct.prototype.isSolid = function() {
  throw new Error('must be implemented by subclass!');
};

/**
 * Cool, refreshing milk.
 * @constructor
 * @augments DairyProduct
 */
function Milk() {}

/**
 * Check whether milk is solid at room temperature.
 * @return {boolean} Always returns false.
 */
Milk.prototype.isSolid = function() {
  return false;
};

/**
  * My namespace.
  * @namespace
  */
var MyNamespace = {
    /** documented as MyNamespace.foo */
  foo: function() {},
    /** documented as MyNamespace.bar */
  bar: 1
};

/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */
var triState = {
    /** The true value */
  TRUE: 1,
  FALSE: -1,
    /** @type {boolean} */
  MAYBE: true
};
