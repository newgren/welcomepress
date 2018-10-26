'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var server = 'welcomepresspayment.tk';
var port = '443';
var dropinInstance;

var Payment = function (_React$Component) {
  _inherits(Payment, _React$Component);

  function Payment(props) {
    _classCallCheck(this, Payment);

    var _this = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this, props));

    _this.amount = props.amount;
    _this.data = props.data;
    _this.buttonRef = props.buttonRef;
    _this.handlePaymentSuccess = props.handlePaymentSuccess;
    _this.handlePaymentFailure = props.handlePaymentFailure;

    return _this;
  }

  _createClass(Payment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      braintree.dropin.create({
        authorization: 'sandbox_48psd8gz_36dbhbmvhvv9cpjd',
        container: '#dropin-container',
        paypal: {
          flow: 'vault'
        },
        venmo: {}
      }, function (err, instance) {
        if (err) {
          // Handle any errors that might've occurred when creating Drop-in
          console.error(err);
          return;
        }
        dropinInstance = instance;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var submitButton = this.buttonRef.current;
      submitButton.addEventListener('click', function () {
        dropinInstance.requestPaymentMethod(function (err, payload) {
          if (err) {
            // Handle errors in requesting payment method
            console.log("requestPaymentMethodError: " + err);
          }

          // Send payload.nonce to your server
          var params = {
            amount: _this2.amount,
            nonce: payload.nonce,
            email: _this2.data.email,
            firstName: _this2.data.firstName,
            lastName: _this2.data.lastName,
            street1: _this2.data.street1,
            street2: _this2.data.street2,
            city: _this2.data.city,
            state: _this2.data.state,
            zip5: _this2.data.zip5,
            country: _this2.data.country
            //let params = payload.nonce;
          };console.log(params);

          var req = new XMLHttpRequest();
          var url = 'https://' + server + ':' + port + '/checkout';
          req.open("POST", url);
          // req.setRequestHeader("Access-Control-Allow-Origin", "*");
          // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          req.send(JSON.stringify(params));
          req.onreadystatechange = function (e) {
            if (req.readyState === 4) {
              if (req.status === 200) {
                console.log('GOOD transaction');
                _this2.handlePaymentSuccess();
              } else {
                _this2.handlePaymentFailure();
                console.log('BAD transaction');
              }
            }
          };
        });
      });
      return React.createElement(
        'div',
        { className: 'payment' },
        React.createElement('div', { id: 'dropin-container' })
      );
    }
  }]);

  return Payment;
}(React.Component);

export default Payment;