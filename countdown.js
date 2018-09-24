'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

var countDown = new Date('Sep 28, 2018 23:59:59').getTime(),
    x = setInterval(function () {

  var now = new Date().getTime(),
      distance = countDown - now;

  document.getElementById('days').innerText = Math.floor(distance / day), document.getElementById('hours').innerText = Math.floor(distance % day / hour), document.getElementById('minutes').innerText = Math.floor(distance % hour / minute), document.getElementById('seconds').innerText = Math.floor(distance % minute / second);

  //do something later when date is reached
  //if (distance < 0) {
  //  clearInterval(x);
  //  'IT'S MY BIRTHDAY!;
  //}
}, second);

var Countdown = function (_React$Component) {
  _inherits(Countdown, _React$Component);

  function Countdown(props) {
    _classCallCheck(this, Countdown);

    return _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, props));
  }

  _createClass(Countdown, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            null,
            React.createElement('span', { id: 'days' }),
            'days'
          ),
          React.createElement(
            'li',
            null,
            React.createElement('span', { id: 'hours' }),
            'Hours'
          ),
          React.createElement(
            'li',
            null,
            React.createElement('span', { id: 'minutes' }),
            'Minutes'
          ),
          React.createElement(
            'li',
            null,
            React.createElement('span', { id: 'seconds' }),
            'Seconds'
          )
        )
      );
    }
  }]);

  return Countdown;
}(React.Component);

export default Countdown;