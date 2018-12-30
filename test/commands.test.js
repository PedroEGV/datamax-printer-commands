'use strict';

const { assert } = require('chai');
const { alphabetMapping } = require('../lib/commands');

describe('commands.alphabetMapping', function () {
  it('should map digits as strings to ASCII codes.', function () {
    assert.equal(alphabetMapping['0'], 48);
    assert.equal(alphabetMapping['5'], 53);
    assert.equal(alphabetMapping['9'], 57);
  });

  it('should map capital letters to ASCII codes.', function () {
    assert.equal(alphabetMapping['A'], 65);
    assert.equal(alphabetMapping['L'], 76);
    assert.equal(alphabetMapping['Z'], 90);
  });

  it('should map lower-case letters to ASCII codes.', function () {
    assert.equal(alphabetMapping['a'], 97);
    assert.equal(alphabetMapping['l'], 108);
    assert.equal(alphabetMapping['z'], 122);
  });
});
