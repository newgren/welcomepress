'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import MobileItem from './mobileItem.js';
import MobileBag from './mobileBag.js';

import Sidescroll from './sidescroll.js';

import catalog from './product/catalog.js';

var e = React.createElement;

var MobileShop = function (_React$Component) {
  _inherits(MobileShop, _React$Component);

  function MobileShop(props) {
    _classCallCheck(this, MobileShop);

    var _this = _possibleConstructorReturn(this, (MobileShop.__proto__ || Object.getPrototypeOf(MobileShop)).call(this, props));

    _this.goToBag = props.goToBag;
    _this.goToHome = props.goToHome;
    _this.state = {
      mode: 'browse', // 'browse' | 'buy'
      pos: 0,
      sel: -1,
      cart: { 0: { 'L': 1 } }
    };
    return _this;
  }

  _createClass(MobileShop, [{
    key: 'canGoLeft',
    value: function canGoLeft() {
      return this.state.pos < 0;
    }
  }, {
    key: 'canGoRight',
    value: function canGoRight() {
      //TODO: fix this shite
      return this.state.pos > 9 * -400;
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(dir) {
      var pos = this.state.pos;
      switch (dir) {
        case "left":
          this.canGoLeft() ? this.setState({ pos: pos + 400 }) : this.blinkArrow();
          break;
        case "right":
          this.canGoRight() ? this.setState({ pos: pos - 400 }) : this.blinkArrow();
          break;
        default:
      }
    }
  }, {
    key: 'addToCart',
    value: function addToCart(id, size, qty) {
      var cart = this.state.cart;
      if (!(id in cart)) {
        cart[id] = {};
      }
      cart[id][size] = qty + (size in cart[id] ? cart[id][size] : 0);
      this.setState({
        cart: cart,
        mode: 'bag',
        sel: -1
      });
    }
  }, {
    key: 'removeFromCart',
    value: function removeFromCart(index, size) {
      var cart = this.state.cart;
      delete cart[index][size];
      this.setState({ cart: cart });
    }
  }, {
    key: 'getCartSize',
    value: function getCartSize() {
      var cart = this.state.cart;
      var keys = Object.keys(cart);
      var size = 0;
      keys.forEach(function (key) {
        var shirt = cart[key];
        var shirtKeys = Object.keys(shirt);
        shirtKeys.forEach(function (shirtkey) {
          size += shirt[shirtkey];
        });
      });
      return size;
    }

    /**
    * return whether element has ancestor with class=className
    */

  }, {
    key: 'hasParentClass',
    value: function hasParentClass(elem, className) {
      if (elem.className === className) {
        return true;
      }
      while (elem = elem.parentElement) {
        if (elem.className === className) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'handleBack',
    value: function handleBack() {
      // in item, go back to browse
      switch (this.state.mode) {
        case 'item':
          this.setState({ mode: 'browse', sel: -1 });
          break;
        case 'bag':
          this.setState({ mode: 'browse' });
          break;
        case 'browse':
          this.goToHome();
        default:
          return;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'mobileShop' },
        React.createElement(
          'div',
          { className: 'shopLeft' },
          React.createElement(Sidescroll, { mobile: true })
        ),
        React.createElement(
          'div',
          { className: 'shopBox' },
          React.createElement(
            'div',
            { className: 'banner' },
            React.createElement('img', { src: './iconImages/banner_left_desktop.png',
              id: 'leftBannerIcon',
              onClick: function onClick() {
                return _this2.handleBack();
              } }),
            React.createElement('img', { src: './iconImages/SHOP.png', id: 'shopBannerText' })
          ),
          this.state.mode == 'browse' ? catalog.items.map(function (item, id) {
            return React.createElement(
              'div',
              { className: 'itemPreview' },
              React.createElement(
                'div',
                null,
                item.name
              ),
              React.createElement(
                'div',
                null,
                '$',
                item.price
              ),
              React.createElement(
                'div',
                { className: 'imageHolder' },
                React.createElement('img', { src: './product/' + item.image_urls[0] + '.png' })
              )
            );
          }) : React.createElement(MobileBag, { cart: this.state.cart, remove: function remove(index, size) {
              return _this2.removeFromCart(index, size);
            } })
        ),
        React.createElement('div', { className: 'buyBox' })
      );
    }
  }]);

  return MobileShop;
}(React.Component);

export default MobileShop;