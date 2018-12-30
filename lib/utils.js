'use strict';

function integerPart(num) {
  return num < 0 ? Math.ceil(num) : Math.floor(num);
}

function addSingleValueToSequence(value, escapeSequence) {
  var buff = [];

  if (typeof value === 'string') {
    if (value.length > 1) {
      throw new Error(`Expected string ${value} to be length of 1. `);
    }

    value = value.charCodeAt(0);
  }

  while (value !== 0) {
    buff.push(value & 0xff);
    value = value >> 8;
  }

  escapeSequence = escapeSequence || [];
  escapeSequence.push(...buff.reverse());

  return escapeSequence;
}

function addToSequece(data, escapeSequence) {
  var isNumber = typeof data === 'number';

  if (isNumber) {
    if (integerPart(data) !== data) {
      throw new Error(`Cannot serialize non-integer number ${data} to an escape sequence.`);
    }

    return addSingleValueToSequence(data, escapeSequence);
  }

  escapeSequence = escapeSequence || []

  for (var index = 0; index < data.length; index++) {
    var valueAtIndex = data[index];
    addSingleValueToSequence(valueAtIndex, escapeSequence);
  }

  return escapeSequence;
}

function toSequenceString(escapeSequence) {
  return escapeSequence.reduce((cs, c) => cs + String.fromCharCode(c), '');
}

module.exports = {
  addToSequece,
  toSequenceString
};
