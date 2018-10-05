'use strict';

const e = React.createElement;
const n = <br/>

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.no = props.no;
    this.state = {
      size: 'M',
      qty: 1
    };
  }

  handleSizeChange(e) {
    this.setState({size: e.target.value});
  }

  handleQtyChange(e) {
    this.setState({qty: parseInt(e.target.value)});
  }

  // TODO: this.props.item.description

  render() {
    return (
        <div className='item'>
          <div className='left'>
              {[0,1,2].map((i) =>
                    <img src={'./product/'+this.props.item.image_url+'.png'} key={i}/>
              )}

          </div>
          <div className='mid'>
              <img src={'./product/'+this.props.item.image_url+'.png'}/>
          </div>
          <div className='right'>
            <h1>${this.props.item.price}</h1>
            <h2>size:</h2>
            <div className='sizebar'>
              {['S','M','L','XL'].map((i) =>
                <div><span>{i}</span></div>
              )}
            </div>
            <h2>quantity:</h2>
            <button type='button'>ADD TO BAG</button>
          </div>
        </div>
    );
  }
}
export default Item
