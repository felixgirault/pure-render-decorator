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
 * Get a text description of the component that can be used to identify it
 * in error messages.
 *
 * Adapted from: https://github.com/facebook/react/blob/v15.4.0-rc.3/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L1143
 * @return {string} The name or "a component".
 */
function getComponentName(component) {
  var constructor = component.prototype && component.prototype.constructor;
  return (
    component.displayName || (constructor && constructor.displayName) ||
    component.name || (constructor && constructor.name) ||
    "a component"
  );
}

/**
 * Makes the given component "pure".
 *
 * @param object component Component.
 */
function pureRenderDecorator(component) {
  if (component.prototype.shouldComponentUpdate !== undefined) {
    var componentName = getComponentName(component);
    throw new Error("Cannot add a pure render decorator to " + componentName
      + ", because it already implements `shouldComponentUpdate()`.")
  }
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return component;
}



module.exports = pureRenderDecorator;
