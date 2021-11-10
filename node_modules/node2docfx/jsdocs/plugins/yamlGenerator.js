(function () {
  /*global env*/
  var dfm = require('./dfm');
  var manager = require('./itemManager');
  var itemHandler = require('./itemHandler');
  var config = null;
  var base = '_yamlGeneratorOutput';
  var globalUid = 'global';
  var uidPrefix = '';
  var yamlMime = '### YamlMime:UniversalReference';
  var outputFileExt = '.yml';
  var jsdocConfigPath = '_jsdocConfTemp.json';
  var packageName = '';

  function setSourceInfo(item, doclet) {
    if (config.repo) {
      var path = doclet.meta.path.replace(env.pwd + '\\', '') + '\\' + doclet.meta.filename;
      if (path.split('\\').length > 2) {
        path = path.split('\\').splice(2).join('\\');
      }
      item.source = {
        id: item.id,
        path: path,
        startLine: doclet.meta.lineno,
        remote: {
          branch: config.repo.branch,
          path: path,
          repo: config.repo.url
        }
      };
    }
  }

  function getClasses(classes, fileMap) {
    manager.items.forEach(function (item) {
      switch (item.type) {
      case 'Class':
        classes[item.uid] = {
          items: [item],
          referenceMap: {}
        };
        fileMap[item.uid] = item.uid;
        break;
      case 'Constructor':
      case 'Function':
      case 'Member':
        var parentId = item.parent || globalUid;
        var parent = classes[parentId];
        if (parent === undefined) {
          console.log(parentId + ' is not a class, ignored.');
          break;
        }
        parent.items.push(item);
        if (parentId === globalUid) {
          (parent.items[0].children = parent.items[0].children || []).push(item.uid);
        }
        fileMap[item.uid] = parentId;
        (item.syntax.parameters || []).forEach(function (p) {
          (p.type || []).forEach(function (t) {
            classes[parentId].referenceMap[t] = true;
          });
        });
        if (item.syntax.return) {
          (item.syntax.return.type || []).forEach(function (t) {
            classes[parentId].referenceMap[t] = true;
          });
        }
        break;
      }
    });
    return classes;
  }

  function serializeIndex(classes) {
    var serializer = require('js-yaml');
    var fs = require('fs');
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base);
    }

    var index = {
      items: [{
        uid: packageName,
        name: packageName,
        langs: ['js'],
        type: 'package',
        summary: '',
        children: []
      }],
      references: []
    };

    if (Object.keys(classes).length <= 1) {
      console.log('Nothing extracted for ' + packageName);
      return;
    }

    for (var id in classes) {
      var classItem = classes[id];
      if (id === globalUid) {
        for (var i = 1; i < classItem.items.length; i++) {
          index.items[0].children.push(classItem.items[i].uid);
          index.items.push(classItem.items[i]);
        }
      } else {
        if (classItem.items && classItem.items.length) {
          index.items[0].children.push(classItem.items[0].uid);
          index.references.push({
            uid : classItem.items[0].uid,
            name : classItem.items[0].name
          });
        }
      }
    }

    index = JSON.parse(JSON.stringify(index));
    fs.writeFileSync(base + '/index.yml', yamlMime + '\n' + serializer.safeDump(index));
    console.log('index generated.');
  }

  function serializeToc(classes, fileMap) {
    var serializer = require('js-yaml');
    var fs = require('fs');
    
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base);
    }

    var toc = [];
    for (var id in classes) {
      var classItem = classes[id];
      // build references
      classItem.references = [];
      for (var r in classItem.referenceMap) {
        var f = fileMap[r];
        if (f !== undefined && f !== id) {
          classItem.references.push({
            uid: r,
            name: r.indexOf('.') == -1 ? r : r.substring(r.indexOf('.') + 1),
            fullName: r,
            isExternal: f === undefined
          });
        }
      }
      classItem.referenceMap = undefined;
      if (classItem.references.length == 0) {
        classItem.references = undefined;
      }

      // something wrong in js-yaml, workaround it by serialize and deserialize from JSON
      classItem = JSON.parse(JSON.stringify(classItem));
      // replace \r, \n, space with dash
      // filter global
      if (id == globalUid) {
        continue;
      }

      var fileName = id.replace(/[ \n\r]/g, '-') + outputFileExt;
      if (fileName && fileName.split('.').length > 2) {
        fileName = fileName.split('.').splice(1).join('.');
      }
      fs.writeFileSync(base + '/' + fileName, yamlMime + '\n' + serializer.safeDump(classItem));
      console.log(fileName + ' generated.');

      var tocItem = {
        uid: id,
        name: classItem.items[0].name
      };    

      toc.push(tocItem);
    }
    toc.sort(function (a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    fs.writeFileSync(base + '/toc.yml', serializer.safeDump(toc));
    console.log('toc.yml generated.');
  }

  var typeMap = {
    'member': itemHandler.handleMember,
    'function': itemHandler.handleFunction,
    'class': itemHandler.handleClass
  };

  exports.handlers = {
    newDoclet: function (e) {
      var doclet = e.doclet;
      // ignore anything whose parent is not a doclet
      // except it's a class made with help function
      if (doclet.memberof !== undefined && manager.itemsMap[uidPrefix + doclet.memberof] === undefined && doclet.kind !== 'class') {
        return;
      }
      // ignore unrecognized kind
      if (typeMap[doclet.kind] === undefined) {
        console.log('unrecognized kind: ' + doclet.kind);
        return;
      }
      // ignore unexported global member
      if (doclet.memberof === undefined && doclet.kind != 'class' && !(doclet.meta && doclet.meta.code && typeof(doclet.meta.code.name) === 'string' && doclet.meta.code.name.indexOf('exports') == 0)) {
        return;
      }
      // ignore inner function or member
      if (doclet.kind === 'member' && doclet.scope === 'inner') {
        return;
      }

      if (doclet.access === 'private') {
        return;
      }

      if (doclet.name && doclet.name[0] === '_') {
        return;
      }

      // ignore doclet without doucment
      if (doclet.undocumented === true) {
        return;
      }

      // ignore empty longname
      if (!doclet.longname) {
        return;
      }
      // basic properties
      var item = {
        uid: uidPrefix + doclet.longname,
        id: uidPrefix + doclet.longname,
        parent: (doclet.memberof && doclet.kind !== 'class') ? (uidPrefix + doclet.memberof) : undefined,
        name: doclet.name,
        summary: doclet.description ? dfm.convertLinkToGfm(doclet.description, uidPrefix) : dfm.convertLinkToGfm(doclet.summary, uidPrefix)
      };
      // set parent
      if (item.parent !== undefined) {
        var parent = manager.itemsMap[item.parent];
        (parent.children = parent.children || []).push(item.uid);
      }
      // set full name
      item.fullName = (item.parent ? item.parent + '.' : uidPrefix) + item.name;

      // set source info
      if (doclet.kind === 'class') {
        setSourceInfo(item, doclet);
      }

      // pass custom tags
      if ('tags' in doclet) {
        item.tags = doclet.tags;
      }

      typeMap[doclet.kind](item, doclet, uidPrefix, manager);
      manager.addItem(item);
    },
    parseBegin: function () {
      var fse = require('fs-extra');
      config = fse.readJsonSync(jsdocConfigPath);
      
      if (config.repo && config.repo.url && !config.repo.url.endsWith('.git')) {
        config.repo.url = config.repo.url + '.git';
      }

      // parse package.json to use package name
      if (config.package) {
        var packageJson = fse.readJsonSync(config.package);
        if (packageJson && packageJson.name) {
          packageName = packageJson.name;
          globalUid = packageJson.name + '.' + globalUid;
          uidPrefix = packageJson.name + '.';
        }
      }
      manager.items.push(
        {
          uid: globalUid,
          id: globalUid,
          name: 'GLOBAL',
          fullName: 'GLOBAL',
          type: 'Class',
          langs: ['js']
        }
      );
    },
    parseComplete: function () {
      var classes = {};
      var fileMap = {};
      getClasses(classes, fileMap);
      serializeIndex(classes);
      serializeToc(classes, fileMap);
      process.exit(0);
    }
  };
})();
