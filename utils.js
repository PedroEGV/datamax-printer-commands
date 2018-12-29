'use strict';

function integerPart(num) {
  return num < 0 ? Math.ceil(num) : Math.floor(num);
}

function addValueToSequence(value, escapeSequence) {
  var buff = [];

  while (value !== 0) {
    buff.push(value & 0xff);
    value = value >> 8;
  }

  escapeSequence = escapeSequence || [];
  escapeSequence.push(...buff.reverse());

  return escapeSequence;
}

function addToSequece(data, escapeSequence) {
  var isText = typeof data === 'string';
  var isArray = Array.isArray(data);
  var isNumber = typeof data === 'number';

  if (isNumber) {
    if (integerPart(data) !== data) {
      throw new Error(`Cannot serialize non-integer number ${data} to an escape sequence.`);
    }

    return addValueToSequence(data, escapeSequence);
  }

  escapeSequence = escapeSequence || []

  for (var index = 0; index < data.length; index++) {
    var valueAtIndex = 0;

    if (isText) {
      valueAtIndex = data.charCodeAt(index);
    } else if (isArray) {
      valueAtIndex = data[index];
    }

    addValueToSequence(valueAtIndex, escapeSequence);
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
