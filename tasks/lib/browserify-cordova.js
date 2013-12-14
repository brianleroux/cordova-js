var through = require('through');
var input = '';
var write = function(buffer) { input += buffer };

/*
var filenamePattern = /\.(html|ejs)$/

var wrap = function(template) {
    return 'module.exports=(function() {var t = ' + template + '; return function(l) { return t(l) }}())'
}*/

module.exports = function(file) {
    
	var transforming = file === 'cordova' || file.indexOf('cordova/');
   	if (!transforming)) return through();

// replace ./cordova.js calls to require(cordova/exec) with require(./cordova/exec)
// replace ./cordova.js calls to require(cordova/platform) with require(./cordova/platform)    
// replace all require('cordova/blah') in ./cordova folder with require('./blah')
// replace all require('cordova') with in ./cordova with require('./../cordova')

    
    var end = function() {
        var str = '';
        str = input.replace('require("cordova', 'require("./cordova');
        str = input.replace("require('cordova", "require('./cordova");
        this.queue(str)
        // this.queue(wrap(ejs.compile(input, {client: true, compileDebug: false})))
        this.queue(null)
    }

    return through(write, end)
}