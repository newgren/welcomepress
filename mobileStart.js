'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var x, y;
var tailLength = 45;
var timeout = null;
var interval = null;
var mousemoveHandler = null;

var MobileStart = function (_React$Component) {
  _inherits(MobileStart, _React$Component);

  function MobileStart(props) {
    _classCallCheck(this, MobileStart);

    var _this = _possibleConstructorReturn(this, (MobileStart.__proto__ || Object.getPrototypeOf(MobileStart)).call(this, props));

    _this.goToHome = props.goToHome;
    return _this;
  }

  _createClass(MobileStart, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('mousemove', mousemoveHandler, false);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var element = this.refs.elem;

      // thing.style.left = (x - (thing.offsetWidth/4)) + "px";
      // thing.style.top = (y - 825 - (thing.offsetHeight/4)) + "px";

      var ball = document.getElementById('press');
      var garden = document.getElementById('home');
      var output = document.getElementById('output');

      var maxX = garden.clientWidth - ball.clientWidth;
      var maxY = garden.clientHeight - ball.clientHeight;

      function handleOrientation(event) {
        var x = event.beta; // In degree in the range [-180,180]
        var y = event.gamma; // In degree in the range [-90,90]

        output.innerHTML = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x > 90) {
          x = 90;
        };
        if (x < -90) {
          x = -90;
        };

        // To make computation easier we shift the range of
        // x and y to [0,180]
        x += 90;
        y += 90;

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.top = maxX * x / 180 - 10 + "px";
        ball.style.left = maxY * y / 180 - 10 + "px";
      }

      window.addEventListener('deviceorientation', handleOrientation);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { id: 'home', className: 'home', onClick: function onClick() {
            return _this2.goToHome();
          } },
        React.createElement(
          'div',
          { className: 'home center' },
          React.createElement(
            'div',
            { className: 'welcome' },
            React.createElement(
              'svg',
              { viewBox: '0 0 417 60' },
              React.createElement(
                'text',
                { y: '57' },
                'WELCOME'
              )
            )
          )
        ),
        React.createElement(
          'svg',
          { viewBox: '0 0 417 60', id: 'press' },
          React.createElement(
            'text',
            { y: '57' },
            'PRESS'
          )
        ),
        React.createElement('pre', { id: 'output' })
      );
    }
  }]);

  return MobileStart;
}(React.Component);

export default MobileStart;