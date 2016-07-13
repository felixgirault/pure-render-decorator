/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
'use strict';

var React = require('react');
var shallowEqual = require('fbjs/lib/shallowEqual');



/**
 * Wraps the given component with a container that only updates
 * when its props change.
 *
 * @param object Component Component.
 * @return object Component.
 */
function pureRenderDecorator(Component) {
  return React.createClass({

    displayName: 'PureRenderDecorator',

    /**
     * Tells if a component should update given it's next props
     * and state.
     *
     * @param object nextProps Next props.
     * @param object nextState Next state.
     */
    shouldComponentUpdate: function(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps)
        || !shallowEqual(this.state, nextState);
    },

    /**
     * Renders the child component.
     */
    render: function() {
      return React.createElement(Component, this.props);
    }
  });
}



module.exports = pureRenderDecorator;
