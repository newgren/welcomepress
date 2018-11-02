'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var n = React.createElement('br', null);

var MobileItem = function (_React$Component) {
  _inherits(MobileItem, _React$Component);

  function MobileItem(props) {
    _classCallCheck(this, MobileItem);

    var _this = _possibleConstructorReturn(this, (MobileItem.__proto__ || Object.getPrototypeOf(MobileItem)).call(this, props));

    _this.addToCart = props.addToCart;
    _this.item = props.item;
    _this.no = props.no;
    _this.state = {
      mode: 'buy',
      imageIndex: 0,
      size: '',
      qty: 1
    };
    return _this;
  }

  _createClass(MobileItem, [{
    key: 'handleSizeChange',
    value: function handleSizeChange(e) {
      this.setState({ size: e.target.value });
    }
  }, {
    key: 'handleQtyChange',
    value: function handleQtyChange(e) {
      this.setState({ qty: parseInt(e.target.value) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'mobileItem' },
        React.createElement(
          'div',
          { className: 'itemPreview' },
          React.createElement(
            'div',
            null,
            this.item.name
          ),
          React.createElement(
            'div',
            null,
            '$',
            this.item.price
          ),
          React.createElement(
            'div',
            { className: 'imageHolder' },
            React.createElement('img', { src: './product/' + this.props.item.image_urls[0] + '.png' })
          )
        ),
        React.createElement(
          'div',
          null,
          'SELECT A SIZE'
        ),
        React.createElement(
          'div',
          { className: 'low sizebar' },
          ['S', 'M', 'L', 'XL'].map(function (s) {
            return React.createElement(
              'div',
              { key: s,
                onClick: function onClick() {
                  _this2.setState({ size: s, sizeError: false });
                },
                className: s == _this2.state.size ? 'selected' : ''
              },
              React.createElement(
                'span',
                null,
                s
              )
            );
          })
        ),
        React.createElement(
          'div',
          null,
          'HOW MANY?'
        ),
        React.createElement(
          'select',
          { value: this.state.qty, onChange: this.handleQtyChange.bind(this) },
          [1, 2, 3, 4, 5].map(function (n) {
            return React.createElement(
              'option',
              { value: n, key: n },
              n
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'low' },
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: function onClick() {
                return _this2.addToCart(_this2.state.size, _this2.state.qty);
              } },
            'ADD TO BAG'
          )
        )
      );
    }
  }]);

  return MobileItem;
}(React.Component);

export default MobileItem;