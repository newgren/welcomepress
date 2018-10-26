'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Item from './item.js';
import Bag from './bag.js';
import Checkout from './checkout.js';

import catalog from './product/catalog.js';

var e = React.createElement;

var Shop = function (_React$Component) {
  _inherits(Shop, _React$Component);

  function Shop(props) {
    _classCallCheck(this, Shop);

    var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, props));

    _this.goToBag = props.goToBag;
    _this.goToHome = props.goToHome;
    _this.goToCompleted = props.goToCompleted;
    _this.state = {
      mode: 'browse', // 'browse' | 'item' | 'bag' | 'checkout' | 'complete'
      checkoutMode: 'shipping', // 'shipping' | 'payment'
      pos: 0,
      sel: -1,
      cart: {}
    };
    return _this;
  }

  _createClass(Shop, [{
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
    key: 'setCheckoutMode',
    value: function setCheckoutMode(newMode) {
      console.log("sET");
      this.setState({ checkoutMode: newMode });
    }
  }, {
    key: 'formatMoney',
    value: function formatMoney(val) {
      //  return Math.round(val * 100) / 100;
      return val.toFixed(2);
    }
  }, {
    key: 'getSubtotal',
    value: function getSubtotal() {
      var cart = this.state.cart;
      var keys = Object.keys(cart);
      var subtotal = 0;
      keys.forEach(function (key) {
        var price = catalog.items[key].price;
        var shirt = cart[key];
        var shirtKeys = Object.keys(shirt);
        shirtKeys.forEach(function (shirtkey) {
          subtotal += shirt[shirtkey] * price;
        });
      });
      return subtotal;
    }
  }, {
    key: 'getShipping',
    value: function getShipping() {
      return 2.05;
    }
  }, {
    key: 'getTotal',
    value: function getTotal() {
      return this.getSubtotal() + this.getShipping();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'shop' },
        React.createElement('div', { className: 'shopLeft' }),
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
            this.state.mode != 'item' ? this.state.mode == 'bag' ? React.createElement(
              'span',
              { id: 'shopProductName' },
              'SHOPPING BAG'
            ) : this.state.mode == 'checkout' ? React.createElement(
              'span',
              { id: 'shopProductName' },
              'CHECKOUT'
            ) : React.createElement('img', { src: './iconImages/SHOP.png', id: 'shopBannerText' }) : React.createElement(
              'span',
              { id: 'shopProductName' },
              catalog.items[this.state.sel].name
            ),
            React.createElement(
              'div',
              { id: 'bagbannericon' },
              React.createElement('img', { src: './iconImages/bag_desktop.png',
                onClick: function onClick() {
                  return _this2.getCartSize > 0 ? _this2.setState({ mode: 'bag', sel: -1 }) : alert('add something to your cart first!');
                }
              }),
              React.createElement(
                'span',
                null,
                this.getCartSize()
              )
            )
          ),
          this.state.sel == -1 ? this.state.mode == 'browse' ? React.createElement(
            'div',
            { className: 'desktop scroller' },
            catalog.items.map(function (item, id) {
              return React.createElement('img', { src: './product/' + item.image_urls[0] + '.png',
                onClick: function onClick() {
                  return _this2.setState({ sel: id, mode: 'item' });
                }, key: item.name });
            })
          ) : this.state.mode == 'bag' ? React.createElement(Bag, {
            cart: this.state.cart,
            remove: function remove(index, size) {
              return _this2.removeFromCart(index, size);
            },
            goToCheckout: function goToCheckout() {
              return _this2.setState({ mode: 'checkout' });
            },
            getSubtotal: this.getSubtotal.bind(this) }) : this.state.mode == 'checkout' ? React.createElement(Checkout, { cart: this.state.cart,
            mode: this.state.checkoutMode,
            setMode: function setMode(newMode) {
              return _this2.setCheckoutMode(newMode);
            },
            completeCheckout: this.goToCompleted }) : null : React.createElement(Item, { item: catalog.items[this.state.sel],
            addToCart: function addToCart(size, qty) {
              return _this2.addToCart(_this2.state.sel, size, qty);
            }
          }),
          React.createElement(
            'div',
            { className: 'mobile itemList' },
            catalog.items.map(function (item, id) {
              return React.createElement('img', { src: './product/' + item.image_urls[0] + '.png', onClick: function onClick() {
                  return _this2.setState({ sel: id });
                }, key: item.name });
            })
          )
        ),
        React.createElement(
          'span',
          { className: 'slowdownkiddo' },
          'oh.. the site\'s not supposed to do that. click ',
          React.createElement(
            'a',
            { href: 'https://welcomepress.xyz' },
            'here'
          ),
          ' to go to back to a version of WELCOME PRESS that\'s identical to this one except it won\'t let you do this'
        ),
        React.createElement(
          'span',
          { className: 'slowdownkiddo' },
          'Re: that message above and to the left.  ok so we\'ve gotten WAY too many emails regarding the above message. people are saying things like, "why don\'t you just update this version of the site to the new version so this isn\'t a problem in the first place?? you clearly already have fixed the bug, so just update it." well, we\'re never going to change it so we hope that give you an idea of the type of business we\'re operating here. thank you. ~WP'
        )
      );
    }
  }]);

  return Shop;
}(React.Component);

export default Shop;