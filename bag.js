'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import catalog from './product/catalog.js';
import BagItem from './bagItem.js';

var e = React.createElement;

var Bag = function (_React$Component) {
  _inherits(Bag, _React$Component);

  function Bag(props) {
    _classCallCheck(this, Bag);

    var _this = _possibleConstructorReturn(this, (Bag.__proto__ || Object.getPrototypeOf(Bag)).call(this, props));

    _this.cart = props.cart;
    _this.remove = props.remove;
    _this.getSubtotal = props.getSubtotal;
    _this.goToCheckout = props.goToCheckout;
    return _this;
  }

  _createClass(Bag, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'bag' },
        React.createElement(
          'div',
          { className: 'items' },
          React.createElement(
            'div',
            { className: 'bagItem legend desktop' },
            React.createElement(
              'span',
              { className: 'itemText' },
              'item'
            ),
            React.createElement(
              'span',
              { className: 'price' },
              'item price'
            ),
            React.createElement(
              'span',
              { className: 'qty' },
              'quantity'
            ),
            React.createElement(
              'span',
              { className: 'total' },
              'total'
            )
          ),
          Object.keys(this.cart).map(function (id) {
            return Object.keys(_this2.cart[id]).map(function (size) {
              return React.createElement(BagItem, {
                id: id,
                size: size,
                qty: _this2.cart[id][size],
                name: catalog.items[id].name.toUpperCase(),
                image_url: './product/' + catalog.items[id].image_urls[0] + '.png',
                price: catalog.items[id].price,
                key: id + size + _this2.cart[id][size],
                remove: function remove(index, size) {
                  return _this2.remove(index, size);
                }
              });
            });
          })
        ),
        React.createElement(
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
              'TBD'
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
              'TBD'
            )
          ),
          React.createElement(
            'button',
            { type: 'button',
              onClick: function onClick() {
                _this2.getSubtotal() > 0 ? _this2.goToCheckout() : alert('you must have an item in your cart to checkout');
              } },
            'CHECK OUT'
          )
        )
      );
    }
  }]);

  return Bag;
}(React.Component);

export default Bag;