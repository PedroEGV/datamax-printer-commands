'use strict';

const { assert } = require('chai');
const graphics = require('../lib/graphics');

describe('graphics.compressedGraphics()', function () {
  it('should create a compressed graphics sequence.', function () {
    var b = 0x000000;
    var w = 0xffffff;
    var image =
        [
          [w, w, w, w, b, b, b, b, b, b, b, b, w, w, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w],
          [w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, b, w, b, w, b, w, b, w, w, w, w, b, w, w, w, b],
          [w, b, w, b, w, b, w, b, w, w, w, w, w, w, w, w, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b, w, b],
          [b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, b, b, w, w, w, w, w, w, b, b, b, b, b, b, b, b, w, w, w, w]
        ];
    var es = graphics.compressedGraphics(image, 72 * 8, 128);
    assert.equal(es, '\u001bv\u0004\u0006\u0001\u000f\u00f0\u00fd\u00cc\u00ff\u0055\u00ff\u0000\u0003\u00aa\u0011\u0055\u0000\u00fd\u0055\u00fd\u00cc\u0001\u000f\u00f0');
  });
});
