/** @jsx React.DOM */

// We don't actually need JSX here, but this serves as a demo for how
// to set up a package of reusable components that may use JSX.

var React = require('react');
var shallowEqual = require('react/lib/shallowEqual');

function wrapWidget(name) {
  var displayName = 'React' + name[0].toUpperCase() + name.slice(1);

  return React.createClass({
    render: function() {
      return this.props.children;
    },

    componentDidUpdate: function(prevProps) {
      if (!shallowEqual(prevProps, this.props)) {
        this._runPlugin();
      }
    },

    componentDidMount: function() {
      this._runPlugin();
    },

    _runPlugin: function() {
      var $node = jQuery(this.getDOMNode());
      $node[name](this.props);
      this.$ = $node;
    },

    displayName: displayName
  });
}

var WIDGETS = {
  Accordion: 'accordion',
  Autocomplete: 'autocomplete',
  Button: 'button',
  DatePicker: 'datepicker',
  Draggable: 'draggable',
  Droppable: 'droppable',
  Menu: 'menu',
  ProgressBar: 'progressbar',
  Resizable: 'resizable',
  Selectable: 'selectable',
  Sortable: 'sortable',
  Slider: 'slider',
  Spinner: 'spinner',
  Tabs: 'tabs',
  Tooltip: 'tooltip'
};

var ReactJQueryUI = {};

for (var key in WIDGETS) {
  ReactJQueryUI[key] = wrapWidget(WIDGETS[key]);
}

module.exports = ReactJQueryUI;