'use strict';

import catalog from './product/catalog.js';

const e = React.createElement;

class MobileBagItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.size = props.size;
    this.qty = props.qty;
    this.name = props.name.toLowerCase();
    this.image_url = props.image_url;
    this.price = props.price;
    this.remove = props.remove;
  }

  render() {
    return (
      <div className='bagItem'>
        <div className='itemName'>{this.name}</div>
        <div className='flexOnEm'>
          <div className='pic'>
            <img src={this.image_url}/>
          </div>
          <div className='details'>
            <div>size: {this.size}</div>
            <div>quantity: {this.qty}</div>
            <div>price: ${this.price}</div>
            <div className='remove' onClick={() => this.remove(this.id, this.size)}>
              x remove
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default MobileBagItem
