'use strict';

import catalog from './product/catalog.js';

const e = React.createElement;

class BagItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.size = props.size;
    this.qty = props.qty;
    this.name = props.name;
    this.image_url = props.image_url;
    this.price = props.price;
  }

  render() {
    return React.createElement(
      'div',
      { className: 'bagItem' },
      React.createElement(
        'div',
        { className: 'left' },
        React.createElement(
          'div',
          { className: 'imagebox' },
          React.createElement('img', { src: this.image_url })
        ),
        React.createElement(
          'div',
          { className: 'text' },
          React.createElement(
            'div',
            null,
            this.name
          ),
          React.createElement(
            'div',
            null,
            this.size
          ),
          React.createElement(
            'div',
            null,
            this.qty
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
}
export default BagItem;