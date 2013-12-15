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
var path         = require('path');
var browserify   = require('browserify');
var mkdirp       = require('mkdirp').sync;
var cp           = require('cp').sync;
var cpr          = require('cpr');
var b            = browserify();
var pathToTmp    = path.join(__dirname, '..', 'tmp');
var pathToSrc    = path.join(__dirname, '..', 'src');
var pathToCommon = path.join(pathToSrc, 'common');


module.exports = function(grunt) {
    grunt.registerMultiTask('browserify', 'Packages cordova.js', function() {

        var done           = this.async();
        var platformName   = this.target;
        var pathToPlatform = path.join(__dirname, '..', 'src', platformName);

        // create a working directory
        mkdirp(pathToTmp);
        // recursive copy ./src/common to ./tmp
        cpr(pathToCommon, pathToTmp, function(err, files) {
            // recursive copy ./src/[platform] to ./tmp
            cpr(pathToPlatform, pathToTmp, function(err, files) {
		        // copy in entry file
                cp(path.join(pathToSrc, 'init.js'), path.join(pathToTmp, 'init.js'));        
                // FIXME call browserify
                // FIXME remove whitespace for windows platforms
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
