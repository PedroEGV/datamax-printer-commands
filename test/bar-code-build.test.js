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


});
