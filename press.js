'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

import Start from './start.js';
import Home from './home.js';
import Shop from './shop.js';
import Completed from './completed.js';

import MobileStart from './mobileStart.js';
import MobileShop from './mobileShop.js';
import MobileBag from './mobileBag.js';

var Press = function (_React$Component) {
  _inherits(Press, _React$Component);

  function Press(props) {
    _classCallCheck(this, Press);

    var _this = _possibleConstructorReturn(this, (Press.__proto__ || Object.getPrototypeOf(Press)).call(this, props));

    _this.state = {
      mode: 'start', // start | home | shop | completed
      homeEntered: 'false',
      windowWidth: 0
    };
    return _this;
  }

  _createClass(Press, [{
    key: 'isMobile',
    value: function isMobile() {
      return this.state.width < 650;
    }
  }, {
    key: 'updateWidth',
    value: function updateWidth() {
      this.setState({ windowWidth: window.innerWidth });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateWidth();
      window.addEventListener('resize', this.updateWidth.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateWidth.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.windowWidth < 650) {
        switch (this.state.mode) {
          case 'start':
            return React.createElement(MobileStart, null);
            break;
          case 'shop':
            return React.createElement(MobileShop, null);
            break;
          default:
            return React.createElement(MobileStart, null);
        }
      } else {
        switch (this.state.mode) {
          case 'start':
            return React.createElement(Start, { goToHome: function goToHome() {
                return _this2.setState({ 'mode': 'home' });
              } });
            break;
          case 'shop':
            return React.createElement(Shop, { goToBag: function goToBag() {
                return _this2.setState({ mode: 'bag' });
              },
              goToHome: function goToHome() {
                return _this2.setState({ mode: 'home' });
              },
              goToCompleted: function goToCompleted() {
                return _this2.setState({ mode: 'completed' });
              } });
            break;
          case 'completed':
            return React.createElement(Completed, { goToHome: function goToHome() {
                return _this2.setState({ mode: 'home' });
              } });
            break;
          case 'home':
          default:
            //default to home
            return React.createElement(Home, { goToShop: function goToShop() {
                return _this2.setState({ mode: 'shop' });
              } });
        }
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