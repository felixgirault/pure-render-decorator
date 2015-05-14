/**
 * @author Félix Girault <felix.girault@gmail.com>
 * @license MIT
 */
'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;



/**
 * Makes the given component "pure" using the PureRenderMixin.
 *
 * @param object component Component.
 */
function purify(component) {
  component.prototype.shouldComponentUpdate
    = PureRenderMixin.shouldComponentUpdate;
}



module.exports = purify;
