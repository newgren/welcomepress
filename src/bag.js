'use strict';

import catalog from './product/catalog.js';
import BagItem from './bagItem.js'

const e = React.createElement;

class Bag extends React.Component {
  constructor(props) {
    super(props);
    this.cart = props.cart;
  }

  render() {
    return (
      <div className='bagCenter'>
        <div className='bag'>
          <div className='bagItem legend'>
            <div className='right'>
              <div className='price'><span>PRICE</span></div>
              <div className='total'><span>TOTAL</span></div>
            </div>
          </div>
          {Object.keys(this.cart).map(id =>
            Object.keys(this.cart[id]).map(size =>
              <BagItem
                id={id}
                size={size}
                qty={this.cart[id][size]}
                name={catalog.items[id].name.toUpperCase()}
                image_url={'./product/' + catalog.items[id].image_url + '.png'}
                price={catalog.items[id].price}
                key={id+size+this.cart[id][size]}
              />
            )
          )}
          <div className='center checkoutbox'>
            <button onClick={()=>alert(2)}><div>CHECK</div><div>OUT</div></button>
          </div>
        </div>
      </div>
    );
  }
}
export default Bag
