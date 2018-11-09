'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
import Sidescroll from './sidescroll.js';

var Work = function (_React$Component) {
  _inherits(Work, _React$Component);

  function Work(props) {
    _classCallCheck(this, Work);

    var _this = _possibleConstructorReturn(this, (Work.__proto__ || Object.getPrototypeOf(Work)).call(this, props));

    _this.goToHome = props.goToHome;
    return _this;
  }

  _createClass(Work, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'work' },
        React.createElement(
          'div',
          { className: 'workLeft' },
          React.createElement(Sidescroll, null)
        ),
        React.createElement(
          'div',
          { className: 'workRight' },
          React.createElement(
            'div',
            { className: 'banner' },
            React.createElement('img', { src: './iconImages/banner_left_desktop.png',
              id: 'leftBannerIcon',
              onClick: function onClick() {
                return _this2.goToHome();
              } }),
            React.createElement('img', { src: './iconImages/WORK.png', id: 'shopBannerText' })
          ),
          React.createElement(
            'div',
            { className: 'workList' },
            React.createElement(
              'ul',
              null,
              React.createElement(
                'li',
                null,
                React.createElement(
                  'a',
                  { target: '_blank', href: 'https://usontheb.us' },
                  'usontheb.us'
                )
              ),
              React.createElement(
                'li',
                null,
                React.createElement(
                  'a',
                  { target: '_blank', href: 'https://welcomepress.xyz' },
                  'welcomepress.xyz'
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'workBottom' },
          React.createElement(
            'div',
            null,
            'work with us.'
          ),
          React.createElement(
            'div',
            { id: 'mailto' },
            React.createElement(
              'a',
              { href: 'mailto:hello@welcomepress.xyz' },
              'hello@welcomepress.xyz'
            )
          )
        )
      );
    }
  }]);

  return Work;
}(React.Component);

export default Work;