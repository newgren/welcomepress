'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Item from './item.js';
import OutsideAlerter from './OutsideAlerter.js';

var e = React.createElement;

var Shop = function (_React$Component) {
  _inherits(Shop, _React$Component);

  function Shop(props) {
    _classCallCheck(this, Shop);

    var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, props));

    _this.state = {
      pos: 0,
      sel: -1,
      cart: []
    };
    return _this;
  }

  _createClass(Shop, [{
    key: 'blinkArrow',
    value: function blinkArrow() {
      alert("end of the line");
    }
  }, {
    key: 'canGoLeft',
    value: function canGoLeft() {
      return this.state.pos < 0;
    }
  }, {
    key: 'canGoRight',
    value: function canGoRight() {
      return this.state.pos > 5 * -400;
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
    value: function addToCart(item, qty) {
      var n = [];
      for (var i = 0; i < qty; i++) {
        n.push(item);
      }
      var c = this.state.cart.concat(n);
      this.setState({
        sel: -1,
        cart: c
      });
      console.log(c);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'shop' },
          React.createElement(
            'div',
            { className: 'menu' },
            React.createElement(
              'div',
              { className: 'shopText shadow' },
              'SHOP'
            ),
            React.createElement(
              'div',
              { className: 'bagText shadow' },
              'BAG',
              this.state.cart.length ? '(' + this.state.cart.length + ')' : ''
            )
          ),
          React.createElement(
            'div',
            { className: 'scroller', style: { left: this.state.pos + "px" } },
            [0, 1, 2, 3, 4].map(function (i) {
              return React.createElement('img', { src: './img/shirtwhite.png', onClick: function onClick() {
                  return _this2.setState({ sel: i });
                }, key: i });
            })
          ),
          React.createElement(
            'div',
            { className: 'navs' },
            React.createElement('img', { className: 'arrow left', src: './img/arrowleft.png',
              style: { display: this.canGoLeft() ? "initial" : "none" },
              onClick: function onClick() {
                return _this2.handleScroll("left");
              } }),
            React.createElement('img', { className: 'arrow right', src: './img/arrowright.png',
              style: { display: this.canGoRight() ? "initial" : "none" },
              onClick: function onClick() {
                return _this2.handleScroll("right");
              } })
          )
        ),
        React.createElement(
          'div',
          { className: 'itemFrame' },
          this.state.sel > -1 ? React.createElement(Item, { no: this.state.sel, add: function add(qty) {
              return _this2.addToCart(_this2.state.sel, qty);
            } }) : React.createElement('p', null)
        ),
        React.createElement(
          'div',
          { className: 'back' },
          this.state.sel > -1 ? React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.setState({ sel: -1 });
              } },
            'GOBACK'
          ) : React.createElement('br', null)
        )
      );
    }
  }]);

  return Shop;
}(React.Component);

export default Shop;