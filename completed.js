'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Completed = function (_React$Component) {
  _inherits(Completed, _React$Component);

  function Completed(props) {
    _classCallCheck(this, Completed);

    var _this = _possibleConstructorReturn(this, (Completed.__proto__ || Object.getPrototypeOf(Completed)).call(this, props));

    _this.goToHome = props.goToHome;
    return _this;
  }

  _createClass(Completed, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'completed' },
        React.createElement(
          'div',
          null,
          'THANKS!'
        ),
        React.createElement(
          'button',
          { onClick: this.goToHome },
          'CLICK FOR MORE WELCOME PRESS'
        ),
        React.createElement(
          'div',
          null,
          'we emailed you your receipt & we\u2019ll ship your order out as soon as we can. '
        )
      );
    }
  }]);

  return Completed;
}(React.Component);

export default Completed;