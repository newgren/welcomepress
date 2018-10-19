'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var n = React.createElement('br', null);

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.no = props.no;
    _this.addToCart = _this.props.addToCart;
    _this.state = {
      imageIndex: 0,
      size: '',
      qty: 1,
      sizeError: false
    };
    return _this;
  }

  _createClass(Item, [{
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
        { className: 'item' },
        React.createElement(
          'div',
          { className: 'left' },
          this.props.item.image_urls.map(function (url, i) {
            return React.createElement('img', { src: './product/' + url + '.png',
              key: i,
              onClick: function onClick() {
                return _this2.setState({ imageIndex: i });
              }
            });
          })
        ),
        React.createElement(
          'div',
          { className: 'mid' },
          React.createElement('img', { src: './product/' + this.props.item.image_urls[this.state.imageIndex] + '.png' })
        ),
        React.createElement(
          'div',
          { className: 'right' },
          React.createElement(
            'span',
            { id: 'h1' },
            '$',
            this.props.item.price
          ),
          React.createElement(
            'span',
            { id: 'h2' },
            'size:'
          ),
          React.createElement(
            'div',
            { className: 'sizebar' },
            ['S', 'M', 'L', 'XL'].map(function (s) {
              return React.createElement(
                'div',
                { key: s,
                  onClick: function onClick() {
                    return _this2.setState({ size: s, sizeError: false });
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
            'span',
            { id: 'h2' },
            'quantity:'
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
            'button',
            {
              type: 'button',
              onClick: function onClick() {
                if (_this2.state.size === '') {
                  _this2.setState({ sizeError: true });
                } else {
                  _this2.setState({ sizeError: false });
                  _this2.addToCart(_this2.state.size, _this2.state.qty);
                }
              } },
            'ADD TO BAG'
          ),
          this.state.sizeError ? React.createElement(
            'span',
            { id: 'sizeError' },
            'whoah, select a size'
          ) : React.createElement('p', null)
        )
      );
    }
  }]);

  return Item;
}(React.Component);

export default Item;