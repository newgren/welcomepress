'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

import Home from './home.js';
import Shop from './shop.js';
import Bag from './bag.js';

var Press = function (_React$Component) {
  _inherits(Press, _React$Component);

  function Press(props) {
    _classCallCheck(this, Press);

    var _this = _possibleConstructorReturn(this, (Press.__proto__ || Object.getPrototypeOf(Press)).call(this, props));

    _this.state = {
      mode: 'shop'
    };
    return _this;
  }

  _createClass(Press, [{
    key: 'handleClick',
    value: function handleClick(link) {
      this.setState({ mode: link });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      window.onload = function () {
        return alert(window.innerWidth > 0 ? window.innerWidth : screen.width);
      };
      switch (this.state.mode) {
        case 'shop':
          return React.createElement(Shop, { goToBag: function goToBag() {
              return _this2.handleClick('bag');
            } });
          break;
        default:
          //default to home
          return React.createElement(Home, { onclick: function onclick() {
              return _this2.handleClick('shop');
            } });
      }
      /*
      if (this.state.liked) {
        return 'You liked this.';
      }
       return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Press'
      );
      */
    }
  }]);

  return Press;
}(React.Component);

var domContainer = document.querySelector('#press_container');
ReactDOM.render(e(Press), domContainer);