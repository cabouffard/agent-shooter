/**
 * Dependencies.
 */ 
var system = require('system');
var fs = require('fs');
var webpage = require('webpage');

/**
 * Utility functions.
 */
// Might not be 100% accurate userAgent
var getUserAgent = {
    a: function() { return  { type: "Android", 
                              agent: "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L" +
                                        " Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko)" +
                                        " Version/4.0 Mobile Safari/534.30"} },
    c: function() { return { type: "Chrome",
                             agent: "Mozilla/5.0 (Windows NT 6.2; Win64; x64)" +
                                        " AppleWebKit/537.36 (KHTML, like Gecko)" +
                                        " Chrome/32.0.1667.0 Safari/537.36" } },
    e: function() { return { type: "IE",
                             agent: "Mozilla/5.0 (compatible; MSIE 10.0;" +
                                        " Windows NT 6.1; WOW64; Trident/6.0)" } },
    f: function() { return { type: "Firefox",
                             agent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0)" +
                                        "Gecko/20100101 Firefox/25.0" } },
    i: function() { return { type: "Iphone", 
                             agent: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X;" +
                                        " en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5" +
                                        " Mobile/8A293 Safari/6531.22.7" } },
    p: function() { return { type: "Ipad",
                             agent: "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X;" +
                                        " en-us) AppleWebKit/531.21.10 (KHTML, like Gecko)" +
                                        " Version/4.0.4 Mobile/7B314 Safari/531.21.10"} },
    r: function() { return { type: "IphoneRetina",
                             agent: "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X;" +
                                        " en-us) AppleWebKit/531.21.10 (KHTML, like Gecko)" +
                                        " Version/4.0.4 Mobile/7B314 Safari/531.21.10"} },
    s: function() { return { type: "Safari",
                             agent: "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26" +
                                        " (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25"} },
    t: function() { return { type: "AndroidTablet",
                             agent: "mozilla/5.0_(linux;_u;_android_3.1;_en-us;_gt-p7510_build/hmj37)" +
                                        "_applewebkit/534.13_(khtml,_like_gecko)_version/4.0_safari/534.13"} }
};

// Might not be 100% accurate viewPort
var getViewPort = {
    a: function() { return {width: 360, height: 640} },
    c: function() { return {width: 1920, height: 1080} },
    e: function() { return {width: 1920, height: 1080} },
    f: function() { return {width: 1920, height: 1080} },
    i: function() { return {width: 320, height: 480} },
    p: function() { return {width: 768, height: 1024} },
    r: function() { return {width: 640, height: 1096} },
    s: function() { return {width: 1920, height: 1080} },
    t: function() { return {width: 800, height: 1280} }
};

/**
 * Parse arguments.
 */
var args = system.args;

if (args.length < 3 || args[1] != "shoot") {
    console.log('usage: shoot [options] url output');
    phantom.exit();
}

var url;
var options = 'acefiprst'.split('');
var output = './screenshots';

if (args.length == 3) {
    url = args[2];
} else if (args.length == 4) {
    url = args[2];
    output = args[3];
} else {
    options = args[2];
    url = args[3];
    output = args[4];
}

console.log(args[1] + " " + options+ " " + url + " " +  output);

/**
 * Make Directory
 */
fs.makeDirectory(output);

/**
 * Take a screenshot
 */
var takeScreenshot = function(option) {
    if (!option)
        phantom.exit();
    var page = webpage.create();
    var userAgent = getUserAgent[option]();
    var viewPort = getViewPort[option]();
    console.log(userAgent.type + " " +  viewPort.width + "x" +viewPort.height);
    page.settings.userAgent = userAgent;
    page.viewportSize = viewPort;
    page.open(url, function(status) {
        var filePath = output + fs.separator + 'capture' +
                        userAgent.type + viewPort.width + 'x' + viewPort.height +
                        ".png";
        page.render(filePath);
        takeScreenshot(options.shift());
    });
}
takeScreenshot(options.shift());
