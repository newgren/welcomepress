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
      var animationIsActive = false;
      var framesPerSecond = 60;
      var stutterIntervalDelay = Math.round(1000 / framesPerSecond);

      var i = 0;
      var z = 0;

      var startLaggyAnimation = function startLaggyAnimation() {
        return window.setInterval(function () {
          console.log('go');
          i = (i + 1) % tailLength;
          i = i === 0 ? 1 : i;
          var thing = document.getElementById('n' + i);
          thing.style.left = x + "px";
          thing.style.top = y + "px";
          thing.style.zIndex = z++;
        }, Math.floor(stutterIntervalDelay));
      };
      // thing.style.left = (x - (thing.offsetWidth/4)) + "px";
      // thing.style.top = (y - 825 - (thing.offsetHeight/4)) + "px";

      var ball = document.getElementById('n0');
      var ballHeight = ball.clientHeight;
      var ballWidth = ballHeight * 4.417519909;

      var garden = document.getElementById('mobileStart');
      var output = document.getElementById('output');

      var maxGamma = garden.clientWidth - ballWidth;
      var maxBeta = garden.clientHeight - ball.clientHeight;
      var maxTilt = 30; // max tilt magnitude
      var startBeta = null;

      function handleOrientation(event) {
        if (!startBeta) {
          startBeta = event.beta;
        }
        var gamma = event.gamma; // In degree in the range [-180,180]
        var beta = event.beta - startBeta; // In degree in the range [-90,90]

        // Because we don't want to have the device upside down
        // We constrain the x value to a range
        if (gamma > maxTilt) {
          gamma = maxTilt;
        };
        if (gamma < -maxTilt) {
          gamma = -maxTilt;
        };
        if (beta > maxTilt) {
          beta = maxTilt;
        };
        if (beta < -maxTilt) {
          beta = -maxTilt;
        };

        // To make computation easier we shift the range of
        // x and y to [0,180]
        gamma += maxTilt;
        beta += maxTilt;

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        y = maxBeta * beta / (maxTilt * 2);
        x = maxGamma * gamma / (maxTilt * 2);

        output.innerHTML = "x : " + x + "\n";
        output.innerHTML += "y: " + y + "\n";
      }

      window.addEventListener('deviceorientation', handleOrientation);
      startLaggyAnimation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { id: 'mobileStart', onClick: function onClick() {
            return _this2.goToHome();
          } },
        React.createElement(
          'div',
          { className: 'center' },
          React.createElement(
            'div',
            { id: 'welcome' },
            React.createElement(
              'svg',
              { viewBox: '0 0 417 60' },
              React.createElement(
                'text',
                { id: 'welcomeText', y: '57' },
                'WELCOME'
              )
            )
          )
        ),
        Array.apply(null, Array(tailLength)).map(function (i, j) {
          return React.createElement(
            'div',
            { id: 'n' + j, key: j, className: 'press', ref: j === 0 ? 'elem' : '' },
            React.createElement(
              'svg',
              { id: 'pressText', viewBox: '0 0 417 60' },
              React.createElement(
                'text',
                { y: '57' },
                'PRESS'
              )
            )
          );
        }),
        React.createElement('pre', { id: 'output' })
      );
    }
  }]);

  return MobileStart;
}(React.Component);

export default MobileStart;