'use strict';

import catalog from './product/catalog.js';
import BagItem from './bagItem.js';

const e = React.createElement;

class Bag extends React.Component {
  constructor(props) {
    super(props);
    this.cart = props.cart;
  }

  render() {
    return React.createElement(
      'div',
      { className: 'bagCenter' },
      React.createElement(
        'div',
        { className: 'bag' },
        React.createElement(
          'div',
          { className: 'bagItem legend' },
          React.createElement(
            'div',
            { className: 'right' },
            React.createElement(
              'div',
              { className: 'price' },
              React.createElement(
                'span',
                null,
                'PRICE'
              )
            ),
            React.createElement(
              'div',
              { className: 'total' },
              React.createElement(
                'span',
                null,
                'TOTAL'
              )
            )
          )
        ),
        Object.keys(this.cart).map(id => Object.keys(this.cart[id]).map(size => React.createElement(BagItem, {
          id: id,
          size: size,
          qty: this.cart[id][size],
          name: catalog.items[id].name.toUpperCase(),
          image_url: './product/' + catalog.items[id].image_url + '.png',
          price: catalog.items[id].price,
          key: id + size + this.cart[id][size]
        }))),
        React.createElement(
          'div',
          { className: 'center checkoutbox' },
          React.createElement(
            'button',
            { onClick: () => alert(2) },
            React.createElement(
              'div',
              null,
              'CHECK'
            ),
            React.createElement(
              'div',
              null,
              'OUT'
            )
          )
        )
      )
    );
  }
}
export default Bag;