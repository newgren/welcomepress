'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Shop = function (_React$Component) {
  _inherits(Shop, _React$Component);

  function Shop(props) {
    _classCallCheck(this, Shop);

    var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, props));

    _this.onclick = props.onclick;
    _this.state = {
      pos: 0
    };
    return _this;
  }

  _createClass(Shop, [{
    key: "handleScroll",
    value: function handleScroll(dir) {
      switch (dir) {
        case "left":
          this.setState({ pos: this.state.pos - 400 });
          break;
        case "right":
          this.setState({ pos: this.state.pos + 400 });
          break;
        default:

      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "shop" },
        React.createElement(
          "div",
          { className: "menu" },
          React.createElement(
            "div",
            { className: "shopText shadow" },
            "SHOP"
          ),
          React.createElement(
            "div",
            { className: "bagText shadow" },
            "BAG"
          )
        ),
        React.createElement(
          "div",
          { className: "scroller", style: { left: this.state.pos + "px" } },
          [1, 2, 3, 4, 5].map(function (i) {
            return React.createElement("img", { src: "./img/shirtwhite.png", key: i });
          })
        ),
        React.createElement(
          "div",
          { className: "navs" },
          React.createElement("img", { className: "arrow left", src: "./img/arrowleft.png", onClick: function onClick() {
              return _this2.handleScroll("left");
            } }),
          React.createElement("img", { className: "arrow right", src: "./img/arrowright.png", onClick: function onClick() {
              return _this2.handleScroll("right");
            } })
        )
      );
    }
  }]);

  return Shop;
}(React.Component);

export default Shop;