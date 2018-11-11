'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

import Start from './start.js';
import Home from './home.js';
import Work from './work.js';
import Shop from './shop.js';
import Completed from './completed.js';

import MobileStart from './mobileStart.js';
import MobileShop from './mobileShop.js';
import MobileHome from './mobileHome.js';
import MobileWork from './mobileWork.js';
import MobileBag from './mobileBag.js';

var Press = function (_React$Component) {
  _inherits(Press, _React$Component);

  function Press(props) {
    _classCallCheck(this, Press);

    var _this = _possibleConstructorReturn(this, (Press.__proto__ || Object.getPrototypeOf(Press)).call(this, props));

    _this.changeMode = _this.changeMode.bind(_this);
    _this.state = {
      mode: 'start', // start | home | work | shop | completed
      homeEntered: 'false',
      windowWidth: null,
      routed: false
    };
    return _this;
  }

  _createClass(Press, [{
    key: 'isMobile',
    value: function isMobile() {
      return this.state.windowWidth < 650;
    }
  }, {
    key: 'updateWidth',
    value: function updateWidth() {
      this.setState({ windowWidth: window.innerWidth });
    }
  }, {
    key: 'changeMode',
    value: function changeMode(newMode) {
      var oldMode = this.state.mode;
      this.setState({ mode: newMode });
      ga('send', {
        hitType: 'event',
        eventCategory: 'mode',
        eventAction: oldMode + '-' + newMode,
        eventLabel: this.isMobile ? 'mobile' : 'desktop'
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateWidth();
      window.addEventListener('resize', this.updateWidth.bind(this));
      if (!this.state.routed && window.location.href.includes('shop')) {
        this.setState({ routed: true, mode: 'shop' });
      }
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

      if (!this.state.windowWidth) {
        // wait for state update (render will be called again)
        return null;
      }

      if (this.isMobile()) {
        console.log("mobile");
        switch (this.state.mode) {
          case 'start':
            return React.createElement(MobileStart, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              } });
            break;
          case 'work':
            return React.createElement(MobileWork, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              } });
            break;
          case 'shop':
            return React.createElement(MobileShop, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              },
              goToCompleted: function goToCompleted() {
                return _this2.changeMode('completed');
              },
              forceProduct: this.state.routed });
            break;
          case 'completed':
            return React.createElement(Completed, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              } });
            break;
          default:
            return React.createElement(MobileHome, { goToShop: function goToShop() {
                return _this2.changeMode('shop');
              },
              goToWork: function goToWork() {
                return _this2.changeMode('work');
              } });
        }
      } else {
        console.log("desktop");
        switch (this.state.mode) {
          case 'start':
            return React.createElement(Start, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              } });
            break;
          case 'work':
            return React.createElement(Work, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              } });
          case 'shop':
            return React.createElement(Shop, { goToBag: function goToBag() {
                return _this2.changeMode('bag');
              },
              goToHome: function goToHome() {
                return _this2.changeMode('home');
              },
              goToCompleted: function goToCompleted() {
                return _this2.changeMode('completed');
              },
              forceProduct: this.state.routed });
            break;
          case 'completed':
            return React.createElement(Completed, { goToHome: function goToHome() {
                return _this2.changeMode('home');
              } });
            break;
          case 'home':
          default:
            //default to home
            return React.createElement(Home, { goToShop: function goToShop() {
                return _this2.changeMode('shop');
              },
              goToWork: function goToWork() {
                return _this2.changeMode('work');
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