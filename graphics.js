'use strict';

const { globalCommands, graphicsCommands } = require('./commands');
const { addToSequece, toSequenceString } = require('./utils');

function validateParamenters(imageObject, printHeadWidth, darknessThreshold) {
  if (!imageObject) {
    throw new Error('Parameter \'imageObject\' was null.');
  }

  if (imageObject.length === 0) {
    throw new Error('Parameter \'imageObject\' has wrong dimensions.');
  } else {
    var width = imageObject[0].length;

    for (var row = 1; row < imageObject.length; row++) {
      if (imageObject[row].length !== width) {
        throw new Error('Parameter \'imageObject\' has wrong dimensions.');
      }
    }
  }

  if (printHeadWidth < 1) {
    throw new Error("Parameter 'printHeadWidth' must be greater than 0.");
  }

  if (darknessThreshold < 0 || darknessThreshold > 255) {
    throw new Error("Parameter 'darknessThreshold' was invalid.  Value must be between 0 and 255.");
  }
}

function rgbAverage(value) {
  var r = (value >> 16) & 255;
  var g = (value >> 8) & 255;
  var b = value & 0xff;

  return (r + g + b) / 3;
}

function nonCompressedGraphics(imageObject, printHeadWidth, darknessThreshold) {
  validateParamenters(imageObject, printHeadWidth, darknessThreshold);

  var escapeSequence = [];
  var height = imageObject.length;
  var width = imageObject[0].length;

  addToSequece(globalCommands.ESC, escapeSequence);
  addToSequece(graphicsCommands.NON_COMPRESSED_GRAPHICS, escapeSequence);
  addToSequece([height & 0xff, (height >> 8) & 0xff], escapeSequence);

  for (var row = 0; row < height; row++) {
    var rowData = [];
    var byteData = 0;
    var power2 = 128;
    var lineIndex = 0;

    for (var col = 0; col < printHeadWidth; col++) {
      var value = col < width ? imageObject[row][col] : 0xffffff;
      var set = rgbAverage(value) <= darknessThreshold;

      byteData |= set ? power2 : 0;
      rowData[lineIndex >> 3] = byteData;

      if (power2 === 1) {
        byteData = 0;
        power2 = 128;
        lineIndex += 8;
      } else {
        power2 /= 2;
      }
    }

    addToSequece(rowData, escapeSequence);
  }

  return toSequenceString(escapeSequence);
}

module.exports = nonCompressedGraphics;
