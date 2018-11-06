'use strict';

import catalog from './product/catalog.js';
import BagItem from './bagItem.js'

const e = React.createElement;

class Bag extends React.Component {
  constructor(props) {
    super(props);
    this.remove = props.remove;
    this.getSubtotal = props.getSubtotal;
    this.goToCheckout = props.goToCheckout;
    this.goToBrowse = props.goToBrowse;
  }

  render() {
    return (
      <div className='bag'>
        <div className='items'>
          <div className='bagItem legend desktop'>
            <span className='itemText'>item</span>
            <span className='price'>item price</span>
            <span className='qty'>quantity</span>
            <span className='total'>total</span>
          </div>
          {
            this.props.getCartSize() > 0 ?
              Object.keys(this.props.cart).map(id =>
                Object.keys(this.props.cart[id]).map(size =>
                  <BagItem
                    id={id}
                    size={size}
                    qty={this.props.cart[id][size]}
                    name={catalog.items[id].name.toUpperCase()}
                    image_url={'./product/' + catalog.items[id].image_urls[0] + '.png'}
                    price={catalog.items[id].price}
                    key={id+size+this.props.cart[id][size]}
                    remove={(index, size) => this.remove(index, size)}
                  />
                )
              ) :
              <div id='emptyMessage'>
                <div>there's nothing here!</div>
                <div id='emptyButton'
                     onClick={this.goToBrowse}>
                     &#8592; CLICK ME TO GO BACK &#8592;
                </div>
              </div>

          }

        </div>
        <div className='summary'>
          <span className='title'>ORDER SUMMARY</span>
          <div className='bar'>
            <span className='key'>subtotal</span>
            <span className='val'>${this.getSubtotal().toFixed(2)}</span>
          </div>
          <div className='bar'>
            <span className='key'>shipping</span>
            <span className='val'>TBD</span>
          </div>
          <div className='bar'>
            <span className='key'>total</span>
            <span className='val'>TBD</span>
          </div>
          <button type='button'
                  onClick={() => {
                    this.getSubtotal() > 0 ?
                      this.goToCheckout()
                    :
                      alert('you must have an item in your cart to checkout')}}>
            CHECK OUT

          </button>
        </div>
      </div>
    );
  }
}
export default Bag
