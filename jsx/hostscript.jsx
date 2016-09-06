/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

/**
 *  Paint on Layer
 */
function qr_draw(arr) {
  var docPreset = new DocumentPreset;
  docPreset.units = RulerUnits.Millimeters;
  docPreset.colorMode = DocumentColorSpace.CMYK;

  if (documents.length == 0) {
    documents.add(DocumentColorSpace.CMYK, 150, 150);
  }
  var aDoc = activeDocument;
  var aDocH = aDoc.height;
  var aDocW = aDoc.width;
  aDoc.rulerOrigin = [0, aDocH]; // Set Zero point ruler on Document

  var newLayer = aDoc.layers.add();
  var randStr = "@" + (" " + (+new Date()) * Math.random() * 10000).slice(-7, -1);

  newLayer.name = 'qr-' + randStr;

  var X_0 = 0; // top left point
  var Y_0 = 0;
  var COLOR_W = new CMYKColor();
  var COLOR_K = new CMYKColor();
  COLOR_K.black = 100;

  var qrGr = aDoc.groupItems.add();
  var qrBlock, top = Y_0, left = X_0;

  var whiteFrame = qrGr.pathItems.rectangle(top + 4, left - 4, arr.length + 8, arr.length + 8);
  whiteFrame.stroked = false;
  whiteFrame.fillColor = COLOR_W;
  whiteFrame.overprintFill = false;

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
        qrBlock = qrGr.pathItems.rectangle(top, left, 1, 1);
        _setFillColor(arr[i][j], qrBlock);
        left++;
      } else if (arr[i][j] === 0) {
        left++;
      }
    }
    left = X_0;
    top--;
  }

  function _setFillColor(numb, elem) {
    if (numb === 1) {
      elem.stroked = false;
      elem.fillColor = COLOR_K;
      elem.overprintFill = true;
    }
  }
}
