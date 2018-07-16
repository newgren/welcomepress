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
          <img src={this.image_url}/>
          <div className='text'>
            <span>{this.name+'\n'+this.size+'\n'+this.qty}
            </span>
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
