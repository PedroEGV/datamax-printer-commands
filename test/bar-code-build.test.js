'use strict';

const { assert } = require('chai');
const BarCodeBuilder = require('../lib/bar-code-builder');

describe('BarCodeBuilder', function () {
  it('should create an escape sequence for bar code "A2a", 12.5mm (1.25cm) high, with human readable text in Code 128 format.', function () {
    var barCodeBuilder = new BarCodeBuilder();
    barCodeBuilder.setText('A2a').setHeight(1.25).setHumanReadable(true);
    assert.equal(barCodeBuilder.build(), '\u001bZ2\u0004d\u0088A2a\u000d\u000a');
  });

  it('should create an escape sequence for bar code "1234", 5mm (0.5cm) high, with non-human readable text in Code 128 format.', function () {
    var barCodeBuilder = new BarCodeBuilder();
    barCodeBuilder.setText('1234').setHeight(0.5).setHumanReadable(false);
    assert.equal(barCodeBuilder.build(), '\u001bz2\u0005(\u00881234\u000d\u000a');
  });

  it('should create an escape sequence for all-numeric bar code "1234", 5mm (0.5cm) high, with non-human readable text in Code 128 format.', function () {
    var barCodeBuilder = new BarCodeBuilder();
    barCodeBuilder.setText('1234').setHeight(0.5).setHumanReadable(false).setOnlyNumeric(true);
    assert.equal(barCodeBuilder.build(), '\u001bz2\u0005(\u00891234\u000d\u000a');
  });

  it('should create an escape sequence for bar code "CODE-39", 1mm (0.1cm) high, with human readable text in Code 39 format.', function () {
    var barCodeBuilder = new BarCodeBuilder();
    barCodeBuilder.setText('CODE-39').setHeight(0.1).setHumanReadable(true).setOnlyNumeric(false).setType(BarCodeBuilder.barCodeType.CODE_39);
    assert.equal(barCodeBuilder.build(), '\u001bZ1\u0007\u0008CODE-39\u000d\u000a');
  });

  it('should create 2 escape sequences for the bar codes "CODE-38" and "CODE-39", 1mm (0.1cm) high, with human readable text in Code 39 format, using the same builder.', function () {
    var barCodeBuilder = new BarCodeBuilder();
    barCodeBuilder.setHeight(0.1).setHumanReadable(true).setOnlyNumeric(false).setType(BarCodeBuilder.barCodeType.CODE_39);
    assert.equal(barCodeBuilder.build('CODE-38'), '\u001bZ1\u0007\u0008CODE-38\u000d\u000a');
    assert.equal(barCodeBuilder.build('CODE-39'), '\u001bZ1\u0007\u0008CODE-39\u000d\u000a');
  });
});
