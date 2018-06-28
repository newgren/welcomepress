'use strict';

import Item from './item.js';
import OutsideAlerter from './OutsideAlerter.js';
import catalog from './product/catalog.js';

const e = React.createElement;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0,
      sel: -1,
      cart: []
    };
  }

  blinkArrow() {
    alert("end of the line");
  }

  canGoLeft() {
    return this.state.pos < 0;
  }

  canGoRight() {
    return this.state.pos > 9 * -400;
  }

  handleScroll(dir) {
    console.log(catalog.items);
    let pos = this.state.pos;
    switch (dir) {
      case "left":
        this.canGoLeft() ? this.setState({pos: pos + 400}) : this.blinkArrow();
        break;
      case "right":
        this.canGoRight() ? this.setState({pos: pos - 400}) : this.blinkArrow();
        break;
      default:
    }
  }

  addToCart(item, qty) {
    let n = [];
    for(let i = 0; i < qty; i++) {
      n.push(item);
    }
    let c = this.state.cart.concat(n);
    this.setState({
      sel: -1,
      cart: c
    });
  }

  render() {

    return (
      <div>
        <div className='shop'>
          <div className='menu'>
            <div className='shopText shadow'>SHOP</div>
            <div className='bagText shadow'>BAG{this.state.cart.length  ? '(' + this.state.cart.length + ')' : ''}</div>
          </div>
          <div className='scroller' style={{left: this.state.pos + "px"}}>
            {catalog.items.map((item) =>
              <img src={'./product/'+item.id+'.png'} onClick={() => this.setState({sel: item.id})} key={item.id}/>
            )}

          </div>
          <div className='navs'>
            <img className='arrow left' src='./img/arrowleft.png'
              style={{display: this.canGoLeft() ? "initial" : "none"}}
              onClick={() => this.handleScroll("left")}/>
            <img className='arrow right' src='./img/arrowright.png'
              style={{display: this.canGoRight() ? "initial" : "none"}}
              onClick={() => this.handleScroll("right")}/>
          </div>
        </div>
        <div className='itemFrame'>
          {this.state.sel > -1 ? <Item item={catalog.items[this.state.sel]} add={(qty) => this.addToCart(this.state.sel, qty)}/> : <p></p>}
        </div>
        <div className='back'>
          {this.state.sel > -1 ? <button onClick={() => this.setState({sel:-1})}>GOBACK</button> : <br/>}
        </div>
      </div>
    );
  }
}
export default Shop
