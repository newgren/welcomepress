'use strict';

import MobileItem from './mobileItem.js';
import Bag from './bag.js';

import catalog from './product/catalog.js';

const e = React.createElement;

class MobileShop extends React.Component {
  constructor(props) {
    super(props);
    this.goToBag = props.goToBag;
    this.goToHome = props.goToHome;
    this.state = {
      mode: 'browse', // 'browse' | 'item' | 'bag'
      pos: 0,
      sel: -1,
      cart: {0: {'L': 1}, 1: {'M': 5}}
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
      mode: 'bag',
      sel: -1
    });
  }

  removeFromCart(index, size) {
    let cart = this.state.cart;
    delete cart[index][size];
    this.setState({cart: cart});
  }

  getCartSize() {
    let cart = this.state.cart;
    let keys = Object.keys(cart);
    let size = 0;
    keys.forEach((key) => {
      let shirt = cart[key];
      let shirtKeys = Object.keys(shirt);
      shirtKeys.forEach((shirtkey) => {
        size += shirt[shirtkey];
      });
    });
    return size;
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

  handleBack() {
    // in item, go back to browse
    switch (this.state.mode) {
      case 'item':
        this.setState({mode: 'browse', sel: -1});
        break;
      case 'bag':
        this.setState({mode: 'browse'});
        break;
      case 'browse':
        this.goToHome();
      default:
        return;
    }
  }

  render() {
    return (
      <div className='mobileShop'>
        <div className='shopLeft'>

        </div>
        <div className='shopBox'>
          <div className='banner'>
            <img src='./iconImages/banner_left_desktop.png'
                 id='leftBannerIcon'
                 onClick={() => this.handleBack()} />
            {
            this.state.mode != 'item' ?
              (this.state.mode == 'bag' ?
                <span id='shopProductName'>SHOPPING BAG</span>
                :
                <img src='./iconImages/SHOP.png' id='shopBannerText' />
              )
              :
              <span id='shopProductName'>{catalog.items[this.state.sel].name}</span>
            }
          </div>
          {catalog.items.map((item, id) =>
            <MobileItem item={item} onClick={() => this.setState({sel: id})} key={item.name}/>
          )}
        </div>
      </div>
    );
  }
}
export default MobileShop
