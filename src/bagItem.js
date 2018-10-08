'use strict';

import catalog from './product/catalog.js';

const e = React.createElement;

class BagItem extends React.Component {
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
        <div className='pic'>
          <img src={this.image_url}/>
        </div>
        <div className='details'>
          <div>{this.name}</div>
          <div>{this.size}</div>
        </div>
        <span className='price'>${this.price}</span>
        <div className='qty'>
          <span>{this.qty}</span>
          <br/>
          <span className='remove' onClick={() => this.remove(this.id, this.size)}>x <span>remove</span></span>
        </div>
        <span className='total'>${this.price * this.qty}</span>
      </div>
    );
  }
}
export default BagItem
