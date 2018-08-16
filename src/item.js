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

  render() {
    return (
      <div className='itemCenter'>
        <div className='item'>
          <div className='left'>
            <div className='info'>
              <div className='text'>
                {this.props.item.name.toUpperCase().split(" ").map(word => <div key={word}>{word}</div>)}
                <div className='desc'>
                  {this.props.item.description}
                </div>
                <div>
                  {this.props.item.price+"$"}
                </div>
                {n}
                <select className='sizes' value={this.state.size} onChange={this.handleSizeChange.bind(this)} size='3'>
                  {['S', 'M', 'L'].map(s => <option value={s} key={s}>{s}</option>)}
                </select>
                QTY
                <select className='qty' value={this.state.qty} onChange={this.handleQtyChange.bind(this)}>
                  {[1,2,3,4,5].map(n => <option value={n} key={n}>{n}</option>)}
                </select>
                <div className='buy'>
                  <button onClick={() => this.props.add(this.state.size, this.state.qty)}>+BAG</button>
                </div>
              </div>
            </div>
            <div className='pics desktop-flex'>
              <div className='scroller desktop'>
                {[0,1,2].map((i) =>
                    <img src={'./product/'+this.props.item.image_url+'.png'} key={i}/>
                )}
              </div>
            </div>
          </div>
          <div className='right desktop'>
              <img src={'./product/'+this.props.item.image_url+'.png'}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Item
