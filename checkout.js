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
  invalidBillingAddressError: false,
  invalidEmailAddressError: false,
  shippingInfoIsValidated: false,
  sameAddress: true,
  finalClick: false,
  buttonEnabled: true,
  scrolledForUser: false,
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

var Checkout = function (_React$Component) {
  _inherits(Checkout, _React$Component);

  function Checkout(props) {
    _classCallCheck(this, Checkout);

    var _this = _possibleConstructorReturn(this, (Checkout.__proto__ || Object.getPrototypeOf(Checkout)).call(this, props));

    _this.cart = props.cart;
    _this.remove = props.remove;
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handlePaymentSuccess = _this.handlePaymentSuccess.bind(_this);
    _this.mode = props.mode; // 'shipping' | 'payment'
    _this.setCheckoutMode = props.setMode;
    _this.completeCheckout = props.completeCheckout;
    _this.goBack = props.goBack;
    _this.state = state;
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
      var num = this.props.getCartSize();
      if (num === 1) {
        return 2.05;
      }
      if (num === 2) {
        return 3.31;
      }
      if (num === 3) {
        return 4.05;
      }
      if (num > 3 && num < 7) {
        return 6.05;
      }
      return 8.00;
      //   let pounds = 0;
      //   let ounces = 6;
      //   let userid = "711WELCO2258"; //"[userid]";
      //   let url = "http://production.shippingapis.com/ShippingAPI.dll?\
      // API=RateV4&XML=<RateV4Request USERID=\"" + userid + "\">\
      // <Revision>2</Revision>\
      // <RateClientType>025</RateClientType>\
      // <Package ID=\"0\"><Service>FIRST CLASS</Service>\
      // <FirstClassMailType>FLAT</FirstClassMailType>\
      // <ZipOrigination>61801</ZipOrigination>\
      // <ZipDestination>04019</ZipDestination>\
      // <Pounds>0</Pounds>\
      // <Ounces>6</Ounces>\
      // <Container/>\
      // <Size>REGULAR</Size>\
      // <Machinable>true</Machinable>\
      // </Package>\
      // </RateV4Request>";
      //
      // url = 'http://production.shippingapis.com/ShippingAPI.dll?' +
      // encodeURIComponent('API=RateV4&XML=<RateV4Request USERID="711WELCO2258">\
      //   <Revision>2</Revision>\
      //   <Package ID="1ST">\
      //     <Service>FIRST CLASS</Service><FirstClassMailType>LETTER</FirstClassMailType>\
      //       <ZipOrigination>61801</ZipOrigination><ZipDestination>94020</ZipDestination>\
      //         <Pounds>0</Pounds><Ounces>6</Ounces><Container/><Size>REGULAR</Size><Machinable>true</Machinable>\
      //         </Package></RateV4Request>');
      //   console.log(String(url));
      //   const http = new XMLHttpRequest();
      //   http.open("GET", url);
      //   //http.setRequestHeader("Access-Control-Allow-Origin", "*");
      //   // Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      //   http.send();
      //   http.onreadystatechange = (e) => {
      //     if(http.readyState === 4 && http.status === 200) {
      //       console.log('RESPONSE');
      //       console.log(http.responseText);
      //     }
      //   }
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
          ga('send', {
            hitType: 'event',
            eventCategory: 'product',
            eventAction: 'initPaymentDetails',
            eventLabel: 'desktop'
          });
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
    key: 'handlePaymentSubmit',
    value: function handlePaymentSubmit() {
      this.setState({ finalClick: true });
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
    key: 'setButtonEnabled',
    value: function setButtonEnabled(val) {
      console.log("ok");
      this.setState({ buttonEnabled: val });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.mode == 'payment' && prevProps.mode != 'payment') {
        this.setState({ buttonEnabled: false });
      }
      if (!this.state.scrolledForUser && this.state.invalidBillingAddressError) {
        this.setState({ scrolledForUser: true });
        var scrollLeft = document.getElementById('scrollLeft');
        scrollLeft.scrollTop = scrollLeft.scrollHeight;
      }
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
      var _this4 = this;

      var isEnabled = this.state.buttonEnabled;
      return React.createElement(
        'div',
        { className: 'checkout' },
        React.createElement(
          'div',
          { className: 'left', id: 'scrollLeft' },
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
                    return _this4.handleInputChange('shipping', e);
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
                        return _this4.handleInputChange('shipping', e);
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
                        return _this4.handleInputChange('shipping', e);
                      } })
                  )
                ),
                'street address*',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street1',
                  value: this.state.ship.street1,
                  onChange: function onChange(e) {
                    return _this4.handleInputChange('shipping', e);
                  } }),
                React.createElement('br', null),
                'address 2',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street2',
                  value: this.state.ship.street2,
                  onChange: function onChange(e) {
                    return _this4.handleInputChange('shipping', e);
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
                        return _this4.handleInputChange('shipping', e);
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
                        return _this4.handleInputChange('shipping', e);
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
                        return _this4.handleInputChange('shipping', e);
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
                          return _this4.handleInputChange('shipping', e);
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
                        return _this4.handleInputChange('billing', e);
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
                        return _this4.handleInputChange('billing', e);
                      } })
                  )
                ),
                'street address*',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street1',
                  value: this.state.bill.street1,
                  onChange: function onChange(e) {
                    return _this4.handleInputChange('billing', e);
                  } }),
                React.createElement('br', null),
                'address 2',
                React.createElement('br', null),
                React.createElement('input', { type: 'text', name: 'street2',
                  value: this.state.bill.street2,
                  onChange: function onChange(e) {
                    return _this4.handleInputChange('billing', e);
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
                        return _this4.handleInputChange('billing', e);
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
                        return _this4.handleInputChange('billing', e);
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
                        return _this4.handleInputChange('billing', e);
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
                          return _this4.handleInputChange('billing', e);
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
            { className: 'payAndVerify' },
            React.createElement(
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
              Object.keys(this.state.ship).map(function (a) {
                return _this4.state.ship[a] && a != 'email' ? React.createElement(
                  'div',
                  { key: a, className: 'bit' },
                  _this4.state.ship[a]
                ) : null;
              }),
              React.createElement(
                'div',
                { className: 'title third' },
                this.state.sameAddress ? null : 'Billing Address'
              ),
              !this.state.sameAddress ? Object.keys(this.state.bill).map(function (a) {
                return _this4.state.bill[a] ? React.createElement(
                  'div',
                  { key: a, className: 'bit' },
                  _this4.state.bill[a]
                ) : null;
              }) : null,
              React.createElement(
                'div',
                {
                  id: 'badAddressBack',
                  onClick: this.goBack
                },
                '\u2190 go back if this is wrong'
              )
            ),
            React.createElement(Payment, {
              parentType: 'checkout',
              amount: this.getTotal(),
              cart: this.props.cart,
              shipData: this.state.ship,
              billData: this.state.sameAddress ? null : this.state.bill,
              buttonEnabled: this.state.buttonEnabled,
              setButtonEnabled: this.setButtonEnabled.bind(this),
              handlePaymentSuccess: this.handlePaymentSuccess,
              handlePaymentFailure: this.handlePaymentFailure,
              finalClick: this.state.finalClick,
              flipFinalClick: function flipFinalClick() {
                return _this4.setState({ finalClick: false });
              } })
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
              disabled: !isEnabled,
              onClick: function onClick(e) {
                return _this4.props.mode == 'shipping' ? _this4.handleSubmit(e) : _this4.handlePaymentSubmit();
              } },
            this.props.mode == 'shipping' ? "CONTINUE TO PAYMENT" : 'CONFIRM ORDER'
          )
        )
      );
    }
  }]);

  return Checkout;
}(React.Component);

export default Checkout;