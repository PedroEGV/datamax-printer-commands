'use strict';

const charSet = '0 1 2 3 4 5 6 7 8 9 '
  + 'A B C D E F G H I J K K M N O P Q R S T U V W X Y Z '
  + 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    .split(' ').reduce((cs, c) => {
      cs[c] = c.charCodeAt(0);
      return cs;
    }, {});

const globalCommands = {
  ESC: 27, // 0x1B
  CR: 13, // 0x0D
  LF: 10 // 0x0A
};

const characterSets = {
  INTERNATIONAL: charSet['1'],
  PC_LINE_DRAWING: charSet['2'],
  ASIAN_TABLES: charSet['A'],
};

const barCodeCommands = {
  barCodeType: {
    CODE_39: charSet['1'],
    CODE_128: charSet['2'],
    UCC_EAN_128: charSet['2'],
    INTERLEAVED_2_OF_5: charSet['3'],
    UPC_EAN_JAN: charSet['4'],
    CODABAR: charSet['5'],
    PDF417: charSet['6']
  },
  startCharater: {
    CODE_A: 135, // 0x87
    CODE_B: 136, // 0x88
    CODE_C: 137 // 0x89
  },
  HUMAN_READABLE: charSet['z'],
  NON_HUMAN_READABLE: charSet['Z']
};

const graphicsCommands = {
  COMPRESSED_GRAPHICS: charSet['v'],
  NON_COMPRESSED_GRAPHICS: charSet['V']
};

module.exports = {
  globalCommands,
  characterSets,
  barCodeCommands,
  graphicsCommands
};
