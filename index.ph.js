
/**
 * Dependencies.
 */ 

var system = require('system');
var fs = require('fs');
var webpage = require('webpage');

/**
 * Parse arguments.
 */

var args = system.args;

if (args.length < 2) {
  console.log('usage: phantomjs index.ph.js url');
}

var url = system.args[1];

/**
 * Create output directory.
 */

var output = args.length > 2 ? args[2] : './output';
fs.makeDirectory(output);


/**
 * Take a screenshot
 */

var page = webpage.create();

page.open(url, function (status) {
  page.render(output + fs.separator + 'capture.png');
  phantom.exit();
});
