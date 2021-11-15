#!/usr/bin/env node

(function () {
  'use strict';
  var fs = require('fs');
  var fse = require('fs-extra');
  var child_process = require('child_process');
  var path = require('path');

  var jsdocConfigFilename = '_jsdocConfTemp.json';
  var jsdocToolPath = 'node_modules/jsdoc/jsdoc.js';
  var jsdocToolPathFallback = '../jsdoc/jsdoc.js';
  var jsdocPluginPath = 'jsdocs/plugins/yamlGenerator';
  var jsdocOutputPath = '_yamlGeneratorOutput/';

  if (process.argv.length < 3) {
    console.log('Usage: node node2docfx {conf.json}');
  }
  var node2docfxToolDir = path.dirname(process.argv[1]);
  var node2docfxConfigDir = path.dirname(process.argv[2]);

  // read node2docfx's config
  var configPath = process.argv[2];
  var config = {};
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath));
  } else {
    console.error('Config file ' + configPath + ' doesn\'t exist.');
    process.exit(1);
  }

  // generate jsdoc's config
  var jsdocConfig = {
    source: config.source,
    destination: config.destination,
    plugins: [path.join(node2docfxToolDir, jsdocPluginPath)],
    package: config.package,
    readme: config.readme,
    recurseDepth: config.recurseDepth ? config.recurseDepth : 10
  };
  if (config.repo && config.repo.length > 0) {
    jsdocConfig.repo = config.repo[0];
  }

  var jsdocConfigPath = path.join(node2docfxConfigDir, jsdocConfigFilename);
  fs.writeFileSync(jsdocConfigPath, JSON.stringify(jsdocConfig));

  // run jsdoc
  var toolPath = path.join(node2docfxToolDir, jsdocToolPath);
  if (!fs.existsSync(toolPath)) {
    toolPath = path.join(node2docfxToolDir, jsdocToolPathFallback);
    if (!fs.existsSync(toolPath)) {
      console.error('Can\'t find jsdoc.');
    }
  }

  if (process.execArgv.length > 0 && process.execArgv[0].indexOf('--inspect') >= 0) {
    child_process.execFileSync('node', ['--inspect-brk=5858', toolPath, '-c', jsdocConfigFilename, '-r'], { cwd: node2docfxConfigDir });
  } else {
    child_process.execFileSync('node', [toolPath, '-c', jsdocConfigFilename, '-r'], { cwd: node2docfxConfigDir });
  }


  // rename and clear
  if (config.destination) {
    var source = path.join(node2docfxConfigDir, jsdocOutputPath);
    var dest = path.join(node2docfxConfigDir, config.destination);
    fse.ensureDirSync(path.dirname(dest));
    fse.removeSync(dest);
    fs.renameSync(source, dest);
  }
  fs.unlinkSync(jsdocConfigPath);
}());

