'use strict';

import catalog from './product/catalog.js';
import BagItem from './bagItem.js'

const e = React.createElement;

class MobileBag extends React.Component {
  constructor(props) {
    super(props);
    this.cart = props.cart;
    this.remove = props.remove;
  }

  formatMoney(val) {
    return Math.round(val * 100) / 100;
  }

  getSubtotal() {
    let cart = this.cart;
    let keys = Object.keys(cart);
    let subtotal = 0;
    keys.forEach((key) => {
      let price = catalog.items[key].price;
      let shirt = cart[key];
      let shirtKeys = Object.keys(shirt);
      shirtKeys.forEach((shirtkey) => {
        subtotal += shirt[shirtkey] * price;
      });
    });
    return subtotal;
  }

  getShipping() {
    return 9.0;
  }

  getEstimatedTax() {
    return this.formatMoney(0.07 * this.getSubtotal());
  }

  getTotal() {
    return this.getSubtotal() + this.getShipping() + this.getEstimatedTax();
  }

  render() {
    console.log(this.cart);
    return (
      <div className='bag'>
        <div className='items'>
          <div className='bagItem legend'>
            <span className='itemText'>item</span>
            <span className='price'>item price</span>
            <span className='qty'>quantity</span>
            <span className='total'>total</span>
          </div>
          {Object.keys(this.cart).map(id =>
            Object.keys(this.cart[id]).map(size =>
              <BagItem
                id={id}
                size={size}
                qty={this.cart[id][size]}
                name={catalog.items[id].name.toUpperCase()}
                image_url={'./product/' + catalog.items[id].image_urls[0] + '.png'}
                price={catalog.items[id].price}
                key={id+size+this.cart[id][size]}
                remove={(index, size) => this.remove(index, size)}
              />
            )
          )}
        </div>
        <div className='summary'>
          <span className='title'>ORDER SUMMARY</span>
          <div className='bar'>
            <span className='key'>subtotal</span>
            <span className='val'>${this.getSubtotal()}</span>
          </div>
          <div className='bar'>
            <span className='key'>shipping</span>
            <span className='val'>${this.getShipping()}</span>
          </div>
          <div className='bar'>
            <span className='key'>estimated tax</span>
            <span className='val'>${this.getEstimatedTax()}</span>
          </div>
          <div className='bar'>
            <span className='key'>total</span>
            <span className='val'>${this.getTotal()}</span>
          </div>
          <button type='button'
                  onClick={()=>alert(2)}>CHECK OUT
          </button>
        </div>
      </div>
    );
  }
}
export default MobileBag
