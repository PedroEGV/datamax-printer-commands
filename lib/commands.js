'use strict';

const alphabetMapping = ('0 1 2 3 4 5 6 7 8 9 '
  + 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z '
  + 'a b c d e f g h i j k l m n o p q r s t u v w x y z')
  .split(' ').reduce((cs, c) => {
    cs[c] = c.charCodeAt(0);
    return cs;
  }, {});

console.log(JSON.stringify(alphabetMapping));

const globalCommands = {
  ESC: 27, // 0x1B
  CR: 13, // 0x0D
  LF: 10 // 0x0A
};

const characterSets = {
  INTERNATIONAL: alphabetMapping['1'],
  PC_LINE_DRAWING: alphabetMapping['2'],
  ASIAN_TABLES: alphabetMapping['A'],
};

const barCodeCommands = {
  barCodeType: {
    CODE_39: alphabetMapping['1'],
    CODE_128: alphabetMapping['2'],
    UCC_EAN_128: alphabetMapping['2'],
    INTERLEAVED_2_OF_5: alphabetMapping['3'],
    UPC_EAN_JAN: alphabetMapping['4'],
    CODABAR: alphabetMapping['5'],
    PDF417: alphabetMapping['6']
  },
  startCharater: {
    CODE_A: 135, // 0x87
    CODE_B: 136, // 0x88
    CODE_C: 137 // 0x89
  },
  HUMAN_READABLE: alphabetMapping['Z'],
  NON_HUMAN_READABLE: alphabetMapping['z']
};

const graphicsCommands = {
  COMPRESSED_GRAPHICS: alphabetMapping['v'],
  NON_COMPRESSED_GRAPHICS: alphabetMapping['V']
};

module.exports = {
  alphabetMapping,
  globalCommands,
  characterSets,
  barCodeCommands,
  graphicsCommands
};
