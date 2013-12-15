/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/
var path            = require('path');
var browserify      = require('browserify');
var mkdirp          = require('mkdirp').sync;
var cp              = require('cp').sync;
var cpr             = require('cpr');

var b                 = browserify();
var pathToCordovaJS   = path.join(__dirname, '..', 'src', 'cordova.js')
var pathToTmp         = path.join(__dirname, '..', 'tmp');
var pathToCommon      = path.join(__dirname, '..', 'src', 'common');
var pathToCordova     = path.join(pathToTmp, 'cordova');


module.exports = function(grunt) {
    grunt.registerMultiTask('browserify', 'Packages cordova.js', function() {

        var done           = this.async();
        var platformName   = this.target;
        var pathToPlatform = path.join(__dirname, '..', 'src', platformName);

/*
 *   // compile basic stuff
 *   mkdirp tmp
 *   cpr ./src/common ./tmp
 *   cpr ./src/[platform] ./tmp 
 *   cp ./src/cordova.js ./tmp/cordova.js
 *                  
 * */


        // create ./tmp and ./tmp/node_modules
        mkdirp(pathToTmp);
        
        // copy ./src/cordova.js to ./tmp/cordova.js
		cp(pathToCordovaJS, path.join(pathToTmp, 'cordova.js'));        
        
        // recursive copy ./src/common to ./tmp/cordova
        cpr(pathToCommon, pathToCordova, function(err, files) {
            // recursive copy ./src/[platform] to ./tmp/cordova
            cpr(pathToPlatform, pathToCordova, function(err, files) {
                
                // move platform
                done();
            });
        })
        
        
        /*
        b.add('./browser/main.js');
        b.bundle().pipe(process.stdout);

        generate(platformName, useWindowsLineEndings, done);
        */
        // if its windows add line endings

    });
}
