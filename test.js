/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var warning = require('fbjs/lib/warning');
var decorate = require('./index');



/**
 *
 */
describe('pure-render-decorator', function() {

  /**
   *
   */
  beforeEach(function() {
    function Component() {};
    decorate(Component);

    this.component = new Component();
    this.component.props = { foo: 1 };
    this.component.state = { bar: 2 };
  });

  /**
   *
   */
  it('should warn if shouldComponentUpdate is already implemented', function() {
    function Component() {};
    Component.prototype.shouldComponentUpdate = () => true;

    var sandbox = sinon.sandbox.create();
    var mock = sandbox.mock(console);

    mock
      .expects('error')
      .once()
      .withArgs(
        'Warning: Cannot decorate `Component` with @pureRenderDecorator, '
        + 'because it already implements `shouldComponentUpdate().'
      );

    decorate(Component);

    mock.verify();
    sandbox.restore();
  });

  /**
   *
   */
  it('should add a method named shouldComponentUpdate', function() {
    expect(this.component).to.respondTo('shouldComponentUpdate');
  });

  /**
   *
   */
  it('should return the component', function() {
    function Component() {};
    expect(decorate(Component)).to.equal(Component);
  });

  /**
   *
   */
  it('should update if the props and state are different', function() {
    expect(this.component.shouldComponentUpdate({}, {})).to.be.true;
  });

  /**
   *
   */
  it('should not update if the props and state are reference-equals', function() {
    expect(
      this.component.shouldComponentUpdate(
        this.component.props,
        this.component.state
      )
    ).to.be.false;
  });

  /**
   *
   */
  it('should not update if props and state are shallow-equals but different references', function() {
    expect(
      this.component.shouldComponentUpdate(
        { foo: 1 },
        { bar: 2 }
      )
    ).to.be.false;
  });
});
