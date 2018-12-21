'use strict';

const globalCommands = {
  ESC: 27,
  CR: 13,
  LF: 10
};

const characterSets = {
  INTERNATIONAL: 49,
  PC_LINE_DRAWING: 50,
  ASIAN_TABLES: 65
};

const barCodeCommands = {
  barCodeType: {
    CODE_39: 49,
    CODE_128: 50,
    UCC_EAN_128: 50,
    INTERLEAVED_2_OF_5: 51,
    UPC_EAN_JAN: 52,
    CODABAR: 53,
    PDF417: 54
  },
  startCharater: {
    CODE_A: 135,
    CODE_B: 136,
    CODE_C: 137
  },
  HUMAN_READABLE: 122,
  NON_HUMAN_READABLE: 90
};

module.exports = {
  globalCommands,
  characterSets,
  barCodeCommands
};
