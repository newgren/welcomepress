'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import catalog from './product/catalog.js';
import MobileBagItem from './mobileBagItem.js';

var e = React.createElement;

var MobileBag = function (_React$Component) {
  _inherits(MobileBag, _React$Component);

  function MobileBag(props) {
    _classCallCheck(this, MobileBag);

    var _this = _possibleConstructorReturn(this, (MobileBag.__proto__ || Object.getPrototypeOf(MobileBag)).call(this, props));

    _this.cart = props.cart;
    _this.remove = props.remove;
    _this.goToCheckout = props.goToCheckout;
    return _this;
  }

  _createClass(MobileBag, [{
    key: 'formatMoney',
    value: function formatMoney(val) {
      return Math.round(val * 100) / 100;
    }
  }, {
    key: 'getSubtotal',
    value: function getSubtotal() {
      var cart = this.cart;
      var keys = Object.keys(cart);
      var subtotal = 0;
      keys.forEach(function (key) {
        var price = catalog.items[key].price;
        var shirt = cart[key];
        var shirtKeys = Object.keys(shirt);
        shirtKeys.forEach(function (shirtkey) {
          subtotal += shirt[shirtkey] * price;
        });
      });
      return subtotal;
    }
  }, {
    key: 'getShipping',
    value: function getShipping() {
      return 2.05;
    }
  }, {
    key: 'getTotal',
    value: function getTotal() {
      return this.getSubtotal() + this.getShipping();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'bag' },
        React.createElement(
          'div',
          { className: 'items' },
          Object.keys(this.cart).map(function (id) {
            return Object.keys(_this2.cart[id]).map(function (size) {
              return React.createElement(MobileBagItem, {
                id: id,
                size: size,
                qty: _this2.cart[id][size],
                name: catalog.items[id].name.toUpperCase(),
                image_url: './product/' + catalog.items[id].image_urls[0] + '.png',
                price: catalog.items[id].price,
                key: id + size + _this2.cart[id][size],
                remove: function remove(index, size) {
                  _this2.remove(index, size);
                  if (_this2.props.getCartSize() == 0) {
                    _this2.props.goBack();
                  }
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
              this.getSubtotal()
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
              this.getShipping()
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
              this.getTotal()
            )
          ),
          React.createElement(
            'button',
            { type: 'button',
              onClick: this.goToCheckout },
            'CHECK OUT'
          )
        )
      );
    }
  }]);

  return MobileBag;
}(React.Component);

export default MobileBag;