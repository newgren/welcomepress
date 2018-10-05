'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Item from './item.js';
import Bag from './bag.js';

import catalog from './product/catalog.js';

var e = React.createElement;

var Shop = function (_React$Component) {
  _inherits(Shop, _React$Component);

  function Shop(props) {
    _classCallCheck(this, Shop);

    var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, props));

    _this.goToBag = props.goToBag;
    _this.state = {
      mode: 'shop',
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
        sel: -1
      });
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

    /*
    * handle clicks to 'GO BACK' from popups like BAG or ITEM
    */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.state.sel > -1 && this.state.mode === 'shop' && !this.hasParentClass(e.target, 'item')) {
        this.setState({ sel: -1 });
      }
      if (this.state.mode === 'bag' && !this.hasParentClass(e.target, 'bag')) {
        this.setState({ mode: 'shop' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'shop', onClick: this.handleClick.bind(this) },
        React.createElement('div', { className: 'shopLeft' }),
        React.createElement(
          'div',
          { className: 'shopBox' },
          React.createElement(
            'div',
            { className: 'banner' },
            React.createElement('img', { src: './iconImages/banner_left_desktop.png', id: 'leftBannerIcon' }),
            this.state.sel == -1 ? React.createElement('img', { src: './iconImages/SHOP.png', id: 'shopBannerText' }) : React.createElement(
              'span',
              { id: 'shopProductName' },
              catalog.items[this.state.sel].name
            ),
            React.createElement('img', { src: './iconImages/bag_desktop.png',
              onClick: function onClick() {
                return _this2.setState({ mode: 'bag', sel: -1 });
              },
              id: 'bagbannericon'
            })
          ),
          this.state.sel == -1 ? React.createElement(
            'div',
            { className: 'desktop scroller' },
            catalog.items.map(function (item, id) {
              return React.createElement('img', { src: './product/' + item.image_urls[0] + '.png', onClick: function onClick() {
                  return _this2.setState({ sel: id });
                }, key: item.name });
            })
          ) : React.createElement(Item, { item: catalog.items[this.state.sel],
            add: function add(size, qty) {
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
          ),
          this.state.mode === 'bag' ? React.createElement(Bag, { cart: this.state.cart }) : React.createElement('p', null)
        )
      );
    }
  }]);

  return Shop;
}(React.Component);

export default Shop;