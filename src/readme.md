# Notes for platform authors

All requires can be considered `./` relative. 

## How this gets built

0. `./Gruntfile.js` default task calls `./tasks/browserify.js`
1. `./tmp` gets created
2. `./src/init.js` is copied into the `./tmp` (this is the browserify entry file)
3. `./src/common` is recursively copied into `./tmp`
4. `./src/platform/[PLATFORM]` is then recursively copied into `./tmp`
5. Finally browserify is called on the `./tmp/init` file
