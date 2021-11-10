'use strict';

describe('dfm', function () {
  var dfm = require('../../jsdocs/plugins/dfm');

  it('{@link} tag should be transformed to dfm', function () {
    expect(dfm.convertLinkToGfm('{@link MyClass}')).toBe('<xref:MyClass>');
    expect(dfm.convertLinkToGfm('[MyClass\'s foo property]{@link MyClass#foo}')).toBe('[MyClass\'s foo property](xref:MyClass%23foo)');
    expect(dfm.convertLinkToGfm('{@link http://www.google.com|Google}')).toBe('[Google](http://www.google.com)');
    expect(dfm.convertLinkToGfm('{@link https://github.com GitHub}')).toBe('[GitHub](https://github.com)');
    expect(
      dfm.convertLinkToGfm('/**\n * See {@link MyClass} and [MyClass\'s foo property]{@link MyClass#foo}.\n * Also, check out {@link http://www.google.com|Google} and\n * {@link https://github.com GitHub}.\n */')
    ).toBe(
      '/**\n * See <xref:MyClass> and [MyClass\'s foo property](xref:MyClass%23foo).\n * Also, check out [Google](http://www.google.com) and\n * [GitHub](https://github.com).\n */'
    );
    expect(dfm.convertLinkToGfm('{@link MyClass}', 'packageName.')).toBe('<xref:packageName.MyClass>');
    expect(dfm.convertLinkToGfm('[MyClass\'s foo property]{@link MyClass#foo}', 'packageName.')).toBe('[MyClass\'s foo property](xref:packageName.MyClass%23foo)');
  });
});