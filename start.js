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

var numCopies = 25;

var Start = function (_React$Component) {
  _inherits(Start, _React$Component);

  function Start(props) {
    _classCallCheck(this, Start);

    var _this = _possibleConstructorReturn(this, (Start.__proto__ || Object.getPrototypeOf(Start)).call(this, props));

    _this.goToHome = props.goToHome;
    return _this;
  }

  _createClass(Start, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('mousemove', mousemoveHandler, false);
    }
  }, {
    key: 'getHeight',
    value: function getHeight(element) {
      element.style.visibility = "hidden";
      document.body.appendChild(element);
      var height = element.offsetHeight + 0;
      document.body.removeChild(element);
      element.style.visibility = "visible";
      return height;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var element = this.refs.elem;
      var whole = document.getElementById('start');

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
          thing.style.left = x - thing.offsetWidth / 4 + "px";
          thing.style.top = y - whole.offsetHeight - thing.offsetHeight / 4 + "px";
          thing.style.zIndex = z++;
        }, Math.floor(stutterIntervalDelay));
      };

      timeout = null; // id of timeout callback to cancel animation
      interval = null; // id of interval callback to animate
      var reference = document.getElementById('n1');
      mousemoveHandler = function mousemoveHandler(event) {
        window.clearTimeout(timeout);
        if (!animationIsActive) {
          interval = startLaggyAnimation();
          animationIsActive = true;
        }
        x = event.clientX;
        y = event.clientY;
        if (typeof x !== 'undefined') {
          element.style.left = x - reference.offsetWidth / 4 + "px";
          element.style.top = y - whole.offsetHeight + "px";
        }
        timeout = setTimeout(function () {
          clearInterval(interval);
          animationIsActive = false;
        }, stutterIntervalDelay * tailLength * 2);
      };

      window.addEventListener('mousemove', mousemoveHandler, false);

      var chchch = function chchch(copies, duration) {
        var copyIndex = copies.length - 1;
        var intervalPointer = window.setInterval(function () {
          if (copyIndex < 0) {
            clearInterval(intervalPointer);
            return;
          }
          copies[copyIndex--].style.display = 'inline-flex';
        }, duration);
      };
      var enterCopies = document.getElementsByClassName('enterText layer');
      window.setTimeout(function () {
        return chchch(enterCopies, 20);
      }, 5000);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'start', onClick: function onClick() {
            ga('send', {
              hitType: 'event',
              eventCategory: 'clicks',
              eventAction: 'start',
              eventLabel: 'desktop'
            });
            _this2.goToHome();
          }, id: 'start' },
        React.createElement('div', { className: 'blackbar' }),
        React.createElement('div', { className: 'blackbar' }),
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
                { y: '57' },
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
              'div',
              { id: 'press' },
              React.createElement(
                'svg',
                { viewBox: '0 0 417 60' },
                React.createElement(
                  'text',
                  { y: '57' },
                  'PRESS'
                )
              )
            )
          );
        }),
        Array.apply(null, Array(numCopies)).map(function (i, j) {
          return React.createElement(
            'div',
            {
              id: 'enterText' + j,
              key: j,
              className: 'enterText layer',
              onClick: _this2.goToHome,
              style: { transform: 'translate(' + -j + 'vw, ' + j * 1.5 + 'vh)',
                zIndex: -j } },
            React.createElement(
              'span',
              null,
              'click to enter \u2192'
            )
          );
        })
      );
    }
  }]);

  return Start;
}(React.Component);

export default Start;