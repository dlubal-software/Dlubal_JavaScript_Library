# Node2DocFX
[![Build status](https://ci.appveyor.com/api/projects/status/qdyinuwxa7gmowqe/branch/master?svg=true)](https://ci.appveyor.com/project/superyyrrzz/node2docfx/branch/master)

An API documentation generator for JavaScript.  
Using [JSDoc](http://usejsdoc.org/) to generate YAML files, using [DocFX](http://dotnet.github.io/docfx/) to generate site.

# Installation and Usage
To install the latest version available on NPM:
```
npm install node2docfx
```
Create a `node2docfx.json` for your project:
```json
{
  "source": {
    "include": ["main.js"]
  },
  "package": "package.json",
  "readme": "/README.md",
  "destination": "out"
}
```
* `source`: determine what files Node2DocFX generates YAML for. It has exactly the same syntax with that in [JSDoc](http://usejsdoc.org/about-configuring-jsdoc.html#specifying-input-files).
* `package`: specify the path of `package.json`. The package's name is used as part of the `uid` in generated YAML.
* `readme`: specify the path of `README.md`. It will be copied to output along with generated YAML.
* `destination`: specify the output folder.
Run Node2DocFX locally
```
node node_modules/node2docfx/node2docfx.js node2docfx.json
```
