'use strict';

const e = React.createElement;
const n = <br/>

class MobileItem extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = props.addToCart;
    this.item = props.item;
    this.no = props.no;
    this.state = {
      mode: 'buy', // 'buy' | 'size'
      imageIndex: 0,
      size: '',
      qty: 1,
    };
  }

  handleSizeChange(e) {
    this.setState({size: e.target.value});
  }

  handleQtyChange(e) {
    this.setState({qty: parseInt(e.target.value)});
  }

  render() {
    return (
        <div className='mobileItem'>
          <div className='mid'>
            <img src={'./product/'+this.props.item.image_urls[this.state.imageIndex]+'.png'}/>
          </div>
          {
            this.state.mode == 'buy' ?
              <div className='low'>
                <span className='itemName'>{this.item.name}</span>
                <button
                  type='button'
                  onClick={() => this.setState({mode: 'size'})}>
                    BUY • ${this.item.price}
                </button>
              </div>
            :
              <div className='low sizebar'>
                {['S','M','L','XL'].map((s) =>
                  <div key={s}
                       onClick={() => {
                         this.setState({size: s, sizeError: false});
                         this.addToCart(this.state.size, this.state.qty);
                       }}
                       className={s == this.state.size ? 'selected' : ''}
                  >
                    <span>{s}</span>
                  </div>
                )}
              </div>
          }
        </div>

    );
  }
}
export default MobileItem
