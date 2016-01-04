var CompositeDisposable, Platomformio, PlatomformioView;

PlatomformioView = require('./platomformio-view');

CompositeDisposable = require('vscode').CompositeDisposable;

module.exports = Platomformio = {
  config: {
    verboseBuild: {
      title: 'Show all build output (default is to only show if an error occurs)',
      type: 'boolean',
      "default": false
    },
    verboseUpload: {
      title: 'Show all upload output (default is to only show if an error occurs)',
      type: 'boolean',
      "default": true
    },
    environPath: {
      title: 'Environment PATH to run `platformio`',
      description: 'Paste here the result of `echo $PATH` (Unix) / `echo %PATH%` (Windows) command by typing into your terminal',
      type: 'string',
      "default": process.env.PATH
    }
  },
  subscriptions: null,
  activate: function(state) {
    this.platomformioView = new PlatomformioView(state.platomformioViewState);
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(vscode.commands.registerCommand('core.cancel', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this)));
    this.subscriptions.add(vscode.commands.registerCommand('extension.build', (function(_this) {
        return function() {
          return _this.build();
        };
      })(this)));
    this.subscriptions.add(vscode.commands.registerCommand('extension.upload', (function(_this) {
        return function() {
          return _this.upload();
        };
      })(this)));
    this.subscriptions.add(vscode.commands.registerCommand('extension.clean', (function(_this) {
        return function() {
          return _this.clean();
        };
      })(this)));
    this.subscriptions.add(vscode.commands.registerCommand('extension.close', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this)));
    this.subscriptions.add(vscode.commands.registerCommand('extension.kill-process', (function(_this) {
        return function() {
          return _this.kill();
        };
      })(this)));
      
    return this.subscriptions;
  },
  deactivate: function() {
    return this.platomformioView.close();
  },
  serialize: function() {
    return {
      platomformioViewState: this.platomformioView.serialize()
    };
  },
  build: function() {
    this.saveWorkspace();
    this.platomformioView.resetView("Building...");
    if (atom.config.get('platomformio.verboseBuild')) {
      this.platomformioView.panel.addClass("descriptive");
    }
    return this.platomformioView.run("platformio", ["-f", "-c", "atom", "run"]);
  },
  upload: function() {
    this.saveWorkspace();
    this.platomformioView.resetView("Uploading...");
    if (atom.config.get('platomformio.verboseUpload')) {
      this.platomformioView.panel.addClass("descriptive");
    }
    return this.platomformioView.run("platformio", ["-f", "-c", "atom", "run", "-t", "upload"]);
  },
  clean: function() {
    this.saveWorkspace();
    this.platomformioView.resetView("Cleaning...");
    if (atom.config.get('platomformio.verboseUpload')) {
      this.platomformioView.panel.addClass("descriptive");
    }
    return this.platomformioView.run("platformio", ["-f", "-c", "atom", "run", "-t", "clean"]);
  },
  close: function() {
    return this.platomformioView.close();
  },
  kill: function() {
    return this.platomformioView.kill();
  },
  saveWorkspace: function() {
    var ref;
    return (ref = atom.workspace.getActiveTextEditor()) != null ? ref.save() : void 0;
  }
};