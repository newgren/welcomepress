'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var entered = false;
var x, y;
var tailLength = 45;

var numWorkCopies = 24;
var numShopTextCopies = 29;
var numMarkCopies = 20;
var numInfoCopies = 30;

var infoBlurb = 'we are an independent front-end design shop located in Urbana, IL. we also make shirts.';

// enter site

//TODO: swap two lines below
document.onclick = function () {
  // window.onload = () => {
  entered = true;
  var presses = document.getElementsByClassName('press');
  for (var i = 0; i < presses.length; i++) {
    if (presses[i].id !== 'nodelete') {
      presses[i].style.display = 'none';
    }
  }
  document.getElementsByClassName('over')[0].className = 'over entered';

  var chchch = function chchch(copies, duration) {
    var copyIndex = copies.length - 1;
    var intervalPointer = window.setInterval(function () {
      if (copyIndex < 0) {
        clearInterval(intervalPointer);
        return;
      }
      copies[copyIndex--].style.display = 'inherit';
    }, duration);
  };

  var fatherWork = document.getElementById('fatherWork');
  var initWorkShopTextHovers = function initWorkShopTextHovers(copies) {
    var _loop = function _loop(_i) {
      return 'break';
      copies[_i].onmouseover = function () {
        copies[_i].style.backgroundColor = "limegreen";
      };
      copies[_i].onmouseout = function () {
        copies[_i].style.backgroundColor = "";
      };
    };

    for (var _i = 0; _i < copies.length; _i++) {
      var _ret = _loop(_i);

      if (_ret === 'break') break;
    }
  };
  //do chchch animations and init hovers
  var workCopies = document.getElementsByClassName('work layer');
  chchch(workCopies, 20);
  initWorkShopTextHovers(workCopies);
  var shopTextCopies = document.getElementsByClassName('shopText layer');
  chchch(shopTextCopies, 30);
  var markCopies = document.getElementsByClassName('mark layer');
  chchch(markCopies, 40);

  initWorkShopTextHovers(shopTextCopies);

  var marks = document.getElementsByClassName('mark layer');
  var mark = document.getElementById('mark');

  //let lock_over = false;
  //let lock_out = false;

  var move = function move(copies, index, isOver) {
    //isOver ? lock_over = true : lock_out = true;
    var intervalPointer = window.setInterval(function () {
      if ( //(isOver && lock_out) || (!isOver && lock_over) ||
      index.val < 0 || index.val >= copies.length) {
        if (index.val < 0) {
          index.val = 0;
        }
        if (index.val >= copies.length) {
          index.val = copies.length - 1;
        }
        clearInterval(intervalPointer);
        return;
      }
      copies[isOver ? index.val-- : index.val++].style.display = !isOver ? 'none' : 'inherit';
    }, 10);
    //isOver ? lock_over = false : lock_out = false;
  };

  var infos = document.getElementsByClassName('info layer');
  var masterIndex = { val: infos.length - 1 };
  mark.onmouseover = function () {
    console.log('over');
    move(infos, masterIndex, true);
  };
  mark.onmouseout = function () {
    console.log('out');
    move(infos, masterIndex, false);
  };
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
      var stutterIntervalDelay = Math.round(1000 / framesPerSecond);
      //let lagTailLength = 5;

      var i = 0;
      var z = 0;

      // if(!isDesktop()) {
      //   return;
      // }

      var startLaggyAnimation = function startLaggyAnimation() {
        return window.setInterval(function () {
          console.log('go');
          i = (i + 1) % tailLength;
          i = i === 0 ? 1 : i;
          var thing = document.getElementById('n' + i);
          thing.style.left = x - thing.offsetWidth / 4 + "px";
          thing.style.top = y - 825 - thing.offsetHeight / 4 + "px";
          thing.style.zIndex = z++;
        }, Math.floor(stutterIntervalDelay));
      };

      var timeout = null; // id of timeout callback to cancel animation
      var interval = null; // id of interval callback to animate
      window.addEventListener('mousemove', function (event) {
        window.clearTimeout(timeout);
        if (!animationIsActive && !entered) {
          interval = startLaggyAnimation();
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
        }, stutterIntervalDelay * tailLength * 2);
      }, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
            Array.apply(null, Array(numWorkCopies)).map(function (i, j) {
              return React.createElement(
                'div',
                {
                  id: 'work' + j,
                  key: j,
                  className: 'work layer',
                  style: {
                    transform: 'translate(' + -j + 'vw, ' + -j * 1.5 + 'vh)',
                    zIndex: -j
                  } },
                React.createElement(
                  'span',
                  null,
                  'WORK'
                )
              );
            }),
            Array.apply(null, Array(numShopTextCopies)).map(function (i, j) {
              return React.createElement(
                'div',
                {
                  id: 'shopText' + j,
                  key: j,
                  className: 'shopText layer',
                  onClick: _this2.props.onclick,
                  style: { transform: 'translate(' + j + 'vw, ' + j * 1.5 + 'vh)',
                    zIndex: -j } },
                React.createElement(
                  'span',
                  null,
                  'SHOP'
                )
              );
            }),
            Array.apply(null, Array(numMarkCopies)).map(function (i, j) {
              return React.createElement(
                'div',
                {
                  id: 'mark' + j,
                  key: j,
                  className: 'mark layer',
                  style: { transform: 'translate(' + -j + 'vw, ' + j * 1.5 + 'vh)',
                    zIndex: -j } },
                React.createElement(
                  'span',
                  null,
                  '?'
                )
              );
            }),
            React.createElement(
              'div',
              { className: 'mark', id: 'mark' },
              React.createElement(
                'span',
                null,
                '?'
              )
            ),
            Array.apply(null, Array(numInfoCopies)).map(function (i, j) {
              return React.createElement(
                'div',
                {
                  id: 'info' + j,
                  key: j,
                  className: 'info layer',
                  style: { transform: 'translate(' + -j + 'vw, ' + j * 1.5 + 'vh)',
                    zIndex: -j } },
                React.createElement(
                  'span',
                  null,
                  infoBlurb
                ),
                React.createElement('br', null),
                React.createElement(
                  'span',
                  null,
                  React.createElement(
                    'a',
                    { href: 'mailto:hello@welcomepress.xyz' },
                    'hello@welcomepress.xyz'
                  )
                )
              );
            })
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
          React.createElement('div', { className: 'square', id: 'shopText' })
        )
      );
    }
  }]);

  return Home;
}(React.Component);

export default Home;