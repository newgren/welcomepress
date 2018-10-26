'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Summary = function (_React$Component) {
  _inherits(Summary, _React$Component);

  function Summary(props) {
    _classCallCheck(this, Summary);

    return _possibleConstructorReturn(this, (Summary.__proto__ || Object.getPrototypeOf(Summary)).call(this, props));
  }

  _createClass(Summary, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'summary' },
        React.createElement(
          'span',
          { className: 'title' },
          'ORDER SUMMARY'
        ),
        React.createElement(
          'div',
          { className: 'bar' },
          React.createElement(
            'span',
            { className: 'key' },
            'subtotal'
          ),
          React.createElement(
            'span',
            { className: 'val' },
            '$',
            this.getSubtotal().toFixed(2)
          )
        ),
        React.createElement(
          'div',
          { className: 'bar' },
          React.createElement(
            'span',
            { className: 'key' },
            'shipping'
          ),
          React.createElement(
            'span',
            { className: 'val' },
            '$',
            this.getShipping().toFixed(2)
          )
        ),
        React.createElement(
          'div',
          { className: 'bar' },
          React.createElement(
            'span',
            { className: 'key' },
            'total'
          ),
          React.createElement(
            'span',
            { className: 'val' },
            '$',
            this.getTotal().toFixed(2)
          )
        ),
        React.createElement(
          'button',
          { type: 'button',
            onClick: this.goToCheckout },
          'CHECK OUT'
        )
      );
    }
  }]);

  return Summary;
}(React.Component);

export default Summary;