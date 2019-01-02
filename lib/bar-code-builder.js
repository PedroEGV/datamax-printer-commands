'use strict';

const { globalCommands, barCodeCommands } = require('./commands');
const { addToSequece, toSequenceString } = require('./utils');

class BarCodeBuilder {
  constructor() {
    this.setText('');
    this.setHumanReadable(true);
    this.setHeight(1);
    this.setOnlyNumeric(false);
    this.setType(barCodeCommands.barCodeType.CODE_128);
  }

  setText(text) {
    this.text = '';
    this.text += text || '';
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setOnlyNumeric(onlyNumeric) {
    this.onlyNumeric = onlyNumeric;
    return this;
  }

  setHeight(cmHeight) {
    this.height = cmHeight;
    return this;
  }

  setHumanReadable(humanReadable) {
    this.humanReadable = humanReadable;
    return this;
  }

  getHeight() {
    return parseInt((this.height * 10) / 0.125);
  }

  build(text) {
    this.setText(text || this.text);

    var escapeSequence = []
    var z = this.humanReadable ? barCodeCommands.HUMAN_READABLE : barCodeCommands.NON_HUMAN_READABLE;
    var n = this.text.length + (this.type === barCodeCommands.barCodeType.CODE_128 ? 1 : 0);
    var h = this.getHeight();
    var startChar = '';

    if (this.type === barCodeCommands.barCodeType.CODE_128) {
      startChar = this.onlyNumeric ? barCodeCommands.startCharater.CODE_C : barCodeCommands.startCharater.CODE_B;
    }

    addToSequece([globalCommands.ESC, z, this.type, n, h], escapeSequence);
    addToSequece(startChar, escapeSequence);
    addToSequece(this.text, escapeSequence);
    addToSequece([globalCommands.CR, globalCommands.LF], escapeSequence);

    return toSequenceString(escapeSequence);
  }
}

BarCodeBuilder.barCodeType = barCodeCommands.barCodeType;

module.exports = BarCodeBuilder;
