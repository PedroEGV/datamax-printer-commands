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

  if (printHeadWidth % 8 !== 0) {
    throw new Error("Parameter 'printHeadWidth' must be divisible by 8.");
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

function getImageAsArray(imageObject) {
  var imageArray = [];
  var height = imageObject.length;
  var width = imageObject[0].length;
  var widthPadding = width % 8;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      imageArray.push(imageObject[y][x]);
    }

    for (var x = 0; x < widthPadding; x++) {
      imageArray.push(0xffffff);
    }
  }

  return imageArray;
}

function compressedGraphics(imageObject, printHeadWidth, darknessThreshold) {
  validateParamenters(imageObject, printHeadWidth, darknessThreshold);

  var escapeSequence = [];
  var imageArray = getImageAsArray(imageObject);
  var height = imageObject.length;
  var width = imageArray.length / height;
  var byteBuff = [];

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x += 8) {
      var byteData = 0;
      for (var offset = x, power2 = 128; offset < x + 8; offset++ , power2 /= 2) {
        var index = (y * width) + offset;
        var value = rgbAverage(imageArray[index]);
        var set = value < darknessThreshold;
        byteData |= set ? power2 : 0;
      }
      byteBuff.push(byteData);
    }
  }

  var currentByte = byteBuff[0];
  var startInterval = 0;
  var byteCount = 1;
  var sameByteIntervals = [];

  for (var byteIndex = 1; byteIndex < byteBuff.length; byteIndex++) {
    var byteData = byteBuff[byteIndex];

    if (byteData === currentByte) {
      byteCount++;
    }

    if (byteData !== currentByte || byteIndex >= byteBuff.length - 1) {
      if (byteCount > 1) {
        sameByteIntervals.push({
          start: startInterval,
          end: startInterval + byteCount,
          byte: currentByte
        });
      }

      currentByte = byteData;
      byteCount = 1;
      startInterval = byteIndex;
    }
  }

  addToSequece(globalCommands.ESC, escapeSequence);
  addToSequece(graphicsCommands.COMPRESSED_GRAPHICS, escapeSequence);
  addToSequece(height, escapeSequence);
  addToSequece(width >> 3, escapeSequence);

  for (var i = 0, diffIntervalStart = 0; i < sameByteIntervals.length; i++) {
    var interval = sameByteIntervals[i];
    var intervalLength = interval.end - interval.start;
    var diffIntervalLength = interval.start - diffIntervalStart;

    if (diffIntervalLength > 0) {
      while (diffIntervalLength > 0) {
        var counter = diffIntervalLength > 127 ? 127 : diffIntervalLength;
        diffIntervalLength -= 127;
        addToSequece(counter - 1, escapeSequence);
        addToSequece(byteBuff.slice(diffIntervalStart, diffIntervalStart + counter), escapeSequence);
        diffIntervalStart += counter;
      }
    }

    while (intervalLength > 0) {
      var counter = intervalLength > 127 ? 127 : intervalLength;
      intervalLength -= 127;
      addToSequece(257 - counter, escapeSequence);
      addToSequece(interval.byte, escapeSequence);
    }

    diffIntervalStart = interval.end;
  }

  var interval = sameByteIntervals[sameByteIntervals.length - 1];
  var diffIntervalStart = interval.end;
  var diffIntervalLength = byteBuff.length - diffIntervalStart;

  if (diffIntervalLength > 0) {
    while (diffIntervalLength > 0) {
      var counter = diffIntervalLength > 127 ? 127 : diffIntervalLength;
      diffIntervalLength -= 127;
      addToSequece(counter - 1, escapeSequence);
      addToSequece(byteBuff.slice(diffIntervalStart, diffIntervalStart + counter), escapeSequence);
      diffIntervalStart += counter;
    }
  }

  return toSequenceString(escapeSequence);
}

module.exports = {
  nonCompressedGraphics,
  compressedGraphics
};
