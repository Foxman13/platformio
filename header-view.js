var HeaderView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('atom-space-pen-views').View;

module.exports = HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.content = function() {
    return this.div({
      "class": 'panel-heading padded heading header-view'
    }, (function(_this) {
      return function() {
        _this.span({
          "class": 'heading-title',
          outlet: 'title'
        });
        _this.span({
          "class": 'heading-status',
          outlet: 'status'
        });
        return _this.span({
          "class": 'heading-close icon-remove-close pull-right',
          outlet: 'closeButton',
          click: 'close'
        });
      };
    })(this));
  };

  HeaderView.prototype.close = function() {
    return atom.commands.dispatch(this.workspaceView(), 'platomformio:close');
  };

  HeaderView.prototype.setStatus = function(status) {
    this.status.removeClass('icon-alert icon-check icon-hourglass icon-stop');
    switch (status) {
      case 'start':
        return this.status.addClass('icon-hourglass');
      case 'stop':
        return this.status.addClass('icon-check');
      case 'kill':
        return this.status.addClass('icon-stop');
      case 'err':
        return this.status.addClass('icon-alert');
    }
  };

  HeaderView.prototype.workspaceView = function() {
    return atom.views.getView(atom.workspace);
  };

  return HeaderView;

})(View);
RunLink