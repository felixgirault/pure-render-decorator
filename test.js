/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
'use strict';

var chai = require('chai');
var spies = require('chai-spies');
var React = require('react');
var jsdom = require('jsdom').jsdom;
var enzyme = require('enzyme');
var decorate = require('./index');

chai.use(spies);

var expect = chai.expect;
var spy = chai.spy;
var createElement = React.createElement;
var mount = enzyme.mount;



/**
 *
 */
global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

Object.keys(document.defaultView)
  .forEach(function(property) {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });



/**
 *
 */
describe('pure-render-decorator', function() {

  /**
   *
   */
  it('should rerender only when the props change', function() {
    var Component = spy(function() {
      return null;
    });

    var Pure = decorate(Component);
    var wrapper = mount(createElement(Pure, {
      foo: 'bar'
    }));

    wrapper.setProps({
      foo: 'bar'
    });

    expect(Component).to.have.been.called.once();

    wrapper.setProps({
      foo: 'baz'
    });

    expect(Component).to.have.been.called.twice();
  });
});
