'use strict';

describe('Yaml', function () {
  var output = {};

  beforeAll(function () {
    var child_process = require('child_process');
    var fs = require('fs');
    var fse = require('fs-extra');
    var path = require('path');
    var yaml = require('js-yaml');

    var outputFolder = 'test/testOutput';

    // clean output
    fse.removeSync(outputFolder);

    // generate Yaml
    child_process.execFileSync('node', ['node2docfx.js', 'test/node2docfx.json']);

    // load yaml from output
    fs.readdirSync(outputFolder).forEach(function (item) {
      var key = item.substring(0, item.indexOf('.yml'));
      var value = yaml.safeLoad(fs.readFileSync(path.join(outputFolder, item)));
      output[key] = value;
    });
  });

  describe('class', function () {
    it('should have description', function () {
      var classItem = output.MyClass.items.getValue('MyClass');
      expect(classItem.summary).toBe('This is a description of the MyClass class.');
    });
  });

  describe('constructor', function () {
    it('should have description', function () {
      var classItem = output.MyClass.items.getValue('MyClass.#ctor');
      expect(classItem.summary).toBe('This is a description of the MyClass constructor function.');
    });
  });

  describe('method', function () {
    it('should pass custom tags', function () {
      var methodItem = output.MyClass.items.getValue('MyClass~sayHello');
      expect(methodItem.tags).toBeDefined();
      expect(methodItem.tags[0].originalTitle).toBe('customTag');
      expect(methodItem.tags[0].title).toBe('customtag');
      expect(methodItem.tags[0].text).toBe('This is an unknown tag to jsdoc.');
      expect(methodItem.tags[0].value).toBe('This is an unknown tag to jsdoc.');
    });
  });

  describe('toc', function () {
    it('should have children', function () {
      var toc = output.toc;
      expect(toc.length).toBe(3);
    });
    it(' class should have no children', function () {
      var toc = output.toc;
      expect(toc[2].items).toBeUndefined();
    });    
  });

  Object.prototype.getValue = function (uid) {
    return this.find(function (item) {
      return item.uid === uid;
    });
  };
});
