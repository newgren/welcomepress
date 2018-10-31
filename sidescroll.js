'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Sidescroll = function (_React$Component) {
  _inherits(Sidescroll, _React$Component);

  function Sidescroll(props) {
    _classCallCheck(this, Sidescroll);

    return _possibleConstructorReturn(this, (Sidescroll.__proto__ || Object.getPrototypeOf(Sidescroll)).call(this, props));
  }

  _createClass(Sidescroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var thing = document.getElementById('sidescroll');
      //TODO: MAKE THESE USE 'VH' INSTEAD OF 'PX' so that animation speed is constant when changing broswer size
      // let shopHeight = document.getElementById('shopBox').clientHeight;
      var amt = -1 * (thing.clientHeight / 2);
      thing.style.top = amt + 'px';

      window.setInterval(function () {
        if (amt > 0) {
          amt = -1 * (thing.clientHeight / 2);
        }
        thing.style.top = amt + 'px';
        amt += 3;
      }, 10);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'sidescroll' },
        React.createElement('img', { id: 'scrollimg', src: './iconImages/sidescroll.png' }),
        React.createElement('img', { src: './iconImages/sidescroll.png' })
      );
    }
  }]);

  return Sidescroll;
}(React.Component);

export default Sidescroll;