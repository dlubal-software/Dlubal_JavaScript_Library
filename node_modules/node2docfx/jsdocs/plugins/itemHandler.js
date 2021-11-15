(function () {
  var dfm = require('./dfm');
  var builtInTypes = ['array','arraybuffer','asyncfunction','atomics','boolean','dataview','date','error','evalerror','float32array','float64array','function','generator','generatorfunction','infinity','int16array','int32array','int8array','internalerror','intl','intl.collator','intl.datetimeformat','intl.numberformat','iterator','json','map','math','nan','number','object','parallelarray','promise','proxy','rangeerror','referenceerror','reflect','regexp','simd','simd.bool16x8','simd.bool32x4','simd.bool64x2','simd.bool8x16','simd.float32x4','simd.float64x2','simd.int16x8','simd.int32x4','simd.int8x16','simd.uint16x8','simd.uint32x4','simd.uint8x16','set','sharedarraybuffer','stopiteration','string','symbol','syntaxerror','typeerror','typedarray','urierror','uint16array','uint32array','uint8array','uint8clampedarray','weakmap','weakset', 'undefined'];

  function handleClass(item, doclet, uidPrefix, manager) {
    item.type = 'Class';
    if (doclet.classdesc) {
      item.summary = dfm.convertLinkToGfm(doclet.classdesc, uidPrefix);
    }
    
    var ctor = {
      id: item.id + '.#ctor',
      uid: item.uid + '.#ctor',
      parent: item.uid,
      name: item.name,
      fullName: item.fullName + '.' + item.name,
      summary: dfm.convertLinkToGfm(doclet.description, uidPrefix)
    };
    handleFunction(ctor, doclet);
    item.children = [ctor.uid];
    manager.addItem(ctor);
  }

  function handleFunction(item, doclet, uidPrefix) {
    item.type = doclet.kind === 'function' ? 'Function' : 'Constructor';
    item.syntax = {};
    // set parameters
    if (doclet.params !== undefined) {
      item.syntax.parameters = doclet.params.map(function (p) {
        return {
          id: p.name,
          type: handleParameterType(p.type),
          description: dfm.convertLinkToGfm(p.description, uidPrefix),
          optional: p.optional
        };
      });
    }
    // set name and fullName
    var params = [];
    (item.syntax.parameters || []).forEach(function (p) {
      if (p.id.indexOf('.') < 0) params.push(p.id);
    });
    item.name += '(' + params.join(', ') + ')';
    item.fullName += '(' + params.join(', ') + ')';
    // set return type
    if (doclet.returns != undefined) {
      item.syntax.return = {
        type: handleParameterType(doclet.returns[0].type),
        description: dfm.convertLinkToGfm(doclet.returns[0].description, uidPrefix),
        optional: doclet.returns[0].optional
      };
    }
    // set syntax
    // which one is better:
    // 1. function method_name(arg1, arg2, ...);
    // 2. return_type function method_name(arg1, arg2)
    // 3. function method_name(arg1, arg2) -> return_type
    item.syntax.content = (item.type === 'Function' ? 'function ' : 'new ') + item.name;

    function handleParameterType(type) {
      if (!type) return undefined;
      return type.names.map(function (n) {
        if (builtInTypes.indexOf(n.toLowerCase()) == -1) {
          n = uidPrefix + n;
        }
        return n;
      });
    }
  }

  function handleMember(item, doclet) {
    item.type = 'Member';
    // set type
    item.syntax = {};
    if (doclet.type != undefined) {
      item.syntax.return = {
        type: [doclet.type.names[0]]
      };
    }
    // set syntax
    item.syntax.content = item.name;
  }

  module.exports = {
    handleClass: handleClass,
    handleFunction: handleFunction,
    handleMember: handleMember
  };
})();