# RFEM_JavaScript_Library
![image](https://img.shields.io/badge/COMPATIBILITY-RFEM%206.00-yellow)
![image](https://img.shields.io/badge/COMPATIBILITY-RSTAB%209.00-yellow)
![image](https://img.shields.io/badge/COMPATIBILITY-RSECTION%201.00-yellow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CodeFactor](https://www.codefactor.io/repository/github/dlubal-software/dlubal_javascript_library/badge)](https://www.codefactor.io/repository/github/dlubal-software/dlubal_javascript_library)

## Description

This JavaScript project is focused on opening of possibility of scripting inside [**RFEM 6**](https://www.dlubal.com/en/products/rfem-fea-software/what-is-rfem) [**RSTAB 9**](https://www.dlubal.com/en/products/rstab-beam-structures/what-is-rstab) and [**RSECTION**](https://www.dlubal.com/en/products/cross-section-properties-software/rsection) to all our customers. Library enables them possibility to create models and interact with our applications on much higher level. The goal is to create easily expandable JavaScript library for scripting inside RFEM / RSTAB /RSECTION.

## Getting started

You can download [actual release]() of our JavaScript library and the use it for your project or you can fork our repository.

### Steps for downloaded release
* Go to [release location](https://github.com/Dlubal-Software/Dlubal_JavaScript_Library/releases/latest)
* Download zip file called **Source code.zip**
* Unzip it
* Use PowerShell script [CopyFilesToRFEMLocation](PowerShellScripts/CopyFilesToRFEMLocation.ps1) to copy content of library into you installation folder (you may need to have admin rights)

### Steps for Visual Studio Code
* Download [Visual Studio Code](https://code.visualstudio.com/) and install it
* Open Visual Studio Code and install following extensions
    * [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - useful extension for spell checking
    * [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) - extension for easy access to the GitHub pull request
    * [GitHub Issues](https://marketplace.visualstudio.com/items?itemName=ms-vscode.github-issues-prs) - extension for easy access to the GitHub issues
    * [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - extension for better work with Source management
    * [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Linter for JavaScript
* Download [Git](https://git-scm.com/downloads) and install it (needed for better functionality of Git Lens)
* Download [GitHub Desktop](https://desktop.github.com/)
* Fork this repository
* Make your branch
* Open Visual Studio Code
* Made your own script or extend our library or use one from [examples](/examples)
* Copy your project to User Scripts/Example folder
* If you want to contribute - make pull request

## Dependencies
* RFEM 6 or RSTAB9 or RSECTION application

## Examples
Examples can be found under [Examples](/examples) folder.
## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contribute
Contributions are always welcome! Please ensure your pull request adheres to the following guidelines [Contributing](/CONTRIBUTING.md)
