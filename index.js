/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Tells if a component should update given it's next props
 * and state.
 *
 * @param object nextProps Next props.
 * @param object nextState Next state.
 */
function shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}

/**
 * Makes the given component "pure".
 *
 * @param object component Component.
 */
function pureRenderDecorator(component) {
  if (component.prototype.shouldComponentUpdate !== undefined) {
    throw new Error("Cannot add a pure render decorator on a component that already"
      + " implements shouldComponentUpdate, but " + component.prototype.name
      + " already implements shouldComponentUpdate.")
  }
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return component;
}



module.exports = pureRenderDecorator;
