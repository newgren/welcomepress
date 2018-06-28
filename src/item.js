'use strict';


const e = React.createElement;
const n = <br/>

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.onclick = props.onclick;
  }


  render() {
    return (
      <div className='item'>
        <div className='left'>
          <div className='info'>
            <div className='text'>
              {['BAGHEAD', 'SHIRT', '$25'].map(word => <div key={word}>{word+'.'}</div>)}
              {n}
              <select className='sizes' size='3'>
                {['S', 'M', 'L'].map(s => <option value={s} key={s}>{s}</option>)}
              </select>
              QTY
              <select className='qty'>
                {[1,2,3,4,5].map(n => <option value={n} key={n}>{n}</option>)}
              </select>
              <div className='buy'>
                <button>+BAG</button>
              </div>
            </div>
          </div>
          <div className='pics'>
            <div className='scroller'>
              {[0,1,2].map((i) =>
                  <img src='./img/shirtwhite.png' key={i}/>
              )}
            </div>
          </div>
        </div>
        <div className='right'>
            <img src='./img/shirtwhite.png'/>
        </div>
      </div>
    );
  }
}
export default Item
