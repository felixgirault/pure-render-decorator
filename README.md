Pure render decorator
=====================

An ES7 decorator to make React components "pure".

[![Build Status](https://travis-ci.org/felixgirault/pure-render-decorator.svg?branch=master)](https://travis-ci.org/felixgirault/pure-render-decorator)

Alternatives
------------

* As of [v15.3.0](https://github.com/facebook/react/releases/tag/v15.3.0), React provides a `PureComponent` base class to make a component pure.
* [recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md#pure) provides a clean and functional way to make components pure.

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
export default class Test extends Component {
  render() {
    return <div />;
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

As decorators are simply functions, you can also use `pureRender()` without the decorator syntax:

```jsx
import {Component} from 'react';
import pureRender from 'pure-render-decorator';

class Test extends Component {
  render() {
    return <div />;
  }
}

export default pureRender(Test);
```
