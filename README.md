Pure render decorator
=====================

An ES7 decorator to make React components "pure".

[![Build Status](https://travis-ci.org/felixgirault/pure-render-decorator.svg?branch=master)](https://travis-ci.org/felixgirault/pure-render-decorator)

Installation
------------

```sh
npm install pure-render-decorator
```

Usage
-----

```jsx
import {Component} from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
class Test extends Component {
  render() {
    return <div></div>;
  }
}
```

The above example is the same as using `PureRenderMixin`:

```jsx
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Test = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render: function() {
    return <div></div>;
  }
});
```
