'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import catalog from './product/catalog.js';
import BagItem from './bagItem.js';

import Payment from './payment.js';

var e = React.createElement;

var Checkout = function (_React$Component) {
  _inherits(Checkout, _React$Component);

  function Checkout(props) {
    _classCallCheck(this, Checkout);

    var _this = _possibleConstructorReturn(this, (Checkout.__proto__ || Object.getPrototypeOf(Checkout)).call(this, props));

    _this.cart = props.cart;
    _this.remove = props.remove;
    _this.buttonRef = React.createRef();
    _this.state = {
      mode: 'shipping' // 'shipping' | 'payment'
    };
    return _this;
  }

  _createClass(Checkout, [{
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
      var pounds = 0;
      var ounces = 6;
      var userid = "711WELCO2258"; //"[userid]";
      var url = "http://production.shippingapis.com/ShippingAPI.dll?\
API=RateV4&XML=<RateV4Request USERID=\"" + userid + "\">\
<Revision>2</Revision>\
<Package ID=\"1ST\"><Service>FIRST CLASS</Service>\
<FirstClassMailType>FLAT</FirstClassMailType>\
<ZipOrigination>61801</ZipOrigination>\
<ZipDestination>04019</ZipDestination>\
<Pounds>0</Pounds>\
<Ounces>6</Ounces>\
<Container/>\
<Size>REGULAR</Size>\
<Machinable>true</Machinable>\
</Package>\
</RateV4Request>";

      console.log(String(url));
      var http = new XMLHttpRequest();
      http.open("GET", url);
      //http.setRequestHeader("Access-Control-Allow-Origin", "*");
      // Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.send();
      http.onreadystatechange = function (e) {
        console.log(http.responseText);
      };

      // TODO: get shipping price from returned XML
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
        { className: 'checkout' },
        React.createElement(
          'div',
          { className: 'left' },
          this.state.mode == 'shipping' ?
          // SHIPPING
          React.createElement(
            'div',
            { className: 'formform' },
            React.createElement(
              'form',
              { id: 'finalform' },
              'email*:',
              React.createElement('br', null),
              React.createElement('input', { type: 'text', name: 'email' }),
              React.createElement('br', null),
              React.createElement(
                'div',
                { className: 'twofer' },
                React.createElement(
                  'div',
                  { className: 'one' },
                  'first name*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'firstname' })
                ),
                React.createElement(
                  'div',
                  { className: 'two' },
                  'last name*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'lastname' })
                )
              ),
              'street address*:',
              React.createElement('br', null),
              React.createElement('input', { type: 'text', name: 'streetaddress' }),
              React.createElement('br', null),
              'address2:',
              React.createElement('br', null),
              React.createElement('input', { type: 'text', name: 'streetaddress2' }),
              React.createElement('br', null),
              React.createElement(
                'div',
                { className: 'twofer' },
                React.createElement(
                  'div',
                  { className: 'one' },
                  'city*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'city' })
                ),
                React.createElement(
                  'div',
                  { className: 'two' },
                  'state*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'state' })
                )
              ),
              React.createElement(
                'div',
                { className: 'twofer' },
                React.createElement(
                  'div',
                  { className: 'one' },
                  'zip code*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'zip' })
                ),
                React.createElement(
                  'div',
                  { className: 'two' },
                  'country*:',
                  React.createElement('br', null),
                  React.createElement(
                    'select',
                    { value: 'USA' },
                    React.createElement(
                      'option',
                      { value: 'USA' },
                      'USA'
                    )
                  )
                )
              )
            )
          ) : // PAYMENT
          React.createElement(Payment, { buttonRef: this.buttonRef })
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
              ref: this.buttonRef,
              onClick: function onClick() {
                var data = new FormData(document.getElementById('finalform'));
                console.log(data.get('email'));
                var currentMode = _this2.state.mode;
                console.log(currentMode);
                _this2.setState({ mode: 'payment' });
              } },
            this.state.mode == 'shipping' ? "CONTINUE TO PAYMENT" : 'CONFIRM ORDER'
          )
        )
      );
    }
  }]);

  return Checkout;
}(React.Component);

export default Checkout;