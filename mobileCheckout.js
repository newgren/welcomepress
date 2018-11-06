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
  sameAddress: true,
  paymentLoaded: false,
  finalClick: false,
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
  },
  bill: {
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

var MobileCheckout = function (_React$Component) {
  _inherits(MobileCheckout, _React$Component);

  function MobileCheckout(props) {
    _classCallCheck(this, MobileCheckout);

    var _this = _possibleConstructorReturn(this, (MobileCheckout.__proto__ || Object.getPrototypeOf(MobileCheckout)).call(this, props));

    _this.cart = props.cart;
    _this.remove = props.remove;
    _this.buttonRef = React.createRef();
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleShippingSubmit = _this.handleShippingSubmit.bind(_this);
    _this.handlePaymentSuccess = _this.handlePaymentSuccess.bind(_this);
    _this.mode = props.mode; // 'shipping' | 'payment'
    _this.setCheckoutMode = props.setMode;
    _this.completeCheckout = props.completeCheckout;
    _this.goBack = props.goBack;
    _this.state = state;
    return _this;
  }

  _createClass(MobileCheckout, [{
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
    key: 'verifyAddress',
    value: function verifyAddress(callback) {
      var _this2 = this;

      var shippingAddress = this.state.ship;
      var billingAddress = this.state.bill;
      var userid = "711WELCO2258"; //"[userid]";

      // secondAddress if needed

      // ugly but strings in JS are weird!
      var url = this.state.sameAddress ? 'https://secure.shippingapis.com/ShippingAPI.dll        ?API=Verify        &XML=        <AddressValidateRequest USERID="' + userid + '">          <Address ID="0">            <Address1>' + shippingAddress.street1 + '</Address1>            <Address2>' + shippingAddress.street2 + '</Address2>            <City>' + shippingAddress.city + '</City>            <State>' + shippingAddress.state + '</State>            <Zip5>' + shippingAddress.zip5 + '</Zip5>            <Zip4></Zip4>          </Address>        </AddressValidateRequest>' : 'https://secure.shippingapis.com/ShippingAPI.dll        ?API=Verify        &XML=        <AddressValidateRequest USERID="' + userid + '">          <Address ID="0">            <Address1>' + shippingAddress.street1 + '</Address1>            <Address2>' + shippingAddress.street2 + '</Address2>            <City>' + shippingAddress.city + '</City>            <State>' + shippingAddress.state + '</State>            <Zip5>' + shippingAddress.zip5 + '</Zip5>            <Zip4></Zip4>          </Address>          <Address ID="1">            <Address1>' + billingAddress.street1 + '</Address1>            <Address2>' + billingAddress.street2 + '</Address2>            <City>' + billingAddress.city + '</City>            <State>' + billingAddress.state + '</State>            <Zip5>' + billingAddress.zip5 + '</Zip5>            <Zip4></Zip4>          </Address>        </AddressValidateRequest>';

      console.log(url);
      var http = new XMLHttpRequest();
      http.open("GET", url);
      http.send();
      http.onreadystatechange = function (e) {
        // console.log('HTTP STATUS: ' + http.status);
        // console.log('HTTP RDYSTATE: ' + http.readyState);
        if (http.readyState === 4 && http.status === 200) {
          var xml = http.responseXML;
          var addresses = xml.getElementsByTagName("Address");
          var validShipping = addresses[0].getElementsByTagName("Error").length == 0;
          var validBilling = _this2.state.sameAddress ? true : addresses[1].getElementsByTagName("Error").length == 0;
          callback(validShipping, validBilling);
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
    value: function handleInputChange(type, event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      if (type == 'shipping') {
        var ship = this.state.ship;
        ship[name] = value;
        this.setState({ ship: ship });
      } else {
        var bill = this.state.bill;
        bill[name] = value;
        this.setState({ bill: bill });
      }
    }
  }, {
    key: 'handleCheckbox',
    value: function handleCheckbox(event) {
      this.setState({ sameAddress: !this.state.sameAddress });
    }
  }, {
    key: 'buttonIsDisabled',
    value: function buttonIsDisabled() {
      console.log("ok");
      if (this.props.mode == 'payment' && !this.state.paymentLoaded) {
        return false;
      }
      return true;
    }

    // **** * ****
    // ***** TODO async

  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this3 = this;

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
      var valid = this.verifyAddress(function (validShipping, validBilling) {
        if (validShipping && validBilling) {
          // all info validated only at this point
          _this3.setState({
            shippingInfoIsValidated: true,
            invalidShippingAddressError: false,
            invalidBillingAddressError: false
          });
          _this3.setCheckoutMode('payment');
          console.log('VALID SHIPPING and BILLING ADDRESS');
        } else {
          _this3.setState({
            shippingInfoIsValidated: false,
            invalidShippingAddressError: !validShipping,
            invalidBillingAddressError: !validBilling
          });
          console.log('INVALID SHIPPING ADDRESS');
        }
      });
    }
  }, {
    key: 'handleShippingSubmit',
    value: function handleShippingSubmit(event) {
      var _this4 = this;

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
        _this4.setState({
          shippingInfoIsValidated: true, // all info validated only at this point
          invalidShippingAddressError: false
        });
        _this4.setCheckoutMode('payment');
        console.log('VALID SHIPPING ADDRESS');
      }, function () {
        // false callback
        _this4.setState({
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
    key: 'handlePaymentSubmit',
    value: function handlePaymentSubmit() {
      this.setState({ finalClick: true });
    }
  }, {
    key: 'setPaymentLoaded',
    value: function setPaymentLoaded(val) {
      this.setState({ paymentLoaded: val });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remember state for the next mount
      state = this.state;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

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
            null,
            React.createElement(
              'div',
              { className: 'formform shipping' },
              React.createElement(
                'div',
                { className: 'title' },
                'SHIPPING ADDRESS'
              ),
              React.createElement(
                'form',
                { id: 'shippingForm', onSubmit: this.handleSubmit },
                'email*',
                React.createElement('br', null),
                React.createElement('input', {
                  type: 'text',
                  name: 'email',
                  value: this.state.ship.email,
                  onChange: function onChange(e) {
                    return _this5.handleInputChange('shipping', e);
                  } }),
                React.createElement('br', null),
                React.createElement(
                  'div',
                  { className: 'twofer' },
                  React.createElement(
                    'div',
                    { className: 'one' },
                    'first name*',
                    React.createElement('br', null),
                    React.createElement('input', {
                      type: 'text',
                      name: 'firstName',
                      value: this.state.ship.firstName,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('shipping', e);
                      } })
                  ),
                  React.createElement(
                    'div',
                    { className: 'two' },
                    'last name*',
                    React.createElement('br', null),
                    React.createElement('input', {
                      type: 'text',
                      name: 'lastName',
                      value: this.state.ship.lastName,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('shipping', e);
                      } })
                  )
                ),
                'street address*',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street1',
                  value: this.state.ship.street1,
                  onChange: function onChange(e) {
                    return _this5.handleInputChange('shipping', e);
                  } }),
                React.createElement('br', null),
                'address 2',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street2',
                  value: this.state.ship.street2,
                  onChange: function onChange(e) {
                    return _this5.handleInputChange('shipping', e);
                  } }),
                React.createElement('br', null),
                React.createElement(
                  'div',
                  { className: 'twofer' },
                  React.createElement(
                    'div',
                    { className: 'one' },
                    'city*',
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'city',
                      value: this.state.ship.city,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('shipping', e);
                      } })
                  ),
                  React.createElement(
                    'div',
                    { className: 'two' },
                    'state*',
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'state',
                      value: this.state.ship.state,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('shipping', e);
                      } })
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'twofer' },
                  React.createElement(
                    'div',
                    { className: 'one' },
                    'zip code*',
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'zip5',
                      value: this.state.ship.zip5,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('shipping', e);
                      } })
                  ),
                  React.createElement(
                    'div',
                    { className: 'two' },
                    'country*',
                    React.createElement('br', null),
                    React.createElement(
                      'select',
                      { value: 'USA',
                        onChange: function onChange(e) {
                          return _this5.handleInputChange('shipping', e);
                        } },
                      React.createElement(
                        'option',
                        {
                          value: 'USA' },
                        'USA'
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'checkbox' },
                  React.createElement('input', { type: 'checkbox',
                    checked: this.state.sameAddress,
                    onChange: this.handleCheckbox.bind(this) }),
                  React.createElement(
                    'div',
                    null,
                    'My billing address is the same.'
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
                'The shipping address you entered is invalid. Please try again.'
              ) : React.createElement('span', null)
            ),
            !this.state.sameAddress ? React.createElement(
              'div',
              { className: 'formform billing' },
              React.createElement(
                'div',
                { className: 'title' },
                'BILLING ADDRESS'
              ),
              React.createElement(
                'form',
                { id: 'billingForm', onSubmit: this.handleSubmit },
                React.createElement(
                  'div',
                  { className: 'twofer' },
                  React.createElement(
                    'div',
                    { className: 'one' },
                    'first name*',
                    React.createElement('br', null),
                    React.createElement('input', {
                      type: 'text',
                      name: 'firstName',
                      value: this.state.bill.firstName,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('billing', e);
                      } })
                  ),
                  React.createElement(
                    'div',
                    { className: 'two' },
                    'last name*',
                    React.createElement('br', null),
                    React.createElement('input', {
                      type: 'text',
                      name: 'lastName',
                      value: this.state.bill.lastName,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('billing', e);
                      } })
                  )
                ),
                'street address*',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street1',
                  value: this.state.bill.street1,
                  onChange: function onChange(e) {
                    return _this5.handleInputChange('billing', e);
                  } }),
                React.createElement('br', null),
                'address 2',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street2',
                  value: this.state.bill.street2,
                  onChange: function onChange(e) {
                    return _this5.handleInputChange('billing', e);
                  } }),
                React.createElement('br', null),
                React.createElement(
                  'div',
                  { className: 'twofer' },
                  React.createElement(
                    'div',
                    { className: 'one' },
                    'city*',
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'city',
                      value: this.state.bill.city,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('billing', e);
                      } })
                  ),
                  React.createElement(
                    'div',
                    { className: 'two' },
                    'state*',
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'state',
                      value: this.state.bill.state,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('billing', e);
                      } })
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'twofer' },
                  React.createElement(
                    'div',
                    { className: 'one' },
                    'zip code*',
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'zip5',
                      value: this.state.bill.zip5,
                      onChange: function onChange(e) {
                        return _this5.handleInputChange('billing', e);
                      } })
                  ),
                  React.createElement(
                    'div',
                    { className: 'two' },
                    'country*',
                    React.createElement('br', null),
                    React.createElement(
                      'select',
                      { value: 'USA',
                        onChange: function onChange(e) {
                          return _this5.handleInputChange('billing', e);
                        } },
                      React.createElement(
                        'option',
                        {
                          value: 'USA' },
                        'USA'
                      )
                    )
                  )
                ),
                React.createElement('input', { type: 'submit', style: { display: "none" } })
              ),
              this.state.invalidBillingAddressError ? React.createElement(
                'span',
                null,
                'The billing address you entered is invalid. Please try again.'
              ) : React.createElement('span', null)
            ) : null
          ) : // PAYMENT
          React.createElement(
            'div',
            { className: 'payAndVerifyMobile' },
            React.createElement(Payment, {
              amount: this.getTotal(),
              cart: this.props.cart,
              shipData: this.state.ship,
              billData: this.state.sameAddress ? null : this.state.bill,
              finalClick: this.state.finalClick,
              flipFinalClick: function flipFinalClick() {
                return _this5.setState({ finalClick: false });
              },
              setPaymentLoaded: this.setPaymentLoaded.bind(this),
              handlePaymentSuccess: this.handlePaymentSuccess,
              handlePaymentFailure: this.handlePaymentFailure })
          )
        ),
        React.createElement(
          'div',
          { className: 'summary' },
          this.props.mode != 'shipping' ? React.createElement(
            'div',
            null,
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
            )
          ) : null,
          React.createElement(
            'button',
            { type: 'button',
              ref: this.buttonRef,
              onClick: function onClick(e) {
                return _this5.props.mode == 'shipping' ? _this5.handleSubmit(e) : _this5.handlePaymentSubmit();
              } },
            this.props.mode == 'shipping' ? "CONTINUE TO PAYMENT" : 'CONFIRM ORDER'
          )
        ),
        this.props.mode != 'shipping' ? React.createElement(
          'div',
          { className: 'shippingVerification' },
          React.createElement(
            'div',
            { className: 'title first' },
            'Email'
          ),
          React.createElement(
            'div',
            { className: 'bit' },
            this.state.ship.email
          ),
          React.createElement(
            'div',
            { className: 'title second' },
            this.state.sameAddress ? 'Address' : 'Shipping Address'
          ),
          React.createElement(
            'div',
            { className: 'bit' },
            this.state.ship.firstName + ' ' + this.state.ship.lastName
          ),
          React.createElement(
            'div',
            { className: 'bit' },
            this.state.ship.street1 + ', ' + this.state.ship.street2
          ),
          React.createElement(
            'div',
            { className: 'bit' },
            this.state.ship.city + ', ' + this.state.ship.state + ' ' + this.state.ship.zip5 + ' ' + this.state.ship.country
          ),
          !this.state.sameAddress ? React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'title third' },
              this.state.sameAddress ? null : 'Billing Address'
            ),
            React.createElement(
              'div',
              { className: 'bit' },
              this.state.bill.firstName + ' ' + this.state.bill.lastName
            ),
            React.createElement(
              'div',
              { className: 'bit' },
              this.state.bill.street1 + ', ' + this.state.bill.street2
            ),
            React.createElement(
              'div',
              { className: 'bit' },
              this.state.bill.city + ', ' + this.state.bill.state + ' ' + this.state.bill.zip5 + ' ' + this.state.bill.country
            )
          ) : null,
          React.createElement(
            'div',
            {
              id: 'badAddressBack',
              onClick: this.goBack
            },
            '\u2190 go back if this is wrong'
          )
        ) : null
      );
    }
  }]);

  return MobileCheckout;
}(React.Component);

export default MobileCheckout;