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
var fs             = require('fs');
var path           = require('path');
var browserify     = require('browserify');
var mkdirp         = require('mkdirp').sync;
var cp             = require('cp').sync;
var cpr            = require('cpr');
var b              = browserify();
var pathToTmp      = path.join(__dirname, '..', 'tmp');
var pathToSrc      = path.join(__dirname, '..', 'src');
var pathToCommon   = path.join(pathToSrc, 'common');
var pathToEntrySrc = path.join(pathToSrc, 'init.js'); 

module.exports = function(grunt) {
    grunt.registerMultiTask('browserify', 'Packages cordova.js', function() {

        var done              = this.async();
        var platformName      = this.target;
        var pathToPlatform    = path.join(__dirname, '..', 'src', 'platforms', platformName);
        var pathToTmpPlatform = path.join(pathToTmp, platformName);
        var pathToEntryTmp    = path.join(pathToTmpPlatform, 'init.js'); 

        // create a working directory
        mkdirp(pathToTmpPlatform);
        // recursive copy ./src/common to ./tmp
        cpr(pathToCommon, pathToTmpPlatform, function(err, files) {
            // recursive copy ./src/[platform] to ./tmp
            cpr(pathToPlatform, pathToTmpPlatform, function(err, files) {
		        // copy in entry file
                cp(pathToEntrySrc, pathToEntryTmp);        
                // call browserify
                b.add(pathToEntryTmp);
                b.bundle().pipe(fs.createWriteStream(path.join(pathToTmpPlatform, 'x.js')));
                // FIXME remove whitespace for windows platforms
                // FIXME clobber tmp dir
                done();
            });
        })
        
    // End of task
    });
}
