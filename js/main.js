/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  // Reloads extension panel
  function reloadPanel () {
    location.reload ();
  }

  var csInterface = new CSInterface ();

  function loadJSX (fileName) {
    var extensionRoot = csInterface.getSystemPath (SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript ('$.evalFile("' + extensionRoot + fileName + '")');
  }

  function init () {

    themeManager.init ();
    loadJSX ("json2.js");

    $ ("#btn_generate").click (function () {

      'use strict';
      var qr   = new JSQR ();							// Initialize a new JSQR object.
      var code = new qr.Code ();						// Initialize a new Code object.

      code.encodeMode = code.ENCODE_MODE.BYTE;			// Set the code datatype.
      code.version    = code.DEFAULT;						// Set the code version
      // (DEFAULT = use the smallest possible version).
      code.errorCorrection = code.ERROR_CORRECTION.Q;		// Set the error correction level (H = High).

      var input      = new qr.Input ();						// Initialize a new Input object.
      input.dataType = input.DATA_TYPE.TEXT;			 	// Specify the data type of 'data'.
      // Here, 'data' contains only text.
      // input.data = 'http://www.jsqr.de';					// Specify the data which should be encoded.
      // input.data = document.getElementById ('fld_data').value;
      // input.data = 'Привет, Лунатикам!';
      input.data = $ ('#fld_data').val ();

      var matrix = new qr.Matrix (input, code);			// Initialize a new Matrix object using the input
      // and code, defined above.
      // At this point, the QR Code get generated.

      matrix.scale  = 5;								// Specify the scaling for graphic output.
      matrix.margin = 2;								// Specify the margin for graphic output.

      if ((document.getElementsByTagName ('canvas')[0])) {
        (document.getElementsByTagName ('canvas')[0]).remove ();
      }

      var canvas = document.createElement ('canvas');		// Create a new Canvas element.
      canvas.setAttribute ('width', matrix.pixelWidth);		// Set the canvas width to the size of the QR code.
      canvas.setAttribute ('height', matrix.pixelWidth);		// Set the canvas height to the size of the QR code.
      canvas.getContext ('2d').fillStyle = 'rgb(0,0,0)';		// Set the foreground color of the canvas to black.
      matrix.draw (canvas, 0, 0);						// Draw the QR code into the canvas
      // at position 0 (left), 0 (top).
      document.body.appendChild (canvas);					// Append the canvas element to the documents body.

    });

    $ ("#btn_refresh").click (reloadPanel);

  }

  init ();

} ());
    
