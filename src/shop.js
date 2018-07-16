'use strict';

import Item from './item.js';
import Bag from './bag.js';

import catalog from './product/catalog.js';

const e = React.createElement;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.goToBag = props.goToBag;
    this.state = {
      mode: 'shop',
      pos: 0,
      sel: -1,
      cart: {}
    };
  }

  canGoLeft() {
    return this.state.pos < 0;
  }

  canGoRight() {
    //TODO: fix this shite
    return this.state.pos > 9 * -400;
  }

  handleScroll(dir) {
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

  addToCart(id, size, qty) {
    let cart = this.state.cart;
    if (!(id in cart)) {
      cart[id] = {};
    }
    cart[id][size] = qty + (size in cart[id] ? cart[id][size] : 0);
    this.setState({
      cart: cart,
      sel: -1
    });
  }

  /**
  * return whether element has ancestor with class=className
  */
  hasParentClass(elem, className) {
    if(elem.className === className) {
      return true;
    }
    while ((elem = elem.parentElement)) {
      if(elem.className === className) {
        return true;
      }
    }
    return false;
  }

  /*
  * handle clicks to 'GO BACK' from popups like BAG or ITEM
  */
  handleClick(e) {
    if (this.state.sel > -1 && this.state.mode === 'shop' && !this.hasParentClass(e.target, 'item')) {
      this.setState({sel: -1});
    }
    if (this.state.mode === 'bag' && !this.hasParentClass(e.target, 'bag')) {
      this.setState({mode: 'shop'});
    }
  }

  render() {

    return (
      <div onClick={this.handleClick.bind(this)}>
        <div className='shop' style={{backgroundColor: (this.state.mode === 'shop' ? '#FFBDFB' : '#B8E986')}}>
          <div className='menu'>
            <div className='shopText shadow'>SHOP</div>
            <div className='bagText shadow' onClick={() => this.setState({mode: 'bag', sel: -1})}>
              BAG{this.state.cart.length  ? '(' + this.state.cart.length + ')' : ''}
            </div>
          </div>
          <div className='scroller' style={{left: this.state.pos + "px"}}>
            {catalog.items.map((item, id) =>
              <img src={'./product/'+item.image_url+'.png'} onClick={() => this.setState({sel: id})} key={item.name}/>
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
          {this.state.sel > -1 ? <Item item={catalog.items[this.state.sel]} add={(size, qty) => this.addToCart(this.state.sel, size, qty)}/> : <p></p>}
        </div>
        <div className='bagFrame'>
          {this.state.mode === 'bag' ? <Bag cart={this.state.cart}/> : <p></p>}
        </div>
        <div className='back'>
          {
            (this.state.sel > -1 || this.state.mode === 'bag') ?
              <button onClick={() => this.setState({mode: 'shop', sel: -1})}>GOBACK</button>
              : <br/>
          }
        </div>
      </div>
    );
  }
}
export default Shop
