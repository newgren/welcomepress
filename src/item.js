'use strict';

const e = React.createElement;
const n = <br/>

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.no = props.no;
    this.addToCart = this.props.addToCart;
    this.state = {
      imageIndex: 0,
      size: '',
      qty: 1,
      sizeError: false,
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
        <div className='item'>
          <div className='left'>
            {
              this.props.item.image_urls.map((url, i) =>
                  <img src={'./product/'+url+'.png'}
                       key={i}
                       onClick={() => this.setState({imageIndex: i})}
                  />
            )}
          </div>
          <div className='mid'>
              <img src={'./product/'+this.props.item.image_urls[this.state.imageIndex]+'.png'}/>
          </div>
          <div className='right'>
            <span id='h1'>${this.props.item.price}</span>
            <span id='h2'>size:</span>
            <div className='sizebar'>
              {['S','M','L','XL'].map((s) =>
                <div key={s}
                     onClick={() => this.setState({size: s, sizeError: false})}
                     className={s == this.state.size ? 'selected' : ''}
                >
                  <span>{s}</span>
                </div>
              )}
            </div>
            <span id='h2'>quantity:</span>
            <select value={this.state.qty} onChange={this.handleQtyChange.bind(this)}>
              {[1,2,3,4,5].map(n => <option value={n} key={n}>{n}</option>)}
            </select>
            <button
              type='button'
              onClick={() => {
                if(this.state.size === '') {
                  this.setState({sizeError: true})
                } else {
                  this.setState({sizeError: false})
                  this.addToCart(this.state.size, this.state.qty)
                }
              }}>
                ADD TO BAG
            </button>
            {
              this.state.sizeError ?
                <span id='sizeError'>whoah, select a size</span>
              : <p></p>
            }
          </div>
        </div>
    );
  }
}
export default Item
