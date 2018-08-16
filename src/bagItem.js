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
    return (
      <div className='bagItem'>
        <div className='left'>
          <div className='imagebox'>
            <img src={this.image_url}/>
          </div>
          <div className='text'>
            <div>{this.name}</div>
            <div>{this.size}</div>
            <div>{this.qty}</div>
          </div>
        </div>
        <div className='right'>
          <div className='price'>${this.price}</div>
          <div className='total'>${this.price * this.qty}</div>
        </div>
      </div>
    );
  }
}
export default BagItem
