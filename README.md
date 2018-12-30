datamax-printer-commands
========================

This a Node.js module to serialize Datamax O'Neil APEX series printer commands.

This project does not communicate with the printer, it only generate commands for you to interact with it.

Usage
-----

### Bar Codes

The following code will create an escape sequence for bar code "CODE-39", 1mm (0.1cm) high, with human readable text in Code 39 format:

```javascript
const { BarCodeBuilder } = require('datamax-printer-commands');
var barCodeBuilder = new BarCodeBuilder()
  .setType(BarCodeBuilder.barCodeType.CODE_39)
  .setText('CODE-39')
  .setHeight(0.1)
  .setHumanReadable(true);
var commandString = barCodeBuilder.build();
```

The following code will create an escape sequence for all-numeric bar code "1234", 5mm (0.5cm) high, with non-human readable text in Code 128 format:

```javascript
const { BarCodeBuilder } = require('datamax-printer-commands');
var barCodeBuilder = new BarCodeBuilder()
  .setType(BarCodeBuilder.barCodeType.CODE_128)
  .setText('1234')
  .setHeight(0.5)
  .setHumanReadable(false)
  .setOnlyNumeric(true);
var commandString = barCodeBuilder.build();
```
