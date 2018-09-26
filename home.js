'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var entered = false;
var x, y;
var tailLength = 45;

// enter site

//TODO: swap two lines below
document.onclick = function () {
  //window.onload = () => {
  entered = true;
  var presses = document.getElementsByClassName('press');
  for (var i = 0; i < presses.length; i++) {
    if (presses[i].id !== 'nodelete') {
      presses[i].style.display = 'none';
    }
  }
  document.getElementsByClassName('over')[0].className = 'over entered';
};

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.onclick = props.onclick;
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // let isDesktop = () => {
      //   console.log(document.getElementById('homeMobile').style);
      //   document.getElementById('homeDesktop').style.display !== 'none';
      // }


      var element = this.refs.elem;
      var animationIsActive = false;
      var framesPerSecond = 60;
      var intervalDelay = Math.round(1000 / framesPerSecond);
      //let lagTailLength = 5;

      var i = 0;
      var z = 0;

      // if(!isDesktop()) {
      //   return;
      // }

      var startAnimation = function startAnimation() {
        return window.setInterval(function () {
          console.log('go');
          i = (i + 1) % tailLength;
          i = i === 0 ? 1 : i;
          var thing = document.getElementById('n' + i);
          thing.style.left = x - thing.offsetWidth / 4 + "px";
          thing.style.top = y - 825 - thing.offsetHeight / 4 + "px";
          thing.style.zIndex = z++;
        }, Math.floor(intervalDelay));
      };
      var timeout = null; // id of timeout callback to cancel animation
      var interval = null; // id of interval callback to animate
      window.addEventListener('mousemove', function (event) {
        window.clearTimeout(timeout);
        if (!animationIsActive && !entered) {
          interval = startAnimation();
          animationIsActive = true;
        }
        x = event.clientX;
        y = event.clientY;
        if (typeof x !== 'undefined') {
          element.style.left = x - element.offsetWidth / 4 + "px";
          element.style.top = y - 825 - element.offsetHeight / 4 + "px";
        }
        timeout = setTimeout(function () {
          clearInterval(interval);
          animationIsActive = false;
        }, intervalDelay * tailLength * 2);
      }, false);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'home' },
        React.createElement(
          'div',
          { className: 'homeDesktop', id: 'homeDesktop' },
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
          Array.apply(null, Array(tailLength)).map(function (i, j) {
            return React.createElement(
              'div',
              { id: 'n' + j, key: j, className: 'press', ref: j === 0 ? 'elem' : '' },
              React.createElement(
                'svg',
                { viewBox: '0 0 417 60' },
                React.createElement(
                  'text',
                  { y: '57' },
                  'PRESS'
                )
              )
            );
          }),
          React.createElement(
            'div',
            { className: 'over' },
            React.createElement(
              'div',
              { className: 'left' },
              React.createElement(
                'div',
                { className: 'welcome rot' },
                React.createElement(
                  'svg',
                  { viewBox: '0 0 417 60' },
                  React.createElement(
                    'text',
                    { y: '57' },
                    'WELCOME'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'press rot', id: 'nodelete' },
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
            ),
            React.createElement(
              'div',
              { className: 'right' },
              React.createElement(
                'div',
                { className: 'top' },
                React.createElement(
                  'svg',
                  { viewBox: '0 0 417 60' },
                  React.createElement(
                    'text',
                    { x: '50%', y: '50%', alignmentBaseline: 'middle', textAnchor: 'middle' },
                    'WORK'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'bottom' },
                React.createElement(
                  'svg',
                  { viewBox: '0 0 417 60' },
                  React.createElement(
                    'text',
                    { x: '50%', y: '50%', alignmentBaseline: 'middle', textAnchor: 'middle' },
                    'SHOP'
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'homeMobile', id: 'homeMobile', ref: 'homeMobile' },
          React.createElement(
            'div',
            { className: 'homeBox' },
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
            ),
            React.createElement(
              'div',
              { className: 'press' },
              React.createElement(
                'svg',
                { viewBox: '0 0 417 60' },
                React.createElement(
                  'text',
                  { y: '57' },
                  'PRESS'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'questionBox' },
              React.createElement(
                'span',
                null,
                '?'
              )
            )
          ),
          React.createElement('div', { className: 'square', id: 'work' }),
          React.createElement('div', { className: 'square', id: 'shop' })
        )
      );
    }
  }]);

  return Home;
}(React.Component);

export default Home;