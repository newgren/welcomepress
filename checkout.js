'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import catalog from './product/catalog.js';
import BagItem from './bagItem.js';

import Payment from './payment.js';

var e = React.createElement;

var state = {
  invalidShippingAddressError: false,
  invalidEmailAddressError: false,
  shippingInfoIsValidated: false,
  ship: {
    email: '',
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip5: '',
    country: 'USA'
  }
};

var Checkout = function (_React$Component) {
  _inherits(Checkout, _React$Component);

  function Checkout(props) {
    _classCallCheck(this, Checkout);

    var _this = _possibleConstructorReturn(this, (Checkout.__proto__ || Object.getPrototypeOf(Checkout)).call(this, props));

    _this.cart = props.cart;
    _this.remove = props.remove;
    _this.buttonRef = React.createRef();
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleShippingSubmit = _this.handleShippingSubmit.bind(_this);
    _this.handlePaymentSuccess = _this.handlePaymentSuccess.bind(_this);
    _this.mode = props.mode; // 'shipping' | 'payment'
    _this.setCheckoutMode = props.setMode;
    _this.completeCheckout = props.completeCheckout;
    _this.state = state;
    return _this;
  }

  _createClass(Checkout, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remember state for the next mount
      state = this.state;
    }
  }, {
    key: 'formatMoney',
    value: function formatMoney(val) {
      return Math.round(val * 100) / 100;
    }
  }, {
    key: 'getSubtotal',
    value: function getSubtotal() {
      //TODO: this function seems to be called way more times than it should...
      // potential problem with state update
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
    key: 'verifyShippingAddress',
    value: function verifyShippingAddress(callbackTrue, callbackFalse) {
      var userid = "711WELCO2258"; //"[userid]";
      var url = 'https://secure.shippingapis.com/ShippingAPI.dll    ?API=Verify    &XML=    <AddressValidateRequest USERID="' + userid + '">      <Address ID="0">        <Address1>' + this.state.ship.street1 + '</Address1>        <Address2>' + this.state.ship.street2 + '</Address2>        <City>' + this.state.ship.city + '</City>        <State>' + this.state.ship.state + '</State>        <Zip5>' + this.state.ship.zip5 + '</Zip5>        <Zip4></Zip4>      </Address>    </AddressValidateRequest>';

      console.log(url);
      var http = new XMLHttpRequest();
      http.open("GET", url);
      http.send();
      http.onreadystatechange = function (e) {
        // console.log('HTTP STATUS: ' + http.status);
        // console.log('HTTP RDYSTATE: ' + http.readyState);
        if (http.readyState === 4 && http.status === 200) {
          var xml = http.responseXML;
          var valid = xml.getElementsByTagName("Error").length === 0;
          valid ? callbackTrue() : callbackFalse();
        }
      };
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var ship = this.state.ship;
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;

      ship[name] = value;
      this.setState({ ship: ship });
    }

    // **** * ****
    // ***** TODO async


  }, {
    key: 'handleShippingSubmit',
    value: function handleShippingSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      this.setState({ shippingInfoIsValidated: false }); // just in case
      if (this.validateEmail(this.state.ship.email)) {
        this.setState({ invalidEmailAddressError: false });
        console.log('VALID EMAIL');
      } else {
        this.setState({ invalidEmailAddressError: true });
        console.log('INVALID EMAIL');
        return;
      }
      var valid = this.verifyShippingAddress(function () {
        // true callback
        _this2.setState({
          shippingInfoIsValidated: true, // all info validated only at this point
          invalidShippingAddressError: false
        });
        _this2.setCheckoutMode('payment');
        console.log('VALID SHIPPING ADDRESS');
      }, function () {
        // false callback
        _this2.setState({
          shippingInfoIsValidated: false,
          invalidShippingAddressError: true
        });
        console.log('INVALID SHIPPING ADDRESS');
      });
    }
  }, {
    key: 'handlePaymentSuccess',
    value: function handlePaymentSuccess() {
      this.completeCheckout();
    }
  }, {
    key: 'handlePaymentFailure',
    value: function handlePaymentFailure() {
      alert('Payment did not complete properly. Please try again.');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'checkout' },
        React.createElement(
          'div',
          { className: 'left' },
          this.props.mode == 'shipping' ?
          // SHIPPING
          React.createElement(
            'div',
            { className: 'formform' },
            React.createElement(
              'form',
              { id: 'finalform', onSubmit: this.handleShippingSubmit },
              'email*:',
              React.createElement('br', null),
              React.createElement('input', {
                type: 'text',
                name: 'email',
                value: this.state.ship.email,
                onChange: this.handleInputChange }),
              React.createElement('br', null),
              React.createElement(
                'div',
                { className: 'twofer' },
                React.createElement(
                  'div',
                  { className: 'one' },
                  'first name*:',
                  React.createElement('br', null),
                  React.createElement('input', {
                    type: 'text',
                    name: 'firstName',
                    value: this.state.ship.firstName,
                    onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'two' },
                  'last name*:',
                  React.createElement('br', null),
                  React.createElement('input', {
                    type: 'text',
                    name: 'lastName',
                    value: this.state.ship.lastName,
                    onChange: this.handleInputChange })
                )
              ),
              'street address*:',
              React.createElement('br', null),
              React.createElement('input', { type: 'text', name: 'street1',
                value: this.state.ship.street1,
                onChange: this.handleInputChange }),
              React.createElement('br', null),
              'address2:',
              React.createElement('br', null),
              React.createElement('input', { type: 'text', name: 'street2',
                value: this.state.ship.street2,
                onChange: this.handleInputChange }),
              React.createElement('br', null),
              React.createElement(
                'div',
                { className: 'twofer' },
                React.createElement(
                  'div',
                  { className: 'one' },
                  'city*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'city',
                    value: this.state.ship.city,
                    onChange: this.handleInputChange })
                ),
                React.createElement(
                  'div',
                  { className: 'two' },
                  'state*:',
                  React.createElement('br', null),
                  React.createElement('input', { type: 'text', name: 'state',
                    value: this.state.ship.state,
                    onChange: this.handleInputChange })
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
                  React.createElement('input', { type: 'text', name: 'zip5',
                    value: this.state.ship.zip5,
                    onChange: this.handleInputChange })
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
              ),
              React.createElement('input', { type: 'submit', style: { display: "none" } })
            ),
            this.state.invalidEmailAddressError ? React.createElement(
              'span',
              null,
              'The email address you entered is invalid. Please try again.'
            ) : React.createElement('span', null),
            this.state.invalidShippingAddressError ? React.createElement(
              'span',
              null,
              'The shiping address you entered is invalid. Please try again.'
            ) : React.createElement('span', null)
          ) : // PAYMENT
          React.createElement(
            'div',
            { className: 'payAndVerify' },
            React.createElement(
              'div',
              { className: 'shippingVerification' },
              React.createElement(
                'span',
                { className: 'title' },
                'Make sure this info is correct!'
              ),
              React.createElement('br', null),
              React.createElement('br', null),
              Object.keys(this.state.ship).map(function (a) {
                return _this3.state.ship[a] ? React.createElement(
                  'div',
                  { className: 'bit' },
                  _this3.state.ship[a]
                ) : null;
              })
            ),
            React.createElement(Payment, {
              amount: this.getTotal(),
              data: this.state.ship,
              buttonRef: this.buttonRef,
              handlePaymentSuccess: this.handlePaymentSuccess,
              handlePaymentFailure: this.handlePaymentFailure })
          )
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
              ref: this.buttonRef,
              onClick: this.props.mode == 'shipping' ? this.handleShippingSubmit : this.handlePaymentSubmit },
            this.props.mode == 'shipping' ? "CONTINUE TO PAYMENT" : 'CONFIRM ORDER'
          )
        )
      );
    }
  }]);

  return Checkout;
}(React.Component);

export default Checkout;