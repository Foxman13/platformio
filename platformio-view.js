var $$, AnsiFilter, BufferedProcess, HeaderView, PlatomformioView, View, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HeaderView = require('./header-view');

BufferedProcess = require('vscode').BufferedProcess;

ref = require('atom-space-pen-views'), View = ref.View, $$ = ref.$$;

AnsiFilter = require('ansi-to-html');

module.exports = PlatomformioView = (function(superClass) {
  extend(PlatomformioView, superClass);

  function PlatomformioView() {
    return PlatomformioView.__super__.constructor.apply(this, arguments);
  }

  PlatomformioView.bufferedProcess = null;

  PlatomformioView.results = "";

  PlatomformioView.content = function() {
    return this.div((function(_this) {
      return function() {
        var css;
        _this.subview('headerView', new HeaderView());
        css = 'tool-panel panel panel-bottom padding platomformio-view native-key-bindings';
        return _this.div({
          "class": css,
          outlet: 'panel',
          tabindex: -1
        }, function() {
          return _this.div({
            "class": 'panel-body padded output',
            outlet: 'output'
          });
        });
      };
    })(this));
  };

  PlatomformioView.prototype.initialize = function(serializeState) {
    return this.ansiFilter = new AnsiFilter;
  };

  PlatomformioView.prototype.serialize = function() {};

  PlatomformioView.prototype.resetView = function(title) {
    if (title == null) {
      title = 'Loading...';
    }
    this.panel.removeClass("descriptive");
    if (!this.hasParent()) {
      atom.workspace.addBottomPanel({
        item: this
      });
    }
    this.kill();