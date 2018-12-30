'use strict';

const { globalCommands, barCodeCommands } = require('./commands');
const { addToSequece, toSequenceString } = require('./utils');

class BarCodeBuilder {
  constructor(text) {
    this.setText(text);
    this.setHumanReadable(true);
    this.setHeight(1);
    this.setOnlyNumeric(false);
    this.t = barCodeCommands.barCodeType.CODE_128;
  }

  setText(text) {
    this.text = '';
    this.text += text || '';
    this.n = this.text.length + 1;
    return this;
  }

  setOnlyNumeric(onlyNumeric) {
    this.startChar = onlyNumeric ? barCodeCommands.startCharater.CODE_C : barCodeCommands.startCharater.CODE_B;
    return this;
  }

  getHeight() {
    return parseInt((this.cmHeight * 10) / 0.125);
  }

  setHeight(cmHeight) {
    this.cmHeight = cmHeight;
    this.h = this.getHeight();
    return this;
  }

  setHumanReadable(humanReadable) {
    this.z = humanReadable ? barCodeCommands.HUMAN_READABLE : barCodeCommands.NON_HUMAN_READABLE;
    return this;
  }

  build() {
    var escapeSequence = []

    addToSequece([globalCommands.ESC, this.z, this.t, this.n, this.h, this.startChar], escapeSequence);
    addToSequece(this.text, escapeSequence);
    addToSequece([globalCommands.CR, globalCommands.LF], escapeSequence);

    return toSequenceString(escapeSequence);
  }
}

module.exports = BarCodeBuilder;
