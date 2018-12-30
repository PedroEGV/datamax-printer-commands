'use strict';

const { assert } = require('chai');
const utils = require('../lib/utils');

describe('utils.addToSequece()', function () {
  it('should add the text "1234abcABC" to an empty escape sequence.', function () {
    assert.deepEqual(utils.addToSequece('1234abcABC'), [49, 50, 51, 52, 97, 98, 99, 65, 66, 67]);
  });

  it("should add the array ['1', '2', '3', '4', 'a', 'b', 'c', 'A', 'B', 'C'] to an empty escape sequence.", function () {
    assert.deepEqual(utils.addToSequece(['1', '2', '3', '4', 'a', 'b', 'c', 'A', 'B', 'C']), [49, 50, 51, 52, 97, 98, 99, 65, 66, 67]);
  });

  it('should add the text "abcABC" to an existing escape sequence of [49, 50, 51, 52].', function () {
    assert.deepEqual(utils.addToSequece('abcABC', [49, 50, 51, 52]),
      [49, 50, 51, 52, 97, 98, 99, 65, 66, 67]);
  });

  it("should add the array ['a', 'b', 'c', 'A', 'B', 'C'] to an existing escape sequence of [49, 50, 51, 52].", function () {
    assert.deepEqual(utils.addToSequece(['a', 'b', 'c', 'A', 'B', 'C'], [49, 50, 51, 52]),
      [49, 50, 51, 52, 97, 98, 99, 65, 66, 67]);
  });
});

describe('utils.toSequenceString()', function () {
  it('should create an escape sequence string "1234abcABC".', function () {
    assert.equal(utils.toSequenceString([49, 50, 51, 52, 97, 98, 99, 65, 66, 67]), '1234abcABC');
  });

  it('should create an escape sequence string out of the array [0x1b, 0x0d, 0x0a].', function () {
    assert.equal(utils.toSequenceString([0x1b, 0x0d, 0x0a]), '\u001b\u000d\u000a');
  });
});
