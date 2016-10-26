/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
'use strict';

var assert = require('assert');
var decorate = require('./index');

/**
 *
 */
describe('pure-render-decorator', function() {
  function Component() {};
  decorate(Component);

  var component = new Component();
  component.props = { foo: 1 };
  component.state = { bar: 2 };

  it('should add a method named shouldComponentUpdate', function() {
    assert.ok('shouldComponentUpdate' in component);
    assert.ok(typeof component.shouldComponentUpdate === 'function');
  });

  it('should throw an error if shouldComponentUpdate is already implemented', function() {
    function ComponentWithShouldComponentUpdate() {};
    ComponentWithShouldComponentUpdate.prototype.shouldComponentUpdate = () => false;

    var expectedErrorMessage = "Cannot add a pure render decorator to "
      + "ComponentWithShouldComponentUpdate, because it already implements "
      + "`shouldComponentUpdate\\(\\)`";
    assert.throws(() => decorate(ComponentWithShouldComponentUpdate), new RegExp(expectedErrorMessage));
  });

  it('should return true if the props and state are different', function() {
    assert.ok(component.shouldComponentUpdate({}, {}));
  });

  it('should return false if the props and state are reference-equals', function() {
    assert.ok(
      !component.shouldComponentUpdate(
        component.props,
        component.state
      )
    );
  });

  it('should return false if props and state are shallow-equals but different references', function() {
    assert.ok(
      !component.shouldComponentUpdate(
        { foo: 1 },
        { bar: 2 }
      )
    );
  });

  /**
   *
   */
  it('should return the component', function() {
    var c = function() {};
    assert.equal(c, decorate(c));
  });
});
