'use strict';

const e = React.createElement;
const n = <br/>

class MobileItem extends React.Component {
  constructor(props) {
    super(props);
    this.item = props.item;
    this.no = props.no;
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
        <div className='mobileItem'>
          <div className='mid'>
            <img src={'./product/'+this.props.item.image_urls[this.state.imageIndex]+'.png'}/>
          </div>
          <div className='low'>
            <span>WELCOME SHIRT</span>
            <button
              type='button'
              onClick={() => {
                if(this.state.size === '') {
                  this.setState({sizeError: true})
                } else {
                  this.setState({sizeError: false})
                  this.props.add(this.state.size, this.state.qty)
                }
              }}>
                BUY • ${this.item.price}
            </button>
          </div>

        </div>
    );
  }
}
export default MobileItem
