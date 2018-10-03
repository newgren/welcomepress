'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var n = React.createElement('br', null);

var StrokeText = function (_React$Component) {
  _inherits(StrokeText, _React$Component);

  function StrokeText(props) {
    _classCallCheck(this, StrokeText);

    var _this = _possibleConstructorReturn(this, (StrokeText.__proto__ || Object.getPrototypeOf(StrokeText)).call(this, props));

    _this.copy = props.copy;
    _this.num = props.num;
    return _this;
  }

  _createClass(StrokeText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var box = document.getElementById('svg' + this.num);
      var rect = document.getElementById('rect' + this.num);
      var text = document.getElementById('text' + this.num);

      console.log(box.getAttribute('viewBox').split(/\s+|,/)[2]);
      var textLength = text.getComputedTextLength();
      //alert(textLength);
      console.log('rect: ' + w);
      console.log('text: ' + textLength);

      var w = box.getBBox().width;
      box.setAttribute('viewBox', '0 -15 ' + w + ' 50');
      rect.setAttribute('width', textLength);
      console.log(text.getComputedTextLength());
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: this.num != 0 ? 'strokeText' : 'strokeText special' },
        React.createElement(
          'svg',
          { viewBox: '0 -15 100 20', id: 'svg' + this.num },
          React.createElement('rect', { x: '0', y: '0', width: '100', height: '20', id: 'rect' + this.num }),
          React.createElement(
            'text',
            { x: '0', y: '0', id: 'text' + this.num },
            this.copy
          )
        )
      );
    }
  }]);

  return StrokeText;
}(React.Component);

export default StrokeText;