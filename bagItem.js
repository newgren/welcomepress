'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import catalog from './product/catalog.js';

var e = React.createElement;

var BagItem = function (_React$Component) {
  _inherits(BagItem, _React$Component);

  function BagItem(props) {
    _classCallCheck(this, BagItem);

    var _this = _possibleConstructorReturn(this, (BagItem.__proto__ || Object.getPrototypeOf(BagItem)).call(this, props));

    _this.id = props.id;
    _this.size = props.size;
    _this.qty = props.qty;
    _this.name = props.name;
    _this.image_url = props.image_url;
    _this.price = props.price;
    return _this;
  }

  _createClass(BagItem, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'bagItem' },
        React.createElement(
          'div',
          { className: 'left' },
          React.createElement('img', { src: this.image_url }),
          React.createElement(
            'div',
            { className: 'text' },
            React.createElement(
              'span',
              null,
              this.name + '\n' + this.size + '\n' + this.qty
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'right' },
          React.createElement(
            'div',
            { className: 'price' },
            '$',
            this.price
          ),
          React.createElement(
            'div',
            { className: 'total' },
            '$',
            this.price * this.qty
          )
        )
      );
    }
  }]);

  return BagItem;
}(React.Component);

export default BagItem;