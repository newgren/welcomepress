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
      <div className='shop' onClick={this.handleClick.bind(this)}>
        <div className='shopLeft'>

        </div>
        <div className='shopBox'>
          <div className='banner'>
            <img src='./iconImages/banner_left_desktop.png' id='leftBannerIcon' />
            {
            this.state.sel == -1 ?
              <img src='./iconImages/SHOP.png' id='shopBannerText' />
              :
              <span id='shopProductName'>{catalog.items[this.state.sel].name}</span>
            }
            <img src='./iconImages/bag_desktop.png'
                 onClick={() => this.setState({mode: 'bag', sel: -1})}
                 id='bagbannericon'
            />
          </div>
          {
            this.state.sel == -1 ?
              <div className='desktop scroller'>
                {catalog.items.map((item, id) =>
                  <img src={'./product/'+item.image_urls[0]+'.png'} onClick={() => this.setState({sel: id})} key={item.name}/>
                )}
              </div>
            :
            <Item item={catalog.items[this.state.sel]}
                  add={(size, qty) => this.addToCart(this.state.sel, size, qty)}
            />
          }
          <div className='mobile itemList'>
            {catalog.items.map((item, id) =>
              <img src={'./product/'+item.image_urls[0]+'.png'} onClick={() => this.setState({sel: id})} key={item.name}/>
            )}
          </div>
          {this.state.mode === 'bag' ? <Bag cart={this.state.cart}/> : <p></p>}
        </div>
      </div>
    );
  }
}
export default Shop
