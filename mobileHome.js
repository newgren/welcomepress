'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var numWorkCopies = 40;
var numShopTextCopies = 60;
var numMarkCopies = 35;
var numInfoCopies = 40;

var infoBlurb = 'we are an independent front-end design shop located in Urbana, IL. we also make shirts.';

// TODO: conditionally render image only for top layer of chchchch

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = {
      needToOpen: true
    };
    _this.goToShop = props.goToShop;
    _this.goToWork = props.goToWork;
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

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

      //do chchch animations and init hovers
      var workCopies = document.getElementsByClassName('work layer');
      chchch(workCopies, 20);
      var shopTextCopies = document.getElementsByClassName('shopText layer');
      chchch(shopTextCopies, 20);
      var markCopies = document.getElementsByClassName('mark layer');
      chchch(markCopies, 20);

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
      };

      var mark = document.getElementById('mark0');
      var infos = document.getElementsByClassName('info layer');
      var masterIndex = { val: infos.length - 1 };
      mark.onclick = function () {
        move(infos, masterIndex, _this2.state.needToOpen);
        _this2.setState({ needToOpen: !_this2.state.needToOpen });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'home' },
        React.createElement(
          'div',
          { id: 'leftStacked' },
          React.createElement('img', { src: './iconImages/leftStacked.png' })
        ),
        React.createElement(
          'div',
          { className: 'homeDesktop', id: 'homeDesktop' },
          Array.apply(null, Array(numWorkCopies)).map(function (i, j) {
            return React.createElement(
              'div',
              {
                id: 'work' + j,
                key: j,
                className: 'work layer',
                onClick: _this3.goToWork,
                style: {
                  transform: 'translate(' + -j * 0.7 + 'vh, ' + -j * 1.4 + 'vw)',
                  zIndex: -j
                } },
              React.createElement('img', { src: './iconImages/work_mobile.png' })
            );
          }),
          Array.apply(null, Array(numShopTextCopies)).map(function (i, j) {
            return React.createElement(
              'div',
              {
                id: 'shopText' + j,
                key: j,
                className: 'shopText layer',
                onClick: _this3.goToShop,
                style: { transform: 'translate(' + j * 0.7 + 'vh, ' + j * 1.4 + 'vw)',
                  zIndex: -j } },
              React.createElement('img', { src: './iconImages/shop_mobile.png' })
            );
          }),
          Array.apply(null, Array(numMarkCopies)).map(function (i, j) {
            return React.createElement(
              'div',
              {
                id: 'mark' + j,
                key: j,
                className: 'mark layer',
                style: { transform: 'translate(' + -j * 1.3 + 'vw, ' + j * 0.8 + 'vh)',
                  zIndex: -j } },
              React.createElement('img', { src: './iconImages/mark_mobile.png' })
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
                style: { transform: 'translate(' + -j * 1.3 + 'vw, ' + j * 0.8 + 'vh)',
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
      );
    }
  }]);

  return Home;
}(React.Component);

export default Home;