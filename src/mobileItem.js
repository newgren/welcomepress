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
      mode: 'buy',
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
          <div className='itemPreview'>
            <div>{this.item.name}</div>
            <div>${this.item.price}</div>
            <div className='imageHolder'>
              <img src={'./product/'+this.props.item.image_urls[0]+'.png'}/>
            </div>
          </div>
          <div>SELECT A SIZE</div>
          <div className='low sizebar'>
            {['S','M','L','XL'].map((s) =>
              <div key={s}
                   onClick={() => {
                     this.setState({size: s, sizeError: false});
                   }}
                   className={s == this.state.size ? 'selected' : ''}
              >
                <span>{s}</span>
              </div>
            )}
          </div>
          <div>HOW MANY?</div>
          <select value={this.state.qty} onChange={this.handleQtyChange.bind(this)}>
            {[1,2,3,4,5].map(n => <option value={n} key={n}>{n}</option>)}
          </select>

          <div className='low'>
            <button
              type='button'
              onClick={() => this.addToCart(  this.state.size, this.state.qty)}>
                ADD TO BAG
            </button>
          </div>

        </div>

    );
  }
}
export default MobileItem
