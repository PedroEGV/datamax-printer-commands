'use strict';

const { globalCommands, barCodeCommands } = require('./commands');

class BarCodeBuilder {
  constructor(text) {
    this.data = '';
    this.data += text || '';
    this.z = barCodeCommands.HUMAN_READABLE;
    this.t = barCodeCommands.barCodeType.CODE_128;
    this.n = this.data.length + 1;
    this.cmHeight = 1;
    this.h = this.getHeight();
    this.startChar = barCodeCommands.startCharater.CODE_B;
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
    var commandReducer = (s, c) => s + String.fromCharCode(c);
    var commandStart = [globalCommands.ESC, this.z, this.t, this.n, this.h, this.startChar].reduce(commandReducer, '');
    var commandEnd = [globalCommands.CR, globalCommands.LF].reduce(commandReducer, '');
    return commandStart + this.data + commandEnd;
  }
}

module.exports = BarCodeBuilder;
